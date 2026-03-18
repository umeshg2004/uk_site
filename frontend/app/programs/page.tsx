"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { api, setAuthToken } from "@/lib/api";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

const PROGRAMS = [
  {
    name: "Beginner Program",
    level: "Beginner",
    duration: "12 weeks",
    schedule: "Mon, Wed, Fri",
    fee: "Rs 4,000 / month",
    coach: "Certified Trainer",
  },
  {
    name: "Intermediate Program",
    level: "Intermediate",
    duration: "16 weeks",
    schedule: "Tue, Thu, Sat",
    fee: "Rs 5,500 / month",
    coach: "Senior Coach",
  },
  {
    name: "High Performance Program",
    level: "Advanced / Tournament",
    duration: "Ongoing",
    schedule: "Mon–Sat (mornings & evenings)",
    fee: "Rs 8,500 / month",
    coach: "Tournament Coach",
  },
  {
    name: "Adult Program",
    level: "All levels",
    duration: "Ongoing",
    schedule: "Weekend batches",
    fee: "Rs 3,500 / month",
    coach: "Adult Specialist",
  },
  {
    name: "Kids Program",
    level: "Age 6–12",
    duration: "12 weeks",
    schedule: "After school",
    fee: "Rs 3,000 / month",
    coach: "Kids Mentor",
  },
];

export default function ProgramsPage() {
  const [banner, setBanner] = useState<string | null>(null);
  const [sending, setSending] = useState<string | null>(null);

  const requestProgram = async (programName: string) => {
    setBanner(null);
    setSending(programName);
    try {
      if (typeof window !== "undefined") {
        setAuthToken(localStorage.getItem("access_token"));
      }
      await api.post("/program-requests", { program_name: programName });
      setBanner("✅ Your request has been sent to the admin. You will be notified after approval.");
    } catch (e: any) {
      const detail =
        e?.response?.data?.detail ??
        (e?.response?.status === 401 ? "Please log in to submit a request." : null) ??
        "Submission failed. Please try again.";
      setBanner(detail);
    } finally {
      setSending(null);
    }
  };

  return (
    <>
      <Navbar />
      <main className="space-y-6">
        <h1 className="text-3xl font-semibold">Programs</h1>
        <p className="text-sm text-slate-300">
          Choose from structured training tracks designed for every stage of a player&apos;s journey.
        </p>
        {banner && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-100 px-4 py-3 text-sm">
            {banner}
          </div>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          {PROGRAMS.map((p, idx) => (
            <motion.article
              key={p.name}
              className="rounded-lg bg-card p-4 text-sm border border-slate-800/70 shadow-lg hover:shadow-yellow-500/10 transition-all hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-xs text-accent mt-1">{p.level}</p>
              <dl className="mt-3 space-y-1 text-slate-200">
                <div className="flex justify-between">
                  <dt className="text-slate-400">Duration</dt>
                  <dd>{p.duration}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-400">Schedule</dt>
                  <dd>{p.schedule}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-400">Fees</dt>
                  <dd>{p.fee}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-400">Coach</dt>
                  <dd>{p.coach}</dd>
                </div>
              </dl>
              <button
                className="mt-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 text-white font-semibold shadow hover:shadow-yellow-500/30 transition-all w-full"
                onClick={() => requestProgram(p.name)}
                disabled={sending === p.name}
              >
                {sending === p.name ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Join Program
                    <CheckCircle2 className="h-4 w-4 ml-2" />
                  </>
                )}
              </button>
            </motion.article>
          ))}
        </div>
      </main>
    </>
  );
}
