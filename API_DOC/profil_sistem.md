# Dokumentasi API Profil Sistem (Store Setting)

Dokumentasi ini menjelaskan rute API untuk mengelola **Pengaturan Toko / Profil Sistem** secara dinamis (*key-value settings*). Fitur ini umumnya digunakan pada halaman Pengaturan FE untuk mengubah profil bisnis seperti nama toko, logo, format setruk kasir, hingga konfigurasi printer.

Base URL Utama: `/api/store-setting`

---

## Tabel dan Field yang Dipakai

Modul profil sistem memakai tabel utama `store_settings`. Data disimpan dengan pola key-value, sehingga setiap konfigurasi toko disimpan sebagai pasangan `setting_key` dan `setting_value`.

### Ringkasan Penggunaan Tabel

| Proses | Tabel yang Dipakai | Keterangan |
| :--- | :--- | :--- |
| Info publik toko | `store_settings` | Mengambil setting aktif, lalu hanya mengembalikan key publik seperti `store_name` dan `store_logo`. |
| Menampilkan semua pengaturan map | `store_settings` | Mengambil seluruh setting aktif dan mengubahnya menjadi object key-value. |
| Menampilkan semua pengaturan array | `store_settings` | Mengambil seluruh setting aktif dalam format array. |
| Detail satu pengaturan | `store_settings` | Mengambil setting aktif berdasarkan `setting_key`. |
| Batch update | `store_settings` | Melakukan upsert banyak setting dalam satu transaksi. |
| Upsert satu pengaturan | `store_settings` | Membuat setting baru jika belum ada, atau memperbarui nilai jika sudah ada. |
| Update satu pengaturan | `store_settings` | Memperbarui nilai setting berdasarkan `setting_key`. |
| Hapus pengaturan | `store_settings` | Soft delete setting dengan mengisi `deleted_at`. |

### 1. Tabel `store_settings`

Tabel utama untuk konfigurasi profil sistem/toko.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `store_setting_id` | UUID | Tidak | Primary key setting. |
| `setting_key` | varchar(50) | Tidak | Kunci setting. Format valid: huruf kecil dan underscore, contoh `store_name`. |
| `setting_value` | text | Tidak | Nilai setting. Bisa berupa teks biasa, URL, atau string JSON untuk konfigurasi kompleks. Untuk `store_logo`, nilai biasanya berasal dari `response.url` endpoint upload target `logo`. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Endpoint hanya memakai data dengan `deleted_at = null`. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Public info | `setting_key`, `setting_value`, `deleted_at` |
| Get map | `setting_key`, `setting_value`, `deleted_at` |
| Get array | `store_setting_id`, `setting_key`, `setting_value`, `created_at`, `updated_at`, `deleted_at` |
| Detail | `store_setting_id`, `setting_key`, `setting_value`, `created_at`, `updated_at`, `deleted_at` |
| Batch update | `setting_key`, `setting_value` |
| Upsert | `setting_key`, `setting_value`, `store_setting_id` |
| Update by key | `setting_key`, `setting_value`, `store_setting_id` |
| Delete | `setting_key`, `store_setting_id`, `deleted_at` |

### Catatan Alur Data

- Semua data pengaturan aktif difilter dengan `deleted_at = null`.
- `setting_key` wajib huruf kecil dan underscore, maksimal 50 karakter.
- `setting_value` maksimal 5000 karakter dari validasi request.
- Batch update memakai mekanisme upsert, sehingga key yang belum ada akan dibuat dan key yang sudah ada akan diperbarui.
- Delete setting menggunakan soft delete melalui field `store_settings.deleted_at`.

### Catatan Upload Logo Toko

Endpoint profil sistem tidak menerima file logo secara langsung. Untuk mengisi `store_logo`, frontend perlu upload file terlebih dahulu melalui endpoint upload, lalu menyimpan nilai `response.url` ke `store_settings.setting_value` dengan `setting_key = store_logo`.

Flow yang disarankan:

1. Upload logo ke `POST /api/upload/image/logo`.
2. Ambil nilai `response.url` dari response upload.
3. Simpan URL tersebut ke `store_logo` melalui `PATCH /api/store-setting/store_logo`, `POST /api/store-setting`, atau `PATCH /api/store-setting/batch`.

Detail kontrak upload logo tersedia di [`upload.md`](./upload.md).

---

## Daftar Konfigurasi Bawaan (Predefined Keys)
Sistem ini menggunakan pendekatan *key-value pair*. Berikut adalah beberapa kunci (`setting_key`) yang secara bawaan dibaca oleh sistem:
- `store_name`, `store_code`, `store_category`
- `store_address`, `store_logo`
- `store_phone`, `store_email`, `store_website`
- `store_instagram`, `store_facebook`, `store_whatsapp`
- `receipt_header`, `receipt_footer`
- `printer_receipt_config`, `printer_kitchen_config`
*(Anda juga tetap bisa menambah kunci custom apa pun yang hurufnya kecil dan mengandung _)*

