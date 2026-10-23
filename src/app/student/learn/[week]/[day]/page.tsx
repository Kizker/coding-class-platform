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
    <div className="min-h-screen bg-[#090a0f] text-slate-200 flex flex-col font-sans">
      {/* Studio Header Bar - Precision Monospace Breadcrumbs */}
      <div className="bg-[#0f1118] border-b border-white/[0.08] px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center space-x-3">
          <Link
            href="/student/assignments"
            className="text-slate-400 hover:text-white transition flex items-center space-x-1"
          >
            <span>&larr; TUGAS_INDEX</span>
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">
            PEKAN_{weekNum.toString().padStart(2, "0")}
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-amber-400 font-semibold uppercase">
            {assignment.day} ({assignment.type})
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200 font-bold hidden sm:inline">
            {assignment.title}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-slate-400">
            BOBOT: <strong className="text-slate-200">+{assignment.points} XP</strong>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">
            EST: <strong className="text-slate-200">{assignment.durationMinutes}M</strong>
          </span>
        </div>
      </div>

      {/* Tutor Pushed Code Banner Alert */}
      {pushedAlert && (
        <div className="bg-[#121824] border-b border-amber-500/30 px-4 py-2 text-xs font-mono text-amber-300 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>{pushedAlert}</span>
          </div>
          <button
            onClick={() => setPushedAlert(null)}
            className="text-slate-400 hover:text-white underline text-[11px] cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Split Screen Grid (5 : 7) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* ================= LEFT PANE: Materi & Panduan ================= */}
        <div className="lg:col-span-5 border-r border-white/[0.08] bg-[#0c0d14] flex flex-col justify-between overflow-y-auto">
          {/* Hairline Tab Navigation */}
          <div className="flex border-b border-white/[0.08] bg-[#0f1118] px-4 pt-2 space-x-1 text-xs font-mono">
            <button
              onClick={() => setActiveTab("challenge")}
              className={`pb-2.5 px-3 font-semibold transition border-b-2 ${
                activeTab === "challenge"
                  ? "border-amber-400 text-amber-300"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              01 // TANTANGAN
            </button>
            <button
              onClick={() => setActiveTab("theory")}
              className={`pb-2.5 px-3 font-semibold transition border-b-2 ${
                activeTab === "theory"
                  ? "border-amber-400 text-amber-300"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              02 // TEORI
            </button>
            <button
              onClick={() => setActiveTab("hints")}
              className={`pb-2.5 px-3 font-semibold transition border-b-2 ${
                activeTab === "hints"
                  ? "border-amber-400 text-amber-300"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              03 // PETUNJUK ({assignment.hints.length})
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-5 sm:p-6 space-y-4 flex-1">
            {activeTab === "challenge" && (
              <div className="space-y-4">
                <div className="border border-white/[0.08] rounded-lg bg-[#11131b] p-4 space-y-2">
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-widest block font-semibold">
                    PETUNJUK EKSEKUSI SOAL:
                  </span>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                    {assignment.challengeInstructions}
                  </p>
                </div>

                {assignment.expectedOutput && (
                  <div className="space-y-1.5">
                    <span className="font-mono text-[11px] text-slate-400 uppercase tracking-widest block font-semibold">
                      TARGET KELUARAN TERMINAL:
                    </span>
                    <pre className="p-3 bg-[#08090d] border border-white/[0.06] rounded text-emerald-400 font-mono text-xs whitespace-pre-wrap">
                      {assignment.expectedOutput}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {activeTab === "theory" && (
              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <div className="bg-[#11131b] border border-white/[0.08] rounded-lg p-4 font-sans whitespace-pre-wrap">
                  {assignment.theoryMarkdown}
                </div>
              </div>
            )}

            {activeTab === "hints" && (
              <div className="space-y-3 font-mono text-xs">
                <span className="text-[11px] text-slate-400 uppercase tracking-widest block font-semibold">
                  PETUNJUK BERTAHAP NALAR KODING:
                </span>
                {assignment.hints.map((hint, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded border transition ${
                      idx <= activeHintIndex
                        ? "bg-[#141722] border-white/[0.12] text-slate-200"
                        : "bg-[#0c0d14] border-white/[0.04] text-slate-600"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                      <span>PETUNJUK_{idx + 1}</span>
                      {idx > activeHintIndex && (
                        <button
                          onClick={() => setActiveHintIndex(idx)}
                          className="text-amber-400 hover:underline text-[10px]"
                        >
                          BUKA_KUNCI
                        </button>
                      )}
                    </div>
                    {idx <= activeHintIndex ? (
                      <p className="font-sans text-xs text-slate-300">{hint}</p>
                    ) : (
                      <p className="font-sans text-xs italic text-slate-500">
                        Klik &quot;BUKA_KUNCI&quot; jika membutuhkan bantuan tambahan.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Distraction-free footer status */}
          <div className="p-3 bg-[#0f1118] border-t border-white/[0.08] text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>DRAFT: LOCAL_STORAGE_SYNC</span>
            <span>PYTHON_3.11</span>
          </div>
        </div>

        {/* ================= RIGHT PANE: Workspace Koding Siswa ================= */}
        <div className="lg:col-span-7 flex flex-col p-4 sm:p-6 space-y-4 bg-[#090a0f] overflow-y-auto">
          {/* Action Bar */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center space-x-2 font-mono text-xs">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-4 py-2 rounded bg-white text-black font-semibold hover:bg-slate-200 disabled:opacity-50 transition flex items-center space-x-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? "RUNNING..." : "JALANKAN KODE"}</span>
              </button>

              <button
                onClick={handleSubmitTask}
                disabled={isRunning}
                className="px-4 py-2 rounded bg-[#151824] hover:bg-[#1c2030] text-emerald-400 border border-emerald-500/40 font-semibold disabled:opacity-50 transition flex items-center space-x-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>KUMPULKAN TUGAS</span>
              </button>
            </div>

            {isPassed && (
              <span className="font-mono text-xs text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>EVALUATION: PASSED (ALL TESTS)</span>
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

      {/* Confirmation Modal - Minimalist Technical Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f1118] border border-emerald-500/40 rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
              STATUS // VERIFIED TUGAS
            </div>

            <h3 className="text-lg font-bold text-white tracking-tight">
              Tugas Berhasil Terverifikasi
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Logika kode berhasil memenuhi seluruh kriteria pengujian otomatis. Rekapitulasi poin XP dan kepatuhan streak harian telah dicatat ke sistem.
            </p>

            <div className="grid grid-cols-2 gap-3 py-1 font-mono text-xs">
              <div className="p-3 bg-[#151824] rounded border border-white/[0.06]">
                <span className="text-slate-400 text-[10px] block">POIN XP</span>
                <span className="text-amber-400 font-bold">+{assignment.points} XP</span>
              </div>
              <div className="p-3 bg-[#151824] rounded border border-white/[0.06]">
                <span className="text-slate-400 text-[10px] block">KONSISTENSI</span>
                <span className="text-slate-200 font-bold">{progress.streakDays} HARI</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2 font-mono text-xs">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-2 rounded bg-white/[0.08] hover:bg-white/[0.12] text-slate-300 transition"
              >
                TUTUP
              </button>
              <Link
                href="/student/assignments"
                className="flex-1 py-2 rounded bg-white text-black font-bold hover:bg-slate-200 transition text-center"
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
