"""Account creation, login, refresh rotation, and logout operations."""

from datetime import UTC, datetime, timedelta
from hashlib import sha256
import secrets

from sqlalchemy import select, update
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, joinedload

from app.core.config import get_settings
from app.core.security import create_access_token, hash_password, verify_password
from app.models.auth import RefreshTokenSession
from app.models.caretaker import CaretakerProfile
from app.models.enums import UserRole
from app.models.notification import NotificationPreference
from app.models.patient import PatientProfile
from app.models.user import User


class AuthError(Exception):
    def __init__(self, status_code: int, message: str):
        self.status_code = status_code
        self.message = message


def _token_digest(token: str) -> str:
    return sha256(token.encode("utf-8")).hexdigest()


def _new_refresh_session(db: Session, user: User) -> str:
    token = secrets.token_urlsafe(48)
    expiry = datetime.now(UTC) + timedelta(days=get_settings().refresh_token_expire_days)
    db.add(RefreshTokenSession(user_id=user.id, token_hash=_token_digest(token), expires_at=expiry))
    return token


def _issue_access(user: User) -> str:
    return create_access_token(user.id, user.role.value)


def register(db: Session, data) -> tuple[User, str]:
    email = str(data.email).strip().lower()
    if db.scalar(select(User.id).where(User.email == email)) is not None:
        raise AuthError(409, "An account with this email already exists")
    role = UserRole(data.role)
    user = User(
        full_name=data.full_name.strip(),
        email=email,
        phone_number=data.phone_number.strip(),
        password_hash=hash_password(data.password),
        role=role,
    )
    if role == UserRole.PATIENT:
        user.patient_profile = PatientProfile(date_of_birth=data.date_of_birth, gender=data.gender)
    else:
        user.caretaker_profile = CaretakerProfile(relationship=data.relationship)
    user.notification_preferences = NotificationPreference()
    db.add(user)
    try:
        db.flush()
        refresh_token = _new_refresh_session(db, user)
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise AuthError(409, "An account with this email already exists") from exc
    db.refresh(user)
    return user, refresh_token


def login(db: Session, email: str, password: str) -> tuple[User, str]:
    user = db.scalar(select(User).where(User.email == email.strip().lower()))
    if user is None or not verify_password(password, user.password_hash):
        raise AuthError(401, "Email or password is incorrect")
    if not user.is_active:
        raise AuthError(403, "This account is disabled")
    user.last_login = datetime.now(UTC)
    refresh_token = _new_refresh_session(db, user)
    db.commit()
    db.refresh(user)
    return user, refresh_token


def rotate_refresh_token(db: Session, token: str) -> tuple[User, str]:
    now = datetime.now(UTC)
    session = db.scalar(
        select(RefreshTokenSession)
        .where(RefreshTokenSession.token_hash == _token_digest(token))
        .with_for_update()
    )
    if session is None:
        raise AuthError(401, "Refresh session is invalid or expired")
    if session.revoked_at is not None:
        db.execute(
            update(RefreshTokenSession)
            .where(RefreshTokenSession.user_id == session.user_id, RefreshTokenSession.revoked_at.is_(None))
            .values(revoked_at=now)
        )
        db.commit()
        raise AuthError(401, "Refresh session is invalid or expired")
    if session.expires_at <= now or not session.user.is_active:
        session.revoked_at = now
        db.commit()
        raise AuthError(401, "Refresh session is invalid or expired")
    new_token = _new_refresh_session(db, session.user)
    db.flush()
    replacement = db.scalar(
        select(RefreshTokenSession).where(RefreshTokenSession.token_hash == _token_digest(new_token))
    )
    session.revoked_at = now
    session.replaced_by_id = replacement.id
    user = session.user
    db.commit()
    return user, new_token


def logout(db: Session, token: str | None) -> None:
    if not token:
        return
    session = db.scalar(
        select(RefreshTokenSession).where(RefreshTokenSession.token_hash == _token_digest(token))
    )
    if session is not None and session.revoked_at is None:
        session.revoked_at = datetime.now(UTC)
        db.commit()


def get_user_for_access(db: Session, user_id):
    user = db.scalar(
        select(User).options(joinedload(User.patient_profile), joinedload(User.caretaker_profile))
        .where(User.id == user_id)
    )
    return user if user is not None and user.is_active else None
