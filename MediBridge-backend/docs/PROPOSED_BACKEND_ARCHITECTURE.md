# Proposed MediBridge Backend Architecture

## Scope and guiding decisions

This is the approved architecture proposal for the existing React product. It does not replace the React app or claim that currently demo-only screens are production integrations. The API will use Python, FastAPI, Uvicorn, PostgreSQL, SQLAlchemy 2.x, Alembic, Pydantic Settings and OAuth2-compatible bearer JWT authentication. Passwords use Argon2id. PostgreSQL is the persistent source of truth.

## Component layout

```text
app/
  main.py                 FastAPI application and router registration
  core/                   settings, security primitives, dependencies, errors
  database/               engine, session factory, declarative metadata
  models/                 SQLAlchemy persistence models
  schemas/                Pydantic request/response contracts
  repositories/           database query and persistence operations
  services/               business rules and external integration boundaries
  routes/                 versioned HTTP endpoints
  middleware/             request IDs and other cross-cutting HTTP behavior
  utils/                  shared small utilities
alembic/                  migration environment and revisions
tests/                    isolated tests with mocked external services
docs/                     architecture, API, setup and frontend analysis
```

Routes validate transport inputs and delegate; services enforce business and access rules; repositories handle database operations; models describe persistence; schemas describe API contracts. Database transactions wrap multi-record changes.

## Security and clinical data boundaries

- Hash passwords with Argon2id. Return generic credential errors and throttle login attempts. Store refresh sessions as revocable, hashed tokens; issue short-lived signed access tokens.
- Require authentication and enforce patient ownership or an active, consented caretaker relationship for every patient-scoped operation. A caretaker link does not automatically grant unrestricted access.
- Restrict profile and clinical fields to authorized endpoints and minimize what is sent to external providers. Keep provider credentials in environment configuration.
- Never treat elapsed schedule time as proof that a dose was taken. Logs distinguish patient confirmation from independently verified sources.
- Store reports privately and authorize every download. Record metadata/storage keys, not public links.
- Write audit records without passwords, tokens, or other secrets.

## Database and background work

SQLAlchemy models and Alembic migrations define the normalized relational schema. PostgreSQL transactions persist state changes. Notification work is enqueued in the same transaction through an outbox row; a worker claims and sends pending work, records provider IDs/status and retries safely. A unique idempotency key prevents duplicate notification jobs. A mock provider is confined to tests/development; production WhatsApp delivery uses Meta Cloud API configuration and approved templates where required.

## AI integration boundary

`services/gemini_service.py` is a replaceable adapter using the Google Gen AI SDK where direct Gemini calls are needed. The teammate's external agent can integrate through an authenticated, documented interface and an allowlisted set of backend functions. Agent functions access services/repositories through normal authorization checks; they never run arbitrary SQL. Structured responses and function calling can be supported, while prescriptions/dosages/diagnoses remain outside autonomous agent authority.

## Frontend integration

The frontend remains in `../MediBridge-React`. API base URL, CORS origins and authentication contracts are environment-configured/documented. Existing local demo storage is not authoritative. The 4-digit PIN UI must transition to password registration/login in a later frontend integration phase, as approved. AI and reports require new frontend work because they are not present in the inspected UI.

## Deployment configuration

Use environment variables for the PostgreSQL URL, signing secret, token lifetimes, allowed frontend origins, Gemini credentials and WhatsApp credentials. The checked-in `.env.example` contains placeholders only. Run Alembic migrations as a deployment step. Use a production WSGI/ASGI process manager and a durable worker for outbox jobs in production; local development uses Uvicorn.
