"""Caretaker profile and explicit patient consent relationship."""

from __future__ import annotations

from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import ForeignKey, String, Uuid, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship as orm_relationship

from app.database.base import Base, TimestampMixin
from app.models.enums import ConsentStatus
from app.models.mixins import UUIDPrimaryKeyMixin
from app.models.types import pg_enum

if TYPE_CHECKING:
    from app.models.notification import Notification
    from app.models.patient import PatientProfile
    from app.models.user import User


class CaretakerProfile(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "caretaker_profiles"

    user_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True), ForeignKey("users.id", ondelete="RESTRICT"), nullable=False, unique=True
    )
    relationship: Mapped[str | None] = mapped_column(String(80), nullable=True)
    emergency_contact: Mapped[str | None] = mapped_column(String(200), nullable=True)

    user: Mapped["User"] = orm_relationship(back_populates="caretaker_profile")
    patient_links: Mapped[list["CaretakerRelationship"]] = orm_relationship(back_populates="caretaker")
    notifications: Mapped[list["Notification"]] = orm_relationship(back_populates="caretaker")


class CaretakerRelationship(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "caretaker_relationships"
    __table_args__ = (
        UniqueConstraint("patient_id", "caretaker_id", name="uq_caretaker_relationship_patient_caretaker"),
    )

    patient_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True), ForeignKey("patient_profiles.id", ondelete="RESTRICT"), nullable=False, index=True
    )
    caretaker_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True), ForeignKey("caretaker_profiles.id", ondelete="RESTRICT"), nullable=False, index=True
    )
    relationship_type: Mapped[str] = mapped_column(String(80), nullable=False)
    notification_enabled: Mapped[bool] = mapped_column(nullable=False, default=True, server_default="true")
    consent_status: Mapped[ConsentStatus] = mapped_column(
        pg_enum(ConsentStatus, "consent_status"), nullable=False, default=ConsentStatus.PENDING,
        server_default=ConsentStatus.PENDING.value,
    )

    patient: Mapped["PatientProfile"] = orm_relationship(back_populates="caretaker_links")
    caretaker: Mapped[CaretakerProfile] = orm_relationship(back_populates="patient_links")
