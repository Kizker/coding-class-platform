"use client";

import React, { use, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CURRICULUM_DATA, LiveSessionItem } from "@/data/curriculum";
import { useSession } from "@/lib/auth/sessionContext";
import { usePyodide, ExecutionResult } from "@/lib/pyodide/usePyodide";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { LIVE_QUIZ_QUESTIONS } from "@/data/liveQuizQuestions";
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
  ChevronLeft,
  Terminal,
  AlertCircle,
  BookOpen,
  Award,
  Target,
  FileQuestion,
  GraduationCap,
  Sparkle,
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
    liveSync,
    updateLiveSync,
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

  // 3 Sub-materials for Tab 2 (Pembelajaran Interaktif)
  const subMaterials = [
    {
      sub: 1,
      title: "Sub-Materi 1: Fondasi Sintaks 'def' & Parameter Masukan",
      concept:
        "Fungsi adalah blok kode modular yang dapat dipanggil berkali-kali. Parameter adalah wadah data masukan agar fungsi bersifat dinamis dan fleksibel.",
      demoCode: `# Sub-Materi 1: Kode Peraga Mentor
def sapa_siswa(nama, pekan):
    return f"Halo {nama}, selamat belajar di Pekan {pekan}!"

pesan = sapa_siswa("Andi", ${weekNum})
print(pesan)`,
      trialInstruction:
        "Latihan Mandiri: Buat fungsi 'hitung_keliling(sisi)' yang mengembalikan keliling persegi (4 * sisi). Cetak hasil pemanggilannya ke terminal.",
      trialStarter: `# Latihan Mandiri Sub 1:
def hitung_keliling(sisi):
    return 4 * sisi

print("Keliling Persegi (sisi 7):", hitung_keliling(7))`,
    },
    {
      sub: 2,
      title: "Sub-Materi 2: Perbedaan Fundamental 'return' vs 'print()'",
      concept:
        "'print()' hanya memunculkan teks di terminal tanpa menyimpan nilainya. Sebaliknya, 'return' mengembalikan nilai hasil komputasi ke pemanggil agar dapat diolah pada kalkulasi berikutnya.",
      demoCode: `# Sub-Materi 2: Kode Peraga Mentor
def hitung_diskon(total_belanja):
    if total_belanja >= 100000:
        return total_belanja * 0.10
    return 0

belanja = 125000
diskon = hitung_diskon(belanja)
total_bayar = belanja - diskon
print(f"Total Bayar setelah diskon: Rp {int(total_bayar):,}")`,
      trialInstruction:
        "Latihan Mandiri: Buat fungsi 'cek_kelulusan(nilai)' yang mengembalikan 'LULUS' jika nilai >= 75 dan 'REMIDI' jika nilai < 75. Simpan hasilnya ke variabel lalu cetak.",
      trialStarter: `# Latihan Mandiri Sub 2:
def cek_kelulusan(nilai):
    if nilai >= 75:
        return "LULUS"
    return "REMIDI"

status = cek_kelulusan(85)
print("Status Andi:", status)`,
    },
    {
      sub: 3,
      title: "Sub-Materi 3: Scope Variabel & Integrasi Modul Eksternal",
      concept:
        "Variabel di dalam fungsi bersifat LOKAL dan tidak mempengaruhi variabel luar bernama sama. Python juga menyediakan pustaka seperti 'random' yang bisa dipadukan di dalam fungsi.",
      demoCode: `# Sub-Materi 3: Kode Peraga Mentor
import random

pilihan = ["Batu", "Gunting", "Kertas"]

def bot_pilih():
    return random.choice(pilihan)

komputer = bot_pilih()
print("Langkah Komputer:", komputer)`,
      trialInstruction:
        "Latihan Mandiri: Buat fungsi 'suit(pemain)' yang mengacak pilihan bot dan menentukan apakah pemain 'Menang', 'Kalah', atau 'Seri'.",
      trialStarter: `# Latihan Mandiri Sub 3:
import random

def suit(pemain):
    bot = random.choice(["Batu", "Gunting", "Kertas"])
    print(f"Pemain: {pemain} vs Bot: {bot}")
    if pemain == bot:
        return "Hasil: SERI"
    elif (pemain == "Batu" and bot == "Gunting") or (pemain == "Gunting" and bot == "Kertas") or (pemain == "Kertas" and bot == "Batu"):
        return "Hasil: ANDI MENANG!"
    else:
        return "Hasil: BOT MENANG"

print(suit("Batu"))`,
    },
  ];

  // Active Tab: 1: Tantangan, 2: Pembelajaran, 3: Kuis, 4: Refleksi
  const [activeTab, setActiveTab] = useState<number>(liveSync.currentStep || 1);
  const currentSubStep = liveSync.subStep || 1;
  const activeSubMaterial = subMaterials[currentSubStep - 1] || subMaterials[0];

  // Sync tab if tutor directs to a new step
  useEffect(() => {
    if (liveSync.currentStep && liveSync.currentStep !== activeTab) {
      setActiveTab(liveSync.currentStep);
    }
  }, [liveSync.currentStep]);

  // Code editor state
  const [editorCode, setEditorCode] = useState<string>(
    studentLiveCode ||
      sessionItem.studentStarterCode ||
      `# Sesi Tatap Muka Pekan ${weekNum} — Hari ${dayKey === "jumat" ? "Jumat" : "Sabtu"}\n`
  );

  const [lastResult, setLastResult] = useState<ExecutionResult | null>(null);
  const [copiedCodeNotice, setCopiedCodeNotice] = useState<boolean>(false);
  const [pushedAlert, setPushedAlert] = useState<string | null>(null);
  const [helpRequested, setHelpRequested] = useState<boolean>(false);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(
    isTaskCompleted(weekNum, dayKey)
  );

  // Quiz state (Tab 3: 10 Soal)
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>(
    liveSync.studentQuizAnswers || {}
  );

  // Sync editor changes with live tutor monitoring context & server state
  const handleEditorChange = (newCode: string) => {
    setEditorCode(newCode);
    updateStudentLiveCode(newCode);
  };

  const lastHandledPushedCodeRef = useRef<string | null>(null);

  // Realtime notification when tutor pushes new guidance code
  useEffect(() => {
    if (pushedCode && pushedCode !== lastHandledPushedCodeRef.current) {
      lastHandledPushedCodeRef.current = pushedCode;
      setPushedAlert("Mentor baru saja mengirimkan kode peraga ke editormu.");
      setEditorCode(pushedCode);
      const timer = setTimeout(() => setPushedAlert(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [pushedCode]);

  // Run student code locally in Pyodide & sync output with tutor's live inspector
  const handleRunCode = async () => {
    const result = await runCode(editorCode);
    setLastResult(result);

    // Sync output to tutor inspector
    const outputString =
      result.stdout ||
      result.stderr ||
      (result.isSuccess ? "Program selesai tanpa luaran teks" : "Terjadi error sintaks");

    await updateLiveSync({
      studentExecutionOutput: outputString,
      studentOutputSuccess: result.isSuccess,
    });
  };

  // Copy tutor guidance code directly into student editor
  const handleCopyTutorCode = (codeToCopy: string) => {
    setEditorCode(codeToCopy);
    updateStudentLiveCode(codeToCopy);
    setCopiedCodeNotice(true);
    setTimeout(() => setCopiedCodeNotice(false), 2000);
  };

  // Handle quiz answer selection
  const handleSelectQuizAnswer = async (questionId: number, optionIndex: number) => {
    const updatedAnswers = { ...userAnswers, [questionId]: optionIndex };
    setUserAnswers(updatedAnswers);

    // Evaluate correct status
    const currentQ = LIVE_QUIZ_QUESTIONS.find((q) => q.id === questionId);
    const isCorrect = currentQ ? currentQ.correctAnswerIndex === optionIndex : false;

    const existingScores = liveSync.quizScores || {};
    const updatedScores = { ...existingScores, [questionId]: isCorrect };

    const totalAnswered = Object.keys(updatedAnswers).length;
    const correctCount = Object.values(updatedScores).filter(Boolean).length;
    const finalScore = Math.round((correctCount / LIVE_QUIZ_QUESTIONS.length) * 100);

    await updateLiveSync({
      studentQuizAnswers: updatedAnswers,
      studentQuizScore: finalScore,
      quizScores: updatedScores,
      quizTotalAnswered: totalAnswered,
      quizCorrectCount: correctCount,
      quizSubmitted: totalAnswered === LIVE_QUIZ_QUESTIONS.length,
    });
  };

  // Mark 2-hour live session completed
  const handleCompleteSession = async () => {
    setTaskCompleted(weekNum, dayKey, true);
    setSessionCompleted(true);
    updateProgress({
      xpPoints: progress.xpPoints + 50,
      attendanceCount: progress.attendanceCount + 1,
    });

    await updateLiveSync({
      sessionCompleted: true,
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const cleanTitle = sessionItem.title.replace(/^Pertemuan \d+:\s*/, "");
  const activeQuiz = LIVE_QUIZ_QUESTIONS[currentQuizIndex] || LIVE_QUIZ_QUESTIONS[0];
  const totalQuestions = LIVE_QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(userAnswers).length;
  const quizCorrectCount = Object.entries(userAnswers).filter(([qId, ansIdx]) => {
    const q = LIVE_QUIZ_QUESTIONS.find((item) => item.id === Number(qId));
    return q && q.correctAnswerIndex === ansIdx;
  }).length;

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

          {/* Right: Mentor Presence & Session Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-stone-600 text-xs font-medium bg-stone-50 px-3 py-1 rounded-full border border-stone-200/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>Dipandu Mentor Mas Andri</span>
            </div>

            {sessionCompleted ? (
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-xs font-semibold flex items-center space-x-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Selesai (+50 XP)</span>
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
      {/* 2. PROMINENT 4-STEP TABS NAVIGATION BAR                  */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-white border border-stone-200/80 rounded-2xl p-2 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-wrap items-center justify-between gap-2">
          {/* 4 Discrete Tabs */}
          <div className="flex items-center space-x-1.5 flex-1 min-w-[320px]">
            {[
              { id: 1, label: "Tantangan Awal", icon: <Target className="w-4 h-4" /> },
              { id: 2, label: "Pembelajaran Interaktif", icon: <BookOpen className="w-4 h-4" /> },
              { id: 3, label: "Kuis Logika (10 Soal)", icon: <FileQuestion className="w-4 h-4" /> },
              { id: 4, label: "Refleksi & Hasil", icon: <Award className="w-4 h-4" /> },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const isDirectedByTutor = liveSync.currentStep === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer relative ${
                    isActive
                      ? "bg-stone-900 text-white shadow-2xs font-semibold"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/70"
                  }`}
                >
                  <span className={isActive ? "text-amber-400" : "text-stone-400"}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>

                  {/* Marker if tutor is directing this tab */}
                  {isDirectedByTutor && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tutor Direction Status Badge */}
          <div className="text-xs text-stone-500 font-medium px-3 py-1 bg-stone-50 rounded-xl border border-stone-200/60 hidden sm:flex items-center space-x-2">
            <span className="text-[11px] text-stone-400">Fokus Bimbingan:</span>
            <span className="font-semibold text-stone-800">
              {liveSync.currentStep === 1 && "Tahap 1: Tantangan Awal"}
              {liveSync.currentStep === 2 && `Tahap 2: Pembelajaran (Sub ${currentSubStep})`}
              {liveSync.currentStep === 3 && "Tahap 3: Kuis Logika"}
              {liveSync.currentStep === 4 && "Tahap 4: Refleksi"}
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. DEDICATED WORKSPACE PER TAB (HIGH FOCUS)             */}
      {/* ======================================================== */}
      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex-1">
        {/* ======================================================== */}
        {/* TAB 1: TANTANGAN AWAL                                    */}
        {/* ======================================================== */}
        {activeTab === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fadeIn">
            {/* Left 5/12: Tantangan Spec */}
            <section className="lg:col-span-5 bg-white border border-stone-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
                  Uji Coba Awal &bull; Diagnostik Nalar Koding
                </span>
                <h1 className="text-xl font-bold text-stone-900 tracking-tight leading-snug">
                  Tantangan Logika Awal
                </h1>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Sebelum kita membedah konsep materi hari ini, cobalah selesaikan tantangan logika singkat ini di editor sebelah kanan. Mentor akan melihat caramu berpikir dan merancang alur program secara langsung.
                </p>
              </div>

              {/* Box Instruksi Soal */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 space-y-2">
                <span className="text-xs font-semibold text-stone-900 flex items-center space-x-1.5">
                  <Target className="w-3.5 h-3.5 text-stone-500" />
                  <span>Skenario Tantangan:</span>
                </span>
                <p className="text-xs text-stone-700 leading-relaxed font-sans">
                  {sessionItem.practiceChallenge ||
                    "Buatlah sebuah program Python sederhana yang menampung panjang dan lebar sebuah persegi panjang, lalu hitung serta cetak luas dan kelilingnya ke terminal."}
                </p>
              </div>

              {/* Target Keluaran */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                  Target Keluaran Terminal:
                </span>
                <div className="p-3.5 rounded-xl bg-stone-900 text-stone-100 font-mono text-xs leading-relaxed border border-stone-800">
                  <pre>{sessionItem.expectedOutputDesc || "Luas: 50\nKeliling: 30"}</pre>
                </div>
              </div>

              {/* Info Mentor */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 space-y-1">
                <div className="flex items-center space-x-2 font-semibold text-amber-950">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Petunjuk Mentor:</span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  Ketik kodemu di workspace sebelah kanan lalu klik &ldquo;Jalankan Kode&rdquo;. Mentor akan memantau ketikan dan luaran programmu, kemudian mengarahkan ke Tab Pembelajaran Interaktif.
                </p>
              </div>
            </section>

            {/* Right 7/12: Code Editor & Output */}
            <section className="lg:col-span-7 bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col">
              <div className="px-5 py-3 border-b border-stone-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-stone-900 font-mono">tantangan.py</span>
                  <span className="text-stone-300">&bull;</span>
                  <div className="flex items-center space-x-1.5 text-stone-500 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    <span className="text-[11px]">Terhubung ke layar mentor</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={() =>
                      handleEditorChange(
                        sessionItem.studentStarterCode || `# Tantangan Awal Pekan ${weekNum}\n`
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

              <div className="min-h-[340px]">
                <CodeEditor
                  value={editorCode}
                  onChange={handleEditorChange}
                  height="340px"
                  hideHeader={true}
                  hideBorder={true}
                />
              </div>

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
                      {lastResult.isSuccess ? "Berjalan Normal" : "Perlu Diperiksa"}
                    </span>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-stone-200/70 font-mono text-xs text-stone-800 min-h-[90px] max-h-[200px] overflow-y-auto">
                  {lastResult ? (
                    <pre className="whitespace-pre-wrap leading-relaxed">
                      {lastResult.stdout || lastResult.stderr || "(Program selesai tanpa teks keluaran)"}
                    </pre>
                  ) : (
                    <p className="text-stone-400 font-sans text-xs italic">
                      Tekan tombol &ldquo;Jalankan Kode&rdquo; untuk menguji programmu.
                    </p>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: PEMBELAJARAN INTERAKTIF & UJI COBA SUB-MATERI    */}
        {/* ======================================================== */}
        {activeTab === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fadeIn">
            {/* Left 5/12: Materi & Kode Peraga & Latihan Mandiri */}
            <section className="lg:col-span-5 bg-white border border-stone-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
              {/* Header Sub-Materi */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wider">
                    Materi Interaktif &bull; Sub {currentSubStep} dari 3
                  </span>
                  <span className="text-[11px] text-stone-400 font-medium">
                    Sinkron Layar Mentor
                  </span>
                </div>
                <h2 className="text-lg font-bold text-stone-900 tracking-tight leading-snug">
                  {activeSubMaterial.title}
                </h2>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {activeSubMaterial.concept}
                </p>
              </div>

              {/* Sub-Material Nav Tabs */}
              <div className="flex gap-1.5 p-1 bg-stone-100 rounded-xl text-xs">
                {subMaterials.map((sub) => {
                  const isCurrent = currentSubStep === sub.sub;
                  return (
                    <button
                      key={sub.sub}
                      onClick={() => updateLiveSync({ subStep: sub.sub })}
                      className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition cursor-pointer text-center ${
                        isCurrent
                          ? "bg-white text-stone-900 shadow-2xs font-semibold"
                          : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      Sub {sub.sub}
                    </button>
                  );
                })}
              </div>

              {/* Kode Peraga Mentor */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                    Kode Peraga Mentor
                  </span>
                  <button
                    onClick={() => handleCopyTutorCode(activeSubMaterial.demoCode)}
                    className="text-stone-600 hover:text-stone-900 flex items-center space-x-1.5 font-medium transition cursor-pointer"
                  >
                    {copiedCodeNotice ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Tersalin ke Editorku</span>
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
                  <pre>{activeSubMaterial.demoCode}</pre>
                </div>
              </div>

              {/* Latihan Uji Coba Mandiri Sub-Materi */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Latihan Uji Coba Mandiri Sub {currentSubStep}:</span>
                  </span>
                  <button
                    onClick={() => handleCopyTutorCode(activeSubMaterial.trialStarter)}
                    className="text-[11px] text-emerald-800 hover:text-emerald-950 underline font-medium cursor-pointer"
                  >
                    Pakai Kerangka Ini
                  </button>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed font-sans">
                  {activeSubMaterial.trialInstruction}
                </p>
              </div>
            </section>

            {/* Right 7/12: Code Editor & Execution */}
            <section className="lg:col-span-7 bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col">
              <div className="px-5 py-3 border-b border-stone-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-stone-900 font-mono">latihan_sub_{currentSubStep}.py</span>
                  <span className="text-stone-300">&bull;</span>
                  <div className="flex items-center space-x-1.5 text-stone-500 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    <span className="text-[11px]">Terhubung ke layar mentor</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={() => handleCopyTutorCode(activeSubMaterial.trialStarter)}
                    className="text-stone-400 hover:text-stone-700 transition flex items-center space-x-1 text-xs cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset Latihan</span>
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

              <div className="min-h-[340px]">
                <CodeEditor
                  value={editorCode}
                  onChange={handleEditorChange}
                  height="340px"
                  hideHeader={true}
                  hideBorder={true}
                />
              </div>

              <div className="border-t border-stone-200/80 bg-stone-50/70 p-4 sm:p-5 flex flex-col space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-600 font-medium">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-3.5 h-3.5 text-stone-500" />
                    <span className="text-stone-900 font-semibold">Hasil Eksekusi Uji Coba</span>
                  </div>
                  {lastResult && (
                    <span
                      className={
                        lastResult.isSuccess
                          ? "text-emerald-700 font-semibold flex items-center space-x-1"
                          : "text-rose-700 font-semibold flex items-center space-x-1"
                      }
                    >
                      {lastResult.isSuccess ? "Berhasil" : "Error Logika"}
                    </span>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-stone-200/70 font-mono text-xs text-stone-800 min-h-[90px] max-h-[200px] overflow-y-auto">
                  {lastResult ? (
                    <pre className="whitespace-pre-wrap leading-relaxed">
                      {lastResult.stdout || lastResult.stderr || "(Program selesai tanpa teks keluaran)"}
                    </pre>
                  ) : (
                    <p className="text-stone-400 font-sans text-xs italic">
                      Coba kode latihanmu dan klik &ldquo;Jalankan Kode&rdquo; untuk melihat hasilnya.
                    </p>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: KUIS LOGIKA INTERAKTIF (10 SOAL)                  */}
        {/* ======================================================== */}
        {activeTab === 3 && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            {/* Top Score & Progress Header */}
            <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider block">
                  Evaluasi Nalar Koding
                </span>
                <h1 className="text-xl font-bold text-stone-900 tracking-tight">
                  Kuis Logika Python (10 Soal Menengah)
                </h1>
                <p className="text-xs text-stone-500 mt-0.5">
                  Setiap pilihan jawabanmu langsung tersinkron dan dinilai oleh sistem secara realtime.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 uppercase block font-semibold">
                    Progres Terjawab
                  </span>
                  <span className="text-base font-bold text-stone-900">
                    {answeredCount} / {totalQuestions} Soal
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-stone-400 uppercase block font-semibold">
                    Skor Logika
                  </span>
                  <span className="text-base font-bold text-emerald-700">
                    {Math.round((quizCorrectCount / totalQuestions) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* 10 Number Stepper Buttons */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 p-3 bg-white border border-stone-200/80 rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              {LIVE_QUIZ_QUESTIONS.map((q, idx) => {
                const isCurrent = currentQuizIndex === idx;
                const isAnswered = userAnswers[q.id] !== undefined;
                const isCorrect = userAnswers[q.id] === q.correctAnswerIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuizIndex(idx)}
                    className={`h-9 rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                      isCurrent
                        ? "bg-stone-900 text-white ring-2 ring-stone-900/20"
                        : isAnswered
                        ? isCorrect
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                          : "bg-rose-50 text-rose-800 border border-rose-300"
                        : "bg-stone-50 text-stone-600 border border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    <span>{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Interactive Question Card */}
            <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
              <div className="flex items-center justify-between text-xs border-b border-stone-100 pb-3">
                <span className="font-bold text-stone-900 text-sm">
                  Soal Nomor {activeQuiz.id} dari {totalQuestions}
                </span>

                {userAnswers[activeQuiz.id] !== undefined && (
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                      userAnswers[activeQuiz.id] === activeQuiz.correctAnswerIndex
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-rose-50 text-rose-800 border border-rose-200"
                    }`}
                  >
                    {userAnswers[activeQuiz.id] === activeQuiz.correctAnswerIndex
                      ? "Jawaban Tepat (+10 Poin)"
                      : "Jawaban Kurang Tepat"}
                  </span>
                )}
              </div>

              <p className="text-sm font-semibold text-stone-900 leading-relaxed font-sans">
                {activeQuiz.question}
              </p>

              {/* Code Snippet */}
              {activeQuiz.codeSnippet && (
                <div className="p-4 rounded-xl bg-stone-900 text-stone-100 font-mono text-xs overflow-x-auto leading-relaxed border border-stone-800 shadow-inner">
                  <pre>{activeQuiz.codeSnippet}</pre>
                </div>
              )}

              {/* 4 Answer Options */}
              <div className="space-y-2.5 pt-1">
                {activeQuiz.options.map((opt, oIdx) => {
                  const isSelected = userAnswers[activeQuiz.id] === oIdx;
                  const isAnswered = userAnswers[activeQuiz.id] !== undefined;
                  const isCorrectAnswer = activeQuiz.correctAnswerIndex === oIdx;

                  let optionStyle =
                    "bg-white border-stone-200/80 text-stone-800 hover:bg-stone-50 hover:border-stone-300";

                  if (isAnswered) {
                    if (isSelected && isCorrectAnswer) {
                      optionStyle = "bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold";
                    } else if (isSelected && !isCorrectAnswer) {
                      optionStyle = "bg-rose-50 border-rose-400 text-rose-950 font-semibold";
                    } else if (isCorrectAnswer) {
                      optionStyle = "bg-emerald-50/40 border-emerald-300 text-emerald-900";
                    } else {
                      optionStyle = "bg-stone-50 border-stone-200 text-stone-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectQuizAnswer(activeQuiz.id, oIdx)}
                      className={`w-full p-4 rounded-xl border text-left text-xs transition flex items-center justify-between cursor-pointer ${optionStyle}`}
                    >
                      <span className="flex items-center space-x-3">
                        <span className="w-6 h-6 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center text-xs font-bold">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="font-mono text-xs">{opt}</span>
                      </span>

                      {isAnswered && isSelected && (
                        isCorrectAnswer ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-600" />
                        )
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Solusi & Pembahasan jika sudah dijawab */}
              {userAnswers[activeQuiz.id] !== undefined && (
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 text-xs text-stone-700 leading-relaxed space-y-1 animate-fadeIn font-sans">
                  <span className="font-semibold text-stone-900 block text-xs">
                    Pembahasan Logika:
                  </span>
                  <p>{activeQuiz.explanation}</p>
                </div>
              )}

              {/* Prev / Next Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                <button
                  disabled={currentQuizIndex === 0}
                  onClick={() => setCurrentQuizIndex(currentQuizIndex - 1)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 hover:text-stone-900 text-xs font-medium transition disabled:opacity-30 cursor-pointer flex items-center space-x-1.5"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Soal Sebelumnya</span>
                </button>

                {currentQuizIndex < totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentQuizIndex(currentQuizIndex + 1)}
                    className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition cursor-pointer flex items-center space-x-1.5 shadow-2xs"
                  >
                    <span>Soal Selanjutnya</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab(4)}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition cursor-pointer flex items-center space-x-1.5 shadow-2xs"
                  >
                    <span>Lanjut ke Tab Refleksi</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: REFLEKSI & PENUNTASAN                             */}
        {/* ======================================================== */}
        {activeTab === 4 && (
          <div className="max-w-2xl mx-auto bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto mb-2">
                <Award className="w-6 h-6" />
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
                Sesi Tatap Muka Tuntas
              </span>
              <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
                Refleksi Pembelajaran Hari Ini
              </h1>
              <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                Kerja yang luar biasa, Andi! Kamu telah menuntaskan seluruh tantangan, pembelajaran bertahap, dan kuis logika hari ini bersama mentor.
              </p>
            </div>

            {/* Pencapaian Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 text-center space-y-1">
                <span className="text-[10px] text-stone-500 font-semibold block uppercase">
                  Hasil Kuis Logika
                </span>
                <span className="text-2xl font-bold text-stone-900 block">
                  {quizCorrectCount} / {totalQuestions}
                </span>
                <span className="text-xs text-stone-500">
                  Akurasi {Math.round((quizCorrectCount / totalQuestions) * 100)}%
                </span>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 text-center space-y-1">
                <span className="text-[10px] text-amber-800 font-semibold block uppercase">
                  Penghargaan XP
                </span>
                <span className="text-2xl font-bold text-amber-900 block">
                  +50 XP
                </span>
                <span className="text-xs text-amber-700">
                  Sesi Tatap Muka
                </span>
              </div>
            </div>

            {/* Catatan Apresiasi Mentor */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-stone-900">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Ulasan dari Mas Andri (Lead Tutor):</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                &ldquo;Kemampuanmu membedakan antara fungsi berparameter dan return value sudah sangat baik. Terus asah insting kodingmu melalui latihan mandiri di dashboard!&rdquo;
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={handleCompleteSession}
                className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition flex items-center justify-center space-x-2 shadow-2xs cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Selesaikan Sesi &amp; Kembali ke Dashboard</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
