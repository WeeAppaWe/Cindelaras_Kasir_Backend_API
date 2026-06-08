# Dokumentasi API Bahan Setengah Jadi (Semi Ingredient)

Dokumentasi ini menjelaskan rute API (endpoints) yang digunakan oleh Frontend untuk halaman **Manajemen Bahan Setengah Jadi**. Bahan Setengah Jadi (SEMI) adalah bahan olahan (seperti adonan, sirup buatan sendiri, sambal) yang diracik dari gabungan beberapa bahan baku mentah (RAW) sebelum akhirnya dikonversi menjadi *Menu* untuk dijual.

**Catatan Penting:** Semua rute pada modul ini memerlukan hak akses dengan *role* **ADMIN**.

Dokumentasi ini dibagi menjadi dua bagian:
- **Bagian A:** Manajemen Profil Bahan Setengah Jadi (Katalog, Target Yield, HPP)
- **Bagian B:** Manajemen Resep/Komposisi Penyusun Bahan Setengah Jadi

Base URL Utama: `/api/ingredient/semi`

---

## Tabel dan Field yang Dipakai

Modul bahan setengah jadi memakai tabel utama `ingredients` dengan nilai `type = SEMI`. Untuk resep/komposisi, modul ini memakai tabel `ingredient_compositions` yang menghubungkan bahan setengah jadi sebagai parent dengan bahan baku sebagai child. Tabel `unit_measures` dipakai untuk relasi satuan bahan dan dropdown satuan.

### Ringkasan Penggunaan Tabel

| Proses | Tabel yang Dipakai | Keterangan |
| :--- | :--- | :--- |
| Menampilkan daftar bahan setengah jadi | `ingredients`, `unit_measures` | Mengambil bahan aktif dengan `type = SEMI`, pagination, pencarian, filter satuan, dan data satuan. |
| Detail bahan setengah jadi | `ingredients`, `unit_measures`, `ingredient_compositions` | Mengambil profil bahan, satuan, komposisi aktif, bahan penyusun, dan data biaya untuk HPP. |
| Menambah bahan setengah jadi | `ingredients`, `unit_measures` | Validasi nama duplikat dan validasi `unit_id`, lalu membuat bahan baru dengan `type = SEMI`. |
| Mengubah bahan setengah jadi | `ingredients`, `unit_measures` | Validasi bahan ada, validasi nama tidak dipakai bahan lain, dan validasi satuan jika `unit_id` dikirim. |
| Menghapus bahan setengah jadi | `ingredients` | Soft delete bahan setengah jadi dengan mengisi `deleted_at`. |
| Dropdown satuan | `unit_measures` | Mengambil daftar satuan aktif untuk pilihan form bahan setengah jadi. |
| Dropdown bahan baku komposisi | `ingredients`, `unit_measures` | Mengambil bahan aktif dengan `type = RAW` untuk dipilih sebagai bahan penyusun. |
| Preview HPP | `ingredients`, `unit_measures` | Mengambil `avg_cost` dan nama satuan dari bahan penyusun yang dikirim pada request. |
| Tambah/ubah/hapus komposisi | `ingredient_compositions`, `ingredients`, `unit_measures` | Menyimpan relasi parent-child bahan, menghitung subtotal, lalu menghitung ulang `avg_cost` bahan setengah jadi. |
| Recalculate HPP | `ingredients`, `ingredient_compositions`, `unit_measures` | Menghitung ulang HPP berdasarkan komposisi aktif dan memperbarui `ingredients.avg_cost` pada bahan setengah jadi. |

### 1. Tabel `ingredients`

Tabel utama untuk data bahan. Pada modul ini, tabel yang sama dipakai untuk dua konteks:

