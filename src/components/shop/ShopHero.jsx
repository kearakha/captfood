// src/components/shop/ShopHero.jsx
"use client";

import Image from "next/image";
import { ArrowLeftIcon, BellIcon } from "@heroicons/react/24/outline";

export default function ShopHero({ img, title = "Menu pilihanmu", onBack, onNotify }) {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-sm border border-gray-200">
      {/* Gambar besar */}
      <div className="relative w-full h-56 sm:h-64">
        <Image
          src={img}
          alt={title}
          fill
          sizes="(min-width: 768px) 900px, 100vw"
          className="object-cover"
        />
        {/* gradient biar teks kebaca */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/0" />
      </div>

      {/* tombol back & bell */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 shadow-sm border border-gray-200"
        >
          <ArrowLeftIcon className="w-4 h-4 text-gray-700" />
        </button>

        <button
          type="button"
          onClick={onNotify}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 shadow-sm border border-gray-200"
        >
          <BellIcon className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* nama makanan pojok kiri */}
      <div className="absolute bottom-4 left-4">
        <p className="text-[11px] text-white/80 mb-0.5">
          Menu yang kamu cari
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold text-white drop-shadow">
          {title}
        </h2>
      </div>
    </div>
  );
}
