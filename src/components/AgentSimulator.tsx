"use client";

import { useState } from "react";
import { 
  Terminal, 
  Play, 
  CheckCircle2, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Clock, 
  RefreshCw 
} from "lucide-react";

type Scenario = {
  id: string;
  name: string;
  task: string;
  orchestrator: string;
  agents: string[];
  duration: string;
  tokens: string;
  steps: {
    agent: string;
    action: string;
    status: "done" | "active" | "queued";
    detail: string;
  }[];
  result: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "fintech",
    name: "Fintech Settlement Audit",
    task: "Audit ₹42.8M multi-currency UPI & SWIFT ledger discrepancies across 3 banking APIs",
    orchestrator: "Kavya Swarm Alpha",
    agents: ["IngestAgent-v4", "AnomalyDetector", "ReconciliationModel", "ComplianceVerifier"],
    duration: "482ms",
    tokens: "3,840 tokens",
    steps: [
      {
        agent: "IngestAgent-v4",
        action: "Extracted 14,200 transactions across Razorpay, ICICI, and Stripe webhooks",
        status: "done",
        detail: "Validation hash: 0x9f4a...e12 · 0 duplicates",
      },
      {
        agent: "AnomalyDetector",
        action: "Identified 3 delayed currency conversion FX slippages (₹18,450 variance)",
        status: "done",
        detail: "Confidence score: 99.94% · Zero false positives",
      },
      {
        agent: "ReconciliationModel",
        action: "Generated auto-compensating ledger adjustment journal entries",
        status: "done",
        detail: "Double-entry integrity checked & verified",
      },
      {
        agent: "ComplianceVerifier",
        action: "Generated RBI audit-ready report with cryptographic timestamp",
        status: "done",
        detail: "Passed SOC2 Type II & RBI Cyber Security Guidelines",
      },
    ],
    result: "Audit completed successfully. 14,200 events verified in 482ms. Auto-adjustment signed.",
  },
  {
    id: "codebase",
    name: "Microservices Refactoring",
    task: "Analyze monolith payment orchestrator and generate optimized async Rust microservices",
    orchestrator: "Kavya DevMesh",
    agents: ["ASTParser", "DependencyMapper", "CodegenAgent", "SecurityFuzzer"],
    duration: "610ms",
    tokens: "7,120 tokens",
    steps: [
      {
        agent: "ASTParser",
        action: "Mapped 45,000 LOC Java Spring Boot service into semantic dependency graph",
        status: "done",
        detail: "Identified 14 decoupled domain boundaries",
      },
      {
        agent: "DependencyMapper",
        action: "Isolated stateful database transactions and async message queues",
        status: "done",
        detail: "Redis + Apache Kafka topology formulated",
      },
      {
        agent: "CodegenAgent",
        action: "Synthesized idiomatic Tokio/Axum Rust microservice with zero allocations",
        status: "done",
        detail: "4x throughput improvement expected",
      },
      {
        agent: "SecurityFuzzer",
        action: "Executed 10,000 synthetic memory and race condition fuzzing cycles",
        status: "done",
        detail: "0 memory leaks, 100% thread safety confirmed",
      },
    ],
    result: "Migration blueprint & test suite generated. Rust microservice compile check passed.",
  },
  {
    id: "healthcare",
    name: "Clinical Trial Protocol",
    task: "Cross-reference 1,200 oncology trial protocols against FDA & CDSCO clinical criteria",
    orchestrator: "Kavya BioAgent",
    agents: ["TrialExtractor", "GenomicIndexer", "ProtocolMatcher", "SafetyValidator"],
    duration: "340ms",
    tokens: "5,400 tokens",
    steps: [
      {
        agent: "TrialExtractor",
        action: "Parsed unstructured clinical PDFs and bio-marker trial tables",
        status: "done",
        detail: "99.2% entity extraction accuracy",
      },
      {
        agent: "GenomicIndexer",
        action: "Cross-indexed KRAS G12C and EGFR mutation patient eligibility parameters",
        status: "done",
        detail: "Vector distance threshold: 0.14 cos",
      },
      {
        agent: "ProtocolMatcher",
        action: "Filtered 3 candidate cohorts satisfying phase-3 inclusion guidelines",
        status: "done",
        detail: "Exclusion criteria zero-overlap confirmed",
      },
      {
        agent: "SafetyValidator",
        action: "Audited HIPAA and India DPDP compliance for anonymized records",
        status: "done",
        detail: "Fully anonymized cryptographic tokens minted",
      },
    ],
    result: "Protocol synthesis verified. Cohort matches compiled with 100% regulatory compliance.",
  },
];

export default function AgentSimulator() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>("fintech");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [visibleStepIndex, setVisibleStepIndex] = useState<number>(4);

  const scenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  const handleRunSimulation = () => {
    setIsRunning(true);
    setVisibleStepIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setVisibleStepIndex(step);
      if (step >= scenario.steps.length) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 450);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl glass-panel shadow-2xl shadow-indigo-950/40 overflow-hidden border border-white/10">
      {/* Top bar with scenario selector tabs */}
      <div className="bg-[#0b101b] border-b border-white/10 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>kavya-swarm-cli // live-runtime</span>
          </span>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveScenarioId(s.id);
                setVisibleStepIndex(4);
              }}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                activeScenarioId === s.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        <button
          onClick={handleRunSimulation}
          disabled={isRunning}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-md hover:bg-emerald-500/20 transition-all disabled:opacity-50"
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>Orchestrating...</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-emerald-400" />
              <span>Re-run Swarm</span>
            </>
          )}
        </button>
      </div>

      {/* Main Terminal Body */}
      <div className="p-5 font-mono text-xs sm:text-sm bg-[#090d16]/95">
        {/* Task Objective Header */}
        <div className="mb-4 pb-3 border-b border-white/5">
          <div className="text-gray-400 text-xs mb-1">
            <span className="text-indigo-400 font-semibold">$ kavya swarm --objective</span>
          </div>
          <p className="text-white font-sans text-sm sm:text-base font-medium">
            &ldquo;{scenario.task}&rdquo;
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-400">
            <span className="inline-flex items-center gap-1 text-gray-300">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>Engine: {scenario.orchestrator}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Latency: {scenario.duration}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-violet-400">
              <Zap className="w-3.5 h-3.5" />
              <span>{scenario.tokens}</span>
            </span>
          </div>
        </div>

        {/* Execution Pipeline Steps */}
        <div className="space-y-3 mb-4">
          {scenario.steps.map((step, idx) => {
            const isVisible = idx < visibleStepIndex;
            const isCurrent = idx === visibleStepIndex - 1 && isRunning;

            return (
              <div
                key={idx}
                className={`transition-all duration-300 p-2.5 rounded-lg border ${
                  isVisible
                    ? isCurrent
                      ? "bg-indigo-950/40 border-indigo-500/50 shadow-sm shadow-indigo-500/10"
                      : "bg-white/[0.02] border-white/5"
                    : "opacity-30 border-dashed border-white/5"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5">
                    {isVisible ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-gray-600 inline-block" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 font-mono">
                        @{step.agent}
                      </span>
                      <span className="text-gray-200 font-sans text-xs sm:text-sm">
                        {step.action}
                      </span>
                    </div>
                    {isVisible && (
                      <div className="text-[11px] text-gray-400 mt-1 pl-0.5 font-mono">
                        ↳ {step.detail}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Terminal Final Result Banner */}
        {visibleStepIndex >= scenario.steps.length && (
          <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-sans font-medium">{scenario.result}</span>
            </span>
            <span className="font-mono text-[10px] text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded">
              VERIFIED 100%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
