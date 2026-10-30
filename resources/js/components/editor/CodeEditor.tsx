"use client";

import React, { useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { RotateCcw } from "lucide-react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onReset?: () => void;
  isSaved?: boolean;
  lastSavedAt?: string;
  readOnly?: boolean;
  height?: string;
  language?: string;
  hideHeader?: boolean;
  hideBorder?: boolean;
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
  hideHeader = false,
  hideBorder = false,
}: CodeEditorProps) {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <div className={`flex flex-col overflow-hidden bg-white ${hideBorder ? "" : "border-2.5 border-black shadow-[4px_4px_0px_#000]"}`}>
      {/* Editor Header Bar */}
      {!hideHeader && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b-2.5 border-black text-xs font-mono">
        <div className="flex items-center space-x-3">
          <span className="text-black font-black tracking-wider uppercase">
            WORKSPACE // main.py
          </span>
          <span className="text-[11px] text-stone-700 font-bold hidden sm:inline">
            (Python 3.11 Pyodide)
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[11px]">
          {lastSavedAt && (
            <span className="flex items-center space-x-1.5 text-stone-700 font-bold">
              <span
                className={`w-2 h-2 border border-black rounded-full ${
                  isSaved ? "bg-[#86EFAC]" : "bg-[#FEF08A] animate-pulse"
                }`}
              />
              <span className="hidden md:inline font-mono">{lastSavedAt}</span>
            </span>
          )}

          {onReset && !readOnly && (
            <button
              onClick={onReset}
              className="flex items-center space-x-1.5 px-3 py-1 bg-white hover:bg-[#FEF08A] text-black transition-all border-2 border-black font-black text-[11px] cursor-pointer shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none uppercase"
              title="Reset ke kode awal"
            >
              <RotateCcw className="w-3 h-3 stroke-[2.5]" />
              <span>RESET</span>
            </button>
          )}
        </div>
      </div>
      )}

      {/* Editor Main Canvas with Monaco Light Theme */}
      <div className="relative" style={{ height }}>
        <Editor
          height="100%"
          language={language}
          value={value}
          theme="vs"
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
            padding: { top: 12, bottom: 12 },
          }}
          loading={
            <div className="h-full flex items-center justify-center bg-[#FDFBF7] text-black text-xs font-mono font-black uppercase">
              MEMUAT MONACO EDITOR...
            </div>
          }
        />
      </div>
    </div>
  );
}
