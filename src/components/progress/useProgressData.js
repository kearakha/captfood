// src/components/progress/useProgressData.js
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  loadProfile as loadRawProfile,
  saveProfile as saveRawProfile,
} from "@/lib/profile";

const ENTRY_KEY = "captfood:entries";
const WEIGHT_HISTORY_KEY = "captfood:weightHistory";

const DEFAULT_PROFILE = {
  name: "User",
  email: "user@example.com",
  weight: 70,
  height: 170,
  targetWeight: 65,
  dailyCalories: 2000,
  targetProtein: 120,
  targetCarbs: 250,
  targetFat: 60,
};

function normalizeProfile(raw) {
  const p = raw || {};
  return {
    name: p.name || "User",
    email: p.email || "user@example.com",
    weight: Number(p.weight || 70),
    height: Number(p.height || 170),
    targetWeight: Number(p.targetWeight || p.target_weight || 65),
    dailyCalories: Number(p.dailyCalories || p.daily_calories || 2000),
    targetProtein: Number(p.targetProtein || p.target_protein || 120),
    targetCarbs: Number(p.targetCarbs || p.target_carbs || 250),
    targetFat: Number(p.targetFat || p.target_fat || 60),
  };
}

// ===== Helper tanggal → "YYYY-MM-DD" =====
function normalizeDateKey(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateFromISO(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

// ===== BMI =====
function calcBMI(weightKg, heightCm) {
  if (!weightKg || !heightCm) return { bmi: 0, status: "-" };
  const hM = heightCm / 100;
  const bmi = weightKg / (hM * hM);

  let status = "Normal";
  if (bmi < 18.5) status = "Underweight";
  else if (bmi >= 25 && bmi < 30) status = "Overweight";
  else if (bmi >= 30) status = "Obese";

  return { bmi: Number(bmi.toFixed(1)), status };
}

// ===== Entries makan dari localStorage =====
function loadEntries() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ENTRY_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr;
  } catch {
    return [];
  }
}

// agregasi entries per tanggal
function aggregateByDate(entries) {
  const map = {}; // key: YYYY-MM-DD → {calorie, protein, carbs, fat}

  for (const e of entries) {
    const d = e?.at ? parseDateFromISO(e.at) : null;
    if (!d) continue;
    const key = normalizeDateKey(d);

    if (!map[key]) {
      map[key] = { calorie: 0, protein: 0, carbs: 0, fat: 0 };
    }

    const kcal = Number(e.kcal || e.calorie || 0);
    const p = Number(e.macro?.p ?? e.protein ?? 0);
    const c = Number(e.macro?.c ?? e.carbs ?? e.carb ?? 0);
    const f = Number(e.macro?.f ?? e.fat ?? 0);

    map[key].calorie += kcal;
    map[key].protein += p;
    map[key].carbs += c;
    map[key].fat += f;
  }

  return map;
}

// ===== Riwayat berat =====
function loadWeightHistory(defaultWeight) {
  if (typeof window === "undefined") {
    return [
      {
        date: normalizeDateKey(new Date()),
        weight: defaultWeight,
      },
    ];
  }

  try {
    const raw = localStorage.getItem(WEIGHT_HISTORY_KEY);
    if (!raw) {
      const today = {
        date: normalizeDateKey(new Date()),
        weight: defaultWeight,
      };
      localStorage.setItem(WEIGHT_HISTORY_KEY, JSON.stringify([today]));
      return [today];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveWeightHistory(history) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WEIGHT_HISTORY_KEY, JSON.stringify(history));
  } catch {}
}

