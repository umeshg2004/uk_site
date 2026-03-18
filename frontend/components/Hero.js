import { motion } from "framer-motion";
import Link from "next/link";

// Background uses supplied badminton court image URL
const heroBg =
  "linear-gradient(rgba(0,0,0,0.68), rgba(0,0,0,0.82)), url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPo5ev2QIY200NoDSamLs_wBRE8lV1yvn8fQ&s')";

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: heroBg,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Animated glow overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0.35, scale: 1 }}
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.03, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(255,184,0,0.25), transparent 35%), radial-gradient(circle at 80% 60%, rgba(255,109,0,0.22), transparent 32%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/60 to-slate-950/85" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="space-y-8 backdrop-blur-[2px]"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-lg"
          >
            Badminton Training
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Academy
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed"
          >
            Master the art of badminton with professional coaching, state-of-the-art facilities,
            and personalized training programs designed for players of all levels.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/auth/register"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_12px_40px_rgba(255,140,0,0.35)] hover:shadow-[0_16px_48px_rgba(255,140,0,0.45)] hover:scale-105 transition-all duration-300"
            >
              Register Now
            </Link>
            <Link
              href="#programs"
              className="border-2 border-white/60 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              Book Trial Session
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
