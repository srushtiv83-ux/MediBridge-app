export const CARETAKER_PROFILE_KEY = 'medibridge-caretaker-profile';
export const SENIOR_PROFILE_KEY = 'medibridge-senior-profile';

const PROFILE_UPDATED_EVENT = 'medibridge:profile-updated';

export function readProfile(key) {
  const saved = localStorage.getItem(key);
  if (!saved) return {};

  try {
    const profile = JSON.parse(saved);
    return profile && typeof profile === 'object' && !Array.isArray(profile) ? profile : {};
  } catch (error) {
    console.error(`Unable to read stored profile "${key}".`, error);
    return {};
  }
}

export function readProfiles() {
  return {
    caretaker: readProfile(CARETAKER_PROFILE_KEY),
    senior: readProfile(SENIOR_PROFILE_KEY),
  };
}

export function saveProfile(key, profile) {
  localStorage.setItem(key, JSON.stringify(profile));
  window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT));
}

export function subscribeToProfileUpdates(onUpdate) {
  window.addEventListener(PROFILE_UPDATED_EVENT, onUpdate);
  window.addEventListener('storage', onUpdate);

  return () => {
    window.removeEventListener(PROFILE_UPDATED_EVENT, onUpdate);
    window.removeEventListener('storage', onUpdate);
  };
}
