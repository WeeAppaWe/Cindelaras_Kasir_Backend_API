# Dokumentasi API Satuan Ukur (Unit Measure)

Dokumentasi ini menjelaskan rute API untuk mengelola master data Satuan Ukur, misalnya `Kilogram`, `Gram`, `Liter`, `Pcs`, dan lainnya.

**Catatan Penting:** Semua rute pada modul ini memerlukan hak akses dengan role **ADMIN**.

Base URL Utama: `/api/unit-measure`

---

## Tabel dan Field yang Dipakai

Modul satuan ukur memakai tabel utama `unit_measures`. Tabel `ingredients` juga dibaca untuk validasi hapus satuan yang masih digunakan bahan aktif.

### Ringkasan Penggunaan Tabel

| Proses | Tabel yang Dipakai | Keterangan |
| :--- | :--- | :--- |
| Menampilkan daftar satuan | `unit_measures` | Mengambil data satuan aktif dengan pagination dan pencarian. |
| Dropdown satuan bahan | `unit_measures` | Mengambil daftar satuan aktif tanpa pagination untuk form bahan. |
| Detail satuan | `unit_measures` | Mengambil satu satuan berdasarkan `unit_measure_id`. |
| Membuat satuan | `unit_measures` | Validasi nama duplikat, lalu membuat satuan baru. |
| Mengubah satuan | `unit_measures` | Validasi satuan ada dan nama tidak dipakai satuan lain. |
| Menghapus satuan | `unit_measures`, `ingredients` | Validasi satuan tidak dipakai bahan aktif, lalu soft delete. |

### 1. Tabel `unit_measures`

Tabel utama untuk master satuan ukur.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `unit_measure_id` | UUID | Tidak | Primary key satuan ukur. |
| `name` | varchar(50) | Tidak | Nama satuan, misalnya `Kilogram`, `Gram`, `Liter`, atau `Pcs`. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Endpoint satuan hanya memakai data dengan `deleted_at = null`. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List | `unit_measure_id`, `name`, `created_at`, `updated_at`, `deleted_at` |
| Dropdown | `unit_measure_id`, `name`, `deleted_at` |
| Search | `name` |
| Detail | `unit_measure_id`, `name`, `created_at`, `updated_at`, `deleted_at` |
| Create | `name` |
| Update | `unit_measure_id`, `name` |
| Delete | `unit_measure_id`, `deleted_at` |

### 2. Tabel `ingredients`

Tabel bahan dipakai untuk memastikan satuan ukur tidak dihapus saat masih digunakan.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `ingredient_id` | UUID | Tidak | Primary key bahan. |
| `unit_id` | UUID | Tidak | Foreign key ke tabel `unit_measures`. |
| `name` | varchar(100) | Tidak | Nama bahan. |
| `type` | varchar(20) | Tidak | Tipe bahan, misalnya raw/semi. |
| `stock_qty` | decimal(10,2) | Tidak | Jumlah stok saat ini. |
| `min_stock` | decimal(10,2) | Tidak | Batas minimum stok. |
| `avg_cost` | decimal(15,2) | Tidak | Harga rata-rata bahan. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada modul satuan ukur:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Delete satuan | `unit_id`, `deleted_at` untuk mengecek bahan aktif yang masih memakai satuan tersebut. |

### Relasi Tabel

```text
ingredients.unit_id -> unit_measures.unit_measure_id
```

### Catatan Alur Data

- Nama satuan dicek duplikat secara case-insensitive.
- Hapus satuan memakai soft delete dengan mengisi `unit_measures.deleted_at`.
- Satuan tidak dapat dihapus jika masih digunakan bahan aktif (`ingredients.deleted_at = null`).
- Endpoint dropdown master satuan tersedia di `/api/unit-measure/options`.
- Endpoint dropdown satuan untuk bahan tetap tersedia di `/api/ingredient/raw/units` dan `/api/ingredient/semi/units`.

---

