"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { UserRecord } from "@/lib/userStore";
import {
  Users,
  Search,
  UserPlus,
  Edit2,
  Trash2,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  X,
  Shield,
  UserCheck,
} from "lucide-react";

interface UsersManagerProps {
  initialUsers: UserRecord[];
  currentAdminEmail: string;
}

export default function UsersManager({
  initialUsers,
  currentAdminEmail,
}: UsersManagerProps) {
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"All" | "Admin" | "User">("All");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive" | "Suspended"
  >("All");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [deletingUser, setDeletingUser] = useState<UserRecord | null>(null);

  // Form states
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    role: "User" as "Admin" | "User",
    status: "Active" as "Active" | "Inactive" | "Suspended",
    department: "Enterprise Swarm",
  });
  const [addError, setAddError] = useState<string | null>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  };

  // Filter and search dynamically
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q);

      const matchesRole = roleFilter === "All" || u.role === roleFilter;
      const matchesStatus = statusFilter === "All" || u.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  // Handler: Add User
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);

    if (!addForm.name.trim() || addForm.name.trim().length < 2) {
      setAddError("Full name must be at least 2 characters.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(addForm.email.trim())) {
      setAddError("Please enter a valid email address.");
      return;
    }

    try {
      setActionLoading(true);
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      });

      const data = await res.json();
      if (!res.ok) {
        setAddError(data.error || "Failed to create user.");
        setActionLoading(false);
        return;
      }

      setUsers([data.user, ...users]);
      setIsAddModalOpen(false);
      setAddForm({
        name: "",
        email: "",
        role: "User",
        status: "Active",
        department: "Enterprise Swarm",
      });
      showToast("success", `User "${data.user.name}" created successfully.`);
    } catch {
      setAddError("Network error while creating user.");
    } finally {
      setActionLoading(false);
    }
  };

  // Handler: Edit User
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setEditError(null);

    if (!editingUser.name.trim() || editingUser.name.trim().length < 2) {
      setEditError("Full name must be at least 2 characters.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editingUser.email.trim())) {
      setEditError("Please enter a valid email address.");
      return;
    }

    try {
      setActionLoading(true);
      const res = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editingUser.name,
          email: editingUser.email,
          role: editingUser.role,
          status: editingUser.status,
          department: editingUser.department,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setEditError(data.error || "Failed to update user.");
        setActionLoading(false);
        return;
      }

      setUsers(users.map((u) => (u.id === editingUser.id ? data.user : u)));
      setEditingUser(null);
      showToast("success", `User "${data.user.name}" updated successfully.`);
    } catch {
      setEditError("Network error while updating user.");
    } finally {
      setActionLoading(false);
    }
  };

  // Handler: Delete User
  const handleDeleteConfirm = async () => {
    if (!deletingUser) return;

    try {
      setActionLoading(true);
      const res = await fetch(`/api/admin/users/${deletingUser.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        showToast("error", data.error || "Failed to delete user.");
        setDeletingUser(null);
        setActionLoading(false);
        return;
      }

      setUsers(users.filter((u) => u.id !== deletingUser.id));
      showToast("success", `Account for "${deletingUser.name}" has been deleted.`);
      setDeletingUser(null);
    } catch {
      showToast("error", "Network error while deleting user.");
    } finally {
      setActionLoading(false);
    }
  };

  // Handler: Toggle Suspend
  const handleToggleSuspend = async (user: UserRecord) => {
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle-suspend" }),
      });

      const data = await res.json();
      if (!res.ok) {
        showToast("error", data.error || "Unable to modify status.");
        return;
      }

      setUsers(users.map((u) => (u.id === user.id ? data.user : u)));
      showToast(
        "success",
        `User "${user.name}" is now ${data.user.status}.`
      );
    } catch {
      showToast("error", "Network error while updating account status.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200 ${
            toast.type === "success"
              ? "bg-emerald-950 border border-emerald-500/40 text-emerald-200"
              : "bg-red-950 border border-red-500/40 text-red-200"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
          <span>{toast.text}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-400" />
            <span>User Management & Access Control</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            View, search, filter, onboard, and manage enterprise user identities and roles.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setAddError(null);
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 border border-purple-400/30 transition-all hover:scale-[1.02]"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New User</span>
        </button>
      </div>

      {/* Controls Card: Search + Role Filter + Status Filter */}
      <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Dynamic Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or user ID (e.g. usr_kavya_)..."
              className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Role Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs font-mono">
            {(["All", "Admin", "User"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1.5 rounded-lg transition-colors text-xs ${
                  roleFilter === r
                    ? "bg-purple-600 text-white font-semibold shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {r === "All" ? "All Roles" : r}
              </button>
            ))}
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs font-mono">
            {(["All", "Active", "Suspended", "Inactive"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg transition-colors text-xs ${
                  statusFilter === s
                    ? "bg-purple-600 text-white font-semibold shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {s === "All" ? "All Statuses" : s}
              </button>
            ))}
          </div>
        </div>

        {/* Results summary & Active filters */}
        <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/5 font-mono">
          <span>
            Showing <strong className="text-white">{filteredUsers.length}</strong> of{" "}
            <strong className="text-white">{users.length}</strong> total records
          </span>

          {(searchQuery || roleFilter !== "All" || statusFilter !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setRoleFilter("All");
                setStatusFilter("All");
              }}
              className="text-purple-400 hover:text-purple-300 underline font-sans text-xs"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#0f1422] border border-white/10 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-black/30 text-gray-400 font-mono border-b border-white/10 uppercase text-[11px] tracking-wider">
                <th className="py-3.5 px-4 sm:px-6 font-semibold">User ID & Name</th>
                <th className="py-3.5 px-4 font-semibold">Role</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Date Joined</th>
                <th className="py-3.5 px-4 font-semibold">Last Active</th>
                <th className="py-3.5 px-4 sm:px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <div className="max-w-xs mx-auto space-y-2">
                      <Users className="w-8 h-8 text-gray-600 mx-auto" />
                      <p className="text-sm font-semibold text-white">No users found</p>
                      <p className="text-xs text-gray-500">
                        No accounts match your current query. Try adjusting your search or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isCurrentAdmin =
                    currentAdminEmail.toLowerCase() === u.email.toLowerCase();
                  const isPrimaryAdmin = u.email.toLowerCase() === "admin@kavyalabs.com";

                  return (
                    <tr
                      key={u.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* Name & Avatar & ID */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-tr from-purple-900 to-indigo-900 border border-purple-400/30 flex items-center justify-center font-bold font-mono text-xs text-purple-200 shrink-0 shadow-sm">
                            {u.avatar ? (
                              <Image
                                src={u.avatar}
                                alt={u.name}
                                width={36}
                                height={36}
                                className="w-full h-full object-cover"
                                unoptimized
                              />
                            ) : (
                              <span>{u.name.charAt(0)}</span>
                            )}
                            {u.status === "Active" && (
                              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#0f1422]" />
                            )}
                          </div>
                          <div className="overflow-hidden">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-white truncate">{u.name}</span>
                              {isCurrentAdmin && (
                                <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[9px] font-mono border border-purple-500/30">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 text-[11px] font-mono">
                              <span className="truncate">{u.email}</span>
                              <span>·</span>
                              <span className="text-gray-500 text-[10px] truncate">{u.id}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold ${
                            u.role === "Admin"
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                              : "bg-white/5 text-gray-300 border border-white/10"
                          }`}
                        >
                          {u.role === "Admin" && <Shield className="w-3 h-3 text-purple-400" />}
                          {u.role}
                        </span>
                      </td>

                      {/* Account Status Badge */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                            u.status === "Active"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : u.status === "Suspended"
                              ? "bg-red-500/15 text-red-400 border border-red-500/30"
                              : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              u.status === "Active"
                                ? "bg-emerald-400"
                                : u.status === "Suspended"
                                ? "bg-red-400"
                                : "bg-gray-400"
                            }`}
                          />
                          {u.status}
                        </span>
                      </td>

                      {/* Date Joined */}
                      <td className="py-3.5 px-4 font-mono text-gray-400 text-[11px]">
                        {u.dateJoined}
                      </td>

                      {/* Last Active */}
                      <td className="py-3.5 px-4 font-mono text-gray-400 text-[11px]">
                        {u.lastActive}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Suspend / Activate Toggle */}
                          {!isPrimaryAdmin && (
                            <button
                              type="button"
                              onClick={() => handleToggleSuspend(u)}
                              title={u.status === "Suspended" ? "Activate Account" : "Suspend Account"}
                              className={`p-1.5 rounded-lg border transition-colors ${
                                u.status === "Suspended"
                                  ? "text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/30"
                                  : "text-amber-400 hover:bg-amber-500/10 border-amber-500/20"
                              }`}
                            >
                              {u.status === "Suspended" ? (
                                <UserCheck className="w-3.5 h-3.5" />
                              ) : (
                                <ShieldAlert className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}

                          {/* Edit Button */}
                          <button
                            type="button"
                            onClick={() => {
                              setEditError(null);
                              setEditingUser({ ...u });
                            }}
                            title="Edit user details"
                            className="p-1.5 rounded-lg text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Button */}
                          {!isCurrentAdmin && !isPrimaryAdmin && (
                            <button
                              type="button"
                              onClick={() => setDeletingUser(u)}
                              title="Delete user record"
                              className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL 1: ADD USER --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0f1422] border border-white/15 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-purple-400" />
                Add New Enterprise User
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {addError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{addError}</span>
              </div>
            )}

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  placeholder="e.g. Vikram Malhotra"
                  required
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  value={addForm.email}
                  onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                  placeholder="name@enterprise.com"
                  required
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Role</label>
                  <select
                    value={addForm.role}
                    onChange={(e) =>
                      setAddForm({ ...addForm, role: e.target.value as "Admin" | "User" })
                    }
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 font-mono"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1">Account Status</label>
                  <select
                    value={addForm.status}
                    onChange={(e) =>
                      setAddForm({
                        ...addForm,
                        status: e.target.value as "Active" | "Inactive" | "Suspended",
                      })
                    }
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 font-mono"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">Department</label>
                <input
                  type="text"
                  value={addForm.department}
                  onChange={(e) => setAddForm({ ...addForm, department: e.target.value })}
                  placeholder="e.g. Swarm Architecture"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors disabled:opacity-50"
                >
                  {actionLoading ? "Creating..." : "Create User Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: EDIT USER --- */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0f1422] border border-white/15 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-purple-400" />
                Edit User Record
              </h3>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {editError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{editError}</span>
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-medium mb-1">User ID (Permanent)</label>
                <input
                  type="text"
                  disabled
                  value={editingUser.id}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/5 rounded-xl text-gray-400 font-mono cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        role: e.target.value as "Admin" | "User",
                      })
                    }
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 font-mono"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1">Status</label>
                  <select
                    value={editingUser.status}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        status: e.target.value as "Active" | "Inactive" | "Suspended",
                      })
                    }
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 font-mono"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">Department</label>
                <input
                  type="text"
                  value={editingUser.department || ""}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, department: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors disabled:opacity-50"
                >
                  {actionLoading ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 3: DELETE CONFIRMATION --- */}
      {deletingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0f1422] border border-red-500/30 rounded-2xl max-w-sm w-full p-6 shadow-2xl relative">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="text-sm font-bold text-white mb-2">Delete User Account?</h3>
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              Are you sure you want to delete <strong className="text-white">{deletingUser.name}</strong> (
              <span className="font-mono text-gray-400">{deletingUser.email}</span>)? This will remove access to the Kavya Labs swarm cluster.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
              <button
                type="button"
                onClick={() => setDeletingUser(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={actionLoading}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md shadow-red-600/30 transition-colors disabled:opacity-50"
              >
                {actionLoading ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
