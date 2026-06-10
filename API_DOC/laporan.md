# Dokumentasi API Laporan (Reports)

Dokumentasi ini mencakup tiga endpoint laporan utama yang digunakan oleh halaman **Laporan Admin**. Setiap endpoint mengembalikan data lengkap yang dikelompokkan sesuai kebutuhan analisis bisnis, meliputi laporan keuangan harian, laporan persediaan stok, dan laporan operasional shift.

Base URL: `/api`

---

## Ringkasan Endpoint

| Endpoint | Keterangan |
| :--- | :--- |
| `GET /api/report/financial` | Laporan keuangan harian (Pendapatan, HPP, Laba Kotor, Pengeluaran, Laba Bersih) |
| `GET /api/report/inventory` | Laporan persediaan bahan baku saat ini (Stok, Nilai Aset, Status) |
| `GET /api/report/operational` | Laporan operasional shift kasir (Kas Awal, Penjualan, Kas Sistem, Selisih) |

Semua endpoint hanya dapat diakses oleh **Admin**.

---

## 1. Laporan Keuangan Harian

### Tabel dan Field yang Dipakai

Laporan keuangan dihitung dari tiga sumber data: transaksi (`orders`, `order_items`, `menus`) untuk omzet dan HPP, serta mutasi kas non-transaksi (`cash_movements`) untuk pengeluaran operasional harian.

#### Ringkasan Penggunaan Tabel

| Tabel | Keterangan |
| :--- | :--- |
| `orders` | Sumber data transaksi yang berhasil (status `COMPLETED`). Dipakai untuk total pendapatan dan jumlah transaksi. |
| `order_items` | Detail item per transaksi. Dipakai untuk menghitung HPP per item. |
| `menus` | Master menu. Field `cost` dipakai sebagai harga pokok per satuan menu. |
| `cash_movements` | Mutasi kas non-transaksi pada shift. Tipe `OUT` digunakan sebagai pengeluaran lain-lain. |

#### Field Utama yang Dipakai

| Tabel | Field | Keterangan |
| :--- | :--- | :--- |
| `orders` | `total_amount`, `status`, `created_at` | Sumber omzet. Hanya order `COMPLETED` yang dihitung. Dikelompokkan per hari dari `created_at`. |
| `order_items` | `qty`, `menu_id` | Dipakai untuk menghitung HPP: `qty × Menu.cost`. |
| `menus` | `cost` | Harga pokok penjualan per satuan menu. |
| `cash_movements` | `amount`, `type`, `created_at` | Hanya `type = 'OUT'` yang dihitung sebagai pengeluaran lain-lain. Dikelompokkan per hari dari `created_at`. |

#### Rumus Kalkulasi

| Kolom | Rumus |
| :--- | :--- |
| Total Pendapatan | `SUM(Order.total_amount)` untuk semua order `COMPLETED` pada hari itu |
| HPP | `SUM(OrderItem.qty × Menu.cost)` untuk semua item order `COMPLETED` |
| Laba Kotor | `Total Pendapatan - HPP` |
| Pengeluaran | `SUM(CashMovement.amount)` untuk semua `type = 'OUT'` pada hari itu |
| Laba Bersih | `Laba Kotor - Pengeluaran` |

---

### `GET /api/report/financial`

Mengambil laporan keuangan yang dikelompokkan per hari dalam rentang tanggal yang ditentukan.

- **Endpoint:** `GET /api/report/financial`
- **Akses:** Protected (Admin)

#### Query Parameters

| Parameter | Tipe | Wajib | Format | Deskripsi |
| :--- | :--- | :--- | :--- | :--- |
| `start_date` | String | Ya | `YYYY-MM-DD` | Tanggal awal periode laporan |
| `end_date` | String | Ya | `YYYY-MM-DD` | Tanggal akhir periode laporan |
| `shift_id` | UUID | Tidak | UUID | Filter laporan untuk shift tertentu |
| `user_id` | UUID | Tidak | UUID | Filter laporan untuk kasir tertentu |

`start_date` harus sama atau lebih awal dari `end_date`.

