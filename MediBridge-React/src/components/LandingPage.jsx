import React from "react";
import "./LandingPage.css";

export default function LandingPage({ onSelectRole = () => {} }) {
  const handleSelect = (role) => {
    if (window.navigator?.vibrate) window.navigator.vibrate(30);
    onSelectRole(role);
  };

  return (
    <main className="landing-page">
      <div className="landing-glow" aria-hidden="true" />

      <div className="landing-content">
        <header className="landing-brand">
          <div className="brand-icon" aria-hidden="true">
            <span className="material-symbols-outlined shield-icon">shield</span>
            <span className="material-symbols-outlined plus-icon">add</span>
          </div>
          <div className="brand-name">MediBridge</div>
          <div className="certified-badge">
            <span className="status-dot" />
            Certified Care Platform
          </div>
        </header>

        <section className="landing-intro">
          <h1>Welcome to MediBridge</h1>
          <p>Smart medicine care for you and your loved ones.</p>
        </section>

        <section className="role-cards" aria-label="Choose your role">
          <article className="role-card senior-card">
            <div>
              <div className="role-card-top">
                <div className="role-icon senior-icon">
                  <span className="material-symbols-outlined">elderly</span>
                </div>
                <span className="role-tag teal-tag">
                  <span className="material-symbols-outlined">hearing</span>
                  Simple &amp; Clear
                </span>
              </div>

              <h2>I'm a Senior Citizen</h2>
              <p>Manage my medicines and health routine.</p>

              <div className="role-note">
                <span className="material-symbols-outlined">accessibility_new</span>
                <span>Extra-large buttons &amp; voice assistance included</span>
              </div>
            </div>

            <button
              className="role-button senior-button"
              type="button"
              onClick={() => handleSelect("senior")}
            >
              Continue as Senior Citizen
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </article>

          <article className="role-card caregiver-card">
            <div>
              <div className="role-card-top">
                <div className="role-icon caregiver-icon">
                  <span className="material-symbols-outlined">volunteer_activism</span>
                </div>
                <span className="role-tag blue-tag">
                  <span className="material-symbols-outlined">sync</span>
                  Live Sync
                </span>
              </div>

              <h2>I'm a Caretaker</h2>
              <p>Monitor and stay connected with your loved ones.</p>

              <div className="role-note">
                <span className="material-symbols-outlined">link</span>
                <span>Connect instantly using your senior's Linking Code</span>
              </div>
            </div>

            <button
              className="role-button caregiver-button"
              type="button"
              onClick={() => handleSelect("caregiver")}
            >
              Continue as Caretaker
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </article>
        </section>

        <footer className="landing-footer">
          <a href="tel:18005550199" className="helpline">
            <span className="helpline-icon material-symbols-outlined">call</span>
            <span className="helpline-copy">
              <small>Need help getting started?</small>
              <strong>Call free helpline 1-800-555-0199</strong>
            </span>
          </a>
        </footer>
      </div>
    </main>
  );
}
