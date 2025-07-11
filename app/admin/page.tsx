"use client";

import Admin from "@/components/admin/admin";
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
        <div className="min-h-screen flex flex-col justify-center items-center p-4">
          <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4 w-full max-w-sm"
          >
            <input
              type="text"
              placeholder="Username"
              className="border rounded px-3 py-2 w-[300px]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border rounded px-3 py-2 w-[300px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
          {status && <p className="mt-4 text-center">{status}</p>}
        </div>
      )}
    </>
  );
}
