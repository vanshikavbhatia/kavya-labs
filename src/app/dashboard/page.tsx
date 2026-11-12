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
  KeyRound,
  ExternalLink,
  Activity,
  Layers,
  Sparkles,
  ArrowRight,
  Server,
  Clock,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "User Dashboard | Kavya Labs",
  description: "Secure enterprise agent swarm workspace and session console.",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const user = session.user;
  const authProvider = user.provider || "Demo Account";
  const userRole = user.role || "Lead Swarm Architect";

  return (
    <div className="min-h-screen bg-[#080b11] text-gray-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navigation */}
      <header className="border-b border-white/10 bg-[#0c101a]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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
              <span className="text-indigo-400 font-semibold">DASHBOARD</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>My Profile</span>
            </Link>
            <SignOutButton variant="outline" label="Sign Out" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Welcome Section */}
        <div className="relative mb-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-[#0f1422] to-violet-950/30 border border-white/10 overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[100px] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Active Server-Side JWT Session</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                  {user.name || "Kavya Labs User"}
                </span>
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl">
                Your autonomous agent swarm workspace is connected. Authenticated securely via{" "}
                <span className="text-indigo-300 font-mono font-medium">{authProvider}</span>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 border border-indigo-400/30 transition-all hover:scale-[1.02]"
              >
                <User className="w-4 h-4" />
                <span>View Full Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
              >
                <span>Landing Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* User Identity & Authentication Information Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Identity Card */}
          <div className="lg:col-span-1 bg-[#0f1422] border border-white/10 rounded-2xl p-6 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-600/10 blur-[50px] pointer-events-none" />
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <span className="text-xs font-mono uppercase text-gray-400 tracking-wider">
                  User Identity Profile
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                  Week 2 Auth
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-indigo-500/40 shadow-lg shadow-indigo-600/20 bg-indigo-950 flex items-center justify-center shrink-0">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User Avatar"}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="text-xl font-bold text-indigo-300 font-mono">
                      {user.name?.charAt(0) || "K"}
                    </span>
                  )}
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0f1422] rounded-full" />
                </div>
                <div className="overflow-hidden">
                  <h2 className="text-base font-bold text-white truncate">
                    {user.name || "Kavya Labs User"}
                  </h2>
                  <p className="text-xs text-indigo-300 font-mono truncate">{user.email}</p>
                  <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded bg-white/5 text-gray-300 font-medium">
                    {userRole}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs border-t border-white/5 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
                    Auth Method
                  </span>
                  <span className="font-mono text-white font-medium px-2 py-0.5 bg-indigo-500/15 border border-indigo-500/30 rounded">
                    {authProvider}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Session Type
                  </span>
                  <span className="font-mono text-emerald-400 text-[11px]">Server JWT Cookie</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    Persistence
                  </span>
                  <span className="text-gray-300 font-mono text-[11px]">30 Days Auto-Renew</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <Link
                href="/profile"
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1"
              >
                <span>Edit Profile</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <SignOutButton variant="ghost" label="Logout" />
            </div>
          </div>

          {/* Connected Swarm Workspaces & Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#0f1422] border border-white/10 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-gray-400 uppercase">Assigned Swarms</span>
                  <Layers className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-2xl font-bold text-white font-mono">14 Agents</div>
                <p className="mt-1 text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>3 Clusters in Sync</span>
                </p>
              </div>

              <div className="bg-[#0f1422] border border-white/10 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-gray-400 uppercase">Swarm Latency</span>
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-white font-mono">38ms</div>
                <p className="mt-1 text-xs text-gray-400">p99 Bengaluru Cluster</p>
              </div>

              <div className="bg-[#0f1422] border border-white/10 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-gray-400 uppercase">Security Tier</span>
                  <ShieldCheck className="w-4 h-4 text-violet-400" />
                </div>
                <div className="text-2xl font-bold text-white font-mono">Level 4</div>
                <p className="mt-1 text-xs text-gray-400">SOC2 Type II Protected</p>
              </div>
            </div>

            {/* Swarm Environment Notice */}
            <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-sm font-bold text-white">
                    Connected Swarm Cluster: BLR-PROD-01
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  OPERATIONAL
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                You have authenticated access to Kavya Labs autonomous multi-agent pipelines. Your server session grants cryptographic dispatch privileges across engineering, financial audit, and infrastructure workflows.
              </p>
              
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-mono">Agent Orchestrator:</span>
                  <span className="text-gray-200 font-mono">Kavya-Core-v1.4</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-mono">Session Token ID:</span>
                  <span className="text-indigo-400 font-mono">
                    {user.id ? user.id.slice(0, 18) : "kavya-session-jwt-ok"}...
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-mono">Architecture Mode:</span>
                  <span className="text-gray-200 font-mono">Sub-Second Consensus</span>
                </div>
              </div>
            </div>

            {/* Roadmap Callout */}
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div className="text-xs text-gray-300">
                <span className="font-semibold text-white">Milestone Note:</span> This is the Week 2 Authenticated User Dashboard. Next week, Week 3 will introduce the full multi-agent swarm observability control room and telemetry console.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
