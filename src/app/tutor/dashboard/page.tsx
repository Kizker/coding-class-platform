"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth/sessionContext";
import {
  Users,
  Clock,
  Sparkles,
  FileText,
  MessageSquare,
  Flame,
  Award,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function TutorDashboardPage() {
  const { progress } = useSession();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Tutor Top Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Teaching Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Selamat Mengajar, Kak Tutor! 👨‍🏫
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Platform private 1-on-1 siap mengotomatisasi penilaian PR, sinkronisasi kode peraga, dan penyusunan laporan orang tua.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/tutor/studio/1/jumat"
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Buka Teaching Studio (Live)</span>
            </Link>
            <Link
              href="/tutor/reports"
              className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-emerald-600/20 transition flex items-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Rapor WhatsApp</span>
            </Link>
          </div>
        </div>

        {/* 3 Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sesi Les Terjadwal */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Sesi Tatap Muka Langsung</span>
              <Clock className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-xl font-bold text-white">
              Jumat, 16.00 - 18.00 WIB
            </div>
            <p className="text-xs text-slate-400">
              Pertemuan 7: Modularitas Fungsi (def & return) &bull; Durasi 2 Jam (120 Menit).
            </p>
          </div>

          {/* Status Siswa Private */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Siswa Aktif: Andi Pratama</span>
              <Flame className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-xl font-bold text-orange-400 flex items-center space-x-2">
              <span>🔥 Streak: {progress.streakDays} Hari</span>
            </div>
            <p className="text-xs text-slate-400">
              PR Kamis selesai 100%. Nalar percabangan dan perulangan berkembang pesat.
            </p>
          </div>

          {/* Alert Koreksi PR */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Antrean Koreksi</span>
              <AlertCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-emerald-400 flex items-center space-x-1.5">
              <CheckCircle2 className="w-5 h-5" />
              <span>Semua PR Terkoreksi</span>
            </div>
            <p className="text-xs text-slate-400">
              Auto-grader Pyodide telah memverifikasi seluruh test cases otomatis.
            </p>
          </div>
        </div>

        {/* Action Shortcuts & Control Hub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Access */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Alur Kerja Mengajar Pengajar</span>
            </h2>

            <div className="space-y-3">
              <Link
                href="/tutor/studio/1/jumat"
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition flex items-center justify-between group"
              >
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-indigo-300">
                    1. Tutor Teaching Studio (Sesi Tatap Muka 2 Jam)
                  </div>
                  <div className="text-xs text-slate-400">
                    Panduan 4 langkah mengajar, demonstrasi kode, dan tombol 1-klik push kode ke layar siswa.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition" />
              </Link>

              <Link
                href="/tutor/grading"
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition flex items-center justify-between group"
              >
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-indigo-300">
                    2. Meja Penilaian & Evaluasi Kualitatif
                  </div>
                  <div className="text-xs text-slate-400">
                    Tinjau kode siswa, berikan nilai, dan tulis catatan perkembangan nalar anak.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition" />
              </Link>

              <Link
                href="/tutor/reports"
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition flex items-center justify-between group"
              >
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-indigo-300">
                    3. 1-Click WhatsApp Report Generator
                  </div>
                  <div className="text-xs text-slate-400">
                    Salin teks rekap rapor mingguan rapi dan kirimkan langsung ke orang tua via WhatsApp.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>

          {/* Student Weekly Summary */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Catatan Perkembangan Siswa Terkini</span>
              </h2>

              <div className="p-4 rounded-xl bg-slate-950 border border-indigo-900/40 text-xs text-slate-300 leading-relaxed italic">
                &ldquo;{progress.weeklyNote}&rdquo;
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Tingkat Penyelesaian PR</span>
                  <strong className="text-emerald-400 text-sm font-bold">100% (4/4 Pekan Ini)</strong>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Kehadiran Sesi 2 Jam</span>
                  <strong className="text-indigo-400 text-sm font-bold">{progress.attendanceCount} / {progress.totalSessions} Sesi Hadir</strong>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <Link
                href="/tutor/grading"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center justify-center space-x-2"
              >
                <span>Edit Catatan Kualitatif untuk Rapor Ortu &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
