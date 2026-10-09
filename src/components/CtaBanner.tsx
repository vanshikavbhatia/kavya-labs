"use client";

import { useState } from "react";
import { Sparkles, CheckCircle2, ShieldCheck, Mail, Send } from "lucide-react";

export default function CtaBanner() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-950/80 via-[#0e162b] to-violet-950/80 border border-indigo-500/30 p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6 border border-indigo-500/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EARLY ACCESS INVITATION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Ship Enterprise AI Swarms in Minutes, Not Months
            </h2>

            <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
              Join leading engineering teams across Bengaluru, Singapore, and San Francisco.
              Get a dedicated sandbox tenant with complete OpenTelemetry instrumentation.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 max-w-lg mx-auto text-emerald-300">
                <div className="flex items-center justify-center gap-2 font-bold text-base mb-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Access Request Confirmed!</span>
                </div>
                <p className="text-xs text-emerald-200/80 font-sans">
                  Rohan Mehta and the Kavya Labs team will reach out to <span className="font-mono font-bold text-white">{email}</span> within 24 hours with your sandbox API credentials.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-400 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
                >
                  {loading ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span>Get Instant Access</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Credit Card Required</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Instant API Keys</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-violet-400" />
                <span>100% India DPDP Compliant</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
