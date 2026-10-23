import { NextResponse } from "next/server";

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

export async function GET() {
  const now = new Date();

  // Standardize time in Indonesian context (Asia/Jakarta)
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Jakarta",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("id-ID", options);
  const parts = formatter.formatToParts(now);
  const partMap: Record<string, string> = {};
  parts.forEach((p) => {
    partMap[p.type] = p.value;
  });

  const weekdayRaw = (partMap["weekday"] || "Jumat").toLowerCase();

  let dayKey: DayKey = "jumat";
  let dayIndex = 5;

  if (weekdayRaw.includes("senin")) {
    dayKey = "senin";
    dayIndex = 1;
  } else if (weekdayRaw.includes("selasa")) {
    dayKey = "selasa";
    dayIndex = 2;
  } else if (weekdayRaw.includes("rabu")) {
    dayKey = "rabu";
    dayIndex = 3;
  } else if (weekdayRaw.includes("kamis")) {
    dayKey = "kamis";
    dayIndex = 4;
  } else if (weekdayRaw.includes("jumat")) {
    dayKey = "jumat";
    dayIndex = 5;
  } else if (weekdayRaw.includes("sabtu")) {
    dayKey = "sabtu";
    dayIndex = 6;
  } else if (weekdayRaw.includes("minggu")) {
    dayKey = "minggu";
    dayIndex = 7;
  }

  const dayCapitalized = dayKey.charAt(0).toUpperCase() + dayKey.slice(1);
  const dateFormatted = `${dayCapitalized}, ${partMap["day"] || now.getDate()} ${partMap["month"] || "Oktober"} ${partMap["year"] || now.getFullYear()}`;
  const timeFormatted = `${partMap["hour"] || "09"}:${partMap["minute"] || "00"} WIB`;

  const responseData: ServerTimeData = {
    timestamp: now.toISOString(),
    dayKey,
    dayIndex,
    dayName: dayCapitalized,
    dateFormatted,
    timeFormatted,
    isLiveClassDay: dayKey === "jumat" || dayKey === "sabtu",
    isWeekdayHomeworkDay: ["senin", "selasa", "rabu", "kamis"].includes(dayKey),
    isRestDay: dayKey === "minggu",
    activeWeek: 4,
  };

  return NextResponse.json({
    success: true,
    statusCode: 200,
    message: "Server time and live day tracking retrieved successfully",
    data: responseData,
  });
}
