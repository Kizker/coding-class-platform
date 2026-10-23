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
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#FDFBF7] text-black flex flex-col font-sans antialiased">
      {/* ======================================================== */}
      {/* 1. QUIET CONTEXT BAR (NEO-BRUTALIST HEADER)              */}
      {/* ======================================================== */}
      <header className="bg-white border-b-2.5 border-black px-4 sm:px-6 lg:px-8 py-3 sticky top-14 z-30 shadow-[0_3px_0px_#000000]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Gentle Back & Title */}
          <div className="flex items-center space-x-3">
            <Link
              href="/student/dashboard"
              className="text-black hover:bg-yellow-200 border-2 border-black px-2 py-1 rounded-lg transition-all flex items-center space-x-1.5 font-bold shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
            <span className="text-black font-bold">/</span>
            <div className="flex items-center space-x-2">
              <span className="font-black text-black">
                Pekan {weekNum} &bull; Sesi {dayKey === "jumat" ? "Jumat" : "Sabtu"}
              </span>
              <span className="text-black hidden md:inline font-bold">&mdash;</span>
              <span className="text-stone-700 hidden md:inline truncate max-w-sm font-medium">
                {cleanTitle}
              </span>
            </div>
          </div>

          {/* Right: Mentor Presence & Session Status */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-black text-xs font-bold bg-yellow-200 px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block animate-pulse border border-black" />
              <span>Dipandu Mentor Mas Andri</span>
            </div>

            {sessionCompleted ? (
              <span className="px-3 py-1 rounded-lg bg-emerald-300 text-black border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-black flex items-center space-x-1.5">
                <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                <span>Selesai (+50 XP)</span>
              </span>
            ) : (
              <button
                onClick={handleCompleteSession}
                className="px-3.5 py-1 rounded-lg border-2 border-black bg-white hover:bg-yellow-200 text-black text-xs font-bold shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
              >
                Tandai Selesai
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Tutor Pushed Code Neo-Brutalist Toast */}
      {pushedAlert && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full">
          <div className="bg-yellow-300 text-black border-2.5 border-black px-5 py-3 rounded-xl text-xs font-bold flex items-center justify-between shadow-[4px_4px_0px_#000] animate-fadeIn">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-4 h-4 text-black shrink-0" />
              <span className="font-extrabold">{pushedAlert}</span>
            </div>
            <button
              onClick={() => setPushedAlert(null)}
              className="text-black hover:bg-black hover:text-white px-2 py-0.5 rounded border border-black text-xs font-bold ml-4 cursor-pointer transition-all"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. PROMINENT 4-STEP TABS NAVIGATION BAR (NEO-BRUTALIST)  */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-white border-2.5 border-black rounded-2xl p-2 shadow-[4px_4px_0px_#000000] flex flex-wrap items-center justify-between gap-2">
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
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer relative border-2 ${
                    isActive
                      ? "bg-black text-yellow-300 border-black shadow-[2px_2px_0px_#000] font-black"
                      : "border-transparent text-black hover:border-black hover:bg-yellow-100 hover:shadow-[2px_2px_0px_#000]"
                  }`}
                >
                  <span className={isActive ? "text-yellow-300" : "text-black"}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>

                  {/* Marker if tutor is directing this tab */}
                  {isDirectedByTutor && !isActive && (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black animate-pulse ml-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tutor Direction Status Badge */}
          <div className="text-xs text-black font-bold px-3 py-1.5 bg-yellow-100 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] hidden sm:flex items-center space-x-2">
            <span className="text-[11px] text-stone-600">Fokus Bimbingan:</span>
            <span className="font-extrabold text-black">
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
            <section className="lg:col-span-5 bg-white border-2.5 border-black rounded-2xl p-6 shadow-[5px_5px_0px_#000000] space-y-5">
              <div className="space-y-2">
                <span className="text-[11px] font-black text-black uppercase tracking-wider block bg-yellow-300 border-2 border-black px-2.5 py-0.5 rounded-md w-fit shadow-[2px_2px_0px_#000]">
                  Uji Coba Awal &bull; Diagnostik Nalar Koding
                </span>
                <h1 className="text-xl font-black text-black tracking-tight leading-snug">
                  Tantangan Logika Awal
                </h1>
                <p className="text-xs text-stone-700 leading-relaxed font-sans font-medium">
                  Sebelum kita membedah konsep materi hari ini, cobalah selesaikan tantangan logika singkat ini di editor sebelah kanan. Mentor akan melihat caramu berpikir dan merancang alur program secara langsung.
                </p>
              </div>

              {/* Box Instruksi Soal */}
              <div className="p-4 rounded-xl bg-[#FEFCE8] border-2 border-black shadow-[3px_3px_0px_#000000] space-y-2">
                <span className="text-xs font-black text-black flex items-center space-x-1.5">
                  <Target className="w-4 h-4 text-black stroke-[2.5]" />
                  <span>Skenario Tantangan:</span>
                </span>
                <p className="text-xs text-black leading-relaxed font-sans font-medium">
                  {sessionItem.practiceChallenge ||
                    "Buatlah sebuah program Python sederhana yang menampung panjang dan lebar sebuah persegi panjang, lalu hitung serta cetak luas dan kelilingnya ke terminal."}
                </p>
              </div>

              {/* Target Keluaran */}
              <div className="space-y-2">
                <span className="text-[11px] font-black text-black uppercase tracking-wider block">
                  Target Keluaran Terminal:
                </span>
                <div className="p-3.5 rounded-xl bg-black text-green-400 font-mono text-xs leading-relaxed border-2 border-black shadow-[3px_3px_0px_#000000]">
                  <pre>{sessionItem.expectedOutputDesc || "Luas: 50\nKeliling: 30"}</pre>
                </div>
              </div>

              {/* Info Mentor */}
              <div className="p-4 rounded-xl bg-amber-100 border-2 border-black shadow-[3px_3px_0px_#000000] text-xs text-black space-y-1">
                <div className="flex items-center space-x-2 font-black text-black">
                  <Sparkles className="w-4 h-4 text-black stroke-[2.5]" />
                  <span>Petunjuk Mentor:</span>
                </div>
                <p className="text-black leading-relaxed font-medium">
                  Ketik kodemu di workspace sebelah kanan lalu klik &ldquo;Jalankan Kode&rdquo;. Mentor akan memantau ketikan dan luaran programmu, kemudian mengarahkan ke Tab Pembelajaran Interaktif.
                </p>
              </div>
            </section>

            {/* Right 7/12: Code Editor & Output */}
            <section className="lg:col-span-7 bg-white border-2.5 border-black rounded-2xl overflow-hidden shadow-[5px_5px_0px_#000000] flex flex-col">
              <div className="px-5 py-3 border-b-2 border-black bg-yellow-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <span className="font-mono font-black text-black text-sm">tantangan.py</span>
                  <span className="text-black font-bold">&bull;</span>
                  <div className="flex items-center space-x-1.5 text-black font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse border border-black" />
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
                    className="border-2 border-black bg-white hover:bg-yellow-200 px-2.5 py-1 rounded-lg text-black font-bold transition flex items-center space-x-1 text-xs shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Pulihkan</span>
                  </button>

                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-black text-xs font-black transition flex items-center space-x-2 shadow-[3px_3px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-black" />
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

              <div className="border-t-2 border-black bg-stone-100 p-4 sm:p-5 flex flex-col space-y-2">
                <div className="flex items-center justify-between text-xs text-black font-bold">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-black stroke-[2.5]" />
                    <span className="text-black font-black">Hasil Program</span>
                  </div>
                  {lastResult && (
                    <span
                      className={`font-black text-xs px-2 py-0.5 rounded border-2 border-black shadow-[1.5px_1.5px_0px_#000] ${
                        lastResult.isSuccess
                          ? "bg-emerald-300 text-black"
                          : "bg-rose-300 text-black"
                      }`}
                    >
                      {lastResult.isSuccess ? "Berjalan Normal" : "Perlu Diperiksa"}
                    </span>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-white border-2 border-black font-mono text-xs text-black min-h-[90px] max-h-[200px] overflow-y-auto shadow-[2px_2px_0px_#000]">
                  {lastResult ? (
                    <pre className="whitespace-pre-wrap leading-relaxed font-bold">
                      {lastResult.stdout || lastResult.stderr || "(Program selesai tanpa teks keluaran)"}
                    </pre>
                  ) : (
                    <p className="text-stone-500 font-sans text-xs italic">
                      Tekan tombol &ldquo;Jalankan Kode&rdquo; untuk menguji programmu.
                    </p>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: PEMBELAJARAN INTERAKTIF (NEO-BRUTALIST FLOW)      */}
        {/* ======================================================== */}
        {activeTab === 2 && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
            {/* 1. Header & Sub-Materi Nav Switcher */}
            <div className="bg-white border-2.5 border-black rounded-2xl p-5 sm:p-6 shadow-[5px_5px_0px_#000000] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b-2 border-black pb-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-black text-black uppercase tracking-wider block bg-yellow-300 border-2 border-black px-2 py-0.5 rounded w-fit shadow-[2px_2px_0px_#000]">
                    Tahap 2 &bull; Pembelajaran Terbimbing &amp; Praktik Langsung
                  </span>
                  <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight leading-snug">
                    {activeSubMaterial.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans font-medium">
                    {activeSubMaterial.subtitle}
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-xs text-black font-bold shrink-0 pt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black inline-block animate-pulse" />
                  <span>Terhubung dengan mentor</span>
                </div>
              </div>

              {/* 3 Sub-Material Tabs Switcher */}
              <div className="flex p-1 bg-stone-100 rounded-xl text-xs border-2 border-black gap-1.5 shadow-[2px_2px_0px_#000]">
                {subMaterials.map((sub) => {
                  const isCurrent = currentSubStep === sub.sub;
                  return (
                    <button
                      key={sub.sub}
                      onClick={() => {
                        updateLiveSync({ subStep: sub.sub });
                        handleCopyTutorCode(sub.demoCode);
                      }}
                      className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all cursor-pointer text-center border-2 ${
                        isCurrent
                          ? "bg-yellow-300 text-black border-black shadow-[2px_2px_0px_#000] font-black"
                          : "border-transparent text-black hover:border-black hover:bg-white"
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
            <div className="bg-white border-2.5 border-black rounded-2xl p-6 sm:p-7 shadow-[5px_5px_0px_#000000] space-y-5">
              <div className="flex items-center space-x-2 text-xs font-black text-black">
                <BookOpen className="w-4 h-4 text-black stroke-[2.5]" />
                <span className="text-sm">1. Konsep &amp; Nalar Logika</span>
              </div>

              <p className="text-sm text-black leading-relaxed font-sans font-medium">
                {activeSubMaterial.concept}
              </p>

              {/* Analogi Dunia Nyata yang Ramah Siswa */}
              <div className="p-4 sm:p-5 rounded-xl bg-amber-100 border-2 border-black shadow-[3px_3px_0px_#000000] space-y-2">
                <div className="flex items-center space-x-2 text-xs font-black text-black">
                  <span className="text-lg">{activeSubMaterial.analogy.icon}</span>
                  <span className="text-sm">{activeSubMaterial.analogy.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-sans font-medium">
                  {activeSubMaterial.analogy.description}
                </p>
              </div>

              {/* Tiga Pilar Pemahaman Logika */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-black text-black uppercase tracking-wider block">
                  Tiga Pilar Pemahaman Logika:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeSubMaterial.deepExplanation.map((point, idx) => {
                    const [head, ...rest] = point.split(":");
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_#000000] text-xs text-black space-y-1"
                      >
                        <span className="font-black text-black block font-sans">
                          {head}
                        </span>
                        <p className="text-stone-700 leading-relaxed font-sans text-[11px] font-medium">
                          {rest.join(":")}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. Kartu Bedah Fungsi Bawaan (Deep Dive Built-in Functions) */}
            <div className="bg-white border-2.5 border-black rounded-2xl p-6 sm:p-7 shadow-[5px_5px_0px_#000000] space-y-5">
              <div className="flex items-center space-x-2 text-xs font-black text-black border-b-2 border-black pb-3">
                <Cpu className="w-4 h-4 text-black stroke-[2.5]" />
                <span className="text-sm">2. Bedah Fungsi Bawaan Python (Built-in Functions)</span>
              </div>

              <div className="space-y-4">
                {activeSubMaterial.functionsExplained.map((fn, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border-2 border-black bg-white shadow-[3px_3px_0px_#000000] space-y-3.5"
                  >
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="font-mono text-base font-black text-black bg-yellow-200 border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_#000]">
                        {fn.name}
                      </span>
                      <span className="text-xs text-stone-700 font-mono font-bold">
                        Sintaksis: {fn.syntax}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-black text-black uppercase tracking-wider block">
                        Peran Teknis:
                      </span>
                      <p className="text-xs sm:text-sm text-black font-sans leading-relaxed font-medium">
                        {fn.role}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-black text-black uppercase tracking-wider block">
                        Cara Kerja di Balik Layar:
                      </span>
                      <p className="text-xs text-stone-700 font-sans leading-relaxed font-medium">
                        {fn.howItWorks}
                      </p>
                    </div>

                    {/* Aturan Wajib */}
                    <div className="p-3.5 rounded-lg bg-yellow-100 border-2 border-black shadow-[2px_2px_0px_#000000] text-xs text-black space-y-1.5">
                      <span className="font-black text-black flex items-center space-x-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                        <span>Aturan Penulisan:</span>
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-black leading-relaxed font-sans text-xs font-medium">
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
            <div className="bg-white border-2.5 border-black rounded-2xl p-6 sm:p-7 shadow-[5px_5px_0px_#000000] space-y-5">
              <div className="flex items-center space-x-2 text-xs font-black text-black border-b-2 border-black pb-3">
                <Layers className="w-4 h-4 text-black stroke-[2.5]" />
                <span className="text-sm">3. Bedah Variabel &amp; Alokasi Memori RAM</span>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed font-sans font-medium">
                Setiap variabel adalah wadah penyimpanan di RAM dengan label nama dan tipe data yang jelas:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeSubMaterial.variablesExplained.map((v, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-xl border-2 border-black bg-white space-y-3 flex flex-col justify-between shadow-[3px_3px_0px_#000000]"
                  >
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between border-b-2 border-black pb-2">
                        <span className="font-mono text-sm font-black text-black bg-yellow-200 border border-black px-1.5 py-0.5 rounded shadow-[1px_1px_0px_#000]">
                          {v.name}
                        </span>
                        <span className="text-xs text-stone-600 font-mono font-bold">
                          {v.type}
                        </span>
                      </div>

                      <div className="text-xs text-black font-sans flex items-center space-x-1.5">
                        <span className="text-stone-500 font-bold">Nilai di RAM:</span>
                        <code className="font-mono font-black text-black bg-emerald-200 border border-black px-1.5 py-0.5 rounded shadow-[1px_1px_0px_#000]">
                          {v.value}
                        </code>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs font-sans">
                      <p className="text-black leading-relaxed font-bold">
                        {v.memoryRole}
                      </p>
                      <p className="text-stone-600 text-[11px] leading-relaxed pt-1.5 border-t border-stone-200 font-medium">
                        {v.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Kartu Kode Peraga Mentor & Bedah Eksekusi Baris demi Baris */}
            <div className="bg-white border-2.5 border-black rounded-2xl p-6 sm:p-7 shadow-[5px_5px_0px_#000000] space-y-5">
              <div className="flex items-center justify-between text-xs border-b-2 border-black pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black inline-block animate-pulse" />
                  <span className="font-black text-black text-sm">
                    4. Kode Peraga Mentor &amp; Alur Eksekusi Komputer
                  </span>
                </div>

                <button
                  onClick={() => handleCopyTutorCode(activeSubMaterial.demoCode)}
                  className="px-3 py-1.5 rounded-lg border-2 border-black hover:bg-yellow-200 text-black font-bold transition-all cursor-pointer flex items-center space-x-1.5 text-xs bg-white shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  {copiedCodeNotice ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                      <span className="text-black font-black">Tersalin ke Latihan</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                      <span>Salin ke Latihan Mandiri</span>
                    </>
                  )}
                </button>
              </div>

              {/* Syntax Card */}
              <div className="p-4 rounded-xl bg-black text-green-400 font-mono text-xs overflow-x-auto leading-relaxed border-2 border-black shadow-[3px_3px_0px_#000000]">
                <pre>{activeSubMaterial.demoCode}</pre>
              </div>

              {/* Line-by-Line Breakdown Table (Clean, Uncut Code Walkthrough) */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-black text-black uppercase tracking-wider block">
                  Alur Eksekusi Baris demi Baris:
                </span>
                <div className="border-2 border-black rounded-xl overflow-hidden divide-y-2 divide-black bg-white shadow-[3px_3px_0px_#000000]">
                  {activeSubMaterial.lineByLine.map((step) => (
                    <div
                      key={step.line}
                      className="p-3.5 sm:p-4 flex flex-col md:flex-row md:items-start gap-2.5 md:gap-5 text-xs font-sans hover:bg-yellow-50 transition-colors"
                    >
                      {/* Line Number & Full Code */}
                      <div className="shrink-0 md:w-72 space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-black font-black text-xs shrink-0 w-6">
                            {String(step.line).padStart(2, "0")}
                          </span>
                          <code className="font-mono font-bold text-black text-xs bg-stone-100 border border-black px-2 py-1 rounded block truncate max-w-full shadow-[1px_1px_0px_#000]">
                            {step.code}
                          </code>
                        </div>
                      </div>

                      {/* Explanation & Memory Note */}
                      <div className="flex-1 space-y-1 md:pl-2">
                        <p className="text-black leading-relaxed font-medium">
                          {step.explanation}
                        </p>
                        {step.memoryState && (
                          <p className="text-[11px] font-mono text-stone-600 leading-normal font-bold">
                            ↳ <span>{step.memoryState}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aturan Emas / Golden Rules */}
              <div className="p-4 rounded-xl bg-yellow-100 border-2 border-black shadow-[3px_3px_0px_#000000] text-xs text-black space-y-2">
                <div className="flex items-center space-x-2 font-black text-black">
                  <Sparkles className="w-4 h-4 text-black stroke-[2.5]" />
                  <span>Aturan Emas Pemrograman Python:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-black leading-relaxed font-sans font-medium">
                  {activeSubMaterial.keyRules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 6. Kartu Latihan Praktik Mandiri */}
            <div className="bg-white border-2.5 border-black rounded-2xl p-6 sm:p-7 shadow-[5px_5px_0px_#000000] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black pb-3">
                <div>
                  <h3 className="text-base font-black text-black">
                    Latihan Praktik Mandiri (Sub {currentSubStep})
                  </h3>
                  <p className="text-xs text-stone-600 font-sans font-medium">
                    Ketik dan jalankan kodemu untuk menguji pemahaman konsep secara langsung.
                  </p>
                </div>

                <button
                  onClick={() => handleCopyTutorCode(activeSubMaterial.trialStarter)}
                  className="border-2 border-black bg-yellow-200 hover:bg-yellow-300 px-3 py-1.5 rounded-lg text-black text-xs font-bold transition-all shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer self-start sm:self-auto"
                >
                  Muat Kerangka Latihan
                </button>
              </div>

              {/* Petunjuk Soal Praktik */}
              <div className="p-4 rounded-xl bg-amber-100 border-2 border-black shadow-[3px_3px_0px_#000000] text-xs text-black space-y-1">
                <span className="font-black text-black block">Tugas Latihan:</span>
                <p className="leading-relaxed font-sans text-black font-medium">{activeSubMaterial.trialInstruction}</p>
              </div>

              {/* Integrated Code Editor & Controls */}
              <div className="rounded-xl border-2 border-black overflow-hidden shadow-[3px_3px_0px_#000000]">
                {/* Editor Header Bar */}
                <div className="px-4 py-2.5 bg-yellow-100 border-b-2 border-black flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 font-mono text-black font-bold">
                    <span>uji_praktik_sub_{currentSubStep}.py</span>
                    <span>&bull;</span>
                    <span className="text-[11px] text-stone-600 font-sans">Python 3.11</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCopyTutorCode(activeSubMaterial.trialStarter)}
                      className="border-2 border-black bg-white hover:bg-yellow-200 text-black transition flex items-center space-x-1 text-xs cursor-pointer px-2.5 py-1 rounded-lg font-bold shadow-[1.5px_1.5px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
                      title="Reset kode latihan"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>

                    <button
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className="px-4 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-black text-xs font-black transition flex items-center space-x-1.5 shadow-[2px_2px_0px_#000] cursor-pointer disabled:opacity-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                    >
                      <Play className="w-3 h-3 fill-current text-black" />
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
                <div className="border-t-2 border-black bg-stone-100 p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-black font-bold">
                    <div className="flex items-center space-x-2">
                      <Terminal className="w-4 h-4 text-black stroke-[2.5]" />
                      <span className="text-black font-black">Hasil Eksekusi Program:</span>
                    </div>

                    {lastResult && (
                      <span
                        className={`font-black text-xs px-2 py-0.5 rounded border-2 border-black shadow-[1.5px_1.5px_0px_#000] ${
                          lastResult.isSuccess
                            ? "bg-emerald-300 text-black"
                            : "bg-rose-300 text-black"
                        }`}
                      >
                        {lastResult.isSuccess ? "Berhasil Berjalan" : "Error Logika"}
                      </span>
                    )}
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border-2 border-black font-mono text-xs text-black min-h-[70px] max-h-[180px] overflow-y-auto shadow-[2px_2px_0px_#000]">
                    {lastResult ? (
                      <pre className="whitespace-pre-wrap leading-relaxed font-bold">
                        {lastResult.stdout || lastResult.stderr || "(Program selesai tanpa teks luaran)"}
                      </pre>
                    ) : (
                      <p className="text-stone-500 font-sans text-xs italic">
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
                  className="px-4 py-2.5 rounded-xl border-2 border-black bg-white hover:bg-yellow-100 text-black text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
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
                  className="px-5 py-2.5 rounded-xl bg-black hover:bg-stone-800 text-yellow-300 text-xs font-black transition-all cursor-pointer flex items-center space-x-2 border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-[2px] active:translate-y-[2px]"
                >
                  <span>Lanjut ke Sub-Materi {currentSubStep + 1}</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab(3)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-black transition-all cursor-pointer flex items-center space-x-2 border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-[2px] active:translate-y-[2px]"
                >
                  <span>Selesai Belajar &rarr; Lanjut ke Kuis Logika</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: KUIS LOGIKA INTERAKTIF (NEO-BRUTALIST QUIZ)       */}
        {/* ======================================================== */}
        {activeTab === 3 && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            {/* Top Score & Progress Header */}
            <div className="bg-white border-2.5 border-black rounded-2xl p-5 sm:p-6 shadow-[5px_5px_0px_#000000] flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-black text-black uppercase tracking-wider block bg-yellow-300 border-2 border-black px-2 py-0.5 rounded w-fit shadow-[2px_2px_0px_#000]">
                  Evaluasi Nalar Koding
                </span>
                <h1 className="text-xl font-black text-black tracking-tight mt-1">
                  Kuis Logika Python (10 Soal Menengah)
                </h1>
                <p className="text-xs text-stone-600 font-sans font-medium mt-0.5">
                  Setiap pilihan jawabanmu langsung tersinkron dan dinilai oleh sistem secara realtime.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right bg-stone-100 border-2 border-black px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#000]">
                  <span className="text-[10px] text-stone-600 uppercase block font-bold">
                    Progres Terjawab
                  </span>
                  <span className="text-sm font-black text-black">
                    {answeredCount} / {totalQuestions} Soal
                  </span>
                </div>

                <div className="text-right bg-emerald-200 border-2 border-black px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#000]">
                  <span className="text-[10px] text-black uppercase block font-bold">
                    Skor Logika
                  </span>
                  <span className="text-sm font-black text-black">
                    {Math.round((quizCorrectCount / totalQuestions) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* 10 Number Stepper Buttons */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 p-3 bg-white border-2 border-black rounded-2xl shadow-[3px_3px_0px_#000000]">
              {LIVE_QUIZ_QUESTIONS.map((q, idx) => {
                const isCurrent = currentQuizIndex === idx;
                const isAnswered = userAnswers[q.id] !== undefined;
                const isCorrect = userAnswers[q.id] === q.correctAnswerIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuizIndex(idx)}
                    className={`h-10 rounded-xl text-xs font-black transition-all flex items-center justify-center cursor-pointer border-2 ${
                      isCurrent
                        ? "bg-black text-yellow-300 border-black shadow-[2px_2px_0px_#000]"
                        : isAnswered
                        ? isCorrect
                          ? "bg-emerald-300 text-black border-black shadow-[2px_2px_0px_#000]"
                          : "bg-rose-300 text-black border-black shadow-[2px_2px_0px_#000]"
                        : "bg-white text-black border-black hover:bg-yellow-100 shadow-[1.5px_1.5px_0px_#000]"
                    }`}
                  >
                    <span>{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Interactive Question Card */}
            <div className="bg-white border-2.5 border-black rounded-2xl p-6 sm:p-7 shadow-[5px_5px_0px_#000000] space-y-5">
              <div className="flex items-center justify-between text-xs border-b-2 border-black pb-3">
                <span className="font-black text-black text-sm">
                  Soal Nomor {activeQuiz.id} dari {totalQuestions}
                </span>

                {userAnswers[activeQuiz.id] !== undefined && (
                  <span
                    className={`text-xs font-black px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] ${
                      userAnswers[activeQuiz.id] === activeQuiz.correctAnswerIndex
                        ? "bg-emerald-300 text-black"
                        : "bg-rose-300 text-black"
                    }`}
                  >
                    {userAnswers[activeQuiz.id] === activeQuiz.correctAnswerIndex
                      ? "Jawaban Tepat (+10 Poin)"
                      : "Jawaban Kurang Tepat"}
                  </span>
                )}
              </div>

              <p className="text-sm font-bold text-black leading-relaxed font-sans">
                {activeQuiz.question}
              </p>

              {/* Code Snippet */}
              {activeQuiz.codeSnippet && (
                <div className="p-4 rounded-xl bg-black text-green-400 font-mono text-xs overflow-x-auto leading-relaxed border-2 border-black shadow-[3px_3px_0px_#000000]">
                  <pre>{activeQuiz.codeSnippet}</pre>
                </div>
              )}

              {/* 4 Answer Options */}
              <div className="space-y-3 pt-1">
                {activeQuiz.options.map((opt, oIdx) => {
                  const isSelected = userAnswers[activeQuiz.id] === oIdx;
                  const isAnswered = userAnswers[activeQuiz.id] !== undefined;
                  const isCorrectAnswer = activeQuiz.correctAnswerIndex === oIdx;

                  let optionStyle =
                    "bg-white border-2 border-black text-black hover:bg-yellow-100 hover:translate-x-[-1px] hover:translate-y-[-1px] shadow-[3px_3px_0px_#000]";

                  if (isAnswered) {
                    if (isSelected && isCorrectAnswer) {
                      optionStyle = "bg-emerald-300 border-2 border-black text-black font-black shadow-[3px_3px_0px_#000]";
                    } else if (isSelected && !isCorrectAnswer) {
                      optionStyle = "bg-rose-300 border-2 border-black text-black font-black shadow-[3px_3px_0px_#000]";
                    } else if (isCorrectAnswer) {
                      optionStyle = "bg-emerald-100 border-2 border-black text-black font-bold shadow-[2px_2px_0px_#000]";
                    } else {
                      optionStyle = "bg-stone-100 border-2 border-stone-400 text-stone-500 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectQuizAnswer(activeQuiz.id, oIdx)}
                      className={`w-full p-4 rounded-xl text-left text-xs transition-all flex items-center justify-between cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${optionStyle}`}
                    >
                      <span className="flex items-center space-x-3">
                        <span className="w-7 h-7 rounded-lg bg-yellow-200 border-2 border-black text-black flex items-center justify-center text-xs font-black shadow-[1px_1px_0px_#000]">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="font-mono text-xs font-bold">{opt}</span>
                      </span>

                      {isAnswered && isSelected && (
                        isCorrectAnswer ? (
                          <Check className="w-5 h-5 text-black stroke-[3]" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-black stroke-[3]" />
                        )
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Solusi & Pembahasan jika sudah dijawab */}
              {userAnswers[activeQuiz.id] !== undefined && (
                <div className="p-4 rounded-xl bg-yellow-100 border-2 border-black shadow-[3px_3px_0px_#000000] text-xs text-black leading-relaxed space-y-1 animate-fadeIn font-sans">
                  <span className="font-black text-black block text-xs">
                    Pembahasan Logika:
                  </span>
                  <p className="font-medium text-stone-800">{activeQuiz.explanation}</p>
                </div>
              )}

              {/* Prev / Next Buttons */}
              <div className="flex items-center justify-between pt-3 border-t-2 border-black">
                <button
                  disabled={currentQuizIndex === 0}
                  onClick={() => setCurrentQuizIndex(currentQuizIndex - 1)}
                  className="px-4 py-2.5 rounded-xl border-2 border-black bg-white hover:bg-yellow-100 text-black text-xs font-bold transition-all disabled:opacity-30 cursor-pointer flex items-center space-x-1.5 shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                  <span>Soal Sebelumnya</span>
                </button>

                {currentQuizIndex < totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentQuizIndex(currentQuizIndex + 1)}
                    className="px-5 py-2.5 rounded-xl bg-black hover:bg-stone-800 text-yellow-300 text-xs font-black transition-all cursor-pointer flex items-center space-x-1.5 border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-[2px] active:translate-y-[2px]"
                  >
                    <span>Soal Selanjutnya</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab(4)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-black transition-all cursor-pointer flex items-center space-x-1.5 border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-[2px] active:translate-y-[2px]"
                  >
                    <span>Lanjut ke Tab Refleksi</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: REFLEKSI & PENUNTASAN (NEO-BRUTALIST SUMMARY)     */}
        {/* ======================================================== */}
        {activeTab === 4 && (
          <div className="max-w-2xl mx-auto bg-white border-2.5 border-black rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_#000000] space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="w-14 h-14 rounded-2xl bg-yellow-300 text-black border-2 border-black flex items-center justify-center mx-auto mb-2 shadow-[3px_3px_0px_#000]">
                <Award className="w-7 h-7 stroke-[2.5]" />
              </span>
              <span className="text-[11px] font-black text-black uppercase tracking-wider block bg-emerald-300 border-2 border-black px-3 py-0.5 rounded-full w-fit mx-auto shadow-[1.5px_1.5px_0px_#000]">
                Sesi Tatap Muka Tuntas
              </span>
              <h1 className="text-2xl font-black text-black tracking-tight">
                Refleksi Pembelajaran Hari Ini
              </h1>
              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed font-medium">
                Kerja yang luar biasa, Andi! Kamu telah menuntaskan seluruh tantangan, pembelajaran bertahap, dan kuis logika hari ini bersama mentor.
              </p>
            </div>

            {/* Pencapaian Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-yellow-100 border-2 border-black text-center space-y-1 shadow-[3px_3px_0px_#000]">
                <span className="text-[10px] text-stone-700 font-bold block uppercase">
                  Hasil Kuis Logika
                </span>
                <span className="text-2xl font-black text-black block">
                  {quizCorrectCount} / {totalQuestions}
                </span>
                <span className="text-xs text-black font-bold">
                  Akurasi {Math.round((quizCorrectCount / totalQuestions) * 100)}%
                </span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-200 border-2 border-black text-center space-y-1 shadow-[3px_3px_0px_#000]">
                <span className="text-[10px] text-black font-bold block uppercase">
                  Penghargaan XP
                </span>
                <span className="text-2xl font-black text-black block">
                  +50 XP
                </span>
                <span className="text-xs text-black font-bold">
                  Sesi Tatap Muka
                </span>
              </div>
            </div>

            {/* Catatan Apresiasi Mentor */}
            <div className="p-4 rounded-xl bg-amber-100 border-2 border-black shadow-[3px_3px_0px_#000] space-y-2">
              <div className="flex items-center space-x-2 text-xs font-black text-black">
                <Sparkles className="w-4 h-4 text-black stroke-[2.5]" />
                <span>Ulasan dari Mas Andri (Lead Tutor):</span>
              </div>
              <p className="text-xs text-black leading-relaxed font-sans font-medium">
                &ldquo;Kemampuanmu membedakan antara fungsi berparameter dan return value sudah sangat baik. Terus asah insting kodingmu melalui latihan mandiri di dashboard!&rdquo;
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={handleCompleteSession}
                className="w-full py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-black transition-all flex items-center justify-center space-x-2 border-2.5 border-black shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
              >
                <Check className="w-5 h-5 stroke-[3]" />
                <span>Selesaikan Sesi &amp; Kembali ke Dashboard</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
