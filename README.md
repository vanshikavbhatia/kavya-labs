# Kavya Labs — Autonomous Enterprise AI Agent Swarms

> **Engineered in Bengaluru for Global Enterprises**  
> Founder: **Rohan Mehta** · Location: **Koramangala, Bengaluru, Karnataka, India**

![Kavya Labs Status](https://img.shields.io/badge/Status-Week%202%20Shipped-success?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-14%20App%20Router-black?style=flat-square&logo=next.js)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-v4.24-purple?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-Dark%20Obsidian-38bdf8?style=flat-square&logo=tailwindcss)
![Compliance](https://img.shields.io/badge/Compliance-DPDP%20India%20%7C%20SOC2-emerald?style=flat-square)

---

## 🚀 3-Week Engineering Roadmap

| Week | Deliverable | Status | Details |
| :--- | :--- | :---: | :--- |
| **Week 1** | **Landing Page** | **✅ Shipped** | Hero, live agent simulator, architecture explorer, ROI calculator, social proof, pricing, FAQ, comprehensive footer |
| **Week 2** | **User Authentication** | **✅ Shipped** | NextAuth.js authentication, server sessions, pre-configured demo account, Google OAuth configuration, protected `/dashboard` and `/profile` routes, interactive dynamic navbar |
| **Week 3** | **Admin Dashboard** | ⏳ Scheduled | User management, agent step telemetry, token consumption & audit analytics |

---

## 🔐 Week 2 Authentication Highlights

### 1. Pre-Configured Demo Account (Zero API Keys Required)
For instant evaluation without needing Google Cloud OAuth setup:
- **Button**: One-click **Continue with Demo Account**
- **User Name**: `Kavya Labs Demo User`
- **Email**: `demo@kavyalabs.com`
- **Role**: `Lead Swarm Architect`
- **Session Duration**: 30-Day persistent server-side JWT session
- **Manual Credentials**: Pre-filled form option available

### 2. Google OAuth Integration Ready
- Configured with environment variables `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `AUTH_SECRET`.
- When credentials are not provided, Google login gracefully displays a setup requirement notice while Demo authentication remains 100% operational.
- When credentials are provided in `.env.local`, Google OAuth activates automatically.

### 3. Server-Managed Sessions & Route Protection
- Defense-in-depth security: Next.js edge `middleware.ts` + server-side `getServerSession(authOptions)` validation.
- Unauthenticated requests to `/dashboard` or `/profile` redirect to `/login?callbackUrl=...`.
- Client and server components share session context via `<AuthProvider>`.

### 4. Protected Routes & Pages
- **`/login`**: Enterprise login portal with Demo sign-in, Google OAuth button, and credentials fallback.
- **`/dashboard`**: Protected user console displaying welcome banner, user identity card, authentication method badge, active swarm status, and profile navigation.
- **`/profile`**: Protected user profile page with verified session indicators, user identity specs, token info, and security parameters.
- **Dynamic Navbar**: Displays "Sign In" when logged out, and authenticated user avatar, name, and interactive dropdown (Dashboard, Profile, Sign Out) when logged in.

---

## ✨ Features Shipped in Week 1

1. **Modern Responsive Navbar**:
   - Kavya Labs branding with BLR AI badge
   - Navigation anchors: Platform, Architecture, ROI Calculator, Pricing, FAQ
   - CTAs: Sign In & "Get Started"
   - Mobile responsive drawer menu

2. **High-Impact Hero Section**:
   - Quick-copy CLI installer: `npm create @kavya-labs/agent@latest`
   - Key enterprise metrics (28ms P99 latency, 99.98% zero-hallucination rate, 64% token reduction)

3. **Interactive Live Agent Swarm Simulator**:
   - Production scenarios (*Fintech Settlement Audit*, *Microservices Refactoring*, *Clinical Trial Protocol*)
   - Real-time simulated execution step waterfalls with cryptographic validation hashes

4. **Enterprise Trust Badges & Social Proof**:
   - Customer logos across Bengaluru, Singapore, and Silicon Valley
   - Verified testimonials from enterprise engineering leads

5. **Deep-Dive Architecture & Bento Grid**:
   - Tabbed architecture code viewer for DAG Consensus, Hybrid Context (RAG 2.0), Observability, and Sovereign VPC deployment

6. **Interactive ROI & Savings Calculator**:
   - Sliders for Team Size, Manual Hours, and Hourly Cost

7. **Transparent Tiered Pricing**:
   - Monthly / Annual toggle with 20% discount badge
   - Developer (Free), Team & Pro ($159/mo), Enterprise Sovereign (Custom)

8. **Enterprise FAQ & Early-Access Sandbox Form**:
   - Accordion FAQ addressing data residency in India, model agnosticism, and air-gapped VPCs

9. **Comprehensive Footer**:
   - Bengaluru headquarters address (Koramangala 4th Block, Bengaluru)
   - Live system status indicator for `ap-south-1 (Mumbai)`

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Authentication**: [NextAuth.js v4](https://next-auth.js.org/) (Server-managed JWT sessions)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Geist Sans & Geist Mono VF

---

## 📦 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/vanshikavbhatia/kavya-labs.git

# Navigate to project directory
cd kavya-labs

# Install dependencies
npm install

# Set up local environment
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Environment Variables Setup

Configure the following in `.env.local` (or in Vercel Project Settings):

```env
# Required for NextAuth
NEXTAUTH_URL=http://localhost:3000 # On Vercel: https://kavya-labs-mauve.vercel.app
NEXTAUTH_SECRET=your-random-32-character-secret-key-here
AUTH_SECRET=your-random-32-character-secret-key-here

# Optional: Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```
