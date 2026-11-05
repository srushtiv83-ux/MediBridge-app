import React from "react";
import { handlePageAction, handlePageSubmit } from "../pageActions";

export default function Dashboard({ caretakerProfile, seniorProfile }) {
  const caretakerName = caretakerProfile.name || "Caretaker";
  const seniorName = seniorProfile.name || "Linked senior";
  const seniorInitials = seniorName
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="page-content" onClick={handlePageAction} onSubmit={handlePageSubmit}>
      <div className={"flex flex-col w-full gap-space-lg"}>

<div className={"relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm"}>
<div className={"relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-space-md"}>
<div className={"flex flex-col gap-space-xs"}>
<div className={"flex items-center gap-space-xs"}>
<span className={"inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm"}>
<span className={"w-2 h-2 rounded-full bg-secondary animate-pulse"}></span>
            Real-Time Sync Active
          </span>
<span className={"font-label-sm text-label-sm text-on-surface-variant font-medium"}>Tuesday, Oct 24 • 03:45 PM EDT</span>
</div>
<h1 className={"font-headline-lg text-headline-lg text-primary tracking-tight"}>Welcome back, {caretakerName}</h1>
<p className={"font-body-lg text-body-lg text-on-surface-variant max-w-2xl"}>
          Here is {seniorName}'s clinical overview, telemetry, and medication compliance for today.
        </p>
</div>

<div className={"flex flex-wrap items-center gap-space-sm pt-space-xs lg:ml-auto lg:pt-0"}>
<button className={"min-h-[48px] px-space-md rounded-xl bg-surface-container-low text-primary font-label-lg text-label-lg hover:bg-surface-container hover:shadow-sm transition-all flex items-center gap-space-xs"} id={"nudge-btn"} data-action={"triggerSeniorNudge()"}>
<span className={"material-symbols-outlined text-[20px] text-secondary"}>notifications_active</span>
<span className={""}>Send Reminder Ping</span>
</button>
<button className={"min-h-[48px] px-space-md rounded-xl bg-secondary text-on-secondary font-label-lg text-label-lg hover:opacity-90 shadow-sm transition-all flex items-center gap-space-xs"}>
<span className={"material-symbols-outlined text-[20px]"}>add_chart</span>
<span className={""}>Log Care Note</span>
</button>
</div>
</div>

<div className={"mt-space-lg grid grid-cols-1 gap-space-md lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)]"}>
<div className={"flex min-w-0 items-center gap-space-md rounded-xl border border-surface-container bg-surface-container-low p-space-md"}>
<div className={"relative"}>
<div className={"w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-primary font-headline-sm text-headline-sm font-bold"}>
            {seniorInitials}
          </div>
<span className={"absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-secondary-fixed-dim ring-2 ring-surface-container-low"}></span>
</div>
<div className={"flex min-w-0 flex-col gap-1"}>
<div className={"flex min-w-0 flex-wrap items-center gap-space-xs"}>
<span className={"break-words font-headline-sm text-headline-sm text-on-surface font-semibold"}>{seniorName}</span>
<span className={"rounded-full bg-white px-2 py-1 font-label-sm text-label-sm text-secondary"}>{seniorProfile.name ? "Linked" : "Not linked"}</span>
</div>
<div className={"flex flex-wrap items-center gap-x-space-sm gap-y-1 text-on-surface-variant font-body-sm text-body-sm"}>
<span>ID: <strong className={"font-label-sm text-label-sm text-on-surface font-semibold"}>{seniorProfile.linkingCode || "Not linked"}</strong></span>
<span className={"flex items-center gap-1 text-secondary font-medium"}>
<span className={"material-symbols-outlined text-[16px]"}>sensors</span>
              Dispenser Synced
            </span>
</div>
</div>
</div>

<div className={"grid grid-cols-1 gap-space-sm sm:grid-cols-3"}>
<div className={"flex min-w-0 items-center gap-space-sm rounded-xl border border-surface-container bg-surface-container-lowest px-space-sm py-space-md"}>
<span className={"material-symbols-outlined text-secondary text-[20px]"}>battery_charging_90</span>
<div className={"flex flex-col"}>
<span className={"font-label-sm text-label-sm text-on-surface-variant leading-none"}>Smart Hub</span>
<span className={"font-label-md text-label-md text-on-surface leading-tight font-bold"}>92% • Online</span>
</div>
</div>
<div className={"flex min-w-0 items-center gap-space-sm rounded-xl border border-surface-container bg-surface-container-lowest px-space-sm py-space-md"}>
<span className={"material-symbols-outlined text-primary text-[20px]"}>ecg_heart</span>
<div className={"flex flex-col"}>
<span className={"font-label-sm text-label-sm text-on-surface-variant leading-none"}>Resting Pulse</span>
<span className={"font-label-md text-label-md text-on-surface leading-tight font-bold"}>71 bpm</span>
</div>
</div>
<div className={"flex min-w-0 items-center gap-space-sm rounded-xl border border-surface-container bg-surface-container-lowest px-space-sm py-space-md"}>
<span className={"material-symbols-outlined text-secondary text-[20px]"}>verified</span>
<div className={"flex flex-col"}>
<span className={"font-label-sm text-label-sm text-on-surface-variant leading-none"}>Daily Adherence</span>
<span className={"font-label-md text-label-md text-on-surface leading-tight font-bold"}>80% on-track</span>
</div>
</div>
</div>
</div>
</div>

<div className={"relative overflow-hidden rounded-xl bg-error-container/25 p-space-md shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md"}>
<div className={"flex items-start md:items-center gap-space-md"}>
<div className={"w-12 h-12 rounded-xl bg-error-container flex items-center justify-center shrink-0"}>
<span className={"material-symbols-outlined text-error text-[24px]"}>crisis_alert</span>
</div>
<div className={"flex flex-col"}>
<div className={"flex items-center gap-space-xs"}>
<span className={"font-label-sm text-label-sm uppercase font-bold tracking-wider text-error"}>Prescription Warning</span>
<span className={"w-1.5 h-1.5 rounded-full bg-error"}></span>
<span className={"font-label-sm text-label-sm text-on-surface-variant"}>Pharmacy Sync: CVS Caremark #4192</span>
</div>
<p className={"font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5"}>
          Metformin (500mg) has only 5 doses remaining in smart canister.
        </p>
<p className={"font-body-sm text-body-sm text-on-surface-variant"}>
          Auto-refill window opens today to prevent gap in schedule before Sunday, Oct 29.
        </p>
</div>
</div>
<div className={"flex items-center gap-space-sm shrink-0 self-end md:self-center"}>
<button className={"min-h-[48px] px-space-lg rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container hover:shadow-md transition-all flex items-center gap-space-xs"}>
<span className={"material-symbols-outlined text-[20px]"}>local_pharmacy</span>
<span className={""}>Review Refills</span>
</button>
</div>
</div>

<div className={"flex flex-col gap-space-sm"}>
<div className={"flex items-center justify-between"}>
<div>
<h2 className={"font-headline-md text-headline-md text-primary tracking-tight"}>Today's Medication Regimen</h2>
<p className={"font-body-md text-body-md text-on-surface-variant"}>3 recorded, 1 scheduled for tonight, 1 requires immediate caregiver verification.</p>
</div>
<span className={"font-label-md text-label-md text-secondary font-semibold bg-surface-container-low px-3 py-1.5 rounded-lg hidden sm:inline-flex items-center gap-1.5"}>
<span className={"material-symbols-outlined text-[18px]"}>verified</span>
        Dispenser Timestamp Verified
      </span>
</div>
<div className={"grid grid-cols-1 md:grid-cols-3 gap-space-md"}>

<div className={"flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all"}>
<div className={"flex flex-col gap-space-md"}>
<div className={"flex items-center justify-between"}>
<div className={"flex items-center gap-space-xs"}>
<div className={"w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container"}>
<span className={"material-symbols-outlined text-[24px]"}>task_alt</span>
</div>
<span className={"font-headline-sm text-headline-sm text-on-surface font-semibold"}>Taken</span>
</div>
<span className={"px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md font-bold"}>
              3 Doses
            </span>
</div>

<div className={"flex flex-col gap-space-sm pt-space-xs"}>
<div className={"p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-0.5"}>
<div className={"flex items-center justify-between"}>
<span className={"font-label-md text-label-md text-primary font-semibold"}>Metformin 500mg</span>
<span className={"font-label-sm text-label-sm text-secondary font-bold"}>8:12 AM</span>
</div>
<p className={"font-body-sm text-body-sm text-on-surface-variant"}>Morning pill • Confirmed via smart dispenser</p>
</div>
<div className={"p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-0.5"}>
<div className={"flex items-center justify-between"}>
<span className={"font-label-md text-label-md text-primary font-semibold"}>Lisinopril 10mg</span>
<span className={"font-label-sm text-label-sm text-secondary font-bold"}>8:12 AM</span>
</div>
<p className={"font-body-sm text-body-sm text-on-surface-variant"}>Blood pressure • Dispensed with meal</p>
</div>
<div className={"p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-0.5"}>
<div className={"flex items-center justify-between"}>
<span className={"font-label-md text-label-md text-primary font-semibold"}>Vitamin D3 2000 IU</span>
<span className={"font-label-sm text-label-sm text-secondary font-bold"}>12:30 PM</span>
</div>
<p className={"font-body-sm text-body-sm text-on-surface-variant"}>Midday supplement • Confirmed by {seniorName}</p>
</div>
</div>
</div>
<div className={"pt-space-md flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm"}>
<span className={"flex items-center gap-1 text-secondary"}>
<span className={"material-symbols-outlined text-[16px]"}>check_circle</span>
            All morning doses logged
          </span>
<span className={"font-medium"}>100% Morning Adherence</span>
</div>
</div>

<div className={"flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all"}>
<div className={"flex flex-col gap-space-md"}>
<div className={"flex items-center justify-between"}>
<div className={"flex items-center gap-space-xs"}>
<div className={"w-10 h-10 rounded-lg bg-error-container flex items-center justify-center text-error"}>
<span className={"material-symbols-outlined text-[24px]"}>schedule_send</span>
</div>
<span className={"font-headline-sm text-headline-sm text-on-surface font-semibold"}>Overdue</span>
</div>
<span className={"px-3 py-1 rounded-full bg-error-container text-on-error-container font-label-md text-label-md font-bold"}>
              1 Dose Alert
            </span>
</div>

<div className={"flex flex-col gap-space-sm pt-space-xs"}>
<div className={"p-space-md rounded-xl bg-error-container/20 flex flex-col gap-space-xs"}>
<div className={"flex items-center justify-between"}>
<div className={"flex items-center gap-1.5"}>
<span className={"material-symbols-outlined text-error text-[18px]"}>emergency</span>
<span className={"font-label-lg text-label-lg text-on-surface font-bold"}>Latanoprost Eye Drops</span>
</div>
<span className={"px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold"}>45m Overdue</span>
</div>
<p className={"font-body-md text-body-md text-on-surface-variant"}>
                Scheduled for <strong>2:00 PM</strong>. Bottle accelerometer did not detect movement. {seniorName} has not checked off physical tray.
              </p>
</div>
<div className={"p-space-sm rounded-lg bg-surface-container-low flex items-center gap-space-sm"}>
<span className={"material-symbols-outlined text-secondary text-[20px]"}>phone_in_talk</span>
<p className={"font-body-sm text-body-sm text-on-surface-variant"}>
                Direct phone reminder has not been triggered yet.
              </p>
</div>
</div>
</div>
<div className={"pt-space-md flex flex-col gap-space-xs"}>
<button className={"min-h-[48px] w-full px-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-all flex items-center justify-center gap-space-xs"} id={"resolve-overdue-btn"} data-action={"resolveOverdueDose()"}>
<span className={"material-symbols-outlined text-[20px]"}>done_all</span>
<span className={""}>Confirm Taken with {seniorName}</span>
</button>
</div>
</div>

<div className={"flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all"}>
<div className={"flex flex-col gap-space-md"}>
<div className={"flex items-center justify-between"}>
<div className={"flex items-center gap-space-xs"}>
<div className={"w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center text-primary"}>
<span className={"material-symbols-outlined text-[24px]"}>nightlight</span>
</div>
<span className={"font-headline-sm text-headline-sm text-on-surface font-semibold"}>Pending</span>
</div>
<span className={"px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-bold"}>
              1 Dose Tonight
            </span>
</div>

<div className={"flex flex-col gap-space-sm pt-space-xs"}>
<div className={"p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs"}>
<div className={"flex items-center justify-between"}>
<span className={"font-label-lg text-label-lg text-primary font-bold"}>Atorvastatin 20mg</span>
<span className={"font-label-sm text-label-sm text-on-surface-variant font-semibold"}>8:00 PM Tonight</span>
</div>
<p className={"font-body-md text-body-md text-on-surface-variant"}>
                Nightly cholesterol tablet. Canister compartment #4 is loaded and pre-staged for release at 7:55 PM.
              </p>
</div>
<div className={"p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between"}>
<div className={"flex items-center gap-2"}>
<span className={"material-symbols-outlined text-secondary text-[20px]"}>volume_up</span>
<span className={"font-body-sm text-body-sm text-on-surface"}>Audio chime active</span>
</div>
<span className={"font-label-sm text-label-sm text-secondary font-bold"}>Armed</span>
</div>
</div>
</div>
<div className={"pt-space-md flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm"}>
<span className={"flex items-center gap-1"}>
<span className={"material-symbols-outlined text-[16px] text-primary"}>alarm</span>
            Auto-dispense in 4h 15m
          </span>
<a className={"text-secondary font-label-sm text-label-sm font-semibold hover:underline"} href={"#"}>Adjust Time</a>
</div>
</div>
</div>
</div>

<div className={"grid grid-cols-1 lg:grid-cols-12 gap-space-lg"}>


<div className={"flex flex-col gap-space-md lg:col-span-12"}>
<div className={"flex items-center justify-between"}>
<h2 className={"font-headline-md text-headline-md text-primary tracking-tight"}>Recent Activity Feed</h2>
<button className={"font-label-sm text-label-sm text-secondary font-semibold hover:underline flex items-center gap-1"}>
<span className={""}>Mark all read</span>
<span className={"material-symbols-outlined text-[16px]"}>done_all</span>
</button>
</div>
<div className={"rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-md"}>

<div className={"flex items-start gap-space-md p-space-sm rounded-xl bg-error-container/20 transition-colors"}>
<div className={"w-10 h-10 rounded-xl bg-error-container flex items-center justify-center text-error shrink-0"}>
<span className={"material-symbols-outlined text-[20px]"}>notification_important</span>
</div>
<div className={"flex flex-col flex-1 min-w-0"}>
<div className={"flex items-center justify-between gap-space-xs"}>
<span className={"font-label-md text-label-md text-on-surface font-bold truncate"}>Eye Drops unconfirmed</span>
<span className={"font-label-sm text-label-sm text-error font-semibold shrink-0"}>45m ago</span>
</div>
<p className={"font-body-sm text-body-sm text-on-surface-variant mt-0.5"}>
              Scheduled 2:00 PM dose of Latanoprost has not registered sensor closure.
            </p>
<div className={"mt-space-xs flex items-center gap-space-sm"}>
<button className={"font-label-sm text-label-sm text-error hover:underline font-bold flex items-center gap-1"} data-action={"triggerSeniorNudge()"}>
<span className={"material-symbols-outlined text-[14px]"}>cell_tower</span>
                Call {seniorName}
              </button>
<span className={"text-outline-variant"}>•</span>
<button className={"font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface"} data-action={"dismissNotification(this)"}>Dismiss</button>
</div>
</div>
</div>

<div className={"flex items-start gap-space-md p-space-sm rounded-xl hover:bg-surface-container-low transition-colors"}>
<div className={"w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0"}>
<span className={"material-symbols-outlined text-[20px]"}>pill</span>
</div>
<div className={"flex flex-col flex-1 min-w-0"}>
<div className={"flex items-center justify-between gap-space-xs"}>
<span className={"font-label-md text-label-md text-on-surface font-semibold truncate"}>{seniorName} took Metformin (500mg)</span>
<span className={"font-label-sm text-label-sm text-on-surface-variant shrink-0"}>8:12 AM</span>
</div>
<p className={"font-body-sm text-body-sm text-on-surface-variant mt-0.5"}>
              Dispenser slot #1 opened and closed. Smart cup confirmed water consumed.
            </p>
</div>
</div>

<div className={"flex items-start gap-space-md p-space-sm rounded-xl hover:bg-surface-container-low transition-colors"}>
<div className={"w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0"}>
<span className={"material-symbols-outlined text-[20px]"}>check_circle</span>
</div>
<div className={"flex flex-col flex-1 min-w-0"}>
<div className={"flex items-center justify-between gap-space-xs"}>
<span className={"font-label-md text-label-md text-on-surface font-semibold truncate"}>{seniorName} took Lisinopril (10mg)</span>
<span className={"font-label-sm text-label-sm text-on-surface-variant shrink-0"}>8:12 AM</span>
</div>
<p className={"font-body-sm text-body-sm text-on-surface-variant mt-0.5"}>
              Blood pressure maintenance dose recorded on schedule.
            </p>
</div>
</div>

<div className={"flex items-start gap-space-md p-space-sm rounded-xl bg-surface-container-low transition-colors"}>
<div className={"w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center text-primary shrink-0"}>
<span className={"material-symbols-outlined text-[20px]"}>shopping_cart</span>
</div>
<div className={"flex flex-col flex-1 min-w-0"}>
<div className={"flex items-center justify-between gap-space-xs"}>
<span className={"font-label-md text-label-md text-on-surface font-semibold truncate"}>Amlodipine refill needed</span>
<span className={"font-label-sm text-label-sm text-secondary font-bold shrink-0"}>In 4 days</span>
</div>
<p className={"font-body-sm text-body-sm text-on-surface-variant mt-0.5"}>
              Remaining stock is 8 tablets. Auto-prescription transfer is ready for Walgreens.
            </p>
<div className={"mt-space-xs"}>
<a className={"font-label-sm text-label-sm text-secondary font-semibold hover:underline"} href={"#"}>Approve Refill Request →</a>
</div>
</div>
</div>

<div className={"flex items-start gap-space-md p-space-sm rounded-xl hover:bg-surface-container-low transition-colors"}>
<div className={"w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0"}>
<span className={"material-symbols-outlined text-[20px]"}>cloud_done</span>
</div>
<div className={"flex flex-col flex-1 min-w-0"}>
<div className={"flex items-center justify-between gap-space-xs"}>
<span className={"font-label-md text-label-md text-on-surface font-semibold truncate"}>SmartHub Firmware Synced</span>
<span className={"font-label-sm text-label-sm text-on-surface-variant shrink-0"}>04:00 AM</span>
</div>
<p className={"font-body-sm text-body-sm text-on-surface-variant mt-0.5"}>
              Automated diagnostic completed. All 6 medication chambers verified functional.
            </p>
</div>
</div>
<div className={"pt-space-xs"}>
<button className={"w-full min-h-[48px] rounded-xl bg-surface-container-low text-primary font-label-md text-label-md hover:bg-surface-container transition-all flex items-center justify-center gap-space-xs"}>
<span className={"material-symbols-outlined text-[18px]"}>history</span>
<span className={""}>View Full 30-Day Activity History</span>
</button>
</div>
</div>
</div>
</div>

<div className={"rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md"}>
<div className={"flex items-center gap-space-md"}>
<div className={"w-12 h-12 rounded-xl bg-surface-variant flex items-center justify-center text-primary"}>
<span className={"material-symbols-outlined text-[24px]"}>contact_support</span>
</div>
<div>
<h4 className={"font-headline-sm text-headline-sm text-primary font-semibold"}>Need caregiver support or have telemetry questions?</h4>
<p className={"font-body-sm text-body-sm text-on-surface-variant"}>The MediBridge Clinical Concierge is available 24/7 for dosage adjustments and logistics support.</p>
</div>
</div>
<div className={"flex items-center gap-space-sm shrink-0"}>
<a className={"min-h-[48px] px-space-md rounded-xl bg-surface-container-low text-primary font-label-md text-label-md hover:bg-surface-container transition-all flex items-center gap-space-xs"} href={"tel:18005550199"}>
<span className={"material-symbols-outlined text-[18px]"}>call</span>
<span className={""}>Call Helpline</span>
</a>
<button className={"min-h-[48px] px-space-md rounded-xl bg-secondary text-on-secondary font-label-md text-label-md hover:opacity-90 shadow-sm transition-all flex items-center gap-space-xs"}>
<span className={"material-symbols-outlined text-[18px]"}>forum</span>
<span className={""}>Live Care Chat</span>
</button>
</div>
</div>
</div>
    </div>
  );
}
