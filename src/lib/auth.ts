import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getUserByEmail } from "./userStore";

export const isGoogleConfigured = Boolean(
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
);

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "demo-credentials",
      name: "Demo Account",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "demo@kavyalabs.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();

        // 1. Admin Demo Authentication (Role: Admin)
        if (email === "admin@kavyalabs.com") {
          return {
            id: "usr_kavya_adm_001",
            name: "Kavya Labs Admin",
            email: "admin@kavyalabs.com",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
            role: "Admin",
            provider: "Admin Demo Account",
          };
        }

        // 2. Normal User Demo Authentication (Role: User)
        if (!email || email === "demo@kavyalabs.com") {
          return {
            id: "usr_kavya_usr_001",
            name: "Kavya Labs Demo User",
            email: "demo@kavyalabs.com",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
            role: "User",
            provider: "Demo Account",
          };
        }

        // 3. Dynamic Registered Users from User Store
        const user = getUserByEmail(email);
        if (user) {
          if (user.status === "Suspended") {
            throw new Error("ACCOUNT_SUSPENDED: This account is suspended. Contact administrator.");
          }
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
            role: user.role,
            provider: "Demo Credentials",
          };
        }

        return null;
      },
    }),
    ...(isGoogleConfigured
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          }),
        ]
      : []),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days persistent session
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "User";
        token.provider = account?.provider === "google" ? "Google OAuth" : ((user as { provider?: string }).provider || "Demo Account");
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) || "User";
        session.user.provider = token.provider as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret:
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "kavya-labs-secure-demo-secret-salt-2026-auth",
};
