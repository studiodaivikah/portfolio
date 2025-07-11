"use client";

import Admin from "@/components/admin/admin";
import Footer from "@/components/footer/footer";
import { useState } from "react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [auth, setAuth] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      setAuth(true);
      setStatus("✅ Login successful! Welcome admin.");
    } else {
      setAuth(false);
      setStatus("❌ Invalid username or password.");
    }
  };

  return (
    <>
      {auth ? (
        <Admin />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12 max-w-[2800px] w-full">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
              Admin Login
            </h1>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter username"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition duration-300"
              >
                Login
              </button>
            </form>

            {status && (
              <p
                className={`mt-5 text-center text-sm ${
                  status.startsWith("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {status}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