- Bahan setengah jadi sebagai parent dengan `type = SEMI`.
- Bahan baku penyusun sebagai child dengan `type = RAW`.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `ingredient_id` | UUID | Tidak | Primary key bahan. |
| `unit_id` | UUID | Tidak | Foreign key ke tabel `unit_measures`. |
| `name` | varchar(100) | Tidak | Nama bahan. Dipakai untuk pencarian dan validasi duplikat. |
| `type` | varchar(20) | Tidak | Jenis bahan. Untuk profil bahan setengah jadi nilainya `SEMI`; untuk bahan penyusun umumnya `RAW`. |
| `stock_qty` | decimal(10,2) | Tidak | Jumlah stok bahan saat ini. Bahan setengah jadi dibuat dengan stok awal `0`. |
| `min_stock` | decimal(10,2) | Tidak | Batas minimum stok. |
| `avg_cost` | decimal(15,2) | Tidak | HPP rata-rata per satuan. Untuk bahan setengah jadi dihitung dari komposisi dan `target_yield`. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Endpoint hanya memakai data dengan `deleted_at = null`. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List profil SEMI | `ingredient_id`, `name`, `type`, `stock_qty`, `min_stock`, `avg_cost`, `created_at`, `updated_at`, `unit_id`, `deleted_at` |
| Search profil SEMI | `name` |
| Filter satuan | `unit_id` |
| Detail profil SEMI | `ingredient_id`, `name`, `type`, `stock_qty`, `min_stock`, `avg_cost`, `created_at`, `updated_at`, `unit_id`, `deleted_at` |
| Create profil SEMI | `name`, `unit_id`, `type`, `stock_qty`, `min_stock`, `avg_cost` |
| Update profil SEMI | `ingredient_id`, `name`, `unit_id`, `min_stock` |
| Delete profil SEMI | `ingredient_id`, `deleted_at` |
| Dropdown bahan penyusun | `ingredient_id`, `name`, `type`, `avg_cost`, `stock_qty`, `unit_id`, `deleted_at` |
| Kalkulasi HPP | `ingredient_id`, `name`, `avg_cost`, `unit_id`, `deleted_at` |
| Recalculate HPP | `ingredient_id`, `avg_cost` pada bahan setengah jadi parent |

### 2. Tabel `ingredient_compositions`

Tabel resep/komposisi untuk menghubungkan bahan setengah jadi dengan bahan penyusunnya.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `ingredient_composition_id` | UUID | Tidak | Primary key komposisi. |
| `parent_id` | UUID | Tidak | Foreign key ke `ingredients.ingredient_id` untuk bahan setengah jadi parent (`type = SEMI`). |
| `child_id` | UUID | Tidak | Foreign key ke `ingredients.ingredient_id` untuk bahan penyusun (`type = RAW`). |
| `qty_needed` | decimal(10,2) | Tidak | Jumlah bahan penyusun yang dibutuhkan. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Komposisi aktif memakai `deleted_at = null`. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List komposisi | `ingredient_composition_id`, `parent_id`, `child_id`, `qty_needed`, `deleted_at` |
| Detail bahan setengah jadi | `parent_id`, `child_id`, `qty_needed`, `deleted_at` |
| Tambah komposisi | `parent_id`, `child_id`, `qty_needed` |
| Bulk update komposisi | `parent_id`, `child_id`, `qty_needed`, `deleted_at` |
| Update komposisi | `ingredient_composition_id`, `parent_id`, `qty_needed` |
| Hapus komposisi | `ingredient_composition_id`, `parent_id`, `deleted_at` |
| Kalkulasi HPP | `parent_id`, `child_id`, `qty_needed`, `deleted_at` |

### 3. Tabel `unit_measures`

Tabel master satuan ukur yang direlasikan ke bahan setengah jadi dan bahan penyusunnya.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `unit_measure_id` | UUID | Tidak | Primary key satuan ukur. |
| `name` | varchar(50) | Tidak | Nama satuan, misalnya `Kilogram`, `Gram`, `Liter`, atau `Pcs`. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Dropdown dan validasi hanya memakai satuan aktif. |

Field yang dipakai pada modul bahan setengah jadi:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List/detail profil SEMI | `unit_measure_id`, `name` melalui relasi `unit`. |
| Create/update profil SEMI | `unit_measure_id`, `deleted_at` untuk validasi `unit_id` masih aktif. |
| Dropdown satuan | `unit_measure_id`, `name`, `deleted_at` |
| Komposisi dan HPP | `unit_measure_id`, `name` dari satuan bahan penyusun. |

### Relasi Tabel

```text
ingredients.unit_id -> unit_measures.unit_measure_id
ingredient_compositions.parent_id -> ingredients.ingredient_id
ingredient_compositions.child_id -> ingredients.ingredient_id
```

### Catatan Alur Data

- Nama bahan setengah jadi dicek duplikat secara case-insensitive untuk data `type = SEMI`.
- Bahan setengah jadi dihapus dengan soft delete melalui field `ingredients.deleted_at`.
- Komposisi dihapus dengan soft delete melalui field `ingredient_compositions.deleted_at`.
- HPP bahan setengah jadi dihitung dari `qty_needed * avg_cost` pada bahan penyusun, lalu dibagi `target_yield`.
- `target_yield` tidak disimpan sebagai field tabel pada schema saat ini; nilainya dipakai dari request saat preview atau recalculate HPP.

---

## BAGIAN A: Manajemen Profil Bahan Setengah Jadi

### 1. Menampilkan Daftar Bahan Setengah Jadi
Endpoint ini mengambil seluruh daftar bahan setengah jadi dengan dukungan *pagination* dan beberapa filter.

- **Endpoint:** `GET /`
- **Akses:** Protected (ADMIN)

