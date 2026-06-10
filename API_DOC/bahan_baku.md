# Dokumentasi API Bahan Baku (Ingredient Management)

Dokumentasi ini menjelaskan rute API (endpoints) yang digunakan oleh Frontend untuk halaman **Manajemen Bahan Baku**. Rute ini difokuskan untuk mengelola stok, harga rata-rata (*average cost*), dan batas minimum stok (*minimum stock*) dari barang mentah yang dibeli dari *supplier*.

**Catatan Penting:** Semua rute pada modul bahan baku memerlukan hak akses dengan *role* **ADMIN**.

Base URL Utama: `/api/ingredient/raw`

Endpoint dropdown semua jenis bahan berada di: `/api/ingredient/options`

---

## Tabel dan Field yang Dipakai

Modul bahan baku memakai tabel utama `ingredients` dengan nilai `type = RAW`. Tabel `unit_measures` juga dipakai untuk relasi satuan dan endpoint dropdown satuan bahan baku.

### Ringkasan Penggunaan Tabel

| Proses | Tabel yang Dipakai | Keterangan |
| :--- | :--- | :--- |
| Notifikasi stok menipis | `ingredients`, `unit_measures` | Mengambil bahan baku aktif dengan `stock_qty < min_stock` dan data satuannya. |
| Dropdown bahan baku | `ingredients`, `unit_measures` | Mengambil bahan baku aktif (`type = RAW`) tanpa pagination untuk pilihan form. |
| Dropdown semua jenis bahan | `ingredients`, `unit_measures` | Mengambil semua bahan aktif (`RAW` dan `SEMI`) tanpa pagination untuk pilihan form. |
| Menampilkan daftar bahan baku | `ingredients`, `unit_measures` | Mengambil bahan baku aktif dengan pagination, pencarian, filter satuan, dan relasi satuan. |
| Detail bahan baku | `ingredients`, `unit_measures` | Mengambil satu bahan baku berdasarkan `ingredient_id` beserta data satuannya. |
| Menambah bahan baku | `ingredients`, `unit_measures` | Validasi nama duplikat dan validasi `unit_id`, lalu membuat bahan baru dengan `type = RAW`. |
| Mengubah bahan baku | `ingredients`, `unit_measures` | Validasi bahan ada, validasi nama tidak dipakai bahan lain, dan validasi satuan jika `unit_id` dikirim. |
| Menghapus bahan baku | `ingredients` | Soft delete bahan baku dengan mengisi `deleted_at`. |
| Dropdown satuan | `unit_measures` | Mengambil daftar satuan aktif untuk pilihan form bahan baku. |

### 1. Tabel `ingredients`

Tabel utama untuk data bahan. Pada modul bahan baku, hanya data dengan `type = RAW` dan `deleted_at = null` yang dipakai.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `ingredient_id` | UUID | Tidak | Primary key bahan. |
| `unit_id` | UUID | Tidak | Foreign key ke tabel `unit_measures`. |
| `name` | varchar(100) | Tidak | Nama bahan baku. Dipakai untuk pencarian dan validasi duplikat. |
| `type` | varchar(20) | Tidak | Jenis bahan. Untuk endpoint ini nilainya `RAW`. |
| `stock_qty` | decimal(10,2) | Tidak | Jumlah stok bahan saat ini. |
| `min_stock` | decimal(10,2) | Tidak | Batas minimum stok untuk notifikasi stok menipis. |
| `avg_cost` | decimal(15,2) | Tidak | Harga rata-rata per satuan bahan. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Endpoint bahan baku hanya memakai data dengan `deleted_at = null`. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Dropdown bahan baku | `ingredient_id`, `name`, `type`, `unit_id`, `deleted_at` |
| Dropdown semua jenis bahan | `ingredient_id`, `name`, `type`, `unit_id`, `deleted_at` |
| List | `ingredient_id`, `name`, `type`, `stock_qty`, `min_stock`, `avg_cost`, `created_at`, `updated_at`, `unit_id`, `deleted_at` |
| Search | `name` |
| Filter satuan | `unit_id` |
| Low stock | `stock_qty`, `min_stock`, `type`, `deleted_at` |
| Detail | `ingredient_id`, `name`, `type`, `stock_qty`, `min_stock`, `avg_cost`, `created_at`, `updated_at`, `unit_id`, `deleted_at` |
| Create | `name`, `unit_id`, `type`, `stock_qty`, `min_stock`, `avg_cost` |
| Update | `ingredient_id`, `name`, `unit_id`, `min_stock`, `avg_cost` |
| Delete | `ingredient_id`, `deleted_at` |

### 2. Tabel `unit_measures`

Tabel master satuan ukur yang direlasikan ke bahan baku.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `unit_measure_id` | UUID | Tidak | Primary key satuan ukur. |
| `name` | varchar(50) | Tidak | Nama satuan, misalnya `Kilogram`, `Gram`, `Liter`, atau `Pcs`. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Dropdown dan validasi hanya memakai satuan aktif. |

