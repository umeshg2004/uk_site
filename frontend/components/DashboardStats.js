import { motion } from "framer-motion";
import { Users, Dumbbell, UserCheck, CreditCard } from "lucide-react";

const stats = [
  {
    label: "Total Students",
    value: "248",
    description: "Enrolled players",
    icon: Users,
    accent: "from-sky-500 to-cyan-400",
  },
  {
    label: "Active Sessions",
    value: "8",
    description: "Sessions happening now",
    icon: Dumbbell,
    accent: "from-emerald-500 to-lime-400",
  },
  {
    label: "Available Coaches",
    value: "14",
    description: "On duty today",
    icon: UserCheck,
    accent: "from-indigo-500 to-violet-500",
  },
  {
    label: "Monthly Revenue",
    value: "₹3.2L",
    description: "Expected this month",
    icon: CreditCard,
    accent: "from-amber-400 to-orange-500",
  },
];

export function DashboardStats() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: idx * 0.06 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-[0_10px_25px_-20px_rgba(0,0,0,0.75)] transition hover:shadow-xl"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.accent}`} />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {stat.label}
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-100">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-400">{stat.description}</p>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900/40 text-yellow-300 transition group-hover:bg-slate-900">
                <Icon className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">View details</span>
              <span className="text-yellow-400">→</span>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
