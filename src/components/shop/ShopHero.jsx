// src/components/shop/ShopHero.jsx
"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons"; // atau free-regular-svg-icons jika prefer outline

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80";

export default function ShopHero({ img, onBack, onNotify }) {
  const heroImg = img ?? FALLBACK_IMG;

  return (
    <div className="relative mb-4">
      <div className="relative w-full h-48 rounded-xl overflow-hidden">
        <Image
          src={heroImg}
          alt="Shop Hero"
          fill
          sizes="(min-width:1024px) 1000px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <button
        onClick={onBack}
        className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
        aria-label="Back"
      >
        ←
      </button>

      <button
        onClick={onNotify}
        className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
        aria-label="Notify"
        title="Notify"
      >
        <FontAwesomeIcon icon={faBell} className="text-gray-700" />
      </button>
    </div>
  );
}
