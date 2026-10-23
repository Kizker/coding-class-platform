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
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-blue-700 uppercase tracking-widest">
              <span>01 // INDEKS TUGAS MANDIRI</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Daftar Tugas Harian (PR Senin–Kamis)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Latihan mandiri 15–20 menit sehari untuk mengasah ketajaman logika koding.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="text-slate-500 font-semibold">PEKAN:</span>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(parseInt(e.target.value, 10))}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium shadow-2xs"
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
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs font-mono">
          <span className="text-slate-500 mr-1 flex items-center space-x-1 font-semibold">
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
              className={`px-3 py-1.5 rounded-md transition text-xs cursor-pointer ${
                filterType === tab.id
                  ? "bg-blue-600 text-white font-semibold shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
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
              className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-400 hover:shadow-md transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-blue-700 font-semibold uppercase">
                    [{a.day.toUpperCase()} // {a.type}]
                  </span>
                  <span className="text-slate-900 font-bold">
                    +{a.points} XP
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 tracking-tight font-sans">
                  {a.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {a.challengeInstructions}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">
                  DURASI: {a.durationMinutes} MENIT
                </span>

                <Link
                  href={`/student/learn/${selectedWeek}/${a.day}`}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition flex items-center space-x-1 shadow-xs"
                >
                  <span>BUKA STUDIO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}

          {filteredAssignments.length === 0 && (
            <div className="col-span-2 py-12 text-center text-slate-500 text-xs font-mono">
              TIDAK ADA TUGAS PADA FILTER YANG DIPILIH.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
