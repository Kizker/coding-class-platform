export interface FriendlyError {
  title: string;
  explanation: string;
  hint: string;
  rawError: string;
  errorLine?: number;
}

export function translatePythonError(rawError: string): FriendlyError {
  const lineMatch = rawError.match(/line (\d+)/i);
  const errorLine = lineMatch ? parseInt(lineMatch[1], 10) : undefined;

  // 1. Missing closing quote / String Syntax
  if (rawError.includes("EOL while scanning string literal") || rawError.includes("unterminated string literal")) {
    return {
      title: "Ada Tanda Kutip yang Belum Ditutup! 📝",
      explanation: "Komputer melihat kamu mulai menulis teks dengan tanda kutip (\" atau '), tapi belum menemukan tanda kutip penutupnya sebelum ganti baris.",
      hint: errorLine
        ? `Cek baris ke-${errorLine}. Pastikan string teks diawali dan diakhiri dengan tanda kutip yang sama.`
        : "Periksa kembali setiap string teksmu dan pastikan tanda kutip pembuka dan penutupnya lengkap.",
      rawError,
      errorLine,
    };
  }

  // 2. Unexpected EOF (lupa tutup kurung)
  if (rawError.includes("unexpected EOF while parsing")) {
    return {
      title: "Kurung Penutup Belum Lengkap! 🔍",
      explanation: "Kamu membuka tanda kurung ( atau kurung siku [, tapi program selesai sebelum kurung tersebut ditutup.",
      hint: "Periksa baris terakhir kodemu, pastikan semua tanda kurung buka '(' memiliki pasangannya ')'.",
      rawError,
      errorLine,
    };
  }

  // 3. Missing colon in if / for / def
  if (rawError.includes("expected ':'") || (rawError.includes("SyntaxError: invalid syntax") && rawError.includes(":"))) {
    return {
      title: "Lupa Titik Dua (:) di Akhir Baris! 📌",
      explanation: "Pada Python, setiap membuat pernyataan percabangan (if/else), perulangan (for/while), atau fungsi (def), baris wajib diakhiri dengan tanda titik dua ':'.",
      hint: errorLine
        ? `Periksa baris ke-${errorLine}, tambahkan tanda ':' di ujung baris.`
        : "Pastikan ada tanda ':' setelah kondisi if atau loop.",
      rawError,
      errorLine,
    };
  }

  // 4. IndentationError
  if (rawError.includes("IndentationError")) {
    return {
      title: "Lekukan Spasi Belum Rapi (Indentation)! 📐",
      explanation: "Python menggunakan spasi yang menjorok ke dalam (indentasi) untuk mengetahui kode mana yang berada di dalam if, loop, atau fungsi.",
      hint: errorLine
        ? `Periksa baris ke-${errorLine}. Tekan tombol Tab atau beri 4 spasi pada baris yang merupakan isi dari blok tersebut.`
        : "Ratakan lekukan spasi kodemu agar rapi dan seragam.",
      rawError,
      errorLine,
    };
  }

  // 5. NameError (Variabel belum ada / typo)
  if (rawError.includes("NameError")) {
    const varMatch = rawError.match(/name '(\w+)' is not defined/);
    const varName = varMatch ? varMatch[1] : "sebuah variabel";
    return {
      title: `Variabel '${varName}' Belum Dikenali! 🏷️`,
      explanation: `Komputer belum tahu apa isi '${varName}'. Kemungkinan kamu belum membuatnya, atau ada salah ketik huruf besar/kecil.`,
      hint: `Pastikan variabel '${varName}' sudah dideklarasikan sebelumnya. Ingat bahwa Python sensitif terhadap huruf besar dan kecil.`,
      rawError,
      errorLine,
    };
  }

  // 6. ZeroDivisionError
  if (rawError.includes("ZeroDivisionError")) {
    return {
      title: "Pembagian dengan Angka Nol (0)! ⚡",
      explanation: "Secara logika matematika dan komputer, sebuah angka tidak bisa dibagi dengan angka 0 karena hasilnya tak terdefinisi.",
      hint: "Pastikan angka pembagi bukan 0, atau tambahkan percabangan 'if pembagi != 0' sebelum membagi.",
      rawError,
      errorLine,
    };
  }

  // 7. TypeError (Operasi antar tipe data tak cocok)
  if (rawError.includes("TypeError")) {
    if (rawError.includes("can only concatenate str") || rawError.includes("unsupported operand type")) {
      return {
        title: "Tipe Data Tidak Cocok untuk Digabung! 🧩",
        explanation: "Kamu mencoba menggabungkan teks (string) dengan angka (integer) secara langsung tanpa mengubah formatnya terlebih dahulu.",
        hint: "Gunakan f-string seperti `f\"Hasil: {nilai}\"` atau ubah angka jadi teks dengan `str(angka)`.",
        rawError,
        errorLine,
      };
    }
    return {
      title: "Operasi Tipe Data Kurang Pas! ⚠️",
      explanation: "Fungsi atau operator yang kamu panggil menerima jenis data yang tidak sesuai dengan yang diharapkan.",
      hint: "Periksa tipe data yang kamu masukkan, apakah butuh konversi seperti int() atau str().",
      rawError,
      errorLine,
    };
  }

  // 8. General SyntaxError
  if (rawError.includes("SyntaxError")) {
    return {
      title: "Ada Rumus Koding yang Keliru (Syntax Error) ✍️",
      explanation: "Komputer belum mengerti struktur kalimat kodemu karena ada kata atau simbol yang letaknya belum sesuai aturan Python.",
      hint: errorLine
        ? `Cek baris ke-${errorLine}. Periksa apakah ada simbol atau tanda baca yang kurang atau salah ketik.`
        : "Periksa kembali ejaan sintaks Python pada baris tersebut.",
      rawError,
      errorLine,
    };
  }

  // Fallback generic friendly error
  return {
    title: "Program Menemukan Kendala Ringan 💡",
    explanation: "Jangan khawatir! Error adalah bagian alami dan paling berharga dari belajar koding.",
    hint: errorLine
      ? `Periksa baris ke-${errorLine} untuk meninjau logikamu.`
      : "Coba baca petunjuk soal sekali lagi dan bandingkan dengan contoh di materi.",
    rawError,
    errorLine,
  };
}
