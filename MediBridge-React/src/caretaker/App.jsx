import React, { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Medications from "./pages/Medications";
import Notifications from "./pages/Notifications";
import Appointments from "./pages/Appointments";
import Profile from "./pages/Profile";
import { readProfiles, subscribeToProfileUpdates } from "../profileStorage";
import "./caretaker.css";

const pages = {
  Dashboard, Medications, Notifications, Appointments, Profile
};
const navItems = [
  ["Dashboard", "dashboard"],
  ["Medications", "medication"],
  ["Notifications", "notifications"],
  ["Appointments", "calendar_month"],
  ["Profile", "person"]
];

export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [profiles, setProfiles] = useState(readProfiles);
  const [editProfileRequested, setEditProfileRequested] = useState(false);
  const seniorIsLinked = profiles.caretaker.linkingCode
    && profiles.caretaker.connectionStatus === "approved"
    && profiles.senior.linkingCode
    && profiles.caretaker.linkingCode.toUpperCase() === profiles.senior.linkingCode.toUpperCase();
  const seniorProfile = {
    ...profiles.senior,
    name: seniorIsLinked ? profiles.senior.name || "" : "",
  };
  const seniorName = seniorProfile.name
    || (profiles.caretaker.connectionStatus === "pending" ? "Awaiting senior approval" : "No approved senior");
  const caretakerName = profiles.caretaker.name || "Caretaker";
  const Page = pages[page];

  useEffect(() => subscribeToProfileUpdates(() => setProfiles(readProfiles())), []);

  return (
    <div id="caretaker-portal" className="min-h-screen bg-background pl-16 text-on-surface md:pl-72">
      <aside className="caretaker-sidebar fixed left-0 top-0 z-50 flex h-screen w-16 flex-col justify-start border-r border-surface-container bg-white p-2 md:w-72 md:justify-between md:p-4">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 px-2 pt-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container text-primary">
              <span className="material-symbols-outlined">local_hospital</span>
            </div>
            <div className="hidden md:block">
              <div className="text-lg font-bold text-primary">MediBridge</div>
              <div className="text-xs text-slate-500">Caregiver Portal</div>
            </div>
          </div>
          <div className="hidden rounded-xl border border-surface-container bg-surface-container-low p-3 md:block">
            <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">Active Senior Patient</div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold">{seniorName}</span>
              <span className="rounded-full bg-white px-2 py-1 text-xs text-primary">{seniorIsLinked ? "Linked" : "Pending"}</span>
            </div>
          </div>
          <nav className="caretaker-side-nav flex flex-col gap-1" aria-label="Caregiver portal navigation">
            {navItems.map(([label, icon]) => (
              <button
                key={label}
                type="button"
                aria-current={page === label ? "page" : undefined}
                aria-label={label}
                title={label}
                onClick={() => setPage(label)}
                className={`flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-left font-semibold transition ${page === label ? "bg-surface-container text-primary" : "text-slate-600 hover:bg-surface-container-low"}`}
              >
                <span className="material-symbols-outlined" aria-hidden="true">{icon}</span>
                <span className="caretaker-side-nav-label">{label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="hidden rounded-xl border border-surface-container bg-surface-container-low p-3 md:block">
          <div className="mb-2 font-semibold text-primary">24/7 Care Helpline</div>
          <a className="block rounded-lg bg-white p-3 text-center text-primary" href="tel:18005550199">1-800-555-0199</a>
        </div>
      </aside>

      <header className="fixed top-0 left-16 right-0 z-40 flex h-16 items-center justify-between bg-white/95 px-3 shadow-sm backdrop-blur md:left-72 md:h-20 md:px-6">
        <div className="flex items-center gap-2 font-bold text-primary md:hidden"><span className="material-symbols-outlined">local_hospital</span>MediBridge</div>
        <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
          Monitoring: {seniorName}
          <span className="rounded-full bg-surface-container px-2 py-1 text-xs text-primary">{seniorIsLinked ? "Linked" : "Pending"}</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="tel:18005550199" className="rounded-full bg-red-50 text-red-700 px-3 py-2 text-sm font-semibold">Emergency Line</a>
          <button
            type="button"
            onClick={() => {
              setPage("Profile");
              setEditProfileRequested(true);
            }}
            className="rounded-full bg-surface-container-low px-3 py-2 text-sm font-semibold text-primary"
          >
            Edit Profile
          </button>
          <div className="text-right hidden sm:block"><div className="text-sm font-semibold">{caretakerName}</div><div className="text-xs text-primary">Primary Caretaker</div></div>
          <div className="w-9 h-9 rounded-full bg-surface-container text-primary flex items-center justify-center"><span className="material-symbols-outlined">person</span></div>
        </div>
      </header>

      <main className="min-h-screen px-3 pb-10 pt-20 md:px-6 md:pt-24">
        <Page
          key={page}
          caretakerProfile={profiles.caretaker}
          seniorProfile={seniorProfile}
          startEditing={editProfileRequested}
          onProfileSaved={() => setEditProfileRequested(false)}
        />
      </main>
    </div>
  );
}
