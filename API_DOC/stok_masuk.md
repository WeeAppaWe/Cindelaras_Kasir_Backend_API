# Dokumentasi API Stok Masuk (Stock In)

Dokumentasi ini menjelaskan rute API untuk mengelola halaman **Penerimaan Barang** (Stok Masuk). Halaman ini difungsikan untuk melihat daftar riwayat stok yang masuk, melihat detailnya, dan mencatat masuknya stok baru dari *Supplier*.

**Catatan Penting:** Semua rute pada modul ini memerlukan hak akses dengan *role* **ADMIN**.

Base URL Utama: `/api/inventory`

---

## Tabel dan Field yang Dipakai

Modul stok masuk memakai tabel utama `stock_movements` untuk mencatat riwayat penerimaan barang. Saat stok masuk dicatat, backend juga memperbarui `ingredients.stock_qty` dan `ingredients.avg_cost`. Tabel `suppliers`, `stock_types`, `users`, dan `unit_measures` dipakai untuk validasi dan data relasi response.

### Ringkasan Penggunaan Tabel

| Proses | Tabel yang Dipakai | Keterangan |
| :--- | :--- | :--- |
| Menampilkan daftar barang masuk | `stock_movements`, `ingredients`, `unit_measures`, `suppliers`, `stock_types`, `users` | Mengambil riwayat stok yang difilter `stock_type_id` untuk stok masuk. |
| Detail barang masuk | `stock_movements`, `ingredients`, `unit_measures`, `suppliers`, `stock_types`, `users` | Mengambil satu riwayat stok masuk berdasarkan `stock_movement_id`. |
| Mencatat stok masuk | `stock_movements`, `ingredients`, `suppliers`, `stock_types`, `users` | Validasi bahan, supplier, tipe stok `IN_PURCHASE`, update stok/HPP bahan, lalu membuat riwayat stok. |

### 1. Tabel `stock_movements`

Tabel utama untuk log penerimaan stok.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `stock_movement_id` | UUID | Tidak | Primary key pergerakan stok. |
| `supplier_id` | UUID | Ya | Foreign key ke tabel `suppliers`. Untuk stok masuk dari supplier berisi ID supplier. |
| `ingredient_id` | UUID | Tidak | Foreign key ke tabel `ingredients`. |
| `user_id` | UUID | Tidak | Foreign key ke tabel `users`, yaitu admin yang mencatat stok masuk. |
| `stock_type_id` | UUID | Tidak | Foreign key ke tabel `stock_types`. Untuk endpoint create stok masuk memakai tipe `IN_PURCHASE`. |
| `qty` | decimal(10,2) | Tidak | Jumlah stok yang diterima. |
| `unit_cost` | decimal(15,2) | Ya | Harga beli per satuan. |
| `current_stock` | decimal(10,2) | Tidak | Stok bahan setelah penerimaan dicatat. |
| `notes` | text | Ya | Catatan penerimaan barang. |
| `created_at` | timestamp | Tidak | Waktu stok masuk dicatat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List/detail | `stock_movement_id`, `supplier_id`, `ingredient_id`, `user_id`, `stock_type_id`, `qty`, `unit_cost`, `current_stock`, `notes`, `created_at`, `deleted_at` |
| Filter daftar stok masuk | `stock_type_id`, `deleted_at` |
| Create | `supplier_id`, `ingredient_id`, `user_id`, `stock_type_id`, `qty`, `unit_cost`, `current_stock`, `notes` |

### 2. Tabel `ingredients`

Tabel bahan yang stoknya bertambah saat stok masuk dicatat.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `ingredient_id` | UUID | Tidak | Primary key bahan. |
| `unit_id` | UUID | Tidak | Foreign key ke tabel `unit_measures`. |
| `name` | varchar(100) | Tidak | Nama bahan. |
| `type` | varchar(20) | Tidak | Jenis bahan, misalnya `RAW` atau `SEMI`. |
| `stock_qty` | decimal(10,2) | Tidak | Stok saat ini. Bertambah sebesar `qty` stok masuk. |
| `min_stock` | decimal(10,2) | Tidak | Batas minimum stok. |
| `avg_cost` | decimal(15,2) | Tidak | Harga rata-rata bahan. Dihitung ulang dengan weighted average saat stok masuk. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada stok masuk:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Validasi bahan | `ingredient_id`, `deleted_at` |
| Hitung stok baru | `stock_qty`, `avg_cost` |
| Update stok/HPP | `stock_qty`, `avg_cost` |
| Response | `ingredient_id`, `name`, `unit_id` melalui relasi `ingredient`. |

