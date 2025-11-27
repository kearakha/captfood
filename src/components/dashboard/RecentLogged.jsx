"use client";

import { useEffect, useState } from "react";
import RecentItem from "./RecentItem";

const MEAL_LABEL = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
};

const kcalFromMacro = (p = 0, c = 0, f = 0) =>
  Math.round(4 * p + 4 * c + 9 * f);

export default function RecentLogged() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = localStorage.getItem("captfood:entries");
      if (!raw) return;

      const entries = JSON.parse(raw);
      const today = new Date();

      const isSameDay = (d1, d2) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

      const mapped = entries
        .map((e) => {
          if (!e?.at) return null;

          const d = new Date(e.at);
          if (Number.isNaN(d.getTime())) return null;

          // hanya log hari ini
          if (!isSameDay(d, today)) return null;

          const p = e.macro?.p ?? e.protein ?? 0;
          const c = e.macro?.c ?? e.carbs ?? 0;
          const f = e.macro?.f ?? e.fat ?? 0;
          const kcal = e.kcal ?? e.calorie ?? kcalFromMacro(p, c, f);

          const mealKey = (e.meal || "").toString().toLowerCase();
          const mealLabel = MEAL_LABEL[mealKey] || "Meal";

          const timeLabel = d.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return {
            id: e.id || e.at,
            image: e.photo || e.image || null, // penting: null kalau nggak ada
            name: e.title || "Your meal",
            meal: mealLabel,
            calories: kcal,
            protein: p,
            carb: c,
            fat: f,
            time: timeLabel,
            dateValue: d.getTime(),
          };
        })
        .filter(Boolean)
        // terbaru di atas
        .sort((a, b) => b.dateValue - a.dateValue);

      setItems(mapped);
    } catch (err) {
      console.warn("Failed to read captfood:entries", err);
    }
  }, []);

  if (!items.length) {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Recent Logged:</h3>
        <p className="text-sm text-gray-500">
          Belum ada makanan yang tercatat hari ini.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Recent Logged:</h3>
      {items.map((item) => (
        <RecentItem key={item.id} item={item} />
      ))}
    </div>
  );
}
