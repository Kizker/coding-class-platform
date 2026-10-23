# FULLSTACK DATA CONTRACTS PROTOCOL
## Protokol Sinkronisasi Kontrak Data: Antarmuka Klien <-> API Server <-> Basis Data
### Standar Sinkronisasi Terpadu untuk Solo Fullstack Developer — Andricha Dea Mitra (Andri)

Dokumen ini adalah acuan tata kelola kontrak data untuk memastikan bahwa setiap field yang ada pada antarmuka pengguna (Frontend), server endpoint (Backend DTO), dan tabel basis data (Database Schema) terhubung secara konsisten, aman, dan tanpa data spekulatif.

---

## 1. Hukum Keselarasan Skema & Nol Asumsi Field (Zero Speculative Fields Law)

> [!CAUTION]
> **HUKUM NOL ASUMSI FIELD (MUTLAK & NON-NEGOTIABLE)**:
> 
> 1. **Dilarang Mengarang Field Spekulatif:**
>    Pengembang dan Agent **DILARANG KERAS** menambahkan field DTO, kolom database, atau mock data spekulatif yang tidak memiliki representasi nyata pada kebutuhan antarmuka atau logika sistem yang sedang dibangun.
> 
> 2. **Sinkronisasi 4 Lapisan (4-Layer 1:1 Parity):**
>    Setiap entitas data wajib selaras di seluruh 4 lapisan:
>    - **Lapisan 1 (Desain/Antarmuka):** Label input, validasi form, dan elemen tampilan visual.
>    - **Lapisan 2 (Frontend Client):** Interface TypeScript, skema validasi Zod, dan state komponen.
>    - **Lapisan 3 (Backend API):** Request/Response DTO, class-validator, dan dokumentasi Swagger/OpenAPI.
>    - **Lapisan 4 (Database):** Kolom tabel PostgreSQL, constraint indeks, tipe Prisma/Drizzle.

---

## 2. Format Amplop Respon Standar (API Envelope Standard)

Seluruh endpoint backend wajib mengembalikan struktur amplop JSON terpadu:

### Respon Berhasil (Success Envelope)
```typescript
{
  "success": true,
  "statusCode": 200, // atau 201 Created
  "message": "Data berhasil dimuat",
  "data": { ... }, // Objek tunggal atau Array
  "meta": {        // Opsional untuk data terpaginasi
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### Respon Gagal (Error Envelope)
```typescript
{
  "success": false,
  "statusCode": 400, // 400, 401, 403, 404, 422, 500
  "message": "Validasi input gagal",
  "errors": [
    {
      "field": "email",
      "message": "Format email tidak valid"
    }
  ],
  "timestamp": "2026-10-23T07:30:00.000Z",
  "path": "/api/v1/users"
}
```

---

## 3. Matriks Sinkronisasi Tipe Data (Type Mapping Matrix)

| Tipe Konseptual | TypeScript (FE/BE) | Validasi Zod | Prisma ORM | PostgreSQL |
|---|---|---|---|---|
| Identitas Unik | `string` | `z.string().uuid()` | `String @id @default(uuid())` | `UUID` |
| Teks Singkat / Kode | `string` | `z.string().max(100)` | `String @db.VarChar(100)` | `VARCHAR(100)` |
| Teks Panjang / Deskripsi | `string` | `z.string()` | `String @db.Text` | `TEXT` |
| Bilangan Bulat | `number` | `z.number().int()` | `Int` | `INTEGER` |
| Nilai Finansial / Presisi | `number` / `Decimal` | `z.number()` | `Decimal @db.Decimal(15, 2)` | `NUMERIC(15,2)` |
| Status / Opsi Terbatas | `enum` | `z.nativeEnum(...)` | `enum Status { ... }` | `ENUM` |
| Boolean Flag | `boolean` | `z.boolean()` | `Boolean @default(false)` | `BOOLEAN` |
| Waktu / Timestamp | `Date` / `string` | `z.string().datetime()` | `DateTime @default(now())` | `TIMESTAMPTZ` |
| Data Fleksibel / JSON | `Record<string, unknown>` | `z.record(z.any())` | `Json` | `JSONB` |

---

## 4. Standar Filterisasi, Pencarian, & Paginasi

Setiap endpoint list/koleksi wajib mendukung parameter query standar:
- `page`: Nomor halaman aktif (default: `1`).
- `limit`: Jumlah item per halaman (default: `10`, maksimum: `100`).
- `search`: Kata kunci pencarian multi-kolom (case-insensitive).
- `sortBy`: Nama kolom pengurutan (default: `createdAt`).
- `order`: Arah pengurutan (`asc` atau `desc`, default: `desc`).
