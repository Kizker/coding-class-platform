# DEVELOPER PREFERENCES & WORKING CONVENTIONS
## Preferensi Teknis, Gaya Kode, & Konvensi Personal
### Khusus untuk Andricha Dea Mitra (Andri) — Solo Senior Fullstack Engineer

Dokumen ini memuat standar teknis personal, tumpukan teknologi favorit, konvensi penulisan kode, dan gaya kerja Mas Andri untuk memastikan Agent selalu menghasilkan output yang selaras tanpa perlu diinstruksikan berulang kali.

---

## 1. Profil & Karakteristik Developer

- **Nama:** Andricha Dea Mitra (Andri)
- **Peran:** Solo Senior Fullstack Engineer & Systems Architect
- **Karakteristik Kunci:**
  - Sangat teliti, sistematis, anti-asumsi, menyukai arsitektur yang bersih dan modular.
  - Berorientasi pada stabilitas sistem, tipe data ketat (*strict typing*), dan performa tinggi.
  - Menguasai seluruh lapisan dari UI/UX, API Server, Database, hingga DevOps dan SecQA.
- **Ekspektasi terhadap Agent:**
  - Mitra berpikir teknis sejajar (*senior-level pair programmer*).
  - Solusi langsung to the point tanpa basa-basi korporat.
  - Kode lengkap siap produksi (*production-ready*), tanpa placeholder komentar `// TODO` atau potongan kode menggantung.

---

## 2. Standar Tumpukan Teknologi (Technology Stack)

### A. Lapisan Antarmuka (Frontend)
- **Framework:** Next.js (App Router) / React 19/18.
- **Bahasa:** TypeScript (*Strict Mode*, `noImplicitAny: true`).
- **Styling & UI Kit:** Tailwind CSS, Radix UI Primitives, Shadcn UI, Lucide Icons.
- **Desain & UX:**
  - Modern, rapi, responsif (mobile-first), ramah aksesibilitas.
  - Mematuhi estetika tinggi (*Anti-UI-Slop*), tipografi bersih (misal: Plus Jakarta Sans, Inter), palet warna berkarakter.
- **State & Data Fetching:** React Hooks, TanStack Query (React Query) / SWR, Server Actions, Zustand (jika state global kompleks).

### B. Lapisan Server & API (Backend)
- **Runtime & Framework:** Node.js / Bun / NestJS (Fastify adapter) / Fastify murni / Go.
- **Arsitektur:** Modular Monolith / Clean Architecture / Domain-Driven Design (DDD) sederhana.
- **Validasi & Kontrak:** Zod atau `class-validator` + `class-transformer`.
- **Dokumentasi API:** OpenAPI 3.0 / Swagger UI (`/docs`).
- **Keamanan:** JWT Authentication, CORS ketat, Rate Limiting terdistribusi, sanitasi input, proteksi OWASP Top 10.

### C. Lapisan Basis Data (Database & Storage)
- **Database Engine:** PostgreSQL 16+ (dengan ekstensi PostGIS jika memerlukan geospasial).
- **ORM & Migrasi:** Prisma ORM / Drizzle ORM.
- **Integritas Data:** Indeks performa pada foreign key dan kolom pencarian, constraint `UNIQUE` untuk pencegahan duplikasi data.
- **Object Storage:** MinIO / AWS S3 kompatibel.

### D. Infrastruktur & Sistem Operasi
- **Sistem Operasi:** macOS Apple Silicon (`arm64`), shell `zsh`.
- **Package Manager:** `pnpm` (pilihan utama) atau `bun` / `npm`.
- **Kontainerisasi & Proxy:** Docker, Docker Compose, Caddy Reverse Proxy (dengan auto HTTPS).

---

## 3. Konvensi Penulisan Kode (Coding Conventions)

1. **Strict Typing Mutlak:**
   - Dilarang keras menggunakan tipe `any`. Gunakan `unknown` jika tipe belum pasti, lalu lakukan type narrowing.
   - Semua fungsi publik wajib mendeklarasikan tipe parameter dan tipe kembalian (*return type*).

2. **Format Amplop Respon API (Standard Envelope):**
   Setiap endpoint REST wajib mengembalikan format seragam:
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

3. **Komponen UI Bersih & Modular:**
   - Pisahkan logika data fetching dari presentasi UI visual.
   - Komponen reusable diletakkan pada `components/ui/` atau `components/shared/`.
   - Hindari komponen raksasa (*god components*) — pecah menjadi sub-komponen terfokus.

4. **Error Handling Defensif:**
   - Tangani skenario edge-case (data null/undefined, network timeout, duplikasi data unik).
   - Jangan pernah membiarkan server crash tanpa log error terstruktur.
