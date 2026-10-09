"use client";

import { useState } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  Check, 
  Copy, 
  Terminal,
  PlayCircle
} from "lucide-react";
import AgentSimulator from "./AgentSimulator";

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const command = "npm create @kavya-labs/agent@latest";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden radial-gradient-bg">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[300px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-medium mb-6 shadow-sm hover:border-indigo-500/40 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">Kavya Labs v1.4</span>
            <span className="text-gray-400">·</span>
            <span>Bengaluru&apos;s Premier Autonomous AI Platform</span>
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 font-sans">
            Orchestrate Autonomous{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              AI Agent Swarms
            </span>{" "}
            at Enterprise Scale
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            Engineered in Bengaluru for global enterprises. Transform fragmented engineering,
            financial, and ops pipelines into self-healing, multi-agent systems with sub-second
            latency and cryptographic auditability.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/25 border border-indigo-400/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Deploy Your First Swarm</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#interactive-demo"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("features");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-medium text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors hover:border-white/20"
            >
              <PlayCircle className="w-4 h-4 text-indigo-400" />
              <span>Explore Architecture</span>
            </a>
          </div>

          {/* Quick CLI copy banner */}
          <div className="inline-flex items-center gap-3 bg-black/60 border border-white/10 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono text-gray-300 mb-12 shadow-inner">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="text-gray-400">$</span>
            <span className="text-white select-all">{command}</span>
            <button
              onClick={handleCopy}
              className="ml-2 text-gray-400 hover:text-white p-1 rounded transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Highlights Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-14 text-left">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-2xl font-bold font-mono text-white mb-0.5">28ms</div>
              <div className="text-xs text-gray-400">P99 Swarm Latency</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-2xl font-bold font-mono text-indigo-400 mb-0.5">99.98%</div>
              <div className="text-xs text-gray-400">Zero-Hallucination Rate</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-2xl font-bold font-mono text-emerald-400 mb-0.5">64%</div>
              <div className="text-xs text-gray-400">Token Cost Reduction</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-2xl font-bold font-mono text-violet-400 mb-0.5">SOC2 & DPDP</div>
              <div className="text-xs text-gray-400">Enterprise Certified</div>
            </div>
          </div>
        </div>

        {/* Live Interactive Agent Simulator */}
        <div className="mt-4">
          <AgentSimulator />
        </div>
      </div>
    </section>
  );
}
