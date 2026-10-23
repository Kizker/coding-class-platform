"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { CURRICULUM_DATA } from "@/data/curriculum";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { useSession } from "@/lib/auth/sessionContext";
import {
  Send,
  Sparkles,
  Star,
  CheckCircle2,
  Clock,
  Eye,
  ArrowRight,
  BookOpen,
  Award,
  Terminal,
} from "lucide-react";

export default function TutorTeachingStudioPage({
  params,
}: {
  params: Promise<{ week: string; day: string }>;
}) {
  const resolvedParams = use(params);
  const weekNum = parseInt(resolvedParams.week, 10) || 1;
  const dayKey = (resolvedParams.day || "jumat").toLowerCase();

  const { pushCodeToStudent, studentLiveCode, progress, updateProgress } = useSession();

  const weekData = CURRICULUM_DATA.find((w) => w.week === weekNum) || CURRICULUM_DATA[0];
  const sessionData =
    weekData.liveSessions.find((s) => s.day === dayKey) ||
    weekData.liveSessions[0] || {
      id: `live-default`,
      day: dayKey as any,
      sessionNumber: 1,
      title: "Sesi Tatap Muka Langsung",
      durationMinutes: 120,
      conceptIntro: "Materi inti pembelajaran 2 jam.",
      guidedSteps: [],
      practiceChallenge: "Latihan langsung bersama siswa.",
      studentStarterCode: "# Kode latihan siswa",
      expectedOutputDesc: "Output yang diharapkan",
    };

  // State for Tutor's demonstration code
  const [tutorCode, setTutorCode] = useState<string>(
    sessionData.guidedSteps[0]?.tutorCode ||
      `# Kode Contoh Kak Tutor:\ndef hitung_diskon(total_belanja):\n    if total_belanja >= 100000:\n        return total_belanja * 0.1\n    return 0\n\nbelanja = 120000\ndiskon = hitung_diskon(belanja)\nprint(f"Total: {belanja}, Diskon: {diskon}")`
  );

  const [activeStep, setActiveStep] = useState<number>(1);
  const [pushStatus, setPushStatus] = useState<string | null>(null);
  const [appreciationSent, setAppreciationSent] = useState<boolean>(false);
  const [isSessionMarkedDone, setIsSessionMarkedDone] = useState<boolean>(false);

  // Push code to student
  const handlePushCode = () => {
    pushCodeToStudent(tutorCode);
    setPushStatus("Kode peraga berhasil di-push ke layar Andi! 🚀");
    setTimeout(() => setPushStatus(null), 4000);
  };

  // Give Star Appreciation
  const handleGiveStar = () => {
    updateProgress({ xpPoints: progress.xpPoints + 50 });
    setAppreciationSent(true);
    setTimeout(() => setAppreciationSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Studio Header Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center space-x-3">
          <Link
            href="/tutor/dashboard"
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
          >
            &larr; Dashboard
          </Link>
          <span className="text-slate-600">|</span>
          <div className="flex items-center space-x-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-950 border border-indigo-700/60 text-indigo-300 font-bold uppercase">
              SESI TATAP MUKA 2 JAM
            </span>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
              {sessionData.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>Sisa Waktu: 01:45:00</span>
          </div>

          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/60 text-xs font-semibold text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Siswa: Andi Pratama (Online)</span>
          </div>
        </div>
      </div>

      {/* Push Notification Toast */}
      {pushStatus && (
        <div className="bg-emerald-600 text-white px-4 py-2 text-xs sm:text-sm font-semibold text-center shadow-lg animate-fadeIn">
          {pushStatus}
        </div>
      )}

      {/* Split Screen Studio */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* ================= LEFT PANE: ALUR MENGAJAR TERPANDU (TEACHING FLOW) ================= */}
        <div className="lg:col-span-5 border-r border-slate-800 bg-slate-900/60 flex flex-col justify-between overflow-y-auto p-5 sm:p-6 space-y-6">
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                ALUR 4 LANGKAH MENGAJAR TERPANDU
              </span>
              <h2 className="text-lg font-extrabold text-white mt-1 tracking-tight">
                Pedoman Mengajar Pertemuan {sessionData.sessionNumber}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {sessionData.conceptIntro}
              </p>
            </div>

            {/* Steps Accordion */}
            <div className="space-y-3 text-xs">
              {/* Langkah 1: Konsep & Analogi */}
              <div
                onClick={() => setActiveStep(1)}
                className={`p-4 rounded-xl border transition cursor-pointer ${
                  activeStep === 1
                    ? "bg-indigo-950/40 border-indigo-500/60"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between font-bold text-sm text-white mb-1.5">
                  <span className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                      1
                    </span>
                    <span>Konsep & Analogi (25 Mnt)</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Pemanasan</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Jelaskan bagaimana logika percabangan if-else bekerja menggunakan analogi rambu lalu lintas atau seleksi diskon toko.
                </p>
              </div>

              {/* Langkah 2: Kode Peraga */}
              <div
                onClick={() => setActiveStep(2)}
                className={`p-4 rounded-xl border transition cursor-pointer ${
                  activeStep === 2
                    ? "bg-indigo-950/40 border-indigo-500/60"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between font-bold text-sm text-white mb-1.5">
                  <span className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                      2
                    </span>
                    <span>Demonstrasi Kode Peraga (45 Mnt)</span>
                  </span>
                  <span className="text-[10px] text-indigo-400">Tutor Demo</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Ketik kode contoh di panel kanan, lalu tekan tombol <strong>&ldquo;Push Kode ke Siswa&rdquo;</strong> agar kode langsung masuk ke editor Andi.
                </p>
              </div>

              {/* Langkah 3: Latihan Siswa */}
              <div
                onClick={() => setActiveStep(3)}
                className={`p-4 rounded-xl border transition cursor-pointer ${
                  activeStep === 3
                    ? "bg-indigo-950/40 border-indigo-500/60"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between font-bold text-sm text-white mb-1.5">
                  <span className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                      3
                    </span>
                    <span>Praktik Mandiri Terpandu (40 Mnt)</span>
                  </span>
                  <span className="text-[10px] text-emerald-400">Siswa Mengetik</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Tantang siswa memprogram: <em>{sessionData.practiceChallenge}</em>. Pantau ketikan siswa via Live Inspector.
                </p>
              </div>

              {/* Langkah 4: Refleksi & Catatan Ortu */}
              <div
                onClick={() => setActiveStep(4)}
                className={`p-4 rounded-xl border transition cursor-pointer ${
                  activeStep === 4
                    ? "bg-indigo-950/40 border-indigo-500/60"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between font-bold text-sm text-white mb-1.5">
                  <span className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                      4
                    </span>
                    <span>Refleksi & Catatan Ortu (10 Mnt)</span>
                  </span>
                  <span className="text-[10px] text-amber-400">Evaluasi</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Beri feedback langsung, beri apresiasi bintang, dan tulis rangkuman nalar untuk dimasukkan ke rapor mingguan.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions at bottom of Left Pane */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="flex gap-2">
              <button
                onClick={handleGiveStar}
                className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{appreciationSent ? "⭐ Bintang Terkirim!" : "⭐ Beri Bintang Apresiasi (+50 XP)"}</span>
              </button>

              <Link
                href="/tutor/grading"
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center justify-center space-x-1"
              >
                <span>📝 Catatan Ortu</span>
              </Link>
            </div>

            <button
              onClick={() => setIsSessionMarkedDone(true)}
              className={`w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                isSessionMarkedDone
                  ? "bg-emerald-600 text-white"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSessionMarkedDone ? "Sesi Berhasil Diselesaikan!" : "Tandai Sesi Pertemuan Selesai"}</span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT PANE: KONTROL KODE PERAGA & LIVE MONITOR SISWA ================= */}
        <div className="lg:col-span-7 flex flex-col p-4 sm:p-6 space-y-4 bg-slate-950 overflow-y-auto">
          {/* Top Control Bar with 1-Click Push Code */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">
                EDITOR PERAGA PENGAJAR
              </span>
              <span className="text-xs text-slate-400">
                Kode yang kamu ketik di bawah dapat dikirim instan ke layar siswa.
              </span>
            </div>

            <button
              onClick={handlePushCode}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs sm:text-sm flex items-center space-x-2 shadow-xl shadow-indigo-600/40 transition hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>🚀 PUSH KODE KE EDITOR SISWA</span>
            </button>
          </div>

          {/* Tutor Code Editor */}
          <div className="min-h-[260px]">
            <CodeEditor
              value={tutorCode}
              onChange={setTutorCode}
              height="260px"
            />
          </div>

          {/* Live Student Keystrokes Inspector */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 flex items-center space-x-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                <span>LIVE VIEW LAYAR KODE SISWA (ANDI PRATAMA)</span>
              </span>
              <span className="text-[11px] text-emerald-400 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Sinkronisasi Real-Time</span>
              </span>
            </div>

            {/* Read-only snapshot of student's editor */}
            <div className="rounded-xl border border-emerald-900/50 bg-[#121820] p-3 text-xs font-mono text-emerald-300/90 max-h-[160px] overflow-y-auto leading-relaxed shadow-inner">
              <pre className="whitespace-pre-wrap">{studentLiveCode}</pre>
            </div>

            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>Output Terakhir Siswa:</span>
                <strong className="text-white font-mono">&gt;&gt; Luas Persegi Panjang: 50</strong>
              </span>
              <span className="text-emerald-400 font-semibold">Semua Tes Passed 🎉</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
