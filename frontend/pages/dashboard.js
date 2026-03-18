import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import {
  Users,
  Dumbbell,
  CreditCard,
  Activity,
  TrendingUp,
  Calendar,
  Trophy,
  Star,
  BarChart3,
  PieChart,
  Clock,
  Target,
  ChevronDown,
  Sparkles
} from "lucide-react";

const stats = [
  {
    title: "Total Students",
    value: "248",
    change: "+12.4%",
    icon: Users,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Active Sessions",
    value: "8",
    change: "+2 this month",
    icon: Dumbbell,
    color: "from-green-500 to-green-600"
  },
  {
    title: "Coaches Available",
    value: "14",
    change: "+1 new",
    icon: Activity,
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Monthly Revenue",
    value: "₹3.2L",
    change: "+18.3%",
    icon: CreditCard,
    color: "from-yellow-500 to-orange-500"
  }
];

const recentActivities = [
  {
    student: "Aarav Sharma",
    action: "Completed Session",
    program: "High Performance",
    time: "2 hours ago"
  },
  {
    student: "Diya Patel",
    action: "New Enrollment",
    program: "Beginner",
    time: "4 hours ago"
  },
  {
    student: "Rahul Menon",
    action: "Payment Received",
    program: "Intermediate",
    time: "6 hours ago"
  },
  {
    student: "Sara Khan",
    action: "Marked Present",
    program: "Kids",
    time: "8 hours ago"
  }
];

const upcomingSessions = [
  {
    time: "10:00 AM",
    student: "Vikram Singh",
    program: "Advanced",
    coach: "Coach Rajesh"
  },
  {
    time: "11:30 AM",
    student: "Priya Sharma",
    program: "Intermediate",
    coach: "Coach Sneha"
  },
  {
    time: "2:00 PM",
    student: "Arjun Kumar",
    program: "Beginner",
    coach: "Coach Amit"
  }
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
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
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.82)), url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80&sat=-15&blur=0')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-slate-950/70 to-slate-950/90" />

          <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-5 text-center sm:px-10">
            <div className="mb-6 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200 backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              Premium Badminton Academy
            </div>

            <div className="max-w-3xl rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl shadow-[0_10px_80px_rgba(0,0,0,0.45)] sm:p-10">
              <h1 className="text-4xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                Train Like a Champion 🏸
              </h1>
              <p className="mt-5 text-base text-slate-100/90 sm:text-lg lg:text-xl">
                Join our professional badminton training programs and improve your skills from beginner to advanced level. Guided by elite coaches, powered by data-driven progress tracking.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                <a
                  href="/contact"
                  className="rounded-full bg-[linear-gradient(45deg,#ff8c00,#ffb300)] px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_15px_40px_rgba(255,140,0,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_18px_45px_rgba(255,140,0,0.55)] sm:px-8 sm:py-3.5 sm:text-base"
                >
                  Book Trial Session
                </a>
                <a
                  href="/programs"
                  className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/15 sm:px-8 sm:py-3.5 sm:text-base"
                >
                  View Training Programs
                </a>
              </div>
            </div>

            <div className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: "Athletes Trained", value: "1,200+", accent: "from-amber-400/60 to-orange-500/70" },
                { label: "Avg. Improvement", value: "+32%", accent: "from-cyan-400/60 to-blue-500/70" },
                { label: "Pro Coaches", value: "15", accent: "from-emerald-400/60 to-teal-500/70" }
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                >
                  <div className={`inline-flex rounded-full bg-gradient-to-r ${item.accent} px-3 py-1 text-xs font-semibold text-slate-900 shadow-lg`}>{item.value}</div>
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-r ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-green-400">{stat.change}</div>
                  </div>
                </div>
                <h3 className="text-slate-300 font-medium">{stat.title}</h3>
              </motion.div>
            );
          })}
        </div>

        {/* Charts and Activities */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-slate-900 rounded-2xl p-6 border border-slate-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Performance Overview</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-yellow-400 text-slate-900 rounded-lg text-sm font-medium">
                  This Month
                </button>
                <button className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-sm hover:bg-slate-700">
                  Last Month
                </button>
              </div>
            </div>
            <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                <p className="text-slate-400">Chart visualization coming soon</p>
              </div>
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
          >
            <h2 className="text-xl font-bold text-white mb-6">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-yellow-400 w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">
                      {activity.student} - {activity.action}
                    </p>
                    <p className="text-slate-400 text-xs">{activity.program}</p>
                    <p className="text-slate-500 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Upcoming Sessions and Quick Actions */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Upcoming Sessions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Today's Sessions</h2>
              <Calendar className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{session.student}</p>
                    <p className="text-slate-400 text-sm">{session.program} • {session.coach}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-400 font-bold">{session.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
          >
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 p-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300">
                <Users className="w-6 h-6 mx-auto mb-2" />
                Add Student
              </button>
              <button className="bg-slate-800 text-white p-4 rounded-xl font-bold hover:bg-slate-700 transition-all duration-300">
                <Calendar className="w-6 h-6 mx-auto mb-2" />
                Schedule Session
              </button>
              <button className="bg-slate-800 text-white p-4 rounded-xl font-bold hover:bg-slate-700 transition-all duration-300">
                <Target className="w-6 h-6 mx-auto mb-2" />
                View Reports
              </button>
              <button className="bg-slate-800 text-white p-4 rounded-xl font-bold hover:bg-slate-700 transition-all duration-300">
                <Trophy className="w-6 h-6 mx-auto mb-2" />
                Tournaments
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}

