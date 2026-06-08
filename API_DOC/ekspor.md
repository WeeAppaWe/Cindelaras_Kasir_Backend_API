# Dokumentasi API Ekspor Laporan

Dokumentasi ini menjelaskan endpoint untuk mengekspor payload laporan menjadi file PDF atau Excel-compatible XLS.

**Catatan Penting:** Semua rute pada modul ini memerlukan hak akses dengan role **ADMIN**.

Base URL Utama: `/api/report/export`

---

## Tabel dan Field yang Dipakai

Endpoint export laporan tidak mengambil data laporan langsung dari database. Backend hanya menerima payload laporan dari frontend, memvalidasi struktur request, lalu mengubah payload tersebut menjadi file PDF atau Excel-compatible XLS.

Walaupun begitu, endpoint tetap melewati middleware autentikasi dan otorisasi role **ADMIN**. Middleware tersebut membaca data user login untuk memastikan token valid dan role sesuai.

### Ringkasan Penggunaan Tabel

| Proses | Tabel yang Dipakai | Keterangan |
| --- | --- | --- |
| Validasi token dan user login | `users`, `roles`, `user_statuses` | Middleware mengambil user berdasarkan token dan membaca relasi role/status. |
| Otorisasi role ADMIN | `roles` | Role dari user login dicek agar hanya `ADMIN` yang bisa export. |
| Generate file PDF | Tidak memakai tabel laporan | Data laporan berasal dari request body `data`. |
| Generate file Excel | Tidak memakai tabel laporan | Data laporan berasal dari request body `data`. |

### 1. Tabel `users`

Tabel pengguna dipakai oleh middleware autentikasi untuk mengambil user login dari token.

| Field | Tipe | Nullable | Keterangan |
| --- | --- | --- | --- |
| `user_id` | UUID | Tidak | Primary key pengguna. Dipakai untuk mencari user dari token. |
| `username` | varchar(50) | Tidak | Username pengguna. |
| `name` | varchar(100) | Tidak | Nama pengguna. |
| `phone_number` | varchar(20) | Ya | Nomor WhatsApp/telepon pengguna. |
| `role_id` | UUID | Tidak | Foreign key ke tabel `roles`. |
| `user_status_id` | UUID | Tidak | Foreign key ke tabel `user_statuses`. |
| `deleted_at` | timestamp | Ya | Soft delete marker. Middleware hanya menerima user dengan `deleted_at = null`. |

Field yang dipakai pada endpoint export:

| Proses | Field yang Dipakai |
| --- | --- |
| Validasi token | `user_id`, `username`, `name`, `phone_number`, `role_id`, `user_status_id`, `deleted_at` |

### 2. Tabel `roles`

Tabel role dipakai untuk memastikan user memiliki akses `ADMIN`.

| Field | Tipe | Nullable | Keterangan |
| --- | --- | --- | --- |
| `role_id` | UUID | Tidak | Primary key role. |
| `name` | varchar(50) | Tidak | Nama role, misalnya `ADMIN` atau `CASHIER`. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada endpoint export:

| Proses | Field yang Dipakai |
| --- | --- |
| Otorisasi role | `role_id`, `name` melalui relasi `user.role`. |

### 3. Tabel `user_statuses`

Tabel status pengguna ikut dibaca pada data user login.

| Field | Tipe | Nullable | Keterangan |
| --- | --- | --- | --- |
| `user_status_id` | UUID | Tidak | Primary key status pengguna. |
| `name` | varchar(50) | Tidak | Nama status, misalnya `ACTIVE`, `INACTIVE`, atau `DELETED`. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada endpoint export:

| Proses | Field yang Dipakai |
| --- | --- |
| Validasi user login | `user_status_id`, `name` melalui relasi `user.user_status`. |

### Data Export dari Request Body

Data laporan yang digenerate menjadi file berasal dari body request, bukan dari tabel database.

| Bagian Payload | Keterangan |
| --- | --- |
| `data.title` | Judul laporan. |
| `data.subtitle` | Subjudul laporan. |
| `data.generated_at` | Waktu generate laporan. |
| `data.period` | Periode laporan. |
| `data.metadata` | Metadata tambahan. |
| `data.summaries` | Ringkasan angka. |
| `data.tables` | Tabel laporan dan rows. |
| `data.sections` | Section tambahan laporan. |
| `options` | Opsi file seperti nama file, nama toko, ukuran halaman, orientasi, atau nama sheet. |

