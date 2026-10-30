import React from "react";
import { useSession } from "@/lib/auth/sessionContext";
import { FileText, Award } from "lucide-react";

export default function ParentReportsPage() {
  const { progress } = useSession();
  const currentWeek = progress.currentWeek || 1;

  const reports = [
    {
      week: 4,
      period: "PEKAN 04 // FASE 1 SELESAI",
      topic: "Fungsi Modular (def & return) & Game CLI",
      averageScore: 98,
      streak: "5 Hari",
      note:
        currentWeek === 4
          ? progress.weeklyNote
          : "Andi telah menyelesaikan Capstone 1 Game CLI dengan logika kemenangan komputer yang tuntas.",
    },
    {
      week: 3,
      period: "PEKAN 03 // OKTOBER 2026",
      topic: "Perulangan (for & while loop) dan List",
      averageScore: 95,
      streak: "4 Hari",
      note:
        currentWeek === 3
          ? progress.weeklyNote
          : "Andi memahami konsep perulangan dengan cepat. Ia mampu membuat tabel perkalian dinamis dan simulasi peluncuran roket mandiri.",
    },
    {
      week: 2,
      period: "PEKAN 02 // OKTOBER 2026",
      topic: "Operator Aritmatika & Percabangan if-elif-else",
      averageScore: 92,
      streak: "4 Hari",
      note:
        currentWeek === 2
          ? progress.weeklyNote
          : "Kemampuan analisis logika syarat berkembang pesat saat mengerjakan simulasi penentu grade rapor dan kategori umur.",
    },
    {
      week: 1,
      period: "PEKAN 01 // FONDASI AWAL",
      topic: "Input-Proses-Output, print(), dan Variabel",
      averageScore: 95,
      streak: `${progress.streakDays || 3} Hari`,
      note:
        currentWeek === 1
          ? progress.weeklyNote
          : "Andi sangat antusias di pertemuan perdana. Kartu biodata digital yang dibuatnya di terminal sangat rapi dan mandiri.",
    },
  ];

  const activeReports = reports.filter((r) => r.week <= currentWeek);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-black font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="bg-white border-2.5 border-black p-6 sm:p-7 shadow-[5px_5px_0px_#000] space-y-2">
          <div className="text-xs font-mono font-black uppercase tracking-widest text-black bg-[#86EFAC] px-2.5 py-0.5 border border-black w-fit">
            EXECUTIVE ARCHIVE // ARSIP EVALUASI MINGGUAN
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black uppercase">
            Arsip Rapor &amp; Catatan Evaluasi Pengajar
          </h1>
          <p className="text-xs sm:text-sm text-stone-800 font-bold">
            Rekapitulasi perkembangan nalar logika dan kepatuhan belajar murid Andi Pratama yang dirilis setiap akhir pekan.
          </p>
        </div>

        {/* Reports List */}
        <div className="space-y-5">
          {activeReports.map((r) => (
            <div
              key={r.week}
              className="bg-white border-2.5 border-black p-6 sm:p-7 shadow-[4px_4px_0px_#000] space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono border-b-2 border-black pb-3">
                <span className="text-black font-black bg-[#FEF08A] px-2.5 py-0.5 border border-black">
                  {r.period}
                </span>
                <span className="text-black font-black">
                  NILAI RATA-RATA: <strong className="text-black bg-[#86EFAC] px-2 py-0.5 border border-black">{r.averageScore} / 100</strong>
                </span>
              </div>

              <div>
                <h2 className="text-lg font-black text-black uppercase tracking-tight">{r.topic}</h2>
                <div className="text-[11px] font-mono text-stone-700 mt-1 font-bold">
                  KONSISTENSI STREAK: {r.streak} BERTURUT-TURUT
                </div>
              </div>

              <div className="bg-[#FEF08A] p-4 sm:p-5 border-2 border-black shadow-[2px_2px_0px_#000] text-xs sm:text-sm text-black leading-relaxed font-bold italic">
                &ldquo;{r.note}&rdquo;
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
