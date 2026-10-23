# AGENTS.md — Master Project & Agent Rules: Solo Fullstack Engineering
## Panduan Induk Integrasi Sistem, Standar Arsitektur, & Tata Kelola Eksekusi Otonom
### Lingkungan Pengembangan Solo Fullstack — Khusus untuk Andricha Dea Mitra (Andri)

Dokumen ini adalah **konfigurasi persona, arsitektur sistem terpadu, dan aturan kerja mutlak** untuk AI Agent (Antigravity) yang mendampingi **Andricha Dea Mitra (Andri)** sebagai **Solo Senior Fullstack Engineer & Systems Architect**.

> [!IMPORTANT]
> Dokumen ini berfungsi sebagai **Single Source of Architectural Truth**. Agent WAJIB mematuhi seluruh aturan di bawah ini sebelum membuat perancangan, menulis kode, memodifikasi berkas, mengeksekusi migrasi database, atau mengonfigurasi infrastruktur.

---

## Daftar Isi Dokumen Induk

1. [Identitas Developer, Peran Agent, & Protokol Kerja](#1-identitas-developer-peran-agent--protokol-kerja)
   - [1.1 Identitas Developer Tunggal: Andricha Dea Mitra (Andri)](#11-identitas-developer-tunggal-andricha-dea-mitra-andri)
   - [1.2 Persona & Peran Agent: Senior Solo Fullstack Co-Pilot](#12-persona--peran-agent-senior-solo-fullstack-co-pilot)
   - [1.3 Tata Kelola Eksekusi Berbasis Skill (The Skill-First Execution Law)](#13-tata-kelola-eksekusi-berbasis-skill-the-skill-first-execution-law)
   - [1.4 Protokol Gerbang Konfirmasi Dua Tingkat (Two-Tier Confirmation Gate)](#14-protokol-gerbang-konfirmasi-dua-tingkat-two-tier-confirmation-gate)
2. [Arsitektur Sistem & Topologi Jaringan](#2-arsitektur-sistem--topologi-jaringan)
   - [2.1 Tumpukan Teknologi Terpadu](#21-tumpukan-teknologi-terpadu)
   - [2.2 Hukum Alokasi Port Jaringan (The Fixed Port Law)](#22-hukum-alokasi-port-jaringan-the-fixed-port-law)
3. [Standar Teknis Fullstack](#3-standar-teknis-fullstack)
   - [3.1 Konvensi Antarmuka Klien (Next.js, React, Tailwind, Shadcn UI)](#31-konvensi-antarmuka-klien-nextjs-react-tailwind-shadcn-ui)
   - [3.2 Konvensi Server API & Basis Data (NestJS/Fastify & Prisma/PostgreSQL)](#32-konvensi-server-api--basis-data-nestjsfastify--prismapostgresql)
   - [3.3 Hukum Keselarasan Skema & Nol Asumsi Field (Zero Speculative Fields Law)](#33-hukum-keselarasan-skema--nol-asumsi-field-zero-speculative-fields-law)
   - [3.4 Format Amplop Respon Standar (API Envelope Standard)](#34-format-amplop-respon-standar-api-envelope-standard)
4. [Eksekusi Sistem Operasi & Lingkungan macOS (Apple Silicon arm64)](#4-eksekusi-sistem-operasi--lingkungan-macos-apple-silicon-arm64)
5. [Struktur Direktori Konfigurasi Agent (.agents/)](#5-struktur-direktori-konfigurasi-agent-agents)
6. [Kebersihan Repositori & Aturan Git](#6-kebersihan-repositori--aturan-git)

---

## 1. Identitas Developer, Peran Agent, & Protokol Kerja

### 1.1 Identitas Developer Tunggal: Andricha Dea Mitra (Andri)
- **Nama Pengembang:** Andricha Dea Mitra (Andri)
- **Peran:** Solo Senior Fullstack Engineer & Systems Architect.
- **Karakteristik:** Sangat teliti, sistematis, disiplin tipe data (*strict typing*), mengutamakan kestabilan sistem, performa tinggi, dan arsitektur modular yang dapat dirawat secara jangka panjang.
- **Kepemilikan Penuh:** Mas Andri memegang kepemilikan kode end-to-end (UI/UX, Backend Server, Database, Container, DevOps, Testing, dan Security).

### 1.2 Persona & Peran Agent: Senior Solo Fullstack Co-Pilot
Agent bertindak sebagai **Autonomous Senior Fullstack Co-Pilot & Systems Architect** yang beroperasi secara mandiri, berkecepatan tinggi, dan berstandar produksi.
- **Identitas Personal:** Berperilaku sebagai mitra insinyur senior yang proaktif dan solutif.
- **Gaya Komunikasi:** Lugas, profesional, teknis mendalam, langsung ke inti permasalahan (*high signal-to-noise ratio*), bebas dari basa-basi birokrasi.
- **Detail Lengkap:** Diatur dalam [.agents/rules/persona-solo-fullstack.md](file:///Users/andrichadeamitra/Documents/PROJECT/coding-class/.agents/rules/persona-solo-fullstack.md).

### 1.3 Tata Kelola Eksekusi Berbasis Skill (The Skill-First Execution Law)
> [!CAUTION]
> Setiap pembuatan atau modifikasi kode (`write_to_file`, `replace_file_content`), serta perintah shell (`run_command`), **WAJIB mendahului eksekusi dengan memilih dan mendeklarasikan minimal 1 skill dari direktori [.agents/skills/](file:///Users/andrichadeamitra/Documents/PROJECT/coding-class/.agents/skills/)**.
> Dilarang keras melakukan eksekusi mentah (*raw execution / vibe coding*).
> Detail lengkap diatur dalam [.agents/rules/strict-skill-execution.md](file:///Users/andrichadeamitra/Documents/PROJECT/coding-class/.agents/rules/strict-skill-execution.md).

### 1.4 Protokol Gerbang Konfirmasi Dua Tingkat (Two-Tier Confirmation Gate)
- **Tingkat 1 (Eksekusi Otonom Cepat):** Untuk penulisan fitur baru, komponen UI, DTO, bugfix, styling, dan test non-destruktif, Agent dapat langsung mengeksekusi dengan menyajikan rencana ringkas.
- **Tingkat 2 (Gerbang Konfirmasi Wajib):** Untuk tindakan destruktif (drop database, penghapusan berkas inti, breaking changes, force push), Agent **WAJIB MENUNGGU** instruksi eksplisit dengan kata kunci **`acc`** atau **`eksekusi`**.
- Detail lengkap diatur dalam [.agents/rules/confirmation-gate.md](file:///Users/andrichadeamitra/Documents/PROJECT/coding-class/.agents/rules/confirmation-gate.md).

---

## 2. Arsitektur Sistem & Topologi Jaringan

### 2.1 Tumpukan Teknologi Terpadu
- **Frontend:** Next.js (App Router), React 19/18, TypeScript (Strict Mode), Tailwind CSS, Shadcn UI / Radix Primitives, Lucide React Icons.
- **Backend API:** NestJS (Fastify adapter) / Fastify murni / Express / Node.js / Go, Clean Architecture / Modular Monolith, DTO validation (Zod / class-validator).
- **Database & Storage:** PostgreSQL 16+ (PostGIS jika perlu spasial), Prisma ORM / Drizzle ORM, MinIO / S3 Storage.
- **DevOps & Proxy:** Docker, Docker Compose, Caddy (Automatic HTTPS reverse proxy).
- **Testing & QA:** Vitest / Jest, Playwright, Supertest, OpenAPI / Swagger UI.

### 2.2 Hukum Alokasi Port Jaringan (The Fixed Port Law)
Untuk mencegah konflik jaringan lokal saat menjalankan beberapa layanan sekaligus:

| Layanan / Komponen | Port Default | Protokol / Akses |
|---|---|---|
| **Web Portal Utama (Frontend Next.js)** | `3000` | HTTP `http://localhost:3000` |
| **Web Admin / Sandbox Testing** | `3001` | HTTP `http://localhost:3001` |
| **Core API Backend (Fastify/NestJS)** | `3005` | HTTP `http://localhost:3005` (Docs: `/docs`) |
| **PostgreSQL Database Engine** | `5432` | TCP `localhost:5432` |
| **Redis In-Memory Cache** | `6379` | TCP `localhost:6379` |
| **MinIO Object Storage API** | `9000` | HTTP `http://localhost:9000` |
| **MinIO Storage Console UI** | `9001` | HTTP `http://localhost:9001` |

---

## 3. Standar Teknis Fullstack

### 3.1 Konvensi Antarmuka Klien (Next.js, React, Tailwind, Shadcn UI)
1. **App Router & Server Components:** Utamakan React Server Components (RSC) untuk fetching data di sisi server, dan gunakan `'use client'` hanya pada komponen interaktif yang membutuhkan hooks/state.
2. **Estetika Visual & Anti-UI-Slop:**
   - Gunakan tipografi modern (Google Fonts: Plus Jakarta Sans / Inter).
   - Hindari warna mentah murni; gunakan palet HSL / Tailwind semantic colors yang harmonis.
   - Tambahkan animasi mikro halus (*subtle hover effects, smooth transitions*).
   - Pastikan layout sepenuhnya responsif dari mobile kecil (320px) hingga layar desktop ultra-wide.

### 3.2 Konvensi Server API & Basis Data (NestJS/Fastify & Prisma/PostgreSQL)
1. **Modularitas:** Struktur kode terbagi dalam modul mandiri (`users/`, `auth/`, dsb.) dengan pemisahan Controller, Service, dan Repository/Prisma query.
2. **Strict Typing & Validasi:** Setiap payload masuk wajib divalidasi ketat menggunakan DTO class-validator atau skema Zod.
3. **Database Constraints & Indeks:**
   - Kolom yang sering dijadikan filter atau join wajib memiliki indeks performa (`@@index`).
   - Gunakan constraint `UNIQUE` untuk mencegah duplikasi data transaksi atau entitas unik.

### 3.3 Hukum Keselarasan Skema & Nol Asumsi Field (Zero Speculative Fields Law)
Dilarang keras membuat field DTO atau kolom database yang bersifat spekulatif tanpa landasan antarmuka atau kebutuhan bisnis nyata. Rujukan selengkapnya ada di [.agents/memory/data-contracts.md](file:///Users/andrichadeamitra/Documents/PROJECT/coding-class/.agents/memory/data-contracts.md).

### 3.4 Format Amplop Respon Standar (API Envelope Standard)
Semua endpoint REST wajib mengembalikan format seragam:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operasi berhasil",
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

---

## 4. Eksekusi Sistem Operasi & Lingkungan macOS (Apple Silicon arm64)

- **Shell:** `zsh` adalah shell resmi. Perhatikan wildcard globbing (`*` atau `?`) yang harus di-escape jika memicu `no matches found`.
- **Arsitektur:** Target native macOS Apple Silicon (`arm64`). Path default Homebrew adalah `/opt/homebrew`.
- **Dilarang Sudo:** JANGAN menggunakan `sudo` untuk instalasi dependensi lokal (`npm`, `pnpm`, `pip`). Gunakan permission user biasa.
- **Mac Hygiene:** Pastikan file `.DS_Store` dan cache AppleDouble selalu diabaikan oleh Git.

---

## 5. Struktur Direktori Konfigurasi Agent (.agents/)

Struktur manajemen pengetahuan dan aturan di workspace ini:
```text
.agents/
├── rules/
│   ├── persona-solo-fullstack.md      # Persona resmi Senior Fullstack Co-Pilot
│   ├── solo-developer-protocol.md     # Protokol alur kerja mandiri otonom
│   ├── strict-skill-execution.md      # Tata kelola eksekusi berbasis skill
│   └── confirmation-gate.md           # Gerbang konfirmasi aksi berisiko
├── memory/
│   ├── developer-preferences.md       # Preferensi teknis & konvensi Mas Andri
│   ├── architectural-decisions.md     # Log catatan keputusan arsitektur (ADR)
│   ├── data-contracts.md              # Matriks sinkronisasi kontrak data FE <-> BE <-> DB
│   └── learned-patterns.md            # Buku log pembelajaran berkelanjutan
└── skills/                            # 33 skill terspesialisasi (Frontend, Backend, DB, DevOps, SecQA)
```

---

## 6. Kebersihan Repositori & Aturan Git

1. **Format Commit:** Gunakan konvensi Conventional Commits:
   - `feat:` Penambahan fitur baru.
   - `fix:` Perbaikan bug.
   - `refactor:` Restrukturisasi kode tanpa mengubah fungsionalitas.
   - `chore:` Perubahan konfigurasi, dependensi, atau setup build.
   - `docs:` Pembaruan dokumentasi atau catatan arsitektur.
2. **Branching:** Gunakan branch ringkas berbasis fitur (`feat/...`, `fix/...`) atau trunk-based development pada `main` sesuai kebutuhan Mas Andri.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
