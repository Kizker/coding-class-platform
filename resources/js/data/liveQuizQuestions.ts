export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export const LIVE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Perhatikan urutan baris kode di bawah. Apa yang akan tercetak di layar terminal saat program dijalankan?",
    codeSnippet: `x = 10
print(x)
x = 25
print(x)`,
    options: [
      "10 lalu 10",
      "10 lalu 25",
      "25 lalu 25",
      "Terjadi SyntaxError karena variabel dibuat dua kali",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Komputer membaca kode baris demi baris dari atas ke bawah. Saat print pertama, nilai x masih 10. Kemudian x diubah (re-assigned) menjadi 25 sebelum print kedua dieksekusi.",
  },
  {
    id: 2,
    question: "Apa luaran terminal dari penggabungan dua variabel string di bawah ini?",
    codeSnippet: `angka_pertama = "5"
angka_kedua = "10"
print(angka_pertama + angka_kedua)`,
    options: ["15", "510", "'15'", "TypeError: unsupported operand"],
    correctAnswerIndex: 1,
    explanation:
      "Tanda petik (\"5\" dan \"10\") menandakan tipe data teks (String). Operator '+' pada string berfungsi menggabungkan teks (concatenation), sehingga hasilnya adalah '510', bukan penjumlahan matematika 15.",
  },
  {
    id: 3,
    question: "Berapa banyak baris teks yang akan dihasilkan oleh kode berikut di terminal?",
    codeSnippet: `print("Halo Andi!\\nSelamat datang di Pekan 1.\\nMari belajar koding.")`,
    options: [
      "1 baris panjang",
      "2 baris teks",
      "3 baris teks",
      "Error karena simbol backslash tidak valid",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Simbol '\\n' adalah karakter khusus escape character untuk 'Newline' (baris baru). Dua simbol '\\n' membagi teks menjadi tepat 3 baris terpisah di konsol terminal.",
  },
  {
    id: 4,
    question: "Apa yang terjadi saat tipe data teks (String) dikalikan dengan sebuah angka Integer di Python?",
    codeSnippet: `kata = "Py"
print(kata * 3)`,
    options: [
      "Py3",
      "PyPyPy",
      "Error karena teks tidak bisa dikali",
      "None",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Di Python, operator perkalian '*' antara String dan Integer melakukan perulangan teks (string repetition). 'Py' diulang sebanyak 3 kali menjadi 'PyPyPy'.",
  },
  {
    id: 5,
    question: "Berapa nilai variabel 'hasil' dari operasi pembagian bulat (floor division '//') berikut?",
    codeSnippet: `hasil = 17 // 3
print(hasil)`,
    options: ["5.666", "5", "6", "2"],
    correctAnswerIndex: 1,
    explanation:
      "Operator '//' adalah pembagian bulat (floor division) yang membuang angka di belakang koma. 17 dibagi 3 adalah 5 sisa 2, sehingga 17 // 3 menghasilkan bilangan bulat 5.",
  },
  {
    id: 6,
    question: "Operator persen ('%') di Python adalah modulo (sisa bagi). Berapa nilai 'sisa' di bawah?",
    codeSnippet: `sisa = 19 % 4
print(sisa)`,
    options: ["4", "4.75", "3", "1"],
    correctAnswerIndex: 2,
    explanation:
      "19 dibagi 4 menghasilkan 4 dengan sisa pembagian 3 (karena 4 * 4 = 16, dan 19 - 16 = 3). Maka hasil dari 19 % 4 adalah 3.",
  },
  {
    id: 7,
    question: "Berapa nilai akhir variabel 'poin' setelah seluruh baris perhitungan di bawah selesai?",
    codeSnippet: `poin = 50
poin = poin + 30
poin = poin - 15
print(poin)`,
    options: ["50", "80", "65", "95"],
    correctAnswerIndex: 2,
    explanation:
      "Awalnya poin = 50. Baris kedua: poin menjadi 50 + 30 = 80. Baris ketiga: poin menjadi 80 - 15 = 65.",
  },
  {
    id: 8,
    question: "Apa yang akan tercetak di layar terminal dari f-string berikut ini?",
    codeSnippet: `nama = "Andi"
pekan = 1
print(f"Siswa: {nama}, Target: {pekan * 2} Sesi")`,
    options: [
      "Siswa: {nama}, Target: {pekan * 2} Sesi",
      "Siswa: Andi, Target: 2 Sesi",
      "Siswa: Andi, Target: pekan * 2 Sesi",
      "Terjadi SyntaxError pada tanda kurung kurawal",
    ],
    correctAnswerIndex: 1,
    explanation:
      "F-string (diawali huruf 'f') mengevaluasi kode Python di dalam kurung kurawal '{...}'. {nama} digantikan dengan 'Andi' dan {pekan * 2} dihitung menjadi '2'.",
  },
  {
    id: 9,
    question: "Perhatikan fungsi 'int()' (type casting). Berapa hasil dari kode berikut?",
    codeSnippet: `teks_angka = "25"
nilai = int(teks_angka) + 15
print(nilai)`,
    options: [
      "'2515'",
      "40",
      "2515",
      "TypeError: cannot convert string to int",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Fungsi int('25') mengubah string '25' menjadi angka bulat 25. Kemudian 25 + 15 menghasilkan angka 40.",
  },
  {
    id: 10,
    question: "Apa tipe data dan nilai dari variabel 'lulus' pada ekspresi logika perbandingan di bawah?",
    codeSnippet: `skor = 85
lulus = skor >= 75
print(type(lulus), lulus)`,
    options: [
      "<class 'str'> 'True'",
      "<class 'bool'> True",
      "<class 'int'> 1",
      "<class 'bool'> False",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Ekspresi 'skor >= 75' (85 >= 75) bernilai benar sehingga menghasilkan tipe data Boolean (<class 'bool'>) dengan nilai True.",
  },
];
