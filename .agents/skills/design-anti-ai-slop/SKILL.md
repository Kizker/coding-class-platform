---
name: design-anti-ai-slop
description: Merancang dan mengimplementasikan antarmuka web (UI/UX), landing page, portal profil, dan dashboard aplikasi web dengan standar human designer kelas atas yang bebas dari pola klise AI (anti-AI slop). Gunakan skill ini setiap kali pengguna meminta pembuatan halaman web baru, merombak (redesign) komponen UI pada HTML, CSS, Tailwind CSS, Vue, React, atau Laravel, atau menginginkan tampilan yang bersih, berkarakter, fokus pada informasi utama, tanpa badge dekoratif dan tanpa emoji.
---
# design-anti-ai-slop

Panduan dan standar eksekusi untuk merancang antarmuka web berkarakter tinggi, fokus pada esensi informasi, serta bebas dari pola visual generik buatan AI (AI slop).

## When to Use

- Saat membuat halaman web baru, landing page, portal profil, atau dashboard sistem informasi.
- Saat merombak (redesign) atau merapikan komponen UI pada proyek HTML, CSS, Tailwind CSS, Vue, React, atau Laravel.
- Saat pengguna meminta tampilan yang bersih, modern, berkarakter, atau secara eksplisit meminta desain yang tidak terlihat seperti buatan AI.

## Steps

### 1. Kurasi dan Reduksi Informasi (Information Restraint)

AI cenderung menjejalkan terlalu banyak teks, sub-deskripsi, statistik palsu, dan metadata ke dalam satu layar. Batasi informasi secara ketat:

- **Tampilkan Hanya Informasi Utama:** Setiap section dan komponen hanya boleh menampilkan informasi paling esensial. Hapus sub-teks penjelas yang bertele-tele jika judul sudah cukup jelas.
- **Batasi Kepadatan Komponen:** Sebuah card maksimal hanya boleh memiliki 2 hingga 3 elemen data (misalnya: Judul dan nilai utama, atau Judul dan 1 kalimat deskripsi inti). Jangan menumpuk badge, ikon, sub-judul, deskripsi panjang, dan link di dalam satu card kecil.
- **Utamakan Ruang Kosong (Whitespace):** Biarkan ruang kosong menjadi pembatas alami antar informasi. Jangan mengisi setiap celah kosong dengan elemen dekoratif.

### 2. Larangan Mutlak Badge Tanpa Fungsi (Zero Non-Functional Badges)

Salah satu ciri paling mencolok dari desain AI generik adalah penggunaan badge berbentuk kapsul (pill) di atas setiap judul section.

- **Dilarang Membuat Eyebrow Badge di Atas Section:** Jangan pernah meletakkan elemen pill/badge dekoratif di bagian paling atas section atau tepat di atas heading (contoh yang dilarang: badge kapsul bertuliskan "Fitur Unggulan", "Tentang Kami", "Platform Terbaik").
- **Gunakan Tipografi atau Nomor untuk Konteks Section:** Jika sebuah section membutuhkan penanda kategori, gunakan teks biasa berukuran kecil dengan huruf kapital dan font monospace (tanpa background kapsul dan tanpa border bulat), atau gunakan nomor indeks sederhana seperti `01 / ARSITEKTUR`.
- **Badge Hanya untuk Fungsi Sistem Nyata:** Komponen badge hanya boleh digunakan jika memiliki fungsi fungsional atau status data nyata di dalam sistem (misalnya status transaksi `Lunas` / `Menunggu` di dalam baris tabel, atau filter aktif yang bisa diklik).

### 3. Standar Ikon dan Larangan Emoticon (Strict Icon Policy)

Penggunaan emoji atau emoticon di dalam antarmuka adalah ciri utama desain AI murahan dan harus dihindari sepenuhnya.

- **Dilarang Keras Menggunakan Emoticon/Emoji:** Jangan pernah menggunakan karakter emoji Unicode (seperti roket, kilat, centang, grafik, atau simbol warna-warni) di bagian mana pun pada UI, baik di dalam tombol, judul, card, maupun teks biasa.
- **Prioritas Sumber Ikon Wajib:**
  1. **Desain Figma via MCP:** Jika proyek terhubung dengan Figma melalui MCP, ambil aset ikon, komponen SVG, dan struktur visual langsung dari node desain Figma yang tersedia.
  2. **Library Ikon Proyek:** Gunakan library ikon yang sudah terpasang atau menjadi standar di dalam proyek (seperti Lucide, Heroicons, Phosphor Icons, atau Tabler Icons) dengan ketebalan garis (`stroke-width`) yang konsisten.
  3. **Custom Inline SVG:** Jika tidak ada library atau koneksi MCP Figma, buat kode `<svg>` inline yang bersih, presisi, menggunakan `currentColor`, dan bergaya minimalis.
- **Penggunaan Ikon yang Hemat dan Fungsional:** Jangan memasang ikon pada setiap card atau poin daftar jika judul teksnya sudah jelas. Gunakan ikon hanya jika benar-benar mempercepat pemindaian visual atau menunjukkan aksi interaktif (seperti panah navigasi, pencarian, atau aksi tabel).

