# Dokumentasi API Manajemen Pengguna (User Management)

Dokumentasi ini menjelaskan rute API (endpoints) yang digunakan oleh Frontend untuk halaman **Manajemen Pengguna (User)**. Fitur ini memungkinkan Admin untuk mendaftarkan akun kasir, menonaktifkan kasir, mereset *password*, dan memantau login terakhir (*last login*).

**Catatan Penting:** Semua rute pada modul ini memerlukan hak akses dengan *role* **ADMIN**.

Base URL Utama: `/api/user`

---

## Tabel dan Field yang Dipakai

Modul pengguna memakai tabel utama `users`. Tabel `roles` dan `user_statuses` dipakai sebagai relasi, validasi input, filter, dan data dropdown pada form pengguna.

### Ringkasan Penggunaan Tabel

| Proses | Tabel yang Dipakai | Keterangan |
| :--- | :--- | :--- |
| Dropdown role | `roles` | Mengambil daftar role aktif untuk pilihan hak akses pengguna. |
| Dropdown status pengguna | `user_statuses` | Mengambil daftar status aktif untuk pilihan status akun. |
| Menampilkan daftar pengguna | `users`, `roles`, `user_statuses` | Mengambil user aktif dengan pagination, pencarian, filter role/status, dan relasi role serta status. |
| Detail pengguna | `users`, `roles`, `user_statuses` | Mengambil satu user berdasarkan `user_id` beserta data role dan status. |
| Membuat pengguna | `users`, `roles`, `user_statuses` | Validasi username/nomor WhatsApp duplikat, validasi role/status, hash password, lalu membuat user. |
| Mengubah pengguna | `users`, `roles`, `user_statuses` | Validasi user ada, validasi duplikat username/nomor, validasi role/status jika dikirim, dan hash password baru jika ada. |
| Menghapus pengguna | `users` | Soft delete user dengan mengisi `deleted_at`. |

### 1. Tabel `users`

Tabel utama untuk akun pengguna sistem.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `user_id` | UUID | Tidak | Primary key pengguna. |
| `username` | varchar(50) | Tidak | Username login. Harus unik untuk user aktif. |
| `password` | varchar(255) | Tidak | Password yang sudah di-hash. Tidak pernah dikembalikan pada response API pengguna. |
| `name` | varchar(100) | Tidak | Nama pengguna/kasir/admin. |
| `phone_number` | varchar(20) | Ya | Nomor WhatsApp/telepon. Diformat backend dan dicek duplikat jika dikirim. |
| `role_id` | UUID | Tidak | Foreign key ke tabel `roles`. |
| `user_status_id` | UUID | Tidak | Foreign key ke tabel `user_statuses`. |
| `last_login` | time | Ya | Waktu login terakhir. Ditampilkan di list/detail pengguna. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Endpoint pengguna hanya memakai data dengan `deleted_at = null`. |

Field yang dipakai per proses:

| Proses | Field yang Dipakai |
| :--- | :--- |
| List | `user_id`, `username`, `name`, `phone_number`, `last_login`, `created_at`, `updated_at`, `role_id`, `user_status_id`, `deleted_at` |
| Search | `username`, `name` |
| Filter | `role_id`, `user_status_id` |
| Detail | `user_id`, `username`, `name`, `phone_number`, `last_login`, `created_at`, `updated_at`, `role_id`, `user_status_id`, `deleted_at` |
| Create | `username`, `password`, `name`, `phone_number`, `role_id`, `user_status_id` |
| Update | `user_id`, `username`, `password`, `name`, `phone_number`, `role_id`, `user_status_id` |
| Delete | `user_id`, `deleted_at` |

### 2. Tabel `roles`

Tabel master hak akses pengguna.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `role_id` | UUID | Tidak | Primary key role. |
| `name` | varchar(50) | Tidak | Nama role, misalnya `ADMIN` atau `CASHIER`. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Dropdown dan validasi hanya memakai role aktif. |

