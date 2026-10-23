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
    question: "Perhatikan fungsi di bawah. Apa yang akan tercetak di layar terminal saat kode dijalankan?",
    codeSnippet: `def jumlah(a, b):
    return a + b

hasil = jumlah(10, 5)
print(hasil * 2)`,
    options: ["15", "30", "105", "None"],
    correctAnswerIndex: 1,
    explanation: "Fungsi jumlah(10, 5) mengembalikan nilai 15. Lalu 15 dikalikan 2 menghasilkan 30.",
  },
  {
    id: 2,
    question: "Apa nilai dari variabel 'hasil' jika sebuah fungsi tidak memiliki kata kunci 'return'?",
    codeSnippet: `def cetak_pesan(nama):
    print(f"Halo {nama}")

hasil = cetak_pesan("Andi")
print(hasil)`,
    options: ["'Halo Andi'", "0", "None", "Terjadi SyntaxError"],
    correctAnswerIndex: 2,
    explanation: "Di Python, fungsi yang tidak mengembalikan nilai dengan 'return' secara otomatis akan mengembalikan objek khusus 'None'.",
  },
  {
    id: 3,
    question: "Berapa nilai variabel 'poin' di baris terakhir setelah fungsi dipanggil?",
    codeSnippet: `poin = 50

def tambah_bonus():
    poin = 100

tambah_bonus()
print(poin)`,
    options: ["50", "100", "150", "UnboundLocalError"],
    correctAnswerIndex: 0,
    explanation: "Variabel 'poin' di dalam fungsi adalah variabel LOKAL. Mengubahnya di dalam fungsi tidak akan mengubah variabel 'poin' GLOBAL di luar.",
  },
  {
    id: 4,
    question: "Apa output dari kode perulangan yang memiliki 'return' di dalamnya berikut?",
    codeSnippet: `def cari_genap():
    for i in range(1, 10):
        if i % 2 == 0:
            return i
        print(f"Ganjil: {i}")

print("Ditemukan:", cari_genap())`,
    options: [
      "Ganjil: 1 lalu Ditemukan: 2",
      "Ditemukan: 2",
      "Ganjil: 1 sampai Ganjil: 9",
      "Loop berjalan tanpa henti",
    ],
    correctAnswerIndex: 0,
    explanation: "Saat i=1, mencetak 'Ganjil: 1'. Saat i=2, 'return 2' langsung menghentikan fungsi dan mengembalikan angka 2 seketika.",
  },
  {
    id: 5,
    question: "Berapa hasil eksekusi pemanggilan fungsi dengan parameter default di bawah ini?",
    codeSnippet: `def hitung_ongkir(berat, tarif=10000):
    return berat * tarif

print(hitung_ongkir(3))`,
    options: ["3000", "10000", "30000", "Error: kurang 1 argumen"],
    correctAnswerIndex: 2,
    explanation: "Karena parameter 'tarif' memiliki nilai default 10000, pemanggilan hitung_ongkir(3) akan menghitung 3 * 10000 = 30000.",
  },
  {
    id: 6,
    question: "Perhatikan logika operator modulo (%) berikut. Apa output dari pemanggilan fungsi ini?",
    codeSnippet: `def cek_bilangan(n):
    if n % 2 == 0 and n > 10:
        return "GENAP_BESAR"
    elif n % 2 == 0:
        return "GENAP_KECIL"
    return "GANJIL"

print(cek_bilangan(12), cek_bilangan(7))`,
    options: [
      "GENAP_BESAR GANJIL",
      "GENAP_KECIL GANJIL",
      "GENAP_BESAR GENAP_BESAR",
      "Error: operator tidak didukung",
    ],
    correctAnswerIndex: 0,
    explanation: "12 adalah genap dan lebih besar dari 10 (GENAP_BESAR). 7 bukan bilangan genap sehingga masuk ke cabang terakhir (GANJIL).",
  },
  {
    id: 7,
    question: "Bagaimana cara mencegah program mengalami ZeroDivisionError saat membuat fungsi kalkulator pembagian?",
    codeSnippet: `def bagi(a, b):
    # Baris pencegah error pembagi nol:
    ...`,
    options: [
      "if b == 0: return 'Tidak dapat membagi nol'",
      "if a == 0: return 0",
      "return a / (b + 1)",
      "b = 1 lalu return a / b",
    ],
    correctAnswerIndex: 0,
    explanation: "Pembagian dengan nol terjadi jika nilai penyebut b bernilai 0. Validasi 'if b == 0:' melindungi kalkulator agar program tidak crash.",
  },
  {
    id: 8,
    question: "Berapa kali kata 'PROSES' akan dicetak saat fungsi rekursif sederhana ini dipanggil?",
    codeSnippet: `def hitung_mundur(n):
    if n <= 0:
        return
    print("PROSES")
    hitung_mundur(n - 1)

hitung_mundur(3)`,
    options: ["2 kali", "3 kali", "4 kali", "Loop tak hingga"],
    correctAnswerIndex: 1,
    explanation: "Fungsi dipanggil untuk n=3 (cetak 1), n=2 (cetak 2), n=1 (cetak 3), dan berhenti saat n=0. Total tercetak 3 kali.",
  },
  {
    id: 9,
    question: "Jika sebuah list diubah di dalam fungsi menggunakan '.append()', apa yang terjadi pada list asli di luar?",
    codeSnippet: `data = ["Batu", "Gunting"]

def tambah_opsi(daftar):
    daftar.append("Kertas")

tambah_opsi(data)
print(len(data))`,
    options: [
      "2 (List asli tidak berubah)",
      "3 (List asli ikut berubah)",
      "0 (List direset)",
      "Terjadi TypeError",
    ],
    correctAnswerIndex: 1,
    explanation: "Di Python, list adalah objek 'mutable' yang dikirim melalui referensi. Operasi .append() di dalam fungsi ikut memodifikasi list asli sehingga panjangnya menjadi 3.",
  },
  {
    id: 10,
    question: "Pada Capstone Game Batu-Gunting-Kertas, fungsi apa dari modul 'random' yang paling tepat digunakan untuk memilih opsi bot secara acak?",
    codeSnippet: `import random
pilihan = ["Batu", "Gunting", "Kertas"]
bot = ... # pilih 1 secara acak`,
    options: [
      "random.choice(pilihan)",
      "random.randint(pilihan)",
      "random.shuffle(pilihan)",
      "random.random(pilihan)",
    ],
    correctAnswerIndex: 0,
    explanation: "random.choice(list) digunakan untuk mengambil tepat satu elemen secara acak dari dalam kumpulan list.",
  },
];
