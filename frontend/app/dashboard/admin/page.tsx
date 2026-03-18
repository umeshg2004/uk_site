"use client";

import { FormEvent, useEffect, useState } from "react";
import { api, setAuthToken } from "@/lib/api";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Users,
  Activity,
  Award,
  BookOpen,
  Sparkles,
  Brain,
  Mail,
  MessageSquare,
  Bell,
  TrendingUp,
  BarChart3,
} from "lucide-react";

interface Summary {
  totalPlayers: number;
  enrollments: number;
  pending: number;
  approved: number;
}

interface ContactMessage {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface ProgramEnrollment {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  skill_level: string;
  program_name: string;
  duration?: string;
  price?: string;
  batch: string;
  message?: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

interface ProgramRequest {
  id: number;
  player_id: number;
  player_name: string;
  program_name: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [coachForm, setCoachForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [coachMessage, setCoachMessage] = useState<{ success?: string; error?: string }>({});
  const [isCreatingCoach, setIsCreatingCoach] = useState(false);
  const [enrollments, setEnrollments] = useState<ProgramEnrollment[]>([]);
  const [programRequests, setProgramRequests] = useState<ProgramRequest[]>([]);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
      if (token) {
        setAuthToken(token);
        
        // Fetch players
        api
          .get("/players")
          .then((res) => {
          setSummary((prev) => ({
            totalPlayers: res.data.length,
            enrollments: prev?.enrollments ?? 0,
            pending: prev?.pending ?? 0,
            approved: prev?.approved ?? 0,
          }));
        })
        .catch((e) => {
          setError(e?.response?.data?.detail ?? "Failed to load players");
        });

      // Fetch enrollment summary
      api
        .get("/program-enrollments/summary")
        .then((res) => {
          setSummary((prev) => ({
            totalPlayers: prev?.totalPlayers ?? 0,
            enrollments: res.data.total,
            pending: res.data.pending,
            approved: res.data.approved,
          }));
        })
        .catch((e) => {
          console.error("Failed to load enrollment summary:", e);
        });

      // Fetch enrollments table
      api
        .get("/program-enrollments")
        .then((res) => setEnrollments(res.data))
        .catch((e) => console.error("Failed to load enrollments:", e));

      // Fetch contact messages
      api
        .get("/contact/messages?limit=10")
        .then((res) => {
          setMessages(res.data);
        })
        .catch((e) => {
          console.error("Failed to load messages:", e);
        });

      // Fetch program requests
      api
        .get("/program-requests")
        .then((res) => setProgramRequests(res.data))
        .catch((e) => console.error("Failed to load program requests:", e));
    } else {
      setError("Not authenticated");
    }
  }, []);

  const handleCoachSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCoachMessage({});
    setIsCreatingCoach(true);
    try {
      await api.post("/auth/coach", coachForm);
      setCoachMessage({ success: "Coach account created successfully." });
      setCoachForm({ full_name: "", email: "", password: "" });
    } catch (e: any) {
      const detail =
        e?.response?.data?.detail ??
        e?.message ??
        "Failed to create coach account.";
      setCoachMessage({ error: detail });
    } finally {
      setIsCreatingCoach(false);
    }
  };

