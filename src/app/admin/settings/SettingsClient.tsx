"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import {
  Settings,
  User,
  Sliders,
  Lock,
  LogOut,
  CheckCircle2,
  Save,
  Building2,
} from "lucide-react";

interface SettingsClientProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

export default function SettingsClient({ user }: SettingsClientProps) {
  const [displayName, setDisplayName] = useState(user.name || "Kavya Labs Admin");
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  const [refreshInterval, setRefreshInterval] = useState<"manual" | "15s" | "30s" | "60s">("30s");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to local storage for persistence across admin sessions
    localStorage.setItem(
      "kavya_admin_settings",
      JSON.stringify({
        displayName,
        density,
        refreshInterval,
        notificationsEnabled,
      })
    );
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-purple-400" />
          <span>System Settings & Admin Preferences</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Manage your administrator profile, console density, telemetry polling, and security parameters.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Administrator preferences successfully saved.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Administrator Profile Information */}
        <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <User className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Admin Profile Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-gray-300 font-medium mb-1">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">
                Primary Administrator Email (Verified)
              </label>
              <input
                type="email"
                disabled
                value={user.email || "admin@kavyalabs.com"}
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/5 rounded-xl text-gray-400 font-mono cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Assigned RBAC Role</label>
              <div className="px-3.5 py-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-300 font-mono flex items-center justify-between">
                <span>{user.role || "Admin"}</span>
                <span className="text-[10px] text-purple-400 uppercase">Superadmin</span>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Organization</label>
              <div className="px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-gray-300 font-mono flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Kavya Labs (Bengaluru HQ)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Dashboard Appearance & Telemetry */}
        <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Dashboard Appearance & Polling
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b border-white/5">
              <div>
                <p className="font-semibold text-white">Visual Theme</p>
                <p className="text-gray-400 text-[11px]">Dark Obsidian (Optimized for operational control rooms)</p>
              </div>
              <span className="px-3 py-1 rounded-lg bg-black/50 border border-white/10 text-purple-300 font-mono text-[11px]">
                Dark Mode (Fixed)
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b border-white/5">
              <div>
                <p className="font-semibold text-white">Table Display Density</p>
                <p className="text-gray-400 text-[11px]">Adjust row padding for high-volume user management</p>
              </div>
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/10 font-mono">
                <button
                  type="button"
                  onClick={() => setDensity("comfortable")}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    density === "comfortable" ? "bg-purple-600 text-white font-semibold" : "text-gray-400"
                  }`}
                >
                  Comfortable
                </button>
                <button
                  type="button"
                  onClick={() => setDensity("compact")}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    density === "compact" ? "bg-purple-600 text-white font-semibold" : "text-gray-400"
                  }`}
                >
                  Compact
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b border-white/5">
              <div>
                <p className="font-semibold text-white">Telemetry Refresh Frequency</p>
                <p className="text-gray-400 text-[11px]">Interval for updating cluster analytics and metrics</p>
              </div>
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/10 font-mono">
                {(["manual", "15s", "30s", "60s"] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setRefreshInterval(opt)}
                    className={`px-2.5 py-1 rounded text-xs uppercase transition-colors ${
                      refreshInterval === opt
                        ? "bg-purple-600 text-white font-semibold"
                        : "text-gray-400"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2">
              <div>
                <p className="font-semibold text-white">Security Alerts & Audit Notifications</p>
                <p className="text-gray-400 text-[11px]">Display toast confirmations for administrative state changes</p>
              </div>
              <button
                type="button"
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationsEnabled ? "bg-purple-600" : "bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationsEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Security & Session Architecture */}
        <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Session Security Architecture
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <span className="text-gray-400 font-mono">Session Token</span>
              <p className="text-emerald-400 font-mono font-medium">NextAuth JWT (HttpOnly, SameSite=Lax)</p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <span className="text-gray-400 font-mono">RBAC Validation</span>
              <p className="text-purple-300 font-mono font-medium">Server Middleware + API Guard</p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <span className="text-gray-400 font-mono">Encryption</span>
              <p className="text-white font-mono font-medium">AES-256-GCM / TLS 1.3</p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <span className="text-gray-400 font-mono">Regulatory Status</span>
              <p className="text-white font-mono font-medium">DPDP Act (India 2023) & SOC2 Compliant</p>
            </div>
          </div>
        </div>

        {/* Submit & Sign Out Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02]"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of Administrator Console</span>
          </button>
        </div>
      </form>
    </div>
  );
}
