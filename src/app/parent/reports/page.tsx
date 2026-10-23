"use client";

import React from "react";
import { useSession } from "@/lib/auth/sessionContext";
import { FileText, Sparkles, CheckCircle2, Calendar } from "lucide-react";

export default function ParentReportsPage() {
  const { progress } = useSession();

  const reports = [
    {
      week: 4,
      period: "Pekan 4 (Oktober 2026)",
      topic: "Fungsi Modular (def & return) & Game CLI",
      averageScore: 98,
      streak: "5 Hari",
      note: progress.weeklyNote,
    },
    {
      week: 3,
      period: "Pekan 3 (Oktober 2026)",
      topic: "Perulangan (for & while loop) dan List",
      averageScore: 95,
      streak: "4 Hari",
      note: "Andi memahami konsep perulangan dengan cepat. Ia mampu membuat tabel perkalian dinamis dan simulasi peluncuran roket mandiri.",
    },
    {
      week: 2,
      period: "Pekan 2 (Oktober 2026)",
      topic: "Operator Aritmatika & Percabangan if-elif-else",
      averageScore: 92,
      streak: "4 Hari",
      note: "Kemampuan analisis logika syarat berkembang pesat saat mengerjakan simulasi penentu grade rapor dan kategori umur.",
    },
    {
      week: 1,
      period: "Pekan 1 (Oktober 2026)",
      topic: "Input-Proses-Output, print(), dan Variabel",
      averageScore: 90,
      streak: "4 Hari",
      note: "Andi sangat antusias di pertemuan perdana. Kartu biodata digital yang dibuatnya di terminal sangat rapi dan kreatif.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <span>Arsip Rapor & Catatan Mingguan Kak Tutor</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Rekap perkembangan nalar logika dan kepatuhan belajar Andi Pratama per pekan.
          </p>
        </div>

        <div className="space-y-4">
          {reports.map((r) => (
            <div
              key={r.week}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                  {r.period}
                </span>
                <span className="text-slate-400 font-mono">
                  Rata-rata: <strong className="text-amber-400">{r.averageScore}/100</strong>
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{r.topic}</h3>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Konsistensi Streak: 🔥 {r.streak}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed italic">
                &ldquo;{r.note}&rdquo;
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
