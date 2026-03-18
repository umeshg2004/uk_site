import { motion } from "framer-motion";

export function CoachCard({ coach }) {
  return (
    <motion.article
      initial={{ y: 10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      viewport={{ once: true }}
      className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 hover:border-yellow-400/40 hover:bg-slate-900/40 transition"
    >
      <div className="p-5">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 text-slate-950 font-bold">
            {coach.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-100">{coach.name}</p>
            <p className="text-xs text-slate-400">{coach.specialization}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-3">
            <p className="text-slate-400">Experience</p>
            <p className="mt-1 text-sm font-semibold text-slate-100">
              {coach.experience} yrs
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-3">
            <p className="text-slate-400">Programs</p>
            <p className="mt-1 text-sm font-semibold text-slate-100">
              {coach.programs}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

