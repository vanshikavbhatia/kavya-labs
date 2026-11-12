import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  secret:
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "kavya-labs-secure-demo-secret-salt-2026-auth",
});

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
