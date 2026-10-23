"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { CURRICULUM_DATA } from "@/data/curriculum";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { useSession } from "@/lib/auth/sessionContext";
import {
  Send,
  Check,
  Clock,
  Eye,
  ArrowRight,
  Terminal,
  Activity,
  CheckCircle2,
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

  const [tutorCode, setTutorCode] = useState<string>(
    sessionData.guidedSteps[0]?.tutorCode ||
      `# Kode Peraga Pengajar:\ndef hitung_diskon(total_belanja):\n    if total_belanja >= 100000:\n        return total_belanja * 0.1\n    return 0\n\nbelanja = 120000\ndiskon = hitung_diskon(belanja)\nprint(f"Total: {belanja}, Diskon: {diskon}")`
  );

  const [activeStep, setActiveStep] = useState<number>(1);
  const [pushStatus, setPushStatus] = useState<string | null>(null);
  const [appreciationSent, setAppreciationSent] = useState<boolean>(false);
  const [isSessionMarkedDone, setIsSessionMarkedDone] = useState<boolean>(false);

  const handlePushCode = () => {
    pushCodeToStudent(tutorCode);
    setPushStatus("KODE BERHASIL DISINKRONKAN KE EDITOR SISWA (EXIT 0)");
    setTimeout(() => setPushStatus(null), 3500);
  };

  const handleGiveStar = () => {
    updateProgress({ xpPoints: progress.xpPoints + 50 });
    setAppreciationSent(true);
    setTimeout(() => setAppreciationSent(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-200 flex flex-col font-sans">
      {/* Studio Header Bar */}
      <div className="bg-[#0f1118] border-b border-white/[0.08] px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center space-x-3">
          <Link
            href="/tutor/dashboard"
            className="text-slate-400 hover:text-white transition flex items-center space-x-1"
          >
            <span>&larr; DASHBOARD</span>
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">
            LIVE_SESSION // 120_MIN
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200 font-bold hidden sm:inline">
            {sessionData.title}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>SISA_WAKTU: <strong className="text-slate-200">01:45:00</strong></span>
          </div>

          <div className="flex items-center space-x-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            <span>SISWA: ANDI PRATAMA (ONLINE)</span>
          </div>
        </div>
      </div>

      {/* Push Notification Toast - Swiss Technical */}
      {pushStatus && (
        <div className="bg-[#121824] border-b border-emerald-500/40 text-emerald-400 px-4 py-2 text-xs font-mono text-center">
          {pushStatus}
        </div>
      )}

      {/* Split Screen Grid (5 : 7) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* ================= LEFT PANE: ALUR 4 LANGKAH MENGAJAR ================= */}
        <div className="lg:col-span-5 border-r border-white/[0.08] bg-[#0c0d14] flex flex-col justify-between overflow-y-auto p-5 sm:p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
                01 // ALUR TERPANDU MENGAJAR (120 MENIT)
              </p>
              <h2 className="text-xl font-bold text-white tracking-tight mt-1">
                Pedoman Pertemuan {sessionData.sessionNumber}
              </h2>
              <p className="font-sans text-xs text-slate-400 mt-1">
                {sessionData.conceptIntro}
              </p>
            </div>

            {/* Steps Accordion */}
            <div className="space-y-2.5 font-mono text-xs">
              {/* Langkah 1 */}
              <div
                onClick={() => setActiveStep(1)}
                className={`p-3.5 rounded border transition cursor-pointer ${
                  activeStep === 1
                    ? "bg-[#141722] border-white/20 text-white"
                    : "bg-[#0f1118] border-white/[0.06] text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs mb-1">
                  <span>01 // KONSEP &amp; ANALOGI (25 MENIT)</span>
                  <span className="text-[10px] text-slate-400">PEMANASAN</span>
                </div>
                <p className="font-sans text-xs text-slate-300 leading-relaxed">
                  Jelaskan bagaimana logika percabangan if-else bekerja menggunakan analogi rambu lalu lintas atau seleksi diskon toko.
                </p>
              </div>

              {/* Langkah 2 */}
              <div
                onClick={() => setActiveStep(2)}
                className={`p-3.5 rounded border transition cursor-pointer ${
                  activeStep === 2
                    ? "bg-[#141722] border-white/20 text-white"
                    : "bg-[#0f1118] border-white/[0.06] text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs mb-1">
                  <span>02 // DEMONSTRASI KODE CONTOH (45 MENIT)</span>
                  <span className="text-[10px] text-amber-400">TUTOR DEMO</span>
                </div>
                <p className="font-sans text-xs text-slate-300 leading-relaxed">
                  Ketik kode contoh di panel kanan, lalu tekan tombol <strong>&ldquo;PUSH KODE KE SISWA&rdquo;</strong> agar kode langsung masuk ke editor Andi.
                </p>
              </div>

              {/* Langkah 3 */}
              <div
                onClick={() => setActiveStep(3)}
                className={`p-3.5 rounded border transition cursor-pointer ${
                  activeStep === 3
                    ? "bg-[#141722] border-white/20 text-white"
                    : "bg-[#0f1118] border-white/[0.06] text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs mb-1">
                  <span>03 // PRAKTIK MANDIRI SISWA (40 MENIT)</span>
                  <span className="text-[10px] text-emerald-400">SISWA KODING</span>
                </div>
                <p className="font-sans text-xs text-slate-300 leading-relaxed">
                  Tantang siswa memprogram: <em>{sessionData.practiceChallenge}</em>. Pantau ketikan siswa via Live Inspector.
                </p>
              </div>

              {/* Langkah 4 */}
              <div
                onClick={() => setActiveStep(4)}
                className={`p-3.5 rounded border transition cursor-pointer ${
                  activeStep === 4
                    ? "bg-[#141722] border-white/20 text-white"
                    : "bg-[#0f1118] border-white/[0.06] text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs mb-1">
                  <span>04 // REFLEKSI &amp; CATATAN ORTU (10 MENIT)</span>
                  <span className="text-[10px] text-slate-400">EVALUASI</span>
                </div>
                <p className="font-sans text-xs text-slate-300 leading-relaxed">
                  Beri feedback langsung, beri apresiasi poin, dan tulis rangkuman nalar untuk dimasukkan ke rapor mingguan orang tua.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions at bottom */}
          <div className="pt-4 border-t border-white/[0.08] space-y-2 font-mono text-xs">
            <div className="flex gap-2">
              <button
                onClick={handleGiveStar}
                className="flex-1 py-2 px-3 rounded bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-amber-300 font-semibold transition cursor-pointer"
              >
                {appreciationSent ? "POIN TERKIRIM (+50 XP)" : "APRESIASI (+50 XP)"}
              </button>

              <Link
                href="/tutor/grading"
                className="py-2 px-3 rounded bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-slate-200 font-semibold transition"
              >
                CATATAN ORTU
              </Link>
            </div>

            <button
              onClick={() => setIsSessionMarkedDone(true)}
              className={`w-full py-2.5 rounded font-bold transition cursor-pointer ${
                isSessionMarkedDone
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-black hover:bg-slate-200"
              }`}
            >
              {isSessionMarkedDone ? "SESI BERHASIL DITANDAI SELESAI" : "TANDAI SESI PERTEMUAN SELESAI"}
            </button>
          </div>
        </div>

        {/* ================= RIGHT PANE: KONTROL KODE PERAGA & LIVE MONITOR ================= */}
        <div className="lg:col-span-7 flex flex-col p-4 sm:p-6 space-y-4 bg-[#090a0f] overflow-y-auto">
          {/* Top Control Bar with 1-Click Push Code */}
          <div className="flex items-center justify-between flex-wrap gap-2 font-mono text-xs">
            <div>
              <span className="text-slate-400 uppercase tracking-widest block font-semibold text-[11px]">
                KODE PERAGA PENGAJAR
              </span>
              <span className="font-sans text-slate-400 text-xs">
                Kode yang kamu ketik di bawah dapat dikirimkan langsung ke layar siswa.
              </span>
            </div>

            <button
              onClick={handlePushCode}
              className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>PUSH KODE KE SISWA</span>
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
          <div className="space-y-2 pt-2 border-t border-white/[0.08] font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-300 flex items-center space-x-2">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                <span>LIVE_INSPECTOR // SISWA: ANDI PRATAMA</span>
              </span>
              <span className="text-emerald-400 text-[11px] flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>SYNC_ACTIVE</span>
              </span>
            </div>

            {/* Read-only snapshot of student's editor */}
            <div className="rounded border border-white/[0.08] bg-[#07080c] p-3 text-xs text-emerald-300/90 max-h-[160px] overflow-y-auto leading-relaxed">
              <pre className="whitespace-pre-wrap">{studentLiveCode}</pre>
            </div>

            <div className="p-3 bg-[#0f1118] border border-white/[0.06] rounded text-slate-400 flex items-center justify-between text-xs">
              <span className="flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-400" />
                <span>OUTPUT SISWA:</span>
                <strong className="text-slate-200">&gt;&gt; Luas Persegi Panjang: 50</strong>
              </span>
              <span className="text-emerald-400 font-semibold">ALL TESTS PASSED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
