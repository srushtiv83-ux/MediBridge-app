function showToast(title, message, icon = "check_circle") {
  const toast = document.getElementById("toast-modal");
  if (toast) {
    const titleEl = document.getElementById("toast-title");
    const messageEl = document.getElementById("toast-message");
    const iconEl = document.getElementById("toast-icon");
    if (titleEl) titleEl.textContent = title;
    if (messageEl) messageEl.textContent = message;
    if (iconEl) iconEl.textContent = icon;
    toast.classList.remove("translate-y-32", "opacity-0", "pointer-events-none", "hidden");
    toast.classList.add("translate-y-0", "opacity-100");
    window.clearTimeout(window.__mbToastTimer);
    window.__mbToastTimer = window.setTimeout(() => {
      toast.classList.add("translate-y-32", "opacity-0", "pointer-events-none");
      toast.classList.remove("translate-y-0", "opacity-100");
    }, 3500);
  } else {
    window.alert(`${title}\n${message}`);
  }
}

function switchView(view) {
  const daily = document.getElementById("view-daily-container");
  const weekly = document.getElementById("view-weekly-container");
  const dailyBtn = document.getElementById("tab-daily");
  const weeklyBtn = document.getElementById("tab-weekly");
  if (!daily || !weekly) return;
  daily.classList.toggle("hidden", view !== "daily");
  weekly.classList.toggle("hidden", view !== "weekly");
  daily.classList.toggle("flex", view === "daily");
  weekly.classList.toggle("flex", view === "weekly");
  dailyBtn?.classList.toggle("bg-surface-container-lowest", view === "daily");
  dailyBtn?.classList.toggle("text-primary", view === "daily");
  weeklyBtn?.classList.toggle("bg-surface-container-lowest", view === "weekly");
  weeklyBtn?.classList.toggle("text-primary", view === "weekly");
}

function switchTab(tabKey) {
  ["upcoming", "past", "summaries"].forEach((tab) => {
    const view = document.getElementById(`view-${tab}`);
    const btn = document.getElementById(`tab-${tab}`);
    if (!view || !btn) return;
    view.classList.toggle("hidden", tab !== tabKey);
    btn.classList.toggle("bg-primary-container", tab === tabKey);
    btn.classList.toggle("text-on-primary", tab === tabKey);
  });
}

function openAppointmentModal() {
  document.getElementById("appointmentModal")?.classList.remove("hidden");
}
function closeAppointmentModal() {
  document.getElementById("appointmentModal")?.classList.add("hidden");
}

