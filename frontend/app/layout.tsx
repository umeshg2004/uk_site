import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Sports Academy Management",
  description: "Badminton academy management platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 antialiased">
        <div className="relative min-h-screen">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(120,119,198,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(251,191,36,0.03),transparent_50%)]" />

          <div className="relative mx-auto max-w-7xl px-4 py-6">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

