"use client";

import { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  ArrowLeftIcon,
  LockClosedIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function AccountSettingsPage() {
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("user@example.com");

  return (
    <main className="max-w-lg mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard">
          <ArrowLeftIcon className="w-6 h-6 text-gray-600 cursor-pointer" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Account Settings</h1>
      </div>

      {/* Profile Photo */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <PhotoIcon className="w-10 h-10 text-gray-500" />
        </div>
        <button className="mt-2 text-sm text-blue-600 font-medium">
          Change Photo
        </button>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Full Name</label>
          <div className="flex items-center gap-2 mt-1 p-3 bg-white border rounded-lg shadow-sm">
            <UserIcon className="w-5 h-5 text-gray-500" />
            <input
              className="flex-1 outline-none text-gray-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <div className="flex items-center gap-2 mt-1 p-3 bg-white border rounded-lg shadow-sm">
            <EnvelopeIcon className="w-5 h-5 text-gray-500" />
            <input
              className="flex-1 outline-none text-gray-900"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Password</label>
          <Link
            href="/reset-password"
            className="flex items-center gap-2 mt-1 p-3 bg-white border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
          >
            <LockClosedIcon className="w-5 h-5 text-gray-500" />
            <span className="flex-1 text-gray-900">Change Password</span>
          </Link>
        </div>
      </div>

      {/* Save Button */}
      <button
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-blue-700"
        onClick={() => alert("Changes saved!")}
      >
        Save Changes
      </button>

      {/* Danger Zone */}
      <div className="mt-8">
        <p className="text-sm font-semibold text-gray-700 mb-2">Danger Zone</p>
        <button className="w-full py-3 border border-red-500 text-red-600 rounded-xl font-semibold hover:bg-red-50">
          Delete Account
        </button>
      </div>
    </main>
  );
}
