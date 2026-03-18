import { motion } from "framer-motion";
import { UserPlus, ListChecks, CalendarPlus, Users } from "lucide-react";

const quickActions = [
  {
    title: "Add Student",
    description: "Register a new student profile",
    icon: UserPlus,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Create Program",
    description: "Build a new training plan",
    icon: ListChecks,
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    title: "Schedule Session",
    description: "Set up training sessions",
    icon: CalendarPlus,
    color: "from-emerald-500 to-lime-500",
  },
  {
    title: "Add Coach",
    description: "Invite a new coach to the team",
    icon: Users,
    color: "from-amber-400 to-orange-500",
  },
];

export function QuickActions() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100">Quick Actions</h2>
        <p className="text-sm text-slate-400">Perform common tasks quickly</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.title}
              type="button"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="group flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-5 text-left shadow-[0_10px_25px_-20px_rgba(0,0,0,0.75)] transition hover:border-yellow-400/40 hover:bg-slate-900/40"
            >
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color} text-white shadow-lg`}> 
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-base font-semibold text-slate-100">{action.title}</p>
                <p className="mt-1 text-sm text-slate-400">{action.description}</p>
              </div>
              <span className="mt-auto text-xs font-semibold text-yellow-300 group-hover:text-yellow-200">
                Start
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
