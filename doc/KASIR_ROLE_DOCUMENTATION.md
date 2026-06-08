# 📋 Dokumentasi Fitur & Endpoint Role Kasir

Dokumentasi lengkap fitur dan endpoint API yang dapat diakses oleh **Role Kasir (Cashier)** pada Sistem Kasir ISCP.

**Base URL**: `http://localhost:3000/api`

---

## 🔐 Otentikasi (Authentication)

Role Kasir harus login terlebih dahulu untuk mengakses semua fitur.

### 1. Login

Masuk ke sistem untuk mendapatkan token akses.

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `POST /auth/login` |
| **Auth Required** | ❌ Tidak |

#### Request Body
```json
{
  "username": "kasir1",
  "password": "password123"
}
```

#### Response Sukses (200 OK)
```json
{
  "response": {
    "token": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "api_key": "550e8400-e29b-41d4-a716-446655440000",
      "token_type": "Bearer",
      "expires_in": 3600
    },
    "user": {
      "user_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "username": "kasir1",
      "name": "Budi Kasir",
      "role": {
        "role_id": 2,
        "name": "CASHIER"
      }
    }
  },
  "metaData": {
    "message": "Login berhasil",
    "code": 200,
    "response_code": "0000"
  }
}
```

#### Response Gagal (401 Unauthorized)
```json
{
  "response": null,
  "metaData": {
    "message": "Username atau password salah",
    "code": 401,
    "response_code": "0001"
  }
}
```

---

### 2. Logout

Keluar dari sistem dan menghapus sesi.

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `POST /auth/logout` |
| **Auth Required** | ✅ Bearer Token |

#### Headers
```
Authorization: Bearer <access_token>
```

#### Response Sukses (200 OK)
```json
{
  "response": {
    "success": true,
    "message": "Logout berhasil"
  },
  "metaData": {
    "message": "Logout berhasil",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

## 💵 Manajemen Shift (Buka/Tutup Kas)

Kasir **WAJIB** melakukan **Start Shift (Buka Kas)** sebelum bisa melakukan transaksi penjualan.

### 1. Start Shift (Buka Kas)

Memulai shift baru dengan modal awal.

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `POST /shift/start` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | CASHIER, ADMIN |

#### Request Body
```json
{
  "start_cash": 500000
}
```

| Field | Tipe | Validasi | Deskripsi |
|-------|------|----------|-----------|
| `start_cash` | number | min: 0, max: 100.000.000 | Modal awal kas dalam Rupiah |

#### Response Sukses (201 Created)
```json
{
  "response": {
    "shift_id": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    "user_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "user": {
      "user_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "name": "Budi Kasir"
    },
    "start_time": "2026-01-23T08:00:00.000Z",
    "start_cash": 500000,
    "end_time": null,
    "end_cash": null,
    "status": "ACTIVE",
    "created_at": "2026-01-23T08:00:00.000Z"
  },
  "metaData": {
    "message": "Shift berhasil dimulai",
    "code": 201,
    "response_code": "0000"
  }
}
```

#### Response Gagal - Shift Sudah Aktif (400 Bad Request)
```json
{
  "response": null,
  "metaData": {
    "message": "Anda sudah memiliki shift yang aktif",
    "code": 400,
    "response_code": "0001"
  }
}
```

---

### 2. End Shift (Tutup Kas)

Mengakhiri shift dan melaporkan uang akhir kas.

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `POST /shift/end` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | CASHIER, ADMIN |

#### Request Body
```json
{
  "end_cash": 1850000,
  "notes": "Shift lancar, tidak ada kendala"
}
```

| Field | Tipe | Validasi | Deskripsi |
|-------|------|----------|-----------|
| `end_cash` | number | min: 0, max: 100.000.000 | Jumlah kas akhir aktual |
| `notes` | string | max: 500 (opsional) | Catatan penutupan shift |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "shift_id": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    "start_time": "2026-01-23T08:00:00.000Z",
    "end_time": "2026-01-23T16:00:00.000Z",
    "start_cash": 500000,
    "end_cash": 1850000,
    "expected_cash": 1850000,
    "cash_difference": 0,
    "total_sales": 1350000,
    "total_orders": 45,
    "total_cash_in": 50000,
    "total_cash_out": 50000,
    "duration_minutes": 480,
    "status": "CLOSED",
    "notes": "Shift lancar, tidak ada kendala"
  },
  "metaData": {
    "message": "Shift berhasil ditutup",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

### 3. Cek Shift Aktif

Mengecek apakah kasir saat ini memiliki shift yang masih aktif.

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /shift/active` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | CASHIER, ADMIN |

