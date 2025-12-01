'use client';

import { useEffect, useState } from "react";
import NutritionSetupModal from "@/components/layout/NutritionSetupModal";

import TodayPlan from "@/components/dashboard/TodayPlan";
import Goals from "@/components/dashboard/Goals";
import QuickAccess from "@/components/dashboard/QuickAccess";
import Recommendations from "@/components/dashboard/Recommendations";
import RecentLogged from "@/components/dashboard/RecentLogged";

export default function DashboardPage() {
  const [needsSetup, setNeedsSetup] = useState(false);
  const [checked, setChecked] = useState(false); // ⬅️ penting

  useEffect(() => {
    // Pastikan kode jalan setelah browser selesai render & localStorage siap
    setTimeout(() => {
      const flag = localStorage.getItem("captfood:needsSetup");
      console.log("FLAG FOUND:", flag); // debug

      if (flag === "true") {
        setNeedsSetup(true);
      }

      setChecked(true); // sudah dicek
    }, 50); // 50ms → stabil untuk load setelah login
  }, []);

  // 👇 Jangan render apa pun dulu sampai pengecekan selesai
  if (!checked) return null;

  return (
    <>
      {needsSetup && (
        <NutritionSetupModal
          onComplete={() => {
            localStorage.setItem("captfood:needsSetup", "false");
            setNeedsSetup(false);
          }}
        />
      )}

      <div className="px-4 py-5 space-y-6 max-w-5xl mx-auto">
        <TodayPlan />
        <Goals />
        <QuickAccess />
        <Recommendations />
        <RecentLogged />
      </div>
    </>
  );
}