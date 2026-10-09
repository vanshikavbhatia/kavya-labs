"use client";

import { useState } from "react";
import { Calculator, TrendingUp, Clock, ShieldCheck } from "lucide-react";

export default function RoiCalculator() {
  const [teamSize, setTeamSize] = useState<number>(25);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(14);
  const [hourlyCost, setHourlyCost] = useState<number>(65); // USD equivalent / standard enterprise rate

  // Calculations
  const totalWeeklyHours = teamSize * hoursPerWeek;
  const automatedPercentage = 0.68; // 68% automated
  const weeklyHoursSaved = Math.round(totalWeeklyHours * automatedPercentage);
  const annualHoursSaved = weeklyHoursSaved * 50;
  const annualDollarSavings = Math.round(annualHoursSaved * hourlyCost);
  const roiMultiplier = "4.6x";

  return (
    <section id="calculator" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-4 border border-indigo-500/20">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE VALUE CALCULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Calculate Your Autonomous Efficiency ROI
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            See how orchestrating workflows with Kavya Labs reduces engineering toil and accelerates time-to-delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          {/* Sliders on Left */}
          <div className="lg:col-span-7 space-y-7">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-200">
                  Engineering / Operations Team Size
                </label>
                <span className="text-base font-bold font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                  {teamSize} engineers
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="250"
                step="5"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[11px] text-gray-500 mt-1 font-mono">
                <span>5</span>
                <span>100</span>
                <span>250+</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-200">
                  Manual Pipeline & Ops Hours / Week / Person
                </label>
                <span className="text-base font-bold font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                  {hoursPerWeek} hrs / wk
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="30"
                step="1"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[11px] text-gray-500 mt-1 font-mono">
                <span>4 hrs</span>
                <span>15 hrs</span>
                <span>30 hrs</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-200">
                  Blended Hourly Rate ($)
                </label>
                <span className="text-base font-bold font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                  ${hourlyCost}/hr
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="150"
                step="5"
                value={hourlyCost}
                onChange={(e) => setHourlyCost(Number(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[11px] text-gray-500 mt-1 font-mono">
                <span>$30/hr</span>
                <span>$80/hr</span>
                <span>$150/hr</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-indigo-200/90 leading-relaxed">
                Benchmark verified across 40+ enterprise deployments in fintech, healthtech, and cloud infra pipelines.
              </p>
            </div>
          </div>

          {/* Results Card on Right */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#131b2e] to-[#0d1322] p-6 sm:p-8 rounded-2xl border border-indigo-500/30 flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                Estimated Enterprise Impact
              </span>

              <div className="mt-4 mb-6">
                <div className="text-xs text-gray-400 mb-1">Projected Annual Savings</div>
                <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-400 tracking-tight">
                  ${annualDollarSavings.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  ~ ₹{(annualDollarSavings * 84).toLocaleString()} INR equivalent
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    <span>Annual Engineering Hours Saved</span>
                  </span>
                  <span className="font-mono font-bold text-white">
                    {annualHoursSaved.toLocaleString()} hrs
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-indigo-400" />
                    <span>Calculated Productivity Multiplier</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-400">
                    {roiMultiplier}
                  </span>
                </div>
              </div>
            </div>

            <a
              href="#demo"
              className="mt-8 w-full py-3 px-4 rounded-xl text-center text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/30 block"
            >
              Request Custom Audit Model
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
