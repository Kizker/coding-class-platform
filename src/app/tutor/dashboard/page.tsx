"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth/sessionContext";
import { useServerTime } from "@/hooks/useServerTime";
import {
  Clock,
  ArrowRight,
  Terminal,
  MessageSquare,
  CheckCircle2,
  Video,
  FileCheck2,
  Flame,
  Sparkles,
  ChevronRight,
  User,
} from "lucide-react";

export default function TutorDashboardPage() {
  const { progress, isMounted } = useSession();
  const { serverTime } = useServerTime(15000);

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-900 py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-5xl mx-auto space-y-9">
        {/* ======================================================== */}
        {/* 1. FOCUS HERO & INTEGRATED LEARNING SNAPSHOT             */}
        {/* ======================================================== */}
        <section className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-6">
          {/* Top Date & Context Chip */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 pb-3 border-b border-stone-100">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              <span className="font-medium text-stone-700" suppressHydrationWarning>
                {serverTime.dateFormatted}
              </span>
              <span className="text-stone-300">&bull;</span>
              <span suppressHydrationWarning>{serverTime.timeFormatted}</span>
            </div>

            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-medium text-[11px] border border-indigo-100">
              Sesi Tatap Muka Live 16.00 WIB
            </span>
          </div>

          {/* Greeting, Intent & Primary CTAs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Halo, Mas Andri 👋
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 max-w-xl leading-relaxed">
                Konsol bimbingan privat Andi Pratama untuk sesi tatap muka 2 jam, broadcast kode peraga, dan evaluasi nalar mingguan.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href={`/tutor/studio/${progress.currentWeek || 1}/jumat`}
                className="px-5 py-2.5 rounded-xl bg-stone-900 text-white font-semibold text-xs hover:bg-stone-800 transition flex items-center space-x-2 shadow-xs group cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-stone-300 group-hover:scale-110 transition-transform" />
                <span>Buka Studio Mengajar</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/tutor/reports"
                className="px-4 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 font-medium text-xs transition flex items-center space-x-1.5 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-stone-500" />
                <span>Rapor WhatsApp</span>
              </Link>
            </div>
          </div>

          {/* Integrated Learning Snapshot (Matching Student Style) */}
          <div className="pt-4 border-t border-stone-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
              {/* Stat 1: Next Schedule */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200/60 flex items-center justify-center text-lg shrink-0">
                  🗓️
                </div>
                <div>
                  <div className="text-base font-bold text-stone-900">
                    Jumat, 16.00 &ndash; 18.00 WIB
                  </div>
                  <div className="text-xs text-stone-500 font-medium">
                    Pertemuan 1 &bull; Logika Komputer, IPO &amp; print()
                  </div>
                </div>
              </div>

              {/* Stat 2: Student Consistency */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-lg shrink-0">
                  🔥
                </div>
                <div>
                  <div className="text-base font-bold text-stone-900" suppressHydrationWarning>
                    {isMounted ? progress.streakDays : 3} Hari Berturut
                  </div>
                  <div className="text-xs text-stone-500 font-medium">
                    PR Mandiri 3 Selesai (Pekan 1)
                  </div>
                </div>
              </div>

              {/* Stat 3: Curriculum Progress */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-lg shrink-0">
                  🌱
                </div>
                <div>
                  <div className="text-base font-bold text-stone-900" suppressHydrationWarning>
                    Pekan {isMounted ? progress.currentWeek : 1} dari 12
                  </div>
                  <div className="text-xs text-stone-500 font-medium">
                    Fase 1: Fondasi Logika &amp; Komputasi Dasar
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle Progress Bar */}
            <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5">
              <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>Status Kepatuhan Tugas Pekan {progress.currentWeek || 1}</span>
                <span className="font-semibold text-stone-800">PR Terverifikasi (Auto-Grader OK)</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.round(((progress.currentWeek || 1) / 12) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. MAIN WORKSPACE: MENTOR ACTIONS & PEDAGOGICAL INSIGHTS */}
        {/* ======================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: AKTIVITAS UTAMA MENTOR (7 COLS) */}
          <div className="lg:col-span-7 bg-white border border-stone-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
            <div>
              <h2 className="text-lg font-bold text-stone-900 tracking-tight">
                Alur Kerja Mengajar
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Akses cepat ruang tatap muka, meja koreksi tugas, dan komunikasi wali murid.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* Card 1: Studio Mengajar */}
              <Link
                href={`/tutor/studio/${progress.currentWeek || 1}/jumat`}
                className="p-4 rounded-xl border border-stone-200/80 hover:border-stone-400 bg-stone-50/50 hover:bg-white transition-all flex items-start justify-between gap-4 group cursor-pointer"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <Video className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-stone-900">
                        1. Studio Mengajar Live (Sesi 2 Jam)
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-semibold border border-indigo-100">
                        Hari Ini 16.00 WIB
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      Pedoman 4 langkah terpandu, editor peraga tutor, dan tombol 1-klik sinkronisasi kode ke layar siswa.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 transition shrink-0 mt-2" />
              </Link>

              {/* Card 2: Meja Evaluasi */}
              <Link
                href="/tutor/grading"
                className="p-4 rounded-xl border border-stone-200/80 hover:border-stone-400 bg-stone-50/50 hover:bg-white transition-all flex items-start justify-between gap-4 group cursor-pointer"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0 border border-stone-200 group-hover:scale-105 transition-transform">
                    <FileCheck2 className="w-4 h-4 text-stone-700" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-stone-900">
                        2. Meja Pemeriksaan &amp; Evaluasi Kualitatif
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-100">
                        4 PR Terverifikasi
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      Verifikasi kode mandiri siswa, periksa hasil uji assertion test Pyodide, dan perbarui narasi nalar.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 transition shrink-0 mt-2" />
              </Link>

              {/* Card 3: Rapor WhatsApp */}
              <Link
                href="/tutor/reports"
                className="p-4 rounded-xl border border-stone-200/80 hover:border-stone-400 bg-stone-50/50 hover:bg-white transition-all flex items-start justify-between gap-4 group cursor-pointer"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0 border border-stone-200 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-4 h-4 text-stone-700" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-stone-900">
                        3. WhatsApp Report Dispatcher
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-semibold border border-stone-200">
                        Format Rapi Siap Kirim
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      Generate ringkasan perkembangan belajar mingguan siap kirim ke orang tua murid (Pak Bambang Pratama).
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 transition shrink-0 mt-2" />
              </Link>
            </div>
          </div>

          {/* RIGHT: CATATAN NALAR LOGIKA SISWA (5 COLS) */}
          <div className="lg:col-span-5 bg-white border border-stone-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div>
                <h2 className="text-lg font-bold text-stone-900 tracking-tight">
                  Catatan Nalar Logika Siswa
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Observasi kualitatif nalar komputasi Andi Pratama.
                </p>
              </div>

              {/* Quote Card */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60 text-xs text-stone-700 italic leading-relaxed">
                &ldquo;{progress.weeklyNote}&rdquo;
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-stone-50/70 rounded-xl border border-stone-200/60 space-y-0.5">
                  <span className="text-stone-500 text-[10px] block font-semibold">
                    Kehadiran Tatap Muka
                  </span>
                  <span className="text-stone-900 font-bold text-xs" suppressHydrationWarning>
                    {isMounted ? progress.attendanceCount : 7} dari {isMounted ? progress.totalSessions : 24} Sesi
                  </span>
                </div>

                <div className="p-3.5 bg-stone-50/70 rounded-xl border border-stone-200/60 space-y-0.5">
                  <span className="text-stone-500 text-[10px] block font-semibold">
                    Akumulasi Poin
                  </span>
                  <span className="text-emerald-700 font-bold text-xs" suppressHydrationWarning>
                    {isMounted ? progress.xpPoints : 340} XP Terkumpul
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <Link
                href="/tutor/grading"
                className="w-full py-2.5 rounded-xl border border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold transition flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Perbarui Catatan untuk Orang Tua</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
