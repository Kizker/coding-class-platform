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
    <div className="min-h-screen bg-[#FDFBF7] text-black flex flex-col justify-between font-sans antialiased">
      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-16">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (5/12): Architectural Thesis */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#FEF08A] border-2 border-black shadow-[2px_2px_0px_#000] text-black text-xs font-mono font-black uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>SISTEM EDUKASI KODING 1-ON-1</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black leading-[1.15] uppercase">
              Platform Belajar Koding Privat 1-on-1.
            </h1>

            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-bold">
              Ruang belajar pemrograman modern menghubungkan Siswa (In-Browser Pyodide WASM), Pengajar (Teaching Flight Deck), dan Orang Tua (Portal Pemantauan Eksekutif). Setiap peran memiliki panel login mandiri yang terpisah dan terproteksi.
            </p>

            {/* Architectural Specifications Table */}
            <div className="border-2.5 border-black bg-white shadow-[4px_4px_0px_#000] divide-y-2 divide-black text-xs font-mono overflow-hidden">
              <div className="p-3.5 flex items-center justify-between">
                <span className="text-stone-700 font-bold uppercase">RUNTIME_ENGINE</span>
                <span className="text-black font-black">Python 3.11 (Pyodide WASM)</span>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <span className="text-stone-700 font-bold uppercase">SESI_TATAP_MUKA</span>
                <span className="text-black font-black">2 Jam / Jumat &amp; Sabtu</span>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <span className="text-stone-700 font-bold uppercase">TUGAS_HARIAN</span>
                <span className="text-black font-black">Senin–Kamis (15–20 Menit)</span>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <span className="text-stone-700 font-bold uppercase">ROADMAP_DURASI</span>
                <span className="text-black font-black">12 Pekan &bull; 24 Sesi Live</span>
              </div>
              <div className="p-3.5 flex items-center justify-between bg-[#FEF08A]">
                <span className="text-black font-black uppercase">MODEL_AKSES</span>
                <span className="text-black font-black underline uppercase">Panel Mandiri per Role</span>
              </div>
            </div>
          </div>

          {/* Right Column (7/12): 3 Separated Authentication Gateways */}
          <div className="lg:col-span-7 space-y-5">
            <div className="border-b-2 border-black pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-black font-black bg-[#FEF08A] px-2 py-0.5 border border-black inline-block">
                PORTAL AKSES MANDIRI
              </span>
              <h2 className="text-2xl font-black text-black mt-2 uppercase tracking-tight">
                Pilih Panel Autentikasi Sesuai Peran Anda
              </h2>
              <p className="text-xs text-stone-700 font-bold mt-0.5">
                Setiap pengguna mengakses sistem melalui panel login yang terisolasi tanpa tercampur satu sama lain.
              </p>
            </div>

            {/* Card 1: Student Portal */}
            <div className="bg-white border-2.5 border-black p-6 sm:p-7 shadow-[5px_5px_0px_#000] space-y-4 hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 bg-[#FEF08A] border-2 border-black flex items-center justify-center text-black font-mono font-black text-base shadow-[2px_2px_0px_#000]">
                    AP
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-black text-black uppercase tracking-wide">
                      PORTAL SISWA PRIVATE
                    </span>
                    <h3 className="text-lg font-black text-black uppercase">
                      Workspace Belajar Siswa (Andi Pratama)
                    </h3>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 bg-[#FEF08A] text-black border-2 border-black font-mono font-black uppercase">
                  STUDENT
                </span>
              </div>

              <p className="text-xs text-stone-800 leading-relaxed font-bold">
                Akses Split-Screen Studio dengan Monaco Editor, eksekusi Python langsung di browser dengan Pyodide, pengumpulan PR harian 15 menit, dan pengerjaan kuis logika 10 soal.
              </p>

              <div className="pt-3 border-t-2 border-black flex items-center justify-between">
                <span className="text-xs font-mono text-black font-bold">
                  ID: andi.pratama@student.id
                </span>
                <Link
                  href="/login?role=student"
                  className="px-4 py-2 bg-[#FACC15] hover:bg-yellow-400 text-black border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-black transition-all flex items-center space-x-1.5 uppercase tracking-tight hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Masuk Portal Siswa</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </Link>
              </div>
            </div>

            {/* Card 2: Tutor Flight Deck */}
            <div className="bg-white border-2.5 border-black p-6 sm:p-7 shadow-[5px_5px_0px_#000] space-y-4 hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 bg-[#86EFAC] border-2 border-black flex items-center justify-center text-black font-mono font-black text-base shadow-[2px_2px_0px_#000]">
                    AM
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-black text-black uppercase tracking-wide">
                      PANEL KERJA PENGAJAR
                    </span>
                    <h3 className="text-lg font-black text-black uppercase">
                      Flight Deck Instruktur (Andricha Dea Mitra)
                    </h3>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 bg-[#86EFAC] text-black border-2 border-black font-mono font-black uppercase">
                  TUTOR
                </span>
              </div>

              <p className="text-xs text-stone-800 leading-relaxed font-bold">
                Pandu sesi tatap muka 2 jam (120 menit), dorong kode percontohan ke layar murid via Live Push Code, pantau pengerjaan kuis logika realtime, dan susun rapor kualitatif otomatis.
              </p>

              <div className="pt-3 border-t-2 border-black flex items-center justify-between">
                <span className="text-xs font-mono text-black font-bold">
                  ID: andri@codingclass.id
                </span>
                <Link
                  href="/login?role=tutor"
                  className="px-4 py-2 bg-[#86EFAC] hover:bg-green-300 text-black border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-black transition-all flex items-center space-x-1.5 uppercase tracking-tight hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Masuk Panel Pengajar</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </Link>
              </div>
            </div>

            {/* Card 3: Parent Executive Briefing */}
            <div className="bg-white border-2.5 border-black p-6 sm:p-7 shadow-[5px_5px_0px_#000] space-y-4 hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 bg-[#FED7AA] border-2 border-black flex items-center justify-center text-black font-mono font-black text-base shadow-[2px_2px_0px_#000]">
                    BP
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-black text-black uppercase tracking-wide">
                      PORTAL WALI MURID (VIEW-ONLY)
                    </span>
                    <h3 className="text-lg font-black text-black uppercase">
                      Executive Briefing Orang Tua (Bambang Pratama)
                    </h3>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 bg-[#FED7AA] text-black border-2 border-black font-mono font-black uppercase">
                  OBSERVER
                </span>
              </div>

              <p className="text-xs text-stone-800 leading-relaxed font-bold">
                Pantau grafik kemajuan 12 pekan secara transparan, log kepatuhan kehadiran 24 pertemuan langsung, arsip evaluasi nalar logika anak, dan dokumentasi hasil karya program terminal.
              </p>

              <div className="pt-3 border-t-2 border-black flex items-center justify-between">
                <span className="text-xs font-mono text-black font-bold">
                  ID: bambang.p@parent.id
                </span>
                <Link
                  href="/login?role=parent"
                  className="px-4 py-2 bg-[#FED7AA] hover:bg-orange-300 text-black border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-black transition-all flex items-center space-x-1.5 uppercase tracking-tight hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Masuk Portal Orang Tua</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 12-Week Curriculum Matrix Preview */}
        <div className="border-2.5 border-black bg-white p-6 sm:p-8 space-y-6 shadow-[6px_6px_0px_#000]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black pb-4">
            <div>
              <span className="text-xs font-mono text-black bg-[#FEF08A] px-2 py-0.5 border border-black uppercase tracking-wider font-black">
                ROADMAP RESMI // 12 PEKAN
              </span>
              <h2 className="text-2xl font-black text-black mt-2 uppercase tracking-tight">
                Struktur Kurikulum Pemrograman Python &amp; Web
              </h2>
            </div>
            <span className="text-xs text-black font-mono font-black uppercase bg-stone-100 p-1.5 border border-black">
              24 Sesi Live &bull; 48 Latihan PR &bull; 3 Capstones
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Fase 1 */}
            <div className="bg-[#FEF08A]/30 border-2 border-black p-6 flex flex-col justify-between space-y-4 shadow-[3px_3px_0px_#000]">
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-black bg-[#FEF08A] px-2 py-0.5 border border-black font-black uppercase block w-fit">
                  FASE 01 // MINGGU 1 - 4
                </span>
                <h3 className="text-base font-black text-black uppercase">
                  Fondasi Algoritma &amp; Logika Pemrograman
                </h3>
                <p className="text-xs text-stone-800 leading-relaxed font-bold">
                  Penguasaan IPO (Input-Proses-Output), variabel memori, operator aritmatika, percabangan if-elif-else, loop, dan fungsi modular.
                </p>
              </div>
              <div className="pt-3 border-t-2 border-black text-xs font-mono text-black font-black uppercase">
                Capstone 1: Game CLI Tebak Angka
              </div>
            </div>

            {/* Fase 2 */}
            <div className="bg-[#86EFAC]/30 border-2 border-black p-6 flex flex-col justify-between space-y-4 shadow-[3px_3px_0px_#000]">
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-black bg-[#86EFAC] px-2 py-0.5 border border-black font-black uppercase block w-fit">
                  FASE 02 // MINGGU 5 - 8
                </span>
                <h3 className="text-base font-black text-black uppercase">
                  Struktur Data, OOP &amp; Pengolahan Berkas
                </h3>
                <p className="text-xs text-stone-800 leading-relaxed font-bold">
                  Struktur data kompleks (Dictionary, List of Dicts), Object-Oriented Programming (Class &amp; Object), serta manipulasi file JSON/CSV.
                </p>
              </div>
              <div className="pt-3 border-t-2 border-black text-xs font-mono text-black font-black uppercase">
                Capstone 2: Manajemen Data Siswa (OOP)
              </div>
            </div>

            {/* Fase 3 */}
            <div className="bg-[#FED7AA]/30 border-2 border-black p-6 flex flex-col justify-between space-y-4 shadow-[3px_3px_0px_#000]">
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-black bg-[#FED7AA] px-2 py-0.5 border border-black font-black uppercase block w-fit">
                  FASE 03 // MINGGU 9 - 12
                </span>
                <h3 className="text-base font-black text-black uppercase">
                  Web API, Dashboard Visual &amp; Wisuda Karya
                </h3>
                <p className="text-xs text-stone-800 leading-relaxed font-bold">
                  Integrasi REST API, backend server web sederhana, visualisasi data web interaktif, dan sidang presentasi Demo Day keluarga.
                </p>
              </div>
              <div className="pt-3 border-t-2 border-black text-xs font-mono text-black font-black uppercase">
                Capstone 3: Aplikasi Web Fullstack &amp; Wisuda
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2.5 border-black bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-black font-mono font-bold">
          <div>
            &copy; 2026 PY_STUDIO 1-ON-1 &bull; Andricha Dea Mitra (Lead Tutor)
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="hover:bg-[#FEF08A] px-2 py-0.5 border border-black transition font-black uppercase">
              Panel Login
            </Link>
            <span>&bull;</span>
            <span className="uppercase">Python Track Edition</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
