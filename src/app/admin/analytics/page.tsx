import { Metadata } from "next";
import { calculateAnalytics } from "@/lib/userStore";
import AnalyticsClient from "./AnalyticsClient";

export const metadata: Metadata = {
  title: "Platform Analytics | Kavya Labs Admin Console",
  description: "User cohort growth, status distribution, and multi-agent swarm telemetry.",
};

export default function AdminAnalyticsPage() {
  const analytics = calculateAnalytics("30d");

  return <AnalyticsClient initialData={analytics} />;
}
