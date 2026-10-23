# Solo Fullstack Engineering Workspace
## Repositori Pengembangan Sistem Mandiri — Andricha Dea Mitra (Andri)

Repositori ini memuat fondasi konfigurasi, memori sistem, aturan operasional, dan keahlian (*skills*) agen AI terpadu untuk mendukung alur kerja **Solo Senior Fullstack Engineer** dengan kecepatan tinggi, presisi arsitektural, dan standar produksi.

---

## 🏛️ Struktur Tata Kelola & Agen (.agents/)

Seluruh ekosistem otomasi dan kecerdasan proyek ini dikelola melalui:

- 📖 [AGENTS.md](file:///Users/andrichadeamitra/Documents/PROJECT/coding-class/AGENTS.md): Dokumen induk arsitektur sistem, standar fullstack, port jaringan, dan hukum eksekusi.
- 🔗 [CLAUDE.md](file:///Users/andrichadeamitra/Documents/PROJECT/coding-class/CLAUDE.md) & [GEMINI.md](file:///Users/andrichadeamitra/Documents/PROJECT/coding-class/GEMINI.md): Symlink langsung ke `AGENTS.md` untuk kompatibilitas lintas runner AI.
- ⚙️ [.agents/rules/](file:///Users/andrichadeamitra/Documents/PROJECT/coding-class/.agents/rules/):
  - [persona-solo-fullstack.md](file:///Users/andrichadeamitra/Documents/PROJECT/coding-class/.agents/rules/persona-solo-fullstack.md): Persona resmi Senior Solo Fullstack Co-Pilot & Systems Architect.
  - [solo-developer-protocol.md](file:///Users/andrichadeamitra/Documents/PROJECT/coding-class/.agents/rules/solo-developer-protocol.md): Protokol alur kerja mandiri otonom berkecepatan tinggi tanpa friksi tim.
  - [strict-skill-execution.md](file:///Users/andrichadeamitra/Documents/PROJECT/coding-class/.agents/rules/strict-skill-execution.md): Tata kelola wajib eksekusi berbasis skill (*Skill-First Execution Law*).
  - [confirmation-gate.md](file:///Users/andrichadeamitra/Documents/PROJECT/coding-class/.agents/rules/confirmation-gate.md): Gerbang konfirmasi dua tingkat (otonom untuk fitur rutin, konfirmasi `acc`/`eksekusi` untuk aksi destruktif).
- 🧠 [.agents/memory/](file:///Users/andrichadeamitra/Documents/PROJECT/coding-class/.agents/memory/):
  - [developer-preferences.md](file:///Users/andrichadeamitra/Documents/PROJECT/coding-class/.agents/memory/developer-preferences.md): Preferensi teknis personal, gaya kode, dan konvensi Mas Andri.
  - [architectural-decisions.md](file:///Users/andrichadeamitra/Documents/PROJECT/coding-class/.agents/memory/architectural-decisions.md): Log keputusan arsitektur (ADR).
  - [data-contracts.md](file:///Users/andrichadeamitra/Documents/PROJECT/coding-class/.agents/memory/data-contracts.md): Matriks sinkronisasi kontrak data (Frontend UI <-> Backend API <-> Database).
  - [learned-patterns.md](file:///Users/andrichadeamitra/Documents/PROJECT/coding-class/.agents/memory/learned-patterns.md): Buku log pembelajaran berkelanjutan antar sesi.
- 🧰 [.agents/skills/](file:///Users/andrichadeamitra/Documents/PROJECT/coding-class/.agents/skills/): 33 skill terspesialisasi mencakup seluruh spektrum Fullstack (Frontend UI, Backend API, Database, DevOps, dan SecQA).

---

## 🧰 Katalog Keahlian Terpasang (33 Skills)

| Domain | Skill Terpasang |
|---|---|
| **Frontend & UI/UX** | `frontend-design`, `shadcn-ui`, `design-anti-ai-slop`, `nextjs-best-practices`, `react-patterns`, `senior-fullstack`, `frontend-architecture` |
| **Backend & API** | `backend-architect`, `architecture-patterns`, `api-design-principles`, `nodejs-backend-patterns`, `openapi-spec-generation`, `auth-implementation-patterns`, `saga-orchestration` |
| **Database & ORM** | `database-architect`, `database-admin`, `database-migrations-sql-migrations`, `postgresql`, `sql-pro`, `sql-optimization-patterns` |
| **DevOps & Infra** | `deployment-engineer`, `observability-engineer`, `cicd-automation-workflow-automate`, `incident-runbook-templates` |
| **Security & Data** | `backend-security-coder`, `security-auditor`, `secrets-management`, `gdpr-data-handling` |
| **QA & Testing** | `debugging-strategies`, `code-review-excellence`, `unit-testing-test-generate`, `api-testing-observability-api-mock`, `antigravity-skills-manager` |

---

## 🔌 Alokasi Port Jaringan (The Fixed Port Law)

| Komponen / Layanan | Port Default | Endpoint / Akses |
|---|---|---|
| **Web Portal Utama (Next.js)** | `3000` | `http://localhost:3000` |
| **Web Admin / Sandbox Testing** | `3001` | `http://localhost:3001` |
| **Core API Backend (Fastify/NestJS)** | `3005` | `http://localhost:3005` (Swagger: `/docs`) |
| **PostgreSQL Database** | `5432` | TCP `localhost:5432` |
| **Redis Cache** | `6379` | TCP `localhost:6379` |
| **MinIO Storage API** | `9000` | `http://localhost:9000` |
| **MinIO Console** | `9001` | `http://localhost:9001` |

---

## 🚀 Alur Kerja Bersama Agent

1. **Memberikan Instruksi:** Mas Andri cukup menyampaikan fitur, komponen, query, atau perbaikan bug yang diinginkan.
2. **Perencanaan & Skill Declaration:** Agent akan secara otomatis memetakan domain teknis, memilih skill yang relevan, dan menyajikan rencana ringkas.
3. **Eksekusi Presisi:** Agent mengimplementasikan kode yang type-safe, modular, dan siap produksi.
4. **Keamanan Eksekusi:** Untuk aksi berisiko tinggi (drop table, hapus modul utama), Agent akan meminta konfirmasi dengan kata kunci `acc` atau `eksekusi`.
