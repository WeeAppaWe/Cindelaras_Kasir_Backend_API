# Dokumentasi API Stok Opname

Dokumentasi ini menjelaskan rute API untuk halaman **Stok Opname**. Fitur ini digunakan untuk mencocokkan stok barang yang tercatat di sistem (`system_qty`) dengan perhitungan fisik sebenarnya di gudang (`physical_qty`).

**Catatan Penting:** Semua rute pada modul ini memerlukan hak akses dengan *role* **ADMIN**.

Opname memiliki siklus status (`DRAFT` → `COMPLETED` → `APPLIED`), di mana perubahan stok yang riil ke sistem hanya terjadi jika Opname di- *apply*.

Base URL Utama: `/api/opname`

---

## Tabel dan Field yang Dipakai

Modul stok opname memakai tabel utama `stock_opnames` sebagai header sesi opname dan `stock_opname_items` sebagai detail bahan yang dihitung. Tabel `ingredients` dan `unit_measures` dipakai untuk referensi bahan serta satuan. Tabel `users` dipakai untuk menyimpan admin yang membuat opname.

### Ringkasan Penggunaan Tabel

| Proses | Tabel yang Dipakai | Keterangan |
| :--- | :--- | :--- |
| Referensi bahan opname | `ingredients`, `unit_measures` | Mengambil bahan aktif, stok sistem saat ini, dan satuannya untuk form opname. |
| Menampilkan daftar opname | `stock_opnames`, `stock_opname_items`, `users` | Mengambil header opname aktif, user pembuat, dan jumlah item opname. |
| Membuat opname | `stock_opnames`, `stock_opname_items`, `ingredients`, `users` | Mengambil stok sistem bahan, menghitung selisih, lalu menyimpan header dan item opname. |
| Detail opname | `stock_opnames`, `stock_opname_items`, `ingredients`, `unit_measures`, `users` | Mengambil header, user, item, bahan, satuan, dan selisih stok. |
| Update opname draft | `stock_opnames`, `stock_opname_items`, `ingredients` | Update catatan dan/atau mengganti item opname selama status masih `DRAFT`. |
| Ubah status opname | `stock_opnames` | Mengubah status dari `DRAFT` ke `COMPLETED` atau `CANCELLED`. |
| Apply opname | `stock_opnames`, `stock_opname_items`, `ingredients` | Mengambil item opname, mengubah stok bahan ke `physical_qty`, lalu mengubah status menjadi `APPLIED`. |
| Hapus opname | `stock_opnames`, `stock_opname_items` | Soft delete header dan item opname. |

### 1. Tabel `stock_opnames`

Tabel header untuk sesi stok opname.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `stock_opname_id` | UUID | Tidak | Primary key stok opname. |
| `user_id` | UUID | Tidak | Foreign key ke tabel `users`, yaitu admin pembuat opname. |
| `opname_date` | date | Tidak | Tanggal pelaksanaan opname. |
| `status` | varchar(20) | Tidak | Status opname: `DRAFT`, `COMPLETED`, `APPLIED`, atau `CANCELLED`. |
| `notes` | text | Ya | Catatan opname. Dipakai untuk pencarian. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Endpoint hanya memakai opname dengan `deleted_at = null`. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List | `stock_opname_id`, `user_id`, `opname_date`, `status`, `notes`, `created_at`, `updated_at`, `deleted_at` |
| Search/filter | `notes`, `status`, `opname_date` |
| Detail | `stock_opname_id`, `user_id`, `opname_date`, `status`, `notes`, `created_at`, `updated_at`, `deleted_at` |
| Create | `user_id`, `opname_date`, `status`, `notes` |
| Update draft | `stock_opname_id`, `notes`, `status` |
| Change status | `stock_opname_id`, `status` |
| Apply | `stock_opname_id`, `status` |
| Delete | `stock_opname_id`, `status`, `deleted_at` |

### 2. Tabel `stock_opname_items`

