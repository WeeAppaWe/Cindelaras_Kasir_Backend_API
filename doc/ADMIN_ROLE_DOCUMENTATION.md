# 📋 Dokumentasi Fitur & Endpoint Role Admin

Dokumentasi lengkap fitur dan endpoint API yang dapat diakses oleh **Role Admin** pada Sistem Kasir ISCP.

**Base URL**: `http://localhost:3000/api`

> **Catatan**: Admin dapat mengakses **SEMUA endpoint Kasir** ditambah endpoint khusus admin di bawah ini.

---

# 📑 Daftar Isi

1. [Otentikasi](#-otentikasi-authentication)
2. [Manajemen User](#-manajemen-user)
3. [Manajemen Kategori](#-manajemen-kategori)
4. [Manajemen Menu](#-manajemen-menu)
5. [Resep Menu](#-resep-menu-menu-recipe)
6. [Bahan Baku (Raw Ingredient)](#-bahan-baku-raw-ingredient)
7. [Bahan Setengah Jadi (Semi Ingredient)](#-bahan-setengah-jadi-semi-ingredient)
8. [Komposisi Bahan](#-komposisi-bahan-ingredient-composition)
9. [Manajemen Supplier](#-manajemen-supplier)
10. [Manajemen Inventaris](#-manajemen-inventaris)
11. [Stock Opname](#-stock-opname)
12. [Laporan Finansial](#-laporan-finansial)
13. [Laporan Operasional](#-laporan-operasional)
14. [Laporan Inventaris](#-laporan-inventaris)
15. [Analisis SPK](#-analisis-spk-smart-purchasing)
16. [Manajemen Shift (All)](#-manajemen-shift-semua-kasir)

---

## 🔐 Otentikasi (Authentication)

Sama dengan role Kasir. Lihat [KASIR_ROLE_DOCUMENTATION.md](./KASIR_ROLE_DOCUMENTATION.md#-otentikasi-authentication).

---

## 👥 Manajemen User

Admin dapat mengelola seluruh pengguna sistem (CRUD User).

### 1. Lihat Daftar Role

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /user/roles` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "records": [
      { "role_id": "uuid-role-1", "name": "ADMIN" },
      { "role_id": "uuid-role-2", "name": "CASHIER" }
    ]
  },
  "metaData": { "message": "Berhasil mengambil data role", "code": 200 }
}
```

---

### 2. Lihat Daftar Status User

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /user/statuses` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "records": [
      { "user_status_id": "uuid-status-1", "name": "ACTIVE" },
      { "user_status_id": "uuid-status-2", "name": "INACTIVE" },
      { "user_status_id": "uuid-status-3", "name": "DELETED" }
    ]
  },
  "metaData": { "message": "Berhasil mengambil data status", "code": 200 }
}
```

---

### 3. Lihat Daftar User

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /user` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Query Parameters
| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `batch` | number | Halaman (default: 1) |
| `size` | number | Jumlah per halaman (max: 100) |
| `search` | string | Cari nama/username |
| `role_id` | UUID | Filter berdasarkan role |
| `user_status_id` | UUID | Filter berdasarkan status |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "records": [
      {
        "user_id": "uuid-user-1",
        "username": "admin1",
        "name": "Administrator",
        "role": { "role_id": "uuid-role-1", "name": "ADMIN" },
        "status": { "user_status_id": "uuid-status-1", "name": "ACTIVE" },
        "created_at": "2026-01-01T00:00:00.000Z"
      }
    ],
    "total": 5,
    "batch": 1,
    "size": 10,
    "total_pages": 1
  },
  "metaData": { "message": "Berhasil mengambil data user", "code": 200 }
}
```

---

### 4. Detail User

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /user/:user_id` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "user_id": "uuid-user-1",
    "username": "kasir1",
    "name": "Budi Kasir",
    "role": { "role_id": "uuid-role-2", "name": "CASHIER" },
    "status": { "user_status_id": "uuid-status-1", "name": "ACTIVE" },
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-15T10:30:00.000Z"
  },
  "metaData": { "message": "Berhasil mengambil detail user", "code": 200 }
}
```

---

### 5. Buat User Baru

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `POST /user` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Request Body
```json
{
  "username": "kasir_baru",
  "password": "password123",
  "name": "Kasir Baru",
  "role_id": "uuid-role-2"
}
```

| Field | Tipe | Validasi | Deskripsi |
|-------|------|----------|-----------|
| `username` | string | 3-50 char, alphanumeric+underscore | Username unik |
| `password` | string | 6-255 char | Password |
| `name` | string | 2-100 char | Nama lengkap |
| `role_id` | UUID | required | ID Role |
| `user_status_id` | UUID | optional | ID Status (default: ACTIVE) |

#### Response Sukses (201 Created)
```json
{
  "response": {
    "user_id": "uuid-new-user",
    "username": "kasir_baru",
    "name": "Kasir Baru",
    "role": { "role_id": "uuid-role-2", "name": "CASHIER" },
    "status": { "user_status_id": "uuid-status-1", "name": "ACTIVE" },
    "created_at": "2026-01-24T10:00:00.000Z"
  },
  "metaData": { "message": "User berhasil dibuat", "code": 201 }
}
```

---

### 6. Update User

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `PATCH /user/:user_id` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Request Body (semua field opsional)
```json
{
  "name": "Nama Baru",
  "password": "newpassword123",
  "user_status_id": "uuid-status-inactive"
}
```

#### Response Sukses (200 OK)
```json
{
  "response": {
    "user_id": "uuid-user-1",
    "username": "kasir1",
    "name": "Nama Baru",
    "updated_at": "2026-01-24T11:00:00.000Z"
  },
  "metaData": { "message": "User berhasil diupdate", "code": 200 }
}
```

---

### 7. Hapus User (Soft Delete)

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `DELETE /user/:user_id` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Response Sukses (200 OK)
```json
{
  "response": { "user_id": "uuid-user-1", "deleted": true },
  "metaData": { "message": "User berhasil dihapus", "code": 200 }
}
```

---

## 📂 Manajemen Kategori

Admin dapat mengelola kategori menu.

### 1. Lihat Daftar Kategori

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /category` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "records": [
      { "category_id": "uuid-cat-1", "name": "Makanan", "menu_count": 15 },
      { "category_id": "uuid-cat-2", "name": "Minuman", "menu_count": 20 },
      { "category_id": "uuid-cat-3", "name": "Snack", "menu_count": 8 }
    ],
    "total": 3
  },
  "metaData": { "message": "Berhasil mengambil data kategori", "code": 200 }
}
```

---

### 2. Detail Kategori

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /category/:category_id` |

---

### 3. Buat Kategori Baru

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `POST /category` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Request Body
```json
{
  "name": "Dessert"
}
```

#### Response Sukses (201 Created)
```json
{
  "response": {
    "category_id": "uuid-new-category",
    "name": "Dessert",
    "created_at": "2026-01-24T10:00:00.000Z"
  },
  "metaData": { "message": "Kategori berhasil dibuat", "code": 201 }
}
```

---

### 4. Update Kategori

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `PATCH /category/:category_id` |

#### Request Body
```json
{ "name": "Nama Kategori Baru" }
```

---

### 5. Hapus Kategori

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `DELETE /category/:category_id` |

---

## 🍽️ Manajemen Menu

Admin dapat mengelola menu (CRUD). Kasir hanya bisa melihat.

### 1. Buat Menu Baru

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `POST /menu` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Request Body
```json
{
  "name": "Nasi Goreng Spesial",
  "price": 25000,
  "category_id": "uuid-category-makanan",
  "description": "Nasi goreng dengan telur dan ayam",
  "image_url": "https://example.com/images/nasgor.jpg",
  "is_available": true
}
```

| Field | Tipe | Validasi | Deskripsi |
|-------|------|----------|-----------|
| `name` | string | 2-100 char | Nama menu |
| `price` | number | min: 0 | Harga jual |
| `category_id` | UUID | required | ID Kategori |
| `description` | string | max: 500 (opsional) | Deskripsi menu |
| `image_url` | string | (opsional) | URL gambar |
| `is_available` | boolean | default: true | Status ketersediaan |

#### Response Sukses (201 Created)
```json
{
  "response": {
    "menu_id": "uuid-new-menu",
    "name": "Nasi Goreng Spesial",
    "price": 25000,
    "category": { "category_id": "uuid-cat-1", "name": "Makanan" },
    "is_available": true,
    "created_at": "2026-01-24T10:00:00.000Z"
  },
  "metaData": { "message": "Menu berhasil dibuat", "code": 201 }
}
```

---

### 2. Update Menu

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `PATCH /menu/:menu_id` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Request Body (semua field opsional)
```json
{
  "price": 27000,
  "description": "Deskripsi baru"
}
```

---

### 3. Toggle Ketersediaan Menu

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `PATCH /menu/:menu_id/toggle-availability` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "menu_id": "uuid-menu-1",
    "is_available": false,
    "message": "Menu sekarang tidak tersedia"
  },
  "metaData": { "message": "Status ketersediaan berhasil diubah", "code": 200 }
}
```

---

### 4. Hapus Menu (Soft Delete)

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `DELETE /menu/:menu_id` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

---

## 📜 Resep Menu (Menu Recipe)

Admin dapat mengatur resep (bahan) yang dibutuhkan untuk membuat menu.

### 1. Lihat Resep Menu

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /menu/:menu_id/recipe` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "menu_id": "uuid-menu-1",
    "menu_name": "Nasi Goreng Spesial",
    "recipes": [
      {
        "recipe_id": "uuid-recipe-1",
        "ingredient": { "ingredient_id": "uuid-ing-1", "name": "Nasi", "type": "raw" },
        "qty": 200,
        "unit": { "unit_measure_id": "uuid-unit-gram", "name": "gram" },
        "cost_per_unit": 15,
        "total_cost": 3000
      },
      {
        "recipe_id": "uuid-recipe-2",
        "ingredient": { "ingredient_id": "uuid-ing-2", "name": "Telur", "type": "raw" },
        "qty": 2,
        "unit": { "unit_measure_id": "uuid-unit-pcs", "name": "pcs" },
        "cost_per_unit": 2500,
        "total_cost": 5000
      }
    ],
    "total_cost": 8000
  },
  "metaData": { "message": "Berhasil mengambil resep menu", "code": 200 }
}
```

---

### 2. Tambah Resep ke Menu

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `POST /menu/:menu_id/recipe` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Request Body
```json
{
  "ingredient_id": "uuid-ingredient-1",
  "qty": 150,
  "unit_measure_id": "uuid-unit-gram"
}
```

---

### 3. Update Resep (Bulk Replace)

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `PATCH /menu/:menu_id/recipe` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Request Body
```json
{
  "recipes": [
    { "ingredient_id": "uuid-ing-1", "qty": 200, "unit_measure_id": "uuid-unit-gram" },
    { "ingredient_id": "uuid-ing-2", "qty": 2, "unit_measure_id": "uuid-unit-pcs" }
  ]
}
```

---

### 4. Update Qty Resep Tertentu

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `PATCH /menu/:menu_id/recipe/:recipe_id` |

#### Request Body
```json
{ "qty": 250 }
```

---

### 5. Hapus Resep dari Menu

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `DELETE /menu/:menu_id/recipe/:recipe_id` |

---

## 🥬 Bahan Baku (Raw Ingredient)

Mengelola bahan baku mentah seperti beras, telur, sayuran, dll.

### 1. Lihat Satuan Ukur

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /ingredient/raw/units` |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "records": [
      { "unit_measure_id": "uuid-1", "name": "gram", "symbol": "g" },
      { "unit_measure_id": "uuid-2", "name": "kilogram", "symbol": "kg" },
      { "unit_measure_id": "uuid-3", "name": "liter", "symbol": "L" },
      { "unit_measure_id": "uuid-4", "name": "pieces", "symbol": "pcs" }
    ]
  },
  "metaData": { "message": "Berhasil mengambil data satuan", "code": 200 }
}
```

---

### 2. Lihat Peringatan Stok Rendah

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /ingredient/raw/low-stock` |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "records": [
      {
        "ingredient_id": "uuid-ing-1",
        "name": "Kopi Arabica",
        "current_stock": 500,
        "min_stock": 1000,
        "unit": "gram",
        "status": "LOW_STOCK"
      },
      {
        "ingredient_id": "uuid-ing-2",
        "name": "Gula Pasir",
        "current_stock": 0,
        "min_stock": 2000,
        "unit": "gram",
        "status": "OUT_OF_STOCK"
      }
    ],
    "total_alerts": 2
  },
  "metaData": { "message": "Berhasil mengambil peringatan stok", "code": 200 }
}
```

---

### 3. Lihat Daftar Bahan Baku

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /ingredient/raw` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Query Parameters
| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `batch` | number | Halaman |
| `size` | number | Jumlah per halaman |
| `search` | string | Cari nama bahan |
| `supplier_id` | UUID | Filter berdasarkan supplier |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "records": [
      {
        "ingredient_id": "uuid-ing-1",
        "name": "Kopi Arabica",
        "current_stock": 5000,
        "min_stock": 1000,
        "unit_measure": { "name": "gram", "symbol": "g" },
        "hpp": 150,
        "supplier": { "supplier_id": "uuid-sup-1", "name": "PT Kopi Jaya" }
      }
    ],
    "total": 25
  },
  "metaData": { "message": "Berhasil mengambil data bahan baku", "code": 200 }
}
```

---

### 4. Detail Bahan Baku

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /ingredient/raw/:ingredient_id` |

---

### 5. Buat Bahan Baku Baru

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `POST /ingredient/raw` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Request Body
```json
{
  "name": "Kopi Arabica Premium",
  "unit_measure_id": "uuid-unit-gram",
  "min_stock": 1000,
  "supplier_id": "uuid-supplier-1"
}
```

---

### 6. Update Bahan Baku

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `PATCH /ingredient/raw/:ingredient_id` |

---

### 7. Hapus Bahan Baku

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `DELETE /ingredient/raw/:ingredient_id` |

---

## 🧪 Bahan Setengah Jadi (Semi Ingredient)

Mengelola bahan setengah jadi yang dibuat dari bahan baku + memiliki komposisi/resep.

### 1-5. CRUD + Satuan Ukur

Sama dengan Raw Ingredient, endpoint: `/ingredient/semi`

---

### 6. Lihat Kalkulasi HPP

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /ingredient/semi/:ingredient_id/hpp` |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "ingredient_id": "uuid-semi-1",
    "name": "Bumbu Nasi Goreng",
    "hpp_per_unit": 5000,
    "unit": "porsi",
    "composition_costs": [
      { "ingredient": "Bawang Merah", "qty": 50, "unit": "gram", "cost": 1500 },
      { "ingredient": "Bawang Putih", "qty": 30, "unit": "gram", "cost": 900 },
      { "ingredient": "Kecap Manis", "qty": 20, "unit": "ml", "cost": 1000 }
    ],
    "total_composition_cost": 3400,
    "overhead_percent": 10,
    "overhead_amount": 340,
    "calculated_hpp": 3740
  },
  "metaData": { "message": "Berhasil menghitung HPP", "code": 200 }
}
```

---

### 7. Recalculate HPP

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `POST /ingredient/semi/:ingredient_id/recalculate-hpp` |

---

## 🔗 Komposisi Bahan (Ingredient Composition)

Mengatur resep/komposisi untuk bahan setengah jadi.

### 1. Lihat Bahan Tersedia

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /ingredient/semi/composition/available-ingredients` |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "records": [
      { "ingredient_id": "uuid-raw-1", "name": "Bawang Merah", "type": "raw", "hpp": 30 },
      { "ingredient_id": "uuid-raw-2", "name": "Garam", "type": "raw", "hpp": 5 }
    ]
  },
  "metaData": { "message": "Berhasil mengambil bahan tersedia", "code": 200 }
}
```

---

### 2. Preview Kalkulasi HPP

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `POST /ingredient/semi/composition/preview-hpp` |

#### Request Body
```json
{
  "compositions": [
    { "ingredient_id": "uuid-raw-1", "qty": 100 },
    { "ingredient_id": "uuid-raw-2", "qty": 50 }
  ]
}
```

---

### 3. Lihat Komposisi Bahan Semi

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /ingredient/semi/:ingredient_id/composition` |

---

### 4. Tambah Komposisi

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `POST /ingredient/semi/:ingredient_id/composition` |

#### Request Body
```json
{
  "child_ingredient_id": "uuid-raw-ingredient",
  "qty": 100,
  "unit_measure_id": "uuid-unit-gram"
}
```

---

### 5. Bulk Add Komposisi

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `POST /ingredient/semi/:ingredient_id/composition/bulk` |

#### Request Body
```json
{
  "compositions": [
    { "child_ingredient_id": "uuid-1", "qty": 100, "unit_measure_id": "uuid-unit-1" },
    { "child_ingredient_id": "uuid-2", "qty": 50, "unit_measure_id": "uuid-unit-2" }
  ]
}
```

---

### 6. Update Komposisi

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `PATCH /ingredient/semi/:ingredient_id/composition/:composition_id` |

---

### 7. Hapus Komposisi

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `DELETE /ingredient/semi/:ingredient_id/composition/:composition_id` |

---

## 🏢 Manajemen Supplier

### 1. Lihat Daftar Supplier

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /supplier` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "records": [
      {
        "supplier_id": "uuid-sup-1",
        "name": "PT Kopi Jaya",
        "phone": "021-1234567",
        "address": "Jl. Industri No. 10, Jakarta",
        "ingredient_count": 5
      }
    ],
    "total": 10
  },
  "metaData": { "message": "Berhasil mengambil data supplier", "code": 200 }
}
```

---

### 2. Detail Supplier

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /supplier/:supplier_id` |

---

### 3. Buat Supplier Baru

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `POST /supplier` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Request Body
```json
{
  "name": "PT Susu Murni",
  "phone": "021-9876543",
  "address": "Jl. Peternakan No. 25, Bandung"
}
```

| Field | Tipe | Validasi | Deskripsi |
|-------|------|----------|-----------|
| `name` | string | 2-100 char | Nama supplier |
| `phone` | string | max: 20 (opsional) | Nomor telepon |
| `address` | string | max: 500 (opsional) | Alamat |

---

### 4. Update Supplier

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `PATCH /supplier/:supplier_id` |

---

### 5. Hapus Supplier

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `DELETE /supplier/:supplier_id` |

---

## 📦 Manajemen Inventaris

### 1. Lihat Tipe Stok

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /inventory/stock-types` |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "records": [
      { "code": "IN_PURCHASE", "name": "Pembelian (Barang Masuk)" },
      { "code": "OUT_SALES", "name": "Penjualan (Transaksi Kasir)" },
      { "code": "OUT_DAMAGED", "name": "Rusak" },
      { "code": "OUT_EXPIRED", "name": "Kadaluarsa" },
      { "code": "ADJ_OPNAME", "name": "Penyesuaian Opname" }
    ]
  },
  "metaData": { "message": "Berhasil mengambil tipe stok", "code": 200 }
}
```

---

### 2. Stock In (Barang Masuk)

Mencatat barang masuk dari supplier. HPP akan terupdate otomatis (Average Costing).

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `POST /inventory/stock-in` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Request Body
```json
{
  "ingredient_id": "uuid-kopi",
  "supplier_id": "uuid-supplier",
  "qty": 5000,
  "unit_cost": 150,
  "notes": "Restock mingguan dari PT Kopi Jaya"
}
```

| Field | Tipe | Validasi | Deskripsi |
|-------|------|----------|-----------|
| `ingredient_id` | UUID | required | ID Bahan |
| `supplier_id` | UUID | required | ID Supplier |
| `qty` | number | > 0 | Jumlah masuk |
| `unit_cost` | number | >= 0 | Harga per unit |
| `notes` | string | (opsional) | Catatan |

#### Response Sukses (201 Created)
```json
{
  "response": {
    "stock_movement_id": "uuid-movement-1",
    "ingredient": { "name": "Kopi Arabica" },
    "qty": 5000,
    "unit_cost": 150,
    "total_cost": 750000,
    "stock_type": "IN_PURCHASE",
    "old_stock": 1000,
    "new_stock": 6000,
    "old_hpp": 145,
    "new_hpp": 149.17,
    "created_at": "2026-01-24T10:00:00.000Z"
  },
  "metaData": { "message": "Stok masuk berhasil dicatat", "code": 201 }
}
```

---

### 3. Stock Out (Barang Keluar Manual)

Mencatat pengurangan stok karena rusak/kadaluarsa.

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `POST /inventory/stock-out` |

#### Request Body
```json
{
  "ingredient_id": "uuid-susu",
  "qty": 5,
  "stock_type_code": "OUT_EXPIRED",
  "notes": "Susu sudah melewati tanggal kadaluarsa"
}
```

| Field | Tipe | Validasi | Deskripsi |
|-------|------|----------|-----------|
| `ingredient_id` | UUID | required | ID Bahan |
| `qty` | number | > 0 | Jumlah keluar |
| `stock_type_code` | enum | `OUT_DAMAGED`, `OUT_EXPIRED` | Alasan keluar |
| `notes` | string | (opsional) | Catatan |

---

### 4. Lihat Riwayat Stok per Bahan

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /inventory/ingredient/:ingredient_id` |

---

### 5. Lihat Semua Riwayat Stok

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /inventory` |

---

### 6. Detail Pergerakan Stok

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /inventory/:stock_movement_id` |

---

## 📋 Stock Opname

Fitur untuk melakukan penyesuaian stok fisik vs sistem.

### 1. Lihat Daftar Bahan untuk Opname

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /opname/ingredients` |

---

### 2. Lihat Daftar Opname

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /opname` |

#### Query Parameters
| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `batch` | number | Halaman |
| `size` | number | Jumlah per halaman |
| `status` | enum | `DRAFT`, `FINALIZED`, `APPLIED` |
| `start_date` | string | Tanggal awal (YYYY-MM-DD) |
| `end_date` | string | Tanggal akhir |

---

### 3. Detail Opname

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /opname/:stock_opname_id` |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "stock_opname_id": "uuid-opname-1",
    "opname_number": "OPN-20260124-001",
    "opname_date": "2026-01-24",
    "status": "DRAFT",
    "notes": "Opname bulanan",
    "items": [
      {
        "ingredient": { "name": "Kopi Arabica", "unit": "gram" },
        "system_qty": 5000,
        "actual_qty": 4800,
        "difference": -200,
        "difference_value": -30000
      }
    ],
    "total_difference_value": -30000,
    "created_by": { "name": "Admin" },
    "created_at": "2026-01-24T09:00:00.000Z"
  },
  "metaData": { "message": "Berhasil mengambil detail opname", "code": 200 }
}
```

---

### 4. Buat Opname Baru

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `POST /opname` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Request Body
```json
{
  "opname_date": "2026-01-24",
  "notes": "Opname bulanan Januari 2026",
  "items": [
    { "ingredient_id": "uuid-ing-1", "actual_qty": 4800 },
    { "ingredient_id": "uuid-ing-2", "actual_qty": 1000 }
  ]
}
```

---

### 5. Update Opname

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `PATCH /opname/:stock_opname_id` |

---

### 6. Ubah Status Opname

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `PATCH /opname/:stock_opname_id/status` |

#### Request Body
```json
{ "status": "FINALIZED" }
```

---

### 7. Terapkan Penyesuaian Stok

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `POST /opname/:stock_opname_id/apply` |

> **Catatan**: Hanya bisa diterapkan jika status = `FINALIZED`. Stok akan otomatis disesuaikan.

---

### 8. Hapus Opname

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `DELETE /opname/:stock_opname_id` |

---

## 📊 Laporan Finansial

### Query Parameters (Semua endpoint)
| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `start_date` | string | Tanggal awal (YYYY-MM-DD) |
| `end_date` | string | Tanggal akhir (YYYY-MM-DD) |

---

### 1. Laporan Finansial Lengkap

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /report/financial` |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "period": { "start_date": "2026-01-01", "end_date": "2026-01-24" },
    "summary": {
      "total_revenue": 15000000,
      "total_orders": 450,
      "average_order_value": 33333
    },
    "payment_breakdown": {
      "cash": { "amount": 10000000, "count": 300 },
      "qris": { "amount": 5000000, "count": 150 }
    },
    "daily_revenue": [
      { "date": "2026-01-23", "revenue": 500000, "orders": 15 },
      { "date": "2026-01-24", "revenue": 650000, "orders": 20 }
    ]
  },
  "metaData": { "message": "Berhasil mengambil laporan finansial", "code": 200 }
}
```

---

### 2. Ringkasan Pendapatan

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /report/financial/summary` |

---

### 3. Breakdown Pembayaran

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /report/financial/payment` |

---

### 4. Laporan Cash Flow

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /report/financial/cash-flow` |

---

### 5. Top Selling Menu

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /report/financial/top-menus` |

#### Query Parameters Tambahan
| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `limit` | number | Jumlah menu (default: 10) |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "records": [
      { "menu_name": "Nasi Goreng Spesial", "qty_sold": 150, "revenue": 3750000, "rank": 1 },
      { "menu_name": "Es Teh Manis", "qty_sold": 300, "revenue": 1500000, "rank": 2 }
    ]
  },
  "metaData": { "message": "Berhasil mengambil top menu", "code": 200 }
}
```

---

### 6. Penjualan per Kategori

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /report/financial/by-category` |

---

## 📈 Laporan Operasional

### 1. Laporan Operasional Lengkap

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /report/operational` |

---

### 2. Kinerja Kasir

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /report/operational/cashier` |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "cashiers": [
      {
        "user_id": "uuid-user-1",
        "name": "Budi Kasir",
        "total_orders": 150,
        "total_revenue": 5000000,
        "average_order_value": 33333,
        "shifts_count": 10
      }
    ]
  },
  "metaData": { "message": "Berhasil mengambil performa kasir", "code": 200 }
}
```

---

### 3. Ringkasan Shift

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /report/operational/shift` |

---

### 4. Statistik Transaksi

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /report/operational/transactions` |

---

### 5. Performa Menu

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /report/operational/menu` |

---

### 6. Status Order

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /report/operational/order-status` |

---

## 📦 Laporan Inventaris

### 1. Laporan Inventaris Lengkap

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /report/inventory` |

---

### 2. Stok Saat Ini

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /report/inventory/current` |

---

### 3. Ringkasan Pergerakan Stok

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /report/inventory/movement` |

---

### 4. Peringatan Stok

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /report/inventory/alerts` |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "out_of_stock": [
      { "ingredient": "Gula Pasir", "current_stock": 0, "min_stock": 2000 }
    ],
    "low_stock": [
      { "ingredient": "Kopi Arabica", "current_stock": 500, "min_stock": 1000 }
    ],
    "total_alerts": 2
  },
  "metaData": { "message": "Berhasil mengambil peringatan stok", "code": 200 }
}
```

---

### 5. Valuasi Inventaris

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /report/inventory/valuation` |

---

### 6. Riwayat Opname

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /report/inventory/opname` |

---

### 7. Kartu Stok (Stock Card)

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /report/inventory/card` |

#### Query Parameters
| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `ingredient_id` | UUID | **Required** - ID Bahan |
| `start_date` | string | Tanggal awal |
| `end_date` | string | Tanggal akhir |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "ingredient": { "name": "Kopi Arabica", "unit": "gram" },
    "opening_balance": 5000,
    "movements": [
      { "date": "2026-01-20", "type": "IN_PURCHASE", "qty": 2000, "balance": 7000 },
      { "date": "2026-01-21", "type": "OUT_SALES", "qty": -500, "balance": 6500 }
    ],
    "closing_balance": 6500
  },
  "metaData": { "message": "Berhasil mengambil kartu stok", "code": 200 }
}
```

---

## 🧠 Analisis SPK (Smart Purchasing)

Fitur rekomendasi pembelian bahan baku menggunakan metode Weighted Moving Average (WMA).

### Jalankan Analisis SPK

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /spk/analysis` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Query Parameters
| Parameter | Tipe | Default | Deskripsi |
|-----------|------|---------|-----------|
| `target_days` | number | 7 | Target hari stok aman |
| `lookback_days` | number | 30 | Analisa tren ke belakang |
| `buffer_percent` | number | 10 | Buffer keamanan (%) |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "analysis_date": "2026-01-24",
    "config": {
      "target_days": 7,
      "lookback_days": 30,
      "buffer_percent": 10
    },
    "summary": {
      "total_ingredients_analyzed": 25,
      "needing_restock": 5,
      "total_estimated_cost": 5000000
    },
    "recommendations": [
      {
        "ingredient": { "name": "Kopi Arabica", "unit": "gram", "current_stock": 500, "min_stock": 1000 },
        "supplier": { "name": "PT Kopi Jaya", "phone": "021-1234567" },
        "analysis": {
          "avg_daily_usage": 200,
          "days_remaining": 2.5,
          "suggested_qty": 2000,
          "estimated_cost": 300000
        },
        "priority": "HIGH"
      }
    ],
    "by_supplier": [
      {
        "supplier_name": "PT Kopi Jaya",
        "items": [...],
        "total_estimated_cost": 300000
      }
    ]
  },
  "metaData": { "message": "Analisis SPK berhasil", "code": 200 }
}
```

---

## 📅 Manajemen Shift (Semua Kasir)

Admin dapat melihat semua shift dari seluruh kasir.

### Lihat Semua Shift

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /shift` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | ADMIN |

#### Query Parameters
| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `batch` | number | Halaman |
| `size` | number | Jumlah per halaman |
| `user_id` | UUID | Filter berdasarkan kasir |
| `start_date` | string | Tanggal awal |
| `end_date` | string | Tanggal akhir |
| `is_active` | boolean | Filter shift aktif/selesai |

---

## 📊 Ringkasan Endpoint Role Admin

| No | Modul | Endpoint Count |
|----|-------|----------------|
| 1 | User Management | 7 |
| 2 | Category | 5 |
| 3 | Menu (Admin-only) | 4 |
| 4 | Menu Recipe | 5 |
| 5 | Raw Ingredient | 7 |
| 6 | Semi Ingredient | 7 |
| 7 | Composition | 7 |
| 8 | Supplier | 5 |
| 9 | Inventory | 6 |
| 10 | Stock Opname | 8 |
| 11 | Report Financial | 6 |
| 12 | Report Operational | 6 |
| 13 | Report Inventory | 7 |
| 14 | SPK Analysis | 1 |
| 15 | Shift (All) | 1 |
| | **Total Admin-Only** | **82 endpoints** |

> **+ 19 Kasir Endpoints** = **101 Total Endpoints** yang dapat diakses Admin

---

## ⚠️ Error Responses

Lihat [KASIR_ROLE_DOCUMENTATION.md](./KASIR_ROLE_DOCUMENTATION.md#️-error-responses) untuk format error standar.

---

> 📝 **Catatan**: Dokumentasi ini dibuat pada 24 Januari 2026 untuk Sistem Kasir ISCP v1.0
