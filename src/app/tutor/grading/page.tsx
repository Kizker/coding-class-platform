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
    <div className="min-h-screen bg-[#07090D] text-neutral-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header with technical breadcrumb */}
        <div className="border-b border-white/[0.08] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2 flex items-center space-x-2">
              <span>TUTOR // WORKSTATION</span>
              <span>/</span>
              <span className="text-amber-400">EVALUASI & VERIFIKASI TUGAS</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Meja Penilaian Kualitatif Siswa
            </h1>
            <p className="text-xs text-neutral-400 mt-1 max-w-xl">
              Verifikasi kode tugas harian (Senin–Kamis) siswa Andi Pratama dan susun narasi evaluasi nalar logika untuk laporan orang tua.
            </p>
          </div>

          <Link
            href="/tutor/reports"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-900/30 font-mono text-xs transition shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>GENERATE RAPOR WHATSAPP</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Section 01: Qualitative Narrative Editor */}
        <div className="p-6 rounded border border-white/[0.08] bg-[#0C1017] space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div>
              <span className="font-mono text-xs text-neutral-400 tracking-wider">
                01 // CATATAN EVALUASI NALAR PEKAN INI
              </span>
              <p className="text-xs text-neutral-500 mt-0.5">
                Evaluasi deskriptif mengenai pemahaman nalar logika, kemandirian problem solving, dan pencapaian anak.
              </p>
            </div>
            <span className="font-mono text-xs text-neutral-400 border border-white/[0.08] px-2 py-0.5 rounded bg-white/[0.02]">
              PEKAN 04
            </span>
          </div>

          <textarea
            rows={4}
            value={weeklyNote}
            onChange={(e) => setWeeklyNote(e.target.value)}
            className="w-full bg-[#07090D] border border-white/[0.1] rounded p-4 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:border-amber-400/60 font-sans leading-relaxed transition"
            placeholder="Tuliskan catatan perkembangan nalar anak..."
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="font-mono text-xs">
              {saveSuccess ? (
                <span className="text-emerald-400 flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>TERSIMPAN KE PORTAL ORANG TUA</span>
                </span>
              ) : (
                <span className="text-neutral-500">
                  STATUS: TERKONEKSI KE PORTAL ORANG TUA
                </span>
              )}
            </div>

            <button
              onClick={handleSaveWeeklyNote}
              className="px-4 py-2 rounded bg-amber-400 hover:bg-amber-300 text-neutral-950 font-mono text-xs font-semibold transition flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>SIMPAN EVALUASI</span>
            </button>
          </div>
        </div>

        {/* Section 02: Daily Homework Submissions Table */}
        <div className="p-6 rounded border border-white/[0.08] bg-[#0C1017] space-y-5">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div>
              <span className="font-mono text-xs text-neutral-400 tracking-wider">
                02 // LOG VERIFIKASI PR HARIAN (SENIN - KAMIS)
              </span>
              <p className="text-xs text-neutral-500 mt-0.5">
                Kepatuhan rutinitas 15 menit per hari siswa Andi Pratama.
              </p>
            </div>
            <div className="font-mono text-xs text-emerald-400 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>4/4 SELESAI PEKAN INI</span>
            </div>
          </div>

          <div className="space-y-4">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="p-4 rounded border border-white/[0.06] bg-[#07090D] space-y-3"
              >
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <div className="flex items-center space-x-2 font-mono text-xs text-neutral-400">
                      <span className="text-amber-400 uppercase">
                        [{sub.day.toUpperCase()} // {sub.type}]
                      </span>
                      <span>&bull;</span>
                      <span>{sub.submittedAt}</span>
                    </div>
                    <h3 className="text-sm font-medium text-white mt-1">
                      {sub.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-3 font-mono text-xs">
                    <span className="text-neutral-500">SKOR:</span>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={sub.score}
                      onChange={(e) =>
                        handleScoreChange(sub.id, parseInt(e.target.value, 10) || 0)
                      }
                      className="w-14 bg-[#0C1017] border border-white/[0.12] rounded px-2 py-1 text-center font-mono font-medium text-amber-400 focus:outline-none focus:border-amber-400"
                    />
                    <span className="text-neutral-500">/ 100</span>
                    <span className="px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-[11px]">
                      VERIFIED
                    </span>
                  </div>
                </div>

                {/* Code Snapshot */}
                <div className="border border-white/[0.06] rounded bg-[#05070A] overflow-hidden">
                  <div className="px-3 py-1.5 border-b border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-500">
                    <span className="flex items-center space-x-1.5">
                      <Code2 className="w-3 h-3 text-neutral-400" />
                      <span>student_submission.py</span>
                    </span>
                    <span>PYTHON 3.11</span>
                  </div>
                  <pre className="p-3 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
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
