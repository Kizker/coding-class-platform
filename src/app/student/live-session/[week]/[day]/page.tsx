"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { CURRICULUM_DATA, LiveSessionItem } from "@/data/curriculum";
import { useSession } from "@/lib/auth/sessionContext";
import { usePyodide, ExecutionResult } from "@/lib/pyodide/usePyodide";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { LIVE_QUIZ_QUESTIONS, QuizQuestion } from "@/data/liveQuizQuestions";
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
  CheckCircle2,
  AlertCircle,
  BookOpen,
  FileQuestion,
  Award,
  Compass,
  ArrowRight,
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

  // Step 2 Sub-materials (3 Pembelajaran Interaktif + Uji Coba Koding)
  const subMaterials = [
    {
      sub: 1,
      title: "Sub-Materi 1: Fondasi Sintaks 'def' & Parameter",
      concept:
        "Fungsi adalah blok kode mandiri yang dapat digunakan berulang kali. Parameter adalah variabel penampung data masukan yang dikirimkan saat fungsi dipanggil.",
      demoCode: `# Sub-Materi 1: Kode Peraga Mentor
def sapa_siswa(nama, pekan):
    return f"Halo {nama}, selamat belajar di Pekan {pekan}!"

pesan = sapa_siswa("Andi", ${weekNum})
print(pesan)`,
      trialInstruction:
        "Uji Coba Mandiri: Ubah fungsi di atas atau buat fungsi baru 'hitung_keliling(sisi)' yang mengembalikan keliling persegi (4 * sisi). Jalankan kodenya untuk melihat hasilnya.",
      trialStarter: `# Uji Coba Mandiri Sub 1:
def hitung_keliling(sisi):
    return 4 * sisi

print("Keliling persegi (sisi 7):", hitung_keliling(7))`,
    },
    {
      sub: 2,
      title: "Sub-Materi 2: Perbedaan Mendasar 'return' vs 'print()'",
      concept:
        "'print()' hanya menampilkan teks ke terminal tanpa menyimpan nilainya. Sebaliknya, 'return' mengembalikan data ke pemanggil fungsi agar bisa diolah dalam perhitungan berikutnya.",
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
        "Uji Coba Mandiri: Buat fungsi 'cek_kelulusan(nilai)' yang mengembalikan string 'LULUS' jika nilai >= 75 dan 'REMIDI' jika nilai < 75. Simpan hasilnya ke variabel lalu cetak.",
      trialStarter: `# Uji Coba Mandiri Sub 2:
def cek_kelulusan(nilai):
    if nilai >= 75:
        return "LULUS"
    return "REMIDI"

status = cek_kelulusan(85)
print("Status Andi:", status)`,
    },
    {
      sub: 3,
      title: "Sub-Materi 3: Scope Variabel & Eksplorasi Kasus Kombinasi",
      concept:
        "Variabel yang didefinisikan di dalam fungsi bersifat LOKAL dan tidak dapat diakses dari luar. Modul Python seperti 'random' atau logika perulangan dapat digabungkan di dalam fungsi.",
      demoCode: `# Sub-Materi 3: Kode Peraga Mentor
import random

pilihan = ["Batu", "Gunting", "Kertas"]

def bot_pilih():
    return random.choice(pilihan)

komputer = bot_pilih()
print("Langkah Komputer:", komputer)`,
      trialInstruction:
        "Uji Coba Mandiri: Rangkai fungsi 'tentukan_pemenang(pemain, komputer)' yang membandingkan pilihan pemain dengan bot dan mengembalikan hasil 'Menang', 'Kalah', atau 'Seri'.",
      trialStarter: `# Uji Coba Mandiri Sub 3:
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

  // Active step directed by tutor (1: Tantangan Awal, 2: Materi Interaktif, 3: Kuis 10 Soal, 4: Refleksi)
  const currentStep = liveSync.currentStep || 1;
  const currentSubStep = liveSync.subStep || 1;
  const activeSubMaterial = subMaterials[currentSubStep - 1] || subMaterials[0];

  // Student editor code state
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

  // Quiz state (Step 3: 10 Soal)
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Sync editor changes with live tutor monitoring context & server state
  const handleEditorChange = (newCode: string) => {
    setEditorCode(newCode);
    updateStudentLiveCode(newCode);
  };

  // Realtime notification when tutor pushes new guidance code
  useEffect(() => {
    if (pushedCode) {
      setPushedAlert("Mentor baru saja mengirimkan kode peraga ke editormu.");
      setEditorCode(pushedCode);
      updateStudentLiveCode(pushedCode);
      const timer = setTimeout(() => setPushedAlert(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [pushedCode, updateStudentLiveCode]);

  // Run student code locally in Pyodide & sync output with tutor's live inspector
  const handleRunCode = async () => {
    const result = await runCode(editorCode);
    setLastResult(result);

    // Sync output to tutor inspector
    const outputString =
      result.stdout || result.stderr || (result.isSuccess ? "Program selesai tanpa luaran teks" : "Terjadi error");
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

  // Handle quiz question answer selection
  const handleSelectQuizAnswer = async (questionId: number, optionIndex: number) => {
    if (quizSubmitted) return;

    const updatedAnswers = { ...userAnswers, [questionId]: optionIndex };
    setUserAnswers(updatedAnswers);

    // Evaluate correct status
    const currentQ = LIVE_QUIZ_QUESTIONS.find((q) => q.id === questionId);
    const isCorrect = currentQ ? currentQ.correctAnswerIndex === optionIndex : false;

    const existingScores = liveSync.quizScores || {};
    const updatedScores = { ...existingScores, [questionId]: isCorrect };

    const totalAnswered = Object.keys(updatedAnswers).length;
    const correctCount = Object.values(updatedScores).filter(Boolean).length;

    await updateLiveSync({
      quizScores: updatedScores,
      quizTotalAnswered: totalAnswered,
      quizCorrectCount: correctCount,
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

          {/* Right: Presence & Status */}
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

      {/* Step Stepper Header (Driven by Mentor) */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-white border border-stone-200/80 rounded-2xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-stone-900 text-white flex items-center justify-center text-xs font-bold">
              {currentStep}
            </div>
            <div>
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                Tahap Sesi Tatap Muka (Diarahkan Mentor)
              </span>
              <span className="text-sm font-bold text-stone-900">
                {currentStep === 1 && "Tahap 1: Tantangan Uji Coba Awal"}
                {currentStep === 2 && `Tahap 2: Pembelajaran Interaktif (${activeSubMaterial.title})`}
                {currentStep === 3 && "Tahap 3: Kuis Pemahaman Logika (10 Soal)"}
                {currentStep === 4 && "Tahap 4: Refleksi & Penuntasan Sesi"}
              </span>
            </div>
          </div>

          {/* Connected Step Dots */}
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4].map((step) => {
              const isActive = currentStep === step;
              const isPassed = currentStep > step;

              return (
                <div
                  key={step}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium transition ${
                    isActive
                      ? "bg-stone-900 text-white shadow-2xs"
                      : isPassed
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-stone-100 text-stone-400"
                  }`}
                >
                  {isPassed ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <span>{step}</span>
                  )}
                  <span className="hidden md:inline">
                    {step === 1 && "Tantangan"}
                    {step === 2 && "Materi & Uji Coba"}
                    {step === 3 && "Kuis 10 Soal"}
                    {step === 4 && "Refleksi"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN 2-COLUMN WORKSPACE                               */}
      {/* ======================================================== */}
      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ======================================================== */}
        {/* LEFT COLUMN (5/12): KONTEN TAHAP BERJALAN                */}
        {/* ======================================================== */}
        <section className="lg:col-span-5 bg-white border border-stone-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
          {/* TAHAP 1: TANTANGAN UJI COBA AWAL */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
                  Uji Coba Awal &bull; Diagnostik Pemahaman
                </span>
                <h1 className="text-xl font-bold text-stone-900 tracking-tight leading-snug">
                  Tantangan Koding Mandiri Awal
                </h1>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Sebelum kita membedah konsep inti hari ini, coba selesaikan tantangan logika singkat berikut di editor sebelah kanan. Mentor akan melihat caramu berpikir dan merancang alur program secara langsung.
                </p>
              </div>

              {/* Box Instruksi Tantangan */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 space-y-2.5">
                <span className="text-xs font-bold text-stone-900 block flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-stone-600" />
                  <span>Instruksi Soal:</span>
                </span>
                <p className="text-xs text-stone-700 leading-relaxed font-sans">
                  {sessionItem.practiceChallenge ||
                    "Buatlah sebuah program Python sederhana yang menampung panjang dan lebar persegi panjang, lalu hitung dan cetak luas serta kelilingnya ke terminal."}
                </p>
              </div>

              {/* Target Keluaran */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                  Target Keluaran Terminal yang Diharapkan:
                </span>
                <div className="p-3.5 rounded-xl bg-stone-900 text-stone-100 font-mono text-xs leading-relaxed border border-stone-800">
                  <pre>{sessionItem.expectedOutputDesc || "Luas: 50\nKeliling: 30"}</pre>
                </div>
              </div>

              {/* Status Menunggu Mentor */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 space-y-1">
                <div className="flex items-center space-x-2 font-semibold text-amber-950">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Petunjuk Mentor:</span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  Ketik kodemu di editor kanan lalu tekan tombol &ldquo;Jalankan Kode&rdquo;. Mentor akan memantau ketikanmu secara live dan mengarahkan ke tahap pembelajaran materi berikutnya jika kamu sudah siap.
                </p>
              </div>
            </div>
          )}

          {/* TAHAP 2: PEMBELAJARAN INTERAKTIF & UJI COBA */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fadeIn">
              {/* Sub-Material Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wider">
                    Materi Interaktif &bull; Sub {currentSubStep} dari 3
                  </span>
                  <span className="text-[11px] text-stone-400 font-medium">
                    Sinkron Layar Mentor
                  </span>
                </div>
                <h1 className="text-xl font-bold text-stone-900 tracking-tight leading-snug">
                  {activeSubMaterial.title}
                </h1>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {activeSubMaterial.concept}
                </p>
              </div>

              {/* Sub-Material Tabs (Siswa bisa melihat 3 sub-materi) */}
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
                    Contoh Kode Peraga Mentor
                  </span>
                  <button
                    onClick={() => handleCopyTutorCode(activeSubMaterial.demoCode)}
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
                  <pre>{activeSubMaterial.demoCode}</pre>
                </div>
              </div>

              {/* Uji Coba Interaktif Mandiri di Sub-Materi ini */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Latihan Uji Coba Mandiri:</span>
                  </span>
                  <button
                    onClick={() => handleCopyTutorCode(activeSubMaterial.trialStarter)}
                    className="text-[11px] text-emerald-800 hover:text-emerald-950 underline font-medium cursor-pointer"
                  >
                    Gunakan Kerangka Uji Coba
                  </button>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {activeSubMaterial.trialInstruction}
                </p>
              </div>
            </div>
          )}

          {/* TAHAP 3: KUIS PEMAHAMAN LOGIKA (10 SOAL) */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
                    Evaluasi Logika &bull; 10 Soal Menengah
                  </span>
                  <span className="font-semibold text-stone-700">
                    Terjawab: {answeredCount} / {totalQuestions}
                  </span>
                </div>
                <h1 className="text-xl font-bold text-stone-900 tracking-tight leading-snug">
                  Kuis Uji Logika Interaktif
                </h1>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Pilih jawaban yang paling tepat. Jawabanmu otomatis terekam dan terlihat di layar monitor mentor secara realtime.
                </p>
              </div>

              {/* 10 Grid Question Navigation */}
              <div className="grid grid-cols-10 gap-1.5 p-2 bg-stone-50 rounded-xl border border-stone-200/70">
                {LIVE_QUIZ_QUESTIONS.map((q, idx) => {
                  const isCurrent = currentQuizIndex === idx;
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isCorrect = userAnswers[q.id] === q.correctAnswerIndex;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuizIndex(idx)}
                      className={`h-7 rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                        isCurrent
                          ? "bg-stone-900 text-white ring-2 ring-stone-900/20"
                          : isAnswered
                          ? isCorrect
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-rose-100 text-rose-800 border border-rose-300"
                          : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-100"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Active Quiz Card */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-900">
                    Pertanyaan Nomor {activeQuiz.id}
                  </span>
                  {userAnswers[activeQuiz.id] !== undefined && (
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        userAnswers[activeQuiz.id] === activeQuiz.correctAnswerIndex
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-rose-50 text-rose-800 border border-rose-200"
                      }`}
                    >
                      {userAnswers[activeQuiz.id] === activeQuiz.correctAnswerIndex
                        ? "Jawaban Tepat"
                        : "Kurang Tepat"}
                    </span>
                  )}
                </div>

                <p className="text-xs font-medium text-stone-800 leading-relaxed">
                  {activeQuiz.question}
                </p>

                {/* Code Snippet if present */}
                {activeQuiz.codeSnippet && (
                  <div className="p-3.5 rounded-xl bg-stone-900 text-stone-100 font-mono text-xs overflow-x-auto leading-relaxed border border-stone-800">
                    <pre>{activeQuiz.codeSnippet}</pre>
                  </div>
                )}

                {/* 4 Answer Options */}
                <div className="space-y-2 pt-1">
                  {activeQuiz.options.map((opt, oIdx) => {
                    const isSelected = userAnswers[activeQuiz.id] === oIdx;
                    const isAnswered = userAnswers[activeQuiz.id] !== undefined;
                    const isCorrectAnswer = activeQuiz.correctAnswerIndex === oIdx;

                    let optionStyle =
                      "bg-white border-stone-200 text-stone-800 hover:bg-stone-50 hover:border-stone-300";

                    if (isAnswered) {
                      if (isSelected && isCorrectAnswer) {
                        optionStyle = "bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold";
                      } else if (isSelected && !isCorrectAnswer) {
                        optionStyle = "bg-rose-50 border-rose-400 text-rose-950 font-semibold";
                      } else if (isCorrectAnswer) {
                        optionStyle = "bg-emerald-50/50 border-emerald-300 text-emerald-900";
                      } else {
                        optionStyle = "bg-stone-50 border-stone-200 text-stone-400 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectQuizAnswer(activeQuiz.id, oIdx)}
                        className={`w-full p-3 rounded-xl border text-left text-xs transition flex items-center justify-between cursor-pointer ${optionStyle}`}
                      >
                        <span className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-md bg-stone-100 text-stone-700 flex items-center justify-center text-[10px] font-bold">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{opt}</span>
                        </span>
                        {isAnswered && isSelected && (
                          isCorrectAnswer ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                          )
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box when answered */}
                {userAnswers[activeQuiz.id] !== undefined && (
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-700 leading-relaxed space-y-1 animate-fadeIn">
                    <span className="font-semibold text-stone-900 block text-[11px]">
                      Pembahasan Solusi:
                    </span>
                    <p>{activeQuiz.explanation}</p>
                  </div>
                )}

                {/* Prev / Next Question Footer */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    disabled={currentQuizIndex === 0}
                    onClick={() => setCurrentQuizIndex(currentQuizIndex - 1)}
                    className="px-3 py-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-stone-900 text-xs font-medium transition disabled:opacity-30 cursor-pointer flex items-center space-x-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Sebelumnya</span>
                  </button>
                  <button
                    disabled={currentQuizIndex === totalQuestions - 1}
                    onClick={() => setCurrentQuizIndex(currentQuizIndex + 1)}
                    className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition disabled:opacity-30 cursor-pointer flex items-center space-x-1"
                  >
                    <span>Selanjutnya</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAHAP 4: REFLEKSI & PENUNTASAN */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
                  Sesi Tuntas &bull; Hasil Pembelajaran
                </span>
                <h1 className="text-xl font-bold text-stone-900 tracking-tight leading-snug">
                  Refleksi Sesi Tatap Muka
                </h1>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Selamat Andi! Kamu telah berhasil menempuh seluruh tahapan tatap muka interaktif bersama mentor hari ini dengan penuh dedikasi.
                </p>
              </div>

              {/* Ringkasan Skor Kuis & Pencapaian */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 text-center space-y-1">
                  <span className="text-[10px] text-stone-500 font-semibold block uppercase">
                    Hasil Kuis Logika
                  </span>
                  <span className="text-xl font-bold text-stone-900 block">
                    {quizCorrectCount} / {totalQuestions}
                  </span>
                  <span className="text-[11px] text-stone-500">
                    Tingkat Akurasi {Math.round((quizCorrectCount / totalQuestions) * 100)}%
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 text-center space-y-1">
                  <span className="text-[10px] text-amber-800 font-semibold block uppercase">
                    Penghargaan XP
                  </span>
                  <span className="text-xl font-bold text-amber-900 block">
                    +50 XP
                  </span>
                  <span className="text-[11px] text-amber-700">
                    Bonus Tatap Muka
                  </span>
                </div>
              </div>

              {/* Catatan Apresiasi Mentor */}
              <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-stone-900">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Catatan Mentoring Mas Andri:</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  &ldquo;Pemahaman konsep logikamu semakin matang dan rapi. Tetap pertahankan konsistensi latihan harian di dashboard untuk memperdalam insting kodingmu.&rdquo;
                </p>
              </div>

              {/* Action Button: Selesaikan */}
              <div className="pt-2">
                <button
                  onClick={handleCompleteSession}
                  className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition flex items-center justify-center space-x-2 shadow-2xs cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Selesaikan Sesi &amp; Abadikan di Profil</span>
                </button>
              </div>
            </div>
          )}

          {/* Shared Ergonomic Action Footer */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3 text-xs">
            <button
              onClick={() => setHelpRequested(!helpRequested)}
              className={`px-3.5 py-2 rounded-xl font-medium transition flex items-center space-x-1.5 cursor-pointer ${
                helpRequested
                  ? "bg-amber-50 text-amber-900 border border-amber-300"
                  : "bg-white hover:bg-stone-50 text-stone-600 hover:text-stone-900 border border-stone-200"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-stone-400" />
              <span>{helpRequested ? "Sinyal Bantuan Terkirim" : "Tanya Mentor"}</span>
            </button>

            <span className="text-[11px] text-stone-400 font-medium">
              Layar disinkronkan otomatis
            </span>
          </div>
        </section>

        {/* ======================================================== */}
        {/* RIGHT COLUMN (7/12): INTEGRATED CODE STUDIO & OUTPUT     */}
        {/* ======================================================== */}
        <section className="lg:col-span-7 bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col">
          {/* Clean Unified Editor Header */}
          <div className="px-5 py-3 border-b border-stone-100 flex items-center justify-between text-xs">
            {/* Left Tab & Live Sync Indicator */}
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-stone-900 font-mono">
                workspace.py
              </span>
              <span className="text-stone-300">&bull;</span>
              <div className="flex items-center space-x-1.5 text-stone-500 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
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
          <div className="min-h-[360px]">
            <CodeEditor
              value={editorCode}
              onChange={handleEditorChange}
              height="360px"
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
                  Tekan tombol &ldquo;Jalankan Kode&rdquo; untuk menguji coba kodemu. Hasilnya akan langsung tampak di sini dan termonitor di layar mentor.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
