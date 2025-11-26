// src/app/(landing)/layout.jsx
"use client";

import LandingHeader from "@/components/layout/LandingHeader";
import LandingFooter from "@/components/layout/LandingFooter";

export default function LandingLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      {/* Header */}
      <LandingHeader />

      {/* Center children */}
      <main className="flex-1 flex items-center justify-center px-4">
        {children}
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
