"use client";

import React from "react";
import { Check, Code2, Terminal } from "lucide-react";

export default function ParentShowcasePage() {
  const projects = [
    {
      id: "cap-1",
      title: "Karya 1: Game CLI Tebak Angka Rahasia",
      week: "PEKAN 04 // CAPSTONE 01",
      status: "TERVERIFIKASI",
      score: "95 / 100",
      description: "Game konsol interaktif di mana pemain menebak angka rahasia yang diacak oleh komputer dengan batas 5 kesempatan dan sistem petunjuk dinamis.",
      competenciesGained: [
        "Pengacakan angka dengan modul random bawaan Python",
        "Perulangan logika batas tebakan dan validasi masukan",
        "Percabangan evaluasi perbandingan nilai (terlalu tinggi / terlalu rendah)",
        "Struktur modular fungsi independen (def & return)",
      ],
      previewTerminal: `=== GAME TEBAK ANGKA RAHASIA ===
Tebakan ke-1 (1-20): 10
>> Petunjuk: Nilai tebakan terlalu rendah.
Tebakan ke-2 (1-20): 15
>> Petunjuk: Nilai tebakan terlalu tinggi.
Tebakan ke-3 (1-20): 13
>> SUKSES: Kamu berhasil menebak angka rahasia 13!
Skor Kemenangan: 100 Poin.`,
    },
    {
      id: "cap-2",
      title: "Latihan Praktik: Kalkulator Konversi Waktu & Bangun Datar",
      week: "PEKAN 02 // PRAKTIK MANDIRI",
      status: "TERVERIFIKASI",
      score: "98 / 100",
      description: "Program otomatisasi perhitungan luas bangun datar dan konverter total menit ke format jam dan menit.",
      competenciesGained: [
        "Operator aritmatika (+, -, *, /) dan penugasan",
        "Modulo sisa bagi (%) dan pembagian bulat (//)",
        "Format teks dinamis f-string dan casting tipe data numerik",
      ],
      previewTerminal: `Total Menit: 135
Hasil Konversi: 2 Jam 15 Menit
Perhitungan Luas Segitiga (alas: 10, tinggi: 8): 40.0 cm2`,
    },
    {
      id: "cap-3",
      title: "Latihan Praktik: Kartu Identitas Digital Pelajar",
      week: "PEKAN 01 // PRAKTIK MANDIRI",
      status: "TERVERIFIKASI",
      score: "100 / 100",
      description: "Kartu biodata diri berbasis teks di terminal menggunakan seni karakter ASCII dan penataan baris terformat.",
      competenciesGained: [
        "Fungsi output dasar print() dan separator",
        "Karakter escape baris baru (\\n) dan tabulasi (\\t)",
        "Variabel penyimpan biodata teks dan angka",
      ],
      previewTerminal: `=======================================
         KARTU IDENTITAS KODING        
=======================================
Nama Siswa : Andi Pratama
Usia       : 14 Tahun
Target     : Penguasaan Algoritma Python
Status     : Aktif Mengikuti Bimbingan`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090D] text-neutral-200 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="border-b border-white/[0.08] pb-5">
          <div className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
            EXECUTIVE PORTFOLIO // DOKUMENTASI RESMI KARYA
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
            Galeri Portofolio & Program Siswa
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Seluruh karya di bawah ini dikembangkan secara mandiri oleh Andi Pratama melalui bimbingan terstruktur 1-on-1.
          </p>
        </div>

        <div className="space-y-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded border border-white/[0.08] bg-[#0C1017] space-y-4"
            >
              <div className="flex items-start justify-between flex-wrap gap-2 border-b border-white/[0.06] pb-3">
                <div>
                  <span className="font-mono text-xs text-amber-400">
                    {p.week}
                  </span>
                  <h2 className="text-base font-medium text-white mt-1">
                    {p.title}
                  </h2>
                </div>

                <div className="flex items-center space-x-2 font-mono text-xs">
                  <span className="px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-[11px]">
                    {p.status}
                  </span>
                  <span className="text-neutral-400">
                    SKOR: <strong className="text-amber-400 font-medium tabular-nums">{p.score}</strong>
                  </span>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {p.description}
              </p>

              {/* Logika & Kemampuan */}
              <div className="space-y-2 bg-[#07090D] p-4 rounded border border-white/[0.06]">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                  KOMPETENSI & PENALARAN LOGIKA:
                </span>
                <ul className="text-xs text-neutral-300 space-y-1.5 font-sans">
                  {p.competenciesGained.map((c, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Terminal Preview */}
              <div className="rounded border border-white/[0.06] bg-[#05070A] overflow-hidden">
                <div className="px-3 py-1.5 border-b border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span className="flex items-center space-x-1.5">
                    <Terminal className="w-3 h-3 text-neutral-400" />
                    <span>OUTPUT_EXECUTION // STDOUT</span>
                  </span>
                  <span>PYTHON RUNTIME</span>
                </div>
                <pre className="p-3 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
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
