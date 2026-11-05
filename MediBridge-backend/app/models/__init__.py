"""Import the complete SQLAlchemy model registry for Alembic and the app."""

from app.models.appointment import Appointment
from app.models.auth import RefreshTokenSession
from app.models.caretaker import CaretakerProfile, CaretakerRelationship
from app.models.medicine import Medicine, Prescription
from app.models.medication_log import MedicationLog
from app.models.medication_schedule import MedicationSchedule, MedicationScheduleTime
from app.models.notification import (
    Notification,
    NotificationDeliveryLog,
    NotificationOutbox,
    NotificationPreference,
)
from app.models.patient import PatientProfile
from app.models.user import User

__all__ = [
    "Appointment",
    "RefreshTokenSession",
    "CaretakerProfile",
    "CaretakerRelationship",
    "Medicine",
    "MedicationLog",
    "MedicationSchedule",
    "MedicationScheduleTime",
    "Notification",
    "NotificationDeliveryLog",
    "NotificationOutbox",
    "NotificationPreference",
    "PatientProfile",
    "Prescription",
    "User",
]
