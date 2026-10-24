import { useState, useEffect, useCallback } from "react";
import { DayKey, ServerTimeData } from "@/types/serverTime";

const DEFAULT_SERVER_TIME: ServerTimeData = {
  timestamp: "2026-10-23T09:45:00.000Z",
  dayKey: "jumat",
  dayIndex: 5,
  dayName: "Jumat",
  dateFormatted: "Jumat, 23 Oktober 2026",
  timeFormatted: "09:45 WIB",
  isLiveClassDay: true,
  isWeekdayHomeworkDay: false,
  isRestDay: false,
  activeWeek: 4,
};

export function useServerTime(pollingIntervalMs = 30000) {
  const [serverTime, setServerTime] = useState<ServerTimeData>(DEFAULT_SERVER_TIME);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);
  const [simulatedDay, setSimulatedDay] = useState<DayKey | null>(null);

  const fetchServerTime = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/server-time", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch server time");
      const json = await res.json();
      if (json.success && json.data) {
        setServerTime(json.data);
        setIsLiveConnected(true);
      }
    } catch (err) {
      console.warn("Using default server time fallback:", err);
      setIsLiveConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServerTime();
    if (pollingIntervalMs > 0) {
      const interval = setInterval(fetchServerTime, pollingIntervalMs);
      return () => clearInterval(interval);
    }
  }, [fetchServerTime, pollingIntervalMs]);

  // Derived active day data, respecting optional simulation for demo testing
  const activeDayKey: DayKey = simulatedDay || serverTime.dayKey;
  const dayIndexMap: Record<DayKey, number> = {
    senin: 1,
    selasa: 2,
    rabu: 3,
    kamis: 4,
    jumat: 5,
    sabtu: 6,
    minggu: 7,
  };
  const activeDayIndex = dayIndexMap[activeDayKey];

  return {
    serverTime,
    activeDayKey,
    activeDayIndex,
    isLoading,
    isLiveConnected,
    refetch: fetchServerTime,
    simulatedDay,
    setSimulatedDay,
  };
}