Field yang dipakai pada modul pengguna:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Dropdown role | `role_id`, `name`, `deleted_at` |
| List/detail pengguna | `role_id`, `name` melalui relasi `role`. |
| Create/update | `role_id`, `deleted_at` untuk validasi role masih aktif. |

### 3. Tabel `user_statuses`

Tabel master status akun pengguna.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `user_status_id` | UUID | Tidak | Primary key status pengguna. |
| `name` | varchar(50) | Tidak | Nama status, misalnya `ACTIVE`, `INACTIVE`, atau `DELETED`. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Dropdown dan validasi hanya memakai status aktif. |

Field yang dipakai pada modul pengguna:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Dropdown status | `user_status_id`, `name`, `deleted_at` |
| List/detail pengguna | `user_status_id`, `name` melalui relasi `user_status`. |
| Create | `user_status_id`, `name`, `deleted_at`; jika tidak dikirim, backend mencari status `ACTIVE`. |
| Update | `user_status_id`, `deleted_at` untuk validasi status masih aktif. |

### Relasi Tabel

```text
users.role_id -> roles.role_id
users.user_status_id -> user_statuses.user_status_id
```

### Catatan Alur Data

- Password selalu disimpan dalam bentuk hash dan tidak dikembalikan di response.
- Username dan nomor WhatsApp dicek agar tidak dipakai user aktif lain.
- Jika `user_status_id` tidak dikirim saat create, backend memakai status `ACTIVE`.
- Penghapusan pengguna menggunakan soft delete melalui field `users.deleted_at`.

---

## BAGIAN A: Referensi *Dropdown* Form

Dua endpoint berikut sangat dianjurkan untuk dipanggil saat *rendering* awal modal "Tambah Pengguna Baru" atau "Edit Pengguna", guna memberikan opsi pilihan untuk hak akses dan status aktivasi.

### 1. Mengambil Daftar Role
- **Endpoint:** `GET /roles`
- **Akses:** Protected (ADMIN)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil data role",
  "data": [
    {
      "role_id": "uuid-role-admin",
      "name": "ADMIN"
    },
    {
      "role_id": "uuid-role-cashier",
      "name": "CASHIER"
    }
  ]
}
```

### 2. Mengambil Daftar Status Pengguna
- **Endpoint:** `GET /statuses`
- **Akses:** Protected (ADMIN)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil data status pengguna",
  "data": [
    {
      "user_status_id": "uuid-status-active",
      "name": "ACTIVE"
    },
    {
      "user_status_id": "uuid-status-inactive",
      "name": "INACTIVE"
    }
  ]
}
```

---

## BAGIAN B: CRUD Data Pengguna

### 1. Menampilkan Seluruh Pengguna
Endpoint ini digunakan untuk *rendering* tabel manajemen pengguna dengan dukungan *pagination* serta fitur *search* dan filter *dropdown*.

- **Endpoint:** `GET /`
- **Akses:** Protected (ADMIN)

