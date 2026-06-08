# Dokumentasi API Penyesuaian Kas (Cash Movement)

Dokumentasi ini menjelaskan rute API (endpoints) yang digunakan oleh Frontend untuk halaman **Penyesuaian Kas**. Fitur ini digunakan untuk mencatat pergerakan uang tunai di laci kasir (di luar transaksi pesanan normal), seperti penambahan uang modal kembalian (Cash In) atau pengambilan uang untuk operasional/setoran (Cash Out).

Base URL: `/api`

---

## Tabel dan Field yang Dipakai

Modul penyesuaian kas memakai tabel utama `cash_movements`. Tabel `shifts` dipakai untuk menentukan shift aktif kasir, menghubungkan mutasi kas ke sesi shift, dan menampilkan info shift pada response. Tabel `users` dipakai sebagai pemilik shift melalui `shifts.user_id`; user aktif diperoleh dari token autentikasi.

### Ringkasan Penggunaan Tabel

| Proses | Tabel yang Dipakai | Keterangan |
| :--- | :--- | :--- |
| Menampilkan daftar penyesuaian kas | `cash_movements`, `shifts` | Mengambil mutasi kas aktif berdasarkan `shift_id`, filter `type`, pagination, summary total masuk/keluar, dan info shift. |
| Menampilkan detail penyesuaian kas | `cash_movements`, `shifts` | Mengambil satu mutasi kas berdasarkan `cash_movement_id` beserta info shift. |
| Membuat penyesuaian kas | `cash_movements`, `shifts`, `users` | Mencari shift aktif milik user login, lalu mencatat mutasi kas pada shift tersebut. |
| Summary kas | `cash_movements` | Mengelompokkan data berdasarkan `type` untuk menghitung `total_in`, `total_out`, dan `net_amount`. |

### 1. Tabel `cash_movements`

Tabel utama untuk riwayat penyesuaian kas.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `cash_movement_id` | UUID | Tidak | Primary key mutasi kas. |
| `shift_id` | UUID | Tidak | Foreign key ke tabel `shifts`. |
| `type` | varchar(10) | Tidak | Jenis mutasi kas. Nilai yang didukung endpoint: `IN` atau `OUT`. |
| `amount` | decimal(15,2) | Tidak | Nominal uang yang masuk/keluar. |
| `note` | varchar(255) | Ya | Catatan penyesuaian kas. |
| `created_at` | timestamp | Tidak | Waktu mutasi kas dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Endpoint hanya memakai data dengan `deleted_at = null`. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List | `cash_movement_id`, `shift_id`, `type`, `amount`, `note`, `created_at`, `updated_at`, `deleted_at` |
| Filter | `shift_id`, `type` |
| Detail | `cash_movement_id`, `shift_id`, `type`, `amount`, `note`, `created_at`, `updated_at`, `deleted_at` |
| Create | `shift_id`, `type`, `amount`, `note` |
| Summary | `shift_id`, `type`, `amount`, `deleted_at` |

### 2. Tabel `shifts`

Tabel sesi shift kasir. Modul penyesuaian kas memakai shift aktif sebagai konteks pencatatan.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `shift_id` | UUID | Tidak | Primary key shift. |
| `user_id` | UUID | Tidak | Foreign key ke tabel `users`. |
| `start_cash` | decimal(15,2) | Tidak | Modal awal shift. |
| `end_cash` | decimal(15,2) | Ya | Kas akhir saat shift ditutup. |
| `sold_total` | decimal(15,2) | Ya | Total penjualan selama shift. |
| `start_time` | timestamp | Tidak | Waktu shift dibuka. |
| `end_time` | timestamp | Ya | Waktu shift ditutup. `null` berarti shift masih aktif. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada modul penyesuaian kas:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Cari shift aktif | `shift_id`, `user_id`, `start_cash`, `start_time`, `end_time`, `deleted_at` |
| List/detail response | `shift_id`, `start_time`, `end_time` |
| Filter list | `shift_id` |

### 3. Tabel `users`

Tabel pengguna dipakai sebagai pemilik shift. Pada modul ini, `user_id` berasal dari token autentikasi dan dipakai untuk mencari shift aktif.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `user_id` | UUID | Tidak | Primary key pengguna. Dipakai sebagai referensi `shifts.user_id`. |
| `username` | varchar(50) | Tidak | Username login. |
| `name` | varchar(100) | Tidak | Nama pengguna/kasir. |
| `role_id` | UUID | Tidak | Foreign key role pengguna. |
| `user_status_id` | UUID | Tidak | Foreign key status pengguna. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada modul penyesuaian kas:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Cari shift aktif | `user_id` dari user login, lalu dicocokkan ke `shifts.user_id`. |
| Otorisasi akses | `role_id`, `user_status_id`, `deleted_at` melalui middleware autentikasi/otorisasi. |

