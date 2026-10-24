import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
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

interface Props {
  week?: string | number;
  day?: string;
}

export default function TutorTeachingStudioPage({ week, day }: Props) {
  const weekNum = parseInt(String(week || 1), 10) || 1;
  const dayKey = (day || "jumat").toLowerCase();

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
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#FDFBF7] text-black flex flex-col font-sans antialiased">
      {/* ======================================================== */}
      {/* 1. QUIET TOP CONTEXT BAR (NEO-BRUTALISM)                 */}
      {/* ======================================================== */}
      <header className="bg-white border-b-2.5 border-black px-4 sm:px-6 lg:px-8 py-3 sticky top-14 z-30 shadow-[0_3px_0px_#000000]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Back & Topic */}
          <div className="flex items-center space-x-3">
            <Link
              href="/tutor/dashboard"
              className="px-3 py-1 bg-white hover:bg-[#FEF08A] text-black border-2 border-black font-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>DASHBOARD</span>
            </Link>
            <span className="text-black font-black text-sm">/</span>
            <div className="flex items-center space-x-2">
              <span className="font-black text-black uppercase tracking-tight text-sm">
                Pekan {weekNum} &bull; Studio Mengajar {dayKey === "jumat" ? "Jumat" : "Sabtu"}
              </span>
              <span className="text-black font-bold hidden md:inline">&bull;</span>
              <span className="text-stone-700 font-bold hidden md:inline">
                Sesi Tatap Muka Interaktif 1-on-1
              </span>
            </div>
          </div>

          {/* Right: Presence & Status */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-black text-xs font-black bg-[#86EFAC] px-3.5 py-1.5 border-2 border-black shadow-[2px_2px_0px_#000]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 border border-black inline-block animate-pulse" />
              <span className="uppercase text-[11px] tracking-wide">Siswa: Andi Pratama (Terhubung)</span>
            </div>

            {isSessionMarkedDone ? (
              <span className="px-3.5 py-1.5 bg-[#86EFAC] text-black border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-black flex items-center space-x-1.5 uppercase">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Sesi Tuntas</span>
              </span>
            ) : (
              <button
                onClick={handleCompleteSession}
                className="px-3.5 py-1.5 border-2 border-black bg-[#FACC15] hover:bg-yellow-400 text-black text-xs font-black shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer uppercase tracking-tight"
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
          <div className="bg-[#FEF08A] text-black border-2.5 border-black px-4 py-3 shadow-[4px_4px_0px_#000] text-xs flex items-center justify-between animate-fadeIn font-bold">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-4 h-4 text-black shrink-0" />
              <span className="font-black">{pushStatus}</span>
            </div>
            <button
              onClick={() => setPushStatus(null)}
              className="text-black font-black uppercase text-[11px] px-2 py-0.5 border border-black hover:bg-black hover:text-white transition cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. PROMINENT 4-STEP TABS BAR (TUTOR STEERING CONTROL)    */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-5">
        <div className="bg-white border-2.5 border-black p-2.5 shadow-[4px_4px_0px_#000] flex flex-wrap items-center justify-between gap-3">
          {/* 4 Discrete Tabs */}
          <div className="flex items-center gap-2 flex-1 min-w-[320px]">
            {[
              { id: 1, label: "1. Tantangan Awal", icon: <Target className="w-4 h-4 stroke-[2.5]" /> },
              { id: 2, label: "2. Pembelajaran Interaktif", icon: <BookOpen className="w-4 h-4 stroke-[2.5]" /> },
              { id: 3, label: "3. Kuis Logika (10 Soal)", icon: <FileQuestion className="w-4 h-4 stroke-[2.5]" /> },
              { id: 4, label: "4. Refleksi & Hasil", icon: <Award className="w-4 h-4 stroke-[2.5]" /> },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const isDirectedToStudent = liveSync.currentStep === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleSwitchTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-black transition-all cursor-pointer border-2 ${
                    isActive
                      ? "bg-[#FACC15] text-black border-black shadow-[3px_3px_0px_#000] translate-x-[-1px] translate-y-[-1px]"
                      : "bg-white text-black border-transparent hover:border-black hover:bg-stone-50"
                  }`}
                >
                  <span className={isActive ? "text-black" : "text-stone-500"}>
                    {tab.icon}
                  </span>
                  <span className="uppercase tracking-tight">{tab.label}</span>

                  {isDirectedToStudent && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] border border-black inline-block ml-1" title="Layar siswa aktif di tab ini" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Steer Indicator */}
          <div className="text-xs font-black px-3.5 py-1.5 bg-[#86EFAC] text-black border-2 border-black shadow-[2px_2px_0px_#000] flex items-center space-x-2">
            <span className="text-[10px] uppercase font-bold text-stone-700">Layar Siswa:</span>
            <span className="flex items-center space-x-1.5 uppercase tracking-tight text-[11px]">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span>Aktif di Tab {liveSync.currentStep || 1}</span>
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
            <section className="lg:col-span-5 bg-white border-2.5 border-black p-6 shadow-[4px_4px_0px_#000] space-y-5">
              <div className="space-y-1.5">
                <span className="text-[11px] font-black text-black bg-[#86EFAC] px-2 py-0.5 border border-black inline-block uppercase tracking-wider">
                  Tahap 1 &bull; Tantangan Awal Siswa
                </span>
                <h2 className="text-2xl font-black text-black tracking-tight leading-snug">
                  Observasi Diagnostik Nalar
                </h2>
                <p className="text-xs text-stone-700 leading-relaxed font-bold">
                  Biarkan Andi mencoba memecahkan masalah ini secara mandiri terlebih dahulu. Amati bagaimana ia merangkai logika variabel, kalkulasi, dan fungsi cetak sebelum Anda masuk ke penjelasan teori.
                </p>
              </div>

              {/* Soal Tantangan yang Ditugaskan */}
              <div className="p-4 bg-[#FEF08A] border-2 border-black shadow-[2px_2px_0px_#000] space-y-2">
                <span className="text-xs font-black text-black flex items-center space-x-1.5 uppercase">
                  <Target className="w-4 h-4 stroke-[2.5]" />
                  <span>Tantangan yang Dilihat Siswa:</span>
                </span>
                <p className="text-xs text-black font-bold leading-relaxed">
                  {sessionItem.practiceChallenge ||
                    "Buat kartu biodata digital dengan nama, hobi, dan cita-cita menggunakan format teks berbingkai ASCII rapi."}
                </p>
                <div className="pt-1 text-[11px] text-black font-mono font-bold bg-white/70 p-2 border border-black">
                  Ekspektasi: {sessionItem.expectedOutputDesc || "Kartu identitas berbingkai rapi tercetak di konsol."}
                </div>
              </div>

              {/* Catatan Pedagogis */}
              <div className="p-4 bg-white border-2 border-black shadow-[2px_2px_0px_#000] text-xs space-y-2">
                <span className="font-black text-black block uppercase text-[11px] tracking-wide bg-stone-100 p-1 border border-black">
                  Poin Observasi Tutor:
                </span>
                <ul className="list-disc list-inside space-y-1 text-black font-bold leading-relaxed">
                  <li>Apakah siswa memahami alur eksekusi baris demi baris dari atas ke bawah?</li>
                  <li>Apakah sintaksis print() ditulis benar (huruf kecil &amp; tanda petik genap)?</li>
                  <li>Apakah penggunaan variabel string atau f-string diterapkan dengan tepat?</li>
                </ul>
              </div>

              {/* Action Button: Maju ke Tab 2 */}
              <div className="pt-2">
                <button
                  onClick={() => handleSwitchTab(2)}
                  className="w-full py-3.5 bg-[#FACC15] hover:bg-yellow-400 text-black border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-xs font-black transition-all flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-tight"
                >
                  <span>Arahkan Siswa ke Tab 2: Pembelajaran Interaktif</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </section>

            {/* Right 7/12: Live Inspector Layar Andi */}
            <section className="lg:col-span-7 bg-white border-2.5 border-black p-6 shadow-[4px_4px_0px_#000] space-y-5">
              <div className="flex items-center justify-between text-xs border-b-2 border-black pb-3">
                <div className="flex items-center space-x-2 font-black text-black uppercase">
                  <Eye className="w-4 h-4 stroke-[2.5]" />
                  <span className="text-sm">Layar Kerja Andi Pratama (Live Inspector)</span>
                </div>
                <div className="flex items-center space-x-1.5 font-black text-xs bg-[#86EFAC] px-2 py-0.5 border border-black">
                  <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                  <span className="uppercase text-[10px]">Tersinkron Realtime</span>
                </div>
              </div>

              {/* Live Student Editor Snapshot */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-black text-black uppercase tracking-wider block font-mono">
                  Kode yang Sedang Diketik Andi:
                </span>
                <div className="border-2 border-black bg-stone-900 p-4 text-xs text-white min-h-[220px] max-h-[300px] overflow-y-auto font-mono leading-relaxed shadow-[3px_3px_0px_#000]">
                  <pre className="whitespace-pre-wrap">{liveSync.studentLiveCode || "# Menunggu Andi mengetik kode di editornya..."}</pre>
                </div>
              </div>

              {/* Live Student Terminal Output */}
              <div className="p-3.5 bg-[#FEF08A] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-between text-xs text-black">
                <div className="flex items-center space-x-2 font-mono">
                  <Terminal className="w-4 h-4 stroke-[2.5]" />
                  <span className="font-black uppercase">Luaran Program Siswa:</span>
                  <span className="font-bold truncate max-w-sm">
                    {liveSync.studentExecutionOutput || "Menunggu siswa menekan 'Jalankan Kode'..."}
                  </span>
                </div>
                {liveSync.studentOutputSuccess !== null && (
                  <span
                    className={
                      liveSync.studentOutputSuccess
                        ? "bg-[#86EFAC] text-black px-2 py-0.5 border border-black font-black uppercase text-[10px]"
                        : "bg-[#FCA5A5] text-black px-2 py-0.5 border border-black font-black uppercase text-[10px]"
                    }
                  >
                    {liveSync.studentOutputSuccess ? "BERHASIL" : "ERROR"}
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
            <section className="lg:col-span-5 bg-white border-2.5 border-black p-6 shadow-[4px_4px_0px_#000] space-y-5">
              <div className="space-y-1.5">
                <span className="text-[11px] font-black text-black bg-[#FED7AA] px-2 py-0.5 border border-black inline-block uppercase tracking-wider">
                  Tahap 2 &bull; Pembelajaran Interaktif
                </span>
                <h2 className="text-2xl font-black text-black tracking-tight leading-snug">
                  Materi &amp; Uji Coba Terbimbing
                </h2>
                <p className="text-xs text-stone-700 leading-relaxed font-bold">
                  Pilih sub-materi di bawah untuk memandu Andi langkah demi langkah. Di setiap sub-materi, siapkan kode peraga dan pantau latihan mandirinya.
                </p>
              </div>

              {/* 3 Sub-Material Selector */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-black text-black uppercase tracking-wider block">
                  Pilih Sub-Materi Aktif:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {subMaterials.map((sub) => (
                    <button
                      key={sub.sub}
                      onClick={() => handleSelectSubStep(sub.sub)}
                      className={`py-2 px-2.5 text-xs font-black transition-all cursor-pointer text-center border-2 border-black ${
                        activeSubStep === sub.sub
                          ? "bg-[#FACC15] text-black shadow-[3px_3px_0px_#000] translate-x-[-1px] translate-y-[-1px]"
                          : "bg-white text-black hover:bg-stone-50 shadow-[1px_1px_0px_#000]"
                      }`}
                    >
                      SUB {sub.sub}
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-[#FEF08A] border-2 border-black shadow-[2px_2px_0px_#000] text-xs space-y-1">
                  <span className="font-black text-black block text-sm">{currentSub.title}</span>
                  <p className="text-black font-bold leading-relaxed">{currentSub.concept}</p>
                </div>
              </div>

              {/* Tutor Talking Points: Bedah Fungsi & Mekanisme Internal */}
              {currentSub.functionsExplained && currentSub.functionsExplained.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t-2 border-black">
                  <div className="flex items-center space-x-1.5 text-xs font-black text-black uppercase">
                    <Cpu className="w-4 h-4 stroke-[2.5]" />
                    <span>Bedah Fungsi untuk Dijelaskan:</span>
                  </div>
                  <div className="space-y-2">
                    {currentSub.functionsExplained.map((fn, idx) => (
                      <div key={idx} className="p-3 bg-white border-2 border-black shadow-[2px_2px_0px_#000] text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <code className="font-mono font-black text-black text-sm">{fn.name}</code>
                          <span className="text-[10px] bg-[#86EFAC] px-2 py-0.5 border border-black font-black uppercase">
                            {fn.role}
                          </span>
                        </div>
                        <p className="text-black font-bold text-[11px] leading-relaxed">
                          <strong>Cara Kerja:</strong> {fn.howItWorks}
                        </p>
                        <p className="text-stone-800 font-bold text-[11px] leading-relaxed bg-stone-100 p-1.5 border border-black">
                          <strong>Aturan Emas:</strong> {fn.importantRules[0]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tutor Talking Points: Bedah Variabel & Alokasi RAM */}
              {currentSub.variablesExplained && currentSub.variablesExplained.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t-2 border-black">
                  <div className="flex items-center space-x-1.5 text-xs font-black text-black uppercase">
                    <Layers className="w-4 h-4 stroke-[2.5]" />
                    <span>Bedah Variabel &amp; Alokasi RAM:</span>
                  </div>
                  <div className="space-y-2">
                    {currentSub.variablesExplained.map((v, idx) => (
                      <div key={idx} className="p-3 bg-[#FEF08A] border-2 border-black shadow-[2px_2px_0px_#000] text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <code className="font-mono font-black text-black text-sm">{v.name}</code>
                          <span className="text-[10px] bg-white px-2 py-0.5 border border-black font-mono font-black">
                            {v.type} &bull; Nilai: {v.value}
                          </span>
                        </div>
                        <p className="text-black font-bold text-[11px] leading-relaxed">
                          <strong>Di Memori:</strong> {v.memoryRole}
                        </p>
                        <p className="text-stone-800 font-bold text-[11px] leading-relaxed">{v.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tutor Talking Points: Alur Eksekusi Baris demi Baris */}
              {currentSub.lineByLine && currentSub.lineByLine.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t-2 border-black">
                  <div className="flex items-center space-x-1.5 text-xs font-black text-black uppercase">
                    <ListOrdered className="w-4 h-4 stroke-[2.5]" />
                    <span>Panduan Alur Baris demi Baris:</span>
                  </div>
                  <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
                    {currentSub.lineByLine.map((line, idx) => (
                      <div key={idx} className="p-2.5 bg-white border-2 border-black shadow-[2px_2px_0px_#000] text-[11px] space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="px-1.5 py-0.5 bg-[#FACC15] text-black font-mono text-[10px] font-black border border-black">
                            BARIS {line.line}
                          </span>
                          <code className="font-mono text-black font-bold truncate">{line.code}</code>
                        </div>
                        <p className="text-stone-800 font-bold pl-1 leading-relaxed">{line.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handlePushCode}
                  className="w-full py-3 bg-[#4ADE80] hover:bg-green-400 text-black font-black text-xs border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-tight"
                >
                  <Send className="w-4 h-4 stroke-[2.5]" />
                  <span>Kirim Kode Peraga ke Layar Siswa</span>
                </button>

                <button
                  onClick={() => handleSwitchTab(3)}
                  className="w-full py-3 bg-white hover:bg-stone-50 text-black border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none font-black text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-tight"
                >
                  <span>Lanjut ke Tab 3: Kuis Logika (10 Soal)</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </section>

            {/* Right 7/12: Editor Kode Peraga + Live Monitor Latihan */}
            <section className="lg:col-span-7 space-y-5">
              {/* Tutor Code Broadcast Editor */}
              <div className="bg-white border-2.5 border-black overflow-hidden shadow-[4px_4px_0px_#000] flex flex-col">
                <div className="px-5 py-3 border-b-2 border-black bg-[#FEF08A] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-black text-black font-mono block text-sm uppercase">
                      Kode Peraga Mentor (Sub {activeSubStep})
                    </span>
                    <span className="text-[11px] text-stone-800 font-bold">
                      Anda dapat mengubah kode ini sebelum menekan &ldquo;Kirim ke Layar Siswa&rdquo;.
                    </span>
                  </div>

                  <button
                    onClick={handlePushCode}
                    className="px-4 py-1.5 bg-[#4ADE80] hover:bg-green-400 text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 uppercase"
                  >
                    <Send className="w-3.5 h-3.5 stroke-[2.5]" />
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
              <div className="bg-white border-2.5 border-black p-5 shadow-[4px_4px_0px_#000] space-y-3">
                <div className="flex items-center justify-between text-xs border-b-2 border-black pb-2.5">
                  <div className="flex items-center space-x-2 font-black text-black uppercase">
                    <Eye className="w-4 h-4 stroke-[2.5]" />
                    <span className="text-sm">Latihan Uji Coba Mandiri Andi (Live Monitor)</span>
                  </div>
                  <span className="text-[10px] bg-[#86EFAC] px-2 py-0.5 border border-black font-black uppercase">Tersambung Realtime</span>
                </div>

                <div className="border-2 border-black bg-stone-900 p-3.5 text-xs text-white max-h-[160px] overflow-y-auto font-mono leading-relaxed shadow-[2px_2px_0px_#000]">
                  <pre className="whitespace-pre-wrap">{liveSync.studentLiveCode || "# Siswa sedang menyiapkan workspace..."}</pre>
                </div>

                <div className="p-3 bg-[#FEF08A] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-between text-xs text-black">
                  <div className="flex items-center space-x-2 font-mono">
                    <Terminal className="w-4 h-4 stroke-[2.5]" />
                    <span className="font-black uppercase">Output Program Siswa:</span>
                    <span className="font-bold truncate max-w-sm">
                      {liveSync.studentExecutionOutput || "Menunggu siswa menjalankan program..."}
                    </span>
                  </div>
                  {liveSync.studentOutputSuccess !== null && (
                    <span
                      className={
                        liveSync.studentOutputSuccess
                          ? "bg-[#86EFAC] text-black px-2 py-0.5 border border-black font-black uppercase text-[10px]"
                          : "bg-[#FCA5A5] text-black px-2 py-0.5 border border-black font-black uppercase text-[10px]"
                      }
                    >
                      {liveSync.studentOutputSuccess ? "BERHASIL" : "ERROR"}
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
            <section className="lg:col-span-5 bg-white border-2.5 border-black p-6 shadow-[4px_4px_0px_#000] space-y-5">
              <div className="space-y-1.5">
                <span className="text-[11px] font-black text-black bg-[#FDE047] px-2 py-0.5 border border-black inline-block uppercase tracking-wider">
                  Tahap 3 &bull; Kuis Logika 10 Soal
                </span>
                <h2 className="text-2xl font-black text-black tracking-tight leading-snug">
                  Monitor Evaluasi Siswa
                </h2>
                <p className="text-xs text-stone-700 leading-relaxed font-bold">
                  Kuis ini menguji 10 konsep penalaran Python dengan tingkat kesulitan menengah. Anda dapat memantau jawaban Andi secara langsung saat ia memilih opsi.
                </p>
              </div>

              {/* Metrik Pengerjaan */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_#000] text-center space-y-1">
                  <span className="text-[10px] text-stone-600 uppercase font-black block">
                    TERJAWAB
                  </span>
                  <span className="text-2xl font-black text-black block">
                    {answeredQuizCount} / 10 Soal
                  </span>
                </div>

                <div className="p-4 bg-[#86EFAC] border-2 border-black shadow-[3px_3px_0px_#000] text-center space-y-1">
                  <span className="text-[10px] text-black uppercase font-black block">
                    BENAR / SKOR
                  </span>
                  <span className="text-2xl font-black text-black block">
                    {correctQuizCount} / 10 ({Math.round((correctQuizCount / 10) * 100)}%)
                  </span>
                </div>
              </div>

              {/* Action: Lanjut ke Refleksi */}
              <div className="pt-2">
                <button
                  onClick={() => handleSwitchTab(4)}
                  className="w-full py-3.5 bg-[#FACC15] hover:bg-yellow-400 text-black border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-xs font-black transition-all flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-tight"
                >
                  <span>Arahkan Siswa ke Tab 4: Refleksi &amp; Penuntasan</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </section>

            {/* Right 7/12: 10 Grid Questions Live Tracker */}
            <section className="lg:col-span-7 bg-white border-2.5 border-black p-6 shadow-[4px_4px_0px_#000] space-y-5">
              <div className="flex items-center justify-between text-xs border-b-2 border-black pb-3">
                <span className="font-black text-black uppercase text-sm">
                  Status Jawaban Realtime Andi Pratama
                </span>
                <span className="text-[10px] bg-stone-100 px-2 py-0.5 border border-black font-bold uppercase">
                  Websocket Realtime
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
                      className={`h-12 flex flex-col items-center justify-center text-xs font-black transition-all border-2 border-black shadow-[2px_2px_0px_#000] ${
                        !isAnswered
                          ? "bg-white text-stone-400"
                          : isCorrect
                          ? "bg-[#86EFAC] text-black"
                          : "bg-[#FCA5A5] text-black"
                      }`}
                    >
                      <span className="text-sm">{q.id}</span>
                      <span className="text-[9px] uppercase font-black">
                        {!isAnswered ? "-" : isCorrect ? "BENAR" : "SALAH"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Ringkasan Pembahasan Tiap Nomor */}
              <div className="space-y-3 pt-2">
                <span className="text-[11px] font-black text-black uppercase tracking-wider block">
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
                        className="p-3 bg-white border-2 border-black shadow-[2px_2px_0px_#000] text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-black text-black">
                            Soal #{q.id}: {q.question.slice(0, 50)}...
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 border border-black font-black uppercase ${
                              !isAnswered
                                ? "bg-stone-100 text-stone-600"
                                : isCorrect
                                ? "bg-[#86EFAC] text-black"
                                : "bg-[#FCA5A5] text-black"
                            }`}
                          >
                            {!isAnswered
                              ? "Belum Dijawab"
                              : isCorrect
                              ? "Andi Tepat"
                              : "Andi Keliru"}
                          </span>
                        </div>
                        <p className="text-stone-700 font-bold text-[11px]">{q.explanation}</p>
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
          <div className="w-full bg-white border-2.5 border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000] space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="w-14 h-14 bg-[#FEF08A] text-black border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 stroke-[2.5]" />
              </span>
              <span className="text-[11px] font-black text-black bg-[#86EFAC] px-2.5 py-0.5 border border-black inline-block uppercase tracking-wider">
                Tahap 4 &bull; Refleksi &amp; Penutupan Sesi
              </span>
              <h1 className="text-3xl font-black text-black tracking-tight uppercase">
                Penuntasan Sesi Mengajar 2 Jam
              </h1>
              <p className="text-xs text-stone-700 max-w-md mx-auto leading-relaxed font-bold">
                Seluruh tahapan dari Tantangan Awal, 3 Sub-Materi Interaktif, hingga Kuis 10 Soal telah dijalankan bersama Andi Pratama.
              </p>
            </div>

            {/* Score Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_#000] text-center space-y-1">
                <span className="text-[10px] text-stone-600 uppercase font-black block">
                  Akurasi Kuis Logika Andi
                </span>
                <span className="text-3xl font-black text-black block">
                  {correctQuizCount} / 10 Soal
                </span>
                <span className="text-xs text-black font-bold bg-[#FEF08A] px-2 py-0.5 border border-black inline-block">
                  {Math.round((correctQuizCount / 10) * 100)}% Nilai Akhir
                </span>
              </div>

              <div className="p-4 bg-[#FEF08A] border-2 border-black shadow-[3px_3px_0px_#000] text-center space-y-1">
                <span className="text-[10px] text-black uppercase font-black block">
                  Reward Tambahan Siswa
                </span>
                <span className="text-3xl font-black text-black block">
                  +50 XP
                </span>
                <span className="text-xs text-black font-bold bg-white px-2 py-0.5 border border-black inline-block">
                  Bonus Kehadiran &amp; Ketuntasan
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleGiveStar}
                className="flex-1 py-3.5 bg-[#FEF08A] hover:bg-yellow-300 border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-black font-black text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-tight"
              >
                <Award className="w-4 h-4 stroke-[2.5]" />
                <span>{appreciationSent ? "XP Terkirim! (+50 XP)" : "Beri Apresiasi Poin (+50 XP)"}</span>
              </button>

              <button
                onClick={handleCompleteSession}
                className="flex-1 py-3.5 bg-[#4ADE80] hover:bg-green-400 border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-black font-black text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-tight"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Tandai Selesai &amp; Simpan ke Rapor</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
