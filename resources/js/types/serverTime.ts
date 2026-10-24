export type DayKey = "senin" | "selasa" | "rabu" | "kamis" | "jumat" | "sabtu" | "minggu";

export interface ServerTimeData {
  timestamp: string;
  dayKey: DayKey;
  dayIndex: number; // 1: senin, 2: selasa, 3: rabu, 4: kamis, 5: jumat, 6: sabtu, 7: minggu
  dayName: string;
  dateFormatted: string;
  timeFormatted: string;
  isLiveClassDay: boolean;
  isWeekdayHomeworkDay: boolean;
  isRestDay: boolean;
  activeWeek: number;
}
