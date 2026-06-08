# Flow Kasir API Documentation

Dokumentasi ini menjelaskan rute API (endpoints) yang digunakan khusus untuk operasional kasir (Point of Sales). Ini mencakup proses menampilkan daftar menu, pemfilteran, melakukan checkout pesanan (keranjang), proses pembayaran (CASH/QRIS), dan pengelolaan struk/resi (cetak & kirim via WhatsApp).

---

## Tabel dan Field yang Dipakai

Flow kasir memakai beberapa tabel karena prosesnya mencakup katalog menu, shift kasir aktif, pembuatan pesanan, pembayaran, pengurangan stok bahan, pencatatan riwayat stok, dan pembuatan struk.

### Ringkasan Penggunaan Tabel

| Proses | Tabel yang Dipakai | Keterangan |
| :--- | :--- | :--- |
| Menampilkan katalog menu | `menus`, `categories`, `menu_recipes` | Mengambil daftar menu, kategori, status ketersediaan, dan jumlah resep. |
| Checkout pesanan | `shifts`, `menus`, `orders`, `order_items`, `users` | Validasi shift aktif, validasi menu, simpan order dan item order. |
| Konfirmasi pembayaran | `orders`, `order_items`, `menus`, `menu_recipes`, `ingredients`, `stock_types`, `stock_movements` | Update status order, buat nomor struk, kurangi stok bahan, catat pergerakan stok. |
| Batalkan pesanan | `orders` | Mengubah status order menjadi `CANCELLED`. |
| Cetak struk dari order | `orders`, `order_items`, `menus`, `users`, `store_settings` | Mengambil data order, item, kasir, dan informasi toko untuk struk. |
| Preview/kirim struk digital | `orders`, `order_items`, `menus`, `users`, `store_settings` | Mengambil data struk dan membuat link PDF untuk WhatsApp. |

### 1. Tabel `menus`

Tabel master menu yang dijual di kasir.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `menu_id` | UUID | Tidak | Primary key menu. |
| `category_id` | UUID | Tidak | Foreign key ke tabel `categories`. |
| `name` | varchar(100) | Tidak | Nama menu. Dipakai untuk katalog, pencarian, item struk, dan validasi checkout. |
| `price` | decimal(15,2) | Tidak | Harga jual menu. |
| `cost` | decimal(15,2) | Tidak | HPP/cost menu. Dipakai untuk informasi margin/profit pada katalog. |
| `description` | text | Ya | Deskripsi menu. |
| `image_url` | varchar(255) | Ya | URL/path gambar menu. |
| `is_available` | boolean | Tidak | Status ketersediaan menu. Checkout hanya bisa untuk menu yang tersedia. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Data kasir hanya memakai menu dengan `deleted_at = null`. |

Field yang dipakai pada flow kasir:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Katalog menu | `menu_id`, `category_id`, `name`, `price`, `cost`, `description`, `image_url`, `is_available`, `created_at`, `updated_at`, `deleted_at` |
| Checkout | `menu_id`, `name`, `price`, `is_available`, `deleted_at` |
| Konfirmasi pembayaran | `menu_id`, relasi `recipes` dari `menu_recipes` |
| Struk | `menu_id`, `name`, `image_url` |

### 2. Tabel `categories`

Tabel master kategori menu.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `category_id` | UUID | Tidak | Primary key kategori. |
| `name` | varchar(50) | Tidak | Nama kategori. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada flow kasir:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Katalog menu | `category_id`, `name` |
| Filter katalog | `category_id` |

### 3. Tabel `menu_recipes`

Tabel resep menu. Dipakai untuk menghitung bahan yang harus dikurangi saat pembayaran dikonfirmasi.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `menu_recipe_id` | UUID | Tidak | Primary key resep menu. |
| `menu_id` | UUID | Tidak | Foreign key ke tabel `menus`. |
| `ingredient_id` | UUID | Tidak | Foreign key ke tabel `ingredients`. |
| `qty_needed` | decimal(10,2) | Tidak | Jumlah bahan yang dibutuhkan untuk 1 qty menu. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada flow kasir:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Katalog menu | `_count.recipes` untuk menampilkan jumlah resep pada menu. |
| Konfirmasi pembayaran | `menu_id`, `ingredient_id`, `qty_needed`, `deleted_at` |