### Relasi Tabel

```text
users.role_id -> roles.role_id
users.user_status_id -> user_statuses.user_status_id
```

### Catatan Alur Data

- Tidak ada query ke tabel laporan seperti `orders`, `stock_movements`, atau `ingredients` pada endpoint export.
- Frontend harus mengirim data laporan yang sudah siap diekspor.
- Backend hanya melakukan validasi payload, formatting, lalu mengembalikan binary file.

---

## Ringkasan Endpoint

| Method | Endpoint | Deskripsi | Response |
| --- | --- | --- | --- |
| `POST` | `/pdf` | Export payload laporan menjadi file PDF | Binary file `application/pdf` |
| `POST` | `/excel` | Export payload laporan menjadi file XLS | Binary file `application/vnd.ms-excel` |

Endpoint ini tidak mengambil data laporan dari database. Frontend mengirim payload laporan yang sudah disusun, lalu backend mengubah payload tersebut menjadi file.

---

## Format Umum Request

Semua endpoint export memakai struktur utama:

```json
{
  "data": {
    "title": "Laporan Finansial",
    "subtitle": "Ringkasan penjualan",
    "generated_at": "2026-01-25T10:30:00.000Z",
    "period": {
      "start_date": "2026-01-01",
      "end_date": "2026-01-31"
    },
    "metadata": [],
    "summaries": [],
    "tables": [],
    "sections": []
  },
  "options": {}
}
```

### Field `data`

| Field | Type | Required | Keterangan |
| --- | --- | --- | --- |
| `title` | string | Ya | Judul laporan. Maksimal 150 karakter. |
| `subtitle` | string | Tidak | Subjudul laporan. Maksimal 200 karakter. |
| `generated_at` | string date-time | Tidak | Waktu pembuatan laporan. Jika tidak dikirim, backend memakai waktu saat export. |
| `period` | object | Tidak | Periode laporan. |
| `metadata` | array metric | Tidak | Informasi tambahan laporan. Maksimal 50 item. |
| `summaries` | array metric | Tidak | Ringkasan angka di bagian atas laporan. Maksimal 50 item. |
| `tables` | array table | Tidak | Tabel utama laporan. Maksimal 20 tabel. |
| `sections` | array section | Tidak | Bagian laporan tambahan. Maksimal 20 section. |

### Field `period`

| Field | Type | Required | Keterangan |
| --- | --- | --- | --- |
| `start_date` | string | Ya | Tanggal mulai periode. |
| `end_date` | string | Ya | Tanggal selesai periode. |

Contoh:

```json
{
  "start_date": "2026-01-01",
  "end_date": "2026-01-31"
}
```

### Field Metric

Metric dipakai pada `metadata`, `summaries`, dan `sections[].summaries`.

| Field | Type | Required | Keterangan |
| --- | --- | --- | --- |
| `label` | string | Ya | Label metric. Maksimal 100 karakter. |
| `value` | string, number, boolean, null | Tidak | Nilai metric. |
| `format` | string enum | Tidak | Format tampilan nilai. |

Nilai `format` yang didukung:

| Format | Keterangan |
| --- | --- |
| `text` | Ditampilkan sebagai teks biasa. |
| `number` | Ditampilkan sebagai angka. |
| `currency` | Ditampilkan sebagai mata uang. |
| `date` | Ditampilkan sebagai tanggal. |
| `datetime` | Ditampilkan sebagai tanggal dan waktu. |
| `percent` | Ditampilkan sebagai persentase. |
| `boolean` | Ditampilkan sebagai `Ya` atau `Tidak`. |

Contoh:

```json
{
  "label": "Total Penjualan",
  "value": 1250000,
  "format": "currency"
}
```

### Field Table

| Field | Type | Required | Keterangan |
| --- | --- | --- | --- |
| `title` | string | Tidak | Judul tabel. Maksimal 150 karakter. |
| `columns` | array column | Ya | Kolom tabel. Minimal 1, maksimal 50 kolom. |
| `rows` | array object | Ya | Baris tabel. Maksimal 5000 baris per tabel. |
| `empty_message` | string | Tidak | Pesan jika tabel kosong. Maksimal 150 karakter. |

Contoh:

```json
{
  "title": "Metode Bayar",
  "columns": [
    {
      "key": "payment_type",
      "header": "Metode Bayar"
    },
    {
      "key": "total_amount",
      "header": "Total",
      "format": "currency",
      "align": "right"
    }
  ],
  "rows": [
    {
      "payment_type": "CASH",
      "total_amount": 750000
    },
    {
      "payment_type": "QRIS",
      "total_amount": 500000
    }
  ],
  "empty_message": "Tidak ada data"
}
```

