# Dokumentasi API Struk Digital

Dokumentasi ini menjelaskan rute API untuk melihat preview struk, membuat PDF struk secara on-demand, dan mengirim link struk digital ke WhatsApp customer.

Base URL Utama: `/api/receipt`

---

## Tabel dan Field yang Dipakai

Modul struk memakai tabel utama `orders` sebagai sumber data transaksi. Detail item struk diambil dari `order_items` dan `menus`, nama kasir diambil dari `users`, sedangkan identitas toko/header/footer struk diambil dari `store_settings`.

### Ringkasan Penggunaan Tabel

| Proses | Tabel yang Dipakai | Keterangan |
| --- | --- | --- |
| Generate PDF struk | `orders`, `order_items`, `menus`, `users`, `store_settings` | Mengambil data order, item, menu, kasir, dan profil toko lalu membuat PDF. |
| Preview sample struk | `store_settings` | Mengembalikan data contoh struk tanpa order asli untuk preview halaman admin. |
| Preview struk | `orders`, `order_items`, `menus`, `users`, `store_settings` | Mengembalikan data struk dalam format JSON untuk preview frontend. |
| Kirim struk WhatsApp | `orders`, `order_items`, `menus`, `users`, `store_settings` | Mengambil data order dan profil toko untuk membuat pesan WhatsApp berisi link PDF. |

### 1. Tabel `orders`

Tabel utama transaksi yang menjadi sumber data struk.

| Field | Tipe | Nullable | Keterangan |
| --- | --- | --- | --- |
| `order_id` | UUID | Tidak | Primary key order dan path parameter endpoint struk. |
| `shift_id` | UUID | Tidak | Foreign key ke tabel `shifts`. Tidak ditampilkan langsung pada struk digital. |
| `user_id` | UUID | Tidak | Foreign key ke tabel `users`, dipakai untuk mengambil nama kasir. |
| `customer_name` | varchar(50) | Ya | Nama customer pada struk. |
| `customer_phone` | varchar(20) | Ya | Nomor customer pada struk. |
| `receipt` | varchar(50) | Ya | Nomor struk bisnis. Dipakai untuk tampilan struk dan nama file PDF. |
| `total_amount` | decimal(15,2) | Tidak | Total transaksi. |
| `paid_amount` | decimal(15,2) | Tidak | Nominal dibayar. |
| `change_amount` | decimal(15,2) | Tidak | Nominal kembalian. |
| `payment_type` | varchar(20) | Tidak | Metode pembayaran, misalnya `CASH` atau `QRIS`. |
| `status` | varchar(20) | Tidak | Status order. Ikut dibaca dari database, meskipun tidak ditampilkan sebagai field utama preview. |
| `created_at` | timestamp | Tidak | Waktu transaksi. Diubah menjadi `order_date` dan `order_time`. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Struk hanya dibuat untuk order dengan `deleted_at = null`. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| --- | --- |
| Generate PDF/preview/send | `order_id`, `receipt`, `customer_name`, `customer_phone`, `total_amount`, `paid_amount`, `change_amount`, `payment_type`, `status`, `created_at`, `user_id`, `deleted_at` |
| Filename PDF | `receipt` atau fallback ke `order_id` |
| Preview sample | Tidak memakai tabel `orders`; nilai order memakai data contoh dari backend. |

### 2. Tabel `order_items`

Tabel item pesanan yang ditampilkan sebagai daftar item struk.

| Field | Tipe | Nullable | Keterangan |
| --- | --- | --- | --- |
| `order_item_id` | UUID | Tidak | Primary key item order. |
| `order_id` | UUID | Tidak | Foreign key ke tabel `orders`. |
| `menu_id` | UUID | Tidak | Foreign key ke tabel `menus`. |
| `qty` | integer | Tidak | Jumlah item yang dibeli. |
| `price` | decimal(15,2) | Tidak | Harga satuan menu saat transaksi. |
| `subtotal` | decimal(15,2) | Tidak | Subtotal item. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Struk hanya memakai item dengan `deleted_at = null`. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| --- | --- |
| Item struk | `order_id`, `menu_id`, `qty`, `price`, `subtotal`, `deleted_at` |

### 3. Tabel `menus`

Tabel menu dipakai untuk mengambil nama item pada struk.

