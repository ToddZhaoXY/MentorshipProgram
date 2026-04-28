"use client";

import { useState } from "react";
import { type Registration } from "@/lib/validators";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [registrations, setRegistrations] = useState<Registration[] | null>(
    null
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `/api/admin?password=${encodeURIComponent(password)}`
      );
      if (!res.ok) {
        setError("Invalid password");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setRegistrations(data);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (registrations === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <span className="text-[0.65rem] uppercase tracking-[0.25em] text-gold-dark mb-4">
          Private Access
        </span>
        <h1 className="text-4xl italic text-gold-light font-normal mb-10">
          Admin Portal
        </h1>
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-[0.65rem] uppercase tracking-[0.25em] text-gold-dark mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full bg-transparent border border-gold-trace px-4 py-3 text-gold-light placeholder:text-gold-dark/50 focus:outline-none focus:border-gold-mid transition-colors duration-300"
            />
          </div>
          {error && (
            <p className="text-[0.8rem] text-[#c4795a] italic">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-transparent border border-gold-dark text-gold-mid py-3.5 text-[0.9rem] uppercase tracking-[0.2em] cursor-pointer transition-all duration-400 hover:bg-gold-mid hover:text-bg-base hover:border-gold-mid disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Checking..." : "View Registrations"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-8 sm:px-16 pt-32 pb-20">
      <span className="text-[0.65rem] uppercase tracking-[0.25em] text-gold-dark">
        Dashboard
      </span>
      <h1 className="text-3xl italic text-gold-light font-normal mb-8">
        Registrations
      </h1>
      {registrations.length === 0 ? (
        <p className="text-gold-dark italic">No registrations yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-[0.9rem]">
            <thead>
              <tr className="border-b border-gold-trace">
                <th className="px-4 py-4 text-left text-[0.65rem] uppercase tracking-[0.25em] text-gold-dark font-normal">
                  Alias
                </th>
                <th className="px-4 py-4 text-left text-[0.65rem] uppercase tracking-[0.25em] text-gold-dark font-normal">
                  Mentor
                </th>
                <th className="px-4 py-4 text-left text-[0.65rem] uppercase tracking-[0.25em] text-gold-dark font-normal">
                  Date
                </th>
                <th className="px-4 py-4 text-left text-[0.65rem] uppercase tracking-[0.25em] text-gold-dark font-normal">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr
                  key={reg.id}
                  className="border-b border-gold-trace hover:bg-[rgba(232,212,162,0.03)] transition-colors duration-300"
                >
                  <td className="px-4 py-4 text-gold-light">{reg.alias}</td>
                  <td className="px-4 py-4 text-gold-mid italic">
                    {reg.mentorId}
                  </td>
                  <td className="px-4 py-4 text-gold-dark">
                    {new Date(reg.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[0.65rem] uppercase tracking-[0.25em] text-gold-mid">
                      {reg.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
