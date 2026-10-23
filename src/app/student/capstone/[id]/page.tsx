"use client";

import React, { use } from "react";
import Link from "next/link";
import { Award, CheckCircle2, FileCode, Play, Sparkles, ExternalLink } from "lucide-react";

const CAPSTONES = [
  {
    id: "1",
    week: 4,
    title: "Capstone 1: Game CLI Tebak Angka / Batu-Gunting-Kertas",
    status: "TUNTAS & DINILAI",
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
        print(f"🎉 HEBAT! Kamu berhasil menebak angka {angka_rahasia}!")
        break
    elif tebakan < angka_rahasia:
        print("Terlalu Rendah!")
    else:
        print("Terlalu Tinggi!")
else:
    print(f"Yah, kesempatan habis! Angka rahasianya adalah {angka_rahasia}.")`,
  },
  {
    id: "2",
    week: 8,
    title: "Capstone 2: Buku Kontak Telepon CRUD + CSV File Storage",
    status: "SEDANG BERJALAN",
    score: null,
    description: "Sistem manajemen data kontak mandiri berbasis OOP dengan penyimpanan berkas CSV permanen di harddisk.",
    technologies: ["Class & Object", "CSV File I/O", "try-except Error Handling", "Menu Loop"],
    codeSnippet: `# Sedang dalam pengerjaan oleh siswa pada Pekan ke-8`,
  },
  {
    id: "3",
    week: 12,
    title: "Capstone 3: Live Interactive Web App Portfolio (Demo Day)",
    status: "AKAN DATANG",
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
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header navigation */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <Award className="w-6 h-6 text-amber-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">
              Proyek Capstone Milestone
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            {CAPSTONES.map((c) => (
              <Link
                key={c.id}
                href={`/student/capstone/${c.id}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  c.id === capstone.id
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                    : "bg-slate-900 text-slate-400 hover:bg-slate-800"
                }`}
              >
                Capstone {c.id} (M{c.week})
              </Link>
            ))}
          </div>
        </div>

        {/* Project Card */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700/60 font-semibold uppercase">
                Minggu ke-{capstone.week}
              </span>
              <h2 className="text-2xl font-black text-white mt-2 tracking-tight">
                {capstone.title}
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                {capstone.status}
              </span>
              {capstone.score !== null && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-700">
                  Nilai: {capstone.score} / 100
                </span>
              )}
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">
            {capstone.description}
          </p>

          {/* Tech badges */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Konsep & Teknologi yang Digunakan:
            </span>
            <div className="flex flex-wrap gap-2">
              {capstone.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Code Viewer */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold flex items-center space-x-1">
                <FileCode className="w-4 h-4 text-indigo-400" />
                <span>Dokumentasi Kode Program Karya Siswa:</span>
              </span>
              <span className="text-slate-500 font-mono">capstone_{capstone.id}.py</span>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
              {capstone.codeSnippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