| Field | Tipe | Nullable | Keterangan |
| --- | --- | --- | --- |
| `menu_id` | UUID | Tidak | Primary key menu. |
| `category_id` | UUID | Tidak | Foreign key ke tabel `categories`. |
| `name` | varchar(100) | Tidak | Nama menu yang ditampilkan di item struk. |
| `price` | decimal(15,2) | Tidak | Harga menu master. Struk memakai harga transaksi dari `order_items.price`. |
| `cost` | decimal(15,2) | Tidak | HPP menu. Tidak ditampilkan pada struk. |
| `description` | text | Ya | Deskripsi menu. |
| `image_url` | varchar(255) | Ya | URL/path gambar menu. Tidak dipakai oleh struk digital. |
| `is_available` | boolean | Tidak | Status ketersediaan menu. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| --- | --- |
| Item struk | `menu_id`, `name` melalui relasi `order_items.menu`. |

### 4. Tabel `users`

Tabel pengguna dipakai untuk mengambil nama kasir pada struk.

| Field | Tipe | Nullable | Keterangan |
| --- | --- | --- | --- |
| `user_id` | UUID | Tidak | Primary key pengguna. |
| `username` | varchar(50) | Tidak | Username login. |
| `name` | varchar(100) | Tidak | Nama kasir yang ditampilkan pada struk. |
| `phone_number` | varchar(20) | Ya | Nomor pengguna. |
| `role_id` | UUID | Tidak | Foreign key role pengguna. |
| `user_status_id` | UUID | Tidak | Foreign key status pengguna. |
| `last_login` | time | Ya | Waktu login terakhir. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| --- | --- |
| Kasir struk | `name` melalui relasi `orders.user`. |

### 5. Tabel `store_settings`

Tabel konfigurasi toko yang dipakai untuk header/footer dan identitas toko pada struk.

| Field | Tipe | Nullable | Keterangan |
| --- | --- | --- | --- |
| `store_setting_id` | UUID | Tidak | Primary key setting. |
| `setting_key` | varchar(50) | Tidak | Key setting, misalnya `store_name`. |
| `setting_value` | text | Tidak | Nilai setting. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Struk hanya memakai setting aktif. |

Setting yang dipakai:

| Setting Key | Keterangan |
| --- | --- |
| `store_name` | Nama toko. Fallback ke `STORE_NAME` atau `Toko Anda`. |
| `store_address` | Alamat toko. Fallback ke `STORE_ADDRESS`. |
| `store_phone` | Nomor telepon toko. Fallback ke `STORE_PHONE`. |
| `store_logo` | Logo toko. Fallback ke `STORE_LOGO`. |
| `receipt_header` | Header tambahan pada struk. |
| `receipt_footer` | Footer tambahan pada struk. |

### Relasi Tabel

```text
orders.user_id -> users.user_id
order_items.order_id -> orders.order_id
order_items.menu_id -> menus.menu_id
```

### Catatan Alur Data

- Endpoint PDF bersifat public, tetapi tetap hanya membaca order aktif (`orders.deleted_at = null`).
- PDF dan preview selalu dibuat ulang dari data order terbaru di database.
- Data toko berasal dari `store_settings`; jika key tidak tersedia, backend memakai fallback dari environment variable.
- Endpoint kirim WhatsApp tidak menyimpan log pengiriman ke database; response hanya berisi status dari provider WhatsApp.

---

## Ringkasan Endpoint

| Method | Endpoint | Akses | Deskripsi |
| --- | --- | --- | --- |
| `GET` | `/:order_id/pdf` | Public | Generate dan tampilkan/download PDF struk. |
| `GET` | `/preview-sample` | ADMIN | Mengambil data contoh struk untuk preview konfigurasi toko/header/footer. |
| `GET` | `/:order_id/preview` | ADMIN, CASHIER | Mengambil data struk dalam format JSON untuk preview. |
| `POST` | `/:order_id/send` | ADMIN, CASHIER | Mengirim link struk PDF ke WhatsApp customer. |

**Catatan:** Endpoint PDF bersifat public karena link ini dikirim ke customer melalui WhatsApp.

---

## Path Parameter

Endpoint `/:order_id/pdf`, `/:order_id/preview`, dan `/:order_id/send` memakai path parameter berikut. Endpoint `/preview-sample` tidak memakai path parameter.

