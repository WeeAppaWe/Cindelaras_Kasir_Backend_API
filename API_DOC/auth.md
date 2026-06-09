# Authentication API Documentation

Dokumentasi ini menjelaskan rute API (endpoints) yang tersedia untuk modul Autentikasi (`auth`), termasuk proses login, logout, dan alur lupa password menggunakan OTP via WhatsApp.

Base URL untuk semua rute di bawah ini adalah: `/api/auth`

---

## Tabel dan Penyimpanan Data yang Dipakai

Modul auth memakai tabel database untuk data user, role, dan status user. Selain itu, modul ini memakai Redis untuk menyimpan session token login, OTP reset password sementara, dan reset token sementara setelah OTP berhasil diverifikasi.

### Ringkasan Penggunaan

| Endpoint / Proses | Tabel / Storage yang Dipakai | Keterangan |
| :--- | :--- | :--- |
| `POST /login` | `users`, `roles`, `user_statuses`, Redis token session | Mencari user berdasarkan username, validasi password dan status, membuat token, menyimpan token di Redis, update `last_login`. |
| `POST /forgot-password/request-otp` | `users`, `roles`, `user_statuses`, Redis OTP | Mencari user berdasarkan nomor WhatsApp, validasi status, membuat OTP hash, menyimpan OTP sementara di Redis. |
| `POST /forgot-password/verify-otp` | `users`, `roles`, `user_statuses`, Redis OTP, Redis reset token | Validasi OTP dari Redis, membuat `reset_token` sementara, lalu menghapus OTP. |
| `POST /forgot-password/reset-password` | `users`, `roles`, `user_statuses`, Redis reset token | Validasi `reset_token` dari Redis, update password user, hapus reset token dari Redis. |
| `POST /logout` | Redis token session | Menghapus token login dari Redis. |

### 1. Tabel `users`

Tabel utama untuk data akun pengguna.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `user_id` | UUID | Tidak | Primary key user. |
| `username` | varchar(50) | Tidak | Username login. Unik. |
| `password` | varchar(255) | Tidak | Password hash bcrypt. Tidak dikembalikan pada response API. |
| `name` | varchar(100) | Tidak | Nama pengguna. |
| `phone_number` | varchar(20) | Ya | Nomor WhatsApp user. Unik. Dipakai untuk forgot password. |
| `role_id` | UUID | Tidak | Foreign key ke tabel `roles`. |
| `user_status_id` | UUID | Tidak | Foreign key ke tabel `user_statuses`. |
| `last_login` | time | Ya | Waktu login terakhir, diupdate setelah login berhasil. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. User auth hanya memakai data dengan `deleted_at = null`. |

Field yang dipakai auth:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Login | `user_id`, `username`, `password`, `name`, `phone_number`, `role_id`, `user_status_id`, `last_login`, `deleted_at` |
| Forgot password request OTP | `user_id`, `phone_number`, `user_status_id`, `deleted_at` |
| Forgot password verify OTP | `user_id`, `phone_number`, `user_status_id`, `deleted_at` |
| Reset password | `user_id`, `phone_number`, `password`, `user_status_id`, `deleted_at` |
| Token validation middleware | `user_id`, `username`, `name`, `phone_number`, `role_id`, `user_status_id`, `deleted_at` |

### 2. Tabel `roles`

Tabel master role user.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `role_id` | UUID | Tidak | Primary key role. |
| `name` | varchar(50) | Tidak | Nama role, misalnya `ADMIN` atau `CASHIER`. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai auth:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Login response | `role_id`, `name` |
| Token validation middleware | `role_id`, `name` |
| Role authorization middleware | `name` |

### 3. Tabel `user_statuses`

Tabel master status akun user.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `user_status_id` | UUID | Tidak | Primary key status user. |
| `name` | varchar(50) | Tidak | Nama status, misalnya `ACTIVE`, `INACTIVE`, atau `DELETED`. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai auth:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Login | `user_status_id`, `name` |
| Forgot password request OTP | `user_status_id`, `name` |
| Forgot password verify OTP | `user_status_id`, `name` |
| Reset password | `user_status_id`, `name` |
| Token validation middleware | `user_status_id`, `name` |

Status yang dianggap bisa login dan reset password adalah:

```text
ACTIVE
```

Jika status user bukan `ACTIVE`, auth akan mengembalikan error `Akun tidak aktif`.

