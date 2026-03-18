import { motion } from "framer-motion";
import { Shield, Users, Zap, Trophy, CheckCircle2, Loader2, X } from "lucide-react";
import { useState } from "react";
import { api, setAuthToken } from "../lib/api";

const programs = [
  {
    title: "Beginner Program",
    icon: Shield,
    description: "Perfect for newcomers to badminton. Learn basic techniques, footwork, and court positioning.",
    features: ["Basic grip & stance", "Fundamental shots", "Court awareness", "Fitness training"],
    duration: "3 months",
    price: "₹2,500/month",
    color: "from-green-400 to-green-600",
  },
  {
    title: "Intermediate Program",
    icon: Users,
    description: "Build on your foundation with tactical play, endurance training, and match strategies.",
    features: ["Advanced techniques", "Tactical training", "Match practice", "Strength conditioning"],
    duration: "4 months",
    price: "₹3,500/month",
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "Advanced Program",
    icon: Zap,
    description: "Master high-level skills with speed training, deception, and competitive strategies.",
    features: ["Speed & agility", "Deception techniques", "Mental training", "Competition prep"],
    duration: "6 months",
    price: "₹5,000/month",
    color: "from-purple-400 to-purple-600",
  },
  {
    title: "Professional Program",
    icon: Trophy,
    description: "Elite training for serious players aiming for tournaments and professional play.",
    features: ["Elite coaching", "Tournament training", "Video analysis", "Personalized plans"],
    duration: "12 months",
    price: "₹8,000/month",
    color: "from-yellow-400 to-orange-500",
  },
];

export function Programs() {
  const [banner, setBanner] = useState(null);
  const [loadingProgram, setLoadingProgram] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    skill_level: "",
    batch: "Morning",
    message: "",
  });

  const openForm = (program) => {
    setSelectedProgram(program);
    setBanner(null);
    setShowForm(true);
  };

  const submitRequest = async () => {
    if (!form.name || !form.email || !form.phone || !form.age || !form.skill_level) {
      setBanner("Please fill all required fields.");
      return;
    }
    setLoadingProgram(selectedProgram?.title);
    try {
      if (typeof window !== "undefined") {
        setAuthToken(localStorage.getItem("access_token"));
      }
      await api.post("/program-enrollment", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        age: Number(form.age),
        skill_level: form.skill_level,
        batch: form.batch,
        program_name: selectedProgram.title,
        duration: selectedProgram.duration,
        price: selectedProgram.price,
        message: form.message || undefined,
      });
      setBanner("✅ Your request has been sent to the admin. You will be notified after approval.");
      setShowForm(false);
      setForm({
        name: "",
        email: "",
        phone: "",
        age: "",
        skill_level: "",
        batch: "Morning",
        message: "",
      });
    } catch (e) {
      const detail =
        e?.response?.data?.detail ??
        (e?.response?.status === 401 ? "Please log in to submit a request." : null) ??
        "Submission failed. Please try again.";
      setBanner(detail);
    } finally {
      setLoadingProgram(null);
    }
  };

  return (
    <section id="programs" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Training Programs</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Choose from our comprehensive training programs designed to take you from beginner to badminton champion.
          </p>
        </motion.div>

        {banner && (
          <div className="mb-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-100 px-4 py-3 text-sm text-center">
            {banner}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-950 rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all duration-300 group"
              >
                <div
                  className={`bg-gradient-to-br ${program.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{program.title}</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">{program.description}</p>

                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Duration:</span>
                    <span className="text-white font-semibold">{program.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Price:</span>
                    <span className="text-yellow-400 font-bold">{program.price}</span>
                  </div>
                </div>

                <button
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
                  onClick={() => openForm(program)}
                  disabled={loadingProgram === program.title}
                >
                  {loadingProgram === program.title ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Join Program
                      <CheckCircle2 className="h-4 w-4" />
                    </>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {showForm && selectedProgram && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-6 relative shadow-2xl">
            <button
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
              onClick={() => setShowForm(false)}
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-2xl font-semibold text-white mb-1">Join {selectedProgram.title}</h3>
            <p className="text-slate-400 text-sm mb-4">
              Duration: {selectedProgram.duration} • Price: {selectedProgram.price}
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                type="number"
                className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                placeholder="Age"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              />
              <input
                className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white md:col-span-2"
                placeholder="Skill level (Beginner / Intermediate / Advanced)"
                value={form.skill_level}
                onChange={(e) => setForm({ ...form, skill_level: e.target.value })}
              />
              <select
                className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                value={form.batch}
                onChange={(e) => setForm({ ...form, batch: e.target.value })}
              >
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
              </select>
              <textarea
                className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white md:col-span-2"
                rows={3}
                placeholder="Message (optional)"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <button
              className="mt-4 w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:shadow-yellow-500/25 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              onClick={submitRequest}
              disabled={loadingProgram === selectedProgram.title}
            >
              {loadingProgram === selectedProgram.title ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Submit Request"
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
