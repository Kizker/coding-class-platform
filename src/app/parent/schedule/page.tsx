"use client";

import React from "react";
import { Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function ParentSchedulePage() {
  const sessions = [
    {
      num: 1,
      week: 1,
      day: "Jumat, 16.00 - 18.00 WIB",
      title: "Logika Komputer, IPO & Fungsi print()",
      status: "HADIR",
      tutorNote: "Hadir tepat waktu, sangat aktif bertanya.",
    },
    {
      num: 2,
      week: 1,
      day: "Sabtu, 16.00 - 18.00 WIB",
      title: "Kotak Memori: Variabel & Tipe Data Dasar",
      status: "HADIR",
      tutorNote: "Mampu membedakan string dan integer dengan tepat.",
    },
    {
      num: 3,
      week: 2,
      day: "Jumat, 16.00 - 18.00 WIB",
      title: "Otak Berhitung: Operator Aritmatika & Modulo (%)",
      status: "HADIR",
      tutorNote: "Nalar matematis konverter waktu tuntas.",
    },
    {
      num: 4,
      week: 2,
      day: "Sabtu, 16.00 - 18.00 WIB",
      title: "Komputer Mengambil Keputusan: Percabangan if-elif-else",
      status: "HADIR",
      tutorNote: "Berhasil membuat seleksi nilai ujian.",
    },
    {
      num: 5,
      week: 3,
      day: "Jumat, 16.00 - 18.00 WIB",
      title: "Otomatisasi Perulangan: for loop & range()",
      status: "HADIR",
      tutorNote: "Tabel perkalian dan roket hitung mundur selesai.",
    },
    {
      num: 6,
      week: 3,
      day: "Sabtu, 16.00 - 18.00 WIB",
      title: "Lemari Penyimpanan Data: Struktur Data List",
      status: "HADIR",
      tutorNote: "Manipulasi list belanja berhasil.",
    },
    {
      num: 7,
      week: 4,
      day: "Jumat, 16.00 - 18.00 WIB",
      title: "Membuat Mesin Mandiri: Fungsi Modular (def & return)",
      status: "HADIR",
      tutorNote: "Paham return value dan modular code.",
    },
    {
      num: 8,
      week: 4,
      day: "Sabtu, 16.00 - 18.00 WIB",
      title: "Eksekusi Capstone 1: Game CLI Interaktif",
      status: "JADWAL BERIKUTNYA",
      tutorNote: "Sesi akhir pekan ini.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <span>Jadwal Les Privat Tatap Muka 2 Jam (Jumat & Sabtu)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Total 24 Pertemuan Langsung (120 Menit per sesi) bersama Kak Tutor.
          </p>
        </div>

        {/* Attendance stats */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
            <span className="text-slate-400 text-[11px] block">Tingkat Kehadiran</span>
            <strong className="text-xl font-bold text-emerald-400">100%</strong>
            <span className="text-[10px] text-slate-500 block">7 dari 7 Sesi Hadir</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
            <span className="text-slate-400 text-[11px] block">Total Durasi Belajar</span>
            <strong className="text-xl font-bold text-indigo-400">14 Jam</strong>
            <span className="text-[10px] text-slate-500 block">Bimbingan 1-on-1 Langsung</span>
          </div>
        </div>

        {/* Sessions list */}
        <div className="space-y-3">
          {sessions.map((s) => (
            <div
              key={s.num}
              className={`p-4 rounded-xl border transition space-y-2 ${
                s.status === "HADIR"
                  ? "bg-slate-900/80 border-slate-800"
                  : "bg-indigo-950/30 border-indigo-700/60 shadow-lg"
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-400">
                  Pertemuan {s.num} (Pekan {s.week})
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    s.status === "HADIR"
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-700"
                      : "bg-indigo-950 text-indigo-300 border border-indigo-700 animate-pulse"
                  }`}
                >
                  {s.status === "HADIR" ? "✅ HADIR (2 JAM)" : "⏳ SESI BERIKUTNYA"}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{s.title}</h3>
                <div className="flex items-center space-x-1 text-xs text-indigo-300 mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{s.day}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                Catatan Sesi: <span className="text-slate-300 italic">{s.tutorNote}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
