"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { signOut } from "next-auth/react";
import {
  Cpu,
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  Globe,
  LogOut,
  Menu,
  X,
  Shield,
  Layers,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface AdminShellProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
    provider?: string;
  };
  children: React.ReactNode;
}

export default function AdminShell({ user, children }: AdminShellProps) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navLinks = [
    {
      name: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
      exact: false,
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
      exact: false,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      exact: false,
    },
  ];

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard Overview";
    if (pathname.startsWith("/admin/users")) return "User Management";
    if (pathname.startsWith("/admin/analytics")) return "Telemetry & Analytics";
    if (pathname.startsWith("/admin/settings")) return "System Settings";
    return "Admin Console";
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-gray-100 flex flex-col md:flex-row selection:bg-purple-500/30 selection:text-purple-200">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0c101a] border-b border-white/10 sticky top-0 z-50">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center border border-purple-400/40">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white font-mono">
            Kavya<span className="text-purple-400">Admin</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
          aria-label="Toggle navigation"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop overlay for mobile */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside
        className={`fixed md:sticky top-0 bottom-0 left-0 z-50 w-64 bg-[#0a0e17] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } h-screen`}
      >
        <div>
          {/* Logo Header */}
          <div className="p-5 border-b border-white/10">
            <Link
              href="/"
              className="flex items-center gap-3 group"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-violet-600 shadow-md shadow-purple-600/30 border border-purple-400/30 group-hover:scale-105 transition-transform duration-200">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold tracking-tight text-white font-mono">
                    Kavya<span className="text-purple-400">Labs</span>
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                    ADMIN
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 tracking-wider uppercase font-mono">
                  Autonomous Intelligence
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] font-mono uppercase text-gray-400 tracking-wider">
              Management Portal
            </div>
            {navLinks.map((item) => {
              const active = isActive(item.href, item.exact);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    active
                      ? "bg-purple-600/20 text-purple-200 border border-purple-500/30 shadow-sm"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-purple-400" : "text-gray-400"}`} />
                  <span className="flex-1">{item.name}</span>
                  {active && <ChevronRight className="w-3.5 h-3.5 text-purple-400" />}
                </Link>
              );
            })}

            <div className="pt-4 px-3 py-2 text-[10px] font-mono uppercase text-gray-400 tracking-wider">
              External & Consoles
            </div>
            <Link
              href="/dashboard"
              onClick={() => setMobileSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>User Dashboard</span>
            </Link>
            <Link
              href="/"
              onClick={() => setMobileSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Globe className="w-4 h-4 text-gray-400" />
              <span className="flex-1">Back to Website</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </Link>
          </nav>
        </div>

        {/* Admin User Profile & Sign Out Footer */}
        <div className="p-3 border-t border-white/10 bg-[#090d15]/80">
          <div className="flex items-center gap-3 px-2 py-2 mb-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-purple-950 border border-purple-400/40 flex items-center justify-center shrink-0">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Admin"}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <span className="text-xs font-bold text-purple-300 font-mono">
                  {user.name?.charAt(0) || "A"}
                </span>
              )}
            </div>
            <div className="overflow-hidden flex-1 text-left">
              <p className="text-xs font-bold text-white truncate leading-tight">
                {user.name || "Kavya Labs Admin"}
              </p>
              <p className="text-[10px] text-purple-300 font-mono truncate">{user.email}</p>
            </div>
            <Shield className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          </div>

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area with Header */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Desktop Bar */}
        <header className="hidden md:flex items-center justify-between px-8 h-16 bg-[#0a0e17]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-gray-400">ADMIN</span>
            <span className="text-gray-600">/</span>
            <h1 className="text-sm font-bold text-white font-mono tracking-tight">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CLUSTER: BLR-PROD-01</span>
            </div>
            <div className="text-xs text-gray-400 font-mono">
              Active: <span className="text-white font-medium">{user.email}</span>
            </div>
          </div>
        </header>

        {/* Children Render Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