### 4. Tabel `ingredients`

Tabel bahan baku dan bahan setengah jadi. Pada flow kasir, tabel ini dipakai untuk pengurangan stok saat order selesai dibayar.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `ingredient_id` | UUID | Tidak | Primary key bahan. |
| `unit_id` | UUID | Tidak | Foreign key ke tabel `unit_measures`. |
| `name` | varchar(100) | Tidak | Nama bahan. |
| `type` | varchar(20) | Tidak | Tipe bahan, misalnya raw/semi. |
| `stock_qty` | decimal(10,2) | Tidak | Stok saat ini. Dikurangi saat konfirmasi pembayaran. |
| `min_stock` | decimal(10,2) | Tidak | Minimum stok. |
| `avg_cost` | decimal(15,2) | Tidak | Harga rata-rata bahan. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada flow kasir:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Konfirmasi pembayaran | `ingredient_id`, `stock_qty` |
| Riwayat stok penjualan | `ingredient_id` dipakai saat membuat `stock_movements`. |

### 5. Tabel `unit_measures`

Tabel satuan bahan. Pada flow kasir tidak langsung ditulis, tetapi masih menjadi relasi bahan dan bisa muncul dalam data turunan stok/resep.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `unit_measure_id` | UUID | Tidak | Primary key satuan. |
| `name` | varchar(50) | Tidak | Nama satuan, misalnya `Gram`, `Liter`, atau `Pcs`. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

### 6. Tabel `shifts`

Tabel shift kasir. Checkout hanya bisa dilakukan jika user yang login memiliki shift aktif.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `shift_id` | UUID | Tidak | Primary key shift. |
| `user_id` | UUID | Tidak | Foreign key ke tabel `users`. |
| `start_cash` | decimal(15,2) | Tidak | Modal awal shift. |
| `end_cash` | decimal(15,2) | Ya | Kas akhir shift. |
| `sold_total` | decimal(15,2) | Ya | Total penjualan shift. |
| `start_time` | timestamp | Tidak | Waktu mulai shift. |
| `end_time` | timestamp | Ya | Waktu selesai shift. Jika `null`, shift dianggap aktif. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada flow kasir:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Checkout | `shift_id`, `user_id`, `start_cash`, `start_time`, `end_time`, `deleted_at` |
| Detail order/struk | `shift_id`, `start_time`, `end_time` |

### 7. Tabel `orders`

Tabel transaksi utama kasir.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `order_id` | UUID | Tidak | Primary key order. |
| `shift_id` | UUID | Tidak | Foreign key ke tabel `shifts`. |
| `user_id` | UUID | Tidak | Foreign key ke tabel `users`, yaitu kasir yang membuat order. |
| `customer_name` | varchar(50) | Ya | Nama pelanggan. |
| `customer_phone` | varchar(20) | Ya | Nomor pelanggan. |
| `receipt` | varchar(50) | Ya | Nomor struk bisnis. Unik. Dibuat saat pembayaran dikonfirmasi. |
| `total_amount` | decimal(15,2) | Tidak | Total nilai order. |
| `paid_amount` | decimal(15,2) | Tidak | Nominal dibayar. Saat checkout awal bernilai 0. |
| `change_amount` | decimal(15,2) | Tidak | Kembalian. Saat checkout awal bernilai 0. |
| `payment_type` | varchar(20) | Tidak | Tipe pembayaran: `CASH` atau `QRIS`. |
| `status` | varchar(20) | Tidak | Status order: `PENDING`, `COMPLETED`, atau `CANCELLED`. |
| `created_at` | timestamp | Tidak | Waktu order dibuat. |
| `updated_at` | timestamp | Ya | Waktu order terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada flow kasir:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Checkout | `shift_id`, `user_id`, `customer_name`, `customer_phone`, `total_amount`, `paid_amount`, `change_amount`, `payment_type`, `status` |
| Konfirmasi pembayaran | `order_id`, `receipt`, `paid_amount`, `change_amount`, `status`, `payment_type`, `total_amount`, `created_at` |
| Cancel | `order_id`, `status` |
| Riwayat order | `order_id`, `shift_id`, `user_id`, `customer_name`, `customer_phone`, `receipt`, `total_amount`, `paid_amount`, `change_amount`, `payment_type`, `status`, `created_at`, `updated_at` |
| Struk | `order_id`, `receipt`, `customer_name`, `customer_phone`, `total_amount`, `paid_amount`, `change_amount`, `payment_type`, `created_at` |

