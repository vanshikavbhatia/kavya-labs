export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User";
  status: "Active" | "Inactive" | "Suspended";
  dateJoined: string; // ISO date string YYYY-MM-DD
  lastActive: string;
  avatar?: string;
  department?: string;
}

export const INITIAL_USERS: UserRecord[] = [
  {
    id: "usr_kavya_adm_001",
    name: "Kavya Labs Admin",
    email: "admin@kavyalabs.com",
    role: "Admin",
    status: "Active",
    dateJoined: "2026-08-01",
    lastActive: "Just now",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    department: "System Operations",
  },
  {
    id: "usr_kavya_adm_002",
    name: "Rohan Mehta",
    email: "rohan.mehta@kavyalabs.com",
    role: "Admin",
    status: "Active",
    dateJoined: "2026-07-15",
    lastActive: "15m ago",
    department: "Founding Team",
  },
  {
    id: "usr_kavya_usr_001",
    name: "Kavya Labs Demo User",
    email: "demo@kavyalabs.com",
    role: "User",
    status: "Active",
    dateJoined: "2026-09-10",
    lastActive: "1h ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    department: "Swarm Architecture",
  },
  {
    id: "usr_kavya_usr_002",
    name: "Priya Sharma",
    email: "priya.sharma@zerodha-fintech.in",
    role: "User",
    status: "Active",
    dateJoined: "2026-09-22",
    lastActive: "3h ago",
    department: "Quantitative Audit",
  },
  {
    id: "usr_kavya_usr_003",
    name: "Aravind Nair",
    email: "aravind.n@swiggy-labs.com",
    role: "User",
    status: "Active",
    dateJoined: "2026-10-01",
    lastActive: "Yesterday",
    department: "Logistics Optimization",
  },
  {
    id: "usr_kavya_usr_004",
    name: "Ananya Deshmukh",
    email: "ananya.deshmukh@hdfcbank.com",
    role: "User",
    status: "Active",
    dateJoined: "2026-10-14",
    lastActive: "2d ago",
    department: "Banking Compliance",
  },
  {
    id: "usr_kavya_usr_005",
    name: "Vikram Aditya",
    email: "vikram.aditya@cred.club",
    role: "User",
    status: "Suspended",
    dateJoined: "2026-08-20",
    lastActive: "2 weeks ago",
    department: "Risk Analytics",
  },
  {
    id: "usr_kavya_usr_006",
    name: "Meera Krishnan",
    email: "meera.krishnan@razorpay.com",
    role: "User",
    status: "Active",
    dateJoined: "2026-10-28",
    lastActive: "5h ago",
    department: "Payment Routing",
  },
  {
    id: "usr_kavya_usr_007",
    name: "Karthik Rajan",
    email: "karthik.rajan@flipkart.com",
    role: "User",
    status: "Inactive",
    dateJoined: "2026-09-05",
    lastActive: "1 month ago",
    department: "E-Commerce Pipeline",
  },
  {
    id: "usr_kavya_usr_008",
    name: "Sneha Patel",
    email: "sneha.patel@ola-electric.com",
    role: "User",
    status: "Active",
    dateJoined: "2026-11-02",
    lastActive: "Just now",
    department: "Telemetry Intelligence",
  },
  {
    id: "usr_kavya_usr_009",
    name: "Rahul Verma",
    email: "rahul.verma@zomato.in",
    role: "User",
    status: "Active",
    dateJoined: "2026-11-05",
    lastActive: "4h ago",
    department: "Order Dispatch Swarm",
  },
  {
    id: "usr_kavya_usr_010",
    name: "Neha Gupta",
    email: "neha.gupta@infosys.com",
    role: "User",
    status: "Suspended",
    dateJoined: "2026-09-18",
    lastActive: "3 weeks ago",
    department: "Enterprise Consulting",
  },
];

// In-memory singleton store with globalThis binding to maintain state across hot reloads in Node
declare global {
  // eslint-disable-next-line no-var
  var __kavya_users_store: UserRecord[] | undefined;
}

if (!globalThis.__kavya_users_store) {
  globalThis.__kavya_users_store = [...INITIAL_USERS];
}

export function getAllUsers(): UserRecord[] {
  return globalThis.__kavya_users_store || INITIAL_USERS;
}

export function getUserById(id: string): UserRecord | undefined {
  return getAllUsers().find((u) => u.id === id);
}

export function getUserByEmail(email: string): UserRecord | undefined {
  return getAllUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function addUser(userData: {
  name: string;
  email: string;
  role: "Admin" | "User";
  status: "Active" | "Inactive" | "Suspended";
  department?: string;
}): { success: boolean; user?: UserRecord; error?: string } {
  const users = getAllUsers();
  const normalizedEmail = userData.email.trim().toLowerCase();

  // Validate duplicate email
  if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
    return { success: false, error: "An account with this email address already exists." };
  }

  const now = new Date();
  const dateJoined = now.toISOString().split("T")[0];

  const newUser: UserRecord = {
    id: `usr_kavya_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`,
    name: userData.name.trim(),
    email: normalizedEmail,
    role: userData.role,
    status: userData.status,
    dateJoined,
    lastActive: "Just now",
    department: userData.department || "Enterprise Swarm",
  };

  users.unshift(newUser);
  return { success: true, user: newUser };
}

