var e=[{week:1,phase:1,phaseTitle:`Fondasi Logika & Komputasi Dasar`,title:`Berkenalan dengan Dunia Koding & Memori`,description:`Memahami cara komputer mengeksekusi instruksi dari atas ke bawah, fungsi print(), dan kotak penyimpanan data (variabel).`,assignments:[{id:`w1-senin`,day:`senin`,type:`RECALL`,title:`PR 1: Menyapa Dunia dengan print()`,durationMinutes:15,points:20,theoryMarkdown:'### Fungsi print() di Python\nKomputer berkomunikasi dengan kita melalui teks di layar terminal. Di Python, kita menggunakan fungsi `print()` untuk menampilkan teks.\n\nContoh:\n```python\nprint("Halo Teman-teman!")\n```\n\nPastikan teks diapit dengan tanda petik dua (`"`) atau tanda petik satu (`\'`).',challengeInstructions:`Tuliskan kode untuk mencetak pesan 'Halo Dunia, aku siap belajar koding!' ke layar terminal.`,starterCode:`# Ketik kodemu di bawah baris ini:
print("Halo Dunia, aku siap belajar koding!")
`,hints:[`Gunakan fungsi print() dengan huruf kecil semua.`,`Jangan lupa mengapit teks dengan tanda petik dua.`],testAssertions:`assert 'Halo Dunia, aku siap belajar koding!' in stdout, 'Output teks belum sesuai'`,expectedOutput:`Halo Dunia, aku siap belajar koding!`},{id:`w1-selasa`,day:`selasa`,type:`CODE_READ`,title:`PR 2: Membaca Alur Eksekusi Kode`,durationMinutes:15,points:20,theoryMarkdown:`### Alur Eksekusi Baris demi Baris
Komputer membaca kode baris demi baris dari atas ke bawah secara berurutan.

Perhatikan bagaimana variabel nilainya dapat ditimpa:`,challengeInstructions:`Perhatikan kode di editor. Tebak dan jalankan untuk membuktikan urutan apa yang keluar di layar!`,starterCode:`pesan = "Langkah 1"
print(pesan)
pesan = "Langkah 2"
print(pesan)
`,hints:[`Komputer mengeksekusi print pertama sebelum variabel pesan diubah.`],testAssertions:`assert 'Langkah 1' in stdout and 'Langkah 2' in stdout`,expectedOutput:`Langkah 1
Langkah 2`},{id:`w1-rabu`,day:`rabu`,type:`DEBUGGING`,title:`PR 3: Memperbaiki Petik Hilang (SyntaxError)`,durationMinutes:20,points:25,theoryMarkdown:`### Debugging: Menemukan Bug!
Programmer hebat bukanlah yang tidak pernah error, melainkan yang tenang dan teliti saat membaca pesan error.
Di soal ini, ada kode yang sengaja dirusak. Tugasmu memperbaikinya!`,challengeInstructions:`Perbaiki kode di editor agar tidak lagi memicu SyntaxError saat dijalankan.`,starterCode:`# Ada tanda kutip yang hilang pada kode di bawah:
print("Semangat Belajar Koding!)
`,hints:[`Lihat ujung teks setelah tanda seru (!). Apakah tanda kutip penutupnya sudah ada?`],testAssertions:`assert 'Semangat Belajar Koding!' in stdout`,expectedOutput:`Semangat Belajar Koding!`},{id:`w1-kamis`,day:`kamis`,type:`PRE_READ`,title:`PR 4: Pemanasan Variabel & Tipe Data`,durationMinutes:20,points:25,theoryMarkdown:'### Variabel: Kotak Penyimpan Nilai\nBayangkan variabel seperti kotak kardus berlabel nama.\n```python\nnama = "Andi"\numur = 14\n```\n`nama` menyimpan teks (string), sedangkan `umur` menyimpan bilangan bulat (integer).',challengeInstructions:"Buat variabel `nama_siswa` berisi nama kamu, dan `target_hari` bernilai angka 12. Lalu cetak keduanya!",starterCode:`# Buat variabel di sini:
nama_siswa = "Andi"
target_hari = 12

# Cetak hasilnya:
print(f"Siswa: {nama_siswa}, Target: {target_hari} Pekan")
`,hints:[`Gunakan tanda sama dengan (=) untuk memasukkan nilai ke variabel.`],testAssertions:`assert 'Siswa:' in stdout`,expectedOutput:`Siswa: Andi, Target: 12 Pekan`}],liveSessions:[{id:`w1-live-1`,day:`jumat`,sessionNumber:1,title:`Pertemuan 1: Logika Komputer, IPO & Fungsi print()`,durationMinutes:120,conceptIntro:`Memahami model Input-Proses-Output pada komputer, aturan sintaksis, escape character, dan membuat kartu identitas digital.`,guidedSteps:[{step:1,title:`Konsep Input-Proses-Output (IPO)`,description:`Analogi koki restoran: Bahan baku (Input) -> Dimasak (Proses) -> Hidangan disajikan (Output).`,tutorCode:`# Contoh IPO Sederhana:
# 1. Input: Variabel
nama = "Andi"
# 2. Proses: Merangkai teks
kartu = f"=== KARTU PELAJAR ===\\nNama: {nama}\\nStatus: Aktif Belajar"
# 3. Output: Cetak
print(kartu)`},{step:2,title:`Simbol Khusus (Escape Characters)`,description:`Menggunakan \\n untuk membuat baris baru dan \\t untuk membuat jarak tabulasi rapi.`,tutorCode:`print("Daftar Nilai:\\n\\t1. Logika: A\\n\\t2. Koding: A+")`}],practiceChallenge:`Buat kartu biodata digital dengan nama, hobi, dan cita-cita menggunakan format teks berbingkai ASCII rapi.`,studentStarterCode:`# Buat Kartu Biodata Digitalmu:
print("===============================")
print("     KARTU IDENTITAS KODING    ")
print("===============================")
# Lengkapi isinya di bawah ini:
`,expectedOutputDesc:`Kartu identitas berbingkai rapi tercetak di konsol.`},{id:`w1-live-2`,day:`sabtu`,sessionNumber:2,title:`Pertemuan 2: Kotak Memori: Variabel & Tipe Data Dasar`,durationMinutes:120,conceptIntro:`Mendalami tipe data str, int, float, dan bool serta konversi antar tipe data.`,guidedSteps:[{step:1,title:`4 Tipe Data Dasar`,description:`String (teks), Integer (angka bulat), Float (angka pecahan), Boolean (True/False).`,tutorCode:`nama = "Andi"          # str
umur = 14              # int
tinggi = 162.5         # float
sudah_makan = True     # bool

print(type(nama), type(umur), type(tinggi), type(sudah_makan))`}],practiceChallenge:`Buat program penghitung umur otomatis berdasarkan tahun lahir dan tahun sekarang.`,studentStarterCode:`tahun_lahir = 2012
tahun_sekarang = 2026
# Hitung umur:
umur = tahun_sekarang - tahun_lahir
print(f"Umur saya sekarang adalah {umur} tahun.")
`,expectedOutputDesc:`Umur saya sekarang adalah 14 tahun.`}]},{week:2,phase:1,phaseTitle:`Fondasi Logika & Komputasi Dasar`,title:`Operator Aritmatika & Pengambilan Keputusan (if-elif-else)`,description:`Melatih logika percabangan kondisi, operator perbandingan, dan kalkulasi matematis komputasi.`,assignments:[{id:`w2-senin`,day:`senin`,type:`RECALL`,title:`PR 1: Recall Operator Aritmatika`,durationMinutes:15,points:20,theoryMarkdown:"### Operator Aritmatika\nPython mendukung operasi matematika standar:\n- Tambah: `+`\n- Kurang: `-`\n- Kali: `*`\n- Bagi: `/`\n- Modulo (Sisa Bagi): `%`",challengeInstructions:`Hitung luas segitiga dengan alas = 10 dan tinggi = 8. Rumus: 0.5 * alas * tinggi.`,starterCode:`alas = 10
tinggi = 8
luas = 0.5 * alas * tinggi
print(f"Luas Segitiga: {luas}")
`,hints:[`Gunakan simbol * untuk perkalian.`],testAssertions:`assert '40' in stdout`,expectedOutput:`Luas Segitiga: 40.0`},{id:`w2-selasa`,day:`selasa`,type:`CODE_READ`,title:`PR 2: Menebak Kondisi Percabangan`,durationMinutes:15,points:20,theoryMarkdown:"### Membaca Kondisi if-else\nKomputer hanya akan menjalankan blok kode jika syaratnya terpenuhi (`True`).",challengeInstructions:`Periksa nilai skor di bawah. Apakah yang akan dicetak oleh komputer?`,starterCode:`skor = 85
if skor >= 80:
    print("Selamat, Kamu Lulus Hebat!")
else:
    print("Tetap Semangat Belajar!")
`,hints:[`Periksa apakah 85 lebih besar atau sama dengan 80.`],testAssertions:`assert 'Lulus Hebat' in stdout`,expectedOutput:`Selamat, Kamu Lulus Hebat!`},{id:`w2-rabu`,day:`rabu`,type:`DEBUGGING`,title:`PR 3: Memperbaiki Tanda Titik Dua (:) Hilang`,durationMinutes:20,points:25,theoryMarkdown:"### Mengapa Titik Dua Sangat Penting?\nDi Python, tanda titik dua `:` menandakan awal dari blok kode yang menjorok ke dalam.",challengeInstructions:`Perbaiki kode if-else di bawah ini yang lupa diberi tanda titik dua (:).`,starterCode:`nilai = 75
# Ada kesalahan tanda baca di baris if:
if nilai >= 70:
    print("Lulus Kuis")
`,hints:[`Tambahkan tanda ':' setelah kondisi nilai >= 70.`],testAssertions:`assert 'Lulus Kuis' in stdout`,expectedOutput:`Lulus Kuis`},{id:`w2-kamis`,day:`kamis`,type:`PRE_READ`,title:`PR 4: Logika Ganjil-Genap dengan Modulo (%)`,durationMinutes:20,points:25,theoryMarkdown:`### Modulo (%): Rahasia Ganjil Genap
Jika angka habis dibagi 2 (angka % 2 == 0), maka angka itu pasti GENAP! Jika bersisa 1, pasti GANJIL.`,challengeInstructions:`Buat variabel angka = 15. Gunakan if-else dengan modulo untuk mengecek apakah ganjil atau genap.`,starterCode:`angka = 15
if angka % 2 == 0:
    print("GENAP")
else:
    print("GANJIL")
`,hints:[`15 dibagi 2 adalah 7 sisa 1.`],testAssertions:`assert 'GANJIL' in stdout`,expectedOutput:`GANJIL`}],liveSessions:[{id:`w2-live-1`,day:`jumat`,sessionNumber:3,title:`Pertemuan 3: Otak Berhitung: Operator Aritmatika & Modulo (%)`,durationMinutes:120,conceptIntro:`Kalkulasi matematika komputer, aturan urutan PEMDAS, konverter waktu, dan operasi modulo.`,guidedSteps:[{step:1,title:`Urutan Operasi Hitung (PEMDAS)`,description:`Tanda kurung didahulukan, lalu kali/bagi, kemudian tambah/kurang.`,tutorCode:`hasil = (5 + 3) * 2
print("Hasil:", hasil)  # 16 bukan 11`}],practiceChallenge:`Buat konverter total menit ke format jam dan sisa menit (contoh: 135 menit = 2 jam 15 menit).`,studentStarterCode:`total_menit = 135
jam = total_menit // 60
sisa_menit = total_menit % 60
print(f"{total_menit} menit = {jam} jam {sisa_menit} menit")
`,expectedOutputDesc:`135 menit = 2 jam 15 menit`},{id:`w2-live-2`,day:`sabtu`,sessionNumber:4,title:`Pertemuan 4: Komputer Mengambil Keputusan: Percabangan if-elif-else`,durationMinutes:120,conceptIntro:`Mengembangkan nalar percabangan bertingkat untuk penentu nilai grade rapor (A, B, C, D).`,guidedSteps:[{step:1,title:`Struktur if-elif-else Lengkap`,description:`Analogi seleksi nilai ujian sekolah.`,tutorCode:`nilai = 88
if nilai >= 90:
    grade = 'A'
elif nilai >= 80:
    grade = 'B'
elif nilai >= 70:
    grade = 'C'
else:
    grade = 'D'
print("Grade:", grade)`}],practiceChallenge:`Buat penentu kelayakan tiket bioskop berdasarkan umur: Anak (<12), Remaja (12-17), Dewasa (>=18).`,studentStarterCode:`umur = 14
# Tentukan kategori:
if umur < 12:
    kategori = "Anak-anak"
elif umur <= 17:
    kategori = "Remaja"
else:
    kategori = "Dewasa"
print(f"Kategori Tiket: {kategori}")
`,expectedOutputDesc:`Kategori Tiket: Remaja`}]},{week:3,phase:1,phaseTitle:`Fondasi Logika & Komputasi Dasar`,title:`Perulangan (for / while) & Struktur Data List`,description:`Mengotomatisasi pekerjaan berulang dengan loop dan menyimpan banyak item dalam list.`,assignments:[{id:`w3-senin`,day:`senin`,type:`RECALL`,title:`PR 1: Perulangan for dan range()`,durationMinutes:15,points:20,theoryMarkdown:"### for loop dan range()\n```python\nfor i in range(1, 4):\n    print(i)\n# Output: 1, 2, 3\n```",challengeInstructions:`Cetak angka 1 sampai 5 menggunakan perulangan for dan fungsi range().`,starterCode:`for i in range(1, 6):
    print(f"Angka: {i}")
`,hints:[`range(1, 6) berhenti sebelum angka 6.`],testAssertions:`assert 'Angka: 5' in stdout`,expectedOutput:`Angka: 1
Angka: 2
Angka: 3
Angka: 4
Angka: 5`},{id:`w3-selasa`,day:`selasa`,type:`CODE_READ`,title:`PR 2: Mengakses Elemen List dengan Indeks`,durationMinutes:15,points:20,theoryMarkdown:`### Indeks List Dimulai dari 0!
Elemen pertama list selalu memiliki indeks 0, elemen kedua indeks 1, dan seterusnya.`,challengeInstructions:`Jalankan kode untuk melihat buah favorit pertama dan terakhir di dalam list.`,starterCode:`buah = ["Apel", "Mangga", "Jeruk", "Pisang"]
print("Buah Pertama:", buah[0])
print("Buah Terakhir:", buah[-1])
`,hints:[`Indeks -1 mengarah ke elemen paling belakang.`],testAssertions:`assert 'Apel' in stdout and 'Pisang' in stdout`,expectedOutput:`Buah Pertama: Apel
Buah Terakhir: Pisang`},{id:`w3-rabu`,day:`rabu`,type:`DEBUGGING`,title:`PR 3: Memperbaiki Indentation di Dalam Loop`,durationMinutes:20,points:25,theoryMarkdown:`### Indentasi Loop
Semua perintah yang ingin diulang wajib menjorok 4 spasi ke dalam.`,challengeInstructions:`Perbaiki IndentationError pada perulangan di editor.`,starterCode:`hobi = ["Membaca", "Mengoding", "Robotik"]
for item in hobi:
    print(f"Saya suka {item}")
`,hints:[`Beri 4 spasi atau tab pada baris print.`],testAssertions:`assert 'Saya suka Robotik' in stdout`,expectedOutput:`Saya suka Membaca
Saya suka Mengoding
Saya suka Robotik`},{id:`w3-kamis`,day:`kamis`,type:`PRE_READ`,title:`PR 4: Menambah Item dengan append()`,durationMinutes:20,points:25,theoryMarkdown:"### Method append()\nGunakan `.append()` untuk menambahkan elemen baru ke dalam list.",challengeInstructions:`Tambahkan item 'Pensil' ke dalam list alat_tulis menggunakan append(), lalu cetak panjang list.`,starterCode:`alat_tulis = ["Buku", "Penggaris"]
alat_tulis.append("Pensil")
print("Jumlah Alat Tulis:", len(alat_tulis))
print(alat_tulis)
`,hints:[`len() menghitung berapa banyak item di dalam list.`],testAssertions:`assert 'Jumlah Alat Tulis: 3' in stdout`,expectedOutput:`Jumlah Alat Tulis: 3
['Buku', 'Penggaris', 'Pensil']`}],liveSessions:[{id:`w3-live-1`,day:`jumat`,sessionNumber:5,title:`Pertemuan 5: Otomatisasi Perulangan: for loop & range()`,durationMinutes:120,conceptIntro:`Mempelajari perulangan angka, tabel perkalian dinamis, dan roket hitung mundur.`,guidedSteps:[{step:1,title:`Tabel Perkalian Dinamis`,description:`Mencetak tabel perkalian 7 dari 1 sampai 10.`,tutorCode:`angka = 7
for i in range(1, 11):
    print(f"{angka} x {i} = {angka * i}")`}],practiceChallenge:`Buat hitung mundur peluncuran roket dari 10 ke 1 diakhiri dengan 'Roket Meluncur ke Angkasa!'.`,studentStarterCode:`# Roket Hitung Mundur:
for i in range(10, 0, -1):
    print(f"T-Minus {i}...")
print("Roket Meluncur ke Angkasa!")
`,expectedOutputDesc:`Hitung mundur roket 10 ke 1 dan teks peluncuran.`},{id:`w3-live-2`,day:`sabtu`,sessionNumber:6,title:`Pertemuan 6: Lemari Penyimpanan Data: Struktur Data List`,durationMinutes:120,conceptIntro:`Manipulasi list lengkap: append, remove, pop, sort, dan perulangan for-each.`,guidedSteps:[{step:1,title:`Operasi List Belanja`,description:`Menambah, menghapus, dan memeriksa item.`,tutorCode:`keranjang = ["Susu", "Roti"]
keranjang.append("Telur")
keranjang.remove("Roti")
print("Isi Keranjang:", keranjang)`}],practiceChallenge:`Buat aplikasi daftar belanja yang mencetak nomor urut dan nama barang.`,studentStarterCode:`belanja = ["Buku Gambar", "Pensil Warna", "Penghapus"]
for i, barang in enumerate(belanja, 1):
    print(f"{i}. {barang}")
`,expectedOutputDesc:`1. Buku Gambar
2. Pensil Warna
3. Penghapus`}]},{week:4,phase:1,phaseTitle:`Fondasi Logika & Komputasi Dasar`,title:`Fungsi Modular (def) & Proyek Capstone 1 (Game CLI)`,description:`Merangkai kode menjadi fungsi bersih (Clean Code) dan membuat game CLI perdana.`,capstoneInfo:{id:`capstone-1`,title:`Capstone 1: Game Tebak Angka Rahasia / Batu-Gunting-Kertas CLI`,description:`Game konsol interaktif lengkap dengan sistem nyawa/ronde, modul random, dan penentu skor kemenangan.`,deliverables:[`Pustaka random`,`Validasi input`,`Perulangan game loop`,`Sistem skor`]},assignments:[{id:`w4-senin`,day:`senin`,type:`RECALL`,title:`PR 1: Mendefinisikan Fungsi dengan def`,durationMinutes:15,points:20,theoryMarkdown:'### Fungsi: Mesin Otomatis\nFungsi dibuat sekali dan bisa dipanggil berkali-kali.\n```python\ndef sapa(nama):\n    return f"Halo, {nama}!"\n```',challengeInstructions:"Buat fungsi `tambah(a, b)` yang mengembalikan hasil penjumlahan dua angka.",starterCode:`def tambah(a, b):
    return a + b

hasil = tambah(15, 25)
print("Hasil Penjumlahan:", hasil)
`,hints:[`Gunakan kata kunci return untuk mengembalikan hasil.`],testAssertions:`assert 'Hasil Penjumlahan: 40' in stdout`,expectedOutput:`Hasil Penjumlahan: 40`},{id:`w4-selasa`,day:`selasa`,type:`CODE_READ`,title:`PR 2: Membaca Alur Game Batu-Gunting-Kertas`,durationMinutes:15,points:20,theoryMarkdown:`### Logika Pemilihan Acak (random.choice)
Komputer bisa memilih item acak dari dalam list.`,challengeInstructions:`Jalankan simulasi penentuan pemenang di editor.`,starterCode:`pilihan_pemain = "Batu"
pilihan_bot = "Gunting"

if pilihan_pemain == pilihan_bot:
    print("Hasil: SERI")
elif pilihan_pemain == "Batu" and pilihan_bot == "Gunting":
    print("Hasil: PEMAIN MENANG!")
else:
    print("Hasil: BOT MENANG!")
`,hints:[`Batu mengalahkan gunting.`],testAssertions:`assert 'PEMAIN MENANG' in stdout`,expectedOutput:`Hasil: PEMAIN MENANG!`},{id:`w4-rabu`,day:`rabu`,type:`DEBUGGING`,title:`PR 3: Memperbaiki return yang Terlewat`,durationMinutes:20,points:25,theoryMarkdown:`### Jangan Lupa return!
Jika fungsi tidak memakai return, fungsi tersebut akan menghasilkan nilai None.`,challengeInstructions:`Perbaiki fungsi di bawah agar mengembalikan luas persegi.`,starterCode:`def hitung_luas_persegi(sisi):
    # Tambahkan return di baris ini:
    return sisi * sisi

luas = hitung_luas_persegi(6)
print("Luas Persegi:", luas)
`,hints:[`Gunakan return sisi * sisi.`],testAssertions:`assert 'Luas Persegi: 36' in stdout`,expectedOutput:`Luas Persegi: 36`},{id:`w4-kamis`,day:`kamis`,type:`PRE_READ`,title:`PR 4: Persiapan Capstone 1 (Modul Random)`,durationMinutes:20,points:25,theoryMarkdown:"### Modul random bawaan Python\n```python\nimport random\nangka_acak = random.randint(1, 10)\n```",challengeInstructions:`Gunakan random.choice untuk memilih opsi kado dari list kado.`,starterCode:`import random
kado = ["Sepeda", "Buku Komik", "Laptop Koding", "Robot"]
pilihan = random.choice(kado)
print(f"Kamu mendapatkan: {pilihan}")
`,hints:[`random.choice memilih 1 item secara acak.`],testAssertions:`assert 'Kamu mendapatkan:' in stdout`,expectedOutput:`Kamu mendapatkan: [Nama Kado]`}],liveSessions:[{id:`w4-live-1`,day:`jumat`,sessionNumber:7,title:`Pertemuan 7: Membuat Mesin Mandiri: Fungsi Modular (def & return)`,durationMinutes:120,conceptIntro:`Prinsip Clean Code, pemecahan kalkulator menjadi modul fungsi mandiri, dan parameter/return.`,guidedSteps:[{step:1,title:`Membangun 4 Fungsi Aritmatika`,description:`tambah(), kurang(), kali(), dan bagi().`,tutorCode:`def tambah(a, b): return a + b
def kurang(a, b): return a - b
def kali(a, b): return a * b
def bagi(a, b): return a / b if b != 0 else 'Error'`}],practiceChallenge:`Rancang program kalkulator menu interaktif yang memanggil fungsi-fungsi modular.`,studentStarterCode:`# Panggil fungsi kalkulator:
print("10 + 5 =", tambah(10, 5))
print("10 x 5 =", kali(10, 5))
`,expectedOutputDesc:`Hasil operasi hitung modular.`},{id:`w4-live-2`,day:`sabtu`,sessionNumber:8,title:`Pertemuan 8: Eksekusi Capstone 1: Game CLI Interaktif`,durationMinutes:120,conceptIntro:`Mengintegrasikan seluruh materi Bulan 1 menjadi game tebak angka rahasia atau batu-gunting-kertas.`,guidedSteps:[{step:1,title:`Struktur Game Loop`,description:`Game berjalan terus sampai pemain memutuskan keluar atau nyawa habis.`,tutorCode:`import random
rahasia = random.randint(1, 10)
print("[DEBUG] Angka rahasia:", rahasia)`}],practiceChallenge:`Buat Game Tebak Angka dengan batas 3 kali tebakan, petunjuk 'Terlalu Tinggi' atau 'Terlalu Rendah'.`,studentStarterCode:`# Game Tebak Angka Rahasia:
import random
angka_rahasia = random.randint(1, 10)
print("=== GAME TEBAK ANGKA RAHASIA (1-10) ===")
# Tuliskan logika loop dan tebakan di sini:
`,expectedOutputDesc:`Game konsol interaktif siap dimainkan.`}]},{week:5,phase:2,phaseTitle:`Menengah, Pemecahan Masalah & Struktur Data`,title:`Kamus Data: Dictionary (Key-Value) & Tuples`,description:`Mempelajari pasangan data key-value untuk memodelkan data dunia nyata seperti profil karakter RPG dan sistem kasir mini.`,assignments:[{id:`w5-senin`,day:`senin`,type:`RECALL`,title:`PR 1: Mengakses Nilai Dictionary via Key`,durationMinutes:15,points:20,theoryMarkdown:"Dictionary menyimpan data berupa `{key: value}`.",challengeInstructions:`Buat dictionary hero dengan key 'nama', 'hp', dan 'level', lalu cetak namanya.`,starterCode:`hero = {"nama": "Satria", "hp": 100, "level": 1}
print(f"Hero: {hero['nama']} (HP: {hero['hp']})")
`,hints:[`Gunakan hero['nama'] untuk mengambil nilainya.`],testAssertions:`assert 'Satria' in stdout`,expectedOutput:`Hero: Satria (HP: 100)`}],liveSessions:[{id:`w5-live-1`,day:`jumat`,sessionNumber:9,title:`Pertemuan 9: Kamus Data: Dictionary (Key-Value) & Tuples`,durationMinutes:120,conceptIntro:`Struktur data kamus, update data, dan perbedaan tuple permanen.`,guidedSteps:[],practiceChallenge:`Membuat database profil hero game RPG.`,studentStarterCode:`# Profil Hero RPG:
hero = {'nama': 'Arthur', 'senjata': 'Pedang Cahaya'}
print(hero)
`,expectedOutputDesc:`Profil karakter RPG.`},{id:`w5-live-2`,day:`sabtu`,sessionNumber:10,title:`Pertemuan 10: Manajemen Data Majemuk: List of Dictionaries`,durationMinutes:120,conceptIntro:`Sistem inventaris toko mini dan penghitung total belanja.`,guidedSteps:[],practiceChallenge:`Sistem kasir toko mini dan cetak struk otomatis.`,studentStarterCode:`# List of Dictionaries:
produk = [{'nama': 'Susu', 'harga': 15000}, {'nama': 'Roti', 'harga': 10000}]
`,expectedOutputDesc:`Struk belanja rapi.`}]},{week:6,phase:2,phaseTitle:`Menengah, Pemecahan Masalah & Struktur Data`,title:`Program Anti-Crash: Error Handling (try-except) & File I/O`,description:`Membentengi program dari crash dan menyimpan data secara permanen ke file teks (.txt / .csv).`,assignments:[],liveSessions:[{id:`w6-live-1`,day:`jumat`,sessionNumber:11,title:`Pertemuan 11: Program Anti-Crash: Error Handling (try-except)`,durationMinutes:120,conceptIntro:`Mengantisipasi kegagalan sistem dengan try, except, finally.`,guidedSteps:[],practiceChallenge:`Kalkulator kebal crash dari pembagian nol dan salah input teks.`,studentStarterCode:`try:
    angka = int("bukan_angka")
except ValueError:
    print("Input harus angka!")
`,expectedOutputDesc:`Input harus angka!`},{id:`w6-live-2`,day:`sabtu`,sessionNumber:12,title:`Pertemuan 12: Menyimpan Data Permanen: File I/O (.txt & .csv)`,durationMinutes:120,conceptIntro:`Menulis dan membaca data di harddisk komputer.`,guidedSteps:[],practiceChallenge:`Buku catatan harian tersimpan permanen di file.`,studentStarterCode:`# Menulis ke file:
with open('catatan.txt', 'w') as f:
    f.write('Catatan Belajar Hari Ini\\n')
`,expectedOutputDesc:`File berhasil ditulis.`}]},{week:7,phase:2,phaseTitle:`Menengah, Pemecahan Masalah & Struktur Data`,title:`Berpikir Seperti Arsitek: Pengenalan OOP (Class & Object)`,description:`Belajar konsep Object-Oriented Programming (OOP): cetak biru class, pembuatan object, atribut, dan method duel turn-based.`,assignments:[],liveSessions:[{id:`w7-live-1`,day:`jumat`,sessionNumber:13,title:`Pertemuan 13: Berpikir Seperti Arsitek: Pengenalan OOP (Class & Object)`,durationMinutes:120,conceptIntro:`Cetak biru class, konstruktor __init__, dan atribut objek.`,guidedSteps:[],practiceChallenge:`Program simulasi garasi mobil berbasis OOP.`,studentStarterCode:`class Mobil:
    def __init__(self, merk, warna):
        self.merk = merk
        self.warna = warna
`,expectedOutputDesc:`Objek mobil berhasil dibuat.`},{id:`w7-live-2`,day:`sabtu`,sessionNumber:14,title:`Pertemuan 14: Interaksi Antar Objek dalam OOP: Method & Turn-Based Duel`,durationMinutes:120,conceptIntro:`Method interaktif hero vs monster yang mengurangi HP.`,guidedSteps:[],practiceChallenge:`Mini game RPG turn-based battle berbasis OOP.`,studentStarterCode:`# OOP Battle:
class Karakter:
    def __init__(self, nama, hp): self.nama = nama; self.hp = hp
`,expectedOutputDesc:`Pertarungan RPG berjalan seimbang.`}]},{week:8,phase:2,phaseTitle:`Menengah, Pemecahan Masalah & Struktur Data`,title:`Capstone 2: Aplikasi Konsol Buku Kontak CRUD + CSV File`,description:`Menyatukan OOP, menu CRUD lengkap (Create, Read, Update, Delete), dan penyimpanan permanen CSV.`,capstoneInfo:{id:`capstone-2`,title:`Capstone 2: Buku Kontak Telepon CRUD + File CSV`,description:`Aplikasi konsol manajemen kontak lengkap yang menyimpan data secara permanen.`,deliverables:[`Class Kontak`,`Menu CRUD`,`File CSV reader/writer`,`Error handling`]},assignments:[],liveSessions:[{id:`w8-live-1`,day:`jumat`,sessionNumber:15,title:`Pertemuan 15: Desain Arsitektur CRUD Konsol Berulang (while True)`,durationMinutes:120,conceptIntro:`Merancang menu konsol profesional yang tidak langsung tertutup.`,guidedSteps:[],practiceChallenge:`Kerangka menu interaktif CRUD buku kontak.`,studentStarterCode:`# Menu Utama:
print("1. Tambah Kontak\\n2. Lihat Kontak\\n3. Keluar")
`,expectedOutputDesc:`Menu berjalan lancar.`},{id:`w8-live-2`,day:`sabtu`,sessionNumber:16,title:`Pertemuan 16: Eksekusi Capstone 2: Buku Kontak CRUD + CSV File`,durationMinutes:120,conceptIntro:`Integrasi menyeluruh penyimpanan file CSV kontak.`,guidedSteps:[],practiceChallenge:`Uji coba menyeluruh penambahan, pencarian, dan penyimpanan kontak.`,studentStarterCode:`# Capstone 2 CSV Kontak:
`,expectedOutputDesc:`Data kontak tersimpan di file.`}]},{week:9,phase:3,phaseTitle:`Terapan Nyata, Web App & Kelulusan`,title:`Menghubungkan Kode ke Internet: API & JSON`,description:`Belajar Client-Server, HTTP GET, pustaka requests, dan mengambil data cuaca serta kurs valas real-time.`,assignments:[],liveSessions:[{id:`w9-live-1`,day:`jumat`,sessionNumber:17,title:`Pertemuan 17: Menghubungkan Kode ke Internet: API & JSON`,durationMinutes:120,conceptIntro:`Analogi kurir pengantar data API dan parsing JSON.`,guidedSteps:[],practiceChallenge:`Pengambil fakta unik otomatis dari internet.`,studentStarterCode:`import json
# Contoh parsing data JSON:
data = json.loads('{"pesan": "Halo Dunia!"}')
print(data['pesan'])
`,expectedOutputDesc:`Halo Dunia!`},{id:`w9-live-2`,day:`sabtu`,sessionNumber:18,title:`Pertemuan 18: Proyek Data Real-Time: API Cuaca Kota & Kurs Valas`,durationMinutes:120,conceptIntro:`Mengekstrak suhu dan kurs valas dinamis.`,guidedSteps:[],practiceChallenge:`Aplikasi pengecek cuaca dan konverter kurs mata uang.`,studentStarterCode:`# Pengecek Cuaca:
cuaca = {'kota': 'Jakarta', 'suhu': 31, 'kondisi': 'Cerah Berawan'}
print(f"Cuaca di {cuaca['kota']}: {cuaca['suhu']}°C ({cuaca['kondisi']})")
`,expectedOutputDesc:`Data cuaca ditampilkan rapi.`}]},{week:10,phase:3,phaseTitle:`Terapan Nyata, Web App & Kelulusan`,title:`Tampilan Visual Modern: Mengubah Script Konsol ke Web UI`,description:`Mentransformasi program Python menjadi aplikasi web antarmuka visual yang interaktif (Streamlit/Web UI).`,assignments:[],liveSessions:[{id:`w10-live-1`,day:`jumat`,sessionNumber:19,title:`Pertemuan 19: Tampilan Visual Modern: Pengenalan Web UI`,durationMinutes:120,conceptIntro:`Komponen web: tombol, input teks, dan gambar di browser.`,guidedSteps:[],practiceChallenge:`Web app biodata diri dan konverter visual.`,studentStarterCode:`# Web App Prototype:
print("Komponen Web UI: Input, Tombol, Output Visual")
`,expectedOutputDesc:`Prototype visual berjalan.`},{id:`w10-live-2`,day:`sabtu`,sessionNumber:20,title:`Pertemuan 20: Menghubungkan Logika Python ke Dashboard Web`,durationMinutes:120,conceptIntro:`Menyambungkan form input web ke data cuaca interaktif.`,guidedSteps:[],practiceChallenge:`Web dashboard cuaca interaktif berwarna.`,studentStarterCode:`# Dashboard Cuaca Web:
`,expectedOutputDesc:`Dashboard web tampil cantik.`}]},{week:11,phase:3,phaseTitle:`Terapan Nyata, Web App & Kelulusan`,title:`Kickoff Final Capstone & Debugging Clinic`,description:`Merancang proyek mandiri pilihan siswa, eliminasi bug, dan memoles tampilan untuk Demo Day.`,assignments:[],liveSessions:[{id:`w11-live-1`,day:`jumat`,sessionNumber:21,title:`Pertemuan 21: Kickoff Final Capstone: Perancangan Proyek Mandiri`,durationMinutes:120,conceptIntro:`Menentukan ide proyek portofolio unik sesuai minat siswa.`,guidedSteps:[],practiceChallenge:`Dokumen perencanaan & kerangka awal proyek web portofolio.`,studentStarterCode:`# Proyek Akhir Mandiri:
`,expectedOutputDesc:`Kerangka proyek tuntas.`},{id:`w11-live-2`,day:`sabtu`,sessionNumber:22,title:`Pertemuan 22: Debugging Clinic & Polishing Proyek Akhir`,durationMinutes:120,conceptIntro:`Konsultasi mendalam, pemolesan UX, dan uji edge cases.`,guidedSteps:[],practiceChallenge:`Aplikasi web portofolio 90% tuntas siap presentasi.`,studentStarterCode:`# Polished Web App:
`,expectedOutputDesc:`Aplikasi stabil tanpa bug.`}]},{week:12,phase:3,phaseTitle:`Terapan Nyata, Web App & Kelulusan`,title:`Gladi Resik & DEMO DAY KELUARGA (Wisuda Kelulusan)`,description:`Uji coba menyeluruh, latihan presentasi di depan orang tua, sidang karya santai, dan seremoni kelulusan resmi.`,capstoneInfo:{id:`capstone-3`,title:`Karya 3: Live Interactive Web App Portfolio & E-Sertifikat`,description:`Aplikasi web nyata yang dideploy hidup dan dipresentasikan langsung di depan orang tua dan pengajar.`,deliverables:[`Live Web App`,`Presentasi Demo`,`E-Sertifikat Kelulusan Resmi`]},assignments:[],liveSessions:[{id:`w12-live-1`,day:`jumat`,sessionNumber:23,title:`Pertemuan 23: Gladi Resik Demo Day: Pengujian Menyeluruh & Presentasi`,durationMinutes:120,conceptIntro:`Latihan berbicara percaya diri menjelaskan alur koding di depan orang tua.`,guidedSteps:[],practiceChallenge:`Simulasi presentasi penuh dan aplikasi 100% siap.`,studentStarterCode:`# Final Ready Code:
print('Semua sistem 100% siap!')
`,expectedOutputDesc:`Semua sistem 100% siap!`},{id:`w12-live-2`,day:`sabtu`,sessionNumber:24,title:`Pertemuan 24: DEMO DAY KELUARGA & KELULUSAN RESMI (WISUDA)`,durationMinutes:120,conceptIntro:`Sidang karya santai keluarga, penyerahan e-sertifikat, dan perayaan kelulusan.`,guidedSteps:[],practiceChallenge:`Demonstrasi aplikasi web di hadapan orang tua dan pengajar.`,studentStarterCode:`# PRESENTASI DEMO DAY:
print('[SUKSES] Selamat atas kelulusan resmi!')
`,expectedOutputDesc:`[SUKSES] Selamat atas kelulusan resmi!`}]}];export{e as t};