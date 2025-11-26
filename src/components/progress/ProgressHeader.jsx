'use client'

import { useState } from "react";

export default function ProgressHeader({ onPeriodChange }) {
  const [active, setActive] = useState("weekly");

  const handleChange = (period) => {
    setActive(period);
    onPeriodChange?.(period);
  };

  return (
    <div className="w-full">
      
      {/* Title & Subtitle */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-gray-900">
          Perkembangan Saya
        </h1>
        <p className="text-sm text-gray-500">
          Lihat tren dan metrik tubuh Anda dari waktu ke waktu.
        </p>
      </div>
    </div>
  );
}
