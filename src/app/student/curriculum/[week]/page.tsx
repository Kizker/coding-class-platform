"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { CURRICULUM_DATA, WeekCurriculum, LiveSessionItem, AssignmentItem } from "@/data/curriculum";
import { useSession } from "@/lib/auth/sessionContext";
import { useServerTime } from "@/hooks/useServerTime";
import { DayKey } from "@/app/api/v1/server-time/route";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Video,
  Code2,
  BookOpen,
  Sparkles,
  ChevronRight,
  Award,
  Zap,
  Check,
  Calendar,
} from "lucide-react";

export default function WeekCurriculumDetailPage({
  params,
}: {
  params: Promise<{ week: string }>;
}) {
  const resolvedParams = use(params);
  const weekNum = parseInt(resolvedParams.week, 10) || 1;

  const { progress, isTaskCompleted, toggleTaskCompleted } = useSession();
  const { serverTime, activeDayIndex } = useServerTime();

  const weekData: WeekCurriculum =
    CURRICULUM_DATA.find((w) => w.week === weekNum) || CURRICULUM_DATA[0];

  const [activeTab, setActiveTab] = useState<"tatap-muka" | "pr-harian" | "rangkuman">("tatap-muka");

  // Sessions
  const jumatSession: LiveSessionItem | undefined = weekData.liveSessions.find(
    (s) => s.day === "jumat"
  );
  const sabtuSession: LiveSessionItem | undefined = weekData.liveSessions.find(
    (s) => s.day === "sabtu"
  );

  const defaultJumatSession: LiveSessionItem = jumatSession || {
    id: `w${weekNum}-live-1`,
    day: "jumat",
    sessionNumber: (weekNum - 1) * 2 + 1,
    title: `Pertemuan ${(weekNum - 1) * 2 + 1}: ${weekData.title}`,
    durationMinutes: 120,
    conceptIntro: `Pembahasan mendalam konsep materi ${weekData.title} dengan bimbingan langsung tatap muka interaktif bersama mentor.`,
    guidedSteps: [],
    practiceChallenge: `Terapkan konsep ${weekData.title} untuk menyelesaikan tantangan koding yang diarahkan oleh mentor.`,
    studentStarterCode: `# Mulai koding tatap muka Jumat:\n`,
    expectedOutputDesc: "Program berjalan sukses sesuai instruksi mentor.",
  };

  const defaultSabtuSession: LiveSessionItem = sabtuSession || {
    id: `w${weekNum}-live-2`,
    day: "sabtu",
    sessionNumber: (weekNum - 1) * 2 + 2,
    title: `Pertemuan ${(weekNum - 1) * 2 + 2}: Praktik Mandiri & Studi Kasus Terapan`,
    durationMinutes: 120,
    conceptIntro: "Sesi workshop terapan untuk memadukan logika materi menjadi program utuh bersama mentor.",
    guidedSteps: [],
    practiceChallenge: "Selesaikan studi kasus akhir pekan dengan bimbingan mentor.",
    studentStarterCode: "# Tuliskan implementasi kodemu:\n",
    expectedOutputDesc: "Program berjalan normal tanpa error.",
  };

  // Helper for dynamic card status (Human-centric calm labels)
  const getDayStatus = (dayKey: DayKey, dayIndex: number) => {
    const isCompleted = isTaskCompleted(weekNum, dayKey);
    const isToday = weekNum === progress.currentWeek && dayIndex === activeDayIndex;

    if (isCompleted) {
      return {
        label: "Sudah Dikerjakan",
        badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
        boxClass: "bg-white border-stone-200/90",
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
      };
    }

    if (isToday) {
      return {
        label: "Hari Ini &bull; Sesi Aktif",
        badgeClass: "bg-stone-900 text-white font-medium",
        boxClass: "bg-stone-50/60 border-stone-400 ring-1 ring-stone-900/10",
        icon: <Clock className="w-4 h-4 text-stone-900" />,
      };
    }

    return {
      label: "Tersedia & Siap Dipelajari",
      badgeClass: "bg-stone-100 text-stone-600",
      boxClass: "bg-white border-stone-200/80",
      icon: <Clock className="w-4 h-4 text-stone-400" />,
    };
  };

  const jumatStatus = getDayStatus("jumat", 5);
  const sabtuStatus = getDayStatus("sabtu", 6);

  const weekdaysConfig = [
    { dayKey: "senin" as const, dayIndex: 1, label: "Senin", defaultTitle: "PR 1: Pemahaman Sintaks & Logika Dasar", defaultType: "RECALL" },
    { dayKey: "selasa" as const, dayIndex: 2, label: "Selasa", defaultTitle: "PR 2: Membaca & Menelusuri Alur Eksekusi", defaultType: "CODE_READ" },
    { dayKey: "rabu" as const, dayIndex: 3, label: "Rabu", defaultTitle: "PR 3: Debugging & Menemukan Bug Sintaks", defaultType: "DEBUGGING" },
    { dayKey: "kamis" as const, dayIndex: 4, label: "Kamis", defaultTitle: "PR 4: Persiapan Menjelang Tatap Muka Jumat", defaultType: "PRE_READ" },
  ];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#FAFAF9] text-stone-900 py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb & Live Tracker */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex items-center space-x-2 text-xs">
            <Link
              href="/student/dashboard"
              className="text-stone-500 hover:text-stone-900 font-medium flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
            <span className="text-stone-300">/</span>
            <span className="text-stone-500">Silabus &amp; Roadmap</span>
            <span className="text-stone-300">/</span>
            <span className="font-semibold text-stone-900">
              Pekan {weekNum} &bull; {weekData.title}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>Server Waktu:</span>
            </span>
            <span className="text-stone-600 font-medium">
              {serverTime.dateFormatted} ({serverTime.timeFormatted})
            </span>
          </div>
        </div>

        {/* 12 Weeks Clean Horizontal Switcher */}
        <div className="bg-white p-2.5 rounded-2xl border border-stone-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center space-x-1.5 overflow-x-auto text-xs">
          <span className="text-[11px] font-semibold text-stone-400 px-2 shrink-0 uppercase tracking-wider">
            Pekan:
          </span>
          {CURRICULUM_DATA.map((w) => {
            const isActive = w.week === weekNum;
            const isDone = w.week < progress.currentWeek;

            return (
              <Link
                key={w.week}
                href={`/student/curriculum/${w.week}`}
                className={`px-3 py-1.5 rounded-xl shrink-0 transition font-medium cursor-pointer ${
                  isActive
                    ? "bg-stone-900 text-white shadow-2xs font-semibold"
                    : isDone
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200/60 hover:bg-emerald-100/70"
                    : "bg-stone-50 text-stone-600 hover:bg-stone-100"
                }`}
              >
                Pekan {w.week}
              </Link>
            );
          })}
        </div>

        {/* Hero Week Banner */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 font-semibold">
                  Pekan {weekNum} dari 12
                </span>
                <span className="text-stone-400">&bull;</span>
                <span className="text-stone-600">{weekData.description}</span>
              </div>
              <h1 className="text-2xl font-bold text-stone-900 tracking-tight mt-1">
                {weekData.title}
              </h1>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/70 text-xs font-semibold flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Target: +180 XP</span>
              </span>
            </div>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed font-sans max-w-3xl">
            {weekData.description} &bull; Fase: {weekData.phaseTitle}
          </p>

          {/* Tab Switcher */}
          <div className="flex p-1 bg-stone-100 rounded-xl text-xs pt-1">
            <button
              onClick={() => setActiveTab("tatap-muka")}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition cursor-pointer text-center ${
                activeTab === "tatap-muka"
                  ? "bg-white text-stone-900 shadow-2xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              2 Sesi Tatap Muka Live (Jumat &amp; Sabtu)
            </button>
            <button
              onClick={() => setActiveTab("pr-harian")}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition cursor-pointer text-center ${
                activeTab === "pr-harian"
                  ? "bg-white text-stone-900 shadow-2xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              4 PR Latihan Mandiri (Senin &ndash; Kamis)
            </button>
            <button
              onClick={() => setActiveTab("rangkuman")}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition cursor-pointer text-center ${
                activeTab === "rangkuman"
                  ? "bg-white text-stone-900 shadow-2xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Rangkuman Materi &amp; Capstone
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: 2 SESI TATAP MUKA LIVE                            */}
        {/* ======================================================== */}
        {activeTab === "tatap-muka" && (
          <div className="space-y-4 animate-fadeIn">
            {/* Sesi Jumat */}
            <div className={`p-6 rounded-2xl border shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4 ${jumatStatus.boxClass}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="font-bold text-stone-900">Sesi Jumat</span>
                    <span className="text-stone-400">&bull;</span>
                    <span className="text-stone-600">16.00 &ndash; 18.00 WIB (120 Menit)</span>
                  </div>
                  <h2 className="text-lg font-bold text-stone-900">
                    {defaultJumatSession.title}
                  </h2>
                </div>

                <span className={`text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center space-x-1.5 ${jumatStatus.badgeClass}`}>
                  {jumatStatus.icon}
                  <span dangerouslySetInnerHTML={{ __html: jumatStatus.label }} />
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                {defaultJumatSession.conceptIntro}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href={`/student/live-session/${weekNum}/jumat`}
                  className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition flex items-center space-x-2 shadow-2xs cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Masuk Sesi Tatap Muka Live (Jumat)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/student/learn/${weekNum}/kamis`}
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-stone-900 text-xs font-medium hover:bg-stone-50 transition flex items-center space-x-1.5"
                >
                  <Code2 className="w-3.5 h-3.5 text-stone-500" />
                  <span>Lihat PR Latihan Kamis</span>
                </Link>
              </div>
            </div>

            {/* Sesi Sabtu */}
            <div className={`p-6 rounded-2xl border shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4 ${sabtuStatus.boxClass}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="font-bold text-stone-900">Sesi Sabtu</span>
                    <span className="text-stone-400">&bull;</span>
                    <span className="text-stone-600">16.00 &ndash; 18.00 WIB (120 Menit)</span>
                  </div>
                  <h2 className="text-lg font-bold text-stone-900">
                    {defaultSabtuSession.title}
                  </h2>
                </div>

                <span className={`text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center space-x-1.5 ${sabtuStatus.badgeClass}`}>
                  {sabtuStatus.icon}
                  <span dangerouslySetInnerHTML={{ __html: sabtuStatus.label }} />
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                {defaultSabtuSession.conceptIntro}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href={`/student/live-session/${weekNum}/sabtu`}
                  className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition flex items-center space-x-2 shadow-2xs cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Masuk Sesi Tatap Muka Live (Sabtu)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: 4 PR LATIHAN MANDIRI                              */}
        {/* ======================================================== */}
        {activeTab === "pr-harian" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
            {weekdaysConfig.map((item) => {
              const assignment =
                weekData.assignments.find((a) => a.day === item.dayKey) || {
                  id: `w${weekNum}-${item.dayKey}`,
                  day: item.dayKey,
                  type: item.defaultType,
                  title: item.defaultTitle,
                  durationMinutes: 15,
                  points: 20,
                  theoryMarkdown: "",
                  challengeInstructions: "Tuliskan kode program sesuai instruksi tugas harian.",
                  starterCode: "",
                  hints: [],
                  testAssertions: "",
                };

              const isDone = isTaskCompleted(weekNum, item.dayKey);

              return (
                <div
                  key={item.dayKey}
                  className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-900">{item.label}</span>
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[11px] font-medium">
                        15 Menit &bull; +{assignment.points} XP
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-stone-900 leading-snug">
                      {assignment.title}
                    </h3>

                    <p className="text-xs text-stone-500 leading-relaxed font-sans line-clamp-2">
                      {assignment.challengeInstructions}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">
                      {isDone ? "Sudah tuntas" : "Siap dikerjakan"}
                    </span>

                    <Link
                      href={`/student/learn/${weekNum}/${item.dayKey}`}
                      className="px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition flex items-center space-x-1 cursor-pointer"
                    >
                      <span>{isDone ? "Buka Kembali" : "Kerjakan PR"}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: RANGKUMAN MATERI & CAPSTONE                       */}
        {/* ======================================================== */}
        {activeTab === "rangkuman" && (
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4 animate-fadeIn">
            <h2 className="text-base font-bold text-stone-900">
              Rangkuman Inti Materi Pekan {weekNum}
            </h2>
            <ul className="space-y-2 text-xs text-stone-600 leading-relaxed">
              <li className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Penguasaan materi: {weekData.title}</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>4 Tantangan Latihan PR Harian (Senin s.d. Kamis) berdurasi 15 menit</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>2 Sesi Tatap Muka Interaktif 1-on-1 (Jumat &amp; Sabtu) berdurasi 120 menit</span>
              </li>
            </ul>

            {weekData.capstoneInfo && (
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  {weekData.capstoneInfo.title}
                </span>
                <Link
                  href={`/student/capstone/${weekData.capstoneInfo.id}`}
                  className="px-3.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition cursor-pointer"
                >
                  Lihat Proyek Capstone
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
