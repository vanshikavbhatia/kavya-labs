import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kavya Labs | Autonomous Enterprise AI Agent Swarms",
  description:
    "Engineered in Bengaluru for global enterprises. Kavya Labs orchestrates secure, high-concurrency autonomous AI agents to automate complex multi-step workflows with sub-second latency.",
  keywords: [
    "Kavya Labs",
    "Bengaluru AI Startup",
    "AI Agents",
    "Autonomous Swarms",
    "Enterprise AI",
    "Rohan Mehta",
    "LLM Orchestration",
  ],
  authors: [{ name: "Kavya Labs Engineering" }],
  openGraph: {
    title: "Kavya Labs | Autonomous Enterprise AI Agent Swarms",
    description:
      "Deploy, orchestrate, and observe autonomous multi-agent systems with bank-grade security and sub-second latency.",
    url: "https://kavya-labs.vercel.app",
    siteName: "Kavya Labs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kavya Labs | Enterprise AI Agents",
    description: "Autonomous AI workforce engineered in Bengaluru.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#080b11] text-gray-100 min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200`}
      >
        {children}
      </body>
    </html>
  );
}
