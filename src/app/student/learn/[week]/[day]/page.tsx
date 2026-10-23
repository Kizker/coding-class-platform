"use client";

import React, { useState, use, useEffect } from "react";
import { CURRICULUM_DATA } from "@/data/curriculum";
import { usePyodide, ExecutionResult } from "@/lib/pyodide/usePyodide";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { ConsoleOutput } from "@/components/editor/ConsoleOutput";
import { useAutoSaveDraft } from "@/hooks/useAutoSaveDraft";
import { useSession } from "@/lib/auth/sessionContext";
import confetti from "canvas-confetti";
import {
  Play,
  Check,
  HelpCircle,
  BookOpen,
  ArrowRight,
  Terminal,
  Bell,
  CheckCircle2,
  Zap,
  Clock,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  AlertCircle,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default function StudentLearnPage({
  params,
}: {
  params: Promise<{ week: string; day: string }>;
}) {
  const resolvedParams = use(params);
  const weekNum = parseInt(resolvedParams.week, 10) || 1;
  const dayKey = (resolvedParams.day || "senin").toLowerCase();

  const { progress, updateProgress, pushedCode, setTaskCompleted, isTaskCompleted } =
    useSession();
  const { isRunning, runCode } = usePyodide();

  const weekData = CURRICULUM_DATA.find((w) => w.week === weekNum) || CURRICULUM_DATA[0];
  const assignment =
    weekData.assignments.find((a) => a.day === dayKey) ||
    weekData.assignments[0] || {
      id: `w${weekNum}-${dayKey}`,
      day: dayKey as any,
      type: "RECALL" as any,
      title: `Latihan Pekan ${weekNum}`,
      durationMinutes: 15,
      points: 20,
      theoryMarkdown: "Materi koding harian mandiri.",
      challengeInstructions: "Tuliskan kode Python sesuai petunjuk di bawah ini.",
      starterCode: "# Ketik kodemu di sini:\nprint('Semangat Belajar!')\n",
      hints: ["Gunakan fungsi print() untuk mencetak luaran."],
      testAssertions: "assert 'Semangat' in stdout",
      expectedOutput: "Semangat Belajar!",
    };

  const storageKey = `w${weekNum}_${dayKey}`;
  const { code, setCode, isSaved, lastSavedAt, resetToInitial } = useAutoSaveDraft(
    storageKey,
    assignment.starterCode
  );

  const [activeTab, setActiveTab] = useState<"challenge" | "theory" | "hints">("challenge");
  const [activeHintIndex, setActiveHintIndex] = useState<number>(0);
  const [lastResult, setLastResult] = useState<ExecutionResult | null>(null);
  const [isPassed, setIsPassed] = useState<boolean>(isTaskCompleted(weekNum, dayKey));
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [pushedAlert, setPushedAlert] = useState<string | null>(null);

  useEffect(() => {
    if (pushedCode) {
      setPushedAlert("Pengajar baru saja memperbarui kode peraga di editormu.");
      setCode(pushedCode);
      const timer = setTimeout(() => setPushedAlert(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [pushedCode, setCode]);

  const handleRunCode = async () => {
    const result = await runCode(code);
    setLastResult(result);
  };

  const handleSubmitTask = async () => {
    const result = await runCode(code, assignment.testAssertions);
    setLastResult(result);

    if (result.isSuccess) {
      setIsPassed(true);
      setShowConfirmation(true);
      updateProgress({
        xpPoints: progress.xpPoints + assignment.points,
        completedAssignments: progress.completedAssignments + 1,
      });
      setTaskCompleted(weekNum, dayKey, true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const dayLabelMap: Record<string, string> = {
    senin: "Senin",
    selasa: "Selasa",
    rabu: "Rabu",
    kamis: "Kamis",
    jumat: "Jumat",
    sabtu: "Sabtu",
    minggu: "Minggu",
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#FAFAF9] text-stone-900 flex flex-col font-sans antialiased">
      {/* ======================================================== */}
      {/* 1. QUIET HEADER (HUMAN-CENTRIC CONTEXT BAR)              */}
      {/* ======================================================== */}
      <header className="bg-white border-b border-stone-200/80 px-4 sm:px-6 lg:px-8 py-3 sticky top-14 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2.5">
            <Link
              href="/student/assignments"
              className="text-stone-500 hover:text-stone-900 transition flex items-center space-x-1.5 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Daftar Tugas</span>
            </Link>
            <span className="text-stone-300">/</span>
            <span className="text-stone-500 font-medium">Pekan {weekNum}</span>
            <span className="text-stone-300">/</span>
            <span className="font-semibold text-stone-900">
              {dayLabelMap[dayKey] || dayKey} &bull; {assignment.title}
            </span>
          </div>

          {/* Points & Duration Badges */}
          <div className="flex items-center space-x-3">
            <span className="text-stone-600 font-medium flex items-center space-x-1.5 bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-200/60">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>+{assignment.points} XP</span>
            </span>
            <span className="text-stone-600 font-medium flex items-center space-x-1.5 bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-200/60">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{assignment.durationMinutes} Menit</span>
            </span>
            {isPassed && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-semibold flex items-center space-x-1">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Selesai</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Tutor Pushed Code Subtle Toast */}
      {pushedAlert && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full">
          <div className="bg-stone-900 text-stone-100 px-4 py-3 rounded-xl text-xs flex items-center justify-between shadow-sm animate-fadeIn">
            <div className="flex items-center space-x-2.5">
              <Bell className="w-4 h-4 text-amber-400 shrink-0" />
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
      {/* 2. SPLIT WORKSPACE (5 : 7 GRID)                          */}
      {/* ======================================================== */}
      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANE (5/12): Panduan & Teori */}
        <section className="lg:col-span-5 bg-white border border-stone-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
          {/* Calm, Human-Centric Tab Navigation */}
          <div className="flex p-1 bg-stone-100 rounded-xl text-xs">
            <button
              onClick={() => setActiveTab("challenge")}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition cursor-pointer text-center ${
                activeTab === "challenge"
                  ? "bg-white text-stone-900 shadow-2xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Instruksi Tantangan
            </button>
            <button
              onClick={() => setActiveTab("theory")}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition cursor-pointer text-center ${
                activeTab === "theory"
                  ? "bg-white text-stone-900 shadow-2xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Ringkasan Teori
            </button>
            <button
              onClick={() => setActiveTab("hints")}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition cursor-pointer text-center ${
                activeTab === "hints"
                  ? "bg-white text-stone-900 shadow-2xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Petunjuk ({assignment.hints.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="space-y-4 pt-1">
            {activeTab === "challenge" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                      Latihan Mandiri 15 Menit
                    </span>
                    <span className="text-emerald-700 font-semibold">+{assignment.points} XP</span>
                  </div>
                  <h1 className="text-lg font-bold text-stone-900 tracking-tight leading-snug">
                    {assignment.title}
                  </h1>
                </div>

                {/* Challenge Box */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 space-y-2">
                  <span className="text-xs font-semibold text-stone-900 flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-stone-500" />
                    <span>Petunjuk Pengerjaan:</span>
                  </span>
                  <p className="text-xs text-stone-700 leading-relaxed font-sans">
                    {assignment.challengeInstructions}
                  </p>
                </div>

                {/* Target Output Terminal */}
                {assignment.expectedOutput && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                      Target Keluaran Terminal yang Diharapkan:
                    </span>
                    <div className="rounded-xl border border-stone-800 bg-stone-900 p-4 text-stone-100 font-mono text-xs overflow-x-auto shadow-inner">
                      <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed">
                        {assignment.expectedOutput}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "theory" && (
              <div className="space-y-3 animate-fadeIn">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 space-y-2">
                  <span className="text-xs font-semibold text-stone-900 flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5 text-stone-500" />
                    <span>Konsep &amp; Nalar Logika:</span>
                  </span>
                  <div className="text-xs text-stone-700 leading-relaxed font-sans whitespace-pre-wrap">
                    {assignment.theoryMarkdown}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "hints" && (
              <div className="space-y-3 animate-fadeIn">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                  Petunjuk Bertahap Nalar Koding:
                </span>
                <div className="space-y-2.5">
                  {assignment.hints.map((hint, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border transition-all ${
                        idx <= activeHintIndex
                          ? "bg-white border-stone-300 shadow-2xs text-stone-900"
                          : "bg-stone-50 border-stone-200/70 text-stone-400"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-medium mb-1">
                        <span className="font-semibold text-stone-900">Petunjuk #{idx + 1}</span>
                        {idx > activeHintIndex && (
                          <button
                            onClick={() => setActiveHintIndex(idx)}
                            className="text-stone-600 hover:text-stone-900 font-medium underline text-xs cursor-pointer"
                          >
                            Buka Petunjuk &rarr;
                          </button>
                        )}
                      </div>
                      {idx <= activeHintIndex ? (
                        <p className="text-xs text-stone-600 leading-relaxed">{hint}</p>
                      ) : (
                        <p className="text-xs italic text-stone-400">
                          Klik &ldquo;Buka Petunjuk&rdquo; jika kamu menemui jalan buntu.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Penyimpanan Draf Otomatis</span>
            </span>
            <span>Python 3.11</span>
          </div>
        </section>

        {/* RIGHT PANE (7/12): Editor & Terminal */}
        <section className="lg:col-span-7 bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col">
          {/* Action Header */}
          <div className="px-5 py-3 border-b border-stone-100 flex items-center justify-between text-xs flex-wrap gap-2">
            <div className="flex items-center space-x-2 font-mono text-stone-700 font-medium">
              <span>main.py</span>
              <span className="text-stone-300">&bull;</span>
              <span className="text-[11px] text-stone-400 font-sans">
                {isSaved ? "Tersimpan" : "Mengetik..."}
              </span>
            </div>

            <div className="flex items-center space-x-2.5">
              <button
                onClick={resetToInitial}
                title="Pulihkan kode awal"
                className="text-stone-400 hover:text-stone-700 transition flex items-center space-x-1 text-xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Pulihkan</span>
              </button>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current text-stone-600" />
                <span>{isRunning ? "Mengeksekusi..." : "Jalankan Kode"}</span>
              </button>

              <button
                onClick={handleSubmitTask}
                disabled={isRunning}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition flex items-center space-x-1.5 shadow-2xs cursor-pointer disabled:opacity-50"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Kumpulkan Tugas</span>
              </button>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="min-h-[360px]">
            <CodeEditor
              value={code}
              onChange={setCode}
              onReset={resetToInitial}
              isSaved={isSaved}
              lastSavedAt={lastSavedAt}
              height="360px"
              hideHeader={true}
              hideBorder={true}
            />
          </div>

          {/* Terminal Console Output */}
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
                      <span>Sesuai Ekspektasi</span>
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
                  {lastResult.stdout || lastResult.stderr || "(Program selesai tanpa keluaran)"}
                </pre>
              ) : (
                <p className="text-stone-400 font-sans text-xs italic">
                  Tekan tombol &ldquo;Jalankan Kode&rdquo; untuk melihat luaran programmu di sini.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-semibold flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Tugas Terverifikasi</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                100 / 100
              </span>
            </div>

            <h3 className="text-xl font-bold text-stone-900 tracking-tight">
              Latihan Berhasil Diselesaikan!
            </h3>

            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Kerja bagus! Kodemu telah berhasil lolos seluruh kriteria pengujian logika. Poin pengalaman dan catatan progresmu telah tersimpan.
            </p>

            <div className="grid grid-cols-2 gap-3 py-1 text-xs">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/70 text-center space-y-1">
                <span className="text-stone-500 text-[11px] block font-medium">Poin Hadiah</span>
                <span className="text-stone-900 font-bold text-lg">+{assignment.points} XP</span>
              </div>
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/60 text-center space-y-1">
                <span className="text-amber-800 text-[11px] block font-medium">Streak Belajar</span>
                <span className="text-amber-900 font-bold text-lg">{progress.streakDays} Hari</span>
              </div>
            </div>

            <div className="flex gap-2.5 pt-2 text-xs">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 font-medium transition cursor-pointer"
              >
                Tutup
              </button>
              <Link
                href="/student/assignments"
                className="flex-1 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold transition text-center shadow-2xs flex items-center justify-center space-x-1.5"
              >
                <span>Tugas Selanjutnya</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
