"use client";

import { useEffect, useState } from "react";

export function useAutoSaveDraft(storageKey: string, initialCode: string) {
  const [code, setCode] = useState<string>(initialCode);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [lastSavedAt, setLastSavedAt] = useState<string>("");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`draft_${storageKey}`);
      if (saved !== null && saved !== "") {
        setCode(saved);
        setLastSavedAt("Tersimpan dari sesi sebelumnya");
      } else {
        setCode(initialCode);
      }
    } catch {
      setCode(initialCode);
    }
  }, [storageKey, initialCode]);

  // Debounced auto-save every 3 seconds when code changes
  useEffect(() => {
    setIsSaved(false);
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(`draft_${storageKey}`, code);
        setIsSaved(true);
        const now = new Date();
        setLastSavedAt(
          `Tersimpan otomatis ${now.getHours().toString().padStart(2, "0")}:${now
            .getMinutes()
            .toString()
            .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
        );
      } catch (e) {
        console.warn("Gagal auto-save ke localStorage:", e);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [code, storageKey]);

  const resetToInitial = () => {
    setCode(initialCode);
    try {
      localStorage.removeItem(`draft_${storageKey}`);
      setIsSaved(true);
      setLastSavedAt("Direset ke kode awal");
    } catch {}
  };

  return {
    code,
    setCode,
    isSaved,
    lastSavedAt,
    resetToInitial,
  };
}
