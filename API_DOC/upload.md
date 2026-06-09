# Upload API Documentation

Dokumentasi ini menjelaskan fitur upload gambar yang digunakan untuk menyimpan aset gambar ke Supabase Storage. Endpoint upload tidak langsung menyimpan data ke tabel database; endpoint hanya mengembalikan URL/path file. URL tersebut kemudian digunakan oleh fitur lain, misalnya `menus.image_url` untuk foto menu atau `store_settings.setting_value` dengan `setting_key = store_logo` untuk logo toko.

## Base URL

Production:

```txt
https://api.cindelaras.my.id
```

Local:

```txt
http://localhost:4000
```

Semua endpoint upload berada di bawah prefix:

```txt
/api
```

## Authentication

Semua endpoint upload dan delete image hanya bisa diakses oleh user dengan role `ADMIN`.

Header wajib:

| Header | Wajib | Contoh | Keterangan |
| --- | --- | --- | --- |
| `Authorization` | Ya | `Bearer <token>` | Token login user. Harus diawali `Bearer `. |
| `x-api-key` | Ya | `<api-key>` | API key/session key yang dipakai bersama token. |
| `timezone` | Tidak | `Asia/Jakarta` | Jika tidak dikirim, default `Asia/Jakarta`. |
| `utc-offset` | Tidak | `+07:00` | Jika tidak dikirim, default `+07:00`. |

Jika token/API key tidak valid, API akan mengembalikan HTTP `401`.

## Storage Configuration

Upload disimpan ke Supabase Storage menggunakan service role key di backend.

Environment variable yang terlibat:

| Env | Wajib | Default | Keterangan |
| --- | --- | --- | --- |
| `SUPABASE_URL` | Ya | - | URL project Supabase. |
| `SUPABASE_SERVICE_ROLE_KEY` | Ya | - | Service role key backend. Jangan expose ke frontend. |
| `SUPABASE_STORAGE_BUCKET` | Tidak | `images` | Nama bucket Supabase Storage. |
| `SUPABASE_FOLDER_MENU` | Tidak | `menus` | Folder target untuk gambar menu. |
| `SUPABASE_FOLDER_LOGO` | Tidak | `logos` | Folder target untuk logo toko. |

Mapping target folder:

| Target URL | Folder Storage | Env Override |
| --- | --- | --- |
| `menu` | `menus` | `SUPABASE_FOLDER_MENU` |
| `logo` | `logos` | `SUPABASE_FOLDER_LOGO` |

Nama file yang disimpan dibuat otomatis oleh server dengan format:

```txt
<uuid-v7><original-extension>
```

Contoh:

```txt
0197f1d2-8c7d-7c0f-9a6f-99b2f0e8a120.png
```

## File Rules

Upload menggunakan `multipart/form-data` dengan field file bernama `image`.

| Rule | Nilai |
| --- | --- |
| Field file | `image` |
| Max size | `5MB` |
| Storage sementara | Memory, bukan filesystem lokal |
| Allowed MIME types | `image/jpeg`, `image/jpg`, `image/png`, `image/gif`, `image/webp` |
| Ekstensi delete valid | `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp` |

## Endpoint Summary

| Method | Endpoint | Auth | Role | Fungsi |
| --- | --- | --- | --- | --- |
| `POST` | `/api/upload/image` | Ya | `ADMIN` | Upload gambar ke target default `menu`. |
| `POST` | `/api/upload/image/:folder` | Ya | `ADMIN` | Upload gambar ke target `menu` atau `logo`. |
| `DELETE` | `/api/upload/image/:filename` | Ya | `ADMIN` | Hapus gambar dari target default `menu`. |
| `DELETE` | `/api/upload/image/:folder/:filename` | Ya | `ADMIN` | Hapus gambar dari target `menu` atau `logo`. |

## 1. Upload Image Default Menu

Upload gambar ke folder default `menu`.

