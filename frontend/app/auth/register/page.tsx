"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";

const schema = z.object({
  full_name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    try {
      const response = await api.post("/auth/register", data);
      console.log("Registration successful:", response.data);
      router.push("/auth/login");
    } catch (e: any) {
      console.error("Registration error:", e);
      console.error("Error response:", e?.response?.data);
      const errorMessage = 
        e?.response?.data?.detail || 
        e?.message || 
        "Registration failed. Please try again or contact support.";
      setError(errorMessage);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-md"
        >
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 backdrop-blur-md border border-slate-700/50 shadow-2xl">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-xl" />

            <div className="relative">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg"
                >
                  <User className="h-8 w-8 text-slate-900" />
                </motion.div>
                <h1 className="text-3xl font-bold text-white mb-2">Create an account</h1>
                <p className="text-slate-400">Register to access the dashboard and manage your training.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Full name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      className="w-full rounded-xl border border-slate-600 bg-slate-800/50 py-3 pl-10 pr-4 text-white placeholder-slate-400 backdrop-blur-sm transition-all focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Your full name"
                      {...register("full_name")}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      className="w-full rounded-xl border border-slate-600 bg-slate-800/50 py-3 pl-10 pr-4 text-white placeholder-slate-400 backdrop-blur-sm transition-all focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Enter your email"
                      {...register("email")}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full rounded-xl border border-slate-600 bg-slate-800/50 py-3 pl-10 pr-12 text-white placeholder-slate-400 backdrop-blur-sm transition-all focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Create a password"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-lg bg-red-500/10 border border-red-500/20 p-4"
                  >
                    <p className="text-sm text-red-400">{error}</p>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-yellow-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-slate-400">
                  Already have an account? <a href="/auth/login" className="text-yellow-400 hover:text-yellow-300 hover:underline">Sign in</a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
