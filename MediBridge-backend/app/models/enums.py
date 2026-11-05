"""Domain enums persisted as named PostgreSQL enum types."""

from enum import Enum


class UserRole(str, Enum):
    PATIENT = "PATIENT"
    CARETAKER = "CARETAKER"
    ADMIN = "ADMIN"


class ConsentStatus(str, Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    DENIED = "DENIED"
    REVOKED = "REVOKED"


class MedicationLogStatus(str, Enum):
    PENDING = "PENDING"
    TAKEN = "TAKEN"
    MISSED = "MISSED"
    SKIPPED = "SKIPPED"


class ConfirmationSource(str, Enum):
    PATIENT = "PATIENT"
    CARETAKER = "CARETAKER"
    DEVICE_VERIFIED = "DEVICE_VERIFIED"
    CLINICIAN_VERIFIED = "CLINICIAN_VERIFIED"


class AppointmentStatus(str, Enum):
    SCHEDULED = "SCHEDULED"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"


class NotificationChannel(str, Enum):
    IN_APP = "IN_APP"
    WHATSAPP = "WHATSAPP"


class NotificationStatus(str, Enum):
    QUEUED = "QUEUED"
    SENT = "SENT"
    FAILED = "FAILED"
    READ = "READ"


class OutboxStatus(str, Enum):
    PENDING = "PENDING"
    PROCESSING = "PROCESSING"
    RETRY = "RETRY"
    DELIVERED = "DELIVERED"
    DEAD = "DEAD"


class DeliveryStatus(str, Enum):
    PENDING = "PENDING"
    SENT = "SENT"
    DELIVERED = "DELIVERED"
    FAILED = "FAILED"