```http
POST /api/upload/image
Content-Type: multipart/form-data
Authorization: Bearer <token>
x-api-key: <api-key>
```

### Request Body

| Field | Type | Wajib | Keterangan |
| --- | --- | --- | --- |
| `image` | File | Ya | File gambar dengan MIME type yang diizinkan. |

### cURL

```bash
curl -X POST "https://api.cindelaras.my.id/api/upload/image" \
  -H "Authorization: Bearer <token>" \
  -H "x-api-key: <api-key>" \
  -F "image=@./nasi-goreng.png"
```

### Success Response

Status: `201 Created`

```json
{
  "response": {
    "filename": "0197f1d2-8c7d-7c0f-9a6f-99b2f0e8a120.png",
    "folder": "menus",
    "path": "menus/0197f1d2-8c7d-7c0f-9a6f-99b2f0e8a120.png",
    "originalname": "nasi-goreng.png",
    "mimetype": "image/png",
    "size": 184522,
    "url": "https://your-project-ref.supabase.co/storage/v1/object/public/images/menus/0197f1d2-8c7d-7c0f-9a6f-99b2f0e8a120.png"
  },
  "metaData": {
    "message": "Gambar berhasil diupload",
    "code": 201,
    "response_code": "0001"
  }
}
```

Catatan implementasi saat ini: `response_code` untuk upload sukses masih bernilai `"0001"` karena helper response hanya mengisi `"0000"` untuk HTTP `200`. Validasi sukses upload sebaiknya memakai HTTP status `201` dan `metaData.code = 201`.

### Response Field Detail

| Field | Type | Keterangan |
| --- | --- | --- |
| `response.filename` | String | Nama file baru yang dibuat server. |
| `response.folder` | String | Folder Supabase Storage yang digunakan. |
| `response.path` | String | Object path di dalam bucket. |
| `response.originalname` | String | Nama file asli dari client. |
| `response.mimetype` | String | MIME type file. |
| `response.size` | Number | Ukuran file dalam byte. |
| `response.url` | String | Public URL file dari Supabase Storage. |
| `metaData.message` | String | Pesan hasil proses. |
| `metaData.code` | Number | HTTP code yang dikirim oleh API. |
| `metaData.response_code` | String | Kode response internal aplikasi. |

## 2. Upload Image Dengan Target Folder

Upload gambar ke folder tertentu: `menu` atau `logo`.

```http
POST /api/upload/image/:folder
Content-Type: multipart/form-data
Authorization: Bearer <token>
x-api-key: <api-key>
```

### Path Params

| Param | Type | Wajib | Allowed | Keterangan |
| --- | --- | --- | --- | --- |
| `folder` | String | Ya | `menu`, `logo` | Target folder storage. |

### Request Body

| Field | Type | Wajib | Keterangan |
| --- | --- | --- | --- |
| `image` | File | Ya | File gambar dengan MIME type yang diizinkan. |

### cURL Upload Gambar Menu

```bash
curl -X POST "https://api.cindelaras.my.id/api/upload/image/menu" \
  -H "Authorization: Bearer <token>" \
  -H "x-api-key: <api-key>" \
  -F "image=@./menu.png"
```

### cURL Upload Logo Toko

```bash
curl -X POST "https://api.cindelaras.my.id/api/upload/image/logo" \
  -H "Authorization: Bearer <token>" \
  -H "x-api-key: <api-key>" \
  -F "image=@./logo.png"
```

### Success Response Untuk Target `logo`

Status: `201 Created`

```json
{
  "response": {
    "filename": "0197f1d2-9bd0-7f57-bd11-2a03d23c2c9e.png",
    "folder": "logos",
    "path": "logos/0197f1d2-9bd0-7f57-bd11-2a03d23c2c9e.png",
    "originalname": "logo.png",
    "mimetype": "image/png",
    "size": 49231,
    "url": "https://your-project-ref.supabase.co/storage/v1/object/public/images/logos/0197f1d2-9bd0-7f57-bd11-2a03d23c2c9e.png"
  },
  "metaData": {
    "message": "Gambar berhasil diupload",
    "code": 201,
    "response_code": "0001"
  }
}
```

