import React, { useEffect, useState } from "react";
import { saveProfile, CARETAKER_PROFILE_KEY } from "../../profileStorage";

export default function Profile({ caretakerProfile, seniorProfile, startEditing, onProfileSaved }) {
  const [editing, setEditing] = useState(!caretakerProfile.name);
  const [form, setForm] = useState({
    name: caretakerProfile.name || "",
    email: caretakerProfile.email || "",
    phone: caretakerProfile.phone || "",
  });
  const seniorName = seniorProfile.name || "Not provided";

  useEffect(() => {
    if (startEditing) setEditing(true);
  }, [startEditing]);

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const save = (event) => {
    event.preventDefault();
    const profile = {
      ...caretakerProfile,
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    };
    saveProfile(CARETAKER_PROFILE_KEY, profile);
    setEditing(false);
    onProfileSaved();
  };

  return (
    <section className="bg-white rounded-2xl p-8 shadow-sm max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary mb-2">Caretaker Profile</h1>
          <p className="text-slate-600">Manage caretaker details and the linked senior citizen account.</p>
        </div>
        {!editing && (
          <button
            type="button"
            className="min-h-12 rounded-xl bg-primary px-4 py-2 font-semibold text-white"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={save}>
        <label className="grid gap-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Full Name
          <input
            className="min-h-12 w-full rounded-lg border border-slate-200 bg-white px-3 text-base text-slate-900"
            name="name"
            value={form.name}
            onChange={update}
            autoComplete="name"
            required
            readOnly={!editing}
          />
        </label>
        <label className="grid gap-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Gmail
          <input
            className="min-h-12 w-full rounded-lg border border-slate-200 bg-white px-3 text-base text-slate-900"
            name="email"
            type="email"
            value={form.email}
            onChange={update}
            autoComplete="email"
            required
            readOnly={!editing}
          />
        </label>
        <label className="grid gap-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Phone Number
          <input
            className="min-h-12 w-full rounded-lg border border-slate-200 bg-white px-3 text-base text-slate-900"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={update}
            autoComplete="tel"
            required
            readOnly={!editing}
          />
        </label>
        <div className="grid gap-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Linked senior citizen
          <p className="font-semibold text-slate-900">{seniorName}</p>
        </div>
        {editing && (
          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <button type="submit" className="min-h-12 rounded-xl bg-primary px-5 py-2 font-semibold text-white">
              Save Profile
            </button>
            {caretakerProfile.name && (
              <button
                type="button"
                className="min-h-12 rounded-xl bg-slate-100 px-5 py-2 font-semibold text-slate-700"
                onClick={() => {
                  setForm({
                    name: caretakerProfile.name || "",
                    email: caretakerProfile.email || "",
                    phone: caretakerProfile.phone || "",
                  });
                  setEditing(false);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </form>
    </section>
  );
}