Tabel detail bahan yang dihitung dalam satu sesi opname.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `stock_opname_item_id` | UUID | Tidak | Primary key item opname. |
| `stock_opname_id` | UUID | Tidak | Foreign key ke tabel `stock_opnames`. |
| `ingredient_id` | UUID | Tidak | Foreign key ke tabel `ingredients`. |
| `system_qty` | decimal(10,2) | Tidak | Stok sistem saat opname dibuat/update. |
| `physical_qty` | decimal(10,2) | Tidak | Stok fisik hasil hitung. |
| `difference` | decimal(10,2) | Tidak | Selisih `physical_qty - system_qty`. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List opname | Relasi `_count.items` untuk menghitung jumlah item. |
| Detail | `stock_opname_item_id`, `ingredient_id`, `system_qty`, `physical_qty`, `difference`, `deleted_at` |
| Create | `stock_opname_id`, `ingredient_id`, `system_qty`, `physical_qty`, `difference` |
| Update draft | `stock_opname_id`, `ingredient_id`, `system_qty`, `physical_qty`, `difference`, `deleted_at` |
| Apply | `stock_opname_id`, `ingredient_id`, `physical_qty`, `difference`, `deleted_at` |
| Delete | `stock_opname_id`, `deleted_at` |

### 3. Tabel `ingredients`

Tabel bahan yang dihitung dan disesuaikan stoknya.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `ingredient_id` | UUID | Tidak | Primary key bahan. |
| `unit_id` | UUID | Tidak | Foreign key ke tabel `unit_measures`. |
| `name` | varchar(100) | Tidak | Nama bahan. |
| `type` | varchar(20) | Tidak | Jenis bahan, misalnya `RAW` atau `SEMI`. |
| `stock_qty` | decimal(10,2) | Tidak | Stok sistem saat ini. Dibaca saat create/update opname dan diubah saat apply. |
| `min_stock` | decimal(10,2) | Tidak | Batas minimum stok. |
| `avg_cost` | decimal(15,2) | Tidak | Harga rata-rata bahan. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada stok opname:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Referensi bahan | `ingredient_id`, `name`, `stock_qty`, `unit_id`, `deleted_at` |
| Create/update item | `ingredient_id`, `stock_qty`, `deleted_at` |
| Detail item | `ingredient_id`, `name`, `unit_id` |
| Apply | `ingredient_id`, `stock_qty` diubah menjadi `stock_opname_items.physical_qty`. |

### 4. Tabel `unit_measures`

Tabel satuan bahan yang ditampilkan pada referensi dan detail opname.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `unit_measure_id` | UUID | Tidak | Primary key satuan. |
| `name` | varchar(50) | Tidak | Nama satuan. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada stok opname:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Referensi/detail bahan | `unit_measure_id`, `name` melalui relasi `ingredient.unit`. |

### 5. Tabel `users`

Tabel pengguna yang membuat opname.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `user_id` | UUID | Tidak | Primary key pengguna. |
| `username` | varchar(50) | Tidak | Username pengguna. |
| `name` | varchar(100) | Tidak | Nama admin pembuat opname. |
| `role_id` | UUID | Tidak | Foreign key role. |
| `user_status_id` | UUID | Tidak | Foreign key status. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada stok opname:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Create | `user_id` dari token autentikasi disimpan ke `stock_opnames.user_id`. |
| List/detail | `user_id`, `name` melalui relasi `user`. |

### Relasi Tabel

```text
stock_opnames.user_id -> users.user_id
stock_opname_items.stock_opname_id -> stock_opnames.stock_opname_id
stock_opname_items.ingredient_id -> ingredients.ingredient_id
ingredients.unit_id -> unit_measures.unit_measure_id
```

### Catatan Alur Data