**Query Parameters (Opsional):**
| Parameter | Tipe | Deskripsi |
| :--- | :--- | :--- |
| `batch` | Number | Halaman ke berapa (default: `1`) |
| `size` | Number | Jumlah per halaman (default: `10`) |
| `search` | String | Pencarian berdasarkan nama / *username* |
| `role_id` | UUID | Filter berdasarkan role |
| `user_status_id`| UUID | Filter berdasarkan status (Aktif/Tidak) |

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil daftar pengguna",
  "data": {
    "page": {
      "total_record_count": 2,
      "batch_number": 1,
      "batch_size": 10,
      "max_batch_size": 100
    },
    "records": [
      {
        "user_id": "uuid-user-1",
        "username": "admin_budi",
        "name": "Budi Santoso",
        "phone_number": "081234567890",
        "last_login": "2024-02-01T08:30:00Z",
        "created_at": "2024-01-01T10:00:00Z",
        "updated_at": null,
        "role": {
          "role_id": "uuid-role-admin",
          "name": "ADMIN"
        },
        "user_status": {
          "user_status_id": "uuid-status-active",
          "name": "ACTIVE"
        }
      }
    ]
  }
}
```

---

### 2. Mendaftarkan Pengguna Baru

Pembuatan pengguna/kasir baru. *Password* otomatis akan di-*hash* (*bcrypt*) di sisi *backend*.

- **Endpoint:** `POST /`
- **Akses:** Protected (ADMIN)

**Request Body (JSON):**
| Field | Tipe | Validasi | Deskripsi |
| :--- | :--- | :--- | :--- |
| `username` | String | Wajib, min 3, max 50 char | Hanya boleh huruf, angka, underscore |
| `password` | String | Wajib, min 6 char | Sandi *login* |
| `name` | String | Wajib, min 2, max 100 char | Nama lengkap / Nama Panggilan |
| `role_id` | String | Wajib, format UUID | Didapat dari `GET /roles` |
| `user_status_id`| String | Opsional, format UUID | Default sistem jika dikosongkan adalah `ACTIVE` |
| `phone_number` | String | Opsional, 9-20 char | Nomor handphone/WA |

**Contoh Request:**
```json
{
  "username": "kasir_siti",
  "password": "Password123!",
  "name": "Siti Nurhaliza",
  "role_id": "uuid-role-cashier",
  "phone_number": "081122334455"
}
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Pengguna berhasil ditambahkan",
  "data": {
    "user_id": "uuid-user-2",
    "username": "kasir_siti",
    "name": "Siti Nurhaliza",
    "phone_number": "081122334455",
    "created_at": "2024-02-01T10:00:00Z",
    "role": {
      "role_id": "uuid-role-cashier",
      "name": "CASHIER"
    },
    "user_status": {
      "user_status_id": "uuid-status-active",
      "name": "ACTIVE"
    }
  }
}
```

---

### 3. Melihat Detail Pengguna Tunggal

- **Endpoint:** `GET /:user_id`
- **Akses:** Protected (ADMIN)

**Response Berhasil (200 OK):**
*(Strukturnya sama persis dengan salah satu objek di dalam array `records` pada saat GET All)*

---

### 4. Mengubah Profil / Reset Password Pengguna

Digunakan apabila pengguna lupa kata sandi (karena reset dikelola oleh admin), atau apabila ada perubahan status kasir (misalnya cuti panjang / *resign* sehingga di-set *INACTIVE* agar tidak bisa *login*).

- **Endpoint:** `PATCH /:user_id`
- **Akses:** Protected (ADMIN)

**Request Body (JSON):**
*(Semua field bersifat opsional, hanya kirim yang perlu diubah)*
```json
{
  "password": "PasswordBaru456!",
  "user_status_id": "uuid-status-inactive"
}
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Data pengguna berhasil diperbarui",
  "data": {
    "user_id": "uuid-user-2",
    "username": "kasir_siti",
    "name": "Siti Nurhaliza",
    "phone_number": "081122334455",
    "updated_at": "2024-02-05T09:00:00Z",
    "role": {
      "role_id": "uuid-role-cashier",
      "name": "CASHIER"
    },
    "user_status": {
      "user_status_id": "uuid-status-inactive",
      "name": "INACTIVE"
    }
  }
}
```

---

### 5. Menghapus Pengguna Secara Fisik (Soft Delete)

Endpoint ini mengubah status menjadi `DELETED` sehingga seluruh jejak rekam data kasir bersangkutan (misalnya data penerimaan uang di riwayat kasir, kas masuk, order, dsb) tetap aman dan tidak *error cascade* di *database*.

- **Endpoint:** `DELETE /:user_id`
- **Akses:** Protected (ADMIN)
- **Request Body:** (Tidak ada)

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil menghapus pengguna",
  "data": {
    "success": true,
    "message": "Pengguna berhasil dihapus"
  }
}
```
