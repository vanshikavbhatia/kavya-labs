"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Which LLMs and foundation models can we connect with Kavya Labs?",
      answer: "Kavya Labs is completely model-agnostic. You can route agent requests across Claude 3.5 Sonnet, GPT-4o, Google Gemini 1.5 Pro, Llama 3.3 70B, Mistral Large, or private fine-tuned open-source models hosted in your own VPC with Ollama or vLLM.",
    },
    {
      question: "How does Kavya Labs ensure enterprise data sovereignty in India?",
      answer: "We support sovereign cloud deployments hosted in AWS Mumbai (ap-south-1), Azure Central India (Pune), and Google Cloud (Delhi/Mumbai). Enterprise tiers offer zero data retention, end-to-end KMS customer-managed encryption, and full compliance with the Digital Personal Data Protection (DPDP) Act 2023.",
    },
    {
      question: "How does Kavya Labs differ from basic prompt chains or open-source toy frameworks?",
      answer: "Most open-source agent frameworks suffer from infinite reasoning loops, brittle error handling, and high token costs. Kavya Labs provides an industrial substrate: deterministic Directed Acyclic Graph (DAG) scheduling, cryptographic state checkpoints, automated self-healing retry policies, and sandboxed code execution in sub-30ms.",
    },
    {
      question: "What are the requirements for Week 2 & Week 3 expansion on this platform?",
      answer: "Kavya Labs is architected with modern Next.js 14 App Router standards. Week 2 integrates NextAuth with Google OAuth authentication and session management. Week 3 introduces an enterprise Admin Dashboard with real-time user management, agent step telemetry, and token usage analytics.",
    },
    {
      question: "Can we run Kavya Labs inside air-gapped internal enterprise networks?",
      answer: "Yes. Our Enterprise Sovereign plan supports air-gapped Docker Compose and Kubernetes Helm chart deployments that operate without any outbound internet access, connecting directly to your internal VPC databases and local GPU nodes.",
    },
  ];

  return (
    <section id="faq" className="py-24 relative bg-[#090d16]/50 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/20">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Everything You Need To Know
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Got questions about architecture, compliance, or enterprise onboarding? We&apos;ve got answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-white/5 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-base sm:text-lg font-semibold text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-gray-400 transition-transform ${
                      isOpen ? "rotate-180 text-indigo-400 bg-indigo-500/10" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