### 8. Tabel `order_items`

Tabel detail item dalam order.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `order_item_id` | UUID | Tidak | Primary key item order. |
| `order_id` | UUID | Tidak | Foreign key ke tabel `orders`. |
| `menu_id` | UUID | Tidak | Foreign key ke tabel `menus`. |
| `qty` | int | Tidak | Jumlah menu yang dibeli. |
| `price` | decimal(15,2) | Tidak | Harga menu saat transaksi dibuat. |
| `subtotal` | decimal(15,2) | Tidak | `qty * price`. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada flow kasir:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Checkout | `order_id`, `menu_id`, `qty`, `price`, `subtotal` |
| Konfirmasi pembayaran | `menu_id`, `qty` untuk menghitung stok bahan yang dikurangi. |
| Struk | `qty`, `price`, `subtotal`, relasi `menu.name` |

### 9. Tabel `users`

Tabel user dipakai untuk identitas kasir.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `user_id` | UUID | Tidak | Primary key user. |
| `username` | varchar(50) | Tidak | Username user. |
| `password` | varchar(255) | Tidak | Password hash. Tidak dipakai dalam response kasir. |
| `name` | varchar(100) | Tidak | Nama kasir yang ditampilkan di order/struk. |
| `phone_number` | varchar(20) | Ya | Nomor WhatsApp user. |
| `role_id` | UUID | Tidak | Foreign key role. |
| `user_status_id` | UUID | Tidak | Foreign key status user. |
| `last_login` | time | Ya | Waktu login terakhir. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada flow kasir:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Checkout | `user_id` dari token auth dipakai sebagai pembuat order. |
| Riwayat/detail order | `user_id`, `name` |
| Struk | `name` sebagai nama kasir. |
| Pengurangan stok | `user_id` disimpan pada `stock_movements`. |

### 10. Tabel `stock_types`

Tabel master jenis pergerakan stok. Flow kasir membutuhkan tipe `OUT_SALES`.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `stock_type_id` | UUID | Tidak | Primary key tipe stok. |
| `name` | varchar(50) | Tidak | Nama tipe stok, misalnya `OUT_SALES`. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada flow kasir:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Konfirmasi pembayaran | `stock_type_id`, `name` dengan nilai `OUT_SALES`. |

### 11. Tabel `stock_movements`

Tabel riwayat pergerakan stok. Saat pembayaran dikonfirmasi, sistem membuat record keluar stok untuk setiap bahan yang dipakai menu.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `stock_movement_id` | UUID | Tidak | Primary key pergerakan stok. |
| `supplier_id` | UUID | Ya | Supplier terkait. Pada penjualan kasir biasanya `null`. |
| `ingredient_id` | UUID | Tidak | Foreign key ke tabel `ingredients`. |
| `user_id` | UUID | Tidak | User/kasir yang memicu pergerakan stok. |
| `stock_type_id` | UUID | Tidak | Foreign key ke tabel `stock_types`. |
| `qty` | decimal(10,2) | Tidak | Jumlah pergerakan stok. Untuk penjualan bernilai negatif. |
| `unit_cost` | decimal(15,2) | Ya | Harga satuan stok. |
| `current_stock` | decimal(10,2) | Tidak | Stok bahan setelah pergerakan. |
| `notes` | text | Ya | Catatan. Untuk kasir diisi `Penjualan via Kasir`. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada flow kasir:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Konfirmasi pembayaran | `ingredient_id`, `user_id`, `stock_type_id`, `qty`, `current_stock`, `notes` |

### 12. Tabel `store_settings`

