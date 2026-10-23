"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { CURRICULUM_DATA } from "@/data/curriculum";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { useSession } from "@/lib/auth/sessionContext";
import confetti from "canvas-confetti";
import {
  Send,
  Check,
  Clock,
  Eye,
  ArrowLeft,
  ArrowRight,
  Terminal,
  CheckCircle2,
  Sparkles,
  Award,
  ChevronRight,
  MessageSquare,
} from "lucide-react";

export default function TutorTeachingStudioPage({
  params,
}: {
  params: Promise<{ week: string; day: string }>;
}) {
  const resolvedParams = use(params);
  const weekNum = parseInt(resolvedParams.week, 10) || 1;
  const dayKey = (resolvedParams.day || "jumat").toLowerCase();

  const { pushCodeToStudent, studentLiveCode, progress, updateProgress, setTaskCompleted } =
    useSession();

  const weekData = CURRICULUM_DATA.find((w) => w.week === weekNum) || CURRICULUM_DATA[0];
  const sessionData =
    weekData.liveSessions.find((s) => s.day === dayKey) ||
    weekData.liveSessions[0] || {
      id: `live-default`,
      day: dayKey as any,
      sessionNumber: (weekNum - 1) * 2 + (dayKey === "jumat" ? 1 : 2),
      title: "Sesi Tatap Muka Langsung",
      durationMinutes: 120,
      conceptIntro: "Materi inti pembelajaran 2 jam.",
      guidedSteps: [],
      practiceChallenge: "Latihan langsung bersama siswa.",
      studentStarterCode: "# Kode latihan siswa",
      expectedOutputDesc: "Output yang diharapkan",
    };

  const [tutorCode, setTutorCode] = useState<string>(
    sessionData.guidedSteps[0]?.tutorCode ||
      `# Kode Peraga Pengajar:\ndef hitung_luas(panjang, lebar):\n    return panjang * lebar\n\nluas = hitung_luas(10, 5)\nprint(f"Luas Persegi Panjang: {luas}")`
  );

  const [activeStep, setActiveStep] = useState<number>(1);
  const [pushStatus, setPushStatus] = useState<string | null>(null);
  const [appreciationSent, setAppreciationSent] = useState<boolean>(false);
  const [isSessionMarkedDone, setIsSessionMarkedDone] = useState<boolean>(false);

  const handlePushCode = () => {
    pushCodeToStudent(tutorCode);
    setPushStatus("Kode peraga berhasil disinkronkan ke editor Andi.");
    setTimeout(() => setPushStatus(null), 4000);
  };

  const handleGiveStar = () => {
    updateProgress({ xpPoints: progress.xpPoints + 50 });
    setAppreciationSent(true);
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.7 },
    });
    setTimeout(() => setAppreciationSent(false), 3000);
  };

  const handleCompleteSession = () => {
    setTaskCompleted(weekNum, dayKey, true);
    setIsSessionMarkedDone(true);
    updateProgress({
      attendanceCount: progress.attendanceCount + 1,
    });
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.5 },
    });
  };

  const cleanTitle = sessionData.title.replace(/^Pertemuan \d+:\s*/, "");

  const teachingStages = [
    {
      step: 1,
      name: "Konsep & Analogi",
      duration: "25 Menit",
      desc: "Jelaskan logika konsep dasar menggunakan analogi nyata sebelum siswa menyentuh kode.",
    },
    {
      step: 2,
      name: "Demonstrasi Kode",
      duration: "45 Menit",
      desc: "Tulis kode contoh di editor kanan, lalu tekan tombol 'Kirim ke Layar Siswa'.",
    },
    {
      step: 3,
      name: "Praktik Terbimbing",
      duration: "40 Menit",
      desc: "Tantang siswa memprogram variasi kasus. Pantau ketikan siswa via Live Inspector di bawah.",
    },
    {
      step: 4,
      name: "Refleksi & Evaluasi",
      duration: "10 Menit",
      desc: "Beri feedback langsung, kirim apresiasi XP, dan simpan catatan nalar untuk orang tua.",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#FAFAF9] text-stone-900 flex flex-col font-sans antialiased">
      {/* ======================================================== */}
      {/* 1. QUIET TOP CONTEXT BAR                                 */}
      {/* ======================================================== */}
      <header className="bg-white border-b border-stone-200/80 px-4 sm:px-6 lg:px-8 py-3 sticky top-14 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Back & Topic */}
          <div className="flex items-center space-x-3">
            <Link
              href="/tutor/dashboard"
              className="text-stone-500 hover:text-stone-900 transition-colors flex items-center space-x-1.5 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
            <span className="text-stone-300">/</span>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-stone-900">
                Pekan {weekNum} &bull; Studio Mengajar {dayKey === "jumat" ? "Jumat" : "Sabtu"}
              </span>
              <span className="text-stone-400 hidden md:inline">&mdash;</span>
              <span className="text-stone-600 hidden md:inline truncate max-w-sm">
                {cleanTitle}
              </span>
            </div>
          </div>

          {/* Right: Student Presence & Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-stone-600 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>Siswa: Andi Pratama (Terhubung)</span>
            </div>

            {isSessionMarkedDone ? (
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-xs font-semibold flex items-center space-x-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sesi Selesai</span>
              </span>
            ) : (
              <button
                onClick={handleCompleteSession}
                className="px-3 py-1 rounded-lg border border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-900 text-xs font-medium transition cursor-pointer"
              >
                Tandai Sesi Selesai
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Push Notification Toast */}
      {pushStatus && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full">
          <div className="bg-stone-900 text-stone-100 px-4 py-3 rounded-xl text-xs flex items-center justify-between shadow-sm animate-fadeIn">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium">{pushStatus}</span>
            </div>
            <button
              onClick={() => setPushStatus(null)}
              className="text-stone-400 hover:text-white text-xs font-medium ml-4 cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. MAIN 2-COLUMN WORKSPACE (5 : 7)                       */}
      {/* ======================================================== */}
      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ======================================================== */}
        {/* LEFT COLUMN (5/12): PEDOMAN ALUR BIMBINGAN 120 MENIT     */}
        {/* ======================================================== */}
        <section className="lg:col-span-5 bg-white border border-stone-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-stone-900 tracking-tight">
                Pedoman Mengajar
              </h2>
              <span className="text-xs text-stone-500 font-medium">120 Menit</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {sessionData.conceptIntro}
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="space-y-2.5">
            {teachingStages.map((stage) => {
              const isActive = activeStep === stage.step;
              return (
                <div
                  key={stage.step}
                  onClick={() => setActiveStep(stage.step)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-1 ${
                    isActive
                      ? "bg-stone-50 border-stone-900 shadow-2xs"
                      : "bg-white border-stone-200/70 hover:border-stone-300 text-stone-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">
                      {stage.step}. {stage.name}
                    </span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {stage.duration}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {stage.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Quick Controls */}
          <div className="pt-4 border-t border-stone-100 space-y-2.5">
            <div className="flex gap-2.5">
              <button
                onClick={handleGiveStar}
                className="flex-1 py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-semibold text-xs transition flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-700" />
                <span>{appreciationSent ? "XP Terkirim! (+50 XP)" : "Beri Apresiasi (+50 XP)"}</span>
              </button>

              <Link
                href="/tutor/grading"
                className="py-2 px-4 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-medium transition text-center flex items-center space-x-1 cursor-pointer"
              >
                <span>Catatan Ortu</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* RIGHT COLUMN (7/12): KONTROL KODE PERAGA & LIVE INSPECTOR*/}
        {/* ======================================================== */}
        <section className="lg:col-span-7 space-y-6">
          {/* Card 1: Tutor Broadcast Editor */}
          <div className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col">
            <div className="px-5 py-3 border-b border-stone-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-stone-900 font-mono block">
                  Kode Peraga Pengajar
                </span>
                <span className="text-[11px] text-stone-500">
                  Kirimkan kode ini langsung ke layar siswa dengan tombol di samping.
                </span>
              </div>

              <button
                onClick={handlePushCode}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition flex items-center space-x-2 shadow-2xs cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kirim ke Layar Siswa</span>
              </button>
            </div>

            <div className="min-h-[260px]">
              <CodeEditor
                value={tutorCode}
                onChange={setTutorCode}
                height="260px"
                hideHeader={true}
                hideBorder={true}
              />
            </div>
          </div>

          {/* Card 2: Live Inspector Layar Andi Pratama */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 font-medium text-stone-800">
                <Eye className="w-4 h-4 text-stone-500" />
                <span className="font-semibold">Layar Kerja Andi Pratama (Live Inspector)</span>
              </div>
              <div className="flex items-center space-x-1.5 text-stone-500 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span>Tersinkron Realtime</span>
              </div>
            </div>

            {/* Read-only snapshot of student's editor */}
            <div className="rounded-xl border border-stone-200/70 bg-stone-50/70 p-3.5 text-xs text-stone-800 max-h-[160px] overflow-y-auto font-mono leading-relaxed">
              <pre className="whitespace-pre-wrap">{studentLiveCode}</pre>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 flex items-center justify-between text-xs text-stone-600">
              <div className="flex items-center space-x-2 font-mono">
                <Terminal className="w-3.5 h-3.5 text-stone-400" />
                <span className="font-semibold text-stone-800">Hasil Program Siswa:</span>
                <span className="text-stone-700">Output program berjalan normal</span>
              </div>
              <span className="text-emerald-700 font-semibold text-xs flex items-center space-x-1">
                <Check className="w-3.5 h-3.5" />
                <span>Siap Dinilai</span>
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
