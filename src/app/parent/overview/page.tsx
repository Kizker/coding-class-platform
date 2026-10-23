"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth/sessionContext";
import {
  Eye,
  CheckCircle2,
  Flame,
  Award,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  User,
} from "lucide-react";

export default function ParentOverviewPage() {
  const { progress } = useSession();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 px-4 sm:px-6 lg:px-8">
      {/* Mobile-optimized Container */}
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Parent Portal Header Badge */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-700/50 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Portal Transparansi Orang Tua (View-Only)</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">Pekan 4 dari 12</span>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Laporan Belajar: Andi Pratama 👦
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Pengajar: <strong>Kak Tutor (Andri)</strong> &bull; Program Les Private 1-on-1 (Python Track)
            </p>
          </div>
        </div>

        {/* 12-Week Progress Card */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300">Kemajuan Belajar 12 Minggu</span>
            <strong className="text-emerald-400 font-bold">35% Selesai (Minggu 4)</strong>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
              style={{ width: "35%" }}
            />
          </div>

          <p className="text-[11px] text-slate-400">
            Status: Menguasai Fondasi Algoritma, Variabel, Percabangan (if-else), dan Fungsi Modular.
          </p>
        </div>

        {/* Daily PR Streak Calendar (Senin - Kamis) */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white tracking-tight flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Konsistensi PR Harian Pekan Ini</span>
            </h2>
            <span className="flex items-center space-x-1 text-xs text-orange-400 font-bold">
              <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span>{progress.streakDays} Hari Streak!</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-center space-y-1">
              <span className="block text-[10px] text-slate-400 font-semibold">SENIN</span>
              <span className="text-emerald-400 text-xs font-bold block">PR 1: Recall</span>
              <span className="text-[11px] text-slate-300 font-mono">Nilai: 100/100</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-center space-y-1">
              <span className="block text-[10px] text-slate-400 font-semibold">SELASA</span>
              <span className="text-emerald-400 text-xs font-bold block">PR 2: Reading</span>
              <span className="text-[11px] text-slate-300 font-mono">Nilai: 95/100</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-center space-y-1">
              <span className="block text-[10px] text-slate-400 font-semibold">RABU</span>
              <span className="text-emerald-400 text-xs font-bold block">PR 3: Debug</span>
              <span className="text-[11px] text-slate-300 font-mono">Nilai: 95/100</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-center space-y-1">
              <span className="block text-[10px] text-slate-400 font-semibold">KAMIS</span>
              <span className="text-emerald-400 text-xs font-bold block">PR 4: Pre-read</span>
              <span className="text-[11px] text-slate-300 font-mono">Nilai: 100/100</span>
            </div>
          </div>
        </div>

        {/* Qualitative Notes from Kak Tutor */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/30 via-slate-900 to-slate-900 border border-indigo-800/40 space-y-3 shadow-lg">
          <div className="flex items-center space-x-2 text-indigo-300 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Catatan Perkembangan dari Kak Tutor (Pekan Ini)</span>
          </div>

          <blockquote className="p-4 rounded-xl bg-slate-950/80 border border-indigo-900/40 text-xs sm:text-sm text-slate-200 leading-relaxed italic">
            &ldquo;{progress.weeklyNote}&rdquo;
          </blockquote>

          <div className="text-[11px] text-slate-400 text-right">
            Ditinjau oleh Kak Tutor &bull; Terupdate otomatis
          </div>
        </div>

        {/* 2-Hour Weekend Lesson Status */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white tracking-tight flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Jadwal Les Tatap Muka 2 Jam (Jumat & Sabtu)</span>
            </h2>
            <Link
              href="/parent/schedule"
              className="text-xs text-emerald-400 hover:underline"
            >
              Lihat Detail &rarr;
            </Link>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <strong className="text-white block">Jumat, 16.00 - 18.00 WIB</strong>
                <span className="text-slate-400 text-[11px]">Pertemuan 7: Fungsi Modular (def & return)</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold text-[11px]">
                ✅ Hadir (2 Jam)
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <strong className="text-white block">Sabtu, 16.00 - 18.00 WIB</strong>
                <span className="text-slate-400 text-[11px]">Pertemuan 8: Eksekusi Capstone 1 (Game CLI)</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700 font-bold text-[11px]">
                ⏳ Sesi Berikutnya
              </span>
            </div>
          </div>
        </div>

        {/* Child's Showcase CTA */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1">
            <span className="text-xs font-bold text-white block">
              📁 Dokumentasi Hasil Karya Program Ananda
            </span>
            <p className="text-[11px] text-slate-400">
              Lihat deskripsi program dan hasil karya yang berhasil dibuat oleh Andi.
            </p>
          </div>

          <Link
            href="/parent/showcase"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center space-x-1 shrink-0"
          >
            <span>Buka Karya</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
