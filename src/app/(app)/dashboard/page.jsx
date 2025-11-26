'use client';

import TodayPlan from "@/components/dashboard/TodayPlan";
import Goals from "@/components/dashboard/Goals";
import QuickAccess from "@/components/dashboard/QuickAccess";
import Recommendations from "@/components/dashboard/Recommendations";
import RecentLogged from "@/components/dashboard/RecentLogged";

export default function DashboardPage() {
  return (
    <div className="px-4 py-5 space-y-6 max-w-5xl mx-auto">
      <TodayPlan />
      <Goals />
      <QuickAccess />
      <Recommendations />
      <RecentLogged />
    </div>
  );
}