Tabel konfigurasi profil toko dan teks struk.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `store_setting_id` | UUID | Tidak | Primary key setting. |
| `setting_key` | varchar(50) | Tidak | Key setting. |
| `setting_value` | text | Tidak | Nilai setting. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Key yang dipakai struk:

| `setting_key` | Keterangan |
| :--- | :--- |
| `store_name` | Nama toko pada struk. |
| `store_address` | Alamat toko pada struk. |
| `store_phone` | Nomor telepon toko. |
| `store_logo` | Logo toko. |
| `receipt_header` | Teks header struk. |
| `receipt_footer` | Teks footer struk. |

### Relasi Tabel Utama

```text
menus.category_id          -> categories.category_id
menu_recipes.menu_id       -> menus.menu_id
menu_recipes.ingredient_id -> ingredients.ingredient_id
ingredients.unit_id        -> unit_measures.unit_measure_id
orders.shift_id            -> shifts.shift_id
orders.user_id             -> users.user_id
order_items.order_id       -> orders.order_id
order_items.menu_id        -> menus.menu_id
stock_movements.ingredient_id -> ingredients.ingredient_id
stock_movements.user_id       -> users.user_id
stock_movements.stock_type_id -> stock_types.stock_type_id
shifts.user_id             -> users.user_id
```

### Catatan Alur Data Penting

- Checkout `POST /api/order` membuat data di `orders` dan `order_items` dengan status awal `PENDING`.
- Stok bahan di `ingredients.stock_qty` belum dikurangi saat checkout.
- Stok baru dikurangi saat `PATCH /api/order/:order_id/confirm` berhasil.
- Saat stok dikurangi, sistem juga membuat record `stock_movements` dengan `qty` negatif dan `stock_type` `OUT_SALES`.
- Order hanya bisa dibatalkan jika status masih `PENDING`.
- Struk memakai data dari `orders`, `order_items`, `menus`, `users`, dan `store_settings`.

---

## 1. Menampilkan Daftar Menu (Katalog)

Endpoint ini digunakan untuk menampilkan daftar menu yang tersedia. Mendukung fitur *pagination*, pencarian, dan berbagai filter.

- **Endpoint:** `GET /api/menu`
- **Akses:** Protected (Kasir & Admin)

### Query Parameters

Semua parameter bersifat opsional (dapat digunakan sesuai kebutuhan filter aplikasi):

| Parameter | Tipe | Default | Deskripsi |
| :--- | :--- | :--- | :--- |
| `batch` | Number | `1` | Nomor halaman (pagination) |
| `size` | Number | `10` | Jumlah data per halaman (maks 100) |
| `search` | String | - | Pencarian berdasarkan nama menu |
| `category_id`| UUID | - | Filter menu berdasarkan ID kategori tertentu |
| `is_available`| Boolean | - | Filter status ketersediaan menu (`true` / `false`) |

