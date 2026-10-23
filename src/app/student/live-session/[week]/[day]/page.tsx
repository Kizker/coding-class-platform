"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { CURRICULUM_DATA, LiveSessionItem } from "@/data/curriculum";
import { useSession } from "@/lib/auth/sessionContext";
import { usePyodide, ExecutionResult } from "@/lib/pyodide/usePyodide";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { ConsoleOutput } from "@/components/editor/ConsoleOutput";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  Video,
  Radio,
  Clock,
  Terminal,
  HelpCircle,
  Copy,
  Check,
  Bell,
  Award,
  Layers,
  ChevronRight,
  ShieldCheck,
  Flame,
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
  } = useSession();

  const { isRunning, runCode } = usePyodide();

  const weekData = CURRICULUM_DATA.find((w) => w.week === weekNum) || CURRICULUM_DATA[0];
  const sessionItem: LiveSessionItem =
    weekData.liveSessions.find((s) => s.day === dayKey) ||
    weekData.liveSessions[0] || {
      id: `live-${weekNum}-${dayKey}`,
      day: dayKey as any,
      sessionNumber: (weekNum - 1) * 2 + (dayKey === "jumat" ? 1 : 2),
      title: `Pertemuan Tatap Muka Pekan ${weekNum}`,
      durationMinutes: 120,
      conceptIntro: "Pembelajaran langsung 1-on-1 interaktif bersama tutor.",
      guidedSteps: [],
      practiceChallenge: "Latihan langsung terpadu bersama tutor.",
      studentStarterCode: "# Mulai koding di sini bersama bimbingan tutor:\n",
      expectedOutputDesc: "Hasil program berjalan sukses.",
    };

  // Structured 4-stage step-by-step guidance for interactive 1-on-1 learning
  const defaultStages = [
    {
      step: 1,
      badge: "TAHAP 1: KONSEP & ANALOGI",
      title: "Membongkar Cara Kerja Program",
      description:
        sessionItem.conceptIntro ||
        "Pahami analogi dan alur kerja konsep sebelum mulai menulis baris kode.",
      tutorCode:
        sessionItem.guidedSteps[0]?.tutorCode ||
        `# Kode Peraga Tutor (Tahap 1):\ndef demo_konsep():\n    print("Memahami fungsi modular")\n\ndemo_konsep()`,
      instruction:
        "Perhatikan kode peraga tutor di sebelah kiri. Tutor akan menjelaskan konsep dasarnya sebelum kamu mencoba di editor.",
    },
    {
      step: 2,
      badge: "TAHAP 2: LIVE CODING TERBIMBING",
      title: "Membangun Fondasi Baris demi Baris",
      description:
        sessionItem.guidedSteps[1]?.description ||
        "Tuliskan struktur dasar programmu. Ikuti arahan tutor baris demi baris.",
      tutorCode:
        sessionItem.guidedSteps[1]?.tutorCode ||
        sessionItem.studentStarterCode ||
        `# Langkah 2: Tambahkan parameter dan proses kalkulasi\ndef hitung(a, b):\n    return a + b\n\nhasil = hitung(10, 20)\nprint(f"Hasil: {hasil}")`,
      instruction:
        "Ketik kode dasar di editormu. Jika kesulitan, klik tombol 'Salin Kode Tutor' untuk mengambil kerangka kode.",
    },
    {
      step: 3,
      badge: "TAHAP 3: EKSPLORASI & VARIASI KASUS",
      title: "Mengembangkan Logika Mandiri",
      description:
        sessionItem.practiceChallenge ||
        "Ubah nilai input, tambahkan percabangan logika, dan periksa apakah program fleksibel menerima data baru.",
      tutorCode: `# Langkah 3: Variasi Kasus\ndef kalkulator_fleksibel(a, b, operasi):\n    if operasi == "+": return a + b\n    elif operasi == "*": return a * b\n    return "Operasi belum didukung"\n\nprint(kalkulator_fleksibel(7, 8, "*"))`,
      instruction:
        "Tutor memantau layarmu secara langsung. Cobalah bereksperimen dengan menambahkan kondisi percabangan baru.",
    },
    {
      step: 4,
      badge: "TAHAP 4: TANTANGAN & FINAL REVIEW",
      title: "Penyelesaian Tantangan Akhir Sesi",
      description:
        sessionItem.expectedOutputDesc ||
        "Jalankan kode akhirmu. Buktikan program berjalan bersih tanpa pesan error.",
      tutorCode: `# Langkah 4: Final Challenge Sesi Tatap Muka\nprint("=== TANTANGAN SELESAI DENGAN SUKSES ===")\n`,
      instruction:
        "Klik tombol 'JALANKAN KODE'. Setelah output muncul sesuai target, klik 'Selesaikan Sesi Tatap Muka' untuk mencatat kelulusan sesi!",
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
      setPushedAlert("Tutor baru saja memperbarui kode instruksi di editormu!");
      setEditorCode(pushedCode);
      updateStudentLiveCode(pushedCode);
      const timer = setTimeout(() => setPushedAlert(null), 5000);
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
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* ======================================================== */}
      {/* 1. TOP LIVE CLASSROOM STATUS BAR                         */}
      {/* ======================================================== */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono shadow-2xs sticky top-0 z-40">
        <div className="flex items-center space-x-2.5">
          <Link
            href="/student/dashboard"
            className="text-slate-600 hover:text-blue-600 transition flex items-center space-x-1 font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>DASHBOARD</span>
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500 font-semibold">PEKAN {weekNum}</span>
          <span className="text-slate-300">/</span>
          <span className="text-blue-700 font-bold uppercase">
            TATAP MUKA LANGSUNG ({dayKey})
          </span>
          <span className="text-slate-300 hidden md:inline">/</span>
          <span className="text-slate-900 font-bold hidden md:inline font-sans truncate max-w-xs">
            {sessionItem.title}
          </span>
        </div>

        {/* Live Status Indicators */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span>TUTOR LIVE: ANDRICHA DEA MITRA</span>
          </div>

          <div className="hidden sm:flex items-center space-x-1.5 text-slate-600 font-semibold">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>SESI 120M &bull; LIVE DIRECT</span>
          </div>

          {sessionCompleted ? (
            <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>TERCATAT SELESAI</span>
            </span>
          ) : (
            <button
              onClick={handleCompleteSession}
              className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-xs flex items-center space-x-1 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Selesaikan Sesi</span>
            </button>
          )}
        </div>
      </header>

      {/* Tutor Pushed Code Banner Alert */}
      {pushedAlert && (
        <div className="bg-emerald-50 border-b border-emerald-300 px-4 py-2 text-xs font-mono text-emerald-900 flex items-center justify-between shadow-2xs animate-fadeIn">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
            <span>{pushedAlert}</span>
          </div>
          <span className="text-[10px] font-bold uppercase bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
            SYNC OK
          </span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. PROGRESSIVE STEPPER BAR (MENGARAHKAN BERTAHAP)        */}
      {/* ======================================================== */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-1 text-xs font-mono font-bold text-slate-600">
            <Radio className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>ALUR BIMBINGAN INTERAKTIF BERTAHAP:</span>
          </div>

          {/* Stepper Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto text-xs font-mono">
            {defaultStages.map((stage) => {
              const isCurrent = activeStep === stage.step;
              const isPassed = activeStep > stage.step;

              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStep(stage.step)}
                  className={`px-3 py-1 rounded-lg font-bold transition flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                    isCurrent
                      ? "bg-blue-600 text-white shadow-xs"
                      : isPassed
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] bg-white/20">
                    {stage.step}
                  </span>
                  <span>{stage.badge.replace(/^TAHAP \d+: /, "")}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. MAIN LIVE STUDIO: SPLIT INTERACTIVE INTERFACE         */}
      {/* ======================================================== */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* ======================================================== */}
        {/* LEFT COLUMN (5/12): PAPAN ARAHAN LIVE DARI TUTOR        */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 bg-white border-r border-slate-200 p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Active Stage Card */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-blue-600 text-white">
                {currentStage.badge}
              </span>
              <span className="text-xs font-mono text-slate-500">
                Langkah {activeStep} / 4
              </span>
            </div>

            <h2 className="text-base font-bold text-slate-900 leading-snug">
              {currentStage.title}
            </h2>

            <p className="text-xs text-slate-700 leading-relaxed">
              {currentStage.description}
            </p>
          </div>

          {/* Tutor Direct Instruction */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
              ARAHAN LANGSUNG MENTOR:
            </span>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-sans">
              <div className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">👉</span>
                <span>{currentStage.instruction}</span>
              </div>
            </div>
          </div>

          {/* Tutor Live Code Preview Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                KODE PERAGA TUTOR (REALTIME):
              </span>
              <button
                onClick={handleCopyTutorCode}
                className="text-xs font-mono text-blue-600 hover:text-blue-800 flex items-center space-x-1 font-bold cursor-pointer"
              >
                {copiedCodeNotice ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin ke Editorku</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto shadow-inner">
              <pre>{currentStage.tutorCode}</pre>
            </div>
          </div>

          {/* Interactive Stage Controller */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
            <button
              onClick={() => setHelpRequested(!helpRequested)}
              className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                helpRequested
                  ? "bg-amber-100 text-amber-900 border border-amber-300"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>{helpRequested ? "Sinyal Bantuan Terkirim" : "Minta Bimbingan Tutor"}</span>
            </button>

            {activeStep < 4 ? (
              <button
                onClick={() => setActiveStep(activeStep + 1)}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition flex items-center justify-center space-x-1 shadow-xs cursor-pointer"
              >
                <span>Lanjut ke Tahap {activeStep + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleCompleteSession}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition flex items-center justify-center space-x-1 shadow-xs cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Tuntaskan Sesi</span>
              </button>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN (7/12): EDITOR SISWA & RUNNER TERMINAL      */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 flex flex-col bg-slate-900 text-slate-100 min-h-[500px]">
          {/* Editor Header Bar */}
          <div className="bg-slate-800/90 border-b border-slate-700/80 px-4 py-2 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              <span className="font-bold text-slate-200">
                EDITOR SISWA // main.py
              </span>
              <span className="text-slate-500 hidden sm:inline">&bull;</span>
              <span className="text-slate-400 text-[11px] hidden sm:inline">
                Tersinkron ke Layar Mentor
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  handleEditorChange(
                    sessionItem.studentStarterCode || `# Sesi Tatap Muka Pekan ${weekNum}\n`
                  )
                }
                title="Reset Kode ke Template"
                className="p-1 rounded text-slate-400 hover:text-slate-200 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-500 disabled:opacity-50 transition flex items-center space-x-1.5 shadow-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? "MENJALANKAN..." : "JALANKAN KODE (RUN)"}</span>
              </button>
            </div>
          </div>

          {/* Monaco Editor Pane */}
          <div className="flex-1 min-h-[320px] bg-[#1e1e1e]">
            <CodeEditor
              value={editorCode}
              onChange={handleEditorChange}
              height="100%"
            />
          </div>

          {/* Output Terminal Pane */}
          <div className="h-48 border-t border-slate-800 bg-slate-950 flex flex-col">
            <div className="bg-slate-900 px-4 py-1.5 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span>TERMINAL EKSEKUSI PYTHON (PYODIDE 3.12)</span>
              </div>
              {lastResult && (
                <span
                  className={
                    lastResult.isSuccess ? "text-emerald-400 font-bold" : "text-red-400 font-bold"
                  }
                >
                  {lastResult.isSuccess ? "EXIT CODE 0 (OK)" : "ERROR TERDETEKSI"}
                </span>
              )}
            </div>

            <div className="flex-1 p-3 overflow-y-auto font-mono text-xs text-slate-200">
              {lastResult ? (
                <pre className="whitespace-pre-wrap">
                  {lastResult.stdout || lastResult.stderr || "(Program selesai tanpa output teks)"}
                </pre>
              ) : (
                <div className="text-slate-500 italic text-[11px] flex items-center space-x-1.5">
                  <span>Klik tombol</span>
                  <strong className="text-emerald-400">JALANKAN KODE (RUN)</strong>
                  <span>untuk melihat hasil eksekusi programmu di sini.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
