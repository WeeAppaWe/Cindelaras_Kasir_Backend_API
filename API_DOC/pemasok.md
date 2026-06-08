# Dokumentasi API Pemasok (Supplier Management)

Dokumentasi ini menjelaskan rute API (endpoints) yang digunakan oleh Frontend untuk halaman **Manajemen Pemasok (Supplier)**. Fitur ini berfungsi untuk mencatat daftar vendor atau *supplier* tempat restoran membeli bahan baku.

**Catatan Penting:** Semua rute pada modul ini memerlukan hak akses dengan *role* **ADMIN**.

Base URL Utama: `/api/supplier`

---

## Tabel dan Field yang Dipakai

Modul pemasok memakai tabel utama `suppliers`. Tabel `stock_movements` juga dibaca untuk menghitung jumlah riwayat penerimaan/pergerakan stok yang terkait dengan pemasok.

### Ringkasan Penggunaan Tabel

| Proses | Tabel yang Dipakai | Keterangan |
| :--- | :--- | :--- |
| Menampilkan daftar pemasok | `suppliers`, `stock_movements` | Mengambil pemasok aktif dengan pagination, pencarian, dan `_count.stock_movements`. |
| Detail pemasok | `suppliers`, `stock_movements` | Mengambil detail pemasok dan jumlah riwayat stok terkait. |
| Menambah pemasok | `suppliers` | Validasi nama duplikat, lalu membuat pemasok baru. |
| Mengubah pemasok | `suppliers` | Validasi pemasok ada dan nama tidak dipakai pemasok lain. |
| Menghapus pemasok | `suppliers` | Soft delete pemasok dengan mengisi `deleted_at`. Riwayat stok tetap menyimpan referensi supplier lama. |

### 1. Tabel `suppliers`

Tabel utama untuk master pemasok.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `supplier_id` | UUID | Tidak | Primary key pemasok. |
| `name` | varchar(100) | Tidak | Nama pemasok. Dipakai untuk pencarian dan validasi duplikat. |
| `phone` | varchar(20) | Ya | Nomor telepon pemasok. |
| `address` | text | Ya | Alamat pemasok. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Endpoint pemasok hanya memakai data dengan `deleted_at = null`. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List | `supplier_id`, `name`, `phone`, `address`, `created_at`, `updated_at`, `deleted_at` |
| Search | `name`, `phone`, `address` |
| Detail | `supplier_id`, `name`, `phone`, `address`, `created_at`, `updated_at`, `deleted_at` |
| Create | `name`, `phone`, `address` |
| Update | `supplier_id`, `name`, `phone`, `address` |
| Delete | `supplier_id`, `deleted_at` |

### 2. Tabel `stock_movements`

Tabel riwayat pergerakan stok. Pada modul pemasok, tabel ini dipakai untuk menghitung jumlah riwayat stok yang terkait dengan pemasok.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `stock_movement_id` | UUID | Tidak | Primary key pergerakan stok. |
| `supplier_id` | UUID | Ya | Foreign key ke tabel `suppliers`. Bisa `null` untuk pergerakan stok yang tidak terkait pemasok. |
| `ingredient_id` | UUID | Tidak | Foreign key bahan. |
| `user_id` | UUID | Tidak | User yang membuat pergerakan stok. |
| `stock_type_id` | UUID | Tidak | Foreign key tipe stok. |
| `qty` | decimal(10,2) | Tidak | Jumlah pergerakan stok. |
| `unit_cost` | decimal(15,2) | Ya | Harga satuan stok. |
| `current_stock` | decimal(10,2) | Tidak | Stok setelah pergerakan. |
| `notes` | text | Ya | Catatan pergerakan stok. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada modul pemasok:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List/detail pemasok | Relasi `_count.stock_movements` untuk menghitung jumlah riwayat stok pemasok. |
| Riwayat stok | `supplier_id` tetap tersimpan sebagai referensi meskipun pemasok di-soft delete. |

### Relasi Tabel

```text
stock_movements.supplier_id -> suppliers.supplier_id
```

### Catatan Alur Data

- Nama pemasok dicek duplikat secara case-insensitive.
- Hapus pemasok memakai soft delete dengan mengisi `suppliers.deleted_at`.
- Riwayat stok tidak ikut dihapus saat pemasok dihapus, sehingga data historis tetap aman.
- Pencarian pemasok mencakup `name`, `phone`, dan `address`.

---

