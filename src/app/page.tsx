"use client";

import React from "react";
import Link from "next/link";
import { useSession, UserRole } from "@/lib/auth/sessionContext";
import {
  Code2,
  Sparkles,
  Flame,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Terminal,
  MessageSquare,
  Users,
} from "lucide-react";

export default function HomePage() {
  const { setRole } = useSession();

  const handleSelectRole = (role: UserRole) => {
    setRole(role);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Platform Pembelajaran Koding Privat 1-on-1 &bull; Python Track 12 Minggu</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Sistem Edukasi Koding Terpadu untuk{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-emerald-400 bg-clip-text text-transparent">
              Siswa, Pengajar, & Orang Tua
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Menghubungkan secara harmonis siswa yang belajar tanpa instalasi (*zero-setup Pyodide WASM*), pengajar dengan kontrol rilis kode 1-klik, dan portal transparansi penuh untuk orang tua.
          </p>
        </div>

        {/* 3 Core Roles Interactive Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. SISWA */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-indigo-950/40 border border-indigo-800/50 p-6 flex flex-col justify-between shadow-2xl hover:border-indigo-500 transition group space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-3xl shadow-lg">
                👦
              </div>

              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                  PERAN 1: SISWA PRIVATE
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
                  Split-Screen Studio
                </h2>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Belajar menyenangkan tanpa instalasi Python di komputer. Dilengkapi Monaco Editor, Pyodide WASM, dan <em>Friendly Error Translator</em> yang ramah kesalahan.
                </p>
              </div>

              <ul className="text-xs text-slate-300 space-y-2 border-t border-slate-800 pt-4">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>PR Harian Senin–Kamis (15–20 Mnt)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Penerjemah Error Ramah Pemula</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Auto-save draft ketikan setiap 3 detik</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Streak harian & perayaan confetti 🎉</span>
                </li>
              </ul>
            </div>

            <Link
              href="/student/dashboard"
              onClick={() => handleSelectRole("student")}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/30 group-hover:scale-105 active:scale-95"
            >
              <span>Masuk sebagai Siswa (Andi)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 2. PENGAJAR */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-indigo-950/40 border border-slate-800 p-6 flex flex-col justify-between shadow-2xl hover:border-indigo-500 transition group space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-3xl shadow-lg">
                👨‍🏫
              </div>

              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                  PERAN 2: PENGAJAR (TUTOR)
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
                  Teaching Console & Live Sync
                </h2>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Kendali mengajar terpadu untuk sesi 2 jam: panduan langkah mengajar, 1-klik push kode peraga ke layar siswa, dan generator rapor WhatsApp.
                </p>
              </div>

              <ul className="text-xs text-slate-300 space-y-2 border-t border-slate-800 pt-4">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1-Click Push Kode ke Editor Siswa 🚀</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Live Monitor Layar Kode Siswa</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Meja koreksi PR & form evaluasi nalar</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1-Click WhatsApp Report Generator</span>
                </li>
              </ul>
            </div>

            <Link
              href="/tutor/dashboard"
              onClick={() => handleSelectRole("tutor")}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-indigo-600 text-white font-bold text-xs transition flex items-center justify-center space-x-2 shadow-lg group-hover:scale-105 active:scale-95"
            >
              <span>Masuk sebagai Pengajar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3. ORANG TUA */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-emerald-950/40 border border-emerald-800/50 p-6 flex flex-col justify-between shadow-2xl hover:border-emerald-500 transition group space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-3xl shadow-lg">
                👨‍💼
              </div>

              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  PERAN 3: ORANG TUA MURID
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
                  Parent Monitoring Portal
                </h2>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Dirancang khusus <em>Mobile-First Read-Only</em>. Orang tua memantau progres nyata tanpa pusing melihat kode atau compiler yang membingungkan.
                </p>
              </div>

              <ul className="text-xs text-slate-300 space-y-2 border-t border-slate-800 pt-4">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Murni View-Only (Bebas dari Editor)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Progress bar kemajuan 12 minggu</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Kalender kepatuhan PR & streak</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dokumentasi hasil karya portofolio anak</span>
                </li>
              </ul>
            </div>

            <Link
              href="/parent/overview"
              onClick={() => handleSelectRole("parent")}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 group-hover:scale-105 active:scale-95"
            >
              <span>Masuk sebagai Orang Tua</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-400">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-indigo-950/60 border border-indigo-800/40 text-indigo-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white block font-semibold text-sm mb-1">
                Zero-Install Python Engine
              </strong>
              Eksekusi Python 3 murni berjalan di browser via Pyodide WebAssembly. Siswa tidak perlu menginstal compiler di laptop.
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-800/40 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white block font-semibold text-sm mb-1">
                Friendly Error Guidance
              </strong>
              Pesan error menakutkan diterjemahkan otomatis ke dalam bahasa Indonesia santun yang memotivasi pemula untuk terus mencoba.
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white block font-semibold text-sm mb-1">
                Otomasi Rapor WhatsApp
              </strong>
              Pengajar tidak perlu menyusun laporan manual berjam-jam. Cukup 1-klik untuk generate rekap perkembangan nalar anak.
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-6 text-center text-xs text-slate-500">
        <p>
          Platform Edukasi Koding Les Private 1-on-1 (Python Track) &bull; Dibuat khusus oleh Senior Systems Architect Andricha Dea Mitra (Andri).
        </p>
      </footer>
    </div>
  );
}
