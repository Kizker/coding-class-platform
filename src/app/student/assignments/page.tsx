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
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#FAFAF9] text-stone-900 py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Hero */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
              Latihan Mandiri Terstruktur
            </span>
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
              Tantangan Pemrograman Harian
            </h1>
            <p className="text-xs text-stone-500 leading-relaxed max-w-xl">
              Latihan mandiri 15 menit sehari untuk membangun insting koding dan pemecahan masalah sebelum sesi tatap muka akhir pekan.
            </p>
          </div>

          <div className="flex items-center space-x-2.5 text-xs shrink-0">
            <span className="text-stone-500 font-medium">Pekan:</span>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(parseInt(e.target.value, 10))}
              className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900/15 cursor-pointer shadow-2xs"
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
        <div className="flex items-center space-x-1.5 overflow-x-auto text-xs">
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
              className={`px-3.5 py-1.5 rounded-xl transition text-xs font-medium cursor-pointer ${
                filterType === tab.id
                  ? "bg-stone-900 text-white shadow-2xs font-semibold"
                  : "bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50 border border-stone-200/80"
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
                className="bg-white border border-stone-200/80 p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-stone-900">
                        {dayLabelMap[a.day] || a.day}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${badge.style}`}>
                        {badge.label}
                      </span>
                    </div>

                    <span className="px-2 py-0.5 rounded-md bg-stone-50 text-stone-700 border border-stone-200/60 font-semibold text-[11px] flex items-center space-x-1">
                      <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>+{a.points} XP</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-stone-900 tracking-tight leading-snug">
                      {a.title}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 mt-1 font-sans">
                      {a.challengeInstructions}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-400 flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{a.durationMinutes} Menit</span>
                  </span>

                  <Link
                    href={`/student/learn/${selectedWeek}/${a.day}`}
                    className={`px-3.5 py-1.5 rounded-xl font-semibold text-xs transition flex items-center space-x-1 cursor-pointer ${
                      isDone
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                        : "bg-stone-900 hover:bg-stone-800 text-white shadow-2xs"
                    }`}
                  >
                    <span>{isDone ? "Buka Kembali" : "Kerjakan Tugas"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
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