| Parameter | Type | Required | Keterangan |
| --- | --- | --- | --- |
| `order_id` | string uuid | Ya | ID order yang akan dibuatkan struk. |

Contoh:

```text
/api/receipt/018f68c7-7f3b-7c5d-9d37-4c3d8c70c111/preview
```

---

## Struktur Data Struk

Data struk yang dikembalikan endpoint preview dan dipakai untuk generate PDF memiliki struktur berikut.

| Field | Type | Keterangan |
| --- | --- | --- |
| `store_name` | string | Nama toko dari store setting atau env fallback. |
| `store_address` | string | Alamat toko. |
| `store_phone` | string | Nomor telepon toko. |
| `store_logo` | string | URL/path logo toko. |
| `receipt_header` | string | Teks header tambahan pada struk. |
| `receipt_footer` | string | Teks footer tambahan pada struk. |
| `order_id` | string uuid | ID teknis order. |
| `receipt` | string/null | Nomor struk bisnis. Jika kosong, tampilan nomor struk menjadi `-`. |
| `order_date` | string | Tanggal order dalam format lokal Indonesia. |
| `order_time` | string | Jam order dalam format lokal Indonesia. |
| `cashier_name` | string | Nama kasir. |
| `customer_name` | string/null | Nama customer jika ada. |
| `customer_phone` | string/null | Nomor customer jika ada. |
| `items` | array | Daftar item pesanan. |
| `total` | number | Total transaksi. |
| `payment_type` | string | Tipe pembayaran, misalnya `CASH` atau `QRIS`. |
| `paid_amount` | number | Nominal dibayar. |
| `change_amount` | number | Nominal kembalian. |

### Struktur `items`

| Field | Type | Keterangan |
| --- | --- | --- |
| `name` | string | Nama menu. |
| `qty` | number | Jumlah item. |
| `price` | number | Harga per item. |
| `subtotal` | number | Subtotal item. |

---

## 1. Preview Sample Struk

- **Endpoint:** `GET /preview-sample`
- **URL Lengkap:** `/api/receipt/preview-sample`
- **Akses:** Protected, role **ADMIN**
- **Request Body:** Tidak ada

Endpoint ini mengembalikan data contoh struk tanpa membutuhkan `order_id`. Data identitas toko, logo, header, dan footer tetap diambil dari `store_settings`, sehingga halaman admin bisa menampilkan preview hasil konfigurasi struk sebelum ada transaksi asli.

### Request Headers

```http
Authorization: Bearer <token>
x-api-key: <api-key>
```

### Request

```http
GET /api/receipt/preview-sample
```

### Response Berhasil (200 OK)

