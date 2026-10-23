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
    <div className="min-h-[calc(100vh-3.5rem)] bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono">
            <Lock className="w-3.5 h-3.5" />
            <span>PORTAL AUTENTIKASI AKSES PER ROLE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Masuk ke Platform Belajar
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
            Setiap peran memiliki ruang kerja terpisah. Silakan pilih portal peran Anda untuk melanjutkan.
          </p>
        </div>

        {/* Role Separation Selector Tabs */}
        <div className="bg-slate-200/80 p-1 rounded-lg grid grid-cols-3 gap-1 text-xs font-medium border border-slate-300">
          <button
            type="button"
            onClick={() => handleQuickFill("student")}
            className={`py-2 px-2 rounded-md transition text-center cursor-pointer ${
              activeRole === "student"
                ? "bg-white text-blue-700 font-semibold shadow-sm border border-slate-200"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/50"
            }`}
          >
            Siswa
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill("tutor")}
            className={`py-2 px-2 rounded-md transition text-center cursor-pointer ${
              activeRole === "tutor"
                ? "bg-white text-amber-700 font-semibold shadow-sm border border-slate-200"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/50"
            }`}
          >
            Pengajar
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill("parent")}
            className={`py-2 px-2 rounded-md transition text-center cursor-pointer ${
              activeRole === "parent"
                ? "bg-white text-emerald-700 font-semibold shadow-sm border border-slate-200"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/50"
            }`}
          >
            Wali Murid
          </button>
        </div>

        {/* Login Card for Current Role */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono tracking-wider uppercase text-slate-500 font-semibold">
                {activeRole === "student" && "AKUN SISWA // 1-ON-1"}
                {activeRole === "tutor" && "AKUN INSTRUKTUR // FLIGHT DECK"}
                {activeRole === "parent" && "AKUN WALI MURID // EXECUTIVE"}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">
                {activeRole.toUpperCase()}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              {ROLE_ACCOUNTS[activeRole].label}
            </h2>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {ROLE_ACCOUNTS[activeRole].description}
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-start space-x-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Alamat Email Terdaftar
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  placeholder="email@domain.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  {activeRole === "student" ? "PIN Akses (6 Digit)" : "Kata Sandi Akses"}
                </label>
                <span className="text-[11px] text-slate-500 font-mono">
                  Default: {ROLE_ACCOUNTS[activeRole].secret}
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition font-mono"
                  placeholder="Masukkan kata sandi / PIN"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition flex items-center justify-center space-x-2 shadow-sm cursor-pointer disabled:opacity-50"
              >
                <span>
                  {isLoading
                    ? "Memverifikasi Kredensial..."
                    : `Masuk ke Ruang Kerja ${activeRole === "student" ? "Siswa" : activeRole === "tutor" ? "Pengajar" : "Wali Murid"}`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* 1-Click Fast Verification for Reviewers */}
          <div className="border-t border-slate-100 pt-4 space-y-2">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wide block text-center">
              DEMO AUTENTIKASI CEPAT:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill("student")}
                className="px-2 py-1.5 rounded border border-slate-200 bg-slate-50 hover:bg-blue-50 text-[11px] font-medium text-slate-700 hover:text-blue-700 transition text-center cursor-pointer"
              >
                Isi Akun Siswa
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill("tutor")}
                className="px-2 py-1.5 rounded border border-slate-200 bg-slate-50 hover:bg-amber-50 text-[11px] font-medium text-slate-700 hover:text-amber-700 transition text-center cursor-pointer"
              >
                Isi Akun Tutor
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill("parent")}
                className="px-2 py-1.5 rounded border border-slate-200 bg-slate-50 hover:bg-emerald-50 text-[11px] font-medium text-slate-700 hover:text-emerald-700 transition text-center cursor-pointer"
              >
                Isi Akun Wali
              </button>
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-slate-600 hover:text-blue-600 transition font-medium"
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
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-500">Memuat Formulir Login...</div>}>
      <LoginContent />
    </Suspense>
  );
}