### Field Column

| Field | Type | Required | Keterangan |
| --- | --- | --- | --- |
| `key` | string | Ya | Key data yang akan dibaca dari setiap row. Maksimal 80 karakter. |
| `header` | string | Ya | Label header kolom. Maksimal 120 karakter. |
| `width` | number | Tidak | Lebar kolom. Harus lebih dari 0, maksimal 500. |
| `align` | string enum | Tidak | Perataan isi kolom. |
| `format` | string enum | Tidak | Format tampilan nilai kolom. |

Nilai `align` yang didukung:

```text
left, center, right
```

### Field Section

Section dipakai untuk laporan yang memiliki beberapa bagian.

| Field | Type | Required | Keterangan |
| --- | --- | --- | --- |
| `title` | string | Ya | Judul section. Maksimal 150 karakter. |
| `summaries` | array metric | Tidak | Ringkasan section. Maksimal 50 item. |
| `tables` | array table | Tidak | Tabel section. Maksimal 20 tabel. |
| `notes` | array string | Tidak | Catatan section. Maksimal 20 catatan, setiap catatan maksimal 300 karakter. |

Contoh:

```json
{
  "title": "Operasional",
  "summaries": [
    {
      "label": "Total Transaksi",
      "value": 120,
      "format": "number"
    }
  ],
  "notes": [
    "Data dihitung berdasarkan transaksi selesai."
  ],
  "tables": []
}
```

---

## 1. Export Laporan ke PDF

- **Endpoint:** `POST /pdf`
- **URL Lengkap:** `/api/report/export/pdf`
- **Akses:** Protected (ADMIN)
- **Content-Type Request:** `application/json`
- **Content-Type Response:** `application/pdf`

### Request Body

```json
{
  "data": {
    "title": "Laporan Finansial",
    "subtitle": "Ringkasan penjualan",
    "generated_at": "2026-01-25T10:30:00.000Z",
    "period": {
      "start_date": "2026-01-01",
      "end_date": "2026-01-31"
    },
    "summaries": [
      {
        "label": "Total Penjualan",
        "value": 1250000,
        "format": "currency"
      },
      {
        "label": "Total Transaksi",
        "value": 18,
        "format": "number"
      }
    ],
    "tables": [
      {
        "title": "Metode Bayar",
        "columns": [
          {
            "key": "payment_type",
            "header": "Metode Bayar"
          },
          {
            "key": "transaction_count",
            "header": "Transaksi",
            "format": "number",
            "align": "right"
          },
          {
            "key": "total_amount",
            "header": "Total",
            "format": "currency",
            "align": "right"
          }
        ],
        "rows": [
          {
            "payment_type": "CASH",
            "transaction_count": 10,
            "total_amount": 750000
          },
          {
            "payment_type": "QRIS",
            "transaction_count": 8,
            "total_amount": 500000
          }
        ]
      }
    ]
  },
  "options": {
    "file_name": "laporan-finansial",
    "store_name": "Kedai UTY",
    "page_size": "A4",
    "orientation": "landscape"
  }
}
```

### Field `options` untuk PDF

| Field | Type | Required | Keterangan |
| --- | --- | --- | --- |
| `file_name` | string | Tidak | Nama file. Maksimal 120 karakter. Jika belum memakai `.pdf`, backend menambahkan ekstensi `.pdf`. |
| `store_name` | string | Tidak | Nama toko yang ditampilkan di header. Maksimal 150 karakter. |
| `page_size` | string enum | Tidak | Ukuran halaman. Nilai: `A4`, `LETTER`. Default: `A4`. |
| `orientation` | string enum | Tidak | Orientasi halaman. Nilai: `portrait`, `landscape`. Default: `landscape`. |

### Response Berhasil (200 OK)

Endpoint ini mengembalikan file PDF sebagai binary attachment, bukan JSON.

**Response Headers:**

```http
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="laporan-finansial.pdf"
Content-Length: 24576
```

**Response Body:**

```text
Binary PDF file
```

---

## 2. Export Laporan ke Excel

- **Endpoint:** `POST /excel`
- **URL Lengkap:** `/api/report/export/excel`
- **Akses:** Protected (ADMIN)
- **Content-Type Request:** `application/json`
- **Content-Type Response:** `application/vnd.ms-excel`

