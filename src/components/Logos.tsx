export default function Logos() {
  const companies = [
    { name: "FinPulse Global", city: "Bengaluru", metric: "₹120M reconciled/day" },
    { name: "RazorFlow Cloud", city: "Bengaluru", metric: "4.2M agent events/mo" },
    { name: "NexaScale AI", city: "San Francisco", metric: "35% faster deploys" },
    { name: "IndicHealth Systems", city: "Hyderabad", metric: "HIPAA & DPDP verified" },
    { name: "OmniLedger Labs", city: "Singapore", metric: "Sub-50ms audit mesh" },
    { name: "VectorPay Fintech", city: "Mumbai", metric: "Zero chargeback errors" },
  ];

  return (
    <section className="py-12 border-y border-white/5 bg-[#090d16]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-widest text-gray-500 font-mono mb-8">
          Trusted by high-growth engineering & AI infrastructure teams
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors text-center group"
            >
              <div className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
                {company.name}
              </div>
              <div className="text-[11px] text-indigo-400/80 font-mono mt-0.5">
                {company.city}
              </div>
              <div className="text-[10px] text-gray-500 mt-1">
                {company.metric}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
