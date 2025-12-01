"use client";

import { useEffect, useState } from "react";
import { FireIcon } from "@heroicons/react/24/solid";

// helper kecil (versi sama dengan di account, tapi dipakai di sini saja)
const PROFILE_KEY = "captfood:profile";

function loadProfile() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function calcTargetCalories(weightKg, goal = "maintain") {
  const w = Number(weightKg) || 0;
  if (!w) return 2500;
  const maintain = w * 30;
  if (goal === "lose") return Math.round(maintain - 300);
  if (goal === "gain") return Math.round(maintain + 300);
  return Math.round(maintain);
}

export default function TodayPlan() {
  const [target, setTarget] = useState(2500);
  const [loggedKcal, setLoggedKcal] = useState(0);

   useEffect(() => {
    if (typeof window === "undefined") return;

    function reloadData() {
      // --- 1) load profile ---
      const prof = loadProfile();
      if (prof?.targetCalories) {
        setTarget(prof.targetCalories);
      } else if (prof?.weightKg) {
        setTarget(calcTargetCalories(prof.weightKg, prof.goal));
      }

      // --- 2) load entries today ---
      try {
        const raw = localStorage.getItem("captfood:entries");
        if (!raw) return;

        const entries = JSON.parse(raw);
        const today = new Date();

        const isSameDay = (d1, d2) =>
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate();

        const total = entries.reduce((sum, e) => {
          if (!e?.at) return sum;
          const d = new Date(e.at);
          if (Number.isNaN(d.getTime())) return sum;
          if (!isSameDay(d, today)) return sum;
          return sum + Number(e.kcal ?? 0);
        }, 0);

        setLoggedKcal(total);
      } catch {}
    }

    // Load pertama kali
    reloadData();

    // 🔥 Listen event profile updated
    window.addEventListener("profile_updated", reloadData);

    return () => {
      window.removeEventListener("profile_updated", reloadData);
    };
  }, []);

  const left = Math.max(0, Math.round(target - loggedKcal));
  const progressPercent =
    target > 0 ? Math.min(100, (loggedKcal / target) * 100) : 0;

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <h3 className="text-sm text-gray-500 mb-2">{"Today's Plan:"}</h3>

      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="text-5xl font-bold text-gray-900">
            {left}
          </span>
          <p className="text-gray-500 text-sm mt-1">Calories left</p>
        </div>

        <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
          <FireIcon className="w-7 h-7 text-orange-500" />
        </div>
      </div>

      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
}
