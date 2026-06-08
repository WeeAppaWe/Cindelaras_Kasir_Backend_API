# Dokumentasi API SPK (Smart Purchasing / Surat Perintah Kerja)

Dokumentasi ini menjelaskan rute API untuk menjalankan modul **SPK (Smart Purchasing)**. Fitur ini berfungsi sebagai *Robo-Advisor* atau asisten prediktif yang menggunakan algoritma analitik riwayat pemakaian (WMA - *Weighted Moving Average*) untuk **memberikan rekomendasi pesanan belanja bahan baku secara cerdas**.

Hasil dari API ini digunakan oleh Frontend untuk me-*render* draf "Surat Pesanan / Order Pembelian" yang secara otomatis dikelompokkan berdasarkan tiap-tiap *Supplier* langganan.

**Catatan Penting:** Rute pada modul ini memerlukan hak akses dengan *role* **ADMIN**.

Base URL Utama: `/api/spk`

---

## Tabel dan Field yang Dipakai

Modul SPK bersifat read-only. Backend membaca transaksi selesai, item order, menu, resep menu, bahan, satuan, serta supplier terakhir dari riwayat stok untuk menghasilkan rekomendasi belanja. Tidak ada data SPK yang disimpan ke tabel khusus.

### Ringkasan Penggunaan Tabel

| Proses | Tabel yang Dipakai | Keterangan |
| :--- | :--- | :--- |
| Mengambil histori penjualan | `orders`, `order_items` | Mengambil order `COMPLETED` pada periode lookback dan item menu yang terjual. |
| Recipe explosion | `menus`, `menu_recipes`, `ingredients`, `unit_measures` | Mengubah penjualan menu menjadi estimasi pemakaian bahan berdasarkan resep. |
| Mengambil stok dan biaya bahan | `ingredients`, `unit_measures` | Mengambil stok saat ini, minimum stok, HPP rata-rata, tipe bahan, dan satuan. |
| Mengambil supplier terakhir | `stock_movements`, `suppliers` | Mengambil supplier terakhir yang pernah menyuplai tiap bahan berdasarkan riwayat stok. |
| Menghasilkan rekomendasi SPK | Tidak menulis tabel | Perhitungan dilakukan in-memory dari data yang dibaca. |

### 1. Tabel `orders`

Tabel transaksi utama. SPK hanya memakai order yang sudah selesai.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `order_id` | UUID | Tidak | Primary key order. |
| `shift_id` | UUID | Tidak | Foreign key ke tabel `shifts`. |
| `user_id` | UUID | Tidak | Foreign key ke tabel `users`. |
| `customer_name` | varchar(50) | Ya | Nama pelanggan. |
| `customer_phone` | varchar(20) | Ya | Nomor pelanggan. |
| `receipt` | varchar(50) | Ya | Nomor struk. |
| `total_amount` | decimal(15,2) | Tidak | Total transaksi. |
| `paid_amount` | decimal(15,2) | Tidak | Nominal bayar. |
| `change_amount` | decimal(15,2) | Tidak | Kembalian. |
| `payment_type` | varchar(20) | Tidak | Metode pembayaran. |
| `status` | varchar(20) | Tidak | Status order. SPK memakai `COMPLETED`. |
| `created_at` | timestamp | Tidak | Waktu transaksi. Dipakai untuk periode lookback. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada SPK:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Ambil histori penjualan | `order_id`, `status`, `created_at`, `deleted_at` |
| Kelompok pemakaian harian | `created_at` |

### 2. Tabel `order_items`

Tabel item menu yang terjual pada order.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `order_item_id` | UUID | Tidak | Primary key item order. |
| `order_id` | UUID | Tidak | Foreign key ke tabel `orders`. |
| `menu_id` | UUID | Tidak | Foreign key ke tabel `menus`. |
| `qty` | integer | Tidak | Jumlah menu terjual. |
| `price` | decimal(15,2) | Tidak | Harga menu saat transaksi. |
| `subtotal` | decimal(15,2) | Tidak | Subtotal item. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada SPK:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Recipe explosion | `order_id`, `menu_id`, `qty`, `deleted_at` |

