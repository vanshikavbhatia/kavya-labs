import Link from "next/link";
import {
  Users,
  UserCheck,
  UserPlus,
  UserX,
  TrendingUp,
  ArrowRight,
  Shield,
  Activity,
  Layers,
  Sparkles,
  Info,
} from "lucide-react";
import { getAllUsers, calculateAnalytics } from "@/lib/userStore";

export default function AdminOverviewPage() {
  const users = getAllUsers();
  const analytics = calculateAnalytics("30d");

  const recentUsers = users.slice(0, 5);

  const stats = [
    {
      label: "Total Users",
      value: analytics.totalUsers.toString(),
      trend: "+18.2%",
      trendLabel: "vs prior period",
      isPositive: true,
      description: "Total registered enterprise accounts",
      icon: Users,
      color: "from-blue-500/20 to-indigo-500/20 border-indigo-500/30 text-indigo-400",
    },
    {
      label: "Active Users",
      value: analytics.activeUsers.toString(),
      trend: `${Math.round((analytics.activeUsers / (analytics.totalUsers || 1)) * 100)}%`,
      trendLabel: "operational rate",
      isPositive: true,
      description: "Active in the last 30 days",
      icon: UserCheck,
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400",
    },
    {
      label: "New Registrations",
      value: analytics.newRegistrations.toString(),
      trend: "+4 accounts",
      trendLabel: "this month",
      isPositive: true,
      description: "New enterprise accounts onboarded",
      icon: UserPlus,
      color: "from-purple-500/20 to-fuchsia-500/20 border-purple-500/30 text-purple-400",
    },
    {
      label: "Suspended Accounts",
      value: analytics.suspendedUsers.toString(),
      trend: "Enforced",
      trendLabel: "policy restrictions",
      isPositive: false,
      description: "Access locked due to policy compliance",
      icon: UserX,
      color: "from-red-500/20 to-rose-500/20 border-red-500/30 text-red-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#0f1422] to-indigo-950/30 border border-purple-500/30 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>Week 3 Administrator Console · Role-Based Access Control</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Swarm Cluster & User Command Center
            </h2>
            <p className="mt-2 text-sm text-gray-300 max-w-2xl">
              Manage enterprise accounts, monitor multi-agent orchestrator access, and review
              system telemetry across the Bengaluru cluster.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/users"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 border border-purple-400/30 transition-all hover:scale-[1.02]"
            >
              <Users className="w-4 h-4" />
              <span>Manage All Users</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/admin/analytics"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              <Activity className="w-4 h-4 text-purple-400" />
              <span>Telemetry Analytics</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Demo Data Notice */}
      <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-center justify-between text-xs text-purple-200">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-purple-400 shrink-0" />
          <span>
            <strong>Demonstration Dataset:</strong> Figures reflect the seeded Kavya Labs dataset with functional add, edit, suspend, and delete operations.
          </span>
        </div>
        <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
          In-Memory Persistent Store
        </span>
      </div>

      {/* 4 Important Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-[#0f1422] border border-white/10 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-gray-400 tracking-wider">
                  {stat.label}
                </span>
                <div className={`p-2.5 rounded-xl bg-gradient-to-br border ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
                  {stat.value}
                </span>
                <span
                  className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-md ${
                    stat.isPositive
                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                      : "text-amber-400 bg-amber-500/10 border border-amber-500/20"
                  }`}
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.trend}
                </span>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">{stat.description}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Access Grid: Recent Registrations & Swarm Cluster Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users Table Preview (2 Cols) */}
        <div className="lg:col-span-2 bg-[#0f1422] border border-white/10 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                Recent User Accounts
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Latest registrations across all cohorts</p>
            </div>
            <Link
              href="/admin/users"
              className="text-xs text-purple-400 hover:text-purple-300 font-medium inline-flex items-center gap-1 font-mono"
            >
              <span>View All ({users.length})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gray-400 font-mono border-b border-white/5 uppercase text-[11px]">
                  <th className="pb-3 font-semibold">User</th>
                  <th className="pb-3 font-semibold">Role</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Date Joined</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-900 to-indigo-900 border border-purple-400/30 flex items-center justify-center font-bold font-mono text-[11px] text-purple-200 shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-white truncate max-w-[150px]">{u.name}</p>
                          <p className="text-[11px] text-gray-400 font-mono truncate max-w-[150px]">
                            {u.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                          u.role === "Admin"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            : "bg-white/5 text-gray-300 border border-white/10"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          u.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : u.status === "Suspended"
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            u.status === "Active"
                              ? "bg-emerald-400"
                              : u.status === "Suspended"
                              ? "bg-red-400"
                              : "bg-gray-400"
                          }`}
                        />
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-gray-400 text-[11px]">{u.dateJoined}</td>
                    <td className="py-3 text-right">
                      <Link
                        href="/admin/users"
                        className="text-purple-400 hover:text-purple-300 text-xs font-medium"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Swarm Infrastructure & Quick Actions (1 Col) */}
        <div className="space-y-6">
          <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-6 shadow-lg">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-purple-400" />
              Cluster Telemetry
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-400">Node Cluster</span>
                <span className="font-mono text-white">ap-south-1 (BLR)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-400">Consensus Engine</span>
                <span className="font-mono text-emerald-400">DAG-Raft (42ms)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-400">Audit Mode</span>
                <span className="font-mono text-purple-300">Cryptographic SHA-256</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400">RBAC Enforcement</span>
                <span className="font-mono text-emerald-400">Server JWT + Middleware</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-6 shadow-lg">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Quick Administrative Tasks
            </h3>
            <div className="space-y-2.5">
              <Link
                href="/admin/users"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <UserPlus className="w-4 h-4 text-purple-400" />
                  <span>Onboard New User Record</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>

              <Link
                href="/admin/analytics"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Review Growth Curves</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>

              <Link
                href="/admin/settings"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-indigo-400" />
                  <span>Admin Security Parameters</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