- Status awal opname adalah `DRAFT`.
- `system_qty` diambil dari `ingredients.stock_qty` saat item opname dibuat atau diganti.
- `difference` dihitung dari `physical_qty - system_qty`.
- Apply opname hanya boleh dilakukan saat status `COMPLETED`; stok bahan diubah langsung ke `physical_qty`.
- Implementasi apply opname saat ini tidak membuat catatan baru di `stock_movements`; perubahan stok tercatat melalui data opname dan itemnya.
- Delete opname hanya diperbolehkan untuk status `DRAFT` atau `CANCELLED`, lalu dilakukan soft delete pada header dan item.

---

## 1. Referensi Bahan Baku (Untuk Form Opname)

Endpoint utilitas ini mengambil daftar bahan baku beserta nilai stok sistemnya saat ini, khusus disajikan untuk mengisi formulir pembuatan Opname baru di sisi FE.

- **Endpoint:** `GET /ingredients`
- **Akses:** Protected (ADMIN)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil data bahan baku untuk opname",
  "data": [
    {
      "ingredient_id": "uuid-ing-1",
      "name": "Kopi Arabica",
      "stock_qty": 1500,
      "unit": {
        "unit_measure_id": "uuid-unit-1",
        "name": "gr"
      }
    },
    {
      "ingredient_id": "uuid-ing-2",
      "name": "Gula Pasir",
      "stock_qty": 5000,
      "unit": {
        "unit_measure_id": "uuid-unit-2",
        "name": "gr"
      }
    }
  ]
}
```

---

## 2. Menampilkan Daftar Riwayat Opname

- **Endpoint:** `GET /`
- **Akses:** Protected (ADMIN)

**Query Parameters (Opsional):**
| Parameter | Tipe | Format / Pilihan | Deskripsi |
| :--- | :--- | :--- | :--- |
| `batch` | Number | Angka bulat | Halaman ke berapa (default: `1`) |
| `size` | Number | Angka bulat | Jumlah per halaman (default: `10`) |
| `search` | String | Bebas | Pencarian catatan (`notes`) |
| `status` | String | `"DRAFT"`, `"COMPLETED"`, `"APPLIED"`, `"CANCELLED"` | Filter berdasarkan status |
| `start_date`| Date | `YYYY-MM-DD` | Filter rentang tanggal awal |
| `end_date` | Date | `YYYY-MM-DD` | Filter rentang tanggal akhir |

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil daftar stok opname",
  "data": {
    "page": {
      "total_record_count": 5,
      "batch_number": 1,
      "batch_size": 10,
      "max_batch_size": 100
    },
    "records": [
      {
        "stock_opname_id": "uuid-opname-1",
        "opname_date": "2024-01-31T00:00:00.000Z",
        "status": "DRAFT",
        "notes": "Opname rutin akhir bulan Januari",
        "created_at": "2024-01-31T10:00:00.000Z",
        "updated_at": null,
        "user": {
          "user_id": "uuid-admin-1",
          "name": "Budi Admin"
        },
        "_count": {
          "items": 2
        }
      }
    ]
  }
}
```

---

## 3. Membuat Sesi Opname Baru (Create)

Ketika Opname dibuat, sistem akan otomatis mencatat *System Qty* (stok di DB saat pembuatan) untuk dibandingkan dengan *Physical Qty* (hasil hitung kasir). Status awal otomatis berupa `DRAFT`.

- **Endpoint:** `POST /`
- **Akses:** Protected (ADMIN)

**Request Body (JSON):**
| Field | Tipe | Deskripsi |
| :--- | :--- | :--- |
| `opname_date` | String | Tanggal dilakukannya opname (Format: `YYYY-MM-DD`) |
| `notes` | String | (Opsional) Keterangan. Maks 500 char. |
| `items` | Array | Daftar objek barang yang dihitung |
| `items[].ingredient_id` | String | ID bahan baku |
| `items[].physical_qty` | Number | Jumlah hitungan fisik (>= 0) |

**Contoh Request:**
```json
{
  "opname_date": "2024-01-31",
  "notes": "Opname rutin akhir bulan",
  "items": [
    {
      "ingredient_id": "uuid-ing-1",
      "physical_qty": 1450
    },
    {
      "ingredient_id": "uuid-ing-2",
      "physical_qty": 5100
    }
  ]
}
```

