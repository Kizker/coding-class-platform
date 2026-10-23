"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CURRICULUM_DATA } from "@/data/curriculum";
import {
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  Filter,
  ArrowRight,
} from "lucide-react";

export default function StudentAssignmentsPage() {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [filterType, setFilterType] = useState<string>("ALL");

  const currentWeekData = CURRICULUM_DATA.find((w) => w.week === selectedWeek) || CURRICULUM_DATA[0];

  const filteredAssignments = currentWeekData.assignments.filter((a) => {
    if (filterType === "ALL") return true;
    return a.type === filterType;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center space-x-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <span>Daftar Tugas Harian (PR Senin–Kamis)</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Latihan mandiri 15–20 menit sehari untuk mengasah nalar koding secara konsisten.
            </p>
          </div>

          {/* Week Selector */}
          <div className="flex items-center space-x-2">
            <label className="text-xs text-slate-400 font-medium">Pilih Pekan:</label>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(parseInt(e.target.value, 10))}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {CURRICULUM_DATA.map((w) => (
                <option key={w.week} value={w.week}>
                  Minggu {w.week}: {w.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 text-xs">
          <span className="text-slate-400 flex items-center space-x-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Kategori:</span>
          </span>
          {[
            { id: "ALL", label: "Semua PR" },
            { id: "RECALL", label: "PR 1: Recall" },
            { id: "CODE_READ", label: "PR 2: Code Reading" },
            { id: "DEBUGGING", label: "PR 3: Debugging" },
            { id: "PRE_READ", label: "PR 4: Pre-read" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                filterType === tab.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Assignments List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAssignments.map((a) => (
            <div
              key={a.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition shadow-lg space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-950 border border-indigo-700/60 text-indigo-300 uppercase tracking-wider">
                    {a.day.toUpperCase()} &bull; {a.type}
                  </span>
                  <span className="flex items-center space-x-1 text-xs text-amber-300 font-semibold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>+{a.points} XP</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight">{a.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {a.challengeInstructions}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="flex items-center space-x-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Estimasi: {a.durationMinutes} Menit</span>
                </span>

                <Link
                  href={`/student/learn/${selectedWeek}/${a.day}`}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
                >
                  <span>Buka Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}

          {filteredAssignments.length === 0 && (
            <div className="col-span-2 py-12 text-center text-slate-500 text-sm">
              Tidak ada tugas untuk filter yang dipilih pada pekan ini.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
