import React, { useState } from "react";
import { useSession } from "@/lib/auth/sessionContext";
import { CURRICULUM_DATA } from "@/data/curriculum";
import {
  Copy,
  Check,
  Send,
  Terminal,
} from "lucide-react";

export default function TutorWhatsAppReportPage() {
  const { progress } = useSession();
  const [copied, setCopied] = useState<boolean>(false);
  const [parentPhone, setParentPhone] = useState<string>("081234567890");

  const currentWeek = progress.currentWeek || 1;
  const currentWeekData = CURRICULUM_DATA.find((w) => w.week === currentWeek) || CURRICULUM_DATA[0];
  const s1 = currentWeekData.liveSessions.find((s) => s.day === "jumat");
  const s2 = currentWeekData.liveSessions.find((s) => s.day === "sabtu");
  const s1Title = s1 ? s1.title.replace(/^Pertemuan \d+:\s*/, "") : "Logika & Praktik Terpandu";
  const s2Title = s2 ? s2.title.replace(/^Pertemuan \d+:\s*/, "") : "Praktik Terapan & Proyek";
  const s1Num = String((currentWeek - 1) * 2 + 1).padStart(2, "0");
  const s2Num = String((currentWeek - 1) * 2 + 2).padStart(2, "0");

  const reportText = `[LAPORAN PERKEMBANGAN BELAJAR KODING // PEKAN KE-${currentWeek}]
Yth. Bapak/Ibu Wali Murid Andi Pratama,
Berikut kami sampaikan ringkasan capaian pembelajaran les privat koding pekan ini.

1. PROGRES KURIKULUM & TARGET
- Pekan Berjalan : Minggu ke-${currentWeek} dari 12 Pekan (${currentWeekData.title})
- Akumulasi XP   : ${progress.xpPoints} XP
- Konsistensi    : ${progress.streakDays} Hari berturut-turut

2. KEPATUHAN PR HARIAN (SENIN - KAMIS)
- Senin  [Recall]       : 100/100 (print & Input-Process-Output)
- Selasa [Code Reading] : 95/100  (Alur Eksekusi & Tracing Nilai)
- Rabu   [Debugging]    : 95/100  (Identifikasi & Perbaikan SyntaxError)
- Kamis  [Pre-reading]  : 100/100 (Variabel & Tipe Data Memori)

3. SESI TATAP MUKA 2 JAM (AKHIR PEKAN)
- Jumat  (Sesi ${s1Num}): ${s1Title}
- Sabtu  (Sesi ${s2Num}): ${s2Title}

4. EVALUASI NALAR LOGIKA PENGAJAR
"${progress.weeklyNote}"

--------------------------------------------------
PORTAL MONITORING ORANG TUA:
Bapak/Ibu dapat meninjau log kehadiran, arsip nilai, dan hasil karya program anak secara langsung melalui portal:
https://coding-class.labtry.my.id/parent/overview

Salam hormat,
Andricha Dea Mitra (Kak Tutor)`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
    }
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(reportText);
    const cleanPhone = parentPhone.replace(/^0/, "62").replace(/\D/g, "");
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-black font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="bg-white border-2.5 border-black p-6 sm:p-7 shadow-[5px_5px_0px_#000] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest font-black mb-1 flex items-center space-x-2 bg-[#86EFAC] px-2 py-0.5 border border-black w-fit">
              <span>TUTOR // DISPATCH</span>
              <span>/</span>
              <span>RAPOR MINGGUAN</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black uppercase">
              Generator Rapor WhatsApp Orang Tua
            </h1>
            <p className="text-xs sm:text-sm text-stone-800 font-bold mt-1 max-w-xl">
              Format laporan otomatis terstruktur rapi untuk pelaporan transparansi dan evaluasi kualitatif kepada wali murid.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 border-2 border-black bg-white hover:bg-[#FEF08A] text-black font-black text-xs transition flex items-center space-x-2 cursor-pointer shadow-[2px_2px_0px_#000] uppercase"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-black stroke-[3]" />
                  <span>TERSALIN</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-black stroke-[2.5]" />
                  <span>SALIN TEKS</span>
                </>
              )}
            </button>

            <button
              onClick={handleOpenWhatsApp}
              className="px-5 py-2.5 bg-[#86EFAC] hover:bg-emerald-400 text-black border-2 border-black font-black text-xs transition flex items-center space-x-2 cursor-pointer shadow-[3px_3px_0px_#000] uppercase"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
              <span>KIRIM WHATSAPP</span>
            </button>
          </div>
        </div>

        {/* Recipient phone metadata bar */}
        <div className="p-4 sm:p-5 bg-white border-2 border-black flex items-center justify-between flex-wrap gap-4 text-xs font-mono shadow-[3px_3px_0px_#000]">
          <div className="flex items-center space-x-3">
            <span className="text-stone-700 font-black">PENERIMA:</span>
            <span className="text-black font-black font-sans uppercase">Bambang Pratama (Wali Murid)</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-stone-700 font-black">NOMOR WA:</span>
            <input
              type="text"
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
              className="bg-white border-2 border-black px-3.5 py-1.5 text-xs text-black font-mono focus:outline-none w-44 font-black shadow-[2px_2px_0px_#000]"
            />
          </div>
        </div>

        {/* Dispatch Preview */}
        <div className="border-2.5 border-black bg-white overflow-hidden shadow-[5px_5px_0px_#000]">
          <div className="px-5 py-3.5 border-b-2 border-black bg-[#FEF08A] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2 text-black font-black">
              <Terminal className="w-4 h-4 text-black stroke-[2.5]" />
              <span>DISPATCH_PREVIEW // WHATSAPP_FORMAT</span>
            </div>
            <span className="text-black text-[11px] font-black bg-white px-2 py-0.5 border border-black">
              AUTOSYNCED FROM DATABASE
            </span>
          </div>

          <div className="p-6 bg-black overflow-x-auto">
            <pre className="text-xs font-mono text-yellow-300 leading-relaxed whitespace-pre-wrap selection:bg-emerald-800">
              {reportText}
            </pre>
          </div>

          <div className="px-5 py-3 border-t-2 border-black bg-[#FDFBF7] flex items-center justify-between text-[11px] font-mono text-black">
            <span className="font-black">FORMAT: UTF-8 PLAIN / MARKDOWN</span>
            <span className="text-black font-black uppercase bg-[#86EFAC] px-2 py-0.5 border border-black">SIAP DIKIRIM KE WALI MURID</span>
          </div>
        </div>
      </div>
    </div>
  );
}
