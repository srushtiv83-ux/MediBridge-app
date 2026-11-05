import { useEffect, useMemo, useState } from "react";
import schedule from "./screens/schedule.html?raw";
import addMedicine from "./screens/addMedicine.html?raw";
import careCircle from "./screens/careCircle.html?raw";
import rewards from "./screens/rewards.html?raw";
import appointments from "./screens/appointments.html?raw";
import sos from "./screens/sos.html?raw";
import {
  readProfiles,
  saveProfile,
  subscribeToProfileUpdates,
  SENIOR_PROFILE_KEY,
  CARETAKER_PROFILE_KEY,
} from "../profileStorage";
import "./seniorDashboard.css";

const screens = {
  schedule: { label: "Home", icon: "home", html: schedule },
  careCircle: { label: "Care Circle", icon: "groups", html: careCircle },
  rewards: { label: "Rewards", icon: "emoji_events", html: rewards },
  appointments: { label: "Appointments", icon: "calendar_month", html: appointments },
  sos: { label: "SOS", icon: "emergency", html: sos },
};

function readStoredArray(key) {
  const saved = localStorage.getItem(key);
  if (!saved) return [];

  try {
    const value = JSON.parse(saved);
    if (Array.isArray(value)) return value;
    console.error(`Stored value "${key}" is not a list.`);
  } catch (error) {
    console.error(`Unable to read stored list "${key}".`, error);
  }
  return [];
}

