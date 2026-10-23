"use client";

import React from "react";
import { useSession } from "@/lib/auth/sessionContext";
import { FileText, Calendar } from "lucide-react";

export default function ParentReportsPage() {
  const { progress } = useSession();

  const reports = [
    {
      week: 4,
      period: "PEKAN 04 // OKTOBER 2026",
      topic: "Fungsi Modular (def & return) & Game CLI",
      averageScore: 98,
      streak: "05 Hari",
      note: progress.weeklyNote,
    },
    {
      week: 3,
      period: "PEKAN 03 // OKTOBER 2026",
      topic: "Perulangan (for & while loop) dan List",
      averageScore: 95,
      streak: "04 Hari",
      note: "Andi memahami konsep perulangan dengan cepat. Ia mampu membuat tabel perkalian dinamis dan simulasi peluncuran roket mandiri.",
    },
    {
      week: 2,
      period: "PEKAN 02 // OKTOBER 2026",
      topic: "Operator Aritmatika & Percabangan if-elif-else",
      averageScore: 92,
      streak: "04 Hari",
      note: "Kemampuan analisis logika syarat berkembang pesat saat mengerjakan simulasi penentu grade rapor dan kategori umur.",
    },
    {
      week: 1,
      period: "PEKAN 01 // OKTOBER 2026",
      topic: "Input-Proses-Output, print(), dan Variabel",
      averageScore: 90,
      streak: "04 Hari",
      note: "Andi sangat antusias di pertemuan perdana. Kartu biodata digital yang dibuatnya di terminal sangat rapi dan mandiri.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090D] text-neutral-200 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="border-b border-white/[0.08] pb-5">
          <div className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
            EXECUTIVE ARCHIVE // ARSIP EVALUASI
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
            Arsip Rapor & Catatan Evaluasi Pengajar
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Rekapitulasi perkembangan nalar logika dan kepatuhan belajar murid Andi Pratama per pekan.
          </p>
        </div>

        <div className="space-y-4">
          {reports.map((r) => (
            <div
              key={r.week}
              className="p-5 rounded border border-white/[0.08] bg-[#0C1017] space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-mono border-b border-white/[0.06] pb-2.5">
                <span className="text-emerald-400 font-medium">
                  {r.period}
                </span>
                <span className="text-neutral-400">
                  RATA-RATA: <strong className="text-amber-400 font-medium tabular-nums">{r.averageScore} / 100</strong>
                </span>
              </div>

              <div>
                <h2 className="text-sm font-medium text-white">{r.topic}</h2>
                <div className="text-[11px] font-mono text-neutral-500 mt-0.5">
                  KONSISTENSI STREAK: {r.streak} BERTURUT-TURUT
                </div>
              </div>

              <div className="p-3.5 rounded border border-white/[0.06] bg-[#07090D] text-xs text-neutral-300 leading-relaxed font-sans">
                &ldquo;{r.note}&rdquo;
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
