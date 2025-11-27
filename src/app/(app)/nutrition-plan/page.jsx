"use client";

import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";   // ⬅️ TAMBAHAN

const PROFILE_KEY = "captfood:profile";

function calcTargetCalories(weightKg, goal = "maintain") {
  const w = Number(weightKg) || 0;
  if (!w) return 2500;
  const maintain = w * 30;
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
  const router = useRouter(); // ⬅️ TAMBAHAN

  const [weightKg, setWeightKg] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [goal, setGoal] = useState("maintain");
  const [targetCalories, setTargetCalories] = useState(2500);

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

    // ⬇️ Redirect ke dashboard setelah update
    router.push("/dashboard");
  };

  const isFormComplete =
    weightKg.trim() !== "" && heightCm.trim() !== "" && goal;

  const displayCalories = isFormComplete
    ? calcTargetCalories(weightKg, goal)
    : targetCalories;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 pt-6 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <Link href="/dashboard">
            <ArrowLeftIcon className="w-6 h-6 text-gray-600 cursor-pointer" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Nutrition Plan</h1>
        </div>

        {/* Card */}
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-5 overflow-hidden">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Your Daily Calorie Plan
            </p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Masukkan berat, tinggi, dan tujuanmu. CaptFood akan menghitung
              estimasi kebutuhan kalori harian.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Weight & Height */}
            <div className="flex gap-3 flex-wrap">
              <div className="flex-1 min-w-0">
                <label className="text-xs font-semibold text-gray-700">
                  Weight
                </label>
                <div className="flex items-center gap-2 mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
                  <input
                    type="number"
                    step="0.1"
                    className="w-full outline-none text-sm bg-transparent"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    placeholder="e.g. 60"
                  />
                  <span className="text-[11px] text-gray-500">kg</span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <label className="text-xs font-semibold text-gray-700">
                  Height
                </label>
                <div className="flex items-center gap-2 mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
                  <input
                    type="number"
                    className="w-full outline-none text-sm bg-transparent"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    placeholder="e.g. 170"
                  />
                  <span className="text-[11px] text-gray-500">cm</span>
                </div>
              </div>
            </div>

            {/* Goal */}
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Goal
              </label>
              <select
                className="mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm shadow-sm"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              >
                <option value="lose">Lose weight</option>
                <option value="maintain">Maintain</option>
                <option value="gain">Gain weight / muscle</option>
              </select>
            </div>

            {/* Estimated calories */}
            {isFormComplete && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm">
                <p className="text-xs text-gray-600">
                  Estimated daily calories:
                </p>
                <p className="text-base font-semibold text-blue-700 mt-0.5">
                  {displayCalories} kcal / day
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold shadow hover:bg-blue-700 transition"
            >
              Update Nutrition Plan
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