function makeScreenMarkup(html, seniorProfile, caretakerProfile, medications, appointmentList, points) {
  const document = new DOMParser().parseFromString(html, "text/html");
  const seniorName = seniorProfile.name || "Senior";
  const caretakerLinked = seniorProfile.linkingCode
    && caretakerProfile.linkingCode
    && seniorProfile.linkingCode.toUpperCase() === caretakerProfile.linkingCode.toUpperCase();
  const caretakerApproved = caretakerLinked && caretakerProfile.connectionStatus === "approved";
  const caretakerPending = caretakerLinked && caretakerProfile.connectionStatus === "pending";
  const caretakerName = caretakerApproved ? caretakerProfile.name || "Caretaker" : "your caretaker";
  const seniorInitials = seniorName
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  document.querySelectorAll("script").forEach((script) => script.remove());
  document.querySelectorAll("nav").forEach((nav) => nav.remove());
  document.querySelectorAll("*").forEach((element) => {
    [...element.attributes].forEach((attribute) => {
      if (attribute.name.toLowerCase().startsWith("on")) element.removeAttribute(attribute.name);
      else if (["title", "aria-label", "alt"].includes(attribute.name.toLowerCase())) {
        attribute.value = attribute.value
          .replace(/Arthur Johnson|Arthur/gi, () => seniorName)
          .replace(/Sarah Vance|Sarah/gi, () => caretakerName)
          .replace(/David Vance|Eleanor Lewis/gi, "Emergency contact");
      }
    });
  });

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let textNode;
  while ((textNode = walker.nextNode())) {
    textNode.nodeValue = textNode.nodeValue
      .replace(/sarah\.vance@gmail\.com/gi, () => caretakerLinked ? caretakerProfile.email || "" : "")
      .replace(/Arthur Johnson|Arthur/gi, () => seniorName)
      .replace(/Sarah Vance|Sarah/gi, () => caretakerName)
      .replace(/Connected.{0,3}Verified Caretaker/g, caretakerApproved ? "Connected • Approved" : "Request Pending")
      .replace(/Synced across Schedule.{0,50}Voice AI Assistant/g, "Schedule demo preview • local data only")
      .replace(/Walgreens Hub & Smart Refill Synced/g, "Refill service not connected")
      .replace(
        /Medication adherence updates & appointment reminders enabled\./g,
        caretakerApproved
          ? "Medication adherence updates and appointment reminders are enabled."
          : "Waiting for your approval before sharing health updates."
      )
      .replace(/Daughter.{0,6}\(555\)\s*234-8901/g, `Caretaker • ${caretakerProfile.phone || "Phone unavailable"}`)
      .replace(/David Vance|Eleanor Lewis/gi, "Emergency contact");
  }

  if (document.querySelector("#sos-button")) {
    const textReplacements = new Map([
      ["System Armed & Live", "SOS Demo"],
      ["Online", "Demo Mode"],
      ["GPS Locked (<5m)", "GPS not connected"],
      ['Say "Hey MediBridge, Emergency"', "Voice activation is not connected."],
      ["Press & hold (3 sec) to activate", "Use the direct call option below for urgent help."],
      ["Includes 5-second countdown to cancel false alarms", "This demo does not send an emergency alert."],
      ["Instant notification recipients upon alert", "Call your trusted contacts directly when needed."],
      ["Independent Dual-Band Cellular Standby Active", "Emergency services are not contacted automatically."],
    ]);
    document.querySelectorAll("span, p").forEach((element) => {
      const replacement = textReplacements.get(element.textContent.trim());
      if (replacement) element.textContent = replacement;
      if (element.textContent.trim() === "Voice SOS") element.textContent = "Voice SOS Demo";
      if (element.textContent.includes("The Emergency AI Agent autonomously coordinates")) {
        element.textContent = "This demo does not send alerts or share GPS location. Use the direct call option below for urgent help.";
      }
    });
    const sosButton = document.getElementById("sos-button");
    if (sosButton) {
      sosButton.setAttribute("aria-label", "SOS demo only; does not contact emergency services");
      const holdHint = sosButton.querySelector("span:last-child");
      if (holdHint) holdHint.textContent = "Demo only";
    }
  }

  const linkingCode = document.getElementById("linking-code-text");
  if (linkingCode) linkingCode.textContent = seniorProfile.linkingCode || "MB-349277";
  const profileBadge = document.querySelector('[title$="Profile"]');
  if (profileBadge?.querySelector("span")) profileBadge.querySelector("span").textContent = seniorInitials;
  const caregiverHeading = [...document.querySelectorAll("h2")]
    .find((item) => item.textContent.trim() === "Active Caregivers");
  if (caregiverHeading && caretakerPending) caregiverHeading.textContent = "Connection Requests";
  if (caregiverHeading && !caretakerApproved && !caretakerPending) caregiverHeading.textContent = "Caregivers";
  const careCircleStatus = [...document.querySelectorAll("p")]
    .find((item) => item.textContent.trim() === "Family Care Circle Linked");
  if (careCircleStatus && !caretakerApproved) {
    careCircleStatus.textContent = caretakerPending ? "Connection Request Pending" : "No Caretaker Linked";
    const description = careCircleStatus.parentElement?.querySelectorAll("p")[1];
    if (description) {
      description.textContent = caretakerPending
        ? "Review this request in your Care Circle before sharing appointment updates."
        : "Appointments will appear here. Connect a caretaker to share visit updates.";
    }
  }

  const caregiverCard = document.getElementById("caregiver-sarah");
  if (caregiverCard && !caretakerApproved && !caretakerPending) {
    const caregiverList = caregiverCard.parentElement;
    caregiverCard.remove();
    const count = [...document.querySelectorAll("span")].find((item) => item.textContent.trim() === "1 Linked");
    if (count) count.textContent = "0 Linked";
    if (caregiverList) {
      const emptyState = document.createElement("p");
      emptyState.className = "text-sm text-[#475569]";
      emptyState.textContent = "No caretaker requests or connections yet.";
      caregiverList.append(emptyState);
    }
  } else if (caregiverCard && (caretakerApproved || caretakerPending)) {
    const card = caregiverCard;
    card.querySelectorAll("span").forEach((item) => {
      if (item.textContent.trim() === "your caretaker") item.textContent = caretakerProfile.name || "Caretaker";
      if (item.textContent.trim() === "SV") item.textContent = (caretakerProfile.name || "Caretaker").split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
      if (item.textContent.trim() === "Daughter & Primary Caregiver") item.textContent = caretakerApproved ? "Connected Caretaker" : "Connection Request";
      if (item.textContent.trim() === "Connected • Verified Caretaker") item.textContent = caretakerApproved ? "Connected • Approved" : "Request Pending";
      if (item.textContent.includes("@") && caretakerProfile.email) item.textContent = caretakerProfile.email;
      if (item.textContent.match(/\(555\)/)) item.textContent = caretakerProfile.phone || "Phone unavailable";
    });
    const revokeButton = [...card.querySelectorAll("button")].find((button) => button.textContent.toLowerCase().includes("revoke"));
    if (caretakerPending) {
      const count = [...document.querySelectorAll("span")].find((item) => item.textContent.trim() === "1 Linked");
      if (count) count.textContent = "1 Request";
      revokeButton?.remove();
      const actions = document.createElement("div");
      actions.className = "grid grid-cols-2 gap-2";
      actions.innerHTML = '<button type="button" class="senior-approve-request rounded-xl bg-[#006a61] p-3 text-white font-bold">Approve Request</button><button type="button" class="senior-reject-request rounded-xl bg-[#fff] border border-[#CBDBF5] p-3 text-[#173B67] font-bold">Reject</button>';
      card.append(actions);
    }
  }

  if (document.querySelector("#sos-button")) {
    document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
      if (link.href.includes("911")) return;
      const card = link.parentElement;
      if (!caretakerApproved || !card?.textContent.includes(caretakerName)) {
        card?.remove();
      } else {
        link.href = `tel:${(caretakerProfile.phone || "").replace(/[^\d+]/g, "")}`;
        card.querySelectorAll("*").forEach((item) => {
          if (item.childElementCount > 0) return;
          if (item.textContent.trim() === "SV") item.textContent = (caretakerProfile.name || "Caretaker").split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
          if (item.textContent.trim() === "Primary") item.textContent = "Caretaker";
          if (item.textContent.includes("Daughter") || item.textContent.includes("(555)")) {
            item.textContent = `Caretaker • ${caretakerProfile.phone || "Phone unavailable"}`;
          }
        });
      }
    });
  }

  if (medications.length && document.getElementById("view-active-schedule")) {
    const section = document.createElement("section");
    section.className = "w-full max-w-lg mx-auto space-y-3";
    const title = document.createElement("h2");
    title.className = "text-xl font-extrabold text-[#0F172A]";
    title.textContent = "Your Added Medicines";
    section.append(title);
    medications.forEach((medicine) => {
      const item = document.createElement("article");
      item.className = "rounded-2xl p-4 bg-white border border-[#CBDBF5] shadow-sm";
      const name = document.createElement("h3");
      name.className = "text-lg font-bold text-[#0F172A]";
      name.textContent = medicine.name;
      item.append(name);
      if (medicine.dosage) {
        const dosage = document.createElement("p");
        dosage.className = "text-sm text-[#475569]";
        dosage.textContent = medicine.dosage;
        item.append(dosage);
      }
      section.append(item);
    });
    document.getElementById("view-active-schedule").append(section);
  }

  if (document.getElementById("quick-add-form") && appointmentList.length) {
    const section = document.createElement("section");
    section.className = "flex flex-col gap-3";
    appointmentList.forEach((appointment) => {
      const item = document.createElement("article");
      item.className = "rounded-2xl p-4 bg-white border border-[#CBDBF5] shadow-sm";
      item.textContent = appointment.details;
      section.append(item);
    });
    document.getElementById("quick-add-form").before(section);
  }

  const pointsElement = [...document.querySelectorAll("*")].find((element) =>
    element.childElementCount === 0 && element.textContent.trim() === "70"
  );
  if (pointsElement) pointsElement.textContent = String(points);

  return document.body.innerHTML;
}

