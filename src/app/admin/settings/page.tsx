import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SettingsClient from "./SettingsClient";

export const metadata: Metadata = {
  title: "Admin Settings | Kavya Labs Console",
  description: "Configure administrator preferences, telemetry polling, and security parameters.",
};

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);

  return (
    <SettingsClient
      user={{
        name: session?.user?.name,
        email: session?.user?.email,
        role: session?.user?.role,
      }}
    />
  );
}
