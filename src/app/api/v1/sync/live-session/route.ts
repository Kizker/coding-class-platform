import { NextRequest, NextResponse } from "next/server";

export interface LiveSessionSyncData {
  currentStep: number; // 1: Tantangan Awal, 2: Pembelajaran Interaktif, 3: Kuis Logika (10 Soal), 4: Refleksi & Penuntasan
  subStep: number; // Sub-materi aktif di Tahap 2 (1, 2, 3)
  tutorStepTitle: string;
  pushedCode: string | null;
  tutorNote: string;
  studentLiveCode: string;
  studentExecutionOutput: string;
  studentOutputSuccess: boolean | null;
  studentQuizAnswers: Record<number, number>;
  studentQuizScore: number;
  quizSubmitted: boolean;
  quizScores?: Record<number, boolean>;
  quizTotalAnswered?: number;
  quizCorrectCount?: number;
  helpRequested: boolean;
  sessionCompleted: boolean;
  lastUpdated: number;
}

// In-memory global state for live session synchronization (shared across regular & incognito tabs)
const globalLiveSessionState: LiveSessionSyncData = {
  currentStep: 1,
  subStep: 1,
  tutorStepTitle: "Tahap 1: Tantangan Uji Coba Awal",
  pushedCode: null,
  tutorNote: "Silakan coba selesaikan tantangan awal di bawah. Mentor memantau caramu berpikir dan menulis kode.",
  studentLiveCode: "def hitung_diskon(total):\n    # Tuliskan logikamu di sini:\n    pass\n",
  studentExecutionOutput: "",
  studentOutputSuccess: null,
  studentQuizAnswers: {},
  studentQuizScore: 0,
  quizSubmitted: false,
  helpRequested: false,
  sessionCompleted: false,
  lastUpdated: Date.now(),
};

// GET: Retrieve current sync state
export async function GET() {
  return NextResponse.json({
    success: true,
    statusCode: 200,
    message: "Live session state fetched successfully",
    data: globalLiveSessionState,
  });
}

// POST: Update sync state from Tutor or Student
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Partial update of live session state
    if (typeof body.currentStep === "number") {
      globalLiveSessionState.currentStep = body.currentStep;
    }
    if (typeof body.subStep === "number") {
      globalLiveSessionState.subStep = body.subStep;
    }
    if (typeof body.tutorStepTitle === "string") {
      globalLiveSessionState.tutorStepTitle = body.tutorStepTitle;
    }
    if (body.pushedCode !== undefined) {
      globalLiveSessionState.pushedCode = body.pushedCode;
    }
    if (typeof body.tutorNote === "string") {
      globalLiveSessionState.tutorNote = body.tutorNote;
    }
    if (typeof body.studentLiveCode === "string") {
      globalLiveSessionState.studentLiveCode = body.studentLiveCode;
    }
    if (typeof body.studentExecutionOutput === "string") {
      globalLiveSessionState.studentExecutionOutput = body.studentExecutionOutput;
    }
    if (body.studentOutputSuccess !== undefined) {
      globalLiveSessionState.studentOutputSuccess = body.studentOutputSuccess;
    }
    if (body.studentQuizAnswers !== undefined) {
      globalLiveSessionState.studentQuizAnswers = body.studentQuizAnswers;
    }
    if (typeof body.studentQuizScore === "number") {
      globalLiveSessionState.studentQuizScore = body.studentQuizScore;
    }
    if (typeof body.quizSubmitted === "boolean") {
      globalLiveSessionState.quizSubmitted = body.quizSubmitted;
    }
    if (typeof body.helpRequested === "boolean") {
      globalLiveSessionState.helpRequested = body.helpRequested;
    }
    if (typeof body.sessionCompleted === "boolean") {
      globalLiveSessionState.sessionCompleted = body.sessionCompleted;
    }

    globalLiveSessionState.lastUpdated = Date.now();

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Live session state updated successfully",
      data: globalLiveSessionState,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: "Failed to update live session state",
        errors: [{ field: "sync", message: err?.message || "Unknown error" }],
      },
      { status: 500 }
    );
  }
}
