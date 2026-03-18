"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navbar } from "@/components/navbar";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const schema = z.object({
  first_name: z.string().min(2, "First name required"),
  last_name: z.string().min(2, "Last name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setSuccess(false);
    setError(null);
    try {
      await api.post("/contact", data);
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (e: any) {
      setError(e?.response?.data?.detail ?? "Failed to send message");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-xl text-slate-400">We'd love to hear from you. Send us a message!</p>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Academy Details</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-yellow-400/20 rounded-xl p-3 h-fit">
                      <MapPin className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Address</h3>
                      <p className="text-slate-400">Sports Academy Badminton Center</p>
                      <p className="text-slate-400">Example Road, Your City, India</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-yellow-400/20 rounded-xl p-3 h-fit">
                      <Phone className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Phone</h3>
                      <p className="text-slate-400">+91-90000-00000</p>
                      <p className="text-slate-400">Mon-Fri: 9AM - 6PM</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-yellow-400/20 rounded-xl p-3 h-fit">
                      <Mail className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Email</h3>
                      <p className="text-slate-400">info@sportsacademy.test</p>
                      <p className="text-slate-400">support@sportsacademy.test</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 backdrop-blur-md border border-slate-700/50"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 rounded-lg bg-green-500/10 border border-green-500/20 p-4"
                >
                  <p className="text-sm text-green-400">✅ Message sent successfully! We'll get back to you soon.</p>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 p-4"
                >
                  <p className="text-sm text-red-400">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                    <input
                      type="text"
                      placeholder="Your first name"
                      className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-yellow-400 focus:outline-none"
                      {...register("first_name")}
                    />
                    {errors.first_name && <p className="text-red-400 text-xs mt-1">{errors.first_name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      placeholder="Your last name"
                      className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-yellow-400 focus:outline-none"
                      {...register("last_name")}
                    />
                    {errors.last_name && <p className="text-red-400 text-xs mt-1">{errors.last_name.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-yellow-400 focus:outline-none"
                    {...register("email")}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-yellow-400 focus:outline-none"
                    {...register("phone")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your badminton goals..."
                    className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-yellow-400 focus:outline-none resize-none"
                    {...register("message")}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 py-3 text-lg font-semibold text-slate-900 shadow-lg hover:shadow-yellow-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

