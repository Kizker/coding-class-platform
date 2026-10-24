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
    <div className={`flex flex-col overflow-hidden bg-white ${hideBorder ? "" : "border border-slate-200 rounded-2xl shadow-xs"}`}>
      {/* Editor Header Bar */}
      {!hideHeader && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 border-b border-slate-200 text-xs font-mono">
        <div className="flex items-center space-x-3">
          <span className="text-slate-800 font-bold tracking-wider">
            WORKSPACE // main.py
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            (Python 3.11 Pyodide)
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[11px]">
          {lastSavedAt && (
            <span className="flex items-center space-x-1.5 text-slate-600">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isSaved ? "bg-emerald-600" : "bg-amber-500 animate-pulse"
                }`}
              />
              <span className="hidden md:inline">{lastSavedAt}</span>
            </span>
          )}

          {onReset && !readOnly && (
            <button
              onClick={onReset}
              className="flex items-center space-x-1 px-2.5 py-1 rounded bg-white hover:bg-slate-200 text-slate-700 transition border border-slate-300 font-semibold cursor-pointer shadow-2xs"
              title="Reset ke kode awal"
            >
              <RotateCcw className="w-3 h-3" />
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
            <div className="h-full flex items-center justify-center bg-slate-50 text-slate-500 text-xs font-mono">
              MEMUAT MONACO EDITOR...
            </div>
          }
        />
      </div>
    </div>
  );
}
