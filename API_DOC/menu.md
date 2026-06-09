# Dokumentasi API Menu & Resep (Menu Management)

Dokumentasi ini menjelaskan rute API (endpoints) yang digunakan oleh Frontend untuk halaman **Manajemen Menu**. Dokumentasi ini terbagi menjadi dua bagian: Pengelolaan Data Menu (Katalog Utama) dan Pengelolaan Resep Menu (HPP/Bahan Baku).

Base URL Utama: `/api/menu`

---

## Tabel dan Field yang Dipakai

Modul menu memakai tabel utama `menus`. Untuk kategori menu dipakai tabel `categories`, sedangkan resep/HPP menu memakai `menu_recipes`, `ingredients`, dan `unit_measures`. Tabel `order_items` dibaca saat validasi hapus menu agar menu yang sudah pernah dipesan tidak dapat dihapus.

### Ringkasan Penggunaan Tabel

| Proses | Tabel yang Dipakai | Keterangan |
| :--- | :--- | :--- |
| Menampilkan daftar menu | `menus`, `categories`, `menu_recipes` | Mengambil menu aktif, kategori, jumlah resep, dan menghitung margin/profit dari `price` dan `cost`. |
| Detail menu | `menus`, `categories`, `menu_recipes`, `ingredients`, `unit_measures` | Mengambil profil menu, kategori, komposisi resep, satuan bahan, dan ringkasan HPP. |
| Membuat menu | `menus`, `categories` | Validasi nama menu duplikat dan validasi kategori aktif, lalu membuat menu dengan `cost = 0`. |
| Mengubah menu | `menus`, `categories` | Validasi menu ada, nama tidak duplikat, dan kategori aktif jika `category_id` dikirim. |
| Toggle ketersediaan | `menus` | Membalik nilai `is_available`. |
| Menghapus menu | `menus`, `order_items` | Validasi menu belum pernah dipakai order, lalu soft delete menu. |
| Menampilkan resep menu | `menu_recipes`, `ingredients`, `unit_measures` | Mengambil komposisi bahan dan menghitung subtotal per bahan. |
| Tambah/ubah/hapus resep | `menus`, `menu_recipes`, `ingredients`, `unit_measures` | Mengelola bahan resep dan menghitung ulang `menus.cost`. |
| Bulk update resep | `menus`, `menu_recipes`, `ingredients` | Mengganti seluruh resep menu dan menghitung ulang HPP. |

### 1. Tabel `menus`

Tabel utama untuk katalog menu.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `menu_id` | UUID | Tidak | Primary key menu. |
| `category_id` | UUID | Tidak | Foreign key ke tabel `categories`. |
| `name` | varchar(100) | Tidak | Nama menu. Dipakai untuk pencarian dan validasi duplikat. |
| `price` | decimal(15,2) | Tidak | Harga jual menu. |
| `cost` | decimal(15,2) | Tidak | HPP menu, diperbarui dari total resep. |
| `description` | text | Ya | Deskripsi menu. |
| `image_url` | varchar(255) | Ya | URL/path gambar menu. Nilai ini biasanya berasal dari `response.url` endpoint upload target `menu`. |
| `is_available` | boolean | Tidak | Status menu tersedia/tidak tersedia. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Endpoint hanya memakai menu dengan `deleted_at = null`. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List/detail | `menu_id`, `name`, `price`, `cost`, `description`, `image_url`, `is_available`, `created_at`, `updated_at`, `category_id`, `deleted_at` |
| Search/filter | `name`, `category_id`, `is_available` |
| Create | `name`, `category_id`, `price`, `cost`, `description`, `image_url`, `is_available` |
| Update | `menu_id`, `name`, `category_id`, `price`, `description`, `image_url`, `is_available` |
| Update HPP | `menu_id`, `cost` |
| Delete | `menu_id`, `deleted_at` |

### 2. Tabel `categories`

Tabel master kategori menu.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `category_id` | UUID | Tidak | Primary key kategori. |
| `name` | varchar(50) | Tidak | Nama kategori. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Validasi kategori hanya memakai data aktif. |

Field yang dipakai pada modul menu:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List/detail menu | `category_id`, `name` melalui relasi `category`. |
| Create/update menu | `category_id`, `deleted_at` untuk validasi kategori aktif. |

### 3. Tabel `menu_recipes`

