import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname;
    const token = req.nextauth.token;

    // RBAC: Protect /admin and all subpaths
    if (path.startsWith("/admin")) {
      // If authenticated as normal User, deny access and redirect to user dashboard
      if (token?.role !== "Admin") {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = "/dashboard";
        redirectUrl.searchParams.set("error", "unauthorized_admin_access");
        return NextResponse.redirect(redirectUrl);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Any matched route requires a valid session token
        if (!token) return false;
        return true;
      },
    },
    pages: {
      signIn: "/login",
    },
    secret:
      process.env.AUTH_SECRET ||
      process.env.NEXTAUTH_SECRET ||
      "kavya-labs-secure-demo-secret-salt-2026-auth",
  }
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/profile/:path*"],
};