### 3. Tabel `menus`

Tabel menu yang menghubungkan item order ke resep.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `menu_id` | UUID | Tidak | Primary key menu. |
| `category_id` | UUID | Tidak | Foreign key kategori menu. |
| `name` | varchar(100) | Tidak | Nama menu. |
| `price` | decimal(15,2) | Tidak | Harga jual menu. |
| `cost` | decimal(15,2) | Tidak | HPP menu. |
| `description` | text | Ya | Deskripsi menu. |
| `image_url` | varchar(255) | Ya | URL/path gambar menu. |
| `is_available` | boolean | Tidak | Status ketersediaan menu. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada SPK:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Ambil resep dari order item | `menu_id` dan relasi `recipes`. |

### 4. Tabel `menu_recipes`

Tabel resep menu untuk menghitung pemakaian bahan dari menu yang terjual.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `menu_recipe_id` | UUID | Tidak | Primary key resep menu. |
| `menu_id` | UUID | Tidak | Foreign key ke tabel `menus`. |
| `ingredient_id` | UUID | Tidak | Foreign key ke tabel `ingredients`. |
| `qty_needed` | decimal(10,2) | Tidak | Jumlah bahan yang dibutuhkan untuk 1 porsi menu. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada SPK:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Recipe explosion | `menu_id`, `ingredient_id`, `qty_needed`, `deleted_at` |

### 5. Tabel `ingredients`

Tabel bahan yang dianalisis kebutuhan restock-nya.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `ingredient_id` | UUID | Tidak | Primary key bahan. |
| `unit_id` | UUID | Tidak | Foreign key ke tabel `unit_measures`. |
| `name` | varchar(100) | Tidak | Nama bahan. |
| `type` | varchar(20) | Tidak | Jenis bahan. Dipakai untuk filter `ingredient_type`. |
| `stock_qty` | decimal(10,2) | Tidak | Stok bahan saat ini. |
| `min_stock` | decimal(10,2) | Tidak | Batas minimum stok. |
| `avg_cost` | decimal(15,2) | Tidak | HPP rata-rata bahan untuk estimasi biaya belanja. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. SPK hanya memakai bahan aktif. |

Field yang dipakai pada SPK:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Analisa bahan | `ingredient_id`, `name`, `type`, `stock_qty`, `min_stock`, `avg_cost`, `unit_id`, `deleted_at` |
| Recipe explosion | `ingredient_id`, `name`, `type`, `unit_id` |
| Estimasi biaya | `avg_cost` |

### 6. Tabel `unit_measures`

Tabel satuan bahan yang ditampilkan pada hasil SPK.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `unit_measure_id` | UUID | Tidak | Primary key satuan. |
| `name` | varchar(50) | Tidak | Nama satuan. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada SPK:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Tampilan hasil analisa | `unit_measure_id`, `name` melalui relasi `ingredient.unit`. |

### 7. Tabel `stock_movements`

Tabel riwayat stok dipakai untuk mencari supplier terakhir per bahan.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `stock_movement_id` | UUID | Tidak | Primary key pergerakan stok. |
| `supplier_id` | UUID | Ya | Foreign key ke tabel `suppliers`. |
| `ingredient_id` | UUID | Tidak | Foreign key ke tabel `ingredients`. |
| `user_id` | UUID | Tidak | User pencatat pergerakan stok. |
| `stock_type_id` | UUID | Tidak | Tipe pergerakan stok. |
| `qty` | decimal(10,2) | Tidak | Jumlah pergerakan stok. |
| `unit_cost` | decimal(15,2) | Ya | Harga satuan stok. |
| `current_stock` | decimal(10,2) | Tidak | Stok setelah pergerakan. |
| `notes` | text | Ya | Catatan pergerakan stok. |
| `created_at` | timestamp | Tidak | Waktu pergerakan stok. Dipakai untuk menentukan supplier terakhir. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada SPK:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Supplier terakhir | `ingredient_id`, `supplier_id`, `created_at`, `deleted_at` |