Tabel komposisi bahan untuk menu.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `menu_recipe_id` | UUID | Tidak | Primary key resep menu. |
| `menu_id` | UUID | Tidak | Foreign key ke tabel `menus`. |
| `ingredient_id` | UUID | Tidak | Foreign key ke tabel `ingredients`. |
| `qty_needed` | decimal(10,2) | Tidak | Jumlah bahan yang dibutuhkan untuk 1 porsi menu. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker untuk resep aktif. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List resep | `menu_recipe_id`, `menu_id`, `ingredient_id`, `qty_needed`, `created_at`, `updated_at`, `deleted_at` |
| Tambah resep | `menu_id`, `ingredient_id`, `qty_needed` |
| Update resep | `menu_recipe_id`, `menu_id`, `qty_needed` |
| Hapus resep | `menu_recipe_id`, `deleted_at` |
| Hitung HPP | `menu_id`, `ingredient_id`, `qty_needed`, `deleted_at` |

### 4. Tabel `ingredients`

Tabel bahan baku/bahan setengah jadi yang dipakai sebagai komposisi menu.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `ingredient_id` | UUID | Tidak | Primary key bahan. |
| `unit_id` | UUID | Tidak | Foreign key ke tabel `unit_measures`. |
| `name` | varchar(100) | Tidak | Nama bahan. |
| `type` | varchar(20) | Tidak | Jenis bahan, misalnya `RAW` atau `SEMI`. |
| `stock_qty` | decimal(10,2) | Tidak | Stok bahan saat ini. |
| `min_stock` | decimal(10,2) | Tidak | Batas minimum stok bahan. |
| `avg_cost` | decimal(15,2) | Tidak | Harga/HPP rata-rata per satuan bahan. Dipakai untuk hitung HPP menu. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Resep hanya memakai bahan aktif. |

Field yang dipakai pada modul menu:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Validasi resep | `ingredient_id`, `deleted_at` |
| List resep/HPP | `ingredient_id`, `name`, `stock_qty`, `avg_cost`, `unit_id`, `deleted_at` |
| Hitung subtotal | `avg_cost` dikalikan `menu_recipes.qty_needed`. |

### 5. Tabel `unit_measures`

Tabel satuan bahan yang ditampilkan pada detail resep.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `unit_measure_id` | UUID | Tidak | Primary key satuan. |
| `name` | varchar(50) | Tidak | Nama satuan. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada modul menu:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List/detail resep | `unit_measure_id`, `name` melalui relasi `ingredient.unit`. |

### 6. Tabel `order_items`

Tabel item transaksi dipakai untuk validasi hapus menu.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `order_item_id` | UUID | Tidak | Primary key item order. |
| `order_id` | UUID | Tidak | Foreign key ke tabel `orders`. |
| `menu_id` | UUID | Tidak | Foreign key ke tabel `menus`. |
| `qty` | integer | Tidak | Jumlah menu yang dipesan. |
| `price` | decimal(15,2) | Tidak | Harga menu saat transaksi. |
| `subtotal` | decimal(15,2) | Tidak | Subtotal item transaksi. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada modul menu:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Validasi delete menu | `menu_id`, `deleted_at` untuk memastikan menu belum pernah dipakai order aktif. |

### Relasi Tabel

```text
menus.category_id -> categories.category_id
menu_recipes.menu_id -> menus.menu_id
menu_recipes.ingredient_id -> ingredients.ingredient_id
ingredients.unit_id -> unit_measures.unit_measure_id
order_items.menu_id -> menus.menu_id
```

### Catatan Alur Data

- Nama menu dicek duplikat secara case-insensitive untuk menu aktif.
- HPP menu (`menus.cost`) dihitung dari `sum(menu_recipes.qty_needed * ingredients.avg_cost)`.
- Mengubah resep otomatis menghitung ulang `menus.cost`.
- Menu tidak bisa dihapus jika sudah memiliki riwayat order aktif di `order_items`.
- Delete menu dan delete resep memakai soft delete, kecuali bulk update resep yang mengganti semua resep menu.

### Catatan Upload Gambar Menu

Endpoint menu tidak menerima file gambar secara langsung. Untuk mengisi `image_url`, frontend perlu upload file terlebih dahulu melalui endpoint upload, lalu memakai nilai `response.url` sebagai `image_url` pada create/update menu.

Flow yang disarankan:

1. Upload gambar ke `POST /api/upload/image/menu`.
2. Ambil nilai `response.url` dari response upload.
3. Kirim URL tersebut ke field `image_url` saat `POST /api/menu` atau `PATCH /api/menu/:menu_id`.

Detail kontrak upload gambar tersedia di [`upload.md`](./upload.md).

---

## BAGIAN A: Manajemen Data Menu

Hanya **ADMIN** yang dapat menambah, mengubah, atau menghapus menu. **KASIR** dan **ADMIN** dapat melihat daftar menu (untuk operasional).

### 1. Menampilkan Daftar Menu
Menampilkan seluruh menu dengan fitur *pagination*, pencarian, dan *filter* (kategori & status ketersediaan).

