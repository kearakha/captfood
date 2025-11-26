"use client";

export default function TimeFilter({ period, setPeriod }) {
  return (
    <div className="flex justify-center bg-gray-200 rounded-lg p-1 my-4 max-w-[300px] mx-auto">
      <button
        className={`flex-1 py-2 rounded-md font-semibold ${
          period === "weekly"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-500"
        }`}
        onClick={() => setPeriod("weekly")}
      >
        Mingguan
      </button>

      <button
        className={`flex-1 py-2 rounded-md font-semibold ${
          period === "monthly"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-500"
        }`}
        onClick={() => setPeriod("monthly")}
      >
        Bulanan
      </button>
    </div>
  );
}