**Query Parameters (Opsional):**
- `batch` (Number): Halaman ke berapa (default: `1`)
- `size` (Number): Jumlah per halaman (default: `10`)
- `search` (String): Pencarian nama bahan
- `unit_id` (UUID): Filter berdasarkan tipe satuan

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil data bahan setengah jadi",
  "data": {
    "page": {
      "total_record_count": 5,
      "batch_number": 1,
      "batch_size": 10,
      "max_batch_size": 100
    },
    "records": [
      {
        "ingredient_id": "uuid-semi-1",
        "name": "Adonan Kopi Literan",
        "type": "SEMI",
        "stock_qty": 10,
        "min_stock": 2,
        "avg_cost": 15000,
        "created_at": "2024-01-01T10:00:00Z",
        "updated_at": null,
        "unit": {
          "unit_measure_id": "uuid-unit-botol",
          "name": "botol"
        }
      }
    ]
  }
}
```

### 2. Tambah Bahan Setengah Jadi Baru
Berbeda dengan bahan baku mentah, bahan setengah jadi membutuhkan `target_yield` (jumlah satuan hasil jadi setelah dimasak/diracik, berguna untuk hitung HPP per satuan).

- **Endpoint:** `POST /`
- **Akses:** Protected (ADMIN)

**Request Body (JSON):**
```json
{
  "name": "Sirup Vanila Homemade",
  "unit_id": "uuid-unit-ml",
  "min_stock": 500,
  "target_yield": 1000
}
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil membuat bahan setengah jadi",
  "data": {
    "ingredient_id": "uuid-semi-2",
    "name": "Sirup Vanila Homemade",
    "type": "SEMI",
    "stock_qty": 0,
    "min_stock": 500,
    "avg_cost": 0,
    "created_at": "2024-01-05T08:00:00Z",
    "updated_at": null,
    "unit": {
      "unit_measure_id": "uuid-unit-ml",
      "name": "ml"
    }
  }
}
```

### 3. Melihat Detail Bahan Setengah Jadi
Endpoint ini mengembalikan profil bahan, sekaligus merender otomatis _array_ resep/komposisi (`child_compositions`) dari bahan setengah jadi tersebut.

- **Endpoint:** `GET /:ingredient_id`
- **Akses:** Protected (ADMIN)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil detail bahan setengah jadi",
  "data": {
    "ingredient_id": "uuid-semi-1",
    "name": "Sirup Vanila Homemade",
    "type": "SEMI",
    "stock_qty": 500,
    "min_stock": 100,
    "avg_cost": 15,
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": null,
    "unit": {
      "unit_measure_id": "uuid-unit-ml",
      "name": "ml"
    },
    "total_hpp": 15000,
    "target_yield": 1000,
    "child_compositions": [
      {
        "ingredient_composition_id": "uuid-comp-1",
        "child_id": "uuid-ing-gula",
        "qty_needed": 500,
        "child_ingredient": {
          "ingredient_id": "uuid-ing-gula",
          "name": "Gula Pasir",
          "avg_cost": 20,
          "unit": {
            "unit_measure_id": "uuid-unit-gr",
            "name": "gr"
          }
        }
      }
    ]
  }
}
```

### 4. Memperbarui & Menghapus Bahan Setengah Jadi
- **Update (`PATCH /:ingredient_id`)**: Menerima parameter `name`, `unit_id`, `min_stock`, atau `target_yield` secara opsional. Format balasan berupa data *ingredient* yang sudah diubah.
- **Soft Delete (`DELETE /:ingredient_id`)**: Menghapus data dari peredaran tanpa menghapus permanen dari *database*.

---

## BAGIAN B: Manajemen Komposisi / Resep Bahan

Base URL Tambahan: `/api/ingredient/semi/composition` dan `/api/ingredient/semi/:ingredient_id/composition`

