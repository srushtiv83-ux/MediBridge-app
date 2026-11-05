import React from "react";
import { handlePageAction, handlePageSubmit } from "../pageActions";

export default function Medications({ seniorProfile }) {
  const seniorName = seniorProfile.name || "Linked senior";
  return (
    <div className="page-content" onClick={handlePageAction} onSubmit={handlePageSubmit}>
      <div className={"flex flex-col w-full"}>

<div className={"w-full mb-space-lg"}><div className={"bg-surface-container-lowest rounded-2xl p-space-md sm:p-space-lg shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-md"}><div className={"flex items-center gap-space-md"}><div className={"w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0"}><span className={"material-symbols-outlined text-[28px]"}>medication</span></div><div><div className={"flex items-center gap-space-xs"}><span className={"font-label-sm text-label-sm text-secondary font-semibold"}>{seniorName}</span><span className={"w-1.5 h-1.5 rounded-full bg-outline-variant"}></span><span className={"font-label-sm text-label-sm text-on-surface-variant"}>Today: 2 of 4 Taken</span></div><h1 className={"font-headline-lg text-headline-lg text-primary tracking-tight mt-0.5"}>Medication Schedule</h1></div></div><div className={"flex items-center gap-space-sm self-start sm:self-auto"}><div className={"inline-flex p-1 rounded-xl bg-surface-container-low"} role={"tablist"}><button className={"min-h-[48px] px-space-md rounded-lg font-label-md text-label-md transition-all flex items-center gap-space-xs bg-surface-container-lowest text-primary shadow-sm font-semibold"} id={"tab-daily"} data-action={"switchView('daily')"}><span className={"material-symbols-outlined text-[20px]"}>view_day</span><span className={""}>Daily</span></button><button className={"min-h-[48px] px-space-md rounded-lg font-label-md text-label-md transition-all flex items-center gap-space-xs text-on-surface-variant hover:text-on-surface font-semibold"} id={"tab-weekly"} data-action={"switchView('weekly')"}><span className={"material-symbols-outlined text-[20px]"}>calendar_view_week</span><span className={""}>Weekly</span></button></div><button className={"min-h-[48px] px-space-md rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors flex items-center gap-space-xs shadow-sm"} data-action={"logCustomDoseModal()"}><span className={"material-symbols-outlined text-[20px]"}>add</span><span className={""}>Log Dose</span></button></div></div></div>

<div className={"w-full mb-space-lg"}><div className={"bg-error-container/20 rounded-2xl p-space-md shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md border border-error-container"}><div className={"flex items-center gap-space-md"}><div className={"w-10 h-10 rounded-xl bg-error text-on-error flex items-center justify-center shrink-0"}><span className={"material-symbols-outlined text-[22px]"}>priority_high</span></div><div><div className={"flex items-center gap-space-xs"}><h2 className={"font-label-lg text-label-lg text-on-error-container font-bold"}>Latanoprost Eye Drops Unconfirmed</h2><span className={"font-label-sm text-label-sm bg-error text-on-error px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"}>45m Overdue</span></div><p className={"font-body-sm text-body-sm text-on-surface-variant mt-0.5"}>Scheduled for 2:00 PM • No confirmation logged on tablet.</p></div></div><div className={"flex items-center gap-space-xs shrink-0 self-end md:self-auto"}><button className={"min-h-[48px] px-space-md rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-colors font-label-md text-label-md shadow-sm flex items-center gap-space-xs"} data-action={"markDoseTaken('latanoprost')"}><span className={"material-symbols-outlined text-[18px]"}>check</span><span className={""}>Mark Taken</span></button><a className={"min-h-[48px] px-space-md rounded-xl bg-surface-container-lowest text-error hover:bg-error-container hover:text-on-error-container transition-colors font-label-md text-label-md flex items-center gap-space-xs shadow-sm"} href={"tel:18005550199"}><span className={"material-symbols-outlined text-[18px]"}>call</span><span className={""}>Call {seniorName}</span></a></div></div></div>

<div className={"grid grid-cols-1 lg:grid-cols-12 gap-space-lg w-full"}>

<div className={"lg:col-span-7 flex flex-col gap-space-lg"}>

<div className={"flex flex-col gap-space-lg"} id={"view-daily-container"}><div className={"flex flex-col gap-space-sm"}><div className={"flex items-center justify-between px-space-xs"}><div className={"flex items-center gap-space-xs"}><span className={"material-symbols-outlined text-secondary text-[22px]"}>light_mode</span><h3 className={"font-headline-sm text-headline-sm text-primary"}>Morning</h3><span className={"font-label-sm text-label-sm text-on-surface-variant font-medium"}>8:00 AM</span></div><span className={"font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-space-sm py-0.5 rounded-full font-semibold flex items-center gap-1"}><span className={"material-symbols-outlined text-[16px]"}>done_all</span> Completed</span></div><div className={"bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex items-center justify-between gap-space-md"}><div className={"flex items-center gap-space-md"}><div className={"w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0"}><span className={"material-symbols-outlined text-[22px]"}>pill</span></div><div><div className={"flex items-center gap-space-xs"}><h4 className={"font-headline-sm text-headline-sm text-primary font-bold"}>Metformin</h4><span className={"font-label-md text-label-md text-on-surface-variant"}>500mg Oral Tablet</span></div><p className={"font-body-sm text-body-sm text-on-surface-variant mt-0.5"}>Take with breakfast</p></div></div><span className={"font-label-md text-label-md bg-secondary-container text-on-secondary-container px-space-sm py-1 rounded-full font-bold flex items-center gap-1 shrink-0"}><span className={"material-symbols-outlined text-[16px]"}>check</span> Taken (8:12 AM)</span></div><div className={"bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex items-center justify-between gap-space-md"}><div className={"flex items-center gap-space-md"}><div className={"w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0"}><span className={"material-symbols-outlined text-[22px]"}>medication</span></div><div><div className={"flex items-center gap-space-xs"}><h4 className={"font-headline-sm text-headline-sm text-primary font-bold"}>Lisinopril</h4><span className={"font-label-md text-label-md text-on-surface-variant"}>10mg Oral Tablet</span></div><p className={"font-body-sm text-body-sm text-on-surface-variant mt-0.5"}>Take with a full glass of water</p></div></div><span className={"font-label-md text-label-md bg-secondary-container text-on-secondary-container px-space-sm py-1 rounded-full font-bold flex items-center gap-1 shrink-0"}><span className={"material-symbols-outlined text-[16px]"}>check</span> Taken (8:15 AM)</span></div></div><div className={"flex flex-col gap-space-sm"}><div className={"flex items-center justify-between px-space-xs"}><div className={"flex items-center gap-space-xs"}><span className={"material-symbols-outlined text-error text-[22px]"}>wb_sunny</span><h3 className={"font-headline-sm text-headline-sm text-primary"}>Afternoon</h3><span className={"font-label-sm text-label-sm text-on-surface-variant font-medium"}>2:00 PM</span></div><span className={"font-label-sm text-label-sm bg-error-container text-on-error-container px-space-sm py-0.5 rounded-full font-bold flex items-center gap-1"}><span className={"material-symbols-outlined text-[16px]"}>warning</span> 1 Overdue</span></div><div className={"bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-md border border-error-container/60"}><div className={"flex items-center gap-space-md"}><div className={"w-10 h-10 rounded-xl bg-error-container text-on-error-container flex items-center justify-center shrink-0"}><span className={"material-symbols-outlined text-[22px]"}>visibility</span></div><div><div className={"flex items-center gap-space-xs"}><h4 className={"font-headline-sm text-headline-sm text-primary font-bold"}>Latanoprost Eye Drops</h4><span className={"font-label-md text-label-md text-on-surface-variant"}>0.005% Solution</span></div><p className={"font-body-sm text-body-sm text-error font-medium mt-0.5"}>1 drop in each eye • Overdue by 45 min</p></div></div><div className={"flex items-center gap-space-xs shrink-0 self-end sm:self-auto"}><button className={"min-h-[48px] px-space-md rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm flex items-center gap-1"} data-action={"markDoseTaken('latanoprost')"}><span className={"material-symbols-outlined text-[18px]"}>check</span> Mark Taken</button><button className={"min-h-[48px] px-space-sm rounded-xl bg-surface-container-high text-primary hover:bg-surface-container-highest transition-colors font-label-md text-label-md"} data-action={"snoozeAlert()"} title={"Snooze"}><span className={"material-symbols-outlined text-[20px]"}>snooze</span></button></div></div></div><div className={"flex flex-col gap-space-sm"}><div className={"flex items-center justify-between px-space-xs"}><div className={"flex items-center gap-space-xs"}><span className={"material-symbols-outlined text-primary text-[22px]"}>nights_stay</span><h3 className={"font-headline-sm text-headline-sm text-primary"}>Evening</h3><span className={"font-label-sm text-label-sm text-on-surface-variant font-medium"}>8:00 PM</span></div><span className={"font-label-sm text-label-sm bg-surface-container text-on-surface-variant px-space-sm py-0.5 rounded-full font-semibold"}>Scheduled (in 4 hrs)</span></div><div className={"bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex items-center justify-between gap-space-md"}><div className={"flex items-center gap-space-md"}><div className={"w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center shrink-0"}><span className={"material-symbols-outlined text-[22px]"}>pill</span></div><div><div className={"flex items-center gap-space-xs"}><h4 className={"font-headline-sm text-headline-sm text-primary font-bold"}>Atorvastatin</h4><span className={"font-label-md text-label-md text-on-surface-variant"}>20mg Oral Tablet</span></div><p className={"font-body-sm text-body-sm text-on-surface-variant mt-0.5"}>Take after dinner with liquid</p></div></div><div className={"flex items-center gap-space-xs shrink-0"}><button className={"min-h-[48px] px-space-md rounded-xl bg-surface-container text-primary hover:bg-surface-container-high transition-colors font-label-md text-label-md"} data-action={"preMarkDose('atorvastatin')"}>Give Early</button></div></div></div></div>

<div className={"hidden flex-col gap-space-md"} id={"view-weekly-container"}>
<div className={"bg-surface-container-lowest rounded-2xl p-space-md shadow-sm"}>
<div className={"flex items-center justify-between mb-space-md"}>
<div>
<h2 className={"font-headline-sm text-headline-sm text-primary"}>7-Day Adherence Grid</h2>
<span className={"font-body-sm text-body-sm text-on-surface-variant"}>{seniorName}'s compliance rate this week: <strong className={"text-secondary"}>94%</strong></span>
</div>
<span className={"font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-space-sm py-1 rounded-full font-bold"}>Week 43</span>
</div>

<div className={"grid grid-cols-7 gap-space-xs text-center"}>

<div className={"p-space-xs rounded-xl bg-surface-container-low flex flex-col gap-1"}>
<span className={"font-label-sm text-label-sm text-on-surface-variant font-bold"}>MON</span>
<span className={"font-label-md text-label-md text-primary font-bold"}>21</span>
<div className={"w-6 h-6 mx-auto rounded-full bg-secondary text-on-secondary flex items-center justify-center"}>
<span className={"material-symbols-outlined text-[16px]"}>done</span>
</div>
<span className={"font-label-sm text-label-sm text-secondary font-bold"}>4/4</span>
</div>

<div className={"p-space-xs rounded-xl bg-surface-container-low flex flex-col gap-1"}>
<span className={"font-label-sm text-label-sm text-on-surface-variant font-bold"}>TUE</span>
<span className={"font-label-md text-label-md text-primary font-bold"}>22</span>
<div className={"w-6 h-6 mx-auto rounded-full bg-secondary text-on-secondary flex items-center justify-center"}>
<span className={"material-symbols-outlined text-[16px]"}>done</span>
</div>
<span className={"font-label-sm text-label-sm text-secondary font-bold"}>4/4</span>
</div>

<div className={"p-space-xs rounded-xl bg-surface-container-low flex flex-col gap-1"}>
<span className={"font-label-sm text-label-sm text-on-surface-variant font-bold"}>WED</span>
<span className={"font-label-md text-label-md text-primary font-bold"}>23</span>
<div className={"w-6 h-6 mx-auto rounded-full bg-secondary text-on-secondary flex items-center justify-center"}>
<span className={"material-symbols-outlined text-[16px]"}>done</span>
</div>
<span className={"font-label-sm text-label-sm text-secondary font-bold"}>4/4</span>
</div>

<div className={"p-space-xs rounded-xl bg-primary-container text-on-primary flex flex-col gap-1 shadow-sm"}>
<span className={"font-label-sm text-label-sm font-bold opacity-80"}>TODAY</span>
<span className={"font-label-md text-label-md font-bold"}>24</span>
<div className={"w-6 h-6 mx-auto rounded-full bg-error text-on-error flex items-center justify-center"}>
<span className={"material-symbols-outlined text-[16px]"}>priority_high</span>
</div>
<span className={"font-label-sm text-label-sm font-bold"}>2/4</span>
</div>

<div className={"p-space-xs rounded-xl bg-surface-container-low flex flex-col gap-1 opacity-60"}>
<span className={"font-label-sm text-label-sm text-on-surface-variant font-bold"}>FRI</span>
<span className={"font-label-md text-label-md text-primary font-bold"}>25</span>
<div className={"w-6 h-6 mx-auto rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"}>
<span className={"material-symbols-outlined text-[16px]"}>more_horiz</span>
</div>
<span className={"font-label-sm text-label-sm text-on-surface-variant"}>4 plan</span>
</div>

<div className={"p-space-xs rounded-xl bg-surface-container-low flex flex-col gap-1 opacity-60"}>
<span className={"font-label-sm text-label-sm text-on-surface-variant font-bold"}>SAT</span>
<span className={"font-label-md text-label-md text-primary font-bold"}>26</span>
<div className={"w-6 h-6 mx-auto rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"}>
<span className={"material-symbols-outlined text-[16px]"}>more_horiz</span>
</div>
<span className={"font-label-sm text-label-sm text-on-surface-variant"}>4 plan</span>
</div>

<div className={"p-space-xs rounded-xl bg-surface-container-low flex flex-col gap-1 opacity-60"}>
<span className={"font-label-sm text-label-sm text-on-surface-variant font-bold"}>SUN</span>
<span className={"font-label-md text-label-md text-primary font-bold"}>27</span>
<div className={"w-6 h-6 mx-auto rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"}>
<span className={"material-symbols-outlined text-[16px]"}>more_horiz</span>
</div>
<span className={"font-label-sm text-label-sm text-on-surface-variant"}>4 plan</span>
</div>
</div>
<div className={"mt-space-md p-space-sm bg-surface-container-low rounded-xl flex items-center justify-between text-on-surface-variant"}>
<span className={"font-body-sm text-body-sm"}>Weekly review note: {seniorName} typically completes Morning doses within 15 minutes of breakfast.</span>
<button className={"text-secondary font-label-sm text-label-sm font-bold hover:underline"} data-action={"switchView('daily')"}>Return to Day View</button>
</div>
</div>
</div>

</div>

<div className={"lg:col-span-5 flex flex-col gap-space-lg"}><div className={"bg-surface-container-lowest rounded-2xl p-space-md sm:p-space-lg shadow-sm flex items-center justify-between gap-space-sm"}><div className={"flex items-center gap-space-sm"}><div className={"w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0"}><span className={"material-symbols-outlined text-[22px]"}>inventory_2</span></div><div><h2 className={"font-headline-sm text-headline-sm text-primary font-bold"}>Refills & Inventory</h2><span className={"font-body-sm text-body-sm text-on-surface-variant"}>Days remaining supply</span></div></div><span className={"font-label-sm text-label-sm bg-error-container text-on-error-container font-bold px-2.5 py-1 rounded-full"}>1 Refill Needed</span></div><div className={"flex flex-col gap-space-sm"}><div className={"bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-error-container/60"}><div className={"flex items-start justify-between gap-space-sm mb-space-sm"}><div><h3 className={"font-label-lg text-label-lg text-primary font-bold"}>Metformin 500mg</h3><span className={"font-body-sm text-body-sm text-error font-semibold"}>10 pills remaining (5 days)</span></div><span className={"font-label-sm text-label-sm bg-error text-on-error px-2 py-0.5 rounded-full font-bold flex items-center gap-1 shrink-0"}><span className={"material-symbols-outlined text-[14px]"}>warning</span> Low Stock</span></div><div className={"w-full bg-surface-container-highest rounded-full h-2 mb-space-sm overflow-hidden"}><div className={"bg-error h-2 rounded-full"} style={{ width: "16%" }}></div></div><div className={"flex items-center justify-between gap-space-sm"}><span className={"font-label-sm text-label-sm text-on-surface-variant"}>Walgreens #4812</span><a className={"min-h-[48px] px-space-md rounded-xl bg-error text-on-error font-label-md text-label-md hover:opacity-95 transition-opacity flex items-center gap-space-xs shadow-sm"} href={"tel:18005550199"}><span className={"material-symbols-outlined text-[18px]"}>phone</span><span className={""}>Call Pharmacy</span></a></div></div><div className={"bg-surface-container-lowest rounded-2xl p-space-md shadow-sm"}><div className={"flex items-start justify-between gap-space-sm mb-space-sm"}><div><h3 className={"font-label-lg text-label-lg text-primary font-bold"}>Latanoprost Eye Drops</h3><span className={"font-body-sm text-body-sm text-on-surface-variant"}>1 bottle remaining (6 days)</span></div><span className={"font-label-sm text-label-sm bg-surface-container-high text-on-surface px-2 py-0.5 rounded-full font-semibold shrink-0"}>Refill Soon</span></div><div className={"w-full bg-surface-container-highest rounded-full h-2 mb-space-sm overflow-hidden"}><div className={"bg-outline h-2 rounded-full"} style={{ width: "20%" }}></div></div><div className={"flex items-center justify-between gap-space-sm"}><span className={"font-label-sm text-label-sm text-on-surface-variant"}>1 Refill left</span><button className={"min-h-[48px] px-space-md rounded-xl bg-surface-container text-primary hover:bg-surface-container-high transition-colors font-label-md text-label-md flex items-center gap-space-xs"} data-action={"requestOnlineRefill('Latanoprost')"}><span className={"material-symbols-outlined text-[18px]"}>local_shipping</span><span className={""}>Request Refill</span></button></div></div><div className={"bg-surface-container-lowest rounded-2xl p-space-md shadow-sm"}><div className={"flex items-start justify-between gap-space-sm mb-space-sm"}><div><h3 className={"font-label-lg text-label-lg text-primary font-bold"}>Lisinopril 10mg</h3><span className={"font-body-sm text-body-sm text-on-surface-variant"}>42 pills remaining (21 days)</span></div><span className={"font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-bold shrink-0"}>Sufficient</span></div><div className={"w-full bg-surface-container-highest rounded-full h-2 mb-space-sm overflow-hidden"}><div className={"bg-secondary h-2 rounded-full"} style={{ width: "70%" }}></div></div><div className={"flex items-center justify-between gap-space-sm text-on-surface-variant font-label-sm text-label-sm"}><span className={""}>Auto-refill active</span><span className={"text-secondary font-medium"}>Refill on Nov 14</span></div></div><div className={"bg-surface-container-lowest rounded-2xl p-space-md shadow-sm"}><div className={"flex items-start justify-between gap-space-sm mb-space-sm"}><div><h3 className={"font-label-lg text-label-lg text-primary font-bold"}>Atorvastatin 20mg</h3><span className={"font-body-sm text-body-sm text-on-surface-variant"}>28 pills remaining (14 days)</span></div><span className={"font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-bold shrink-0"}>Sufficient</span></div><div className={"w-full bg-surface-container-highest rounded-full h-2 mb-space-sm overflow-hidden"}><div className={"bg-secondary h-2 rounded-full"} style={{ width: "46%" }}></div></div><div className={"flex items-center justify-between gap-space-sm text-on-surface-variant font-label-sm text-label-sm"}><span className={""}>3 refills left</span><span className={"text-secondary font-medium"}>Adequate stock</span></div></div></div></div>
</div>

<div className={"fixed bottom-6 right-6 z-50 transform translate-y-32 opacity-0 transition-all duration-300 pointer-events-none"} id={"toast-modal"}>
<div className={"bg-primary text-on-primary px-space-lg py-space-md rounded-2xl shadow-xl flex items-center gap-space-sm max-w-md"}>
<span className={"material-symbols-outlined text-secondary text-[24px]"} id={"toast-icon"}>check_circle</span>
<div>
<p className={"font-label-md text-label-md font-bold"} id={"toast-title"}>Schedule Updated</p>
<p className={"font-body-sm text-body-sm opacity-90"} id={"toast-message"}>{seniorName}'s dose has been marked as administered.</p>
</div>
</div>
</div>

</div>
    </div>
  );
}
