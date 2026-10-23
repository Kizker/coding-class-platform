"use client";

import React, { useState, use, useEffect } from "react";
import { CURRICULUM_DATA } from "@/data/curriculum";
import { usePyodide, ExecutionResult } from "@/lib/pyodide/usePyodide";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { ConsoleOutput } from "@/components/editor/ConsoleOutput";
import { useAutoSaveDraft } from "@/hooks/useAutoSaveDraft";
import { useSession } from "@/lib/auth/sessionContext";
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

  const storageKey = `w${weekNum}_${dayKey}`;
  const { code, setCode, isSaved, lastSavedAt, resetToInitial } = useAutoSaveDraft(
    storageKey,
    assignment.starterCode
  );

  const [activeTab, setActiveTab] = useState<"challenge" | "theory" | "hints">("challenge");
  const [activeHintIndex, setActiveHintIndex] = useState<number>(0);
  const [lastResult, setLastResult] = useState<ExecutionResult | null>(null);
  const [isPassed, setIsPassed] = useState<boolean>(false);
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
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Studio Header Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono shadow-2xs">
        <div className="flex items-center space-x-2">
          <Link
            href="/student/assignments"
            className="text-slate-600 hover:text-blue-600 transition flex items-center space-x-1 font-bold"
          >
            <span>&larr; TUGAS_INDEX</span>
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500 font-semibold">
            PEKAN_{weekNum.toString().padStart(2, "0")}
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-blue-700 font-bold uppercase">
            {assignment.day} ({assignment.type})
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold hidden sm:inline font-sans">
            {assignment.title}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-slate-600 font-semibold flex items-center space-x-1">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>BOBOT:</span>
            <strong className="text-blue-700">+{assignment.points} XP</strong>
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600 font-semibold flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>EST:</span>
            <strong className="text-slate-900">{assignment.durationMinutes}M</strong>
          </span>
        </div>
      </div>

      {/* Tutor Pushed Code Banner Alert */}
      {pushedAlert && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-xs font-mono text-amber-900 flex items-center justify-between shadow-2xs">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-amber-700 animate-bounce" />
            <span className="font-semibold">{pushedAlert}</span>
          </div>
          <button
            onClick={() => setPushedAlert(null)}
            className="text-amber-700 hover:text-amber-900 font-bold underline text-[11px] cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Split Screen Grid (5 : 7) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* LEFT PANE: Materi & Panduan */}
        <div className="lg:col-span-5 border-r border-slate-200 bg-slate-50 flex flex-col justify-between overflow-y-auto">
          {/* Tab Navigation with Uniform Buttons */}
          <div className="flex border-b border-slate-200 bg-white p-2.5 gap-2 text-xs font-mono">
            <button
              onClick={() => setActiveTab("challenge")}
              className={`flex-1 py-2 px-3 rounded-xl font-bold transition text-center cursor-pointer ${
                activeTab === "challenge"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80"
              }`}
            >
              01 // TANTANGAN
            </button>
            <button
              onClick={() => setActiveTab("theory")}
              className={`flex-1 py-2 px-3 rounded-xl font-bold transition text-center cursor-pointer ${
                activeTab === "theory"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80"
              }`}
            >
              02 // TEORI
            </button>
            <button
              onClick={() => setActiveTab("hints")}
              className={`flex-1 py-2 px-3 rounded-xl font-bold transition text-center cursor-pointer ${
                activeTab === "hints"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80"
              }`}
            >
              03 // PETUNJUK ({assignment.hints.length})
            </button>
          </div>

          {/* Tab Content Body - Uniform Inner Boxes */}
          <div className="p-5 sm:p-6 space-y-5 flex-1">
            {activeTab === "challenge" && (
              <div className="space-y-4">
                {/* Challenge Box */}
                <div className="ui-card-inner bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-700 tracking-wider uppercase flex items-center space-x-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>INSTRUKSI TANTANGAN:</span>
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                      PR 15 MENIT
                    </span>
                  </div>
                  <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-sans">
                    {assignment.challengeInstructions}
                  </p>
                </div>

                {/* Target Output Terminal */}
                {assignment.expectedOutput && (
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                      TARGET KELUARAN TERMINAL:
                    </span>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xs">
                      <div className="px-3.5 py-2 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span className="flex items-center space-x-1.5 font-bold">
                          <Terminal className="w-3 h-3 text-slate-400" />
                          <span>STDOUT_EXPECTED</span>
                        </span>
                        <span>PYTHON RUNTIME</span>
                      </div>
                      <pre className="p-4 text-emerald-400 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                        {assignment.expectedOutput}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "theory" && (
              <div className="space-y-3">
                <div className="ui-card-inner bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
                  <span className="text-xs font-mono font-bold text-blue-700 tracking-wider uppercase block">
                    RINGKASAN TEORI LOGIKA:
                  </span>
                  <div className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed whitespace-pre-wrap">
                    {assignment.theoryMarkdown}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "hints" && (
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                  PETUNJUK BERTAHAP NALAR KODING:
                </span>
                <div className="space-y-3 font-mono">
                  {assignment.hints.map((hint, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border transition-all ${
                        idx <= activeHintIndex
                          ? "bg-white border-blue-200 shadow-xs text-slate-800 ring-1 ring-blue-100"
                          : "bg-slate-100/70 border-slate-200 text-slate-400"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                        <span className="text-blue-700">PETUNJUK #{idx + 1}</span>
                        {idx > activeHintIndex && (
                          <button
                            onClick={() => setActiveHintIndex(idx)}
                            className="text-blue-600 hover:text-blue-800 font-bold underline text-[11px] cursor-pointer"
                          >
                            BUKA KUNCI &rarr;
                          </button>
                        )}
                      </div>
                      {idx <= activeHintIndex ? (
                        <p className="font-sans text-xs text-slate-700 leading-relaxed">{hint}</p>
                      ) : (
                        <p className="font-sans text-xs italic text-slate-400">
                          Klik &quot;Buka Kunci&quot; jika kamu menemui jalan buntu.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer status */}
          <div className="p-3.5 bg-white border-t border-slate-200 text-[11px] font-mono text-slate-500 flex items-center justify-between">
            <span className="flex items-center space-x-1.5 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>DRAFT: LOCAL_STORAGE_SYNC</span>
            </span>
            <span>PYTHON_3.11</span>
          </div>
        </div>

        {/* RIGHT PANE: Workspace Koding Siswa */}
        <div className="lg:col-span-7 flex flex-col p-4 sm:p-6 space-y-4 bg-slate-50 overflow-y-auto">
          {/* Action Bar */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center space-x-2.5 font-mono text-xs">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="h-10 px-5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center space-x-2 cursor-pointer shadow-xs hover:shadow-sm"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isRunning ? "MENGEKSEKUSI..." : "JALANKAN KODE"}</span>
              </button>

              <button
                onClick={handleSubmitTask}
                disabled={isRunning}
                className="h-10 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold disabled:opacity-50 transition-all flex items-center space-x-2 cursor-pointer shadow-xs hover:shadow-sm"
              >
                <Check className="w-4 h-4" />
                <span>KUMPULKAN TUGAS</span>
              </button>
            </div>

            {isPassed && (
              <span className="font-mono text-xs text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center space-x-1.5 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>EVALUASI: TERVERIFIKASI (PASSED)</span>
              </span>
            )}
          </div>

          {/* Monaco Code Editor (Standardized rounded-2xl) */}
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

          {/* Terminal Console Output (Standardized rounded-2xl) */}
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

      {/* Confirmation Modal - Standardized Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-emerald-300 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-emerald-700 uppercase tracking-widest font-extrabold flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>STATUS // MISI TUNTAS</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                100 / 100
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Tugas Berhasil Terverifikasi!
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Hebat! Kode programmu telah lolos seluruh unit pengujian logika otomatis. Skor dan streak harianmu sudah dicatat ke sistem.
            </p>

            <div className="grid grid-cols-2 gap-3.5 py-1 font-mono text-xs">
              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 text-center space-y-1">
                <span className="text-slate-500 text-[10px] block font-bold">HADIAH PENGALAMAN</span>
                <span className="text-blue-700 font-extrabold text-lg">+{assignment.points} XP</span>
              </div>
              <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 text-center space-y-1">
                <span className="text-slate-500 text-[10px] block font-bold">STREAK HARIAN</span>
                <span className="text-amber-800 font-extrabold text-lg">{progress.streakDays} HARI</span>
              </div>
            </div>

            <div className="flex gap-2.5 pt-2 font-mono text-xs">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition cursor-pointer"
              >
                TUTUP
              </button>
              <Link
                href="/student/assignments"
                className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition text-center shadow-xs flex items-center justify-center space-x-1"
              >
                <span>TUGAS BERIKUTNYA</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