### 4. Struktur Hero, Navigasi, dan Layout

Bangun ritme visual dan arsitektur navigasi yang jujur sesuai cakupan proyek:

- **Hero Section Fokus Tanpa Klise:** Hindari pola klise "Judul Tengah + Subjudul Panjang + 2 Tombol Berdampingan + Barisan 3 Statistik Palsu di Bawahnya". Gunakan layout asimetris atau fokus langsung pada satu pesan inti dan elemen fungsional nyata (seperti input pencarian langsung, pratinjau antarmuka sistem asli, atau satu tombol aksi utama yang jelas).
- **Navbar dan Footer Jujur:** Batasi menu navigasi atas hanya pada halaman yang benar-benar ada (maksimal 4 sampai 5 item tanpa tumpukan tombol ganda). Pada bagian footer, cukup tampilkan identitas singkat dan tautan penting dalam satu baris atau struktur ringkas; jangan membuat 4 kolom link dummy (`href="#"`) seperti "Karir", "Blog", "Kebijakan Privasi", atau form newsletter jika fitur tersebut tidak diminta.
- **Hindari Rata Tengah Beruntun:** Jangan menggunakan `text-center` pada lebih dari satu section berturut-turut. Gunakan rata kiri (`text-left`) sebagai standar utama untuk menciptakan garis baca yang kuat dan rapi.
- **Pecah Pola 3 Kolom Simetris:** Variasikan layout menggunakan proporsi kolom asimetris (seperti 4:8 atau 5:7), daftar vertikal dengan garis pemisah tipis (`1px solid`), atau tabel spesifikasi yang bersih.

### 5. Standar Dashboard dan Sistem Informasi

Saat merancang halaman internal, panel admin, atau sistem informasi manajemen:

- **Stat Card Tanpa Tren Palsu:** Pada kartu ringkasan metrik (stat card), tampilkan hanya label kategori dan angka utama yang tegas. Dilarang menambahkan persentase perbandingan karangan (seperti `+12.5% dari bulan lalu`) atau grafik sparkline palsu kecuali datanya memang tersedia dari sistem.
- **Tabel dan Form Presisi:** Gunakan font monospace atau `tabular-nums` dengan perataan kanan (`text-right`) untuk kolom angka, nominal, atau kode ID. Gunakan tinggi baris yang efisien dan hindari membungkus setiap sel tabel dengan elemen dekoratif yang tidak perlu.

### 6. Palet Warna, Tipografi, dan Interaksi

Pilih arah visual yang tenang, kontras, dan presisi:

- **Hindari Gradien Ungu-Biru Neon:** Dilarang menggunakan kombinasi gradien `indigo-500`, `purple-600`, dan `pink-500`, serta dilarang memasang lingkaran cahaya blur (glowing blobs) abstrak di latar belakang.
- **Gunakan Warna Dasar yang Tenang:** Gunakan permukaan off-white hangat (`#FAF8F5`, `#F4F4F0`) atau abu-abu kertas bersih (`#F8FAFC`) dengan teks utama gelap pekat (`#111111` atau `#0F172A`), serta rasio warna 85% netral, 10% permukaan sekunder, dan maksimal 5% untuk satu warna aksen tegas.
- **Hierarki Tipografi Kontras:** Padukan ukuran judul yang tegas (tracking rapat `-0.02em` hingga `-0.04em`) dengan teks isi yang nyaman dibaca (`max-w-prose`) serta font monospace untuk label teknis, penomoran, atau metadata.
- **Copywriting Lugas dan Interaksi Halus:** Hindari kata hiperbolis AI ("Solusi Revolusioner", "Integrasi Tanpa Batas", "Tingkatkan Produktivitas Anda"). Untuk efek interaktif, ganti `hover:scale-105` dengan transisi warna border (`150ms`), perubahan kontras latar yang halus, atau pergeseran ikon panah sebesar `2px`.

### 7. Standar Empty State, Loading, dan Media (Media & State Restraint)

Tangani ketiadaan data atau aset visual dengan pendekatan tipografi dan struktur, bukan dekorasi palsu:

- **Dilarang Memasang Gambar Stok Acak:** Jika proyek atau pengguna tidak menyediakan aset foto asli, jangan pernah memasang URL gambar stok acak dari Unsplash (seperti foto orang berjabat tangan di kantor atau gedung kaca). Rancang section tersebut murni mengandalkan kekuatan tipografi, garis batas tipis (`1px solid`), ruang kosong, atau pratinjau komponen UI struktural.
- **Empty State Minimalis dan Lugas:** Saat tabel, daftar, atau halaman belum memiliki data, jangan menampilkan ilustrasi vektor kartun generik atau ikon raksasa yang memakan tempat. Cukup tampilkan kotak berbatas halus (`border-dashed` atau `border-solid` tipis) dengan 1 kalimat status yang jelas (contoh: `Belum ada dokumen arsip yang ditambahkan.`) dan 1 tombol aksi langsung jika pengguna dapat menambah data.
- **Skeleton dan Loading Bersih:** Hindari animasi spinner berputar warna-warni di tengah layar untuk setiap komponen kecil. Gunakan indikator perubahan status teks yang tenang atau blok skeleton sederhana dengan warna selaras permukaan dasar.

