# Dokumentasi API Kategori (Category)

Dokumentasi ini menjelaskan rute API (endpoints) yang digunakan oleh Frontend untuk halaman **Manajemen Kategori**. Fitur ini meliputi operasi CRUD (Create, Read, Update, Delete) untuk kategori menu yang ada di sistem.

**Catatan Penting:** Endpoint daftar dan dropdown kategori dapat diakses oleh role **ADMIN** dan **CASHIER**. Endpoint tambah, ubah, hapus, dan detail kategori memerlukan role **ADMIN**.

Base URL: `/api/category`

---

## Tabel dan Field yang Dipakai

Modul kategori memakai tabel utama `categories`. Tabel `menus` juga dibaca untuk menghitung jumlah menu per kategori dan validasi hapus kategori.

### Ringkasan Penggunaan Tabel

| Proses | Tabel yang Dipakai | Keterangan |
| :--- | :--- | :--- |
| Dropdown kategori | `categories` | Mengambil kategori aktif tanpa pagination untuk pilihan form. |
| Menampilkan daftar kategori | `categories`, `menus` | Mengambil kategori aktif dan jumlah menu terkait melalui `_count.menus`. |
| Detail kategori | `categories` | Mengambil satu kategori berdasarkan `category_id`. |
| Membuat kategori | `categories` | Validasi nama duplikat, lalu membuat kategori baru. |
| Mengubah kategori | `categories` | Validasi kategori ada dan nama tidak dipakai kategori lain. |
| Menghapus kategori | `categories`, `menus` | Validasi kategori ada dan tidak memiliki menu aktif, lalu soft delete kategori. |

### 1. Tabel `categories`

Tabel utama untuk master kategori menu.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `category_id` | UUID | Tidak | Primary key kategori. |
| `name` | varchar(50) | Tidak | Nama kategori. Dipakai untuk pencarian dan validasi duplikat. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Endpoint kategori hanya memakai data dengan `deleted_at = null`. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Dropdown | `category_id`, `name`, `deleted_at` |
| List | `category_id`, `name`, `created_at`, `updated_at`, `deleted_at` |
| Search | `name` |
| Detail | `category_id`, `name`, `created_at`, `updated_at`, `deleted_at` |
| Create | `name` |
| Update | `category_id`, `name` |
| Delete | `category_id`, `deleted_at` |

### 2. Tabel `menus`

Tabel menu dipakai sebagai relasi kategori.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `menu_id` | UUID | Tidak | Primary key menu. |
| `category_id` | UUID | Tidak | Foreign key ke tabel `categories`. |
| `name` | varchar(100) | Tidak | Nama menu. |
| `price` | decimal(15,2) | Tidak | Harga jual menu. |
| `cost` | decimal(15,2) | Tidak | HPP/cost menu. |
| `description` | text | Ya | Deskripsi menu. |
| `image_url` | varchar(255) | Ya | URL/path gambar menu. |
| `is_available` | boolean | Tidak | Status ketersediaan menu. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada modul kategori:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List kategori | Relasi `_count.menus` untuk menghitung jumlah menu di tiap kategori. |
| Delete kategori | `category_id`, `deleted_at` untuk memastikan kategori tidak masih dipakai menu aktif. |

### Relasi Tabel

```text
menus.category_id -> categories.category_id
```

### Catatan Alur Data

- Nama kategori dicek duplikat secara case-insensitive.
- Hapus kategori memakai soft delete dengan mengisi `categories.deleted_at`.
- Kategori tidak dapat dihapus jika masih memiliki menu aktif (`menus.deleted_at = null`).
- Endpoint dropdown kategori mengembalikan data ringan tanpa pagination.

---

## 1. Menampilkan Pilihan Kategori untuk Dropdown

Endpoint ini digunakan untuk mengambil semua kategori aktif dalam bentuk data ringan untuk kebutuhan dropdown.

- **Endpoint:** `GET /options`
- **Akses:** Protected (ADMIN, CASHIER)
- **Query Parameters:** Tidak ada

