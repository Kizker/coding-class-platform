"use client";

import React from "react";
import { Award, CheckCircle2, ShieldCheck, FileText, Code2 } from "lucide-react";

export default function ParentShowcasePage() {
  const projects = [
    {
      id: "cap-1",
      title: "Karya 1: Game CLI Tebak Angka Rahasia",
      week: "Minggu ke-4",
      status: "TUNTAS & DINILAI",
      score: "95 / 100",
      description: "Game konsol interaktif di mana pemain menebak angka rahasia yang diacak oleh komputer dengan batas 5 kesempatan dan sistem petunjuk dinamis.",
      competenciesGained: [
        "Pengacakan angka dengan modul random",
        "Perulangan logika batas tebakan",
        "Percabangan evaluasi angka (terlalu tinggi / rendah)",
        "Struktur fungsi mandiri",
      ],
      previewTerminal: `=== GAME TEBAK ANGKA RAHASIA ===
Tebakan ke-1 (1-20): 10
>> Terlalu Rendah!
Tebakan ke-2 (1-20): 15
>> Terlalu Tinggi!
Tebakan ke-3 (1-20): 13
>> 🎉 HEBAT! Kamu berhasil menebak angka 13!
Skor Kemenangan: 100 Poin!`,
    },
    {
      id: "cap-2",
      title: "Latihan Praktik: Kalkulator Konversi Waktu & Bangun Datar",
      week: "Minggu ke-2",
      status: "TUNTAS & DINILAI",
      score: "98 / 100",
      description: "Program otomatisasi perhitungan luas bangun datar dan konverter total menit ke format jam dan menit.",
      competenciesGained: [
        "Operator aritmatika (+, -, *, /)",
        "Modulo sisa bagi (%)",
        "Konversi tipe data angka ke teks (f-string)",
      ],
      previewTerminal: `Total Menit: 135
Hasil Konversi: 2 Jam 15 Menit
Perhitungan Luas Segitiga (alas 10, tinggi 8): 40.0`,
    },
    {
      id: "cap-3",
      title: "Latihan Praktik: Kartu Identitas Digital Pelajar",
      week: "Minggu ke-1",
      status: "TUNTAS & DINILAI",
      score: "100 / 100",
      description: "Kartu biodata diri berbasis teks di terminal menggunakan seni karakter ASCII dan penataan baris rapi.",
      competenciesGained: [
        "Fungsi cetak print()",
        "Karakter baris baru (\\n) dan tab (\\t)",
        "Variabel penyimpan biodata",
      ],
      previewTerminal: `===============================
     KARTU IDENTITAS KODING    
===============================
Nama Siswa: Andi Pratama
Umur: 14 Tahun
Target: Menguasai Pemrograman Python`,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Dokumentasi Resmi Portofolio Anak (Read-Only)</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Galeri Karya & Hasil Program Andi Pratama</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Seluruh karya di bawah ini dibuat langsung oleh Ananda secara mandiri dengan bimbingan terpandu dari pengajar.
          </p>
        </div>

        <div className="space-y-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl"
            >
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                    {p.week}
                  </span>
                  <h2 className="text-base font-bold text-white mt-1.5">{p.title}</h2>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold">
                    {p.status}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-700 font-bold">
                    {p.score}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {p.description}
              </p>

              {/* Kompetensi yang Dikuasai Anak */}
              <div className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Logika & Kemampuan yang Dikuasai Ananda:
                </span>
                <ul className="text-xs text-slate-300 space-y-1">
                  {p.competenciesGained.map((c, idx) => (
                    <li key={idx} className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pratinjau Tampilan Output Program Anak */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Hasil Tampilan Program di Layar Konsol:
                </span>
                <pre className="p-3.5 rounded-xl bg-black border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                  {p.previewTerminal}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
