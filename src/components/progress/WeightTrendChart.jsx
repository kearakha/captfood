"use client";

import "@/lib/chartConfig";   // <- tambahkan ini

import { Line } from "react-chartjs-2";

export default function WeightTrendChart({ labels, values, target }) {
  const data = {
    labels,
    datasets: [
      {
        label: "Berat Badan",
        data: values,
        borderColor: "#007aff",
        backgroundColor: "rgba(0, 122, 255, 0.15)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Target Berat",
        data: labels.map(() => target),
        borderColor: "#ff3b30",
        borderDash: [5, 5],
        pointRadius: 0,
        tension: 0,
      },
    ],
  };

  const safeValues = Array.isArray(values) && values.length > 0 ? values : [target ?? 0];
  const minValue = Math.min(...safeValues, target ?? 0) - 1;
  const maxValue = Math.max(...safeValues, target ?? 0) + 1;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: minValue,
        max: maxValue,
        ticks: { stepSize: 0.5 },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: { boxWidth: 12 },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Tren Berat Badan
      </h3>

      <div className="relative h-72">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