## 3. Delete Image Default Menu

Menghapus gambar dari folder default `menu`.

```http
DELETE /api/upload/image/:filename
Authorization: Bearer <token>
x-api-key: <api-key>
```

### Path Params

| Param | Type | Wajib | Keterangan |
| --- | --- | --- | --- |
| `filename` | String | Ya | Nama file yang akan dihapus. Harus berformat `.jpg`, `.jpeg`, `.png`, `.gif`, atau `.webp`. |

### cURL

```bash
curl -X DELETE "https://api.cindelaras.my.id/api/upload/image/0197f1d2-8c7d-7c0f-9a6f-99b2f0e8a120.png" \
  -H "Authorization: Bearer <token>" \
  -H "x-api-key: <api-key>"
```

### Success Response

Status: `200 OK`

```json
{
  "response": {
    "success": true,
    "filename": "0197f1d2-8c7d-7c0f-9a6f-99b2f0e8a120.png",
    "path": "menus/0197f1d2-8c7d-7c0f-9a6f-99b2f0e8a120.png",
    "message": "File berhasil dihapus"
  },
  "metaData": {
    "message": "Gambar berhasil dihapus",
    "code": 200,
    "response_code": "0000"
  }
}
```

## 4. Delete Image Dengan Target Folder

Menghapus gambar dari folder tertentu: `menu` atau `logo`.

```http
DELETE /api/upload/image/:folder/:filename
Authorization: Bearer <token>
x-api-key: <api-key>
```

### Path Params

| Param | Type | Wajib | Allowed | Keterangan |
| --- | --- | --- | --- | --- |
| `folder` | String | Ya | `menu`, `logo` | Target folder storage. |
| `filename` | String | Ya | `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp` | Nama file yang akan dihapus. |

### cURL Delete Logo

```bash
curl -X DELETE "https://api.cindelaras.my.id/api/upload/image/logo/0197f1d2-9bd0-7f57-bd11-2a03d23c2c9e.png" \
  -H "Authorization: Bearer <token>" \
  -H "x-api-key: <api-key>"
```

### Success Response

Status: `200 OK`

```json
{
  "response": {
    "success": true,
    "filename": "0197f1d2-9bd0-7f57-bd11-2a03d23c2c9e.png",
    "path": "logos/0197f1d2-9bd0-7f57-bd11-2a03d23c2c9e.png",
    "message": "File berhasil dihapus"
  },
  "metaData": {
    "message": "Gambar berhasil dihapus",
    "code": 200,
    "response_code": "0000"
  }
}
```

## Error Responses

### 400 - File Tidak Dikirim

Terjadi jika request tidak membawa field `image`.

```json
{
  "response": null,
  "metaData": {
    "message": "File tidak ditemukan. Mohon pilih file gambar.",
    "code": 400,
    "response_code": "0001"
  }
}
```

### 400 - File Terlalu Besar

Terjadi jika file lebih besar dari `5MB`.

```json
{
  "code": 400,
  "message": "Ukuran file terlalu besar. Maksimal 5MB.",
  "response": null
}
```

### 400 - MIME Type Tidak Diizinkan

Terjadi jika file bukan JPEG, JPG, PNG, GIF, atau WebP.

```json
{
  "code": 400,
  "message": "Tipe file tidak diizinkan. Hanya JPEG, PNG, GIF, dan WebP yang diperbolehkan.",
  "response": null
}
```

### 401 - Token/API Key Tidak Ada

```json
{
  "response": {},
  "metaData": {
    "message": "Authorization token or API key is missing!",
    "code": 401,
    "response_code": "0001"
  }
}
```

### 401 - Role Tidak Diizinkan

