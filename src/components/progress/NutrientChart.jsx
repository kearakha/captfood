"use client";

import "@/lib/chartConfig";        // <— penting: ini yang register semuanya
import { Doughnut } from "react-chartjs-2";

export default function NutrientChart({ data }) {
  if (!data) return null;

  const chartData = {
    labels: ["Protein", "Carbs", "Fat"],
    datasets: [
      {
        data: [
          data.protein ?? 0,
          data.carbs ?? 0,
          data.fat ?? 0,
        ],
        backgroundColor: ["#34c759", "#ff9500", "#5856d6"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom", labels: { boxWidth: 12 } },
    },
  };

  return (
    <div className="w-full h-[200px] flex justify-center items-center">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}
