"use client";

import React, { useState, use, useEffect, useRef } from "react";
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
  const lastHandledPushedCodeRef = useRef<string | null>(null);

  useEffect(() => {
    if (pushedCode && pushedCode !== lastHandledPushedCodeRef.current) {
      lastHandledPushedCodeRef.current = pushedCode;
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
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#FDFBF7] text-black flex flex-col font-sans antialiased">
      {/* ======================================================== */}
      {/* 1. QUIET HEADER (NEO-BRUTALISM CONTEXT BAR)              */}
      {/* ======================================================== */}
      <header className="bg-white border-b-2.5 border-black px-4 sm:px-6 lg:px-8 py-3 sticky top-14 z-30 shadow-[0_3px_0px_#000000]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2.5">
            <Link
              href="/student/assignments"
              className="px-3 py-1 bg-white hover:bg-[#FEF08A] text-black border-2 border-black font-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>DAFTAR TUGAS</span>
            </Link>
            <span className="text-black font-black text-sm">/</span>
            <span className="text-stone-700 font-bold uppercase text-[11px]">Pekan {weekNum}</span>
            <span className="text-black font-black text-sm">/</span>
            <span className="font-black text-black uppercase tracking-tight">
              {dayLabelMap[dayKey] || dayKey} &bull; {assignment.title}
            </span>
          </div>

          {/* Points & Duration Badges */}
          <div className="flex items-center space-x-3">
            <span className="text-black font-black flex items-center space-x-1.5 bg-[#FEF08A] px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] uppercase text-[11px]">
              <Zap className="w-3.5 h-3.5 fill-black stroke-black" />
              <span>+{assignment.points} XP</span>
            </span>
            <span className="text-black font-black flex items-center space-x-1.5 bg-white px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] uppercase text-[11px]">
              <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{assignment.durationMinutes} Menit</span>
            </span>
            {isPassed && (
              <span className="px-3 py-1 bg-[#86EFAC] text-black border-2 border-black shadow-[2px_2px_0px_#000] font-black flex items-center space-x-1 uppercase text-[11px]">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Selesai</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Tutor Pushed Code Subtle Toast */}
      {pushedAlert && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full">
          <div className="bg-[#FEF08A] text-black border-2.5 border-black px-4 py-3 shadow-[4px_4px_0px_#000] text-xs flex items-center justify-between animate-fadeIn font-bold">
            <div className="flex items-center space-x-2.5">
              <Bell className="w-4 h-4 stroke-[2.5] shrink-0" />
              <span className="font-black">{pushedAlert}</span>
            </div>
            <button
              onClick={() => setPushedAlert(null)}
              className="text-black font-black uppercase text-[11px] px-2 py-0.5 border border-black hover:bg-black hover:text-white transition cursor-pointer"
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
        <section className="lg:col-span-5 bg-white border-2.5 border-black p-6 shadow-[5px_5px_0px_#000] space-y-5">
          {/* Neo-Brutalist Tab Navigation */}
          <div className="flex gap-1.5 p-1 bg-stone-100 border-2 border-black text-xs">
            <button
              onClick={() => setActiveTab("challenge")}
              className={`flex-1 py-2 px-2 transition-all cursor-pointer text-center uppercase tracking-tight text-[11px] font-black border ${
                activeTab === "challenge"
                  ? "bg-[#FACC15] text-black border-black shadow-[2px_2px_0px_#000]"
                  : "bg-transparent text-black border-transparent hover:bg-white"
              }`}
            >
              Tantangan
            </button>
            <button
              onClick={() => setActiveTab("theory")}
              className={`flex-1 py-2 px-2 transition-all cursor-pointer text-center uppercase tracking-tight text-[11px] font-black border ${
                activeTab === "theory"
                  ? "bg-[#FACC15] text-black border-black shadow-[2px_2px_0px_#000]"
                  : "bg-transparent text-black border-transparent hover:bg-white"
              }`}
            >
              Teori
            </button>
            <button
              onClick={() => setActiveTab("hints")}
              className={`flex-1 py-2 px-2 transition-all cursor-pointer text-center uppercase tracking-tight text-[11px] font-black border ${
                activeTab === "hints"
                  ? "bg-[#FACC15] text-black border-black shadow-[2px_2px_0px_#000]"
                  : "bg-transparent text-black border-transparent hover:bg-white"
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
                    <span className="text-[10px] font-black text-black bg-[#86EFAC] px-2 py-0.5 border border-black uppercase tracking-wider">
                      Latihan Mandiri 15 Menit
                    </span>
                    <span className="text-black font-black bg-[#FEF08A] px-2 py-0.5 border border-black uppercase text-[10px]">
                      +{assignment.points} XP
                    </span>
                  </div>
                  <h1 className="text-xl font-black text-black tracking-tight leading-snug uppercase">
                    {assignment.title}
                  </h1>
                </div>

                {/* Challenge Box */}
                <div className="p-4 bg-[#FEF08A] border-2 border-black shadow-[3px_3px_0px_#000] space-y-2">
                  <span className="text-xs font-black text-black flex items-center space-x-1.5 uppercase">
                    <BookOpen className="w-4 h-4 stroke-[2.5]" />
                    <span>Petunjuk Pengerjaan:</span>
                  </span>
                  <p className="text-xs text-black font-bold leading-relaxed">
                    {assignment.challengeInstructions}
                  </p>
                </div>

                {/* Target Output Terminal */}
                {assignment.expectedOutput && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-black text-black uppercase tracking-wider block">
                      Target Keluaran Terminal yang Diharapkan:
                    </span>
                    <div className="border-2 border-black bg-stone-900 p-4 font-mono text-xs overflow-x-auto shadow-[3px_3px_0px_#000]">
                      <pre className="text-[#86EFAC] whitespace-pre-wrap leading-relaxed font-bold">
                        {assignment.expectedOutput}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "theory" && (
              <div className="space-y-3 animate-fadeIn">
                <div className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_#000] space-y-2">
                  <span className="text-xs font-black text-black flex items-center space-x-1.5 uppercase">
                    <FileText className="w-4 h-4 stroke-[2.5]" />
                    <span>Konsep &amp; Nalar Logika:</span>
                  </span>
                  <div className="text-xs text-stone-800 font-bold leading-relaxed whitespace-pre-wrap">
                    {assignment.theoryMarkdown}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "hints" && (
              <div className="space-y-3 animate-fadeIn">
                <span className="text-[11px] font-black text-black uppercase tracking-wider block">
                  Petunjuk Bertahap Nalar Koding:
                </span>
                <div className="space-y-2.5">
                  {assignment.hints.map((hint, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 border-2 border-black transition-all ${
                        idx <= activeHintIndex
                          ? "bg-white shadow-[3px_3px_0px_#000] text-black"
                          : "bg-stone-100 shadow-[1px_1px_0px_#000] text-stone-400"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold mb-1">
                        <span className="font-black text-black uppercase">Petunjuk #{idx + 1}</span>
                        {idx > activeHintIndex && (
                          <button
                            onClick={() => setActiveHintIndex(idx)}
                            className="text-black font-black uppercase text-[10px] px-2 py-0.5 bg-[#FEF08A] border border-black hover:bg-yellow-300 cursor-pointer"
                          >
                            Buka Petunjuk &rarr;
                          </button>
                        )}
                      </div>
                      {idx <= activeHintIndex ? (
                        <p className="text-xs text-stone-800 font-bold leading-relaxed">{hint}</p>
                      ) : (
                        <p className="text-xs italic text-stone-500 font-medium">
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
          <div className="pt-3 border-t-2 border-black flex items-center justify-between text-[11px] font-black uppercase">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] border border-black" />
              <span>Draf Otomatis Tersimpan</span>
            </span>
            <span className="bg-stone-100 px-2 py-0.5 border border-black">Python 3.11</span>
          </div>
        </section>

        {/* RIGHT PANE (7/12): Editor & Terminal */}
        <section className="lg:col-span-7 bg-white border-2.5 border-black overflow-hidden shadow-[5px_5px_0px_#000] flex flex-col">
          {/* Action Header */}
          <div className="px-5 py-3 border-b-2 border-black bg-[#FEF08A] flex items-center justify-between text-xs flex-wrap gap-2">
            <div className="flex items-center space-x-2 font-mono text-black font-bold">
              <span className="font-black">main.py</span>
              <span>&bull;</span>
              <span className="text-[11px] uppercase font-bold">
                {isSaved ? "Tersimpan" : "Mengetik..."}
              </span>
            </div>

            <div className="flex items-center space-x-2.5">
              <button
                onClick={resetToInitial}
                title="Pulihkan kode awal"
                className="px-2.5 py-1.5 bg-white border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-stone-50 text-black font-black text-xs cursor-pointer uppercase tracking-tight flex items-center space-x-1 active:translate-x-[1px] active:translate-y-[1px]"
              >
                <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">Pulihkan</span>
              </button>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-4 py-1.5 bg-white hover:bg-stone-50 text-black border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-black transition-all flex items-center space-x-1.5 cursor-pointer uppercase tracking-tight disabled:opacity-50 active:translate-x-[1px] active:translate-y-[1px]"
              >
                <Play className="w-3.5 h-3.5 fill-black stroke-black" />
                <span>{isRunning ? "Mengeksekusi..." : "Jalankan Kode"}</span>
              </button>

              <button
                onClick={handleSubmitTask}
                disabled={isRunning}
                className="px-4 py-1.5 bg-[#4ADE80] hover:bg-green-400 text-black border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-black transition-all flex items-center space-x-1.5 cursor-pointer uppercase tracking-tight disabled:opacity-50 active:translate-x-[1px] active:translate-y-[1px]"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
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
          <div className="border-t-2 border-black bg-stone-50 p-4 sm:p-5 flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 stroke-[2.5]" />
                <span className="font-black uppercase">Hasil Program Terminal</span>
              </div>
              {lastResult && (
                <span
                  className={
                    lastResult.isSuccess
                      ? "bg-[#86EFAC] text-black px-2 py-0.5 border border-black font-black uppercase text-[10px] flex items-center space-x-1"
                      : "bg-[#FCA5A5] text-black px-2 py-0.5 border border-black font-black uppercase text-[10px] flex items-center space-x-1"
                  }
                >
                  {lastResult.isSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Sesuai Ekspektasi</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Perlu Diperiksa</span>
                    </>
                  )}
                </span>
              )}
            </div>

            <div className="p-3.5 bg-stone-900 border-2 border-black font-mono text-xs text-white min-h-[90px] max-h-[220px] overflow-y-auto shadow-[2px_2px_0px_#000]">
              {lastResult ? (
                <pre className="whitespace-pre-wrap leading-relaxed font-bold">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white border-2.5 border-black p-6 sm:p-8 max-w-md w-full shadow-[8px_8px_0px_#000] space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between text-xs">
              <span className="text-black font-black flex items-center space-x-1.5 uppercase">
                <Sparkles className="w-4 h-4 fill-[#FACC15] stroke-black" />
                <span>Tugas Terverifikasi</span>
              </span>
              <span className="px-2.5 py-0.5 bg-[#86EFAC] text-black font-black border border-black uppercase text-[11px]">
                100 / 100
              </span>
            </div>

            <h3 className="text-2xl font-black text-black tracking-tight uppercase">
              Latihan Berhasil Diselesaikan!
            </h3>

            <p className="text-xs text-stone-800 leading-relaxed font-bold">
              Kerja bagus! Kodemu telah berhasil lolos seluruh kriteria pengujian logika. Poin pengalaman dan catatan progresmu telah tersimpan.
            </p>

            <div className="grid grid-cols-2 gap-3 py-1 text-xs">
              <div className="p-4 bg-[#FEF08A] border-2 border-black shadow-[2px_2px_0px_#000] text-center space-y-1">
                <span className="text-stone-700 text-[10px] block font-black uppercase">Poin Hadiah</span>
                <span className="text-black font-black text-2xl">+{assignment.points} XP</span>
              </div>
              <div className="p-4 bg-[#86EFAC] border-2 border-black shadow-[2px_2px_0px_#000] text-center space-y-1">
                <span className="text-black text-[10px] block font-black uppercase">Streak Belajar</span>
                <span className="text-black font-black text-2xl">{progress.streakDays} Hari</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2 text-xs">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-3 border-2 border-black bg-white hover:bg-stone-50 text-black font-black transition cursor-pointer uppercase shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
              >
                Tutup
              </button>
              <Link
                href="/student/assignments"
                className="flex-1 py-3 bg-[#FACC15] hover:bg-yellow-400 text-black border-2 border-black font-black transition text-center shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] flex items-center justify-center space-x-1.5 uppercase"
              >
                <span>Tugas Selanjutnya</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