### Request Body

```json
{
  "data": {
    "title": "Laporan Finansial",
    "subtitle": "Ringkasan penjualan",
    "period": {
      "start_date": "2026-01-01",
      "end_date": "2026-01-31"
    },
    "metadata": [
      {
        "label": "Kasir",
        "value": "Semua Kasir",
        "format": "text"
      }
    ],
    "tables": [
      {
        "title": "Metode Bayar",
        "columns": [
          {
            "key": "payment_type",
            "header": "Metode Bayar"
          },
          {
            "key": "total_amount",
            "header": "Total",
            "format": "currency",
            "align": "right"
          }
        ],
        "rows": [
          {
            "payment_type": "CASH",
            "total_amount": 750000
          },
          {
            "payment_type": "QRIS",
            "total_amount": 500000
          }
        ]
      }
    ]
  },
  "options": {
    "file_name": "laporan-finansial",
    "sheet_name": "Finansial",
    "store_name": "Kedai UTY"
  }
}
```

### Field `options` untuk Excel

| Field | Type | Required | Keterangan |
| --- | --- | --- | --- |
| `file_name` | string | Tidak | Nama file. Maksimal 120 karakter. Jika belum memakai `.xls`, backend menambahkan ekstensi `.xls`. |
| `sheet_name` | string | Tidak | Nama sheet. Minimal 1 karakter, maksimal 31 karakter. Default memakai `data.title`. |
| `store_name` | string | Tidak | Nama toko yang ditampilkan di file. Maksimal 150 karakter. |

### Response Berhasil (200 OK)

Endpoint ini mengembalikan file XLS sebagai binary attachment, bukan JSON.

**Response Headers:**

```http
HTTP/1.1 200 OK
Content-Type: application/vnd.ms-excel
Content-Disposition: attachment; filename="laporan-finansial.xls"
Content-Length: 12288
```

**Response Body:**

```text
Binary Excel-compatible XLS file
```

---

## Contoh Request dengan Section

Gunakan `sections` jika laporan perlu dibagi menjadi beberapa bagian.

```json
{
  "data": {
    "title": "Laporan Lengkap",
    "generated_at": "2026-01-25T10:30:00.000Z",
    "sections": [
      {
        "title": "Finansial",
        "summaries": [
          {
            "label": "Total Penjualan",
            "value": 1250000,
            "format": "currency"
          }
        ],
        "tables": [
          {
            "title": "Top Sales",
            "columns": [
              {
                "key": "menu_name",
                "header": "Menu"
              },
              {
                "key": "qty",
                "header": "Qty",
                "format": "number",
                "align": "right"
              }
            ],
            "rows": [
              {
                "menu_name": "Es Teh",
                "qty": 40
              }
            ]
          }
        ]
      },
      {
        "title": "Inventaris",
        "notes": [
          "Data stok menggunakan kondisi terakhir saat laporan dibuat."
        ],
        "tables": []
      }
    ]
  },
  "options": {
    "file_name": "laporan-lengkap"
  }
}
```

---

## Error Response

### 400 Bad Request - Validasi Gagal

Contoh jika `data.title` kosong atau `columns` tidak dikirim:

```json
{
  "response": [
    {
      "location": "body",
      "field": "data.title",
      "message": "Judul laporan wajib diisi"
    }
  ],
  "metaData": {
    "message": "Validasi gagal",
    "code": 400,
    "response_code": "400"
  }
}
```

Contoh validasi tabel tanpa kolom:

```json
{
  "response": [
    {
      "location": "body",
      "field": "data.tables.0.columns",
      "message": "Minimal 1 kolom wajib diisi"
    }
  ],
  "metaData": {
    "message": "Validasi gagal",
    "code": 400,
    "response_code": "400"
  }
}
```

### 401 Unauthorized

Terjadi jika token atau API key tidak valid.

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

Terjadi jika user tidak memiliki role **ADMIN**.

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

---

## Catatan Implementasi Frontend

- Gunakan `responseType: "blob"` saat memanggil endpoint dari frontend.
- Ambil nama file dari header `Content-Disposition`.
- PDF memakai ekstensi `.pdf`.
- Excel memakai ekstensi `.xls`, dengan MIME type `application/vnd.ms-excel`.
- Pastikan `columns[].key` sesuai dengan key pada setiap object di `rows`.
- Jika nilai tidak ada, backend menampilkan nilai kosong sebagai tanda `-` pada file.
