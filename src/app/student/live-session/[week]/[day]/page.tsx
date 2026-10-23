"use client";

import React, { use, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CURRICULUM_DATA, LiveSessionItem } from "@/data/curriculum";
import { useSession } from "@/lib/auth/sessionContext";
import { usePyodide, ExecutionResult } from "@/lib/pyodide/usePyodide";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { LIVE_QUIZ_QUESTIONS } from "@/data/liveQuizQuestions";
import confetti from "canvas-confetti";
import { WEEK_1_SUB_MATERIALS, SubMaterialItem } from "@/data/liveSubMaterials";
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
  ArrowRight,
  Cpu,
  Layers,
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

  // 3 Sub-materials for Tab 2 (Pembelajaran Interaktif Pekan 1)
  const subMaterials = WEEK_1_SUB_MATERIALS;

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
        {/* TAB 2: PEMBELAJARAN INTERAKTIF (1 KOLOM LINEAR MENGALIR) */}
        {/* ======================================================== */}
        {activeTab === 2 && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
            {/* 1. Header & Sub-Materi Nav Switcher */}
            <div className="bg-white border border-stone-200/80 rounded-2xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-stone-100 pb-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                    Tahap 2 &bull; Pembelajaran Terbimbing &amp; Praktik Langsung
                  </span>
                  <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-snug">
                    {activeSubMaterial.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-500 font-sans">
                    {activeSubMaterial.subtitle}
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-xs text-stone-500 font-medium shrink-0 pt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  <span>Terhubung dengan mentor</span>
                </div>
              </div>

              {/* 3 Sub-Material Tabs Switcher */}
              <div className="flex p-1 bg-stone-100 rounded-xl text-xs">
                {subMaterials.map((sub) => {
                  const isCurrent = currentSubStep === sub.sub;
                  return (
                    <button
                      key={sub.sub}
                      onClick={() => {
                        updateLiveSync({ subStep: sub.sub });
                        handleCopyTutorCode(sub.demoCode);
                      }}
                      className={`flex-1 py-2 px-3 rounded-lg font-medium transition cursor-pointer text-center ${
                        isCurrent
                          ? "bg-white text-stone-900 shadow-2xs font-semibold"
                          : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      <span className="hidden sm:inline">Sub-Materi {sub.sub}: </span>
                      <span>{sub.title.split(":")[1]?.trim() || `Sub ${sub.sub}`}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Kartu Penjelasan Konsep & Analogi Dunia Nyata */}
            <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
              <div className="flex items-center space-x-2 text-xs font-semibold text-stone-900">
                <BookOpen className="w-4 h-4 text-stone-500" />
                <span>1. Konsep &amp; Nalar Logika</span>
              </div>

              <p className="text-sm text-stone-700 leading-relaxed font-sans">
                {activeSubMaterial.concept}
              </p>

              {/* Analogi Dunia Nyata yang Ramah Siswa */}
              <div className="p-4 sm:p-5 rounded-xl bg-stone-50 border border-stone-200/70 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-stone-900">
                  <span className="text-base">{activeSubMaterial.analogy.icon}</span>
                  <span>{activeSubMaterial.analogy.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                  {activeSubMaterial.analogy.description}
                </p>
              </div>

              {/* Tiga Pilar Pemahaman Logika */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                  Tiga Pilar Pemahaman Logika:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {activeSubMaterial.deepExplanation.map((point, idx) => {
                    const [head, ...rest] = point.split(":");
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-stone-50/70 border border-stone-200/60 text-xs text-stone-700 space-y-1"
                      >
                        <span className="font-semibold text-stone-900 block font-sans">
                          {head}
                        </span>
                        <p className="text-stone-600 leading-relaxed font-sans text-[11px]">
                          {rest.join(":")}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. Kartu Bedah Fungsi Bawaan (Deep Dive Built-in Functions) */}
            <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
              <div className="flex items-center space-x-2 text-xs font-semibold text-stone-900 border-b border-stone-100 pb-3">
                <Cpu className="w-4 h-4 text-stone-500" />
                <span>2. Bedah Fungsi Bawaan Python (Built-in Functions)</span>
              </div>

              <div className="space-y-4">
                {activeSubMaterial.functionsExplained.map((fn, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-stone-200/80 bg-white space-y-3.5"
                  >
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="font-mono text-base font-bold text-stone-900">
                        {fn.name}
                      </span>
                      <span className="text-xs text-stone-500 font-mono">
                        Sintaksis: {fn.syntax}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                        Peran Teknis:
                      </span>
                      <p className="text-xs sm:text-sm text-stone-800 font-sans leading-relaxed">
                        {fn.role}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                        Cara Kerja di Balik Layar:
                      </span>
                      <p className="text-xs text-stone-600 font-sans leading-relaxed">
                        {fn.howItWorks}
                      </p>
                    </div>

                    {/* Aturan Wajib */}
                    <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200/60 text-xs text-stone-700 space-y-1.5">
                      <span className="font-semibold text-stone-900 flex items-center space-x-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-stone-500" />
                        <span>Aturan Penulisan:</span>
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-stone-600 leading-relaxed font-sans text-xs">
                        {fn.importantRules.map((r, rIdx) => (
                          <li key={rIdx}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Kartu Bedah Variabel & Alokasi Memori RAM */}
            <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
              <div className="flex items-center space-x-2 text-xs font-semibold text-stone-900 border-b border-stone-100 pb-3">
                <Layers className="w-4 h-4 text-stone-500" />
                <span>3. Bedah Variabel &amp; Alokasi Memori RAM</span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Setiap variabel adalah wadah penyimpanan di RAM dengan label nama dan tipe data yang jelas:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {activeSubMaterial.variablesExplained.map((v, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-xl border border-stone-200/80 bg-white space-y-3 flex flex-col justify-between shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                  >
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between border-b border-stone-100 pb-2">
                        <span className="font-mono text-sm font-bold text-stone-900">
                          {v.name}
                        </span>
                        <span className="text-xs text-stone-500 font-mono">
                          {v.type}
                        </span>
                      </div>

                      <div className="text-xs text-stone-600 font-sans flex items-center space-x-1.5">
                        <span className="text-stone-400">Nilai di RAM:</span>
                        <code className="font-mono font-semibold text-stone-900 bg-stone-100 px-1.5 py-0.5 rounded">
                          {v.value}
                        </code>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs font-sans">
                      <p className="text-stone-700 leading-relaxed font-medium">
                        {v.memoryRole}
                      </p>
                      <p className="text-stone-500 text-[11px] leading-relaxed pt-1.5 border-t border-stone-100">
                        {v.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Kartu Kode Peraga Mentor & Bedah Eksekusi Baris demi Baris */}
            <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
              <div className="flex items-center justify-between text-xs border-b border-stone-100 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  <span className="font-semibold text-stone-900 text-sm">
                    4. Kode Peraga Mentor &amp; Alur Eksekusi Komputer
                  </span>
                </div>

                <button
                  onClick={() => handleCopyTutorCode(activeSubMaterial.demoCode)}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 hover:border-stone-300 text-stone-700 hover:text-stone-900 font-medium transition cursor-pointer flex items-center space-x-1.5 text-xs bg-white hover:bg-stone-50"
                >
                  {copiedCodeNotice ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Tersalin ke Latihan</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-400" />
                      <span>Salin ke Latihan Mandiri</span>
                    </>
                  )}
                </button>
              </div>

              {/* Syntax Card */}
              <div className="p-4 rounded-xl bg-stone-900 text-stone-100 font-mono text-xs overflow-x-auto leading-relaxed border border-stone-800 shadow-inner">
                <pre>{activeSubMaterial.demoCode}</pre>
              </div>

              {/* Line-by-Line Breakdown Table (Clean, Uncut Code Walkthrough) */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                  Alur Eksekusi Baris demi Baris:
                </span>
                <div className="border border-stone-200/80 rounded-xl overflow-hidden divide-y divide-stone-100 bg-white">
                  {activeSubMaterial.lineByLine.map((step) => (
                    <div
                      key={step.line}
                      className="p-3.5 sm:p-4 flex flex-col md:flex-row md:items-start gap-2.5 md:gap-5 text-xs font-sans hover:bg-stone-50/50 transition-colors"
                    >
                      {/* Line Number & Full Code */}
                      <div className="shrink-0 md:w-72 space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-stone-400 font-semibold text-xs shrink-0 w-6">
                            {String(step.line).padStart(2, "0")}
                          </span>
                          <code className="font-mono font-semibold text-stone-900 text-xs bg-stone-100 px-2 py-1 rounded block truncate max-w-full">
                            {step.code}
                          </code>
                        </div>
                      </div>

                      {/* Explanation & Memory Note */}
                      <div className="flex-1 space-y-1 md:pl-2">
                        <p className="text-stone-800 leading-relaxed font-normal">
                          {step.explanation}
                        </p>
                        {step.memoryState && (
                          <p className="text-[11px] font-mono text-stone-500 leading-normal">
                            ↳ <span className="text-stone-600">{step.memoryState}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aturan Emas / Golden Rules */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 text-xs text-stone-700 space-y-2">
                <div className="flex items-center space-x-2 font-semibold text-stone-900">
                  <Sparkles className="w-3.5 h-3.5 text-stone-500" />
                  <span>Aturan Emas Pemrograman Python:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-stone-600 leading-relaxed font-sans">
                  {activeSubMaterial.keyRules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 6. Kartu Latihan Praktik Mandiri */}
            <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    Latihan Praktik Mandiri (Sub {currentSubStep})
                  </h3>
                  <p className="text-xs text-stone-500 font-sans">
                    Ketik dan jalankan kodemu untuk menguji pemahaman konsep secara langsung.
                  </p>
                </div>

                <button
                  onClick={() => handleCopyTutorCode(activeSubMaterial.trialStarter)}
                  className="text-stone-600 hover:text-stone-900 text-xs font-medium transition cursor-pointer self-start sm:self-auto"
                >
                  Muat Kerangka Latihan
                </button>
              </div>

              {/* Petunjuk Soal Praktik */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 text-xs text-stone-700 space-y-1">
                <span className="font-semibold text-stone-900 block">Tugas Latihan:</span>
                <p className="leading-relaxed font-sans text-stone-600">{activeSubMaterial.trialInstruction}</p>
              </div>

              {/* Integrated Code Editor & Controls */}
              <div className="rounded-xl border border-stone-200/80 overflow-hidden shadow-2xs">
                {/* Editor Header Bar */}
                <div className="px-4 py-2.5 bg-stone-50 border-b border-stone-200/70 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 font-mono text-stone-700">
                    <span className="font-semibold">uji_praktik_sub_{currentSubStep}.py</span>
                    <span className="text-stone-300">&bull;</span>
                    <span className="text-[11px] text-stone-400 font-sans">Python 3.11</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCopyTutorCode(activeSubMaterial.trialStarter)}
                      className="text-stone-400 hover:text-stone-700 transition flex items-center space-x-1 text-xs cursor-pointer px-2 py-1"
                      title="Reset kode latihan"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>

                    <button
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className="px-4 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition flex items-center space-x-1.5 shadow-2xs cursor-pointer disabled:opacity-50"
                    >
                      <Play className="w-3 h-3 fill-current text-emerald-400" />
                      <span>{isRunning ? "Mengeksekusi..." : "Jalankan Kode Praktik"}</span>
                    </button>
                  </div>
                </div>

                {/* Editor Canvas */}
                <div className="min-h-[260px]">
                  <CodeEditor
                    value={editorCode}
                    onChange={handleEditorChange}
                    height="260px"
                    hideHeader={true}
                    hideBorder={true}
                  />
                </div>

                {/* Terminal Output */}
                <div className="border-t border-stone-200/80 bg-stone-50/70 p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-600 font-medium">
                    <div className="flex items-center space-x-2">
                      <Terminal className="w-3.5 h-3.5 text-stone-500" />
                      <span className="text-stone-900 font-semibold">Hasil Eksekusi Program:</span>
                    </div>

                    {lastResult && (
                      <span
                        className={
                          lastResult.isSuccess
                            ? "text-emerald-700 font-semibold text-xs flex items-center space-x-1"
                            : "text-rose-700 font-semibold text-xs flex items-center space-x-1"
                        }
                      >
                        {lastResult.isSuccess ? "Berhasil Berjalan" : "Error Logika"}
                      </span>
                    )}
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-stone-200/70 font-mono text-xs text-stone-800 min-h-[70px] max-h-[180px] overflow-y-auto">
                    {lastResult ? (
                      <pre className="whitespace-pre-wrap leading-relaxed">
                        {lastResult.stdout || lastResult.stderr || "(Program selesai tanpa teks luaran)"}
                      </pre>
                    ) : (
                      <p className="text-stone-400 font-sans text-xs italic">
                        Klik tombol &ldquo;Jalankan Kode Praktik&rdquo; di atas untuk melihat luaran programmu di sini.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Navigasi Lanjut Antar Sub-Materi */}
            <div className="flex items-center justify-between pt-2">
              {currentSubStep > 1 ? (
                <button
                  onClick={() => {
                    const prevSub = currentSubStep - 1;
                    updateLiveSync({ subStep: prevSub });
                    handleCopyTutorCode(subMaterials[prevSub - 1].demoCode);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold transition cursor-pointer flex items-center space-x-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sub-Materi Sebelumnya</span>
                </button>
              ) : (
                <div />
              )}

              {currentSubStep < 3 ? (
                <button
                  onClick={() => {
                    const nextSub = currentSubStep + 1;
                    updateLiveSync({ subStep: nextSub });
                    handleCopyTutorCode(subMaterials[nextSub - 1].demoCode);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition cursor-pointer flex items-center space-x-2 shadow-2xs"
                >
                  <span>Lanjut ke Sub-Materi {currentSubStep + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab(3)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition cursor-pointer flex items-center space-x-2 shadow-2xs"
                >
                  <span>Selesai Belajar &rarr; Lanjut ke Kuis Logika</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
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
