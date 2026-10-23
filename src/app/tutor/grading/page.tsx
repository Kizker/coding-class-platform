"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth/sessionContext";
import {
  FileText,
  CheckCircle2,
  Save,
  MessageSquare,
  Award,
  Sparkles,
  ArrowRight,
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
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <FileText className="w-6 h-6 text-indigo-400" />
              <span>Meja Penilaian & Evaluasi Kualitatif Pengajar</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Verifikasi tugas harian siswa dan susun narasi perkembangan nalar logika untuk laporan orang tua.
            </p>
          </div>

          <Link
            href="/tutor/reports"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center space-x-2 shadow-lg shadow-emerald-600/20 shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Generate Rapor WhatsApp &rarr;</span>
          </Link>
        </div>

        {/* Weekly Qualitative Note Form for Parents */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-700/50 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Catatan Perkembangan Nalar Anak (Untuk Rapor Mingguan Orang Tua)</span>
            </h2>
            <span className="text-[11px] text-indigo-300 font-semibold bg-indigo-950 border border-indigo-800 px-2.5 py-0.5 rounded-full">
              Pekan ke-4
            </span>
          </div>

          <p className="text-xs text-slate-300">
            Tuliskan evaluasi deskriptif mengenai pemahaman nalar logika, sikap belajar, dan pencapaian anak pada sesi pekan ini. Catatan ini akan otomatis muncul di Portal Orang Tua dan Rapor WhatsApp.
          </p>

          <textarea
            rows={4}
            value={weeklyNote}
            onChange={(e) => setWeeklyNote(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans leading-relaxed"
            placeholder="Tuliskan catatan perkembangan di sini..."
          />

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">
              {saveSuccess ? (
                <span className="text-emerald-400 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Catatan berhasil disimpan ke Portal Orang Tua!</span>
                </span>
              ) : (
                "Catatan ini langsung tersinkronisasi ke Portal Orang Tua."
              )}
            </span>

            <button
              onClick={handleSaveWeeklyNote}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center space-x-1.5 shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Catatan</span>
            </button>
          </div>
        </div>

        {/* Daily Homework Submissions Table */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Riwayat Pengumpulan PR Harian (Andi Pratama)</span>
            </h2>
            <span className="text-xs text-emerald-400 font-semibold">
              4/4 PR Selesai Pekan Ini
            </span>
          </div>

          <div className="space-y-4">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                        {sub.day.toUpperCase()} &bull; {sub.type}
                      </span>
                      <span className="text-xs text-slate-400">{sub.submittedAt}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1">{sub.title}</h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <label className="text-xs text-slate-400">Skor:</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={sub.score}
                      onChange={(e) =>
                        handleScoreChange(sub.id, parseInt(e.target.value, 10) || 0)
                      }
                      className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-center font-bold text-amber-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <span className="text-xs text-slate-500">/ 100</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                      PASSED
                    </span>
                  </div>
                </div>

                {/* Student Submitted Code */}
                <pre className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                  {sub.studentCode}
                </pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
