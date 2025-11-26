'use client'

import { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DailySummaryCard({ getDailyLog }) {
  const [date, setDate] = useState(new Date());

  const formatDate = (d) => {
    const today = new Date();
    if (d.toDateString() === today.toDateString()) return "Hari Ini";
    return d.toLocaleDateString("id-ID", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const log = getDailyLog(date);

  const donutData = {
    labels: ["Protein", "Karbohidrat", "Lemak"],
    datasets: [
      {
        data: [log.protein, log.carbs, log.fat],
        backgroundColor: ["#34c759", "#ff9500", "#5856d6"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="bg-white rounded-2xl shadow p-5 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Ringkasan Nutrisi Harian
      </h3>

      {/* NAV HARI */}
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <button
          onClick={() => {
            const newD = new Date(date);
            newD.setDate(newD.getDate() - 1);
            setDate(newD);
          }}
          className="text-blue-600 p-2"
        >
          ←
        </button>

        <span className="font-semibold">{formatDate(date)}</span>

        <button
          onClick={() => {
            const today = new Date();
            if (date < today) {
              const newD = new Date(date);
              newD.setDate(newD.getDate() + 1);
              setDate(newD);
            }
          }}
          className={`p-2 ${
            date.toDateString() === new Date().toDateString()
              ? "text-gray-400"
              : "text-blue-600"
          }`}
        >
          →
        </button>
      </div>

      {/* GRID */}
      <div className="flex gap-4">

        {/* KANAN: Makro */}
        <div className="grid grid-cols-2 gap-4 flex-1 border-r pr-4">
          <div className="text-center">
            <span className="text-xl font-bold">{log.calorie}</span>
            <div className="text-xs text-gray-500">Kalori</div>
          </div>

          <div className="text-center">
            <span className="text-xl font-bold">{log.protein}g</span>
            <div className="text-xs text-gray-500">Protein</div>
          </div>

          <div className="text-center">
            <span className="text-xl font-bold">{log.carbs}g</span>
            <div className="text-xs text-gray-500">Karbo</div>
          </div>

          <div className="text-center">
            <span className="text-xl font-bold">{log.fat}g</span>
            <div className="text-xs text-gray-500">Lemak</div>
          </div>
        </div>

        {/* KIRI: Donut chart */}
        <div className="flex-1 flex flex-col items-center">
          <p className="text-sm font-semibold text-gray-800 mb-2">
            Rasio Makro
          </p>
          <div className="w-40 h-40">
            <Doughnut data={donutData} />
          </div>
        </div>

      </div>
    </div>
  );
}
