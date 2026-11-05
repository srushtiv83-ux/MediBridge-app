"""FastAPI entry point for MediBridge."""

from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.core.config import get_settings
from app.database.connection import get_engine
from app.routes.auth import router as auth_router


@asynccontextmanager
async def lifespan(_: FastAPI):
    # Validate required configuration on startup; opening the engine itself is
    # lazy, so startup does not claim PostgreSQL is reachable.
    get_settings()
    yield


def create_app() -> FastAPI:
    settings = get_settings()
    application = FastAPI(
        title=settings.app_name,
        version="0.1.0",
        description="MediBridge healthcare coordination API.",
        lifespan=lifespan,
    )
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["Authorization", "Content-Type", "Idempotency-Key"],
    )
    application.include_router(auth_router, prefix=settings.api_prefix)

    @application.get("/health", tags=["health"])
    def health() -> dict[str, str]:
        """Liveness only; this endpoint does not imply database connectivity."""
        return {"status": "ok"}

    @application.get("/health/ready", tags=["health"])
    def readiness() -> dict[str, str]:
        """Check PostgreSQL connectivity and report not-ready on failure."""
        try:
            with get_engine().connect() as connection:
                connection.execute(text("SELECT 1"))
        except Exception as exc:
            raise HTTPException(status_code=503, detail="Database is not ready") from exc
        return {"status": "ready", "database": "connected"}

    return application


app = create_app()
