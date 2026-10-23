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
  const { role, currentUser, isAuthenticated, logout, progress, isMounted } = useSession();

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
              <div className="w-8 h-8 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
                Py
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold tracking-tight text-stone-900">
                  PyStudio
                </span>
                <span className="text-[10px] text-stone-500 font-medium leading-none">
                  Private Mentoring
                </span>
              </div>
            </Link>

            {/* Role Navigation Links (Only visible when logged in) */}
            {isAuthenticated && (
              <nav className="hidden md:flex items-center space-x-1 text-xs">
                {role === "student" && (
                  <>
                    <Link
                      href="/student/dashboard"
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        pathname === "/student/dashboard"
                          ? "bg-stone-900 text-white shadow-xs font-semibold"
                          : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/student/assignments"
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        pathname === "/student/assignments"
                          ? "bg-stone-900 text-white shadow-xs font-semibold"
                          : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                      }`}
                    >
                      Tugas Harian
                    </Link>
                  </>
                )}

                {role === "tutor" && (
                  <>
                    <Link
                      href="/tutor/dashboard"
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        pathname === "/tutor/dashboard"
                          ? "bg-stone-900 text-white shadow-xs font-semibold"
                          : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href={`/tutor/studio/${progress?.currentWeek || 1}/jumat`}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        pathname.startsWith("/tutor/studio")
                          ? "bg-stone-900 text-white shadow-xs font-semibold"
                          : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                      }`}
                    >
                      Studio Mengajar
                    </Link>
                    <Link
                      href="/tutor/grading"
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        pathname === "/tutor/grading"
                          ? "bg-stone-900 text-white shadow-xs font-semibold"
                          : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                      }`}
                    >
                      Evaluasi PR
                    </Link>
                    <Link
                      href="/tutor/reports"
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        pathname === "/tutor/reports"
                          ? "bg-stone-900 text-white shadow-xs font-semibold"
                          : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
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
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        pathname === "/parent/overview"
                          ? "bg-stone-900 text-white shadow-xs font-semibold"
                          : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                      }`}
                    >
                      Ringkasan
                    </Link>
                    <Link
                      href="/parent/reports"
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        pathname === "/parent/reports"
                          ? "bg-stone-900 text-white shadow-xs font-semibold"
                          : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                      }`}
                    >
                      Catatan Pengajar
                    </Link>
                    <Link
                      href="/parent/showcase"
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        pathname === "/parent/showcase"
                          ? "bg-stone-900 text-white shadow-xs font-semibold"
                          : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                      }`}
                    >
                      Karya Anak
                    </Link>
                    <Link
                      href="/parent/schedule"
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        pathname === "/parent/schedule"
                          ? "bg-stone-900 text-white shadow-xs font-semibold"
                          : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
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
                  <div className="hidden sm:flex items-center space-x-2 text-xs text-stone-600 px-3 py-1.5 rounded-xl bg-stone-100/80 border border-stone-200/70 font-medium">
                    <span className="flex items-center space-x-1">
                      <span>🔥</span>
                      <strong className="text-stone-900" suppressHydrationWarning>
                        {isMounted ? progress.streakDays : 5} Hari
                      </strong>
                    </span>
                    <span className="text-stone-300">&bull;</span>
                    <span className="flex items-center space-x-1">
                      <span>⚡</span>
                      <strong className="text-stone-900" suppressHydrationWarning>
                        {isMounted ? progress.xpPoints : 340} XP
                      </strong>
                    </span>
                  </div>
                )}

                {/* Role Profile Badge */}
                <div className="flex items-center space-x-2.5 pl-2 border-l border-stone-200">
                  <div
                    className="w-8 h-8 rounded-full bg-stone-200 text-stone-800 flex items-center justify-center font-bold text-xs shadow-2xs"
                    suppressHydrationWarning
                  >
                    {isMounted ? currentUser.initials : "AP"}
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span
                      className="text-xs font-semibold text-stone-900 leading-tight"
                      suppressHydrationWarning
                    >
                      {isMounted ? currentUser.name : "Andi Pratama"}
                    </span>
                    <span
                      className="text-[10px] text-stone-500 font-medium leading-tight"
                      suppressHydrationWarning
                    >
                      {isMounted
                        ? role === "student"
                          ? "Siswa Private"
                          : role === "tutor"
                          ? "Lead Tutor"
                          : "Wali Murid"
                        : "Siswa Private"}
                    </span>
                  </div>
                </div>

                {/* Logout / Switch Account Button */}
                <button
                  onClick={handleLogout}
                  title="Ganti Akun / Keluar"
                  className="px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-stone-600 text-xs font-medium transition flex items-center space-x-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Keluar</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
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