### Relasi Tabel

```text
cash_movements.shift_id -> shifts.shift_id
shifts.user_id -> users.user_id
```

### Catatan Alur Data

- Saat `GET /cash-movement` tidak mengirim `shift_id`, backend otomatis memakai shift aktif milik user login.
- Saat `POST /cash-movement`, kasir/admin harus memiliki shift aktif (`shifts.end_time = null`).
- `summary.total_in` dihitung dari mutasi `type = IN`, sedangkan `summary.total_out` dari `type = OUT`.
- `summary.net_amount` dihitung dari `total_in - total_out`.

---

## 1. Menampilkan Daftar Penyesuaian Kas

Endpoint ini digunakan untuk menampilkan tabel riwayat penyesuaian kas beserta ringkasan total uang masuk dan uang keluar.

- **Endpoint:** `GET /cash-movement`
- **Akses:** Protected (Kasir & Admin)

### Query Parameters

Semua parameter bersifat opsional:

| Parameter | Tipe | Format / Pilihan | Deskripsi |
| :--- | :--- | :--- | :--- |
| `batch` | Number | Angka bulat | Halaman ke berapa (default: `1`) |
| `size` | Number | Angka bulat | Jumlah per halaman (default: `10`, maks `100`) |
| `type` | String | `IN`, `OUT` | Filter jenis pergerakan kas |
| `shift_id`| UUID | Format UUID | Filter pergerakan kas untuk *shift* tertentu |

**Contoh Penggunaan URL:**
`GET /api/cash-movement?batch=1&size=20&type=IN`

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Berhasil mengambil data pergerakan kas",
  "data": {
    "page": {
      "total_record_count": 15,
      "batch_number": 1,
      "batch_size": 20,
      "max_batch_size": 100
    },
    "summary": {
      "total_in": 500000,
      "total_out": 150000,
      "net_amount": 350000
    },
    "records": [
      {
        "cash_movement_id": "uuid-cash-movement-1",
        "shift_id": "uuid-shift-id",
        "type": "IN",
        "amount": 500000,
        "note": "Modal awal kembalian tambahan",
        "created_at": "2024-01-01T08:30:00Z",
        "updated_at": null,
        "shift": {
          "shift_id": "uuid-shift-id",
          "start_time": "2024-01-01T08:00:00Z",
          "end_time": null
        }
      }
    ]
  }
}
```

---

## 2. Membuat Penyesuaian Kas Baru

Endpoint ini digunakan ketika kasir mengisi form untuk menambah (Cash In) atau mengambil (Cash Out) uang dari laci kasir secara manual.

- **Endpoint:** `POST /cash-movement`
- **Akses:** Protected (Kasir & Admin)

### Request Body (JSON)

| Field | Tipe | Validasi | Deskripsi |
| :--- | :--- | :--- | :--- |
| `type` | String | Wajib, `IN` atau `OUT` | Tipe mutasi |
| `amount` | Number | Wajib, `> 0` | Jumlah nominal uang |
| `note` | String | Opsional, max 255 char | Keterangan / catatan keperluan mutasi |

**Contoh Request:**
```json
{
  "type": "OUT",
  "amount": 150000,
  "note": "Beli bahan baku darurat (gula)"
}
```

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Pergerakan kas berhasil dicatat",
  "data": {
    "success": true,
    "message": "Pergerakan kas berhasil dicatat",
    "cash_movement": {
      "cash_movement_id": "uuid-cash-movement-2",
      "shift_id": "uuid-shift-id",
      "type": "OUT",
      "amount": 150000,
      "note": "Beli bahan baku darurat (gula)",
      "created_at": "2024-01-01T12:00:00Z",
      "shift": {
        "shift_id": "uuid-shift-id",
        "start_time": "2024-01-01T08:00:00Z",
        "end_time": null
      }
    }
  }
}
```

---

## 3. Melihat Detail Penyesuaian Kas

Endpoint ini digunakan jika UI menyediakan tombol/link untuk melihat rincian suatu entri penyesuaian kas tertentu.

- **Endpoint:** `GET /cash-movement/:cash_movement_id`
- **Akses:** Protected (Kasir & Admin)

### Response Berhasil (200 OK)
```json
{
  "code": 200,
  "message": "Berhasil mengambil detail pergerakan kas",
  "data": {
    "cash_movement_id": "uuid-cash-movement-2",
    "shift_id": "uuid-shift-id",
    "type": "OUT",
    "amount": 150000,
    "note": "Beli bahan baku darurat (gula)",
    "created_at": "2024-01-01T12:00:00Z",
    "updated_at": null,
    "shift": {
      "shift_id": "uuid-shift-id",
      "start_time": "2024-01-01T08:00:00Z",
      "end_time": null
    }
  }
}
```
