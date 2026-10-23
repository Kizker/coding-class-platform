"use client";

import React, { useState, use, useEffect } from "react";
import Link from "next/link";
import { CURRICULUM_DATA } from "@/data/curriculum";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { useSession } from "@/lib/auth/sessionContext";
import { LIVE_QUIZ_QUESTIONS } from "@/data/liveQuizQuestions";
import { WEEK_1_SUB_MATERIALS, SubMaterialItem } from "@/data/liveSubMaterials";
import confetti from "canvas-confetti";
import {
  Send,
  Check,
  Eye,
  ArrowLeft,
  Terminal,
  Sparkles,
  Award,
  ChevronRight,
  BookOpen,
  FileQuestion,
  RotateCcw,
  AlertCircle,
  Target,
  ArrowRight,
  Cpu,
  Layers,
  ListOrdered,
} from "lucide-react";

export default function TutorTeachingStudioPage({
  params,
}: {
  params: Promise<{ week: string; day: string }>;
}) {
  const resolvedParams = use(params);
  const weekNum = parseInt(resolvedParams.week, 10) || 1;
  const dayKey = (resolvedParams.day || "jumat").toLowerCase();

  const {
    liveSync,
    updateLiveSync,
    tutorAdvanceStep,
    pushCodeToStudent,
    progress,
    updateProgress,
    setTaskCompleted,
  } = useSession();

  const weekData = CURRICULUM_DATA.find((w) => w.week === weekNum) || CURRICULUM_DATA[0];
  const sessionItem =
    weekData.liveSessions.find((s) => s.day === dayKey) ||
    weekData.liveSessions[0];

  // Active Tab: 1: Tantangan, 2: Pembelajaran, 3: Kuis, 4: Refleksi
  const [activeTab, setActiveTab] = useState<number>(liveSync.currentStep || 1);
  const activeSubStep = liveSync.subStep || 1;

  // Sub-materials for Tab 2 (Pekan 1)
  const subMaterials = WEEK_1_SUB_MATERIALS;

  const currentSub = subMaterials[activeSubStep - 1] || subMaterials[0];

  const [tutorCode, setTutorCode] = useState<string>(currentSub.demoCode);
  const [pushStatus, setPushStatus] = useState<string | null>(null);
  const [appreciationSent, setAppreciationSent] = useState<boolean>(false);
  const [isSessionMarkedDone, setIsSessionMarkedDone] = useState<boolean>(false);

  // Switch tab & automatically sync student screen to that tab
  const handleSwitchTab = async (tabNumber: number) => {
    setActiveTab(tabNumber);
    let title = "";
    let note = "";

    if (tabNumber === 1) {
      title = "Tahap 1: Tantangan Uji Coba Awal";
      note = "Silakan coba selesaikan tantangan awal di bawah. Mentor memantau caramu berpikir dan menulis kode.";
    } else if (tabNumber === 2) {
      title = "Tahap 2: Pembelajaran Interaktif & Uji Coba Koding";
      note = subMaterials[activeSubStep - 1]?.concept || "";
      setTutorCode(subMaterials[activeSubStep - 1]?.demoCode || "");
    } else if (tabNumber === 3) {
      title = "Tahap 3: Kuis Pemahaman Logika (10 Soal)";
      note = "Jawab 10 soal evaluasi logika koding berikut secara mandiri.";
    } else {
      title = "Tahap 4: Refleksi & Penuntasan Sesi";
      note = "Sesi pembelajaran hari ini telah tuntas dengan sangat baik.";
    }

    await tutorAdvanceStep(tabNumber, activeSubStep, title, note);
  };

  // Change subStep in Tab 2
  const handleSelectSubStep = async (sub: number) => {
    const selected = subMaterials[sub - 1] || subMaterials[0];
    setTutorCode(selected.demoCode);
    await updateLiveSync({
      subStep: sub,
      pushedCode: selected.demoCode,
      tutorNote: selected.concept,
    });
  };

  // Broadcast tutor's current code to student's editor
  const handlePushCode = () => {
    pushCodeToStudent(tutorCode);
    setPushStatus("Kode peraga berhasil disinkronkan ke layar editor Andi.");
    setTimeout(() => setPushStatus(null), 3500);
  };

  // Give +50 XP appreciation
  const handleGiveStar = () => {
    updateProgress({ xpPoints: progress.xpPoints + 50 });
    setAppreciationSent(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
    setTimeout(() => setAppreciationSent(false), 2500);
  };

  // Mark session completed
  const handleCompleteSession = () => {
    setTaskCompleted(weekNum, dayKey, true);
    setIsSessionMarkedDone(true);
    updateProgress({
      attendanceCount: progress.attendanceCount + 1,
    });
    handleSwitchTab(4);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
    });
  };

  const studentQuizAnswers = liveSync.studentQuizAnswers || {};
  const answeredQuizCount = Object.keys(studentQuizAnswers).length;
  const correctQuizCount = Object.entries(studentQuizAnswers).filter(([qId, ansIdx]) => {
    const q = LIVE_QUIZ_QUESTIONS.find((item) => item.id === Number(qId));
    return q && q.correctAnswerIndex === ansIdx;
  }).length;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#FAFAF9] text-stone-900 flex flex-col font-sans antialiased">
      {/* ======================================================== */}
      {/* 1. QUIET TOP CONTEXT BAR                                 */}
      {/* ======================================================== */}
      <header className="bg-white border-b border-stone-200/80 px-4 sm:px-6 lg:px-8 py-3 sticky top-14 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Back & Topic */}
          <div className="flex items-center space-x-3">
            <Link
              href="/tutor/dashboard"
              className="text-stone-500 hover:text-stone-900 transition-colors flex items-center space-x-1.5 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
            <span className="text-stone-300">/</span>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-stone-900">
                Pekan {weekNum} &bull; Studio Mengajar {dayKey === "jumat" ? "Jumat" : "Sabtu"}
              </span>
              <span className="text-stone-400 hidden md:inline">&mdash;</span>
              <span className="text-stone-600 hidden md:inline">
                Sesi Tatap Muka Interaktif 1-on-1
              </span>
            </div>
          </div>

          {/* Right: Presence & Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-stone-600 text-xs font-medium bg-stone-50 px-3 py-1 rounded-full border border-stone-200/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>Siswa: Andi Pratama (Terhubung)</span>
            </div>

            {isSessionMarkedDone ? (
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-xs font-semibold flex items-center space-x-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sesi Selesai</span>
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

      {/* Push Notification Toast */}
      {pushStatus && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full">
          <div className="bg-stone-900 text-stone-100 px-4 py-3 rounded-xl text-xs flex items-center justify-between shadow-sm animate-fadeIn">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium">{pushStatus}</span>
            </div>
            <button
              onClick={() => setPushStatus(null)}
              className="text-stone-400 hover:text-white text-xs font-medium ml-4 cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. PROMINENT 4-STEP TABS BAR (TUTOR STEERING CONTROL)    */}
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
              const isDirectedToStudent = liveSync.currentStep === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleSwitchTab(tab.id)}
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

                  {isDirectedToStudent && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block ml-1" title="Layar siswa aktif di tab ini" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Steer Indicator */}
          <div className="text-xs text-stone-500 font-medium px-3 py-1 bg-stone-50 rounded-xl border border-stone-200/60 flex items-center space-x-2">
            <span className="text-[11px] text-stone-400">Status Sinkronisasi:</span>
            <span className="font-semibold text-emerald-700 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Siswa Terhubung pada Tab {liveSync.currentStep || 1}</span>
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. DEDICATED WORKSPACE PER TAB (HIGH FOCUS)             */}
      {/* ======================================================== */}
      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex-1">
        {/* ======================================================== */}
        {/* TAB 1: TANTANGAN AWAL (TUTOR FOCUS)                      */}
        {/* ======================================================== */}
        {activeTab === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fadeIn">
            {/* Left 5/12: Panduan Mengajar Tantangan Awal */}
            <section className="lg:col-span-5 bg-white border border-stone-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
                  Tahap 1 &bull; Tantangan Awal Siswa
                </span>
                <h2 className="text-xl font-bold text-stone-900 tracking-tight leading-snug">
                  Observasi Diagnostik Nalar
                </h2>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Biarkan Andi mencoba memecahkan masalah ini secara mandiri terlebih dahulu. Amati bagaimana ia merangkai logika variabel, kalkulasi, dan fungsi cetak sebelum Anda masuk ke penjelasan teori.
                </p>
              </div>

              {/* Soal Tantangan yang Ditugaskan */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 space-y-2">
                <span className="text-xs font-semibold text-stone-900 flex items-center space-x-1.5">
                  <Target className="w-3.5 h-3.5 text-stone-500" />
                  <span>Tantangan yang Dilihat Siswa:</span>
                </span>
                <p className="text-xs text-stone-700 leading-relaxed font-sans">
                  {sessionItem.practiceChallenge ||
                    "Buat kartu biodata digital dengan nama, hobi, dan cita-cita menggunakan format teks berbingkai ASCII rapi."}
                </p>
                <div className="pt-1 text-[11px] text-stone-500 font-mono">
                  Ekspektasi: {sessionItem.expectedOutputDesc || "Kartu identitas berbingkai rapi tercetak di konsol."}
                </div>
              </div>

              {/* Catatan Pedagogis */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 space-y-1">
                <span className="font-semibold text-amber-950 block">Poin Observasi Tutor:</span>
                <ul className="list-disc list-inside space-y-1 text-stone-700 leading-relaxed">
                  <li>Apakah siswa memahami alur eksekusi baris demi baris dari atas ke bawah?</li>
                  <li>Apakah sintaksis print() ditulis benar (huruf kecil &amp; tanda petik genap)?</li>
                  <li>Apakah penggunaan variabel string atau f-string diterapkan dengan tepat?</li>
                </ul>
              </div>

              {/* Action Button: Maju ke Tab 2 */}
              <div className="pt-2">
                <button
                  onClick={() => handleSwitchTab(2)}
                  className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition flex items-center justify-center space-x-2 shadow-2xs cursor-pointer"
                >
                  <span>Arahkan Siswa ke Tab 2: Pembelajaran Interaktif</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* Right 7/12: Live Inspector Layar Andi */}
            <section className="lg:col-span-7 bg-white border border-stone-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex items-center justify-between text-xs border-b border-stone-100 pb-3">
                <div className="flex items-center space-x-2 font-medium text-stone-900">
                  <Eye className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">Layar Kerja Andi Pratama (Live Inspector)</span>
                </div>
                <div className="flex items-center space-x-1.5 text-stone-500 font-medium text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  <span>Tersinkron Realtime</span>
                </div>
              </div>

              {/* Live Student Editor Snapshot */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block font-mono">
                  Kode yang Sedang Diketik Andi:
                </span>
                <div className="rounded-xl border border-stone-200/70 bg-stone-50/70 p-4 text-xs text-stone-800 min-h-[220px] max-h-[300px] overflow-y-auto font-mono leading-relaxed">
                  <pre className="whitespace-pre-wrap">{liveSync.studentLiveCode || "Menunggu Andi mengetik kode di editornya..."}</pre>
                </div>
              </div>

              {/* Live Student Terminal Output */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/60 flex items-center justify-between text-xs text-stone-700">
                <div className="flex items-center space-x-2 font-mono">
                  <Terminal className="w-3.5 h-3.5 text-stone-400" />
                  <span className="font-semibold text-stone-900">Luaran Program Siswa:</span>
                  <span className="text-stone-700 truncate max-w-sm">
                    {liveSync.studentExecutionOutput || "Menunggu siswa menekan 'Jalankan Kode'..."}
                  </span>
                </div>
                {liveSync.studentOutputSuccess !== null && (
                  <span
                    className={
                      liveSync.studentOutputSuccess
                        ? "text-emerald-700 font-semibold text-xs flex items-center space-x-1"
                        : "text-rose-700 font-semibold text-xs flex items-center space-x-1"
                    }
                  >
                    {liveSync.studentOutputSuccess ? "Berhasil" : "Error"}
                  </span>
                )}
              </div>
            </section>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: PEMBELAJARAN INTERAKTIF (TUTOR FOCUS)             */}
        {/* ======================================================== */}
        {activeTab === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fadeIn">
            {/* Left 5/12: Sub-Materi Nav & Guidance */}
            <section className="lg:col-span-5 bg-white border border-stone-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wider block">
                  Tahap 2 &bull; Pembelajaran Interaktif
                </span>
                <h2 className="text-xl font-bold text-stone-900 tracking-tight leading-snug">
                  Materi &amp; Uji Coba Terbimbing
                </h2>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Pilih sub-materi di bawah untuk memandu Andi langkah demi langkah. Di setiap sub-materi, siapkan kode peraga dan pantau latihan mandirinya.
                </p>
              </div>

              {/* 3 Sub-Material Selector */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                  Pilih Sub-Materi Aktif:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {subMaterials.map((sub) => (
                    <button
                      key={sub.sub}
                      onClick={() => handleSelectSubStep(sub.sub)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition cursor-pointer text-center ${
                        activeSubStep === sub.sub
                          ? "bg-stone-900 text-white shadow-2xs"
                          : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
                      }`}
                    >
                      Sub {sub.sub}
                    </button>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 text-xs space-y-1">
                  <span className="font-bold text-stone-900 block">{currentSub.title}</span>
                  <p className="text-stone-600 font-sans leading-relaxed">{currentSub.concept}</p>
                </div>
              </div>

              {/* Tutor Talking Points: Bedah Fungsi & Mekanisme Internal */}
              {currentSub.functionsExplained && currentSub.functionsExplained.length > 0 && (
                <div className="space-y-2 pt-1 border-t border-stone-100">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-stone-900">
                    <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Bedah Fungsi untuk Dijelaskan:</span>
                  </div>
                  <div className="space-y-2">
                    {currentSub.functionsExplained.map((fn, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100/80 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <code className="font-mono font-bold text-indigo-900">{fn.name}</code>
                          <span className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-indigo-200/60 text-indigo-700 font-medium">
                            {fn.role}
                          </span>
                        </div>
                        <p className="text-stone-700 text-[11px] leading-relaxed"><strong className="text-stone-900">Cara Kerja:</strong> {fn.howItWorks}</p>
                        <p className="text-stone-600 text-[11px] leading-relaxed"><strong className="text-stone-900">Aturan Emas:</strong> {fn.importantRules[0]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tutor Talking Points: Bedah Variabel & Alokasi RAM */}
              {currentSub.variablesExplained && currentSub.variablesExplained.length > 0 && (
                <div className="space-y-2 pt-1 border-t border-stone-100">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-stone-900">
                    <Layers className="w-3.5 h-3.5 text-amber-600" />
                    <span>Bedah Variabel &amp; Alokasi RAM:</span>
                  </div>
                  <div className="space-y-2">
                    {currentSub.variablesExplained.map((v, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <code className="font-mono font-bold text-stone-900">{v.name}</code>
                          <span className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-amber-200/80 text-amber-800 font-medium font-mono">
                            {v.type} &bull; Nilai: {v.value}
                          </span>
                        </div>
                        <p className="text-stone-700 text-[11px] leading-relaxed"><strong className="text-stone-900">Di Memori:</strong> {v.memoryRole}</p>
                        <p className="text-stone-600 text-[11px] leading-relaxed">{v.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tutor Talking Points: Alur Eksekusi Baris demi Baris */}
              {currentSub.lineByLine && currentSub.lineByLine.length > 0 && (
                <div className="space-y-2 pt-1 border-t border-stone-100">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-stone-900">
                    <ListOrdered className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Panduan Alur Baris demi Baris:</span>
                  </div>
                  <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                    {currentSub.lineByLine.map((line, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/60 text-[11px] space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <span className="px-1.5 py-0.5 rounded bg-stone-200 text-stone-700 font-mono text-[10px] font-bold">
                            Baris {line.line}
                          </span>
                          <code className="font-mono text-stone-900 font-semibold truncate">{line.code}</code>
                        </div>
                        <p className="text-stone-600 pl-1 leading-relaxed">{line.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handlePushCode}
                  className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition flex items-center justify-center space-x-2 shadow-2xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kirim Kode Peraga ke Layar Siswa</span>
                </button>

                <button
                  onClick={() => handleSwitchTab(3)}
                  className="w-full py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-800 font-semibold text-xs transition flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Lanjut ke Tab 3: Kuis Logika (10 Soal)</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* Right 7/12: Editor Kode Peraga + Live Monitor Latihan */}
            <section className="lg:col-span-7 space-y-5">
              {/* Tutor Code Broadcast Editor */}
              <div className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col">
                <div className="px-5 py-3 border-b border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-stone-900 font-mono block">
                      Kode Peraga Mentor (Sub {activeSubStep})
                    </span>
                    <span className="text-[11px] text-stone-400">
                      Anda dapat mengubah kode ini sebelum menekan &ldquo;Kirim ke Layar Siswa&rdquo;.
                    </span>
                  </div>

                  <button
                    onClick={handlePushCode}
                    className="px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition flex items-center space-x-1.5 shadow-2xs cursor-pointer shrink-0"
                  >
                    <Send className="w-3 h-3 text-emerald-400" />
                    <span>Kirim</span>
                  </button>
                </div>

                <div className="min-h-[220px]">
                  <CodeEditor
                    value={tutorCode}
                    onChange={setTutorCode}
                    height="220px"
                    hideHeader={true}
                    hideBorder={true}
                  />
                </div>
              </div>

              {/* Student Trial Live Inspector */}
              <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 font-medium text-stone-800">
                    <Eye className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">Latihan Uji Coba Mandiri Andi (Live Monitor)</span>
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono">Tersambung Realtime</span>
                </div>

                <div className="rounded-xl border border-stone-200/70 bg-stone-50/70 p-3.5 text-xs text-stone-800 max-h-[140px] overflow-y-auto font-mono leading-relaxed">
                  <pre className="whitespace-pre-wrap">{liveSync.studentLiveCode || "Siswa sedang menyiapkan workspace..."}</pre>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 flex items-center justify-between text-xs text-stone-600">
                  <div className="flex items-center space-x-2 font-mono">
                    <Terminal className="w-3.5 h-3.5 text-stone-400" />
                    <span className="font-semibold text-stone-800">Output Program Siswa:</span>
                    <span className="text-stone-700 truncate max-w-sm">
                      {liveSync.studentExecutionOutput || "Menunggu siswa menjalankan program..."}
                    </span>
                  </div>
                  {liveSync.studentOutputSuccess !== null && (
                    <span
                      className={
                        liveSync.studentOutputSuccess
                          ? "text-emerald-700 font-semibold text-xs"
                          : "text-rose-700 font-semibold text-xs"
                      }
                    >
                      {liveSync.studentOutputSuccess ? "Berhasil" : "Error"}
                    </span>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: KUIS LOGIKA (10 SOAL) (TUTOR MONITOR FOCUS)      */}
        {/* ======================================================== */}
        {activeTab === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fadeIn">
            {/* Left 5/12: Ringkasan & Kunci Pembahasan */}
            <section className="lg:col-span-5 bg-white border border-stone-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider block">
                  Tahap 3 &bull; Kuis Logika 10 Soal
                </span>
                <h2 className="text-xl font-bold text-stone-900 tracking-tight leading-snug">
                  Monitor Evaluasi Siswa
                </h2>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Kuis ini menguji 10 konsep penalaran Python dengan tingkat kesulitan menengah. Anda dapat memantau jawaban Andi secara langsung saat ia memilih opsi.
                </p>
              </div>

              {/* Metrik Pengerjaan */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 text-center space-y-1">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                    Terjawab
                  </span>
                  <span className="text-xl font-bold text-stone-900 block">
                    {answeredQuizCount} / 10 Soal
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-center space-y-1">
                  <span className="text-[10px] text-emerald-800 uppercase font-semibold block">
                    Benar / Skor
                  </span>
                  <span className="text-xl font-bold text-emerald-900 block">
                    {correctQuizCount} / 10 ({Math.round((correctQuizCount / 10) * 100)}%)
                  </span>
                </div>
              </div>

              {/* Action: Lanjut ke Refleksi */}
              <div className="pt-2">
                <button
                  onClick={() => handleSwitchTab(4)}
                  className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition flex items-center justify-center space-x-2 shadow-2xs cursor-pointer"
                >
                  <span>Arahkan Siswa ke Tab 4: Refleksi &amp; Penuntasan</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* Right 7/12: 10 Grid Questions Live Tracker */}
            <section className="lg:col-span-7 bg-white border border-stone-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5">
              <div className="flex items-center justify-between text-xs border-b border-stone-100 pb-3">
                <span className="font-bold text-stone-900">
                  Status Jawaban Realtime Andi Pratama
                </span>
                <span className="text-stone-400 text-[11px]">
                  Diperbarui otomatis via websocket/polling
                </span>
              </div>

              {/* 10 Boxes */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {LIVE_QUIZ_QUESTIONS.map((q) => {
                  const ans = studentQuizAnswers[q.id];
                  const isAnswered = ans !== undefined;
                  const isCorrect = ans === q.correctAnswerIndex;

                  return (
                    <div
                      key={q.id}
                      className={`h-11 rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all border ${
                        !isAnswered
                          ? "bg-stone-50 text-stone-400 border-stone-200"
                          : isCorrect
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : "bg-rose-50 text-rose-800 border-rose-300"
                      }`}
                    >
                      <span>{q.id}</span>
                      <span className="text-[9px] font-normal">
                        {!isAnswered ? "-" : isCorrect ? "Benar" : "Salah"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Ringkasan Pembahasan Tiap Nomor */}
              <div className="space-y-3 pt-2">
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                  Ringkasan Kunci Jawaban Soal:
                </span>
                <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                  {LIVE_QUIZ_QUESTIONS.map((q) => {
                    const ans = studentQuizAnswers[q.id];
                    const isAnswered = ans !== undefined;
                    const isCorrect = ans === q.correctAnswerIndex;

                    return (
                      <div
                        key={q.id}
                        className="p-3 rounded-xl bg-stone-50 border border-stone-200/70 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-stone-900">
                            Soal #{q.id}: {q.question.slice(0, 50)}...
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                              !isAnswered
                                ? "bg-stone-100 text-stone-500"
                                : isCorrect
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {!isAnswered
                              ? "Belum Dijawab"
                              : isCorrect
                              ? "Andi Menjawab Tepat"
                              : "Andi Kurang Tepat"}
                          </span>
                        </div>
                        <p className="text-stone-500 text-[11px]">{q.explanation}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: REFLEKSI & PENUNTASAN (TUTOR FOCUS)               */}
        {/* ======================================================== */}
        {activeTab === 4 && (
          <div className="max-w-3xl mx-auto bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-2">
                <Award className="w-6 h-6" />
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
                Tahap 4 &bull; Refleksi &amp; Penutupan Sesi
              </span>
              <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
                Penuntasan Sesi Mengajar 2 Jam
              </h1>
              <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                Seluruh tahapan dari Tantangan Awal, 3 Sub-Materi Interaktif, hingga Kuis 10 Soal telah dijalankan bersama Andi Pratama.
              </p>
            </div>

            {/* Score Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 text-center space-y-1">
                <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                  Akurasi Kuis Logika Andi
                </span>
                <span className="text-2xl font-bold text-stone-900 block">
                  {correctQuizCount} / 10 Soal
                </span>
                <span className="text-xs text-stone-500">
                  {Math.round((correctQuizCount / 10) * 100)}% Nilai Akhir
                </span>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-center space-y-1">
                <span className="text-[10px] text-amber-800 uppercase font-semibold block">
                  Reward Tambahan Siswa
                </span>
                <span className="text-2xl font-bold text-amber-900 block">
                  +50 XP
                </span>
                <span className="text-xs text-amber-700">
                  Bonus Kehadiran &amp; Ketuntasan
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleGiveStar}
                className="flex-1 py-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-semibold text-xs transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-700" />
                <span>{appreciationSent ? "XP Terkirim! (+50 XP)" : "Beri Apresiasi Poin (+50 XP)"}</span>
              </button>

              <button
                onClick={handleCompleteSession}
                className="flex-1 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition flex items-center justify-center space-x-2 shadow-2xs cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Tandai Selesai &amp; Simpan ke Rapor</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
