# Dokumentasi API Riwayat Transaksi (Order Management)

Dokumentasi ini mencakup rute API (endpoints) yang digunakan oleh Frontend untuk halaman **Manajemen Transaksi / Riwayat Transaksi**. Fitur ini meliputi kemampuan menampilkan daftar histori pesanan (dengan berbagai filter), melihat detail transaksi, hingga mencetak atau mengirimkan struk ulang.

Base URL: `/api`

---

## Tabel dan Field yang Dipakai

Modul riwayat transaksi memakai tabel utama `orders`. Untuk detail item transaksi dipakai `order_items` dan `menus`, sedangkan informasi kasir dan shift diambil dari `users` dan `shifts`. Fitur kirim ulang struk memakai endpoint struk, sehingga juga membaca `store_settings` untuk identitas toko pada pesan WhatsApp dan struk PDF.

### Ringkasan Penggunaan Tabel

| Proses | Tabel yang Dipakai | Keterangan |
| :--- | :--- | :--- |
| Menampilkan daftar transaksi | `orders`, `users`, `order_items` | Mengambil order aktif dengan pagination, filter, user kasir, dan jumlah item. |
| Melihat detail transaksi | `orders`, `users`, `shifts`, `order_items`, `menus` | Mengambil detail order, kasir, shift, item transaksi, dan data menu. |
| Kirim ulang struk WhatsApp | `orders`, `order_items`, `menus`, `users`, `store_settings` | Mengambil data struk dan profil toko, lalu mengirim link struk digital. |

### 1. Tabel `orders`

Tabel utama transaksi/order.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `order_id` | UUID | Tidak | Primary key order. |
| `shift_id` | UUID | Tidak | Foreign key ke tabel `shifts`. |
| `user_id` | UUID | Tidak | Foreign key ke tabel `users`, yaitu kasir/admin pembuat order. |
| `customer_name` | varchar(50) | Ya | Nama customer. Dipakai untuk tampilan dan pencarian. |
| `customer_phone` | varchar(20) | Ya | Nomor customer. |
| `receipt` | varchar(50) | Ya | Nomor struk bisnis. |
| `total_amount` | decimal(15,2) | Tidak | Total transaksi. |
| `paid_amount` | decimal(15,2) | Tidak | Nominal dibayar. |
| `change_amount` | decimal(15,2) | Tidak | Nominal kembalian. |
| `payment_type` | varchar(20) | Tidak | Metode pembayaran, misalnya `CASH` atau `QRIS`. |
| `status` | varchar(20) | Tidak | Status transaksi: `PENDING`, `COMPLETED`, atau `CANCELLED`. |
| `created_at` | timestamp | Tidak | Waktu transaksi. Dipakai untuk filter tanggal dan urutan data. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Riwayat hanya memakai order dengan `deleted_at = null`. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List | `order_id`, `shift_id`, `user_id`, `customer_name`, `customer_phone`, `receipt`, `total_amount`, `paid_amount`, `change_amount`, `payment_type`, `status`, `created_at`, `updated_at`, `deleted_at` |
| Search | `customer_name` |
| Filter | `status`, `payment_type`, `shift_id`, `created_at` |
| Detail | `order_id`, `shift_id`, `user_id`, `customer_name`, `customer_phone`, `receipt`, `total_amount`, `paid_amount`, `change_amount`, `payment_type`, `status`, `created_at`, `updated_at`, `deleted_at` |
| Kirim ulang struk | `order_id`, `receipt`, `customer_name`, `customer_phone`, `total_amount`, `paid_amount`, `change_amount`, `payment_type`, `created_at`, `user_id`, `deleted_at` |

### 2. Tabel `order_items`

Tabel item menu yang dibeli pada transaksi.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `order_item_id` | UUID | Tidak | Primary key item order. |
| `order_id` | UUID | Tidak | Foreign key ke tabel `orders`. |
| `menu_id` | UUID | Tidak | Foreign key ke tabel `menus`. |
| `qty` | integer | Tidak | Jumlah menu yang dibeli. |
| `price` | decimal(15,2) | Tidak | Harga menu saat transaksi. |
| `subtotal` | decimal(15,2) | Tidak | Subtotal item transaksi. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Detail hanya memakai item dengan `deleted_at = null`. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List transaksi | Relasi `_count.order_items` untuk menghitung jumlah item. |
| Detail transaksi | `order_item_id`, `order_id`, `menu_id`, `qty`, `price`, `subtotal`, `deleted_at` |
| Kirim ulang struk | `qty`, `price`, `subtotal`, `menu_id`, `deleted_at` |