## 1. Menampilkan Daftar Pemasok

Endpoint ini mengambil daftar seluruh pemasok dengan dukungan *pagination* dan fitur pencarian nama. Endpoint ini juga mengembalikan jumlah riwayat penerimaan barang (`_count.stock_movements`) untuk setiap *supplier*.

- **Endpoint:** `GET /`
- **Akses:** Protected (ADMIN)

**Query Parameters (Opsional):**
| Parameter | Tipe | Format / Pilihan | Deskripsi |
| :--- | :--- | :--- | :--- |
| `batch` | Number | Angka bulat | Halaman ke berapa (default: `1`) |
| `size` | Number | Angka bulat | Jumlah per halaman (default: `10`) |
| `search` | String | Bebas | Pencarian nama pemasok |

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil data pemasok",
  "data": {
    "page": {
      "total_record_count": 15,
      "batch_number": 1,
      "batch_size": 10,
      "max_batch_size": 100
    },
    "records": [
      {
        "supplier_id": "uuid-supplier-1",
        "name": "PT Sumber Pangan Abadi",
        "phone": "081234567890",
        "address": "Jl. Industri No. 45, Jakarta",
        "created_at": "2024-01-01T10:00:00Z",
        "updated_at": null,
        "_count": {
          "stock_movements": 24
        }
      },
      {
        "supplier_id": "uuid-supplier-2",
        "name": "Toko Beras Makmur",
        "phone": null,
        "address": null,
        "created_at": "2024-01-02T10:00:00Z",
        "updated_at": null,
        "_count": {
          "stock_movements": 5
        }
      }
    ]
  }
}
```

---

## 2. Menambah Pemasok Baru

- **Endpoint:** `POST /`
- **Akses:** Protected (ADMIN)

**Request Body (JSON):**
| Field | Tipe | Validasi | Deskripsi |
| :--- | :--- | :--- | :--- |
| `name` | String | Wajib, 2 - 100 karakter | Nama pemasok / toko |
| `phone` | String | Opsional, maksimal 20 karakter | Nomor telepon yang bisa dihubungi |
| `address` | String | Opsional, maksimal 500 karakter | Alamat lengkap pemasok |

**Contoh Request:**
```json
{
  "name": "Toko Sayur Segar",
  "phone": "081122334455",
  "address": "Pasar Induk Blok B"
}
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil membuat pemasok",
  "data": {
    "supplier_id": "uuid-supplier-3",
    "name": "Toko Sayur Segar",
    "phone": "081122334455",
    "address": "Pasar Induk Blok B",
    "created_at": "2024-01-05T08:00:00Z",
    "updated_at": null
  }
}
```

---

## 3. Melihat Detail Pemasok

- **Endpoint:** `GET /:supplier_id`
- **Akses:** Protected (ADMIN)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil detail pemasok",
  "data": {
    "supplier_id": "uuid-supplier-1",
    "name": "PT Sumber Pangan Abadi",
    "phone": "081234567890",
    "address": "Jl. Industri No. 45, Jakarta",
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": null,
    "_count": {
      "stock_movements": 24
    }
  }
}
```

---

## 4. Memperbarui Data Pemasok

- **Endpoint:** `PATCH /:supplier_id`
- **Akses:** Protected (ADMIN)

**Request Body (JSON):**

*Catatan: Semua field bersifat opsional. Hanya kirim data yang ingin diubah.*

```json
{
  "phone": "021-98765432",
  "address": "Jl. Industri Raya No. 45-B, Jakarta Pusat"
}
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil memperbarui pemasok",
  "data": {
    "supplier_id": "uuid-supplier-1",
    "name": "PT Sumber Pangan Abadi",
    "phone": "021-98765432",
    "address": "Jl. Industri Raya No. 45-B, Jakarta Pusat",
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": "2024-01-06T14:30:00Z"
  }
}
```

---

## 5. Menghapus Pemasok (Soft Delete)

Endpoint ini akan menghapus data pemasok secara logika. Data yang berhubungan (seperti riwayat stok dari pemasok ini) tidak akan hilang dan ID pemasok masih akan tertaut pada riwayat stok tersebut.

- **Endpoint:** `DELETE /:supplier_id`
- **Akses:** Protected (ADMIN)
- **Request Body:** (Tidak ada)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil menghapus pemasok",
  "data": {
    "success": true,
    "message": "Pemasok berhasil dihapus"
  }
}
```
