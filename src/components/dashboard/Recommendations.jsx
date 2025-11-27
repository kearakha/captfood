"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RecommendationCard from "./RecommendationCard";

const items = [
  {
    image:
      "https://images.unsplash.com/photo-1630315500315-43112e2bfd88?q=80&w=400&auto=format&fit=crop",
    title: "Ayam Bakar Pak Yanto",
    details: "1 Porsi · 350 Kalori",
  },
  {
    image:
      "https://images.unsplash.com/photo-1680674774705-90b4904b3a7f?q=80&w=400&auto=format&fit=crop",
    title: "Nasi Goreng Khas",
    details: "1 Porsi · 400 Kalori",
  },
  {
    image:
      "https://images.unsplash.com/photo-1630910104722-21fe97230ef9?q=80&w=400&auto=format&fit=crop",
    title: "Sayur Asem Segar",
    details: "1 Porsi · 150 Kalori",
  },
  {
    image:
      "https://images.unsplash.com/photo-1630910104722-21fe97230ef9?q=80&w=400&auto=format&fit=crop",
    title: "Sayur Asem Segar",
    details: "1 Porsi · 150 Kalori",
  },
  {
    image:
      "https://images.unsplash.com/photo-1630910104722-21fe97230ef9?q=80&w=400&auto=format&fit=crop",
    title: "Sayur Asem Segar",
    details: "1 Porsi · 150 Kalori",
  },
];

const MEAL_ORDER = ["breakfast", "lunch", "dinner", "snack"];

export default function Recommendations() {
  const [hasEntriesToday, setHasEntriesToday] = useState(false);
  const [nextMeal, setNextMeal] = useState("lunch"); // default kalau belum ada apa-apa

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

      const todays = entries.filter((e) => {
        if (!e?.at) return false;
        const d = new Date(e.at);
        if (Number.isNaN(d.getTime())) return false;
        return isSameDay(d, today);
      });

      if (!todays.length) {
        setHasEntriesToday(false);
        return;
      }

      setHasEntriesToday(true);

      // sort berdasarkan waktu lalu ambil entry paling akhir (last meal)
      todays.sort((a, b) => new Date(a.at) - new Date(b.at));
      const last = todays[todays.length - 1];
      const lastKey = (last.meal || "").toLowerCase();

      const idx = MEAL_ORDER.indexOf(lastKey);
      const nextKey =
        idx === -1
          ? "lunch"
          : MEAL_ORDER[Math.min(idx + 1, MEAL_ORDER.length - 1)];

      setNextMeal(nextKey);
    } catch {
      // ignore error parsing
    }
  }, []);

  if (!hasEntriesToday) return null;

  return (
    <section>
      <h3 className="text-lg font-semibold mb-2">
        Try AI Menu Recommendation
      </h3>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((it, i) => {
          const menuQuery = encodeURIComponent(it.title);
          return (
            <Link
              key={i}
              // kirim juga meal = nextMeal -> /recomenai?menu=...&meal=dinner
              href={`/recomenai?menu=${menuQuery}&meal=${nextMeal}`}
              className="shrink-0"
            >
              <RecommendationCard
                image={it.image}
                title={it.title}
                details={it.details}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
