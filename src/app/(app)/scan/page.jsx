"use client";

import ScanCamera from "@/components/scan/ScanCamera";

export default function ScanPage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 pt-6">
      <h1 className="text-xl font-extrabold mb-4">Scan Here</h1>

      <ScanCamera />
    </main>
  );
}
