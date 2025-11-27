// app/recomenai/page.jsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ITEMS, pick } from "@/lib/recomenai/items";
import { useRouter } from "next/navigation";

const RecoCard = dynamic(
  () => import("@/components/recomenai/RecoCard"),
  { ssr: false }
);

const MEAL_LABEL = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack/Etc",
};

export default function RecommendsPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(null);
  const [viewOnly, setViewOnly] = useState(false);

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const mealParam = url.searchParams.get("meal");
      const menuParam = url.searchParams.get("menu");

      // 1) Dari dashboard → ada menu=..., viewOnly = true (hanya lihat)
      if (menuParam) {
        const lowerMenu = menuParam.toLowerCase();
        let found =
          ITEMS.find((it) => it.title.toLowerCase() === lowerMenu) ||
          ITEMS[0];

        if (mealParam) {
          const key = mealParam.toLowerCase();
          const label = MEAL_LABEL[key] || found.meal;
          found = { ...found, meal: label };
        }

        setCurrent(found);
        setViewOnly(true);
        return;
      }

      // 2) Dari scan → pakai meal=..., tetap hanya rekomendasi (tanpa logging)
      let picked = pick(ITEMS);
      if (mealParam) {
        const mealKey = mealParam.toLowerCase();
        const same = ITEMS.find(
          (it) => it.meal.toLowerCase() === mealKey
        );
        if (same) picked = same;
      }

      setCurrent(picked);
      setViewOnly(false);
    } catch {
      setCurrent(ITEMS[0]);
      setViewOnly(false);
    }
  }, []);

  if (!current) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading...</p>
      </main>
    );
  }

  function handleTryAnother() {
    const others = ITEMS.filter((it) => it.id !== current.id);
    const next = pick(others.length ? others : ITEMS);
    next.meal = current.meal || next.meal;
    setCurrent(next);
  }

  // ⬇⬇⬇ PERUBAHAN DI SINI: tidak ada lagi tulis ke localStorage
  function handleDone() {
    // hanya tutup dan kembali ke dashboard, tanpa memasukkan ke log
    router.push("/dashboard");
  }
  // ⬆⬆⬆

  function handleOrder() {
    const goShop = (lat = null, lng = null) => {
      const q =
        lat != null && lng != null ? `?lat=${lat}&lng=${lng}` : "";
      router.push(`/shop${q}`);
    };

    if (!("geolocation" in navigator)) {
      goShop();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        goShop(
          pos.coords.latitude.toFixed(6),
          pos.coords.longitude.toFixed(6)
        ),
      () => goShop(),
      { enableHighAccuracy: true, timeout: 6000 }
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <RecoCard
          item={current}
          onTryAnother={viewOnly ? undefined : handleTryAnother}
          onDone={viewOnly ? undefined : handleDone}
          onOrder={handleOrder}
        />
      </div>
    </main>
  );
}
