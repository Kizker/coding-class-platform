"use client";

import React, { use } from "react";
import Link from "next/link";
import { FileCode, ArrowRight, Award, Zap, Code2 } from "lucide-react";

const CAPSTONES = [
  {
    id: "1",
    week: 4,
    title: "Capstone 1: Game CLI Tebak Angka Rahasia",
    status: "STATUS: GRADED (95/100)",
    score: 95,
    description: "Game konsol interaktif lengkap dengan penentu skor, perulangan game loop, modul random, dan kondisi kemenangan melawan komputer.",
    technologies: ["Python 3", "random module", "while True loop", "if-elif-else", "Functions"],
    codeSnippet: `import random

print("=== GAME TEBAK ANGKA RAHASIA ===")
angka_rahasia = random.randint(1, 20)
tebakan_maksimal = 5

for kesempatan in range(1, tebakan_maksimal + 1):
    tebakan = int(input(f"Tebakan ke-{kesempatan} (1-20): "))
    if tebakan == angka_rahasia:
        print(f"HEBAT! Kamu berhasil menebak angka {angka_rahasia}!")
        break
    elif tebakan < angka_rahasia:
        print("Terlalu Rendah!")
    else:
        print("Terlalu Tinggi!")
else:
    print(f"Kesempatan habis! Angka rahasianya adalah {angka_rahasia}.")`,
  },
  {
    id: "2",
    week: 8,
    title: "Capstone 2: Buku Kontak Telepon CRUD + CSV File Storage",
    status: "STATUS: IN_PROGRESS",
    score: null,
    description: "Sistem manajemen data kontak mandiri berbasis OOP dengan penyimpanan berkas CSV permanen di harddisk.",
    technologies: ["Class & Object", "CSV File I/O", "try-except Error Handling", "Menu Loop"],
    codeSnippet: `# Sedang dalam pengerjaan oleh siswa pada Pekan ke-8`,
  },
  {
    id: "3",
    week: 12,
    title: "Capstone 3: Live Interactive Web App Portfolio (Demo Day)",
    status: "STATUS: UPCOMING (PEKAN 12)",
    score: null,
    description: "Aplikasi web hidup berbasis Python Streamlit/Web UI yang dipresentasikan langsung di depan orang tua dan pengajar.",
    technologies: ["Web UI", "REST API", "JSON Data", "Interactive Controls", "Live Demo"],
    codeSnippet: `# Menunggu Pekan ke-12 (Demo Day Wisuda)`,
  },
];

export default function CapstoneDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const currentId = resolvedParams.id || "1";
  const capstone = CAPSTONES.find((c) => c.id === currentId) || CAPSTONES[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header navigation */}
        <div className="ui-card-outer p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-blue-700 uppercase tracking-widest mb-1">
              <span>01 // MILESTONE CAPSTONE PROJECT</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Galeri Karya Program Siswa
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Portofolio mandiri yang dirancang dan dikembangkan siswa setiap 4 pekan sekali.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono shrink-0">
            {CAPSTONES.map((c) => (
              <Link
                key={c.id}
                href={`/student/capstone/${c.id}`}
                className={`px-3.5 py-2 rounded-xl transition font-bold ${
                  c.id === capstone.id
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                CAPSTONE_{c.id}
              </Link>
            ))}
          </div>
        </div>

        {/* Project Card - Standardized rounded-2xl Inner Boxes */}
        <div className="ui-card-outer p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between flex-wrap gap-3 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-mono text-blue-700 font-bold block">
                PEKAN KE-{capstone.week} // MILESTONE RESMI
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                {capstone.title}
              </h2>
            </div>

            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-2xs">
              {capstone.status}
            </span>
          </div>

          <div className="ui-card-inner bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block mb-1">
              DESKRIPSI PROYEK:
            </span>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
              {capstone.description}
            </p>
          </div>

          {/* Tech badges */}
          <div className="space-y-2.5">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block font-bold">
              KOMPETENSI_TEKNOLOGI:
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {capstone.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-bold"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Code Viewer - Standardized 2xl rounded */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-600">
              <span className="flex items-center space-x-1.5 font-bold">
                <FileCode className="w-3.5 h-3.5 text-slate-500" />
                <span>SOURCE_CODE // main.py</span>
              </span>
              <span className="text-slate-500 font-semibold">READ_ONLY</span>
            </div>

            <pre className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-emerald-400 font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap shadow-xs">
              {capstone.codeSnippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