**Contoh Penggunaan:**
`GET /api/report/financial?start_date=2026-01-01&end_date=2026-01-31`

#### Response Berhasil (200 OK)

```json
{
  "response": {
    "period": {
      "start_date": "2026-01-01",
      "end_date": "2026-01-31"
    },
    "total_days": 3,
    "items": [
      {
        "date": "2026-01-01",
        "transaction_count": 15,
        "total_revenue": 1250000,
        "total_cogs": 475000,
        "gross_profit": 775000,
        "expenses": 50000,
        "net_profit": 725000
      },
      {
        "date": "2026-01-02",
        "transaction_count": 22,
        "total_revenue": 1800000,
        "total_cogs": 684000,
        "gross_profit": 1116000,
        "expenses": 0,
        "net_profit": 1116000
      },
      {
        "date": "2026-01-03",
        "transaction_count": 8,
        "total_revenue": 620000,
        "total_cogs": 235600,
        "gross_profit": 384400,
        "expenses": 75000,
        "net_profit": 309400
      }
    ]
  },
  "metaData": {
    "message": "Berhasil mengambil laporan keuangan lengkap",
    "code": 200,
    "response_code": "0000"
  }
}
```

#### Penjelasan Field Response

| Field | Tipe | Deskripsi |
| :--- | :--- | :--- |
| `period.start_date` | String | Tanggal awal filter yang dipakai |
| `period.end_date` | String | Tanggal akhir filter yang dipakai |
| `total_days` | Number | Jumlah hari yang memiliki data dalam periode |
| `items[].date` | String | Tanggal rekapitulasi (`YYYY-MM-DD`) |
| `items[].transaction_count` | Number | Jumlah order `COMPLETED` pada hari tersebut |
| `items[].total_revenue` | Number | Total omzet penjualan (Rp) |
| `items[].total_cogs` | Number | Harga Pokok Penjualan / HPP (Rp) |
| `items[].gross_profit` | Number | Laba Kotor = `total_revenue - total_cogs` (Rp) |
| `items[].expenses` | Number | Total pengeluaran lain-lain dari `CashMovement type = OUT` (Rp) |
| `items[].net_profit` | Number | Laba Bersih = `gross_profit - expenses` (Rp). Bisa bernilai negatif jika pengeluaran melebihi laba. |

#### Catatan Penting

- Hari yang tidak memiliki order sama sekali tetapi memiliki pengeluaran (`CashMovement OUT`) tetap muncul di `items` dengan `transaction_count = 0` dan `net_profit` bernilai negatif.
- Semua nilai nominal sudah dibulatkan ke satuan rupiah terdekat (`Math.round`).
- `items` diurutkan dari tanggal terlama ke terbaru (ascending).

---

## 2. Laporan Persediaan (Inventory)

### Tabel dan Field yang Dipakai

Laporan persediaan dibaca langsung dari kondisi stok saat ini tanpa filter tanggal. Data berasal dari tabel `ingredients` beserta relasi satuannya.

#### Ringkasan Penggunaan Tabel

| Tabel | Keterangan |
| :--- | :--- |
| `ingredients` | Sumber utama data bahan baku dan bahan setengah jadi. |
| `unit_measures` | Relasi satuan ukuran bahan. |

#### Field Utama yang Dipakai

| Tabel | Field | Keterangan |
| :--- | :--- | :--- |
| `ingredients` | `ingredient_id`, `name`, `type`, `stock_qty`, `min_stock`, `avg_cost` | Data pokok bahan baku untuk laporan. |
| `unit_measures` | `name` | Nama satuan yang ditampilkan pada kolom satuan. |

#### Rumus Kalkulasi

| Kolom | Rumus |
| :--- | :--- |
| Total Nilai Aset | `Ingredient.stock_qty × Ingredient.avg_cost` |
| Status Stok | `stock_qty <= 0` → `OUT`, `stock_qty < min_stock` → `LOW`, selainnya → `NORMAL` |

---

### `GET /api/report/inventory`

Mengambil laporan persediaan seluruh bahan baku dan bahan setengah jadi beserta kondisi stok saat ini.