Field yang dipakai pada modul bahan baku:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List/detail/low stock/dropdown bahan | `unit_measure_id`, `name` melalui relasi `unit`. |
| Create/update | `unit_measure_id`, `deleted_at` untuk validasi `unit_id` masih aktif. |
| Dropdown satuan | `unit_measure_id`, `name`, `deleted_at` |

### Relasi Tabel

```text
ingredients.unit_id -> unit_measures.unit_measure_id
```

### Catatan Alur Data

- Nama bahan baku dicek duplikat secara case-insensitive untuk data `type = RAW`.
- Bahan baku dihapus dengan soft delete melalui field `ingredients.deleted_at`.
- `stock_qty` tidak diubah lewat endpoint update bahan baku. Perubahan stok dilakukan oleh fitur stok seperti penerimaan stok atau stock opname.
- Notifikasi stok menipis membandingkan `ingredients.stock_qty` dengan `ingredients.min_stock`.
- Endpoint dropdown bahan baku mengembalikan data ringan tanpa pagination.
- Endpoint dropdown semua jenis bahan mengembalikan bahan `RAW` dan `SEMI` aktif dalam satu response.

---

## 1. Notifikasi Stok Menipis (Low Stock Alert)

Endpoint ini mengambil daftar bahan baku yang stok saat ini (`stock_qty`) berada di bawah atau sama dengan batas minimum (`min_stock`). Sangat cocok untuk ditampilkan di *Dashboard* atau sebagai notifikasi.

- **Endpoint:** `GET /low-stock`
- **Akses:** Protected (ADMIN)

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Berhasil mengambil peringatan stok menipis",
  "data": {
    "total_count": 2,
    "records": [
      {
        "ingredient_id": "uuid-ing-1",
        "name": "Kopi Arabica",
        "type": "RAW",
        "stock_qty": 50,
        "min_stock": 100,
        "avg_cost": 250,
        "created_at": "2024-01-01T10:00:00Z",
        "updated_at": "2024-01-02T10:00:00Z",
        "unit": {
          "unit_measure_id": "uuid-unit-1",
          "name": "gr"
        }
      },
      {
        "ingredient_id": "uuid-ing-2",
        "name": "Gula Pasir",
        "type": "RAW",
        "stock_qty": 0,
        "min_stock": 1000,
        "avg_cost": 15,
        "created_at": "2024-01-01T10:00:00Z",
        "updated_at": null,
        "unit": {
          "unit_measure_id": "uuid-unit-1",
          "name": "gr"
        }
      }
    ]
  }
}
```

---

## 2. Menampilkan Pilihan Bahan Baku untuk Dropdown

Endpoint ini mengambil semua bahan baku aktif (`type = RAW`) dalam format ringan tanpa pagination.

- **Endpoint:** `GET /options`
- **Akses:** Protected (ADMIN)
- **Query Parameters:** Tidak ada

**Contoh Penggunaan URL:**
`GET /api/ingredient/raw/options`

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Berhasil mengambil data pilihan bahan baku",
  "data": [
    {
      "ingredient_id": "uuid-ing-1",
      "name": "Tepung Terigu",
      "type": "RAW",
      "unit": {
        "unit_measure_id": "uuid-unit-kg",
        "name": "Kilogram"
      }
    },
    {
      "ingredient_id": "uuid-ing-2",
      "name": "Gula Pasir",
      "type": "RAW",
      "unit": {
        "unit_measure_id": "uuid-unit-kg",
        "name": "Kilogram"
      }
    }
  ]
}
```

---

## 3. Menampilkan Pilihan Semua Jenis Bahan untuk Dropdown

Endpoint ini mengambil semua bahan aktif, baik bahan baku (`RAW`) maupun bahan setengah jadi (`SEMI`), dalam format ringan tanpa pagination.

- **Endpoint:** `GET /api/ingredient/options`
- **Akses:** Protected (ADMIN)
- **Query Parameters:** Tidak ada

