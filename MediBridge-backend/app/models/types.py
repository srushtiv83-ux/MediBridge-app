"""Shared PostgreSQL SQLAlchemy types for domain models."""

from enum import Enum as PyEnum

from sqlalchemy import Enum as SAEnum


def pg_enum(enum_class: type[PyEnum], name: str) -> SAEnum:
    """Build a stable named PostgreSQL enum using the enum values on disk."""
    return SAEnum(
        enum_class,
        name=name,
        native_enum=True,
        values_callable=lambda members: [member.value for member in members],
        validate_strings=True,
    )