- **Endpoint:** `GET /api/report/inventory`
- **Akses:** Protected (Admin)

#### Query Parameters

| Parameter | Tipe | Wajib | Format | Deskripsi |
| :--- | :--- | :--- | :--- | :--- |
| `start_date` | String | Ya | `YYYY-MM-DD` | Tanggal awal (dipakai untuk validasi format, laporan tetap menampilkan kondisi stok saat ini) |
| `end_date` | String | Ya | `YYYY-MM-DD` | Tanggal akhir (dipakai untuk validasi format) |
| `ingredient_type` | String | Tidak | `raw` / `semi` | Filter berdasarkan tipe bahan: `raw` (bahan baku) atau `semi` (bahan setengah jadi) |

**Contoh Penggunaan:**
`GET /api/report/inventory?start_date=2026-01-01&end_date=2026-01-31`
`GET /api/report/inventory?start_date=2026-01-01&end_date=2026-01-31&ingredient_type=raw`

#### Response Berhasil (200 OK)

```json
{
  "response": {
    "total_items": 4,
    "total_value": 3250000,
    "low_stock_count": 1,
    "out_of_stock_count": 1,
    "items": [
      {
        "ingredient_id": "uuid-ingredient-1",
        "name": "Beras",
        "type": "raw",
        "unit": "Kg",
        "current_stock": 50,
        "min_stock": 10,
        "avg_cost": 15000,
        "stock_value": 750000,
        "status": "NORMAL"
      },
      {
        "ingredient_id": "uuid-ingredient-2",
        "name": "Gula Pasir",
        "type": "raw",
        "unit": "Kg",
        "current_stock": 3,
        "min_stock": 10,
        "avg_cost": 12000,
        "stock_value": 36000,
        "status": "LOW"
      },
      {
        "ingredient_id": "uuid-ingredient-3",
        "name": "Minyak Goreng",
        "type": "raw",
        "unit": "Liter",
        "current_stock": 0,
        "min_stock": 5,
        "avg_cost": 20000,
        "stock_value": 0,
        "status": "OUT"
      },
      {
        "ingredient_id": "uuid-ingredient-4",
        "name": "Bumbu Racik",
        "type": "semi",
        "unit": "Kg",
        "current_stock": 20,
        "min_stock": 5,
        "avg_cost": 5000,
        "stock_value": 100000,
        "status": "NORMAL"
      }
    ]
  },
  "metaData": {
    "message": "Berhasil mengambil laporan persediaan lengkap",
    "code": 200,
    "response_code": "0000"
  }
}
```

#### Penjelasan Field Response

| Field | Tipe | Deskripsi |
| :--- | :--- | :--- |
| `total_items` | Number | Jumlah total bahan yang tampil |
| `total_value` | Number | Total nilai seluruh aset stok (Rp) |
| `low_stock_count` | Number | Jumlah bahan dengan status `LOW` (menipis) |
| `out_of_stock_count` | Number | Jumlah bahan dengan status `OUT` (habis) |
| `items[].ingredient_id` | UUID | ID bahan baku |
| `items[].name` | String | Nama bahan baku |
| `items[].type` | String | Tipe bahan: `raw` (bahan baku mentah) atau `semi` (bahan setengah jadi) |
| `items[].unit` | String | Nama satuan ukuran, misalnya `Kg`, `Liter`, `Pcs` |
| `items[].current_stock` | Number | Stok fisik/sistem saat ini |
| `items[].min_stock` | Number | Batas minimum stok sebelum perlu restock |
| `items[].avg_cost` | Number | Harga rata-rata perolehan per satuan (Rp) |
| `items[].stock_value` | Number | Total nilai aset = `current_stock × avg_cost` (Rp) |
| `items[].status` | String | Status stok: `NORMAL` (aman), `LOW` (menipis), `OUT` (habis) |

#### Logika Status Stok

| Kondisi | Status | Keterangan |
| :--- | :--- | :--- |
| `current_stock <= 0` | `OUT` | Stok habis, perlu segera restock |
| `current_stock < min_stock` | `LOW` | Stok menipis, mendekati batas minimum |
| `current_stock >= min_stock` | `NORMAL` | Stok aman |

