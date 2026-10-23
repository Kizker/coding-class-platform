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
    <div className="min-h-screen bg-[#090a0f] text-slate-200 py-8 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header navigation */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">
              01 // MILESTONE CAPSTONE
            </p>
            <h1 className="text-xl font-bold text-white tracking-tight mt-1">
              Dokumentasi Proyek Siswa
            </h1>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            {CAPSTONES.map((c) => (
              <Link
                key={c.id}
                href={`/student/capstone/${c.id}`}
                className={`px-3 py-1 rounded transition ${
                  c.id === capstone.id
                    ? "bg-white text-black font-bold"
                    : "bg-[#11131b] text-slate-400 hover:text-slate-200 border border-white/[0.06]"
                }`}
              >
                CAPSTONE_{c.id}
              </Link>
            ))}
          </div>
        </div>

        {/* Project Card */}
        <div className="p-6 rounded-lg bg-[#0e1017] border border-white/[0.08] space-y-5">
          <div className="flex items-start justify-between flex-wrap gap-3 border-b border-white/[0.06] pb-4">
            <div>
              <span className="text-[11px] text-slate-400 block">
                PEKAN KE-{capstone.week} // MILESTONE
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                {capstone.title}
              </h2>
            </div>

            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-[#161a25] border border-white/[0.08] text-emerald-400">
              {capstone.status}
            </span>
          </div>

          <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
            {capstone.description}
          </p>

          {/* Tech badges */}
          <div className="space-y-2">
            <span className="text-[11px] text-slate-400 uppercase tracking-widest block font-semibold">
              KOMPETENSI_TEKNOLOGI:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {capstone.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#151822] border border-white/[0.06] text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Code Viewer */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center space-x-1.5 font-semibold">
                <FileCode className="w-3.5 h-3.5" />
                <span>SOURCE_CODE // main.py</span>
              </span>
              <span className="text-slate-400">READ_ONLY</span>
            </div>

            <pre className="p-4 rounded bg-[#07080c] border border-white/[0.06] text-xs text-emerald-400 overflow-x-auto leading-relaxed whitespace-pre-wrap">
              {capstone.codeSnippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
