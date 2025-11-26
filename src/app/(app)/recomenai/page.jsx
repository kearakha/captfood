// app/recomenai/page.jsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ITEMS, pick } from "@/lib/recomenai/items";
import { useRouter } from "next/navigation";

// Force RecoCard to render only on client (no SSR) to avoid hydration mismatch
const RecoCard = dynamic(() => import("@/components/recomenai/RecoCard"), { ssr: false });

export default function RecommendsPage() {
  // initial pick runs only in client because this file is a client component
  const initial = () => {
    try {
      const urlMeal = typeof window !== "undefined" ? new URL(window.location.href).searchParams.get("meal") : null;
      let picked = pick(ITEMS); // pick uses Math.random; OK to run client-side
      if (urlMeal) {
        const mealKey = (urlMeal || "").toLowerCase();
        const same = ITEMS.find((it) => it.meal.toLowerCase() === mealKey);
        if (same) picked = same;
      }
      return picked;
    } catch {
      return ITEMS[0];
    }
  };

  const [current, setCurrent] = useState(() => initial());
  const router = useRouter();

  function handleTryAnother() {
    const others = ITEMS.filter((it) => it.id !== current.id);
    const next = pick(others.length ? others : ITEMS);
    next.meal = current.meal || next.meal;
    setCurrent(next);
  }

  function handleDone() {
    const entry = {
      at: new Date().toISOString(),
      meal: (current.meal || "lunch").toLowerCase(),
      title: current.title,
      macro: { ...current.macro },
      kcal: Math.round(4 * current.macro.p + 4 * current.macro.c + 9 * current.macro.f),
      meta: { source: "ai-recommendation" },
    };
    try {
      const key = "captfood:entries";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      prev.push(entry);
      localStorage.setItem(key, JSON.stringify(prev));
    } catch (err) {
      console.warn("localStorage error", err);
    }
    router.push("/dashboard");
  }

  function handleOrder() {
    const goShop = (lat = null, lng = null) => {
      const q = lat != null && lng != null ? `?lat=${lat}&lng=${lng}` : "";
      router.push(`/shop${q}`);
    };

    if (!("geolocation" in navigator)) {
      goShop();
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => goShop(pos.coords.latitude.toFixed(6), pos.coords.longitude.toFixed(6)),
      () => goShop(),
      { enableHighAccuracy: true, timeout: 6000 }
    );
  }

  function handleAddTo(meal) {
    const entry = {
      at: new Date().toISOString(),
      meal: (meal || "lunch").toLowerCase(),
      title: current.title,
      macro: { ...current.macro },
      kcal: Math.round(4 * current.macro.p + 4 * current.macro.c + 9 * current.macro.f),
      meta: { source: "ai-recommendation", addedAs: meal },
    };
    try {
      const key = "captfood:entries";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      prev.push(entry);
      localStorage.setItem(key, JSON.stringify(prev));
      // short UX feedback
      window?.alert?.("Ditambahkan ke diary");
    } catch (err) {
      console.warn("localStorage error", err);
      window?.alert?.("Gagal menambahkan");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">

        {/* RecoCard is client-only (ssr: false) to avoid hydration mismatch */}
        <RecoCard
          item={current}
          onTryAnother={handleTryAnother}
          onDone={handleDone}
          onOrder={handleOrder}
          onAddTo={handleAddTo}
        />
      </div>
    </main>
  );
}