- **Endpoint:** `GET /`
- **Akses:** Protected (Kasir & Admin)
- **Query Params:**
  - `batch` (Number): Halaman ke berapa (default: 1)
  - `size` (Number): Jumlah per halaman (default: 10)
  - `search` (String): Pencarian nama menu
  - `category_id` (UUID): Filter berdasarkan kategori
  - `is_available` (Boolean): Filter berdasarkan ketersediaan (`true`/`false`)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil data menu",
  "data": {
    "page": {
      "total_record_count": 50,
      "batch_number": 1,
      "batch_size": 10,
      "max_batch_size": 100
    },
    "records": [
      {
        "menu_id": "uuid-menu-1",
        "name": "Kopi Susu",
        "price": 25000,
        "cost": 10000,
        "description": "Kopi susu nikmat",
        "image_url": "https://your-project-ref.supabase.co/storage/v1/object/public/images/menus/0197f1d2-8c7d-7c0f-9a6f-99b2f0e8a120.png",
        "is_available": true,
        "created_at": "2024-01-01T10:00:00Z",
        "updated_at": null,
        "category": {
          "category_id": "uuid-category-1",
          "name": "Minuman"
        },
        "_count": {
          "recipes": 3
        },
        "margin_percent": 60,
        "profit": 15000
      }
    ]
  }
}
```

### 2. Menambah Menu Baru
- **Endpoint:** `POST /`
- **Akses:** Protected (ADMIN)

**Request Body (JSON):**
```json
{
  "name": "Nasi Goreng Spesial",
  "category_id": "uuid-category-2",
  "price": 35000,
  "description": "Nasi goreng ayam, sosis, dan telur mata sapi",
  "image_url": "https://your-project-ref.supabase.co/storage/v1/object/public/images/menus/0197f1d2-8c7d-7c0f-9a6f-99b2f0e8a120.png",
  "is_available": true
}
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Menu berhasil dibuat",
  "data": {
    "menu_id": "uuid-menu-2",
    "name": "Nasi Goreng Spesial",
    "price": 35000,
    "cost": 0,
    "description": "Nasi goreng ayam, sosis, dan telur mata sapi",
    "image_url": "https://your-project-ref.supabase.co/storage/v1/object/public/images/menus/0197f1d2-8c7d-7c0f-9a6f-99b2f0e8a120.png",
    "is_available": true,
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": null
  }
}
```

### 3. Melihat Detail Menu (Beserta Resep)
- **Endpoint:** `GET /:menu_id`
- **Akses:** Protected (Kasir & Admin)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil detail menu",
  "data": {
    "menu_id": "uuid-menu-1",
    "name": "Kopi Susu",
    "price": 25000,
    "cost": 10000,
    "description": "Kopi susu nikmat",
    "image_url": "https://your-project-ref.supabase.co/storage/v1/object/public/images/menus/0197f1d2-8c7d-7c0f-9a6f-99b2f0e8a120.png",
    "is_available": true,
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": null,
    "category": {
      "category_id": "uuid-category-1",
      "name": "Minuman"
    },
    "recipes": [
      {
        "menu_recipe_id": "uuid-recipe-1",
        "ingredient_id": "uuid-ing-1",
        "ingredient_name": "Kopi Espresso",
        "qty_needed": 30,
        "unit_name": "ml",
        "unit_cost": 100,
        "subtotal": 3000
      }
    ],
    "cost_summary": {
      "hpp": 10000,
      "price": 25000,
      "margin_percent": 60,
      "profit": 15000
    }
  }
}
```

### 4. Memperbarui Data Menu
- **Endpoint:** `PATCH /:menu_id`
- **Akses:** Protected (ADMIN)

**Request Body (JSON) (semua opsional):**
```json
{
  "name": "Nasi Goreng Seafood",
  "price": 40000
}
```
*(Response berupa detail objek Menu terupdate yang sama formatnya dengan fungsi Create).*

### 5. Toggle Status Ketersediaan (Habis / Tersedia)
Digunakan secara cepat untuk mematikan menu jika bahan abis tanpa mengedit detail data lainnya.
- **Endpoint:** `PATCH /:menu_id/toggle-availability`
- **Akses:** Protected (ADMIN)
- **Request Body:** (Tidak ada)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Status menu berhasil diubah",
  "data": {
    "success": true,
    "is_available": false
  }
}
```

### 6. Menghapus Menu (Soft Delete)
- **Endpoint:** `DELETE /:menu_id`
- **Akses:** Protected (ADMIN)
- **Request Body:** (Tidak ada)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Menu berhasil dihapus",
  "data": {
    "success": true,
    "message": "Menu berhasil dihapus"
  }
}
```

---