**Contoh Penggunaan URL:**
`GET /api/ingredient/options`

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Berhasil mengambil data pilihan bahan",
  "data": [
    {
      "ingredient_id": "uuid-ing-1",
      "name": "Tepung Terigu",
      "type": "RAW",
      "unit": {
        "unit_measure_id": "uuid-unit-kg",
        "name": "Kilogram"
      }
    },
    {
      "ingredient_id": "uuid-ing-3",
      "name": "Adonan Pizza",
      "type": "SEMI",
      "unit": {
        "unit_measure_id": "uuid-unit-porsi",
        "name": "Porsi"
      }
    }
  ]
}
```

---

## 4. Menampilkan Daftar Bahan Baku

Endpoint ini mengambil seluruh daftar bahan baku utama dengan dukungan *pagination* dan beberapa filter pendukung.

- **Endpoint:** `GET /`
- **Akses:** Protected (ADMIN)

### Query Parameters

| Parameter | Tipe | Format / Pilihan | Deskripsi |
| :--- | :--- | :--- | :--- |
| `batch` | Number | Angka bulat | Halaman ke berapa (default: `1`) |
| `size` | Number | Angka bulat | Jumlah per halaman (default: `10`) |
| `search` | String | Bebas | Pencarian nama bahan baku |
| `unit_id` | UUID | Format UUID | Filter berdasarkan tipe satuan |
| `low_stock`| Boolean| `true` / `false` | Jika `true`, hanya menampilkan item yang di bawah `min_stock` |

**Contoh Penggunaan URL:**
`GET /api/ingredient/raw?batch=1&size=20&search=susu`

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Berhasil mengambil data bahan baku",
  "data": {
    "page": {
      "total_record_count": 45,
      "batch_number": 1,
      "batch_size": 20,
      "max_batch_size": 100
    },
    "records": [
      {
        "ingredient_id": "uuid-ing-1",
        "name": "Susu Segar",
        "type": "RAW",
        "stock_qty": 5000,
        "min_stock": 2000,
        "avg_cost": 20,
        "created_at": "2024-01-01T10:00:00Z",
        "updated_at": null,
        "unit": {
          "unit_measure_id": "uuid-unit-ml",
          "name": "ml"
        }
      }
    ]
  }
}
```

---

## 5. Menambah Bahan Baku Baru

- **Endpoint:** `POST /`
- **Akses:** Protected (ADMIN)

### Request Body (JSON)

| Field | Tipe | Validasi | Deskripsi |
| :--- | :--- | :--- | :--- |
| `name` | String | Wajib, min 2, max 100 char | Nama bahan baku |
| `unit_id` | String | Wajib, format UUID | ID dari *unit measure* (satuan ukur) |
| `min_stock`| Number | Wajib, >= 0 | Batas minimal stok sebelum peringatan |
| `avg_cost` | Number | Opsional, >= 0 | Harga rata-rata per satuan. Default: 0 |
| `stock_qty`| Number | Opsional, >= 0 | Stok awal saat bahan dibuat. Default: 0 |

**Contoh Request:**
```json
{
  "name": "Sirup Karamel",
  "unit_id": "uuid-unit-ml",
  "min_stock": 1000,
  "avg_cost": 50,
  "stock_qty": 5000
}
```

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Berhasil membuat bahan baku",
  "data": {
    "ingredient_id": "uuid-ing-3",
    "name": "Sirup Karamel",
    "type": "RAW",
    "stock_qty": 5000,
    "min_stock": 1000,
    "avg_cost": 50,
    "created_at": "2024-01-05T08:00:00Z",
    "updated_at": null,
    "unit": {
      "unit_measure_id": "uuid-unit-ml",
      "name": "ml"
    }
  }
}
```

---

## 6. Melihat Detail Bahan Baku

- **Endpoint:** `GET /:ingredient_id`
- **Akses:** Protected (ADMIN)

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Berhasil mengambil detail bahan baku",
  "data": {
    "ingredient_id": "uuid-ing-3",
    "name": "Sirup Karamel",
    "type": "RAW",
    "stock_qty": 5000,
    "min_stock": 1000,
    "avg_cost": 50,
    "created_at": "2024-01-05T08:00:00Z",
    "updated_at": null,
    "unit": {
      "unit_measure_id": "uuid-unit-ml",
      "name": "ml"
    }
  }
}
```

---

## 7. Memperbarui Data Bahan Baku

Digunakan untuk mengedit profil bahan baku (seperti nama, *min stock*, batas satuan, atau harga *cost* rata-rata).
**Catatan:** Kuantitas stok (`stock_qty`) **tidak bisa** diedit melalui endpoint ini. Stok hanya bisa berubah lewat fitur penerimaan stok (*Inventory Receipt*) atau *Stock Opname*.

- **Endpoint:** `PATCH /:ingredient_id`
- **Akses:** Protected (ADMIN)

### Request Body (JSON)

Semua *field* bersifat opsional (kirim yang ingin diubah saja):

```json
{
  "name": "Sirup Karamel Spesial",
  "min_stock": 1500
}
```

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Berhasil memperbarui bahan baku",
  "data": {
    "ingredient_id": "uuid-ing-3",
    "name": "Sirup Karamel Spesial",
    "type": "RAW",
    "stock_qty": 5000,
    "min_stock": 1500,
    "avg_cost": 50,
    "created_at": "2024-01-05T08:00:00Z",
    "updated_at": "2024-01-06T09:30:00Z",
    "unit": {
      "unit_measure_id": "uuid-unit-ml",
      "name": "ml"
    }
  }
}
```

---

## 8. Menghapus Bahan Baku (Soft Delete)

- **Endpoint:** `DELETE /:ingredient_id`
- **Akses:** Protected (ADMIN)
- **Request Body:** (Tidak ada)

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Berhasil menghapus bahan baku",
  "data": {
    "success": true,
    "message": "Bahan baku berhasil dihapus"
  }
}
```
