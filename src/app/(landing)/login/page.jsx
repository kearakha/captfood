"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy test user
    const dummyUser = {
      email: "test@example.com",
      password: "123456",
      fullName: "Test User"
    };

    // User from Register
    const savedUser = JSON.parse(localStorage.getItem("user")); // bisa null

    const isDummyMatch =
      email === dummyUser.email && password === dummyUser.password;

    const isSavedMatch =
      savedUser &&
      email === savedUser.email &&
      password === savedUser.password;

    // Cek kedua sumber user
    if (!isDummyMatch && !isSavedMatch) {
      setError("Email atau password salah.");
      return;
    }

    // Tentukan user yang login
    const loggedUser = isDummyMatch ? dummyUser : savedUser;

    // Mengecek apakah user baru dan belum punya nutrition plan
    if (!loggedUser.nutrition) {
      localStorage.setItem("needsNutritionSetup", "true");
    }


    // Simpan session login
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(loggedUser));

    router.push("/dashboard");
  };

  return (
    <div className="w-full flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="flex flex-col gap-5" onSubmit={handleLogin}>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
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
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition"
          >
            Login
          </button>

        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          {"Don't have an account?"}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>

        {/* DEBUG INFO DISPLAY */}
        <div className="mt-6 text-xs text-gray-400 text-center">
          <div>Dummy account:</div>
          <div>Email: <b>test@example.com</b></div>
          <div>Password: <b>123456</b></div>
        </div>

      </div>
    </div>
  );
}
