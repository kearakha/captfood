"use client";

import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const PROFILE_KEY = "captfood:profile";

function calcTargetCalories(weightKg, goal = "maintain") {
  const w = Number(weightKg) || 0;
  if (!w) return 2500; // default kalau belum isi
  const maintain = w * 30; // rumus dummy
  if (goal === "lose") return Math.round(maintain - 300);
  if (goal === "gain") return Math.round(maintain + 300);
  return Math.round(maintain);
}

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

function saveProfile(profile) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {}
}

export default function NutritionPlanPage() {
  const [weightKg, setWeightKg] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [goal, setGoal] = useState("maintain");
  const [targetCalories, setTargetCalories] = useState(2500);

  // load profile kalau sudah pernah disimpan
  useEffect(() => {
    const prof = loadProfile();
    if (!prof) return;
    if (prof.weightKg != null) setWeightKg(String(prof.weightKg));
    if (prof.heightCm != null) setHeightCm(String(prof.heightCm));
    if (prof.goal) setGoal(prof.goal);
    if (prof.targetCalories) setTargetCalories(prof.targetCalories);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const w = parseFloat(weightKg) || 0;
    const h = parseFloat(heightCm) || 0;
    const tgt = calcTargetCalories(w, goal);

    const profile = {
      weightKg: w,
      heightCm: h,
      goal,
      targetCalories: tgt,
    };

    saveProfile(profile);
    setTargetCalories(tgt);
    alert("Nutrition plan updated!");
  };

  return (
    <main className="max-w-lg mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard">
          <ArrowLeftIcon className="w-6 h-6 text-gray-600 cursor-pointer" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Nutrition Plan</h1>
      </div>

      <section className="bg-white border rounded-xl shadow-sm p-4 space-y-4">
        <div>
          <p className="text-sm font-semibold text-gray-800">
            Your Daily Calorie Plan
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Masukkan berat, tinggi, dan tujuanmu. CaptFood akan menghitung
            estimasi kebutuhan kalori harian.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-700">
                Weight
              </label>
              <div className="flex items-center gap-2 mt-1 p-3 bg-gray-50 border rounded-lg">
                <input
                  type="number"
                  step="0.1"
                  className="flex-1 outline-none text-sm bg-transparent"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  placeholder="e.g. 60"
                />
                <span className="text-xs text-gray-500">kg</span>
              </div>
            </div>

            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-700">
                Height
              </label>
              <div className="flex items-center gap-2 mt-1 p-3 bg-gray-50 border rounded-lg">
                <input
                  type="number"
                  className="flex-1 outline-none text-sm bg-transparent"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  placeholder="e.g. 170"
                />
                <span className="text-xs text-gray-500">cm</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700">
              Goal
            </label>
            <select
              className="mt-1 w-full p-3 bg-gray-50 border rounded-lg text-sm"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            >
              <option value="lose">Lose weight</option>
              <option value="maintain">Maintain</option>
              <option value="gain">Gain weight / muscle</option>
            </select>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-sm">
            <p className="text-xs text-gray-600">
              Estimated daily calories:
            </p>
            <p className="text-base font-semibold text-blue-700">
              {targetCalories} kcal / day
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700"
          >
            Update Nutrition Plan
          </button>
        </form>
      </section>
    </main>
  );
}
