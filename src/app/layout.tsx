import type { Metadata } from "next";
import { ReactNode } from "react";
import "../index.css";
import { AuthProvider } from "../context/AuthContext";
import DashboardShell from "../components/layout/DashboardShell";

export const metadata: Metadata = {
  title: "Next.js Executive Dashboard",
  description: "Full-Stack React Dashboard built with Next.js App Router and TypeScript",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-900 text-slate-100 antialiased">
        <AuthProvider>
          <DashboardShell>
            {children}
          </DashboardShell>
        </AuthProvider>
      </body>
    </html>
  );
}