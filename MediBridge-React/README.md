# MediBridge Portal

The MediBridge React app includes the Senior Citizen and Caretaker portals.

## Run locally

From this directory, run:

```sh
npm install
npm run dev
```

Vite prints the local URL when the development server starts.

## Main routes

- `/` — landing page and role selection.
- `/senior` — Senior login and registration.
- `/senior/dashboard` — medication schedule, Care Circle, rewards, appointments, and SOS demo.
- `/caregiver` — Caretaker connection request form.
- `/caregiver/dashboard` — Caretaker portal.

## Demo limitations

Profiles and demo data are stored in the browser's local storage. Authentication, backend persistence, clinic integrations, GPS sharing, and automatic emergency alerts are not connected. The SOS screen includes a direct phone call link, which requires an enabled phone handler.