  const handleEnrollmentStatus = async (id: number, status: "approved" | "rejected") => {
    try {
      const res = await api.patch(`/program-enrollments/${id}/status`, { status });
      setEnrollments((prev) =>
        prev.map((enr) => (enr.id === id ? res.data : enr))
      );
      // refresh summary counts
      const sum = await api.get("/program-enrollments/summary");
      setSummary((prev) => ({
        totalPlayers: prev?.totalPlayers ?? 0,
        enrollments: sum.data.total,
        pending: sum.data.pending,
        approved: sum.data.approved,
      }));
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  const handleEnrollmentDelete = async (id: number) => {
    try {
      await api.delete(`/program-enrollments/${id}`);
      setEnrollments((prev) => prev.filter((e) => e.id !== id));
      const sum = await api.get("/program-enrollments/summary");
      setSummary((prev) => ({
        totalPlayers: prev?.totalPlayers ?? 0,
        enrollments: sum.data.total,
        pending: sum.data.pending,
        approved: sum.data.approved,
      }));
    } catch (e) {
      console.error("Failed to delete enrollment", e);
    }
  };

  const handleRequestStatus = async (id: number, status: "approved" | "rejected") => {
    try {
      const res = await api.patch(`/program-requests/${id}/status`, { status });
      setProgramRequests((prev) => prev.map((r) => (r.id === id ? res.data : r)));
    } catch (e) {
      console.error("Failed to update request status", e);
    }
  };

  const stats = [
    {
      label: "Total Players",
      value: summary ? summary.totalPlayers : "--",
      change: "All registered",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Program Enrollments",
      value: summary ? summary.enrollments : "--",
      change: "New requests",
      icon: Activity,
      color: "from-amber-500 to-orange-500",
    },
    {
      label: "Pending Requests",
      value: programRequests.filter((r) => r.status === "pending").length,
      change: "Need review",
      icon: MessageSquare,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Approved Players",
      value: summary ? summary.approved : "--",
      change: "Cleared",
      icon: Award,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const achievements = [
    {
      title: "State Championship",
      detail: "U17 Mixed Doubles – 2026",
      badge: "Gold",
    },
    {
      title: "Academy Attendance",
      detail: "96% on-time check-ins this month",
      badge: "Discipline",
    },
    {
      title: "Scholarships",
      detail: "11 students funded for nationals",
      badge: "Support",
    },
    {
      title: "Coach Excellence",
      detail: "Coach R. Iyer rated 4.9/5",
      badge: "Mentor",
    },
  ];

  const highlights = [
    {
      icon: BookOpen,
      title: "Academy Highlights",
      desc: "Weekly curriculum synced across beginner, intermediate, and pro tracks.",
    },
    {
      icon: Sparkles,
      title: "Player Spotlight",
      desc: "Ananya Rao clocked 320 smashes in endurance drills today.",
    },
    {
      icon: Brain,
      title: "Tactics Lab",
      desc: "Match-sense simulations added for Saturday sparring blocks.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-800/80 border border-slate-700 px-3 py-1 text-sm text-amber-200">
            <Bell className="h-4 w-4" />
            Program Requests (
            {programRequests.filter((r) => r.status === "pending").length})
          </span>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm transition-all hover:bg-slate-800 hover:border-slate-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </Link>
        </div>
      </motion.header>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-xl bg-red-500/10 border border-red-500/20 p-4"
        >
          <p className="text-sm text-red-400">{error}</p>
        </motion.div>
      )}

      {/* Coach Account Creation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-amber-300 mb-1">
              Admin only
            </p>
            <h2 className="text-xl font-semibold text-white">Create Coach Account</h2>
            <p className="text-slate-400 text-sm">New coaches can log in with the credentials you set here.</p>
          </div>
        </div>

        <form onSubmit={handleCoachSubmit} className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-1">
            <label className="block text-sm text-slate-300 mb-2">Full name</label>
            <input
              type="text"
              value={coachForm.full_name}
              onChange={(e) => setCoachForm({ ...coachForm, full_name: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              placeholder="Coach name"
              required
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm text-slate-300 mb-2">Email</label>
            <input
              type="email"
              value={coachForm.email}
              onChange={(e) => setCoachForm({ ...coachForm, email: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              placeholder="coach@example.com"
              required
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm text-slate-300 mb-2">Temporary password</label>
            <div className="flex gap-3">
              <input
                type="password"
                value={coachForm.password}
                onChange={(e) => setCoachForm({ ...coachForm, password: e.target.value })}
                className="flex-1 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                placeholder="Min 8 characters"
                required
                minLength={8}
              />
              <button
                type="submit"
                disabled={isCreatingCoach}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 text-white font-semibold shadow-lg hover:shadow-amber-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isCreatingCoach ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </form>
        {(coachMessage.success || coachMessage.error) && (
          <div
            className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
              coachMessage.error
                ? "border-red-500/40 bg-red-500/10 text-red-200"
                : "border-emerald-500/40 bg-emerald-500/10 text-emerald-100"
            }`}
          >
            {coachMessage.error ?? coachMessage.success}
          </div>
        )}
      </motion.section>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={`stat-${stat.label}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600 transition-all hover:shadow-xl hover:shadow-slate-900/50 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-5 from-yellow-400/20 to-orange-500/20" />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                  <div className="flex items-center gap-1 text-sm text-emerald-400">
                    <TrendingUp className="h-4 w-4" />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className={`rounded-xl bg-gradient-to-r ${stat.color} p-3 text-white shadow-lg`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Program Enrollments */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-5 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Program Enrollments</h2>
            <p className="text-slate-400 text-sm">Approve or reject incoming program requests.</p>
          </div>
          <div className="text-sm text-slate-300">
            Total: {summary?.enrollments ?? "--"} • Pending: {summary?.pending ?? "--"}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-700/60">
                <th className="py-3 pr-3">Name</th>
                <th className="py-3 pr-3">Program</th>
                <th className="py-3 pr-3">Phone</th>
                <th className="py-3 pr-3">Skill</th>
                <th className="py-3 pr-3">Batch</th>
                <th className="py-3 pr-3">Status</th>
                <th className="py-3 pr-3">Date</th>
                <th className="py-3 pr-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {enrollments.length === 0 && (
                <tr>
                  <td className="py-4 text-slate-500" colSpan={8}>
                    No program enrollments yet.
                  </td>
                </tr>
              )}
              {enrollments.map((enr) => (
                <tr key={enr.id} className="text-slate-200">
                  <td className="py-3 pr-3">
                    <div className="font-semibold">{enr.name}</div>
                    <div className="text-xs text-slate-500">{enr.email}</div>
                  </td>
                  <td className="py-3 pr-3">
                    <div>{enr.program_name}</div>
                    <div className="text-xs text-slate-500">{enr.duration}</div>
                  </td>
                  <td className="py-3 pr-3">{enr.phone}</td>
                  <td className="py-3 pr-3">{enr.skill_level}</td>
                  <td className="py-3 pr-3">{enr.batch}</td>
                  <td className="py-3 pr-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        enr.status === "approved"
                          ? "bg-emerald-500/15 text-emerald-200 border border-emerald-500/30"
                          : enr.status === "rejected"
                          ? "bg-red-500/15 text-red-200 border border-red-500/30"
                          : "bg-amber-500/15 text-amber-200 border border-amber-500/30"
                      }`}
                    >
                      {enr.status}
                    </span>
                  </td>
                  <td className="py-3 pr-3 text-xs text-slate-400">
                    {new Date(enr.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 pr-3 space-x-2">
                    <button
                      className="rounded-lg bg-emerald-500/20 text-emerald-100 px-3 py-1 text-xs hover:bg-emerald-500/30"
                      onClick={() => handleEnrollmentStatus(enr.id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="rounded-lg bg-red-500/20 text-red-100 px-3 py-1 text-xs hover:bg-red-500/30"
                      onClick={() => handleEnrollmentStatus(enr.id, "rejected")}
                    >
                      Reject
                    </button>
                    <button
                      className="rounded-lg bg-slate-700 text-slate-200 px-3 py-1 text-xs hover:bg-slate-600"
                      onClick={() => handleEnrollmentDelete(enr.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Achievements + Highlights fill the previously blank area */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        viewport={{ once: true }}
        className="grid gap-6 lg:grid-cols-3"
      >
        <div className="lg:col-span-2 space-y-4">
          {/* Program Requests table */}
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-amber-300" />
                <h2 className="text-lg font-semibold text-white">Program Requests</h2>
              </div>
              <span className="text-xs text-amber-200 bg-amber-500/15 border border-amber-500/30 rounded-full px-3 py-1">
                Pending: {programRequests.filter((r) => r.status === "pending").length}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-700/50">
                    <th className="py-2 pr-3">Player Name</th>
                    <th className="py-2 pr-3">Program</th>
                    <th className="py-2 pr-3">Date</th>
                    <th className="py-2 pr-3">Status</th>
                    <th className="py-2 pr-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {programRequests.length === 0 && (
                    <tr>
                      <td className="py-3 text-slate-500" colSpan={5}>
                        No program requests yet.
                      </td>
                    </tr>
                  )}
                  {programRequests.map((req) => (
                    <tr key={req.id} className="text-slate-200">
                      <td className="py-3 pr-3">{req.player_name}</td>
                      <td className="py-3 pr-3">{req.program_name}</td>
                      <td className="py-3 pr-3 text-xs text-slate-400">
                        {new Date(req.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 pr-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${
                            req.status === "approved"
                              ? "bg-emerald-500/15 text-emerald-200 border border-emerald-500/30"
                              : req.status === "rejected"
                              ? "bg-red-500/15 text-red-200 border border-red-500/30"
                              : "bg-amber-500/15 text-amber-200 border border-amber-500/30"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3 pr-3 space-x-2">
                        <button
                          className="rounded-lg bg-emerald-500/20 text-emerald-100 px-3 py-1 text-xs hover:bg-emerald-500/30"
                          onClick={() => handleRequestStatus(req.id, "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="rounded-lg bg-red-500/20 text-red-100 px-3 py-1 text-xs hover:bg-red-500/30"
                          onClick={() => handleRequestStatus(req.id, "rejected")}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Recent Contact Messages</h2>
            <div className="flex items-center gap-2 text-xs text-amber-300">
              <Mail className="h-4 w-4" />
              {messages.filter(m => !m.is_read).length} unread messages
            </div>
          </div>
          <div className="space-y-3">
            {messages.length > 0 ? (
              messages.slice(0, 4).map((message) => (
                <div
                  key={message.id}
                  className={`rounded-2xl border p-4 transition-all hover:scale-[1.02] ${
                    message.is_read
                      ? "border-slate-700/50 bg-slate-900/50"
                      : "border-yellow-500/25 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-white">
                          {message.first_name} {message.last_name}
                        </h3>
                        {!message.is_read && (
                          <span className="rounded-full bg-yellow-500/15 px-2 py-1 text-xs font-semibold text-yellow-200 border border-yellow-500/25">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-300 mb-2">{message.email}</p>
                      <p className="text-sm text-slate-400 line-clamp-2">{message.message}</p>
                      <p className="text-xs text-slate-500 mt-2">
                        {new Date(message.created_at).toLocaleDateString()} at {new Date(message.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-8 text-center">
                <Mail className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No messages yet</p>
                <p className="text-sm text-slate-500">Contact messages will appear here</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 backdrop-blur">
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles className="h-5 w-5 text-amber-300" />
            <h3 className="text-base font-semibold text-white">Academy Highlights</h3>
          </div>
          <div className="space-y-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/70 p-3"
                >
                  <span className="rounded-lg bg-amber-500/15 p-2 text-amber-200 border border-amber-500/25">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 backdrop-blur-sm border border-slate-700/50"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href={"/students" as any}
            className="group rounded-xl bg-slate-800/50 p-4 transition-all hover:bg-slate-800 hover:scale-105 border border-slate-700/50 hover:border-slate-600"
          >
            <Users className="h-8 w-8 text-blue-400 mb-2" />
            <h3 className="font-medium text-white mb-1">Manage Students</h3>
            <p className="text-sm text-slate-400">View and manage student profiles</p>
          </Link>
          <Link
            href={"/sessions" as any}
            className="group rounded-xl bg-slate-800/50 p-4 transition-all hover:bg-slate-800 hover:scale-105 border border-slate-700/50 hover:border-slate-600"
          >
            <Activity className="h-8 w-8 text-green-400 mb-2" />
            <h3 className="font-medium text-white mb-1">Training Sessions</h3>
            <p className="text-sm text-slate-400">Schedule and track sessions</p>
          </Link>
          <Link
            href={"/analytics" as any}
            className="group rounded-xl bg-slate-800/50 p-4 transition-all hover:bg-slate-800 hover:scale-105 border border-slate-700/50 hover:border-slate-600"
          >
            <BarChart3 className="h-8 w-8 text-purple-400 mb-2" />
            <h3 className="font-medium text-white mb-1">Analytics</h3>
            <p className="text-sm text-slate-400">View performance insights</p>
          </Link>
        </div>
      </motion.div>

      {/* Training features keep the layout occupied permanently */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="grid gap-4 md:grid-cols-2"
      >
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h3 className="text-lg font-semibold text-white mb-2">Training Features</h3>
          <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
            <li>Structured drills with video annotations for every court.</li>
            <li>Attendance + payment checkpoints surfaced in real time.</li>
            <li>Performance dashboards tied to athlete goals.</li>
            <li>Coach notes synced to upcoming sessions.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h3 className="text-lg font-semibold text-white mb-2">Academy Statistics</h3>
          <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
              <p className="text-slate-400">Avg rally length</p>
              <p className="text-xl font-semibold text-white">18 shots</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
              <p className="text-slate-400">Session fill rate</p>
              <p className="text-xl font-semibold text-white">92%</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
              <p className="text-slate-400">Weekly drills logged</p>
              <p className="text-xl font-semibold text-white">486</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
              <p className="text-slate-400">Recovery compliance</p>
              <p className="text-xl font-semibold text-white">88%</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
