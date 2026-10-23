"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { CURRICULUM_DATA, LiveSessionItem } from "@/data/curriculum";
import { useSession } from "@/lib/auth/sessionContext";
import { usePyodide, ExecutionResult } from "@/lib/pyodide/usePyodide";
import { CodeEditor } from "@/components/editor/CodeEditor";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  Play,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Copy,
  Check,
  ChevronRight,
  Terminal,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function StudentLiveSessionPage({
  params,
}: {
  params: Promise<{ week: string; day: string }>;
}) {
  const resolvedParams = use(params);
  const weekNum = parseInt(resolvedParams.week, 10) || 1;
  const dayKey = (resolvedParams.day || "jumat").toLowerCase();

  const {
    progress,
    updateProgress,
    setTaskCompleted,
    isTaskCompleted,
    pushedCode,
    studentLiveCode,
    updateStudentLiveCode,
    isMounted,
  } = useSession();

  const { isRunning, runCode } = usePyodide();

  const weekData = CURRICULUM_DATA.find((w) => w.week === weekNum) || CURRICULUM_DATA[0];
  const sessionItem: LiveSessionItem =
    weekData.liveSessions.find((s) => s.day === dayKey) ||
    weekData.liveSessions[0] || {
      id: `live-${weekNum}-${dayKey}`,
      day: dayKey as any,
      sessionNumber: (weekNum - 1) * 2 + (dayKey === "jumat" ? 1 : 2),
      title: `Sesi Tatap Muka Pekan ${weekNum}`,
      durationMinutes: 120,
      conceptIntro: "Pembelajaran langsung 1-on-1 interaktif bersama tutor.",
      guidedSteps: [],
      practiceChallenge: "Latihan langsung terpadu bersama tutor.",
      studentStarterCode: "# Mulai koding di sini bersama bimbingan tutor:\n",
      expectedOutputDesc: "Hasil program berjalan sukses.",
    };

  // 4 Langkah bimbingan terstruktur yang ramah dan menenangkan
  const defaultStages = [
    {
      step: 1,
      badge: "Tahap 1: Konsep & Analogi",
      title: "Membongkar Cara Kerja Program",
      description:
        sessionItem.conceptIntro ||
        "Pahami alur berpikir dan analogi dasar sebelum kita mulai menulis kode di editor.",
      tutorCode:
        sessionItem.guidedSteps[0]?.tutorCode ||
        `# Contoh Logika Modular (Tahap 1)\ndef sapa(nama):\n    return f"Halo, {nama}! Selamat belajar."\n\npesan = sapa("Andi")\nprint(pesan)`,
      instruction:
        "Perhatikan contoh kode peraga di bawah. Mentor akan menjelaskan bagaimana data mengalir masuk dan keluar dari fungsi.",
    },
    {
      step: 2,
      badge: "Tahap 2: Praktik Terbimbing",
      title: "Menulis Struktur Dasar Bersama Mentor",
      description:
        sessionItem.guidedSteps[1]?.description ||
        "Mulai ketik kerangka kodemu di editor. Mentor memantau setiap baris yang kamu tulis secara langsung.",
      tutorCode:
        sessionItem.guidedSteps[1]?.tutorCode ||
        sessionItem.studentStarterCode ||
        `# Langkah 2: Fungsi Aritmatika Sederhana\ndef hitung_luas(panjang, lebar):\n    return panjang * lebar\n\nluas = hitung_luas(10, 5)\nprint(f"Luas Persegi Panjang: {luas}")`,
      instruction:
        "Tuliskan fungsi di editormu. Jika ingin menggunakan kerangka awal mentor, klik tombol 'Salin ke Editorku'.",
    },
    {
      step: 3,
      badge: "Tahap 3: Eksplorasi Kasus",
      title: "Mengembangkan Logika Mandiri",
      description:
        sessionItem.practiceChallenge ||
        "Coba variasikan nilai masukan atau tambahkan kondisi baru agar program semakin fleksibel.",
      tutorCode: `# Langkah 3: Variasi Operasi\ndef kalkulator(a, b, operasi):\n    if operasi == "+":\n        return a + b\n    elif operasi == "*":\n        return a * b\n    return "Operasi belum didukung"\n\nprint("Hasil 7 x 8 =", kalkulator(7, 8, "*"))`,
      instruction:
        "Eksperimen dengan menambahkan operasi pengurangan atau pembagian di editormu. Jangan takut salah, kita perbaiki bersama.",
    },
    {
      step: 4,
      badge: "Tahap 4: Tantangan & Uji Coba",
      title: "Menuntaskan Program Mandiri",
      description:
        sessionItem.expectedOutputDesc ||
        "Jalankan kodemu dan pastikan seluruh fungsi menghasilkan luaran yang tepat tanpa pesan error.",
      tutorCode: `# Finalisasi Program\nprint("Program berhasil berjalan dengan sempurna.")\n`,
      instruction:
        "Klik tombol 'Jalankan Kode'. Setelah hasil keluaran sesuai, klik 'Selesaikan Sesi' untuk mengabadikan pencapaian hari ini.",
    },
  ];

  const [activeStep, setActiveStep] = useState<number>(1);
  const currentStage = defaultStages[activeStep - 1] || defaultStages[0];

  // Student editor code state
  const [editorCode, setEditorCode] = useState<string>(
    studentLiveCode || sessionItem.studentStarterCode || `# Sesi Tatap Muka Hari ${dayKey.toUpperCase()}\n`
  );

  const [lastResult, setLastResult] = useState<ExecutionResult | null>(null);
  const [copiedCodeNotice, setCopiedCodeNotice] = useState<boolean>(false);
  const [pushedAlert, setPushedAlert] = useState<string | null>(null);
  const [helpRequested, setHelpRequested] = useState<boolean>(false);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(
    isTaskCompleted(weekNum, dayKey)
  );

  // Sync editor changes with live tutor monitoring context
  const handleEditorChange = (newCode: string) => {
    setEditorCode(newCode);
    updateStudentLiveCode(newCode);
  };

  // Realtime notification when tutor pushes new guidance code
  useEffect(() => {
    if (pushedCode) {
      setPushedAlert("Mentor baru saja memperbarui kode panduan di editormu.");
      setEditorCode(pushedCode);
      updateStudentLiveCode(pushedCode);
      const timer = setTimeout(() => setPushedAlert(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [pushedCode, updateStudentLiveCode]);

  // Run student code locally in Pyodide
  const handleRunCode = async () => {
    const result = await runCode(editorCode);
    setLastResult(result);
  };

  // Copy tutor guidance code directly into student editor
  const handleCopyTutorCode = () => {
    setEditorCode(currentStage.tutorCode);
    updateStudentLiveCode(currentStage.tutorCode);
    setCopiedCodeNotice(true);
    setTimeout(() => setCopiedCodeNotice(false), 2000);
  };

  // Mark 2-hour live session completed
  const handleCompleteSession = () => {
    setTaskCompleted(weekNum, dayKey, true);
    setSessionCompleted(true);
    updateProgress({
      xpPoints: progress.xpPoints + 50,
      attendanceCount: progress.attendanceCount + 1,
    });
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const cleanTitle = sessionItem.title.replace(/^Pertemuan \d+:\s*/, "");

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#FAFAF9] text-stone-900 flex flex-col font-sans antialiased">
      {/* ======================================================== */}
      {/* 1. QUIET CONTEXT BAR (SINGLE HUMAN-CENTRIC HEADER)       */}
      {/* ======================================================== */}
      <header className="bg-white border-b border-stone-200/80 px-4 sm:px-6 lg:px-8 py-3 sticky top-14 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Gentle Back & Title */}
          <div className="flex items-center space-x-3">
            <Link
              href="/student/dashboard"
              className="text-stone-500 hover:text-stone-900 transition-colors flex items-center space-x-1.5 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
            <span className="text-stone-300">/</span>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-stone-900">
                Pekan {weekNum} &bull; Sesi {dayKey === "jumat" ? "Jumat" : "Sabtu"}
              </span>
              <span className="text-stone-400 hidden md:inline">&mdash;</span>
              <span className="text-stone-600 hidden md:inline truncate max-w-sm">
                {cleanTitle}
              </span>
            </div>
          </div>

          {/* Right: Presence & Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-stone-600 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>Bersama Mas Andri</span>
            </div>

            {sessionCompleted ? (
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-xs font-semibold flex items-center space-x-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Selesai</span>
              </span>
            ) : (
              <button
                onClick={handleCompleteSession}
                className="px-3 py-1 rounded-lg border border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-900 text-xs font-medium transition cursor-pointer"
              >
                Tandai Selesai
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Tutor Pushed Code Subtle Toast */}
      {pushedAlert && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full">
          <div className="bg-stone-900 text-stone-100 px-4 py-3 rounded-xl text-xs flex items-center justify-between shadow-sm animate-fadeIn">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-medium">{pushedAlert}</span>
            </div>
            <button
              onClick={() => setPushedAlert(null)}
              className="text-stone-400 hover:text-white text-xs font-medium ml-4 cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. MAIN 2-COLUMN WORKSPACE (GENEROUS WHITESPACE)         */}
      {/* ======================================================== */}
      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ======================================================== */}
        {/* LEFT COLUMN (5/12): PANDUAN BERTARAP DARI MENTOR         */}
        {/* ======================================================== */}
        <section className="lg:col-span-5 bg-white border border-stone-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
          {/* Subtle Step Indicator */}
          <div className="space-y-2.5 pb-4 border-b border-stone-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-900">
                Langkah {activeStep} dari 4
              </span>
              <span className="text-stone-500 font-medium">
                {currentStage.badge.replace(/^Tahap \d+:\s*/, "")}
              </span>
            </div>

            {/* 4 Connected Step Bars */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((stepNum) => {
                const isActive = activeStep === stepNum;
                const isPassed = activeStep > stepNum;

                return (
                  <button
                    key={stepNum}
                    onClick={() => setActiveStep(stepNum)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      isActive
                        ? "bg-stone-900 ring-2 ring-stone-900/15"
                        : isPassed
                        ? "bg-emerald-500"
                        : "bg-stone-200 hover:bg-stone-300"
                    }`}
                    title={`Langkah ${stepNum}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Concept Header & Explanation */}
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-stone-900 tracking-tight leading-snug">
              {currentStage.title}
            </h1>
            <p className="text-xs text-stone-600 leading-relaxed">
              {currentStage.description}
            </p>
          </div>

          {/* Mentor Direct Note */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60 text-xs text-stone-700 leading-relaxed space-y-1">
            <span className="text-[11px] font-semibold text-stone-900 block">
              Catatan Mentor:
            </span>
            <p>{currentStage.instruction}</p>
          </div>

          {/* Tutor Reference Code Block */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                Contoh Kode Peraga
              </span>
              <button
                onClick={handleCopyTutorCode}
                className="text-stone-600 hover:text-stone-900 flex items-center space-x-1.5 font-medium transition cursor-pointer"
              >
                {copiedCodeNotice ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Tersalin ke Editormu</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-400" />
                    <span>Salin ke Editorku</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-stone-900 text-stone-100 font-mono text-xs overflow-x-auto leading-relaxed border border-stone-800 shadow-inner">
              <pre>{currentStage.tutorCode}</pre>
            </div>
          </div>

          {/* Ergonomic Action Footer */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
            <button
              onClick={() => setHelpRequested(!helpRequested)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition flex items-center space-x-1.5 cursor-pointer ${
                helpRequested
                  ? "bg-amber-50 text-amber-900 border border-amber-300"
                  : "bg-white hover:bg-stone-50 text-stone-600 hover:text-stone-900 border border-stone-200"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-stone-400" />
              <span>{helpRequested ? "Sinyal Terkirim" : "Tanya Mentor"}</span>
            </button>

            {activeStep < 4 ? (
              <button
                onClick={() => setActiveStep(activeStep + 1)}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition flex items-center space-x-1.5 shadow-2xs cursor-pointer"
              >
                <span>Lanjut Langkah {activeStep + 1}</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
              </button>
            ) : (
              <button
                onClick={handleCompleteSession}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition flex items-center space-x-1.5 shadow-2xs cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Selesaikan Sesi</span>
              </button>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* RIGHT COLUMN (7/12): INTEGRATED CODE STUDIO & OUTPUT     */}
        {/* ======================================================== */}
        <section className="lg:col-span-7 bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col">
          {/* Clean Unified Editor Header */}
          <div className="px-5 py-3 border-b border-stone-100 flex items-center justify-between text-xs">
            {/* Left Tab & Sync */}
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-stone-900 font-mono">
                main.py
              </span>
              <span className="text-stone-300">&bull;</span>
              <div className="flex items-center space-x-1.5 text-stone-500 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                <span className="text-[11px]">Tersambung ke layar mentor</span>
              </div>
            </div>

            {/* Right Action: Reset & Run */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() =>
                  handleEditorChange(
                    sessionItem.studentStarterCode || `# Sesi Tatap Muka Pekan ${weekNum}\n`
                  )
                }
                title="Pulihkan kode awal"
                className="text-stone-400 hover:text-stone-700 transition flex items-center space-x-1 text-xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Pulihkan</span>
              </button>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition flex items-center space-x-2 shadow-2xs disabled:opacity-50 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
                <span>{isRunning ? "Mengeksekusi..." : "Jalankan Kode"}</span>
              </button>
            </div>
          </div>

          {/* Monaco Editor Canvas (Light, Clean, Focused) */}
          <div className="min-h-[350px]">
            <CodeEditor
              value={editorCode}
              onChange={handleEditorChange}
              height="350px"
              hideHeader={true}
              hideBorder={true}
            />
          </div>

          {/* Clean Integrated Output Pane */}
          <div className="border-t border-stone-200/80 bg-stone-50/70 p-4 sm:p-5 flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-600 font-medium">
              <div className="flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5 text-stone-500" />
                <span className="text-stone-900 font-semibold">Hasil Program</span>
              </div>
              {lastResult && (
                <span
                  className={
                    lastResult.isSuccess
                      ? "text-emerald-700 font-semibold flex items-center space-x-1"
                      : "text-rose-700 font-semibold flex items-center space-x-1"
                  }
                >
                  {lastResult.isSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Berjalan Normal</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Perlu Diperiksa</span>
                    </>
                  )}
                </span>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-stone-200/70 font-mono text-xs text-stone-800 min-h-[90px] max-h-[220px] overflow-y-auto">
              {lastResult ? (
                <pre className="whitespace-pre-wrap leading-relaxed">
                  {lastResult.stdout || lastResult.stderr || "(Program selesai tanpa teks keluaran)"}
                </pre>
              ) : (
                <p className="text-stone-400 font-sans text-xs italic">
                  Tekan tombol &ldquo;Jalankan Kode&rdquo; untuk melihat hasil eksekusi programmu di sini.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
