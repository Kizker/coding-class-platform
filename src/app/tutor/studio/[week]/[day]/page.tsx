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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Studio Header Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono shadow-2xs">
        <div className="flex items-center space-x-2">
          <Link
            href="/tutor/dashboard"
            className="text-slate-600 hover:text-amber-700 transition flex items-center space-x-1 font-semibold"
          >
            <span>&larr; DASHBOARD</span>
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">
            LIVE_SESSION // 120_MIN
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold hidden sm:inline font-sans">
            {sessionData.title}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-slate-600">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>SISA_WAKTU: <strong className="text-slate-900">01:45:00</strong></span>
          </div>

          <div className="flex items-center space-x-1.5 text-emerald-700 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
            <span>SISWA: ANDI PRATAMA (ONLINE)</span>
          </div>
        </div>
      </div>

      {/* Push Notification Toast */}
      {pushStatus && (
        <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800 px-4 py-2 text-xs font-mono text-center font-bold">
          {pushStatus}
        </div>
      )}

      {/* Split Screen Grid (5 : 7) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* LEFT PANE: ALUR 4 LANGKAH MENGAJAR */}
        <div className="lg:col-span-5 border-r border-slate-200 bg-slate-50 flex flex-col justify-between overflow-y-auto p-5 sm:p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-amber-700 font-bold">
                01 // ALUR TERPANDU MENGAJAR (120 MENIT)
              </p>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
                Pedoman Pertemuan {sessionData.sessionNumber}
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                {sessionData.conceptIntro}
              </p>
            </div>

            {/* Steps Accordion */}
            <div className="space-y-3 font-mono text-xs">
              {/* Langkah 1 */}
              <div
                onClick={() => setActiveStep(1)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeStep === 1
                    ? "bg-white border-amber-400 text-slate-900 shadow-xs ring-2 ring-amber-300/60"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs mb-1.5">
                  <span className="text-amber-800 font-extrabold">01 // KONSEP &amp; ANALOGI (25 MENIT)</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100">PEMANASAN</span>
                </div>
                <p className="font-sans text-xs text-slate-700 leading-relaxed">
                  Jelaskan bagaimana logika percabangan if-else bekerja menggunakan analogi rambu lalu lintas atau seleksi diskon toko.
                </p>
              </div>

              {/* Langkah 2 */}
              <div
                onClick={() => setActiveStep(2)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeStep === 2
                    ? "bg-white border-amber-400 text-slate-900 shadow-xs ring-2 ring-amber-300/60"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs mb-1.5">
                  <span className="text-amber-800 font-extrabold">02 // DEMONSTRASI KODE CONTOH (45 MENIT)</span>
                  <span className="text-[10px] text-amber-700 font-bold uppercase px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200">TUTOR DEMO</span>
                </div>
                <p className="font-sans text-xs text-slate-700 leading-relaxed">
                  Ketik kode contoh di panel kanan, lalu tekan tombol <strong>&ldquo;PUSH KODE KE SISWA&rdquo;</strong> agar kode langsung masuk ke editor Andi.
                </p>
              </div>

              {/* Langkah 3 */}
              <div
                onClick={() => setActiveStep(3)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeStep === 3
                    ? "bg-white border-amber-400 text-slate-900 shadow-xs ring-2 ring-amber-300/60"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs mb-1.5">
                  <span className="text-amber-800 font-extrabold">03 // PRAKTIK MANDIRI SISWA (40 MENIT)</span>
                  <span className="text-[10px] text-emerald-700 font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">SISWA KODING</span>
                </div>
                <p className="font-sans text-xs text-slate-700 leading-relaxed">
                  Tantang siswa memprogram: <em>{sessionData.practiceChallenge}</em>. Pantau ketikan siswa via Live Inspector.
                </p>
              </div>

              {/* Langkah 4 */}
              <div
                onClick={() => setActiveStep(4)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeStep === 4
                    ? "bg-white border-amber-400 text-slate-900 shadow-xs ring-2 ring-amber-300/60"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs mb-1.5">
                  <span className="text-amber-800 font-extrabold">04 // REFLEKSI &amp; CATATAN ORTU (10 MENIT)</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100">EVALUASI</span>
                </div>
                <p className="font-sans text-xs text-slate-700 leading-relaxed">
                  Beri feedback langsung, beri apresiasi poin, dan tulis rangkuman nalar untuk dimasukkan ke rapor mingguan orang tua.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions at bottom */}
          <div className="pt-4 border-t border-slate-200 space-y-2.5 font-mono text-xs">
            <div className="flex gap-2">
              <button
                onClick={handleGiveStar}
                className="flex-1 py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold transition cursor-pointer shadow-2xs"
              >
                {appreciationSent ? "POIN TERKIRIM (+50 XP)" : "APRESIASI (+50 XP)"}
              </button>

              <Link
                href="/tutor/grading"
                className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold transition text-center shadow-2xs"
              >
                CATATAN ORTU
              </Link>
            </div>

            <button
              onClick={() => setIsSessionMarkedDone(true)}
              className={`w-full py-3 rounded-xl font-bold transition cursor-pointer shadow-xs ${
                isSessionMarkedDone
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              {isSessionMarkedDone ? "SESI BERHASIL DITANDAI SELESAI" : "TANDAI SESI PERTEMUAN SELESAI"}
            </button>
          </div>
        </div>

        {/* RIGHT PANE: KONTROL KODE PERAGA & LIVE MONITOR */}
        <div className="lg:col-span-7 flex flex-col p-4 sm:p-6 space-y-4 bg-slate-50 overflow-y-auto">
          {/* Top Control Bar with 1-Click Push Code */}
          <div className="flex items-center justify-between flex-wrap gap-2 font-mono text-xs">
            <div>
              <span className="text-slate-500 uppercase tracking-widest block font-bold text-[11px]">
                KODE PERAGA PENGAJAR
              </span>
              <span className="font-sans text-slate-600 text-xs">
                Kode yang Anda ketik di bawah dapat dikirimkan langsung ke layar siswa.
              </span>
            </div>

            <button
              onClick={handlePushCode}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition flex items-center space-x-2 cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
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
          <div className="space-y-2.5 pt-3 border-t border-slate-200 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 flex items-center space-x-2">
                <Eye className="w-4 h-4 text-blue-700" />
                <span>LIVE_INSPECTOR // SISWA: ANDI PRATAMA</span>
              </span>
              <span className="text-emerald-700 text-[11px] font-bold flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>SYNC_ACTIVE</span>
              </span>
            </div>

            {/* Read-only snapshot of student's editor */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-800 max-h-[160px] overflow-y-auto leading-relaxed shadow-xs font-mono">
              <pre className="whitespace-pre-wrap">{studentLiveCode}</pre>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-xl text-slate-600 flex items-center justify-between text-xs shadow-2xs font-mono">
              <span className="flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-bold">OUTPUT SISWA:</span>
                <strong className="text-slate-900 font-bold">&gt;&gt; Luas Persegi Panjang: 50</strong>
              </span>
              <span className="text-emerald-700 font-extrabold">ALL TESTS PASSED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
