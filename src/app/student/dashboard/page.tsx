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
  Flame,
  Zap,
  Award,
  Code2,
  Video,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface DayRoutineItem {
  key: DayKey;
  dayIndex: number;
  label: string;
  typeLabel: string;
  title: string;
  href: string;
  isLiveClass: boolean;
}

export default function StudentDashboardPage() {
  const { progress, isTaskCompleted } = useSession();
  const { serverTime, activeDayIndex } = useServerTime(15000);

  // 7-day routine data simplified for current week (Pekan 4)
  const weeklyDays: DayRoutineItem[] = [
    {
      key: "senin",
      dayIndex: 1,
      label: "SENIN",
      typeLabel: "PR 15 Menit",
      title: "Fungsi Modular (def)",
      href: "/student/learn/4/senin",
      isLiveClass: false,
    },
    {
      key: "selasa",
      dayIndex: 2,
      label: "SELASA",
      typeLabel: "PR 15 Menit",
      title: "Alur Game CLI",
      href: "/student/learn/4/selasa",
      isLiveClass: false,
    },
    {
      key: "rabu",
      dayIndex: 3,
      label: "RABU",
      typeLabel: "PR 20 Menit",
      title: "Debug return Terlewat",
      href: "/student/learn/4/rabu",
      isLiveClass: false,
    },
    {
      key: "kamis",
      dayIndex: 4,
      label: "KAMIS",
      typeLabel: "PR 20 Menit",
      title: "Modul Random Capstone",
      href: "/student/learn/4/kamis",
      isLiveClass: false,
    },
    {
      key: "jumat",
      dayIndex: 5,
      label: "JUMAT",
      typeLabel: "Tatap Muka 2 Jam",
      title: "Fungsi Modular & Analogi",
      href: "/student/live-session/4/jumat",
      isLiveClass: true,
    },
    {
      key: "sabtu",
      dayIndex: 6,
      label: "SABTU",
      typeLabel: "Capstone 2 Jam",
      title: "Game Konsol CLI",
      href: "/student/live-session/4/sabtu",
      isLiveClass: true,
    },
    {
      key: "minggu",
      dayIndex: 7,
      label: "MINGGU",
      typeLabel: "Evaluasi",
      title: "Rapor Belajar Pekan",
      href: "/student/profile",
      isLiveClass: false,
    },
  ];

  // Helper to determine clean, uncrowded card states:
  // 1. HIJAU: Selesai
  // 2. MERAH: Terlewat & Belum Selesai (hari lampau)
  // 3. BIRU: Hari Ini (aktif)
  // 4. NETRAL: Jadwal Mendatang
  const getCardStatus = (day: DayRoutineItem) => {
    const isCompleted = isTaskCompleted(progress.currentWeek, day.key);
    const isPast = day.dayIndex < activeDayIndex;
    const isToday = day.dayIndex === activeDayIndex;

    if (isCompleted) {
      return {
        cardStyle:
          "bg-emerald-50/90 border-2 border-emerald-500 text-emerald-950 hover:border-emerald-600 shadow-2xs",
        badgeStyle: "bg-emerald-100 text-emerald-800 font-bold",
        statusText: "✓ Selesai",
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
      };
    }

    if (isPast) {
      return {
        cardStyle:
          "bg-red-50/90 border-2 border-red-500 text-red-950 hover:border-red-600 shadow-2xs ring-1 ring-red-200",
        badgeStyle: "bg-red-100 text-red-800 font-bold animate-pulse",
        statusText: "✕ Terlewat",
        icon: <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />,
      };
    }

    if (isToday) {
      return {
        cardStyle:
          "bg-blue-50 border-2 border-blue-600 text-blue-950 hover:border-blue-700 shadow-sm ring-2 ring-blue-300",
        badgeStyle: "bg-blue-600 text-white font-bold",
        statusText: "● Hari Ini",
        icon: day.isLiveClass ? (
          <Video className="w-4 h-4 text-blue-600 animate-pulse shrink-0" />
        ) : (
          <Clock className="w-4 h-4 text-blue-600 shrink-0" />
        ),
      };
    }

    return {
      cardStyle:
        "bg-white border border-slate-200 text-slate-700 hover:border-slate-300 shadow-2xs",
      badgeStyle: "bg-slate-100 text-slate-600 font-medium",
      statusText: "Mendatang",
      icon: <Clock className="w-4 h-4 text-slate-400 shrink-0" />,
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-7 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-7">
        {/* ======================================================== */}
        {/* 1. HERO UTAMA & LIVE SERVER TRACKER (RINGKAS & RAPI)     */}
        {/* ======================================================== */}
        <div className="ui-card-outer p-6 sm:p-7 bg-white border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            {/* Live Server Tracking Chip */}
            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                <span>SERVER LIVE</span>
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-slate-600 font-semibold">
                {serverTime.dateFormatted} // {serverTime.timeFormatted}
              </span>
            </div>

            <div className="text-xs font-mono text-slate-500">
              ROLE: <strong className="text-slate-800">ANDI PRATAMA (SISWA)</strong>
            </div>
          </div>

          {/* Greeting & Headline */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-700 font-bold">
                  LEVEL 02 &bull; LOGIC APPRENTICE
                </span>
                <span className="text-slate-300">&bull;</span>
                <span className="text-slate-500 font-medium">PEKAN KE-4 DARI 12</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Pekan 04: Fungsi Modular &amp; Proyek Capstone 1
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                Hari ini jadwal{" "}
                <strong className="text-blue-700 font-bold">
                  Sesi Tatap Muka 2 Jam (16.00 WIB)
                </strong>
                . Buka modul materi untuk persiapan live coding bersama mentor.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <Link
                href="/student/live-session/4/jumat"
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition flex items-center space-x-2 shadow-xs cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>MASUK KELAS TATAP MUKA LIVE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="pt-2 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-600 font-semibold flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>EXP: 340 / 1000 XP MENUJU LEVEL 3</span>
              </span>
              <span className="text-blue-700 font-bold">34% TUNTAS</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: "34%" }}
              />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. 3 STATS RINGKAS                                       */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="ui-card-inner bg-white border border-slate-200 p-4 rounded-xl shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase block">
                STREAK_HARIAN
              </span>
              <div className="text-2xl font-extrabold text-slate-900 font-mono mt-0.5">
                {progress.streakDays.toString().padStart(2, "0")}{" "}
                <span className="text-sm font-bold text-amber-600">Hari Berturut</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
              <Flame className="w-4 h-4 text-amber-600 fill-amber-600" />
            </div>
          </div>

          <div className="ui-card-inner bg-white border border-slate-200 p-4 rounded-xl shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase block">
                TOTAL_PENGALAMAN
              </span>
              <div className="text-2xl font-extrabold text-slate-900 font-mono mt-0.5">
                {progress.xpPoints}{" "}
                <span className="text-sm font-bold text-blue-600">XP</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
              <Zap className="w-4 h-4 text-blue-600" />
            </div>
          </div>

          <div className="ui-card-inner bg-white border border-slate-200 p-4 rounded-xl shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase block">
                PROGRES_KURIKULUM
              </span>
              <div className="text-2xl font-extrabold text-slate-900 font-mono mt-0.5">
                {progress.currentWeek.toString().padStart(2, "0")}{" "}
                <span className="text-sm font-bold text-emerald-600">/ 12 Pekan</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. TUGAS & RUTINITAS PEKAN INI (CARD TIDAK MENUMPUK)     */}
        {/* ======================================================== */}
        <div className="ui-card-outer p-6 bg-white border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
            <div>
              <span className="text-xs font-mono text-blue-700 uppercase tracking-widest font-bold block">
                01 // SIKLUS MINGGUAN PEKAN KE-4
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                Rutinitas Tugas Harian &amp; Sesi Pertemuan
              </h2>
            </div>

            {/* Clean Legend */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center space-x-1.5 text-emerald-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span>Selesai</span>
              </span>
              <span className="flex items-center space-x-1.5 text-red-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                <span>Terlewat</span>
              </span>
              <span className="flex items-center space-x-1.5 text-blue-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                <span>Hari Ini</span>
              </span>
            </div>
          </div>

          {/* 7 Clean Uncrowded Day Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {weeklyDays.map((day) => {
              const status = getCardStatus(day);

              return (
                <Link
                  key={day.key}
                  href={day.href}
                  className={`p-3.5 rounded-xl transition-all duration-150 flex flex-col justify-between h-36 hover:scale-[1.02] cursor-pointer ${status.cardStyle}`}
                >
                  {/* Top: Day Label & Status Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-extrabold tracking-wider">
                      {day.label}
                    </span>
                    {status.icon}
                  </div>

                  {/* Middle: Type & Short Title */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block leading-none">
                      {day.typeLabel}
                    </span>
                    <h3 className="text-xs font-bold leading-tight line-clamp-2">
                      {day.title}
                    </h3>
                  </div>

                  {/* Bottom: Clean Status Chip */}
                  <div className="pt-2 border-t border-current/15">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md inline-block ${status.badgeStyle}`}
                    >
                      {status.statusText}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. DAFTAR SILABUS 12 PEKAN — 1 KOLOM SAJA (LINEAR & RAPI)*/}
        {/* ======================================================== */}
        <div className="ui-card-outer p-6 bg-white border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
            <div>
              <span className="text-xs font-mono text-blue-700 uppercase tracking-widest font-bold block">
                02 // SILABUS &amp; MATERI LENGKAP 12 PEKAN
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                Daftar Materi Pembelajaran Setiap Minggu
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              TRACK: PYTHON 1-ON-1 &bull; 24 PERTEMUAN TATAP MUKA
            </span>
          </div>

          {/* 1 COLUMN LIST (1 KOLOM SAJA) */}
          <div className="space-y-2.5">
            {CURRICULUM_DATA.map((w) => {
              const isCurrent = w.week === progress.currentWeek;
              const isCompleted = w.week < progress.currentWeek;

              return (
                <div
                  key={w.week}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 ${
                    isCurrent
                      ? "bg-blue-50/70 border-2 border-blue-400 shadow-xs ring-1 ring-blue-200"
                      : isCompleted
                      ? "bg-white border-slate-200 hover:border-slate-300 shadow-2xs"
                      : "bg-slate-50/70 border-slate-200 text-slate-500"
                  }`}
                >
                  {/* Left: Week Badge + Title & Description in 1 clean unit */}
                  <div className="flex items-start sm:items-center space-x-3.5 min-w-0">
                    <span
                      className={`w-12 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        isCurrent
                          ? "bg-blue-600 text-white"
                          : isCompleted
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      M{w.week.toString().padStart(2, "0")}
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3
                          className={`text-sm font-bold truncate ${
                            isCurrent
                              ? "text-blue-950"
                              : isCompleted
                              ? "text-slate-900"
                              : "text-slate-700"
                          }`}
                        >
                          {w.title}
                        </h3>

                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium hidden md:inline">
                          Fase {w.phase}
                        </span>

                        {w.capstoneInfo && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center space-x-1">
                            <Sparkles className="w-3 h-3 text-amber-600" />
                            <span>CAPSTONE</span>
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                        {w.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Status & Action Button */}
                  <div className="shrink-0 flex items-center justify-between sm:justify-end space-x-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div>
                      {isCurrent ? (
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                          PEKAN AKTIF
                        </span>
                      ) : isCompleted ? (
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>SELESAI</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono font-medium text-slate-400">
                          TERJADWAL
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/student/curriculum/${w.week}`}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1 ${
                        isCurrent
                          ? "bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      <span>Lihat Materi</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
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