### 8. Standar Form, Modal, Drawer, dan Responsivitas Mobile

Jaga ketertiban tata letak pada elemen input interaktif dan layar berukuran kecil:

- **Arsitektur Form dan Input Presisi:**
  - Jangan merentangkan input teks tunggal (`w-full`) melintasi seluruh lebar layar desktop yang besar; batasi kontainer form atau grup input pada lebar baca yang proporsional (`max-w-xl` atau `max-w-2xl`) atau bagi menjadi layout 2 kolom asimetris (`4:8` — kolom kiri untuk judul/konteks bagian form, kolom kanan untuk kumpulan input).
  - Gunakan label di atas input (`text-xs` atau `text-sm font-medium text-neutral-800`) tanpa mengulang kata yang sama pada atribut `placeholder`. Gunakan `placeholder` hanya untuk contoh format data spesifik (contoh: `Contoh: HK.02.01/2026`).
  - Tampilkan pesan validasi error secara lugas dengan teks merah berukuran kecil (`text-xs text-red-600`) tepat di bawah input yang bermasalah dan perubahan border `border-red-600`, tanpa menambahkan boks alert merah raksasa di bagian atas form.
- **Standar Modal, Slide-Over Drawer, dan Toast:**
  - Hindari modal dialog tengah yang dipenuhi ikon peringatan bulat besar di bagian atas. Gunakan header modal rata kiri yang bersih dengan pemisah `border-b` tipis.
  - Untuk form tambah/edit data yang memiliki lebih dari 4 field atau detail informasi kompleks, prioritaskan penggunaan **Slide-Over Drawer** (panel samping kanan) dibandingkan modal tengah agar konteks tabel utama tidak hilang.
- **Disiplin Responsivitas Layar Kecil (Mobile Restraint):**
  - Pada tampilan mobile, tabel data wajib dibungkus dengan kontainer `overflow-x-auto` agar kolom angka dan struktur baris tetap utuh dan dapat digeser secara horizontal, bukan diubah menjadi tumpukan kartu panjang yang membingungkan.
  - Kurangi padding vertikal section secara proporsional pada layar kecil (`py-10 md:py-20`) dan hindari ukuran teks judul yang memecah satu kata menjadi beberapa baris.

### 9. Protokol Design Token dan Integrasi MCP Figma

Pastikan setiap baris kode yang ditulis menyatu dengan sistem desain proyek yang sedang berjalan:

- **Baca Design Token Proyek Terlebih Dahulu:** Sebelum menulis kelas CSS atau Tailwind baru, periksa konfigurasi yang sudah ada di dalam proyek (`tailwind.config.js`, variabel CSS di `app.css`, atau komponen induk) agar palet warna, jenis font, dan skala spasi tetap 100% konsisten.
- **Urutan Ekstraksi Node MCP Figma:**
  1. **Inspeksi Frame & Auto Layout:** Ambil properti `layoutMode` (`HORIZONTAL` -> `flex-row`, `VERTICAL` -> `flex-col`), nilai pasti `itemSpacing` (petakan ke `gap-*`), serta nilai `padding`. Jangan mengganti spasi presisi dari Figma dengan tebakan acak.
  2. **Ekstraksi Tipografi & Warna:** Baca `fontFamily`, `fontWeight`, `fontSize`, `lineHeight`, `letterSpacing`, serta nilai hex dari `fills` dan `strokes`. Cocokkan dengan variabel warna proyek.
  3. **Ekstraksi Aset Vektor (SVG):** Ambil node ikon langsung dari Figma MCP sebagai SVG bersih, pertahankan `viewBox` asli, dan gunakan `currentColor` pada `stroke`/`fill` agar mengikuti warna teks.
  4. **Jaga Kebersihan DOM:** Jangan membungkus setiap layer grup Figma ke dalam `<div>` berlapis-lapis jika satu kontainer `flex` atau `grid` sudah cukup, dan jangan menambah elemen dekoratif di luar frame Figma.

### 10. Acuan Kode Standar (Anti-Slop Code Patterns)

Gunakan struktur kelas berikut sebagai acuan standar saat menulis kode komponen:

- **Section Header (Tanpa Eyebrow Pill Badge):**
  ```html
  <div class="border-b border-neutral-200 pb-5 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
    <div>
      <p class="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">01 / Manajemen Arsip</p>
      <h2 class="text-2xl font-semibold tracking-tight text-neutral-900">Pencarian dan Klasifikasi Dokumen</h2>
    </div>
    <p class="text-sm text-neutral-600 max-w-md">Telusuri berkas berdasarkan kode klasifikasi, unit kerja, atau periode retensi.</p>
  </div>
  ```
