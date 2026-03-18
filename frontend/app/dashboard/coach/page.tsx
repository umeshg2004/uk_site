"use client";

import { useEffect, useState } from "react";
import { api, setAuthToken } from "@/lib/api";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Users,
  Activity,
  TrendingUp,
  Calendar,
  Award,
  BookOpen,
  Sparkles,
  Target,
  Clock,
  UserCheck,
  BarChart3,
} from "lucide-react";

interface Player {
  id: number;
  name: string;
  email: string;
  skill_level: string;
  sessions_completed: number;
}

export default function CoachDashboardPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
    if (token) {
      setAuthToken(token);
      // For now, we'll use mock data since we don't have a players endpoint for coaches
      // In a real app, you'd fetch players assigned to this coach
      setPlayers([
        { id: 1, name: "Aarav Sharma", email: "aarav@example.com", skill_level: "Intermediate", sessions_completed: 15 },
        { id: 2, name: "Priya Patel", email: "priya@example.com", skill_level: "Beginner", sessions_completed: 8 },
        { id: 3, name: "Rahul Kumar", email: "rahul@example.com", skill_level: "Advanced", sessions_completed: 22 },
      ]);
    } else {
      setError("Not authenticated");
    }
  }, []);

  const stats = [
    {
      label: "My Players",
      value: players.length.toString(),
      change: "+2 this month",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Sessions This Week",
      value: "12",
      change: "+3 from last week",
      icon: Activity,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Average Rating",
      value: "4.8",
      change: "+0.2 this month",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Hours Coached",
      value: "28",
      change: "+5 this week",
      icon: Clock,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const upcomingSessions = [
    {
      time: "10:00 AM",
      player: "Aarav Sharma",
      type: "Footwork Training",
      duration: "60 min"
    },
    {
      time: "2:00 PM",
      player: "Priya Patel",
      type: "Smash Practice",
      duration: "45 min"
    },
    {
      time: "4:30 PM",
      player: "Rahul Kumar",
      type: "Match Strategy",
      duration: "90 min"
    }
  ];

  const recentAchievements = [
    {
      player: "Aarav Sharma",
      achievement: "First tournament win",
      date: "2 days ago"
    },
    {
      player: "Priya Patel",
      achievement: "Improved smash accuracy by 25%",
      date: "1 week ago"
    },
    {
      player: "Rahul Kumar",
      achievement: "Reached advanced level",
      date: "3 days ago"
    }
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
          <h1 className="text-3xl font-bold text-white mb-2">Coach Dashboard</h1>
          <p className="text-slate-400">Welcome back! Here's your coaching overview.</p>
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
            <h2 className="text-xl font-bold text-white">Today's Schedule</h2>
            <Calendar className="h-5 w-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-800 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-400 text-slate-900 px-3 py-1 rounded-lg font-semibold text-sm">
                    {session.time}
                  </div>
                  <div>
                    <p className="text-white font-medium">{session.player}</p>
                    <p className="text-slate-400 text-sm">{session.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-slate-300 text-sm">{session.duration}</p>
                  <button className="text-yellow-400 hover:text-yellow-300 text-sm font-medium">
                    Start Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Achievements</h2>
            <Award className="h-5 w-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="p-3 bg-slate-800 rounded-lg">
                <p className="text-white text-sm font-medium mb-1">{achievement.player}</p>
                <p className="text-slate-300 text-xs mb-2">{achievement.achievement}</p>
                <p className="text-slate-500 text-xs">{achievement.date}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* My Players */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">My Players</h2>
          <UserCheck className="h-5 w-5 text-slate-400" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {players.map((player) => (
            <div key={player.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-medium">{player.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  player.skill_level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                  player.skill_level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {player.skill_level}
                </span>
              </div>
              <p className="text-slate-400 text-sm mb-2">{player.email}</p>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">{player.sessions_completed} sessions</span>
                <button className="text-yellow-400 hover:text-yellow-300 text-sm font-medium">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}