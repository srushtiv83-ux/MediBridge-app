"""PostgreSQL SQLAlchemy engine and session factory."""

from functools import lru_cache
from typing import Any

from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import get_settings


@lru_cache
def get_engine() -> Engine:
    """Create one process-wide PostgreSQL engine with connection health checks."""
    settings = get_settings()
    return create_engine(
        settings.database_url,
        pool_pre_ping=True,
        pool_size=5,
        max_overflow=10,
        pool_recycle=1800,
    )


class _LazySessionMaker(sessionmaker[Session]):
    """Standard sessionmaker that binds the cached engine on first use.

    Keeping engine creation lazy lets callers import ``SessionLocal`` without
    requiring a live database connection at module import time. Creating the
    first session still validates configuration and requires the psycopg driver.
    """

    def __call__(self, **local_kw: Any) -> Session:
        if self.kw.get("bind") is None:
            self.configure(bind=get_engine())
        return super().__call__(**local_kw)


# Public, conventional session factory. It can be imported as:
# ``from app.database.connection import SessionLocal``.
SessionLocal = _LazySessionMaker(autoflush=False, expire_on_commit=False)


def get_session_factory() -> sessionmaker[Session]:
    """Return the shared SQLAlchemy session factory used by dependencies."""
    return SessionLocal
