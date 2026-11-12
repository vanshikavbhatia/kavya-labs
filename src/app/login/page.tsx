import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { authOptions, isGoogleConfigured } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In | Kavya Labs Autonomous AI Agent Swarms",
  description: "Sign in to access your Kavya Labs enterprise agent swarm workspace.",
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#080b11] text-gray-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -top-10 right-10 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md mx-auto">
        <Suspense
          fallback={
            <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-8 text-center animate-pulse">
              <div className="h-10 w-10 bg-white/10 rounded-xl mx-auto mb-4" />
              <div className="h-6 w-48 bg-white/10 rounded mx-auto mb-2" />
              <div className="h-4 w-32 bg-white/5 rounded mx-auto" />
            </div>
          }
        >
          <LoginForm isGoogleConfigured={isGoogleConfigured} />
        </Suspense>
      </div>
    </div>
  );
}
