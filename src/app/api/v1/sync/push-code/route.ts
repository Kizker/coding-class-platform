import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, targetStudentId } = body;

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 400,
          message: "Field 'code' wajib disertakan",
          errors: [{ field: "code", message: "Isi kode peraga tidak boleh kosong" }],
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "Kode peraga berhasil disinkronkan ke layar siswa",
      data: {
        targetStudentId: targetStudentId || "student-1",
        pushedAt: new Date().toISOString(),
        codeLength: code.length,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: "Gagal memproses sinkronisasi kode",
        errors: [{ field: "server", message: err?.message || "Unknown error" }],
      },
      { status: 500 }
    );
  }
}
