"""Fast, database-independent tests for initial configuration contracts."""

import pytest
from pydantic import ValidationError
from sqlalchemy.orm import sessionmaker

from app.core.config import Settings
from app.database.connection import SessionLocal, get_session_factory


def make_settings(**overrides: str) -> Settings:
    values = {
        "database_url": "postgresql+psycopg://test:test@localhost:5432/test_db",
        "secret_key": "a-test-only-signing-secret-with-more-than-32-chars",
    }
    values.update(overrides)
    return Settings(_env_file=None, **values)


def test_settings_accept_postgresql_and_parse_cors_list() -> None:
    settings = make_settings(cors_origins="http://localhost:5173, https://frontend.example")

    assert settings.cors_origin_list == ["http://localhost:5173", "https://frontend.example"]


def test_settings_reject_non_postgresql_database_url() -> None:
    with pytest.raises(ValidationError, match=r"postgresql\+psycopg"):
        make_settings(database_url="sqlite:///not-postgresql.db")


def test_settings_reject_placeholder_secret() -> None:
    with pytest.raises(ValidationError, match="SECRET_KEY"):
        make_settings(secret_key="replace-with-a-secret-that-is-long-enough")


def test_public_session_factory_is_shared_with_dependency_factory() -> None:
    assert isinstance(SessionLocal, sessionmaker)
    assert get_session_factory() is SessionLocal