// ========================================================
//                     HOOK UTAMA
// ========================================================
export default function useProgressData() {
  // === STATE DASAR ===
  // ⚠️ Tidak akses window di initial state → aman untuk SSR & hydration
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [entries, setEntries] = useState([]);
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [mode, setMode] = useState("weekly"); // "weekly" | "monthly"
  const [weightHistory, setWeightHistory] = useState(() => [
    {
      date: normalizeDateKey(new Date()),
      weight: DEFAULT_PROFILE.weight,
    },
  ]);

  // Setelah mount, baru sync dengan localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const initialLoad = () => {
      const rawProfile = loadRawProfile();
      const nextProfile = normalizeProfile(rawProfile) || DEFAULT_PROFILE;
      const nextEntries = loadEntries();
      const nextHistory = loadWeightHistory(nextProfile.weight);

      setProfile(nextProfile);
      setEntries(nextEntries);
      setWeightHistory(nextHistory);
    };

    initialLoad();

    const handleStorage = () => {
      initialLoad();
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // === DAILY AGGREGATE ===
  const dailyAgg = useMemo(() => aggregateByDate(entries), [entries]);

  const daily = useMemo(() => {
    const key = normalizeDateKey(currentDate);
    const todayKey = normalizeDateKey(new Date());
    const agg = dailyAgg[key] || {
      calorie: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    };

    const isToday = key === todayKey;

    const dateLabel =
      key === todayKey
        ? "Hari Ini"
        : currentDate.toLocaleDateString("id-ID", {
            weekday: "short",
            month: "short",
            day: "numeric",
          });

    return {
      dateLabel,
      calorie: Math.round(agg.calorie),
      protein: Math.round(agg.protein),
      carbs: Math.round(agg.carbs),
      fat: Math.round(agg.fat),
      isToday,
    };
  }, [currentDate, dailyAgg]);

  const prevDay = () => {
    setCurrentDate((d) => {
      const nd = new Date(d);
      nd.setDate(nd.getDate() - 1);
      return nd;
    });
  };

  const nextDay = () => {
    setCurrentDate((d) => {
      const today = new Date();
      const todayKey = normalizeDateKey(today);
      const currentKey = normalizeDateKey(d);
      if (currentKey === todayKey) return d; // tidak lewat hari ini

      const nd = new Date(d);
      nd.setDate(nd.getDate() + 1);
      return nd;
    });
  };

  // === BODY METRICS (BB, target, BMI) ===
  const weight = profile.weight;
  const targetWeight = profile.targetWeight;
  const { bmi, status: bmiStatus } = calcBMI(profile.weight, profile.height);
  const bmiValue = bmi;

  const persistProfile = (next) => {
    setProfile(next);
    saveRawProfile(next); // pakai helper dari lib/profile
  };

  const updateWeight = (newWeight) => {
    const w = Number(newWeight);
    if (!w || Number.isNaN(w)) return;
    const nextProfile = { ...profile, weight: w };
    persistProfile(nextProfile);

    // tambahkan ke riwayat berat
    const todayKey = normalizeDateKey(new Date());
    let nextHistory = [...weightHistory];
    const existingIdx = nextHistory.findIndex((h) => h.date === todayKey);
    if (existingIdx >= 0) {
      nextHistory[existingIdx] = { date: todayKey, weight: w };
    } else {
      nextHistory.push({ date: todayKey, weight: w });
    }
    // urutkan berdasar tanggal
    nextHistory.sort((a, b) => (a.date < b.date ? -1 : 1));
    setWeightHistory(nextHistory);
    saveWeightHistory(nextHistory);
  };

  const updateTarget = (newTarget) => {
    const t = Number(newTarget);
    if (!t || Number.isNaN(t)) return;
    const nextProfile = { ...profile, targetWeight: t };
    persistProfile(nextProfile);
  };

  // === WEIGHT TREND (untuk WeightTrendChart) ===
  const weightTrend = useMemo(() => {
    if (!weightHistory.length) {
      const todayKey = normalizeDateKey(new Date());
      return {
        labels: [todayKey],
        values: [weight],
      };
    }

    // ambil max 8 titik terakhir
    const last = weightHistory.slice(-8);
    return {
      labels: last.map((h) =>
        new Date(h.date).toLocaleDateString("id-ID", {
          month: "short",
          day: "numeric",
        })
      ),
      values: last.map((h) => Number(h.weight || 0)),
    };
  }, [weightHistory, weight]);

  // === CALORIE TREND (Weekly / Monthly) ===
  const { weeklyCalories, monthlyCalories } = useMemo(() => {
    const today = new Date();

    // helper: ambil kalori suatu tanggal (default 0)
    const getKcal = (d) => {
      const k = normalizeDateKey(d);
      const agg = dailyAgg[k];
      return agg ? Math.round(agg.calorie) : 0;
    };

    // weekly: 7 hari terakhir (mundur dari hari ini)
    const weeklyLabels = [];
    const weeklyValues = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      weeklyLabels.push(
        d.toLocaleDateString("id-ID", { weekday: "short", day: "numeric" })
      );
      weeklyValues.push(getKcal(d));
    }

    // monthly: 30 hari terakhir (step per 3 hari biar tidak terlalu padat)
    const monthlyLabels = [];
    const monthlyValues = [];
    for (let i = 29; i >= 0; i -= 3) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      monthlyLabels.push(
        d.toLocaleDateString("id-ID", { month: "short", day: "numeric" })
      );
      monthlyValues.push(getKcal(d));
    }

    return {
      weeklyCalories: {
        labels: weeklyLabels,
        values: weeklyValues,
      },
      monthlyCalories: {
        labels: monthlyLabels,
        values: monthlyValues,
      },
    };
  }, [dailyAgg]);

  return {
    // daily summary
    daily,
    prevDay,
    nextDay,

    // body metrics
    weight,
    targetWeight,
    bmiValue,
    bmiStatus,
    updateWeight,
    updateTarget,

    // charts
    weightTrend,
    weeklyCalories,
    monthlyCalories,

    // time filter
    mode,
    setMode,
  };
}
