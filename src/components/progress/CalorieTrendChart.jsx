// src/components/progress/CalorieTrendChart.jsx
"use client";
import "@/lib/chartConfig"; 
import { Line } from "react-chartjs-2";


export default function CalorieTrendChart({ weekly, monthly, mode = "weekly", onChangeMode }) {
  // Normalize inputs: accept either { labels, values } or raw arrays
  const normalize = (maybe) => {
    if (!maybe) return { labels: [], values: [] };

    // if object with labels & values already
    if (maybe.labels && maybe.values) return maybe;

    // if array of objects [{label, calorie}] or [{label, value}]
    if (Array.isArray(maybe) && maybe.length > 0 && typeof maybe[0] === "object") {
      const labels = maybe.map((x) => x.label ?? x.period ?? "");
      const values = maybe.map((x) => x.calorie ?? x.value ?? x.y ?? 0);
      return { labels, values };
    }

    // if simple arrays [numbers]
    if (Array.isArray(maybe)) {
      // produce generic labels
      return {
        labels: maybe.map((_, i) => `P${i + 1}`),
        values: maybe,
      };
    }

    return { labels: [], values: [] };
  };

  const weeklyNorm = normalize(weekly);
  const monthlyNorm = normalize(monthly);

  const dataSource = mode === "monthly" ? monthlyNorm : weeklyNorm;

  // guard: if empty
  const empty = !dataSource.labels?.length || !dataSource.values?.length;

  if (empty) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm text-center">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold">Tren Kalori</h4>
          <div className="text-xs text-blue-600 cursor-pointer" onClick={() => onChangeMode?.(mode === "weekly" ? "monthly" : "weekly")}>
            {mode === "weekly" ? "Lihat Bulanan" : "Lihat Mingguan"}
          </div>
        </div>
        <div className="text-gray-500 text-sm">Belum ada data kalori untuk periode ini.</div>
      </div>
    );
  }

  const chartData = {
    labels: dataSource.labels,
    datasets: [
      {
        label: "Kalori Rata-rata",
        data: dataSource.values,
        borderColor: "#007aff",
        backgroundColor: "rgba(0,122,255,0.08)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: false },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold">Tren Kalori</h4>
        <div className="text-xs text-blue-600 cursor-pointer" onClick={() => onChangeMode?.(mode === "weekly" ? "monthly" : "weekly")}>
          {mode === "weekly" ? "Lihat Bulanan" : "Lihat Mingguan"}
        </div>
      </div>

      <div style={{ height: 260 }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
