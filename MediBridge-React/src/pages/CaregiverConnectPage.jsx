import { Children, isValidElement, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CARETAKER_PROFILE_KEY,
  readProfile,
  saveProfile,
  SENIOR_PROFILE_KEY,
} from '../profileStorage';
import {
  CircleHelp,
  Info,
  Link2,
  Mail,
  QrCode,
  ShieldCheck,
  Smartphone,
  UserRound,
} from 'lucide-react';
import './CaregiverConnectPage.css';

export default function CaregiverConnectPage() {
  const seniorProfile = readProfile(SENIOR_PROFILE_KEY);
  const savedCaretakerProfile = readProfile(CARETAKER_PROFILE_KEY);
  const [form, setForm] = useState({
    name: savedCaretakerProfile.name || '',
    email: savedCaretakerProfile.email || '',
    phone: savedCaretakerProfile.phone || '',
    code: savedCaretakerProfile.linkingCode || seniorProfile.linkingCode || '',
  });
  const [requestSent, setRequestSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [highlightCode, setHighlightCode] = useState(false);
  const linkedSeniorName = seniorProfile.linkingCode
    && form.code.trim().toUpperCase() === seniorProfile.linkingCode.toUpperCase()
    ? seniorProfile.name || ''
    : '';

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submitConnectionRequest = (event) => {
    event.preventDefault();
    if (submitting) return;
    saveProfile(CARETAKER_PROFILE_KEY, {
      ...savedCaretakerProfile,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      linkingCode: form.code.trim().toUpperCase(),
      linkedSeniorName,
      connectionStatus: 'pending',
    });
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setRequestSent(true);
    }, 600);
  };

  const showHelper = () => {
    setHighlightCode(true);
    document.getElementById('linkingCode')?.focus();
    window.setTimeout(() => setHighlightCode(false), 1200);
  };

  return (
    <main className="caregiver-connect">
      <div className="cc-shell">
        <div className="cc-ambient cc-ambient-left" />
        <div className="cc-ambient cc-ambient-right" />

        <header className="cc-heading">
          <div className="cc-eyebrow"><ShieldCheck size={18} /> Caregiver Companion Portal</div>
          <h1>Connect as a Caretaker</h1>
          <p>Link your account to support a loved one’s health journey while respecting their privacy.</p>
        </header>

        <div className="cc-grid cc-grid-single">
          <section className="cc-card cc-form-card">
            <form className="cc-form" onSubmit={submitConnectionRequest}>
              <Field label="Caretaker Full Name" icon={<UserRound />}>
                <input name="name" value={form.name} onChange={update} placeholder="Enter your full name" required autoComplete="name" />
              </Field>
              <Field label="Gmail" icon={<Mail />}>
                <input name="email" type="email" value={form.email} onChange={update} placeholder="you@gmail.com" required autoComplete="email" />
              </Field>
              <Field label="Mobile Number" icon={<Smartphone />}>
                <input name="phone" type="tel" value={form.phone} onChange={update} placeholder="e.g. (555) 234-5678" required autoComplete="tel" />
              </Field>
              <Field label="Senior Citizen Linking Code" icon={<QrCode />}>
                <div className="cc-label-row">
                  <span />
                  <button className="cc-helper" type="button" onClick={showHelper}><CircleHelp size={15} /> Where is this code?</button>
                </div>
                <input id="linkingCode" className={`cc-code-input${highlightCode ? ' is-highlighted' : ''}`} name="code" value={form.code} onChange={update} maxLength={9} placeholder="MB-XXXXXX" required autoCapitalize="characters" />
                <small className="cc-hint"><Info size={15} /> Enter the 6-character code provided on your loved one’s MediBridge dashboard.</small>
              </Field>
              {requestSent ? (
                <Link className="cc-submit" to="/caregiver/dashboard">Login</Link>
              ) : (
                <button className="cc-submit" type="submit" disabled={submitting}>
                  <Link2 size={20} /> {submitting ? 'Transmitting Link Request…' : 'Connect Account'}
                </button>
              )}
            </form>

            <blockquote className="cc-care-quote">
              “The hands that once cared for us deserve our care, patience, and love in return.”
            </blockquote>
          </section>
        </div>
      </div>
    </main>
  );
}

function Field({ label, icon, children }) {
  const input = Children.toArray(children).find((child) => isValidElement(child) && child.type === 'input');
  const inputId = input?.props.id || input?.props.name;
  return <div className="cc-field"><label htmlFor={inputId}>{label}</label><div className="cc-input-wrap"><span className="cc-field-icon">{icon}</span>{children}</div></div>;
}
