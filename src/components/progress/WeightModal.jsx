"use client";

import { useState } from "react";
import { useProgressData } from "./useProgressData";

export default function WeightModal({ open, onClose }) {
  const { state, updateCurrentWeight } = useProgressData();
  const [value, setValue] = useState(state.currentWeight || "");

  if (!open) return null;

  const save = () => {
    const num = parseFloat(value);
    if (!num || num <= 0) return;
    updateCurrentWeight(num);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
      <div className="bg-white p-5 rounded-xl w-80 text-center relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-xl"
        >
          ✕
        </button>

        <h2 className="font-semibold mb-3">Masukkan Berat Baru</h2>

        <input
          type="number"
          className="w-full border px-3 py-2 rounded-lg text-center"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button
          onClick={save}
          className="mt-4 bg-blue-600 text-white w-full py-2 rounded-lg"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}
