import React from "react";
import { handlePageAction, handlePageSubmit } from "../pageActions";

export default function Appointments({ seniorProfile }) {
  const seniorName = seniorProfile.name || "Linked senior";

  return (
    <div className="page-content" onClick={handlePageAction} onSubmit={handlePageSubmit}>
      <div className={"flex flex-col w-full"}>

<div className={"flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg mb-space-xl"}>
<div className={"flex flex-col gap-space-xs"}>
<div className={"flex items-center gap-space-sm"}>
<span className={"px-space-sm py-0.5 rounded-full bg-surface-container-high text-on-primary-fixed-variant font-label-sm text-label-sm uppercase tracking-wider font-semibold"}>Caregiver Schedule</span>
<span className={"inline-flex items-center gap-1.5 text-secondary font-label-sm text-label-sm"}>
<span className={"w-2 h-2 rounded-full bg-secondary animate-pulse"}></span>
          Synched with Senior Tablet
        </span>
</div>
<h1 className={"font-headline-lg text-headline-lg text-primary tracking-tight"}>
        Doctor Appointments & Reminders
      </h1>
<p className={"font-body-md text-body-md text-on-surface-variant"}>
        Coordinating clinical consults, routine follow-ups, and caretaker prep for <span className={"text-on-surface font-semibold"}>{seniorName}</span>.
      </p>
</div>
<div className={"flex items-center gap-space-md flex-wrap"}>
<button className={"min-h-[48px] px-space-md py-2.5 rounded-xl bg-surface-container-low text-primary hover:bg-surface-container transition-all flex items-center gap-space-xs font-label-md text-label-md"} data-action={"document.getElementById('syncToast').classList.remove('hidden'); setTimeout(()=>document.getElementById('syncToast').classList.add('hidden'), 3500)"}>
<span className={"material-symbols-outlined text-[20px] text-secondary"}>sync</span>
<span>Sync Calendar</span>
</button>
<button className={"min-h-[48px] px-space-lg py-2.5 rounded-xl bg-secondary text-on-secondary shadow-md hover:shadow-xl hover:opacity-95 transition-all flex items-center gap-space-xs font-label-lg text-label-lg active:scale-95"} data-action={"openModal()"}>
<span className={"material-symbols-outlined text-[22px]"}>add_circle</span>
<span>+ Add New Appointment</span>
</button>
</div>
</div>

<div className={"hidden fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-space-lg py-space-md rounded-2xl shadow-xl flex items-center gap-space-md transition-all"} id={"syncToast"}>
<span className={"material-symbols-outlined text-secondary-fixed"}>check_circle</span>
<div>
<p className={"font-label-md text-label-md"}>Schedule Synced</p>
<p className={"font-body-sm text-body-sm text-surface-container-high"}>Senior tablet chime updated & SMS alerts refreshed.</p>
</div>
<button className={"ml-2 text-surface-variant hover:text-on-primary"} data-action={"this.parentElement.classList.add('hidden')"}>
<span className={"material-symbols-outlined text-[18px]"}>close</span>
</button>
</div>

<div className={"mb-space-lg flex flex-col items-start gap-space-md border-b-0 pb-space-sm xl:flex-row xl:items-center xl:justify-between"}>
<div className={"inline-flex flex-wrap gap-1 rounded-2xl bg-surface-container-low p-1.5 shadow-sm"} role={"tablist"}>
<button className={"px-space-md py-2.5 rounded-xl bg-surface-container font-label-md text-label-md text-primary shadow-sm flex items-center gap-space-xs transition-all"} id={"tab-upcoming"} data-action={"switchTab('upcoming')"}>
<span className={"material-symbols-outlined text-[18px]"}>event_available</span>
<span>Upcoming Appointments</span>
<span className={"ml-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm"}>2</span>
</button>
<button className={"px-space-md py-2.5 rounded-xl font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high flex items-center gap-space-xs transition-all"} id={"tab-past"} data-action={"switchTab('past')"}>
<span className={"material-symbols-outlined text-[18px]"}>history</span>
<span>Past Appointments</span>
<span className={"ml-1 px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm"}>6</span>
</button>
<button className={"px-space-md py-2.5 rounded-xl font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high flex items-center gap-space-xs transition-all"} id={"tab-summaries"} data-action={"switchTab('summaries')"}>
<span className={"material-symbols-outlined text-[18px]"}>clinical_notes</span>
<span>Clinical Summaries</span>
</button>
</div>

<div className={"flex flex-wrap items-center gap-space-md rounded-2xl bg-surface-container-lowest px-space-md py-2 shadow-sm"}>
<div className={"flex items-center gap-2"}>
<span className={"material-symbols-outlined text-secondary text-[20px]"}>directions_car</span>
<span className={"font-body-sm text-body-sm text-on-surface-variant"}>Rides Secured</span>
<strong className={"rounded-full bg-surface-container px-2.5 py-1 font-label-md text-label-md text-primary"}>2 of 2</strong>
</div>
<div className={"w-1 h-4 rounded-full bg-surface-container-high"}></div>
<div className={"flex items-center gap-2"}>
<span className={"material-symbols-outlined text-secondary text-[20px]"}>notifications_active</span>
<span className={"font-body-sm text-body-sm text-on-surface-variant"}>Reminders: <strong className={"text-on-surface"}>Active</strong></span>
</div>
</div>
</div>

<div className={"flex flex-col gap-space-xl"} id={"view-upcoming"}>

<div className={"bg-surface-container-lowest rounded-2xl p-space-lg shadow-md hover:shadow-xl transition-all relative overflow-hidden"}>

<div className={"absolute top-0 left-0 right-0 h-1.5 bg-secondary"}></div>
<div className={"flex flex-col xl:flex-row gap-space-lg justify-between"}>

<div className={"flex flex-col md:flex-row gap-space-lg flex-1"}>

<div className={"flex md:flex-col items-center justify-center p-space-md rounded-2xl bg-surface-container-low min-w-[130px] self-start md:self-stretch text-center shadow-sm"}>
<span className={"font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold"}>OCTOBER</span>
<span className={"font-headline-xl text-headline-xl text-primary font-bold leading-tight"}>26</span>
<span className={"font-label-md text-label-md text-on-surface-variant"}>Thursday</span>
<div className={"mt-2 pt-2 md:w-full flex items-center justify-center gap-1 text-on-secondary-container bg-secondary-container/50 px-2 py-1 rounded-full"}>
<span className={"material-symbols-outlined text-[16px] text-secondary"}>schedule</span>
<span className={"font-label-sm text-label-sm font-semibold"}>10:30 AM</span>
</div>
</div>

<div className={"flex flex-col justify-between flex-1 gap-space-sm"}>
<div>
<div className={"flex items-center gap-space-sm flex-wrap mb-1"}>
<span className={"px-space-sm py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold flex items-center gap-1"}>
<span className={"material-symbols-outlined text-[14px]"}>alarm</span> In 2 Days
                </span>
<span className={"px-space-sm py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm"}>
                  Cardiology Follow-up
                </span>
</div>
<h2 className={"font-headline-md text-headline-md text-primary font-bold"}>
                Dr. Emily Vance, MD
              </h2>
<p className={"font-body-md text-body-md text-secondary font-semibold"}>
                Cardiologist • Cardiovascular Wellness Dept.
              </p>
</div>
<div className={"grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs"}>
<div className={"flex items-start gap-space-xs text-on-surface-variant"}>
<span className={"material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5"}>location_on</span>
<div>
<span className={"font-label-sm text-label-sm text-on-surface block font-semibold"}>St. Jude Medical Pavilion</span>
<span className={"font-body-sm text-body-sm text-on-surface-variant block"}>Suite 408, West Wing (4th Fl.)</span>
</div>
</div>
<div className={"flex items-start gap-space-xs text-on-surface-variant"}>
<span className={"material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5"}>medical_information</span>
<div>
<span className={"font-label-sm text-label-sm text-on-surface block font-semibold"}>Clinical Reason</span>
<span className={"font-body-sm text-body-sm text-on-surface-variant block"}>6-Month Hypertension & ECG Follow-up</span>
</div>
</div>
</div>
</div>
</div>

<div className={"xl:w-[380px] flex flex-col justify-between bg-surface-container-low rounded-2xl p-space-md gap-space-md shadow-sm"}>
<div>
<div className={"flex items-center justify-between mb-2"}>
<span className={"font-label-md text-label-md text-primary flex items-center gap-1.5 font-bold"}>
<span className={"material-symbols-outlined text-secondary text-[18px]"}>checklist</span>
                Caretaker Prep Checklist
              </span>
<span className={"font-label-sm text-label-sm text-secondary font-semibold"}>3 items pending</span>
</div>

<div className={"flex flex-col gap-2"}>
<label className={"flex items-start gap-space-xs p-2 rounded-xl bg-surface-container-lowest cursor-pointer hover:bg-surface-bright transition-colors"}>
<input defaultChecked={true} className={"w-5 h-5 rounded text-secondary focus:ring-secondary mt-0.5 accent-secondary"} type={"checkbox"} />
<span className={"font-body-sm text-body-sm text-on-surface"}>Bring 30-day printed blood pressure logs</span>
</label>
<label className={"flex items-start gap-space-xs p-2 rounded-xl bg-surface-container-lowest cursor-pointer hover:bg-surface-bright transition-colors"}>
<input className={"w-5 h-5 rounded text-secondary focus:ring-secondary mt-0.5 accent-secondary"} type={"checkbox"} />
<span className={"font-body-sm text-body-sm text-on-surface font-medium text-error"}>2-hr fasting for lipid panel test</span>
</label>
<label className={"flex items-start gap-space-xs p-2 rounded-xl bg-surface-container-lowest cursor-pointer hover:bg-surface-bright transition-colors"}>
<input defaultChecked={true} className={"w-5 h-5 rounded text-secondary focus:ring-secondary mt-0.5 accent-secondary"} type={"checkbox"} />
<span className={"font-body-sm text-body-sm text-on-surface"}>Arrange ride / Companion confirmed (a family member)</span>
</label>
</div>
</div>

<div className={"flex flex-col gap-1.5 pt-space-xs"}>
<div className={"flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm bg-surface-container-highest/60 px-space-sm py-1.5 rounded-lg"}>
<span className={"material-symbols-outlined text-secondary text-[16px]"}>sms</span>
<span>SMS Reminder scheduled 24 hours prior (Caregiver)</span>
</div>
<div className={"flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm bg-surface-container-highest/60 px-space-sm py-1.5 rounded-lg"}>
<span className={"material-symbols-outlined text-primary text-[16px]"}>tablet_mac</span>
<span>Tablet chime set for {seniorName} at 8:00 AM morning of</span>
</div>
</div>
</div>
</div>

<div className={"mt-space-lg pt-space-md flex flex-wrap items-center justify-between gap-space-sm"}>
<div className={"flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm"}>
<span className={"material-symbols-outlined text-secondary text-[18px]"}>verified</span>
<span>Insurance verified: Medicare Part B (Active)</span>
</div>
<div className={"flex items-center gap-space-sm flex-wrap"}>
<button className={"min-h-[48px] px-space-md py-2 rounded-xl bg-surface-container-low text-primary hover:bg-surface-container font-label-md text-label-md flex items-center gap-1.5 transition-all"} data-action={"openModal('Dr. Emily Vance, MD', 'Cardiologist', 'St. Jude Medical Pavilion', '2023-10-26', '10:30', '6-Month Hypertension & ECG Follow-up')"}>
<span className={"material-symbols-outlined text-[18px]"}>edit</span>
<span>Edit Details</span>
</button>
<button className={"min-h-[48px] px-space-md py-2 rounded-xl bg-surface-container-low text-primary hover:bg-surface-container font-label-md text-label-md flex items-center gap-1.5 transition-all"} data-action={"downloadCalendarInvite('Dr. Vance ECG Followup')"}>
<span className={"material-symbols-outlined text-[18px]"}>calendar_month</span>
<span>Add to Google/Apple Calendar</span>
</button>
<a className={"min-h-[48px] px-space-md py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md flex items-center gap-1.5 transition-all shadow-sm"} href={"https://maps.google.com"} rel={"noopener noreferrer"} target={"_blank"}>
<span className={"material-symbols-outlined text-[18px]"}>directions</span>
<span>Get Directions</span>
</a>
</div>
</div>
</div>

<div className={"bg-surface-container-lowest rounded-2xl p-space-lg shadow-md hover:shadow-xl transition-all relative overflow-hidden"}>

<div className={"absolute top-0 left-0 right-0 h-1.5 bg-surface-container-high"}></div>
<div className={"flex flex-col xl:flex-row gap-space-lg justify-between"}>

<div className={"flex flex-col md:flex-row gap-space-lg flex-1"}>

<div className={"flex md:flex-col items-center justify-center p-space-md rounded-2xl bg-surface-container-low min-w-[130px] self-start md:self-stretch text-center shadow-sm"}>
<span className={"font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold"}>NOVEMBER</span>
<span className={"font-headline-xl text-headline-xl text-primary font-bold leading-tight"}>14</span>
<span className={"font-label-md text-label-md text-on-surface-variant"}>Tuesday</span>
<div className={"mt-2 pt-2 md:w-full flex items-center justify-center gap-1 text-primary-container bg-surface-container px-2 py-1 rounded-full"}>
<span className={"material-symbols-outlined text-[16px] text-primary"}>schedule</span>
<span className={"font-label-sm text-label-sm font-semibold"}>2:00 PM EST</span>
</div>
</div>

<div className={"flex flex-col justify-between flex-1 gap-space-sm"}>
<div>
<div className={"flex items-center gap-space-sm flex-wrap mb-1"}>
<span className={"px-space-sm py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-bold flex items-center gap-1"}>
<span className={"material-symbols-outlined text-[14px]"}>update</span> In 3 Weeks
                </span>
<span className={"px-space-sm py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm"}>
                  Retina & Vision Check
                </span>
</div>
<h2 className={"font-headline-md text-headline-md text-primary font-bold"}>
                Dr. Marcus Martinez, OD
              </h2>
<p className={"font-body-md text-body-md text-secondary font-semibold"}>
                Ophthalmology & Retina Specialist
              </p>
</div>
<div className={"grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs"}>
<div className={"flex items-start gap-space-xs text-on-surface-variant"}>
<span className={"material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5"}>location_on</span>
<div>
<span className={"font-label-sm text-label-sm text-on-surface block font-semibold"}>Oakridge Eye Care Clinic</span>
<span className={"font-body-sm text-body-sm text-on-surface-variant block"}>Building B, Ground Floor Suite 12</span>
</div>
</div>
<div className={"flex items-start gap-space-xs text-on-surface-variant"}>
<span className={"material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5"}>visibility</span>
<div>
<span className={"font-label-sm text-label-sm text-on-surface block font-semibold"}>Clinical Reason</span>
<span className={"font-body-sm text-body-sm text-on-surface-variant block"}>Annual Glaucoma Pressure Check & Vision Screening</span>
</div>
</div>
</div>
</div>
</div>

<div className={"xl:w-[380px] flex flex-col justify-between bg-surface-container-low rounded-2xl p-space-md gap-space-md shadow-sm"}>
<div>
<div className={"flex items-center justify-between mb-2"}>
<span className={"font-label-md text-label-md text-primary flex items-center gap-1.5 font-bold"}>
<span className={"material-symbols-outlined text-secondary text-[18px]"}>commute</span>
                Transit & Assistance
              </span>
<span className={"font-label-sm text-label-sm text-secondary font-semibold"}>Confirmed</span>
</div>
<div className={"p-space-sm rounded-xl bg-surface-container-lowest flex flex-col gap-2"}>
<div className={"flex items-center justify-between"}>
<div className={"flex items-center gap-2"}>
<span className={"material-symbols-outlined text-secondary text-[20px]"}>local_taxi</span>
<span className={"font-body-sm text-body-sm text-on-surface font-semibold"}>Caregiver Ride Assist</span>
</div>
<span className={"font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container"}>Booked</span>
</div>
<p className={"font-body-sm text-body-sm text-on-surface-variant"}>
                Round-trip transit synced with MedRide shuttle. Pick-up at 1:15 PM from Residence.
              </p>
</div>
</div>

<div className={"p-space-sm rounded-xl bg-surface-container-highest/50 flex items-center gap-space-sm"}>
<span className={"material-symbols-outlined text-secondary text-[22px]"}>notifications_active</span>
<div>
<span className={"font-label-sm text-label-sm text-on-surface font-semibold block"}>Automated Ride Reminder Enabled</span>
<span className={"font-body-sm text-body-sm text-on-surface-variant block"}>Tablet will announce 45 mins prior to departure.</span>
</div>
</div>
</div>
</div>

<div className={"mt-space-lg pt-space-md flex flex-wrap items-center justify-between gap-space-sm"}>
<div className={"flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm"}>
<span className={"material-symbols-outlined text-outline text-[18px]"}>info</span>
<span>Pupil dilation expected; {seniorName} cannot drive post-visit</span>
</div>
<div className={"flex items-center gap-space-sm flex-wrap"}>
<button className={"min-h-[48px] px-space-md py-2 rounded-xl bg-surface-container-low text-primary hover:bg-surface-container font-label-md text-label-md flex items-center gap-1.5 transition-all"} data-action={"openModal('Dr. Marcus Martinez, OD', 'Ophthalmology', 'Oakridge Eye Care Clinic', '2023-11-14', '14:00', 'Annual Glaucoma Pressure Check & Vision Screening')"}>
<span className={"material-symbols-outlined text-[18px]"}>edit</span>
<span>Edit Details</span>
</button>
<button className={"min-h-[48px] px-space-md py-2 rounded-xl bg-surface-container-low text-secondary hover:bg-surface-container font-label-md text-label-md flex items-center gap-1.5 transition-all"} data-action={"openRescheduleModal('Dr. Marcus Martinez, OD')"}>
<span className={"material-symbols-outlined text-[18px]"}>update</span>
<span>Reschedule</span>
</button>
<a className={"min-h-[48px] px-space-md py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md flex items-center gap-1.5 transition-all shadow-sm"} href={"https://maps.google.com"} rel={"noopener noreferrer"} target={"_blank"}>
<span className={"material-symbols-outlined text-[18px]"}>directions</span>
<span>Directions</span>
</a>
</div>
</div>
</div>
</div>

<div className={"hidden flex flex-col gap-space-md"} id={"view-past"}>
<div className={"p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md"}>
<div className={"flex items-center gap-space-md"}>
<div className={"w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary"}>
<span className={"material-symbols-outlined text-[24px]"}>done_all</span>
</div>
<div>
<h3 className={"font-headline-sm text-headline-sm text-primary"}>Dr. Robert Chen, MD — Primary Care General Physical</h3>
<p className={"font-body-sm text-body-sm text-on-surface-variant"}>Completed Sep 18, 2023 at Memorial Polyclinic • Bloodwork, ECG, Vitals normal</p>
</div>
</div>
<button className={"min-h-[48px] px-space-md py-2 rounded-xl bg-surface-container-low text-primary font-label-md text-label-md hover:bg-surface-container flex items-center gap-1"}>
<span className={"material-symbols-outlined text-[18px]"}>description</span>
<span>View Summary</span>
</button>
</div>
<div className={"p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md"}>
<div className={"flex items-center gap-space-md"}>
<div className={"w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary"}>
<span className={"material-symbols-outlined text-[24px]"}>done_all</span>
</div>
<div>
<h3 className={"font-headline-sm text-headline-sm text-primary"}>Audiology Baseline — Audiology Specialist</h3>
<p className={"font-body-sm text-body-sm text-on-surface-variant"}>Completed Jul 04, 2023 • Hearing aid calibration complete</p>
</div>
</div>
<button className={"min-h-[48px] px-space-md py-2 rounded-xl bg-surface-container-low text-primary font-label-md text-label-md flex items-center gap-1"}>
<span className={"material-symbols-outlined text-[18px]"}>description</span>
<span>View Summary</span>
</button>
</div>
</div>

<div className={"hidden flex flex-col gap-space-md"} id={"view-summaries"}>
<div className={"bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md"}>
<div className={"flex items-center justify-between"}>
<div className={"flex items-center gap-2"}>
<span className={"material-symbols-outlined text-secondary text-[24px]"}>folder_shared</span>
<h3 className={"font-headline-sm text-headline-sm text-primary"}>Archived Post-Visit Summaries</h3>
</div>
<span className={"font-label-sm text-label-sm text-on-surface-variant"}>6 Clinical Documents Found</span>
</div>
<p className={"font-body-md text-body-md text-on-surface-variant"}>
        Care notes, discharge instructions, and doctor-approved prescriptions synchronized directly from Saint Jude & Memorial Health portals.
      </p>
<div className={"grid grid-cols-1 md:grid-cols-2 gap-space-md mt-2"}>
<div className={"p-space-md rounded-xl bg-surface-container-low flex items-center justify-between"}>
<div>
<p className={"font-label-md text-label-md text-on-surface font-semibold"}>Cardiology ECG Report - Oct 2023</p>
<p className={"font-body-sm text-body-sm text-on-surface-variant"}>PDF • 2.4 MB • Signed by Dr. Emily Vance</p>
</div>
<button className={"p-2 text-primary hover:bg-surface-container rounded-lg"}>
<span className={"material-symbols-outlined"}>download</span>
</button>
</div>
<div className={"p-space-md rounded-xl bg-surface-container-low flex items-center justify-between"}>
<div>
<p className={"font-label-md text-label-md text-on-surface font-semibold"}>Comprehensive Metabolic Panel (CMP)</p>
<p className={"font-body-sm text-body-sm text-on-surface-variant"}>PDF • 1.1 MB • Quest Diagnostics</p>
</div>
<button className={"p-2 text-primary hover:bg-surface-container rounded-lg"}>
<span className={"material-symbols-outlined"}>download</span>
</button>
</div>
</div>
</div>
</div>

<div className={"fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/40 backdrop-blur-sm hidden"} id={"appointmentModal"}>
<div className={"bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[921px]"}>

<div className={"p-space-lg bg-surface-container-low flex items-center justify-between"}>
<div className={"flex items-center gap-space-sm"}>
<div className={"w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-on-secondary"}>
<span className={"material-symbols-outlined text-[22px]"}>calendar_add_on</span>
</div>
<div>
<h3 className={"font-headline-sm text-headline-sm text-primary font-bold"} id={"modalTitle"}>Schedule New Appointment</h3>
<p className={"font-body-sm text-body-sm text-on-surface-variant"}>Configure consultation details, clinic site, and automatic senior alerts.</p>
</div>
</div>
<button className={"w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant"} data-action={"closeModal()"}>
<span className={"material-symbols-outlined"}>close</span>
</button>
</div>

<form className={"p-space-lg overflow-y-auto flex flex-col gap-space-md"} id={"appointmentForm"} data-submit-action={"handleFormSubmit(event)"}>

<div className={"grid grid-cols-1 md:grid-cols-2 gap-space-md"}>
<div className={"flex flex-col gap-1.5"}>
<label className={"font-label-md text-label-md text-primary font-semibold flex items-center gap-1"}>
<span>Doctor Name</span>
<span className={"text-error"}>*</span>
</label>
<input className={"min-h-[48px] px-space-md py-2 rounded-xl bg-surface-bright text-on-surface font-body-md text-body-md shadow-sm outline-none focus:bg-surface-container-lowest"} id={"inputDoctor"} placeholder={"e.g. Dr. Emily Vance, MD"} required={""} type={"text"} />
</div>
<div className={"flex flex-col gap-1.5"}>
<label className={"font-label-md text-label-md text-primary font-semibold flex items-center gap-1"}>
<span>Specialty / Dept</span>
<span className={"text-error"}>*</span>
</label>
<input className={"min-h-[48px] px-space-md py-2 rounded-xl bg-surface-bright text-on-surface font-body-md text-body-md shadow-sm outline-none focus:bg-surface-container-lowest"} id={"inputSpecialty"} placeholder={"e.g. Cardiology, Optometry"} required={""} type={"text"} />
</div>
</div>

<div className={"flex flex-col gap-1.5"}>
<label className={"font-label-md text-label-md text-primary font-semibold flex items-center gap-1"}>
<span>Clinic / Hospital Name & Suite</span>
<span className={"text-error"}>*</span>
</label>
<input className={"min-h-[48px] px-space-md py-2 rounded-xl bg-surface-bright text-on-surface font-body-md text-body-md shadow-sm outline-none focus:bg-surface-container-lowest"} id={"inputClinic"} placeholder={"e.g. St. Jude Medical Pavilion, Suite 408"} required={""} type={"text"} />
</div>

<div className={"grid grid-cols-1 md:grid-cols-2 gap-space-md"}>
<div className={"flex flex-col gap-1.5"}>
<label className={"font-label-md text-label-md text-primary font-semibold flex items-center gap-1"}>
<span>Date</span>
<span className={"text-error"}>*</span>
</label>
<input className={"min-h-[48px] px-space-md py-2 rounded-xl bg-surface-bright text-on-surface font-body-md text-body-md shadow-sm outline-none focus:bg-surface-container-lowest"} id={"inputDate"} required={""} type={"date"} />
</div>
<div className={"flex flex-col gap-1.5"}>
<label className={"font-label-md text-label-md text-primary font-semibold flex items-center gap-1"}>
<span>Time</span>
<span className={"text-error"}>*</span>
</label>
<input className={"min-h-[48px] px-space-md py-2 rounded-xl bg-surface-bright text-on-surface font-body-md text-body-md shadow-sm outline-none focus:bg-surface-container-lowest"} id={"inputTime"} required={""} type={"time"} />
</div>
</div>

<div className={"flex flex-col gap-1.5"}>
<label className={"font-label-md text-label-md text-primary font-semibold flex items-center gap-1"}>
<span>Clinical Reason & Preparation Notes</span>
</label>
<textarea className={"p-space-md rounded-xl bg-surface-bright text-on-surface font-body-md text-body-md shadow-sm outline-none focus:bg-surface-container-lowest resize-none"} id={"inputReason"} placeholder={"e.g. 6-Month Hypertension & ECG Follow-up. Bring blood pressure logs."} rows={"3"}></textarea>
</div>

<div className={"p-space-md rounded-2xl bg-surface-container-low flex flex-col gap-space-sm mt-1"}>
<div className={"flex items-center justify-between min-h-[48px]"}>
<div className={"flex items-center gap-space-sm"}>
<div className={"w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary"}>
<span className={"material-symbols-outlined text-[20px]"}>directions_car</span>
</div>
<div>
<span className={"font-label-md text-label-md text-on-surface block font-semibold"}>Transportation Assistance</span>
<span className={"font-body-sm text-body-sm text-on-surface-variant block"}>Schedule caregiver or shuttle ride coordinator</span>
</div>
</div>
<label className={"relative inline-flex items-center cursor-pointer min-h-[48px] min-w-[48px] justify-center"}>
<input defaultChecked={true} className={"sr-only peer"} id={"toggleTransit"} type={"checkbox"} />
<div className={"w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-on-primary after:content-[''] after:absolute after:top-[14px] after:left-[4px] after:bg-on-primary after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"}></div>
</label>
</div>
<div className={"flex items-center justify-between min-h-[48px]"}>
<div className={"flex items-center gap-space-sm"}>
<div className={"w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary"}>
<span className={"material-symbols-outlined text-[20px]"}>tablet</span>
</div>
<div>
<span className={"font-label-md text-label-md text-on-surface block font-semibold"}>Notify {seniorName} on Tablet</span>
<span className={"font-body-sm text-body-sm text-on-surface-variant block"}>Play friendly audio chime & prompt on senior home screen</span>
</div>
</div>
<label className={"relative inline-flex items-center cursor-pointer min-h-[48px] min-w-[48px] justify-center"}>
<input defaultChecked={true} className={"sr-only peer"} id={"toggleNotify"} type={"checkbox"} />
<div className={"w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-on-primary after:content-[''] after:absolute after:top-[14px] after:left-[4px] after:bg-on-primary after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"}></div>
</label>
</div>
</div>

<div className={"flex items-center justify-end gap-space-sm pt-space-sm"}>
<button className={"min-h-[48px] px-space-lg py-2.5 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container transition-all"} data-action={"closeModal()"} type={"button"}>
            Cancel
          </button>
<button className={"min-h-[48px] px-space-lg py-2.5 rounded-xl bg-secondary text-on-secondary font-label-lg text-label-lg shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"} type={"submit"}>
<span className={"material-symbols-outlined text-[20px]"}>save</span>
<span>Save Appointment</span>
</button>
</div>
</form>
</div>
</div>

<div className={"fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/40 backdrop-blur-sm hidden"} id={"rescheduleModal"}>
<div className={"bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-xl p-space-lg flex flex-col gap-space-md"}>
<div className={"flex items-center gap-space-sm text-primary"}>
<span className={"material-symbols-outlined text-secondary text-[28px]"}>update</span>
<h3 className={"font-headline-sm text-headline-sm font-bold"}>Request Reschedule</h3>
</div>
<p className={"font-body-md text-body-md text-on-surface-variant"} id={"rescheduleDoctorNotice"}>
        Contacting Oakridge Eye Care Clinic to identify alternate dates for {seniorName}.
      </p>
<div className={"flex flex-col gap-2"}>
<label className={"font-label-sm text-label-sm text-primary font-semibold"}>Preferred Timing Range</label>
<select className={"min-h-[48px] px-space-md rounded-xl bg-surface-bright text-on-surface font-body-sm text-body-sm"}>
<option>Next available morning (after 10:00 AM)</option>
<option>Next available afternoon (2:00 PM - 4:00 PM)</option>
<option>Delay by 2 weeks</option>
</select>
</div>
<div className={"flex items-center justify-end gap-space-sm pt-2"}>
<button className={"min-h-[48px] px-space-md rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md"} data-action={"document.getElementById('rescheduleModal').classList.add('hidden')"}>
          Cancel
        </button>
<button className={"min-h-[48px] px-space-md rounded-xl bg-secondary text-on-secondary font-label-md text-label-md"} data-action={"document.getElementById('rescheduleModal').classList.add('hidden'); alert('Reschedule inquiry sent to the clinic coordinator.');"}>
          Send Request
        </button>
</div>
</div>
</div>
</div>

    </div>
  );
}
