# Dokumentasi API Stok Keluar (Stock Out)

Dokumentasi ini menjelaskan rute API untuk mengelola halaman **Pengeluaran Barang Secara Manual** (Stok Keluar). Halaman ini digunakan untuk melihat daftar riwayat stok yang dibuang, melihat detail, dan mencatat bahan baku yang terbuang/rusak/kedaluwarsa.

**Catatan Penting:** Pengurangan stok akibat penjualan kasir dilakukan secara otomatis oleh sistem (tipe `SALES`). Modul ini khusus difungsikan untuk pencatatan manual *Inventory Loss*.

Base URL Utama: `/api/inventory`

---

## Tabel dan Field yang Dipakai

Modul stok keluar memakai tabel utama `stock_movements` untuk mencatat pengeluaran stok manual. Saat stok keluar dicatat, backend memperbarui `ingredients.stock_qty` tanpa mengubah `avg_cost`. Tabel `stock_types`, `users`, dan `unit_measures` dipakai untuk validasi serta data relasi response.

### Ringkasan Penggunaan Tabel

| Proses | Tabel yang Dipakai | Keterangan |
| :--- | :--- | :--- |
| Menampilkan daftar barang keluar | `stock_movements`, `ingredients`, `unit_measures`, `stock_types`, `users` | Mengambil riwayat stok yang difilter `stock_type_id` untuk pengeluaran stok. |
| Detail barang keluar | `stock_movements`, `ingredients`, `unit_measures`, `stock_types`, `users` | Mengambil satu riwayat pengeluaran stok berdasarkan `stock_movement_id`. |
| Mencatat stok keluar | `stock_movements`, `ingredients`, `stock_types`, `users` | Validasi bahan, cek stok cukup, cari tipe stok sesuai reason, update stok, lalu membuat riwayat stok. |

### 1. Tabel `stock_movements`

Tabel utama untuk log pengeluaran stok manual.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `stock_movement_id` | UUID | Tidak | Primary key pergerakan stok. |
| `supplier_id` | UUID | Ya | Foreign key ke tabel `suppliers`. Untuk stok keluar manual diisi `null`. |
| `ingredient_id` | UUID | Tidak | Foreign key ke tabel `ingredients`. |
| `user_id` | UUID | Tidak | Foreign key ke tabel `users`, yaitu admin yang mencatat stok keluar. |
| `stock_type_id` | UUID | Tidak | Foreign key ke tabel `stock_types`. |
| `qty` | decimal(10,2) | Tidak | Jumlah perubahan stok. Untuk stok keluar manual disimpan negatif. |
| `unit_cost` | decimal(15,2) | Ya | Untuk stok keluar manual diisi `null`. |
| `current_stock` | decimal(10,2) | Tidak | Stok bahan setelah pengeluaran dicatat. |
| `notes` | text | Ya | Catatan pengeluaran, termasuk label reason seperti `[Rusak]` atau `[Kedaluarsa]`. |
| `created_at` | timestamp | Tidak | Waktu stok keluar dicatat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List/detail | `stock_movement_id`, `supplier_id`, `ingredient_id`, `user_id`, `stock_type_id`, `qty`, `unit_cost`, `current_stock`, `notes`, `created_at`, `deleted_at` |
| Filter daftar stok keluar | `stock_type_id`, `deleted_at` |
| Create | `supplier_id`, `ingredient_id`, `user_id`, `stock_type_id`, `qty`, `unit_cost`, `current_stock`, `notes` |

### 2. Tabel `ingredients`

Tabel bahan yang stoknya berkurang saat stok keluar dicatat.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `ingredient_id` | UUID | Tidak | Primary key bahan. |
| `unit_id` | UUID | Tidak | Foreign key ke tabel `unit_measures`. |
| `name` | varchar(100) | Tidak | Nama bahan. |
| `type` | varchar(20) | Tidak | Jenis bahan, misalnya `RAW` atau `SEMI`. |
| `stock_qty` | decimal(10,2) | Tidak | Stok saat ini. Berkurang sebesar `qty` request. |
| `min_stock` | decimal(10,2) | Tidak | Batas minimum stok. |
| `avg_cost` | decimal(15,2) | Tidak | Harga rata-rata bahan. Tidak berubah saat stok keluar manual. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada stok keluar:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Validasi bahan | `ingredient_id`, `deleted_at` |
| Cek stok cukup | `stock_qty` |
| Update stok | `stock_qty` |
| Response | `ingredient_id`, `name`, `unit_id` melalui relasi `ingredient`. |

### 3. Tabel `stock_types`

Tabel master tipe pergerakan stok.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `stock_type_id` | UUID | Tidak | Primary key tipe stok. |
| `name` | varchar(50) | Tidak | Nama tipe stok. Endpoint stok keluar mencari `OUT_EXPIRED` untuk reason `EXPIRED`, selain itu memakai `OUT_DAMAGED`. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada stok keluar:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Create | `stock_type_id`, `name`, `deleted_at` untuk mencari tipe stok sesuai `reason`. |
| List/detail | `stock_type_id`, `name` melalui relasi `stock_type`. |

### 4. Tabel `users`

Tabel pengguna yang mencatat stok keluar.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `user_id` | UUID | Tidak | Primary key pengguna. |
| `username` | varchar(50) | Tidak | Username pengguna. |
| `name` | varchar(100) | Tidak | Nama pengguna. |
| `role_id` | UUID | Tidak | Foreign key role. |
| `user_status_id` | UUID | Tidak | Foreign key status. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada stok keluar:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Create | `user_id` dari token autentikasi disimpan ke `stock_movements.user_id`. |
| Response | `user_id`, `name` melalui relasi `user`. |

