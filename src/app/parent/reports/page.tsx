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

  const activeReports = reports.filter((r) => r.week <= (progress.currentWeek || 1));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-6 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="ui-card-outer p-6 sm:p-7 space-y-2">
          <div className="font-mono text-xs uppercase tracking-widest text-emerald-700 font-extrabold mb-1">
            EXECUTIVE ARCHIVE // ARSIP EVALUASI
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Arsip Rapor &amp; Catatan Evaluasi Pengajar
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Rekapitulasi perkembangan nalar logika dan kepatuhan belajar murid Andi Pratama per pekan.
          </p>
        </div>

        <div className="space-y-5">
          {activeReports.map((r) => (
            <div
              key={r.week}
              className="ui-card-outer p-6 sm:p-7 rounded-2xl space-y-4"
            >
              <div className="flex items-center justify-between text-xs font-mono border-b border-slate-100 pb-3">
                <span className="text-emerald-700 font-extrabold">
                  {r.period}
                </span>
                <span className="text-slate-600 font-bold">
                  RATA-RATA: <strong className="text-slate-900 tabular-nums">{r.averageScore} / 100</strong>
                </span>
              </div>

              <div>
                <h2 className="text-base font-extrabold text-slate-900">{r.topic}</h2>
                <div className="text-[11px] font-mono text-slate-500 mt-0.5 font-bold">
                  KONSISTENSI STREAK: {r.streak} BERTURUT-TURUT
                </div>
              </div>

              <div className="ui-card-inner p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans italic">
                &ldquo;{r.note}&rdquo;
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