### 3. Tabel `menus`

Tabel menu dipakai untuk menampilkan nama dan gambar item transaksi.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `menu_id` | UUID | Tidak | Primary key menu. |
| `category_id` | UUID | Tidak | Foreign key kategori. |
| `name` | varchar(100) | Tidak | Nama menu. |
| `price` | decimal(15,2) | Tidak | Harga master menu. Detail transaksi memakai harga snapshot dari `order_items.price`. |
| `cost` | decimal(15,2) | Tidak | HPP menu. |
| `description` | text | Ya | Deskripsi menu. |
| `image_url` | varchar(255) | Ya | URL/path gambar menu yang ditampilkan pada detail transaksi. |
| `is_available` | boolean | Tidak | Status ketersediaan menu. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Detail transaksi | `menu_id`, `name`, `image_url` melalui relasi `order_items.menu`. |
| Kirim ulang struk | `name` melalui relasi `order_items.menu`. |

### 4. Tabel `users`

Tabel pengguna/kasir yang terkait dengan transaksi.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `user_id` | UUID | Tidak | Primary key pengguna. |
| `username` | varchar(50) | Tidak | Username login. |
| `name` | varchar(100) | Tidak | Nama kasir yang ditampilkan pada list/detail transaksi dan struk. |
| `phone_number` | varchar(20) | Ya | Nomor pengguna. |
| `role_id` | UUID | Tidak | Foreign key role. |
| `user_status_id` | UUID | Tidak | Foreign key status pengguna. |
| `last_login` | time | Ya | Waktu login terakhir. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List/detail transaksi | `user_id`, `name` melalui relasi `orders.user`. |
| Kirim ulang struk | `name` sebagai nama kasir. |

### 5. Tabel `shifts`

Tabel shift kasir yang menjadi konteks transaksi.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `shift_id` | UUID | Tidak | Primary key shift. |
| `user_id` | UUID | Tidak | Foreign key ke tabel `users`. |
| `start_cash` | decimal(15,2) | Tidak | Modal awal shift. |
| `end_cash` | decimal(15,2) | Ya | Kas akhir saat shift ditutup. |
| `sold_total` | decimal(15,2) | Ya | Total penjualan shift. |
| `start_time` | timestamp | Tidak | Waktu shift dibuka. |
| `end_time` | timestamp | Ya | Waktu shift ditutup. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Filter list transaksi | `shift_id` melalui `orders.shift_id`. |
| Detail transaksi | `shift_id`, `start_time`, `end_time` melalui relasi `orders.shift`. |

### 6. Tabel `store_settings`

Tabel pengaturan toko dipakai saat fitur kirim ulang struk membuat pesan dan link struk digital.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `store_setting_id` | UUID | Tidak | Primary key setting. |
| `setting_key` | varchar(50) | Tidak | Key setting, misalnya `store_name`. |
| `setting_value` | text | Tidak | Nilai setting. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Setting yang dipakai saat kirim ulang struk:

| Setting Key | Keterangan |
| :--- | :--- |
| `store_name` | Nama toko pada pesan WhatsApp. |
| `store_address` | Alamat toko pada struk. |
| `store_phone` | Nomor toko pada struk. |
| `store_logo` | Logo toko pada struk. |
| `receipt_header` | Header tambahan struk. |
| `receipt_footer` | Footer tambahan struk. |

### Relasi Tabel

```text
orders.user_id -> users.user_id
orders.shift_id -> shifts.shift_id
order_items.order_id -> orders.order_id
order_items.menu_id -> menus.menu_id
```

### Catatan Alur Data

- Riwayat transaksi hanya mengambil order aktif dengan `orders.deleted_at = null`.
- List transaksi diurutkan berdasarkan `orders.created_at` terbaru.
- Pencarian pada implementasi backend saat ini memakai `orders.customer_name`.
- Detail transaksi hanya mengembalikan `order_items` aktif dengan `order_items.deleted_at = null`.
- Kirim ulang struk memakai endpoint receipt dan tidak membuat record baru di database.

