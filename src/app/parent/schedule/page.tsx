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
    <div className="min-h-screen bg-[#07090D] text-neutral-200 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="border-b border-white/[0.08] pb-5">
          <div className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
            EXECUTIVE AUDIT // JADWAL & LOG KEHADIRAN
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
            Log Kehadiran Sesi Les Tatap Muka 2 Jam
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Total 24 pertemuan langsung tatap muka (120 menit per sesi) terjadwal bersama pengajar.
          </p>
        </div>

        {/* Attendance stats */}
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-4 rounded border border-white/[0.08] bg-[#0C1017] text-left space-y-1">
            <span className="text-neutral-500 text-[11px] block">TINGKAT KEHADIRAN</span>
            <strong className="text-2xl font-medium text-emerald-400 block tabular-nums">100%</strong>
            <span className="text-[11px] text-neutral-400 block">07 DARI 07 SESI TUNTAS</span>
          </div>

          <div className="p-4 rounded border border-white/[0.08] bg-[#0C1017] text-left space-y-1">
            <span className="text-neutral-500 text-[11px] block">TOTAL DURASI TATAP MUKA</span>
            <strong className="text-2xl font-medium text-amber-400 block tabular-nums">14 JAM</strong>
            <span className="text-[11px] text-neutral-400 block">BIMBINGAN LANGSUNG 1-ON-1</span>
          </div>
        </div>

        {/* Sessions list */}
        <div className="space-y-3">
          {sessions.map((s) => (
            <div
              key={s.num}
              className="p-4 rounded border border-white/[0.08] bg-[#0C1017] space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs font-mono border-b border-white/[0.06] pb-2">
                <span className="text-neutral-400">
                  SESI {String(s.num).padStart(2, "0")} // PEKAN {String(s.week).padStart(2, "0")}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                    s.status === "HADIR"
                      ? "border border-emerald-500/30 bg-emerald-950/20 text-emerald-400"
                      : "border border-amber-500/30 bg-amber-950/20 text-amber-400"
                  }`}
                >
                  {s.status === "HADIR" ? "HADIR (120 MIN)" : "TERJADWAL"}
                </span>
              </div>

              <div>
                <h2 className="text-sm font-medium text-white">{s.title}</h2>
                <div className="flex items-center space-x-1.5 text-xs text-neutral-400 font-mono mt-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{s.day}</span>
                </div>
              </div>

              <div className="text-xs text-neutral-400 bg-[#07090D] p-2.5 rounded border border-white/[0.06]">
                <span className="font-mono text-[11px] text-neutral-500 mr-1.5">CATATAN:</span>
                <span className="text-neutral-300 font-sans italic">{s.tutorNote}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
