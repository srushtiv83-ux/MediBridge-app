"""Patient-specific profile and its care/clinical ownership relationships."""

from __future__ import annotations

from datetime import date
from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import Date, ForeignKey, String, Text, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base, TimestampMixin
from app.models.mixins import UUIDPrimaryKeyMixin

if TYPE_CHECKING:
    from app.models.appointment import Appointment
    from app.models.caretaker import CaretakerRelationship
    from app.models.medicine import Medicine, Prescription
    from app.models.medication_schedule import MedicationSchedule
    from app.models.medication_log import MedicationLog
    from app.models.notification import Notification
    from app.models.user import User


class PatientProfile(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "patient_profiles"

    user_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True), ForeignKey("users.id", ondelete="RESTRICT"), nullable=False, unique=True
    )
    date_of_birth: Mapped[date | None] = mapped_column(Date, nullable=True)
    gender: Mapped[str | None] = mapped_column(String(40), nullable=True)
    blood_group: Mapped[str | None] = mapped_column(String(8), nullable=True)
    emergency_contact: Mapped[str | None] = mapped_column(String(200), nullable=True)
    address: Mapped[str | None] = mapped_column(Text, nullable=True)
    medical_notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    user: Mapped["User"] = relationship(back_populates="patient_profile")
    caretaker_links: Mapped[list["CaretakerRelationship"]] = relationship(back_populates="patient")
    medicines: Mapped[list["Medicine"]] = relationship(back_populates="patient")
    prescriptions: Mapped[list["Prescription"]] = relationship(back_populates="patient", overlaps="medicine")
    schedules: Mapped[list["MedicationSchedule"]] = relationship(back_populates="patient")
    medication_logs: Mapped[list["MedicationLog"]] = relationship(back_populates="patient")
    appointments: Mapped[list["Appointment"]] = relationship(back_populates="patient")
    notifications: Mapped[list["Notification"]] = relationship(back_populates="patient")
