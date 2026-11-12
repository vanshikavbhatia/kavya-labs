"use client";

import { useState, useEffect } from "react";
import { AnalyticsData } from "@/lib/userStore";
import {
  BarChart3,
  Calendar,
  Users,
  UserPlus,
  UserCheck,
  UserX,
  Shield,
  Info,
  RefreshCw,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

interface AnalyticsClientProps {
  initialData: AnalyticsData;
}

export default function AnalyticsClient({ initialData }: AnalyticsClientProps) {
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "90d" | "all">("30d");
  const [data, setData] = useState<AnalyticsData>(initialData);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleTimeframeChange = async (tf: "7d" | "30d" | "90d" | "all") => {
    setTimeframe(tf);
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/analytics?timeframe=${tf}`);
      if (res.ok) {
        const json = await res.json();
        setData(json.analytics);
      }
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  const timeframes: { label: string; value: "7d" | "30d" | "90d" | "all" }[] = [
    { label: "Last 7 Days", value: "7d" },
    { label: "Last 30 Days", value: "30d" },
    { label: "Last 90 Days", value: "90d" },
    { label: "All Time", value: "all" },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header & Date Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-400" />
            <span>Telemetry & Platform Analytics</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Real-time visualization of enterprise onboarding, account distribution, and cohort activity.
          </p>
        </div>

        {/* Date Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0f1422] border border-white/10 text-xs font-mono">
          <Calendar className="w-3.5 h-3.5 text-gray-400 ml-2 mr-1" />
          {timeframes.map((tf) => (
            <button
              key={tf.value}
              type="button"
              onClick={() => handleTimeframeChange(tf.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                timeframe === tf.value
                  ? "bg-purple-600 text-white font-semibold shadow-sm"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Demo Notice */}
      <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-center justify-between text-xs text-purple-200">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-purple-400 shrink-0" />
          <span>
            <strong>Demo Analytics Dataset:</strong> All charts and metrics dynamically compute against the seeded Kavya Labs dataset based on selected date ranges.
          </span>
        </div>
        {loading && (
          <div className="flex items-center gap-1.5 text-purple-300 font-mono text-[11px]">
            <RefreshCw className="w-3 h-3 animate-spin" />
            <span>Calculating...</span>
          </div>
        )}
      </div>

      {/* 5 Key Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total Users */}
        <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase text-gray-400">Total Users</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{data.totalUsers}</div>
          <p className="mt-1 text-[11px] text-gray-400">All registered records</p>
        </div>

        {/* New Registrations */}
        <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase text-gray-400">New Signups</span>
            <UserPlus className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{data.newRegistrations}</div>
          <p className="mt-1 text-[11px] text-purple-300">In selected window</p>
        </div>

        {/* Active Accounts */}
        <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase text-gray-400">Active</span>
            <UserCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">{data.activeUsers}</div>
          <p className="mt-1 text-[11px] text-gray-400">
            {Math.round((data.activeUsers / (data.totalUsers || 1)) * 100)}% active rate
          </p>
        </div>

        {/* Suspended Accounts */}
        <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase text-gray-400">Suspended</span>
            <UserX className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-red-400 font-mono">{data.suspendedUsers}</div>
          <p className="mt-1 text-[11px] text-gray-400">Policy locked</p>
        </div>

        {/* Administrators */}
        <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-4 shadow-sm col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase text-gray-400">Admins</span>
            <Shield className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{data.adminCount}</div>
          <p className="mt-1 text-[11px] text-gray-400">Privileged roles</p>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. User Growth Chart (Line Chart) */}
        <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <LineChartIcon className="w-4 h-4 text-purple-400" />
                Cumulative User Growth
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Total registered user trajectory over {timeframe === "all" ? "all time" : timeframe}
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Line Chart
            </span>
          </div>

          <div className="h-64 w-full">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.growthSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis
                    dataKey="date"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: "#ffffff20" }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: "#ffffff20" }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0c101a",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                    labelStyle={{ color: "#fff", fontWeight: "bold" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#8b5cf6"
                    strokeWidth={2.5}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "#a855f7" }}
                    name="Total Users"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-gray-500">
                Initializing chart...
              </div>
            )}
          </div>
        </div>

        {/* 2. Signup Activity Bar Chart */}
        <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-400" />
                Signup Activity per Interval
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                New accounts onboarded per tracking period
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              Bar Chart
            </span>
          </div>

          <div className="h-64 w-full">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.signupActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis
                    dataKey="period"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: "#ffffff20" }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: "#ffffff20" }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0c101a",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                    labelStyle={{ color: "#fff", fontWeight: "bold" }}
                  />
                  <Bar
                    dataKey="signups"
                    fill="#6366f1"
                    radius={[6, 6, 0, 0]}
                    name="New Signups"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-gray-500">
                Initializing chart...
              </div>
            )}
          </div>
        </div>

        {/* 3. User Role Distribution (Donut Chart) */}
        <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-purple-400" />
                Role Distribution
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Proportion of Admins vs Normal Users
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Donut Chart
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.roleDistribution}
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.roleDistribution.map((entry, index) => (
                      <Cell key={`role-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0c101a",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    formatter={(value) => (
                      <span className="text-xs text-gray-300 font-mono">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-xs text-gray-500">Loading chart...</div>
            )}
          </div>
        </div>

        {/* 4. Account Status Breakdown (Pie Chart) */}
        <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-emerald-400" />
                Account Status Breakdown
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Active vs Suspended vs Inactive Accounts
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Status Ratio
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.statusDistribution}
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.statusDistribution.map((entry, index) => (
                      <Cell key={`status-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0c101a",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    formatter={(value) => (
                      <span className="text-xs text-gray-300 font-mono">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-xs text-gray-500">Loading chart...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
