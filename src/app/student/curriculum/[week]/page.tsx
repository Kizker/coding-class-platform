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
  AlertCircle,
  Clock,
  Video,
  Code2,
  BookOpen,
  Download,
  ExternalLink,
  Sparkles,
  Layers,
  ChevronRight,
  Award,
  Zap,
  HelpCircle,
  FileCode,
  Check,
} from "lucide-react";

export default function WeekCurriculumDetailPage({
  params,
}: {
  params: Promise<{ week: string }>;
}) {
  const resolvedParams = use(params);
  const weekNum = parseInt(resolvedParams.week, 10) || 1;

  const { progress, isTaskCompleted, toggleTaskCompleted } = useSession();
  const { serverTime, activeDayKey, activeDayIndex } = useServerTime();

  const weekData: WeekCurriculum =
    CURRICULUM_DATA.find((w) => w.week === weekNum) || CURRICULUM_DATA[0];

  const [activeTab, setActiveTab] = useState<"tatap-muka" | "pr-harian" | "rangkuman">("tatap-muka");

  // Filter sessions
  const jumatSession: LiveSessionItem | undefined = weekData.liveSessions.find(
    (s) => s.day === "jumat"
  );
  const sabtuSession: LiveSessionItem | undefined = weekData.liveSessions.find(
    (s) => s.day === "sabtu"
  );

  // Fallback if specific sessions are not yet authored in other weeks
  const defaultJumatSession: LiveSessionItem = jumatSession || {
    id: `w${weekNum}-live-1`,
    day: "jumat",
    sessionNumber: (weekNum - 1) * 2 + 1,
    title: `Pertemuan ${(weekNum - 1) * 2 + 1}: ${weekData.title}`,
    durationMinutes: 120,
    conceptIntro: `Pembahasan mendalam konsep materi ${weekData.title} dengan pendekatan hands-on tatap muka 2 jam bersama tutor.`,
    guidedSteps: [
      {
        step: 1,
        title: "Eksplorasi Konsep Inti",
        description: "Memahami struktur dan tujuan materi melalui visualisasi diagram dan analogi ramah anak.",
        tutorCode: `# Materi Pekan ${weekNum}\nprint("Selamat datang di sesi tatap muka Pekan ${weekNum}!")\n`,
      },
      {
        step: 2,
        title: "Live Coding 1-on-1",
        description: "Menulis dan menguji kode langkah demi langkah dipandu langsung oleh mentor.",
        tutorCode: `# Latihan Terbimbing:\ndef demo():\n    return "Berhasil!"\nprint(demo())\n`,
      },
    ],
    practiceChallenge: `Terapkan konsep ${weekData.title} untuk menyelesaikan studi kasus latihan yang diberikan mentor di sesi ini.`,
    studentStarterCode: `# Ketik kodemu di sini:\nprint("Siap praktik bersama tutor!")\n`,
    expectedOutputDesc: "Output program sesuai skenario latihan.",
  };

  const defaultSabtuSession: LiveSessionItem = sabtuSession || {
    id: `w${weekNum}-live-2`,
    day: "sabtu",
    sessionNumber: (weekNum - 1) * 2 + 2,
    title: `Pertemuan ${(weekNum - 1) * 2 + 2}: Praktik Terapan & Proyek Pekan ${weekNum}`,
    durationMinutes: 120,
    conceptIntro: "Sesi workshop interaktif untuk menyatukan materi PR harian dan teori Jumat menjadi kode terapan fungsional.",
    guidedSteps: [
      {
        step: 1,
        title: "Perancangan Solusi Mandiri",
        description: "Menyusun algoritma sebelum menulis kode.",
        tutorCode: `# Cetak biru program:\n# 1. Input\n# 2. Proses\n# 3. Output\n`,
      },
    ],
    practiceChallenge: "Selesaikan tantangan mandiri akhir pekan dengan bimbingan mentor.",
    studentStarterCode: "# Tuliskan implementasi kodemu:\n",
    expectedOutputDesc: "Program berjalan tanpa error.",
  };

  // Helper for dynamic card status of sessions/assignments
  const getDayStatus = (dayKey: DayKey, dayIndex: number) => {
    const isCompleted = isTaskCompleted(weekNum, dayKey);
    // If viewing current week, compare with live server dayIndex.
    // If viewing past week (< currentWeek), uncompleted is overdue.
    // If viewing future week (> currentWeek), all are future.
    let isPast = false;
    let isToday = false;

    if (weekNum < progress.currentWeek) {
      isPast = true;
    } else if (weekNum === progress.currentWeek) {
      isPast = dayIndex < activeDayIndex;
      isToday = dayIndex === activeDayIndex;
    } else {
      isPast = false;
      isToday = false;
    }

    if (isCompleted) {
      return {
        state: "completed" as const,
        label: "SUDAH DIKERJAKAN / HADIR",
        badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
        boxClass: "bg-emerald-50/70 border-2 border-emerald-500 text-emerald-950",
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      };
    }

    if (isPast) {
      return {
        state: "overdue" as const,
        label: "TERLEWAT / BELUM SELESAI",
        badgeClass: "bg-red-100 text-red-800 border-red-300 animate-pulse",
        boxClass: "bg-red-50/70 border-2 border-red-500 text-red-950",
        icon: <AlertCircle className="w-5 h-5 text-red-600" />,
      };
    }

    if (isToday) {
      return {
        state: "today" as const,
        label: "HARI INI (SESI AKTIF)",
        badgeClass: "bg-blue-600 text-white font-bold",
        boxClass: "bg-blue-50/80 border-2 border-blue-600 ring-2 ring-blue-300 text-blue-950",
        icon: <Clock className="w-5 h-5 text-blue-600" />,
      };
    }

    return {
      state: "future" as const,
      label: "JADWAL MENDATANG",
      badgeClass: "bg-slate-100 text-slate-600",
      boxClass: "bg-white border border-slate-200 text-slate-700",
      icon: <Clock className="w-5 h-5 text-slate-400" />,
    };
  };

  const jumatStatus = getDayStatus("jumat", 5);
  const sabtuStatus = getDayStatus("sabtu", 6);

  // Generate or retrieve Monday to Thursday PR assignments
  const weekdaysConfig: Array<{ dayKey: "senin" | "selasa" | "rabu" | "kamis"; dayIndex: number; label: string; defaultTitle: string; defaultType: "RECALL" | "CODE_READ" | "DEBUGGING" | "PRE_READ" }> = [
    { dayKey: "senin", dayIndex: 1, label: "Senin", defaultTitle: "PR 1: Pemahaman Sintaks & Logika Dasar", defaultType: "RECALL" },
    { dayKey: "selasa", dayIndex: 2, label: "Selasa", defaultTitle: "PR 2: Membaca & Menelusuri Alur Eksekusi", defaultType: "CODE_READ" },
    { dayKey: "rabu", dayIndex: 3, label: "Rabu", defaultTitle: "PR 3: Debugging & Menemukan Bug Sintaks", defaultType: "DEBUGGING" },
    { dayKey: "kamis", dayIndex: 4, label: "Kamis", defaultTitle: "PR 4: Persiapan Menjelang Tatap Muka Jumat", defaultType: "PRE_READ" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-7">
        {/* Navigation Breadcrumb & Live Server Tracker Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center space-x-2 text-xs font-mono">
            <Link
              href="/student/dashboard"
              className="text-blue-600 hover:text-blue-800 font-bold flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>DASHBOARD</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">KURIKULUM</span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-700 font-bold uppercase">
              PEKAN {weekNum.toString().padStart(2, "0")}
            </span>
          </div>

          {/* Live Server Tracking Chip */}
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              <span>LIVE SERVER:</span>
            </span>
            <span className="font-semibold text-slate-700">
              {serverTime.dateFormatted} ({serverTime.timeFormatted})
            </span>
          </div>
        </div>

        {/* 12 Weeks Quick Switcher Bar */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center space-x-1 overflow-x-auto text-xs font-mono">
          <span className="text-[11px] font-bold text-slate-500 px-2 shrink-0">PILIH PEKAN:</span>
          {CURRICULUM_DATA.map((w) => {
            const isActive = w.week === weekNum;
            const isDone = w.week < progress.currentWeek;
            const isCurrentWeek = w.week === progress.currentWeek;

            return (
              <Link
                key={w.week}
                href={`/student/curriculum/${w.week}`}
                className={`px-3 py-1.5 rounded-lg shrink-0 transition font-bold ${
                  isActive
                    ? "bg-blue-600 text-white shadow-xs"
                    : isCurrentWeek
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    : isDone
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                M{w.week.toString().padStart(2, "0")}
              </Link>
            );
          })}
        </div>

        {/* Header Hero Banner for Current Week */}
        <div className="ui-card-outer p-6 sm:p-8 bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 font-mono font-bold text-xs">
                  FASE {weekData.phase}: {weekData.phaseTitle}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs">
                  PEKAN {weekData.week.toString().padStart(2, "0")} DARI 12
                </span>
                {weekData.capstoneInfo && (
                  <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 font-mono font-bold text-xs flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>MILESTONE CAPSTONE</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {weekData.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                {weekData.description}
              </p>
            </div>

            <div className="shrink-0 flex sm:flex-col gap-2">
              <Link
                href={`/student/learn/${weekNum}/senin`}
                className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition flex items-center justify-center space-x-1.5 shadow-xs"
              >
                <Code2 className="w-4 h-4" />
                <span>BUKA SPLIT STUDIO</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px]">TOTAL PERTEMUAN:</span>
              <strong className="text-slate-900 text-sm font-bold">2 Sesi Tatap Muka</strong>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px]">TUGAS HARIAN:</span>
              <strong className="text-slate-900 text-sm font-bold">4 Sesi PR Mandiri</strong>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px]">TOTAL DURASI:</span>
              <strong className="text-slate-900 text-sm font-bold">300 Menit Belajar</strong>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px]">TARGET XP:</span>
              <strong className="text-blue-700 text-sm font-bold">+100 XP / Pekan</strong>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Tatap Muka, PR Harian, Rangkuman) */}
        <div className="flex border-b border-slate-200 text-xs font-bold font-mono">
          <button
            onClick={() => setActiveTab("tatap-muka")}
            className={`pb-3 px-4 flex items-center space-x-2 border-b-2 transition ${
              activeTab === "tatap-muka"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Video className="w-4 h-4" />
            <span>SESI TATAP MUKA 2 JAM (JUMAT &amp; SABTU)</span>
          </button>
          <button
            onClick={() => setActiveTab("pr-harian")}
            className={`pb-3 px-4 flex items-center space-x-2 border-b-2 transition ${
              activeTab === "pr-harian"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>PR LATIHAN HARIAN (SENIN–KAMIS)</span>
          </button>
          <button
            onClick={() => setActiveTab("rangkuman")}
            className={`pb-3 px-4 flex items-center space-x-2 border-b-2 transition ${
              activeTab === "rangkuman"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>RANGKUMAN &amp; CHEAT SHEET</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: SESI TATAP MUKA (JUMAT & SABTU)                   */}
        {/*    SECARA KHUSUS MEMBAHAS HARI JUMAT DAN SABTU           */}
        {/* ======================================================== */}
        {activeTab === "tatap-muka" && (
          <div className="space-y-6">
            {/* 1. Sesi Tatap Muka HARI JUMAT */}
            <div className={`p-6 sm:p-7 rounded-2xl border transition-all space-y-5 ${jumatStatus.boxClass}`}>
              {/* Header Sesi Jumat */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-current/15 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded font-extrabold bg-blue-600 text-white">
                      HARI JUMAT
                    </span>
                    <span className="font-bold">16.00 - 18.00 WIB (120 MENIT)</span>
                    <span>&bull;</span>
                    <span className="font-semibold">SESI TATAP MUKA 1</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                    {defaultJumatSession.title}
                  </h2>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs font-mono font-bold px-3 py-1 rounded-lg border ${jumatStatus.badgeClass}`}
                  >
                    {jumatStatus.label}
                  </span>
                  <button
                    onClick={() => toggleTaskCompleted(weekNum, "jumat")}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-black/5 hover:bg-black/10 transition font-bold"
                  >
                    {isTaskCompleted(weekNum, "jumat") ? "Tandai Belum" : "Tandai Selesai"}
                  </button>
                </div>
              </div>

              {/* Materi Pembahasan Jumat */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                  MATERI PEMBAHASAN &amp; KONSEP INTI HARI JUMAT:
                </h3>
                <div className="p-4 rounded-xl bg-white/90 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2">
                  <p>{defaultJumatSession.conceptIntro}</p>
                  <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200 text-blue-900 text-xs font-sans">
                    <strong>💡 Analogi Ramah Pemula:</strong> Bayangkan fungsi Python seperti
                    mesin blender jus buah. Kamu memasukkan buah apel (parameter input), mesin
                    berputar mengolahnya (eksekusi kode), dan menuangkan jus segar ke dalam gelas
                    (return value). Sekali mesin dibuat, kamu bisa memakainya berkali-kali!
                  </div>
                </div>
              </div>

              {/* Alur Agenda 120 Menit */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                  ALUR AGENDA KELAS TATAP MUKA (120 MENIT):
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-white/80 border border-slate-200">
                    <span className="text-blue-700 font-bold block text-[10px]">00:00 - 00:20 (20M)</span>
                    <strong className="text-slate-900 font-bold">Review PR &amp; Ice-Breaking</strong>
                    <p className="text-[11px] text-slate-600 mt-1">Membahas kendala PR Senin–Kamis.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 border border-slate-200">
                    <span className="text-purple-700 font-bold block text-[10px]">00:20 - 00:50 (30M)</span>
                    <strong className="text-slate-900 font-bold">Teori &amp; Analogi Intuitif</strong>
                    <p className="text-[11px] text-slate-600 mt-1">Pemaparan konsep live oleh tutor.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 border border-slate-200">
                    <span className="text-emerald-700 font-bold block text-[10px]">00:50 - 01:35 (45M)</span>
                    <strong className="text-slate-900 font-bold">Hands-on Live Coding</strong>
                    <p className="text-[11px] text-slate-600 mt-1">Siswa memprogram 1-on-1 dipandu tutor.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 border border-slate-200">
                    <span className="text-amber-700 font-bold block text-[10px]">01:35 - 02:00 (25M)</span>
                    <strong className="text-slate-900 font-bold">Debug Challenge &amp; Refleksi</strong>
                    <p className="text-[11px] text-slate-600 mt-1">Memecahkan teka-teki logika akhir.</p>
                  </div>
                </div>
              </div>

              {/* Langkah Terbimbing (Guided Steps) dengan Kode Tutor */}
              {defaultJumatSession.guidedSteps.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                    LANGKAH TERBIMBING &amp; KODE PERAGA TUTOR:
                  </h3>
                  <div className="space-y-2.5">
                    {defaultJumatSession.guidedSteps.map((step, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-blue-700">
                          <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">
                            {step.step}
                          </span>
                          <span>{step.title}</span>
                        </div>
                        <p className="text-xs text-slate-600">{step.description}</p>
                        <div className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
                          <pre>{step.tutorCode}</pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons for Jumat */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/student/live-session/${weekNum}/jumat`}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition flex items-center space-x-2 shadow-xs cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>MASUK KELAS TATAP MUKA LIVE (LANGSUNG)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/student/learn/${weekNum}/kamis`}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition flex items-center space-x-1.5"
                >
                  <Code2 className="w-4 h-4 text-blue-600" />
                  <span>BUKA EDITOR KODING LATIHAN</span>
                </Link>
              </div>
            </div>

            {/* 2. Sesi Tatap Muka HARI SABTU */}
            <div className={`p-6 sm:p-7 rounded-2xl border transition-all space-y-5 ${sabtuStatus.boxClass}`}>
              {/* Header Sesi Sabtu */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-current/15 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded font-extrabold bg-amber-600 text-white">
                      HARI SABTU
                    </span>
                    <span className="font-bold">16.00 - 18.00 WIB (120 MENIT)</span>
                    <span>&bull;</span>
                    <span className="font-semibold">SESI TATAP MUKA 2</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                    {defaultSabtuSession.title}
                  </h2>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs font-mono font-bold px-3 py-1 rounded-lg border ${sabtuStatus.badgeClass}`}
                  >
                    {sabtuStatus.label}
                  </span>
                  <button
                    onClick={() => toggleTaskCompleted(weekNum, "sabtu")}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-black/5 hover:bg-black/10 transition font-bold"
                  >
                    {isTaskCompleted(weekNum, "sabtu") ? "Tandai Belum" : "Tandai Selesai"}
                  </button>
                </div>
              </div>

              {/* Materi Pembahasan Sabtu */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                  MATERI PEMBAHASAN &amp; STUDI KASUS HARI SABTU:
                </h3>
                <div className="p-4 rounded-xl bg-white/90 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2">
                  <p>{defaultSabtuSession.conceptIntro}</p>
                  <p>
                    <strong>Tantangan Terapan:</strong> {defaultSabtuSession.practiceChallenge}
                  </p>
                </div>
              </div>

              {/* Starter Code Sabtu */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                  STARTER CODE BERSAMA MENTOR:
                </h3>
                <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
                  <pre>{defaultSabtuSession.studentStarterCode}</pre>
                </div>
                <p className="text-[11px] font-mono text-slate-500">
                  Target Output: {defaultSabtuSession.expectedOutputDesc}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/student/live-session/${weekNum}/sabtu`}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition flex items-center space-x-2 shadow-xs cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>MASUK KELAS WORKSHOP LIVE (LANGSUNG)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {weekData.capstoneInfo && (
                  <Link
                    href={`/student/capstone/${weekData.phase}`}
                    className="px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-50 transition flex items-center space-x-1.5"
                  >
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>BUKA PORTAL CAPSTONE</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: PR LATIHAN HARIAN (SENIN - KAMIS)                 */}
        {/* ======================================================== */}
        {activeTab === "pr-harian" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
              <div>
                <strong>Rutinitas PR Harian (15-20 Menit Mandiri):</strong> Dikerjakan setiap hari
                Senin s.d. Kamis untuk melatih memori dan logika sebelum tatap muka Jumat.
              </div>
              <div className="font-mono text-xs font-bold text-blue-700 shrink-0 ml-3">
                BOBOT: +20 XP / PR
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weekdaysConfig.map((item) => {
                const existingAssignment = weekData.assignments.find((a) => a.day === item.dayKey);
                const title = existingAssignment?.title || item.defaultTitle;
                const type = existingAssignment?.type || item.defaultType;
                const duration = existingAssignment?.durationMinutes || 15;
                const points = existingAssignment?.points || 20;

                const dayStatus = getDayStatus(item.dayKey, item.dayIndex);
                const isDone = isTaskCompleted(weekNum, item.dayKey);

                return (
                  <div
                    key={item.dayKey}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${dayStatus.boxClass}`}
                  >
                    {/* Top Row: Day & Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-extrabold uppercase">
                          HARI {item.label}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-white/80 border border-current/20">
                          {type}
                        </span>
                      </div>
                      {dayStatus.icon}
                    </div>

                    {/* Middle: Title & Description */}
                    <div className="space-y-1.5">
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${dayStatus.badgeClass}`}
                      >
                        {dayStatus.label}
                      </span>
                      <h3 className="text-sm font-bold leading-snug">{title}</h3>
                      <p className="text-xs opacity-80">
                        Durasi estimasi: {duration} Menit &bull; Reward: +{points} XP
                      </p>
                    </div>

                    {/* Bottom: Action & Quick Toggle */}
                    <div className="pt-3 border-t border-current/15 flex items-center justify-between text-xs font-mono font-bold">
                      <Link
                        href={`/student/learn/${weekNum}/${item.dayKey}`}
                        className="hover:underline flex items-center space-x-1"
                      >
                        <span>Buka Split Studio</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => toggleTaskCompleted(weekNum, item.dayKey)}
                        className="text-[11px] px-2 py-0.5 rounded bg-black/5 hover:bg-black/10 transition"
                      >
                        {isDone ? "Tandai Batal" : "Tandai Selesai"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: RANGKUMAN & CHEAT SHEET                           */}
        {/* ======================================================== */}
        {activeTab === "rangkuman" && (
          <div className="space-y-5">
            <div className="ui-card-outer p-6 bg-white border border-slate-200 space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Rangkuman Intisari Pekan {weekNum}: {weekData.title}</span>
              </h2>

              <div className="prose prose-slate text-xs sm:text-sm max-w-none text-slate-700 space-y-3 leading-relaxed">
                <p>
                  Pada pekan ini, siswa difokuskan pada penguasaan materi:{" "}
                  <strong>{weekData.title}</strong>. Materi ini menjadi jembatan penting dalam kurikulum 12 pekan untuk melatih logika modular dan pemecahan masalah.
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase font-mono">
                    3 PRINSIP LOGIKA UTAMA PEKAN INI:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">
                    <li>
                      <strong>Modularitas Kode:</strong> Memecah program panjang menjadi bagian-bagian kecil yang mandiri dan mudah diuji.
                    </li>
                    <li>
                      <strong>Alur Masukan &amp; Keluaran (I/O):</strong> Memastikan setiap komponen menerima parameter yang valid dan mengembalikan hasil yang terprediksi.
                    </li>
                    <li>
                      <strong>Pembersihan Error (Clean Debugging):</strong> Membaca pesan error di terminal secara runut baris demi baris tanpa panik.
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3 pt-3">
                  <button
                    onClick={() => alert("Slide rangkuman materi sedang diunduh...")}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Slide Materi Pekan {weekNum} (PDF)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
