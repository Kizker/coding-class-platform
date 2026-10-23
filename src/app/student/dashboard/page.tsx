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
  Calendar,
} from "lucide-react";

export default function StudentDashboardPage() {
  const { progress } = useSession();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Studio Banner */}
        <div className="border border-slate-200 rounded-xl bg-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-blue-700 uppercase tracking-widest">
              <span>01 // RUANG KERJA SISWA</span>
              <span>&bull;</span>
              <span>ANDI PRATAMA</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Pekan 04: Fungsi Modular &amp; Proyek Capstone 1.
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              Fokus pekan ini: Mengabstraksi kode berulang menjadi fungsi mandiri (def/return) serta menyelesaikan game konsol interaktif.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/student/learn/1/senin"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-xs hover:bg-blue-700 transition shadow-sm"
            >
              <span>BUKA PR HARI INI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3 Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-1.5 shadow-xs">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              KONSISTENSI_STREAK
            </div>
            <div className="text-3xl font-bold text-blue-700 tabular-nums">
              {progress.streakDays.toString().padStart(2, "0")} HARI
            </div>
            <p className="text-xs text-slate-600">
              Aktif mengerjakan PR harian 15 menit (Senin s.d Kamis).
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-1.5 shadow-xs">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              AKUMULASI_PENGALAMAN
            </div>
            <div className="text-3xl font-bold text-slate-900 tabular-nums">
              {progress.xpPoints} XP
            </div>
            <p className="text-xs text-slate-600">
              Poin evaluasi otomatis dari penuntasan tantangan logika.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-1.5 shadow-xs">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              PROGRES_ROADMAP
            </div>
            <div className="text-3xl font-bold text-emerald-700 tabular-nums">
              {progress.currentWeek.toString().padStart(2, "0")} / 12 PEKAN
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2 border border-slate-200">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(progress.currentWeek / progress.totalWeeks) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Weekly Routine Matrix (Senin s.d Minggu) */}
        <div className="border border-slate-200 rounded-xl bg-white p-6 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
            <div>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-semibold block">
                02 // SIKLUS MINGGUAN BELAJAR
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                Rutinitas Belajar Pekan ke-4
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Senin–Kamis 15-20 Mnt &bull; Jumat–Sabtu 2 Jam Tatap Muka
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs font-mono">
            {/* Senin */}
            <Link
              href="/student/learn/1/senin"
              className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 hover:border-blue-400 hover:bg-blue-50/30 transition flex flex-col justify-between h-24"
            >
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>SENIN</span>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block font-sans">PR 1: RECALL</span>
                <span className="text-[11px] text-emerald-700 font-semibold">100 / 100</span>
              </div>
            </Link>

            {/* Selasa */}
            <Link
              href="/student/learn/1/selasa"
              className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 hover:border-blue-400 hover:bg-blue-50/30 transition flex flex-col justify-between h-24"
            >
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>SELASA</span>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block font-sans">PR 2: READING</span>
                <span className="text-[11px] text-emerald-700 font-semibold">95 / 100</span>
              </div>
            </Link>

            {/* Rabu */}
            <Link
              href="/student/learn/1/rabu"
              className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 hover:border-blue-400 hover:bg-blue-50/30 transition flex flex-col justify-between h-24"
            >
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>RABU</span>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block font-sans">PR 3: DEBUG</span>
                <span className="text-[11px] text-emerald-700 font-semibold">95 / 100</span>
              </div>
            </Link>

            {/* Kamis */}
            <Link
              href="/student/learn/1/kamis"
              className="p-3.5 rounded-lg border border-blue-300 bg-blue-50/80 hover:border-blue-500 transition flex flex-col justify-between h-24 shadow-xs"
            >
              <div className="flex items-center justify-between text-[11px] text-blue-800 font-bold">
                <span>KAMIS</span>
                <Clock className="w-3.5 h-3.5 text-blue-700" />
              </div>
              <div>
                <span className="font-bold text-blue-950 block font-sans">PR 4: PRE-READ</span>
                <span className="text-[11px] text-blue-700 font-bold">TUGAS HARI INI</span>
              </div>
            </Link>

            {/* Jumat */}
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex flex-col justify-between h-24">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>JUMAT</span>
                <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded font-semibold text-slate-700">2 JAM</span>
              </div>
              <div>
                <span className="font-bold text-slate-800 block font-sans">SESI LIVE 1</span>
                <span className="text-[10px] text-slate-600">16.00 - 18.00</span>
              </div>
            </div>

            {/* Sabtu */}
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex flex-col justify-between h-24">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>SABTU</span>
                <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded font-semibold text-slate-700">2 JAM</span>
              </div>
              <div>
                <span className="font-bold text-slate-800 block font-sans">SESI LIVE 2</span>
                <span className="text-[10px] text-slate-600">16.00 - 18.00</span>
              </div>
            </div>

            {/* Minggu */}
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col justify-between h-24 text-slate-400">
              <div className="text-[11px] font-semibold">MINGGU</div>
              <div>
                <span className="font-medium text-slate-600 block font-sans">REST &amp; REVIEW</span>
                <span className="text-[10px] text-slate-500">RAPOR ORTU</span>
              </div>
            </div>
          </div>
        </div>

        {/* 12-Week Roadmap Table */}
        <div className="border border-slate-200 rounded-xl bg-white p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs font-mono">
            <span className="text-slate-500 uppercase tracking-widest font-semibold block">
              03 // SILABUS ROADMAP 12 PEKAN
            </span>
            <span className="text-slate-600 font-medium">TRACK: PYTHON_CORE</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs font-mono">
            {CURRICULUM_DATA.map((w) => {
              const isCurrent = w.week === progress.currentWeek;
              const isCompleted = w.week < progress.currentWeek;

              return (
                <div
                  key={w.week}
                  className={`py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isCurrent ? "bg-blue-50/40 -mx-2 px-2 rounded-lg" : ""
                  }`}
                >
                  <div className="flex items-start sm:items-center space-x-4">
                    <span className="w-12 text-slate-500 font-semibold">
                      M{w.week.toString().padStart(2, "0")}
                    </span>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 font-sans text-sm">{w.title}</span>
                        {w.capstoneInfo && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                            CAPSTONE
                          </span>
                        )}
                      </div>
                      <p className="font-sans text-xs text-slate-600 hidden sm:block mt-0.5">
                        {w.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    {isCurrent ? (
                      <Link
                        href={`/student/learn/${w.week}/senin`}
                        className="px-3 py-1.5 rounded-md bg-blue-600 text-white font-medium text-xs hover:bg-blue-700 transition shadow-xs inline-block"
                      >
                        BUKA MODUL &rarr;
                      </Link>
                    ) : isCompleted ? (
                      <span className="text-emerald-700 font-semibold flex items-center space-x-1 sm:justify-end">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>SELESAI</span>
                      </span>
                    ) : (
                      <span className="text-slate-400">TERKUNCI</span>
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
