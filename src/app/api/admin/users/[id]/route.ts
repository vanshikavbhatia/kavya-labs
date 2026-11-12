import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateUser, deleteUser, getUserById, toggleSuspendUser } from "@/lib/userStore";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "Admin") {
    return NextResponse.json(
      { error: "Forbidden: Administrator privileges required." },
      { status: 403 }
    );
  }

  const { id } = params;
  const existing = getUserById(id);

  if (!existing) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  try {
    const body = await req.json();

    // Check if it's a toggle-suspend action
    if (body.action === "toggle-suspend") {
      const res = toggleSuspendUser(id);
      if (!res.success) {
        return NextResponse.json({ error: res.error }, { status: 400 });
      }
      return NextResponse.json({ success: true, user: res.user });
    }

    // Otherwise standard update
    const { name, email, role, status, department } = body;
    const updates: Parameters<typeof updateUser>[1] = {};

    if (name) {
      if (typeof name !== "string" || name.trim().length < 2) {
        return NextResponse.json({ error: "Name must be at least 2 characters." }, { status: 400 });
      }
      updates.name = name.trim();
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
      }
      updates.email = email.trim();
    }

    if (role) {
      if (!["Admin", "User"].includes(role)) {
        return NextResponse.json({ error: "Invalid role specified." }, { status: 400 });
      }
      updates.role = role;
    }

    if (status) {
      if (!["Active", "Inactive", "Suspended"].includes(status)) {
        return NextResponse.json({ error: "Invalid status specified." }, { status: 400 });
      }
      updates.status = status;
    }

    if (department !== undefined) {
      updates.department = department.trim();
    }

    const result = updateUser(id, updates);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, user: result.user });
  } catch {
    return NextResponse.json({ error: "Malformed update payload." }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "Admin") {
    return NextResponse.json(
      { error: "Forbidden: Administrator privileges required." },
      { status: 403 }
    );
  }

  const { id } = params;
  const currentAdminEmail = session.user?.email || undefined;

  const result = deleteUser(id, currentAdminEmail);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: "User deleted successfully." });
}