**Response Berhasil (200 OK):**
*(Sistem akan mengembalikan objek utuh detail Opname beserta items-nya)*

---

## 4. Melihat Detail & Hasil Selisih Opname

Melihat ringkasan lengkap data Opname beserta detail selisih per item (`difference` = *physical_qty* dikurang *system_qty*).

- **Endpoint:** `GET /:stock_opname_id`
- **Akses:** Protected (ADMIN)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil detail stok opname",
  "data": {
    "stock_opname_id": "uuid-opname-1",
    "opname_date": "2024-01-31T00:00:00.000Z",
    "status": "DRAFT",
    "notes": "Opname rutin akhir bulan",
    "created_at": "2024-01-31T10:00:00.000Z",
    "updated_at": null,
    "user": {
      "user_id": "uuid-admin-1",
      "name": "Budi Admin"
    },
    "items": [
      {
        "stock_opname_item_id": "uuid-item-1",
        "ingredient_id": "uuid-ing-1",
        "system_qty": 1500,
        "physical_qty": 1450,
        "difference": -50,
        "ingredient": {
          "ingredient_id": "uuid-ing-1",
          "name": "Kopi Arabica",
          "unit": {
            "unit_measure_id": "uuid-unit-1",
            "name": "gr"
          }
        }
      },
      {
        "stock_opname_item_id": "uuid-item-2",
        "ingredient_id": "uuid-ing-2",
        "system_qty": 5000,
        "physical_qty": 5100,
        "difference": 100,
        "ingredient": {
          "ingredient_id": "uuid-ing-2",
          "name": "Gula Pasir",
          "unit": {
            "unit_measure_id": "uuid-unit-2",
            "name": "gr"
          }
        }
      }
    ]
  }
}
```

---

## 5. Memperbarui Opname (Draft Mode)

Fitur untuk merevisi `physical_qty` apabila status masih `DRAFT`.
- **Endpoint:** `PATCH /:stock_opname_id`
- **Akses:** Protected (ADMIN)
- **Request Body (JSON):** Sama seperti pada proses *Create*, semua kolom opsional.
```json
{
  "notes": "Opname rutin akhir bulan (Update)",
  "items": [
    {
      "ingredient_id": "uuid-ing-1",
      "physical_qty": 1480
    }
  ]
}
```

---

## 6. Mengubah Status Opname

Mengunci Opname agar tidak bisa diubah-ubah lagi, atau membatalkannya.

- **Endpoint:** `PATCH /:stock_opname_id/status`
- **Akses:** Protected (ADMIN)
- **Request Body (JSON):**
```json
{
  "status": "COMPLETED"
}
```
*Catatan: Pilihan yang diperbolehkan di rute ini adalah `"COMPLETED"` atau `"CANCELLED"`.*

---

## 7. Menerapkan Penyesuaian ke Stok Asli (Apply)

Ini adalah eksekutor **Paling Krusial**. Endpoint ini akan mengambil seluruh nilai selisih (`difference`) dari Opname bersangkutan dan meng-*update* nilai stok asli semua bahan baku di Database. Status akan otomatis berubah menjadi `APPLIED`.

- **Endpoint:** `POST /:stock_opname_id/apply`
- **Akses:** Protected (ADMIN)
- **Request Body:** (Tidak ada)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Penyesuaian stok opname berhasil diaplikasikan",
  "data": {
    "success": true,
    "message": "Penyesuaian berhasil diterapkan",
    "adjustments_count": 2
  }
}
```

---

## 8. Menghapus Opname (Soft Delete)

- **Endpoint:** `DELETE /:stock_opname_id`
- **Akses:** Protected (ADMIN)
- **Request Body:** (Tidak ada)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil menghapus stok opname",
  "data": {
    "success": true,
    "message": "Opname berhasil dihapus"
  }
}
```
