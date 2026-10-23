"use client";

import React from "react";
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
  const { progress, isTaskCompleted, isMounted } = useSession();
  const { serverTime, activeDayIndex } = useServerTime(15000);

  const currentWeekNum = progress.currentWeek || 1;
  const currentWeekData =
    CURRICULUM_DATA.find((w) => w.week === currentWeekNum) || CURRICULUM_DATA[0];

  const p1 = currentWeekData.assignments.find((a) => a.day === "senin");
  const p2 = currentWeekData.assignments.find((a) => a.day === "selasa");
  const p3 = currentWeekData.assignments.find((a) => a.day === "rabu");
  const p4 = currentWeekData.assignments.find((a) => a.day === "kamis");
  const l1 = currentWeekData.liveSessions.find((s) => s.day === "jumat");
  const l2 = currentWeekData.liveSessions.find((s) => s.day === "sabtu");

  // 7-day routine data dynamically populated from current week's curriculum
  const weeklyDays: DayRoutineItem[] = [
    {
      key: "senin",
      dayIndex: 1,
      label: "Senin",
      typeLabel: "PR 15 Menit",
      title: p1 ? p1.title.replace(/^PR \d+:\s*/, "") : "Menyapa Dunia",
      href: `/student/learn/${currentWeekNum}/senin`,
      isLiveClass: false,
    },
    {
      key: "selasa",
      dayIndex: 2,
      label: "Selasa",
      typeLabel: "PR 15 Menit",
      title: p2 ? p2.title.replace(/^PR \d+:\s*/, "") : "Alur Eksekusi",
      href: `/student/learn/${currentWeekNum}/selasa`,
      isLiveClass: false,
    },
    {
      key: "rabu",
      dayIndex: 3,
      label: "Rabu",
      typeLabel: "PR 20 Menit",
      title: p3 ? p3.title.replace(/^PR \d+:\s*/, "") : "Memperbaiki Petik",
      href: `/student/learn/${currentWeekNum}/rabu`,
      isLiveClass: false,
    },
    {
      key: "kamis",
      dayIndex: 4,
      label: "Kamis",
      typeLabel: "PR 20 Menit",
      title: p4 ? p4.title.replace(/^PR \d+:\s*/, "") : "Pemanasan Variabel",
      href: `/student/learn/${currentWeekNum}/kamis`,
      isLiveClass: false,
    },
    {
      key: "jumat",
      dayIndex: 5,
      label: "Jumat",
      typeLabel: "Tatap Muka 2 Jam",
      title: l1 ? l1.title.replace(/^Pertemuan \d+:\s*/, "") : "Logika & print()",
      href: `/student/live-session/${currentWeekNum}/jumat`,
      isLiveClass: true,
    },
    {
      key: "sabtu",
      dayIndex: 6,
      label: "Sabtu",
      typeLabel: currentWeekData.capstoneInfo ? "Capstone 2 Jam" : "Tatap Muka 2 Jam",
      title: l2 ? l2.title.replace(/^Pertemuan \d+:\s*/, "") : "Kotak Memori",
      href: `/student/live-session/${currentWeekNum}/sabtu`,
      isLiveClass: true,
    },
    {
      key: "minggu",
      dayIndex: 7,
      label: "Minggu",
      typeLabel: "Refleksi",
      title: `Rapor Belajar Pekan ${String(currentWeekNum).padStart(2, "0")}`,
      href: "/student/profile",
      isLiveClass: false,
    },
  ];

  // Human-centered card color & status rules:
  // 1. Selesai: Warm Sage / Forest Emerald
  // 2. Terlewat: Warm Terracotta / Rose
  // 3. Hari Ini: Calm Indigo / Ocean
  // 4. Mendatang: Clean Warm Neutral
  const getCardStatus = (day: DayRoutineItem) => {
    const isCompleted = isTaskCompleted(progress.currentWeek, day.key);
    const isPast = day.dayIndex < activeDayIndex;
    const isToday = day.dayIndex === activeDayIndex;

    if (isCompleted) {
      return {
        cardStyle:
          "bg-emerald-50/70 border border-emerald-200 text-emerald-950 hover:border-emerald-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)]",
        badgeStyle: "bg-emerald-100/90 text-emerald-800 font-semibold",
        statusText: "Selesai",
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
      };
    }

    if (isPast) {
      return {
        cardStyle:
          "bg-rose-50/70 border border-rose-200 text-rose-950 hover:border-rose-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)]",
        badgeStyle: "bg-rose-100/90 text-rose-800 font-semibold",
        statusText: "Terlewat",
        icon: <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />,
      };
    }

    if (isToday) {
      return {
        cardStyle:
          "bg-indigo-50/80 border-2 border-indigo-500/80 text-indigo-950 shadow-sm ring-4 ring-indigo-100 hover:border-indigo-600",
        badgeStyle: "bg-indigo-600 text-white font-semibold",
        statusText: "Hari Ini",
        icon: day.isLiveClass ? (
          <Video className="w-4 h-4 text-indigo-600 animate-pulse shrink-0" />
        ) : (
          <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
        ),
      };
    }

    return {
      cardStyle:
        "bg-white/80 border border-stone-200/80 text-stone-700 hover:border-stone-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)]",
      badgeStyle: "bg-stone-100 text-stone-600 font-medium",
      statusText: "Mendatang",
      icon: <Clock className="w-4 h-4 text-stone-400 shrink-0" />,
    };
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-900 py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-5xl mx-auto space-y-9">
        {/* ======================================================== */}
        {/* 1. FOCUS HERO & INTEGRATED LEARNING SNAPSHOT             */}
        {/* ======================================================== */}
        <section className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-6">
          {/* Top Date & Context Chip */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 pb-3 border-b border-stone-100">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              <span className="font-medium text-stone-700" suppressHydrationWarning>
                {serverTime.dateFormatted}
              </span>
              <span className="text-stone-300">&bull;</span>
              <span suppressHydrationWarning>{serverTime.timeFormatted}</span>
            </div>

            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-medium text-[11px] border border-indigo-100">
              Sesi Tatap Muka Live 16.00 WIB
            </span>
          </div>

          {/* Greeting, Intent & Primary CTA */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Halo, Andi 👋
              </h1>
              <p className="text-sm text-stone-600 max-w-xl leading-relaxed">
                Hari ini waktunya belajar langsung bersama mentor di{" "}
                <strong className="text-stone-900 font-semibold">
                  Pekan {isMounted ? String(currentWeekNum).padStart(2, "0") : "01"}: {currentWeekData.title}
                </strong>
                . Klik tombol di samping untuk masuk ke ruang kelas live.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href={`/student/live-session/${currentWeekNum}/jumat`}
                className="inline-flex items-center space-x-2.5 px-6 py-3 rounded-xl bg-stone-900 text-white font-medium text-xs hover:bg-stone-800 hover:shadow-md transition-all cursor-pointer group"
              >
                <Video className="w-4 h-4 text-stone-300 group-hover:scale-110 transition-transform" />
                <span>Masuk Kelas Tatap Muka</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Integrated Learning Snapshot (Replaces Cluttered Bento Boxes) */}
          <div className="pt-4 border-t border-stone-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
              {/* Stat 1: Streak */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-lg shrink-0">
                  🔥
                </div>
                <div>
                  <div className="text-base font-bold text-stone-900" suppressHydrationWarning>
                    {isMounted ? progress.streakDays : 3} Hari Berturut
                  </div>
                  <div className="text-xs text-stone-500 font-medium">
                    Konsistensi PR Harian
                  </div>
                </div>
              </div>

              {/* Stat 2: XP */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200/60 flex items-center justify-center text-lg shrink-0">
                  ⚡
                </div>
                <div>
                  <div className="text-base font-bold text-stone-900" suppressHydrationWarning>
                    {isMounted ? progress.xpPoints : 65} XP Terkumpul
                  </div>
                  <div className="text-xs text-stone-500 font-medium">
                    Level 01 &bull; Novice Learner
                  </div>
                </div>
              </div>

              {/* Stat 3: Curriculum Roadmap */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-lg shrink-0">
                  🌱
                </div>
                <div>
                  <div className="text-base font-bold text-stone-900" suppressHydrationWarning>
                    Pekan {isMounted ? currentWeekNum : 1} dari 12
                  </div>
                  <div className="text-xs text-stone-500 font-medium">
                    Fase {currentWeekData.phase}: {currentWeekData.phaseTitle}
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle Progress Bar */}
            <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5">
              <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>Progres {currentWeekData.title}</span>
                <span className="font-semibold text-stone-800" suppressHydrationWarning>
                  {Math.round((currentWeekNum / 12) * 100)}% Kurikulum
                </span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-stone-800 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((currentWeekNum / 12) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. JADWAL BELAJAR PEKAN INI (SENIN - MINGGU)             */}
        {/* ======================================================== */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-stone-900 tracking-tight">
                Jadwal Belajar Pekan Ini
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                4 PR mandiri (15 menit) &amp; 2 sesi tatap muka interaktif bersama mentor.
              </p>
            </div>

            {/* Quiet, Human Legend */}
            <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span>Selesai</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                <span>Terlewat</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block" />
                <span className="font-semibold text-stone-800">Hari Ini</span>
              </span>
            </div>
          </div>

          {/* 7 Glanceable Uncrowded Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {weeklyDays.map((day) => {
              const status = getCardStatus(day);

              return (
                <Link
                  key={day.key}
                  href={day.href}
                  className={`p-4 rounded-2xl transition-all duration-200 flex flex-col justify-between h-36 hover:-translate-y-0.5 hover:shadow-sm cursor-pointer ${status.cardStyle}`}
                >
                  {/* Top: Day Label & Status Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">
                      {day.label}
                    </span>
                    {status.icon}
                  </div>

                  {/* Middle: Type & Short Title */}
                  <div className="space-y-1 my-auto">
                    <span className="text-[10px] text-stone-500 font-medium block leading-none">
                      {day.typeLabel}
                    </span>
                    <h3 className="text-xs font-semibold leading-snug line-clamp-2">
                      {day.title}
                    </h3>
                  </div>

                  {/* Bottom: Clean Status Pill */}
                  <div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md inline-block ${status.badgeStyle}`}
                    >
                      {status.statusText}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. SILABUS & ROADMAP 12 PEKAN (1 KOLOM LINEAR)           */}
        {/* ======================================================== */}
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900 tracking-tight">
              Silabus &amp; Roadmap 12 Pekan
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Kurikulum bertahap dari pemahaman nalar logika hingga aplikasi Python mandiri.
            </p>
          </div>

          {/* 1 Column Linear List */}
          <div className="space-y-2.5">
            {CURRICULUM_DATA.map((w) => {
              const isCurrent = w.week === progress.currentWeek;
              const isCompleted = w.week < progress.currentWeek;

              return (
                <div
                  key={w.week}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isCurrent
                      ? "bg-white border-stone-800 shadow-sm ring-1 ring-stone-800/10"
                      : isCompleted
                      ? "bg-white border-stone-200/80 hover:border-stone-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                      : "bg-stone-50/60 border-stone-200/60 text-stone-500"
                  }`}
                >
                  {/* Left: Week Badge + Title & Description in 1 clean unit */}
                  <div className="flex items-start sm:items-center space-x-4 min-w-0">
                    <span
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isCurrent
                          ? "bg-stone-900 text-white shadow-xs"
                          : isCompleted
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {w.week.toString().padStart(2, "0")}
                    </span>

                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3
                          className={`text-sm font-semibold truncate ${
                            isCurrent
                              ? "text-stone-900 font-bold"
                              : isCompleted
                              ? "text-stone-900"
                              : "text-stone-700"
                          }`}
                        >
                          {w.title}
                        </h3>

                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-medium hidden md:inline">
                          Fase {w.phase}
                        </span>

                        {w.capstoneInfo && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-amber-50 text-amber-800 border border-amber-200/80 flex items-center space-x-1">
                            <Sparkles className="w-3 h-3 text-amber-600" />
                            <span>Capstone Milestone</span>
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-stone-500 line-clamp-1 leading-relaxed">
                        {w.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Status Pill & Action Button */}
                  <div className="shrink-0 flex items-center justify-between sm:justify-end space-x-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                    <div>
                      {isCurrent ? (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                          Pekan Berjalan
                        </span>
                      ) : isCompleted ? (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Tuntas</span>
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-stone-400 px-2">
                          Terjadwal
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/student/curriculum/${w.week}`}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium transition flex items-center space-x-1 cursor-pointer ${
                        isCurrent
                          ? "bg-stone-900 text-white hover:bg-stone-800 shadow-xs"
                          : "bg-stone-100 text-stone-700 hover:bg-stone-200"
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
        </section>
      </div>
    </div>
  );
}
