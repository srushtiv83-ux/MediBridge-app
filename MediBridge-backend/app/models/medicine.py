"""Patient-owned medicine records and prescription metadata."""

from __future__ import annotations

from datetime import date
from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import CheckConstraint, Date, ForeignKey, ForeignKeyConstraint, String, Text, Uuid, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base, TimestampMixin
from app.models.mixins import UUIDPrimaryKeyMixin

if TYPE_CHECKING:
    from app.models.medication_log import MedicationLog
    from app.models.medication_schedule import MedicationSchedule
    from app.models.patient import PatientProfile


class Medicine(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "medicines"
    __table_args__ = (
        CheckConstraint("end_date IS NULL OR end_date >= start_date", name="valid_date_range"),
        # Supports composite FKs in schedules/logs to guarantee patient ownership.
        UniqueConstraint("id", "patient_id", name="uq_medicines_id_patient"),
    )

    patient_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True), ForeignKey("patient_profiles.id", ondelete="RESTRICT"), nullable=False, index=True
    )
    medicine_name: Mapped[str] = mapped_column(String(200), nullable=False, index=True)
    generic_name: Mapped[str | None] = mapped_column(String(200), nullable=True)
    dosage: Mapped[str] = mapped_column(String(100), nullable=False)
    dosage_unit: Mapped[str | None] = mapped_column(String(40), nullable=True)
    medicine_type: Mapped[str | None] = mapped_column(String(60), nullable=True)
    instructions: Mapped[str | None] = mapped_column(Text, nullable=True)
    start_date: Mapped[date] = mapped_column(Date, nullable=False)
    end_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    prescribing_doctor: Mapped[str | None] = mapped_column(String(200), nullable=True)
    is_active: Mapped[bool] = mapped_column(nullable=False, default=True, server_default="true", index=True)

    patient: Mapped["PatientProfile"] = relationship(back_populates="medicines")
    # Composite ownership FKs include patient_id, so these navigational links
    # are read-only and cannot overwrite a separate ownership assignment.
    prescriptions: Mapped[list["Prescription"]] = relationship(back_populates="medicine", viewonly=True)
    schedules: Mapped[list["MedicationSchedule"]] = relationship(back_populates="medicine", viewonly=True)
    medication_logs: Mapped[list["MedicationLog"]] = relationship(back_populates="medicine", viewonly=True)


class Prescription(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "prescriptions"

    patient_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True), ForeignKey("patient_profiles.id", ondelete="RESTRICT"), nullable=False, index=True
    )
    medicine_id: Mapped[UUID | None] = mapped_column(Uuid(as_uuid=True), nullable=True, index=True)
    doctor_name: Mapped[str] = mapped_column(String(200), nullable=False)
    prescription_date: Mapped[date] = mapped_column(Date, nullable=False)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    # Private storage key only; never a public URL.
    document_path: Mapped[str | None] = mapped_column(String(500), nullable=True)

    __table_args__ = (
        ForeignKeyConstraint(
            ["medicine_id", "patient_id"], ["medicines.id", "medicines.patient_id"],
            name="fk_prescriptions_medicine_patient_medicines", ondelete="RESTRICT",
        ),
    )

    patient: Mapped["PatientProfile"] = relationship(back_populates="prescriptions")
    medicine: Mapped[Medicine | None] = relationship(back_populates="prescriptions", viewonly=True)
