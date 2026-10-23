"use client";

import React, { useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { RotateCcw, Sparkles, CheckCircle2, Clock } from "lucide-react";

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
    <div className="flex flex-col border border-slate-700/60 rounded-xl overflow-hidden bg-[#1e1e2e] shadow-xl">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#181825] border-b border-slate-700/60 text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="font-mono text-slate-300 font-semibold px-2 py-0.5 rounded bg-slate-800/80">
            main.py
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline-flex items-center">
            Python 3.11 (WASM)
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {lastSavedAt && (
            <span className="flex items-center space-x-1 text-[11px] text-slate-400">
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400/90 hidden md:inline">{lastSavedAt}</span>
                </>
              ) : (
                <>
                  <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                  <span className="text-amber-400/90 hidden md:inline">Menyimpan draft...</span>
                </>
              )}
            </span>
          )}

          {onReset && !readOnly && (
            <button
              onClick={onReset}
              className="flex items-center space-x-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-[11px] cursor-pointer"
              title="Reset ke kode awal tantangan"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
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
            fontSize: 14,
            fontFamily: "var(--font-mono), 'Fira Code', Consolas, monospace",
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
            <div className="h-full flex items-center justify-center bg-[#1e1e2e] text-slate-400 text-sm">
              <Sparkles className="w-4 h-4 mr-2 animate-spin text-indigo-400" />
              Menyiapkan Monaco Code Editor...
            </div>
          }
        />
      </div>
    </div>
  );
}