---

## 1. Menampilkan Daftar Transaksi

Endpoint ini digunakan untuk mengambil daftar seluruh transaksi dengan fitur *pagination* dan pemfilteran berlapis (berdasarkan tanggal, kasir yang bertugas, status pesanan, metode pembayaran, dll).

- **Endpoint:** `GET /order`
- **Akses:** Protected (Kasir & Admin)

### Query Parameters

Semua parameter bersifat opsional (dapat disesuaikan dengan form filter di halaman riwayat):

| Parameter | Tipe | Format / Pilihan | Deskripsi |
| :--- | :--- | :--- | :--- |
| `batch` | Number | Angka bulat | Halaman ke berapa (default: `1`) |
| `size` | Number | Angka bulat | Jumlah per halaman (default: `10`, maks `100`) |
| `search` | String | Bebas | Pencarian (umumnya berdasarkan nomor struk atau nama pelanggan) |
| `status` | String | `PENDING`, `COMPLETED`, `CANCELLED` | Filter berdasarkan status pesanan |
| `payment_type` | String | `CASH`, `QRIS` | Filter berdasarkan tipe pembayaran |
| `shift_id` | UUID | Format UUID | Filter riwayat untuk *shift* tertentu |
| `start_date` | String | `YYYY-MM-DD` | Filter transaksi mulai dari tanggal ini |
| `end_date` | String | `YYYY-MM-DD` | Filter transaksi sampai tanggal ini |

**Contoh Penggunaan URL:**
`GET /api/order?batch=1&size=20&status=COMPLETED&payment_type=CASH&start_date=2024-01-01&end_date=2024-01-31`

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Berhasil mengambil data pesanan",
  "data": {
    "page": {
      "total_record_count": 150,
      "batch_number": 1,
      "batch_size": 20,
      "max_batch_size": 100
    },
    "records": [
      {
        "order_id": "uuid-order-1",
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
        "_count": {
          "order_items": 3
        }
      }
    ]
  }
}
```

---

## 2. Melihat Detail Transaksi

Endpoint ini digunakan ketika pengguna mengklik salah satu baris transaksi pada tabel riwayat untuk melihat barang apa saja yang dibeli (*order items*).

- **Endpoint:** `GET /order/:order_id`
- **Akses:** Protected (Kasir & Admin)

### Query Parameters
(Tidak ada)

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Berhasil mengambil detail pesanan",
  "data": {
    "order_id": "uuid-order-1",
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
    "shift": {
      "shift_id": "uuid-shift-id",
      "start_time": "2024-01-01T08:00:00Z",
      "end_time": "2024-01-01T16:00:00Z"
    },
    "order_items": [
      {
        "order_item_id": "uuid-order-item-1",
        "menu_id": "uuid-menu-1",
        "qty": 2,
        "price": 25000,
        "subtotal": 50000,
        "menu": {
          "menu_id": "uuid-menu-1",
          "name": "Kopi Susu",
          "image_url": "https://example.com/image.jpg"
        }
      },
      {
        "order_item_id": "uuid-order-item-2",
        "menu_id": "uuid-menu-2",
        "qty": 1,
        "price": 15000,
        "subtotal": 15000,
        "menu": {
          "menu_id": "uuid-menu-2",
          "name": "Roti Bakar",
          "image_url": "https://example.com/roti.jpg"
        }
      }
    ]
  }
}
```

---

## 3. Kirim Ulang Struk via WhatsApp

Fitur ini bisa digunakan di menu "Detail Transaksi" untuk mengirimkan ulang bukti pembelian kepada pelanggan via chat WA.

- **Endpoint:** `POST /receipt/:order_id/send`
- **Akses:** Protected (Kasir & Admin)

### Request Body (JSON)

| Field | Tipe | Validasi | Deskripsi |
| :--- | :--- | :--- | :--- |
| `phone` | String | Wajib, hanya angka | Nomor WhatsApp pelanggan |

**Contoh Request:**
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
    "receipt_url": "http://localhost:4000/api/receipt/uuid-order-1/pdf",
    "whatsapp_status": true
  }
}
```

*(Catatan: `receipt_url` yang dikembalikan juga bisa dimanfaatkan Frontend jika ingin memberikan tautan *Copy Link* langsung kepada Kasir.)*