### 4. Redis - Session Token Login

Token login tidak disimpan di tabel database. Setelah login berhasil, backend membuat token lalu menyimpan sesi token ke Redis.

Data session token berisi:

| Field | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | string UUID | `user_id` user yang login. |
| `key` | string | API key publik yang harus dikirim pada request protected. |
| `login_time` | number | Timestamp login. |
| `refresh_token` | number | Timestamp refresh token internal. |

Response login mengembalikan:

| Field | Keterangan |
| :--- | :--- |
| `access_token` | Token bearer yang dikirim pada header `Authorization`. |
| `api_key` | API key yang dikirim pada header API key. |
| `token_type` | Selalu `Bearer`. |
| `expires_in` | Masa berlaku token dalam detik. |

Saat logout, data session token ini dihapus dari Redis.

### 5. Redis - OTP Reset Password

OTP reset password juga tidak disimpan di tabel database. OTP disimpan sementara di Redis dengan key:

```text
auth:forgot-password:otp:{phone_number}
```

Payload OTP yang disimpan:

| Field | Tipe | Keterangan |
| :--- | :--- | :--- |
| `user_id` | string UUID | ID user pemilik OTP. |
| `phone_number` | string | Nomor WhatsApp yang sudah dinormalisasi. |
| `otp_hash` | string | Hash bcrypt dari OTP 6 digit. OTP asli tidak disimpan. |
| `attempts` | number | Jumlah percobaan OTP salah. |
| `expires_at` | number | Timestamp kedaluwarsa OTP. |
| `locked_until` | number | Opsional. Timestamp sampai kapan OTP dikunci sementara. |

### 6. Redis - Reset Token Password

Setelah OTP berhasil diverifikasi, backend membuat `reset_token` sementara. Token ini dikembalikan ke frontend dan dipakai pada endpoint reset password.

Reset token disimpan di Redis dengan key:

```text
auth:forgot-password:reset-token:{phone_number}
```

Payload reset token yang disimpan:

| Field | Tipe | Keterangan |
| :--- | :--- | :--- |
| `user_id` | string UUID | ID user pemilik reset token. |
| `phone_number` | string | Nomor WhatsApp yang sudah dinormalisasi. |
| `token_hash` | string | Hash bcrypt dari reset token. Token asli tidak disimpan. |
| `expires_at` | number | Timestamp kedaluwarsa reset token. |

Konfigurasi forgot password memakai environment variable:

| Env | Default | Keterangan |
| :--- | :--- | :--- |
| `FORGOT_PASSWORD_OTP_TTL_SECONDS` | `300` | Masa berlaku OTP dalam detik. |
| `FORGOT_PASSWORD_OTP_MAX_ATTEMPTS` | `5` | Maksimal percobaan OTP salah sebelum OTP dihapus. |
| `FORGOT_PASSWORD_OTP_LOCK_ATTEMPTS` | `3` | Setiap berapa percobaan salah OTP dikunci sementara. |
| `FORGOT_PASSWORD_OTP_LOCK_SECONDS` | `60` | Durasi lock OTP sementara dalam detik. |
| `FORGOT_PASSWORD_RESET_TOKEN_TTL_SECONDS` | `600` | Masa berlaku reset token setelah OTP berhasil diverifikasi. |

### Relasi Tabel

```text
users.role_id         -> roles.role_id
users.user_status_id  -> user_statuses.user_status_id
```

---

## 1. Login

Endpoint ini digunakan untuk mengautentikasi pengguna dan mendapatkan token akses.

- **Endpoint:** `POST /login`
- **Akses:** Public

### Request Body (JSON)

| Field | Tipe | Validasi | Deskripsi |
| :--- | :--- | :--- | :--- |
| `username` | String | Wajib, min 3, max 50 karakter | Username pengguna |
| `password` | String | Wajib, min 6, max 255 karakter | Password pengguna |

**Contoh Request:**
```json
{
  "username": "admin123",
  "password": "passwordrahasia"
}
```

### Response Berhasil (200 OK)

```json
{
  "code": 200,
  "message": "Login berhasil",
  "data": {
    "token": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      "api_key": "pub_key_123456789",
      "token_type": "Bearer",
      "expires_in": 86400
    },
    "user": {
      "user_id": "uuid-user-id",
      "username": "admin123",
      "name": "Budi Santoso",
      "role": {
        "role_id": "uuid-role-id",
        "name": "ADMIN"
      },
      "status": {
        "user_status_id": "uuid-status-id",
        "name": "ACTIVE"
      }
    }
  }
}
```