**Contoh Penggunaan:**
`GET /api/menu?batch=1&size=20&search=kopi&category_id=uuid-1234&is_available=true`

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Berhasil mengambil data",
  "data": {
    "page": {
      "total_record_count": 50,
      "batch_number": 1,
      "batch_size": 20,
      "max_batch_size": 100
    },
    "records": [
      {
        "menu_id": "uuid-menu",
        "name": "Kopi Susu Gula Aren",
        "price": 25000,
        "cost": 12000,
        "description": "Kopi susu nikmat dengan gula aren murni",
        "image_url": "https://example.com/image.jpg",
        "is_available": true,
        "created_at": "2024-01-01T10:00:00Z",
        "updated_at": "2024-01-02T10:00:00Z",
        "category": {
          "category_id": "uuid-category",
          "name": "Minuman"
        },
        "_count": {
          "recipes": 3
        },
        "margin_percent": 52,
        "profit": 13000
      }
    ]
  }
}
```

---

## 2. Checkout Pesanan (Fitur Keranjang)

Endpoint ini digunakan saat kasir menekan tombol "Bayar" atau "Checkout" di keranjang. Pesanan akan dibuat dengan status `PENDING`.

- **Endpoint:** `POST /api/order`
- **Akses:** Protected (Kasir & Admin)

### Request Body (JSON)

| Field | Tipe | Validasi | Deskripsi |
| :--- | :--- | :--- | :--- |
| `customer_name` | String | Wajib, max 50 char | Nama pelanggan |
| `customer_phone` | String | Opsional, max 20 char| Nomor telepon pelanggan |
| `payment_type` | Enum | Wajib | Tipe pembayaran (`CASH` atau `QRIS`) |
| `items` | Array | Wajib, min 1 item | Daftar menu yang dibeli (keranjang) |

**Struktur `items`:**
- `menu_id` (UUID): ID dari menu yang dibeli
- `qty` (Integer): Jumlah kuantitas, min 1
- `price` (Number): Harga satuan saat dibeli

**Contoh Request:**
```json
{
  "customer_name": "Budi",
  "customer_phone": "081234567890",
  "payment_type": "CASH",
  "items": [
    {
      "menu_id": "uuid-menu-1",
      "qty": 2,
      "price": 25000
    },
    {
      "menu_id": "uuid-menu-2",
      "qty": 1,
      "price": 15000
    }
  ]
}
```

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Pesanan berhasil dibuat",
  "data": {
    "message": "Pesanan berhasil dibuat",
    "change_amount": 0,
    "order": {
      "order_id": "uuid-order-id",
      "shift_id": "uuid-shift-id",
      "user_id": "uuid-user-kasir",
      "customer_name": "Budi",
      "customer_phone": "081234567890",
      "receipt": "RCP-240101-0001",
      "total_amount": 65000,
      "paid_amount": 0,
      "change_amount": 0,
      "payment_type": "CASH",
      "status": "PENDING",
      "created_at": "2024-01-01T10:00:00Z",
      "updated_at": null,
      "user": {
        "user_id": "uuid-user-kasir",
        "name": "Nama Kasir"
      },
      "order_items": [
        {
          "order_item_id": "uuid-order-item",
          "menu_id": "uuid-menu-1",
          "qty": 2,
          "price": 25000,
          "subtotal": 50000,
          "menu": {
            "menu_id": "uuid-menu-1",
            "name": "Kopi Susu",
            "image_url": "https://example.com/image.jpg"
          }
        }
      ]
    }
  }
}
```

---

## 3. Konfirmasi Pembayaran (Bayar)

Setelah pesanan di-*checkout*, gunakan endpoint ini untuk mengubah status pesanan menjadi `COMPLETED` dan mencatat jumlah uang yang dibayarkan pelanggan.

- **Endpoint:** `PATCH /api/order/:order_id/confirm`
- **Akses:** Protected (Kasir & Admin)

### Request Body (JSON)

| Field | Tipe | Validasi | Deskripsi |
| :--- | :--- | :--- | :--- |
| `paid_amount` | Number | Opsional | Jumlah uang yang dibayarkan pelanggan (khususnya untuk `CASH` untuk menghitung kembalian). Jika kosong akan dianggap bayar pas. |

**Contoh Request:**
```json
{
  "paid_amount": 100000
}
```

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Pembayaran berhasil dikonfirmasi",
  "data": {
    "success": true,
    "message": "Pembayaran berhasil dikonfirmasi",
    "order": {
      "order_id": "uuid-order-id",
      "shift_id": "uuid-shift-id",
      "user_id": "uuid-user-kasir",
      "customer_name": "Budi",
      "customer_phone": "081234567890",
      "receipt": "RCP-240101-0001",
      "total_amount": 65000,
      "paid_amount": 100000,
      "change_amount": 35000,
      "payment_type": "CASH",
      "status": "COMPLETED",
      "created_at": "2024-01-01T10:00:00Z",
      "updated_at": "2024-01-01T10:05:00Z",
      "user": {
        "user_id": "uuid-user-kasir",
        "name": "Nama Kasir"
      },
      "order_items": [
        {
          "order_item_id": "uuid-order-item",
          "menu_id": "uuid-menu-1",
          "qty": 2,
          "price": 25000,
          "subtotal": 50000,
          "menu": {
            "menu_id": "uuid-menu-1",
            "name": "Kopi Susu",
            "image_url": "https://example.com/image.jpg"
          }
        }
      ]
    }
  }
}
```

---

## 4. Batalkan Pesanan (Cancel)

Jika pelanggan batal memesan, gunakan endpoint ini. Status akan berubah menjadi `CANCELLED`.

- **Endpoint:** `PATCH /api/order/:order_id/cancel`
- **Akses:** Protected (Kasir & Admin)
- **Request Body:** (Tidak ada)

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Pesanan berhasil dibatalkan",
  "data": {
    "success": true,
    "message": "Pesanan berhasil dibatalkan"
  }
}
```