Terjadi jika user login bukan `ADMIN`.

```json
{
  "response": {},
  "metaData": {
    "message": "Forbidden access. You do not have permission to access this resource.",
    "code": 401,
    "response_code": "0001"
  }
}
```

### 422 - Folder Tidak Valid

Terjadi jika `:folder` bukan `menu` atau `logo`.

```json
{
  "response": {
    "error": [
      {
        "location": "params",
        "field": "folder",
        "message": "Target folder tidak valid. Gunakan menu atau logo."
      }
    ]
  },
  "metaData": {
    "message": "Validasi gagal",
    "code": 422,
    "response_code": "5505"
  }
}
```

### 422 - Filename Tidak Valid

Terjadi jika `:filename` kosong atau format nama file tidak valid.

```json
{
  "response": {
    "error": [
      {
        "location": "params",
        "field": "filename",
        "message": "Format nama file tidak valid"
      }
    ]
  },
  "metaData": {
    "message": "Validasi gagal",
    "code": 422,
    "response_code": "5505"
  }
}
```

### 422 - Gagal Upload Ke Supabase

Terjadi jika Supabase Storage menolak upload, bucket tidak ada, service role key salah, atau storage permission bermasalah.

```json
{
  "response": {
    "error": null
  },
  "metaData": {
    "message": "Gagal mengupload file",
    "code": 422,
    "response_code": "5505"
  }
}
```

### 422 - Gagal Hapus File

```json
{
  "response": {
    "error": null
  },
  "metaData": {
    "message": "Gagal menghapus file",
    "code": 422,
    "response_code": "5505"
  }
}
```

### 404 - File Tidak Ditemukan

```json
{
  "response": {},
  "metaData": {
    "message": "File tidak ditemukan",
    "code": 404,
    "response_code": "0001"
  }
}
```

### 500 - Konfigurasi Supabase Belum Lengkap

Terjadi jika `SUPABASE_URL` atau `SUPABASE_SERVICE_ROLE_KEY` belum diisi.

```json
{
  "response": {},
  "metaData": {
    "message": "Ops, SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY wajib diisi",
    "code": 500,
    "response_code": "0001"
  }
}
```

## Tabel Yang Terlibat

Endpoint upload/delete tidak melakukan insert/update/delete langsung ke tabel database. Data file fisik disimpan di Supabase Storage. Database hanya menyimpan URL hasil upload melalui endpoint fitur lain.

### Supabase Storage Object

| Komponen | Keterangan |
| --- | --- |
| Bucket | Nilai `SUPABASE_STORAGE_BUCKET`, default `images`. |
| Folder menu | Nilai `SUPABASE_FOLDER_MENU`, default `menus`. |
| Folder logo | Nilai `SUPABASE_FOLDER_LOGO`, default `logos`. |
| Object path menu | `menus/<filename>` atau sesuai env `SUPABASE_FOLDER_MENU`. |
| Object path logo | `logos/<filename>` atau sesuai env `SUPABASE_FOLDER_LOGO`. |
| Public URL | Dikembalikan pada field `response.url`. |

### Table `menus`

Digunakan untuk menyimpan URL gambar menu setelah upload target `menu`.

| Kolom | Type | Nullable | Keterangan |
| --- | --- | --- | --- |
| `menu_id` | `uuid` | Tidak | Primary key menu. |
| `category_id` | `uuid` | Tidak | Foreign key ke `categories.category_id`. |
| `name` | `varchar(100)` | Tidak | Nama menu. |
| `price` | `decimal(15,2)` | Tidak | Harga jual menu. |
| `cost` | `decimal(15,2)` | Tidak | Cost menu. |
| `description` | `text` | Ya | Deskripsi menu. |
| `image_url` | `varchar(255)` | Ya | URL gambar hasil upload. |
| `is_available` | `boolean` | Tidak | Status ketersediaan menu. |
| `created_at` | `timestamp(6)` | Tidak | Waktu dibuat. |
| `updated_at` | `timestamp(6)` | Ya | Waktu terakhir update. |
| `deleted_at` | `timestamp(6)` | Ya | Soft delete marker. |

