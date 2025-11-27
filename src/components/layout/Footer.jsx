"use client";

import Link from "next/link";
import {
  HomeModernIcon,
  ChartBarIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white shadow-inner z-50 flex justify-center">
      <div className="w-full max-w-[1000px] px-6 relative">
        <div className="flex justify-between items-center py-3">
          {/* HOME → /dashboard */}
          <Link
            href="/dashboard"
            className="flex flex-col items-center text-gray-700 cursor-pointer"
          >
            <HomeModernIcon className="w-6 h-6" />
            <span className="text-xs mt-0.5">Dashboard</span>
          </Link>

          {/* spacer di tengah, ini yang ketiban kamera */}
          <div className="w-16" />

          {/* PROGRESS → /progress */}
          <Link
            href="/progress"
            className="flex flex-col items-center text-gray-700 cursor-pointer"
          >
            <ChartBarIcon className="w-6 h-6" />
            <span className="text-xs mt-0.5">Progress</span>
          </Link>
        </div>

        {/* SCAN (floating) → /scan */}
        <Link
          href="/scan"
          className="
            absolute left-1/2 -translate-x-1/2 -top-5
            w-14 h-14 rounded-full bg-blue-600 text-white shadow-xl
            flex items-center justify-center cursor-pointer
          "
        >
          <CameraIcon className="w-7 h-7" />
        </Link>
      </div>
    </footer>
  );
}
