"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth/sessionContext";
import { CURRICULUM_DATA } from "@/data/curriculum";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  Terminal,
  Activity,
  Flame,
  Zap,
  Award,
  Calendar,
  Code2,
} from "lucide-react";

export default function StudentDashboardPage() {
  const { progress } = useSession();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Studio Hero Banner */}
        <div className="ui-card-outer p-6 sm:p-8 bg-gradient-to-br from-white via-white to-blue-50/40 border border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2.5">
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
                  LEVEL 02 &bull; LOGIC APPRENTICE
                </span>
                <span className="text-slate-400">&bull;</span>
                <span className="text-slate-600 font-semibold">SISWA: ANDI PRATAMA</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Pekan 04: Fungsi Modular &amp; Proyek Capstone 1
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                Asah nalar logika kodingmu hari ini. Selesaikan PR harian 15 menit untuk mengumpulkan XP dan membuka sertifikat resmi Fase 1.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/student/learn/1/kamis"
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 hover:shadow-md transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
              >
                <Code2 className="w-4 h-4" />
                <span>LANJUT CODING HARI INI</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* XP Progress Milestone Bar */}
          <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-600 font-semibold flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>PROGRESS ROADMAP: 340 / 1000 XP KE LEVEL BERIKUTNYA</span>
              </span>
              <span className="text-blue-700 font-bold">34% TUNTAS</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: "34%" }}
              />
            </div>
          </div>
        </div>

        {/* 3 Telemetry Cards - Uniform Sizing & Padding */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Card 1: Streak */}
          <div className="ui-card-inner bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-500 tracking-wider uppercase">
                STREAK_HARIAN
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
                <Flame className="w-4 h-4 text-amber-600 fill-amber-600" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono tabular-nums">
                {progress.streakDays.toString().padStart(2, "0")} <span className="text-lg font-bold text-amber-600">Hari</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Konsisten mengerjakan PR harian 15 menit (Senin s.d Kamis).
              </p>
            </div>
          </div>

          {/* Card 2: XP */}
          <div className="ui-card-inner bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-500 tracking-wider uppercase">
                TOTAL_PENGALAMAN
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
                <Zap className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono tabular-nums">
                {progress.xpPoints} <span className="text-lg font-bold text-blue-600">XP</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Poin evaluasi otomatis dari penuntasan tantangan logika.
              </p>
            </div>
          </div>

          {/* Card 3: Roadmap Progress */}
          <div className="ui-card-inner bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-500 tracking-wider uppercase">
                KEMAJUAN_KURIKULUM
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <Award className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono tabular-nums">
                {progress.currentWeek.toString().padStart(2, "0")} <span className="text-lg font-bold text-emerald-600">/ 12 Pekan</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Fase 1: Fondasi Logika &amp; Proyek Capstone 1.
              </p>
            </div>
          </div>
        </div>

        {/* Weekly Routine Matrix (Senin s.d Minggu) - Uniform Inner Boxes */}
        <div className="ui-card-outer p-6 sm:p-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
            <div>
              <span className="text-xs font-mono text-blue-700 uppercase tracking-widest font-bold block">
                02 // SIKLUS MINGGUAN BELAJAR
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                Rutinitas Misi Pekan ke-4
              </h2>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>SENIN–KAMIS 15 MNT &bull; JUMAT–SABTU 2 JAM LIVE</span>
            </div>
          </div>

          {/* 7 Uniform Day Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {/* Senin */}
            <Link
              href="/student/learn/1/senin"
              className="ui-card-inner-interactive flex flex-col justify-between h-36 bg-white border border-slate-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-500">SENIN</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">
                  RECALL
                </span>
                <h3 className="text-xs font-bold text-slate-900 leading-tight">
                  PR 1: Halo Dunia
                </h3>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-bold text-emerald-700">
                <span>SKOR</span>
                <span>100 / 100</span>
              </div>
            </Link>

            {/* Selasa */}
            <Link
              href="/student/learn/1/selasa"
              className="ui-card-inner-interactive flex flex-col justify-between h-36 bg-white border border-slate-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-500">SELASA</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-50 text-purple-700">
                  CODE_READ
                </span>
                <h3 className="text-xs font-bold text-slate-900 leading-tight">
                  PR 2: Alur Kode
                </h3>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-bold text-emerald-700">
                <span>SKOR</span>
                <span>95 / 100</span>
              </div>
            </Link>

            {/* Rabu */}
            <Link
              href="/student/learn/1/rabu"
              className="ui-card-inner-interactive flex flex-col justify-between h-36 bg-white border border-slate-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-500">RABU</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700">
                  DEBUG
                </span>
                <h3 className="text-xs font-bold text-slate-900 leading-tight">
                  PR 3: SyntaxError
                </h3>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-bold text-emerald-700">
                <span>SKOR</span>
                <span>95 / 100</span>
              </div>
            </Link>

            {/* Kamis (Active Mission Today) */}
            <Link
              href="/student/learn/1/kamis"
              className="ui-card-inner-interactive flex flex-col justify-between h-36 bg-blue-50/70 border-2 border-blue-500 shadow-sm ring-2 ring-blue-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-blue-900">KAMIS</span>
                <Clock className="w-4 h-4 text-blue-600 animate-pulse" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white">
                  PRE_READ
                </span>
                <h3 className="text-xs font-bold text-blue-950 leading-tight">
                  PR 4: Variabel
                </h3>
              </div>
              <div className="pt-2 border-t border-blue-200 flex items-center justify-between text-[11px] font-mono font-bold text-blue-700">
                <span>MISI HARI INI</span>
                <span>&rarr;</span>
              </div>
            </Link>

            {/* Jumat (Live Class) */}
            <div className="ui-card-inner flex flex-col justify-between h-36 bg-white border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-500">JUMAT</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                  2 JAM
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">
                  LIVE TATAP MUKA
                </span>
                <h3 className="text-xs font-bold text-slate-900 leading-tight">
                  Fungsi Modular
                </h3>
              </div>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                16.00 - 18.00 WIB
              </div>
            </div>

            {/* Sabtu (Live Capstone) */}
            <div className="ui-card-inner flex flex-col justify-between h-36 bg-white border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-500">SABTU</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                  2 JAM
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700">
                  CAPSTONE 1
                </span>
                <h3 className="text-xs font-bold text-slate-900 leading-tight">
                  Game Konsol CLI
                </h3>
              </div>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                16.00 - 18.00 WIB
              </div>
            </div>

            {/* Minggu (Rest & Review) */}
            <div className="ui-card-inner flex flex-col justify-between h-36 bg-slate-50/50 border border-slate-200/60 text-slate-400">
              <div className="text-[11px] font-mono font-bold">MINGGU</div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                  REVIEW
                </span>
                <h3 className="text-xs font-bold text-slate-500 leading-tight">
                  Rapor Ortu
                </h3>
              </div>
              <div className="pt-2 border-t border-slate-200/60 text-[10px] font-mono text-slate-400">
                EVALUASI MINGGUAN
              </div>
            </div>
          </div>
        </div>

        {/* 12-Week Roadmap Table - Uniform List Items */}
        <div className="ui-card-outer p-6 sm:p-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
            <div>
              <span className="text-xs font-mono text-blue-700 uppercase tracking-widest font-bold block">
                03 // SILABUS ROADMAP 12 PEKAN
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                Target Capaian Pembelajaran Python
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500 font-semibold">
              TRACK: PYTHON_CORE &bull; 24 SESI TATAP MUKA
            </span>
          </div>

          <div className="space-y-2.5">
            {CURRICULUM_DATA.map((w) => {
              const isCurrent = w.week === progress.currentWeek;
              const isCompleted = w.week < progress.currentWeek;

              return (
                <div
                  key={w.week}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isCurrent
                      ? "bg-blue-50/60 border-blue-300 shadow-xs ring-1 ring-blue-200"
                      : isCompleted
                      ? "bg-white border-slate-200 hover:border-slate-300"
                      : "bg-slate-50/60 border-slate-200/80 text-slate-400"
                  }`}
                >
                  <div className="flex items-start sm:items-center space-x-4">
                    <span
                      className={`w-12 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        isCurrent
                          ? "bg-blue-600 text-white"
                          : isCompleted
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      M{w.week.toString().padStart(2, "0")}
                    </span>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-bold ${isCurrent ? "text-blue-950" : isCompleted ? "text-slate-900" : "text-slate-500"}`}>
                          {w.title}
                        </span>
                        {w.capstoneInfo && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-800 border border-amber-300">
                            CAPSTONE
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 hidden sm:block mt-0.5">
                        {w.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    {isCurrent ? (
                      <Link
                        href={`/student/learn/${w.week}/kamis`}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition shadow-xs inline-flex items-center space-x-1"
                      >
                        <span>BUKA TANTANGAN</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : isCompleted ? (
                      <span className="text-emerald-700 font-bold text-xs font-mono flex items-center space-x-1 sm:justify-end">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>SELESAI</span>
                      </span>
                    ) : (
                      <span className="text-xs font-mono font-semibold text-slate-400">TERKUNCI</span>
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
