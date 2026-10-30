import React from "react";
import { useSession } from "@/lib/auth/sessionContext";
import { CURRICULUM_DATA } from "@/data/curriculum";
import { Clock, Calendar, CheckCircle2 } from "lucide-react";

export default function ParentSchedulePage() {
  const { progress } = useSession();
  const currentWeek = progress.currentWeek || 1;

  // Generate sessions up to week 4 (Fase 1) or all active weeks
  const allSessions: Array<{
    num: number;
    week: number;
    day: string;
    title: string;
    status: "HADIR" | "AKTIF_HARI_INI" | "TERJADWAL";
    tutorNote: string;
  }> = [];

  for (let w = 1; w <= Math.min(12, Math.max(currentWeek + 1, 4)); w++) {
    const weekData = CURRICULUM_DATA.find((item) => item.week === w) || CURRICULUM_DATA[0];
    const s1 = weekData.liveSessions.find((s) => s.day === "jumat");
    const s2 = weekData.liveSessions.find((s) => s.day === "sabtu");

    const s1Num = (w - 1) * 2 + 1;
    const s2Num = (w - 1) * 2 + 2;

    let s1Status: "HADIR" | "AKTIF_HARI_INI" | "TERJADWAL" = "TERJADWAL";
    let s2Status: "HADIR" | "AKTIF_HARI_INI" | "TERJADWAL" = "TERJADWAL";

    if (w < currentWeek) {
      s1Status = "HADIR";
      s2Status = "HADIR";
    } else if (w === currentWeek) {
      s1Status = "AKTIF_HARI_INI";
      s2Status = "TERJADWAL";
    }

    allSessions.push({
      num: s1Num,
      week: w,
      day: "Jumat, 16.00 - 18.00 WIB",
      title: s1 ? s1.title : `Pertemuan ${s1Num}: Logika & Praktik`,
      status: s1Status,
      tutorNote:
        s1Status === "HADIR"
          ? "Siswa hadir tepat waktu, antusias mempraktikkan konsep logika."
          : s1Status === "AKTIF_HARI_INI"
          ? "Sesi tatap muka hari ini via Zoom/Google Meet 1-on-1."
          : "Sesi terjadwal sesuai kalender bimbingan.",
    });

    allSessions.push({
      num: s2Num,
      week: w,
      day: "Sabtu, 16.00 - 18.00 WIB",
      title: s2 ? s2.title : `Pertemuan ${s2Num}: Praktik Studi Kasus`,
      status: s2Status,
      tutorNote:
        s2Status === "HADIR"
          ? "Penerapan mandiri dan bedah studi kasus tuntas dikerjakan."
          : "Sesi terjadwal akhir pekan.",
    });
  }

  const completedSessions = allSessions.filter((s) => s.status === "HADIR").length;
  const totalHours = completedSessions * 2;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-black font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="bg-white border-2.5 border-black p-6 sm:p-7 shadow-[5px_5px_0px_#000] space-y-2">
          <div className="text-xs font-mono font-black uppercase tracking-widest text-black bg-[#86EFAC] px-2.5 py-0.5 border border-black w-fit">
            EXECUTIVE AUDIT // JADWAL &amp; LOG KEHADIRAN
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black uppercase">
            Log Kehadiran Sesi Les Tatap Muka 2 Jam
          </h1>
          <p className="text-xs sm:text-sm text-stone-800 font-bold">
            Total 24 pertemuan langsung tatap muka (120 menit per sesi) intensif 1-on-1 bersama instruktur.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border-2.5 border-black p-5 shadow-[4px_4px_0px_#000] space-y-1">
            <span className="text-[11px] font-black uppercase text-stone-700 block">TINGKAT KEHADIRAN</span>
            <strong className="text-2xl sm:text-3xl font-black text-black block tabular-nums">
              {completedSessions > 0 ? "100%" : "0% (Pekan 1)"}
            </strong>
            <span className="text-xs font-bold text-stone-700 block">
              {String(completedSessions).padStart(2, "0")} DARI 24 SESI TUNTAS
            </span>
          </div>

          <div className="bg-white border-2.5 border-black p-5 shadow-[4px_4px_0px_#000] space-y-1">
            <span className="text-[11px] font-black uppercase text-stone-700 block">TOTAL DURASI TATAP MUKA</span>
            <strong className="text-2xl sm:text-3xl font-black text-black block tabular-nums">
              {totalHours} JAM
            </strong>
            <span className="text-xs font-bold text-stone-700 block">
              BIMBINGAN LANGSUNG INTENSIF 1-ON-1
            </span>
          </div>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {allSessions.map((s) => (
            <div
              key={s.num}
              className="bg-white border-2.5 border-black p-5 sm:p-6 shadow-[3px_3px_0px_#000] space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono border-b-2 border-black pb-2.5">
                <span className="text-black font-black uppercase">
                  SESI {String(s.num).padStart(2, "0")} // PEKAN {String(s.week).padStart(2, "0")}
                </span>
                <span
                  className={`px-3 py-1 text-[11px] font-mono font-black border border-black uppercase ${
                    s.status === "HADIR"
                      ? "bg-[#86EFAC] text-black"
                      : s.status === "AKTIF_HARI_INI"
                      ? "bg-[#FEF08A] text-black animate-pulse"
                      : "bg-white text-stone-700"
                  }`}
                >
                  {s.status === "HADIR"
                    ? "HADIR (120 MENIT)"
                    : s.status === "AKTIF_HARI_INI"
                    ? "LIVE HARI INI 16.00 WIB"
                    : "TERJADWAL"}
                </span>
              </div>

              <div>
                <h2 className="text-base font-black text-black uppercase">{s.title}</h2>
                <div className="flex items-center space-x-1.5 text-xs text-stone-800 font-bold font-mono mt-1">
                  <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{s.day}</span>
                </div>
              </div>

              <div className="bg-[#FEF08A] p-3.5 border-2 border-black text-xs text-black font-bold">
                <span className="font-mono text-[11px] uppercase mr-1.5">CATATAN:</span>
                <span className="italic">{s.tutorNote}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
