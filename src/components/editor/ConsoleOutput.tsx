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
    <div className="flex flex-col border border-white/[0.08] rounded-lg overflow-hidden bg-[#0a0b10] text-slate-200">
      {/* Console Header */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#12141d] border-b border-white/[0.06] text-xs font-mono">
        <div className="flex items-center space-x-2">
          <Terminal className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-300 tracking-wider">TERMINAL // STDOUT</span>
        </div>

        <div className="flex items-center space-x-2 text-[11px]">
          {isRunning && (
            <span className="flex items-center space-x-1.5 text-amber-400">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>EXECUTING...</span>
            </span>
          )}

          {!isRunning && isSuccess === true && (
            <span className="flex items-center space-x-1 text-emerald-400 font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>EXIT 0 ({executionTimeMs ?? 0}ms)</span>
            </span>
          )}

          {!isRunning && isSuccess === false && (
            <span className="flex items-center space-x-1 text-rose-400 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>EXIT 1 (ERROR)</span>
            </span>
          )}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 font-mono text-xs min-h-[140px] max-h-[300px] overflow-y-auto space-y-3">
        {isRunning && (
          <div className="flex items-center space-x-2 text-slate-400 text-xs py-2">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
            <span>Mengeksekusi bytecode Python...</span>
          </div>
        )}

        {/* Stdout Output */}
        {stdout && (
          <div className="space-y-1">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
              OUTPUT:
            </div>
            <pre className="whitespace-pre-wrap text-emerald-300 bg-[#06070a] p-3 rounded border border-white/[0.06] leading-relaxed">
              {stdout}
            </pre>
          </div>
        )}

        {/* Diagnostic Card (Replaces AI Friendly Error) */}
        {friendlyError && (
          <div className="rounded-lg border border-rose-900/40 bg-[#140b0e] p-4 space-y-2.5">
            <div className="flex items-start justify-between font-mono">
              <div className="flex items-center space-x-2 text-rose-300 font-semibold text-xs">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{friendlyError.title}</span>
              </div>
              {friendlyError.errorLine && (
                <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800/60 px-2 py-0.5 rounded font-mono">
                  LINE {friendlyError.errorLine}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {friendlyError.explanation}
            </p>

            <div className="bg-[#1b1013] border border-rose-900/30 rounded p-2.5 text-xs text-amber-300/90 font-mono">
              <span className="text-amber-400 font-bold">REKOMENDASI: </span>
              <span className="font-sans text-slate-300">{friendlyError.hint}</span>
            </div>

            {/* Collapsible Raw Python Error */}
            <div className="pt-1">
              <button
                onClick={() => setShowRawTraceback(!showRawTraceback)}
                className="flex items-center space-x-1 text-[11px] text-slate-400 hover:text-slate-300 transition font-mono cursor-pointer"
              >
                <span>{showRawTraceback ? "[-]" : "[+]"} Raw Python Traceback</span>
                {showRawTraceback ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {showRawTraceback && (
                <pre className="mt-2 text-[11px] text-rose-400/80 bg-black p-2.5 rounded border border-rose-950 whitespace-pre-wrap overflow-x-auto font-mono">
                  {friendlyError.rawError}
                </pre>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isRunning && !stdout && !friendlyError && (
          <div className="text-slate-400 text-xs italic flex items-center justify-center h-20 font-mono">
            Klik tombol &quot;JALANKAN&quot; untuk mengeksekusi kode di sandbox WebAssembly.
          </div>
        )}
      </div>
    </div>
  );
}
