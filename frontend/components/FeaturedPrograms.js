import { motion } from "framer-motion";
import { Trophy, Shield, Zap, Users } from "lucide-react";

const items = [
  {
    title: "Beginner Training",
    description: "Footwork, grip, and fundamentals with structured drills.",
    icon: Shield,
  },
  {
    title: "Intermediate Training",
    description: "Tactical patterns, endurance, and match-play routines.",
    icon: Users,
  },
  {
    title: "Advanced Training",
    description: "Speed, deception, and high-intensity technical sessions.",
    icon: Zap,
  },
  {
    title: "Professional Coaching",
    description: "Tournament prep, performance tracking and recovery planning.",
    icon: Trophy,
  },
];

export function FeaturedPrograms() {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">
            Featured Programs
          </h2>
          <p className="text-sm text-slate-400">
            Academy-style sections inspired by premium sports websites.
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.article
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: idx * 0.03 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-slate-800 bg-slate-950 p-5 hover:border-yellow-400/40 hover:bg-slate-900/40 transition"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-yellow-400/10 text-yellow-300 ring-1 ring-inset ring-yellow-400/10">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-400">
                  View
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-400">{item.description}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

