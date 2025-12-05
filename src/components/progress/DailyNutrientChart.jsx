// src/components/progress/DailyNutrientChart.jsx
"use client";

import "@/lib/chartConfig";          // ⬅️ register Chart.js global
import { Doughnut } from "react-chartjs-2";

export default function DailyNutrientChart({
  calorie,
  protein,
  carbs,
  fat,
}) {
  // jaga-jaga kalau undefined / string
  const p = Number(protein) || 0;
  const c = Number(carbs) || 0;
  const f = Number(fat) || 0;

  const data = {
    labels: ["Protein", "Karbohidrat", "Lemak"],
    datasets: [
      {
        data: [p, c, f],
        backgroundColor: ["#34c759", "#ff9500", "#5856d6"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 12 },
      },
    },
  };

  return (
    <div className="w-40 h-40">
      <Doughnut data={data} options={options} />
    </div>
  );
}