## 1. Menampilkan Pilihan Satuan Ukur untuk Dropdown

- **Endpoint:** `GET /options`
- **Akses:** Protected (ADMIN)
- **Query Params:** Tidak ada
- **Request Body:** Tidak ada

Endpoint ini mengembalikan semua satuan aktif dalam format ringan tanpa pagination.

**Response Berhasil (200 OK):**
```json
{
  "response": [
    {
      "unit_measure_id": "660e8400-e29b-41d4-a716-446655440001",
      "name": "Kilogram"
    },
    {
      "unit_measure_id": "660e8400-e29b-41d4-a716-446655440002",
      "name": "Liter"
    }
  ],
  "metaData": {
    "message": "Berhasil mengambil data pilihan satuan",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

## 2. Menampilkan Semua Satuan Ukur

- **Endpoint:** `GET /`
- **Akses:** Protected (ADMIN)
- **Query Params:**
  - `batch` optional, default `1`
  - `size` optional, default `10`, maksimal `100`
  - `search` optional
- **Request Body:** Tidak ada

**Response Berhasil (200 OK):**
```json
{
  "response": {
    "page": {
      "total_record_count": 3,
      "batch_number": 1,
      "batch_size": 3,
      "max_batch_size": 10
    },
    "records": [
      {
        "unit_measure_id": "660e8400-e29b-41d4-a716-446655440001",
        "name": "Kilogram",
        "created_at": "2026-01-01T00:00:00.000Z",
        "updated_at": null
      }
    ]
  },
  "metaData": {
    "message": "Berhasil mengambil data satuan",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

## 3. Menampilkan Detail Satuan Ukur

- **Endpoint:** `GET /:unit_measure_id`
- **Akses:** Protected (ADMIN)
- **Request Body:** Tidak ada

**Response Berhasil (200 OK):**
```json
{
  "response": {
    "unit_measure_id": "660e8400-e29b-41d4-a716-446655440001",
    "name": "Kilogram",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": null
  },
  "metaData": {
    "message": "Berhasil mengambil detail satuan",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

## 4. Membuat Satuan Ukur

- **Endpoint:** `POST /`
- **Akses:** Protected (ADMIN)

**Request Body:**
```json
{
  "name": "Kilogram"
}
```

**Response Berhasil (201 Created):**
```json
{
  "response": {
    "unit_measure_id": "660e8400-e29b-41d4-a716-446655440001",
    "name": "Kilogram",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": null
  },
  "metaData": {
    "message": "Satuan berhasil dibuat",
    "code": 201,
    "response_code": "0001"
  }
}
```

---

## 5. Mengubah Satuan Ukur

- **Endpoint:** `PATCH /:unit_measure_id`
- **Akses:** Protected (ADMIN)

**Request Body:**
```json
{
  "name": "Gram"
}
```

**Response Berhasil (200 OK):**
```json
{
  "response": {
    "unit_measure_id": "660e8400-e29b-41d4-a716-446655440001",
    "name": "Gram",
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-02T00:00:00.000Z"
  },
  "metaData": {
    "message": "Satuan berhasil diperbarui",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

## 6. Menghapus Satuan Ukur

- **Endpoint:** `DELETE /:unit_measure_id`
- **Akses:** Protected (ADMIN)

**Response Berhasil (200 OK):**
```json
{
  "response": {
    "success": true,
    "message": "Satuan berhasil dihapus"
  },
  "metaData": {
    "message": "Satuan berhasil dihapus",
    "code": 200,
    "response_code": "0000"
  }
}
```

**Catatan:** Satuan ukur tidak bisa dihapus jika masih digunakan oleh bahan aktif.

---

## Endpoint Dropdown yang Menggunakan Satuan Ukur

Endpoint dropdown untuk form ingredient tetap tersedia melalui:

- `GET /api/unit-measure/options`
- `GET /api/ingredient/raw/units`
- `GET /api/ingredient/semi/units`

Ketiganya mengembalikan array sederhana tanpa pagination.
