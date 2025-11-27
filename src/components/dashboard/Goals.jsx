"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDrumstickBite,
  faBreadSlice,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";
import GoalCard from "./GoalCard";

const PROFILE_KEY = "captfood:profile";
const ENTRIES_KEY = "captfood:entries";

// ambil profile dari localStorage
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

// hitung target kalori (fallback kalau di profile belum ada)
function calcTargetCalories(weightKg, goal = "maintain") {
  const w = Number(weightKg) || 0;
  if (!w) return 2500;
  const maintain = w * 30; // rumus dummy simpel
  if (goal === "lose") return Math.round(maintain - 300);
  if (goal === "gain") return Math.round(maintain + 300);
  return Math.round(maintain);
}

// hitung target makro harian (gram) berbasis berat & kalori target
function calcMacroTargets(weightKg, targetCalories) {
  const w = Number(weightKg) || 60; // fallback 60kg
  const total = Number(targetCalories) || 2000;

  const protein = Math.round(Math.max(1.6 * w, 60)); // min 60g
  const fat = Math.round(Math.max(0.8 * w, (total * 0.2) / 9)); // minimal 20% kalori
  const usedCal = protein * 4 + fat * 9;
  const carbs = Math.max(0, Math.round((total - usedCal) / 4));

  return { protein, carbs, fat };
}

// jumlahkan makro yang dimakan hari ini
function getTodayMacros() {
  if (typeof window === "undefined") return { p: 0, c: 0, f: 0 };

  try {
    const raw = localStorage.getItem(ENTRIES_KEY);
    if (!raw) return { p: 0, c: 0, f: 0 };

    const entries = JSON.parse(raw);
    const today = new Date();

    const isSameDay = (d1, d2) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    return entries.reduce(
      (acc, e) => {
        if (!e?.at || !e?.macro) return acc;
        const d = new Date(e.at);
        if (Number.isNaN(d.getTime())) return acc;
        if (!isSameDay(d, today)) return acc;

        const p = Number(e.macro.p ?? 0);
        const c = Number(e.macro.c ?? 0);
        const f = Number(e.macro.f ?? 0);

        return {
          p: acc.p + p,
          c: acc.c + c,
          f: acc.f + f,
        };
      },
      { p: 0, c: 0, f: 0 }
    );
  } catch {
    return { p: 0, c: 0, f: 0 };
  }
}

// bikin teks "Xg Left" / "Xg Over"
function makeStatus(current, target) {
  const t = Math.round(target || 0);
  const c = Math.round(current || 0);

  if (!t) return "-";

  const diff = t - c;
  const abs = Math.abs(diff);

  if (abs <= 1) return "Goal reached";
  if (diff > 0) return `${abs}g Left`;
  return `${abs}g Over`;
}

export default function Goals() {
  const [status, setStatus] = useState({
    protein: "-",
    carbs: "-",
    fat: "-",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prof = loadProfile();
    const weight = prof?.weightKg ?? 60;
    const targetCalories =
      prof?.targetCalories ?? calcTargetCalories(weight, prof?.goal);

    const macroTargets = calcMacroTargets(weight, targetCalories);
    const today = getTodayMacros();

    setStatus({
      protein: makeStatus(today.p, macroTargets.protein),
      carbs: makeStatus(today.c, macroTargets.carbs),
      fat: makeStatus(today.f, macroTargets.fat),
    });
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Goals:</h3>

      <div className="grid grid-cols-3 gap-3">
        <GoalCard
          icon={<FontAwesomeIcon icon={faDrumstickBite} className="w-5 h-5 text-purple-600" />}
          title="Protein"
          status={status.protein}
        />

        <GoalCard
          icon={<FontAwesomeIcon icon={faBreadSlice} className="w-5 h-5 text-yellow-600" />}
          title="Carbs"
          status={status.carbs}
        />

        <GoalCard
          icon={<FontAwesomeIcon icon={faCheese} className="w-5 h-5 text-blue-600" />}
          title="Fat"
          status={status.fat}
        />
      </div>
    </div>
  );
}
