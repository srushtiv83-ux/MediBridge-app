# Proposed MediBridge PostgreSQL Schema

All major entities use UUID primary keys. Timestamps are stored in UTC (`timestamptz` where appropriate). Email is normalized before a unique constraint. Clinical history is retained when accounts or medicines are deactivated. SQLAlchemy models and Pydantic schemas remain separate.

## Tables

| Table | Main columns and purpose | Key relationships and constraints |
|---|---|---|
| `users` | `id`, `full_name`, normalized `email`, `phone_number`, `password_hash`, `role`, active/verified flags, created/updated/last-login timestamps | Unique email; role enum PATIENT/CARETAKER/ADMIN; password hash never returned. |
| `patient_profiles` | `id`, unique `user_id`, DOB, optional gender/blood group/emergency contact/address/medical notes, timestamps | One-to-one user; sensitive fields only available to patient and explicitly authorized parties. |
| `caretaker_profiles` | `id`, unique `user_id`, relationship label, emergency contact, timestamps | One-to-one user. |
| `caretaker_relationships` | `id`, patient profile, caretaker profile, relationship type, notification enabled, consent state, created/updated timestamps | Unique patient/caretaker pair; consent and state checked for every access. Restrict deletion where history requires it. |
| `care_link_codes` | `id`, patient, hashed code, expiration, use/revocation timestamps | Unique code hash; short-lived/one-time where appropriate; never store plaintext code. |
| `refresh_sessions` | `id`, user, token hash, expiry, revoked/created timestamps, client metadata | Unique token hash; indexed user and expiration; supports rotation and logout invalidation. |
| `email_verification_tokens` | `id`, user, token hash, expiry, used timestamp | Single-use token hash and indexed user/expiry. |
| `password_reset_tokens` | `id`, user, token hash, expiry, used timestamp | Single-use token hash and indexed user/expiry. |
| `login_attempts` | normalized login identifier hash, timestamps, outcome, limited metadata | Indexed by identifier/time for throttling; do not store passwords. |
| `medicines` | `id`, patient, name/generic name, dosage/unit/type, instructions, date range, prescriber, active flag, timestamps | Patient FK; indexes patient/active and name; check end date >= start date. |
| `prescriptions` | `id`, patient, optional medicine, doctor, prescription date, notes, private document storage key, created timestamp | Patient and optional medicine FKs; restrict/delete policy preserves history. |
| `medication_schedules` | `id`, patient, medicine, frequency/custom label, date range, IANA timezone, active flag, timestamps | Patient and medicine FKs; check ownership consistency and date range. |
| `medication_schedule_times` | `id`, schedule, local time, optional label/order | Many times per schedule; unique schedule/time; allows once, twice, thrice daily and custom times without duplicate columns. |
| `medication_logs` | `id`, patient, medicine, schedule, scheduled timestamp, optional taken timestamp, status, confirmation source, notes, created timestamp | Unique schedule + scheduled occurrence (idempotency); status PENDING/TAKEN/MISSED/SKIPPED; missed is not equivalent to taken; source distinguishes patient from independent verification. |
| `appointments` | `id`, patient, creator, doctor, specialty, clinic, start/end timestamps, reason, transit/notification preferences, status, timestamps | Patient and creator FKs; indexes patient/start time; check end after start. |
| `medical_reports` | `id`, patient, uploader, original name, private storage key, media type, size, upload time, processing status, optional extracted text, created timestamp | Patient/uploader FKs; allowlisted PDF/image MIME and extension plus size validation; no public path. |
| `ai_conversations` | `id`, user, title, created/updated timestamps | User FK; indexed owner and updated time. |
| `ai_messages` | `id`, conversation, sender, message content, model, created timestamp | Conversation FK; sender enum; indexed conversation/time. Avoid retaining unnecessary health content. |
| `notification_preferences` | `id`, unique user, WhatsApp enabled, medicine-taken/missed/emergency preferences, timestamps | One row per user; recipient consent checked before sending. |
| `notifications` | `id`, patient, optional caretaker, type, title/message, delivery channel/status, created/sent timestamps | Patient/caretaker FKs; indexed recipient/time and delivery status. |
| `notification_outbox` | `id`, notification, unique idempotency key, payload reference, state, attempts, next-attempt time, locked/sent timestamps | Unique idempotency key; worker state indexed for safe claiming/retry. |
| `notification_logs` | `id`, notification, provider, provider message ID, delivery status, error, retry count, timestamps | Notification FK; unique provider/message ID where present; indexes notification/status. |
| `audit_logs` | `id`, optional actor user, action, entity type/id, timestamp, filtered JSON metadata | Actor FK set null when needed for retention; indexes actor/time and entity; prohibit secret fields in metadata. |

## Integrity and index strategy

- Enforce foreign keys, unique email, unique caretaker pair, unique scheduled occurrence and outbox idempotency in PostgreSQL, not only application code.
- Index foreign keys used for ownership and joins, patient/time queries for schedules/logs/appointments, conversation owner/time and notification processing state.
- Use transactions for registration + role profile creation, tracking + outbox creation, and other multi-row business actions.
- Avoid hard deletes for clinical history. Deactivate users/medicines and use `RESTRICT`/`SET NULL` intentionally for retained audit and event records.
- Convert local schedule time to concrete UTC occurrence using the stored IANA timezone when generating or querying due events; account for daylight-saving transitions.

See [ER_DIAGRAM.md](ER_DIAGRAM.md) for the entity relationship diagram.
