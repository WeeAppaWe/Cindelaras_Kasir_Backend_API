# Sistem Kasir Backend API

Backend API untuk sistem kasir berbasis Express.js, TypeScript, PostgreSQL, Prisma, Redis, dan Supabase Storage.

## Tech Stack

- Node.js
- Express.js 5
- TypeScript
- PostgreSQL
- Prisma 7
- Redis
- Supabase Storage
- Swagger UI
- Jest
- Docker

## Prerequisites

Pastikan environment lokal atau server memiliki:

- Node.js 24 direkomendasikan
- pnpm
- PostgreSQL
- Redis jika fitur cache/session/antrian yang memakai Redis diaktifkan
- Supabase project untuk upload file storage

Aktifkan pnpm melalui Corepack jika belum tersedia:

```bash
corepack enable
corepack prepare pnpm@9.15.9 --activate
```

## Installation

Install dependencies:

```bash
pnpm install
```

Buat file `.env` dari contoh:

```bash
cp .env-sample .env
```

Isi nilai environment sesuai database, Redis, Supabase, token, dan konfigurasi toko.

## Environment Variables

Environment utama yang wajib diperhatikan:

```env
NODE_ENV=development
PORT=4000
API_BASE_URL=http://localhost:4000

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

REDIS_HOST=
REDIS_PORT=
REDIS_PASS=
REDIS_DB=0

SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_STORAGE_BUCKET=images
SUPABASE_STORAGE_PUBLIC_URL=https://your-project-ref.supabase.co/storage/v1/object/public/images
SUPABASE_FOLDER_MENU=menus
SUPABASE_FOLDER_LOGO=logos

AES_IV=
AES_KEY=
AUTH_TOKEN_EXPIRED_TIME_MINUTE=2880
FONNTE_TOKEN=

STORE_NAME="Nama Toko Anda"
STORE_ADDRESS="Alamat Toko, Kota, Kode Pos"
DEFAULT_CURRENCY=IDR
```

Jangan commit file `.env`. File tersebut berisi credential dan secret production.

## Prisma

Validasi schema Prisma:

```bash
pnpm prisma:validate
```

Generate Prisma client:

```bash
pnpm prisma:generate
```

Jalankan migration untuk development:

```bash
pnpm prisma:migrate
```

Cek status migration:

```bash
pnpm prisma:migrate:status
```

Untuk production, gunakan migrate deploy:

```bash
pnpm exec prisma migrate deploy --config config/prisma.config.ts
```

Folder `prisma/migrations` harus ikut Git karena dipakai untuk deployment database.

## Development

Jalankan server development:

```bash
pnpm run dev
```

Server berjalan pada port dari `.env`, default:

```text
http://localhost:4000
```

Base API:

```text
/api
```

Swagger UI:

```text
/api-docs
```

Swagger JSON:

```text
/api-docs.json
```

## Build

Build TypeScript ke folder `dist`. Script ini akan menjalankan Prisma generate terlebih dahulu:

```bash
pnpm run build
```

Jalankan hasil build:

```bash
pnpm start
```

Atau langsung:

```bash
node dist/bin/www.js
```

Untuk deployment hPanel, folder `dist/` sengaja tidak di-ignore agar hasil build bisa ikut di-push ke Git.

## Test

Jalankan test:

```bash
pnpm test
```

Jalankan test dengan coverage:

```bash
pnpm test:coverage
```

## Deployment hPanel

Gunakan flow ini jika hPanel mengambil source dari Git dan tidak menjalankan build TypeScript di server.

Build dari lokal:

```bash
pnpm install
pnpm run build
```

Commit file deployment dan hasil build:

```bash
git add dist prisma package.json pnpm-lock.yaml tsconfig.json app.ts bin config database doc exception middleware route src types utility .gitignore .env-sample
git commit -m "Prepare backend deployment"
git push
```

Di hPanel:

- Set startup file ke `dist/bin/www.js`
- Jika hPanel tetap meminta `server.js`, gunakan `server.js` di root project. File ini meneruskan proses ke `dist/bin/www.js`.
- Set environment variables sesuai `.env-sample`
- Pastikan `DATABASE_URL` mengarah ke database production
- Jalankan production dependencies jika hPanel menyediakan terminal:

```bash
pnpm install --prod --frozen-lockfile
```

Jika pnpm tidak tersedia di hPanel, aktifkan Corepack terlebih dahulu atau install pnpm sesuai dokumentasi hosting.

Jalankan migration production sebelum aplikasi digunakan:

```bash
pnpm exec prisma migrate deploy --config config/prisma.config.ts
```

## Docker Deployment

Docker bersifat opsional. Gunakan ini jika deployment memakai Docker atau VPS.

Build dan jalankan stack:

```bash
docker compose up -d --build
```

Service yang dibuat:

- `api`
- `migrate`
- `postgres`
- `redis`

File `compose.yaml` otomatis menjalankan migration service sebelum API aktif. Sesuaikan credential pada `.env` atau gunakan `.env.docker.example` sebagai checklist.

## Project Structure

```text
bin/                 HTTP server entrypoint
config/              Konfigurasi aplikasi, Prisma, Supabase, upload, Swagger
database/            Koneksi database dan adapter
doc/                 Swagger documentation source
exception/           Error handling
middleware/          Express middleware
prisma/              Schema dan migrations Prisma
route/               API routes
src/modules/         Business modules
src/generated/       Generated Prisma client source
types/               Custom TypeScript types
utility/             Helper utilities
dist/                Hasil build TypeScript
```

## Notes

- `node_modules/`, `.env`, logs, cache, dan upload runtime tidak boleh ikut Git.
- `dist/` boleh ikut Git karena dibutuhkan untuk deployment hPanel.
- `SUPABASE_SERVICE_ROLE_KEY` hanya boleh digunakan di backend/server.
- Jangan menjalankan `prisma migrate dev` di production. Gunakan `prisma migrate deploy`.
