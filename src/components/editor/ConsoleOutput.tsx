"use client";

import React, { useState } from "react";
import { Terminal, CheckCircle, AlertTriangle, ChevronDown, ChevronUp, Loader2, Sparkles } from "lucide-react";
import { FriendlyError } from "@/lib/pyodide/errorTranslator";

interface ConsoleOutputProps {
  stdout: string;
  stderr: string;
  isSuccess: boolean | null;
  friendlyError: FriendlyError | null;
  isRunning: boolean;
  executionTimeMs?: number;
}

export function ConsoleOutput({
  stdout,
  stderr,
  isSuccess,
  friendlyError,
  isRunning,
  executionTimeMs,
}: ConsoleOutputProps) {
  const [showRawTraceback, setShowRawTraceback] = useState<boolean>(false);

  return (
    <div className="flex flex-col border border-slate-700/60 rounded-xl overflow-hidden bg-[#11111b] shadow-xl text-slate-200">
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#181825] border-b border-slate-700/60 text-xs">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-300">Terminal Konsol Interaktif</span>
        </div>

        <div className="flex items-center space-x-2">
          {isRunning && (
            <span className="flex items-center space-x-1.5 text-xs text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded-full">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Mengeksekusi...</span>
            </span>
          )}

          {!isRunning && isSuccess === true && (
            <span className="flex items-center space-x-1 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded-full font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Program Selesai ({executionTimeMs ?? 0}ms)</span>
            </span>
          )}

          {!isRunning && isSuccess === false && (
            <span className="flex items-center space-x-1 text-xs text-rose-400 bg-rose-950/40 border border-rose-800/40 px-2 py-0.5 rounded-full font-medium">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Perlu Penyesuaian</span>
            </span>
          )}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 font-mono text-sm min-h-[140px] max-h-[320px] overflow-y-auto space-y-3">
        {isRunning && (
          <div className="flex items-center space-x-2 text-slate-400 text-xs py-2">
            <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
            <span>Python WebAssembly sedang menjalankan kodemu...</span>
          </div>
        )}

        {/* Stdout Output */}
        {stdout && (
          <div className="space-y-1">
            <div className="text-[11px] font-sans text-slate-500 uppercase tracking-wider font-semibold">
              Output Program:
            </div>
            <pre className="whitespace-pre-wrap text-emerald-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800 leading-relaxed">
              {stdout}
            </pre>
          </div>
        )}

        {/* Friendly Error Card */}
        {friendlyError && (
          <div className="rounded-xl border border-rose-700/60 bg-gradient-to-br from-rose-950/40 to-slate-900/90 p-4 shadow-lg space-y-2.5">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2 text-rose-300 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{friendlyError.title}</span>
              </div>
              {friendlyError.errorLine && (
                <span className="text-[11px] bg-rose-900/60 text-rose-300 border border-rose-700/60 px-2 py-0.5 rounded-full">
                  Baris ke-{friendlyError.errorLine}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {friendlyError.explanation}
            </p>

            <div className="bg-slate-900/80 border border-slate-700/60 rounded-lg p-3 text-xs text-amber-300 flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-200">Tips Perbaikan: </span>
                {friendlyError.hint}
              </div>
            </div>

            {/* Collapsible Raw Python Error */}
            <div className="pt-1">
              <button
                onClick={() => setShowRawTraceback(!showRawTraceback)}
                className="flex items-center space-x-1 text-[11px] text-slate-500 hover:text-slate-300 transition"
              >
                <span>{showRawTraceback ? "Sembunyikan" : "Lihat"} Pesan Error Asli Python</span>
                {showRawTraceback ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {showRawTraceback && (
                <pre className="mt-2 text-[11px] text-rose-400/80 bg-black/60 p-2.5 rounded border border-rose-900/50 whitespace-pre-wrap overflow-x-auto">
                  {friendlyError.rawError}
                </pre>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isRunning && !stdout && !friendlyError && (
          <div className="text-slate-500 text-xs italic flex items-center justify-center h-20">
            Klik tombol &quot;▶ Jalankan Kode&quot; untuk melihat output programmu di sini.
          </div>
        )}
      </div>
    </div>
  );
}
