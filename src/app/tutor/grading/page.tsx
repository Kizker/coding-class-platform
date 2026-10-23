"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth/sessionContext";
import {
  FileText,
  Check,
  Save,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Code2,
} from "lucide-react";

interface SubmissionItem {
  id: string;
  day: string;
  title: string;
  type: string;
  submittedAt: string;
  score: number;
  status: "GRADED" | "NEEDS_REVIEW";
  studentCode: string;
}

export default function TutorGradingPage() {
  const { progress, updateProgress } = useSession();

  const [weeklyNote, setWeeklyNote] = useState<string>(progress.weeklyNote);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const [submissions, setSubmissions] = useState<SubmissionItem[]>([
    {
      id: "sub-1",
      day: "Senin",
      title: "PR 1: Menyapa Dunia dengan print()",
      type: "RECALL",
      submittedAt: "Senin, 18:20 WIB",
      score: 100,
      status: "GRADED",
      studentCode: `print("Halo Dunia, aku siap belajar koding!")`,
    },
    {
      id: "sub-2",
      day: "Selasa",
      title: "PR 2: Membaca Alur Eksekusi Kode",
      type: "CODE_READ",
      submittedAt: "Selasa, 19:15 WIB",
      score: 95,
      status: "GRADED",
      studentCode: `pesan = "Langkah 1"\nprint(pesan)\npesan = "Langkah 2"\nprint(pesan)`,
    },
    {
      id: "sub-3",
      day: "Rabu",
      title: "PR 3: Memperbaiki Petik Hilang (SyntaxError)",
      type: "DEBUGGING",
      submittedAt: "Rabu, 17:45 WIB",
      score: 95,
      status: "GRADED",
      studentCode: `print("Semangat Belajar Koding!")`,
    },
    {
      id: "sub-4",
      day: "Kamis",
      title: "PR 4: Pemanasan Variabel & Tipe Data",
      type: "PRE_READ",
      submittedAt: "Kamis, 19:00 WIB",
      score: 100,
      status: "GRADED",
      studentCode: `nama_siswa = "Andi"\ntarget_hari = 12\nprint(f"Siswa: {nama_siswa}, Target: {target_hari} Pekan")`,
    },
  ]);

  const handleScoreChange = (id: string, newScore: number) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, score: newScore } : s))
    );
  };

  const handleSaveWeeklyNote = () => {
    updateProgress({ weeklyNote });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-amber-700 font-bold mb-1 flex items-center space-x-2">
              <span>TUTOR // WORKSTATION</span>
              <span>/</span>
              <span>EVALUASI &amp; VERIFIKASI TUGAS</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Meja Penilaian Kualitatif Siswa
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Verifikasi kode tugas harian (Senin–Kamis) siswa Andi Pratama dan susun narasi evaluasi nalar logika untuk laporan orang tua.
            </p>
          </div>

          <Link
            href="/tutor/reports"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition shrink-0 shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>GENERATE RAPOR WHATSAPP</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Section 01: Qualitative Narrative Editor */}
        <div className="ui-card-outer p-6 sm:p-8 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="font-mono text-xs text-slate-500 font-bold tracking-wider">
                01 // CATATAN EVALUASI NALAR PEKAN INI
              </span>
              <p className="text-xs text-slate-600 mt-0.5">
                Evaluasi deskriptif mengenai pemahaman nalar logika, kemandirian problem solving, dan pencapaian anak.
              </p>
            </div>
            <span className="font-mono text-xs text-blue-700 border border-blue-200 bg-blue-50 px-3 py-1 rounded-full font-bold">
              PEKAN {String(progress.currentWeek || 1).padStart(2, "0")}
            </span>
          </div>

          <textarea
            rows={4}
            value={weeklyNote}
            onChange={(e) => setWeeklyNote(e.target.value)}
            className="w-full bg-slate-50/70 border border-slate-300 rounded-xl p-4 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-sans leading-relaxed transition"
            placeholder="Tuliskan catatan perkembangan nalar anak..."
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 font-mono">
            <div className="text-xs">
              {saveSuccess ? (
                <span className="text-emerald-700 font-bold flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>TERSIMPAN KE PORTAL ORANG TUA</span>
                </span>
              ) : (
                <span className="text-slate-500 font-semibold">
                  STATUS: TERKONEKSI KE PORTAL ORANG TUA
                </span>
              )}
            </div>

            <button
              onClick={handleSaveWeeklyNote}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>SIMPAN EVALUASI</span>
            </button>
          </div>
        </div>

        {/* Section 02: Daily Homework Submissions Table */}
        <div className="ui-card-outer p-6 sm:p-8 rounded-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 font-mono">
            <div>
              <span className="text-xs text-slate-500 font-bold tracking-wider">
                02 // LOG VERIFIKASI PR HARIAN (SENIN - KAMIS)
              </span>
              <p className="font-sans text-xs text-slate-600 mt-0.5">
                Kepatuhan rutinitas 15 menit per hari siswa Andi Pratama.
              </p>
            </div>
            <div className="text-xs text-emerald-700 font-bold flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>4/4 SELESAI PEKAN INI</span>
            </div>
          </div>

          <div className="space-y-4">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="ui-card-inner bg-slate-50/70 border border-slate-200 p-5 rounded-2xl space-y-3.5"
              >
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <div className="flex items-center space-x-2 font-mono text-xs text-slate-500">
                      <span className="text-blue-700 font-bold uppercase">
                        [{sub.day.toUpperCase()} // {sub.type}]
                      </span>
                      <span>&bull;</span>
                      <span>{sub.submittedAt}</span>
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900 mt-1 font-sans">
                      {sub.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-3 font-mono text-xs">
                    <span className="text-slate-500 font-bold">SKOR:</span>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={sub.score}
                      onChange={(e) =>
                        handleScoreChange(sub.id, parseInt(e.target.value, 10) || 0)
                      }
                      className="w-16 bg-white border border-slate-300 rounded-lg px-2 py-1 text-center font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
                    />
                    <span className="text-slate-500 font-bold">/ 100</span>
                    <span className="px-3 py-1 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-[11px] font-bold">
                      VERIFIED
                    </span>
                  </div>
                </div>

                {/* Code Snapshot */}
                <div className="ui-code-box border border-slate-800 rounded-xl bg-slate-900 overflow-hidden shadow-xs">
                  <div className="px-3.5 py-1.5 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center space-x-1.5 font-bold">
                      <Code2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>student_submission.py</span>
                    </span>
                    <span className="text-slate-500 font-semibold">PYTHON 3.11</span>
                  </div>
                  <pre className="p-3.5 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    {sub.studentCode}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
