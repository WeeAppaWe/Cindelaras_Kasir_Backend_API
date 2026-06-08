# Dokumentasi API Manajemen Shift (Buka & Tutup Kasir)

Dokumentasi ini menjelaskan rute API untuk mengelola aktivitas **Shift Kasir**. Fitur ini mengatur sesi *login* operasional pegawai mulai dari saat membuka kasir (mencatat modal awal uang laci) hingga menutup kasir (menghitung uang akhir, membandingkan dengan penjualan sistem).

Base URL Utama: `/api/shift`

---

## Tabel dan Field yang Dipakai

Modul shift memakai tabel utama `shifts` untuk menyimpan sesi buka/tutup kasir. Untuk menampilkan nama kasir dan menghitung ringkasan penjualan shift, modul ini juga membaca tabel `users` dan `orders`.

### Ringkasan Penggunaan Tabel

| Proses | Tabel yang Dipakai | Keterangan |
| :--- | :--- | :--- |
| Cek shift aktif | `shifts`, `users` | Mencari shift user login yang belum memiliki `end_time`. |
| Start shift | `shifts`, `users` | Validasi belum ada shift aktif, lalu membuat data shift baru. |
| End shift | `shifts`, `orders`, `users` | Validasi shift aktif, cek pesanan `PENDING`, hitung penjualan, lalu update data tutup shift. |
| My shifts | `shifts`, `users`, `orders` | Mengambil riwayat shift user login dengan pagination dan jumlah order. |
| Global list shift | `shifts`, `users`, `orders` | Admin mengambil seluruh riwayat shift dengan filter user, tanggal, dan status aktif. |
| Detail shift | `shifts`, `users`, `orders` | Mengambil detail shift beserta data kasir dan jumlah order. |
| Summary shift | `shifts`, `users`, `orders` | Menghitung total order, status order, penjualan cash, penjualan QRIS, expected cash, dan selisih kas. |

### 1. Tabel `shifts`

Tabel utama yang menyimpan sesi kerja kasir dari buka kasir sampai tutup kasir.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `shift_id` | UUID | Tidak | Primary key shift. |
| `user_id` | UUID | Tidak | Foreign key ke tabel `users`, yaitu user/kasir pemilik shift. |
| `start_cash` | decimal(15,2) | Tidak | Modal awal kas saat membuka shift. |
| `end_cash` | decimal(15,2) | Ya | Uang fisik akhir di laci saat menutup shift. |
| `sold_total` | decimal(15,2) | Ya | Total penjualan dari order `COMPLETED` pada shift tersebut. |
| `start_time` | timestamp | Tidak | Waktu shift dibuka. |
| `end_time` | timestamp | Ya | Waktu shift ditutup. Jika `null`, shift masih aktif. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Endpoint shift hanya memakai data dengan `deleted_at = null`. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Cek shift aktif | `shift_id`, `user_id`, `start_cash`, `end_cash`, `sold_total`, `start_time`, `end_time`, `created_at`, `updated_at`, `deleted_at` |
| Start shift | `user_id`, `start_cash`, `start_time`, `end_time`, `deleted_at` |
| End shift | `shift_id`, `user_id`, `start_cash`, `end_cash`, `sold_total`, `start_time`, `end_time` |
| List/detail shift | `shift_id`, `user_id`, `start_cash`, `end_cash`, `sold_total`, `start_time`, `end_time`, `created_at`, `updated_at` |
| Summary shift | `shift_id`, `start_cash`, `end_cash`, `start_time`, `end_time` |

### 2. Tabel `users`

