"use client";
import Link from "next/link";

export default function SideDrawer({ open, onClose }) {
  return (
    <div
      className={`fixed inset-0 bg-black/40 z-999 transition-opacity ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`absolute left-0 top-0 h-full w-64 bg-white shadow-xl p-6 transform transition-all ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold text-lg mb-4">Menu</h2>

        <nav className="flex flex-col gap-2">
          <Link href="/" className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-lg">
            Home
          </Link>
          <Link href="/dashboard" className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-lg">
            Dashboard
          </Link>
          <Link href="/progress" className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-lg">
            Progress
          </Link>
          <Link href="/shop" className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-lg">
            Shop
          </Link>
          <Link href="/recomenai" className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-lg">
            AI Menu
          </Link>
        </nav>
      </div>
    </div>
  );
}
