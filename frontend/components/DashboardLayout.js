"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopNavbar } from "@/components/Navbar";

export function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      <Sidebar
        collapsed={collapsed}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
      />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNavbar
          collapsed={collapsed}
          onToggleSidebar={() => setCollapsed((prev) => !prev)}
          onOpenMobileSidebar={() => setMobileOpen(true)}
        />
        <main className="flex-1 bg-[radial-gradient(circle_at_top,rgba(248,250,252,0.04),transparent_55%),radial-gradient(circle_at_bottom,rgba(250,204,21,0.06),transparent_60%)] px-4 py-6 md:px-6">
          {children}
        </main>
      </div>
    </div>
  );
}

