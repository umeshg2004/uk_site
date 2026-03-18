import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm">BTA</span>
              </div>
              <span className="text-white font-bold text-xl">Badminton Academy</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Excellence in badminton training. Creating champions since 2020.
              Join our community of dedicated players and experienced coaches.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#about" className="text-slate-400 hover:text-yellow-400 transition-colors">About Us</Link></li>
              <li><Link href="#programs" className="text-slate-400 hover:text-yellow-400 transition-colors">Programs</Link></li>
              <li><Link href="#coaches" className="text-slate-400 hover:text-yellow-400 transition-colors">Coaches</Link></li>
              <li><Link href="#achievements" className="text-slate-400 hover:text-yellow-400 transition-colors">Achievements</Link></li>
              <li><Link href="#contact" className="text-slate-400 hover:text-yellow-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-semibold mb-4">Programs</h3>
            <ul className="space-y-2">
              <li><Link href="#programs" className="text-slate-400 hover:text-yellow-400 transition-colors">Beginner Program</Link></li>
              <li><Link href="#programs" className="text-slate-400 hover:text-yellow-400 transition-colors">Intermediate Program</Link></li>
              <li><Link href="#programs" className="text-slate-400 hover:text-yellow-400 transition-colors">Advanced Program</Link></li>
              <li><Link href="#programs" className="text-slate-400 hover:text-yellow-400 transition-colors">Professional Program</Link></li>
              <li><Link href="/auth/login" className="text-slate-400 hover:text-yellow-400 transition-colors">Student Portal</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <div className="space-y-2 mb-4">
              <p className="text-slate-400 text-sm">+91 98765 43210</p>
              <p className="text-slate-400 text-sm">info@badmintonacademy.com</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2024 Badminton Training Academy. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-slate-400 hover:text-yellow-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-yellow-400 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}