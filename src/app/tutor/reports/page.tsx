"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth/sessionContext";
import {
  MessageSquare,
  Copy,
  CheckCircle2,
  Share2,
  ExternalLink,
  Sparkles,
  Phone,
} from "lucide-react";

export default function TutorWhatsAppReportPage() {
  const { progress } = useSession();
  const [copied, setCopied] = useState<boolean>(false);
  const [parentPhone, setParentPhone] = useState<string>("081234567890");

  const reportText = `*LAPORAN PERKEMBANGAN BELAJAR KODING (PEKAN KE-${progress.currentWeek})*
Halo Ayah/Bunda Andi Pratama, salam hangat dari Kak Tutor! 👋

Berikut kami sampaikan rekap pembelajaran les private koding pekan ini:

📊 *1. KEMAJUAN ROADMAP BELAJAR*
• Minggu ke: ${progress.currentWeek} dari 12 Pekan (Fase 1: Fondasi Logika & Capstone 1)
• Total Pengalaman: ${progress.xpPoints} XP
• Konsistensi Streak: 🔥 ${progress.streakDays} Hari Berturut-turut!

📅 *2. KONSISTENSI PR HARIAN (SENIN–KAMIS)*
• Senin  (PR 1 - Recall):       ✅ 100/100 (print & IPO)
• Selasa (PR 2 - Code Reading): ✅ 95/100 (Alur Eksekusi)
• Rabu   (PR 3 - Debugging):    ✅ 95/100 (SyntaxError)
• Kamis  (PR 4 - Pre-read):     ✅ 100/100 (Variabel & Memori)

⏰ *3. SESI TATAP MUKA LANGSUNG 2 JAM (AKHIR PEKAN)*
• Jumat (Pertemuan 7): Membuat Mesin Mandiri (Fungsi Modular def & return)
• Sabtu (Pertemuan 8): Eksekusi Capstone 1 (Game CLI Interaktif)

🌟 *4. CATATAN EVALUASI NALAR LOGIKA DARI PENGAJAR*
"${progress.weeklyNote}"

---
📱 *Portal Pemantauan Orang Tua (Live Monitoring):*
Ayah/Bunda dapat melihat detail nilai, kalender kepatuhan, dan dokumentasi hasil karya program anak kapan saja melalui tautan resmi:
http://localhost:3000/parent/overview

Terima kasih atas dukungannya dalam memfasilitasi masa depan teknologi Ananda! 🙏
_Salam hangat, Kak Tutor (Andri)_`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
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
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-Click Report Automation</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <MessageSquare className="w-6 h-6 text-emerald-400" />
              <span>WhatsApp Report Generator untuk Orang Tua</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Rapor mingguan otomatis terformat rapi sesuai gaya komunikasi profesional dan mudah dipahami orang tua murid.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition flex items-center space-x-2 border border-slate-700 cursor-pointer"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Tersalin ke Clipboard!" : "Salin Teks"}</span>
            </button>

            <button
              onClick={handleOpenWhatsApp}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center space-x-2 shadow-xl shadow-emerald-600/30 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Kirim via WhatsApp &rarr;</span>
            </button>
          </div>
        </div>

        {/* Target Parent WhatsApp Form */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400">Tujuan WhatsApp Orang Tua:</span>
            <strong className="text-white">Pak Bambang (Orang Tua Andi)</strong>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-xs text-slate-400">Nomor WA:</label>
            <input
              type="text"
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* WhatsApp Preview Bubble Simulation */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">
              Pratinjau Tampilan Pesan di WhatsApp:
            </span>
            <span className="text-emerald-400 font-mono text-[11px]">Format Markdown WhatsApp</span>
          </div>

          <div className="bg-[#0b141a] p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-inner">
            <div className="max-w-xl ml-auto bg-[#005c4b] text-slate-100 p-4 rounded-2xl rounded-tr-none shadow-md text-xs sm:text-sm font-sans whitespace-pre-wrap leading-relaxed space-y-2">
              {reportText}
            </div>
            <div className="text-right text-[10px] text-slate-500 mt-1 mr-2">
              Hari ini &bull; Siap dikirim
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