### 8. Tabel `suppliers`

Tabel pemasok untuk pengelompokan hasil rekomendasi belanja.

| Field | Tipe | Nullable | Keterangan |
| :--- | :--- | :--- | :--- |
| `supplier_id` | UUID | Tidak | Primary key pemasok. |
| `name` | varchar(100) | Tidak | Nama pemasok. |
| `phone` | varchar(20) | Ya | Kontak pemasok yang ditampilkan sebagai `contact`. |
| `address` | text | Ya | Alamat pemasok. |
| `created_at` | timestamp | Tidak | Waktu data dibuat. |
| `updated_at` | timestamp | Ya | Waktu data terakhir diperbarui. |
| `deleted_at` | timestamp | Ya | Soft delete marker. |

Field yang dipakai pada SPK:

| Proses | Field yang Dipakai |
| :--- | :--- |
| Group by supplier | `supplier_id`, `name`, `phone` melalui relasi dari `stock_movements.supplier_id`. |

### Relasi Tabel

```text
orders.order_id -> order_items.order_id
order_items.menu_id -> menus.menu_id
menu_recipes.menu_id -> menus.menu_id
menu_recipes.ingredient_id -> ingredients.ingredient_id
ingredients.unit_id -> unit_measures.unit_measure_id
stock_movements.ingredient_id -> ingredients.ingredient_id
stock_movements.supplier_id -> suppliers.supplier_id
```

### Catatan Alur Data

- SPK membaca order dengan `orders.status = COMPLETED` dan `orders.deleted_at = null`.
- Pemakaian bahan dihitung dari `order_items.qty * menu_recipes.qty_needed`.
- Rekomendasi belanja dihitung dari WMA pemakaian harian, `target_days`, `buffer_percent`, dan `ingredients.stock_qty`.
- Estimasi biaya memakai `ingredients.avg_cost`.
- Supplier diambil dari riwayat `stock_movements` terakhir yang memiliki `supplier_id`.
- Parameter `supplier_id` sudah ada pada validasi query, tetapi implementasi service saat ini belum memakainya sebagai filter hasil analisa.

---

## 1. Menjalankan Analisa Smart Purchasing (Get Analysis)

Endpoint ini memicu *backend* untuk menarik seluruh riwayat pemakaian stok selama *X* hari ke belakang, lalu menghitung rata-rata pemakaian hariannya, lalu memberikan angka matematis persis berapa kuantitas yang wajib di-*restock* untuk bertahan *Y* hari ke depan.

- **Endpoint:** `GET /analysis`
- **Akses:** Protected (ADMIN)

**Query Parameters (Semuanya bersifat Opsional):**
| Parameter | Tipe | Default | Deskripsi |
| :--- | :--- | :--- | :--- |
| `target_days` | Number | `7` | Target stok harus bertahan berapa hari ke depan? (Contoh: belanja stok untuk 1 minggu = `7`) |
| `buffer_percent`| Number | `10` | Persentase *Safety Stock* cadangan untuk jaga-jaga lonjakan pembeli (Contoh: `10` = 10%) |
| `lookback_days` | Number | `30` | Data historis kasir yang mau dianalisa ditarik berapa hari ke belakang? |
| `ingredient_type`| String | `"all"` | Filter bahan: `"raw"`, `"semi"`, atau `"all"`. (Biasanya pilih `raw` untuk belanja Supplier) |
| `supplier_id` | UUID | *(Kosong)* | Jika hanya ingin memunculkan SPK khusus 1 Pemasok tertentu |

