"use client";

import React from "react";
import { useSession } from "@/lib/auth/sessionContext";
import { Download, Award, ShieldCheck, Terminal } from "lucide-react";

export default function StudentProfilePage() {
  const { currentUser, progress } = useSession();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Card */}
        <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-16 h-16 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-xl font-bold text-blue-700 font-mono shrink-0">
            {currentUser.initials}
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <span className="text-xs font-mono text-blue-700 uppercase tracking-widest block font-semibold">
              PROFIL // {currentUser.roleLabel}
            </span>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {currentUser.name}
            </h1>
            <p className="text-xs text-slate-600">
              {currentUser.email} &bull; Mentor: Andricha Dea Mitra
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-800 font-semibold">
                STREAK: {progress.streakDays} HARI
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-800 font-semibold">
                TOTAL: {progress.xpPoints} XP
              </span>
              <span className="px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
                TUGAS: {progress.completedAssignments} SELESAI
              </span>
            </div>
          </div>
        </div>

        {/* Badges Collection */}
        <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs font-mono">
            <span className="text-slate-500 uppercase tracking-widest font-semibold block">
              02 // KOMPETENSI TERVERIFIKASI
            </span>
            <span className="text-slate-600 font-medium">
              {progress.badges.length} DARI 10 TERBUKA
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {progress.badges.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5"
              >
                <div className="text-[10px] text-blue-700 font-mono font-bold">{b.code}</div>
                <div className="font-bold text-slate-900 text-xs font-sans">{b.name}</div>
                <div className="text-[10px] text-slate-500 font-mono">{b.unlockedAt}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Section */}
        <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs font-mono">
            <span className="text-slate-500 uppercase tracking-widest font-semibold block">
              03 // SERTIFIKAT DIGITAL
            </span>
            <span className="text-emerald-700 font-semibold">FASE 1 TERVERIFIKASI</span>
          </div>

          <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">
                Milestone 01: Fondasi Logika &amp; Komputasi Dasar (Python)
              </h3>
              <p className="text-xs text-slate-600">
                Tuntas Modul 1 s.d 4 dan Proyek Capstone 1 Game CLI Interaktif.
              </p>
            </div>

            <button
              onClick={() => alert("Mengunduh sertifikat digital...")}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition flex items-center space-x-1.5 shrink-0 cursor-pointer shadow-xs"
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
