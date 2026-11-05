"""Medication schedules and their one-or-more local clock times."""

from __future__ import annotations

from datetime import date, time
from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import CheckConstraint, Date, ForeignKey, ForeignKeyConstraint, String, Time, Uuid, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base, TimestampMixin
from app.models.mixins import UUIDPrimaryKeyMixin

if TYPE_CHECKING:
    from app.models.medicine import Medicine
    from app.models.medication_log import MedicationLog
    from app.models.patient import PatientProfile


class MedicationSchedule(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "medication_schedules"
    patient_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True), ForeignKey("patient_profiles.id", ondelete="RESTRICT"), nullable=False, index=True
    )
    medicine_id: Mapped[UUID] = mapped_column(Uuid(as_uuid=True), nullable=False, index=True)
    frequency: Mapped[str] = mapped_column(String(40), nullable=False)
    start_date: Mapped[date] = mapped_column(Date, nullable=False)
    end_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    timezone: Mapped[str] = mapped_column(String(64), nullable=False)
    is_active: Mapped[bool] = mapped_column(nullable=False, default=True, server_default="true", index=True)

    __table_args__ = (
        CheckConstraint(
            "frequency IN ('once_daily', 'twice_daily', 'three_times_daily', 'custom')",
            name="valid_frequency",
        ),
        CheckConstraint("end_date IS NULL OR end_date >= start_date", name="valid_date_range"),
        UniqueConstraint("id", "patient_id", "medicine_id", name="uq_schedules_id_patient_medicine"),
        ForeignKeyConstraint(
            ["medicine_id", "patient_id"], ["medicines.id", "medicines.patient_id"],
            name="fk_schedules_medicine_patient_medicines", ondelete="RESTRICT",
        ),
    )

    patient: Mapped["PatientProfile"] = relationship(back_populates="schedules")
    medicine: Mapped["Medicine"] = relationship(back_populates="schedules", viewonly=True)
    times: Mapped[list["MedicationScheduleTime"]] = relationship(
        back_populates="schedule", cascade="all, delete-orphan", passive_deletes=True
    )
    medication_logs: Mapped[list["MedicationLog"]] = relationship(back_populates="schedule", viewonly=True)


class MedicationScheduleTime(UUIDPrimaryKeyMixin, Base):
    __tablename__ = "medication_schedule_times"
    __table_args__ = (
        UniqueConstraint("schedule_id", "scheduled_time", name="uq_schedule_time_occurrence_time"),
    )

    schedule_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True), ForeignKey("medication_schedules.id", ondelete="CASCADE"), nullable=False, index=True
    )
    scheduled_time: Mapped[time] = mapped_column(Time(timezone=False), nullable=False)
    label: Mapped[str | None] = mapped_column(String(40), nullable=True)
    sort_order: Mapped[int] = mapped_column(nullable=False, default=0, server_default="0")

    schedule: Mapped[MedicationSchedule] = relationship(back_populates="times")
