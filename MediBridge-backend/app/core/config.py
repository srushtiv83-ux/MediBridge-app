"""Validated application settings loaded from environment or a local .env."""

from functools import lru_cache

from pydantic import SecretStr, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    app_name: str = "MediBridge API"
    environment: str = "development"
    api_prefix: str = "/api"
    database_url: str
    secret_key: SecretStr
    access_token_expire_minutes: int = 20
    refresh_token_expire_days: int = 14
    frontend_url: str = "http://localhost:5173"
    cors_origins: str = "http://localhost:5173"

    @field_validator("database_url")
    @classmethod
    def require_postgresql_psycopg_url(cls, value: str) -> str:
        if not value.startswith("postgresql+psycopg://"):
            raise ValueError("DATABASE_URL must use postgresql+psycopg://")
        return value

    @field_validator("secret_key")
    @classmethod
    def require_non_placeholder_secret(cls, value: SecretStr) -> SecretStr:
        secret = value.get_secret_value()
        if len(secret) < 32 or secret.lower().startswith("replace-"):
            raise ValueError("SECRET_KEY must be replaced with a random value of at least 32 characters")
        return value

    @field_validator("access_token_expire_minutes")
    @classmethod
    def positive_access_expiry(cls, value: int) -> int:
        if value <= 0:
            raise ValueError("ACCESS_TOKEN_EXPIRE_MINUTES must be positive")
        return value

    @field_validator("refresh_token_expire_days")
    @classmethod
    def positive_refresh_expiry(cls, value: int) -> int:
        if value <= 0:
            raise ValueError("REFRESH_TOKEN_EXPIRE_DAYS must be positive")
        return value

    @property
    def cors_origin_list(self) -> list[str]:
        """Parse comma-separated CORS origins without accepting a wildcard by default."""
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    """Return cached validated settings for the current process."""
    return Settings()
