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

  // Neo-Brutalism card color & status rules:
  // 1. Selesai: Mint Green (#86EFAC)
  // 2. Terlewat: Pop Coral/Red (#FCA5A5)
  // 3. Hari Ini: Lemon Pop (#FEF08A) with thick 2.5px border
  // 4. Mendatang: Crisp White with solid black border & shadow
  const getCardStatus = (day: DayRoutineItem) => {
    const isCompleted = isTaskCompleted(progress.currentWeek, day.key);
    const isPast = day.dayIndex < activeDayIndex;
    const isToday = day.dayIndex === activeDayIndex;

    if (isCompleted) {
      return {
        cardStyle:
          "bg-[#86EFAC] text-black border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        badgeStyle: "bg-white text-black font-black border border-black uppercase",
        statusText: "SELESAI",
        icon: <CheckCircle2 className="w-4 h-4 text-black stroke-[2.5] shrink-0" />,
      };
    }

    if (isPast) {
      return {
        cardStyle:
          "bg-[#FCA5A5] text-black border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        badgeStyle: "bg-white text-black font-black border border-black uppercase",
        statusText: "TERLEWAT",
        icon: <AlertCircle className="w-4 h-4 text-black stroke-[2.5] shrink-0" />,
      };
    }

    if (isToday) {
      return {
        cardStyle:
          "bg-[#FEF08A] text-black border-2.5 border-black shadow-[4px_4px_0px_#000] translate-x-[-1px] translate-y-[-1px] hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
        badgeStyle: "bg-black text-white font-black border border-black uppercase",
        statusText: "HARI INI",
        icon: day.isLiveClass ? (
          <Video className="w-4 h-4 text-black stroke-[2.5] animate-pulse shrink-0" />
        ) : (
          <Clock className="w-4 h-4 text-black stroke-[2.5] shrink-0" />
        ),
      };
    }

    return {
      cardStyle:
        "bg-white text-black border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-stone-50 hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
      badgeStyle: "bg-stone-100 text-stone-800 font-bold border border-black uppercase",
      statusText: "MENDATANG",
      icon: <Clock className="w-4 h-4 text-stone-600 stroke-[2] shrink-0" />,
    };
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-black py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-5xl mx-auto space-y-9">
        {/* ======================================================== */}
        {/* 1. FOCUS HERO & INTEGRATED LEARNING SNAPSHOT (NEO)       */}
        {/* ======================================================== */}
        <section className="bg-white border-2.5 border-black p-6 sm:p-8 shadow-[5px_5px_0px_#000] space-y-6">
          {/* Top Date & Context Chip */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-3 border-b-2 border-black">
            <div className="flex items-center space-x-2 font-bold text-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] border border-black animate-pulse inline-block" />
              <span className="font-black uppercase tracking-tight" suppressHydrationWarning>
                {serverTime.dateFormatted}
              </span>
              <span className="font-black">&bull;</span>
              <span className="font-mono font-bold" suppressHydrationWarning>{serverTime.timeFormatted}</span>
            </div>

            <span className="px-3 py-1 bg-[#FEF08A] text-black font-black text-[11px] border-2 border-black shadow-[2px_2px_0px_#000] uppercase tracking-tight">
              Sesi Tatap Muka Live 16.00 WIB
            </span>
          </div>

          {/* Greeting, Intent & Primary CTA */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase">
                Halo, Andi 👋
              </h1>
              <p className="text-xs sm:text-sm text-stone-800 max-w-xl leading-relaxed font-bold">
                Hari ini waktunya belajar langsung bersama mentor di{" "}
                <span className="bg-[#FEF08A] px-1 py-0.5 border border-black font-black">
                  Pekan {isMounted ? String(currentWeekNum).padStart(2, "0") : "01"}: {currentWeekData.title}
                </span>
                . Klik tombol di samping untuk masuk ke ruang kelas tatap muka interaktif.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href={`/student/live-session/${currentWeekNum}/jumat`}
                className="inline-flex items-center space-x-2.5 px-6 py-3.5 bg-[#FACC15] hover:bg-yellow-400 text-black border-2 border-black shadow-[3px_3px_0px_#000] font-black text-xs hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer uppercase tracking-tight group"
              >
                <Video className="w-4 h-4 stroke-[2.5] group-hover:scale-110 transition-transform" />
                <span>Masuk Kelas Tatap Muka</span>
                <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Integrated Learning Snapshot */}
          <div className="pt-4 border-t-2 border-black">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
              {/* Stat 1: Streak */}
              <div className="p-3.5 bg-white border-2 border-black shadow-[3px_3px_0px_#000] flex items-center space-x-3.5">
                <div className="w-12 h-12 bg-[#FEF08A] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-xl shrink-0">
                  🔥
                </div>
                <div>
                  <div className="text-lg font-black text-black" suppressHydrationWarning>
                    {isMounted ? progress.streakDays : 3} Hari Berturut
                  </div>
                  <div className="text-[11px] font-bold text-stone-700 uppercase">
                    Konsistensi PR Harian
                  </div>
                </div>
              </div>

              {/* Stat 2: XP */}
              <div className="p-3.5 bg-white border-2 border-black shadow-[3px_3px_0px_#000] flex items-center space-x-3.5">
                <div className="w-12 h-12 bg-[#86EFAC] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-xl shrink-0">
                  ⚡
                </div>
                <div>
                  <div className="text-lg font-black text-black" suppressHydrationWarning>
                    {isMounted ? progress.xpPoints : 65} XP Terkumpul
                  </div>
                  <div className="text-[11px] font-bold text-stone-700 uppercase">
                    Level 01 &bull; Novice Learner
                  </div>
                </div>
              </div>

              {/* Stat 3: Curriculum Roadmap */}
              <div className="p-3.5 bg-white border-2 border-black shadow-[3px_3px_0px_#000] flex items-center space-x-3.5">
                <div className="w-12 h-12 bg-[#FED7AA] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-xl shrink-0">
                  🌱
                </div>
                <div>
                  <div className="text-lg font-black text-black" suppressHydrationWarning>
                    Pekan {isMounted ? currentWeekNum : 1} dari 12
                  </div>
                  <div className="text-[11px] font-bold text-stone-700 uppercase">
                    Fase {currentWeekData.phase}: {currentWeekData.phaseTitle}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar Neo-Brutalist */}
            <div className="mt-4 pt-3 border-t-2 border-black space-y-2">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="uppercase tracking-tight">Progres {currentWeekData.title}</span>
                <span className="bg-[#FEF08A] px-2 py-0.5 border border-black font-black" suppressHydrationWarning>
                  {Math.round((currentWeekNum / 12) * 100)}% Kurikulum
                </span>
              </div>
              <div className="w-full bg-white h-3.5 border-2 border-black shadow-[2px_2px_0px_#000] overflow-hidden p-0.5">
                <div
                  className="bg-[#FACC15] h-full border-r-2 border-black transition-all duration-500"
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
              <h2 className="text-xl font-black text-black tracking-tight uppercase">
                Jadwal Belajar Pekan Ini
              </h2>
              <p className="text-xs text-stone-700 mt-0.5 font-bold">
                4 PR mandiri (15 menit) &amp; 2 sesi tatap muka interaktif bersama mentor.
              </p>
            </div>

            {/* Human Legend */}
            <div className="flex items-center gap-3 text-xs font-black">
              <span className="flex items-center space-x-1.5 bg-[#86EFAC] px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                <span className="w-2 h-2 rounded-full bg-black inline-block" />
                <span className="uppercase text-[10px]">Selesai</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-[#FCA5A5] px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                <span className="w-2 h-2 rounded-full bg-black inline-block" />
                <span className="uppercase text-[10px]">Terlewat</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-[#FEF08A] px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000]">
                <span className="w-2 h-2 rounded-full bg-black inline-block" />
                <span className="uppercase text-[10px]">Hari Ini</span>
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
                  className={`p-3.5 transition-all flex flex-col justify-between h-38 cursor-pointer ${status.cardStyle}`}
                >
                  {/* Top: Day Label & Status Icon */}
                  <div className="flex items-center justify-between pb-1 border-b border-black/30">
                    <span className="text-xs font-black text-black uppercase tracking-tight">
                      {day.label}
                    </span>
                    {status.icon}
                  </div>

                  {/* Middle: Type & Short Title */}
                  <div className="space-y-1 my-auto">
                    <span className="text-[10px] text-stone-800 font-bold block uppercase leading-none">
                      {day.typeLabel}
                    </span>
                    <h3 className="text-xs font-black leading-snug line-clamp-2">
                      {day.title}
                    </h3>
                  </div>

                  {/* Bottom: Clean Status Pill */}
                  <div>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 inline-block ${status.badgeStyle}`}
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
            <h2 className="text-xl font-black text-black tracking-tight uppercase">
              Silabus &amp; Roadmap 12 Pekan
            </h2>
            <p className="text-xs text-stone-700 mt-0.5 font-bold">
              Kurikulum bertahap dari pemahaman nalar logika hingga aplikasi Python mandiri.
            </p>
          </div>

          {/* 1 Column Linear List */}
          <div className="space-y-3">
            {CURRICULUM_DATA.map((w) => {
              const isCurrent = w.week === progress.currentWeek;
              const isCompleted = w.week < progress.currentWeek;

              return (
                <div
                  key={w.week}
                  className={`p-4 sm:p-5 border-2.5 border-black transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isCurrent
                      ? "bg-[#FEF08A] shadow-[4px_4px_0px_#000] translate-x-[-1px] translate-y-[-1px]"
                      : isCompleted
                      ? "bg-white shadow-[3px_3px_0px_#000]"
                      : "bg-[#FDFBF7] shadow-[2px_2px_0px_#000]"
                  }`}
                >
                  {/* Left: Week Badge + Title & Description in 1 clean unit */}
                  <div className="flex items-start sm:items-center space-x-4 min-w-0">
                    <span
                      className={`w-12 h-12 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center font-black text-sm shrink-0 ${
                        isCurrent
                          ? "bg-black text-[#FACC15]"
                          : isCompleted
                          ? "bg-[#86EFAC] text-black"
                          : "bg-white text-stone-500"
                      }`}
                    >
                      {w.week.toString().padStart(2, "0")}
                    </span>

                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-black text-black uppercase tracking-tight truncate">
                          {w.title}
                        </h3>

                        <span className="text-[10px] px-2 py-0.5 bg-white border border-black font-black text-black uppercase hidden md:inline">
                          Fase {w.phase}
                        </span>

                        {w.capstoneInfo && (
                          <span className="text-[10px] px-2 py-0.5 font-black bg-[#FACC15] text-black border border-black shadow-[1px_1px_0px_#000] flex items-center space-x-1 uppercase">
                            <Sparkles className="w-3 h-3 text-black stroke-[2.5]" />
                            <span>Capstone Milestone</span>
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-stone-800 font-bold line-clamp-1 leading-relaxed">
                        {w.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Status Pill & Action Button */}
                  <div className="shrink-0 flex items-center justify-between sm:justify-end space-x-3 pt-2 sm:pt-0 border-t-2 sm:border-t-0 border-black/20">
                    <div>
                      {isCurrent ? (
                        <span className="text-xs font-black px-2.5 py-1 bg-white text-black border border-black uppercase">
                          Pekan Berjalan
                        </span>
                      ) : isCompleted ? (
                        <span className="text-xs font-black px-2.5 py-1 bg-[#86EFAC] text-black border border-black uppercase flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                          <span>Tuntas</span>
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-stone-500 px-2 uppercase">
                          Terjadwal
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/student/curriculum/${w.week}`}
                      className="px-4 py-2 bg-white hover:bg-[#FEF08A] text-black border-2 border-black font-black text-xs shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center space-x-1 cursor-pointer uppercase tracking-tight"
                    >
                      <span>Lihat Materi</span>
                      <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
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
