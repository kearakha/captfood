"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setRegisterEmail] = useState("");
  const [password, setRegisterPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password) {
      setError("Semua field wajib diisi.");
      return;
    }

    // Check existing user
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser && existingUser.email === email) {
      setError("Email sudah terdaftar.");
      return;
    }

    // Save new user
    const newUser = {
      fullName: name,
      email: email,
      password: password
    };

    localStorage.setItem("user", JSON.stringify(newUser));

    localStorage.setItem("captfood:needsSetup", "true");
    // Clear errors
    setError("");

    // 🔔 SUCCESS ALERT
    alert("Registrasi berhasil! Silakan login.");

    // Redirect login
    router.push("/login");
  };

  return (
    <div className="w-full flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

        <form className="flex flex-col gap-5" onSubmit={handleRegister}>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setRegisterEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Email address"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setRegisterPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Create a password"
            />
          </div>

          {/* ERROR DISPLAY */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition"
          >
            Register
          </button>

        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>

      </div>
    </div>
  );
}
