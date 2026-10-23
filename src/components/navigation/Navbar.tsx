"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, UserRole } from "@/lib/auth/sessionContext";
import {
  Code2,
  Flame,
  GraduationCap,
  Sparkles,
  BookOpen,
  Calendar,
  Award,
  Users,
  MessageSquare,
  FileText,
  Eye,
  CheckCircle2,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { role, setRole, currentUser, progress } = useSession();

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  Les Koding Privat
                </span>
                <span className="text-[10px] block text-indigo-400 font-medium">
                  Python Track 1-on-1
                </span>
              </div>
            </Link>
          </div>

          {/* Role Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {role === "student" && (
              <>
                <Link
                  href="/student/dashboard"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                    pathname === "/student/dashboard"
                      ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/student/learn/1/senin"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                    pathname.startsWith("/student/learn")
                      ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Split-Screen Studio</span>
                </Link>
                <Link
                  href="/student/assignments"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                    pathname === "/student/assignments"
                      ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PR Harian</span>
                </Link>
                <Link
                  href="/student/capstone/1"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                    pathname.startsWith("/student/capstone")
                      ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Capstone</span>
                </Link>
                <Link
                  href="/student/profile"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                    pathname === "/student/profile"
                      ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Profil & Badges</span>
                </Link>
              </>
            )}

            {role === "tutor" && (
              <>
                <Link
                  href="/tutor/dashboard"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                    pathname === "/tutor/dashboard"
                      ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Command Center</span>
                </Link>
                <Link
                  href="/tutor/studio/1/jumat"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                    pathname.startsWith("/tutor/studio")
                      ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Teaching Studio (Live)</span>
                </Link>
                <Link
                  href="/tutor/grading"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                    pathname === "/tutor/grading"
                      ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Meja Penilaian</span>
                </Link>
                <Link
                  href="/tutor/reports"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                    pathname === "/tutor/reports"
                      ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Rapor WhatsApp</span>
                </Link>
              </>
            )}

            {role === "parent" && (
              <>
                <Link
                  href="/parent/overview"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                    pathname === "/parent/overview"
                      ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Beranda Monitoring</span>
                </Link>
                <Link
                  href="/parent/reports"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                    pathname === "/parent/reports"
                      ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Catatan Pengajar</span>
                </Link>
                <Link
                  href="/parent/showcase"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                    pathname === "/parent/showcase"
                      ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dokumentasi Karya</span>
                </Link>
                <Link
                  href="/parent/schedule"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                    pathname === "/parent/schedule"
                      ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Jadwal Les 2 Jam</span>
                </Link>
              </>
            )}
          </nav>

          {/* Right Section: Role Switcher Pill & Streak Badge */}
          <div className="flex items-center space-x-3">
            {/* Streak Badge for Student */}
            {role === "student" && (
              <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold shadow-inner">
                <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
                <span>{progress.streakDays} Hari Streak!</span>
              </div>
            )}

            {/* Quick Role Switcher Dropdown / Pills */}
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center space-x-1 text-xs">
              <button
                onClick={() => handleRoleChange("student")}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  role === "student"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
                title="Beralih ke Sudut Pandang Siswa"
              >
                👦 Siswa
              </button>
              <button
                onClick={() => handleRoleChange("tutor")}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  role === "tutor"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
                title="Beralih ke Sudut Pandang Pengajar"
              >
                👨‍🏫 Pengajar
              </button>
              <button
                onClick={() => handleRoleChange("parent")}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  role === "parent"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-white/90 hover:text-slate-200 hover:bg-slate-900"
                }`}
                title="Beralih ke Sudut Pandang Orang Tua (Read-Only)"
              >
                👨‍💼 Ortu
              </button>
            </div>

            {/* Active User Avatar */}
            <div className="hidden sm:flex items-center space-x-2 pl-2 border-l border-slate-800">
              <span className="text-xl">{currentUser.avatar}</span>
              <div className="text-left">
                <span className="block text-xs font-semibold text-slate-200 leading-tight">
                  {currentUser.name}
                </span>
                <span className="block text-[10px] text-slate-400 leading-tight">
                  {currentUser.subtitle}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
