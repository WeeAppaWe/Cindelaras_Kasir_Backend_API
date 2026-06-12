# Dokumentasi API Dashboard

Dokumentasi ini menjelaskan rute API untuk halaman **Dashboard** — halaman utama sistem kasir yang menampilkan ringkasan kinerja harian.

**Catatan Penting:** Semua rute pada modul ini memerlukan hak akses dengan *role* **ADMIN**.

Base URL Utama: `/api/dashboard`

---

## Ringkasan Endpoint

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/dashboard/kpi` | Ambil 4 KPI card dashboard |
| `GET` | `/api/dashboard/sales-trend` | Ambil data tren penjualan harian untuk chart |
| `GET` | `/api/dashboard/top-menus` | Ambil 5 menu terlaris hari ini |
| `GET` | `/api/dashboard/stock-status` | Ambil distribusi status persediaan untuk radial chart |
| `GET` | `/api/dashboard/recent-stock-movements` | Ambil 10 mutasi stok terbaru untuk tabel aktivitas |

---

## KPI Cards

Dashboard menampilkan 4 kartu KPI yang memberi gambaran cepat kondisi bisnis hari ini.

| KPI | Keterangan |
| :--- | :--- |
| **Omset Hari Ini** | Total pendapatan dari order COMPLETED hari ini, disertai perbandingan vs kemarin. |
| **Total Transaksi** | Jumlah order COMPLETED hari ini dari semua metode pembayaran, disertai selisih vs kemarin. |
| **Estimasi Profit** | Gross profit hari ini (omset dikurangi COGS dari `menu.cost`), disertai persentase margin kotor. |
| **Stok Menipis** | Jumlah bahan (RAW maupun SEMI) yang stoknya di bawah batas minimum (`stock_qty < min_stock`). |

---

## 1. GET /kpi — Ambil 4 KPI Dashboard

- **Endpoint:** `GET /api/dashboard/kpi`
- **Akses:** Protected (ADMIN)

**Query Parameters (Opsional):**

| Parameter | Tipe | Keterangan |
| :--- | :--- | :--- |
| `date` | string (YYYY-MM-DD) | Tanggal yang ingin ditampilkan. Default: hari ini. |

**Contoh Request:**
```
GET /api/dashboard/kpi
GET /api/dashboard/kpi?date=2024-06-15
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil data KPI dashboard",
  "data": {
    "date": "2024-06-15",
    "revenue": {
      "today": 3865000,
      "yesterday": 3500000,
      "change_amount": 365000,
      "change_percentage": 10.43
    },
    "transactions": {
      "today": 52,
      "yesterday": 50,
      "change": 2
    },
    "profit": {
      "gross_profit": 1584650,
      "total_revenue": 3865000,
      "total_cogs": 2280350,
      "margin_percentage": 40.99
    },
    "low_stock": {
      "count": 3
    }
  }
}
```

**Catatan Field:**

| Field | Keterangan |
| :--- | :--- |
| `revenue.change_percentage` | Persentase perubahan vs kemarin. Bernilai `null` jika kemarin `= 0` (untuk menghindari division by zero). |
| `revenue.change_amount` | Selisih nominal. Negatif jika omset hari ini lebih kecil dari kemarin. |
| `transactions.change` | Selisih jumlah transaksi. Bisa negatif. |
| `profit.total_cogs` | Dihitung dari `menu.cost × qty` per order item, konsisten dengan laporan keuangan. |
| `profit.margin_percentage` | `(gross_profit / total_revenue) × 100`. Bernilai `0` jika tidak ada transaksi. |
| `low_stock.count` | Mencakup bahan yang stoknya habis (`stock_qty = 0`) maupun menipis (`stock_qty < min_stock`). |

---

## 2. GET /sales-trend — Tren Penjualan Harian

- **Endpoint:** `GET /api/dashboard/sales-trend`
- **Akses:** Protected (ADMIN)

Mengambil data tren penjualan harian (omset + jumlah transaksi) untuk chart **Tren Penjualan** di halaman dashboard. Chart menampilkan batang omset (bar) dan garis transaksi (line) dalam satu sumbu ganda.

Response selalu berisi tepat N data point sesuai `days`. Hari yang tidak memiliki transaksi tetap muncul dengan nilai `0`.

**Query Parameters (Opsional):**

| Parameter | Tipe | Nilai yang Diizinkan | Default | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| `days` | integer | `7`, `14`, `30` | `7` | Rentang hari yang ditampilkan (dihitung mundur dari hari ini). |

**Contoh Request:**
```
GET /api/dashboard/sales-trend
GET /api/dashboard/sales-trend?days=7
GET /api/dashboard/sales-trend?days=14
GET /api/dashboard/sales-trend?days=30
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil data tren penjualan",
  "data": {
    "period_days": 7,
    "start_date": "2024-06-06",
    "end_date": "2024-06-12",
    "data": [
      { "date": "2024-06-06", "label": "06 Jun", "revenue": 3200000, "transaction_count": 47 },
      { "date": "2024-06-07", "label": "07 Jun", "revenue": 3450000, "transaction_count": 51 },
      { "date": "2024-06-08", "label": "08 Jun", "revenue": 3600000, "transaction_count": 55 },
      { "date": "2024-06-09", "label": "09 Jun", "revenue": 3800000, "transaction_count": 62 },
      { "date": "2024-06-10", "label": "10 Jun", "revenue": 3550000, "transaction_count": 58 },
      { "date": "2024-06-11", "label": "11 Jun", "revenue": 0,       "transaction_count": 0  },
      { "date": "2024-06-12", "label": "12 Jun", "revenue": 3100000, "transaction_count": 49 }
    ]
  }
}
```

**Penjelasan Field Response:**

| Field | Tipe | Keterangan |
| :--- | :--- | :--- |
| `period_days` | number | Rentang hari yang dipakai (7, 14, atau 30) |
| `start_date` | string (YYYY-MM-DD) | Tanggal awal periode |
| `end_date` | string (YYYY-MM-DD) | Tanggal akhir periode (hari ini) |
| `data[].date` | string (YYYY-MM-DD) | Tanggal data point |
| `data[].label` | string | Label pendek untuk sumbu X chart, format "DD Mon" (contoh: "06 Jun") |
| `data[].revenue` | number | Total omset order COMPLETED. `0` jika tidak ada transaksi. |
| `data[].transaction_count` | integer | Jumlah order COMPLETED. `0` jika tidak ada transaksi. |

**Catatan Penting:**

- `data` selalu berisi tepat `period_days` item, diurutkan dari tanggal terlama ke terbaru.
- Hari tanpa transaksi tetap muncul dengan `revenue: 0` dan `transaction_count: 0` — memastikan chart tidak berlubang.
- `days` yang tidak masuk dalam daftar `[7, 14, 30]` akan menghasilkan error validasi 400.
- Label menggunakan nama bulan dalam bahasa Indonesia (Jan, Feb, Mar, Apr, Mei, Jun, Jul, Agu, Sep, Okt, Nov, Des).

**Response Error (400):**
```json
{
  "response": [],
  "metaData": {
    "message": "Nilai days tidak valid, gunakan 7, 14, atau 30",
    "code": 400,
    "response_code": "400"
  }
}
```

---

## 3. GET /top-menus — Menu Terlaris Hari Ini

- **Endpoint:** `GET /api/dashboard/top-menus`
- **Akses:** Protected (ADMIN)

Mengambil 5 menu terlaris berdasarkan jumlah porsi (`qty_sold`) dari order COMPLETED pada hari tertentu. Digunakan untuk widget **Menu Terlaris** di dashboard — menampilkan bar chart horizontal dan daftar detail dengan ranking.

**Query Parameters (Opsional):**

| Parameter | Tipe | Keterangan |
| :--- | :--- | :--- |
| `date` | string (YYYY-MM-DD) | Tanggal yang ingin ditampilkan. Default: hari ini. |

**Contoh Request:**
```
GET /api/dashboard/top-menus
GET /api/dashboard/top-menus?date=2024-06-15
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil data menu terlaris",
  "data": {
    "date": "2024-06-15",
    "total_items": 5,
    "items": [
      {
        "rank": 1,
        "menu_id": "menu-uuid-001",
        "menu_name": "Ayam Penyet Sambal Bawang",
        "category_name": "Penyetan",
        "qty_sold": 86,
        "revenue": 2150000,
        "margin_percentage": 42
      },
      {
        "rank": 2,
        "menu_id": "menu-uuid-002",
        "menu_name": "Lele Bakar Madu",
        "category_name": "Bebakaran",
        "qty_sold": 64,
        "revenue": 1536000,
        "margin_percentage": 38
      },
      {
        "rank": 3,
        "menu_id": "menu-uuid-003",
        "menu_name": "Ayam Bakar Cindelaras",
        "category_name": "Bebakaran",
        "qty_sold": 58,
        "revenue": 1740000,
        "margin_percentage": 45
      },
      {
        "rank": 4,
        "menu_id": "menu-uuid-004",
        "menu_name": "Es Teh Manis",
        "category_name": "Minuman",
        "qty_sold": 112,
        "revenue": 560000,
        "margin_percentage": 61
      },
      {
        "rank": 5,
        "menu_id": "menu-uuid-005",
        "menu_name": "Nasi Putih",
        "category_name": "Makanan Pokok",
        "qty_sold": 50,
        "revenue": 250000,
        "margin_percentage": 60
      }
    ]
  }
}
```

**Penjelasan Field Response:**

| Field | Tipe | Keterangan |
| :--- | :--- | :--- |
| `date` | string (YYYY-MM-DD) | Tanggal yang ditampilkan |
| `total_items` | integer | Jumlah menu yang dikembalikan (0–5). Bisa kurang dari 5 jika belum ada 5 menu berbeda yang terjual. |
| `items[].rank` | integer | Peringkat (1 = paling banyak terjual) |
| `items[].menu_id` | UUID | ID menu |
| `items[].menu_name` | string | Nama menu |
| `items[].category_name` | string | Nama kategori menu |
| `items[].qty_sold` | integer | Total porsi terjual pada hari tersebut |
| `items[].revenue` | number | Total omset menu ini (dari `order_items.subtotal`) |
| `items[].margin_percentage` | integer | Margin kotor menu = `round((price - cost) / price × 100)`. `0` jika `price = 0`. |

**Catatan Penting:**

- Urutan didasarkan pada `qty_sold` terbanyak. Jika hari tersebut belum ada transaksi, `items` akan berupa array kosong dan `total_items = 0`.
- `margin_percentage` dihitung dari `menu.price` dan `menu.cost` (HPP per porsi) — konsisten dengan margin yang ditampilkan di halaman menu.
- `price` dan `cost` mentah tidak diekspos di response; hanya `margin_percentage` yang dikirim ke client.
- Jika terdapat kurang dari 5 menu berbeda yang terjual hari itu, `total_items` akan mencerminkan jumlah aktual.

---

## 4. GET /stock-status — Status Persediaan (Radial Chart)

- **Endpoint:** `GET /api/dashboard/stock-status`
- **Akses:** Protected (ADMIN)

Mengambil distribusi status persediaan seluruh bahan (RAW + SEMI) untuk widget **Status Persediaan** di dashboard — menampilkan radial/donut chart dengan 3 kategori.

Endpoint ini tidak membutuhkan query parameter karena selalu mengembalikan kondisi stok **real-time saat ini**.

### Logika Kategorisasi

| Status | Kondisi | Keterangan |
| :--- | :--- | :--- |
| `AMAN` | `stock_qty >= min_stock` | Stok lebih dari atau sama dengan batas minimum |
| `MENIPIS` | `0 < stock_qty < min_stock` | Stok ada tetapi mendekati batas minimum |
| `KRITIS` | `stock_qty <= 0` | Stok habis atau bernilai negatif |

**Contoh Request:**
```
GET /api/dashboard/stock-status
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil status persediaan",
  "data": {
    "total_ingredients": 10,
    "categories": [
      { "status": "AMAN",    "count": 5, "percentage": 50 },
      { "status": "MENIPIS", "count": 3, "percentage": 30 },
      { "status": "KRITIS",  "count": 2, "percentage": 20 }
    ]
  }
}
```

**Penjelasan Field Response:**

| Field | Tipe | Keterangan |
| :--- | :--- | :--- |
| `total_ingredients` | integer | Total semua bahan aktif (RAW + SEMI) |
| `categories` | array | Selalu 3 item, urutan tetap: AMAN → MENIPIS → KRITIS |
| `categories[].status` | string | Nilai enum: `AMAN`, `MENIPIS`, atau `KRITIS` |
| `categories[].count` | integer | Jumlah bahan dalam kategori ini |
| `categories[].percentage` | number | Persentase terhadap total (dibulatkan 2 desimal). `0` jika tidak ada bahan. |

**Catatan Penting:**

- Response selalu berisi tepat 3 kategori dengan urutan tetap: AMAN, MENIPIS, KRITIS — meski salah satu kategori bernilai `count: 0, percentage: 0`.
- Mencakup semua bahan aktif (yang belum di-soft delete), baik `RAW` maupun `SEMI`.
- `percentage` selalu menjumlah ke 100% (± pembulatan floating point). Jika `total_ingredients = 0`, semua `percentage = 0`.
- Kalkulasi dilakukan di database dalam satu query aggregasi — tidak ada iterasi per-baris di application layer.

---

## 5. GET /recent-stock-movements — Mutasi Stok Terbaru

- **Endpoint:** `GET /api/dashboard/recent-stock-movements`
- **Akses:** Protected (ADMIN)

Mengambil 10 mutasi stok (stock movement) terbaru untuk tabel aktivitas di halaman dashboard. Tabel menampilkan kolom: waktu, bahan, tipe, jumlah, dan saldo stok.

Endpoint ini tidak membutuhkan query parameter — selalu mengembalikan 10 mutasi terbaru **real-time**.

**Contoh Request:**
```
GET /api/dashboard/recent-stock-movements
```

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil mengambil mutasi stok terbaru",
  "data": {
    "total_items": 3,
    "items": [
      {
        "stock_movement_id": "sm-uuid-001",
        "created_at": "2024-06-15T08:30:00.000Z",
        "ingredient_name": "Tepung Terigu",
        "stock_type_name": "IN_PURCHASE",
        "qty": 50,
        "current_stock": 150
      },
      {
        "stock_movement_id": "sm-uuid-002",
        "created_at": "2024-06-15T07:45:00.000Z",
        "ingredient_name": "Bawang Merah",
        "stock_type_name": "OUT_SALES",
        "qty": -2,
        "current_stock": 48
      },
      {
        "stock_movement_id": "sm-uuid-003",
        "created_at": "2024-06-15T07:30:00.000Z",
        "ingredient_name": "Minyak Goreng",
        "stock_type_name": "OUT_PRODUCTION",
        "qty": -5,
        "current_stock": 20
      }
    ]
  }
}
```

