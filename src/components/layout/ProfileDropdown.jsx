"use client";
import Link from "next/link";

export default function ProfileDropdown({ open, onClose }) {
  if (!open) return null;

  const username =
    typeof window !== "undefined"
      ? localStorage.getItem("captfood:username") || "User"
      : "User";

  const handleLogout = () => {
    localStorage.clear();
    onClose?.();
    window.location.href = "/login";
  };

  const MenuLink = ({ href, children }) => (
    <Link
      href={href}
      onClick={onClose}
      className="block w-full text-left px-2 py-2 text-sm hover:bg-gray-100 rounded-lg"
    >
      {children}
    </Link>
  );

  return (
    <div className="absolute right-0 top-10 w-48 bg-white shadow-lg border rounded-xl p-3 z-50">
      <p className="px-2 py-1 text-sm text-gray-600 border-b mb-2">
        Logged in as <span className="font-semibold">{username}</span>
      </p>

      {/* 1. Account Settings */}
      <MenuLink href="/account">Account Settings</MenuLink>

      {/* 2. Nutrition Plan */}
      <MenuLink href="/nutrition-plan">Nutrition Plan</MenuLink>

      {/* Logout */}
      <button
        className="w-full text-left px-2 py-2 mt-1 hover:bg-gray-100 rounded-lg text-red-500 text-sm"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
