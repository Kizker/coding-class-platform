"use client";

import React, { useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { RotateCcw, Check, Clock } from "lucide-react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onReset?: () => void;
  isSaved?: boolean;
  lastSavedAt?: string;
  readOnly?: boolean;
  height?: string;
  language?: string;
}

export function CodeEditor({
  value,
  onChange,
  onReset,
  isSaved = true,
  lastSavedAt,
  readOnly = false,
  height = "380px",
  language = "python",
}: CodeEditorProps) {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <div className="flex flex-col border border-white/[0.08] rounded-lg overflow-hidden bg-[#0d0e15] shadow-lg">
      {/* Editor Header Bar - Swiss Technical Studio */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#12141d] border-b border-white/[0.06] text-xs font-mono">
        <div className="flex items-center space-x-3">
          <span className="text-slate-300 font-semibold tracking-wider">
            WORKSPACE // main.py
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            (Python 3.11 WASM)
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[11px]">
          {lastSavedAt && (
            <span className="flex items-center space-x-1.5 text-slate-400">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isSaved ? "bg-emerald-400" : "bg-amber-400 animate-pulse"
                }`}
              />
              <span className="hidden md:inline">{lastSavedAt}</span>
            </span>
          )}

          {onReset && !readOnly && (
            <button
              onClick={onReset}
              className="flex items-center space-x-1 px-2 py-0.5 rounded bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white transition border border-white/[0.08] cursor-pointer"
              title="Reset ke kode awal"
            >
              <RotateCcw className="w-3 h-3" />
              <span>RESET</span>
            </button>
          )}
        </div>
      </div>

      {/* Editor Main Canvas */}
      <div className="relative" style={{ height }}>
        <Editor
          height="100%"
          language={language}
          value={value}
          theme="vs-dark"
          onChange={(val) => onChange(val || "")}
          onMount={handleEditorDidMount}
          options={{
            readOnly,
            fontSize: 13,
            fontFamily: "var(--font-mono), 'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
            lineNumbers: "on",
            renderWhitespace: "selection",
            cursorBlinking: "smooth",
            smoothScrolling: true,
            padding: { top: 10, bottom: 10 },
          }}
          loading={
            <div className="h-full flex items-center justify-center bg-[#0d0e15] text-slate-400 text-xs font-mono">
              MEMUAT MONACO EDITOR...
            </div>
          }
        />
      </div>
    </div>
  );
}
