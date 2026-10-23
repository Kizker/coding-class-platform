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
    <div className="min-h-screen bg-slate-50 text-slate-900 py-6 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="border-b border-slate-200 pb-5">
          <div className="font-mono text-xs uppercase tracking-widest text-emerald-700 font-bold mb-1">
            EXECUTIVE PORTFOLIO // DOKUMENTASI RESMI KARYA
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Galeri Portofolio &amp; Program Siswa
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Seluruh karya di bawah ini dikembangkan secara mandiri oleh Andi Pratama melalui bimbingan terstruktur 1-on-1.
          </p>
        </div>

        <div className="space-y-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="p-6 rounded-xl border border-slate-200 bg-white space-y-4 shadow-xs"
            >
              <div className="flex items-start justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="font-mono text-xs text-blue-700 font-bold">
                    {p.week}
                  </span>
                  <h2 className="text-base font-bold text-slate-900 mt-1 font-sans">
                    {p.title}
                  </h2>
                </div>

                <div className="flex items-center space-x-2 font-mono text-xs">
                  <span className="px-2.5 py-0.5 rounded border border-emerald-200 bg-emerald-50 text-emerald-800 text-[11px] font-bold">
                    {p.status}
                  </span>
                  <span className="text-slate-600">
                    SKOR: <strong className="text-slate-900 font-bold tabular-nums">{p.score}</strong>
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {p.description}
              </p>

              {/* Logika & Kemampuan */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                  KOMPETENSI &amp; PENALARAN LOGIKA:
                </span>
                <ul className="text-xs text-slate-800 space-y-1.5 font-sans">
                  {p.competenciesGained.map((c, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Terminal Preview */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xs">
                <div className="px-3.5 py-2 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center space-x-1.5 font-semibold">
                    <Terminal className="w-3 h-3 text-slate-400" />
                    <span>OUTPUT_EXECUTION // STDOUT</span>
                  </span>
                  <span>PYTHON RUNTIME</span>
                </div>
                <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed whitespace-pre-wrap">
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
