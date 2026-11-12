"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Cpu,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  KeyRound,
  Info,
  Lock,
  User,
  Shield,
} from "lucide-react";

interface LoginFormProps {
  isGoogleConfigured: boolean;
}

export default function LoginForm({ isGoogleConfigured }: LoginFormProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const errorParam = searchParams.get("error");

  const [isLoadingUserDemo, setIsLoadingUserDemo] = useState(false);
  const [isLoadingAdminDemo, setIsLoadingAdminDemo] = useState(false);
  const [isLoadingCustom, setIsLoadingCustom] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);
  const [emailInput, setEmailInput] = useState("admin@kavyalabs.com");
  const [passwordInput, setPasswordInput] = useState("kavyalabs-admin-access");
  const [errorMessage, setErrorMessage] = useState<string | null>(
    errorParam ? "Authentication failed. Please verify credentials or use a Demo Account." : null
  );

  const handleUserDemoSignIn = async () => {
    try {
      setIsLoadingUserDemo(true);
      setErrorMessage(null);
      await signIn("demo-credentials", {
        email: "demo@kavyalabs.com",
        password: "demo",
        callbackUrl: callbackUrl || "/dashboard",
      });
    } catch {
      setErrorMessage("Failed to initiate user demo session. Please try again.");
      setIsLoadingUserDemo(false);
    }
  };

  const handleAdminDemoSignIn = async () => {
    try {
      setIsLoadingAdminDemo(true);
      setErrorMessage(null);
      await signIn("demo-credentials", {
        email: "admin@kavyalabs.com",
        password: "admin",
        callbackUrl: callbackUrl || "/admin",
      });
    } catch {
      setErrorMessage("Failed to initiate admin demo session. Please try again.");
      setIsLoadingAdminDemo(false);
    }
  };

  const handleCustomSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoadingCustom(true);
      setErrorMessage(null);
      const res = await signIn("demo-credentials", {
        email: emailInput,
        password: passwordInput,
        callbackUrl: callbackUrl || (emailInput.toLowerCase().includes("admin") ? "/admin" : "/dashboard"),
        redirect: false,
      });

      if (res?.error) {
        setErrorMessage("Invalid credentials or suspended account. Use demo accounts below.");
        setIsLoadingCustom(false);
      } else if (res?.url) {
        window.location.href = res.url;
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try Demo Login.");
      setIsLoadingCustom(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isGoogleConfigured) return;
    try {
      await signIn("google", { callbackUrl: callbackUrl || "/dashboard" });
    } catch {
      setErrorMessage("Failed to connect with Google OAuth.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-3 group mb-4">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/25 border border-indigo-400/30 group-hover:scale-105 transition-transform duration-200">
            <Cpu className="w-6 h-6 text-white" />
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="text-left flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-white font-mono">
                Kavya<span className="text-indigo-400">Labs</span>
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                BLR · AI
              </span>
            </div>
            <span className="text-[10px] text-gray-400 tracking-wider uppercase font-mono">
              Autonomous Intelligence
            </span>
          </div>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Welcome to Kavya Labs
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Sign in to access Enterprise Swarms or the Admin Console
        </p>
      </div>

      {/* Main Auth Card */}
      <div className="bg-[#0f1422]/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-32 bg-indigo-500/20 blur-[80px] pointer-events-none" />

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Demo Accounts Notice */}
        <div className="mb-5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 flex items-center justify-between">
          <span className="font-semibold text-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Evaluation Demo Mode
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            No API Keys Needed
          </span>
        </div>

        {/* 1. Admin Demo Login Option (Phase 2 Requirement) */}
        <div className="mb-3">
          <button
            type="button"
            onClick={handleAdminDemoSignIn}
            disabled={isLoadingAdminDemo || isLoadingUserDemo}
            className="w-full relative group overflow-hidden rounded-xl p-[1px] font-medium transition-all duration-300 shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 rounded-xl" />
            <div className="relative px-5 py-3 rounded-[11px] bg-gradient-to-r from-purple-900/90 via-[#18112e] to-violet-900/90 hover:from-purple-800 hover:to-violet-800 text-white font-medium text-xs sm:text-sm flex items-center justify-between transition-all border border-purple-400/30">
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-400/40 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-purple-300" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white">Continue as Admin Demo</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/30 text-purple-200 border border-purple-400/40 font-mono">
                      Role: Admin
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-300 font-mono block">
                    admin@kavyalabs.com · /admin
                  </span>
                </div>
              </div>
              {isLoadingAdminDemo ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
              ) : (
                <ArrowRight className="w-4 h-4 text-purple-300 group-hover:translate-x-1 transition-transform shrink-0" />
              )}
            </div>
          </button>
        </div>

        {/* 2. Normal User Demo Login Option */}
        <div className="mb-5">
          <button
            type="button"
            onClick={handleUserDemoSignIn}
            disabled={isLoadingAdminDemo || isLoadingUserDemo}
            className="w-full relative group overflow-hidden rounded-xl p-[1px] font-medium transition-all duration-300 shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="relative px-5 py-3 rounded-[11px] bg-gradient-to-r from-indigo-950/90 via-[#0e162b] to-slate-900/90 hover:from-indigo-900 hover:to-slate-800 text-white font-medium text-xs sm:text-sm flex items-center justify-between transition-all border border-indigo-400/30">
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-indigo-300" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white">Continue as User Demo</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-200 border border-indigo-400/40 font-mono">
                      Role: User
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-300 font-mono block">
                    demo@kavyalabs.com · /dashboard
                  </span>
                </div>
              </div>
              {isLoadingUserDemo ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
              ) : (
                <ArrowRight className="w-4 h-4 text-indigo-300 group-hover:translate-x-1 transition-transform shrink-0" />
              )}
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <span className="relative px-3 bg-[#0f1422] text-[10px] uppercase tracking-wider text-gray-400 font-mono">
            Or Alternate Authentication
          </span>
        </div>

        {/* Google OAuth Provider */}
        <div className="space-y-3">
          {isGoogleConfigured ? (
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-medium transition-all hover:border-white/25 active:scale-[0.99]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          ) : (
            <div className="relative group">
              <button
                type="button"
                disabled
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-gray-500 text-xs font-medium cursor-not-allowed opacity-60"
              >
                <svg className="w-4 h-4 grayscale opacity-50" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google OAuth (Setup Required)</span>
              </button>
              <p className="mt-1 text-[10px] text-gray-500 text-center flex items-center justify-center gap-1">
                <Info className="w-3 h-3 shrink-0" />
                <span>Requires GOOGLE_CLIENT_ID & SECRET. Use Demo Logins above.</span>
              </p>
            </div>
          )}

          {/* Toggle manual credentials form */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setShowManualForm(!showManualForm)}
              className="text-xs text-gray-400 hover:text-indigo-400 transition-colors inline-flex items-center gap-1 font-mono"
            >
              <KeyRound className="w-3 h-3" />
              <span>{showManualForm ? "Hide manual credentials" : "Or enter custom email / password"}</span>
            </button>
          </div>

          {/* Collapsible Manual Form */}
          {showManualForm && (
            <form onSubmit={handleCustomSignIn} className="pt-3 space-y-3 border-t border-white/5">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin@kavyalabs.com or demo@kavyalabs.com"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors font-mono"
                    required
                  />
                  <Lock className="w-4 h-4 text-gray-500 absolute right-3 top-2.5" />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoadingCustom}
                className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg text-xs font-semibold text-white transition-colors flex items-center justify-center gap-2"
              >
                {isLoadingCustom ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Security Footer Notice */}
        <div className="mt-5 pt-4 border-t border-white/10 text-center">
          <div className="inline-flex items-center gap-1.5 text-[10px] text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Server-Verified RBAC · Demo Admin and User Sessions Supported</span>
          </div>
        </div>
      </div>

      {/* Return link */}
      <div className="text-center mt-6">
        <Link
          href="/"
          className="text-xs text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
        >
          <span>← Return to Kavya Labs Landing Page</span>
        </Link>
      </div>
    </div>
  );
}
