import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Mail, Lock } from "lucide-react";
import { useState } from "react";
import React from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      full_name: formData.get('full_name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const confirmPassword = formData.get('confirm_password');
    if (data.password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Registration successful! You can now login.');
        setIsRegisterModalOpen(false);
      } else {
        const error = await response.json();
        alert(`Registration failed: ${error.detail}`);
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative z-50 mb-8 flex items-center justify-between py-4"
    >
      <Link href="/" className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg" />
        <span className="text-xl font-bold text-white">Sports Academy</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-8 text-sm md:flex">
        <Link
          href="/about"
          className="text-slate-300 transition-colors hover:text-white hover:underline hover:underline-offset-4"
        >
          About
        </Link>
        <Link
          href="/programs"
          className="text-slate-300 transition-colors hover:text-white hover:underline hover:underline-offset-4"
        >
          Programs
        </Link>
        <Link
          href="/contact"
          className="text-slate-300 transition-colors hover:text-white hover:underline hover:underline-offset-4"
        >
          Contact
        </Link>
        <Link
          href="/auth/login"
          className="rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-2.5 font-medium text-white shadow-lg transition-all hover:shadow-yellow-500/25 hover:scale-105"
        >
          Login
        </Link>
        <button
          onClick={() => setIsRegisterModalOpen(true)}
          className="rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-2.5 font-bold text-white shadow-lg transition-all hover:shadow-yellow-500/25 hover:scale-105"
        >
          Register Now
        </button>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-white"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 mt-4 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700 p-6 shadow-2xl md:hidden"
        >
          <div className="flex flex-col gap-4">
            <Link
              href="/about"
              className="text-slate-300 transition-colors hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/programs"
              className="text-slate-300 transition-colors hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Programs
            </Link>
            <Link
              href="/contact"
              className="text-slate-300 transition-colors hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/auth/login"
              className="rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-2.5 font-medium text-white text-center shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsRegisterModalOpen(true);
              }}
              className="rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-2.5 font-bold text-white text-center shadow-lg"
            >
              Register Now
            </button>
          </div>
        </motion.nav>
      )}
    </motion.header>

    {/* Registration Modal */}
    <AnimatePresence>
      {isRegisterModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsRegisterModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Register Now</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  required
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-gray-900 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-gray-900 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password (min 8 characters)"
                  required
                  minLength={8}
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-gray-900 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  required
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-gray-900 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 py-3 font-bold text-white shadow-lg transition-all hover:shadow-yellow-500/25 hover:scale-105"
              >
                Register
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}

