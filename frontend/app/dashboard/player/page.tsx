"use client";

import { useEffect, useState } from "react";
import { api, setAuthToken } from "@/lib/api";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Target,
  TrendingUp,
  Calendar,
  Award,
  BookOpen,
  Activity,
  Clock,
  Trophy,
  BarChart3,
  Zap,
  Star,
  ChevronDown,
} from "lucide-react";

const heroBg =
  "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.82)), url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80&sat=-15')";

interface UserStats {
  sessions_completed: number;
  current_level: string;
  next_level_progress: number;
  total_hours: number;
  achievements_unlocked: number;
}

interface ProgramRequest {
  id: number;
  player_id: number;
  player_name: string;
  program_name: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export default function PlayerDashboardPage() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [programs, setPrograms] = useState<ProgramRequest[]>([]);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
    if (token) {
      setAuthToken(token);
      // Mock data for player stats - in real app, fetch from API
      setStats({
        sessions_completed: 24,
        current_level: "Intermediate",
        next_level_progress: 75,
        total_hours: 48,
        achievements_unlocked: 8,
      });

      api
        .get("/program-requests/my")
        .then((res) => setPrograms(res.data))
        .catch((e) => console.error("Failed to load programs", e));
    } else {
      setError("Not authenticated");
    }
  }, []);

  const quickStats = [
    {
      label: "Sessions Completed",
      value: stats ? stats.sessions_completed.toString() : "--",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Total Hours",
      value: stats ? stats.total_hours.toString() : "--",
      icon: Clock,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Current Level",
      value: stats ? stats.current_level : "--",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Achievements",
      value: stats ? stats.achievements_unlocked.toString() : "--",
      icon: Award,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const upcomingSessions = [
    {
      date: "Today",
      time: "2:00 PM",
      coach: "Coach Rajesh Kumar",
      type: "Footwork Training",
      duration: "60 min"
    },
    {
      date: "Tomorrow",
      time: "10:00 AM",
      coach: "Coach Priya Sharma",
      type: "Smash Practice",
      duration: "45 min"
    },
    {
      date: "Friday",
      time: "4:00 PM",
      coach: "Coach Amit Verma",
      type: "Match Strategy",
      duration: "90 min"
    }
  ];

  const recentAchievements = [
    {
      title: "First Tournament Win",
      description: "Won your first local tournament",
      date: "2 days ago",
      icon: Trophy
    },
    {
      title: "Speed Demon",
      description: "Achieved 280+ smash speed",
      date: "1 week ago",
      icon: Zap
    },
    {
      title: "Consistent Player",
      description: "Completed 20 sessions",
      date: "2 weeks ago",
      icon: Star
    }
  ];

  const skillProgress = [
    { skill: "Footwork", progress: 85, level: "Advanced" },
    { skill: "Smash", progress: 78, level: "Intermediate" },
    { skill: "Defense", progress: 92, level: "Expert" },
    { skill: "Strategy", progress: 65, level: "Intermediate" }
  ];

  return (
    <div className="space-y-10">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative isolate overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
        style={{
          height: "100vh",
          backgroundImage: heroBg,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-slate-950/70 to-slate-950/90" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-5 text-center sm:px-10">
          <div className="mb-6 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200 backdrop-blur-md">
            Premium Badminton Academy
          </div>

          <div className="max-w-3xl rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl shadow-[0_10px_80px_rgba(0,0,0,0.45)] sm:p-10">
            <h1 className="text-4xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
              Train Like a Champion 🏸
            </h1>
            <p className="mt-5 text-base text-slate-100/90 sm:text-lg lg:text-xl">
              Join our professional badminton training programs and improve your skills from beginner to advanced level.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Link
                href="/contact"
                className="rounded-full bg-[linear-gradient(45deg,#ff8c00,#ffb300)] px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_15px_40px_rgba(255,140,0,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_18px_45px_rgba(255,140,0,0.55)] sm:px-8 sm:py-3.5 sm:text-base"
              >
                Book Trial Session
              </Link>
              <Link
                href="/programs"
                className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/15 sm:px-8 sm:py-3.5 sm:text-base"
              >
                View Training Programs
              </Link>
            </div>
          </div>

          <div className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: "Sessions Completed", value: stats?.sessions_completed ?? "24", accent: "from-amber-400/60 to-orange-500/70" },
              { label: "Total Hours", value: stats?.total_hours ?? "48", accent: "from-cyan-400/60 to-blue-500/70" },
              { label: "Achievements", value: stats?.achievements_unlocked ?? "8", accent: "from-emerald-400/60 to-teal-500/70" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
              >
                <div className={`inline-flex rounded-full bg-gradient-to-r ${item.accent} px-3 py-1 text-xs font-semibold text-slate-900 shadow-lg`}>
                  {item.value}
                </div>
                <p className="mt-3 text-sm text-slate-200/80">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-sm text-slate-200/80">
            <span className="text-xs uppercase tracking-[0.2em] text-slate-300">Scroll to explore programs</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
            >
              <ChevronDown className="h-5 w-5 text-white" />
            </motion.div>
          </div>
        </div>
      </motion.section>

    {/* Header */}
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Player Dashboard</h1>
          <p className="text-slate-400">Track your progress and upcoming sessions.</p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm transition-all hover:bg-slate-800 hover:border-slate-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </Link>
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

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {quickStats.map((stat, index) => {
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
                </div>
                <div className={`rounded-xl bg-gradient-to-r ${stat.color} p-3 text-white shadow-lg`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* My Programs */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-white">My Programs</h2>
          <span className="text-sm text-slate-400">
            {programs.length} enrollment{programs.length === 1 ? "" : "s"}
          </span>
        </div>
        <div className="space-y-3">
          {programs.length === 0 && (
            <p className="text-slate-400 text-sm">No program enrollments yet.</p>
          )}
          {programs.map((p) => (
            <div
              key={p.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4"
            >
              <div>
                <p className="text-white font-semibold">{p.program_name}</p>
                <p className="text-slate-400 text-sm">Your request status is below.</p>
                {p.status === "approved" && (
                  <p className="text-emerald-300 text-sm mt-1">
                    Coach Assigned: Rahul Sharma
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 mt-3 md:mt-0">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    p.status === "approved"
                      ? "bg-emerald-500/15 text-emerald-200 border border-emerald-500/30"
                      : p.status === "rejected"
                      ? "bg-red-500/15 text-red-200 border border-red-500/30"
                      : "bg-amber-500/15 text-amber-200 border border-amber-500/30"
                  }`}
                >
                  {p.status}
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(p.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Sessions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="lg:col-span-2 bg-slate-900 rounded-2xl p-6 border border-slate-800"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Upcoming Sessions</h2>
            <Calendar className="h-5 w-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-800 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-400 text-slate-900 px-3 py-1 rounded-lg font-semibold text-sm">
                    {session.date}
                  </div>
                  <div>
                    <p className="text-white font-medium">{session.coach}</p>
                    <p className="text-slate-400 text-sm">{session.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-slate-300 text-sm">{session.time} • {session.duration}</p>
                  <button className="text-yellow-400 hover:text-yellow-300 text-sm font-medium">
                    Join Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Level Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Level Progress</h2>
            <TrendingUp className="h-5 w-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">{stats?.current_level}</div>
              <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full"
                  style={{ width: `${stats?.next_level_progress || 0}%` }}
                ></div>
              </div>
              <p className="text-slate-400 text-sm">{stats?.next_level_progress}% to Advanced</p>
            </div>
            <div className="pt-4 border-t border-slate-700">
              <h3 className="text-white font-medium mb-3">Skill Breakdown</h3>
              {skillProgress.map((skill, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">{skill.skill}</span>
                    <span className="text-yellow-400">{skill.level}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Recent Achievements</h2>
          <Award className="h-5 w-5 text-slate-400" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentAchievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div key={index} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-yellow-400 p-2 rounded-lg">
                    <Icon className="h-5 w-5 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{achievement.title}</h3>
                    <p className="text-slate-400 text-sm">{achievement.date}</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm">{achievement.description}</p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
