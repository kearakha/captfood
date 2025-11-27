"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Bars3Icon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import ProfileDropdown from "./ProfileDropdown";
import SideDrawer from "./SideDrawer";

export default function Header() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const pathname = usePathname();

  /** 
   * AUTO-CLOSE DROPDOWN WHEN ROUTE CHANGES 
   */
  useEffect(() => {
    queueMicrotask(() => {
      setOpenProfile(false);
     
    });
  }, [pathname]);  

  return (
    <>
      <header className="w-full bg-white shadow-sm py-3 px-4 sticky top-0 z-50 flex justify-center">
        <div className="w-full max-w-[1000px] flex items-center justify-between">


          {/* Title */}
          <h1 className="text-lg font-semibold text-gray-900">
            CaptFood
          </h1>

          {/* Profile */}
          <div className="relative">
            <button
              className="text-gray-700 cursor-pointer"
              onClick={() => setOpenProfile((v) => !v)}
            >
              <UserCircleIcon className="w-7 h-7" />
            </button>

            {/* Dropdown must be INSIDE relative wrapper */}
            <ProfileDropdown
              open={openProfile}
              onClose={() => setOpenProfile(false)}
            />
          </div>
        </div>
      </header>

      {/* Sidebar (Hamburger) */}
      <SideDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
    </>
  );
}
