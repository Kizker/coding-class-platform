"use client";

import React from "react";
import { useSession } from "@/lib/auth/sessionContext";
import { Download, Award, ShieldCheck, Terminal, Flame, Zap, CheckCircle2 } from "lucide-react";

export default function StudentProfilePage() {
  const { currentUser, progress, isMounted } = useSession();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Hero Card */}
        <div className="ui-card-outer p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div
            className="w-20 h-20 rounded-2xl bg-blue-600 border-2 border-blue-400 flex items-center justify-center text-2xl font-extrabold text-white font-mono shrink-0 shadow-md"
            suppressHydrationWarning
          >
            {isMounted ? currentUser.initials : "AP"}
          </div>

          <div className="space-y-2.5 text-center sm:text-left flex-1">
            <span className="text-xs font-mono text-blue-700 uppercase tracking-widest block font-bold">
              PROFIL // {isMounted ? currentUser.roleLabel : "SISWA PRIVATE"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight" suppressHydrationWarning>
              {isMounted ? currentUser.name : "Andi Pratama"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              <span suppressHydrationWarning>{isMounted ? currentUser.email : "andi.pratama@student.id"}</span> &bull; Mentor Bimbingan: <strong>Andricha Dea Mitra</strong>
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs font-mono">
              <span className="px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold flex items-center space-x-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                <span suppressHydrationWarning>STREAK: {isMounted ? progress.streakDays : 3} HARI</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 font-bold flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
                <span suppressHydrationWarning>TOTAL: {isMounted ? progress.xpPoints : 65} XP</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span suppressHydrationWarning>TUGAS: {isMounted ? progress.completedAssignments : 3} SELESAI</span>
              </span>
            </div>
          </div>
        </div>

        {/* Badges Collection - Uniform Rounded-2xl Cards */}
        <div className="ui-card-outer p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 text-xs font-mono">
            <span className="text-blue-700 uppercase tracking-widest font-bold block">
              02 // LENCANA KOMPETENSI TERVERIFIKASI
            </span>
            <span className="text-slate-600 font-bold">
              {progress.badges.length} DARI 10 TERBUKA
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {progress.badges.map((b) => (
              <div
                key={b.id}
                className="ui-card-inner bg-white border border-slate-200 rounded-2xl p-5 space-y-2.5 flex flex-col justify-between shadow-2xs hover:border-blue-400 hover:shadow-xs transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                    {b.code}
                  </span>
                  <Award className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm font-sans leading-snug">
                    {b.name}
                  </h3>
                  <div className="text-[11px] text-slate-500 font-mono mt-1">
                    Terbuka pada {b.unlockedAt}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Section - Uniform Inner Box */}
        <div className="ui-card-outer p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 text-xs font-mono">
            <span className="text-blue-700 uppercase tracking-widest font-bold block">
              03 // SERTIFIKAT KELULUSAN RESMI
            </span>
            <span className="text-emerald-700 font-bold">FASE 1 TERVERIFIKASI</span>
          </div>

          <div className="ui-card-inner bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wider block">
                E-SERTIFIKAT TERAKREDITASI
              </span>
              <h3 className="text-base font-extrabold text-slate-900">
                Milestone 01: Fondasi Logika &amp; Komputasi Dasar (Python)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Tuntas Modul 1 s.d 4 dan Proyek Capstone 1 Game CLI Interaktif dengan predikat kelulusan Sangat Memuaskan (A).
              </p>
            </div>

            <button
              onClick={() => alert("Mengunduh sertifikat digital resmi...")}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition flex items-center space-x-2 shrink-0 cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>UNDUH PDF RESMI</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
