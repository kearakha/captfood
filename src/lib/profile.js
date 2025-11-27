// src/lib/profile.js
export const PROFILE_KEY = "captfood:profile";

// perhitungan simple: maintenance ≈ 30 * berat (kg)
export function calcTargetCalories({ weightKg, goal = "maintain" }) {
  const w = Number(weightKg) || 0;
  const maintain = w * 30; // dummy sederhana

  if (!maintain) return 2500; // fallback

  if (goal === "lose") return Math.round(maintain - 300);
  if (goal === "gain") return Math.round(maintain + 300);
  return Math.round(maintain);
}

export function loadProfile() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveProfile(profile) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {}
}
