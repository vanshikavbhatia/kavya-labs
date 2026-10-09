"use client";

import { useState } from "react";
import { 
  Database, 
  ShieldCheck, 
  Activity, 
  GitBranch, 
  Lock, 
  Code2, 
  Sparkles, 
  ArrowRight
} from "lucide-react";

export default function Features() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    {
      title: "Agent Orchestration",
      subtitle: "Dynamic DAG Consensus",
      description: "Decompose complex requests into directed acyclic graphs (DAGs). Agents spawn child subagents, negotiate consensus, and self-heal failed steps autonomously.",
      codeSnippet: `// Kavya Multi-Agent Swarm Definition
const swarm = new AgentSwarm({
  orchestrator: "kavya-consensus-v2",
  concurrency: 128,
  retryPolicy: "exponential-backoff-self-heal",
  guards: [dpdpGuard, schemaVerifier]
});

await swarm.execute({
  objective: "Reconcile payment ledger and issue webhook callbacks",
  agents: ["LedgerParser", "FraudScorer", "ReceiptIssuer"]
});`,
      metrics: [
        { label: "Max Parallel Agents", value: "1,000+" },
        { label: "Consensus Latency", value: "< 35ms" },
        { label: "Auto-Recovery Rate", value: "99.4%" },
      ],
    },
    {
      title: "Hybrid Context & RAG",
      subtitle: "Semantic Graph Retrieval",
      description: "Combines vector embeddings with graph knowledge trees to provide 100% relevant context without context stuffing or memory pollution.",
      codeSnippet: `// Hybrid Context Engine
const context = await kavya.memory.retrieve({
  query: "Section 4.2 compliance standards for cross-border remittances",
  graphDepth: 3,
  hybridAlpha: 0.75, // Vector + BM25 + Knowledge Graph
  guardrailConfidenceThreshold: 0.985
});

// Returns zero-hallucination verified context chunk
console.log(context.verifiedCitations);`,
      metrics: [
        { label: "Vector Search", value: "3.2ms" },
        { label: "Citations Verified", value: "100%" },
        { label: "Memory Retention", value: "Infinite" },
      ],
    },
    {
      title: "Observability & Audit",
      subtitle: "Deterministic Tracing",
      description: "Inspect every agent thought, token expenditure, and tool invocation in real time. Meets RBI, SOC2 Type II, and DPDP India audit mandates.",
      codeSnippet: `// Real-Time Agent Telemetry Stream
kavya.telemetry.on("agent:step", (trace) => {
  console.log(\`Agent \${trace.agentId} spent \${trace.tokens} tokens\`);
  console.log(\`Tool executed: \${trace.toolName} in \${trace.latencyMs}ms\`);
  console.log(\`Deterministic Hash: \${trace.auditHash}\`);
});`,
      metrics: [
        { label: "Audit Hash Format", value: "SHA-256" },
        { label: "Token Visibility", value: "Per-Agent" },
        { label: "Compliance Status", value: "SOC2 Ready" },
      ],
    },
    {
      title: "Sovereign Cloud & On-Prem",
      subtitle: "Air-Gapped & VPC Peering",
      description: "Run within your own VPC on AWS Mumbai (ap-south-1), Azure Central India, GCP, or bare-metal GPU clusters with zero third-party telemetry.",
      codeSnippet: `// Sovereign Air-Gapped Config
export const kavyaConfig = {
  region: "ap-south-1-mumbai",
  telemetryMode: "local-only",
  kmsKeyId: "arn:aws:kms:ap-south-1:1234567890:key/kavya",
  zeroDataRetention: true
};`,
      metrics: [
        { label: "India Data Residency", value: "100% Local" },
        { label: "VPC Peering", value: "Sub-5ms" },
        { label: "External Leaks", value: "0 bytes" },
      ],
    },
  ];

  const featureCards = [
    {
      icon: GitBranch,
      title: "Autonomous DAG Routing",
      desc: "Dynamically schedules agent dependencies. Agents spawn specialized child workers and reconcile state asynchronously.",
      tag: "Engine",
    },
    {
      icon: Database,
      title: "Hybrid Memory & Vector Store",
      desc: "Combines dense vector search with explicit relational graphs so agents recall historical state with zero hallucinations.",
      tag: "Memory",
    },
    {
      icon: ShieldCheck,
      title: "Cryptographic Guardrails",
      desc: "Enforce deterministic constraints on agent tool execution. Prevents unauthorized API calls or data exfiltration.",
      tag: "Security",
    },
    {
      icon: Activity,
      title: "Real-Time Trace Telemetry",
      desc: "Full OpenTelemetry support with millisecond-level step waterfalls, token cost analysis, and replayable execution runs.",
      tag: "Observability",
    },
    {
      icon: Lock,
      title: "DPDP & SOC2 Compliance",
      desc: "Built from day one in Bengaluru adhering to the India Digital Personal Data Protection Act and global enterprise privacy standards.",
      tag: "Governance",
    },
    {
      icon: Code2,
      title: "WASM & Docker Sandboxes",
      desc: "Secure micro-environments where agents generate, compile, and execute code safely without touching host resources.",
      tag: "Execution",
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-4 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENGINEERED FOR MISSION CRITICAL DEPLOYMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            The Complete Stack for Enterprise Agentic AI
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Stop stitching together brittle prompt chains. Kavya Labs provides an industrial-grade
            substrate for self-organizing agent swarms.
          </p>
        </div>

        {/* Interactive Feature Deep Dive Tabbed View */}
        <div id="architecture" className="mb-20 glass-panel rounded-2xl overflow-hidden border border-white/10 p-6 lg:p-8">
          <div className="flex flex-wrap gap-2 pb-6 border-b border-white/10">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === idx
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
            {/* Left explanation */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                {tabs[activeTab].subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {tabs[activeTab].title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {tabs[activeTab].description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                {tabs[activeTab].metrics.map((m, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                    <div className="text-lg font-bold font-mono text-white">{m.value}</div>
                    <div className="text-[11px] text-gray-400">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right code preview */}
            <div className="lg:col-span-7">
              <div className="rounded-xl bg-[#090d16] border border-white/10 overflow-hidden shadow-2xl">
                <div className="bg-[#0e1422] px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
                    <span className="text-xs font-mono text-gray-400 ml-2">sdk-example.ts</span>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                    TypeScript
                  </span>
                </div>
                <pre className="p-5 text-xs sm:text-sm font-mono text-gray-300 overflow-x-auto leading-relaxed">
                  <code>{tabs[activeTab].codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Core Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/5 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                      {feat.tag}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-medium text-indigo-400 group-hover:text-indigo-300 gap-1">
                  <span>Explore specifications</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