#### Response Sukses - Ada Shift Aktif (200 OK)
```json
{
  "response": {
    "shift_id": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    "user_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "user": {
      "user_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "name": "Budi Kasir"
    },
    "start_time": "2026-01-23T08:00:00.000Z",
    "start_cash": 500000,
    "status": "ACTIVE"
  },
  "metaData": {
    "message": "Shift aktif ditemukan",
    "code": 200,
    "response_code": "0000"
  }
}
```

#### Response - Tidak Ada Shift Aktif (200 OK)
```json
{
  "response": null,
  "metaData": {
    "message": "Tidak ada shift aktif",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

### 4. Lihat Shift Saya

Mengambil daftar shift milik kasir yang sedang login.

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /shift/my` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | CASHIER, ADMIN |

#### Query Parameters
| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `batch` | number | Halaman (default: 1) |
| `size` | number | Jumlah per halaman (default: 10, max: 100) |
| `start_date` | string | Filter tanggal awal (YYYY-MM-DD) |
| `end_date` | string | Filter tanggal akhir (YYYY-MM-DD) |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "records": [
      {
        "shift_id": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
        "start_time": "2026-01-23T08:00:00.000Z",
        "end_time": "2026-01-23T16:00:00.000Z",
        "start_cash": 500000,
        "end_cash": 1850000,
        "status": "CLOSED"
      },
      {
        "shift_id": "c3d4e5f6-a7b8-9012-cdef-345678901234",
        "start_time": "2026-01-22T08:00:00.000Z",
        "end_time": "2026-01-22T16:30:00.000Z",
        "start_cash": 500000,
        "end_cash": 2100000,
        "status": "CLOSED"
      }
    ],
    "total": 15,
    "batch": 1,
    "size": 10,
    "total_pages": 2
  },
  "metaData": {
    "message": "Data shift berhasil diambil",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

### 5. Detail Shift

Melihat detail lengkap suatu shift.

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /shift/:shift_id` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | CASHIER, ADMIN |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "shift_id": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    "user_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "user": {
      "user_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "name": "Budi Kasir"
    },
    "start_time": "2026-01-23T08:00:00.000Z",
    "end_time": "2026-01-23T16:00:00.000Z",
    "start_cash": 500000,
    "end_cash": 1850000,
    "status": "CLOSED",
    "notes": "Shift lancar",
    "created_at": "2026-01-23T08:00:00.000Z",
    "updated_at": "2026-01-23T16:00:00.000Z"
  },
  "metaData": {
    "message": "Detail shift berhasil diambil",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

### 6. Ringkasan Shift

Mendapatkan ringkasan shift lengkap dengan statistik penjualan.

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /shift/:shift_id/summary` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | CASHIER, ADMIN |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "shift_id": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    "cashier_name": "Budi Kasir",
    "start_time": "2026-01-23T08:00:00.000Z",
    "end_time": "2026-01-23T16:00:00.000Z",
    "start_cash": 500000,
    "end_cash": 1850000,
    "statistics": {
      "total_orders": 45,
      "completed_orders": 43,
      "cancelled_orders": 2,
      "total_sales": 1350000,
      "cash_sales": 950000,
      "qris_sales": 400000,
      "average_order_value": 31395
    },
    "cash_movements": {
      "total_in": 50000,
      "total_out": 50000,
      "net": 0
    },
    "expected_cash": 1850000,
    "actual_cash": 1850000,
    "difference": 0,
    "status": "CLOSED"
  },
  "metaData": {
    "message": "Ringkasan shift berhasil diambil",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

## 🍽️ Katalog Menu

Kasir dapat melihat daftar menu untuk ditampilkan pada POS.

### 1. Lihat Daftar Menu

Mengambil semua menu yang tersedia.

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /menu` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | CASHIER, ADMIN |

#### Query Parameters
| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `batch` | number | Halaman (default: 1) |
| `size` | number | Jumlah per halaman (default: 10) |
| `search` | string | Cari berdasarkan nama menu |
| `category_id` | string (UUID) | Filter berdasarkan kategori |
| `is_available` | boolean | Filter ketersediaan (`true`/`false`) |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "records": [
      {
        "menu_id": "d4e5f6a7-b8c9-0123-defg-456789012345",
        "name": "Nasi Goreng Spesial",
        "price": 25000,
        "description": "Nasi goreng dengan telur, ayam, dan sayuran segar",
        "image_url": "https://example.com/images/nasi-goreng.jpg",
        "is_available": true,
        "category": {
          "category_id": "e5f6a7b8-c9d0-1234-efgh-567890123456",
          "name": "Makanan"
        }
      },
      {
        "menu_id": "f6a7b8c9-d0e1-2345-ghij-678901234567",
        "name": "Es Teh Manis",
        "price": 5000,
        "description": "Teh manis dingin segar",
        "image_url": "https://example.com/images/es-teh.jpg",
        "is_available": true,
        "category": {
          "category_id": "a7b8c9d0-e1f2-3456-ijkl-789012345678",
          "name": "Minuman"
        }
      }
    ],
    "total": 25,
    "batch": 1,
    "size": 10,
    "total_pages": 3
  },
  "metaData": {
    "message": "Berhasil mengambil data menu",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

### 2. Detail Menu

Melihat detail lengkap suatu menu.

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /menu/:menu_id` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | CASHIER, ADMIN |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "menu_id": "d4e5f6a7-b8c9-0123-defg-456789012345",
    "name": "Nasi Goreng Spesial",
    "price": 25000,
    "description": "Nasi goreng dengan telur, ayam, dan sayuran segar",
    "image_url": "https://example.com/images/nasi-goreng.jpg",
    "is_available": true,
    "category": {
      "category_id": "e5f6a7b8-c9d0-1234-efgh-567890123456",
      "name": "Makanan"
    },
    "recipes": [
      {
        "ingredient": {
          "ingredient_id": "...",
          "name": "Nasi"
        },
        "qty": 200,
        "unit": "gram"
      }
    ],
    "created_at": "2026-01-01T00:00:00.000Z",
    "updated_at": "2026-01-15T10:30:00.000Z"
  },
  "metaData": {
    "message": "Detail menu berhasil diambil",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

## 🛒 Transaksi & Pesanan (Order)

Fitur utama kasir untuk melayani pelanggan dan membuat transaksi penjualan.

> ⚠️ **PENTING**: Kasir harus memiliki **Shift Aktif** untuk bisa membuat pesanan!

### 1. Buat Pesanan (Checkout)

Membuat pesanan baru dari keranjang belanja pelanggan.

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `POST /order` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | CASHIER, ADMIN |

#### Request Body
```json
{
  "customer_name": "Pak Ahmad",
  "customer_phone": "081234567890",
  "payment_type": "CASH",
  "items": [
    {
      "menu_id": "d4e5f6a7-b8c9-0123-defg-456789012345",
      "qty": 2,
      "price": 25000
    },
    {
      "menu_id": "f6a7b8c9-d0e1-2345-ghij-678901234567",
      "qty": 3,
      "price": 5000
    }
  ]
}
```

| Field | Tipe | Validasi | Deskripsi |
|-------|------|----------|-----------|
| `customer_name` | string | max: 50 (opsional) | Nama pelanggan |
| `customer_phone` | string | max: 20 (opsional) | Nomor HP pelanggan |
| `payment_type` | enum | `CASH` / `QRIS` | Metode pembayaran |
| `items` | array | min: 1 item | Daftar item pesanan |
| `items[].menu_id` | string | UUID | ID menu |
| `items[].qty` | number | min: 1 | Jumlah pesanan |
| `items[].price` | number | min: 0 | Harga satuan |

#### Response Sukses - Pembayaran CASH (201 Created)
```json
{
  "response": {
    "order_id": "g7h8i9j0-k1l2-3456-mnop-890123456789",
    "order_number": "ORD-20260123-0001",
    "customer_name": "Pak Ahmad",
    "payment_type": "CASH",
    "status": "COMPLETED",
    "subtotal": 65000,
    "discount": 0,
    "total_amount": 65000,
    "items": [
      {
        "menu_name": "Nasi Goreng Spesial",
        "qty": 2,
        "price": 25000,
        "subtotal": 50000
      },
      {
        "menu_name": "Es Teh Manis",
        "qty": 3,
        "price": 5000,
        "subtotal": 15000
      }
    ],
    "shift_id": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    "cashier_name": "Budi Kasir",
    "created_at": "2026-01-23T10:30:00.000Z"
  },
  "metaData": {
    "message": "Pesanan berhasil dibuat",
    "code": 201,
    "response_code": "0000"
  }
}
```

#### Response Sukses - Pembayaran QRIS (201 Created)
```json
{
  "response": {
    "order_id": "g7h8i9j0-k1l2-3456-mnop-890123456789",
    "order_number": "ORD-20260123-0002",
    "payment_type": "QRIS",
    "status": "PENDING",
    "total_amount": 65000,
    "items": [...],
    "created_at": "2026-01-23T10:35:00.000Z"
  },
  "metaData": {
    "message": "Pesanan berhasil dibuat, menunggu konfirmasi pembayaran QRIS",
    "code": 201,
    "response_code": "0000"
  }
}
```

#### Response Gagal - Tidak Ada Shift Aktif (400 Bad Request)
```json
{
  "response": null,
  "metaData": {
    "message": "Anda harus memulai shift terlebih dahulu",
    "code": 400,
    "response_code": "0001"
  }
}
```

---

### 2. Konfirmasi Pembayaran

Mengkonfirmasi pembayaran untuk pesanan QRIS yang masih PENDING.

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `PATCH /order/:order_id/confirm` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | CASHIER, ADMIN |

#### Request Body (Opsional)
```json
{
  "paid_amount": 65000
}
```

#### Response Sukses (200 OK)
```json
{
  "response": {
    "order_id": "g7h8i9j0-k1l2-3456-mnop-890123456789",
    "order_number": "ORD-20260123-0002",
    "status": "COMPLETED",
    "payment_type": "QRIS",
    "paid_amount": 65000,
    "confirmed_at": "2026-01-23T10:40:00.000Z"
  },
  "metaData": {
    "message": "Pembayaran berhasil dikonfirmasi",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

### 3. Batalkan Pesanan

Membatalkan pesanan yang belum selesai.

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `PATCH /order/:order_id/cancel` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | CASHIER, ADMIN |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "order_id": "g7h8i9j0-k1l2-3456-mnop-890123456789",
    "order_number": "ORD-20260123-0002",
    "status": "CANCELLED",
    "cancelled_at": "2026-01-23T10:45:00.000Z"
  },
  "metaData": {
    "message": "Pesanan berhasil dibatalkan",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

### 4. Cetak Struk (Receipt)

Mendapatkan data struk untuk dicetak.

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /order/:order_id/receipt` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | CASHIER, ADMIN |

#### Query Parameters
| Parameter | Nilai | Deskripsi |
|-----------|-------|-----------|
| `format` | `text` (default), `escpos`, `pdf`, `image` | Format output struk |

#### Response Sukses - Format `text` (200 OK)
```json
{
  "response": {
    "store_info": {
      "name": "ISCP Coffee & Restaurant",
      "address": "Jl. Contoh No. 123, Yogyakarta",
      "phone": "0274-123456"
    },
    "order_info": {
      "order_number": "ORD-20260123-0001",
      "date": "2026-01-23T10:30:00.000Z",
      "cashier_name": "Budi Kasir",
      "customer_name": "Pak Ahmad"
    },
    "items": [
      {
        "name": "Nasi Goreng Spesial",
        "qty": 2,
        "price": 25000,
        "subtotal": 50000
      },
      {
        "name": "Es Teh Manis",
        "qty": 3,
        "price": 5000,
        "subtotal": 15000
      }
    ],
    "totals": {
      "subtotal": 65000,
      "discount": 0,
      "total": 65000,
      "paid": 100000,
      "change": 35000
    },
    "payment_method": "CASH",
    "footer": "Terima kasih atas kunjungan Anda!"
  },
  "metaData": {
    "message": "Receipt berhasil diambil",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

### 5. Lihat Riwayat Pesanan

Mengambil daftar semua pesanan.

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /order` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | CASHIER, ADMIN |

#### Query Parameters
| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `batch` | number | Halaman (default: 1) |
| `size` | number | Jumlah per halaman (max: 100) |
| `search` | string | Cari nomor order / nama pelanggan |
| `status` | enum | `PENDING`, `COMPLETED`, `CANCELLED` |
| `payment_type` | enum | `CASH`, `QRIS` |
| `shift_id` | string (UUID) | Filter berdasarkan shift |
| `start_date` | string | Tanggal awal (YYYY-MM-DD) |
| `end_date` | string | Tanggal akhir (YYYY-MM-DD) |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "records": [
      {
        "order_id": "g7h8i9j0-k1l2-3456-mnop-890123456789",
        "order_number": "ORD-20260123-0001",
        "customer_name": "Pak Ahmad",
        "total_amount": 65000,
        "payment_type": "CASH",
        "status": "COMPLETED",
        "item_count": 5,
        "created_at": "2026-01-23T10:30:00.000Z"
      }
    ],
    "total": 45,
    "batch": 1,
    "size": 10,
    "total_pages": 5
  },
  "metaData": {
    "message": "Data pesanan berhasil diambil",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

### 6. Detail Pesanan

Melihat detail lengkap suatu pesanan.

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /order/:order_id` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | CASHIER, ADMIN |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "order_id": "g7h8i9j0-k1l2-3456-mnop-890123456789",
    "order_number": "ORD-20260123-0001",
    "customer_name": "Pak Ahmad",
    "customer_phone": "081234567890",
    "payment_type": "CASH",
    "status": "COMPLETED",
    "subtotal": 65000,
    "discount": 0,
    "total_amount": 65000,
    "paid_amount": 100000,
    "change_amount": 35000,
    "items": [
      {
        "order_item_id": "...",
        "menu_id": "d4e5f6a7-b8c9-0123-defg-456789012345",
        "menu_name": "Nasi Goreng Spesial",
        "qty": 2,
        "price": 25000,
        "subtotal": 50000
      },
      {
        "order_item_id": "...",
        "menu_id": "f6a7b8c9-d0e1-2345-ghij-678901234567",
        "menu_name": "Es Teh Manis",
        "qty": 3,
        "price": 5000,
        "subtotal": 15000
      }
    ],
    "shift": {
      "shift_id": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
      "cashier_name": "Budi Kasir"
    },
    "created_at": "2026-01-23T10:30:00.000Z",
    "updated_at": "2026-01-23T10:30:00.000Z"
  },
  "metaData": {
    "message": "Detail pesanan berhasil diambil",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

## 💰 Operasional Kas (Cash Movement)

Mencatat pemasukan/pengeluaran kas di luar transaksi penjualan.

> **Contoh penggunaan**: Beli es batu darurat, setor uang ke bank, terima uang kembalian dari owner.

### 1. Catat Mutasi Kas

Membuat catatan kas masuk atau keluar.

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `POST /cash-movement` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | CASHIER, ADMIN |

#### Request Body
```json
{
  "type": "OUT",
  "amount": 15000,
  "note": "Beli es batu darurat"
}
```

| Field | Tipe | Validasi | Deskripsi |
|-------|------|----------|-----------|
| `type` | enum | `IN` / `OUT` | Jenis mutasi (masuk/keluar) |
| `amount` | number | > 0 | Jumlah uang |
| `note` | string | max: 255 (opsional) | Keterangan mutasi |

#### Response Sukses (201 Created)
```json
{
  "response": {
    "cash_movement_id": "h8i9j0k1-l2m3-4567-nopq-012345678901",
    "type": "OUT",
    "amount": 15000,
    "note": "Beli es batu darurat",
    "shift_id": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    "user_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "created_at": "2026-01-23T11:00:00.000Z"
  },
  "metaData": {
    "message": "Mutasi kas berhasil dicatat",
    "code": 201,
    "response_code": "0000"
  }
}
```

---

### 2. Lihat Daftar Mutasi Kas

Mengambil daftar mutasi kas.

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /cash-movement` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | CASHIER, ADMIN |

#### Query Parameters
| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `batch` | number | Halaman (default: 1) |
| `size` | number | Jumlah per halaman (max: 100) |
| `type` | enum | `IN` / `OUT` |
| `shift_id` | string (UUID) | Filter berdasarkan shift |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "records": [
      {
        "cash_movement_id": "h8i9j0k1-l2m3-4567-nopq-012345678901",
        "type": "OUT",
        "amount": 15000,
        "note": "Beli es batu darurat",
        "created_at": "2026-01-23T11:00:00.000Z"
      },
      {
        "cash_movement_id": "i9j0k1l2-m3n4-5678-opqr-123456789012",
        "type": "IN",
        "amount": 50000,
        "note": "Tambahan modal dari owner",
        "created_at": "2026-01-23T09:00:00.000Z"
      }
    ],
    "total": 5,
    "batch": 1,
    "size": 10,
    "total_pages": 1
  },
  "metaData": {
    "message": "Data mutasi kas berhasil diambil",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

### 3. Detail Mutasi Kas

Melihat detail mutasi kas tertentu.

| Atribut | Nilai |
|---------|-------|
| **Endpoint** | `GET /cash-movement/:cash_movement_id` |
| **Auth Required** | ✅ Bearer Token |
| **Role** | CASHIER, ADMIN |

#### Response Sukses (200 OK)
```json
{
  "response": {
    "cash_movement_id": "h8i9j0k1-l2m3-4567-nopq-012345678901",
    "type": "OUT",
    "amount": 15000,
    "note": "Beli es batu darurat",
    "shift_id": "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    "shift": {
      "start_time": "2026-01-23T08:00:00.000Z"
    },
    "user_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "user": {
      "name": "Budi Kasir"
    },
    "created_at": "2026-01-23T11:00:00.000Z"
  },
  "metaData": {
    "message": "Detail mutasi kas berhasil diambil",
    "code": 200,
    "response_code": "0000"
  }
}
```

---

## 📊 Ringkasan Fitur Role Kasir

| No | Modul | Fitur | Endpoint | Method |
|----|-------|-------|----------|--------|
| 1 | Auth | Login | `/auth/login` | POST |
| 2 | Auth | Logout | `/auth/logout` | POST |
| 3 | Shift | Buka Kas | `/shift/start` | POST |
| 4 | Shift | Tutup Kas | `/shift/end` | POST |
| 5 | Shift | Cek Shift Aktif | `/shift/active` | GET |
| 6 | Shift | Lihat Shift Saya | `/shift/my` | GET |
| 7 | Shift | Detail Shift | `/shift/:shift_id` | GET |
| 8 | Shift | Ringkasan Shift | `/shift/:shift_id/summary` | GET |
| 9 | Menu | Lihat Daftar Menu | `/menu` | GET |
| 10 | Menu | Detail Menu | `/menu/:menu_id` | GET |
| 11 | Order | Buat Pesanan | `/order` | POST |
| 12 | Order | Konfirmasi Pembayaran | `/order/:order_id/confirm` | PATCH |
| 13 | Order | Batalkan Pesanan | `/order/:order_id/cancel` | PATCH |
| 14 | Order | Cetak Struk | `/order/:order_id/receipt` | GET |
| 15 | Order | Lihat Riwayat Pesanan | `/order` | GET |
| 16 | Order | Detail Pesanan | `/order/:order_id` | GET |
| 17 | Cash Movement | Catat Mutasi Kas | `/cash-movement` | POST |
| 18 | Cash Movement | Lihat Daftar Mutasi | `/cash-movement` | GET |
| 19 | Cash Movement | Detail Mutasi | `/cash-movement/:cash_movement_id` | GET |

---

## ⚠️ Error Responses

Berikut format error standar yang mungkin ditemui:

### 401 Unauthorized
```json
{
  "response": null,
  "metaData": {
    "message": "Token tidak valid atau sudah kadaluarsa",
    "code": 401,
    "response_code": "0001"
  }
}
```

### 403 Forbidden
```json
{
  "response": null,
  "metaData": {
    "message": "Anda tidak memiliki akses ke resource ini",
    "code": 403,
    "response_code": "0003"
  }
}
```

### 404 Not Found
```json
{
  "response": null,
  "metaData": {
    "message": "Data tidak ditemukan",
    "code": 404,
    "response_code": "0004"
  }
}
```

### 422 Validation Error
```json
{
  "response": null,
  "metaData": {
    "message": "Validasi gagal",
    "code": 422,
    "response_code": "0022",
    "errors": [
      {
        "field": "start_cash",
        "message": "Modal awal tidak boleh negatif"
      }
    ]
  }
}
```

---

> 📝 **Catatan**: Dokumentasi ini dibuat pada 23 Januari 2026 untuk Sistem Kasir ISCP v1.0
