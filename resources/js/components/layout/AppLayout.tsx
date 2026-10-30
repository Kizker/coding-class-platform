import React from "react";
import { Navbar } from "@/components/navigation/Navbar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-black flex flex-col font-sans antialiased selection:bg-[#FACC15] selection:text-black">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
}

