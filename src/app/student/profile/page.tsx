"use client";

import React from "react";
import { useSession } from "@/lib/auth/sessionContext";
import { Download, Award, ShieldCheck, Terminal } from "lucide-react";

export default function StudentProfilePage() {
  const { currentUser, progress } = useSession();

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-200 py-8 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Card */}
        <div className="p-6 sm:p-8 rounded-lg bg-[#0e1017] border border-white/[0.08] flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-16 h-16 rounded bg-[#161925] border border-white/[0.12] flex items-center justify-center text-xl font-bold text-slate-200 shrink-0">
            {currentUser.initials}
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <span className="text-[11px] text-slate-400 uppercase tracking-widest block font-semibold">
              PROFILE // {currentUser.roleLabel}
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {currentUser.name}
            </h1>
            <p className="font-sans text-xs text-slate-300">
              {currentUser.email} &bull; Mentor: Andricha Dea Mitra
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs">
              <span className="px-2.5 py-1 rounded bg-[#151822] border border-white/[0.06] text-amber-400">
                STREAK: {progress.streakDays} HARI
              </span>
              <span className="px-2.5 py-1 rounded bg-[#151822] border border-white/[0.06] text-slate-200">
                TOTAL: {progress.xpPoints} XP
              </span>
              <span className="px-2.5 py-1 rounded bg-[#151822] border border-white/[0.06] text-emerald-400">
                TUGAS: {progress.completedAssignments} SELESAI
              </span>
            </div>
          </div>
        </div>

        {/* Badges Collection (Precision Code Cards) */}
        <div className="p-6 rounded-lg bg-[#0e1017] border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs">
            <span className="text-slate-400 uppercase tracking-widest block">
              02 // KOMPETENSI TERVERIFIKASI
            </span>
            <span className="text-slate-400">
              {progress.badges.length} DARI 10 TERBUKA
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {progress.badges.map((b) => (
              <div
                key={b.id}
                className="p-3.5 rounded bg-[#131520] border border-white/[0.06] space-y-1.5"
              >
                <div className="text-[10px] text-amber-400 font-bold">{b.code}</div>
                <div className="font-bold text-white text-xs">{b.name}</div>
                <div className="text-[10px] text-slate-400">{b.unlockedAt}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Section */}
        <div className="p-6 rounded-lg bg-[#0e1017] border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs">
            <span className="text-slate-400 uppercase tracking-widest block">
              03 // SERTIFIKAT DIGITAL
            </span>
            <span className="text-emerald-400">FASE 1 TERVERIFIKASI</span>
          </div>

          <div className="p-4 rounded bg-[#131520] border border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">
                Milestone 01: Fondasi Logika &amp; Komputasi Dasar (Python)
              </h3>
              <p className="font-sans text-xs text-slate-300">
                Tuntas Modul 1 s.d 4 dan Proyek Capstone 1 Game CLI.
              </p>
            </div>

            <button
              onClick={() => alert("Mengunduh sertifikat digital...")}
              className="px-4 py-2 rounded bg-white text-black font-bold text-xs hover:bg-slate-200 transition flex items-center space-x-1.5 shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>UNDUH PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
