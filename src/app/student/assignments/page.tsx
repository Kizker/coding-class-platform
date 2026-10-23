"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CURRICULUM_DATA } from "@/data/curriculum";
import { ArrowRight, Check, Filter, Clock, Zap, BookOpen } from "lucide-react";

export default function StudentAssignmentsPage() {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [filterType, setFilterType] = useState<string>("ALL");

  const currentWeekData = CURRICULUM_DATA.find((w) => w.week === selectedWeek) || CURRICULUM_DATA[0];

  const filteredAssignments = currentWeekData.assignments.filter((a) => {
    if (filterType === "ALL") return true;
    return a.type === filterType;
  });

  const getCategoryColor = (type: string) => {
    switch (type) {
      case "RECALL":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "CODE_READ":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "DEBUGGING":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "PRE_READ":
        return "bg-teal-50 text-teal-700 border-teal-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="ui-card-outer p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-blue-700 uppercase tracking-widest mb-1">
              <span>01 // DAFTAR TUGAS HARIAN</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Tantangan Pemrograman Senin–Kamis
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Latihan mandiri 15–20 menit sehari untuk mengasah ketajaman logika koding dan pemecahan masalah.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono shrink-0">
            <span className="text-slate-500 font-bold">PILIH PEKAN:</span>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(parseInt(e.target.value, 10))}
              className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold shadow-2xs cursor-pointer"
            >
              {CURRICULUM_DATA.map((w) => (
                <option key={w.week} value={w.week}>
                  M{w.week.toString().padStart(2, "0")}: {w.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Bar with Uniform Buttons */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs font-mono">
          <span className="text-slate-500 mr-1 flex items-center space-x-1 font-bold">
            <Filter className="w-3.5 h-3.5" />
            <span>KATEGORI:</span>
          </span>
          {[
            { id: "ALL", label: "SEMUA PR" },
            { id: "RECALL", label: "01 // RECALL" },
            { id: "CODE_READ", label: "02 // CODE READ" },
            { id: "DEBUGGING", label: "03 // DEBUGGING" },
            { id: "PRE_READ", label: "04 // PRE-READ" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3.5 py-2 rounded-xl transition text-xs font-bold cursor-pointer ${
                filterType === tab.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Assignments Grid - Uniform Inner Box Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredAssignments.map((a) => (
            <div
              key={a.id}
              className="ui-card-inner-interactive bg-white border border-slate-200 p-6 rounded-2xl shadow-xs flex flex-col justify-between space-y-4 min-h-[220px]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 uppercase">
                      {a.day.toUpperCase()}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryColor(a.type)}`}>
                      {a.type}
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold text-[11px] flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>+{a.points} XP</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                    {a.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mt-1.5 font-sans">
                    {a.challengeInstructions}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 flex items-center space-x-1.5 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>DURASI: {a.durationMinutes} MENIT</span>
                </span>

                <Link
                  href={`/student/learn/${selectedWeek}/${a.day}`}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition flex items-center space-x-1.5 shadow-xs"
                >
                  <span>BUKA STUDIO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}

          {filteredAssignments.length === 0 && (
            <div className="col-span-2 py-16 text-center text-slate-500 text-xs font-mono ui-card-outer p-8">
              TIDAK ADA TUGAS PADA FILTER KATEGORI INI.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
