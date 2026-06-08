# Dokumentasi API Tipe Stok (Stock Type)

Dokumentasi ini menjelaskan rute API untuk melihat *master data* tipe pergerakan stok yang didukung oleh sistem (contoh: `STOCK_IN`, `STOCK_OUT`, `OPNAME`, `SALES`, dll). Endpoint ini berguna untuk mengisi *dropdown* di halaman FE.

**Catatan Penting:** Semua rute pada modul ini memerlukan hak akses dengan *role* **ADMIN**.

Base URL Utama: `/api/stock-type`

---

## Tabel dan Field yang Dipakai

Modul tipe stok memakai tabel utama `stock_types`. Tabel `stock_movements` adalah tabel yang menggunakan `stock_type_id` untuk mencatat riwayat pergerakan stok, tetapi endpoint `stock-type` saat ini hanya menyediakan fitur lihat daftar dan detail.

### Ringkasan Penggunaan Tabel

| Proses | Tabel yang Dipakai | Keterangan |
| :--- | :--- | :--- |
| Menampilkan semua tipe stok | `stock_types` | Mengambil master tipe stok aktif. |
| Detail tipe stok | `stock_types` | Mengambil satu tipe stok berdasarkan `stock_type_id`. |
| Riwayat stok terkait | `stock_movements` | Modul lain memakai `stock_type_id` untuk mencatat jenis pergerakan stok. |

### 1. Tabel `stock_types`

Tabel utama untuk master tipe pergerakan stok.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `stock_type_id` | UUID | Tidak | Primary key tipe stok. |
| `name` | varchar(50) | Tidak | Nama tipe stok. Contoh: `IN_PURCHASE`, `OUT_SALES`, `ADJUSTMENT_OPNAME`. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Endpoint tipe stok hanya memakai data dengan `deleted_at = null`. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List | `stock_type_id`, `name`, `created_at`, `updated_at`, `deleted_at` |
| Detail | `stock_type_id`, `name`, `created_at`, `updated_at`, `deleted_at` |

### 2. Tabel `stock_movements`

Tabel riwayat pergerakan stok. Tabel ini tidak dibaca langsung oleh endpoint `stock-type`, tetapi menjadi tabel utama yang memakai `stock_type_id`.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `stock_movement_id` | UUID | Tidak | Primary key pergerakan stok. |
| `supplier_id` | UUID | Ya | Supplier terkait pergerakan stok. |
| `ingredient_id` | UUID | Tidak | Foreign key bahan. |
| `user_id` | UUID | Tidak | User yang membuat pergerakan stok. |
| `stock_type_id` | UUID | Tidak | Foreign key ke tabel `stock_types`. |
| `qty` | decimal(10,2) | Tidak | Jumlah pergerakan stok. |
| `unit_cost` | decimal(15,2) | Ya | Harga satuan stok. |
| `current_stock` | decimal(10,2) | Tidak | Stok setelah pergerakan. |
| `notes` | text | Ya | Catatan pergerakan stok. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang berhubungan dengan tipe stok:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Pencatatan stok masuk/keluar/opname | `stock_type_id` untuk menentukan jenis pergerakan stok. |
| Laporan/riwayat stok | `stock_type_id` dan relasi `stock_type.name` untuk menampilkan jenis transaksi stok. |

### Relasi Tabel

```text
stock_movements.stock_type_id -> stock_types.stock_type_id
```

### Catatan Alur Data

- Endpoint `stock-type` saat ini bersifat read-only.
- Tipe stok dipakai oleh modul stok/inventory dan kasir, misalnya `OUT_SALES` saat stok bahan berkurang karena penjualan.
- Data tipe stok yang dikembalikan hanya data aktif dengan `deleted_at = null`.

---

## 1. Menampilkan Semua Tipe Stok

- **Endpoint:** `GET /`
- **Akses:** Protected (ADMIN)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil data tipe stok",
  "data": [
    {
      "stock_type_id": "uuid-stock-type-in",
      "name": "STOCK_IN"
    },
    {
      "stock_type_id": "uuid-stock-type-out",
      "name": "STOCK_OUT"
    },
    {
      "stock_type_id": "uuid-stock-type-opname",
      "name": "OPNAME"
    },
    {
      "stock_type_id": "uuid-stock-type-sales",
      "name": "SALES"
    }
  ]
}
```

---

## 2. Melihat Detail Tipe Stok

- **Endpoint:** `GET /:stock_type_id`
- **Akses:** Protected (ADMIN)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil detail tipe stok",
  "data": {
    "stock_type_id": "uuid-stock-type-in",
    "name": "STOCK_IN"
  }
}
```
