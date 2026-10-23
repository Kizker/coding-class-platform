"use client";

import React, { use } from "react";
import Link from "next/link";
import { FileCode, ArrowRight } from "lucide-react";

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-5 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-blue-700 uppercase tracking-widest">
              <span>01 // MILESTONE CAPSTONE</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Dokumentasi Proyek Siswa
            </h1>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono">
            {CAPSTONES.map((c) => (
              <Link
                key={c.id}
                href={`/student/capstone/${c.id}`}
                className={`px-3 py-1.5 rounded-md transition font-semibold ${
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

        {/* Project Card */}
        <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-start justify-between flex-wrap gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono text-blue-700 font-semibold block">
                PEKAN KE-{capstone.week} // MILESTONE RESMI
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                {capstone.title}
              </h2>
            </div>

            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800">
              {capstone.status}
            </span>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed font-sans">
            {capstone.description}
          </p>

          {/* Tech badges */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block font-bold">
              KOMPETENSI_TEKNOLOGI:
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {capstone.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Code Viewer */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-600">
              <span className="flex items-center space-x-1.5 font-semibold">
                <FileCode className="w-3.5 h-3.5 text-slate-500" />
                <span>SOURCE_CODE // main.py</span>
              </span>
              <span className="text-slate-500">READ_ONLY</span>
            </div>

            <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-400 font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap">
              {capstone.codeSnippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