Tabel user dipakai untuk identitas kasir yang membuka shift.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `user_id` | UUID | Tidak | Primary key user. |
| `username` | varchar(50) | Tidak | Username user. |
| `password` | varchar(255) | Tidak | Password hash. Tidak dikembalikan pada response shift. |
| `name` | varchar(100) | Tidak | Nama kasir yang ditampilkan pada response shift dan summary. |
| `phone_number` | varchar(20) | Ya | Nomor WhatsApp user. |
| `role_id` | UUID | Tidak | Foreign key role user. |
| `user_status_id` | UUID | Tidak | Foreign key status user. |
| `last_login` | time | Ya | Waktu login terakhir. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Start shift | `user_id` dari token auth dipakai sebagai pemilik shift. |
| Cek/list/detail shift | `user_id`, `name` |
| End shift dan summary | `user_id`, `name` untuk `user_name` pada summary. |
| Authorization | Role user dari token dipakai untuk membatasi akses `CASHIER`/`ADMIN` atau `ADMIN only`. |

### 3. Tabel `orders`

Tabel order dipakai untuk menghitung statistik dan total penjualan per shift.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `order_id` | UUID | Tidak | Primary key order. |
| `shift_id` | UUID | Tidak | Foreign key ke tabel `shifts`. |
| `user_id` | UUID | Tidak | Foreign key ke tabel `users`, yaitu kasir pembuat order. |
| `customer_name` | varchar(50) | Ya | Nama pelanggan. |
| `customer_phone` | varchar(20) | Ya | Nomor pelanggan. |
| `receipt` | varchar(50) | Ya | Nomor struk bisnis. |
| `total_amount` | decimal(15,2) | Tidak | Total nilai order. Dipakai untuk menghitung penjualan shift. |
| `paid_amount` | decimal(15,2) | Tidak | Nominal yang dibayarkan pelanggan. |
| `change_amount` | decimal(15,2) | Tidak | Nominal kembalian. |
| `payment_type` | varchar(20) | Tidak | Tipe pembayaran, misalnya `CASH` atau `QRIS`. |
| `status` | varchar(20) | Tidak | Status order: `PENDING`, `COMPLETED`, atau `CANCELLED`. |
| `created_at` | timestamp | Tidak | Waktu order dibuat. |
| `updated_at` | timestamp | Ya | Waktu order terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Summary hanya menghitung order dengan `deleted_at = null`. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| End shift | `shift_id`, `status`, `payment_type`, `total_amount`, `deleted_at` |
| Summary shift | `shift_id`, `status`, `payment_type`, `total_amount`, `deleted_at` |
| List/detail shift | Relasi `_count.orders` untuk jumlah order dalam shift. |

Perhitungan summary:

| Field Summary | Rumus / Sumber Data |
| :--- | :--- |
| `total_orders` | Jumlah semua order pada `shift_id`. |
| `completed_orders` | Jumlah order dengan `status = COMPLETED`. |
| `cancelled_orders` | Jumlah order dengan `status = CANCELLED`. |
| `pending_orders` | Jumlah order dengan `status = PENDING`. Dipakai untuk validasi tutup shift. |
| `cash_sales` | Total `total_amount` untuk order `COMPLETED` dengan `payment_type = CASH`. |
| `qris_sales` | Total `total_amount` untuk order `COMPLETED` dengan `payment_type = QRIS`. |
| `sold_total` | Total `total_amount` semua order `COMPLETED`. |
| `expected_cash` | `start_cash + cash_sales`. QRIS tidak dihitung sebagai kas fisik. |
| `difference` | `end_cash - expected_cash`. |

### 4. Tabel `cash_movements`

Tabel `cash_movements` memiliki relasi ke `shifts`, tetapi endpoint pada modul `shift` tidak membaca atau menulis tabel ini secara langsung. Tabel ini digunakan oleh modul penyesuaian kas.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `cash_movement_id` | UUID | Tidak | Primary key pergerakan kas. |
| `shift_id` | UUID | Tidak | Foreign key ke tabel `shifts`. |
| `type` | varchar(10) | Tidak | Tipe pergerakan kas. |
| `amount` | decimal(15,2) | Tidak | Nominal pergerakan kas. |
| `note` | varchar(255) | Ya | Catatan pergerakan kas. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

