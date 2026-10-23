"use client";

import React from "react";
import Link from "next/link";
import {
  Terminal,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Send,
  User,
  BookOpen,
  Calendar,
  CheckCircle2,
  Lock,
  Zap,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans">
      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-16">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (5/12): Architectural Thesis */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold">
              <Terminal className="w-3.5 h-3.5" />
              <span>SISTEM EDUKASI KODING 1-ON-1</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Platform Belajar Koding Privat 1-on-1.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              Ruang belajar pemrograman modern menghubungkan Siswa (In-Browser Pyodide WASM), Pengajar (Teaching Flight Deck), dan Orang Tua (Portal Pemantauan Eksekutif). Setiap peran memiliki panel login mandiri yang terpisah dan terproteksi.
            </p>

            {/* Architectural Specifications Table - Standardized 2xl rounded */}
            <div className="border border-slate-200 rounded-2xl bg-white shadow-xs divide-y divide-slate-100 text-xs font-mono overflow-hidden">
              <div className="p-4 flex items-center justify-between">
                <span className="text-slate-500 font-bold">RUNTIME_ENGINE</span>
                <span className="text-slate-900 font-bold">Python 3.11 (Pyodide WebAssembly)</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="text-slate-500 font-bold">SESI_TATAP_MUKA</span>
                <span className="text-slate-900 font-bold">2 Jam (120 Menit) / Jumat &amp; Sabtu</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="text-slate-500 font-bold">TUGAS_HARIAN</span>
                <span className="text-slate-900 font-bold">Senin–Kamis (15–20 Menit)</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="text-slate-500 font-bold">ROADMAP_DURASI</span>
                <span className="text-slate-900 font-bold">12 Pekan &bull; 24 Sesi Live &bull; 3 Capstones</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="text-slate-500 font-bold">MODEL_AKSES</span>
                <span className="text-blue-700 font-bold">Panel Autentikasi Mandiri per Role</span>
              </div>
            </div>
          </div>

          {/* Right Column (7/12): 3 Separated Authentication Gateways */}
          <div className="lg:col-span-7 space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-700 font-bold">
                PORTAL AKSES MANDIRI
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                Pilih Panel Autentikasi Sesuai Peran Anda
              </h2>
              <p className="text-xs text-slate-600">
                Setiap pengguna mengakses sistem melalui panel login yang terisolasi tanpa tercampur satu sama lain.
              </p>
            </div>

            {/* Card 1: Student Portal - Standardized Inner Box */}
            <div className="ui-card-inner-interactive bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-mono font-extrabold text-sm shadow-2xs">
                    AP
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-blue-700 uppercase tracking-wide">
                      PORTAL SISWA PRIVATE
                    </span>
                    <h3 className="text-base font-bold text-slate-900 font-sans">
                      Workspace Belajar Siswa (Andi Pratama)
                    </h3>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono font-bold">
                  STUDENT
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Akses Split-Screen Studio dengan Monaco Editor, eksekusi Python langsung di browser dengan Pyodide, pengumpulan PR harian 15 menit, dan pengerjaan proyek Capstone interaktif.
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  ID: andi.pratama@student.id
                </span>
                <Link
                  href="/login?role=student"
                  className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-xs"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Masuk Portal Siswa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2: Tutor Flight Deck - Standardized Inner Box */}
            <div className="ui-card-inner-interactive bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-mono font-extrabold text-sm shadow-2xs">
                    AM
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-amber-700 uppercase tracking-wide">
                      PANEL KERJA PENGAJAR
                    </span>
                    <h3 className="text-base font-bold text-slate-900 font-sans">
                      Flight Deck Instruktur (Andricha Dea Mitra)
                    </h3>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-mono font-bold">
                  TUTOR
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Pandu sesi tatap muka 2 jam (120 menit), dorong kode percontohan ke layar murid via Live Push Code, verifikasi pengumpulan PR harian, dan susun rapor kualitatif otomatis.
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  ID: andri@codingclass.id
                </span>
                <Link
                  href="/login?role=tutor"
                  className="h-10 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-xs"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Masuk Panel Pengajar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3: Parent Executive Briefing - Standardized Inner Box */}
            <div className="ui-card-inner-interactive bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-mono font-extrabold text-sm shadow-2xs">
                    BP
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wide">
                      PORTAL WALI MURID (VIEW-ONLY)
                    </span>
                    <h3 className="text-base font-bold text-slate-900 font-sans">
                      Executive Briefing Orang Tua (Bambang Pratama)
                    </h3>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-bold">
                  OBSERVER
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Pantau grafik kemajuan 12 pekan secara transparan, log kepatuhan kehadiran 24 pertemuan langsung, arsip evaluasi nalar logika anak, dan dokumentasi hasil karya program terminal.
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  ID: bambang.p@parent.id
                </span>
                <Link
                  href="/login?role=parent"
                  className="h-10 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-xs"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Masuk Portal Orang Tua</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 12-Week Curriculum Matrix Preview - Standardized 3 Uniform Inner Boxes */}
        <div className="ui-card-outer p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono text-blue-700 uppercase tracking-wider font-bold">
                ROADMAP RESMI // 12 PEKAN
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                Struktur Kurikulum Pemrograman Python &amp; Web
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-mono font-semibold">
              24 Sesi Live &bull; 48 Latihan PR &bull; 3 Proyek Capstone
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Fase 1 */}
            <div className="ui-card-inner bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-2xs">
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-blue-700 font-bold block">
                  FASE 01 // MINGGU 1 - 4
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Fondasi Algoritma &amp; Logika Pemrograman
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Penguasaan IPO (Input-Proses-Output), variabel memori, operator aritmatika, percabangan if-elif-else, loop, dan fungsi modular.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 text-xs font-mono text-blue-800 font-bold">
                Capstone 1: Game CLI Tebak Angka
              </div>
            </div>

            {/* Fase 2 */}
            <div className="ui-card-inner bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-2xs">
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-amber-700 font-bold block">
                  FASE 02 // MINGGU 5 - 8
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Struktur Data, OOP &amp; Pengolahan Berkas
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Struktur data kompleks (Dictionary, List of Dicts), Object-Oriented Programming (Class &amp; Object), serta manipulasi file JSON/CSV.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 text-xs font-mono text-amber-800 font-bold">
                Capstone 2: Manajemen Data Siswa (OOP)
              </div>
            </div>

            {/* Fase 3 */}
            <div className="ui-card-inner bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-2xs">
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-emerald-700 font-bold block">
                  FASE 03 // MINGGU 9 - 12
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Web API, Dashboard Visual &amp; Wisuda Karya
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Integrasi REST API, backend server web sederhana, visualisasi data web interaktif, dan sidang presentasi Demo Day keluarga.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 text-xs font-mono text-emerald-800 font-bold">
                Capstone 3: Aplikasi Web Fullstack &amp; Wisuda
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            &copy; 2026 PY_STUDIO 1-ON-1 &bull; Andricha Dea Mitra (Lead Tutor)
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="hover:text-blue-600 transition font-bold">
              Panel Login
            </Link>
            <span>&bull;</span>
            <span>Python Track Edition</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
