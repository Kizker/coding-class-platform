"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth/sessionContext";
import {
  Clock,
  ArrowRight,
  Terminal,
  Activity,
  Layers,
  Send,
  MessageSquare,
} from "lucide-react";

export default function TutorDashboardPage() {
  const { progress } = useSession();

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-200 py-8 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Tutor Top Banner */}
        <div className="border border-white/[0.08] rounded-xl bg-[#0f1118] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-slate-400">
              01 // COMMAND CENTER &bull; LEAD TUTOR
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Sesi Mengajar &amp; Evaluasi Siswa
            </h1>
            <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Konsol terpadu untuk monitoring sesi les tatap muka 2 jam, rilis kode contoh langsung ke editor siswa, dan rekap rapor mingguan.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/tutor/studio/1/jumat"
              className="px-4 py-2.5 rounded bg-white text-black font-bold text-xs hover:bg-slate-200 transition flex items-center space-x-1.5"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>BUKA TEACHING STUDIO</span>
            </Link>
            <Link
              href="/tutor/reports"
              className="px-4 py-2.5 rounded bg-[#161a25] border border-white/[0.12] text-emerald-400 font-bold text-xs hover:bg-[#1c2130] transition flex items-center space-x-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>RAPOR WHATSAPP</span>
            </Link>
          </div>
        </div>

        {/* 3 Telemetry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-lg bg-[#0e1017] border border-white/[0.08] space-y-2">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>JADWAL_SESI_BERIKUTNYA</span>
              <Clock className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="text-xl font-bold text-white">
              JUMAT // 16.00 - 18.00 WIB
            </div>
            <p className="font-sans text-xs text-slate-400">
              Pertemuan 7: Fungsi Modular (def &amp; return) &bull; Durasi 2 Jam.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#0e1017] border border-white/[0.08] space-y-2">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>STATUS_SISWA</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="text-xl font-bold text-amber-400">
              ANDI PRATAMA (STREAK {progress.streakDays}D)
            </div>
            <p className="font-sans text-xs text-slate-400">
              PR harian tuntas 100%. Kemampuan logika kondisional matang.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#0e1017] border border-white/[0.08] space-y-2">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>ANTEAN_EVALUASI</span>
              <span className="text-emerald-400">PASSED</span>
            </div>
            <div className="text-xl font-bold text-emerald-400">
              SEMUA PR TERVERIFIKASI
            </div>
            <p className="font-sans text-xs text-slate-400">
              Auto-grader Pyodide memvalidasi assertion tests tanpa kendala.
            </p>
          </div>
        </div>

        {/* Action Shortcuts & Control Hub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-[#0e1017] border border-white/[0.08] space-y-4">
            <div className="border-b border-white/[0.06] pb-3 text-xs text-slate-400 uppercase tracking-widest">
              02 // ALUR KENDALI MENGAJAR
            </div>

            <div className="space-y-3 text-xs">
              <Link
                href="/tutor/studio/1/jumat"
                className="p-4 rounded bg-[#131520] border border-white/[0.06] hover:border-white/20 transition flex items-center justify-between block group"
              >
                <div>
                  <div className="font-bold text-white group-hover:text-amber-300">
                    1. Tutor Teaching Studio (Sesi 2 Jam)
                  </div>
                  <div className="font-sans text-slate-400 mt-1">
                    Pedoman 4 langkah mengajar terpandu, editor kode peraga, dan tombol 1-klik push kode ke layar siswa.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
              </Link>

              <Link
                href="/tutor/grading"
                className="p-4 rounded bg-[#131520] border border-white/[0.06] hover:border-white/20 transition flex items-center justify-between block group"
              >
                <div>
                  <div className="font-bold text-white group-hover:text-amber-300">
                    2. Meja Evaluasi &amp; Catatan Kualitatif
                  </div>
                  <div className="font-sans text-slate-400 mt-1">
                    Verifikasi kode siswa, input skor, dan perbarui narasi evaluasi nalar untuk orang tua.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
              </Link>

              <Link
                href="/tutor/reports"
                className="p-4 rounded bg-[#131520] border border-white/[0.06] hover:border-white/20 transition flex items-center justify-between block group"
              >
                <div>
                  <div className="font-bold text-white group-hover:text-emerald-300">
                    3. WhatsApp Report Dispatcher
                  </div>
                  <div className="font-sans text-slate-400 mt-1">
                    Generate format laporan mingguan rapi siap kirim ke orang tua murid.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
              </Link>
            </div>
          </div>

          {/* Student Weekly Summary */}
          <div className="p-6 rounded-lg bg-[#0e1017] border border-white/[0.08] space-y-4 flex flex-col justify-between">
            <div className="space-y-3 text-xs">
              <div className="border-b border-white/[0.06] pb-3 text-slate-400 uppercase tracking-widest">
                03 // CATATAN NALAR LOGIKA SISWA
              </div>

              <div className="p-4 rounded bg-[#131520] border border-white/[0.06] font-sans text-slate-300 leading-relaxed italic">
                &ldquo;{progress.weeklyNote}&rdquo;
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-[#131520] rounded border border-white/[0.06]">
                  <span className="text-slate-400 text-[10px] block">PENYELESAIAN PR</span>
                  <span className="text-emerald-400 font-bold">100% (4/4 PEKAN INI)</span>
                </div>
                <div className="p-3 bg-[#131520] rounded border border-white/[0.06]">
                  <span className="text-slate-400 text-[10px] block">KEHADIRAN LIVE</span>
                  <span className="text-slate-200 font-bold">{progress.attendanceCount} / {progress.totalSessions} SESI</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06]">
              <Link
                href="/tutor/grading"
                className="w-full py-2.5 rounded bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 text-xs font-semibold transition flex items-center justify-center space-x-2"
              >
                <span>EDIT CATATAN UNTUK ORANG TUA &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