### 5. Tabel `unit_measures`

Tabel satuan bahan yang ditampilkan pada response.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `unit_measure_id` | UUID | Tidak | Primary key satuan. |
| `name` | varchar(50) | Tidak | Nama satuan. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada stok keluar:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Response | `unit_measure_id`, `name` melalui relasi `ingredient.unit`. |

### Relasi Tabel

```text
stock_movements.ingredient_id -> ingredients.ingredient_id
ingredients.unit_id -> unit_measures.unit_measure_id
stock_movements.stock_type_id -> stock_types.stock_type_id
stock_movements.user_id -> users.user_id
```

### Catatan Alur Data

- Stok keluar manual mengurangi `ingredients.stock_qty`.
- Backend menolak request jika `ingredients.stock_qty` lebih kecil dari `qty` yang diminta.
- `stock_movements.qty` disimpan negatif untuk stok keluar manual.
- `stock_movements.supplier_id` dan `stock_movements.unit_cost` diisi `null`.
- Reason `EXPIRED` memakai tipe stok `OUT_EXPIRED`; reason `DAMAGED` dan `OTHER` memakai tipe stok `OUT_DAMAGED`.

---

## 1. Menampilkan Daftar Barang Keluar

Menggunakan endpoint riwayat stok yang difilter spesifik untuk tipe pengeluaran manual (`STOCK_OUT`).

- **Endpoint:** `GET /`
- **Akses:** Protected (ADMIN)

**Query Parameters (Penting):**
| Parameter | Tipe | Contoh / Keterangan |
| :--- | :--- | :--- |
| `stock_type_id` | UUID | ID yang didapat dari `GET /api/stock-type` untuk jenis `STOCK_OUT` |
| `batch` | Number | Halaman ke berapa (default: `1`) |
| `size` | Number | Jumlah per halaman (default: `10`) |

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil riwayat pergerakan stok",
  "data": {
    "page": {
      "total_record_count": 12,
      "batch_number": 1,
      "batch_size": 10,
      "max_batch_size": 100
    },
    "records": [
      {
        "stock_movement_id": "uuid-movement-3",
        "supplier_id": null,
        "ingredient_id": "uuid-ing-1",
        "user_id": "uuid-admin-1",
        "stock_type_id": "uuid-stock-type-out",
        "qty": 10,
        "unit_cost": null,
        "current_stock": 1490,
        "notes": "Tumpah di meja racik",
        "created_at": "2024-01-03T14:30:00Z",
        "ingredient": {
          "ingredient_id": "uuid-ing-1",
          "name": "Kopi Arabica",
          "unit": {
            "unit_measure_id": "uuid-unit-1",
            "name": "gr"
          }
        },
        "supplier": null,
        "user": {
          "user_id": "uuid-admin-1",
          "name": "Budi Admin"
        }
      }
    ]
  }
}
```

---

## 2. Melihat Detail Barang Keluar

- **Endpoint:** `GET /:stock_movement_id`
- **Akses:** Protected (ADMIN)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil detail pergerakan stok",
  "data": {
    "stock_movement_id": "uuid-movement-3",
    "supplier_id": null,
    "ingredient_id": "uuid-ing-1",
    "user_id": "uuid-admin-1",
    "stock_type_id": "uuid-stock-type-out",
    "qty": 10,
    "unit_cost": null,
    "current_stock": 1490,
    "notes": "Tumpah di meja racik",
    "created_at": "2024-01-03T14:30:00Z",
    "ingredient": {
      "ingredient_id": "uuid-ing-1",
      "name": "Kopi Arabica",
      "unit": {
        "unit_measure_id": "uuid-unit-1",
        "name": "gr"
      }
    },
    "supplier": null,
    "user": {
      "user_id": "uuid-admin-1",
      "name": "Budi Admin"
    }
  }
}
```

---

## 3. Mencatat Pengeluaran Barang (Stock Out)

Endpoint ini digunakan untuk membuang stok secara logis. **Kuantitas di dalam database akan otomatis dikurangkan** sebesar jumlah *qty* yang dikirimkan.

- **Endpoint:** `POST /stock-out`
- **Akses:** Protected (ADMIN)

**Request Body (JSON):**
| Field | Tipe | Validasi | Deskripsi |
| :--- | :--- | :--- | :--- |
| `ingredient_id` | String | Wajib, format UUID | ID bahan baku yang dibuang |
| `qty` | Number | Wajib, > 0 | Jumlah kuantitas yang dibuang |
| `reason` | String | Wajib | Harus diisi salah satu: `"DAMAGED"`, `"EXPIRED"`, atau `"OTHER"` |
| `notes` | String | Opsional | Penjelasan atau catatan tambahan |

**Contoh Request:**
```json
{
  "ingredient_id": "uuid-ing-1",
  "qty": 10,
  "reason": "DAMAGED",
  "notes": "Tumpah di meja racik"
}
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Pengeluaran barang berhasil dicatat",
  "data": {
    "stock_movement_id": "uuid-movement-3",
    "supplier_id": null,
    "ingredient_id": "uuid-ing-1",
    "user_id": "uuid-admin-1",
    "stock_type_id": "uuid-stock-type-out",
    "qty": 10,
    "unit_cost": null,
    "current_stock": 1490,
    "notes": "Tumpah di meja racik",
    "created_at": "2024-01-03T14:30:00Z",
    "ingredient": {
      "ingredient_id": "uuid-ing-1",
      "name": "Kopi Arabica",
      "unit": {
        "unit_measure_id": "uuid-unit-1",
        "name": "gr"
      }
    },
    "supplier": null,
    "user": {
      "user_id": "uuid-admin-1",
      "name": "Budi Admin"
    }
  }
}
```