**Contoh Penggunaan URL:**
`GET /api/category/options`

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Berhasil mengambil data pilihan kategori",
  "data": [
    {
      "category_id": "uuid-category-1",
      "name": "Makanan Utama"
    },
    {
      "category_id": "uuid-category-2",
      "name": "Minuman"
    }
  ]
}
```

---

## 2. Menampilkan Daftar Kategori

Endpoint ini digunakan untuk mengambil daftar kategori dengan fitur pencarian dan *pagination*. Setiap *record* juga akan mengembalikan jumlah menu (`_count.menus`) yang terhubung dengan kategori tersebut.

- **Endpoint:** `GET /`
- **Akses:** Protected (ADMIN, CASHIER)

### Query Parameters

Semua parameter bersifat opsional:

| Parameter | Tipe | Format / Pilihan | Deskripsi |
| :--- | :--- | :--- | :--- |
| `batch` | Number | Angka bulat | Halaman ke berapa (default: `1`) |
| `size` | Number | Angka bulat | Jumlah per halaman (default: `10`, maks `100`) |
| `search` | String | Bebas | Pencarian berdasarkan nama kategori |

**Contoh Penggunaan URL:**
`GET /api/category?batch=1&size=20&search=minuman`

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Berhasil mengambil data kategori",
  "data": {
    "page": {
      "total_record_count": 5,
      "batch_number": 1,
      "batch_size": 20,
      "max_batch_size": 100
    },
    "records": [
      {
        "category_id": "uuid-category-1",
        "name": "Minuman Dingin",
        "created_at": "2024-01-01T10:00:00Z",
        "updated_at": "2024-01-02T10:00:00Z",
        "_count": {
          "menus": 12
        }
      },
      {
        "category_id": "uuid-category-2",
        "name": "Makanan Utama",
        "created_at": "2024-01-01T10:00:00Z",
        "updated_at": null,
        "_count": {
          "menus": 8
        }
      }
    ]
  }
}
```

---

## 3. Membuat Kategori Baru

Endpoint ini digunakan untuk menambahkan kategori menu baru ke dalam sistem.

- **Endpoint:** `POST /`
- **Akses:** Protected (ADMIN)

### Request Body (JSON)

| Field | Tipe | Validasi | Deskripsi |
| :--- | :--- | :--- | :--- |
| `name` | String | Wajib, min 2, max 50 char | Nama kategori baru |

**Contoh Request:**
```json
{
  "name": "Cemilan Manis"
}
```

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Berhasil membuat kategori baru",
  "data": {
    "category_id": "uuid-category-3",
    "name": "Cemilan Manis",
    "created_at": "2024-01-03T14:30:00Z",
    "updated_at": null
  }
}
```

---

## 4. Melihat Detail Kategori

Endpoint ini mengambil rincian dari satu kategori tertentu berdasarkan ID-nya.

- **Endpoint:** `GET /:category_id`
- **Akses:** Protected (ADMIN)

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Berhasil mengambil detail kategori",
  "data": {
    "category_id": "uuid-category-1",
    "name": "Minuman Dingin",
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": "2024-01-02T10:00:00Z"
  }
}
```

---

## 5. Memperbarui Kategori

Endpoint ini digunakan untuk mengubah nama dari kategori yang sudah ada.

- **Endpoint:** `PATCH /:category_id`
- **Akses:** Protected (ADMIN)

### Request Body (JSON)

| Field | Tipe | Validasi | Deskripsi |
| :--- | :--- | :--- | :--- |
| `name` | String | Opsional, min 2, max 50 char | Nama kategori pengganti |

**Contoh Request:**
```json
{
  "name": "Minuman Panas & Dingin"
}
```

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Berhasil memperbarui kategori",
  "data": {
    "category_id": "uuid-category-1",
    "name": "Minuman Panas & Dingin",
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": "2024-01-04T09:15:00Z"
  }
}
```

---

## 6. Menghapus Kategori (Soft Delete)

Endpoint ini digunakan untuk menghapus kategori secara logika (*soft delete*). Kategori tidak akan benar-benar dihapus dari *database*, melainkan kolom `deleted_at` akan diisi.

- **Endpoint:** `DELETE /:category_id`
- **Akses:** Protected (ADMIN)
- **Request Body:** (Tidak ada)

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Berhasil menghapus kategori",
  "data": {
    "success": true,
    "message": "Kategori berhasil dihapus"
  }
}
```
