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
    <div id="caretaker-portal" className="min-h-screen bg-background text-on-surface md:pl-72">
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-72 z-50 bg-white flex-col justify-between p-4 shadow-sm">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 px-2 pt-1">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined">local_hospital</span>
            </div>
            <div><div className="font-bold text-primary text-lg">MediBridge</div><div className="text-xs text-slate-500">Caregiver Portal</div></div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">Active Senior Patient</div>
            <div className="flex items-center justify-between"><span className="font-semibold">{seniorName}</span><span className="text-xs rounded-full bg-teal-100 text-teal-800 px-2 py-1">{seniorIsLinked ? "Linked" : "Pending"}</span></div>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map(([label, icon]) => <button key={label} onClick={() => setPage(label)} className={`min-h-12 px-4 py-3 rounded-xl flex items-center gap-3 text-left font-semibold transition ${page === label ? "bg-primary-container text-white" : "text-slate-600 hover:bg-slate-100"}`}>
              <span className="material-symbols-outlined">{icon}</span>{label}
            </button>)}
          </nav>
        </div>
        <div className="rounded-xl bg-red-50 p-3">
          <div className="font-semibold text-red-700 mb-2">24/7 Care Helpline</div>
          <a className="block text-center rounded-lg bg-white text-red-700 p-3" href="tel:18005550199">1-800-555-0199</a>
        </div>
      </aside>

      <header className="fixed top-0 left-0 md:left-72 right-0 h-16 md:h-20 z-40 bg-white/95 backdrop-blur shadow-sm flex items-center justify-between px-4 md:px-6">
        <div className="md:hidden flex items-center gap-2 font-bold text-primary"><span className="material-symbols-outlined">local_hospital</span>MediBridge</div>
        <div className="hidden md:block text-sm text-slate-500">Monitoring: {seniorName}</div>
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
          <div className="text-right hidden sm:block"><div className="text-sm font-semibold">{caretakerName}</div><div className="text-xs text-teal-700">Primary Caretaker</div></div>
          <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center"><span className="material-symbols-outlined">person</span></div>
        </div>
      </header>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 grid grid-cols-5">
        {navItems.map(([label, icon]) => <button key={label} onClick={() => setPage(label)} className={`py-2 px-1 flex flex-col items-center gap-1 text-[10px] ${page === label ? "text-teal-700 font-bold" : "text-slate-500"}`}>
          <span className="material-symbols-outlined text-xl">{icon}</span><span>{label}</span>
        </button>)}
      </div>

      <main className="pt-20 md:pt-24 px-4 md:px-6 pb-24 md:pb-10 min-h-screen">
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
