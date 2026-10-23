"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CURRICULUM_DATA } from "@/data/curriculum";
import { ArrowRight, Check, Filter } from "lucide-react";

export default function StudentAssignmentsPage() {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [filterType, setFilterType] = useState<string>("ALL");

  const currentWeekData = CURRICULUM_DATA.find((w) => w.week === selectedWeek) || CURRICULUM_DATA[0];

  const filteredAssignments = currentWeekData.assignments.filter((a) => {
    if (filterType === "ALL") return true;
    return a.type === filterType;
  });

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-200 py-8 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-white/[0.08] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">
              01 // INDEX TUGAS MANDIRI
            </p>
            <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
              Daftar Tugas Harian (PR Senin–Kamis)
            </h1>
            <p className="font-sans text-xs text-slate-300 mt-0.5">
              Latihan mandiri 15–20 menit sehari untuk mengasah ketajaman logika koding.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400">PEKAN:</span>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(parseInt(e.target.value, 10))}
              className="bg-[#12141d] border border-white/[0.12] rounded px-3 py-1.5 text-xs text-white focus:outline-none"
            >
              {CURRICULUM_DATA.map((w) => (
                <option key={w.week} value={w.week}>
                  M{w.week.toString().padStart(2, "0")}: {w.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 mr-1 flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>FILTER:</span>
          </span>
          {[
            { id: "ALL", label: "SEMUA_PR" },
            { id: "RECALL", label: "01_RECALL" },
            { id: "CODE_READ", label: "02_CODE_READ" },
            { id: "DEBUGGING", label: "03_DEBUGGING" },
            { id: "PRE_READ", label: "04_PRE_READ" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1 rounded transition text-xs ${
                filterType === tab.id
                  ? "bg-white text-black font-bold"
                  : "bg-[#11131b] text-slate-400 hover:text-slate-200 border border-white/[0.06]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Assignments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAssignments.map((a) => (
            <div
              key={a.id}
              className="p-5 rounded-lg bg-[#0e1017] border border-white/[0.08] flex flex-col justify-between space-y-4 hover:border-white/20 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    {a.day.toUpperCase()} // {a.type}
                  </span>
                  <span className="text-amber-400 font-bold">
                    +{a.points} XP
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight">{a.title}</h3>
                <p className="font-sans text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {a.challengeInstructions}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  DURASI: {a.durationMinutes} MENIT
                </span>

                <Link
                  href={`/student/learn/${selectedWeek}/${a.day}`}
                  className="px-3.5 py-1.5 rounded bg-white text-black font-bold text-xs hover:bg-slate-200 transition flex items-center space-x-1"
                >
                  <span>BUKA STUDIO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}

          {filteredAssignments.length === 0 && (
            <div className="col-span-2 py-12 text-center text-slate-500 text-xs">
              TIDAK ADA TUGAS PADA FILTER YANG DIPILIH.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
