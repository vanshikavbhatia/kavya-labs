import { 
  Cpu, 
  MapPin, 
  Mail, 
  ShieldCheck, 
  MessageSquare
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#06080e] pt-16 pb-12 text-sm text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Company & Office Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-md text-white border border-indigo-400/30">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-mono">
                  Kavya<span className="text-indigo-400">Labs</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  BLR AI
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              Autonomous AI agent swarms for mission-critical enterprise engineering. Built in Bengaluru, scaling globally.
            </p>

            <div className="space-y-2 pt-2 text-xs text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>
                  Kavya Labs Inc., 4th Floor, 80 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka 560034, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>rohan@kavyalabs.ai · team@kavyalabs.ai</span>
              </div>
            </div>

            {/* Social links with inline SVGs */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors border border-white/5"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors border border-white/5"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors border border-white/5"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors border border-white/5"
                aria-label="Discord"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Platform & Tech
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Multi-Agent DAG Engine
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-white transition-colors">
                  Hybrid Context (RAG 2.0)
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  ROI & Savings Calculator
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  WASM Micro-Sandboxes
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Real-Time Telemetry
                </a>
              </li>
              <li>
                <span className="text-gray-500 flex items-center gap-1.5">
                  <span>Sovereign (ap-south-1)</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1 rounded">Live</span>
                </span>
              </li>
            </ul>
          </div>

          {/* 3 Weekly Briefs / Roadmap tracker */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              3-Week Roadmap
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Week 1: Landing Page (Shipped)</span>
              </li>
              <li className="flex items-center gap-1.5 text-indigo-300">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span>Week 2: NextAuth + Google</span>
              </li>
              <li className="flex items-center gap-1.5 text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                <span>Week 3: Admin & Analytics</span>
              </li>
              <li className="pt-2">
                <div className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-[11px] text-indigo-300">
                  Investor Demo Day in 3 Weeks
                </div>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Security & Compliance
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="flex items-center gap-1.5 text-gray-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>India DPDP Act (2023)</span>
                </span>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-gray-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SOC2 Type II Ready</span>
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Responsible AI Principles
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-gray-400">
            © {new Date().getFullYear()} Kavya Labs Technologies Pvt. Ltd. Bengaluru, India. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/[0.03] px-3 py-1 rounded-full border border-white/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-gray-300 text-[11px]">
                API Mesh: Normal (ap-south-1 Mumbai)
              </span>
            </div>
            <span className="text-gray-400 font-mono text-[11px]">v1.4.2</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
