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
    <div className="min-h-screen bg-[#FDFBF7] text-black font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header navigation */}
        <div className="bg-white border-2.5 border-black p-6 sm:p-7 shadow-[5px_5px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-black text-black uppercase tracking-widest mb-1 bg-[#FEF08A] px-2 py-0.5 border border-black">
              <span>01 // MILESTONE CAPSTONE PROJECT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
              Galeri Karya Program Siswa
            </h1>
            <p className="text-xs sm:text-sm text-stone-800 font-bold mt-1">
              Portofolio mandiri yang dirancang dan dikembangkan siswa setiap 4 pekan sekali.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs shrink-0">
            {CAPSTONES.map((c) => (
              <Link
                key={c.id}
                href={`/student/capstone/${c.id}`}
                className={`px-4 py-2 border-2 border-black font-black uppercase transition-all cursor-pointer ${
                  c.id === capstone.id
                    ? "bg-black text-[#FACC15] shadow-[3px_3px_0px_#000] translate-x-[-1px] translate-y-[-1px]"
                    : "bg-white text-black shadow-[2px_2px_0px_#000] hover:bg-[#FEF08A]"
                }`}
              >
                CAPSTONE_{c.id}
              </Link>
            ))}
          </div>
        </div>

        {/* Project Card */}
        <div className="bg-white border-2.5 border-black p-6 sm:p-8 shadow-[5px_5px_0px_#000] space-y-6">
          <div className="flex items-start justify-between flex-wrap gap-3 border-b-2 border-black pb-5">
            <div>
              <span className="text-xs font-black text-black uppercase block">
                PEKAN KE-{capstone.week} // MILESTONE RESMI
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-black uppercase mt-1">
                {capstone.title}
              </h2>
            </div>

            <span className="text-xs font-black px-3 py-1.5 bg-[#86EFAC] text-black border-2 border-black shadow-[2px_2px_0px_#000] uppercase">
              {capstone.status}
            </span>
          </div>

          <div className="bg-[#FEF08A] border-2 border-black p-5 shadow-[3px_3px_0px_#000]">
            <span className="text-xs font-black text-black uppercase tracking-wider block mb-1">
              DESKRIPSI PROYEK:
            </span>
            <p className="text-xs sm:text-sm text-stone-900 font-bold leading-relaxed">
              {capstone.description}
            </p>
          </div>

          {/* Tech badges */}
          <div className="space-y-2.5">
            <span className="text-xs font-black text-black uppercase tracking-widest block">
              KOMPETENSI TEKNOLOGI:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {capstone.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white border-2 border-black text-black font-black uppercase shadow-[2px_2px_0px_#000]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Code Viewer */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-black">
              <span className="flex items-center space-x-1.5">
                <FileCode className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                <span>SOURCE_CODE // main.py</span>
              </span>
              <span className="bg-stone-200 border border-black px-2 py-0.5">READ_ONLY</span>
            </div>

            <pre className="p-5 bg-black border-2.5 border-black text-xs text-yellow-300 font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap shadow-[4px_4px_0px_#000]">
              {capstone.codeSnippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
