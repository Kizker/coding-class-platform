"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, UserRole } from "@/lib/auth/sessionContext";
import {
  Terminal,
  Compass,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Activity,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { role, setRole, currentUser, progress } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-[#090a0f]/90 backdrop-blur-md border-b border-white/[0.08] text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo & Brand - Swiss Utilitarian */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-md bg-white/[0.06] border border-white/[0.12] flex items-center justify-center group-hover:border-amber-500/50 transition">
                <Terminal className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs font-semibold tracking-wider text-slate-100 uppercase">
                  PY_STUDIO // 1-ON-1
                </span>
                <span className="text-[10px] text-slate-400 font-mono tracking-tight">
                  PYTHON TRACK v2.1
                </span>
              </div>
            </Link>

            {/* Role Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 text-xs font-mono">
              {role === "student" && (
                <>
                  <Link
                    href="/student/dashboard"
                    className={`px-3 py-1.5 rounded-md transition ${
                      pathname === "/student/dashboard"
                        ? "bg-white/[0.08] text-white border border-white/[0.15]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    DASHBOARD
                  </Link>
                  <Link
                    href="/student/learn/1/senin"
                    className={`px-3 py-1.5 rounded-md transition ${
                      pathname.startsWith("/student/learn")
                        ? "bg-white/[0.08] text-amber-400 border border-amber-500/30"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    SPLIT_STUDIO
                  </Link>
                  <Link
                    href="/student/assignments"
                    className={`px-3 py-1.5 rounded-md transition ${
                      pathname === "/student/assignments"
                        ? "bg-white/[0.08] text-white border border-white/[0.15]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    TUGAS_HARIAN
                  </Link>
                  <Link
                    href="/student/capstone/1"
                    className={`px-3 py-1.5 rounded-md transition ${
                      pathname.startsWith("/student/capstone")
                        ? "bg-white/[0.08] text-white border border-white/[0.15]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    CAPSTONE
                  </Link>
                  <Link
                    href="/student/profile"
                    className={`px-3 py-1.5 rounded-md transition ${
                      pathname === "/student/profile"
                        ? "bg-white/[0.08] text-white border border-white/[0.15]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    PROFIL
                  </Link>
                </>
              )}

              {role === "tutor" && (
                <>
                  <Link
                    href="/tutor/dashboard"
                    className={`px-3 py-1.5 rounded-md transition ${
                      pathname === "/tutor/dashboard"
                        ? "bg-white/[0.08] text-white border border-white/[0.15]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    COMMAND_CENTER
                  </Link>
                  <Link
                    href="/tutor/studio/1/jumat"
                    className={`px-3 py-1.5 rounded-md transition ${
                      pathname.startsWith("/tutor/studio")
                        ? "bg-white/[0.08] text-amber-400 border border-amber-500/30"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    TEACHING_STUDIO
                  </Link>
                  <Link
                    href="/tutor/grading"
                    className={`px-3 py-1.5 rounded-md transition ${
                      pathname === "/tutor/grading"
                        ? "bg-white/[0.08] text-white border border-white/[0.15]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    EVALUASI_PR
                  </Link>
                  <Link
                    href="/tutor/reports"
                    className={`px-3 py-1.5 rounded-md transition ${
                      pathname === "/tutor/reports"
                        ? "bg-white/[0.08] text-emerald-400 border border-emerald-500/30"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    RAPOR_WHATSAPP
                  </Link>
                </>
              )}

              {role === "parent" && (
                <>
                  <Link
                    href="/parent/overview"
                    className={`px-3 py-1.5 rounded-md transition ${
                      pathname === "/parent/overview"
                        ? "bg-white/[0.08] text-white border border-white/[0.15]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    RINGKASAN
                  </Link>
                  <Link
                    href="/parent/reports"
                    className={`px-3 py-1.5 rounded-md transition ${
                      pathname === "/parent/reports"
                        ? "bg-white/[0.08] text-white border border-white/[0.15]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    CATATAN_PENGAJAR
                  </Link>
                  <Link
                    href="/parent/showcase"
                    className={`px-3 py-1.5 rounded-md transition ${
                      pathname === "/parent/showcase"
                        ? "bg-white/[0.08] text-white border border-white/[0.15]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    KARYA_ANAK
                  </Link>
                  <Link
                    href="/parent/schedule"
                    className={`px-3 py-1.5 rounded-md transition ${
                      pathname === "/parent/schedule"
                        ? "bg-white/[0.08] text-white border border-white/[0.15]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    JADWAL_SESI
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* Right Section: Telemetry & Strict Role Selector */}
          <div className="flex items-center space-x-3">
            {/* Student Telemetry Indicator (Zero Emoji) */}
            {role === "student" && (
              <div className="hidden sm:flex items-center space-x-2 font-mono text-[11px] text-slate-300 px-2.5 py-1 rounded bg-[#10121a] border border-white/[0.08]">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                <span className="text-slate-400">STREAK:</span>
                <span className="font-semibold text-amber-400 tabular-nums">
                  {progress.streakDays.toString().padStart(2, "0")}D
                </span>
                <span className="text-slate-600">/</span>
                <span className="font-semibold text-slate-200 tabular-nums">
                  {progress.xpPoints} XP
                </span>
              </div>
            )}

            {/* Technical Role Selector */}
            <div className="flex items-center rounded bg-[#10121a] border border-white/[0.08] p-0.5 text-[11px] font-mono">
              <button
                onClick={() => setRole("student")}
                className={`px-2.5 py-1 rounded transition ${
                  role === "student"
                    ? "bg-white/[0.12] text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                STUDENT
              </button>
              <button
                onClick={() => setRole("tutor")}
                className={`px-2.5 py-1 rounded transition ${
                  role === "tutor"
                    ? "bg-white/[0.12] text-amber-400 font-semibold shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                TUTOR
              </button>
              <button
                onClick={() => setRole("parent")}
                className={`px-2.5 py-1 rounded transition ${
                  role === "parent"
                    ? "bg-white/[0.12] text-emerald-400 font-semibold shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                OBSERVER
              </button>
            </div>

            {/* Minimal User Monogram */}
            <div className="flex items-center space-x-2 pl-2 border-l border-white/[0.08]">
              <div className="w-7 h-7 rounded bg-[#151824] border border-white/[0.12] flex items-center justify-center font-mono text-xs font-bold text-slate-300">
                {currentUser.initials}
              </div>
              <div className="hidden lg:flex flex-col text-left font-mono">
                <span className="text-xs font-semibold text-slate-200 leading-tight">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-slate-400 leading-tight">
                  {currentUser.roleLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