### Relasi Tabel

```text
shifts.user_id       -> users.user_id
orders.shift_id      -> shifts.shift_id
orders.user_id       -> users.user_id
cash_movements.shift_id -> shifts.shift_id
```

### Catatan Alur Data Penting

- Shift aktif ditentukan dari `shifts.end_time = null`.
- Satu user tidak boleh membuka shift baru jika masih ada shift aktif.
- Tutup shift ditolak jika masih ada order dengan `status = PENDING` pada shift tersebut.
- `sold_total` pada shift dihitung dari order `COMPLETED`.
- `expected_cash` hanya memakai `start_cash + cash_sales`, karena QRIS tidak masuk kas fisik.
- Field `notes` pada request `POST /api/shift/end` divalidasi oleh schema, tetapi saat ini tidak disimpan ke tabel `shifts` karena tabel `shifts` belum memiliki kolom catatan.

---

## BAGIAN A: Fungsionalitas Kasir Utama

Rute di bagian ini dapat diakses oleh *role* **CASHIER** maupun **ADMIN**.

### 1. Mengecek Status Shift Aktif
Digunakan saat kasir baru *login*. Jika mengembalikan data *null*, FE harus langsung me-*redirect* kasir ke halaman "Buka Kasir / Start Shift". Jika mengembalikan sesi aktif, kasir diizinkan masuk ke halaman *Point of Sale* (POS).

