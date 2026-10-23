"use client";

import React, { useState, use, useEffect } from "react";
import Link from "next/link";
import { CURRICULUM_DATA } from "@/data/curriculum";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { useSession } from "@/lib/auth/sessionContext";
import { LIVE_QUIZ_QUESTIONS } from "@/data/liveQuizQuestions";
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
  HelpCircle,
  FileQuestion,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function TutorTeachingStudioPage({
  params,
}: {
  params: Promise<{ week: string; day: string }>;
}) {
  const resolvedParams = use(params);
  const weekNum = parseInt(resolvedParams.week, 10) || 4;
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

  const activeStep = liveSync.currentStep || 1;
  const activeSubStep = liveSync.subStep || 1;

  // Sub-materials for Step 2
  const subMaterials = [
    {
      sub: 1,
      title: "Sub 1: Fondasi 'def' & Parameter",
      concept:
        "Jelaskan fungsi sebagai mesin terisolasi yang menerima parameter masukan dan menghasilkan luaran.",
      demoCode: `# Sub 1: Fungsi Berparameter
def sapa_siswa(nama, pekan):
    return f"Halo {nama}, selamat belajar di Pekan {pekan}!"

pesan = sapa_siswa("Andi", 4)
print(pesan)`,
    },
    {
      sub: 2,
      title: "Sub 2: 'return' vs 'print()'",
      concept:
        "Tegaskan bahwa 'return' mengembalikan nilai ke pemanggil fungsi agar dapat disimpan atau dihitung kembali.",
      demoCode: `# Sub 2: Return Nilai Kalkulasi
def hitung_diskon(total):
    if total >= 100000:
        return total * 0.1
    return 0

belanja = 125000
diskon = hitung_diskon(belanja)
print(f"Total: {belanja}, Diskon: {diskon}")`,
    },
    {
      sub: 3,
      title: "Sub 3: Scope Variabel & Modul Random",
      concept:
        "Bahas variabel lokal yang tidak bocor ke luar, dan demonstrasikan pemanggilan random.choice().",
      demoCode: `# Sub 3: Scope & Modul Random
import random

pilihan = ["Batu", "Gunting", "Kertas"]

def bot_pilih():
    return random.choice(pilihan)

print("Pilihan Komputer:", bot_pilih())`,
    },
  ];

  const currentSub = subMaterials[activeSubStep - 1] || subMaterials[0];

  const [tutorCode, setTutorCode] = useState<string>(currentSub.demoCode);
  const [pushStatus, setPushStatus] = useState<string | null>(null);
  const [appreciationSent, setAppreciationSent] = useState<boolean>(false);
  const [isSessionMarkedDone, setIsSessionMarkedDone] = useState<boolean>(false);

  // When tutor changes subStep, update tutorCode preview
  const handleSelectSubStep = async (sub: number) => {
    const selected = subMaterials[sub - 1] || subMaterials[0];
    setTutorCode(selected.demoCode);
    await updateLiveSync({
      subStep: sub,
      pushedCode: selected.demoCode,
      tutorNote: selected.concept,
    });
  };

  // Push code to student's screen
  const handlePushCode = () => {
    pushCodeToStudent(tutorCode);
    setPushStatus("Kode peraga berhasil disinkronkan ke layar editor Andi.");
    setTimeout(() => setPushStatus(null), 3500);
  };

  // Advance session step
  const handleAdvanceStep = async (nextStep: number) => {
    let title = "";
    let note = "";
    if (nextStep === 1) {
      title = "Tahap 1: Tantangan Uji Coba Awal";
      note = "Silakan coba selesaikan tantangan awal di bawah. Mentor memantau caramu berpikir dan menulis kode.";
    } else if (nextStep === 2) {
      title = "Tahap 2: Pembelajaran Interaktif & Uji Coba Koding";
      note = subMaterials[0].concept;
      setTutorCode(subMaterials[0].demoCode);
    } else if (nextStep === 3) {
      title = "Tahap 3: Kuis Pemahaman Logika (10 Soal)";
      note = "Jawab 10 soal evaluasi logika koding berikut secara mandiri.";
    } else {
      title = "Tahap 4: Refleksi & Penuntasan Sesi";
      note = "Sesi pembelajaran hari ini telah tuntas dengan sangat baik.";
    }

    await tutorAdvanceStep(nextStep, 1, title, note);
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
    handleAdvanceStep(4);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
    });
  };

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
                Fungsi Modular (def &amp; return)
              </span>
            </div>
          </div>

          {/* Right: Presence & Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-stone-600 text-xs font-medium">
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
      {/* 2. MAIN 2-COLUMN WORKSPACE (5 : 7)                       */}
      {/* ======================================================== */}
      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ======================================================== */}
        {/* LEFT COLUMN (5/12): KONTROL ALUR MENGAJAR OLEH TUTOR     */}
        {/* ======================================================== */}
        <section className="lg:col-span-5 bg-white border border-stone-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-stone-900 tracking-tight">
                Kendali Alur Belajar
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-semibold border border-indigo-100">
                Tutor Mengarahkan Siswa
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Pilih tahap pembelajaran di bawah. Layar siswa akan langsung berpindah secara otomatis mengikuti arahan Anda.
            </p>
          </div>

          {/* 4 Tahap Bimbingan Interaktif */}
          <div className="space-y-3">
            {/* TAHAP 1 */}
            <div
              onClick={() => handleAdvanceStep(1)}
              className={`p-4 rounded-xl border transition-all cursor-pointer space-y-1 ${
                activeStep === 1
                  ? "bg-stone-50 border-stone-900 shadow-2xs ring-2 ring-stone-900/10"
                  : "bg-white border-stone-200/70 hover:border-stone-300 text-stone-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">
                  1. Tantangan Uji Coba Awal
                </span>
                <span className="text-[11px] text-stone-500 font-medium">Uji Nalar</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Siswa mencoba tantangan awal di editornya terlebih dahulu untuk memetakan pemahaman sebelum mentor masuk ke teori.
              </p>
            </div>

            {/* TAHAP 2 */}
            <div
              onClick={() => handleAdvanceStep(2)}
              className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                activeStep === 2
                  ? "bg-stone-50 border-stone-900 shadow-2xs ring-2 ring-stone-900/10"
                  : "bg-white border-stone-200/70 hover:border-stone-300 text-stone-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">
                  2. Pembelajaran Interaktif (Per Sub-Materi)
                </span>
                <span className="text-[11px] text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
                  3 Sub-Materi
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Penjelasan teori bertahap yang diselingi uji coba koding langsung di setiap sub-materinya.
              </p>

              {/* Sub-Material Tabs (Active when Step 2) */}
              {activeStep === 2 && (
                <div className="pt-2 border-t border-stone-200/70 space-y-1.5">
                  <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
                    Pilih Sub-Materi untuk Ditayangkan:
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {subMaterials.map((sub) => (
                      <button
                        key={sub.sub}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectSubStep(sub.sub);
                        }}
                        className={`py-1.5 px-2 rounded-lg text-[11px] font-medium transition cursor-pointer text-center ${
                          activeSubStep === sub.sub
                            ? "bg-stone-900 text-white font-semibold"
                            : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
                        }`}
                      >
                        Sub {sub.sub}
                      </button>
                    ))}
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-stone-200 text-xs text-stone-700">
                    <span className="font-semibold block text-stone-900">
                      {currentSub.title}
                    </span>
                    <span className="text-stone-500 text-[11px]">{currentSub.concept}</span>
                  </div>
                </div>
              )}
            </div>

            {/* TAHAP 3 */}
            <div
              onClick={() => handleAdvanceStep(3)}
              className={`p-4 rounded-xl border transition-all cursor-pointer space-y-1 ${
                activeStep === 3
                  ? "bg-stone-50 border-stone-900 shadow-2xs ring-2 ring-stone-900/10"
                  : "bg-white border-stone-200/70 hover:border-stone-300 text-stone-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">
                  3. Kuis Pemahaman Logika (10 Soal)
                </span>
                <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                  Tingkat Menengah
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Kuis evaluasi pemahaman nalar logika 10 soal. Progres dan nilai Andi terlihat secara live di layar Anda.
              </p>
            </div>

            {/* TAHAP 4 */}
            <div
              onClick={() => handleAdvanceStep(4)}
              className={`p-4 rounded-xl border transition-all cursor-pointer space-y-1 ${
                activeStep === 4
                  ? "bg-stone-50 border-stone-900 shadow-2xs ring-2 ring-stone-900/10"
                  : "bg-white border-stone-200/70 hover:border-stone-300 text-stone-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">
                  4. Refleksi &amp; Penuntasan Sesi
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  Apresiasi XP
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Evaluasi akhir, pemberian poin apresiasi, dan penyimpanan catatan belajar ke rapor orang tua.
              </p>
            </div>
          </div>

          {/* Quick Actions Footer */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
            <button
              onClick={handleGiveStar}
              className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-semibold text-xs transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-700" />
              <span>{appreciationSent ? "XP Terkirim! (+50 XP)" : "Beri Apresiasi (+50 XP)"}</span>
            </button>

            {activeStep < 4 ? (
              <button
                onClick={() => handleAdvanceStep(activeStep + 1)}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition flex items-center space-x-1.5 shadow-2xs cursor-pointer"
              >
                <span>Arahkan ke Tahap {activeStep + 1}</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
              </button>
            ) : (
              <button
                onClick={handleCompleteSession}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition flex items-center space-x-1.5 shadow-2xs cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Tuntaskan Sesi</span>
              </button>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* RIGHT COLUMN (7/12): KODE PERAGA & LIVE INSPECTOR SISWA  */}
        {/* ======================================================== */}
        <section className="lg:col-span-7 space-y-6">
          {/* Card 1: Tutor Broadcast Code Editor */}
          <div className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col">
            <div className="px-5 py-3 border-b border-stone-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-stone-900 font-mono block">
                  Kode Peraga Mentor
                </span>
                <span className="text-[11px] text-stone-500">
                  Kirimkan kode ini langsung ke layar editor Andi Pratama.
                </span>
              </div>

              <button
                onClick={handlePushCode}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition flex items-center space-x-2 shadow-2xs cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kirim ke Layar Siswa</span>
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

          {/* Card 2: Live Inspector Layar Kerja Andi Pratama */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 font-medium text-stone-800">
                <Eye className="w-4 h-4 text-stone-500" />
                <span className="font-semibold">Layar Kerja Andi Pratama (Live Inspector)</span>
              </div>
              <div className="flex items-center space-x-1.5 text-stone-500 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span>Tersinkron Realtime</span>
              </div>
            </div>

            {/* Read-only snapshot of student's editor */}
            <div className="rounded-xl border border-stone-200/70 bg-stone-50/70 p-3.5 text-xs text-stone-800 max-h-[160px] overflow-y-auto font-mono leading-relaxed">
              <pre className="whitespace-pre-wrap">{liveSync.studentLiveCode || "Siswa sedang menyiapkan workspace..."}</pre>
            </div>

            {/* Output Program Siswa */}
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
                      ? "text-emerald-700 font-semibold text-xs flex items-center space-x-1"
                      : "text-rose-700 font-semibold text-xs flex items-center space-x-1"
                  }
                >
                  {liveSync.studentOutputSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Berhasil</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Error</span>
                    </>
                  )}
                </span>
              )}
            </div>

            {/* Live Quiz Tracker (Visible in Step 3) */}
            {activeStep === 3 && (
              <div className="pt-3 border-t border-stone-200/70 space-y-2">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-stone-900 font-semibold flex items-center space-x-1.5">
                    <FileQuestion className="w-4 h-4 text-indigo-600" />
                    <span>Progress Kuis Logika Andi (10 Soal)</span>
                  </span>
                  <span className="text-stone-600">
                    Terjawab: {Object.keys(liveSync.studentQuizAnswers || {}).length} / 10 Soal
                  </span>
                </div>

                <div className="grid grid-cols-10 gap-1">
                  {LIVE_QUIZ_QUESTIONS.map((q) => {
                    const ans = liveSync.studentQuizAnswers?.[q.id];
                    const isAnswered = ans !== undefined;
                    const isCorrect = ans === q.correctAnswerIndex;

                    return (
                      <div
                        key={q.id}
                        className={`h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                          !isAnswered
                            ? "bg-stone-100 text-stone-400 border border-stone-200"
                            : isCorrect
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                            : "bg-rose-50 text-rose-800 border border-rose-300"
                        }`}
                        title={`Soal ${q.id}: ${
                          !isAnswered ? "Belum dijawab" : isCorrect ? "Benar" : "Salah"
                        }`}
                      >
                        {q.id}
                      </div>
                    );
                  })}
                </div>

                {liveSync.quizSubmitted && (
                  <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 flex items-center justify-between">
                    <span>Kuis telah dikumpulkan oleh Andi.</span>
                    <strong className="font-bold">
                      Skor Akhir: {liveSync.studentQuizScore} / 100
                    </strong>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