export function updateUser(
  id: string,
  updates: Partial<Omit<UserRecord, "id" | "dateJoined">>
): { success: boolean; user?: UserRecord; error?: string } {
  const users = getAllUsers();
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return { success: false, error: "User not found." };
  }

  // If email is changing, verify no collision
  if (updates.email) {
    const normalizedEmail = updates.email.trim().toLowerCase();
    const existing = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.id !== id
    );
    if (existing) {
      return { success: false, error: "Another account already uses this email address." };
    }
    updates.email = normalizedEmail;
  }

  const updatedUser: UserRecord = {
    ...users[index],
    ...updates,
  };

  users[index] = updatedUser;
  return { success: true, user: updatedUser };
}

export function deleteUser(
  id: string,
  currentAdminEmail?: string
): { success: boolean; error?: string } {
  const users = getAllUsers();
  const userToDelete = users.find((u) => u.id === id);

  if (!userToDelete) {
    return { success: false, error: "User not found." };
  }

  // Prevent admin from deleting their own account or primary system accounts
  if (
    currentAdminEmail &&
    userToDelete.email.toLowerCase() === currentAdminEmail.toLowerCase()
  ) {
    return { success: false, error: "Security restriction: You cannot delete your own active administrator account." };
  }

  if (userToDelete.email.toLowerCase() === "admin@kavyalabs.com") {
    return { success: false, error: "Protected account: Primary system administrator cannot be deleted." };
  }

  globalThis.__kavya_users_store = users.filter((u) => u.id !== id);
  return { success: true };
}

export function toggleSuspendUser(id: string): { success: boolean; user?: UserRecord; error?: string } {
  const users = getAllUsers();
  const user = users.find((u) => u.id === id);

  if (!user) {
    return { success: false, error: "User not found." };
  }

  if (user.email.toLowerCase() === "admin@kavyalabs.com") {
    return { success: false, error: "Protected account: Primary administrator cannot be suspended." };
  }

  const newStatus: "Active" | "Suspended" = user.status === "Suspended" ? "Active" : "Suspended";
  return updateUser(id, { status: newStatus });
}

export interface AnalyticsData {
  timeframe: "7d" | "30d" | "90d" | "all";
  totalUsers: number;
  activeUsers: number;
  suspendedUsers: number;
  inactiveUsers: number;
  adminCount: number;
  normalUserCount: number;
  newRegistrations: number;
  growthSeries: { date: string; users: number; newUsers: number }[];
  roleDistribution: { name: string; value: number; color: string }[];
  statusDistribution: { name: string; value: number; color: string }[];
  signupActivity: { period: string; signups: number }[];
}

export function calculateAnalytics(timeframe: "7d" | "30d" | "90d" | "all" = "30d"): AnalyticsData {
  const users = getAllUsers();

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const suspendedUsers = users.filter((u) => u.status === "Suspended").length;
  const inactiveUsers = users.filter((u) => u.status === "Inactive").length;
  const adminCount = users.filter((u) => u.role === "Admin").length;
  const normalUserCount = users.filter((u) => u.role === "User").length;

  // Filter window
  const now = new Date("2026-11-12"); // Local baseline date
  let days = 30;
  if (timeframe === "7d") days = 7;
  if (timeframe === "90d") days = 90;
  if (timeframe === "all") days = 365;

  const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  const newRegistrations = users.filter((u) => {
    const joined = new Date(u.dateJoined);
    return joined >= cutoffDate;
  }).length;

  // Build time series based on timeframe
  const growthSeries: { date: string; users: number; newUsers: number }[] = [];
  const intervals = timeframe === "7d" ? 7 : timeframe === "30d" ? 6 : timeframe === "90d" ? 6 : 8;
  const stepDays = Math.max(1, Math.floor(days / intervals));

  let runningCount = Math.max(1, totalUsers - newRegistrations);

  for (let i = intervals; i >= 0; i--) {
    const pointDate = new Date(now.getTime() - i * stepDays * 24 * 60 * 60 * 1000);
    const dateLabel = pointDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    
    // Calculate new registrations up to this point
    const addedInStep = Math.round(newRegistrations / intervals) || 1;
    runningCount = Math.min(totalUsers, runningCount + (i === 0 ? 0 : addedInStep));

    growthSeries.push({
      date: dateLabel,
      users: runningCount,
      newUsers: addedInStep,
    });
  }

  // Ensure last point is exactly totalUsers
  if (growthSeries.length > 0) {
    growthSeries[growthSeries.length - 1].users = totalUsers;
  }

  // Role distribution
  const roleDistribution = [
    { name: "Normal Users", value: normalUserCount, color: "#6366f1" },
    { name: "Administrators", value: adminCount, color: "#a855f7" },
  ];

  // Status distribution
  const statusDistribution = [
    { name: "Active", value: activeUsers, color: "#10b981" },
    { name: "Suspended", value: suspendedUsers, color: "#ef4444" },
    { name: "Inactive", value: inactiveUsers, color: "#64748b" },
  ];

  // Signup activity cohorts
  const signupActivity = growthSeries.map((g) => ({
    period: g.date,
    signups: g.newUsers,
  }));

  return {
    timeframe,
    totalUsers,
    activeUsers,
    suspendedUsers,
    inactiveUsers,
    adminCount,
    normalUserCount,
    newRegistrations,
    growthSeries,
    roleDistribution,
    statusDistribution,
    signupActivity,
  };
}
