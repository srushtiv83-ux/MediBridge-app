# MediBridge React Frontend Analysis

## Inspection scope

This analysis is based on the local `../MediBridge-React` tree available during inspection. The supplied GitHub page was not fetchable from this environment, so this records the inspected local files. The frontend is Vite + React 18 with React Router 6 and lucide-react. The package scripts provide Vite development, build, and preview commands. No frontend `fetch`, Axios, or other HTTP client calls were found. Current interactions use local state, `localStorage`, hardcoded examples, DOM actions, and demo notifications.

The frontend is locally present as untracked files in this checkout. No React files were changed as part of this backend phase.

## Routes and screens found

| Route / component | Observed UI and behavior |
|---|---|
| `/` — `components/LandingPage.jsx` | Role selection for senior and caregiver portals. |
| `/senior` — `App.jsx` | Senior login and registration tabs. Login accepts registered email or phone plus password/PIN. Registration asks for name, email, phone and a 4-digit PIN; it creates a demo linking code and demo profile. |
| `/senior/register-details` — `App.jsx` | Alternate senior registration/login screen with name, email, phone, 4-digit PIN and confirmation, generated family linking code, copy/share actions and pending family member display. It persists profile data locally. |
| `/senior/dashboard` — `senior/SeniorDashboard.jsx` | Schedule, care circle, rewards, appointments, SOS and add-medicine screens. Screen markup is imported from local HTML snippets and inserted into the page. Interactions store demo medicines, appointments and points in `localStorage`. |
| `/caregiver` — `pages/CaregiverConnectPage.jsx` | Caretaker name, Gmail, phone and patient linking code form; demo pending request saved locally. |
| `/caregiver/dashboard` — `caretaker/App.jsx` | Five page views: Dashboard, Medications, Notifications, Appointments and Profile. The rendered data is largely embedded sample content. |

## Forms, data and features

- **Account/profile fields:** senior full name, email, mobile number and PIN/confirmation; login email-or-phone and password/PIN; caretaker full name, email, mobile number and linking code. Caretaker profile has name, email and phone fields. Local profile data is stored in `profileStorage.js`.
- **Medicine and schedule:** the senior add-medicine form includes medicine name, dosage, description/appearance, schedule/frequency, timing, start/end dates, total and remaining stock, preparation instructions, doctor name and prescription reference. The schedule screen has medicine name/dosage, morning/afternoon/evening/bedtime time options, start/end date and stock values. Demo saved medication shape currently includes only `name` and `dosage`.
- **Medication status:** dashboard controls include take dose, remind me later, and confirm/taken actions; sample screens also show taken, upcoming and overdue states. Current status changes are local demo actions, not persisted clinical records.
- **Care circle:** patient can copy/share a demo linking code and approve/reject/revoke a caretaker request. The caretaker enters a linking code. The current demo connection state is in local storage; there is no server-side consent or identity verification.
- **Caretaker dashboard:** Dashboard shows sample medication status/activity, nudge/resolve actions and sample recent activity. Medications view exposes sample dose, refill, history and reminder actions. Notifications & Alerts shows sample missed/taken/refill alerts and resolve/order actions. These values are not API-backed.
- **Appointments:** caretaker appointment form includes doctor, specialty, clinic, date, time, reason, transit and notification checkboxes; the page has upcoming/past/summaries tabs and sample appointment actions. Senior appointment list/add UI also exists; senior appointment data is currently stored as a free-form `details` string.
- **Accessibility and support:** reading-size controls, speech synthesis, text-to-speech, phone links and demo SOS interactions exist. SOS explicitly does not send alerts in the current demo.
- **Notifications:** notification and alert screens exist in the caretaker portal. There is no user-facing notification preference form or push/WhatsApp backend integration in the inspected frontend.
- **AI and reports:** no chatbot, AI conversation UI, medical report upload or report viewing UI was found. Related backend endpoints are future integration points and will need frontend work before they are usable from React.
- **Admin:** no admin page or admin form was found.

## Backend API needs inferred from actual UI

1. `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/refresh`, `POST /api/auth/logout`, and reset/verification endpoints. Backend uses passwords with Argon2id; the current PIN form must be changed during later integration because the approved backend contract is password-based.
2. Patient profile/dashboard read and update endpoints; caretaker profile read/update endpoints.
3. Caretaker link request, patient approval/rejection, relationship listing/detail, and revoke endpoints. Link codes must be generated and validated server-side; the hardcoded code must not be reused.
4. Medicine CRUD plus schedule CRUD/today views and medication taken/skipped/history/today/missed endpoints.
5. Patient and caretaker dashboard endpoints returning persisted, authorization-filtered data.
6. Appointment create/list/update/cancel endpoints for the caretaker form and senior appointment views.
7. Notification listing/read/dismiss and notification-preference endpoints if preference controls are added.
8. AI chat/history/report-analysis and secure report upload/list/download/delete are **proposed backend APIs only**; no matching UI exists yet.

## Frontend/backend integration requirements

- Keep the React directory and its visual design intact. Add API wiring incrementally after backend contracts are stable.
- Replace local-only identity, linking, medicine, appointment and points assumptions with authenticated API data; do not treat `localStorage` as the source of truth for clinical records.
- Update login/registration to password-based authentication, handle bearer access tokens and refresh/expired sessions safely, and present field and permission errors.
- Replace the demo linking code with expiring server-generated codes and explicit patient consent.
- Model medicine schedule times as structured values (local times plus IANA timezone), not the present free-form labels/date strings.
- Map frontend forms to explicit request schemas, preserving optional prescription/doctor and appointment details.
- Add AI and report screens only as separate frontend scope; those features are not currently represented.
- Configure backend CORS for the actual frontend origin through environment settings.
