# Dokumentasi API Riwayat Stok (Inventory Movement)

Dokumentasi ini memfokuskan rute API (endpoints) yang digunakan oleh Frontend khusus untuk **Melihat Histori Pergerakan Stok** (log audit keluar-masuknya bahan baku).

**Catatan Penting:** Semua rute memerlukan hak akses dengan *role* **ADMIN**.

Base URL Utama: `/api/inventory`

---

## Tabel dan Field yang Dipakai

Modul riwayat stok memakai tabel utama `stock_movements`. Tabel `ingredients`, `unit_measures`, `suppliers`, `stock_types`, dan `users` dipakai sebagai relasi untuk menampilkan detail bahan, satuan, pemasok, tipe pergerakan stok, dan pengguna yang mencatat transaksi stok.

### Ringkasan Penggunaan Tabel

| Proses | Tabel yang Dipakai | Keterangan |
| :--- | :--- | :--- |
| Menampilkan seluruh riwayat stok | `stock_movements`, `ingredients`, `unit_measures`, `suppliers`, `stock_types`, `users` | Mengambil riwayat aktif dengan pagination, filter, dan relasi detail. |
| Menampilkan riwayat per bahan | `stock_movements`, `ingredients`, `unit_measures`, `suppliers`, `stock_types`, `users` | Validasi bahan ada, lalu mengambil riwayat untuk `ingredient_id` tertentu. |
| Detail pergerakan stok | `stock_movements`, `ingredients`, `unit_measures`, `suppliers`, `stock_types`, `users` | Mengambil satu riwayat berdasarkan `stock_movement_id`. |

### 1. Tabel `stock_movements`

Tabel utama untuk log audit pergerakan stok.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `stock_movement_id` | UUID | Tidak | Primary key riwayat pergerakan stok. |
| `supplier_id` | UUID | Ya | Foreign key ke tabel `suppliers`. Bisa `null` untuk stok keluar/manual atau transaksi tanpa supplier. |
| `ingredient_id` | UUID | Tidak | Foreign key ke tabel `ingredients`. |
| `user_id` | UUID | Tidak | Foreign key ke tabel `users`, yaitu user yang mencatat pergerakan stok. |
| `stock_type_id` | UUID | Tidak | Foreign key ke tabel `stock_types`. |
| `qty` | decimal(10,2) | Tidak | Jumlah perubahan stok. Untuk stok keluar manual disimpan negatif oleh backend. |
| `unit_cost` | decimal(15,2) | Ya | Harga satuan saat transaksi stok masuk. |
| `current_stock` | decimal(10,2) | Tidak | Stok bahan setelah transaksi terjadi. |
| `notes` | text | Ya | Catatan pergerakan stok. Dipakai juga untuk pencarian. |
| `created_at` | timestamp | Tidak | Waktu pergerakan stok dicatat. Dipakai untuk filter tanggal. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Endpoint hanya memakai data dengan `deleted_at = null`. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List/detail | `stock_movement_id`, `supplier_id`, `ingredient_id`, `user_id`, `stock_type_id`, `qty`, `unit_cost`, `current_stock`, `notes`, `created_at`, `deleted_at` |
| Search | `notes` dan relasi `ingredient.name` |
| Filter | `ingredient_id`, `supplier_id`, `stock_type_id`, `created_at` |
| Count pagination | `deleted_at` dan seluruh field filter aktif |

### 2. Tabel `ingredients`

Tabel bahan yang menjadi objek pergerakan stok.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `ingredient_id` | UUID | Tidak | Primary key bahan. |
| `unit_id` | UUID | Tidak | Foreign key ke tabel `unit_measures`. |
| `name` | varchar(100) | Tidak | Nama bahan. Dipakai untuk tampilan dan pencarian riwayat. |
| `type` | varchar(20) | Tidak | Jenis bahan, misalnya `RAW` atau `SEMI`. |
| `stock_qty` | decimal(10,2) | Tidak | Stok bahan saat ini. |
| `min_stock` | decimal(10,2) | Tidak | Batas minimum stok. |
| `avg_cost` | decimal(15,2) | Tidak | Harga rata-rata bahan. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada riwayat stok:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List/detail | `ingredient_id`, `name`, `unit_id` melalui relasi `ingredient`. |
| Search | `name` |
| Validasi riwayat per bahan | `ingredient_id`, `deleted_at` |

### 3. Tabel `unit_measures`

Tabel satuan bahan yang ditampilkan melalui relasi bahan.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `unit_measure_id` | UUID | Tidak | Primary key satuan. |
| `name` | varchar(50) | Tidak | Nama satuan. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada riwayat stok:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List/detail | `unit_measure_id`, `name` melalui relasi `ingredient.unit`. |

