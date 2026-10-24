import React from "react";
import { useSession } from "@/lib/auth/sessionContext";
import { Download, Award, Flame, Zap, CheckCircle2 } from "lucide-react";

export default function StudentProfilePage() {
  const { currentUser, progress, isMounted } = useSession();

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-black font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Profile Hero Card */}
        <div className="bg-white border-2.5 border-black p-6 sm:p-8 shadow-[5px_5px_0px_#000] flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div
            className="w-20 h-20 bg-[#FEF08A] border-2.5 border-black flex items-center justify-center text-2xl font-black text-black font-mono shrink-0 shadow-[3px_3px_0px_#000]"
            suppressHydrationWarning
          >
            {isMounted ? currentUser.initials : "AP"}
          </div>

          <div className="space-y-2.5 text-center sm:text-left flex-1">
            <span className="text-xs font-black text-black uppercase tracking-widest block bg-[#86EFAC] px-2.5 py-0.5 border border-black w-fit">
              PROFIL // {isMounted ? currentUser.roleLabel : "SISWA PRIVATE"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase" suppressHydrationWarning>
              {isMounted ? currentUser.name : "Andi Pratama"}
            </h1>
            <p className="text-xs sm:text-sm text-stone-800 font-bold">
              <span suppressHydrationWarning>{isMounted ? currentUser.email : "andi.pratama@student.id"}</span> &bull; Mentor Bimbingan: <strong>Andricha Dea Mitra</strong>
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs">
              <span className="px-3 py-1.5 bg-[#FEF08A] border-2 border-black text-black font-black flex items-center space-x-1.5 shadow-[2px_2px_0px_#000]">
                <Flame className="w-3.5 h-3.5 text-black fill-black" />
                <span suppressHydrationWarning>STREAK: {isMounted ? progress.streakDays : 3} HARI</span>
              </span>
              <span className="px-3 py-1.5 bg-[#86EFAC] border-2 border-black text-black font-black flex items-center space-x-1.5 shadow-[2px_2px_0px_#000]">
                <Zap className="w-3.5 h-3.5 text-black" />
                <span suppressHydrationWarning>TOTAL: {isMounted ? progress.xpPoints : 65} XP</span>
              </span>
              <span className="px-3 py-1.5 bg-[#FED7AA] border-2 border-black text-black font-black flex items-center space-x-1.5 shadow-[2px_2px_0px_#000]">
                <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                <span suppressHydrationWarning>TUGAS: {isMounted ? progress.completedAssignments : 3} SELESAI</span>
              </span>
            </div>
          </div>
        </div>

        {/* Badges Collection */}
        <div className="bg-white border-2.5 border-black p-6 sm:p-8 shadow-[5px_5px_0px_#000] space-y-5">
          <div className="flex items-center justify-between border-b-2 border-black pb-4 text-xs">
            <span className="text-black uppercase tracking-widest font-black block">
              02 // LENCANA KOMPETENSI TERVERIFIKASI
            </span>
            <span className="text-black font-black bg-[#FEF08A] px-2 py-0.5 border border-black">
              {progress.badges.length} DARI 10 TERBUKA
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {progress.badges.map((b) => (
              <div
                key={b.id}
                className="bg-white border-2 border-black p-5 space-y-2.5 flex flex-col justify-between shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-black bg-[#FEF08A] border border-black px-2 py-0.5">
                    {b.code}
                  </span>
                  <Award className="w-4 h-4 text-black stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-black text-black text-sm leading-snug uppercase">
                    {b.name}
                  </h3>
                  <div className="text-[11px] text-stone-700 font-bold mt-1">
                    Terbuka pada {b.unlockedAt}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Section */}
        <div className="bg-white border-2.5 border-black p-6 sm:p-8 shadow-[5px_5px_0px_#000] space-y-5">
          <div className="flex items-center justify-between border-b-2 border-black pb-4 text-xs">
            <span className="text-black uppercase tracking-widest font-black block">
              03 // SERTIFIKAT KELULUSAN RESMI
            </span>
            <span className="text-black font-black bg-[#86EFAC] px-2.5 py-0.5 border border-black">
              FASE 1 TERVERIFIKASI
            </span>
          </div>

          <div className="bg-[#FEF08A] border-2 border-black p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-[3px_3px_0px_#000]">
            <div className="space-y-1.5">
              <span className="text-[11px] font-black text-black uppercase tracking-wider block bg-white px-2 py-0.5 border border-black w-fit">
                E-SERTIFIKAT TERAKREDITASI
              </span>
              <h3 className="text-base font-black text-black uppercase">
                Milestone 01: Fondasi Logika &amp; Komputasi Dasar (Python)
              </h3>
              <p className="text-xs sm:text-sm text-stone-900 font-bold">
                Tuntas Modul 1 s.d 4 dan Proyek Capstone 1 Game CLI Interaktif dengan predikat kelulusan Sangat Memuaskan (A).
              </p>
            </div>

            <button
              onClick={() => alert("Mengunduh sertifikat digital resmi...")}
              className="px-5 py-3 bg-[#FACC15] hover:bg-yellow-400 text-black border-2 border-black font-black text-xs shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center space-x-2 shrink-0 cursor-pointer uppercase tracking-tight"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>UNDUH PDF RESMI</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
