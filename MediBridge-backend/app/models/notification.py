"""Notification preferences, notifications, outbox and delivery attempts."""

from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING, Any
from uuid import UUID

from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    ForeignKeyConstraint,
    Integer,
    String,
    Text,
    UniqueConstraint,
    Uuid,
    text,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base, TimestampMixin
from app.models.enums import DeliveryStatus, NotificationChannel, NotificationStatus, OutboxStatus
from app.models.mixins import UUIDPrimaryKeyMixin
from app.models.types import pg_enum

if TYPE_CHECKING:
    from app.models.caretaker import CaretakerProfile
    from app.models.patient import PatientProfile
    from app.models.user import User


class NotificationPreference(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "notification_preferences"

    user_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True), ForeignKey("users.id", ondelete="RESTRICT"), nullable=False, unique=True
    )
    whatsapp_enabled: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False, server_default="false")
    medicine_taken_alerts: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True, server_default="true")
    missed_medicine_alerts: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True, server_default="true")
    emergency_alerts: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True, server_default="true")

    user: Mapped["User"] = relationship(back_populates="notification_preferences")


class Notification(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "notifications"

    patient_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True), ForeignKey("patient_profiles.id", ondelete="RESTRICT"), nullable=False, index=True
    )
    caretaker_id: Mapped[UUID | None] = mapped_column(
        Uuid(as_uuid=True), ForeignKey("caretaker_profiles.id", ondelete="RESTRICT"), nullable=True, index=True
    )
    notification_type: Mapped[str] = mapped_column(String(60), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    delivery_channel: Mapped[NotificationChannel] = mapped_column(
        pg_enum(NotificationChannel, "notification_channel"), nullable=False
    )
    delivery_status: Mapped[NotificationStatus] = mapped_column(
        pg_enum(NotificationStatus, "notification_status"),
        nullable=False,
        default=NotificationStatus.QUEUED,
        server_default=NotificationStatus.QUEUED.value,
        index=True,
    )
    sent_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    # Context is limited to non-secret event identifiers; credentials/tokens do not belong here.
    context: Mapped[dict[str, Any]] = mapped_column(JSONB, nullable=False, default=dict, server_default=text("'{}'::jsonb"))

    patient: Mapped["PatientProfile"] = relationship(back_populates="notifications")
    caretaker: Mapped["CaretakerProfile | None"] = relationship(back_populates="notifications")
    outbox: Mapped["NotificationOutbox | None"] = relationship(back_populates="notification", uselist=False)
    delivery_logs: Mapped[list["NotificationDeliveryLog"]] = relationship(back_populates="notification")


class NotificationOutbox(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "notification_outbox"
    __table_args__ = (
        UniqueConstraint("notification_id", name="uq_notification_outbox_notification"),
        UniqueConstraint("idempotency_key", name="uq_notification_outbox_idempotency_key"),
    )

    notification_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True), ForeignKey("notifications.id", ondelete="RESTRICT"), nullable=False
    )
    idempotency_key: Mapped[str] = mapped_column(String(200), nullable=False)
    event_type: Mapped[str] = mapped_column(String(80), nullable=False)
    # Contains only event metadata/IDs, never provider credentials or bearer tokens.
    payload: Mapped[dict[str, Any]] = mapped_column(JSONB, nullable=False, default=dict, server_default=text("'{}'::jsonb"))
    status: Mapped[OutboxStatus] = mapped_column(
        pg_enum(OutboxStatus, "notification_outbox_status"),
        nullable=False,
        default=OutboxStatus.PENDING,
        server_default=OutboxStatus.PENDING.value,
        index=True,
    )
    attempt_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0, server_default="0")
    available_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=text("CURRENT_TIMESTAMP"), index=True
    )
    locked_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    delivered_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    last_error: Mapped[str | None] = mapped_column(Text, nullable=True)

    notification: Mapped[Notification] = relationship(back_populates="outbox")
    delivery_logs: Mapped[list["NotificationDeliveryLog"]] = relationship(back_populates="outbox")


class NotificationDeliveryLog(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "notification_logs"

    notification_id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True), ForeignKey("notifications.id", ondelete="RESTRICT"), nullable=False, index=True
    )
    outbox_id: Mapped[UUID | None] = mapped_column(
        Uuid(as_uuid=True), ForeignKey("notification_outbox.id", ondelete="RESTRICT"), nullable=True, index=True
    )
    provider: Mapped[str] = mapped_column(String(60), nullable=False)
    provider_message_id: Mapped[str | None] = mapped_column(String(200), nullable=True)
    delivery_status: Mapped[DeliveryStatus] = mapped_column(
        pg_enum(DeliveryStatus, "notification_delivery_status"), nullable=False
    )
    error_message: Mapped[str | None] = mapped_column(Text, nullable=True)
    retry_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0, server_default="0")

    notification: Mapped[Notification] = relationship(back_populates="delivery_logs")
    outbox: Mapped[NotificationOutbox | None] = relationship(back_populates="delivery_logs")