#### Catatan Penting

- Laporan ini menampilkan kondisi stok **saat ini** (real-time), bukan kondisi historis pada tanggal filter.
- `items` diurutkan berdasarkan nama bahan (ascending A-Z).
- Bahan yang sudah di-soft delete (`deleted_at != null`) tidak muncul dalam laporan.
- `total_value` adalah akumulasi `stock_value` dari seluruh item yang ditampilkan.

---

## 3. Laporan Operasional Shift

### Tabel dan Field yang Dipakai

Laporan operasional dibangun dari data shift kasir beserta order dan mutasi kas yang terjadi selama shift tersebut.

#### Ringkasan Penggunaan Tabel

| Tabel | Keterangan |
| :--- | :--- |
| `shifts` | Sumber data sesi kerja kasir (waktu, kas awal, kas akhir). |
| `users` | Relasi kasir pemilik shift. |
| `orders` | Order yang terjadi dalam shift. Dipakai untuk menghitung total penjualan. |
| `cash_movements` | Mutasi kas non-transaksi dalam shift (kasbon, petty cash, dll). |

#### Field Utama yang Dipakai

| Tabel | Field | Keterangan |
| :--- | :--- | :--- |
| `shifts` | `shift_id`, `start_time`, `end_time`, `start_cash`, `end_cash` | Identitas dan data kas shift. |
| `users` | `name` | Nama kasir yang bertugas. |
| `orders` | `status`, `total_amount`, `payment_type` | Dipakai untuk menghitung total penjualan shift. Hanya order `COMPLETED`. |
| `cash_movements` | `type`, `amount` | `type = 'IN'` sebagai kas masuk, `type = 'OUT'` sebagai kas keluar non-transaksi. |

#### Rumus Kalkulasi

| Kolom | Rumus |
| :--- | :--- |
| Total Penjualan | `SUM(Order.total_amount)` untuk order `COMPLETED` dalam shift |
| Kas Masuk | `SUM(CashMovement.amount)` untuk `type = 'IN'` dalam shift |
| Kas Keluar | `SUM(CashMovement.amount)` untuk `type = 'OUT'` dalam shift |
| Kas Sistem | `start_cash + (penjualan CASH saja) + kas_masuk - kas_keluar` |
| Selisih | `kas_aktual - kas_sistem` (negatif = kekurangan, positif = kelebihan) |

> **Catatan:** Kas Sistem hanya memperhitungkan penjualan dengan `payment_type = 'CASH'`. Penjualan QRIS tidak masuk ke laci fisik kasir sehingga tidak dihitung dalam Kas Sistem.

---

### `GET /api/report/operational`

Mengambil laporan operasional seluruh shift dalam rentang tanggal yang ditentukan.

- **Endpoint:** `GET /api/report/operational`
- **Akses:** Protected (Admin)

#### Query Parameters

| Parameter | Tipe | Wajib | Format | Deskripsi |
| :--- | :--- | :--- | :--- | :--- |
| `start_date` | String | Ya | `YYYY-MM-DD` | Tanggal awal periode laporan |
| `end_date` | String | Ya | `YYYY-MM-DD` | Tanggal akhir periode laporan |
| `shift_id` | UUID | Tidak | UUID | Filter laporan untuk satu shift tertentu |
| `user_id` | UUID | Tidak | UUID | Filter laporan untuk kasir tertentu |

`start_date` harus sama atau lebih awal dari `end_date`. Filter menggunakan `Shift.start_time` sebagai acuan tanggal shift.

**Contoh Penggunaan:**
`GET /api/report/operational?start_date=2026-01-01&end_date=2026-01-31`
`GET /api/report/operational?start_date=2026-01-01&end_date=2026-01-31&user_id=uuid-kasir`

#### Response Berhasil (200 OK)

