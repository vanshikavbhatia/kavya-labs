import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin Console | Kavya Labs Autonomous AI",
  description: "Enterprise administration portal, user management, and agent swarm analytics.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login?callbackUrl=/admin");
  }

  // Server-Side Role-Based Access Control (RBAC)
  if (session.user.role !== "Admin") {
    redirect("/dashboard?error=unauthorized_admin_access");
  }

  return <AdminShell user={session.user}>{children}</AdminShell>;
}