```json
{
  "response": {
    "store_name": "Cindelaras Resto",
    "store_address": "Jl. Ringroad Utara, Yogyakarta",
    "store_phone": "0274-123456",
    "store_logo": "/uploads/logo.png",
    "receipt_header": "Selamat datang",
    "receipt_footer": "Terima kasih atas kunjungan Anda",
    "order_id": "00000000-0000-0000-0000-000000000000",
    "receipt": "PREVIEW-SAMPLE",
    "order_date": "10 Jun 2026",
    "order_time": "14.30",
    "cashier_name": "Admin Preview",
    "customer_name": "Pelanggan Contoh",
    "customer_phone": "081234567890",
    "items": [
      {
        "name": "Nasi Goreng Spesial",
        "qty": 1,
        "price": 25000,
        "subtotal": 25000
      },
      {
        "name": "Es Teh Manis",
        "qty": 2,
        "price": 5000,
        "subtotal": 10000
      }
    ],
    "total": 35000,
    "payment_type": "CASH",
    "paid_amount": 50000,
    "change_amount": 15000
  },
  "metaData": {
    "message": "Berhasil mengambil preview sample struk",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

## 2. Generate PDF Struk

- **Endpoint:** `GET /:order_id/pdf`
- **URL Lengkap:** `/api/receipt/:order_id/pdf`
- **Akses:** Public, tanpa token
- **Request Body:** Tidak ada
- **Content-Type Response:** `application/pdf`

Endpoint ini mengambil data order terbaru dari database, membuat PDF struk secara on-demand, lalu mengirim file PDF sebagai response.

### Request

```http
GET /api/receipt/018f68c7-7f3b-7c5d-9d37-4c3d8c70c111/pdf
```

### Response Berhasil (200 OK)

Endpoint ini mengembalikan file PDF sebagai binary response, bukan JSON.

**Response Headers:**

```http
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: inline; filename="struk-RCP-240101-0001.pdf"
Content-Length: 24576
```

**Response Body:**

```text
Binary PDF file
```

### Catatan Filename

Nama file menggunakan pola:

```text
struk-{receipt atau order_id}.pdf
```

Jika order memiliki nomor struk `RCP-240101-0001`, nama file menjadi:

```text
struk-RCP-240101-0001.pdf
```

Jika nomor struk belum ada, backend memakai `order_id`.

---

## 3. Preview Data Struk

- **Endpoint:** `GET /:order_id/preview`
- **URL Lengkap:** `/api/receipt/:order_id/preview`
- **Akses:** Protected, role **ADMIN** atau **CASHIER**
- **Request Body:** Tidak ada

Endpoint ini mengembalikan data struk dalam format JSON. Cocok untuk preview di frontend sebelum struk dicetak, diunduh, atau dikirim ke customer.

### Request Headers

```http
Authorization: Bearer <token>
x-api-key: <api-key>
```

### Request

```http
GET /api/receipt/018f68c7-7f3b-7c5d-9d37-4c3d8c70c111/preview
```

### Response Berhasil (200 OK)

```json
{
  "response": {
    "store_name": "Cindelaras Resto",
    "store_address": "Jl. Ringroad Utara, Yogyakarta",
    "store_phone": "0274-123456",
    "store_logo": "/uploads/logo.png",
    "receipt_header": "Selamat datang",
    "receipt_footer": "Terima kasih atas kunjungan Anda",
    "order_id": "018f68c7-7f3b-7c5d-9d37-4c3d8c70c111",
    "receipt": "RCP-240101-0001",
    "order_date": "25 Jan 2026",
    "order_time": "14.30",
    "cashier_name": "Budi",
    "customer_name": "Andi",
    "customer_phone": "08123456789",
    "items": [
      {
        "name": "Nasi Goreng Spesial",
        "qty": 2,
        "price": 25000,
        "subtotal": 50000
      },
      {
        "name": "Es Teh",
        "qty": 2,
        "price": 5000,
        "subtotal": 10000
      }
    ],
    "total": 60000,
    "payment_type": "CASH",
    "paid_amount": 100000,
    "change_amount": 40000
  },
  "metaData": {
    "message": "Berhasil mengambil data struk",
    "code": 200,
    "response_code": "0000"
  }
}
```

### Response Jika Customer Kosong

Jika order tidak memiliki data customer, field customer bernilai `null`.

```json
{
  "response": {
    "customer_name": null,
    "customer_phone": null
  },
  "metaData": {
    "message": "Berhasil mengambil data struk",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

## 4. Kirim Struk ke WhatsApp

- **Endpoint:** `POST /:order_id/send`
- **URL Lengkap:** `/api/receipt/:order_id/send`
- **Akses:** Protected, role **ADMIN** atau **CASHIER**
- **Content-Type Request:** `application/json`

Endpoint ini mengirim pesan WhatsApp berisi link PDF struk ke nomor customer. Link yang dikirim mengarah ke endpoint public:

```text
/api/receipt/:order_id/pdf
```

### Request Headers

```http
Authorization: Bearer <token>
x-api-key: <api-key>
Content-Type: application/json
```

### Request Body

| Field | Type | Required | Keterangan |
| --- | --- | --- | --- |
| `phone` | string | Ya | Nomor WhatsApp customer. Minimal 10 digit, maksimal 15 digit, hanya angka dan tanda `+`. |

Contoh:

```json
{
  "phone": "08123456789"
}
```

Contoh lain:

```json
{
  "phone": "628123456789"
}
```

### Response Berhasil Terkirim (200 OK)

```json
{
  "response": {
    "success": true,
    "message": "Struk berhasil dikirim ke WhatsApp",
    "receipt_url": "http://localhost:4000/api/receipt/018f68c7-7f3b-7c5d-9d37-4c3d8c70c111/pdf",
    "whatsapp_status": true
  },
  "metaData": {
    "message": "Struk berhasil dikirim ke WhatsApp",
    "code": 200,
    "response_code": "0000"
  }
}
```

### Response Jika Provider WhatsApp Gagal (200 OK)

Jika request valid dan order ditemukan, tetapi provider WhatsApp gagal mengirim pesan, backend tetap mengembalikan HTTP `200` dengan `success: false`.

```json
{
  "response": {
    "success": false,
    "message": "Gagal mengirim pesan WhatsApp",
    "receipt_url": "http://localhost:4000/api/receipt/018f68c7-7f3b-7c5d-9d37-4c3d8c70c111/pdf",
    "whatsapp_status": false
  },
  "metaData": {
    "message": "Gagal mengirim pesan WhatsApp",
    "code": 200,
    "response_code": "0000"
  }
}
```

### Isi Pesan WhatsApp

Pesan yang dikirim berisi:

```text
Terima kasih telah berbelanja di {store_name}!

No. Struk: {receipt}
Total: Rp {total_amount}
Pembayaran: {payment_type}

Lihat struk digital Anda:
{receipt_url}

Struk ini berlaku sebagai bukti pembayaran yang sah.
Terima kasih!
```

---

## Error Response

### 400 Bad Request - Format `order_id` Tidak Valid

Terjadi jika path parameter `order_id` bukan UUID.

```json
{
  "response": [
    {
      "location": "params",
      "field": "order_id",
      "message": "Format order_id tidak valid"
    }
  ],
  "metaData": {
    "message": "Validasi gagal",
    "code": 400,
    "response_code": "400"
  }
}
```

### 400 Bad Request - Nomor Telepon Terlalu Pendek

```json
{
  "response": [
    {
      "location": "body",
      "field": "phone",
      "message": "Nomor telepon minimal 10 digit"
    }
  ],
  "metaData": {
    "message": "Validasi gagal",
    "code": 400,
    "response_code": "400"
  }
}
```

### 400 Bad Request - Nomor Telepon Mengandung Karakter Tidak Valid

```json
{
  "response": [
    {
      "location": "body",
      "field": "phone",
      "message": "Nomor telepon hanya boleh angka"
    }
  ],
  "metaData": {
    "message": "Validasi gagal",
    "code": 400,
    "response_code": "400"
  }
}
```

### 400 Bad Request - Fonnte Belum Dikonfigurasi

Terjadi pada endpoint `POST /:order_id/send` jika token Fonnte belum tersedia.

```json
{
  "response": [
    {
      "location": "server",
      "field": "fonnte_token",
      "message": "Token Fonnte tidak ditemukan"
    }
  ],
  "metaData": {
    "message": "Fonnte belum dikonfigurasi",
    "code": 400,
    "response_code": "400"
  }
}
```

### 401 Unauthorized

Terjadi pada endpoint protected jika token atau API key tidak valid.

```json
{
  "response": [],
  "metaData": {
    "message": "Unauthorized",
    "code": 401,
    "response_code": "401"
  }
}
```

### 403 Forbidden

Terjadi jika user tidak memiliki role **ADMIN** atau **CASHIER**.

```json
{
  "response": [],
  "metaData": {
    "message": "Forbidden",
    "code": 403,
    "response_code": "403"
  }
}
```

### 404 Not Found - Order Tidak Ditemukan

```json
{
  "response": [],
  "metaData": {
    "message": "Order tidak ditemukan",
    "code": 404,
    "response_code": "404"
  }
}
```

---

## Catatan Implementasi

- `GET /api/receipt/:order_id/pdf` tidak membutuhkan auth, jadi aman dipakai sebagai link customer.
- PDF selalu di-generate ulang dari data order saat link diakses.
- `GET /api/receipt/preview-sample` khusus admin dan tidak membaca tabel order; endpoint ini memakai item transaksi contoh untuk melihat tampilan header/footer/logo toko.
- `GET /api/receipt/:order_id/preview` cocok untuk preview internal aplikasi kasir.
- `POST /api/receipt/:order_id/send` hanya mengirim link PDF, bukan file PDF langsung.
- Base URL link WhatsApp mengikuti konfigurasi `API_BASE_URL`. Jika `API_BASE_URL` belum diakhiri `/api`, backend menambahkan `/api` otomatis.
- Jika nomor struk bisnis belum tersedia, field `receipt` bernilai `null` di preview dan ditampilkan sebagai `-` pada pesan/struk.
- Jika provider WhatsApp gagal, cek field `response.success` dan `response.whatsapp_status`, bukan hanya HTTP status.