---

## 2. Request OTP Lupa Password

Endpoint ini digunakan untuk meminta kode OTP yang akan dikirimkan ke nomor WhatsApp pengguna yang terdaftar.

- **Endpoint:** `POST /forgot-password/request-otp`
- **Akses:** Public

### Request Body (JSON)

| Field | Tipe | Validasi | Deskripsi |
| :--- | :--- | :--- | :--- |
| `phone_number` | String | Wajib, min 9, max 20 karakter | Nomor WhatsApp yang terdaftar di akun |

**Contoh Request:**
```json
{
  "phone_number": "081234567890"
}
```

### Response Berhasil (200 OK)

```json
{
  "code": 200,
  "message": "OTP reset password berhasil dikirim",
  "data": {
    "success": true,
    "message": "OTP reset password berhasil dikirim ke WhatsApp",
    "expires_in": 300
  }
}
```

---

## 3. Verify OTP Lupa Password

Endpoint ini digunakan untuk memverifikasi OTP yang diterima dari WhatsApp. Jika OTP benar, backend mengembalikan `reset_token` sementara yang harus dipakai pada endpoint reset password.

Jika pengguna salah memasukkan OTP berulang kali, OTP dapat terkunci sementara.

- **Endpoint:** `POST /forgot-password/verify-otp`
- **Akses:** Public

### Request Body (JSON)

| Field | Tipe | Validasi | Deskripsi |
| :--- | :--- | :--- | :--- |
| `phone_number` | String | Wajib, min 9, max 20 karakter | Nomor WhatsApp pengguna |
| `otp` | String | Wajib, tepat 6 digit angka | Kode OTP yang diterima dari WhatsApp |

**Contoh Request:**
```json
{
  "phone_number": "081234567890",
  "otp": "123456"
}
```

### Response Berhasil (200 OK)

```json
{
  "code": 200,
  "message": "OTP berhasil diverifikasi",
  "data": {
    "success": true,
    "message": "OTP berhasil diverifikasi",
    "reset_token": "reset-token-sementara",
    "expires_in": 600
  }
}
```

Catatan: `reset_token` harus disimpan sementara di state frontend dan dikirim saat reset password. Token ini tidak dikirim lewat WhatsApp.

---

## 4. Reset Password

Endpoint ini digunakan untuk mengganti password lama dengan password baru setelah OTP berhasil diverifikasi.

- **Endpoint:** `POST /forgot-password/reset-password`
- **Akses:** Public

### Request Body (JSON)

| Field | Tipe | Validasi | Deskripsi |
| :--- | :--- | :--- | :--- |
| `phone_number` | String | Wajib, min 9, max 20 karakter | Nomor WhatsApp pengguna |
| `reset_token` | String | Wajib, token reset password valid | Token sementara dari endpoint verify OTP |
| `password` | String | Wajib, min 6, max 255 karakter | Password baru yang diinginkan |
| `confirm_password`| String | Wajib, harus sama dengan `password` | Konfirmasi password baru |

**Contoh Request:**
```json
{
  "phone_number": "081234567890",
  "reset_token": "reset-token-sementara",
  "password": "PasswordBaru123",
  "confirm_password": "PasswordBaru123"
}
```

### Response Berhasil (200 OK)

```json
{
  "code": 200,
  "message": "Password berhasil diperbarui",
  "data": {
    "success": true,
    "message": "Password berhasil diperbarui"
  }
}
```

---

## 5. Logout

Endpoint ini digunakan untuk menghapus sesi pengguna di sistem (menghapus token dari Redis).

- **Endpoint:** `POST /logout`
- **Akses:** Protected (Memerlukan Token & API Key)

### Headers

| Key | Value | Deskripsi |
| :--- | :--- | :--- |
| `Authorization` | `Bearer <access_token>` | Token akses yang didapat saat login |
| `APIKey` | `<api_key>` | API key yang didapat saat login |

**Request Body:** (Tidak ada)

### Response Berhasil (200 OK)

```json
{
  "code": 200,
  "message": "Logout berhasil",
  "data": {
    "success": true,
    "message": "Logout berhasil"
  }
}
```
