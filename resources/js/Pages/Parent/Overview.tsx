import React from "react";
import { Link } from "@inertiajs/react";
import { useSession } from "@/lib/auth/sessionContext";
import { ArrowRight, Flame, CheckCircle2, Clock, Calendar } from "lucide-react";

export default function ParentOverviewPage() {
  const { progress } = useSession();
  const currentWeek = progress.currentWeek || 1;
  const progressPct = Math.round((currentWeek / (progress.totalWeeks || 12)) * 100);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-black font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Parent Portal Header */}
        <div className="bg-white border-2.5 border-black p-6 sm:p-7 shadow-[5px_5px_0px_#000] space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="text-black font-black uppercase tracking-widest bg-[#86EFAC] px-2.5 py-0.5 border border-black">
              PORTAL MONITORING WALI MURID
            </span>
            <span className="text-black font-black bg-[#FEF08A] px-2.5 py-0.5 border border-black" suppressHydrationWarning>
              PEKAN {String(currentWeek).padStart(2, "0")} / 12
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black uppercase">
              Monitoring Belajar: Andi Pratama
            </h1>
            <p className="text-xs sm:text-sm text-stone-800 font-bold mt-1">
              Pengajar: <strong className="text-black underline">Andricha Dea Mitra</strong> &bull; Program Les Privat 1-on-1 (Python Track 12 Minggu)
            </p>
          </div>
        </div>

        {/* Section 01: 12-Week Progress Card */}
        <div className="bg-white border-2.5 border-black p-6 sm:p-7 shadow-[4px_4px_0px_#000] space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="text-stone-700 font-black uppercase">01 // INDEKS KURIKULUM 12 PEKAN</span>
            <span className="text-black font-black bg-[#86EFAC] px-2.5 py-0.5 border border-black tabular-nums" suppressHydrationWarning>
              {progressPct}% SELESAI (PEKAN {String(currentWeek).padStart(2, "0")})
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white h-4 border-2 border-black shadow-[2px_2px_0px_#000] overflow-hidden p-0.5">
            <div
              className="bg-[#4ADE80] h-full border-r-2 border-black transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <p className="text-xs text-stone-800 font-bold leading-relaxed">
            Status Capaian: Menguasai Fondasi Algoritma, Logika Komputer, Model IPO (Input-Proses-Output), dan Variabel Penyimpan Nilai.
          </p>
        </div>

        {/* Section 02: Daily PR Routine Matrix (Senin - Kamis) */}
        <div className="bg-white border-2.5 border-black p-6 sm:p-7 shadow-[4px_4px_0px_#000] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono border-b-2 border-black pb-3">
            <span className="text-stone-700 font-black uppercase">02 // KEPATUHAN PR HARIAN (15 MENIT MANDIRI)</span>
            <span className="text-black font-black bg-[#FEF08A] px-2.5 py-0.5 border border-black tabular-nums" suppressHydrationWarning>
              STREAK: {String(progress.streakDays).padStart(2, "0")} HARI BERTURUT-TURUT
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-4 border-2 border-black bg-[#86EFAC] shadow-[2px_2px_0px_#000] flex flex-col justify-between h-28">
              <span className="block text-[11px] text-black font-black">SENIN (PR 1)</span>
              <div>
                <span className="text-black text-xs font-black block font-sans uppercase">Recall Logika</span>
                <span className="text-black text-xs font-black block mt-0.5">100 / 100</span>
              </div>
            </div>

            <div className="p-4 border-2 border-black bg-[#86EFAC] shadow-[2px_2px_0px_#000] flex flex-col justify-between h-28">
              <span className="block text-[11px] text-black font-black">SELASA (PR 2)</span>
              <div>
                <span className="text-black text-xs font-black block font-sans uppercase">Alur Kode</span>
                <span className="text-black text-xs font-black block mt-0.5">95 / 100</span>
              </div>
            </div>

            <div className="p-4 border-2 border-black bg-[#86EFAC] shadow-[2px_2px_0px_#000] flex flex-col justify-between h-28">
              <span className="block text-[11px] text-black font-black">RABU (PR 3)</span>
              <div>
                <span className="text-black text-xs font-black block font-sans uppercase">Debug Syntax</span>
                <span className="text-black text-xs font-black block mt-0.5">95 / 100</span>
              </div>
            </div>

            <div className="p-4 border-2 border-black bg-[#FEF08A] shadow-[2px_2px_0px_#000] flex flex-col justify-between h-28">
              <span className="block text-[11px] text-black font-black">KAMIS (PR 4)</span>
              <div>
                <span className="text-black text-xs font-black block font-sans uppercase">Pre-Read Variabel</span>
                <span className="text-black text-xs font-black block mt-0.5">100 / 100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 03: Latest Qualitative Note & Fast Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2.5 border-black p-6 shadow-[4px_4px_0px_#000] space-y-3">
            <span className="text-xs font-mono font-black uppercase tracking-wider block bg-[#FEF08A] px-2 py-0.5 border border-black w-fit">
              CATATAN PENGAJAR TERBARU
            </span>
            <div className="bg-[#FEF08A] p-4 border-2 border-black shadow-[2px_2px_0px_#000] text-xs sm:text-sm font-bold text-black italic leading-relaxed">
              &ldquo;{progress.weeklyNote}&rdquo;
            </div>
            <Link
              href="/parent/reports"
              className="text-xs font-black text-black underline flex items-center space-x-1 hover:text-stone-700 uppercase"
            >
              <span>Buka Arsip Catatan Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </Link>
          </div>

          <div className="bg-white border-2.5 border-black p-6 shadow-[4px_4px_0px_#000] space-y-4">
            <span className="text-xs font-mono font-black uppercase tracking-wider block bg-[#86EFAC] px-2 py-0.5 border border-black w-fit">
              AKSES CEPAT DOKUMENTASI
            </span>
            <div className="space-y-2.5 text-xs font-black">
              <Link
                href="/parent/showcase"
                className="w-full p-3 border-2 border-black bg-white hover:bg-[#FEF08A] shadow-[2px_2px_0px_#000] flex items-center justify-between transition-all"
              >
                <span>Lihat Dokumentasi Karya Program Anak</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Link>
              <Link
                href="/parent/schedule"
                className="w-full p-3 border-2 border-black bg-white hover:bg-[#FEF08A] shadow-[2px_2px_0px_#000] flex items-center justify-between transition-all"
              >
                <span>Lihat Log Kehadiran 24 Sesi Tatap Muka</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
