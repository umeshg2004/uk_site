import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  Calendar,
  CalendarCheck,
  BarChart3,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Students", href: "/students", icon: Users },
  { label: "Coaches", href: "/coaches", icon: Dumbbell },
  { label: "Programs", href: "/programs", icon: CalendarCheck },
  { label: "Sessions", href: "/sessions", icon: Calendar },
  { label: "Attendance", href: "/attendance", icon: CalendarCheck },
  { label: "Messages", href: "/dashboard/admin/messages", icon: MessageSquare },
  { label: "Payments", href: "/payments", icon: CreditCard },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({ collapsed = false, open = false, onClose, onToggleCollapse }) {
  const widthClass = collapsed ? "w-20" : "w-72";
  const itemTextClass = collapsed ? "hidden" : "block";

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <motion.aside
        initial={{ x: -240, opacity: 0 }}
        animate={{ x: open ? 0 : -240, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className={`fixed left-0 top-0 z-40 flex h-full flex-col border-r border-slate-800 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900/40 ${widthClass} md:static md:translate-x-0 md:flex`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 shadow-[0_0_0_1px_rgba(250,204,21,0.25)]" />
            <div className={`${itemTextClass}`}>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Badminton Academy
              </p>
              <p className="text-base font-semibold text-slate-100">Admin Panel</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleCollapse}
            className="rounded-xl border border-slate-800 bg-slate-900/50 p-2 text-slate-200 transition hover:bg-slate-800/60 md:hidden"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-2 py-4 text-sm">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-300 transition-all hover:bg-slate-800/60 hover:text-white"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-900/80 text-yellow-400 group-hover:bg-slate-900">
                  <Icon className="h-4 w-4" />
                </span>
                <span className={`font-medium ${itemTextClass}`}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 px-3 py-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-slate-300 transition-all hover:bg-slate-800/60 hover:text-white"
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("access_token");
                window.location.href = "/";
              }
            }}
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-900/80 text-slate-200">
              <LogOut className="h-4 w-4" />
            </span>
            <span className={`font-medium ${itemTextClass}`}>Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
}

