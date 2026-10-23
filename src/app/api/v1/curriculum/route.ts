import { NextResponse } from "next/server";
import { CURRICULUM_DATA } from "@/data/curriculum";

export async function GET() {
  return NextResponse.json({
    success: true,
    statusCode: 200,
    message: "Data kurikulum 12 minggu dan 24 sesi live berhasil dimuat",
    data: CURRICULUM_DATA,
    meta: {
      totalWeeks: CURRICULUM_DATA.length,
      totalLiveSessions: CURRICULUM_DATA.reduce((acc, w) => acc + w.liveSessions.length, 0),
    },
  });
}
