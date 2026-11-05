"""add hashed refresh-token sessions

Revision ID: 68bd1fc2a640
Revises: 18498cb1e114
Create Date: 2026-11-05
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision: str = "68bd1fc2a640"
down_revision: Union[str, None] = "18498cb1e114"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "refresh_token_sessions",
        sa.Column("user_id", sa.Uuid(), nullable=False),
        sa.Column("token_hash", sa.String(length=64), nullable=False),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("revoked_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("replaced_by_id", sa.Uuid(), nullable=True),
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(
            ["replaced_by_id"], ["refresh_token_sessions.id"],
            name=op.f("fk_refresh_token_sessions_replaced_by_id_refresh_token_sessions"),
            ondelete="RESTRICT",
        ),
        sa.ForeignKeyConstraint(
            ["user_id"], ["users.id"],
            name=op.f("fk_refresh_token_sessions_user_id_users"),
            ondelete="RESTRICT",
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_refresh_token_sessions")),
        sa.UniqueConstraint("token_hash", name=op.f("uq_refresh_token_sessions_token_hash")),
    )
    op.create_index(
        op.f("ix_refresh_token_sessions_user_id"), "refresh_token_sessions", ["user_id"], unique=False
    )
    op.create_index(
        op.f("ix_refresh_token_sessions_expires_at"), "refresh_token_sessions", ["expires_at"], unique=False
    )


def downgrade() -> None:
    op.drop_index(op.f("ix_refresh_token_sessions_expires_at"), table_name="refresh_token_sessions")
    op.drop_index(op.f("ix_refresh_token_sessions_user_id"), table_name="refresh_token_sessions")
    op.drop_table("refresh_token_sessions")
