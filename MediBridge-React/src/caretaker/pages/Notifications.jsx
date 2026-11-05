import React from "react";
import { handlePageAction, handlePageSubmit } from "../pageActions";

export default function Notifications({ seniorProfile }) {
  const seniorName = seniorProfile.name || "Linked senior";

  return (
    <div className="page-content" onClick={handlePageAction} onSubmit={handlePageSubmit}>
      <div className={"flex flex-col w-full gap-space-lg"}>

<div className={"relative overflow-hidden rounded-2xl bg-surface-container-low p-space-lg shadow-sm"}>
<div className={"absolute -right-8 -top-8 w-44 h-44 rounded-full bg-secondary/5 blur-2xl pointer-events-none"}></div>
<div className={"flex flex-col lg:flex-row lg:items-center justify-between gap-space-md relative z-10"}>
<div className={"flex flex-col gap-space-xs max-w-2xl"}>
<div className={"flex items-center gap-space-xs"}>
<span className={"inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container"}>
<span className={"material-symbols-outlined text-[16px]"}>shield_with_heart</span>
</span>
<span className={"font-label-sm text-label-sm text-secondary tracking-wider uppercase"}>Proactive Family Sync</span>
</div>
<h1 className={"font-headline-lg text-headline-lg text-primary tracking-tight"}>Notifications & Alerts</h1>
<p className={"font-body-md text-body-md text-on-surface-variant"}>
          Quiet monitoring calibrated for {seniorName}’s independence. Critical missed dosages highlight instantly so you can intervene calmly, while daily confirmations offer quiet peace of mind.
        </p>
</div>

<div className={"flex items-center gap-space-sm flex-wrap sm:flex-nowrap"}>
<div className={"flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-sm rounded-xl shadow-sm"}>
<div className={"w-10 h-10 rounded-xl bg-error-container/40 flex items-center justify-center text-error"}>
<span className={"material-symbols-outlined text-[22px]"}>notification_important</span>
</div>
<div>
<span className={"font-headline-sm text-headline-sm text-error leading-tight block"}>1</span>
<span className={"font-label-sm text-label-sm text-on-surface-variant block"}>Requires Action</span>
</div>
</div>
<div className={"flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-sm rounded-xl shadow-sm"}>
<div className={"w-10 h-10 rounded-xl bg-secondary-container/50 flex items-center justify-center text-secondary"}>
<span className={"material-symbols-outlined text-[22px]"}>check_circle</span>
</div>
<div>
<span className={"font-headline-sm text-headline-sm text-secondary leading-tight block"}>2</span>
<span className={"font-label-sm text-label-sm text-on-surface-variant block"}>Taken On Time</span>
</div>
</div>
<div className={"flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-sm rounded-xl shadow-sm"}>
<div className={"w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center text-primary-container"}>
<span className={"material-symbols-outlined text-[22px]"}>inventory_2</span>
</div>
<div>
<span className={"font-headline-sm text-headline-sm text-on-surface leading-tight block"}>1</span>
<span className={"font-label-sm text-label-sm text-on-surface-variant block"}>Refill Approaching</span>
</div>
</div>
</div>
</div>
</div>

<div className={"flex flex-col sm:flex-row sm:items-center justify-between gap-space-md"}>

<div className={"inline-flex p-1 bg-surface-container rounded-xl gap-1 self-start sm:self-auto overflow-x-auto max-w-full"} id={"filter-tab-bar"} role={"tablist"}>
<button aria-pressed={"true"} className={"filter-btn min-h-[48px] px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-all flex items-center gap-space-xs bg-surface-container-lowest text-primary shadow-sm"} data-filter={"all"} type={"button"}>
<span>All Alerts</span>
<span className={"w-5 h-5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center justify-center"}>4</span>
</button>
<button aria-pressed={"false"} className={"filter-btn min-h-[48px] px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant transition-all hover:text-on-surface flex items-center gap-space-xs"} data-filter={"missed"} type={"button"}>
<span>Missed Doses</span>
<span className={"w-5 h-5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm flex items-center justify-center"}>1</span>
</button>
<button aria-pressed={"false"} className={"filter-btn min-h-[48px] px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant transition-all hover:text-on-surface flex items-center gap-space-xs"} data-filter={"confirmations"} type={"button"}>
<span>Dose Confirmations</span>
<span className={"w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm flex items-center justify-center"}>2</span>
</button>
<button aria-pressed={"false"} className={"filter-btn min-h-[48px] px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant transition-all hover:text-on-surface flex items-center gap-space-xs"} data-filter={"refills"} type={"button"}>
<span>Refills</span>
<span className={"w-5 h-5 rounded-full bg-surface-variant text-primary-container font-label-sm text-label-sm flex items-center justify-center"}>1</span>
</button>
</div>

<div className={"flex items-center gap-space-sm self-end sm:self-auto"}>
<button className={"min-h-[48px] px-space-md py-space-xs rounded-xl bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm hover:bg-surface-container-low transition-all flex items-center gap-space-xs"} id={"mark-all-read-btn"} type={"button"}>
<span className={"material-symbols-outlined text-[18px]"}>done_all</span>
<span>Mark All Reviewed</span>
</button>
<button className={"w-12 h-12 rounded-xl bg-surface-container-lowest text-on-surface-variant hover:text-primary shadow-sm flex items-center justify-center transition-all"} title={"Alert Preferences"} type={"button"}>
<span className={"material-symbols-outlined text-[20px]"}>tune</span>
</button>
</div>
</div>

<div className={"flex flex-col gap-space-md"} id={"notifications-stream"}>

<article className={"notification-card relative rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col gap-space-md group"} data-type={"missed"} id={"card-missed-latanoprost"}>

<div className={"absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full bg-error"}></div>
<div className={"flex flex-col md:flex-row md:items-start justify-between gap-space-md pl-space-xs"}>

<div className={"flex items-start gap-space-md flex-1"}>
<div className={"w-14 h-14 rounded-2xl bg-error-container/30 flex items-center justify-center flex-shrink-0 text-error"}>
<span className={"material-symbols-outlined text-[30px] animate-pulse"}>crisis_alert</span>
</div>
<div className={"flex flex-col gap-space-xs flex-1"}>
<div className={"flex items-center gap-space-sm flex-wrap"}>
<span className={"inline-flex items-center gap-1 px-3 py-1 rounded-full font-label-sm text-label-sm bg-error-container text-on-error-container font-semibold"}>
<span className={"w-2 h-2 rounded-full bg-error animate-ping"}></span>
                High Priority Alert
              </span>
<span className={"font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1"}>
<span className={"material-symbols-outlined text-[16px]"}>schedule</span>
                Scheduled: Today at 2:00 PM
              </span>
<span className={"font-label-sm text-label-sm text-outline"}>|</span>
<span className={"font-label-sm text-label-sm text-error font-medium"}>Logged 2:45 PM (45m window expired)</span>
</div>
<div className={"flex flex-col sm:flex-row sm:items-baseline gap-space-xs sm:gap-space-sm pt-1"}>
<h2 className={"font-headline-md text-headline-md text-primary tracking-tight"}>Latanoprost Eye Drops</h2>
<span className={"font-label-lg text-label-lg text-on-surface-variant font-medium"}>(0.005% Ophthalmic Solution)</span>
</div>
<p className={"font-body-md text-body-md text-on-surface max-w-3xl leading-relaxed"}>
              Dose remained unconfirmed after 45-minute reminder window. {seniorName} has not acknowledged the tablet prompt or lifted the medication station sensor.
            </p>

<div className={"flex items-center gap-space-xs p-space-sm rounded-xl bg-surface-container-low max-w-2xl mt-1 text-on-surface-variant"}>
<span className={"material-symbols-outlined text-secondary text-[18px]"}>lightbulb</span>
<span className={"font-body-sm text-body-sm"}>
                Gentle tip: {seniorName} usually takes a post-lunch stroll in the garden between 2:00 and 3:00 PM. A relaxed check-in is recommended.
              </span>
</div>
</div>
</div>

<div className={"flex flex-col sm:flex-row md:flex-col items-stretch gap-space-sm md:w-56 flex-shrink-0 pl-space-xs md:pl-0"}>
<a className={"min-h-[48px] px-space-md py-space-xs rounded-xl bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-space-xs shadow-sm hover:bg-primary-container transition-all"} href={"tel:18005550199"}>
<span className={"material-symbols-outlined text-[20px]"}>phone_in_talk</span>
<span>Call {seniorName}</span>
</a>
<button className={"min-h-[48px] px-space-md py-space-xs rounded-xl bg-surface-container-low text-primary font-label-md text-label-md hover:bg-secondary-container hover:text-on-secondary-container transition-all flex items-center justify-center gap-space-xs"} data-action={"handleResolveMissedDose('card-missed-latanoprost')"} type={"button"}>
<span className={"material-symbols-outlined text-[20px]"}>check</span>
<span>Mark as Handled</span>
</button>
</div>
</div>
</article>

<article className={"notification-card relative rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col gap-space-md group"} data-type={"confirmations"} id={"card-confirm-lisinopril"}>

<div className={"absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full bg-secondary"}></div>
<div className={"flex flex-col md:flex-row md:items-start justify-between gap-space-md pl-space-xs"}>
<div className={"flex items-start gap-space-md flex-1"}>
<div className={"w-14 h-14 rounded-2xl bg-secondary-container/40 flex items-center justify-center flex-shrink-0 text-secondary"}>
<span className={"material-symbols-outlined text-[30px]"}>check_circle</span>
</div>
<div className={"flex flex-col gap-space-xs flex-1"}>
<div className={"flex items-center gap-space-sm flex-wrap"}>
<span className={"inline-flex items-center gap-1 px-3 py-1 rounded-full font-label-sm text-label-sm bg-secondary-container text-on-secondary-container font-semibold"}>
<span className={"material-symbols-outlined text-[14px]"}>done</span>
                Confirmed Dose
              </span>
<span className={"font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1"}>
<span className={"material-symbols-outlined text-[16px]"}>schedule</span>
                Scheduled: Today at 8:00 AM
              </span>
<span className={"font-label-sm text-label-sm text-outline"}>|</span>
<span className={"font-label-sm text-label-sm text-secondary font-medium"}>Logged Today, 8:15 AM</span>
</div>
<div className={"flex flex-col sm:flex-row sm:items-baseline gap-space-xs sm:gap-space-sm pt-1"}>
<h2 className={"font-headline-md text-headline-md text-primary tracking-tight"}>Lisinopril 10mg</h2>
<span className={"font-label-lg text-label-lg text-on-surface-variant font-medium"}>(Oral Tablet • Blood Pressure)</span>
</div>
<p className={"font-body-md text-body-md text-on-surface-variant max-w-3xl leading-relaxed"}>
              Marked as Taken on {seniorName}’s MediBridge living room tablet. Smart dispenser drawer 1 opened and closed with normal weight validation.
            </p>
</div>
</div>

<div className={"flex md:flex-col items-center md:items-end justify-between md:justify-center gap-space-xs pl-space-xs md:pl-0 flex-shrink-0"}>
<span className={"font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-full flex items-center gap-1"}>
<span className={"material-symbols-outlined text-[16px] text-secondary"}>devices</span>
            Tablet Sensor Verified
          </span>
<span className={"font-label-sm text-label-sm text-outline"}>No action needed</span>
</div>
</div>
</article>

<article className={"notification-card relative rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col gap-space-md group"} data-type={"confirmations"} id={"card-confirm-metformin"}>

<div className={"absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full bg-secondary"}></div>
<div className={"flex flex-col md:flex-row md:items-start justify-between gap-space-md pl-space-xs"}>
<div className={"flex items-start gap-space-md flex-1"}>
<div className={"w-14 h-14 rounded-2xl bg-secondary-container/40 flex items-center justify-center flex-shrink-0 text-secondary"}>
<span className={"material-symbols-outlined text-[30px]"}>check_circle</span>
</div>
<div className={"flex flex-col gap-space-xs flex-1"}>
<div className={"flex items-center gap-space-sm flex-wrap"}>
<span className={"inline-flex items-center gap-1 px-3 py-1 rounded-full font-label-sm text-label-sm bg-secondary-container text-on-secondary-container font-semibold"}>
<span className={"material-symbols-outlined text-[14px]"}>done</span>
                Confirmed Dose
              </span>
<span className={"font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1"}>
<span className={"material-symbols-outlined text-[16px]"}>schedule</span>
                Scheduled: Today at 8:00 AM
              </span>
<span className={"font-label-sm text-label-sm text-outline"}>|</span>
<span className={"font-label-sm text-label-sm text-secondary font-medium"}>Logged Today, 8:12 AM</span>
</div>
<div className={"flex flex-col sm:flex-row sm:items-baseline gap-space-xs sm:gap-space-sm pt-1"}>
<h2 className={"font-headline-md text-headline-md text-primary tracking-tight"}>Metformin 500mg</h2>
<span className={"font-label-lg text-label-lg text-on-surface-variant font-medium"}>(Oral Tablet • Glycemic Care)</span>
</div>
<p className={"font-body-md text-body-md text-on-surface-variant max-w-3xl leading-relaxed"}>
              Marked as Taken directly by {seniorName} via one-touch confirm. Morning routine completed comfortably within scheduled window.
            </p>
</div>
</div>

<div className={"flex md:flex-col items-center md:items-end justify-between md:justify-center gap-space-xs pl-space-xs md:pl-0 flex-shrink-0"}>
<span className={"font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-full flex items-center gap-1"}>
<span className={"material-symbols-outlined text-[16px] text-secondary"}>touch_app</span>
            Patient Manual Touch
          </span>
<span className={"font-label-sm text-label-sm text-outline"}>No action needed</span>
</div>
</div>
</article>

<article className={"notification-card relative rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col gap-space-md group"} data-type={"refills"} id={"card-refill-metformin"}>

<div className={"absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full bg-surface-tint"}></div>
<div className={"flex flex-col md:flex-row md:items-start justify-between gap-space-md pl-space-xs"}>
<div className={"flex items-start gap-space-md flex-1"}>
<div className={"w-14 h-14 rounded-2xl bg-surface-variant flex items-center justify-center flex-shrink-0 text-primary-container"}>
<span className={"material-symbols-outlined text-[30px]"}>local_pharmacy</span>
</div>
<div className={"flex flex-col gap-space-xs flex-1"}>
<div className={"flex items-center gap-space-sm flex-wrap"}>
<span className={"inline-flex items-center gap-1 px-3 py-1 rounded-full font-label-sm text-label-sm bg-surface-variant text-on-primary-fixed-variant font-semibold"}>
<span className={"material-symbols-outlined text-[14px]"}>inventory_2</span>
                Supply Threshold Notice
              </span>
<span className={"font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1"}>
<span className={"material-symbols-outlined text-[16px]"}>history</span>
                Logged Yesterday, 4:00 PM
              </span>
</div>
<div className={"flex flex-col sm:flex-row sm:items-baseline gap-space-xs sm:gap-space-sm pt-1"}>
<h2 className={"font-headline-md text-headline-md text-primary tracking-tight"}>Metformin 500mg Supply Refill</h2>
<span className={"font-label-lg text-label-lg text-error font-medium"}>(5 Days Remaining • 10 Tablets left)</span>
</div>
<p className={"font-body-md text-body-md text-on-surface-variant max-w-3xl leading-relaxed"}>
              Supply has reached the 5-day warning threshold based on scheduled twice-daily consumption. CVS Pharmacy (#4821) on Grand Ave has 1 renewal authorized on file.
            </p>

<div className={"flex items-center gap-space-md flex-wrap pt-1 text-on-surface-variant"}>
<span className={"font-body-sm text-body-sm flex items-center gap-1"}>
<span className={"material-symbols-outlined text-[16px] text-primary"}>storefront</span>
                Rx #992-0149 (Dr. Carolyn Vance)
              </span>
<span className={"font-body-sm text-body-sm flex items-center gap-1"}>
<span className={"material-symbols-outlined text-[16px] text-secondary"}>autorenew</span>
                1 Refill Remaining
              </span>
</div>
</div>
</div>

<div className={"flex flex-col sm:flex-row md:flex-col items-stretch gap-space-sm md:w-56 flex-shrink-0 pl-space-xs md:pl-0"}>
<button className={"min-h-[48px] px-space-md py-space-xs rounded-xl bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-space-xs shadow-sm hover:bg-primary-container transition-all"} data-action={"handleOrderRefill(this)"} type={"button"}>
<span className={"material-symbols-outlined text-[20px]"}>shopping_cart_checkout</span>
<span>Request Refill Now</span>
</button>
<button className={"min-h-[48px] px-space-md py-space-xs rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all flex items-center justify-center gap-space-xs"} type={"button"}>
<span className={"material-symbols-outlined text-[18px]"}>schedule</span>
<span>Remind Me Later</span>
</button>
</div>
</div>
</article>
</div>

<div className={"rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-lg"}>
<div className={"flex items-center gap-space-md"}>
<div className={"w-12 h-12 rounded-2xl bg-secondary-container/50 text-secondary flex items-center justify-center flex-shrink-0"}>
<span className={"material-symbols-outlined text-[26px]"}>tune</span>
</div>
<div>
<h3 className={"font-headline-sm text-headline-sm text-primary"}>Escalation Thresholds Active</h3>
<p className={"font-body-md text-body-md text-on-surface-variant max-w-xl"}>
          Automated voice reminder triggers on {seniorName}’s console after 60 minutes. Another caregiver will be notified if no response by 3:30 PM.
        </p>
</div>
</div>
<div className={"flex items-center gap-space-sm flex-shrink-0 w-full md:w-auto"}>
<button className={"w-full md:w-auto min-h-[48px] px-space-md py-space-xs rounded-xl bg-surface-container-low text-primary font-label-md text-label-md hover:bg-surface-container-high transition-all flex items-center justify-center gap-space-xs"} type={"button"}>
<span className={"material-symbols-outlined text-[18px]"}>settings</span>
<span>Configure Notification Rules</span>
</button>
</div>
</div>
</div>
    </div>
  );
}
