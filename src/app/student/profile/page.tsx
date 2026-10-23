"use client";

import React from "react";
import { useSession } from "@/lib/auth/sessionContext";
import {
  GraduationCap,
  Award,
  Flame,
  CheckCircle2,
  Calendar,
  Sparkles,
  Download,
} from "lucide-react";

export default function StudentProfilePage() {
  const { currentUser, progress } = useSession();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-slate-900 border border-indigo-800/40 shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-4xl shadow-lg shrink-0">
            {currentUser.avatar}
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Siswa Les Privat 1-on-1</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {currentUser.email} &bull; Mentor: Kak Tutor (Andri)
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
              <span className="flex items-center space-x-1 text-xs px-2.5 py-1 rounded-full bg-orange-950/60 border border-orange-700/60 text-orange-300 font-semibold">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>{progress.streakDays} Hari Streak</span>
              </span>
              <span className="flex items-center space-x-1 text-xs px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-700/60 text-amber-300 font-semibold">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{progress.xpPoints} Total XP</span>
              </span>
              <span className="flex items-center space-x-1 text-xs px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{progress.completedAssignments} PR Selesai</span>
              </span>
            </div>
          </div>
        </div>

        {/* Badges Collection */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Koleksi Lencana Penghargaan (Badges)</span>
            </h2>
            <span className="text-xs text-slate-400">
              {progress.badges.length} dari 10 Terbuka
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {progress.badges.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 text-center space-y-2 shadow-md hover:scale-105 transition"
              >
                <div className="text-3xl mx-auto w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                  {b.icon}
                </div>
                <div className="text-xs font-bold text-white">{b.name}</div>
                <div className="text-[10px] text-amber-400/80 font-medium">
                  {b.unlockedAt}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Section */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
              <span>E-Sertifikat Kelulusan Resmi</span>
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-700 font-semibold">
              Fase 1 Lulus &bull; Fase Akhir di M12
            </span>
          </div>

          <div className="p-6 rounded-xl border border-indigo-700/50 bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-950 space-y-3 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  Sertifikat Milestone: Fondasi Logika & Komputasi Dasar (Fase 1)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Diberikan atas keberhasilan menyelesaikan Modul 1 s.d Modul 4 dan Proyek Capstone 1 Game CLI.
                </p>
              </div>

              <button
                onClick={() => alert("Mengunduh sertifikat digital (PDF)...")}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-lg shadow-indigo-600/30 cursor-pointer shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Sertifikat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
