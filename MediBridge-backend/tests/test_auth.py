"""Phase 2 authentication route tests using only an isolated SQLite database."""

from __future__ import annotations

from datetime import UTC, datetime, timedelta
import hashlib
from uuid import UUID

import jwt
import pytest
from fastapi import Depends, FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, func, select
from sqlalchemy.engine import Engine
from sqlalchemy.event import listen, remove
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.config import get_settings
from app.core.dependencies import get_current_user, get_db, require_roles
from app.database.base import Base
from app.models.auth import RefreshTokenSession
from app.models.caretaker import CaretakerProfile
from app.models.enums import UserRole
from app.models.notification import NotificationPreference
from app.models.patient import PatientProfile
from app.models.user import User


REFRESH_COOKIE = "medibridge_refresh"
TEST_PASSWORD = "MediBridge_test_password_42!"


@pytest.fixture
def auth_client(monkeypatch: pytest.MonkeyPatch, tmp_path):
    """Create a new app and SQLite database per test; never opens configured PostgreSQL."""
    monkeypatch.setenv("DATABASE_URL", "postgresql+psycopg://test:test@127.0.0.1:1/not_used")
    monkeypatch.setenv("SECRET_KEY", "phase-two-tests-only-signing-key-which-is-long-enough")
    monkeypatch.setenv("ENVIRONMENT", "development")
    # Pydantic settings resolve .env relative to CWD; keep this test process
    # away from the developer's real project .env entirely.
    monkeypatch.chdir(tmp_path)
    get_settings.cache_clear()

    from app.main import create_app

    application = create_app()
    engine = create_engine(
        "sqlite+pysqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    tables = [
        Base.metadata.tables[name]
        for name in (
            "users",
            "patient_profiles",
            "caretaker_profiles",
            "notification_preferences",
            "refresh_token_sessions",
        )
    ]
    Base.metadata.create_all(engine, tables=tables)
    test_session_factory = sessionmaker(bind=engine, expire_on_commit=False)

    def override_get_db():
        with test_session_factory() as session:
            yield session

    application.dependency_overrides[get_db] = override_get_db

    @application.get("/_test/patient-only")
    def patient_only(user: User = Depends(require_roles(UserRole.PATIENT))):
        return {"role": user.role.value}

    def sqlite_timezone_compatibility(session: Session, instance: object) -> None:
        # SQLite drops tzinfo from DateTime(timezone=True) values. PostgreSQL
        # returns these UTC timestamps aware; normalize only this test DB result.
        if isinstance(instance, RefreshTokenSession) and instance.expires_at.tzinfo is None:
            instance.expires_at = instance.expires_at.replace(tzinfo=UTC)

    listen(Session, "loaded_as_persistent", sqlite_timezone_compatibility)
    client = TestClient(application)
    try:
        yield client, test_session_factory
    finally:
        client.close()
        remove(Session, "loaded_as_persistent", sqlite_timezone_compatibility)
        application.dependency_overrides.clear()
        engine.dispose()
        get_settings.cache_clear()


def register(client: TestClient, role: str = "PATIENT", email: str = "patient@example.com"):
    return client.post(
        "/api/auth/register",
        json={
            "full_name": "Test Account",
            "email": email,
            "phone_number": "+15555550123",
            "password": TEST_PASSWORD,
            "role": role,
        },
    )


def bearer(response) -> dict[str, str]:
    return {"Authorization": f"Bearer {response.json()['access_token']}"}


def safe_user_payload(response) -> bool:
    payload = response.json()
    return (
        "password_hash" not in payload.get("user", {})
        and "refresh_token" not in payload
        and "refresh_token" not in payload.get("user", {})
    )