---

## 5. Pengelolaan Struk / Resi (Receipt)

### A. Preview Struk (JSON)
Digunakan untuk menampilkan *preview* struk di UI kasir. Data disajikan per *key-value* secara detail.

- **Endpoint:** `GET /api/receipt/:order_id/preview`
- **Akses:** Protected (Kasir & Admin)

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Berhasil mengambil data struk",
  "data": {
    "store_name": "Toko Kasir Ku",
    "store_address": "Jl. Kemerdekaan No. 123",
    "receipt_header": "Terima kasih telah berkunjung",
    "receipt_footer": "Layanan pelanggan: 0812-xxxx-xxxx",
    "order_id": "RCP-240101-0001",
    "order_date": "01 Jan 2024",
    "order_time": "10:00",
    "cashier_name": "Kasir Satu",
    "customer_name": "Budi",
    "customer_phone": "081234567890",
    "items": [
      {
        "name": "Kopi Susu",
        "qty": 2,
        "price": 25000,
        "subtotal": 50000
      }
    ],
    "total": 65000,
    "payment_type": "CASH",
    "paid_amount": 100000,
    "change_amount": 35000
  }
}
```

### B. Kirim Struk via WhatsApp
Mengirimkan *link* e-receipt atau gambar struk langsung ke nomor WhatsApp pelanggan menggunakan bot.

- **Endpoint:** `POST /api/receipt/:order_id/send`
- **Akses:** Protected (Kasir & Admin)
- **Request Body (JSON):**
```json
{
  "phone": "081234567890"
}
```

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Struk berhasil dikirim ke WhatsApp",
  "data": {
    "success": true,
    "message": "Struk berhasil dikirim ke WhatsApp",
    "receipt_url": "http://localhost:4000/api/receipt/uuid-order-id/pdf",
    "whatsapp_status": true
  }
}
```

### C. Lihat E-Receipt (PDF)
Endpoint *Public* untuk men-download file PDF struk. Berguna saat Anda ingin membuat *button download* langsung.

- **Endpoint:** `GET /api/receipt/:order_id/pdf`
- **Akses:** Public
- **Response:** File PDF biner (`Content-Type: application/pdf`).

### D. Cetak Struk (Teks Printer / ESCPOS / dll)
Endpoint dari module `order` yang mengembalikan format *raw text* atau base64 yang sudah di-*format* khusus printer termal.

- **Endpoint:** `GET /api/order/:order_id/receipt`
- **Akses:** Protected (Kasir & Admin)
- **Query Params:** `format` (`text`, `escpos`, `pdf`, `image`). *Default:* `text`.

### Response Berhasil (200 OK) (Contoh text)
```json
{
  "code": 200,
  "message": "Berhasil",
  "data": {
    "format": "text",
    "content": "           Toko Kasir Ku\n        Jl. Kemerdekaan No. 123\n--------------------------------\nRCP-240101-0001\nKasir: Kasir Satu\n...",
    "data": {
      "store_name": "Toko Kasir Ku",
      "store_address": "Jl. Kemerdekaan No. 123",
      "receipt_header": "Terima kasih telah berkunjung",
      "receipt_footer": "Layanan pelanggan: 0812-xxxx-xxxx",
      "order_id": "RCP-240101-0001",
      "order_date": "01 Jan 2024",
      "order_time": "10:00",
      "cashier_name": "Kasir Satu",
      "customer_name": "Budi",
      "customer_phone": "081234567890",
      "items": [
        {
          "name": "Kopi Susu",
          "qty": 2,
          "price": 25000,
          "subtotal": 50000
        }
      ],
      "total": 65000,
      "payment_type": "CASH",
      "paid_amount": 100000,
      "change_amount": 35000
    }
  }
}
```
