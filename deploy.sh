#!/usr/bin/env bash
# ==============================================================================
# Deploy Automation Script for Hostinger
# Domain: coding-class.labtry.my.id
# Target Directory: ~/domains/coding-class.labtry.my.id/public_html
# ==============================================================================

set -euo pipefail

TARGET_DIR="$HOME/domains/coding-class.labtry.my.id/public_html"
echo "==> [1/6] Memulai proses deployment di ${TARGET_DIR}..."

cd "$TARGET_DIR"

# 1. Pastikan environment variables .env aktif
echo "==> [2/6] Memeriksa konfigurasi .env & MySQL..."
if [ ! -f .env ]; then
  cat <<'EOF' > .env
NODE_ENV=production
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=u141095167_coding
DB_USERNAME=u141095167_head_cod
DB_PASSWORD=@Dea18022003
DATABASE_URL=mysql://u141095167_head_cod:%40Dea18022003@127.0.0.1:3306/u141095167_coding
EOF
  echo "    .env berhasil dibuat dengan kredensial database u141095167_coding."
else
  echo "    .env sudah ada, mempertahankan konfigurasi saat ini."
fi

# 2. Update dependensi menggunakan package manager yang tersedia (pnpm/npm)
echo "==> [3/6] Menginstal dependensi..."
if command -v pnpm &> /dev/null; then
  pnpm install --frozen-lockfile || pnpm install
elif command -v npm &> /dev/null; then
  npm install
else
  echo "    [ERROR] pnpm maupun npm tidak ditemukan di PATH server!"
  exit 1
fi

# 3. Jalankan optimized production build
echo "==> [4/6] Membangun Next.js production build..."
if command -v pnpm &> /dev/null; then
  pnpm run build
else
  npm run build
fi

# 4. Sinkronisasi aset statis untuk Next.js Standalone
echo "==> [5/6] Menyiapkan aset statis Next.js Standalone..."
if [ -d ".next/standalone" ]; then
  mkdir -p .next/standalone/.next
  cp -rf .next/static .next/standalone/.next/ 2>/dev/null || true
  cp -rf public .next/standalone/ 2>/dev/null || true
  echo "    Aset statis berhasil disinkronkan ke .next/standalone."
fi

# 5. Restart application runner (PM2 on Port 3012 & CloudLinux Passenger)
echo "==> [6/6] Memulai / Memperbarui proses Node.js..."
mkdir -p tmp
touch tmp/restart.txt

if command -v pm2 &> /dev/null; then
  if pm2 list | grep -q "coding-class"; then
    echo "    Memperbarui proses PM2 coding-class..."
    PORT=3012 pm2 restart coding-class --update-env
  else
    echo "    Menjalankan proses PM2 baru di port 3012..."
    PORT=3012 pm2 start server.js --name "coding-class"
  fi
  pm2 save 2>/dev/null || true
else
  echo "    PM2 tidak terpasang secara global. Menggunakan Passenger tmp/restart.txt."
fi

echo "=============================================================================="
echo " Deployment Sukses! Silakan verifikasi di: https://coding-class.labtry.my.id"
echo "=============================================================================="

