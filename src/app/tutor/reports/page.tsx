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
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="ui-card-outer p-6 sm:p-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-emerald-700 font-extrabold mb-1 flex items-center space-x-2">
              <span>TUTOR // DISPATCH</span>
              <span>/</span>
              <span>RAPOR MINGGUAN</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Generator Rapor WhatsApp Orang Tua
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Format laporan otomatis terstruktur rapi untuk pelaporan transparansi dan evaluasi kualitatif kepada wali murid.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs transition flex items-center space-x-2 cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">TERSALIN</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>SALIN TEKS</span>
                </>
              )}
            </button>

            <button
              onClick={handleOpenWhatsApp}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center space-x-2 cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>KIRIM WHATSAPP</span>
            </button>
          </div>
        </div>

        {/* Recipient phone metadata bar */}
        <div className="ui-card-inner p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between flex-wrap gap-4 text-xs font-mono shadow-xs">
          <div className="flex items-center space-x-3">
            <span className="text-slate-500 font-bold">PENERIMA:</span>
            <span className="text-slate-900 font-extrabold font-sans">Bambang Pratama (Wali Murid)</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-500 font-bold">NOMOR WA:</span>
            <input
              type="text"
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-1.5 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 w-40 shadow-2xs font-bold"
            />
          </div>
        </div>

        {/* Dispatch Preview */}
        <div className="ui-card-outer rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
          <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2 text-slate-800 font-bold">
              <Terminal className="w-4 h-4 text-emerald-700" />
              <span>DISPATCH_PREVIEW // WHATSAPP_FORMAT</span>
            </div>
            <span className="text-slate-500 text-[11px] font-bold">
              AUTOSYNCED FROM DATABASE
            </span>
          </div>

          <div className="p-6 bg-slate-900 overflow-x-auto">
            <pre className="text-xs font-mono text-slate-100 leading-relaxed whitespace-pre-wrap selection:bg-emerald-800">
              {reportText}
            </pre>
          </div>

          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span className="font-bold">FORMAT: UTF-8 PLAIN / MARKDOWN</span>
            <span className="text-emerald-700 font-extrabold">SIAP DIKIRIM KE WALI MURID</span>
          </div>
        </div>
      </div>
    </div>
  );
}
