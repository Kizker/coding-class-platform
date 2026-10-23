"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth/sessionContext";
import { CURRICULUM_DATA } from "@/data/curriculum";
import {
  ArrowRight,
  Check,
  Clock,
  Layers,
  Terminal,
  Activity,
} from "lucide-react";

export default function StudentDashboardPage() {
  const { progress } = useSession();

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-200 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Studio Banner - Left-Aligned Restraint */}
        <div className="border border-white/[0.08] rounded-xl bg-[#0f1118] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
              01 // DASHBOARD SISWA &bull; ANDI PRATAMA
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Pekan 04: Fungsi Modular &amp; Proyek Capstone 1.
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Fokus pekan ini: Mengabstraksi kode berulang menjadi fungsi mandiri (def/return) serta menyelesaikan game konsol interaktif.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/student/learn/1/senin"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded bg-white text-black font-mono text-xs font-bold hover:bg-slate-200 transition"
            >
              <span>BUKA PR HARI INI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3 Telemetry Cards (Precision Tabular Nums) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          <div className="border border-white/[0.08] rounded-lg bg-[#0e1017] p-5 space-y-2">
            <div className="text-[11px] uppercase tracking-wider text-slate-400">
              KONSISTENSI_STREAK
            </div>
            <div className="text-3xl font-bold text-amber-400 tabular-nums">
              {progress.streakDays.toString().padStart(2, "0")} HARI
            </div>
            <p className="font-sans text-[11px] text-slate-400">
              Aktif mengerjakan PR harian Senin s.d Kamis.
            </p>
          </div>

          <div className="border border-white/[0.08] rounded-lg bg-[#0e1017] p-5 space-y-2">
            <div className="text-[11px] uppercase tracking-wider text-slate-400">
              AKUMULASI_PENGALAMAN
            </div>
            <div className="text-3xl font-bold text-slate-200 tabular-nums">
              {progress.xpPoints} XP
            </div>
            <p className="font-sans text-[11px] text-slate-400">
              Poin evaluasi otomatis dari penuntasan tugas logika.
            </p>
          </div>

          <div className="border border-white/[0.08] rounded-lg bg-[#0e1017] p-5 space-y-2">
            <div className="text-[11px] uppercase tracking-wider text-slate-400">
              PROGRES_ROADMAP
            </div>
            <div className="text-3xl font-bold text-emerald-400 tabular-nums">
              {progress.currentWeek.toString().padStart(2, "0")} / 12 MINGGU
            </div>
            <div className="w-full bg-[#1b1e2a] h-1.5 rounded-full overflow-hidden mt-1">
              <div
                className="bg-emerald-500 h-full rounded-full"
                style={{ width: `${(progress.currentWeek / progress.totalWeeks) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Weekly Routine Matrix (Senin s.d Minggu) */}
        <div className="border border-white/[0.08] rounded-xl bg-[#0f1118] p-6 space-y-4 font-mono">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-xs">
            <div>
              <span className="text-slate-400 uppercase tracking-widest block">
                02 // SIKLUS MINGGUAN BELAJAR
              </span>
              <span className="text-slate-200 font-bold text-sm">
                Rutinitas Pekan ke-4
              </span>
            </div>
            <span className="text-slate-400">
              Senin–Kamis 15-20 Mnt &bull; Jumat–Sabtu 2 Jam Tatap Muka
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
            {/* Senin */}
            <Link
              href="/student/learn/1/senin"
              className="p-3 rounded border border-white/[0.08] bg-[#141620] hover:border-white/30 transition flex flex-col justify-between h-24"
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>SENIN</span>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div>
                <span className="font-bold text-slate-200 block">PR 1: RECALL</span>
                <span className="text-[10px] text-emerald-400">STATUS: 100/100</span>
              </div>
            </Link>

            {/* Selasa */}
            <Link
              href="/student/learn/1/selasa"
              className="p-3 rounded border border-white/[0.08] bg-[#141620] hover:border-white/30 transition flex flex-col justify-between h-24"
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>SELASA</span>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div>
                <span className="font-bold text-slate-200 block">PR 2: READING</span>
                <span className="text-[10px] text-emerald-400">STATUS: 95/100</span>
              </div>
            </Link>

            {/* Rabu */}
            <Link
              href="/student/learn/1/rabu"
              className="p-3 rounded border border-white/[0.08] bg-[#141620] hover:border-white/30 transition flex flex-col justify-between h-24"
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>RABU</span>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div>
                <span className="font-bold text-slate-200 block">PR 3: DEBUG</span>
                <span className="text-[10px] text-emerald-400">STATUS: 95/100</span>
              </div>
            </Link>

            {/* Kamis */}
            <Link
              href="/student/learn/1/kamis"
              className="p-3 rounded border border-amber-500/40 bg-[#141620] hover:border-amber-400 transition flex flex-col justify-between h-24"
            >
              <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold">
                <span>KAMIS</span>
                <Clock className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div>
                <span className="font-bold text-white block">PR 4: PRE-READ</span>
                <span className="text-[10px] text-amber-300">TUGAS HARI INI</span>
              </div>
            </Link>

            {/* Jumat */}
            <div className="p-3 rounded border border-white/[0.08] bg-[#10121a] flex flex-col justify-between h-24">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>JUMAT</span>
                <span className="text-[10px] bg-white/[0.08] px-1 rounded">2 JAM</span>
              </div>
              <div>
                <span className="font-bold text-slate-300 block">SESI LIVE 1</span>
                <span className="text-[10px] text-slate-400">16.00 - 18.00</span>
              </div>
            </div>

            {/* Sabtu */}
            <div className="p-3 rounded border border-white/[0.08] bg-[#10121a] flex flex-col justify-between h-24">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>SABTU</span>
                <span className="text-[10px] bg-white/[0.08] px-1 rounded">2 JAM</span>
              </div>
              <div>
                <span className="font-bold text-slate-300 block">SESI LIVE 2</span>
                <span className="text-[10px] text-slate-400">16.00 - 18.00</span>
              </div>
            </div>

            {/* Minggu */}
            <div className="p-3 rounded border border-white/[0.04] bg-[#0c0d14] flex flex-col justify-between h-24 opacity-60">
              <div className="text-[11px] text-slate-400">MINGGU</div>
              <div>
                <span className="font-medium text-slate-400 block">REST &amp; REPORT</span>
                <span className="text-[10px] text-slate-400">RAPOR ORTU</span>
              </div>
            </div>
          </div>
        </div>

        {/* 12-Week Roadmap Table */}
        <div className="border border-white/[0.08] rounded-xl bg-[#0f1118] p-6 space-y-4 font-mono">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-xs">
            <span className="text-slate-400 uppercase tracking-widest block">
              03 // SILABUS ROADMAP 12 MINGGU
            </span>
            <span className="text-slate-400">TRACK: PYTHON_CORE</span>
          </div>

          <div className="divide-y divide-white/[0.06] text-xs">
            {CURRICULUM_DATA.map((w) => {
              const isCurrent = w.week === progress.currentWeek;
              const isCompleted = w.week < progress.currentWeek;

              return (
                <div
                  key={w.week}
                  className={`py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isCurrent ? "text-white" : isCompleted ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  <div className="flex items-start sm:items-center space-x-4">
                    <span className="w-12 text-slate-400">
                      M{w.week.toString().padStart(2, "0")}
                    </span>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-200">{w.title}</span>
                        {w.capstoneInfo && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            CAPSTONE
                          </span>
                        )}
                      </div>
                      <p className="font-sans text-[11px] text-slate-400 hidden sm:block mt-0.5">
                        {w.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    {isCurrent ? (
                      <Link
                        href={`/student/learn/${w.week}/senin`}
                        className="px-3 py-1 rounded bg-white text-black font-bold text-xs hover:bg-slate-200 transition"
                      >
                        BUKA MODUL &rarr;
                      </Link>
                    ) : isCompleted ? (
                      <span className="text-emerald-400 flex items-center space-x-1 sm:justify-end">
                        <Check className="w-3.5 h-3.5" />
                        <span>SELESAI</span>
                      </span>
                    ) : (
                      <span className="text-slate-600">TERKUNCI</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
