"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth/sessionContext";
import { CURRICULUM_DATA } from "@/data/curriculum";
import {
  Flame,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Lock,
} from "lucide-react";

export default function StudentDashboardPage() {
  const { progress } = useSession();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 border border-indigo-800/40 p-6 sm:p-8 shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Les Private 1-on-1 Intensif</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Halo, Andi Pratama! 👋
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                Kamu sedang berada di <strong className="text-indigo-300">Pekan ke-4 (Fungsi Modular & Capstone 1)</strong>. Konsistensi koding harianmu luar biasa!
              </p>
            </div>

            {/* Quick Action Button */}
            <div className="shrink-0">
              <Link
                href="/student/learn/1/senin"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition hover:scale-105 active:scale-95"
              >
                <span>Mulai PR Hari Ini</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Konsistensi Koding</span>
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-orange-400">
              {progress.streakDays} Hari 🔥
            </div>
            <p className="text-[11px] text-slate-400">
              Pertahankan streak dengan menyelesaikan PR Senin–Kamis!
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Poin Pengalaman</span>
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              {progress.xpPoints} XP ⚡
            </div>
            <p className="text-[11px] text-slate-400">
              Koleksi lencana baru akan terbuka di 500 XP!
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Kemajuan Roadmap</span>
              <BookOpen className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              Minggu {progress.currentWeek} / 12
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(progress.currentWeek / progress.totalWeeks) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Weekly Routine Grid (Senin s.d Minggu) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                <span>Jadwal Belajar Pekan Ini</span>
              </h2>
              <p className="text-xs text-slate-400">
                15–20 menit di hari kerja, 2 jam les tatap muka langsung di akhir pekan.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-semibold">
              Pekan 4: Fungsi & Capstone 1
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {/* Senin */}
            <Link
              href="/student/learn/1/senin"
              className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/40 hover:border-emerald-500 transition group space-y-2"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-300">SENIN</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xs font-semibold text-white group-hover:text-indigo-300">
                PR 1: Recall
              </div>
              <div className="text-[10px] text-slate-500">15 Menit &bull; Selesai</div>
            </Link>

            {/* Selasa */}
            <Link
              href="/student/learn/1/selasa"
              className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/40 hover:border-emerald-500 transition group space-y-2"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-300">SELASA</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xs font-semibold text-white group-hover:text-indigo-300">
                PR 2: Code Read
              </div>
              <div className="text-[10px] text-slate-500">15 Menit &bull; Selesai</div>
            </Link>

            {/* Rabu */}
            <Link
              href="/student/learn/1/rabu"
              className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/40 hover:border-emerald-500 transition group space-y-2"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-300">RABU</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xs font-semibold text-white group-hover:text-indigo-300">
                PR 3: Debugging
              </div>
              <div className="text-[10px] text-slate-500">20 Menit &bull; Selesai</div>
            </Link>

            {/* Kamis */}
            <Link
              href="/student/learn/1/kamis"
              className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/50 hover:border-indigo-400 transition group space-y-2 ring-1 ring-indigo-500/30"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-indigo-400">KAMIS</span>
                <Clock className="w-4 h-4 text-indigo-400 animate-pulse" />
              </div>
              <div className="text-xs font-semibold text-white group-hover:text-indigo-300">
                PR 4: Pre-read
              </div>
              <div className="text-[10px] text-indigo-300 font-medium">PR Hari Ini!</div>
            </Link>

            {/* Jumat */}
            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-700/60 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-indigo-300">JUMAT</span>
                <span className="text-[9px] bg-indigo-900 px-1.5 py-0.5 rounded text-indigo-200">2 JAM</span>
              </div>
              <div className="text-xs font-bold text-white">
                Les Privat 1
              </div>
              <div className="text-[10px] text-indigo-300">16.00 - 18.00 WIB</div>
            </div>

            {/* Sabtu */}
            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-700/60 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-indigo-300">SABTU</span>
                <span className="text-[9px] bg-indigo-900 px-1.5 py-0.5 rounded text-indigo-200">2 JAM</span>
              </div>
              <div className="text-xs font-bold text-white">
                Les Privat 2
              </div>
              <div className="text-[10px] text-indigo-300">16.00 - 18.00 WIB</div>
            </div>

            {/* Minggu */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 opacity-60">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-400">MINGGU</span>
                <span className="text-[10px]">☕</span>
              </div>
              <div className="text-xs font-medium text-slate-300">
                Rest & Report
              </div>
              <div className="text-[10px] text-slate-500">Rapor Terbit</div>
            </div>
          </div>
        </div>

        {/* 12-Week Roadmap Accordion / List */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span>Roadmap 12 Minggu: Dari Nol Menuju Portofolio</span>
            </h2>
            <span className="text-xs text-slate-400">Python Track</span>
          </div>

          <div className="space-y-3">
            {CURRICULUM_DATA.map((w) => {
              const isCurrent = w.week === progress.currentWeek;
              const isCompleted = w.week < progress.currentWeek;
              const isLocked = w.week > progress.currentWeek;

              return (
                <div
                  key={w.week}
                  className={`p-4 rounded-xl border transition flex items-center justify-between gap-4 ${
                    isCurrent
                      ? "bg-indigo-950/40 border-indigo-500/60 shadow-lg shadow-indigo-950/50"
                      : isCompleted
                      ? "bg-slate-900/60 border-emerald-500/30"
                      : "bg-slate-950/60 border-slate-800/80 opacity-60"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                        isCurrent
                          ? "bg-indigo-600 text-white"
                          : isCompleted
                          ? "bg-emerald-600/30 text-emerald-400 border border-emerald-500/40"
                          : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : `M${w.week}`}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          Fase {w.phase}: {w.phaseTitle}
                        </span>
                        {w.capstoneInfo && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                            🏆 CAPSTONE PROYEK
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-white">{w.title}</h3>
                      <p className="text-xs text-slate-400 hidden sm:block">{w.description}</p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isCurrent ? (
                      <Link
                        href={`/student/learn/${w.week}/senin`}
                        className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                      >
                        Buka Materi &rarr;
                      </Link>
                    ) : isCompleted ? (
                      <Link
                        href={`/student/learn/${w.week}/senin`}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
                      >
                        Review
                      </Link>
                    ) : (
                      <span className="flex items-center space-x-1 text-xs text-slate-500">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Terkunci</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
