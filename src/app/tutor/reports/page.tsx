"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth/sessionContext";
import {
  MessageSquare,
  Copy,
  Check,
  Send,
  Phone,
  ArrowRight,
  ShieldCheck,
  Terminal,
} from "lucide-react";

export default function TutorWhatsAppReportPage() {
  const { progress } = useSession();
  const [copied, setCopied] = useState<boolean>(false);
  const [parentPhone, setParentPhone] = useState<string>("081234567890");

  const reportText = `[LAPORAN PERKEMBANGAN BELAJAR KODING // PEKAN KE-${progress.currentWeek}]
Yth. Bapak/Ibu Wali Murid Andi Pratama,
Berikut kami sampaikan ringkasan capaian pembelajaran les privat koding pekan ini.

1. PROGRES KURIKULUM & TARGET
- Pekan Berjalan : Minggu ke-${progress.currentWeek} dari 12 Pekan (Fase 1: Fondasi Logika & Capstone 1)
- Akumulasi XP   : ${progress.xpPoints} XP
- Konsistensi    : ${progress.streakDays} Hari berturut-turut

2. KEPATUHAN PR HARIAN (SENIN - KAMIS)
- Senin  [Recall]       : 100/100 (print & Input-Process-Output)
- Selasa [Code Reading] : 95/100  (Alur Eksekusi & Tracing Nilai)
- Rabu   [Debugging]    : 95/100  (Identifikasi & Perbaikan SyntaxError)
- Kamis  [Pre-reading]  : 100/100 (Variabel & Tipe Data Memori)

3. SESI TATAP MUKA 2 JAM (AKHIR PEKAN)
- Jumat  (Sesi 07): Fungsi Modular (def & return)
- Sabtu  (Sesi 08): Capstone 1 (Game CLI Interaktif Tebak Angka)

4. EVALUASI NALAR LOGIKA PENGAJAR
"${progress.weeklyNote}"

--------------------------------------------------
PORTAL MONITORING ORANG TUA:
Bapak/Ibu dapat meninjau log kehadiran, arsip nilai, dan hasil karya program anak secara langsung melalui portal:
http://localhost:3000/parent/overview

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
    <div className="min-h-screen bg-[#07090D] text-neutral-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-white/[0.08] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2 flex items-center space-x-2">
              <span>TUTOR // DISPATCH</span>
              <span>/</span>
              <span className="text-emerald-400">RAPOR MINGGUAN</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Generator Rapor WhatsApp Orang Tua
            </h1>
            <p className="text-xs text-neutral-400 mt-1 max-w-xl">
              Format laporan otomatis terstruktur rapi untuk pelaporan transparansi dan evaluasi kualitatif kepada wali murid.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded border border-white/[0.1] bg-[#0C1017] hover:bg-white/[0.05] text-neutral-300 font-mono text-xs transition flex items-center space-x-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">TERSALIN</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>SALIN TEKS</span>
                </>
              )}
            </button>

            <button
              onClick={handleOpenWhatsApp}
              className="px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-mono text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>KIRIM WHATSAPP</span>
            </button>
          </div>
        </div>

        {/* Recipient phone metadata bar */}
        <div className="p-4 rounded border border-white/[0.08] bg-[#0C1017] flex items-center justify-between flex-wrap gap-4 text-xs font-mono">
          <div className="flex items-center space-x-3">
            <span className="text-neutral-500">PENERIMA:</span>
            <span className="text-neutral-200">Bambang Pratama (Wali Murid)</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-neutral-500">NOMOR WA:</span>
            <input
              type="text"
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
              className="bg-[#07090D] border border-white/[0.12] rounded px-3 py-1 text-xs text-neutral-200 font-mono focus:outline-none focus:border-emerald-500 w-36"
            />
          </div>
        </div>

        {/* Dispatch Preview in clean monospace terminal container */}
        <div className="rounded border border-white/[0.08] bg-[#0C1017] overflow-hidden">
          <div className="px-4 py-2.5 border-b border-white/[0.06] bg-[#090D14] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2 text-neutral-400">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>DISPATCH_PREVIEW // WHATSAPP_FORMAT</span>
            </div>
            <span className="text-neutral-500 text-[11px]">
              AUTOSYNCED FROM DATABASE
            </span>
          </div>

          <div className="p-6 bg-[#06080C] overflow-x-auto">
            <pre className="text-xs font-mono text-neutral-300 leading-relaxed whitespace-pre-wrap selection:bg-emerald-950 selection:text-emerald-300">
              {reportText}
            </pre>
          </div>

          <div className="px-4 py-2 border-t border-white/[0.06] bg-[#090D14] flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span>FORMAT: UTF-8 PLAIN / MARKDOWN</span>
            <span>SIAP DIKIRIM KE WALI MURID</span>
          </div>
        </div>
      </div>
    </div>
  );
}