## BAGIAN B: Manajemen Resep Menu (HPP)

Resep menentukan komposisi bahan baku (Ingredients) yang dibutuhkan untuk 1 porsi menu. Mengubah resep otomatis mengubah HPP (cost) dari menu tersebut.

**Catatan:** Semua rute resep mengharuskan *role* **ADMIN**.

Base URL: `/api/menu/:menu_id/recipe`

### 1. Menampilkan Daftar Komposisi Resep 
- **Endpoint:** `GET /`

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil resep menu",
  "data": {
    "menu_id": "uuid-menu-1",
    "total_hpp": 10000,
    "recipes": [
      {
        "menu_recipe_id": "uuid-recipe-1",
        "menu_id": "uuid-menu-1",
        "ingredient_id": "uuid-ing-1",
        "qty_needed": 30,
        "created_at": "2024-01-01T10:00:00Z",
        "updated_at": null,
        "ingredient": {
          "ingredient_id": "uuid-ing-1",
          "name": "Kopi Espresso",
          "stock_qty": 5000,
          "avg_cost": 100,
          "unit": {
            "unit_measure_id": "uuid-unit-ml",
            "name": "ml"
          }
        },
        "subtotal": 3000
      }
    ]
  }
}
```

### 2. Menambah Bahan Baku ke Resep
- **Endpoint:** `POST /`

**Request Body (JSON):**
```json
{
  "ingredient_id": "uuid-ing-2",
  "qty_needed": 100
}
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Resep berhasil ditambahkan",
  "data": {
    "recipe": {
      "menu_recipe_id": "uuid-recipe-2",
      "menu_id": "uuid-menu-1",
      "ingredient_id": "uuid-ing-2",
      "qty_needed": 100,
      "created_at": "2024-01-01T10:05:00Z",
      "updated_at": null,
      "ingredient": {
        "ingredient_id": "uuid-ing-2",
        "name": "Susu Kental Manis",
        "stock_qty": 5000,
        "avg_cost": 20,
        "unit": {
          "unit_measure_id": "uuid-unit-ml",
          "name": "ml"
        }
      },
      "subtotal": 2000
    },
    "new_hpp": 12000
  }
}
```

### 3. Mengubah Kuantitas Resep
- **Endpoint:** `PATCH /:recipe_id`

**Request Body (JSON):**
```json
{
  "qty_needed": 150
}
```
*(Response format mengembalikan objek data Resep yang sudah diubah).*

### 4. Menghapus Bahan Baku dari Resep
- **Endpoint:** `DELETE /:recipe_id`
- **Request Body:** (Tidak ada)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Resep berhasil dihapus",
  "data": {
    "success": true,
    "message": "Resep berhasil dihapus",
    "new_hpp": 10000
  }
}
```

### 5. Bulk Update / Ganti Keseluruhan Resep
Digunakan jika Anda ingin menimpa *seluruh* resep sebuah menu dalam 1 kali kirim dari UI FE (seperti mode *save all*).
- **Endpoint:** `PATCH /`

**Request Body (JSON):**
```json
{
  "recipes": [
    {
      "ingredient_id": "uuid-ing-1",
      "qty_needed": 30
    },
    {
      "ingredient_id": "uuid-ing-2",
      "qty_needed": 100
    }
  ]
}
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Resep menu berhasil diperbarui",
  "data": {
    "menu_id": "uuid-menu-1",
    "total_hpp": 12000,
    "recipes": [
      {
        "menu_recipe_id": "uuid-recipe-1",
        "menu_id": "uuid-menu-1",
        "ingredient_id": "uuid-ing-1",
        "qty_needed": 30,
        "created_at": "2024-01-01T10:00:00Z",
        "updated_at": "2024-01-01T10:10:00Z",
        "ingredient": {
          "ingredient_id": "uuid-ing-1",
          "name": "Kopi Espresso",
          "stock_qty": 5000,
          "avg_cost": 100,
          "unit": {
            "unit_measure_id": "uuid-unit-ml",
            "name": "ml"
          }
        },
        "subtotal": 3000
      },
      {
        "menu_recipe_id": "uuid-recipe-2",
        "menu_id": "uuid-menu-1",
        "ingredient_id": "uuid-ing-2",
        "qty_needed": 100,
        "created_at": "2024-01-01T10:05:00Z",
        "updated_at": "2024-01-01T10:10:00Z",
        "ingredient": {
          "ingredient_id": "uuid-ing-2",
          "name": "Susu Kental Manis",
          "stock_qty": 5000,
          "avg_cost": 20,
          "unit": {
            "unit_measure_id": "uuid-unit-ml",
            "name": "ml"
          }
        },
        "subtotal": 2000
      }
    ]
  }
}
```
