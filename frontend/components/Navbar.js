"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-slate-900 font-bold text-sm">BTA</span>
            </div>
            <span className="text-white font-bold text-xl">Badminton Academy</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="text-slate-300 hover:text-yellow-400 transition-colors">
              About
            </Link>
            <Link href="#programs" className="text-slate-300 hover:text-yellow-400 transition-colors">
              Programs
            </Link>
            <Link href="#coaches" className="text-slate-300 hover:text-yellow-400 transition-colors">
              Coaches
            </Link>
            <Link href="#achievements" className="text-slate-300 hover:text-yellow-400 transition-colors">
              Achievements
            </Link>
            <Link href="#testimonials" className="text-slate-300 hover:text-yellow-400 transition-colors">
              Testimonials
            </Link>
            <Link href="#contact" className="text-slate-300 hover:text-yellow-400 transition-colors">
              Contact
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login" className="text-slate-300 hover:text-yellow-400 transition-colors">
              Login
            </Link>
            <Link href="/auth/register" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
              Register Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 hover:text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800 rounded-lg mt-2">
              <Link href="#about" className="block px-3 py-2 text-slate-300 hover:text-yellow-400">
                About
              </Link>
              <Link href="#programs" className="block px-3 py-2 text-slate-300 hover:text-yellow-400">
                Programs
              </Link>
              <Link href="#coaches" className="block px-3 py-2 text-slate-300 hover:text-yellow-400">
                Coaches
              </Link>
              <Link href="#achievements" className="block px-3 py-2 text-slate-300 hover:text-yellow-400">
                Achievements
              </Link>
              <Link href="#testimonials" className="block px-3 py-2 text-slate-300 hover:text-yellow-400">
                Testimonials
              </Link>
              <Link href="#contact" className="block px-3 py-2 text-slate-300 hover:text-yellow-400">
                Contact
              </Link>
              <div className="border-t border-slate-700 mt-3 pt-3">
                <Link href="/auth/login" className="block px-3 py-2 text-slate-300 hover:text-yellow-400">
                  Login
                </Link>
                <Link href="/auth/register" className="block px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 rounded-lg font-semibold">
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Placeholder TopNavbar for dashboard compatibility
export function TopNavbar({ collapsed, onToggleSidebar, onOpenMobileSidebar }) {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="text-slate-300 hover:text-white"
          >
            ☰
          </button>
          <h1 className="text-white font-bold">Dashboard</h1>
        </div>
        <div className="text-slate-300">
          Welcome back!
        </div>
      </div>
    </nav>
  );
}

