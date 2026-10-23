"use client";

import React, { useState, use, useEffect, Suspense } from "react";
import confetti from "canvas-confetti";
import { CURRICULUM_DATA } from "@/data/curriculum";
import { usePyodide, ExecutionResult } from "@/lib/pyodide/usePyodide";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { ConsoleOutput } from "@/components/editor/ConsoleOutput";
import { useAutoSaveDraft } from "@/hooks/useAutoSaveDraft";
import { useSession } from "@/lib/auth/sessionContext";
import {
  Play,
  CheckCircle,
  Lightbulb,
  BookOpen,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Flame,
  Award,
  Bell,
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

  const { progress, updateProgress, pushedCode } = useSession();
  const { isRunning, runCode } = usePyodide();

  // Find module data
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
      theoryMarkdown: "Materi koding harian.",
      challengeInstructions: "Tuliskan kode Python sesuai petunjuk di bawah ini.",
      starterCode: "# Ketik kodemu di sini:\nprint('Semangat Belajar!')\n",
      hints: ["Gunakan fungsi print()."],
      testAssertions: "assert 'Semangat' in stdout",
      expectedOutput: "Semangat Belajar!",
    };

  // Draft autosave
  const storageKey = `w${weekNum}_${dayKey}`;
  const { code, setCode, isSaved, lastSavedAt, resetToInitial } = useAutoSaveDraft(
    storageKey,
    assignment.starterCode
  );

  // Tabs in left pane: 'theory' | 'challenge' | 'hints'
  const [activeTab, setActiveTab] = useState<"theory" | "challenge" | "hints">("challenge");
  const [activeHintIndex, setActiveHintIndex] = useState<number>(0);

  // Execution states
  const [lastResult, setLastResult] = useState<ExecutionResult | null>(null);
  const [isPassed, setIsPassed] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [pushedAlert, setPushedAlert] = useState<string | null>(null);

  // Detect tutor pushed code
  useEffect(() => {
    if (pushedCode) {
      setPushedAlert("Kak Tutor mengirimkan kode peraga baru ke editormu!");
      setCode(pushedCode);
      const timer = setTimeout(() => setPushedAlert(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [pushedCode, setCode]);

  // Run Code
  const handleRunCode = async () => {
    const result = await runCode(code);
    setLastResult(result);
  };

  // Submit & Auto-Grade
  const handleSubmitTask = async () => {
    const result = await runCode(code, assignment.testAssertions);
    setLastResult(result);

    if (result.isSuccess) {
      setIsPassed(true);
      setShowCelebration(true);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#6366f1", "#10b981", "#f59e0b", "#ec4899"],
        });
      } catch (e) {
        console.warn("Confetti error:", e);
      }

      // Update student progress in context
      updateProgress({
        xpPoints: progress.xpPoints + assignment.points,
        completedAssignments: progress.completedAssignments + 1,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Lesson Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center space-x-3">
          <Link
            href="/student/assignments"
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center space-x-1"
          >
            <span>&larr; Daftar PR</span>
          </Link>
          <span className="text-slate-600">|</span>
          <div className="flex items-center space-x-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-700/60 text-indigo-300 font-semibold uppercase tracking-wider">
              Minggu {weekNum} &bull; {assignment.day.toUpperCase()}
            </span>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
              {assignment.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1 text-xs text-amber-300 bg-amber-950/40 border border-amber-800/40 px-2.5 py-1 rounded-full font-semibold">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>+{assignment.points} XP Reward</span>
          </span>

          <span className="flex items-center space-x-1 text-xs text-orange-300 bg-orange-950/40 border border-orange-800/40 px-2.5 py-1 rounded-full font-semibold">
            <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            <span>{progress.streakDays} Hari Streak</span>
          </span>
        </div>
      </div>

      {/* Tutor Pushed Code Banner Alert */}
      {pushedAlert && (
        <div className="bg-indigo-600 text-white px-4 py-2.5 text-xs sm:text-sm font-medium flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 animate-bounce" />
            <span>{pushedAlert}</span>
          </div>
          <button
            onClick={() => setPushedAlert(null)}
            className="text-indigo-200 hover:text-white text-xs underline cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Split Screen Container */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* ================= LEFT PANE: Materi & Panduan ================= */}
        <div className="lg:col-span-5 border-r border-slate-800/80 bg-slate-900/60 flex flex-col h-full overflow-y-auto">
          {/* Tabs bar */}
          <div className="flex border-b border-slate-800 bg-slate-900 px-4 pt-2 space-x-2 text-xs">
            <button
              onClick={() => setActiveTab("challenge")}
              className={`pb-2.5 px-3 font-semibold transition flex items-center space-x-1.5 border-b-2 ${
                activeTab === "challenge"
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Soal Tantangan</span>
            </button>
            <button
              onClick={() => setActiveTab("theory")}
              className={`pb-2.5 px-3 font-semibold transition flex items-center space-x-1.5 border-b-2 ${
                activeTab === "theory"
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ringkasan Teori</span>
            </button>
            <button
              onClick={() => setActiveTab("hints")}
              className={`pb-2.5 px-3 font-semibold transition flex items-center space-x-1.5 border-b-2 ${
                activeTab === "hints"
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Petunjuk ({assignment.hints.length})</span>
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-5 sm:p-6 space-y-4 flex-1">
            {activeTab === "challenge" && (
              <div className="space-y-4">
                <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-xl p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-indigo-300 font-semibold text-sm">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Instruksi Praktik:</span>
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {assignment.challengeInstructions}
                  </p>
                </div>

                {assignment.expectedOutput && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Target Hasil di Terminal:
                    </span>
                    <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 font-mono text-xs whitespace-pre-wrap">
                      {assignment.expectedOutput}
                    </pre>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab("hints")}
                    className="inline-flex items-center space-x-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 transition"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Merasa bingung? Buka petunjuk pengerjaan &rarr;</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === "theory" && (
              <div className="prose prose-invert prose-indigo max-w-none text-sm text-slate-300 leading-relaxed space-y-3">
                <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 whitespace-pre-wrap font-sans">
                  {assignment.theoryMarkdown}
                </div>
              </div>
            )}

            {activeTab === "hints" && (
              <div className="space-y-3">
                <div className="text-xs text-slate-400 font-medium">
                  Petunjuk dibuka bertahap agar nalarmu semakin terlatih:
                </div>
                {assignment.hints.map((hint, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border transition ${
                      idx <= activeHintIndex
                        ? "bg-amber-950/20 border-amber-800/40 text-amber-200"
                        : "bg-slate-900/50 border-slate-800 text-slate-600 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span>💡 Petunjuk {idx + 1}</span>
                      {idx > activeHintIndex && (
                        <button
                          onClick={() => setActiveHintIndex(idx)}
                          className="text-amber-400 hover:underline text-[11px]"
                        >
                          Buka Kunci
                        </button>
                      )}
                    </div>
                    {idx <= activeHintIndex ? (
                      <p className="text-xs leading-relaxed text-slate-300">{hint}</p>
                    ) : (
                      <p className="text-xs italic text-slate-500">Klik &quot;Buka Kunci&quot; jika kamu benar-benar membutuhkan bantuan ekstra.</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom encouragement footer */}
          <div className="p-4 bg-slate-950/80 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center space-x-1.5">
              <span>⏱️ Estimasi Waktu:</span>
              <strong className="text-slate-200 font-semibold">{assignment.durationMinutes} Menit</strong>
            </span>
            <span className="text-slate-500">Auto-save aktif</span>
          </div>
        </div>

        {/* ================= RIGHT PANE: Workspace Koding Siswa ================= */}
        <div className="lg:col-span-7 flex flex-col h-full p-4 sm:p-6 space-y-4 bg-slate-950 overflow-y-auto">
          {/* Action Bar */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-indigo-600/30 transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isRunning ? "Menjalankan..." : "Jalankan Kode"}</span>
              </button>

              <button
                onClick={handleSubmitTask}
                disabled={isRunning}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-emerald-600/30 transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Kumpulkan Tugas</span>
              </button>
            </div>

            {isPassed && (
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/80 text-emerald-300 text-xs font-semibold animate-pulse">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Tugas Lulus Terverifikasi! 🎉</span>
              </div>
            )}
          </div>

          {/* Monaco Code Editor */}
          <div className="flex-1 min-h-[360px]">
            <CodeEditor
              value={code}
              onChange={setCode}
              onReset={resetToInitial}
              isSaved={isSaved}
              lastSavedAt={lastSavedAt}
              height="380px"
            />
          </div>

          {/* Terminal Console Output */}
          <div className="min-h-[160px]">
            <ConsoleOutput
              stdout={lastResult?.stdout || ""}
              stderr={lastResult?.stderr || ""}
              isSuccess={lastResult?.isSuccess ?? null}
              friendlyError={lastResult?.friendlyError ?? null}
              isRunning={isRunning}
              executionTimeMs={lastResult?.executionTimeMs}
            />
          </div>
        </div>
      </div>

      {/* Celebration Modal when auto-grader passes */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-emerald-500/60 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-3xl">
              🎉
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Luar Biasa, Andi! Tugas Selesai!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Logika kodemu berhasil melewati pengujian otomatis dengan sempurna. Poin XP dan konsistensi streak harianmu bertambah!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 py-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="block text-[11px] text-slate-400">Poin Diperoleh</span>
                <span className="text-lg font-bold text-amber-400">+{assignment.points} XP</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="block text-[11px] text-slate-400">Streak Belajar</span>
                <span className="text-lg font-bold text-orange-400">🔥 {progress.streakDays} Hari</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => setShowCelebration(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
              >
                Tetap di Halaman Ini
              </button>
              <Link
                href="/student/assignments"
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition flex items-center justify-center space-x-1"
              >
                <span>Lihat PR Berikutnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
