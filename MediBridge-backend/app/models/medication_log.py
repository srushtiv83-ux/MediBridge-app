"""Medication occurrence history with duplicate-confirmation protection."""

from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import (
    CheckConstraint,
    DateTime,
    ForeignKey,
    ForeignKeyConstraint,
    String,
    Text,
    UniqueConstraint,
    Uuid,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base, TimestampMixin
from app.models.enums import ConfirmationSource, MedicationLogStatus
from app.models.mixins import UUIDPrimaryKeyMixin
from app.models.types import pg_enum

if TYPE_CHECKING:
    from app.models.medicine import Medicine
    from app.models.medication_schedule import MedicationSchedule
    from app.models.patient import PatientProfile


class MedicationLog(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "medication_logs"
    __table_args__ = (
        UniqueConstraint("schedule_id", "scheduled_at", name="uq_medication_logs_schedule_occurrence"),
        CheckConstraint(
            "(status = 'TAKEN' AND taken_at IS NOT NULL AND confirmation_source IS NOT NULL) "
            "OR (status <> 'TAKEN' AND taken_at IS NULL)",
            name="taken_status_requires_confirmation",
        ),
        ForeignKeyConstraint(
            ["schedule_id", "patient_id", "medicine_id"],
            ["medication_schedules.id", "medication_schedules.patient_id", "medication_schedules.medicine_id"],
            name="fk_medication_logs_schedule_ownership_medication_schedules",
            ondelete="RESTRICT",
        ),
        ForeignKeyConstraint(
            ["medicine_id", "patient_id"], ["medicines.id", "medicines.patient_id"],
            name="fk_medication_logs_medicine_ownership_medicines", ondelete="RESTRICT",
        ),
    )

    patient_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True), ForeignKey("patient_profiles.id", ondelete="RESTRICT"), nullable=False, index=True
    )
    medicine_id: Mapped[UUID] = mapped_column(Uuid(as_uuid=True), nullable=False, index=True)
    schedule_id: Mapped[UUID] = mapped_column(Uuid(as_uuid=True), nullable=False, index=True)
    scheduled_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, index=True)
    taken_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    status: Mapped[MedicationLogStatus] = mapped_column(
        pg_enum(MedicationLogStatus, "medication_log_status"),
        nullable=False,
        default=MedicationLogStatus.PENDING,
        server_default=MedicationLogStatus.PENDING.value,
    )
    confirmation_source: Mapped[ConfirmationSource | None] = mapped_column(
        pg_enum(ConfirmationSource, "confirmation_source"), nullable=True
    )
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    patient: Mapped["PatientProfile"] = relationship(back_populates="medication_logs")
    medicine: Mapped["Medicine"] = relationship(back_populates="medication_logs", viewonly=True)
    schedule: Mapped["MedicationSchedule"] = relationship(back_populates="medication_logs", viewonly=True)