@pytest.mark.parametrize("role", ["PATIENT", "CARETAKER"])
def test_registration_creates_role_profile_and_hashes_password(auth_client, role: str) -> None:
    client, session_factory = auth_client
    response = register(client, role=role, email=f"{role.lower()}@example.com")

    assert response.status_code == 201
    assert safe_user_payload(response) is True
    cookie_is_http_only = any(
        cookie.name == REFRESH_COOKIE and cookie.has_nonstandard_attr("HttpOnly")
        for cookie in client.cookies.jar
    )
    assert cookie_is_http_only is True
    refresh_token = client.cookies.get(REFRESH_COOKIE)
    assert bool(refresh_token) is True

    user_id = UUID(response.json()["user"]["id"])
    with session_factory() as session:
        user = session.get(User, user_id)
        assert user is not None
        is_argon2id_hash = user.password_hash.startswith("$argon2id$")
        is_not_plaintext = user.password_hash != TEST_PASSWORD
        assert is_argon2id_hash is True
        assert is_not_plaintext is True
        patient_count = session.scalar(select(func.count()).select_from(PatientProfile))
        caretaker_count = session.scalar(select(func.count()).select_from(CaretakerProfile))
        assert (patient_count == 1) is (role == "PATIENT")
        assert (caretaker_count == 1) is (role == "CARETAKER")

        persisted_refresh_count = session.scalar(select(func.count()).select_from(RefreshTokenSession))
        assert persisted_refresh_count == 1
        stored_refresh_hash = session.scalar(select(RefreshTokenSession.token_hash))
        raw_token_not_stored = hashlib.sha256(refresh_token.encode()).hexdigest() == stored_refresh_hash
        assert raw_token_not_stored is True
        response_exposes_secret = (
            user.password_hash in response.text or refresh_token in response.text
        )
        assert response_exposes_secret is False


def test_duplicate_email_is_case_insensitive_and_rejected(auth_client) -> None:
    client, _ = auth_client
    first = register(client, email="duplicate@example.com")
    duplicate = register(client, role="CARETAKER", email="DUPLICATE@example.com")

    assert first.status_code == 201
    assert duplicate.status_code == 409


def test_password_hash_verification_and_login_success_or_failure(auth_client) -> None:
    client, session_factory = auth_client
    created = register(client, email="login@example.com")
    user_id = UUID(created.json()["user"]["id"])
    with session_factory() as session:
        user = session.get(User, user_id)
        assert user is not None
        from app.core.security import verify_password

        correct_password_matches = verify_password(TEST_PASSWORD, user.password_hash)
        incorrect_password_matches = verify_password("incorrect password value", user.password_hash)
        assert correct_password_matches is True
        assert incorrect_password_matches is False

    successful = client.post(
        "/api/auth/login", json={"email": "LOGIN@example.com", "password": TEST_PASSWORD}
    )
    unsuccessful = client.post(
        "/api/auth/login", json={"email": "login@example.com", "password": "wrong password"}
    )
    assert successful.status_code == 200
    assert safe_user_payload(successful) is True
    assert unsuccessful.status_code == 401


def test_me_requires_valid_unexpired_access_token_and_hides_hash(auth_client) -> None:
    client, session_factory = auth_client
    created = register(client, email="me@example.com")
    anonymous = client.get("/api/auth/me")
    current = client.get("/api/auth/me", headers=bearer(created))

    assert anonymous.status_code == 401
    assert current.status_code == 200
    me_payload = current.json()
    assert "password_hash" not in me_payload
    assert "refresh_token" not in me_payload
    assert safe_user_payload(created) is True

    user_id = UUID(created.json()["user"]["id"])
    with session_factory() as session:
        user = session.get(User, user_id)
        assert user is not None
        from app.core.config import get_settings

        now = datetime.now(UTC)
        expired_token = jwt.encode(
            {
                "sub": str(user_id),
                "role": user.role.value,
                "type": "access",
                "iat": now - timedelta(minutes=2),
                "exp": now - timedelta(minutes=1),
            },
            get_settings().secret_key.get_secret_value(),
            algorithm="HS256",
        )
    expired_response = client.get("/api/auth/me", headers={"Authorization": f"Bearer {expired_token}"})
    wrong_type_token = jwt.encode(
        {"sub": str(user_id), "type": "refresh", "iat": now, "exp": now + timedelta(minutes=1)},
        get_settings().secret_key.get_secret_value(),
        algorithm="HS256",
    )
    wrong_type_response = client.get(
        "/api/auth/me", headers={"Authorization": f"Bearer {wrong_type_token}"}
    )
    assert expired_response.status_code == 401
    assert wrong_type_response.status_code == 401


