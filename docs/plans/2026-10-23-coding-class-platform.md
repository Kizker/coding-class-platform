# Platform Edukasi Koding Les Private 1-on-1 (Python Track) — Implementation Plan

> **For Claude / Runner:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Membangun platform terpadu edukasi koding les private 1-on-1 (Python Track 12 Minggu) dengan 3 peran (Siswa, Pengajar/Tutor, Orang Tua) yang dilengkapi Split-Screen Monaco + Pyodide in-browser sandbox, Tutor Teaching Console dengan 1-click push code & WhatsApp report generator, serta Parent Monitoring Portal read-only mobile-first.

**Architecture:** Next.js (App Router) modular fullstack monorepo dengan Strict TypeScript, Tailwind CSS, Shadcn/Radix UI, Prisma ORM dengan PostgreSQL, Pyodide WebAssembly client-side execution sandbox dengan Friendly Error Translator, dan WebSockets/SSE untuk live sync pengajar-siswa.

**Tech Stack:** Next.js 15/14 (App Router), React 19/18, TypeScript (Strict), Tailwind CSS, Shadcn UI / Radix Primitives, Lucide React, Monaco Editor (`@monaco-editor/react`), Pyodide (WASM), PostgreSQL 16+, Prisma ORM, Zod, Vitest.

---

## Technical Baseline & Data Contract Matrix

### Port Law (AGENTS.md Compliance)
- **Web Portal Utama (Next.js App Router):** `http://localhost:3000`
- **PostgreSQL Database Engine:** `localhost:5432`
- **API Endpoints:** `/api/v1/*` (Next.js Route Handlers dengan Standard Response Envelope)

### Standard Response Envelope
```typescript
interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
  errors?: Array<{ field: string; message: string }>;
}
```

---

## Task Breakdown

