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
    <div className="flex flex-col border-2.5 border-black bg-white text-black shadow-[4px_4px_0px_#000] overflow-hidden">
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b-2.5 border-black text-xs font-mono">
        <div className="flex items-center space-x-2">
          <Terminal className="w-3.5 h-3.5 text-black stroke-[2.5]" />
          <span className="font-black text-black tracking-wider uppercase">TERMINAL // HASIL EKSEKUSI</span>
        </div>

        <div className="flex items-center space-x-2 text-[11px]">
          {isRunning && (
            <span className="flex items-center space-x-1.5 px-2.5 py-0.5 bg-[#FEF08A] border-2 border-black font-black text-[10px] text-black uppercase shadow-[1px_1px_0px_#000]">
              <Loader2 className="w-3 h-3 animate-spin stroke-[2.5]" />
              <span>MENGEKSEKUSI...</span>
            </span>
          )}

          {!isRunning && isSuccess === true && (
            <span className="flex items-center space-x-1 px-2.5 py-0.5 bg-[#86EFAC] border-2 border-black font-black text-[10px] text-black uppercase shadow-[1px_1px_0px_#000]">
              <Check className="w-3 h-3 stroke-[2.5]" />
              <span>EXIT 0 ({executionTimeMs ?? 0}ms)</span>
            </span>
          )}

          {!isRunning && isSuccess === false && (
            <span className="flex items-center space-x-1 px-2.5 py-0.5 bg-[#FECDD3] border-2 border-black font-black text-[10px] text-black uppercase shadow-[1px_1px_0px_#000]">
              <AlertCircle className="w-3 h-3 stroke-[2.5]" />
              <span>EXIT 1 (ERROR)</span>
            </span>
          )}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 font-mono text-xs min-h-[140px] max-h-[300px] overflow-y-auto space-y-3">
        {isRunning && (
          <div className="flex items-center space-x-2 text-stone-800 text-xs py-2 font-bold font-mono">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-black stroke-[2.5]" />
            <span>Mengeksekusi kode Python di runtime Pyodide...</span>
          </div>
        )}

        {/* Stdout Output */}
        {stdout && (
          <div className="space-y-1">
            <div className="text-[10px] text-black uppercase tracking-wider font-black font-mono">
              STDOUT:
            </div>
            <pre className="whitespace-pre-wrap text-black bg-[#86EFAC]/20 p-3.5 border-2 border-black leading-relaxed font-bold font-mono shadow-[2px_2px_0px_#000]">
              {stdout}
            </pre>
          </div>
        )}

        {/* Diagnostic Error Card */}
        {friendlyError && (
          <div className="border-2.5 border-black bg-[#FECDD3]/30 p-4 space-y-2.5 shadow-[3px_3px_0px_#000]">
            <div className="flex items-start justify-between font-mono">
              <div className="flex items-center space-x-2 text-black font-black text-xs uppercase">
                <AlertCircle className="w-4 h-4 text-black stroke-[2.5] shrink-0" />
                <span>{friendlyError.title}</span>
              </div>
              {friendlyError.errorLine && (
                <span className="text-[10px] bg-[#FECDD3] text-black border-2 border-black px-2 py-0.5 font-mono font-black shadow-[1px_1px_0px_#000]">
                  BARIS {friendlyError.errorLine}
                </span>
              )}
            </div>

            <p className="text-xs text-stone-900 leading-relaxed font-bold">
              {friendlyError.explanation}
            </p>

            <div className="bg-[#FEF08A] border-2 border-black p-2.5 text-xs text-black font-mono shadow-[2px_2px_0px_#000]">
              <span className="font-black uppercase">SOLUSI: </span>
              <span className="font-bold">{friendlyError.hint}</span>
            </div>

            {/* Collapsible Raw Python Error */}
            <div className="pt-1">
              <button
                onClick={() => setShowRawTraceback(!showRawTraceback)}
                className="flex items-center space-x-1 text-[11px] text-black hover:underline font-mono font-bold cursor-pointer"
              >
                <span>{showRawTraceback ? "[-]" : "[+]"} Raw Python Traceback</span>
                {showRawTraceback ? <ChevronUp className="w-3 h-3 stroke-[2.5]" /> : <ChevronDown className="w-3 h-3 stroke-[2.5]" />}
              </button>

              {showRawTraceback && (
                <pre className="mt-2 text-[11px] text-black bg-white p-2.5 border-2 border-black whitespace-pre-wrap overflow-x-auto font-mono font-bold">
                  {friendlyError.rawError}
                </pre>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isRunning && !stdout && !friendlyError && (
          <div className="text-stone-600 text-xs font-bold uppercase italic flex items-center justify-center h-20 font-mono">
            Klik tombol &quot;JALANKAN KODE&quot; untuk mengeksekusi program di browser.
          </div>
        )}
      </div>
    </div>
  );
}
