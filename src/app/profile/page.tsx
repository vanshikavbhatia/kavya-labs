import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authOptions } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";
import {
  Cpu,
  User,
  ShieldCheck,
  Shield,
  Mail,
  KeyRound,
  Calendar,
  Building2,
  Lock,
  ArrowLeft,
  LayoutDashboard,
  CheckCircle2,
  Fingerprint,
} from "lucide-react";

export const metadata: Metadata = {
  title: "User Profile | Kavya Labs",
  description: "View and manage your Kavya Labs enterprise authenticated profile.",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login?callbackUrl=/profile");
  }

  const user = session.user;
  const authProvider = user.provider || "Demo Account";
  const userRole = user.role || "Lead Swarm Architect";

  return (
    <div className="min-h-screen bg-[#080b11] text-gray-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#0c101a]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 shadow-md shadow-indigo-600/30 border border-indigo-400/30">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white font-mono">
                Kavya<span className="text-indigo-400">Labs</span>
              </span>
            </Link>
            <div className="hidden sm:flex items-center gap-1 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">
                CONSOLE
              </span>
              <span className="text-gray-500">/</span>
              <span className="text-indigo-400 font-semibold">PROFILE</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user.role === "Admin" && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-purple-300 hover:text-white bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Admin Console</span>
              </Link>
            )}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
              <span>Dashboard</span>
            </Link>
            <SignOutButton variant="outline" label="Sign Out" />
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/dashboard" className="hover:text-white transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-indigo-400">User Profile</span>
        </div>

        {/* Profile Header Hero Card */}
        <div className="relative mb-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-indigo-950/50 via-[#0f1422] to-violet-950/40 border border-white/10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 blur-[90px] pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-indigo-400/50 shadow-xl shadow-indigo-600/30 bg-indigo-950 flex items-center justify-center shrink-0">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User Avatar"}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <span className="text-3xl font-bold text-indigo-200 font-mono">
                  {user.name?.charAt(0) || "K"}
                </span>
              )}
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0f1422] rounded-full" />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {user.name || "Kavya Labs User"}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified Session
                </span>
              </div>
              <p className="text-sm text-indigo-300 font-mono mb-3">{user.email}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-gray-300">
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-mono">
                  {userRole}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-indigo-400" />
                  Kavya Labs Bengaluru
                </span>
                <span className="px-2.5 py-1 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold font-mono">
                  {authProvider}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Profile Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Identity & Account Specs */}
          <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-6 shadow-lg">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 mb-5">
              <User className="w-4 h-4 text-indigo-400" />
              Account Credentials
            </h3>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-400 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  Primary Email
                </span>
                <span className="font-mono text-white font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-400 flex items-center gap-2">
                  <Fingerprint className="w-3.5 h-3.5 text-gray-400" />
                  User Identifier
                </span>
                <span className="font-mono text-indigo-300 text-[11px]">
                  {user.id || "usr_kavya_demo_8492"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-400 flex items-center gap-2">
                  <KeyRound className="w-3.5 h-3.5 text-gray-400" />
                  Authentication Provider
                </span>
                <span className="font-mono text-white font-medium px-2 py-0.5 rounded bg-white/5">
                  {authProvider}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  Session Duration
                </span>
                <span className="font-mono text-emerald-400 font-medium">30 Days Persistent</span>
              </div>
            </div>
          </div>

          {/* Security & Compliance Architecture */}
          <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-6 shadow-lg">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 mb-5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Session Security
            </h3>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-400 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-gray-400" />
                  Session Mechanism
                </span>
                <span className="font-mono text-white">NextAuth Server JWT Cookie</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-400">Cookie Security</span>
                <span className="font-mono text-emerald-400 text-[11px]">
                  HttpOnly · Secure · SameSite=Lax
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-400">Server Verification</span>
                <span className="font-mono text-emerald-400 text-[11px]">
                  Valid at getServerSession()
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400">Compliance Standard</span>
                <span className="font-mono text-indigo-300">SOC2 Type II / ISO 27001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 rounded-2xl bg-[#0f1422] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {user.role === "Admin" && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-purple-300 hover:text-white bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Admin Console</span>
              </Link>
            )}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              <span>Landing Page</span>
            </Link>
          </div>

          <SignOutButton
            variant="solid"
            label="Log Out of Kavya Labs"
            className="w-full sm:w-auto"
          />
        </div>
      </main>
    </div>
  );
}