### 1. Daftar Bahan Baku Mentah Tersedia (Dropdown)
Endpoint utilitas untuk form UI ketika pengguna ingin memilih bahan baku mentah (RAW) untuk ditambahkan sebagai resep.
- **Endpoint:** `GET /composition/available-ingredients`
- **Akses:** Protected (ADMIN)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil bahan baku yang tersedia",
  "data": [
    {
      "ingredient_id": "uuid-ing-gula",
      "name": "Gula Pasir",
      "avg_cost": 20,
      "unit": {
        "unit_measure_id": "uuid-unit-gr",
        "name": "gr"
      }
    }
  ]
}
```

### 2. Preview Kalkulasi HPP (Tanpa Menyimpan)
Digunakan ketika *user* sedang meracik resep di halaman FE dan ingin melihat **estimasi HPP** sebelum menekan tombol "Simpan".
- **Endpoint:** `POST /composition/preview-hpp`
- **Akses:** Protected (ADMIN)

**Request Body (JSON):**
```json
{
  "target_yield": 1000,
  "compositions": [
    {
      "child_id": "uuid-ing-gula",
      "qty_needed": 500
    }
  ]
}
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Preview HPP berhasil",
  "data": {
    "total_hpp": 10000,
    "target_yield": 1000,
    "hpp_per_unit": 10,
    "composition_count": 1,
    "compositions": [
      {
        "ingredient_name": "Gula Pasir",
        "qty_needed": 500,
        "unit_name": "gr",
        "unit_cost": 20,
        "subtotal": 10000
      }
    ]
  }
}
```

### 3. Menambah Satu Komposisi ke Bahan Setengah Jadi
- **Endpoint:** `POST /:ingredient_id/composition`
- **Akses:** Protected (ADMIN)

**Request Body (JSON):**
```json
{
  "child_id": "uuid-ing-gula",
  "qty_needed": 500
}
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Komposisi berhasil ditambahkan",
  "data": {
    "composition": {
      "ingredient_composition_id": "uuid-comp-2",
      "parent_id": "uuid-semi-1",
      "child_id": "uuid-ing-gula",
      "qty_needed": 500
    },
    "new_hpp": 10
  }
}
```

### 4. Bulk Update Komposisi (Replace All)
Sangat berguna apabila UI menerapkan pendekatan "Edit seluruh resep sekaligus lalu klik *Simpan Semua*". Request ini akan menimpa seluruh resep lama dengan resep baru.
- **Endpoint:** `POST /:ingredient_id/composition/bulk`
- **Akses:** Protected (ADMIN)

**Request Body (JSON):**
```json
{
  "compositions": [
    {
      "child_id": "uuid-ing-gula",
      "qty_needed": 500
    },
    {
      "child_id": "uuid-ing-air",
      "qty_needed": 1000
    }
  ]
}
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Komposisi berhasil diperbarui massal",
  "data": {
    "parent_id": "uuid-semi-1",
    "total_hpp": 12000,
    "hpp_per_unit": 12,
    "compositions": [
      {
        "ingredient_composition_id": "uuid-comp-3",
        "child_id": "uuid-ing-gula",
        "qty_needed": 500,
        "child_ingredient": {
          "ingredient_id": "uuid-ing-gula",
          "name": "Gula Pasir",
          "avg_cost": 20,
          "unit": {
            "unit_measure_id": "uuid-unit-gr",
            "name": "gr"
          }
        }
      },
      {
        "ingredient_composition_id": "uuid-comp-4",
        "child_id": "uuid-ing-air",
        "qty_needed": 1000,
        "child_ingredient": {
          "ingredient_id": "uuid-ing-air",
          "name": "Air Mineral",
          "avg_cost": 2,
          "unit": {
            "unit_measure_id": "uuid-unit-ml",
            "name": "ml"
          }
        }
      }
    ]
  }
}
```

### 5. Mengubah Kuantitas dan Menghapus Komposisi Satuan
- **Update Qty (`PATCH /:ingredient_id/composition/:composition_id`)**:
  Request JSON berisi `{"qty_needed": 600}`. Response mengembalikan komposisi baru.
- **Delete (`DELETE /:ingredient_id/composition/:composition_id`)**:
  Menghapus salah satu bahan dari resep. Response mengembalikan parameter sukses dan `new_hpp` pasca penghapusan.

---

## BAGIAN C: Kalkulasi Ulang (Recalculate HPP)
Jika harga beli bahan mentah naik atau ada perubahan *avg_cost* secara mendadak di *database*, Anda dapat memicu kalkulasi ulang paksa dari sisi UI.

### 1. Lihat HPP Terkini di DB
- **Endpoint:** `GET /:ingredient_id/hpp`
- **Akses:** Protected (ADMIN)
- **Response**: Format sama dengan "Preview HPP", namun diambil langsung dari `avg_cost` bahan baku *real-time*.

### 2. Simpan & Timpa Nilai HPP
- **Endpoint:** `POST /:ingredient_id/recalculate-hpp`
- **Akses:** Protected (ADMIN)
- **Request Body:** (Tidak ada)
- **Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Kalkulasi ulang HPP berhasil disimpan",
  "data": {
    "ingredient_id": "uuid-semi-1",
    "name": "Sirup Vanila Homemade",
    "type": "SEMI",
    "stock_qty": 500,
    "min_stock": 100,
    "avg_cost": 12,
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": "2024-01-07T12:00:00Z",
    "unit": {
      "unit_measure_id": "uuid-unit-ml",
      "name": "ml"
    }
  }
}
```
