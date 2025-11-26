'use client'

import { useEffect, useRef } from "react";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

export default function DailyNutrientChart({ calorie, protein, carbs, fat }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current;

    // Destroy chart if already exists
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Protein", "Karbo", "Lemak"],
        datasets: [
          {
            data: [protein, carbs, fat],
            backgroundColor: ["#34c759", "#ff9500", "#5856d6"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "bottom",
            labels: { boxWidth: 10, padding: 10 },
          },
        },
        cutout: "60%",
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => chartRef.current?.destroy();
  }, [protein, carbs, fat]);

  return (
    <div className="w-[140px] h-[140px]">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
