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
      title: "Tanda Kutip String Belum Ditutup",
      explanation: "Komputer mendeteksi pembukaan teks menggunakan tanda kutip (\" atau '), namun belum menemukan tanda penutupnya sebelum baris berakhir.",
      hint: errorLine
        ? `Periksa baris ke-${errorLine}. Pastikan teks diapit tanda kutip pembuka dan penutup yang selaras.`
        : "Periksa kembali setiap string teks dan pastikan tanda kutip pembuka dan penutupnya lengkap.",
      rawError,
      errorLine,
    };
  }

  // 2. Unexpected EOF (lupa tutup kurung)
  if (rawError.includes("unexpected EOF while parsing")) {
    return {
      title: "Tanda Kurung Penutup Belum Lengkap",
      explanation: "Tanda kurung buka '(' atau '[' telah dideklarasikan, tetapi program berakhir sebelum kurung pasangannya ditutup.",
      hint: "Periksa baris terakhir kode, pastikan seluruh tanda kurung buka memiliki pasangan penutup ')'.",
      rawError,
      errorLine,
    };
  }

  // 3. Missing colon in if / for / def
  if (rawError.includes("expected ':'") || (rawError.includes("SyntaxError: invalid syntax") && rawError.includes(":"))) {
    return {
      title: "Titik Dua (:) Belum Ditemukan di Akhir Baris",
      explanation: "Pada Python, setiap deklarasi blok kontrol (if/elif/else), iterasi (for/while), atau fungsi (def) wajib diakhiri dengan simbol titik dua ':'.",
      hint: errorLine
        ? `Periksa baris ke-${errorLine}, tambahkan tanda ':' di akhir pernyataan.`
        : "Pastikan ada tanda ':' setelah kondisi logika atau deklarasi fungsi.",
      rawError,
      errorLine,
    };
  }

  // 4. IndentationError
  if (rawError.includes("IndentationError")) {
    return {
      title: "Indentasi (Spasi Menjorok) Belum Sesuai",
      explanation: "Python mengandalkan kerapian spasi menjorok (indentasi) untuk menentukan baris kode mana yang berada di dalam suatu blok instruksi.",
      hint: errorLine
        ? `Periksa baris ke-${errorLine}. Gunakan 4 spasi atau tekan tombol Tab pada baris yang merupakan isi dari blok tersebut.`
        : "Pastikan jarak spasi di awal baris tersusun konsisten dan sejajar.",
      rawError,
      errorLine,
    };
  }

  // 5. NameError (Variabel belum ada / typo)
  if (rawError.includes("NameError")) {
    const varMatch = rawError.match(/name '(\w+)' is not defined/);
    const varName = varMatch ? varMatch[1] : "sebuah variabel";
    return {
      title: `Variabel '${varName}' Belum Dideklarasikan`,
      explanation: `Komputer tidak menemukan data dari identifier '${varName}'. Kemungkinan variabel belum dibuat atau terdapat perbedaan huruf besar/kecil (case-sensitive).`,
      hint: `Pastikan variabel '${varName}' sudah didefinisikan sebelumnya. Periksa ketepatan penulisan ejaan namanya.`,
      rawError,
      errorLine,
    };
  }

  // 6. ZeroDivisionError
  if (rawError.includes("ZeroDivisionError")) {
    return {
      title: "Operasi Pembagian dengan Angka Nol",
      explanation: "Secara komputasi dan matematika aritmatika, operasi pembagian dengan angka 0 menghasilkan nilai yang tidak terdefinisi.",
      hint: "Pastikan penyebut / angka pembagi bernilai lebih dari 0, atau beri pengkondisian if sebelum membagi.",
      rawError,
      errorLine,
    };
  }

  // 7. TypeError
  if (rawError.includes("TypeError")) {
    if (rawError.includes("can only concatenate str") || rawError.includes("unsupported operand type")) {
      return {
        title: "Inkompatibilitas Penggabungan Tipe Data",
        explanation: "Operasi menggabungkan teks (string) dengan bilangan (integer/float) tidak dapat dilakukan secara langsung tanpa casting tipe data.",
        hint: "Gunakan f-string seperti `f\"Nilai: {angka}\"` atau konversi angka menjadi string dengan `str(angka)`.",
        rawError,
        errorLine,
      };
    }
    return {
      title: "Ketidaksesuaian Tipe Data Argumen",
      explanation: "Fungsi atau operator menerima format tipe data yang tidak didukung oleh operasi tersebut.",
      hint: "Periksa tipe data yang dimasukkan, pertimbangkan konversi tipe data seperti int() atau str().",
      rawError,
      errorLine,
    };
  }

  // 8. General SyntaxError
  if (rawError.includes("SyntaxError")) {
    return {
      title: "Struktur Sintaksis Belum Sesuai Aturan Python",
      explanation: "Komputer mendeteksi susunan kata kunci atau karakter khusus yang tidak mematuhi tata bahasa formal bahasa Python.",
      hint: errorLine
        ? `Tinjau baris ke-${errorLine}. Periksa apakah terdapat simbol yang terlewat atau penempatan operator yang keliru.`
        : "Periksa kembali aturan sintaksis pada instruksi terkait.",
      rawError,
      errorLine,
    };
  }

  // Fallback
  return {
    title: "Diagnosa Eksekusi Program",
    explanation: "Terdapat kendala eksekusi pada instruksi logika yang dijalankan.",
    hint: errorLine
      ? `Periksa baris ke-${errorLine} untuk meninjau kembali alur instruksi.`
      : "Bandingkan kodemu dengan panduan teori pada modul pembelajaran.",
    rawError,
    errorLine,
  };
}
