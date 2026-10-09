"use client";

import { useState } from "react";
import { Check, Sparkles, ArrowRight, Zap } from "lucide-react";

export default function Pricing() {
  const [annualBilling, setAnnualBilling] = useState<boolean>(true);

  const plans = [
    {
      name: "Developer",
      description: "Ideal for exploring autonomous agent swarms and local prototypes.",
      monthlyPrice: 0,
      annualPrice: 0,
      badge: "Free Tier",
      popular: false,
      features: [
        "Up to 3 concurrent agents",
        "50,000 agent execution steps / mo",
        "Standard RAG & Vector Indexing",
        "Community Discord support",
        "Public Docker sandbox runner",
        "Standard telemetry logs",
      ],
      cta: "Get Started Free",
      ctaHref: "#demo",
    },
    {
      name: "Team & Pro",
      description: "For engineering teams automating mission-critical production workflows.",
      monthlyPrice: 199,
      annualPrice: 159,
      badge: "Most Popular",
      popular: true,
      features: [
        "Up to 30 concurrent agent swarms",
        "1,000,000 execution steps / mo",
        "Hybrid Semantic Graph Memory",
        "Cryptographic audit logs (SHA-256)",
        "WASM micro-sandboxes (Zero delay)",
        "Priority Slack & Engineering channel",
        "DPDP & SOC2 compliance exports",
      ],
      cta: "Start 14-Day Pro Trial",
      ctaHref: "#demo",
    },
    {
      name: "Enterprise Sovereign",
      description: "Dedicated VPC deployment, on-prem hosting, and custom SLA guarantees.",
      monthlyPrice: "Custom",
      annualPrice: "Custom",
      badge: "Air-Gapped & On-Prem",
      popular: false,
      features: [
        "Unlimited concurrent agents & swarms",
        "Dedicated VPC (AWS Mumbai / Azure / GCP)",
        "Bring-Your-Own-LLM & local weights",
        "99.99% Uptime Service Level Agreement",
        "Role-based access control (RBAC & SAML)",
        "24/7 dedicated Bengaluru engineering support",
        "Custom model fine-tuning & evaluation",
      ],
      cta: "Talk to Rohan & Team",
      ctaHref: "#demo",
    },
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-4 border border-indigo-500/20">
            <Zap className="w-3.5 h-3.5" />
            <span>TRANSPARENT VALUE PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Predictable Pricing for High-Scale Intelligence
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Start free, scale seamlessly. Zero surprise overages, deterministic step budgeting.
          </p>

          {/* Billing Switch */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm ${!annualBilling ? "text-white font-semibold" : "text-gray-400"}`}>
              Monthly
            </span>
            <button
              onClick={() => setAnnualBilling(!annualBilling)}
              className="w-14 h-7 rounded-full bg-gray-800 p-1 relative transition-colors border border-white/10"
              aria-label="Toggle annual billing"
            >
              <div
                className={`w-5 h-5 rounded-full bg-indigo-500 transition-transform ${
                  annualBilling ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-sm flex items-center gap-1.5 ${annualBilling ? "text-white font-semibold" : "text-gray-400"}`}>
              <span>Annual</span>
              <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all ${
                plan.popular
                  ? "bg-gradient-to-b from-[#161e33] to-[#0c1221] border-2 border-indigo-500 shadow-2xl shadow-indigo-600/20 scale-[1.02]"
                  : "glass-panel border border-white/10 hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  {!plan.popular && (
                    <span className="text-[11px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-400 mb-6 min-h-[32px]">
                  {plan.description}
                </p>

                <div className="mb-6 pb-6 border-b border-white/10">
                  {typeof plan.monthlyPrice === "number" ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold font-mono text-white">
                        ${annualBilling ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-xs text-gray-400">/ month</span>
                    </div>
                  ) : (
                    <div className="text-3xl font-extrabold font-mono text-white">
                      Custom
                    </div>
                  )}
                  <div className="text-[11px] text-gray-400 mt-1">
                    {annualBilling && typeof plan.monthlyPrice === "number" && plan.monthlyPrice > 0
                      ? "Billed annually ($1,908/yr)"
                      : typeof plan.monthlyPrice === "number" && plan.monthlyPrice === 0
                      ? "Free for developers & small tests"
                      : "Tailored to enterprise throughput"}
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 font-mono">
                    Included capabilities:
                  </div>
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <a
                  href={plan.ctaHref}
                  className={`w-full py-3 px-4 rounded-xl text-center text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                      : "bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 hover:border-white/20"
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
