import { motion } from "framer-motion";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 md:p-10">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-yellow-400/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-600/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(250,204,21,0.12),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(245,158,11,0.10),transparent_35%)]" />
      </div>

      <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <motion.div
            initial={{ y: 4, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-yellow-300"
          >
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-yellow-300" />
            Live academy control center
          </motion.div>
          <motion.h1
            initial={{ y: 8, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="mt-4 text-3xl font-semibold leading-tight text-slate-50 md:text-4xl"
          >
            Badminton Training Management System
          </motion.h1>
          <p className="mt-3 max-w-xl text-sm text-slate-300">
            Track every rally of your academy: players, sessions, coaches,
            attendance, payments and performance analytics in a single,
            tournament-ready dashboard.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <button className="rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-yellow-500/30 hover:brightness-105">
              View Academy Insights
            </button>
            <button className="rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-900/80">
              Configure Programs
            </button>
          </motion.div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Courts", value: "6" },
              { label: "Daily Sessions", value: "12" },
              { label: "Active Students", value: "248" },
              { label: "Performance Index", value: "87%" },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 shadow-[0_10px_30px_-25px_rgba(0,0,0,0.8)]"
              >
                <p className="text-xs text-slate-400">{kpi.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-50">
                  {kpi.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