export default function SeniorDashboard() {
  const [page, setPage] = useState("schedule");
  const [toast, setToast] = useState("");
  const [medications, setMedications] = useState(() => readStoredArray("mb-meds"));
  const [appointmentList, setAppointmentList] = useState(() => readStoredArray("mb-appointments"));
  const [points, setPoints] = useState(() => Number(localStorage.getItem("mb-points") || 70));
  const [profiles, setProfiles] = useState(readProfiles);
  const seniorProfile = profiles.senior;
  const caretakerProfile = profiles.caretaker;
  const screen = page === "addMedicine" ? addMedicine : screens[page].html;

  const markup = useMemo(
    () => makeScreenMarkup(screen, seniorProfile, caretakerProfile, medications, appointmentList, points),
    [screen, seniorProfile.name, seniorProfile.linkingCode, caretakerProfile.name, caretakerProfile.email,
      caretakerProfile.phone, caretakerProfile.linkingCode, caretakerProfile.connectionStatus,
      medications, appointmentList, points]
  );

  useEffect(() => {
    localStorage.setItem("mb-meds", JSON.stringify(medications));
  }, [medications]);
  useEffect(() => {
    localStorage.setItem("mb-appointments", JSON.stringify(appointmentList));
  }, [appointmentList]);
  useEffect(() => {
    localStorage.setItem("mb-points", String(points));
  }, [points]);
  useEffect(() => subscribeToProfileUpdates(() => setProfiles(readProfiles())), []);

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.mbSeniorToast);
    window.mbSeniorToast = window.setTimeout(() => setToast(""), 2600);
  };

  useEffect(() => {
    const root = document.getElementById("senior-screen-content");
    if (!root) return undefined;
    const handleClick = async (event) => {
      const element = event.target.closest("button,a,[role='button']");
      if (!element) return;
      const id = element.id || "";
      const text = (element.innerText || "").trim().toLowerCase();
      if (element.tagName === "A" && element.getAttribute("href")?.startsWith("#")) {
        event.preventDefault();
        const href = element.getAttribute("href");
        const target = href.length > 1 ? root.querySelector(href) : null;
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (id.includes("open-add") || text.includes("add new medicine")) {
        setPage("addMedicine");
        return;
      }
      if (text.includes("back to schedule") || text === "back" || id.includes("close-add")) {
        setPage("schedule");
        return;
      }
      if (id.includes("copy-btn") || text.includes("copy code")) {
        const code = root.querySelector("#linking-code-text")?.textContent || "MB-349277";
        try {
          await navigator.clipboard.writeText(code);
          notify("Linking code copied.");
        } catch {
          notify(`Your linking code is ${code}`);
        }
        return;
      }
      if (id.includes("share-btn") || text.includes("share code")) {
        const code = root.querySelector("#linking-code-text")?.textContent || "MB-349277";
        if (navigator.share) {
          try {
            await navigator.share({ title: "MediBridge linking code", text: `Connect with me on MediBridge: ${code}` });
          } catch (error) {
            if (error.name !== "AbortError") notify("Unable to share the linking code.");
          }
        } else {
          notify(`Share this code with your caretaker: ${code}`);
        }
        return;
      }
      if (id.includes("toggle-qr")) {
        const qr = root.querySelector("#qr-container");
        if (qr) {
          const hidden = qr.classList.toggle("hidden");
          qr.classList.toggle("flex", !hidden);
          const label = root.querySelector("#qr-toggle-label");
          if (label) label.textContent = hidden ? "Show QR Code" : "Hide QR Code";
        }
        return;
      }
      if (id.includes("btn-read-aloud") || text.includes("listen")) {
        if (!("speechSynthesis" in window)) {
          notify("Text-to-speech is not supported in this browser.");
          return;
        }
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(root.innerText.slice(0, 900)));
        return;
      }
      if (id.includes("btn-trigger-confirm") || text.includes("take dose now") || text.includes("mark as taken")) {
        setPoints((value) => value + 10);
        notify("Dose marked as taken. 10 reward points added.");
        return;
      }
      if (text.includes("remind me in 15")) {
        notify("Reminder set for 15 minutes.");
        return;
      }
      if (text.includes("save & sync")) {
        const name = root.querySelector("#medicine-name")?.value?.trim();
        if (!name) {
          notify("Please enter a medicine name first.");
          return;
        }
        const dosage = root.querySelector('input[placeholder="Dosage value"]')?.value?.trim() || "";
        setMedications((value) => [...value, { name, dosage }]);
        notify(`${name} saved to your schedule.`);
        setPage("schedule");
        return;
      }
      if (text.includes("save appointment")) {
        const form = element.closest("form") || root.querySelector("#quick-add-form");
        const details = [...(form?.querySelectorAll("input,textarea,select") || [])]
          .map((input) => input.value.trim())
          .filter(Boolean)
          .join(" • ");
        if (!details) {
          notify("Enter appointment details first.");
          return;
        }
        setAppointmentList((value) => [...value, { details }]);
        notify("Appointment saved.");
        return;
      }
      if (id.includes("sos-button") || text.includes("sos")) {
        notify("SOS is a demo and did not contact emergency services. Call your local emergency number for urgent help.");
        return;
      }
      if (text.includes("false alarm")) {
        notify("No active SOS alert exists in this demo.");
        return;
      }
      if (text.includes("manage")) {
        notify("Emergency contact management is not configured in this demo.");
        return;
      }
      if (text.includes("reject") || text.includes("revoke")) {
        saveProfile(CARETAKER_PROFILE_KEY, {
          ...caretakerProfile,
          connectionStatus: text.includes("revoke") ? "revoked" : "rejected",
        });
        notify(text.includes("revoke") ? "Caretaker access revoked." : "Connection request rejected.");
        return;
      }
      if (text.includes("approve") || element.classList.contains("senior-approve-request")) {
        saveProfile(CARETAKER_PROFILE_KEY, { ...caretakerProfile, connectionStatus: "approved" });
        notify("Caretaker connection approved.");
        return;
      }
      if (text.includes("cancel visit") || text === "cancel") {
        notify("Appointment cancellation is not connected to a clinic.");
      }
    };

    const handleSubmit = (event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      if (form.id === "form-add-medicine") {
        event.preventDefault();
        const name = form.querySelector("#med-name")?.value?.trim();
        if (!name) {
          notify("Please enter a medicine name first.");
          return;
        }
        setMedications((value) => [...value, {
          name,
          dosage: form.querySelector("#med-dosage")?.value?.trim() || "",
        }]);
        notify(`${name} saved to your schedule.`);
        setPage("schedule");
      }
    };

    root.addEventListener("click", handleClick);
    root.addEventListener("submit", handleSubmit);
    return () => {
      root.removeEventListener("click", handleClick);
      root.removeEventListener("submit", handleSubmit);
    };
  }, [page, caretakerProfile]);

  const navKeys = ["schedule", "careCircle", "rewards", "appointments", "sos"];
  return (
    <div className="senior-dashboard">
      <div id="senior-screen-content" key={page} dangerouslySetInnerHTML={{ __html: markup }} />
      {page !== "addMedicine" && (
        <nav className="bottom-nav" aria-label="Senior portal navigation">
          {navKeys.map((key) => (
            <button key={key} className={page === key ? "active" : ""} onClick={() => setPage(key)}>
              <span className="material-symbols-outlined">{screens[key].icon}</span>
              <small>{screens[key].label}</small>
            </button>
          ))}
        </nav>
      )}
      {page === "addMedicine" && <button className="back-fab" onClick={() => setPage("schedule")}>Back to Schedule</button>}
      {toast && <div className="senior-toast" role="status">{toast}</div>}
    </div>
  );
}
