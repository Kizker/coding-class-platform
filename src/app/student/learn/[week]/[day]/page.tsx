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
            className="text-slate-600 hover:text-blue-600 transition flex items-center space-x-1 font-semibold"
          >
            <span>&larr; TUGAS_INDEX</span>
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">
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
          <span className="text-slate-600">
            BOBOT: <strong className="text-blue-700">+{assignment.points} XP</strong>
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600">
            EST: <strong className="text-slate-900">{assignment.durationMinutes}M</strong>
          </span>
        </div>
      </div>

      {/* Tutor Pushed Code Banner Alert */}
      {pushedAlert && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs font-mono text-amber-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-3.5 h-3.5 text-amber-700" />
            <span>{pushedAlert}</span>
          </div>
          <button
            onClick={() => setPushedAlert(null)}
            className="text-amber-700 hover:text-amber-900 underline text-[11px] cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Split Screen Grid (5 : 7) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* LEFT PANE: Materi & Panduan */}
        <div className="lg:col-span-5 border-r border-slate-200 bg-slate-50 flex flex-col justify-between overflow-y-auto">
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 bg-white px-4 pt-2 space-x-1 text-xs font-mono">
            <button
              onClick={() => setActiveTab("challenge")}
              className={`pb-2.5 px-3 font-semibold transition border-b-2 cursor-pointer ${
                activeTab === "challenge"
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              01 // TANTANGAN
            </button>
            <button
              onClick={() => setActiveTab("theory")}
              className={`pb-2.5 px-3 font-semibold transition border-b-2 cursor-pointer ${
                activeTab === "theory"
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              02 // TEORI
            </button>
            <button
              onClick={() => setActiveTab("hints")}
              className={`pb-2.5 px-3 font-semibold transition border-b-2 cursor-pointer ${
                activeTab === "hints"
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              03 // PETUNJUK ({assignment.hints.length})
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-5 sm:p-6 space-y-4 flex-1">
            {activeTab === "challenge" && (
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-xl bg-white p-5 space-y-2 shadow-xs">
                  <span className="font-mono text-[11px] text-blue-700 uppercase tracking-widest block font-bold">
                    INSTRUKSI PENYELESAIAN:
                  </span>
                  <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
                    {assignment.challengeInstructions}
                  </p>
                </div>

                {assignment.expectedOutput && (
                  <div className="space-y-1.5">
                    <span className="font-mono text-[11px] text-slate-500 uppercase tracking-widest block font-bold">
                      TARGET OUTPUT TERMINAL:
                    </span>
                    <pre className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg text-emerald-400 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                      {assignment.expectedOutput}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {activeTab === "theory" && (
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="bg-white border border-slate-200 rounded-xl p-5 font-sans whitespace-pre-wrap shadow-xs">
                  {assignment.theoryMarkdown}
                </div>
              </div>
            )}

            {activeTab === "hints" && (
              <div className="space-y-3 font-mono text-xs">
                <span className="text-[11px] text-slate-500 uppercase tracking-widest block font-bold">
                  PETUNJUK BERTAHAP NALAR KODING:
                </span>
                {assignment.hints.map((hint, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-lg border transition ${
                      idx <= activeHintIndex
                        ? "bg-white border-blue-200 shadow-xs text-slate-800"
                        : "bg-slate-100 border-slate-200 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                      <span>PETUNJUK_{idx + 1}</span>
                      {idx > activeHintIndex && (
                        <button
                          onClick={() => setActiveHintIndex(idx)}
                          className="text-blue-600 hover:underline text-[10px] cursor-pointer"
                        >
                          BUKA_KUNCI
                        </button>
                      )}
                    </div>
                    {idx <= activeHintIndex ? (
                      <p className="font-sans text-xs text-slate-700">{hint}</p>
                    ) : (
                      <p className="font-sans text-xs italic text-slate-400">
                        Klik &quot;BUKA_KUNCI&quot; jika membutuhkan bantuan tambahan.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer status */}
          <div className="p-3 bg-white border-t border-slate-200 text-[11px] font-mono text-slate-500 flex items-center justify-between">
            <span>DRAFT: LOCAL_STORAGE_SYNC</span>
            <span>PYTHON_3.11</span>
          </div>
        </div>

        {/* RIGHT PANE: Workspace Koding Siswa */}
        <div className="lg:col-span-7 flex flex-col p-4 sm:p-6 space-y-4 bg-slate-50 overflow-y-auto">
          {/* Action Bar */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center space-x-2 font-mono text-xs">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 transition flex items-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? "MENGEKSEKUSI..." : "JALANKAN KODE"}</span>
              </button>

              <button
                onClick={handleSubmitTask}
                disabled={isRunning}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold disabled:opacity-50 transition flex items-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>KUMPULKAN TUGAS</span>
              </button>
            </div>

            {isPassed && (
              <span className="font-mono text-xs text-emerald-700 font-semibold flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>EVALUASI: TERVERIFIKASI (PASSED)</span>
              </span>
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

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-emerald-300 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="font-mono text-xs text-emerald-700 uppercase tracking-widest font-bold">
              STATUS // VERIFIKASI TUGAS
            </div>

            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Tugas Berhasil Terverifikasi
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Logika kode berhasil memenuhi seluruh kriteria pengujian otomatis. Rekapitulasi poin XP dan kepatuhan streak harian telah dicatat ke sistem.
            </p>

            <div className="grid grid-cols-2 gap-3 py-1 font-mono text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] block font-semibold">POIN XP</span>
                <span className="text-blue-700 font-bold text-sm">+{assignment.points} XP</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] block font-semibold">KONSISTENSI</span>
                <span className="text-slate-900 font-bold text-sm">{progress.streakDays} HARI</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2 font-mono text-xs">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition cursor-pointer"
              >
                TUTUP
              </button>
              <Link
                href="/student/assignments"
                className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition text-center shadow-xs"
              >
                TUGAS BERIKUTNYA &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
