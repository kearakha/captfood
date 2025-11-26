"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function NutrientChart({ data }) {
  if (!data) return null;

  const chartData = {
    labels: ["Protein", "Carbs", "Fat"],
    datasets: [
      {
        data: [data.protein, data.carbs, data.fat],
        backgroundColor: ["#34c759", "#ff9500", "#5856d6"],
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom", labels: { boxWidth: 12 } }
    }
  };

  return (
    <div className="w-full h-[200px] flex justify-center items-center">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}