### 4. Tabel `suppliers`

Tabel pemasok yang terkait dengan stok masuk.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `supplier_id` | UUID | Tidak | Primary key pemasok. |
| `name` | varchar(100) | Tidak | Nama pemasok. |
| `phone` | varchar(20) | Ya | Nomor telepon pemasok. |
| `address` | text | Ya | Alamat pemasok. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada riwayat stok:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List/detail | `supplier_id`, `name` melalui relasi `supplier`. |
| Filter | `supplier_id` |

### 5. Tabel `stock_types`

Tabel master jenis pergerakan stok.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `stock_type_id` | UUID | Tidak | Primary key tipe stok. |
| `name` | varchar(50) | Tidak | Nama tipe stok, misalnya `IN_PURCHASE`, `OUT_DAMAGED`, `OUT_EXPIRED`, atau `OUT_SALES`. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada riwayat stok:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List/detail | `stock_type_id`, `name` melalui relasi `stock_type`. |
| Filter | `stock_type_id` |

### 6. Tabel `users`

Tabel pengguna yang mencatat pergerakan stok.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `user_id` | UUID | Tidak | Primary key pengguna. |
| `username` | varchar(50) | Tidak | Username pengguna. |
| `name` | varchar(100) | Tidak | Nama pengguna yang ditampilkan pada riwayat. |
| `role_id` | UUID | Tidak | Foreign key role pengguna. |
| `user_status_id` | UUID | Tidak | Foreign key status pengguna. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada riwayat stok:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List/detail | `user_id`, `name` melalui relasi `user`. |

### Relasi Tabel

```text
stock_movements.ingredient_id -> ingredients.ingredient_id
ingredients.unit_id -> unit_measures.unit_measure_id
stock_movements.supplier_id -> suppliers.supplier_id
stock_movements.stock_type_id -> stock_types.stock_type_id
stock_movements.user_id -> users.user_id
```

### Catatan Alur Data

- Riwayat stok bersifat audit log; endpoint ini hanya membaca data, tidak mengubah stok.
- Pencarian global mencakup `stock_movements.notes` dan `ingredients.name`.
- Filter tanggal memakai `stock_movements.created_at`.
- Data yang dikembalikan hanya riwayat aktif dengan `stock_movements.deleted_at = null`.

---

## 1. Menampilkan Seluruh Riwayat Stok (Global)

Endpoint ini menampilkan histori seluruh pergerakan barang (gabungan dari semua bahan baku) dengan dukungan *pagination* dan banyak filter.

- **Endpoint:** `GET /`
- **Akses:** Protected (ADMIN)

**Query Parameters (Opsional):**
| Parameter | Tipe | Format / Pilihan | Deskripsi |
| :--- | :--- | :--- | :--- |
| `batch` | Number | Angka bulat | Halaman ke berapa (default: `1`) |
| `size` | Number | Angka bulat | Jumlah per halaman (default: `10`) |
| `search` | String | Bebas | Pencarian catatan/notes |
| `ingredient_id`| UUID | Format UUID | Filter pergerakan satu bahan baku saja |
| `supplier_id` | UUID | Format UUID | Filter pergerakan dari supplier tertentu |
| `stock_type_id`| UUID | Format UUID | Filter berdasarkan tipe stok |
| `date_from` | Date | `YYYY-MM-DD` | Tanggal mulai pergerakan |
| `date_to` | Date | `YYYY-MM-DD` | Tanggal akhir pergerakan |

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil riwayat pergerakan stok",
  "data": {
    "page": {
      "total_record_count": 100,
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
        "notes": "Penerimaan barang rutin",
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
        "stock_type": {
          "stock_type_id": "uuid-stock-type-in",
          "name": "STOCK_IN"
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

## 2. Menampilkan Riwayat per Bahan Baku

Sangat berguna jika FE memiliki tombol "Lihat Riwayat" pada baris tabel Manajemen Bahan Baku.

- **Endpoint:** `GET /ingredient/:ingredient_id`
- **Akses:** Protected (ADMIN)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil riwayat stok untuk bahan baku",
  "data": {
    "page": {
      "total_record_count": 5,
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
        "notes": "Penerimaan barang rutin",
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
        "stock_type": {
          "stock_type_id": "uuid-stock-type-in",
          "name": "STOCK_IN"
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

## 3. Melihat Detail Satu Pergerakan Stok

Digunakan jika ingin melihat rincian presisi satu baris riwayat *stock movement*.

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
    "notes": "Penerimaan barang rutin",
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
    "stock_type": {
      "stock_type_id": "uuid-stock-type-in",
      "name": "STOCK_IN"
    },
    "user": {
      "user_id": "uuid-admin-1",
      "name": "Budi Admin"
    }
  }
}
```
