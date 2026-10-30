import React from "react";
import { useSession } from "@/lib/auth/sessionContext";
import { Check, Terminal, FileCode } from "lucide-react";

export default function ParentShowcasePage() {
  const { progress } = useSession();
  const currentWeek = progress.currentWeek || 1;

  const projects = [
    {
      id: "cap-1",
      weekNumber: 4,
      milestone: "MILESTONE 01 // PEKAN 04",
      title: "Game CLI: Tebak Angka Rahasia Komputer",
      status: currentWeek >= 4 ? "TERVERIFIKASI (95/100)" : "TARGET BULAN PERTAMA (PEKAN 04)",
      isCompleted: currentWeek >= 4,
      description:
        "Game konsol interaktif di mana pemain menebak angka rahasia yang diacak oleh komputer dengan batas 5 kesempatan dan sistem petunjuk dinamis.",
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
      weekNumber: 8,
      milestone: "MILESTONE 02 // PEKAN 08",
      title: "Buku Kontak Telepon CRUD + CSV File Storage",
      status: currentWeek >= 8 ? "TERVERIFIKASI (98/100)" : "TARGET BULAN KEDUA (PEKAN 08)",
      isCompleted: currentWeek >= 8,
      description:
        "Sistem manajemen data kontak mandiri berbasis OOP dengan penyimpanan berkas CSV permanen di harddisk.",
      competenciesGained: [
        "Konsep Object Oriented Programming (Class & Object)",
        "Operasi berkas CSV (Baca, Tulis, Hapus, Perbarui data)",
        "Penanganan error try-except jika file tidak ditemukan",
      ],
      previewTerminal: `=== SISTEM BUKU KONTAK DIGITAL ===
1. Tambah Kontak
2. Cari Kontak
3. Hapus Kontak
>> Kontak berhasil disimpan ke kontak.csv!`,
    },
    {
      id: "cap-3",
      weekNumber: 12,
      milestone: "MILESTONE 03 // PEKAN 12",
      title: "Live Interactive Web App Portfolio (Demo Day)",
      status: currentWeek >= 12 ? "TERVERIFIKASI (100/100)" : "PROYEK WISUDA (PEKAN 12)",
      isCompleted: currentWeek >= 12,
      description:
        "Aplikasi web hidup berbasis Python yang dipresentasikan langsung di depan orang tua dan pengajar pada wisuda kelulusan.",
      competenciesGained: [
        "Interaksi Web UI modern dengan Python Backend",
        "Integrasi REST API dan pemrosesan JSON",
        "Presentasi proyek mandiri (Demo Day)",
      ],
      previewTerminal: `=== WEB APP BERJALAN PADA PORT 8501 ===
Status Server: ONLINE
Mode Wisuda: Siap Dipresentasikan`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-black font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="bg-white border-2.5 border-black p-6 sm:p-7 shadow-[5px_5px_0px_#000] space-y-2">
          <div className="font-mono text-xs uppercase tracking-widest text-black font-black bg-[#86EFAC] px-2.5 py-0.5 border border-black w-fit">
            EXECUTIVE PORTFOLIO // DOKUMENTASI RESMI KARYA
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black uppercase">
            Galeri Portofolio &amp; Program Siswa
          </h1>
          <p className="text-xs sm:text-sm text-stone-800 font-bold">
            Seluruh karya di bawah ini dikembangkan secara mandiri oleh Andi Pratama melalui bimbingan privat terstruktur 1-on-1.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-white border-2.5 border-black p-6 sm:p-8 shadow-[4px_4px_0px_#000] space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-4 text-xs font-mono">
                <span className="font-black bg-[#FEF08A] px-2.5 py-0.5 border border-black uppercase">
                  {p.milestone}
                </span>
                <span
                  className={`font-black px-3 py-1 border border-black uppercase ${
                    p.isCompleted ? "bg-[#86EFAC] text-black" : "bg-[#FED7AA] text-black"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-black text-black uppercase tracking-tight">{p.title}</h2>
                <p className="text-xs sm:text-sm text-stone-800 font-bold mt-1 leading-relaxed">
                  {p.description}
                </p>
              </div>

              {/* Competencies */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-black uppercase text-stone-700 block">
                  KOMPETENSI YANG DIKUASAI:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {p.competenciesGained.map((c, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 bg-[#FEF08A] p-2.5 border border-black font-bold text-black"
                    >
                      <Check className="w-4 h-4 text-black stroke-[3] shrink-0" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-mono font-black text-black">
                  <span className="flex items-center space-x-1.5">
                    <Terminal className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>OUTPUT CONSOLE // HASIL PROGRAM SISWA</span>
                  </span>
                  <span className="bg-white border border-black px-2 py-0.5 text-[10px]">READ_ONLY</span>
                </div>
                <pre className="p-4 bg-black border-2 border-black text-xs text-yellow-300 font-mono overflow-x-auto leading-relaxed shadow-[3px_3px_0px_#000]">
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