### Task 1: Inisialisasi Proyek Next.js & Fondasi Design System
**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/lib/utils.ts`

**Step 1: Inisialisasi package.json dengan dependensi modern**
- Next.js 15+, React 19, Lucide React, class-variance-authority, clsx, tailwind-merge, @monaco-editor/react, zod, canvas-confetti.

**Step 2: Konfigurasi Tailwind CSS & Theme Tokens (Anti-UI-Slop)**
- Setup tipografi modern Plus Jakarta Sans / Inter.
- Palet warna semantik: Slate/Zinc slate dark mode & crisp light mode, Indigo/Violet accent untuk koding, Emerald untuk Passed/Streak, Amber untuk warning/hint, Rose untuk friendly error.

**Step 3: Setup Root Layout & Utilities (`cn`)**
- Implementasikan `cn` helper dan root layout dengan font Google.

**Step 4: Verifikasi build dev**
- Run: `pnpm run build` atau `npm run build`
- Expected: Build sukses tanpa type error.

**Step 5: Commit**
- `git add . && git commit -m "chore: initialize nextjs app with tailwind and design tokens"`

---

### Task 2: Skema Basis Data PostgreSQL & Prisma ORM
**Files:**
- Create: `prisma/schema.prisma`
- Create: `src/lib/prisma.ts`
- Create: `docker-compose.yml`

**Step 1: Setup docker-compose.yml untuk PostgreSQL**
- Service PostgreSQL 16 pada port `5432` dengan volume terisolasi.

**Step 2: Definisikan skema Prisma sesuai PRD (Zero Speculative Fields Law)**
- Model `User` (roles: `STUDENT`, `TUTOR`, `PARENT`).
- Model `Course` & `Module` (12 Minggu, 24 Sesi Live Jumat-Sabtu).
- Model `Assignment` (PR Senin-Kamis: RECALL, CODE_READ, DEBUGGING, PRE_READ).
- Model `Submission` (student code, status: PASSED, REVIEW, output, score, hints_used).
- Model `LessonAttendance` (sesi tatap muka 2 jam Jumat & Sabtu).
- Model `WeeklyReport` (catatan kualitatif pengajar, rekap PR, status WhatsApp generated).
- Model `CapstoneProject` (Capstone 1 M4, Capstone 2 M8, Final Web App M12).

**Step 3: Generate Prisma Client & Migrasi**
- Run: `npx prisma generate`
- Expected: Prisma client ter-generate dengan types murni.

**Step 4: Commit**
- `git add prisma/ docker-compose.yml src/lib/prisma.ts && git commit -m "feat(db): setup prisma schema and postgresql configuration"`

---

### Task 3: Seeder Kurikulum 12 Minggu & 24 Sesi Live Tatap Muka
**Files:**
- Create: `prisma/seed.ts`
- Create: `src/data/curriculum.ts`

**Step 1: Ekstraksi kurikulum PRD ke data terstruktur**
- 12 Minggu kurikulum lengkap:
  - Fase 1: M1-M4 (Print, Variabel, Aritmatika, If-Else, Loops, List, Fungsi, Capstone 1 CLI).
  - Fase 2: M5-M8 (Dictionary, List of Dicts, Try-Except, File I/O, OOP Class/Object, Capstone 2 CSV).
  - Fase 3: M9-M12 (API & JSON, Cuaca/Kurs, Streamlit/Web UI, Final Capstone & Demo Day).
- Masukkan starter code, markdown teori, soal praktik, dan assertion test cases untuk PR Senin-Kamis & Sesi Jumat-Sabtu.

**Step 2: Tulis script seed database**
- Mengisi data default user (1 Siswa: "Andi Pratama", 1 Pengajar: "Kak Tutor", 1 Orang Tua: "Pak Bambang").

**Step 3: Jalankan seeder**
- Run: `npx prisma db seed`
- Expected: 12 Modules, 24 Live Sessions, dan 48 Daily Assignments terisi lengkap.

**Step 4: Commit**
- `git add prisma/seed.ts src/data/curriculum.ts && git commit -m "feat(curriculum): seed 12-week python track and 24 live sessions"`

---

### Task 4: In-Browser Python Sandbox (Pyodide WebAssembly Engine)
**Files:**
- Create: `src/lib/pyodide/usePyodide.ts`
- Create: `src/lib/pyodide/errorTranslator.ts`
- Create: `src/lib/pyodide/autoGrader.ts`
- Test: `tests/pyodide/errorTranslator.test.ts`

**Step 1: Buat Friendly Error Translator**
- Menerjemahkan error teknis Python yang menakutkan menjadi bahasa Indonesia ramah pemula:
  - `SyntaxError: unexpected EOF while parsing` -> *"Ups! Sepertinya ada tanda kurung atau kutip yang belum ditutup di akhir kodemu."*
  - `NameError: name 'x' is not defined` -> *"Variabel 'x' belum dibuat atau mungkin salah ketik. Coba periksa lagi ya!"*
  - `IndentationError` -> *"Spasi atau tab menjorok di baris ini belum pas. Di Python, kerapian spasi itu penting!"*
  - `ZeroDivisionError` -> *"Komputer bingung saat diminta membagi angka dengan 0. Pastikan pembaginya bukan nol ya!"*

**Step 2: Unit test Friendly Error Translator**
- Run: `npx vitest run tests/pyodide/errorTranslator.test.ts`
- Expected: PASS

**Step 3: Implementasi Hook `usePyodide`**
- Load Pyodide dari CDN via script tag dinamis / web worker.
- Tangkap `stdout` dan `stderr`.
- Eksekusi kode dengan timeout guard (mencegah infinite loop browser freeze).

**Step 4: Implementasi `autoGrader`**
- Menjalankan kode siswa lalu menjalankan assertion test (misal variabel `luas == 50`).

**Step 5: Commit**
- `git add src/lib/pyodide/ tests/pyodide/ && git commit -m "feat(sandbox): implement pyodide wasm runner with friendly error translator"`

---

### Task 5: Komponen Monaco Code Editor & Draft Autosave
**Files:**
- Create: `src/components/editor/CodeEditor.tsx`
- Create: `src/components/editor/EditorToolbar.tsx`
- Create: `src/components/editor/ConsoleOutput.tsx`
- Create: `src/hooks/useAutoSaveDraft.ts`

**Step 1: Implementasi useAutoSaveDraft**
- Menyimpan draft ketikan siswa setiap 3 detik ke `localStorage` berdasarkan key `[week]-[day]-[userId]`.

**Step 2: Komponen CodeEditor dengan Monaco**
- Konfigurasi tema gelap modern (vs-dark / one-dark).
- Font Fira Code / JetBrains Mono dengan ligatures.
- Minibar kontrol (Reset Code, Format Code, Font Size).

**Step 3: Komponen ConsoleOutput**
- Tampilan terminal retro-modern dengan indikator status: Running (spinner), Success (hijau cerah), Error (Friendly Card + detail teknis collapsible).

**Step 4: Commit**
- `git add src/components/editor/ src/hooks/useAutoSaveDraft.ts && git commit -m "feat(ui): add monaco editor and auto-save draft hook"`

---

### Task 6: Student Split-Screen Learning Studio (`/student/learn/[week]/[day]`)
**Files:**
- Create: `src/app/student/learn/[week]/[day]/page.tsx`
- Create: `src/components/student/TheoryViewer.tsx`
- Create: `src/components/student/HintAccordion.tsx`
- Create: `src/components/student/CelebrationModal.tsx`

**Step 1: Layout Split-Screen Responsif**
- Panel Kiri: Tab 1 (Materi Markdown + Code Snippets), Tab 2 (Video/Animasi konsep jika ada), Tab 3 (Petunjuk bertahap: Hint 1 -> Hint 2 -> Hint 3).
- Panel Kanan: Monaco Editor atas, Toolbar aksi (Jalankan Kode, Kumpulkan Tugas), dan Terminal Pyodide bawah.

**Step 2: Alur Auto-Grading & Perayaan Gamifikasi**
- Klik "Jalankan Kode" -> Pyodide mengeksekusi -> tampilkan output di terminal.
- Klik "Kumpulkan Tugas" -> Jalankan test assertion -> jika lolos, trigger `canvas-confetti`, tambah XP (+20 XP), simpan submission ke database, dan perbarui streak!

**Step 3: Commit**
- `git add src/app/student/learn/ src/components/student/ && git commit -m "feat(student): implement split-screen learning studio with auto-grader"`

---

### Task 7: Student Dashboard & Assignment Hub (`/student/*`)
**Files:**
- Create: `src/app/student/dashboard/page.tsx`
- Create: `src/app/student/assignments/page.tsx`
- Create: `src/app/student/profile/page.tsx`
- Create: `src/app/student/capstone/[id]/page.tsx`
- Create: `src/components/student/RoadmapTracker.tsx`
- Create: `src/components/student/StreakBadge.tsx`

**Step 1: Student Dashboard (`/student/dashboard`)**
- Header sapaan ramah siswa, kartu "Tugas PR Hari Ini" (1-klik langsung masuk studio).
- Roadmap 12 Minggu visual dengan status (Tuntas, Sedang Berjalan, Terkunci).
- Widget Streak harian (api membara) dan total XP yang dikumpulkan.

**Step 2: Daftar Tugas PR Harian (`/student/assignments`)**
- Filter per pekan dan tipe PR (Senin: Recall, Selasa: Code Reading, Rabu: Debugging, Kamis: Pre-read).
- Status badge (Passed / Needs Review / Belum Dikerjakan).

**Step 3: Capstone Workspace & Profile (`/student/capstone/[id]`, `/student/profile`)**
- Ruang pengerjaan Capstone 1, 2, 3 dengan deskripsi proyek, spesifikasi fitur, dan submission link.
- Halaman profil siswa dengan galeri lencana (Badges) dan E-Sertifikat Kelulusan.

**Step 4: Commit**
- `git add src/app/student/ src/components/student/ && git commit -m "feat(student): add student dashboard, assignment hub, and profile"`

---

### Task 8: Tutor Teaching Studio & Live Synchronization (`/tutor/studio/[week]/[day]`)
**Files:**
- Create: `src/app/tutor/studio/[week]/[day]/page.tsx`
- Create: `src/components/tutor/TeachingSlideGuide.tsx`
- Create: `src/components/tutor/StudentLiveMonitor.tsx`
- Create: `src/app/api/v1/sync/push-code/route.ts`
- Create: `src/app/api/v1/sync/live-keystrokes/route.ts`

**Step 1: Teaching Slide Guide (Panel Kiri)**
- Alur 4 langkah mengajar terpandu sesuai PRD:
  - 1. Konsep (analogi dunia nyata)
  - 2. Kode Contoh Peraga
  - 3. Latihan Praktik Siswa
  - 4. Refleksi & Catatan Ortu
- Tombol "Beri Bintang Apresiasi ⭐" dan "Tandai Materi Selesai".

**Step 2: Kontrol Push Kode & Live Monitor (Panel Kanan)**
- Editor Kode Peraga Pengajar dengan tombol instan **"🚀 PUSH KODE KE EDITOR SISWA"**.
- Menembak endpoint `/api/v1/sync/push-code` yang langsung memperbarui editor di layar siswa secara real-time.
- Live View Editor Siswa: Pengajar dapat melihat baris apa yang sedang diketik siswa dan hasil terminal siswa tanpa harus berbagi layar zoom.

**Step 3: Commit**
- `git add src/app/tutor/studio/ src/components/tutor/ src/app/api/v1/sync/ && git commit -m "feat(tutor): implement tutor teaching studio with live push-code"`

---

### Task 9: Meja Penilaian & WhatsApp Report Generator (`/tutor/grading`, `/tutor/reports`)
**Files:**
- Create: `src/app/tutor/dashboard/page.tsx`
- Create: `src/app/tutor/grading/page.tsx`
- Create: `src/app/tutor/reports/page.tsx`
- Create: `src/lib/reports/whatsappFormatter.ts`
- Test: `tests/reports/whatsappFormatter.test.ts`

**Step 1: Tutor Command Center Dashboard (`/tutor/dashboard`)**
- Widget countdown sesi 2 jam berikutnya (Jumat/Sabtu).
- Notifikasi alert PR siswa yang baru dikumpulkan / perlu review.
- Ringkasan kepatuhan streak siswa.

**Step 2: Meja Penilaian (`/tutor/grading`)**
- Daftar antrean koreksi PR siswa dengan diff code viewer.
- Input skor (0-100) dan kolom masukan catatan kualitatif pengajar per pekan.

**Step 3: 1-Click WhatsApp Report Generator (`/tutor/reports`)**
- Generator template pesan WhatsApp otomatis:
  ```text
  *LAPORAN PERKEMBANGAN BELAJAR KODING (PEKAN KE-X)*
  Halo Ayah/Bunda Andi Pratama, berikut adalah rekap belajar pekan ini:
  
  ✅ *Konsistensi PR Harian:* 4/4 Selesai (Streak: 5 Hari)
  🎯 *Materi Sesi 2 Jam:* Logika Percabangan (if-elif-else)
  🌟 *Catatan Pengajar:* Andi sangat cepat memahami nalar if-else...
  
  🔗 Pantau progres lengkap & karya anak di Portal Orang Tua:
  https://leskoding.id/parent/overview
  ```
- Tombol 1-klik "Salin Pesan" dan tombol "Buka WhatsApp Langsung (`https://wa.me/...?text=...`)".

**Step 4: Commit**
- `git add src/app/tutor/ src/lib/reports/ tests/reports/ && git commit -m "feat(tutor): implement grading desk and 1-click whatsapp report generator"`

---

### Task 10: Parent Monitoring Portal (Mobile-First Read-Only) (`/parent/*`)
**Files:**
- Create: `src/app/parent/overview/page.tsx`
- Create: `src/app/parent/reports/page.tsx`
- Create: `src/app/parent/showcase/page.tsx`
- Create: `src/app/parent/schedule/page.tsx`
- Create: `src/components/parent/ParentBottomNav.tsx`
- Create: `src/components/parent/ParentProgressBar.tsx`

**Step 1: Mobile-First Bottom Navigation & Layout**
- Navigasi bawah ramah jempol (Overview, Rapor, Karya Anak, Jadwal).
- Desain bersih tanpa menu koding/editor (hak akses murni memantau / read-only).

**Step 2: Parent Overview (`/parent/overview`)**
- Progress bar 12 minggu persentase penguasaan materi.
- Kalender kepatuhan PR harian Senin-Kamis dengan tanda centang hijau.
- Highlight catatan kualitatif terbaru dari Kak Tutor.

**Step 3: Riwayat Rapor Mingguan (`/parent/reports`)**
- Arsip laporan mingguan dari Pekan 1 s.d Pekan berjalan.

**Step 4: Showcase Karya Anak (`/parent/showcase`)**
- Dokumentasi hasil karya program anak (Capstone 1 Game CLI, Capstone 2 Buku Kontak, Capstone 3 Web App).
- Status kelulusan, deskripsi logika yang dipelajari anak, dan screenshot/preview tampilan program.

**Step 5: Jadwal & Kehadiran (`/parent/schedule`)**
- Jadwal sesi tatap muka 2 jam Jumat-Sabtu dan histori absensi kehadiran anak.

**Step 6: Commit**
- `git add src/app/parent/ src/components/parent/ && git commit -m "feat(parent): build mobile-first read-only parent monitoring portal"`

---

### Task 11: Portal Switcher & Autentikasi Peran Sederhana
**Files:**
- Create: `src/app/page.tsx`
- Create: `src/components/auth/RoleSwitcher.tsx`
- Create: `src/lib/auth/sessionContext.tsx`

**Step 1: Halaman Login & Role Switcher Landing Page (`/`)**
- Landing page elegan dengan 3 kartu login peran cepat:
  1. **Masuk sebagai Siswa:** Langsung mengarah ke `/student/dashboard`.
  2. **Masuk sebagai Pengajar:** Langsung mengarah ke `/tutor/dashboard`.
  3. **Masuk sebagai Orang Tua:** Langsung mengarah ke `/parent/overview`.

**Step 2: State context untuk simulasi pergantian sesi instan**
- Memungkinkan Mas Andri mencoba ketiga peran secara seamless dalam satu browser saat demonstrasi.

**Step 3: Commit**
- `git add src/app/page.tsx src/components/auth/ src/lib/auth/ && git commit -m "feat(auth): add role selector landing page and session context"`

---

### Task 12: Pengujian Menyeluruh (End-to-End Verification)
**Files:**
- Create: `tests/e2e/workflow.test.ts`

**Step 1: Tulis uji alur integrasi 3 peran**
- Siswa mengerjakan PR -> Auto-grader validasi -> Submission tercatat.
- Pengajar membuka studio -> Push kode contoh -> Input evaluasi di meja penilaian -> Generate laporan WhatsApp.
- Orang tua membuka portal -> Memverifikasi progress bar bertambah, PR tercentang hijau, dan catatan muncul.

**Step 2: Jalankan test suite**
- Run: `npx vitest run`
- Expected: Seluruh unit test dan skenario integrasi lulus 100%.

**Step 3: Commit**
- `git add tests/ && git commit -m "test: comprehensive workflow verification across student, tutor, and parent roles"`

---

## Execution Handoff

Plan complete and saved to `docs/plans/2026-10-23-coding-class-platform.md`. Two execution options:

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration
**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

**Which approach?**
