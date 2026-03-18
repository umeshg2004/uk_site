import { motion } from "framer-motion";
import { Users, Dumbbell, CreditCard, Activity, TrendingUp } from "lucide-react";

const cards = [
  {
    label: "Total Students",
    value: "248",
    change: "+12.4%",
    icon: Users,
  },
  {
    label: "Active Sessions",
    value: "8",
    change: "+2 this month",
    icon: Dumbbell,
  },
  {
    label: "Coaches Available",
    value: "14",
    change: "+1 new",
    icon: Activity,
  },
  {
    label: "Monthly Revenue",
    value: "₹3.2L",
    change: "+18.3%",
    icon: CreditCard,
  },
];

export function DashboardCards() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.article
            initial={{ y: 8, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35 }}
            viewport={{ once: true }}
            className="group rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-5 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.8)] transition hover:-translate-y-0.5 hover:border-yellow-400/40"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {card.label}
              </p>
              <span className="rounded-2xl bg-slate-800/60 p-2.5 text-yellow-300 ring-1 ring-inset ring-yellow-400/10">
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-4 text-3xl font-semibold text-slate-50">
              {card.value}
            </p>
            <div className="mt-2 flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>{card.change}</span>
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}

