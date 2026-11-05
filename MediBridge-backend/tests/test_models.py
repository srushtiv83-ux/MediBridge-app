"""Structural checks for the initial PostgreSQL ORM model set."""

import pytest
from sqlalchemy.dialects import postgresql
from sqlalchemy.dialects.postgresql import JSONB, UUID as PostgreSQLUUID
from sqlalchemy.schema import CreateTable
from sqlalchemy.orm import configure_mappers
from sqlalchemy import UniqueConstraint

import app.models  # noqa: F401 — populate metadata registry.
from app.database.base import Base
from app.models.user import User


EXPECTED_TABLES = {
    "users",
    "patient_profiles",
    "caretaker_profiles",
    "caretaker_relationships",
    "medicines",
    "prescriptions",
    "medication_schedules",
    "medication_schedule_times",
    "medication_logs",
    "appointments",
    "notification_preferences",
    "notifications",
    "notification_outbox",
    "notification_logs",
    "refresh_token_sessions",
}


def test_all_initial_model_tables_are_registered() -> None:
    assert set(Base.metadata.tables) == EXPECTED_TABLES


def test_orm_mappers_configure_without_ambiguity() -> None:
    configure_mappers()


def test_models_compile_as_postgresql_ddl() -> None:
    for table in Base.metadata.sorted_tables:
        ddl = str(CreateTable(table).compile(dialect=postgresql.dialect()))
        assert f"CREATE TABLE {table.name}" in ddl


def test_uuid_jsonb_and_password_hash_contracts() -> None:
    assert isinstance(User.__table__.c.id.type, PostgreSQLUUID)
    assert "password_hash" in User.__table__.c
    assert "password" not in User.__table__.c
    assert isinstance(Base.metadata.tables["notifications"].c.context.type, JSONB)
    assert isinstance(Base.metadata.tables["notification_outbox"].c.payload.type, JSONB)


@pytest.mark.parametrize(
    ("table_name", "columns"),
    [
        ("prescriptions", {"medicine_id", "patient_id"}),
        ("medication_schedules", {"medicine_id", "patient_id"}),
        ("medication_logs", {"schedule_id", "medicine_id", "patient_id"}),
    ],
)
def test_clinical_rows_enforce_patient_ownership_fks(table_name: str, columns: set[str]) -> None:
    table = Base.metadata.tables[table_name]
    constrained_columns = {
        column.name
        for constraint in table.foreign_key_constraints
        if len(constraint.column_keys) > 1
        for column in constraint.columns
    }
    assert columns <= constrained_columns


def test_notification_outbox_idempotency_is_unique() -> None:
    table = Base.metadata.tables["notification_outbox"]
    assert any(
        constraint.name == "uq_notification_outbox_idempotency_key"
        for constraint in table.constraints
        if isinstance(constraint, UniqueConstraint)
    )
