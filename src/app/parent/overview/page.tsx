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
    <div className="min-h-screen bg-[#07090D] text-neutral-200 py-6 px-4 sm:px-6 lg:px-8">
      {/* Mobile-optimized Container */}
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Parent Portal Header */}
        <div className="p-5 rounded border border-white/[0.08] bg-[#0C1017] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 uppercase tracking-widest">
              PORTAL MONITORING WALI MURID
            </span>
            <span className="text-neutral-500">PEKAN 04 / 12</span>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
              Monitoring Belajar: Andi Pratama
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Pengajar: <strong className="text-neutral-200 font-medium">Andricha Dea Mitra</strong> &bull; Program Les Privat 1-on-1 (Python Track)
            </p>
          </div>
        </div>

        {/* Section 01: 12-Week Progress Card */}
        <div className="p-5 rounded border border-white/[0.08] bg-[#0C1017] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400">01 // INDEKS KURIKULUM 12 PEKAN</span>
            <span className="text-emerald-400 font-medium tabular-nums">35% SELESAI (PEKAN 04)</span>
          </div>

          {/* Minimal progress bar */}
          <div className="w-full bg-[#07090D] h-2 rounded-full overflow-hidden border border-white/[0.08]">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: "35%" }}
            />
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed">
            Status: Menguasai Fondasi Algoritma, Variabel Memori, Percabangan Kondisional (if-else), dan Fungsi Modular (def & return).
          </p>
        </div>

        {/* Section 02: Daily PR Routine Matrix (Senin - Kamis) */}
        <div className="p-5 rounded border border-white/[0.08] bg-[#0C1017] space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400">02 // KEPATUHAN PR HARIAN (15 MENIT)</span>
            <span className="text-amber-400 tabular-nums">
              STREAK: {String(progress.streakDays).padStart(2, "0")} HARI
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
            <div className="p-3 rounded border border-white/[0.06] bg-[#07090D] space-y-1">
              <span className="block text-[10px] text-neutral-500">SENIN</span>
              <span className="text-neutral-200 text-xs font-medium block">PR 1: Recall</span>
              <span className="text-emerald-400 text-[11px] block">100 / 100</span>
            </div>

            <div className="p-3 rounded border border-white/[0.06] bg-[#07090D] space-y-1">
              <span className="block text-[10px] text-neutral-500">SELASA</span>
              <span className="text-neutral-200 text-xs font-medium block">PR 2: Reading</span>
              <span className="text-emerald-400 text-[11px] block">95 / 100</span>
            </div>

            <div className="p-3 rounded border border-white/[0.06] bg-[#07090D] space-y-1">
              <span className="block text-[10px] text-neutral-500">RABU</span>
              <span className="text-neutral-200 text-xs font-medium block">PR 3: Debug</span>
              <span className="text-emerald-400 text-[11px] block">95 / 100</span>
            </div>

            <div className="p-3 rounded border border-white/[0.06] bg-[#07090D] space-y-1">
              <span className="block text-[10px] text-neutral-500">KAMIS</span>
              <span className="text-neutral-200 text-xs font-medium block">PR 4: Pre-read</span>
              <span className="text-emerald-400 text-[11px] block">100 / 100</span>
            </div>
          </div>
        </div>

        {/* Section 03: Qualitative Notes from Kak Tutor */}
        <div className="p-5 rounded border border-white/[0.08] bg-[#0C1017] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400">03 // EVALUASI NALAR DARI PENGAJAR</span>
            <span className="text-neutral-500">TERUPDATE</span>
          </div>

          <div className="p-4 rounded border border-white/[0.06] bg-[#07090D] text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
            &ldquo;{progress.weeklyNote}&rdquo;
          </div>

          <div className="text-[11px] font-mono text-neutral-500 text-right">
            Ditinjau oleh Andricha Dea Mitra (Tutor)
          </div>
        </div>

        {/* Section 04: 2-Hour Weekend Lesson Schedule */}
        <div className="p-5 rounded border border-white/[0.08] bg-[#0C1017] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400">04 // SESI TATAP MUKA 2 JAM (AKHIR PEKAN)</span>
            <Link
              href="/parent/schedule"
              className="text-neutral-400 hover:text-emerald-400 transition"
            >
              LOG KEHADIRAN &rarr;
            </Link>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 rounded border border-white/[0.06] bg-[#07090D] flex items-center justify-between">
              <div>
                <span className="text-neutral-200 font-medium block">Jumat, 16.00 - 18.00 WIB</span>
                <span className="text-neutral-500 text-[11px]">Sesi 07: Fungsi Modular (def & return)</span>
              </div>
              <span className="px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-[11px]">
                HADIR (2 JAM)
              </span>
            </div>

            <div className="p-3 rounded border border-white/[0.06] bg-[#07090D] flex items-center justify-between">
              <div>
                <span className="text-neutral-200 font-medium block">Sabtu, 16.00 - 18.00 WIB</span>
                <span className="text-neutral-500 text-[11px]">Sesi 08: Eksekusi Capstone 1 (Game CLI)</span>
              </div>
              <span className="px-2 py-0.5 rounded border border-amber-500/30 bg-amber-950/20 text-amber-400 text-[11px]">
                SESI BERIKUTNYA
              </span>
            </div>
          </div>
        </div>

        {/* Section 05: Showcase CTA */}
        <div className="p-5 rounded border border-white/[0.08] bg-[#0C1017] flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
              05 // PORTOFOLIO KARYA PROGRAM
            </span>
            <p className="text-xs text-neutral-400 mt-0.5">
              Tinjau galeri program dan hasil eksekusi terminal yang dibuat oleh Andi.
            </p>
          </div>

          <Link
            href="/parent/showcase"
            className="px-3.5 py-2 rounded border border-white/[0.1] bg-[#07090D] hover:bg-white/[0.04] text-neutral-200 font-mono text-xs transition flex items-center space-x-1.5 shrink-0"
          >
            <span>BUKA KARYA</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
