import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { calculateAnalytics } from "@/lib/userStore";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "Admin") {
    return NextResponse.json(
      { error: "Forbidden: Administrator privileges required." },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(req.url);
  const timeframe = (searchParams.get("timeframe") as "7d" | "30d" | "90d" | "all") || "30d";

  const analytics = calculateAnalytics(timeframe);
  return NextResponse.json({ analytics });
}