### 3. Tabel `suppliers`

Tabel pemasok yang menyuplai barang masuk.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `supplier_id` | UUID | Tidak | Primary key pemasok. |
| `name` | varchar(100) | Tidak | Nama pemasok. |
| `phone` | varchar(20) | Ya | Nomor telepon pemasok. |
| `address` | text | Ya | Alamat pemasok. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada stok masuk:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Validasi supplier | `supplier_id`, `deleted_at` |
| Response | `supplier_id`, `name` melalui relasi `supplier`. |

### 4. Tabel `stock_types`

Tabel master tipe pergerakan stok.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `stock_type_id` | UUID | Tidak | Primary key tipe stok. |
| `name` | varchar(50) | Tidak | Nama tipe stok. Endpoint create stok masuk mencari `IN_PURCHASE`. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada stok masuk:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Create | `stock_type_id`, `name`, `deleted_at` untuk mencari tipe `IN_PURCHASE`. |
| List/detail | `stock_type_id`, `name` melalui relasi `stock_type`. |

### 5. Tabel `users`

Tabel pengguna yang mencatat stok masuk.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `user_id` | UUID | Tidak | Primary key pengguna. |
| `username` | varchar(50) | Tidak | Username pengguna. |
| `name` | varchar(100) | Tidak | Nama pengguna. |
| `role_id` | UUID | Tidak | Foreign key role. |
| `user_status_id` | UUID | Tidak | Foreign key status. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada stok masuk:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Create | `user_id` dari token autentikasi disimpan ke `stock_movements.user_id`. |
| Response | `user_id`, `name` melalui relasi `user`. |

### 6. Tabel `unit_measures`

Tabel satuan bahan yang ditampilkan pada response.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `unit_measure_id` | UUID | Tidak | Primary key satuan. |
| `name` | varchar(50) | Tidak | Nama satuan. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada stok masuk:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Response | `unit_measure_id`, `name` melalui relasi `ingredient.unit`. |

### Relasi Tabel

```text
stock_movements.ingredient_id -> ingredients.ingredient_id
ingredients.unit_id -> unit_measures.unit_measure_id
stock_movements.supplier_id -> suppliers.supplier_id
stock_movements.stock_type_id -> stock_types.stock_type_id
stock_movements.user_id -> users.user_id
```

### Catatan Alur Data

- Stok masuk menambah `ingredients.stock_qty`.
- `ingredients.avg_cost` dihitung ulang menggunakan weighted average: stok lama dan harga rata-rata lama digabung dengan qty masuk dan `unit_cost`.
- Riwayat stok masuk disimpan di `stock_movements` setelah stok bahan diperbarui dalam transaksi database.
- `current_stock` pada `stock_movements` berisi stok bahan setelah penerimaan.

---

## 1. Menampilkan Daftar Barang Masuk

Endpoint ini menggunakan rute riwayat global yang difilter spesifik untuk tipe *stock_type_id* dari barang masuk (`STOCK_IN`).

- **Endpoint:** `GET /`
- **Akses:** Protected (ADMIN)

