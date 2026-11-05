# Required MediBridge API Endpoints

All paths are relative to `/api`. Protected routes use `Authorization: Bearer <access_token>`. Request and response shapes will be documented in OpenAPI as modules are implemented. This list maps observed frontend needs plus the approved future AI/report scope; AI and report routes currently have no matching React UI.

## Authentication and account

| Method | Path | Purpose |
|---|---|---|
| POST | `/auth/register` | Create patient/caretaker account and role profile using password. |
| POST | `/auth/login` | Password login; generic credential failure and throttling. |
| GET | `/auth/me` | Return authenticated account/profile summary. |
| POST | `/auth/refresh` | Rotate a valid refresh session and issue access token. |
| POST | `/auth/logout` | Revoke current refresh session. |
| POST | `/auth/forgot-password` | Request a generic-response password reset flow. |
| POST | `/auth/reset-password` | Consume one-time reset token and update password. |
| POST | `/auth/verify-email` | Verify email with one-time token. |

## Patient, caretaker and relationship

| Method | Path | Purpose |
|---|---|---|
| GET/PUT | `/patients/me` | Read/update own patient profile. |
| GET | `/patients/me/dashboard` | Patient schedule, adherence and recent activity summary. |
| POST | `/caretakers/link` | Caretaker requests link using patient code. |
| GET | `/caretakers` | List linked/requesting caretakers visible to patient. |
| GET/PUT/DELETE | `/caretakers/{relationship_id}` | Inspect/update consent or revoke relationship. |
| GET | `/caretaker/patients` | List patients linked to authenticated caretaker. |
| GET/PUT | `/caretaker/me` | Read/update own caretaker profile. |
| GET | `/dashboard/caretaker` | Authorized patient summaries and recent alerts. |

## Medicines, schedules and tracking

| Method | Path | Purpose |
|---|---|---|
| POST | `/medicines` | Create medicine for self or authorized patient context. |
| GET | `/medicines` | List/search/filter medicines for an authorized patient. |
| GET/PUT/DELETE | `/medicines/{medicine_id}` | Read/update/deactivate medicine. |
| POST/GET | `/prescriptions` | Add/list prescription metadata and private document reference. |
| GET/PUT/DELETE | `/prescriptions/{prescription_id}` | Read/update/archive authorized prescription. |
| POST | `/schedules` | Create schedule with one or multiple local times and timezone. |
| GET | `/schedules` | List authorized schedules. |
| GET | `/schedules/today` | Return today's occurrences in the requested patient timezone. |
| GET/PUT/DELETE | `/schedules/{schedule_id}` | Read/update/deactivate schedule. |
| POST | `/tracking/taken` | Record patient-confirmed dose; accepts idempotency key. |
| POST | `/tracking/skipped` | Record skipped dose; accepts idempotency key. |
| GET | `/tracking/history` | Query authorized medication history by date/medicine. |
| GET | `/tracking/missed` | Return missed occurrences. |
| GET | `/tracking/today` | Return today's dose states without inventing taken confirmations. |

## Appointments and notifications

| Method | Path | Purpose |
|---|---|---|
| POST | `/appointments` | Create appointment from caretaker/senior form. |
| GET | `/appointments` | List authorized patient appointments with date filters. |
| GET/PUT/DELETE | `/appointments/{appointment_id}` | Read/update/cancel appointment. |
| GET | `/notifications` | List alerts visible to authenticated user. |
| POST | `/notifications/{notification_id}/read` | Mark alert reviewed. |
| DELETE | `/notifications/{notification_id}` | Dismiss/archive alert where allowed. |
| GET/PUT | `/notification-preferences/me` | Read/update consent and notification preferences. |

## Reports and AI integration (future UI/API phase)

| Method | Path | Purpose |
|---|---|---|
| POST | `/reports/upload` | Upload validated PDF/image to private storage. |
| GET | `/reports` | List authorized report metadata. |
| GET | `/reports/{report_id}` | Return metadata or authorized private download response. |
| DELETE | `/reports/{report_id}` | Remove/archive authorized report. |
| POST | `/ai/chat` | Send authenticated chat message to configured agent/Gemini adapter. |
| GET | `/ai/history` | List authenticated user's conversations/messages. |
| POST | `/ai/analyze-report` | Queue controlled report analysis; requires explicit authorization/consent. |

## Integration notes

- Patient IDs supplied by clients never grant access by themselves; services verify ownership/active caretaker consent.
- Tracking requests use an idempotency key and database uniqueness to avoid duplicate confirmations and notification jobs.
- Endpoint shapes for login/registration will use passwords, replacing the existing frontend PIN fields during a separate frontend integration phase.
- AI tools are allowlisted backend functions with ordinary authorization checks. No endpoint exposes direct SQL access or allows agent-directed prescription changes.