**Contoh URL Request:**
`GET /api/spk/analysis?target_days=14&buffer_percent=15&ingredient_type=raw`
*(Artinya: Buatkan surat pesanan belanja bahan mentah untuk ketahanan 14 hari ke depan dengan stok cadangan 15%)*

**Response Berhasil (200 OK):**
```json
{
  "code": 200,
  "message": "Berhasil menjalankan analisa SPK",
  "data": {
    "config": {
      "target_days": 14,
      "buffer_percent": 15,
      "lookback_days": 30
    },
    "analysis_date": "2024-02-01T08:00:00Z",
    "lookback_period": {
      "start_date": "2024-01-02",
      "end_date": "2024-01-31"
    },
    "summary": {
      "total_ingredients_analyzed": 50,
      "total_needing_restock": 3,
      "total_estimated_cost": 750000,
      "total_suppliers": 2
    },
    "by_supplier": [
      {
        "supplier_id": "uuid-supplier-1",
        "supplier_name": "PT Kopi Nusantara",
        "contact": "0811223344",
        "items": [
          {
            "ingredient_id": "uuid-ing-1",
            "name": "Kopi Arabica",
            "unit": "gr",
            "suggested_qty": 5000,
            "unit_price": 100,
            "estimated_cost": 500000
          }
        ],
        "total_items": 1,
        "total_estimated_cost": 500000
      },
      {
        "supplier_id": "uuid-supplier-2",
        "supplier_name": "Toko Gula Sinar",
        "contact": "0899887766",
        "items": [
          {
            "ingredient_id": "uuid-ing-2",
            "name": "Gula Pasir",
            "unit": "gr",
            "suggested_qty": 10000,
            "unit_price": 25,
            "estimated_cost": 250000
          }
        ],
        "total_items": 1,
        "total_estimated_cost": 250000
      }
    ],
    "all_items": [
      {
        "ingredient_id": "uuid-ing-1",
        "name": "Kopi Arabica",
        "type": "raw",
        "unit": "gr",
        "wma_daily_average": 250,
        "current_stock": 500,
        "min_stock": 1000,
        "suggested_qty": 5000,
        "avg_cost": 100,
        "estimated_cost": 500000,
        "supplier_id": "uuid-supplier-1",
        "supplier_name": "PT Kopi Nusantara"
      },
      {
        "ingredient_id": "uuid-ing-2",
        "name": "Gula Pasir",
        "type": "raw",
        "unit": "gr",
        "wma_daily_average": 600,
        "current_stock": 200,
        "min_stock": 500,
        "suggested_qty": 10000,
        "avg_cost": 25,
        "estimated_cost": 250000,
        "supplier_id": "uuid-supplier-2",
        "supplier_name": "Toko Gula Sinar"
      }
    ]
  }
}
```

### Panduan Integrasi (Data *Payload* untuk FE):
* *Response* sengaja menyajikan 2 format *array* sekaligus yang sangat memanjakan Frontend:
  1. `by_supplier` = Gunakan *array* ini apabila desain UI Anda menampilkan cetakan/kertas draf Order untuk dikirim ke masing-masing *Supplier* (sudah dikelompokkan).
  2. `all_items` = Gunakan *array* ini apabila UI desain Anda hanya menampilkan 1 tabel utuh panjang berisi keseluruhan stok yang krisis dan butuh dibeli, tanpa mempedulikan supplier-nya.
* `suggested_qty` adalah angka bulat hasil AI. *Frontend* bebas mengubah UI agar nilai ini bisa ditimpa (*override*) manual oleh kasir/admin sebelum dikirimkan ke supplier.
* Fitur ini hanya bersifat *Read-Only* (Analitik/Pelaporan). Jika pesanan/Order tersebut benar-benar jadi dibeli oleh Admin, maka yang dipanggil adalah *endpoint* `POST /api/inventory/stock-in` (Stok Masuk).