def test_refresh_rotates_token_and_reuse_revokes_active_sessions(auth_client) -> None:
    client, _ = auth_client
    created = register(client, email="rotate@example.com")
    old_token = client.cookies.get(REFRESH_COOKIE)
    rotated = client.post("/api/auth/refresh")
    replacement_token = client.cookies.get(REFRESH_COOKIE)
    tokens_are_different = hashlib.sha256(old_token.encode()).digest() != hashlib.sha256(
        replacement_token.encode()
    ).digest()
    assert created.status_code == 201
    assert rotated.status_code == 200
    assert tokens_are_different is True
    assert safe_user_payload(rotated) is True

    client.cookies.clear()
    client.cookies.set(REFRESH_COOKIE, old_token, path="/api/auth")
    reuse_old = client.post("/api/auth/refresh")
    client.cookies.clear()
    client.cookies.set(REFRESH_COOKIE, replacement_token, path="/api/auth")
    reuse_replacement = client.post("/api/auth/refresh")
    assert reuse_old.status_code == 401
    assert reuse_replacement.status_code == 401


def test_logout_revokes_refresh_session(auth_client) -> None:
    client, _ = auth_client
    created = register(client, email="logout@example.com")
    refresh_token = client.cookies.get(REFRESH_COOKIE)
    logged_out = client.post("/api/auth/logout")
    client.cookies.clear()
    client.cookies.set(REFRESH_COOKIE, refresh_token, path="/api/auth")
    replay = client.post("/api/auth/refresh")

    assert created.status_code == 201
    assert logged_out.status_code == 200
    assert replay.status_code == 401
    deleted_cookie_is_http_only = any(
        REFRESH_COOKIE in cookie and "httponly" in cookie.lower() and "max-age=0" in cookie.lower()
        for cookie in logged_out.headers.get_list("set-cookie")
    )
    assert deleted_cookie_is_http_only is True


def test_disabled_user_cannot_login_use_access_token_or_refresh(auth_client) -> None:
    client, session_factory = auth_client
    created = register(client, email="disabled@example.com")
    user_id = UUID(created.json()["user"]["id"])
    refresh_token = client.cookies.get(REFRESH_COOKIE)
    with session_factory() as session:
        user = session.get(User, user_id)
        assert user is not None
        user.is_active = False
        session.commit()

    login_response = client.post(
        "/api/auth/login", json={"email": "disabled@example.com", "password": TEST_PASSWORD}
    )
    me_response = client.get("/api/auth/me", headers=bearer(created))
    client.cookies.clear()
    client.cookies.set(REFRESH_COOKIE, refresh_token, path="/api/auth")
    refresh_response = client.post("/api/auth/refresh")

    assert login_response.status_code == 403
    assert me_response.status_code == 401
    assert refresh_response.status_code == 401


def test_role_dependency_allows_patient_and_rejects_caretaker(auth_client) -> None:
    client, _ = auth_client
    patient = register(client, email="role-patient@example.com")
    caretaker = register(client, role="CARETAKER", email="role-caretaker@example.com")

    allowed = client.get("/_test/patient-only", headers=bearer(patient))
    denied = client.get("/_test/patient-only", headers=bearer(caretaker))

    assert allowed.status_code == 200
    assert allowed.json()["role"] == "PATIENT"
    assert denied.status_code == 403
