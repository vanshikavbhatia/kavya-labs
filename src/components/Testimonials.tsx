import { Quote, Sparkles, Star } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      quote: "Kavya Labs transformed our reconciliation pipelines. What previously required 4 hours of fragile batch scripts now executes in 90 seconds with complete cryptographic auditability.",
      author: "Aditya Sharma",
      role: "VP Engineering",
      company: "FinPulse Global",
      city: "Bengaluru",
      avatar: "AS",
    },
    {
      quote: "The multi-agent DAG consensus is a game-changer. We've deployed 40+ production agents that handle customer intelligence and anomaly detection with zero human intervention.",
      author: "Pooja Deshmukh",
      role: "Head of AI Infrastructure",
      company: "RazorFlow Cloud",
      city: "Bengaluru",
      avatar: "PD",
    },
    {
      quote: "Sovereign deployment on AWS Mumbai with zero data retention allowed us to pass strict financial audits on day one. Kavya Labs is the most reliable enterprise agent substrate.",
      author: "Marcus Chen",
      role: "Principal Architect",
      company: "OmniLedger Labs",
      city: "Singapore",
      avatar: "MC",
    },
  ];

  return (
    <section className="py-24 relative bg-[#090d16]/70 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Founder's Letter Banner */}
        <div className="max-w-4xl mx-auto mb-20 p-8 sm:p-10 rounded-3xl glass-panel border border-indigo-500/30 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Quote className="w-32 h-32 text-indigo-400" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-semibold mb-4 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NOTE FROM OUR FOUNDER</span>
            </div>

            <blockquote className="text-lg sm:text-xl font-medium text-gray-200 leading-relaxed mb-6 italic">
              &ldquo;We founded Kavya Labs in Bengaluru with a singular engineering thesis: The future of enterprise software is not chat interfaces, but autonomous agent meshes that reason, execute code, and self-verify under rigorous SLAs. We build infrastructure that teams can stake their business on.&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white shadow-md text-base">
                RM
              </div>
              <div>
                <div className="font-bold text-white text-base">Rohan Mehta</div>
                <div className="text-xs text-indigo-400 font-mono">
                  Founder & CEO · Kavya Labs (Bengaluru)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Testimonials Grid */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Engineered For High-Stakes Production
          </h3>
          <p className="text-sm text-gray-400">
            What engineering leaders running Kavya Labs in production have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-indigo-500/30 transition-all"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-mono text-xs font-semibold text-white">
                  {item.avatar}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{item.author}</div>
                  <div className="text-[11px] text-gray-400">
                    {item.role}, <span className="text-indigo-400">{item.company}</span> ({item.city})
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