- **Endpoint:** `GET /active`
- **Akses:** Protected (CASHIER, ADMIN)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengecek shift aktif",
  "data": {
    "is_active": true,
    "shift": {
      "shift_id": "uuid-shift-1",
      "user_id": "uuid-user-1",
      "start_cash": 100000,
      "end_cash": null,
      "sold_total": null,
      "start_time": "2024-02-01T08:00:00Z",
      "end_time": null,
      "created_at": "2024-02-01T08:00:00Z",
      "updated_at": "2024-02-01T08:00:00Z",
      "user": {
        "user_id": "uuid-user-1",
        "name": "Kasir Siti"
      }
    }
  }
}
```

### 2. Membuka Kasir (Start Shift)
Aksi ketika kasir menginputkan modal awal (uang receh yang ada di dalam laci kasir saat itu) sebelum mulai berjualan.

- **Endpoint:** `POST /start`
- **Akses:** Protected (CASHIER, ADMIN)

**Request Body (JSON):**
| Field | Tipe | Validasi | Deskripsi |
| :--- | :--- | :--- | :--- |
| `start_cash` | Number | Wajib, >= 0 | Modal awal kas di laci |

**Contoh Request:**
```json
{
  "start_cash": 100000
}
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil membuka shift",
  "data": {
    "success": true,
    "message": "Shift berhasil dimulai",
    "shift": {
      "shift_id": "uuid-shift-1",
      "user_id": "uuid-user-1",
      "start_cash": 100000,
      "end_cash": null,
      "sold_total": null,
      "start_time": "2024-02-01T08:00:00Z",
      "end_time": null,
      "created_at": "2024-02-01T08:00:00Z",
      "updated_at": "2024-02-01T08:00:00Z",
      "user": {
        "user_id": "uuid-user-1",
        "name": "Kasir Siti"
      }
    }
  }
}
```

### 3. Menutup Kasir (End Shift)
Ketika jam kerja selesai, kasir menghitung total uang yang ada di dalam lacinya dan memasukkannya untuk divalidasi dengan riwayat transaksi sistem.

- **Endpoint:** `POST /end`
- **Akses:** Protected (CASHIER, ADMIN)

**Request Body (JSON):**
| Field | Tipe | Validasi | Deskripsi |
| :--- | :--- | :--- | :--- |
| `end_cash` | Number | Wajib, >= 0 | Total uang fisik di laci saat mau pulang |
| `notes` | String | Opsional, max 500 char | Catatan jika uang fisik kurang/lebih |

**Contoh Request:**
```json
{
  "end_cash": 550000,
  "notes": "Laci pas, tidak ada selisih"
}
```

**Response Berhasil (200 OK):**
Sistem akan langsung menghitungkan *Summary* pada *response* ini (menghitung jumlah *order* tunai vs QRIS, dan mencari apakah laci kasir selisih uang atau tidak pada kolom `difference`).
```json
{
  "code": 200,
  "message": "Shift berhasil ditutup",
  "data": {
    "success": true,
    "message": "Shift berhasil ditutup",
    "summary": {
      "shift_id": "uuid-shift-1",
      "user_name": "Kasir Siti",
      "start_time": "2024-02-01T08:00:00Z",
      "end_time": "2024-02-01T15:00:00Z",
      "start_cash": 100000,
      "end_cash": 550000,
      "sold_total": 450000,
      "expected_cash": 550000,
      "difference": 0,
      "total_orders": 25,
      "completed_orders": 24,
      "cancelled_orders": 1,
      "cash_sales": 450000,
      "qris_sales": 200000
    }
  }
}
```

---

## BAGIAN B: Pelaporan & Riwayat (Admin & Profil Kasir)

### 1. Riwayat Shift Ku Sendiri (My Shifts)
Untuk dirender di halaman Profil Kasir jika mereka ingin melihat riwayat jam kerjanya sendiri.
- **Endpoint:** `GET /my`
- **Akses:** Protected (CASHIER, ADMIN)
- **Query Params:** `batch`, `size`
- **Response:** (Menampilkan list Pagination berisikan ringkasan shift)

### 2. Riwayat Seluruh Shift Pegawai (Global List)
Untuk dirender di halaman Laporan Admin saat memonitor siapa saja yang jaga kasir hari ini.
- **Endpoint:** `GET /`
- **Akses:** Protected (ADMIN Only)
- **Query Params:** `batch`, `size`, `user_id`, `start_date`, `end_date`, `is_active`

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil riwayat seluruh shift",
  "data": {
    "page": {
      "total_record_count": 30,
      "batch_number": 1,
      "batch_size": 10,
      "max_batch_size": 100
    },
    "records": [
      {
        "shift_id": "uuid-shift-1",
        "user_id": "uuid-user-1",
        "start_cash": 100000,
        "end_cash": 550000,
        "sold_total": 450000,
        "start_time": "2024-02-01T08:00:00Z",
        "end_time": "2024-02-01T15:00:00Z",
        "created_at": "2024-02-01T08:00:00Z",
        "updated_at": "2024-02-01T15:00:00Z",
        "user": {
          "user_id": "uuid-user-1",
          "name": "Kasir Siti"
        },
        "_count": {
          "orders": 25
        }
      }
    ]
  }
}
```

### 3. Melihat Detail Satu Shift Sederhana
- **Endpoint:** `GET /:shift_id`
- **Akses:** Protected (CASHIER, ADMIN)

### 4. Melihat Laporan Ringkasan Performa Shift Tersebut (Summary)
Ini adalah API yang dipanggil saat bos/admin ingin mem-print setruk rekapan (*Shift Report* Z-Reading) untuk sesi kasir tertentu.

- **Endpoint:** `GET /:shift_id/summary`
- **Akses:** Protected (CASHIER, ADMIN)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil ringkasan shift",
  "data": {
    "shift_id": "uuid-shift-1",
    "user_name": "Kasir Siti",
    "start_time": "2024-02-01T08:00:00Z",
    "end_time": "2024-02-01T15:00:00Z",
    "start_cash": 100000,
    "end_cash": 550000,
    "sold_total": 450000,
    "expected_cash": 550000,
    "difference": 0,
    "total_orders": 25,
    "completed_orders": 24,
    "cancelled_orders": 1,
    "cash_sales": 450000,
    "qris_sales": 200000
  }
}
```
