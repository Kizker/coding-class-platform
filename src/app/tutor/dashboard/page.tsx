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
    <div className="min-h-screen bg-[#FDFBF7] text-black font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-9">
        {/* ======================================================== */}
        {/* 1. FOCUS HERO & INTEGRATED LEARNING SNAPSHOT (NEO)       */}
        {/* ======================================================== */}
        <section className="bg-white border-2.5 border-black p-6 sm:p-8 shadow-[5px_5px_0px_#000] space-y-6">
          {/* Top Date & Context Chip */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-3 border-b-2 border-black">
            <div className="flex items-center space-x-2 font-bold text-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] border border-black animate-pulse inline-block" />
              <span className="font-black uppercase tracking-tight" suppressHydrationWarning>
                {serverTime.dateFormatted}
              </span>
              <span className="font-black">&bull;</span>
              <span className="font-mono font-bold" suppressHydrationWarning>{serverTime.timeFormatted}</span>
            </div>

            <span className="px-3 py-1 bg-[#FEF08A] text-black font-black text-[11px] border-2 border-black shadow-[2px_2px_0px_#000] uppercase tracking-tight">
              Sesi Tatap Muka Live 16.00 WIB
            </span>
          </div>

          {/* Greeting, Intent & Primary CTAs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase">
                Halo, Mas Andri 👋
              </h1>
              <p className="text-xs sm:text-sm text-stone-800 max-w-xl leading-relaxed font-bold">
                Konsol bimbingan privat Andi Pratama untuk sesi tatap muka 2 jam, broadcast kode peraga, dan evaluasi nalar mingguan.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href={`/tutor/studio/${progress.currentWeek || 1}/jumat`}
                className="px-5 py-3 bg-[#FACC15] hover:bg-yellow-400 text-black border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all font-black text-xs flex items-center space-x-2 cursor-pointer uppercase tracking-tight group"
              >
                <Terminal className="w-4 h-4 stroke-[2.5] group-hover:scale-110 transition-transform" />
                <span>Buka Studio Mengajar</span>
                <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/tutor/reports"
                className="px-4 py-3 border-2 border-black bg-white hover:bg-[#FEF08A] text-black font-black text-xs shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center space-x-1.5 cursor-pointer uppercase tracking-tight"
              >
                <MessageSquare className="w-4 h-4 stroke-[2.5]" />
                <span>Rapor WhatsApp</span>
              </Link>
            </div>
          </div>

          {/* Integrated Learning Snapshot - Standardized Uniform Height Inner Boxes */}
          <div className="pt-4 border-t-2 border-black">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
              {/* Stat 1: Next Schedule */}
              <div className="p-3.5 bg-white border-2 border-black shadow-[3px_3px_0px_#000] flex items-center space-x-3.5 h-[78px]">
                <div className="w-11 h-11 bg-[#FEF08A] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-xl shrink-0">
                  🗓️
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-black text-black truncate">
                    Jumat, 16.00 &ndash; 18.00 WIB
                  </div>
                  <div className="text-[11px] font-bold text-stone-700 uppercase truncate">
                    Pertemuan 1 &bull; Logika &amp; print()
                  </div>
                </div>
              </div>

              {/* Stat 2: Student Consistency */}
              <div className="p-3.5 bg-white border-2 border-black shadow-[3px_3px_0px_#000] flex items-center space-x-3.5 h-[78px]">
                <div className="w-11 h-11 bg-[#86EFAC] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-xl shrink-0">
                  🔥
                </div>
                <div className="min-w-0">
                  <div className="text-base sm:text-lg font-black text-black leading-tight truncate" suppressHydrationWarning>
                    {isMounted ? progress.streakDays : 3} Hari Berturut
                  </div>
                  <div className="text-[11px] font-bold text-stone-700 uppercase truncate">
                    PR Mandiri 3 Selesai (Pekan 1)
                  </div>
                </div>
              </div>

              {/* Stat 3: Curriculum Progress */}
              <div className="p-3.5 bg-white border-2 border-black shadow-[3px_3px_0px_#000] flex items-center space-x-3.5 h-[78px]">
                <div className="w-11 h-11 bg-[#FED7AA] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-xl shrink-0">
                  🌱
                </div>
                <div className="min-w-0">
                  <div className="text-base sm:text-lg font-black text-black leading-tight truncate" suppressHydrationWarning>
                    Pekan {isMounted ? progress.currentWeek : 1} dari 12
                  </div>
                  <div className="text-[11px] font-bold text-stone-700 uppercase truncate">
                    Fase 1: Fondasi Logika Dasar
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 pt-3 border-t-2 border-black space-y-2">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="uppercase tracking-tight">Status Kepatuhan Tugas Pekan {progress.currentWeek || 1}</span>
                <span className="bg-[#86EFAC] px-2 py-0.5 border border-black font-black uppercase text-[10px]">
                  PR Terverifikasi (Auto-Grader OK)
                </span>
              </div>
              <div className="w-full bg-white h-3.5 border-2 border-black shadow-[2px_2px_0px_#000] overflow-hidden p-0.5">
                <div
                  className="bg-[#4ADE80] h-full border-r-2 border-black transition-all duration-500"
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
          <div className="lg:col-span-7 bg-white border-2.5 border-black p-6 shadow-[5px_5px_0px_#000] space-y-4">
            <div>
              <h2 className="text-xl font-black text-black tracking-tight uppercase">
                Alur Kerja Mengajar
              </h2>
              <p className="text-xs text-stone-700 mt-0.5 font-bold">
                Akses cepat ruang tatap muka, meja koreksi tugas, dan komunikasi wali murid.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* Card 1: Studio Mengajar */}
              <Link
                href={`/tutor/studio/${progress.currentWeek || 1}/jumat`}
                className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-[#FEF08A] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-start justify-between gap-4 group cursor-pointer"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 bg-black text-[#FACC15] border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] group-hover:scale-105 transition-transform">
                    <Video className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-black text-black uppercase">
                        1. Studio Mengajar Live (Sesi 2 Jam)
                      </span>
                      <span className="px-2 py-0.5 bg-[#FEF08A] text-black border border-black text-[10px] font-black uppercase">
                        Hari Ini 16.00 WIB
                      </span>
                    </div>
                    <p className="text-xs text-stone-800 leading-relaxed font-bold">
                      Pedoman 4 langkah terpandu, editor peraga tutor, dan tombol 1-klik sinkronisasi kode ke layar siswa.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-black stroke-[3] group-hover:translate-x-1 transition shrink-0 mt-2" />
              </Link>

              {/* Card 2: Meja Evaluasi */}
              <Link
                href="/tutor/grading"
                className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-stone-50 hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-start justify-between gap-4 group cursor-pointer"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 bg-[#86EFAC] text-black border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] group-hover:scale-105 transition-transform">
                    <FileCheck2 className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-black text-black uppercase">
                        2. Meja Pemeriksaan &amp; Evaluasi Kualitatif
                      </span>
                      <span className="px-2 py-0.5 bg-[#86EFAC] text-black border border-black text-[10px] font-black uppercase">
                        4 PR Terverifikasi
                      </span>
                    </div>
                    <p className="text-xs text-stone-800 leading-relaxed font-bold">
                      Verifikasi kode mandiri siswa, periksa hasil uji assertion test Pyodide, dan perbarui narasi nalar.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-black stroke-[3] group-hover:translate-x-1 transition shrink-0 mt-2" />
              </Link>

              {/* Card 3: Rapor WhatsApp */}
              <Link
                href="/tutor/reports"
                className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-stone-50 hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-start justify-between gap-4 group cursor-pointer"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 bg-[#FED7AA] text-black border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-black text-black uppercase">
                        3. WhatsApp Report Dispatcher
                      </span>
                      <span className="px-2 py-0.5 bg-stone-100 text-black border border-black text-[10px] font-black uppercase">
                        Format Rapi Siap Kirim
                      </span>
                    </div>
                    <p className="text-xs text-stone-800 leading-relaxed font-bold">
                      Generate ringkasan perkembangan belajar mingguan siap kirim ke orang tua murid (Pak Bambang Pratama).
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-black stroke-[3] group-hover:translate-x-1 transition shrink-0 mt-2" />
              </Link>
            </div>
          </div>

          {/* RIGHT: CATATAN NALAR LOGIKA SISWA (5 COLS) */}
          <div className="lg:col-span-5 bg-white border-2.5 border-black p-6 shadow-[5px_5px_0px_#000] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div>
                <h2 className="text-xl font-black text-black tracking-tight uppercase">
                  Catatan Nalar Logika Siswa
                </h2>
                <p className="text-xs text-stone-700 mt-0.5 font-bold">
                  Observasi kualitatif nalar komputasi Andi Pratama.
                </p>
              </div>

              {/* Quote Card */}
              <div className="p-4 bg-[#FEF08A] border-2 border-black shadow-[3px_3px_0px_#000] text-xs text-black font-bold italic leading-relaxed">
                &ldquo;{progress.weeklyNote}&rdquo;
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-white border-2 border-black shadow-[2px_2px_0px_#000] space-y-0.5">
                  <span className="text-stone-700 text-[10px] block font-black uppercase">
                    Kehadiran Tatap Muka
                  </span>
                  <span className="text-black font-black text-sm" suppressHydrationWarning>
                    {isMounted ? progress.attendanceCount : 7} dari {isMounted ? progress.totalSessions : 24} Sesi
                  </span>
                </div>

                <div className="p-3.5 bg-[#86EFAC] border-2 border-black shadow-[2px_2px_0px_#000] space-y-0.5">
                  <span className="text-black text-[10px] block font-black uppercase">
                    Akumulasi Poin
                  </span>
                  <span className="text-black font-black text-sm" suppressHydrationWarning>
                    {isMounted ? progress.xpPoints : 340} XP Terkumpul
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-black">
              <Link
                href="/tutor/grading"
                className="w-full py-3 bg-[#FACC15] hover:bg-yellow-400 border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-black text-xs font-black transition flex items-center justify-center space-x-1.5 cursor-pointer uppercase tracking-tight"
              >
                <span>Perbarui Catatan untuk Orang Tua</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
