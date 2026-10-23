"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CURRICULUM_DATA } from "@/data/curriculum";
import { useSession } from "@/lib/auth/sessionContext";
import { ArrowRight, Check, Filter, Clock, Zap, BookOpen, ChevronRight } from "lucide-react";

export default function StudentAssignmentsPage() {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [filterType, setFilterType] = useState<string>("ALL");
  const { isTaskCompleted } = useSession();

  const currentWeekData =
    CURRICULUM_DATA.find((w) => w.week === selectedWeek) || CURRICULUM_DATA[0];

  const filteredAssignments = currentWeekData.assignments.filter((a) => {
    if (filterType === "ALL") return true;
    return a.type === filterType;
  });

  const getCategoryBadge = (type: string) => {
    switch (type) {
      case "RECALL":
        return { label: "Recall Logika", style: "bg-stone-100 text-stone-700" };
      case "CODE_READ":
        return { label: "Membaca Alur", style: "bg-stone-100 text-stone-700" };
      case "DEBUGGING":
        return { label: "Perbaikan Bug", style: "bg-amber-50 text-amber-900 border border-amber-200/60" };
      case "PRE_READ":
        return { label: "Persiapan Tatap Muka", style: "bg-emerald-50 text-emerald-800 border border-emerald-200/60" };
      default:
        return { label: type, style: "bg-stone-100 text-stone-700" };
    }
  };

  const dayLabelMap: Record<string, string> = {
    senin: "Senin",
    selasa: "Selasa",
    rabu: "Rabu",
    kamis: "Kamis",
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-black py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Hero */}
        <div className="bg-white border-2.5 border-black p-6 sm:p-7 shadow-[5px_5px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-black text-black uppercase tracking-wider block">
              Latihan Mandiri Terstruktur
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
              Tantangan Pemrograman Harian
            </h1>
            <p className="text-xs text-stone-800 font-bold leading-relaxed max-w-xl">
              Latihan mandiri 15 menit sehari untuk membangun insting koding dan pemecahan masalah sebelum sesi tatap muka akhir pekan.
            </p>
          </div>

          <div className="flex items-center space-x-2.5 text-xs shrink-0">
            <span className="text-black font-black uppercase">Pekan:</span>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(parseInt(e.target.value, 10))}
              className="bg-white border-2 border-black shadow-[2px_2px_0px_#000] px-3 py-2 text-xs font-black text-black focus:outline-none cursor-pointer uppercase"
            >
              {CURRICULUM_DATA.map((w) => (
                <option key={w.week} value={w.week}>
                  Pekan {w.week}: {w.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto text-xs pb-1">
          {[
            { id: "ALL", label: "Semua Tugas" },
            { id: "RECALL", label: "Recall" },
            { id: "CODE_READ", label: "Code Read" },
            { id: "DEBUGGING", label: "Debugging" },
            { id: "PRE_READ", label: "Pre-Read" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-4 py-2 border-2 border-black text-xs font-black uppercase transition-all cursor-pointer ${
                filterType === tab.id
                  ? "bg-black text-[#FACC15] shadow-[3px_3px_0px_#000] translate-x-[-1px] translate-y-[-1px]"
                  : "bg-white text-black shadow-[2px_2px_0px_#000] hover:bg-[#FEF08A]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Assignments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAssignments.map((a) => {
            const isDone = isTaskCompleted(selectedWeek, a.day);
            const badge = getCategoryBadge(a.type);

            return (
              <div
                key={a.id}
                className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_#000] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs pb-2 border-b-2 border-black/20">
                    <div className="flex items-center space-x-2">
                      <span className="font-black text-black uppercase tracking-tight">
                        {dayLabelMap[a.day] || a.day}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 border border-black font-black uppercase bg-[#FEF08A] text-black">
                        {badge.label}
                      </span>
                    </div>

                    <span className="px-2 py-0.5 bg-[#86EFAC] text-black border border-black font-black text-[11px] flex items-center space-x-1 shadow-[1px_1px_0px_#000]">
                      <Zap className="w-3 h-3 text-black fill-black" />
                      <span>+{a.points} XP</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-black tracking-tight leading-snug uppercase">
                      {a.title}
                    </h3>
                    <p className="text-xs text-stone-800 font-bold leading-relaxed line-clamp-2 mt-1">
                      {a.challengeInstructions}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t-2 border-black/20 flex items-center justify-between text-xs">
                  <span className="text-black font-bold flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                    <span>{a.durationMinutes} Menit</span>
                  </span>

                  <Link
                    href={`/student/learn/${selectedWeek}/${a.day}`}
                    className={`px-4 py-2 border-2 border-black font-black text-xs uppercase transition-all flex items-center space-x-1 cursor-pointer shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                      isDone
                        ? "bg-[#86EFAC] text-black hover:bg-emerald-400"
                        : "bg-[#FACC15] hover:bg-yellow-400 text-black"
                    }`}
                  >
                    <span>{isDone ? "Buka Kembali" : "Kerjakan Tugas"}</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
