import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllUsers } from "@/lib/userStore";
import UsersManager from "./UsersManager";

export const metadata: Metadata = {
  title: "User Management | Kavya Labs Admin Console",
  description: "Manage enterprise user identities, roles, and platform permissions.",
};

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  const users = getAllUsers();

  return (
    <UsersManager
      initialUsers={users}
      currentAdminEmail={session?.user?.email || "admin@kavyalabs.com"}
    />
  );
}
