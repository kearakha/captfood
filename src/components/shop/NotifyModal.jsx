"use client";

import React, { useState } from "react";

export default function NotifyModal({ open, onClose, img, title }) {
  const [hh, setHh] = useState(18);
  const [mm, setMm] = useState(30);

  if (!open) return null;

  function save() {
    try {
      const note = {
        at: `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`,
        hero: img || null,
        title: title || null,
        createdAt: Date.now(),
      };

      const key = "captfood:notify";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      prev.push(note);
      localStorage.setItem(key, JSON.stringify(prev));
      onClose?.();
      // Friendly UX: use custom toast in your app if available
      alert(`Pengingat disimpan: ${note.at}`);
    } catch (err) {
      console.error("save notify failed", err);
      alert("Gagal menyimpan pengingat");
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      {/* modal panel with background preview */}
      <div className="relative w-[520px] max-w-[90%] rounded-xl overflow-hidden">
        {/* background preview image (blurred & darkened) */}
        {img && (
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(6px) brightness(0.6)",
              transform: "scale(1.05)",
            }}
          />
        )}

        {/* content */}
        <div className="relative bg-white rounded-xl p-6 shadow-xl z-10">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>

          <h3 className="text-center text-xl font-bold mb-4">Notify Me</h3>

          <div className="flex justify-center gap-3 mb-4">
            <input
              type="number"
              value={hh}
              min={0}
              max={23}
              className="w-20 p-3 border rounded-full text-center font-bold"
              onChange={(e) => setHh(Math.max(0, Math.min(23, Number(e.target.value || 0))))}
            />
            <span className="font-bold text-xl self-center">:</span>
            <input
              type="number"
              value={mm}
              min={0}
              max={59}
              className="w-20 p-3 border rounded-full text-center font-bold"
              onChange={(e) => setMm(Math.max(0, Math.min(59, Number(e.target.value || 0))))}
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button onClick={onClose} className="flex-1 bg-gray-100 py-3 rounded-full font-medium">
              Batal
            </button>
            <button onClick={save} className="flex-1 bg-green-500 text-white py-3 rounded-full font-semibold">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
