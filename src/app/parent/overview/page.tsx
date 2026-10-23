"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth/sessionContext";
import {
  ShieldCheck,
  Check,
  Calendar,
  ArrowRight,
  Clock,
  Code2,
} from "lucide-react";

export default function ParentOverviewPage() {
  const { progress } = useSession();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-6 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Mobile-optimized Container */}
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Parent Portal Header */}
        <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-3 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-700 font-bold uppercase tracking-widest">
              PORTAL MONITORING WALI MURID
            </span>
            <span className="text-slate-500 font-semibold">PEKAN 04 / 12</span>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Monitoring Belajar: Andi Pratama
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Pengajar: <strong className="text-slate-900 font-semibold">Andricha Dea Mitra</strong> &bull; Program Les Privat 1-on-1 (Python Track)
            </p>
          </div>
        </div>

        {/* Section 01: 12-Week Progress Card */}
        <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-3 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500 font-bold">01 // INDEKS KURIKULUM 12 PEKAN</span>
            <span className="text-emerald-700 font-bold tabular-nums">35% SELESAI (PEKAN 04)</span>
          </div>

          {/* Minimal progress bar */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: "35%" }}
            />
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Status: Menguasai Fondasi Algoritma, Variabel Memori, Percabangan Kondisional (if-else), dan Fungsi Modular (def &amp; return).
          </p>
        </div>

        {/* Section 02: Daily PR Routine Matrix (Senin - Kamis) */}
        <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500 font-bold">02 // KEPATUHAN PR HARIAN (15 MENIT)</span>
            <span className="text-blue-700 font-bold tabular-nums">
              STREAK: {String(progress.streakDays).padStart(2, "0")} HARI
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
              <span className="block text-[10px] text-slate-500 font-bold">SENIN</span>
              <span className="text-slate-900 text-xs font-bold block font-sans">PR 1: Recall</span>
              <span className="text-emerald-700 text-xs font-bold block">100 / 100</span>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
              <span className="block text-[10px] text-slate-500 font-bold">SELASA</span>
              <span className="text-slate-900 text-xs font-bold block font-sans">PR 2: Reading</span>
              <span className="text-emerald-700 text-xs font-bold block">95 / 100</span>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
              <span className="block text-[10px] text-slate-500 font-bold">RABU</span>
              <span className="text-slate-900 text-xs font-bold block font-sans">PR 3: Debug</span>
              <span className="text-emerald-700 text-xs font-bold block">95 / 100</span>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
              <span className="block text-[10px] text-slate-500 font-bold">KAMIS</span>
              <span className="text-slate-900 text-xs font-bold block font-sans">PR 4: Pre-read</span>
              <span className="text-emerald-700 text-xs font-bold block">100 / 100</span>
            </div>
          </div>
        </div>

        {/* Section 03: Qualitative Notes from Kak Tutor */}
        <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-3 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500 font-bold">03 // EVALUASI NALAR DARI PENGAJAR</span>
            <span className="text-emerald-700 font-semibold">TERUPDATE</span>
          </div>

          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans italic">
            &ldquo;{progress.weeklyNote}&rdquo;
          </div>

          <div className="text-[11px] font-mono text-slate-500 text-right font-medium">
            Ditinjau oleh Andricha Dea Mitra (Tutor)
          </div>
        </div>

        {/* Section 04: 2-Hour Weekend Lesson Schedule */}
        <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-3 shadow-xs">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500 font-bold">04 // SESI TATAP MUKA 2 JAM (AKHIR PEKAN)</span>
            <Link
              href="/parent/schedule"
              className="text-blue-600 hover:text-blue-800 font-semibold transition"
            >
              LOG KEHADIRAN &rarr;
            </Link>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="text-slate-900 font-bold block font-sans">Jumat, 16.00 - 18.00 WIB</span>
                <span className="text-slate-600 text-[11px]">Sesi 07: Fungsi Modular (def &amp; return)</span>
              </div>
              <span className="px-2.5 py-1 rounded border border-emerald-200 bg-emerald-50 text-emerald-800 text-[11px] font-bold">
                HADIR (2 JAM)
              </span>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="text-slate-900 font-bold block font-sans">Sabtu, 16.00 - 18.00 WIB</span>
                <span className="text-slate-600 text-[11px]">Sesi 08: Eksekusi Capstone 1 (Game CLI)</span>
              </div>
              <span className="px-2.5 py-1 rounded border border-amber-200 bg-amber-50 text-amber-800 text-[11px] font-bold">
                SESI BERIKUTNYA
              </span>
            </div>
          </div>
        </div>

        {/* Section 05: Showcase CTA */}
        <div className="p-6 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-4 shadow-xs">
          <div>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block font-bold">
              05 // PORTOFOLIO KARYA PROGRAM
            </span>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Tinjau galeri program dan hasil eksekusi terminal yang dibuat oleh Andi.
            </p>
          </div>

          <Link
            href="/parent/showcase"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center space-x-1.5 shrink-0 shadow-xs"
          >
            <span>BUKA KARYA</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
