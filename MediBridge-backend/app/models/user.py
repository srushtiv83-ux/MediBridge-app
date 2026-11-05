"""Application user identity and password hash storage."""

from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import Boolean, DateTime, String, Uuid, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base, TimestampMixin
from app.models.enums import UserRole
from app.models.mixins import UUIDPrimaryKeyMixin
from app.models.types import pg_enum

if TYPE_CHECKING:
    from app.models.caretaker import CaretakerProfile
    from app.models.notification import NotificationPreference
    from app.models.auth import RefreshTokenSession
    from app.models.patient import PatientProfile


class User(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "users"

    full_name: Mapped[str] = mapped_column(String(200), nullable=False)
    email: Mapped[str] = mapped_column(String(320), nullable=False, unique=True, index=True)
    phone_number: Mapped[str] = mapped_column(String(32), nullable=False)
    # Argon2id encoded hash only; the raw password is never a model field.
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(pg_enum(UserRole, "user_role"), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default=text("true"))
    is_verified: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default=text("false"))
    last_login: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    patient_profile: Mapped["PatientProfile | None"] = relationship(back_populates="user", uselist=False)
    caretaker_profile: Mapped["CaretakerProfile | None"] = relationship(back_populates="user", uselist=False)
    notification_preferences: Mapped["NotificationPreference | None"] = relationship(
        back_populates="user", uselist=False
    )
    refresh_sessions: Mapped[list["RefreshTokenSession"]] = relationship(back_populates="user")
