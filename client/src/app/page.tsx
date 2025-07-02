"use client";
import { useState } from "react";
import { authService } from "@/services/api";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await authService.login(email, password);
      if (res.token) {
        setMessage("Login successful!");
      } else {
        setError("Login failed: No token returned.");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <form onSubmit={handleSubmit} className="bg-black p-8 rounded shadow-md w-80 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        {message && <div className="text-green-600 text-sm">{message}</div>}
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
}
