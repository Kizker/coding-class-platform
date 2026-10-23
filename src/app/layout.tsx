import type { Metadata } from "next";
import { Suspense } from "react";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/lib/auth/sessionContext";
import { Navbar } from "@/components/navigation/Navbar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Platform Edukasi Koding Les Private 1-on-1 | Python Track",
  description:
    "Sistem pembelajaran koding privat 1-on-1 terpadu untuk Siswa, Pengajar (Tutor), dan Orang Tua dengan Split-Screen Monaco & Pyodide WebAssembly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        <SessionProvider>
          <Suspense fallback={<div className="h-14 bg-white border-b border-slate-200" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1 flex flex-col">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
