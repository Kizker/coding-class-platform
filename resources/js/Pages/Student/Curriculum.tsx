import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { CURRICULUM_DATA, WeekCurriculum, LiveSessionItem } from "@/data/curriculum";
import { useSession } from "@/lib/auth/sessionContext";
import { useServerTime } from "@/hooks/useServerTime";
import { DayKey } from "@/types/serverTime";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Video,
  Code2,
  Sparkles,
  ChevronRight,
  Check,
} from "lucide-react";

interface Props {
  week?: string | number;
}

export default function WeekCurriculumDetailPage({ week }: Props) {
  const weekNum = parseInt(String(week || 1), 10) || 1;

  const { progress, isTaskCompleted } = useSession();
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

  // Helper for dynamic card status (Neo-Brutalism badge & box)
  const getDayStatus = (dayKey: DayKey, dayIndex: number) => {
    const isCompleted = isTaskCompleted(weekNum, dayKey);
    const isToday = weekNum === progress.currentWeek && dayIndex === activeDayIndex;

    if (isCompleted) {
      return {
        label: "Sudah Dikerjakan",
        badgeClass: "bg-[#86EFAC] text-black border border-black font-black uppercase",
        boxClass: "bg-white border-2.5 border-black shadow-[4px_4px_0px_#000]",
        icon: <CheckCircle2 className="w-4 h-4 text-black stroke-[2.5]" />,
      };
    }

    if (isToday) {
      return {
        label: "Hari Ini &bull; Sesi Aktif",
        badgeClass: "bg-[#FEF08A] text-black border border-black font-black uppercase animate-pulse",
        boxClass: "bg-white border-2.5 border-black shadow-[4px_4px_0px_#000] ring-2 ring-black",
        icon: <Clock className="w-4 h-4 text-black stroke-[2.5]" />,
      };
    }

    return {
      label: "Tersedia & Siap Dipelajari",
      badgeClass: "bg-white text-stone-700 border border-black font-bold uppercase",
      boxClass: "bg-white border-2.5 border-black shadow-[3px_3px_0px_#000]",
      icon: <Clock className="w-4 h-4 text-stone-600 stroke-[2.5]" />,
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
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#FDFBF7] text-black font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Breadcrumb & Live Tracker */}
        <div className="bg-white border-2.5 border-black p-4 sm:p-5 shadow-[4px_4px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2.5">
            <Link
              href="/student/dashboard"
              className="px-2.5 py-1 bg-white hover:bg-[#FEF08A] text-black border-2 border-black font-black shadow-[2px_2px_0px_#000] transition flex items-center space-x-1.5 uppercase"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>DASHBOARD</span>
            </Link>
            <span className="font-black text-sm">/</span>
            <span className="font-bold text-stone-700 uppercase">Silabus &amp; Roadmap</span>
            <span className="font-black text-sm">/</span>
            <span className="font-black text-black uppercase">
              Pekan {weekNum} &bull; {weekData.title}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono font-bold">
            <span className="px-2.5 py-1 bg-[#86EFAC] text-black border border-black uppercase font-black">
              LIVE TRACKER:
            </span>
            <span className="text-black font-bold">
              {serverTime.dateFormatted} ({serverTime.timeFormatted})
            </span>
          </div>
        </div>

        {/* 12 Weeks Clean Horizontal Switcher */}
        <div className="bg-white border-2.5 border-black p-3.5 shadow-[4px_4px_0px_#000] flex items-center space-x-2 overflow-x-auto text-xs font-mono">
          <span className="font-black text-black uppercase px-2 shrink-0">
            PEKAN:
          </span>
          {CURRICULUM_DATA.map((w) => {
            const isActive = w.week === weekNum;
            const isDone = w.week < progress.currentWeek;

            return (
              <Link
                key={w.week}
                href={`/student/curriculum/${w.week}`}
                className={`px-3.5 py-2 border-2 border-black shrink-0 transition-all font-black uppercase cursor-pointer ${
                  isActive
                    ? "bg-black text-[#FACC15] shadow-[3px_3px_0px_#000] translate-x-[-1px] translate-y-[-1px]"
                    : isDone
                    ? "bg-[#86EFAC] text-black shadow-[2px_2px_0px_#000] hover:bg-emerald-300"
                    : "bg-white text-black shadow-[2px_2px_0px_#000] hover:bg-[#FEF08A]"
                }`}
              >
                Pekan {String(w.week).padStart(2, "0")}
              </Link>
            );
          })}
        </div>

        {/* Hero Week Banner */}
        <div className="bg-white border-2.5 border-black p-6 sm:p-7 shadow-[5px_5px_0px_#000] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="px-2.5 py-0.5 bg-[#FEF08A] text-black border border-black font-black uppercase">
                  Pekan {weekNum} dari 12
                </span>
                <span className="text-black font-black">&bull;</span>
                <span className="font-bold text-stone-800 uppercase">{weekData.description}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase mt-1">
                {weekData.title}
              </h1>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <span className="px-3.5 py-1.5 bg-[#FEF08A] border-2 border-black text-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Target: +180 XP</span>
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-800 font-bold leading-relaxed max-w-3xl">
            {weekData.description} &bull; Fase: {weekData.phaseTitle}
          </p>

          {/* Tab Switcher */}
          <div className="bg-[#FEF08A] p-1.5 border-2 border-black grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-xs font-black uppercase">
            <button
              onClick={() => setActiveTab("tatap-muka")}
              className={`py-2 px-3 border-2 transition-all cursor-pointer text-center ${
                activeTab === "tatap-muka"
                  ? "bg-black text-[#FACC15] border-black shadow-[2px_2px_0px_#000]"
                  : "bg-white text-black border-black shadow-[1px_1px_0px_#000] hover:bg-yellow-200"
              }`}
            >
              2 Sesi Tatap Muka (Jumat &amp; Sabtu)
            </button>
            <button
              onClick={() => setActiveTab("pr-harian")}
              className={`py-2 px-3 border-2 transition-all cursor-pointer text-center ${
                activeTab === "pr-harian"
                  ? "bg-black text-[#FACC15] border-black shadow-[2px_2px_0px_#000]"
                  : "bg-white text-black border-black shadow-[1px_1px_0px_#000] hover:bg-yellow-200"
              }`}
            >
              4 PR Mandiri (Senin &ndash; Kamis)
            </button>
            <button
              onClick={() => setActiveTab("rangkuman")}
              className={`py-2 px-3 border-2 transition-all cursor-pointer text-center ${
                activeTab === "rangkuman"
                  ? "bg-black text-[#FACC15] border-black shadow-[2px_2px_0px_#000]"
                  : "bg-white text-black border-black shadow-[1px_1px_0px_#000] hover:bg-yellow-200"
              }`}
            >
              Rangkuman &amp; Capstone
            </button>
          </div>
        </div>

        {/* TAB 1: 2 SESI TATAP MUKA LIVE */}
        {activeTab === "tatap-muka" && (
          <div className="space-y-4 animate-fadeIn">
            {/* Sesi Jumat */}
            <div className={`p-6 border-2.5 border-black shadow-[4px_4px_0px_#000] space-y-4 bg-white`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black pb-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold text-stone-700">
                    <span className="text-black font-black uppercase">Sesi Jumat</span>
                    <span>&bull;</span>
                    <span>16.00 &ndash; 18.00 WIB (120 Menit)</span>
                  </div>
                  <h2 className="text-lg font-black text-black uppercase">
                    {defaultJumatSession.title}
                  </h2>
                </div>

                <span className={`text-xs px-2.5 py-1 border border-black font-black flex items-center space-x-1.5 ${jumatStatus.badgeClass}`}>
                  {jumatStatus.icon}
                  <span dangerouslySetInnerHTML={{ __html: jumatStatus.label }} />
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-800 font-bold leading-relaxed">
                {defaultJumatSession.conceptIntro}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href={`/student/live-session/${weekNum}/jumat`}
                  className="px-4 py-2.5 bg-[#FACC15] hover:bg-yellow-400 text-black border-2 border-black font-black text-xs transition flex items-center space-x-2 shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none uppercase cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Masuk Sesi Tatap Muka Live (Jumat)</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </Link>

                <Link
                  href={`/student/learn/${weekNum}/kamis`}
                  className="px-3.5 py-2.5 bg-white border-2 border-black text-black hover:bg-[#FEF08A] text-xs font-black shadow-[2px_2px_0px_#000] transition flex items-center space-x-1.5 uppercase"
                >
                  <Code2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Lihat PR Latihan Kamis</span>
                </Link>
              </div>
            </div>

            {/* Sesi Sabtu */}
            <div className={`p-6 border-2.5 border-black shadow-[4px_4px_0px_#000] space-y-4 bg-white`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black pb-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold text-stone-700">
                    <span className="text-black font-black uppercase">Sesi Sabtu</span>
                    <span>&bull;</span>
                    <span>16.00 &ndash; 18.00 WIB (120 Menit)</span>
                  </div>
                  <h2 className="text-lg font-black text-black uppercase">
                    {defaultSabtuSession.title}
                  </h2>
                </div>

                <span className={`text-xs px-2.5 py-1 border border-black font-black flex items-center space-x-1.5 ${sabtuStatus.badgeClass}`}>
                  {sabtuStatus.icon}
                  <span dangerouslySetInnerHTML={{ __html: sabtuStatus.label }} />
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-800 font-bold leading-relaxed">
                {defaultSabtuSession.conceptIntro}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href={`/student/live-session/${weekNum}/sabtu`}
                  className="px-4 py-2.5 bg-[#86EFAC] hover:bg-green-300 text-black border-2 border-black font-black text-xs transition flex items-center space-x-2 shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none uppercase cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Masuk Sesi Tatap Muka Live (Sabtu)</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 4 PR LATIHAN MANDIRI */}
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
                  className="bg-white border-2.5 border-black p-5 shadow-[4px_4px_0px_#000] space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs pb-2 border-b-2 border-black">
                      <span className="font-black text-black uppercase">{item.label}</span>
                      <span className="px-2 py-0.5 border border-black font-black uppercase text-[10px] bg-[#FEF08A] text-black">
                        15 Menit &bull; +{assignment.points} XP
                      </span>
                    </div>

                    <h3 className="text-sm font-black text-black leading-snug uppercase">
                      {assignment.title}
                    </h3>

                    <p className="text-xs text-stone-800 font-bold leading-relaxed line-clamp-2">
                      {assignment.challengeInstructions}
                    </p>
                  </div>

                  <div className="pt-3 border-t-2 border-black flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] font-black uppercase text-stone-700">
                      {isDone ? "Sudah tuntas" : "Siap dikerjakan"}
                    </span>

                    <Link
                      href={`/student/learn/${weekNum}/${item.dayKey}`}
                      className="px-3.5 py-1.5 bg-[#FACC15] hover:bg-yellow-400 text-black border-2 border-black text-xs font-black transition flex items-center space-x-1 cursor-pointer shadow-[2px_2px_0px_#000] uppercase hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px]"
                    >
                      <span>{isDone ? "Buka Kembali" : "Kerjakan PR"}</span>
                      <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: RANGKUMAN MATERI & CAPSTONE */}
        {activeTab === "rangkuman" && (
          <div className="bg-white border-2.5 border-black p-6 sm:p-7 shadow-[4px_4px_0px_#000] space-y-4 animate-fadeIn">
            <h2 className="text-lg font-black text-black uppercase tracking-tight">
              Rangkuman Inti Materi Pekan {weekNum}
            </h2>
            <ul className="space-y-2.5 text-xs text-stone-900 font-bold leading-relaxed">
              <li className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-black stroke-[3] shrink-0 mt-0.5" />
                <span>Penguasaan materi: {weekData.title}</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-black stroke-[3] shrink-0 mt-0.5" />
                <span>4 Tantangan Latihan PR Harian (Senin s.d. Kamis) berdurasi 15 menit mandiri</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-black stroke-[3] shrink-0 mt-0.5" />
                <span>2 Sesi Tatap Muka Interaktif 1-on-1 (Jumat &amp; Sabtu) berdurasi 120 menit bersama instruktur</span>
              </li>
            </ul>

            {weekData.capstoneInfo && (
              <div className="pt-4 border-t-2 border-black flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-black uppercase text-black">
                  {weekData.capstoneInfo.title}
                </span>
                <Link
                  href={`/student/capstone/${weekData.capstoneInfo.id}`}
                  className="px-4 py-2 bg-[#FACC15] hover:bg-yellow-400 border-2 border-black text-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] transition cursor-pointer"
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
