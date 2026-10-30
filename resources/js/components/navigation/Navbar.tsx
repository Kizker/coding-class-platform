import React from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { useSession } from "@/lib/auth/sessionContext";
import { LogOut, LogIn } from "lucide-react";

export function Navbar() {
  const { url } = usePage();
  const { role, currentUser, isAuthenticated, logout, progress, isMounted } = useSession();

  const handleLogout = () => {
    logout();
    router.visit("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7] border-b-[2.5px] border-black text-black shadow-[0_3px_0px_#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-yellow-300 border-2 border-black text-black flex items-center justify-center font-black text-xs shadow-[2px_2px_0px_#000] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-[3px_3px_0px_#000] transition-all">
                Py
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight text-black">
                  PyStudio
                </span>
                <span className="text-[10px] text-stone-600 font-bold leading-none">
                  Private Mentoring
                </span>
              </div>
            </Link>

            {/* Role Navigation Links (Only visible when logged in) */}
            {isAuthenticated && (
              <nav className="hidden md:flex items-center space-x-1.5 text-xs">
                {role === "student" && (
                  <>
                    <Link
                      href="/student/dashboard"
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 ${
                        url === "/student/dashboard"
                          ? "bg-black text-white border-black shadow-[2px_2px_0px_#000]"
                          : "border-transparent text-black hover:border-black hover:bg-yellow-100 hover:shadow-[2px_2px_0px_#000]"
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/student/assignments"
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 ${
                        url === "/student/assignments"
                          ? "bg-black text-white border-black shadow-[2px_2px_0px_#000]"
                          : "border-transparent text-black hover:border-black hover:bg-yellow-100 hover:shadow-[2px_2px_0px_#000]"
                      }`}
                    >
                      Tugas Harian
                    </Link>
                    <Link
                      href={`/student/curriculum/${progress?.currentWeek || 1}`}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 ${
                        url.startsWith("/student/curriculum")
                          ? "bg-black text-white border-black shadow-[2px_2px_0px_#000]"
                          : "border-transparent text-black hover:border-black hover:bg-yellow-100 hover:shadow-[2px_2px_0px_#000]"
                      }`}
                    >
                      Kurikulum
                    </Link>
                    <Link
                      href="/student/capstone/1"
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 ${
                        url.startsWith("/student/capstone")
                          ? "bg-black text-white border-black shadow-[2px_2px_0px_#000]"
                          : "border-transparent text-black hover:border-black hover:bg-yellow-100 hover:shadow-[2px_2px_0px_#000]"
                      }`}
                    >
                      Capstone
                    </Link>
                    <Link
                      href="/student/profile"
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 ${
                        url === "/student/profile"
                          ? "bg-black text-white border-black shadow-[2px_2px_0px_#000]"
                          : "border-transparent text-black hover:border-black hover:bg-yellow-100 hover:shadow-[2px_2px_0px_#000]"
                      }`}
                    >
                      Profil &amp; Rapor
                    </Link>
                  </>
                )}

                {role === "tutor" && (
                  <>
                    <Link
                      href="/tutor/dashboard"
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 ${
                        url === "/tutor/dashboard"
                          ? "bg-black text-white border-black shadow-[2px_2px_0px_#000]"
                          : "border-transparent text-black hover:border-black hover:bg-yellow-100 hover:shadow-[2px_2px_0px_#000]"
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href={`/tutor/studio/${progress?.currentWeek || 1}/jumat`}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 ${
                        url.startsWith("/tutor/studio")
                          ? "bg-black text-white border-black shadow-[2px_2px_0px_#000]"
                          : "border-transparent text-black hover:border-black hover:bg-yellow-100 hover:shadow-[2px_2px_0px_#000]"
                      }`}
                    >
                      Studio Mengajar
                    </Link>
                    <Link
                      href="/tutor/grading"
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 ${
                        url === "/tutor/grading"
                          ? "bg-black text-white border-black shadow-[2px_2px_0px_#000]"
                          : "border-transparent text-black hover:border-black hover:bg-yellow-100 hover:shadow-[2px_2px_0px_#000]"
                      }`}
                    >
                      Evaluasi PR
                    </Link>
                    <Link
                      href="/tutor/reports"
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 ${
                        url === "/tutor/reports"
                          ? "bg-black text-white border-black shadow-[2px_2px_0px_#000]"
                          : "border-transparent text-black hover:border-black hover:bg-yellow-100 hover:shadow-[2px_2px_0px_#000]"
                      }`}
                    >
                      Rapor WhatsApp
                    </Link>
                  </>
                )}

                {role === "parent" && (
                  <>
                    <Link
                      href="/parent/overview"
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 ${
                        url === "/parent/overview"
                          ? "bg-black text-white border-black shadow-[2px_2px_0px_#000]"
                          : "border-transparent text-black hover:border-black hover:bg-yellow-100 hover:shadow-[2px_2px_0px_#000]"
                      }`}
                    >
                      Ringkasan
                    </Link>
                    <Link
                      href="/parent/reports"
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 ${
                        url === "/parent/reports"
                          ? "bg-black text-white border-black shadow-[2px_2px_0px_#000]"
                          : "border-transparent text-black hover:border-black hover:bg-yellow-100 hover:shadow-[2px_2px_0px_#000]"
                      }`}
                    >
                      Catatan Pengajar
                    </Link>
                    <Link
                      href="/parent/showcase"
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 ${
                        url === "/parent/showcase"
                          ? "bg-black text-white border-black shadow-[2px_2px_0px_#000]"
                          : "border-transparent text-black hover:border-black hover:bg-yellow-100 hover:shadow-[2px_2px_0px_#000]"
                      }`}
                    >
                      Karya Anak
                    </Link>
                    <Link
                      href="/parent/schedule"
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 ${
                        url === "/parent/schedule"
                          ? "bg-black text-white border-black shadow-[2px_2px_0px_#000]"
                          : "border-transparent text-black hover:border-black hover:bg-yellow-100 hover:shadow-[2px_2px_0px_#000]"
                      }`}
                    >
                      Jadwal Sesi
                    </Link>
                  </>
                )}
              </nav>
            )}
          </div>

          {/* Right Section: Telemetry & Authenticated User Control */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {/* Telemetry Indicator for Student */}
                {role === "student" && (
                  <div className="hidden sm:flex items-center space-x-2 text-xs text-black px-3 py-1.5 rounded-lg bg-amber-100 border-2 border-black shadow-[2px_2px_0px_#000] font-bold">
                    <span className="flex items-center space-x-1">
                      <span>🔥</span>
                      <strong>
                        {isMounted ? progress.streakDays : 5} Hari
                      </strong>
                    </span>
                    <span className="text-black">&bull;</span>
                    <span className="flex items-center space-x-1">
                      <span>⚡</span>
                      <strong>
                        {isMounted ? progress.xpPoints : 340} XP
                      </strong>
                    </span>
                  </div>
                )}

                {/* Role Profile Badge */}
                <div className="flex items-center space-x-2.5 pl-2 border-l-2 border-black">
                  <div
                    className="w-8 h-8 rounded-lg bg-yellow-300 border-2 border-black text-black flex items-center justify-center font-black text-xs shadow-[2px_2px_0px_#000]"
                  >
                    {isMounted ? currentUser.initials : "AP"}
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span
                      className="text-xs font-bold text-black leading-tight"
                    >
                      {isMounted ? currentUser.name : "Andi Pratama"}
                    </span>
                    <span
                      className="text-[10px] text-stone-600 font-semibold leading-tight"
                    >
                      {isMounted
                        ? role === "student"
                          ? "Siswa Private"
                          : role === "tutor"
                          ? "Lead Tutor"
                          : "Wali Murid"
                        : "Siswa Private"}
                    </span>
                  </div>
                </div>

                {/* Logout / Switch Account Button */}
                <button
                  onClick={handleLogout}
                  title="Ganti Akun / Keluar"
                  className="px-2.5 py-1.5 rounded-lg border-2 border-black bg-white hover:bg-rose-200 text-black text-xs font-bold transition-all shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center space-x-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Keluar</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 border-2 border-black text-black text-xs font-black transition-all shadow-[3px_3px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center space-x-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Masuk Portal</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
