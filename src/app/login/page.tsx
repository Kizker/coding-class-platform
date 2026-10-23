"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSession, UserRole, ROLE_ACCOUNTS } from "@/lib/auth/sessionContext";
import {
  Terminal,
  ShieldCheck,
  User,
  BookOpen,
  ArrowRight,
  Lock,
  Mail,
  KeyRound,
  Check,
  AlertCircle,
} from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get("role") as UserRole) || "student";

  const { login } = useSession();

  const [activeRole, setActiveRole] = useState<UserRole>(
    ["student", "tutor", "parent"].includes(initialRole) ? initialRole : "student"
  );

  const [email, setEmail] = useState<string>(ROLE_ACCOUNTS[activeRole].email);
  const [secret, setSecret] = useState<string>(ROLE_ACCOUNTS[activeRole].secret);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // When changing role tab, update form state
  useEffect(() => {
    setEmail(ROLE_ACCOUNTS[activeRole].email);
    setSecret(ROLE_ACCOUNTS[activeRole].secret);
    setErrorMsg(null);
  }, [activeRole]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    setTimeout(() => {
      const res = login(activeRole, email, secret);
      setIsLoading(false);

      if (res.success) {
        if (activeRole === "student") {
          router.push("/student/dashboard");
        } else if (activeRole === "tutor") {
          router.push("/tutor/dashboard");
        } else {
          router.push("/parent/overview");
        }
      } else {
        setErrorMsg(res.message);
      }
    }, 300);
  };

  const handleQuickFill = (roleKey: UserRole) => {
    setActiveRole(roleKey);
    setEmail(ROLE_ACCOUNTS[roleKey].email);
    setSecret(ROLE_ACCOUNTS[roleKey].secret);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#FDFBF7] text-black flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-md w-full mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#FEF08A] border-2 border-black shadow-[2px_2px_0px_#000] text-black text-xs font-mono font-black uppercase">
            <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>PORTAL AUTENTIKASI AKSES PER ROLE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-black uppercase">
            Masuk ke Platform
          </h1>
          <p className="text-xs sm:text-sm text-stone-700 max-w-sm mx-auto font-bold">
            Setiap peran memiliki ruang kerja terpisah. Silakan pilih portal peran Anda untuk melanjutkan.
          </p>
        </div>

        {/* Role Separation Selector Tabs */}
        <div className="bg-white p-1.5 border-2.5 border-black shadow-[4px_4px_0px_#000] grid grid-cols-3 gap-1.5 text-xs font-black">
          <button
            type="button"
            onClick={() => handleQuickFill("student")}
            className={`py-2.5 px-2 transition-all text-center cursor-pointer uppercase tracking-tight border-2 ${
              activeRole === "student"
                ? "bg-[#FEF08A] text-black border-black shadow-[2px_2px_0px_#000]"
                : "bg-transparent text-black border-transparent hover:bg-stone-50"
            }`}
          >
            Siswa
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill("tutor")}
            className={`py-2.5 px-2 transition-all text-center cursor-pointer uppercase tracking-tight border-2 ${
              activeRole === "tutor"
                ? "bg-[#86EFAC] text-black border-black shadow-[2px_2px_0px_#000]"
                : "bg-transparent text-black border-transparent hover:bg-stone-50"
            }`}
          >
            Pengajar
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill("parent")}
            className={`py-2.5 px-2 transition-all text-center cursor-pointer uppercase tracking-tight border-2 ${
              activeRole === "parent"
                ? "bg-[#FED7AA] text-black border-black shadow-[2px_2px_0px_#000]"
                : "bg-transparent text-black border-transparent hover:bg-stone-50"
            }`}
          >
            Wali Murid
          </button>
        </div>

        {/* Login Card for Current Role */}
        <div className="bg-white border-2.5 border-black p-6 sm:p-8 space-y-6 shadow-[6px_6px_0px_#000]">
          <div className="border-b-2 border-black pb-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono tracking-wider uppercase text-black font-black">
                {activeRole === "student" && "AKUN SISWA // 1-ON-1"}
                {activeRole === "tutor" && "AKUN INSTRUKTUR // FLIGHT DECK"}
                {activeRole === "parent" && "AKUN WALI MURID // EXECUTIVE"}
              </span>
              <span className="text-xs px-2.5 py-0.5 bg-[#FEF08A] text-black border border-black font-mono font-black uppercase">
                {activeRole.toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl font-black text-black mt-2 uppercase tracking-tight">
              {ROLE_ACCOUNTS[activeRole].label}
            </h2>
            <p className="text-xs text-stone-700 mt-1 leading-relaxed font-bold">
              {ROLE_ACCOUNTS[activeRole].description}
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-[#FCA5A5] border-2 border-black flex items-start space-x-2 text-xs text-black font-bold shadow-[2px_2px_0px_#000]">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 stroke-[2.5]" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-black mb-1.5 uppercase">
                Alamat Email Terdaftar
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black">
                  <Mail className="w-4 h-4 stroke-[2.5]" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border-2 border-black pl-10 pr-3.5 py-2.5 text-sm text-black placeholder-stone-400 focus:outline-none focus:bg-[#FEF08A]/30 shadow-[2px_2px_0px_#000] font-bold"
                  placeholder="email@domain.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-black text-black uppercase">
                  {activeRole === "student" ? "PIN Akses (6 Digit)" : "Kata Sandi Akses"}
                </label>
                <span className="text-[11px] text-stone-700 font-mono font-bold">
                  Default: {ROLE_ACCOUNTS[activeRole].secret}
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black">
                  <KeyRound className="w-4 h-4 stroke-[2.5]" />
                </div>
                <input
                  type="text"
                  required
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  className="w-full bg-white border-2 border-black pl-10 pr-3.5 py-2.5 text-sm text-black placeholder-stone-400 focus:outline-none focus:bg-[#FEF08A]/30 shadow-[2px_2px_0px_#000] font-mono font-bold"
                  placeholder="Masukkan kata sandi / PIN"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-[#FACC15] hover:bg-yellow-400 text-black border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-sm font-black transition-all flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-tight disabled:opacity-50"
              >
                <span>
                  {isLoading
                    ? "Memverifikasi Kredensial..."
                    : `Masuk ke Ruang Kerja ${activeRole === "student" ? "Siswa" : activeRole === "tutor" ? "Pengajar" : "Wali Murid"}`}
                </span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </form>

          {/* 1-Click Fast Verification for Reviewers */}
          <div className="border-t-2 border-black pt-4 space-y-2.5">
            <span className="text-[11px] font-mono text-black uppercase tracking-widest block text-center font-black">
              DEMO AUTENTIKASI CEPAT:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill("student")}
                className="px-2.5 py-2 bg-white hover:bg-[#FEF08A] text-black border-2 border-black shadow-[2px_2px_0px_#000] text-[11px] font-black uppercase transition-all text-center cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
              >
                Isi Siswa
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill("tutor")}
                className="px-2.5 py-2 bg-white hover:bg-[#86EFAC] text-black border-2 border-black shadow-[2px_2px_0px_#000] text-[11px] font-black uppercase transition-all text-center cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
              >
                Isi Tutor
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill("parent")}
                className="px-2.5 py-2 bg-white hover:bg-[#FED7AA] text-black border-2 border-black shadow-[2px_2px_0px_#000] text-[11px] font-black uppercase transition-all text-center cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
              >
                Isi Wali
              </button>
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-black font-black hover:bg-[#FEF08A] px-3 py-1 border border-black shadow-[1px_1px_0px_#000] uppercase transition"
          >
            &larr; Kembali ke Beranda Utama
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-xs font-black text-black">Memuat Formulir Login...</div>}>
      <LoginContent />
    </Suspense>
  );
}
