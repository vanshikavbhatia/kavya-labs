"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { 
  Cpu, 
  Menu, 
  X, 
  ArrowRight,
  User,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Shield
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#080b11]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 shadow-md shadow-indigo-500/25 border border-indigo-400/30 group-hover:scale-105 transition-transform duration-200">
              <Cpu className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-mono">
                  Kavya<span className="text-indigo-400">Labs</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  BLR · AI
                </span>
              </div>
              <span className="text-[10px] text-gray-400 tracking-wider uppercase font-mono">
                Autonomous Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="/#features" className="hover:text-white transition-colors">
              Platform
            </a>
            <a href="/#architecture" className="hover:text-white transition-colors">
              Architecture
            </a>
            <a href="/#calculator" className="hover:text-white transition-colors">
              ROI Calculator
            </a>
            <a href="/#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="/#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-left"
                >
                  <div className="w-7 h-7 rounded-lg overflow-hidden bg-gradient-to-tr from-indigo-600 to-violet-600 border border-indigo-400/40 flex items-center justify-center shrink-0">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        width={28}
                        height={28}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <span className="text-xs font-bold text-white font-mono">
                        {session.user?.name?.charAt(0) || "U"}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-white max-w-[120px] truncate leading-tight">
                      {session.user?.name || "Demo User"}
                    </span>
                    <span className="text-[10px] text-indigo-400 font-mono leading-none">
                      {session.user?.provider || "Active"}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-0.5" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0f1422] border border-white/10 shadow-2xl p-1.5 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-white/5 mb-1">
                      <p className="text-xs font-semibold text-white truncate">
                        {session.user?.name}
                      </p>
                      <p className="text-[11px] text-gray-400 font-mono truncate">
                        {session.user?.email}
                      </p>
                    </div>

                    {session.user?.role === "Admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-purple-300 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-colors mb-1"
                      >
                        <Shield className="w-4 h-4 text-purple-400" />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                      <span>Dashboard</span>
                    </Link>

                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <User className="w-4 h-4 text-violet-400" />
                      <span>User Profile</span>
                    </Link>

                    <div className="my-1 border-t border-white/5" />

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/10"
                >
                  Sign In
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md shadow-indigo-600/30 transition-all border border-indigo-400/30 hover:scale-[1.02]"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 pb-3 flex flex-col gap-3">
            <a
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Platform
            </a>
            <a
              href="/#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Architecture
            </a>
            <a
              href="/#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              ROI Calculator
            </a>
            <a
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              Pricing
            </a>
            <a
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              FAQ
            </a>

            <div className="pt-2 flex flex-col gap-2 border-t border-white/10 mt-1">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 mb-1">
                    <p className="text-xs font-semibold text-white">{session.user?.name}</p>
                    <p className="text-[11px] text-gray-400 font-mono">{session.user?.email}</p>
                    {session.user?.role === "Admin" && (
                      <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        Admin Privileges
                      </span>
                    )}
                  </div>
                  {session.user?.role === "Admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-purple-700 hover:bg-purple-600 rounded-lg shadow-md border border-purple-400/30"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Admin Console</span>
                    </Link>
                  )}
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-md"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-200 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10"
                  >
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg border border-red-500/20"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center px-4 py-2.5 text-sm font-medium text-gray-300 bg-white/5 hover:bg-white/10 rounded-lg"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md"
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
