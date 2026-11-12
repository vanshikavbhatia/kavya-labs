# Kavya Labs — Autonomous Enterprise AI Agent Swarms

> **Engineered in Bengaluru for Global Enterprises**  
> Founder: **Rohan Mehta** · Location: **Koramangala, Bengaluru, Karnataka, India**

![Kavya Labs Status](https://img.shields.io/badge/Status-Week%203%20Shipped-success?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-14%20App%20Router-black?style=flat-square&logo=next.js)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-v4.24-purple?style=flat-square)
![Recharts](https://img.shields.io/badge/Recharts-v3.10-indigo?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-Dark%20Obsidian-38bdf8?style=flat-square&logo=tailwindcss)
![Compliance](https://img.shields.io/badge/Compliance-DPDP%20India%20%7C%20SOC2-emerald?style=flat-square)

---

## 🚀 3-Week Engineering Roadmap

| Week | Deliverable | Status | Details |
| :--- | :--- | :---: | :--- |
| **Week 1** | **Landing Page** | **✅ Shipped** | Hero, live agent swarm simulator, architecture explorer, ROI calculator, social proof, pricing, FAQ, comprehensive footer |
| **Week 2** | **User Authentication** | **✅ Shipped** | NextAuth.js authentication, server sessions, pre-configured demo account, Google OAuth ready, protected `/dashboard` & `/profile` routes, interactive dynamic navbar |
| **Week 3** | **Admin Dashboard & Analytics** | **✅ Shipped** | Role-Based Access Control (RBAC), Admin Demo account, User Management CRUD (`/admin/users`), Telemetry Analytics (`/admin/analytics`), and System Settings (`/admin/settings`) |

---

## 🛡️ Week 3 Admin Dashboard & RBAC Highlights

### 1. Separate Demonstration Accounts (Zero API Keys Required)
The login portal provides two dedicated one-click demonstration options:

| Account Type | Name | Email | Role | Accessible Routes |
| :--- | :--- | :--- | :---: | :--- |
| **Admin Demo** | Kavya Labs Admin | `admin@kavyalabs.com` | `Admin` | `/admin`, `/admin/users`, `/admin/analytics`, `/admin/settings`, `/dashboard`, `/profile` |
| **User Demo** | Kavya Labs Demo User | `demo@kavyalabs.com` | `User` | `/dashboard`, `/profile` (Accessing `/admin` is redirected with an access-denied alert) |

### 2. Server-Enforced Role-Based Access Control (RBAC)
- **Middleware Guard**: Next.js Edge `middleware.ts` intercepts requests to `/admin/:path*`. Non-administrators are redirected to `/dashboard?error=unauthorized_admin_access`. Unauthenticated users are redirected to `/login?callbackUrl=...`.
- **Server Component Defense**: Direct `getServerSession(authOptions)` validation inside `/admin/layout.tsx`.
- **Protected API Endpoints**: All `/api/admin/*` endpoints strictly verify that `session.user.role === "Admin"`, returning `403 Forbidden` for standard users.

### 3. Comprehensive User Management (`/admin/users`)
- **Interactive User Table**: Lists User ID, Name, Email, Role badges, Status badges (Active, Suspended, Inactive), Date Joined, Last Active, and action controls.
- **Dynamic Search**: Instant client-side search across Name, Email, and User ID.
- **Multi-Facet Filtering**: Filter by Role (*All, Admin, User*) and Account Status (*All, Active, Suspended, Inactive*).
- **Onboard User (Add)**: Modal dialog with full validation (email format, minimum name length, duplicate email prevention).
- **Edit User**: Modify Name, Email, Role, Status, and Department.
- **Suspend & Reactivate**: One-click status toggling. Suspended accounts are immediately locked out of authentication.
- **Safe Account Deletion**: Confirmation modal prevents accidental deletion. Self-deletion of the active administrator and primary system admin accounts is forbidden.

### 4. Telemetry & Analytics Dashboard (`/admin/analytics`)
- **Key Metric Cards**: Total Registered Users, New Signups (timeframe window), Active Accounts rate, Suspended Accounts, and Administrator count.
- **Visual Analytics Powered by Recharts**:
  1. *User Growth Curve*: Line chart with Cartesian grid and interactive tooltips.
  2. *Signup Activity*: Bar chart showing volume of registrations per tracking period.
  3. *Role Distribution*: Donut chart illustrating Admins vs Normal Users.
  4. *Account Status Ratio*: Pie chart breaking down Active, Suspended, and Inactive users.
- **Dynamic Date Filters**: Interactive filters (*Last 7 Days*, *Last 30 Days*, *Last 90 Days*, *All Time*) recalculate data points in real-time.

### 5. System Settings (`/admin/settings`)
- Verified Administrator Profile specs (Display Name, Email, RBAC Role, Bengaluru HQ Org).
- UI density toggle (*Comfortable* vs *Compact*).
- Telemetry auto-refresh interval selector (*Manual*, *15s*, *30s*, *60s*).
- Session security architecture summary (AES-256-GCM, HttpOnly, SameSite=Lax).

---

## 🗄️ Demo Data Layer & Storage Architecture

- **In-Memory Store with Storage Adapter**: Seeded initial dataset of 12 enterprise accounts across Bengaluru startups (Zerodha, Swiggy, Cred, Razorpay, Flipkart, Ola, Zomato, Infosys).
- **Stateful Singleton**: Attached to `globalThis.__kavya_users_store` to persist in-memory additions, edits, suspensions, and deletions across requests during the active Node process.
- **Persistence Limitation**: Demo modifications exist in the running server process memory and will reset upon application cold restarts or serverless function redeployments. For permanent production storage, the adapter can be connected to PostgreSQL / Prisma without changing UI logic.

---

## 🔐 Week 2 Authentication Highlights

1. **NextAuth.js v4 App Router Integration**: Server-managed signed JWT cookies.
2. **Google OAuth Ready**: Gracefully disabled with setup guidance when `GOOGLE_CLIENT_ID` is omitted; activates automatically when credentials are provided.
3. **Protected User Portal**: `/dashboard` user console and `/profile` identity view.
4. **Dynamic Responsive Navbar**: Context-aware navigation showing "Sign In" when logged out, and user profile avatar, name, Dashboard, and Admin Console links when authenticated.

---

## ✨ Features Shipped in Week 1

1. **Modern Responsive Navbar**: Kavya Labs branding with BLR AI badge and mobile drawer.
2. **High-Impact Hero Section**: Quick-copy CLI installer (`npm create @kavya-labs/agent@latest`).
3. **Interactive Live Agent Swarm Simulator**: Real-time simulated execution step waterfalls with cryptographic validation hashes.
4. **Enterprise Trust Badges & Social Proof**: Verified enterprise testimonials and Founder's Conviction letter from Rohan Mehta.
5. **Architecture Explorer**: Bento grid and interactive tabbed DAG consensus code viewer.
6. **ROI & Savings Calculator**: Interactive sliders computing productivity gains and dollar savings.
7. **Tiered Pricing**: Monthly and Annual pricing tiers with 20% discount toggle.
8. **Enterprise FAQ & Footer**: Koramangala, Bengaluru headquarters address, and Mumbai region status.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Authentication**: [NextAuth.js v4](https://next-auth.js.org/) (JWT Strategy, Server-Side RBAC)
- **Charts**: [Recharts](https://recharts.org/) (Responsive SVG line, bar, and donut charts)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom obsidian glassmorphism)
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

# Optional: Google OAuth (Demo mode functions out-of-the-box without these)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```