Contoh penggunaan setelah upload:

```json
{
  "name": "Nasi Goreng",
  "category_id": "0197f1d2-8c7d-7c0f-9a6f-99b2f0e8a120",
  "price": 18000,
  "description": "Nasi goreng dengan telur",
  "image_url": "https://your-project-ref.supabase.co/storage/v1/object/public/images/menus/0197f1d2-8c7d-7c0f-9a6f-99b2f0e8a120.png",
  "is_available": true
}
```

Endpoint penyimpanan URL ke menu:

```txt
POST /api/menu
PATCH /api/menu/:menu_id
```

### Table `store_settings`

Digunakan untuk menyimpan URL logo toko setelah upload target `logo`. Key yang dipakai oleh aplikasi untuk logo adalah `store_logo`.

| Kolom | Type | Nullable | Keterangan |
| --- | --- | --- | --- |
| `store_setting_id` | `uuid` | Tidak | Primary key setting. |
| `setting_key` | `varchar(50)` | Tidak | Nama key setting, contoh `store_logo`. |
| `setting_value` | `text` | Tidak | Nilai setting. Untuk logo, isi dengan URL hasil upload. |
| `created_at` | `timestamp(6)` | Tidak | Waktu dibuat. |
| `updated_at` | `timestamp(6)` | Ya | Waktu terakhir update. |
| `deleted_at` | `timestamp(6)` | Ya | Soft delete marker. |

Contoh update logo toko setelah upload:

```http
PATCH /api/store-setting/store_logo
Content-Type: application/json
Authorization: Bearer <token>
x-api-key: <api-key>
```

```json
{
  "setting_value": "https://your-project-ref.supabase.co/storage/v1/object/public/images/logos/0197f1d2-9bd0-7f57-bd11-2a03d23c2c9e.png"
}
```

Alternatif upsert:

```http
POST /api/store-setting
Content-Type: application/json
Authorization: Bearer <token>
x-api-key: <api-key>
```

```json
{
  "setting_key": "store_logo",
  "setting_value": "https://your-project-ref.supabase.co/storage/v1/object/public/images/logos/0197f1d2-9bd0-7f57-bd11-2a03d23c2c9e.png"
}
```

## Recommended Frontend Flow

### Upload Gambar Menu

1. Login sebagai `ADMIN`.
2. Kirim file ke `POST /api/upload/image/menu`.
3. Ambil `response.url`.
4. Simpan URL tersebut ke `image_url` saat create/update menu.

### Upload Logo Toko

1. Login sebagai `ADMIN`.
2. Kirim file ke `POST /api/upload/image/logo`.
3. Ambil `response.url`.
4. Simpan URL tersebut ke `store_settings` dengan key `store_logo`.

### Ganti Gambar

1. Upload gambar baru.
2. Simpan URL baru ke tabel terkait.
3. Jika URL lama sudah tidak dipakai, hapus file lama menggunakan endpoint delete.

## Implementation Notes

| Source File | Fungsi |
| --- | --- |
| `route/upload.route.ts` | Definisi endpoint upload/delete dan middleware role admin. |
| `src/modules/upload/upload.controller.ts` | Handler request dan response upload/delete. |
| `src/modules/upload/upload.service.ts` | Validasi service dan proses upload/delete. |
| `src/modules/upload/upload.schema.ts` | Validasi `folder` dan `filename`. |
| `config/upload.config.ts` | Konfigurasi Multer, allowed MIME type, dan max file size. |
| `config/supabase.config.ts` | Konfigurasi bucket/folder Supabase Storage. |
| `utility/supabase-storage.utility.ts` | Helper upload/delete/get public URL di Supabase Storage. |

