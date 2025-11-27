"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function NotifyModal({ open, onClose, img, title }) {
  const [hour, setHour] = useState(18);
  const [minute, setMinute] = useState(30);

  // load dari localStorage kalau pernah disimpan
  useEffect(() => {
    if (!open) return;
    if (typeof window === "undefined") return;

    try {
      const raw = localStorage.getItem("captfood:notifyTime");
      if (!raw) return;
      const data = JSON.parse(raw);
      if (typeof data.hour === "number") setHour(data.hour);
      if (typeof data.minute === "number") setMinute(data.minute);
    } catch {
      // ignore
    }
  }, [open]);

  const clamp = (val, min, max) => Math.min(max, Math.max(min, val));

  const handleChangeHour = (val) => {
    const n = Number(val.replace(/\D/g, ""));
    if (Number.isNaN(n)) return;
    setHour(clamp(n, 0, 23));
  };

  const handleChangeMinute = (val) => {
    const n = Number(val.replace(/\D/g, ""));
    if (Number.isNaN(n)) return;
    setMinute(clamp(n, 0, 59));
  };

  const handleSave = () => {
    try {
      const payload = { hour, minute, title: title || "" };
      localStorage.setItem("captfood:notifyTime", JSON.stringify(payload));
    } catch {
      // ignore
    }
    onClose?.();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <h3 className="text-base font-semibold text-gray-900">Notify Me</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Info resto kecil */}
        {(img || title) && (
          <div className="flex items-center gap-3 px-5 pb-3">
            {img && (
              <div className="w-10 h-10 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={img}
                  alt={title || "Restaurant"}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div>
              <p className="text-xs text-gray-500">Untuk menu</p>
              <p className="text-sm font-medium text-gray-900 truncate">
                {title || "Restoran pilihanmu"}
              </p>
            </div>
          </div>
        )}

        {/* Time picker */}
        <div className="px-5 pt-2 pb-5 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">
            Atur jam pengingat pesananmu
          </p>

          <div className="flex items-center justify-center gap-3 mb-6">
            {/* Hour pill */}
            <div className="w-20 h-12 rounded-full border border-gray-300 bg-gray-50 flex items-center justify-center">
              <input
                type="text"
                inputMode="numeric"
                maxLength={2}
                value={hour.toString().padStart(2, "0")}
                onChange={(e) => handleChangeHour(e.target.value)}
                className="w-full text-center bg-transparent outline-none text-base font-semibold text-gray-900"
              />
            </div>

            <span className="text-lg font-semibold text-gray-700">:</span>

            {/* Minute pill */}
            <div className="w-20 h-12 rounded-full border border-gray-300 bg-gray-50 flex items-center justify-center">
              <input
                type="text"
                inputMode="numeric"
                maxLength={2}
                value={minute.toString().padStart(2, "0")}
                onChange={(e) => handleChangeMinute(e.target.value)}
                className="w-full text-center bg-transparent outline-none text-base font-semibold text-gray-900"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 h-11 rounded-full bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 shadow-sm"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
