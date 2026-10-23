# ARCHITECTURAL DECISIONS LEDGER (ADR)
## Catatan Keputusan Arsitektur & Standar Sistem
### Khusus untuk Andricha Dea Mitra (Andri) — Solo Senior Fullstack Engineer

Dokumen ini berfungsi sebagai pencatatan resmi seluruh keputusan arsitektural (*Architecture Decision Records - ADR*) untuk proyek-proyek yang dikerjakan secara solo fullstack.

---

### [ADR-001] Model Operasional Solo Fullstack Murni (Pure Solo Fullstack)
- **Status:** DITERIMA & TERKUNCI (LOCKED)
- **Konteks:**
  Proyek ini dikerjakan secara mandiri oleh Mas Andri tanpa pembagian divisi tim yang terpisah (tanpa silo Front-End vs Back-End dan tanpa perantara Product Manager).
- **Keputusan:**
  1. Seluruh tumpukan teknologi dikembangkan secara holistik end-to-end oleh Mas Andri didampingi Agent sebagai Co-Pilot.
  2. Menghilangkan seluruh beban deteksi multi-personil, alur pergantian sesi handoff antar-developer, dan birokrasi tiket sprint.
  3. Kecepatan iterasi ditingkatkan dengan tetap menjaga standar kualitas kode enterprise.
- **Konsekuensi:**
  - Kode antarmuka (frontend) dan server (backend) dapat disinkronkan secara instan dalam satu sesi tanpa menunggu koordinasi pihak lain.

---

### [ADR-002] Standar Fondasi Tumpukan Teknologi (Technology Baseline)
- **Status:** DITERIMA & TERKUNCI (LOCKED)
- **Konteks:**
  Diperlukan standar tumpukan teknologi yang konsisten, modern, scalable, dan type-safe dari antarmuka hingga database.
- **Keputusan:**
  1. **Bahasa Pemrograman:** TypeScript di seluruh lapisan (Strict Mode).
  2. **Frontend:** Next.js (App Router) / React dengan Tailwind CSS dan Shadcn UI/Radix primitives.
  3. **Backend:** NestJS Fastify / Fastify murni / Node.js / Go dengan arsitektur modular dan DTO tervalidasi.
  4. **Database:** PostgreSQL 16+ dengan Prisma ORM / Drizzle ORM, indeks performa, dan constraint relasional ketat.
  5. **Environment:** macOS Apple Silicon (`arm64`), terminal `zsh`, Caddy, dan Docker Compose.
- **Konsekuensi:**
  - Menghilangkan *context-switching* bahasa pemrograman antara frontend dan backend.
  - Memungkinkan berbagi tipe data (type-sharing) atau validasi skema (Zod) antara klien dan server.

---

### [ADR-003] Tata Kelola Eksekusi Skill-First & Gerbang Keamanan Dua Tingkat
- **Status:** DITERIMA & TERKUNCI (LOCKED)
- **Konteks:**
  Kebutuhan akan eksekusi yang sangat cepat untuk produktivitas solo developer, namun tetap aman dari kerusakan data dan penurunan kualitas kode.
- **Keputusan:**
  1. Mengadopsi direktori [.agents/skills/](file:///Users/andrichadeamitra/Documents/PROJECT/coding-class/.agents/skills/) sebagai perpustakaan standar teknis wajib sebelum penulisan kode.
  2. Menerapkan Gerbang Konfirmasi Dua Tingkat:
     - *Tingkat 1:* Eksekusi otonom cepat untuk fitur baru, styling, bugfix, dan pengujian non-destruktif.
     - *Tingkat 2:* Wajib menunggu konfirmasi kata kunci (`acc` atau `eksekusi`) dari Mas Andri sebelum melakukan penghapusan berkas, modifikasi skema destruktif, atau force push.
- **Konsekuensi:**
  - Menghilangkan friksi konfirmasi berlebihan pada task kecil, sembari menjaga sistem dari kesalahan fatal.
