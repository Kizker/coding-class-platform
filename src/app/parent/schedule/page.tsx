"use client";

import React from "react";
import { Clock, Calendar, Check } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 text-slate-900 py-6 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="border-b border-slate-200 pb-5">
          <div className="font-mono text-xs uppercase tracking-widest text-emerald-700 font-bold mb-1">
            EXECUTIVE AUDIT // JADWAL &amp; LOG KEHADIRAN
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Log Kehadiran Sesi Les Tatap Muka 2 Jam
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Total 24 pertemuan langsung tatap muka (120 menit per sesi) terjadwal bersama pengajar.
          </p>
        </div>

        {/* Attendance stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-slate-200 bg-white text-left space-y-1 shadow-xs font-mono">
            <span className="text-slate-500 text-[11px] font-bold block">TINGKAT KEHADIRAN</span>
            <strong className="text-2xl sm:text-3xl font-bold text-emerald-700 block tabular-nums">100%</strong>
            <span className="text-xs text-slate-600 block">07 DARI 07 SESI TUNTAS</span>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white text-left space-y-1 shadow-xs font-mono">
            <span className="text-slate-500 text-[11px] font-bold block">TOTAL DURASI TATAP MUKA</span>
            <strong className="text-2xl sm:text-3xl font-bold text-blue-700 block tabular-nums">14 JAM</strong>
            <span className="text-xs text-slate-600 block">BIMBINGAN LANGSUNG 1-ON-1</span>
          </div>
        </div>

        {/* Sessions list */}
        <div className="space-y-3">
          {sessions.map((s) => (
            <div
              key={s.num}
              className="p-5 rounded-xl border border-slate-200 bg-white space-y-2.5 shadow-xs"
            >
              <div className="flex items-center justify-between text-xs font-mono border-b border-slate-100 pb-2">
                <span className="text-slate-600 font-semibold">
                  SESI {String(s.num).padStart(2, "0")} // PEKAN {String(s.week).padStart(2, "0")}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold ${
                    s.status === "HADIR"
                      ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border border-amber-200 bg-amber-50 text-amber-800"
                  }`}
                >
                  {s.status === "HADIR" ? "HADIR (120 MIN)" : "TERJADWAL"}
                </span>
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900">{s.title}</h2>
                <div className="flex items-center space-x-1.5 text-xs text-slate-600 font-mono mt-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{s.day}</span>
                </div>
              </div>

              <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="font-mono text-[11px] text-slate-500 font-bold mr-1.5">CATATAN:</span>
                <span className="font-sans italic">{s.tutorNote}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