**Query Parameters (Penting):**
| Parameter | Tipe | Contoh / Keterangan |
| :--- | :--- | :--- |
| `stock_type_id` | UUID | ID yang didapat dari `GET /api/stock-type` untuk jenis `STOCK_IN` |
| `batch` | Number | Halaman ke berapa (default: `1`) |
| `size` | Number | Jumlah per halaman (default: `10`) |

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil riwayat pergerakan stok",
  "data": {
    "page": {
      "total_record_count": 25,
      "batch_number": 1,
      "batch_size": 10,
      "max_batch_size": 100
    },
    "records": [
      {
        "stock_movement_id": "uuid-movement-1",
        "supplier_id": "uuid-supplier-1",
        "ingredient_id": "uuid-ing-1",
        "user_id": "uuid-admin-1",
        "stock_type_id": "uuid-stock-type-in",
        "qty": 500,
        "unit_cost": 20,
        "current_stock": 1500,
        "notes": "Penerimaan rutin bulan Januari",
        "created_at": "2024-01-01T10:00:00Z",
        "ingredient": {
          "ingredient_id": "uuid-ing-1",
          "name": "Kopi Arabica",
          "unit": {
            "unit_measure_id": "uuid-unit-1",
            "name": "gr"
          }
        },
        "supplier": {
          "supplier_id": "uuid-supplier-1",
          "name": "PT Kopi Nusantara"
        },
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

## 2. Melihat Detail Barang Masuk

- **Endpoint:** `GET /:stock_movement_id`
- **Akses:** Protected (ADMIN)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil detail pergerakan stok",
  "data": {
    "stock_movement_id": "uuid-movement-1",
    "supplier_id": "uuid-supplier-1",
    "ingredient_id": "uuid-ing-1",
    "user_id": "uuid-admin-1",
    "stock_type_id": "uuid-stock-type-in",
    "qty": 500,
    "unit_cost": 20,
    "current_stock": 1500,
    "notes": "Penerimaan rutin bulan Januari",
    "created_at": "2024-01-01T10:00:00Z",
    "ingredient": {
      "ingredient_id": "uuid-ing-1",
      "name": "Kopi Arabica",
      "unit": {
        "unit_measure_id": "uuid-unit-1",
        "name": "gr"
      }
    },
    "supplier": {
      "supplier_id": "uuid-supplier-1",
      "name": "PT Kopi Nusantara"
    },
    "user": {
      "user_id": "uuid-admin-1",
      "name": "Budi Admin"
    }
  }
}
```

---

## 3. Mencatat Penerimaan Barang Masuk (Stock In)

Endpoint ini digunakan ketika admin mencatat penerimaan fisik dari *supplier*. Stok bahan baku (`stock_qty`) akan **bertambah secara otomatis** mengikuti nilai `qty` yang dikirim.

- **Endpoint:** `POST /stock-in`
- **Akses:** Protected (ADMIN)

**Request Body (JSON):**
| Field | Tipe | Validasi | Deskripsi |
| :--- | :--- | :--- | :--- |
| `ingredient_id` | String | Wajib, format UUID | ID bahan baku mentah yang diterima |
| `supplier_id` | String | Wajib, format UUID | ID *supplier* yang menyuplai |
| `qty` | Number | Wajib, > 0 | Kuantitas barang yang masuk |
| `unit_cost` | Number | Wajib, >= 0 | Harga beli barang per satuan (untuk HPP) |
| `notes` | String | Opsional | Catatan atau referensi nota |

**Contoh Request:**
```json
{
  "ingredient_id": "uuid-ing-1",
  "supplier_id": "uuid-supplier-1",
  "qty": 500,
  "unit_cost": 20,
  "notes": "Barang sudah diterima dan dicek dengan baik"
}
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Penerimaan barang berhasil dicatat",
  "data": {
    "stock_movement_id": "uuid-movement-2",
    "supplier_id": "uuid-supplier-1",
    "ingredient_id": "uuid-ing-1",
    "user_id": "uuid-admin-1",
    "stock_type_id": "uuid-stock-type-in",
    "qty": 500,
    "unit_cost": 20,
    "current_stock": 2000,
    "notes": "Barang sudah diterima dan dicek dengan baik",
    "created_at": "2024-01-02T08:00:00Z",
    "ingredient": {
      "ingredient_id": "uuid-ing-1",
      "name": "Kopi Arabica",
      "unit": {
        "unit_measure_id": "uuid-unit-1",
        "name": "gr"
      }
    },
    "supplier": {
      "supplier_id": "uuid-supplier-1",
      "name": "PT Kopi Nusantara"
    },
    "user": {
      "user_id": "uuid-admin-1",
      "name": "Budi Admin"
    }
  }
}
```
