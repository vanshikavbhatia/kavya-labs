import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllUsers, addUser } from "@/lib/userStore";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "Admin") {
    return NextResponse.json(
      { error: "Forbidden: Administrator privileges required." },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLowerCase().trim() || "";
  const roleFilter = searchParams.get("role") || "All";
  const statusFilter = searchParams.get("status") || "All";

  let users = getAllUsers();

  if (search) {
    users = users.filter(
      (u) =>
        u.name.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search) ||
        u.id.toLowerCase().includes(search)
    );
  }

  if (roleFilter !== "All") {
    users = users.filter((u) => u.role === roleFilter);
  }

  if (statusFilter !== "All") {
    users = users.filter((u) => u.status === statusFilter);
  }

  return NextResponse.json({ users, total: users.length });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "Admin") {
    return NextResponse.json(
      { error: "Forbidden: Administrator privileges required." },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const { name, email, role, status, department } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Full Name is required and must be at least 2 characters." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!role || !["Admin", "User"].includes(role)) {
      return NextResponse.json(
        { error: "Role must be either 'Admin' or 'User'." },
        { status: 400 }
      );
    }

    if (!status || !["Active", "Inactive", "Suspended"].includes(status)) {
      return NextResponse.json(
        { error: "Status must be 'Active', 'Inactive', or 'Suspended'." },
        { status: 400 }
      );
    }

    const result = addUser({
      name: name.trim(),
      email: email.trim(),
      role,
      status,
      department: department?.trim() || "Enterprise Swarm",
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }

    return NextResponse.json({ success: true, user: result.user }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Malformed request payload." },
      { status: 400 }
    );
  }
}
