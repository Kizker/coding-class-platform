# AGENTS.md — Coding Class Platform

Proyek platform bimbingan belajar privat pemrograman (Python Track 12 Minggu) berbasis **Laravel 11/12 + Inertia.js (React 19 + TypeScript + Tailwind CSS)**.

---

## 1. Arsitektur Layanan & Alur Kerja (Development vs Production)

Aplikasi ini menggunakan integrasi Laravel + Inertia.js dengan Vite bundler.

### A. Peta Port & Layanan Lokal
- **`http://localhost:8000` (Laravel Web Server):**
  - Alamat URL utama yang **WAJIB dibuka di browser** untuk mengakses antarmuka aplikasi.
  - Dijalankan via `php artisan serve --port=8000`.
- **`http://localhost:5173` (Vite HMR Server):**
  - Menangani *Hot Module Replacement* (HMR), menyajikan bundle CSS dan TypeScript/React ke halaman Laravel.
  - **JANGAN diakses langsung di browser**, karena port ini hanya menyajikan bundler assets dan websocket HMR.
  - Dijalankan via `pnpm dev` atau `npm run dev`.

### B. Konfigurasi Lingkungan (`.env` vs `.env.production`)
- **`.env` (Local Development):**
  - `APP_ENV=local`
  - `APP_DEBUG=true`
  - `APP_URL=http://localhost:8000`
  - `DB_CONNECTION=sqlite` (`database/database.sqlite`)
- **`.env.production` (Production Hostinger Backup):**
  - `APP_ENV=production`
  - `APP_DEBUG=false`
  - `APP_URL=https://coding-class.labtry.my.id`
  - `DB_CONNECTION=mysql` (`u141095167_coding`)
  - *Catatan:* Kedua file ini terdaftar di `.gitignore`.

---

## 2. Perintah Operasional Harian

### Menjalankan Lingkungan Lokal:
```bash
# Terminal 1 — Jalankan Vite HMR
pnpm dev

# Terminal 2 — Jalankan Laravel Web Server
php artisan serve
# Akses di browser: http://localhost:8000
```

### Build untuk Produksi (Hostinger Deployment):
```bash
# 1. Hapus marker HMR agar tidak bocor ke produksi
rm -f public/hot

# 2. Build aset produksi ke public/build/
pnpm build
```

---

## 3. Catatan Runtime macOS (Apple Silicon)
PHP 8.5 dan Composer dikelola via Homebrew di `$HOME/homebrew/bin`. Baris berikut telah ditambahkan secara permanen ke `~/.zshrc`:
```bash
export PATH="$HOME/homebrew/bin:$HOME/homebrew/sbin:$PATH"
```

---

## 4. Riwayat Deployment Produksi

- **Tanggal & Waktu:** 31 Oktober 2026, 11:32 WIB
- **Target:** Hostinger Web Hosting (`coding-class.labtry.my.id`)
- **Tindakan:** Full Wipe & Fresh Deployment dari awal.
- **Database:** Drop all tables, fresh migration (`0001_01_01_000000` s/d `2026_10_24_000001`), dan re-seeding database demo (`DatabaseSeeder`).
- **Status Akhir:** `HTTP 200 OK` (Healthy, MySQL connected, Vite assets served via HCDN).

