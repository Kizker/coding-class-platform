"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth/sessionContext";
import { CURRICULUM_DATA } from "@/data/curriculum";
import { useServerTime } from "@/hooks/useServerTime";
import { DayKey } from "@/app/api/v1/server-time/route";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  Terminal,
  Activity,
  Flame,
  Zap,
  Award,
  Calendar,
  Code2,
  Video,
  Radio,
  BookOpen,
  Sparkles,
  ChevronRight,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";

interface DayRoutineConfig {
  key: DayKey;
  label: string;
  dayIndex: number;
  typeBadge: string;
  badgeBg: string;
  badgeText: string;
  title: string;
  durationLabel: string;
  href: string;
  isLiveClass: boolean;
  liveTime?: string;
}

export default function StudentDashboardPage() {
  const { progress, isTaskCompleted, toggleTaskCompleted } = useSession();
  const {
    serverTime,
    activeDayKey,
    activeDayIndex,
    isLoading,
    isLiveConnected,
    refetch,
    simulatedDay,
    setSimulatedDay,
  } = useServerTime(15000);

  const [showSimControl, setShowSimControl] = useState<boolean>(false);

  // Configuration for 7-day routine in Week 4 (or current week)
  const daysConfig: DayRoutineConfig[] = [
    {
      key: "senin",
      label: "SENIN",
      dayIndex: 1,
      typeBadge: "RECALL",
      badgeBg: "bg-blue-100",
      badgeText: "text-blue-800",
      title: "PR 1: Mendefinisikan Fungsi (def)",
      durationLabel: "15 MNT",
      href: "/student/learn/4/senin",
      isLiveClass: false,
    },
    {
      key: "selasa",
      label: "SELASA",
      dayIndex: 2,
      typeBadge: "CODE_READ",
      badgeBg: "bg-purple-100",
      badgeText: "text-purple-800",
      title: "PR 2: Alur Logika Game CLI",
      durationLabel: "15 MNT",
      href: "/student/learn/4/selasa",
      isLiveClass: false,
    },
    {
      key: "rabu",
      label: "RABU",
      dayIndex: 3,
      typeBadge: "DEBUGGING",
      badgeBg: "bg-amber-100",
      badgeText: "text-amber-800",
      title: "PR 3: Perbaikan Return Terlewat",
      durationLabel: "20 MNT",
      href: "/student/learn/4/rabu",
      isLiveClass: false,
    },
    {
      key: "kamis",
      label: "KAMIS",
      dayIndex: 4,
      typeBadge: "PRE_READ",
      badgeBg: "bg-indigo-100",
      badgeText: "text-indigo-800",
      title: "PR 4: Eksplorasi Modul Random",
      durationLabel: "20 MNT",
      href: "/student/learn/4/kamis",
      isLiveClass: false,
    },
    {
      key: "jumat",
      label: "JUMAT",
      dayIndex: 5,
      typeBadge: "LIVE 2 JAM",
      badgeBg: "bg-emerald-100",
      badgeText: "text-emerald-800",
      title: "Tatap Muka: Fungsi Modular & Analogi",
      durationLabel: "120 MNT",
      href: "/student/curriculum/4",
      isLiveClass: true,
      liveTime: "16.00 - 18.00 WIB",
    },
    {
      key: "sabtu",
      label: "SABTU",
      dayIndex: 6,
      typeBadge: "CAPSTONE",
      badgeBg: "bg-amber-100",
      badgeText: "text-amber-800",
      title: "Tatap Muka: Game Konsol CLI",
      durationLabel: "120 MNT",
      href: "/student/curriculum/4",
      isLiveClass: true,
      liveTime: "16.00 - 18.00 WIB",
    },
    {
      key: "minggu",
      label: "MINGGU",
      dayIndex: 7,
      typeBadge: "EVALUASI",
      badgeBg: "bg-slate-100",
      badgeText: "text-slate-700",
      title: "Rapor Belajar & Refleksi Pekan",
      durationLabel: "REVIEW",
      href: "/student/profile",
      isLiveClass: false,
    },
  ];

  // Helper to determine card state & color rules:
  // 1. HIJAU: Jika tugas/pertemuan sudah dikerjakan (completed)
  // 2. MERAH: Jika belum dikerjakan dan sudah terlewat hari (missed / overdue)
  // 3. BIRU / AKTIF: Jika hari ini (today) dan belum selesai
  // 4. NETRAL / PUTIH: Jika jadwal mendatang (future)
  const getCardStatus = (day: DayRoutineConfig) => {
    const isCompleted = isTaskCompleted(progress.currentWeek, day.key);
    const isPast = day.dayIndex < activeDayIndex;
    const isToday = day.dayIndex === activeDayIndex;
    const isFuture = day.dayIndex > activeDayIndex;

    if (isCompleted) {
      return {
        state: "completed" as const,
        label: "SUDAH DIKERJAKAN",
        cardClass:
          "bg-emerald-50/80 border-2 border-emerald-500 text-emerald-950 shadow-xs hover:border-emerald-600",
        badgeClass: "bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold",
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
        actionText: "Lihat Hasil",
      };
    }

    if (isPast) {
      return {
        state: "overdue" as const,
        label: "TERLEWAT / BELUM",
        cardClass:
          "bg-red-50/80 border-2 border-red-500 text-red-950 shadow-xs hover:border-red-600 ring-1 ring-red-200",
        badgeClass: "bg-red-100 text-red-800 border border-red-300 font-bold animate-pulse",
        icon: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />,
        actionText: "Kerjakan Sekarang",
      };
    }

    if (isToday) {
      return {
        state: "today" as const,
        label: "HARI INI (AKTIF)",
        cardClass:
          "bg-blue-50/90 border-2 border-blue-600 text-blue-950 shadow-md ring-2 ring-blue-300 hover:border-blue-700",
        badgeClass: "bg-blue-600 text-white font-bold",
        icon: day.isLiveClass ? (
          <Video className="w-5 h-5 text-blue-600 animate-pulse shrink-0" />
        ) : (
          <Clock className="w-5 h-5 text-blue-600 animate-spin shrink-0" />
        ),
        actionText: day.isLiveClass ? "Masuk Sesi Tatap Muka" : "Mulai Misi Hari Ini",
      };
    }

    return {
      state: "future" as const,
      label: "MENDATANG",
      cardClass:
        "bg-white border border-slate-200 text-slate-700 hover:border-slate-300 shadow-2xs",
      badgeClass: "bg-slate-100 text-slate-600 font-semibold",
      icon: <Clock className="w-4 h-4 text-slate-400 shrink-0" />,
      actionText: "Lihat Silabus",
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ======================================================== */}
        {/* 1. LIVE SERVER TRACKING BANNER & HEADER                  */}
        {/* ======================================================== */}
        <div className="ui-card-outer p-6 sm:p-7 bg-white border border-slate-200 shadow-xs space-y-6">
          {/* Live Server Tracking Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                <span>LIVE SERVER TRACKER</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">&bull;</span>
              <span className="font-semibold text-slate-700">
                {serverTime.dateFormatted} // {serverTime.timeFormatted}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => refetch()}
                title="Refresh Waktu Server"
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition flex items-center space-x-1 text-xs font-mono"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">SYNC</span>
              </button>

              <button
                onClick={() => setShowSimControl(!showSimControl)}
                className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-mono flex items-center space-x-1"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                <span>{simulatedDay ? `SIMULASI: ${simulatedDay.toUpperCase()}` : "TES HARI"}</span>
              </button>
            </div>
          </div>

          {/* Optional Simulation Control Panel for Evaluation */}
          {showSimControl && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-600 font-semibold">
                <span>SIMULASI DETEKSI HARI SERVER UNTUK REVIEW:</span>
                {simulatedDay && (
                  <button
                    onClick={() => setSimulatedDay(null)}
                    className="text-blue-600 hover:underline text-[11px]"
                  >
                    Reset ke Server Asli ({serverTime.dayName})
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"] as DayKey[]).map(
                  (d) => (
                    <button
                      key={d}
                      onClick={() => setSimulatedDay(d)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        activeDayKey === d
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {d.toUpperCase()} {serverTime.dayKey === d ? "(SERVER ASLI)" : ""}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Student Welcome & Level Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
                  LEVEL 02 &bull; LOGIC APPRENTICE
                </span>
                <span className="text-slate-300">&bull;</span>
                <span className="text-slate-600 font-semibold">SISWA: ANDI PRATAMA</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Pekan 04: Fungsi Modular &amp; Proyek Capstone 1
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                Hari ini adalah{" "}
                <strong className="text-blue-700 font-bold uppercase">{activeDayKey}</strong>.{" "}
                {activeDayKey === "jumat"
                  ? "Ada Sesi Tatap Muka 2 Jam pukul 16.00 WIB. Pelajari modul fungsi dan siapkan pertanyaanmu!"
                  : activeDayKey === "sabtu"
                  ? "Waktunya Sesi Capstone Tatap Muka 2 Jam bersama mentor untuk merakit Game CLI!"
                  : "Selesaikan PR koding 15 menit untuk menjaga streak dan mengumpulkan XP."}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href={
                  activeDayKey === "jumat" || activeDayKey === "sabtu"
                    ? "/student/curriculum/4"
                    : `/student/learn/4/${activeDayKey}`
                }
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 hover:shadow-md transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
              >
                <Code2 className="w-4 h-4" />
                <span>
                  {activeDayKey === "jumat" || activeDayKey === "sabtu"
                    ? "BUKA MATERI TATAP MUKA"
                    : "LANJUT PR HARI INI"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* XP Progress Milestone Bar */}
          <div className="pt-2 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-600 font-semibold flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>PROGRESS ROADMAP: 340 / 1000 XP MENUJU LEVEL 3</span>
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

        {/* ======================================================== */}
        {/* 2. 3 TELEMETRY CARDS (STREAK, XP, PROGRESS)             */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
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
                {progress.streakDays.toString().padStart(2, "0")}{" "}
                <span className="text-lg font-bold text-amber-600">Hari</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Konsistensi mengerjakan PR harian 15 menit (Senin–Kamis).
              </p>
            </div>
          </div>

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
                {progress.currentWeek.toString().padStart(2, "0")}{" "}
                <span className="text-lg font-bold text-emerald-600">/ 12 Pekan</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Fase 1: Fondasi Logika &amp; Proyek Capstone 1.
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. TUGAS & RUTINITAS PEKAN INI (SENIN S.D MINGGU)        */}
        {/*    DENGAN PENANDA WARNA HIJAU / MERAH / BIRU DYNAMIC     */}
        {/* ======================================================== */}
        <div className="ui-card-outer p-6 sm:p-7 space-y-5 bg-white border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-blue-700 uppercase tracking-widest font-bold">
                  01 // SIKLUS MINGGUAN PEKAN KE-4
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                  Realtime Day Tracking
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                Tugas Harian &amp; Sesi Pertemuan Pekan Ini
              </h2>
            </div>

            {/* Status Legend */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="flex items-center space-x-1.5 text-emerald-700 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                <span>Hijau: Selesai</span>
              </span>
              <span className="flex items-center space-x-1.5 text-red-700 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                <span>Merah: Terlewat</span>
              </span>
              <span className="flex items-center space-x-1.5 text-blue-700 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                <span>Biru: Hari Ini</span>
              </span>
              <span className="flex items-center space-x-1.5 text-slate-500 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
                <span>Abu: Mendatang</span>
              </span>
            </div>
          </div>

          {/* 7 Uniform Day Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3.5">
            {daysConfig.map((day) => {
              const status = getCardStatus(day);
              const isDone = isTaskCompleted(progress.currentWeek, day.key);

              return (
                <div
                  key={day.key}
                  className={`p-4 rounded-xl transition-all flex flex-col justify-between min-h-[175px] ${status.cardClass}`}
                >
                  {/* Top Bar: Day Name & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-extrabold tracking-wider">
                      {day.label}
                    </span>
                    {status.icon}
                  </div>

                  {/* Body: Badge & Title */}
                  <div className="space-y-1.5 my-2">
                    <div className="flex items-center space-x-1.5">
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${status.badgeClass}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold leading-snug line-clamp-2">
                      {day.title}
                    </h3>
                    <p className="text-[11px] font-mono opacity-80">
                      {day.liveTime ? day.liveTime : `Durasi: ${day.durationLabel}`}
                    </p>
                  </div>

                  {/* Bottom: Action link & Test Toggle */}
                  <div className="pt-2 border-t border-current/15 flex items-center justify-between text-[11px] font-mono font-bold">
                    <Link
                      href={day.href}
                      className="hover:underline flex items-center space-x-1"
                    >
                      <span>{status.actionText}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>

                    {/* Quick status toggle button for teacher/student testing */}
                    <button
                      onClick={() => toggleTaskCompleted(progress.currentWeek, day.key)}
                      title={`Klik untuk ubah status pengerjaan hari ${day.label}`}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-black/5 hover:bg-black/10 transition"
                    >
                      {isDone ? "Batal" : "Tandai"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. DAFTAR MATERI SETIAP MINGGUNYA (PEKAN 1 S.D 12)       */}
        {/*    DITEMPATKAN DI BAWAH TUGAS HARIAN SESUAI PERMINTAAN  */}
        {/* ======================================================== */}
        <div className="ui-card-outer p-6 sm:p-7 space-y-6 bg-white border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
            <div>
              <span className="text-xs font-mono text-blue-700 uppercase tracking-widest font-bold block">
                02 // SILABUS &amp; MATERI LENGKAP 12 PEKAN
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                Daftar Materi Pembelajaran Setiap Minggu
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Pilih pekan untuk melihat rincian pertemuan tatap muka 2 jam (Jumat &amp; Sabtu) dan PR harian (Senin–Kamis).
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>TOTAL 24 PERTEMUAN TATAP MUKA</span>
            </div>
          </div>

          {/* Phase 1, Phase 2, and Phase 3 Sections */}
          <div className="space-y-6">
            {[1, 2, 3].map((phaseNum) => {
              const phaseWeeks = CURRICULUM_DATA.filter((w) => w.phase === phaseNum);
              const phaseTitle =
                phaseNum === 1
                  ? "FASE 1: FONDASI LOGIKA, SINTAKS, & PROYEK CAPSTONE 1 (PEKAN 01 - 04)"
                  : phaseNum === 2
                  ? "FASE 2: STRUKTUR DATA, OOP, & PROYEK CAPSTONE 2 (PEKAN 05 - 08)"
                  : "FASE 3: FULLSTACK PYTHON, API, & FINAL CAPSTONE (PEKAN 09 - 12)";

              return (
                <div key={phaseNum} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                      {phaseTitle}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {phaseWeeks.map((w) => {
                      const isCurrent = w.week === progress.currentWeek;
                      const isCompleted = w.week < progress.currentWeek;

                      return (
                        <div
                          key={w.week}
                          className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                            isCurrent
                              ? "bg-blue-50/60 border-2 border-blue-400 shadow-xs ring-1 ring-blue-200"
                              : isCompleted
                              ? "bg-white border-slate-200 hover:border-slate-300 shadow-2xs"
                              : "bg-slate-50/70 border-slate-200/80 text-slate-500"
                          }`}
                        >
                          {/* Top: Week Badge & Status */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span
                                className={`px-2.5 py-1 rounded-lg font-mono font-bold text-xs ${
                                  isCurrent
                                    ? "bg-blue-600 text-white"
                                    : isCompleted
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-slate-200 text-slate-600"
                                }`}
                              >
                                PEKAN {w.week.toString().padStart(2, "0")}
                              </span>

                              {w.capstoneInfo && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-800 border border-amber-300">
                                  CAPSTONE
                                </span>
                              )}
                            </div>

                            <div className="text-right">
                              {isCurrent ? (
                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                                  PEKAN BERJALAN
                                </span>
                              ) : isCompleted ? (
                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                                  <span>TUNTAS</span>
                                </span>
                              ) : (
                                <span className="text-[10px] font-mono font-semibold text-slate-400">
                                  TERJADWAL
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Middle: Title & Description */}
                          <div>
                            <h3
                              className={`text-sm font-bold ${
                                isCurrent
                                  ? "text-blue-950"
                                  : isCompleted
                                  ? "text-slate-900"
                                  : "text-slate-600"
                              }`}
                            >
                              {w.title}
                            </h3>
                            <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                              {w.description}
                            </p>
                          </div>

                          {/* Chips: Pertemuan Tatap Muka & PR */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-600">
                            <span className="px-2 py-0.5 rounded bg-slate-100 flex items-center space-x-1">
                              <Video className="w-3 h-3 text-emerald-600" />
                              <span>2x Tatap Muka (Jumat &amp; Sabtu)</span>
                            </span>
                            <span className="px-2 py-0.5 rounded bg-slate-100 flex items-center space-x-1">
                              <Code2 className="w-3 h-3 text-blue-600" />
                              <span>4x PR Harian (Senin–Kamis)</span>
                            </span>
                          </div>

                          {/* Bottom CTA to Weekly Material Details */}
                          <div className="pt-1">
                            <Link
                              href={`/student/curriculum/${w.week}`}
                              className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                                isCurrent
                                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
                                  : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                              }`}
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Lihat Detail Materi &amp; Pertemuan</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
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
