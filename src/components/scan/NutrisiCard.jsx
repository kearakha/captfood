"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NutrisiCard({ icon, label, value, color }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow text-center">
      <div
        className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center shadow-inner ${color}`}
      >
        <FontAwesomeIcon icon={icon} className="w-5 h-5" />
      </div>
      <div className="text-xs font-semibold text-gray-500">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
}