export function handlePageAction(event) {
  const filterButton = event.target.closest?.(".filter-btn");
  if (filterButton) {
    const filter = filterButton.getAttribute("data-filter");
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      const active = btn === filterButton;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.classList.toggle("bg-surface-container-lowest", active);
      btn.classList.toggle("text-primary", active);
      btn.classList.toggle("shadow-sm", active);
      btn.classList.toggle("text-on-surface-variant", !active);
    });
    document.querySelectorAll(".notification-card").forEach((card) => {
      const visible = filter === "all" || card.getAttribute("data-type") === filter;
      card.classList.toggle("hidden", !visible);
      card.classList.toggle("flex", visible);
    });
    return;
  }

  const markAllButton = event.target.closest?.("#mark-all-read-btn");
  if (markAllButton) {
    markAllButton.innerHTML = '<span class="material-symbols-outlined">verified</span><span>All Alerts Reviewed</span>';
    markAllButton.disabled = true;
    return;
  }

  const button = event.target.closest?.("[data-action]");
  if (!button) return;
  const action = button.getAttribute("data-action") || "";

  if (action.includes("triggerSeniorNudge")) {
    const old = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<span class="material-symbols-outlined">check</span><span>Ping Sent</span>';
    setTimeout(() => { button.innerHTML = old; button.disabled = false; }, 2500);
  } else if (action.includes("resolveOverdueDose")) {
    button.innerHTML = '<span class="material-symbols-outlined">check_circle</span><span>Confirmed Taken!</span>';
    button.classList.remove("bg-primary"); button.classList.add("bg-secondary");
    showToast("Dose Confirmed", "The dose has been marked as confirmed.");
  } else if (action.includes("dismissNotification")) {
    const card = button.closest(".notification-card") || button.closest(".flex.items-start");
    if (card) card.remove();
  } else if (action.includes("switchView")) {
    switchView(action.includes("weekly") ? "weekly" : "daily");
  } else if (action.includes("markDoseTaken")) {
    showToast("Dose Confirmed", "Medicine dose recorded as taken.", "verified");
  } else if (action.includes("snoozeAlert")) {
    showToast("Reminder Snoozed", "The follow-up reminder has been rescheduled.", "alarm");
  } else if (action.includes("preMarkDose")) {
    showToast("Dose Recorded", "The medicine dose has been logged.", "schedule");
  } else if (action.includes("testChimePrompt")) {
    showToast("Reminder Sent", "A reminder prompt was sent to the senior device.", "tablet_mac");
  } else if (action.includes("requestOnlineRefill")) {
    showToast("Refill Requested", "The medicine refill request has been submitted.", "send");
  } else if (action.includes("logCustomDoseModal")) {
    showToast("Log Dose", "Dose entry is ready to be added.", "medication");
  } else if (action.includes("viewHistory")) {
    showToast("Medication History", "Historical dispensing records opened.", "history");
  } else if (action.includes("handleResolveMissedDose")) {
    const id = action.match(/handleResolveMissedDose\(['"]([^'"]+)/)?.[1];
    const card = id ? document.getElementById(id) : button.closest(".notification-card");
    if (card) {
      card.classList.add("opacity-75", "bg-surface-container-low");
      const target = card.querySelector("div.md\\:w-56");
      if (target) target.innerHTML = '<div class="min-h-[48px] px-4 py-2 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center gap-2"><span class="material-symbols-outlined">check_circle</span><span>Resolved</span></div>';
    }
  } else if (action.includes("handleOrderRefill")) {
    button.disabled = true;
    button.classList.remove("bg-primary"); button.classList.add("bg-secondary");
    button.innerHTML = '<span class="material-symbols-outlined">check</span><span>Refill Requested!</span>';
  } else if (action.includes("switchTab")) {
    const tab = action.match(/switchTab\(['"]([^'"]+)/)?.[1] || "upcoming";
    switchTab(tab);
  } else if (action.includes("openModal")) {
    openAppointmentModal();
  } else if (action.includes("closeModal")) {
    closeAppointmentModal();
  } else if (action.includes("openRescheduleModal")) {
    const doc = action.match(/openRescheduleModal\(['"]([^'"]+)/)?.[1] || "the doctor";
    const notice = document.getElementById("rescheduleDoctorNotice");
    if (notice) notice.textContent = `Select rescheduling criteria for ${doc}.`;
    document.getElementById("rescheduleModal")?.classList.remove("hidden");
  } else if (action.includes("downloadCalendarInvite")) {
    const title = action.match(/downloadCalendarInvite\(['"]([^'"]+)/)?.[1] || "appointment";
    showToast("Calendar Invite", `Calendar invite generated for ${title}.`, "event");
  } else if (action.includes("syncToast")) {
    const toast = document.getElementById("syncToast");
    if (toast) {
      toast.classList.remove("hidden");
      window.clearTimeout(window.__mbSyncTimer);
      window.__mbSyncTimer = window.setTimeout(() => toast.classList.add("hidden"), 3500);
    }
  } else if (action.includes("classList.add")) {
    button.parentElement?.classList.add("hidden");
  }
}

export function handlePageSubmit(event) {
  const form = event.target.closest?.("#appointmentForm");
  if (!form) return;
  event.preventDefault();
  closeAppointmentModal();
  const toast = document.getElementById("syncToast");
  if (toast) {
    const title = toast.querySelector(".font-label-md");
    const msg = toast.querySelector(".font-body-sm");
    if (title) title.textContent = "Appointment Saved";
    if (msg) msg.textContent = "The senior's appointment schedule has been updated.";
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 3500);
  } else {
    showToast("Appointment Saved", "The appointment details have been saved.");
  }
}