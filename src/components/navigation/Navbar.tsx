"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, UserRole } from "@/lib/auth/sessionContext";
import {
  Terminal,
  LogOut,
  LogIn,
  User,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { role, currentUser, isAuthenticated, logout, progress } = useSession();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center group-hover:border-blue-400 transition">
                <Terminal className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-tight text-slate-900 uppercase">
                  PY_STUDIO // 1-ON-1
                </span>
                <span className="text-[10px] text-slate-500 font-mono tracking-tight">
                  PYTHON TRACK v2.1
                </span>
              </div>
            </Link>

            {/* Role Navigation Links (Only visible when logged in) */}
            {isAuthenticated && (
              <nav className="hidden md:flex items-center space-x-1 text-xs font-medium">
                {role === "student" && (
                  <>
                    <Link
                      href="/student/dashboard"
                      className={`px-3 py-1.5 rounded-md transition ${
                        pathname === "/student/dashboard"
                          ? "bg-blue-50 text-blue-700 font-semibold border border-blue-200"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/student/learn/1/senin"
                      className={`px-3 py-1.5 rounded-md transition ${
                        pathname.startsWith("/student/learn")
                          ? "bg-blue-50 text-blue-700 font-semibold border border-blue-200"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      Split Studio
                    </Link>
                    <Link
                      href="/student/assignments"
                      className={`px-3 py-1.5 rounded-md transition ${
                        pathname === "/student/assignments"
                          ? "bg-blue-50 text-blue-700 font-semibold border border-blue-200"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      Tugas Harian
                    </Link>
                    <Link
                      href="/student/capstone/1"
                      className={`px-3 py-1.5 rounded-md transition ${
                        pathname.startsWith("/student/capstone")
                          ? "bg-blue-50 text-blue-700 font-semibold border border-blue-200"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      Capstone
                    </Link>
                    <Link
                      href="/student/profile"
                      className={`px-3 py-1.5 rounded-md transition ${
                        pathname === "/student/profile"
                          ? "bg-blue-50 text-blue-700 font-semibold border border-blue-200"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      Profil & Sertifikat
                    </Link>
                  </>
                )}

                {role === "tutor" && (
                  <>
                    <Link
                      href="/tutor/dashboard"
                      className={`px-3 py-1.5 rounded-md transition ${
                        pathname === "/tutor/dashboard"
                          ? "bg-amber-50 text-amber-800 font-semibold border border-amber-200"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      Command Center
                    </Link>
                    <Link
                      href="/tutor/studio/1/jumat"
                      className={`px-3 py-1.5 rounded-md transition ${
                        pathname.startsWith("/tutor/studio")
                          ? "bg-amber-50 text-amber-800 font-semibold border border-amber-200"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      Teaching Studio
                    </Link>
                    <Link
                      href="/tutor/grading"
                      className={`px-3 py-1.5 rounded-md transition ${
                        pathname === "/tutor/grading"
                          ? "bg-amber-50 text-amber-800 font-semibold border border-amber-200"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      Evaluasi PR
                    </Link>
                    <Link
                      href="/tutor/reports"
                      className={`px-3 py-1.5 rounded-md transition ${
                        pathname === "/tutor/reports"
                          ? "bg-amber-50 text-amber-800 font-semibold border border-amber-200"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      Rapor WhatsApp
                    </Link>
                  </>
                )}

                {role === "parent" && (
                  <>
                    <Link
                      href="/parent/overview"
                      className={`px-3 py-1.5 rounded-md transition ${
                        pathname === "/parent/overview"
                          ? "bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      Ringkasan
                    </Link>
                    <Link
                      href="/parent/reports"
                      className={`px-3 py-1.5 rounded-md transition ${
                        pathname === "/parent/reports"
                          ? "bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      Catatan Pengajar
                    </Link>
                    <Link
                      href="/parent/showcase"
                      className={`px-3 py-1.5 rounded-md transition ${
                        pathname === "/parent/showcase"
                          ? "bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      Karya Anak
                    </Link>
                    <Link
                      href="/parent/schedule"
                      className={`px-3 py-1.5 rounded-md transition ${
                        pathname === "/parent/schedule"
                          ? "bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      Jadwal Sesi
                    </Link>
                  </>
                )}
              </nav>
            )}
          </div>

          {/* Right Section: Telemetry & Authenticated User Control */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {/* Telemetry Indicator for Student */}
                {role === "student" && (
                  <div className="hidden sm:flex items-center space-x-2 font-mono text-[11px] text-slate-700 px-2.5 py-1 rounded bg-slate-100 border border-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                    <span className="text-slate-500">STREAK:</span>
                    <span className="font-semibold text-blue-700 tabular-nums">
                      {progress.streakDays.toString().padStart(2, "0")}D
                    </span>
                    <span className="text-slate-300">/</span>
                    <span className="font-semibold text-slate-800 tabular-nums">
                      {progress.xpPoints} XP
                    </span>
                  </div>
                )}

                {/* Role Profile Badge */}
                <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-mono text-xs font-bold text-slate-700">
                    {currentUser.initials}
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-semibold text-slate-900 leading-tight">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono leading-tight">
                      {currentUser.roleLabel}
                    </span>
                  </div>
                </div>

                {/* Logout / Switch Account Button */}
                <button
                  onClick={handleLogout}
                  title="Ganti Akun / Keluar"
                  className="px-2.5 py-1.5 rounded-md border border-slate-200 bg-slate-50 hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-slate-600 text-xs font-medium transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Keluar</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition flex items-center space-x-1.5 shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Masuk Portal</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