---

## 1. Menampilkan Info Publik Toko (Public Info)

Digunakan untuk mengambil info profil yang sifatnya publik (seperti nama toko dan logo) tanpa membocorkan info internal lainnya. Dapat diakses oleh kasir maupun publik tanpa login.

- **Endpoint:** `GET /public/info`
- **Akses:** Public / All Roles (ADMIN, CASHIER, PUBLIC)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil info publik toko",
  "data": {
    "store_name": "Toko Kopi Senja",
    "store_logo": "https://your-project-ref.supabase.co/storage/v1/object/public/images/logos/0197f1d2-9bd0-7f57-bd11-2a03d23c2c9e.png",
    "store_address": "Jl. Mawar No 12"
  }
}
```

---

## 2. Menampilkan Seluruh Pengaturan (Map Format)

**[SANGAT DISARANKAN]** Endpoint ini mengembalikan semua pengaturan dalam bentuk *Object Map* (Key-Value) sehingga sangat mudah di-*binding* (dijahit) langsung ke variabel Form di FE tanpa perlu *looping array*.

- **Endpoint:** `GET /map`
- **Akses:** Protected (ADMIN)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil semua pengaturan",
  "data": {
    "store_name": "Toko Kopi Senja",
    "store_phone": "08123456789",
    "receipt_footer": "Terima kasih atas kunjungan Anda!",
    "printer_receipt_config": "{\"ip\": \"192.168.1.50\", \"port\": 9100}"
  }
}
```

---

## 3. Menampilkan Seluruh Pengaturan (Array Format)

Jika desain UI tabel membutuhkan format *array of objects* biasa, gunakan rute ini.

- **Endpoint:** `GET /`
- **Akses:** Protected (ADMIN)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil semua pengaturan",
  "data": {
    "total": 3,
    "records": [
      {
        "store_setting_id": "uuid-setting-1",
        "setting_key": "store_name",
        "setting_value": "Toko Kopi Senja",
        "created_at": "2024-01-01T10:00:00Z",
        "updated_at": "2024-01-02T10:00:00Z"
      }
    ]
  }
}
```

---

## 4. Melihat Detail Satu Pengaturan

- **Endpoint:** `GET /:setting_key`
- **Akses:** Protected (ADMIN)
- **Contoh URL:** `GET /api/store-setting/store_name`

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil detail pengaturan",
  "data": {
    "store_setting_id": "uuid-setting-1",
    "setting_key": "store_name",
    "setting_value": "Toko Kopi Senja",
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": "2024-01-02T10:00:00Z"
  }
}
```

---

## 5. Simpan Massal (Batch Update)

**[SANGAT DISARANKAN]** Endpoint ini adalah pasangan dari `GET /map`. Saat user menekan tombol "Simpan" pada halaman form berukuran besar, FE bisa langsung memborong pengiriman *update* beberapa field sekaligus.

- **Endpoint:** `PATCH /batch`
- **Akses:** Protected (ADMIN)

**Request Body (JSON):**
```json
{
  "settings": [
    {
      "setting_key": "store_name",
      "setting_value": "Toko Kopi Senja (Rebrand)"
    },
    {
      "setting_key": "store_phone",
      "setting_value": "0899999999"
    }
  ]
}
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Pengaturan berhasil diperbarui massal",
  "data": {
    "success": true,
    "message": "Pengaturan berhasil diperbarui massal",
    "updated_count": 2
  }
}
```

---

## 6. Buat Baru / Timpa Satu Pengaturan (Upsert)

Fitur *Create or Update*. Jika *key* belum ada di DB, maka akan dibuatkan. Jika sudah ada, akan ditimpa nilainya.

- **Endpoint:** `POST /`
- **Akses:** Protected (ADMIN)

**Request Body (JSON):**
```json
{
  "setting_key": "store_instagram",
  "setting_value": "@kopisenja.id"
}
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Pengaturan berhasil disimpan",
  "data": {
    "store_setting_id": "uuid-setting-5",
    "setting_key": "store_instagram",
    "setting_value": "@kopisenja.id",
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": null
  }
}
```

---

## 7. Update Satu Pengaturan via URL
*(Hanya untuk memperbarui, jika key tidak ditemukan akan mengembalikan 404)*
- **Endpoint:** `PATCH /:setting_key`
- **Akses:** Protected (ADMIN)
- **Request Body:** `{"setting_value": "value baru"}`

## 8. Menghapus Pengaturan Spesifik
*(Sangat jarang digunakan, kecuali membersihkan custom key yang tidak terpakai)*
- **Endpoint:** `DELETE /:setting_key`
- **Akses:** Protected (ADMIN)
- **Request Body:** (Tidak ada)
