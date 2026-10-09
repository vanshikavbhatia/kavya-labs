import { 
  PlugZap, 
  Workflow, 
  Rocket, 
  CheckCircle2
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: PlugZap,
      title: "Connect Enterprise Tools & Schemas",
      description: "Plug in your existing REST, GraphQL, PostgreSQL, Snowflake, or internal microservices in minutes with out-of-the-box MCP (Model Context Protocol) connectors.",
      badge: "Zero Data Re-indexing",
    },
    {
      step: "02",
      icon: Workflow,
      title: "Configure Agent Roles & Policies",
      description: "Assign autonomous objectives, fallback guardrails, and cryptographic approvals to your agent swarms using intuitive YAML or our visual orchestrator.",
      badge: "Deterministic Consensus",
    },
    {
      step: "03",
      icon: Rocket,
      title: "Deploy with Sub-Second Latency",
      description: "Ship agent endpoints directly into production with automatic load balancing, full OpenTelemetry tracing, and automated human-in-the-loop review.",
      badge: "Instant API Endpoints",
    },
  ];

  return (
    <section className="py-20 relative bg-[#090d16]/40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
            Seamless Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
            From Zero to Production Swarms in 3 Steps
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            No complex infrastructure management. Kavya Labs handles agent discovery, state reconciliation, and fault tolerance under the hood.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative glass-panel p-8 rounded-2xl border border-white/5 flex flex-col justify-between group hover:border-indigo-500/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-mono font-black text-indigo-400/40 group-hover:text-indigo-400 transition-colors">
                      {item.step}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {item.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Production Ready</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
