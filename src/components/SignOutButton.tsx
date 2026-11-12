"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useState } from "react";

interface SignOutButtonProps {
  className?: string;
  variant?: "outline" | "solid" | "ghost";
  showIcon?: boolean;
  label?: string;
}

export default function SignOutButton({
  className = "",
  variant = "outline",
  showIcon = true,
  label = "Sign Out",
}: SignOutButtonProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut({ callbackUrl: "/" });
    } catch {
      setIsSigningOut(false);
    }
  };

  const baseStyle =
    "inline-flex items-center justify-center gap-2 text-xs font-semibold rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed";

  const variantStyles = {
    outline:
      "px-3.5 py-2 border border-red-500/30 text-red-300 hover:text-white hover:bg-red-500/20 hover:border-red-500/50",
    solid:
      "px-4 py-2 bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/30",
    ghost:
      "px-3 py-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10",
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isSigningOut}
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
    >
      {isSigningOut ? (
        <>
          <div className="w-3.5 h-3.5 border-2 border-red-300 border-t-transparent rounded-full animate-spin" />
          <span>Signing out...</span>
        </>
      ) : (
        <>
          {showIcon && <LogOut className="w-3.5 h-3.5" />}
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
