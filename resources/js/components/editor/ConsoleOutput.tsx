"use client";

import React, { useState } from "react";
import { Terminal, Check, AlertCircle, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
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
    <div className="flex flex-col border border-slate-200 rounded-2xl overflow-hidden bg-white text-slate-900 shadow-xs">
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 border-b border-slate-200 text-xs font-mono">
        <div className="flex items-center space-x-2">
          <Terminal className="w-3.5 h-3.5 text-slate-600" />
          <span className="font-bold text-slate-800 tracking-wider">TERMINAL // HASIL EKSEKUSI</span>
        </div>

        <div className="flex items-center space-x-2 text-[11px]">
          {isRunning && (
            <span className="flex items-center space-x-1.5 text-amber-700 font-semibold">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>MENGEKSEKUSI...</span>
            </span>
          )}

          {!isRunning && isSuccess === true && (
            <span className="flex items-center space-x-1 text-emerald-700 font-bold">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>EXIT 0 ({executionTimeMs ?? 0}ms)</span>
            </span>
          )}

          {!isRunning && isSuccess === false && (
            <span className="flex items-center space-x-1 text-red-700 font-bold">
              <AlertCircle className="w-3.5 h-3.5 text-red-600" />
              <span>EXIT 1 (ERROR)</span>
            </span>
          )}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 font-mono text-xs min-h-[140px] max-h-[300px] overflow-y-auto space-y-3">
        {isRunning && (
          <div className="flex items-center space-x-2 text-slate-600 text-xs py-2">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
            <span>Mengeksekusi kode Python di runtime Pyodide...</span>
          </div>
        )}

        {/* Stdout Output */}
        {stdout && (
          <div className="space-y-1">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              STDOUT:
            </div>
            <pre className="whitespace-pre-wrap text-emerald-900 bg-emerald-50/60 p-3.5 rounded-lg border border-emerald-200 leading-relaxed font-semibold">
              {stdout}
            </pre>
          </div>
        )}

        {/* Diagnostic Error Card */}
        {friendlyError && (
          <div className="rounded-lg border border-red-200 bg-red-50/70 p-4 space-y-2.5">
            <div className="flex items-start justify-between font-mono">
              <div className="flex items-center space-x-2 text-red-800 font-bold text-xs">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{friendlyError.title}</span>
              </div>
              {friendlyError.errorLine && (
                <span className="text-[10px] bg-red-100 text-red-800 border border-red-300 px-2 py-0.5 rounded font-mono font-bold">
                  BARIS {friendlyError.errorLine}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              {friendlyError.explanation}
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-md p-2.5 text-xs text-amber-900 font-mono">
              <span className="text-amber-800 font-bold">SOLUSI: </span>
              <span className="font-sans text-slate-800">{friendlyError.hint}</span>
            </div>

            {/* Collapsible Raw Python Error */}
            <div className="pt-1">
              <button
                onClick={() => setShowRawTraceback(!showRawTraceback)}
                className="flex items-center space-x-1 text-[11px] text-slate-600 hover:text-slate-900 transition font-mono cursor-pointer"
              >
                <span>{showRawTraceback ? "[-]" : "[+]"} Raw Python Traceback</span>
                {showRawTraceback ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {showRawTraceback && (
                <pre className="mt-2 text-[11px] text-red-800 bg-red-100/50 p-2.5 rounded border border-red-200 whitespace-pre-wrap overflow-x-auto font-mono">
                  {friendlyError.rawError}
                </pre>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isRunning && !stdout && !friendlyError && (
          <div className="text-slate-500 text-xs italic flex items-center justify-center h-20 font-sans">
            Klik tombol &quot;JALANKAN KODE&quot; untuk mengeksekusi program di browser.
          </div>
        )}
      </div>
    </div>
  );
}
