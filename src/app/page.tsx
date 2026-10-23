"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, UserRole } from "@/lib/auth/sessionContext";
import {
  Terminal,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Send,
  Eye,
  CheckCircle,
} from "lucide-react";

export default function HomePage() {
  const { setRole } = useSession();
  const [activeTab, setActiveTab] = useState<UserRole>("student");

  const handleRoleSelect = (role: UserRole) => {
    setRole(role);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-200 flex flex-col justify-between selection:bg-amber-500/30">
      {/* Studio Grid Hero - Asymmetric 5:7 Ratio */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ================= LEFT COLUMN (5/12): Architectural Thesis & Specs ================= */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
                01 / ARSITEKTUR SISTEM PEMBELAJARAN
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
                Platform Edukasi Koding Privat 1-on-1.
              </h1>

              <p className="text-sm text-slate-300 leading-relaxed max-w-lg">
                Lingkungan koding terpadu menghubungkan Siswa (In-Browser WebAssembly), Pengajar (Teaching Console &amp; Live Push Code), dan Orang Tua (Portal Monitoring Eksekutif).
              </p>
            </div>

            {/* Architectural Specifications Table (Tabular Num Precision) */}
            <div className="border border-white/[0.08] rounded-lg bg-[#0e1017] divide-y divide-white/[0.08] text-xs font-mono">
              <div className="p-3.5 flex items-center justify-between">
                <span className="text-slate-400">RUNTIME_ENGINE</span>
                <span className="text-slate-200 font-semibold">Python 3.11 (Pyodide WASM)</span>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <span className="text-slate-400">SESI_TATAP_MUKA</span>
                <span className="text-slate-200 font-semibold">2 Jam (120 Menit) / Jumat &amp; Sabtu</span>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <span className="text-slate-400">TUGAS_HARIAN</span>
                <span className="text-slate-200 font-semibold">Senin–Kamis (15–20 Menit)</span>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <span className="text-slate-400">ROADMAP_DURASI</span>
                <span className="text-slate-200 font-semibold">12 Minggu &bull; 24 Sesi Live &bull; 3 Capstones</span>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <span className="text-slate-400">ERROR_HANDLING</span>
                <span className="text-amber-400 font-semibold">Diagnostic Insight (Bahasa Indonesia)</span>
              </div>
            </div>

            {/* Quick Access Bar */}
            <div className="pt-2">
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                PILIH SUDUT PANDANG AKTOR:
              </p>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                <button
                  onClick={() => setActiveTab("student")}
                  className={`p-2.5 rounded border text-left transition ${
                    activeTab === "student"
                      ? "bg-white/[0.1] border-white/30 text-white font-semibold"
                      : "bg-[#0e1017] border-white/[0.08] text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span className="block text-[10px] text-slate-400">ROLE_01</span>
                  <span>STUDENT</span>
                </button>
                <button
                  onClick={() => setActiveTab("tutor")}
                  className={`p-2.5 rounded border text-left transition ${
                    activeTab === "tutor"
                      ? "bg-white/[0.1] border-amber-500/50 text-amber-300 font-semibold"
                      : "bg-[#0e1017] border-white/[0.08] text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span className="block text-[10px] text-slate-400">ROLE_02</span>
                  <span>TUTOR</span>
                </button>
                <button
                  onClick={() => setActiveTab("parent")}
                  className={`p-2.5 rounded border text-left transition ${
                    activeTab === "parent"
                      ? "bg-white/[0.1] border-emerald-500/50 text-emerald-300 font-semibold"
                      : "bg-[#0e1017] border-white/[0.08] text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span className="block text-[10px] text-slate-400">ROLE_03</span>
                  <span>OBSERVER</span>
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (7/12): Role Workstation Detail & Terminal Preview ================= */}
          <div className="lg:col-span-7 space-y-6">
            {/* Active Role Panel Display */}
            {activeTab === "student" && (
              <div className="border border-white/[0.1] rounded-xl bg-[#0f1118] p-6 space-y-5">
                <div className="flex items-start justify-between border-b border-white/[0.08] pb-4">
                  <div>
                    <span className="font-mono text-[11px] text-slate-400 uppercase tracking-widest block">
                      PANEL SISWA // WORKSPACE
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">
                      Split-Screen Studio &amp; Python Sandbox
                    </h2>
                  </div>
                  <Link
                    href="/student/learn/1/senin"
                    onClick={() => handleRoleSelect("student")}
                    className="px-4 py-2 rounded bg-white text-black font-mono text-xs font-bold hover:bg-slate-200 transition flex items-center space-x-1.5"
                  >
                    <span>BUKA STUDIO</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Antarmuka koding terbagi dua: materi Markdown dan petunjuk bertahap di sisi kiri, Monaco Editor dan terminal eksekusi Pyodide WebAssembly di sisi kanan.
                </p>

                {/* Technical Feature Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded bg-[#151822] border border-white/[0.06]">
                    <span className="text-slate-400 block text-[10px]">EXECUTION</span>
                    <span className="text-slate-200 font-semibold">Zero-Install WASM</span>
                  </div>
                  <div className="p-3 rounded bg-[#151822] border border-white/[0.06]">
                    <span className="text-slate-400 block text-[10px]">PERSISTENCE</span>
                    <span className="text-slate-200 font-semibold">Auto-save Draft 3s</span>
                  </div>
                  <div className="p-3 rounded bg-[#151822] border border-white/[0.06]">
                    <span className="text-slate-400 block text-[10px]">EVALUATION</span>
                    <span className="text-slate-200 font-semibold">Auto-Grader Tests</span>
                  </div>
                  <div className="p-3 rounded bg-[#151822] border border-white/[0.06]">
                    <span className="text-slate-400 block text-[10px]">DIAGNOSTICS</span>
                    <span className="text-amber-400 font-semibold">Friendly Error Translator</span>
                  </div>
                </div>

                {/* Live Terminal Preview */}
                <div className="rounded-lg border border-white/[0.08] bg-[#090a0f] overflow-hidden text-xs font-mono">
                  <div className="px-3 py-2 bg-[#12141d] border-b border-white/[0.06] flex items-center justify-between text-slate-400 text-[11px]">
                    <span className="flex items-center space-x-2">
                      <Terminal className="w-3.5 h-3.5 text-amber-400" />
                      <span>terminal_preview.py</span>
                    </span>
                    <span className="text-emerald-400 font-semibold">STATUS: PASSED</span>
                  </div>
                  <div className="p-4 space-y-2 text-slate-300">
                    <div className="text-slate-500"># Simulasi Eksekusi di Browser:</div>
                    <div className="text-amber-300">&gt;&gt;&gt; panjang = 10; lebar = 5</div>
                    <div className="text-amber-300">&gt;&gt;&gt; print(f&quot;Luas: &#123;panjang * lebar&#125;&quot;)</div>
                    <div className="text-emerald-400 font-semibold">Luas: 50</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tutor" && (
              <div className="border border-white/[0.1] rounded-xl bg-[#0f1118] p-6 space-y-5">
                <div className="flex items-start justify-between border-b border-white/[0.08] pb-4">
                  <div>
                    <span className="font-mono text-[11px] text-amber-400 uppercase tracking-widest block">
                      PANEL PENGAJAR // FLIGHT DECK
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">
                      Teaching Console &amp; Live Synchronization
                    </h2>
                  </div>
                  <Link
                    href="/tutor/studio/1/jumat"
                    onClick={() => handleRoleSelect("tutor")}
                    className="px-4 py-2 rounded bg-amber-500 text-black font-mono text-xs font-bold hover:bg-amber-400 transition flex items-center space-x-1.5"
                  >
                    <span>BUKA KONSOL</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Pusat kendali mengajar 2 jam: susunan materi 4 langkah terpandu, tombol push kode peraga 1-klik ke editor siswa, inspeksi ketikan live, dan generator pesan rapor WhatsApp.
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded bg-[#151822] border border-white/[0.06]">
                    <span className="text-slate-400 block text-[10px]">PUSH_SYNC</span>
                    <span className="text-amber-300 font-semibold">1-Click Live Code Push</span>
                  </div>
                  <div className="p-3 rounded bg-[#151822] border border-white/[0.06]">
                    <span className="text-slate-400 block text-[10px]">INSPECTOR</span>
                    <span className="text-slate-200 font-semibold">Live Keystroke Monitor</span>
                  </div>
                  <div className="p-3 rounded bg-[#151822] border border-white/[0.06]">
                    <span className="text-slate-400 block text-[10px]">GRADING</span>
                    <span className="text-slate-200 font-semibold">Meja Koreksi &amp; Skor</span>
                  </div>
                  <div className="p-3 rounded bg-[#151822] border border-white/[0.06]">
                    <span className="text-slate-400 block text-[10px]">DISPATCH</span>
                    <span className="text-emerald-400 font-semibold">WhatsApp Report Generator</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#090a0f] border border-white/[0.08] text-xs font-mono text-slate-300 flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>Sinkronisasi Editor Siswa Aktif:</span>
                  </span>
                  <span className="text-emerald-400 font-semibold">LATENCY: &lt; 20ms</span>
                </div>
              </div>
            )}

            {activeTab === "parent" && (
              <div className="border border-white/[0.1] rounded-xl bg-[#0f1118] p-6 space-y-5">
                <div className="flex items-start justify-between border-b border-white/[0.08] pb-4">
                  <div>
                    <span className="font-mono text-[11px] text-emerald-400 uppercase tracking-widest block">
                      PANEL ORANG TUA // BRIEFING
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">
                      Portal Monitoring Eksekutif (Read-Only)
                    </h2>
                  </div>
                  <Link
                    href="/parent/overview"
                    onClick={() => handleRoleSelect("parent")}
                    className="px-4 py-2 rounded bg-emerald-600 text-white font-mono text-xs font-bold hover:bg-emerald-500 transition flex items-center space-x-1.5"
                  >
                    <span>BUKA PORTAL</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Laporan transparansi tanpa instalasi compiler dan tanpa antarmuka editor yang membingungkan. Orang tua murni memantau progres kurikulum, kepatuhan PR harian, dan evaluasi nalar dari pengajar.
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded bg-[#151822] border border-white/[0.06]">
                    <span className="text-slate-400 block text-[10px]">ACCESS_MODE</span>
                    <span className="text-slate-200 font-semibold">100% Read-Only</span>
                  </div>
                  <div className="p-3 rounded bg-[#151822] border border-white/[0.06]">
                    <span className="text-slate-400 block text-[10px]">ATTENDANCE</span>
                    <span className="text-slate-200 font-semibold">Rekap Kehadiran 2 Jam</span>
                  </div>
                  <div className="p-3 rounded bg-[#151822] border border-white/[0.06]">
                    <span className="text-slate-400 block text-[10px]">EVALUATION</span>
                    <span className="text-slate-200 font-semibold">Catatan Kualitatif Pengajar</span>
                  </div>
                  <div className="p-3 rounded bg-[#151822] border border-white/[0.06]">
                    <span className="text-slate-400 block text-[10px]">PORTFOLIO</span>
                    <span className="text-emerald-400 font-semibold">Dokumentasi Karya Anak</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#090a0f] border border-white/[0.08] text-xs font-mono text-slate-300 flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Status Kurikulum Pekan Ini:</span>
                  </span>
                  <span className="text-slate-200 font-bold">PEKAN 4 / FASE 1 TUNTAS</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Minimal Monochrome Footer */}
      <footer className="border-t border-white/[0.08] bg-[#090a0f] py-4 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>PY_STUDIO // 1-ON-1 LES PRIVAT KODING (PYTHON TRACK)</span>
          <span>SOLO FULLSTACK ARCHITECTURE &bull; ANDRICHA DEA MITRA</span>
        </div>
      </footer>
    </div>
  );
}