```json
{
  "response": {
    "period": {
      "start_date": "2026-01-01",
      "end_date": "2026-01-31"
    },
    "total_shifts": 2,
    "shifts": [
      {
        "shift_id": "uuid-shift-1",
        "date": "2026-01-01",
        "start_time": "08:00:00",
        "end_time": "16:00:00",
        "cashier_name": "Kasir Siti",
        "start_cash": 500000,
        "total_sales": 1250000,
        "cash_in": 100000,
        "cash_out": 50000,
        "expected_cash": 1350000,
        "actual_cash": 1350000,
        "variance": 0,
        "transaction_count": 24,
        "status": "CLOSED"
      },
      {
        "shift_id": "uuid-shift-2",
        "date": "2026-01-01",
        "start_time": "16:00:00",
        "end_time": null,
        "cashier_name": "Kasir Budi",
        "start_cash": 300000,
        "total_sales": 450000,
        "cash_in": 0,
        "cash_out": 0,
        "expected_cash": 650000,
        "actual_cash": null,
        "variance": null,
        "transaction_count": 8,
        "status": "ACTIVE"
      }
    ]
  },
  "metaData": {
    "message": "Berhasil mengambil laporan operasional lengkap",
    "code": 200,
    "response_code": "0000"
  }
}
```

#### Penjelasan Field Response

| Field | Tipe | Deskripsi |
| :--- | :--- | :--- |
| `period.start_date` | String | Tanggal awal filter yang dipakai |
| `period.end_date` | String | Tanggal akhir filter yang dipakai |
| `total_shifts` | Number | Jumlah shift dalam periode |
| `shifts[].shift_id` | UUID | ID shift |
| `shifts[].date` | String | Tanggal shift dimulai (`YYYY-MM-DD`) |
| `shifts[].start_time` | String | Waktu mulai shift (`HH:MM:SS`) |
| `shifts[].end_time` | String / null | Waktu selesai shift. `null` jika shift masih aktif. |
| `shifts[].cashier_name` | String | Nama kasir yang bertugas |
| `shifts[].start_cash` | Number | Kas awal (modal) saat membuka shift (Rp) |
| `shifts[].total_sales` | Number | Total penjualan semua metode pembayaran dalam shift (Rp) |
| `shifts[].cash_in` | Number | Total kas masuk non-transaksi (kasbon masuk, dll) (Rp) |
| `shifts[].cash_out` | Number | Total kas keluar non-transaksi (kasbon keluar, petty cash, dll) (Rp) |
| `shifts[].expected_cash` | Number | Kas yang seharusnya ada di laci = `start_cash + penjualan_CASH + cash_in - cash_out` (Rp) |
| `shifts[].actual_cash` | Number / null | Kas fisik aktual yang dihitung kasir saat tutup shift. `null` jika shift masih aktif. |
| `shifts[].variance` | Number / null | Selisih = `actual_cash - expected_cash`. Negatif berarti kekurangan, positif berarti kelebihan. `null` jika shift masih aktif. |
| `shifts[].transaction_count` | Number | Jumlah order `COMPLETED` dalam shift |
| `shifts[].status` | String | Status shift: `CLOSED` (sudah tutup) atau `ACTIVE` (masih berjalan) |

#### Logika Variance

| Nilai Variance | Interpretasi |
| :--- | :--- |
| `0` | Kas pas, tidak ada selisih |
| Positif (misalnya `+10000`) | Kas lebih dari sistem. Kemungkinan ada uang receh lebih atau pencatatan yang terlewat. |
| Negatif (misalnya `-15000`) | Kas kurang dari sistem. Perlu investigasi kemungkinan human error atau selisih transaksi. |
| `null` | Shift masih aktif, kasir belum tutup kasir |

#### Catatan Penting

- `expected_cash` hanya memperhitungkan penjualan `payment_type = 'CASH'`. Transaksi QRIS tidak masuk ke perhitungan laci karena uangnya tidak ada secara fisik di kasir.
- `total_sales` tetap mencakup semua metode pembayaran (`CASH` + `QRIS`) untuk keperluan informasi omzet shift.
- `shifts` diurutkan dari shift terbaru ke terlama (descending berdasarkan `start_time`).
- Shift dengan `status = 'ACTIVE'` masih bisa muncul di laporan jika `start_time`-nya masuk dalam rentang filter.
