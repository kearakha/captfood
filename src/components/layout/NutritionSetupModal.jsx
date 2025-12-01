"use client";

import { useState } from "react";

const PROFILE_KEY = "captfood:profile";

function calcTargetCalories(weightKg, goal = "maintain") {
  const w = Number(weightKg) || 0;
  if (!w) return 2500;
  const maintain = w * 30;
  if (goal === "lose") return Math.round(maintain - 300);
  if (goal === "gain") return Math.round(maintain + 300);
  return Math.round(maintain);
}

export default function NutritionSetupModal({ onComplete }) {
  const [weightKg, setWeightKg] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [goal, setGoal] = useState("maintain");

  const isComplete =
    weightKg.trim() !== "" && heightCm.trim() !== "" && goal;

  const estimated = isComplete
    ? calcTargetCalories(weightKg, goal)
    : null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const w = Number(weightKg);
    const h = Number(heightCm);
    const targetCalories = calcTargetCalories(w, goal);

    const profile = {
      weightKg: w,
      heightCm: h,
      goal,
      targetCalories,
    };

    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    localStorage.setItem("captfood:needsSetup", "false");

    window.dispatchEvent(new Event("profile_updated"));

    if (onComplete) onComplete(); // Tutup modal
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          Set Your Nutrition Plan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm">Weight (kg)</label>
            <input
              type="number"
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Height (cm)</label>
            <input
              type="number"
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Goal</label>
            <select
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            >
              <option value="lose">Lose weight</option>
              <option value="maintain">Maintain</option>
              <option value="gain">Gain weight</option>
            </select>
          </div>

          {estimated && (
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-sm">
              Estimated:  
              <span className="font-semibold text-blue-700">
                {" "}{estimated} kcal/day
              </span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