**Penjelasan Field Response:**

| Field | Tipe | Keterangan |
| :--- | :--- | :--- |
| `total_items` | integer | Jumlah mutasi yang dikembalikan (0–10) |
| `items[].stock_movement_id` | UUID | ID mutasi stok |
| `items[].created_at` | string (ISO 8601) | Waktu mutasi terjadi — FE bebas memformat sesuai kebutuhan |
| `items[].ingredient_name` | string | Nama bahan yang mengalami mutasi |
| `items[].stock_type_name` | string | Tipe mutasi: `IN_PURCHASE`, `OUT_SALES`, `OUT_PRODUCTION`, `ADJUSTMENT`, dll. |
| `items[].qty` | number | Jumlah yang bergerak. Positif = stok bertambah, negatif = stok berkurang. |
| `items[].current_stock` | number | Saldo stok bahan setelah mutasi ini — nilai yang ditampilkan di kolom "Saldo" |

**Catatan Penting:**

- Diurutkan dari mutasi terbaru ke terlama (`created_at DESC`).
- Mencakup semua tipe mutasi (pembelian masuk, penjualan keluar, produksi, opname, dll.) tanpa filter.
- `total_items` mencerminkan jumlah aktual yang dikembalikan — bisa kurang dari 10 jika belum ada 10 mutasi.
- Bahan yang sudah di-soft delete tetap muncul di sini selama record `stock_movement`-nya belum dihapus.
