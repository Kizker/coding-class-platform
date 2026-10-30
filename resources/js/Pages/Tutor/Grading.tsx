import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { useSession } from "@/lib/auth/sessionContext";
import {
  Check,
  Save,
  MessageSquare,
  ArrowRight,
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
    <div className="min-h-screen bg-[#FDFBF7] text-black font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="bg-white border-2.5 border-black p-6 sm:p-8 shadow-[5px_5px_0px_#000] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-black uppercase tracking-widest text-black mb-1 flex items-center space-x-2 bg-[#FEF08A] px-2 py-0.5 border border-black w-fit">
              <span>TUTOR // WORKSTATION</span>
              <span>/</span>
              <span>EVALUASI &amp; VERIFIKASI TUGAS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
              Meja Penilaian Kualitatif Siswa
            </h1>
            <p className="text-xs sm:text-sm text-stone-800 font-bold mt-1 max-w-xl">
              Verifikasi kode tugas harian (Senin–Kamis) murid Andi Pratama dan susun narasi evaluasi nalar logika untuk laporan orang tua.
            </p>
          </div>

          <Link
            href="/tutor/reports"
            className="px-4 py-2.5 bg-[#86EFAC] hover:bg-green-300 text-black border-2 border-black font-black text-xs transition shrink-0 shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center space-x-2 cursor-pointer uppercase tracking-tight"
          >
            <MessageSquare className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>GENERATE RAPOR WHATSAPP</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </Link>
        </div>

        {/* Section 01: Qualitative Narrative Editor */}
        <div className="bg-white border-2.5 border-black p-6 sm:p-8 shadow-[4px_4px_0px_#000] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-3">
            <div>
              <span className="font-mono text-xs text-black font-black uppercase tracking-wider block">
                01 // CATATAN EVALUASI NALAR PEKAN INI
              </span>
              <p className="text-xs text-stone-700 font-bold mt-0.5">
                Evaluasi deskriptif mengenai pemahaman nalar logika, kemandirian problem solving, dan pencapaian anak.
              </p>
            </div>
            <span className="font-mono text-xs text-black bg-[#FEF08A] px-3 py-1 border border-black font-black uppercase">
              PEKAN {String(progress.currentWeek || 1).padStart(2, "0")} / 12
            </span>
          </div>

          <textarea
            rows={4}
            value={weeklyNote}
            onChange={(e) => setWeeklyNote(e.target.value)}
            className="w-full bg-[#FEF08A] border-2 border-black p-4 text-xs sm:text-sm text-black font-bold focus:outline-none focus:bg-white font-sans leading-relaxed transition shadow-[3px_3px_0px_#000]"
            placeholder="Tuliskan catatan perkembangan nalar anak..."
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 font-mono">
            <div className="text-xs">
              {saveSuccess ? (
                <span className="text-black bg-[#86EFAC] px-2.5 py-1 border border-black font-black flex items-center space-x-1.5 w-fit">
                  <Check className="w-4 h-4 text-black stroke-[3]" />
                  <span>TERSIMPAN KE PORTAL ORANG TUA</span>
                </span>
              ) : (
                <span className="text-stone-700 font-bold uppercase text-[11px]">
                  STATUS: TERKONEKSI LANGSUNG KE PORTAL WALI MURID
                </span>
              )}
            </div>

            <button
              onClick={handleSaveWeeklyNote}
              className="px-5 py-2.5 bg-[#FACC15] hover:bg-yellow-400 text-black border-2 border-black text-xs font-black transition flex items-center justify-center space-x-2 cursor-pointer shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none uppercase tracking-tight"
            >
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>SIMPAN EVALUASI</span>
            </button>
          </div>
        </div>

        {/* Section 02: Daily Homework Submissions Table */}
        <div className="bg-white border-2.5 border-black p-6 sm:p-8 shadow-[4px_4px_0px_#000] space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-3 font-mono">
            <div>
              <span className="text-xs text-black font-black tracking-wider uppercase block">
                02 // LOG VERIFIKASI PR HARIAN (SENIN - KAMIS)
              </span>
              <p className="font-sans text-xs text-stone-700 font-bold mt-0.5">
                Kepatuhan rutinitas 15 menit per hari murid Andi Pratama.
              </p>
            </div>
            <div className="text-xs text-black font-black flex items-center space-x-2 bg-[#86EFAC] px-2.5 py-1 border border-black uppercase">
              <span className="w-2 h-2 rounded-full bg-black inline-block animate-pulse" />
              <span>4/4 SELESAI PEKAN INI</span>
            </div>
          </div>

          <div className="space-y-4">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="bg-white border-2 border-black p-5 shadow-[3px_3px_0px_#000] space-y-3.5"
              >
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <div className="flex items-center space-x-2 font-mono text-xs text-stone-700 font-bold">
                      <span className="text-black bg-[#FEF08A] px-2 py-0.5 border border-black font-black uppercase">
                        [{sub.day.toUpperCase()} // {sub.type}]
                      </span>
                      <span>&bull;</span>
                      <span>{sub.submittedAt}</span>
                    </div>
                    <h3 className="text-sm font-black text-black mt-2 uppercase">
                      {sub.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-3 font-mono text-xs">
                    <span className="text-black font-black uppercase">SKOR:</span>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={sub.score}
                      onChange={(e) =>
                        handleScoreChange(sub.id, parseInt(e.target.value, 10) || 0)
                      }
                      className="w-16 bg-white border-2 border-black px-2 py-1 text-center font-black text-black focus:outline-none shadow-[2px_2px_0px_#000]"
                    />
                    <span className="text-black font-black">/ 100</span>
                    <span className="px-3 py-1 border border-black bg-[#86EFAC] text-black text-[11px] font-black uppercase">
                      VERIFIED
                    </span>
                  </div>
                </div>

                {/* Code Snapshot */}
                <div className="border-2 border-black bg-black shadow-[3px_3px_0px_#000]">
                  <div className="px-3.5 py-1.5 border-b-2 border-black/40 bg-stone-900 flex items-center justify-between text-[11px] font-mono text-stone-300">
                    <span className="flex items-center space-x-1.5 font-bold">
                      <Code2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>student_submission.py</span>
                    </span>
                    <span className="text-yellow-400 font-black">PYTHON 3.11</span>
                  </div>
                  <pre className="p-3.5 text-xs font-mono text-yellow-300 overflow-x-auto leading-relaxed">
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
