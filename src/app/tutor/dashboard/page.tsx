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
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Tutor Top Banner */}
        <div className="ui-card-outer rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-widest">
              <span>01 // COMMAND CENTER</span>
              <span>&bull;</span>
              <span>LEAD TUTOR</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sesi Mengajar &amp; Evaluasi Siswa
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              Konsol terpadu untuk monitoring sesi les tatap muka 2 jam, broadcast kode peraga langsung ke editor siswa, dan rekap rapor mingguan.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/tutor/studio/1/jumat"
              className="px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition flex items-center space-x-2 shadow-xs"
            >
              <Terminal className="w-4 h-4" />
              <span>BUKA TEACHING STUDIO</span>
            </Link>
            <Link
              href="/tutor/reports"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition flex items-center space-x-2 shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>RAPOR WHATSAPP</span>
            </Link>
          </div>
        </div>

        {/* 3 Telemetry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="ui-card-inner bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-3 flex flex-col justify-between">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center justify-between">
              <span>JADWAL_SESI_BERIKUTNYA</span>
              <Clock className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-xl font-extrabold text-slate-900 font-mono">
              JUMAT // 16.00 - 18.00 WIB
            </div>
            <p className="text-xs text-slate-600">
              Pertemuan 7: Fungsi Modular (def &amp; return) &bull; Durasi 2 Jam.
            </p>
          </div>

          <div className="ui-card-inner bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-3 flex flex-col justify-between">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center justify-between">
              <span>STATUS_SISWA</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            </div>
            <div className="text-xl font-extrabold text-amber-700 font-mono">
              ANDI (STREAK {progress.streakDays}D)
            </div>
            <p className="text-xs text-slate-600">
              PR harian tuntas 100%. Kemampuan logika percabangan matang.
            </p>
          </div>

          <div className="ui-card-inner bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-3 flex flex-col justify-between">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center justify-between">
              <span>STATUS_EVALUASI</span>
              <span className="text-emerald-700 font-bold font-mono">PASSED</span>
            </div>
            <div className="text-xl font-extrabold text-emerald-700 font-mono">
              SEMUA PR TERVERIFIKASI
            </div>
            <p className="text-xs text-slate-600">
              Auto-grader Pyodide memvalidasi assertion tests tanpa kendala.
            </p>
          </div>
        </div>

        {/* Action Shortcuts & Control Hub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="ui-card-outer p-6 sm:p-7 rounded-2xl space-y-4">
            <div className="border-b border-slate-100 pb-3 text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">
              02 // ALUR KENDALI MENGAJAR
            </div>

            <div className="space-y-3 text-xs">
              <Link
                href="/tutor/studio/1/jumat"
                className="ui-card-inner-interactive p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/70 hover:border-amber-400 hover:bg-amber-50/40 transition flex items-center justify-between block group"
              >
                <div>
                  <div className="font-extrabold text-slate-900 group-hover:text-amber-800 text-sm">
                    1. Tutor Teaching Studio (Sesi 2 Jam)
                  </div>
                  <div className="text-slate-600 mt-1 font-sans">
                    Pedoman 4 langkah mengajar terpandu, editor kode peraga, dan tombol 1-klik push kode ke layar siswa.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition shrink-0 ml-3" />
              </Link>

              <Link
                href="/tutor/grading"
                className="ui-card-inner-interactive p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/70 hover:border-amber-400 hover:bg-amber-50/40 transition flex items-center justify-between block group"
              >
                <div>
                  <div className="font-extrabold text-slate-900 group-hover:text-amber-800 text-sm">
                    2. Meja Evaluasi &amp; Catatan Kualitatif
                  </div>
                  <div className="text-slate-600 mt-1 font-sans">
                    Verifikasi kode siswa, input skor, dan perbarui narasi evaluasi nalar untuk orang tua.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition shrink-0 ml-3" />
              </Link>

              <Link
                href="/tutor/reports"
                className="ui-card-inner-interactive p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/70 hover:border-emerald-400 hover:bg-emerald-50/40 transition flex items-center justify-between block group"
              >
                <div>
                  <div className="font-extrabold text-slate-900 group-hover:text-emerald-800 text-sm">
                    3. WhatsApp Report Dispatcher
                  </div>
                  <div className="text-slate-600 mt-1 font-sans">
                    Generate format laporan mingguan rapi siap kirim ke orang tua murid.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition shrink-0 ml-3" />
              </Link>
            </div>
          </div>

          {/* Student Weekly Summary */}
          <div className="ui-card-outer p-6 sm:p-7 rounded-2xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3.5 text-xs">
              <div className="border-b border-slate-100 pb-3 text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">
                03 // CATATAN NALAR LOGIKA SISWA
              </div>

              <div className="ui-card-inner p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 leading-relaxed italic font-sans">
                &ldquo;{progress.weeklyNote}&rdquo;
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 font-mono">
                <div className="ui-card-inner p-3.5 bg-slate-50/70 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[10px] block font-bold">PENYELESAIAN PR</span>
                  <span className="text-emerald-700 font-extrabold text-xs">100% (4/4 PEKAN INI)</span>
                </div>
                <div className="ui-card-inner p-3.5 bg-slate-50/70 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[10px] block font-bold">KEHADIRAN LIVE</span>
                  <span className="text-slate-900 font-extrabold text-xs">{progress.attendanceCount} / {progress.totalSessions} SESI</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/tutor/grading"
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-center space-x-2 font-mono"
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
