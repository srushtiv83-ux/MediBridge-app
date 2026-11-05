# MediBridge Backend

FastAPI backend foundation for the existing MediBridge React application.

## Setup

Requires Python 3.11+ and PostgreSQL 14+.

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
```

Edit `.env`: set a PostgreSQL `DATABASE_URL` and replace `SECRET_KEY` with a random value. Generate one with:

```powershell
python -c "import secrets; print(secrets.token_urlsafe(48))"
```

Create a local database and role (run in `psql` as a PostgreSQL administrator):

```sql
CREATE ROLE medibridge_app LOGIN PASSWORD 'choose-a-local-password';
CREATE DATABASE medibridge OWNER medibridge_app;
```

Set `DATABASE_URL=postgresql+psycopg://medibridge_app:YOUR_PASSWORD@localhost:5432/medibridge` in `.env`. URL-encode special characters in the password. No real credentials are included in this repository.

## Run and check database readiness

```powershell
uvicorn app.main:app --reload
```

Swagger UI is at `http://127.0.0.1:8000/docs`. `/health` is a liveness check only. `/health/ready` executes `SELECT 1` and returns `database: connected` only after a successful PostgreSQL connection. The database has not been claimed connected until that endpoint succeeds.

Phase 1 provides the healthcare models and initial Alembic migration. Phase 2 adds patient/caretaker registration, password login, JWT access tokens, and rotating refresh sessions. A new migration adds the refresh-session table; review the target database's current Alembic revision before applying it.

## Initial checks

```powershell
python -m pytest
python -m compileall app alembic tests
```

See `docs/` for frontend inspection and proposed architecture, database schema, ERD and API inventory. Authentication and domain modules are intentionally deferred to subsequent phases.
