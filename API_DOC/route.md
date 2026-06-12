# Route API Index

Dokumen ini berisi daftar endpoint yang terdaftar dari seluruh file `*.route.ts` di folder `route`.

Base prefix aplikasi:

```txt
/api
```

Endpoint non-route seperti `/health`, `/api-docs`, dan `/api-docs.json` tidak dimasukkan karena tidak berasal dari folder `route`.

## Access Legend

| Akses | Keterangan |
| --- | --- |
| `Public` | Tidak membutuhkan token. |
| `Authenticated` | Membutuhkan `Authorization: Bearer <token>` dan `x-api-key`, tanpa validasi role spesifik di route. |
| `ADMIN` | Membutuhkan token dan role `ADMIN`. |
| `ADMIN, CASHIER` | Membutuhkan token dan role `ADMIN` atau `CASHIER`. |

Total endpoint dari folder `route`: **143 endpoint**.

## Dashboard

Source: `route/dashboard.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/dashboard/kpi` | ADMIN | Ambil 4 KPI card dashboard (omset, transaksi, estimasi profit, stok menipis). |
| `GET` | `/api/dashboard/sales-trend` | ADMIN | Ambil data tren penjualan harian untuk chart (7, 14, atau 30 hari terakhir). |
| `GET` | `/api/dashboard/top-menus` | ADMIN | Ambil 5 menu terlaris berdasarkan jumlah porsi terjual hari ini. |
| `GET` | `/api/dashboard/stock-status` | ADMIN | Ambil distribusi status persediaan (AMAN / MENIPIS / KRITIS) untuk radial chart. |
| `GET` | `/api/dashboard/recent-stock-movements` | ADMIN | Ambil 10 mutasi stok terbaru untuk tabel aktivitas (waktu, bahan, tipe, qty, saldo). |

## Auth

Source: `route/authentication.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `POST` | `/api/auth/login` | Public | Login user. |
| `POST` | `/api/auth/forgot-password/request-otp` | Public | Request OTP lupa password. |
| `POST` | `/api/auth/forgot-password/verify-otp` | Public | Verifikasi OTP lupa password dan buat reset token. |
| `POST` | `/api/auth/forgot-password/reset-password` | Public | Reset password memakai reset token. |
| `POST` | `/api/auth/logout` | Authenticated | Logout dan hapus token aktif. |

## User

Source: `route/user.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/user/roles` | ADMIN | Ambil daftar role untuk dropdown. |
| `GET` | `/api/user/statuses` | ADMIN | Ambil daftar status user untuk dropdown. |
| `GET` | `/api/user` | ADMIN | Ambil daftar user. |
| `GET` | `/api/user/:user_id` | ADMIN | Ambil detail user. |
| `POST` | `/api/user` | ADMIN | Buat user baru. |
| `PATCH` | `/api/user/:user_id` | ADMIN | Update user. |
| `DELETE` | `/api/user/:user_id` | ADMIN | Soft delete user. |

## Category

Source: `route/category.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/category/options` | ADMIN, CASHIER | Ambil daftar kategori untuk dropdown. |
| `GET` | `/api/category` | ADMIN | Ambil daftar kategori. |
| `GET` | `/api/category/:category_id` | ADMIN | Ambil detail kategori. |
| `POST` | `/api/category` | ADMIN | Buat kategori baru. |
| `PATCH` | `/api/category/:category_id` | ADMIN | Update kategori. |
| `DELETE` | `/api/category/:category_id` | ADMIN | Soft delete kategori. |

## Unit Measure

Source: `route/unit-measure.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/unit-measure/options` | ADMIN | Ambil daftar satuan ukur untuk dropdown. |
| `GET` | `/api/unit-measure` | ADMIN | Ambil daftar satuan ukur. |
| `GET` | `/api/unit-measure/:unit_measure_id` | ADMIN | Ambil detail satuan ukur. |
| `POST` | `/api/unit-measure` | ADMIN | Buat satuan ukur baru. |
| `PATCH` | `/api/unit-measure/:unit_measure_id` | ADMIN | Update satuan ukur. |
| `DELETE` | `/api/unit-measure/:unit_measure_id` | ADMIN | Soft delete satuan ukur. |

## Ingredient Raw

Source: `route/ingredient.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/ingredient/options` | ADMIN | Ambil daftar semua jenis bahan untuk dropdown. |
| `GET` | `/api/ingredient/raw/options` | ADMIN | Ambil daftar bahan baku untuk dropdown. |
| `GET` | `/api/ingredient/raw/units` | ADMIN | Ambil daftar satuan untuk bahan baku. |
| `GET` | `/api/ingredient/raw/low-stock` | ADMIN | Ambil alert bahan baku stok rendah. |
| `GET` | `/api/ingredient/raw` | ADMIN | Ambil daftar bahan baku. |
| `GET` | `/api/ingredient/raw/:ingredient_id` | ADMIN | Ambil detail bahan baku. |
| `POST` | `/api/ingredient/raw` | ADMIN | Buat bahan baku baru. |
| `PATCH` | `/api/ingredient/raw/:ingredient_id` | ADMIN | Update bahan baku. |
| `DELETE` | `/api/ingredient/raw/:ingredient_id` | ADMIN | Soft delete bahan baku. |

## Ingredient Semi

Source: `route/ingredient.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/ingredient/semi/units` | ADMIN | Ambil daftar satuan untuk bahan setengah jadi. |
| `GET` | `/api/ingredient/semi/options` | ADMIN | Ambil daftar bahan setengah jadi untuk dropdown. |
| `POST` | `/api/ingredient/semi/create-and-produce` | ADMIN | Buat bahan setengah jadi baru sekaligus catat hasil produksi pertama (all-in-one). |
| `GET` | `/api/ingredient/semi` | ADMIN | Ambil daftar bahan setengah jadi. |
| `GET` | `/api/ingredient/semi/:ingredient_id` | ADMIN | Ambil detail bahan setengah jadi. |
| `POST` | `/api/ingredient/semi` | ADMIN | Buat bahan setengah jadi baru. |
| `PATCH` | `/api/ingredient/semi/:ingredient_id` | ADMIN | Update bahan setengah jadi. |
| `DELETE` | `/api/ingredient/semi/:ingredient_id` | ADMIN | Soft delete bahan setengah jadi. |
| `GET` | `/api/ingredient/semi/:ingredient_id/hpp` | ADMIN | Ambil perhitungan HPP bahan setengah jadi. |
| `POST` | `/api/ingredient/semi/:ingredient_id/recalculate-hpp` | ADMIN | Hitung ulang HPP bahan setengah jadi. |
| `POST` | `/api/ingredient/semi/:ingredient_id/produce` | ADMIN | Produksi bahan setengah jadi (potong stok bahan penyusun, tambah stok hasil). |

## Ingredient Semi Composition

Source: `route/ingredient-composition.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/ingredient/semi/composition/available-ingredients` | ADMIN | Ambil bahan baku yang tersedia untuk komposisi. |
| `POST` | `/api/ingredient/semi/composition/preview-hpp` | ADMIN | Preview HPP sebelum komposisi disimpan. |
| `GET` | `/api/ingredient/semi/:ingredient_id/composition` | ADMIN | Ambil daftar komposisi bahan setengah jadi. |
| `POST` | `/api/ingredient/semi/:ingredient_id/composition` | ADMIN | Tambah satu komposisi. |
| `POST` | `/api/ingredient/semi/:ingredient_id/composition/bulk` | ADMIN | Bulk replace komposisi. |
| `PATCH` | `/api/ingredient/semi/:ingredient_id/composition/:composition_id` | ADMIN | Update jumlah komposisi. |
| `DELETE` | `/api/ingredient/semi/:ingredient_id/composition/:composition_id` | ADMIN | Hapus komposisi. |

## Menu

Source: `route/menu.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/menu` | ADMIN, CASHIER | Ambil daftar menu. |
| `GET` | `/api/menu/:menu_id` | ADMIN, CASHIER | Ambil detail menu. |
| `POST` | `/api/menu` | ADMIN | Buat menu baru. |
| `PATCH` | `/api/menu/:menu_id` | ADMIN | Update menu. |
| `PATCH` | `/api/menu/:menu_id/toggle-availability` | ADMIN | Toggle status ketersediaan menu. |
| `DELETE` | `/api/menu/:menu_id` | ADMIN | Soft delete menu. |

## Menu Recipe

Source: `route/menu-recipe.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/menu/:menu_id/recipe` | ADMIN | Ambil resep menu. |
| `POST` | `/api/menu/:menu_id/recipe` | ADMIN | Tambah resep menu. |
| `PATCH` | `/api/menu/:menu_id/recipe` | ADMIN | Bulk update/replace semua resep menu. |
| `PATCH` | `/api/menu/:menu_id/recipe/:recipe_id` | ADMIN | Update qty resep tertentu. |
| `DELETE` | `/api/menu/:menu_id/recipe/:recipe_id` | ADMIN | Hapus resep dari menu. |

## Supplier

Source: `route/supplier.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/supplier` | ADMIN | Ambil daftar supplier. |
| `GET` | `/api/supplier/:supplier_id` | ADMIN | Ambil detail supplier. |
| `POST` | `/api/supplier` | ADMIN | Buat supplier baru. |
| `PATCH` | `/api/supplier/:supplier_id` | ADMIN | Update supplier. |
| `DELETE` | `/api/supplier/:supplier_id` | ADMIN | Soft delete supplier. |

## Inventory

Source: `route/inventory.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/inventory/stock-types` | ADMIN | Ambil daftar tipe stok. |
| `POST` | `/api/inventory/stock-in` | ADMIN | Catat stok masuk dari supplier. |
| `POST` | `/api/inventory/stock-out` | ADMIN | Catat stok keluar. |
| `GET` | `/api/inventory/ingredient/:ingredient_id` | ADMIN | Ambil riwayat stok per bahan. |
| `GET` | `/api/inventory` | ADMIN | Ambil semua riwayat pergerakan stok. |
| `GET` | `/api/inventory/:stock_movement_id` | ADMIN | Ambil detail pergerakan stok. |

## Stock Type

Source: `route/stock-type.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/stock-type` | ADMIN | Ambil daftar tipe stok. |
| `GET` | `/api/stock-type/:stock_type_id` | ADMIN | Ambil detail tipe stok. |

## Opname

Source: `route/opname.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/opname/ingredients` | ADMIN | Ambil daftar bahan untuk form opname. |
| `GET` | `/api/opname` | ADMIN | Ambil daftar stock opname. |
| `GET` | `/api/opname/:stock_opname_id` | ADMIN | Ambil detail stock opname. |
| `POST` | `/api/opname` | ADMIN | Buat stock opname baru. |
| `PATCH` | `/api/opname/:stock_opname_id` | ADMIN | Update stock opname. |
| `PATCH` | `/api/opname/:stock_opname_id/status` | ADMIN | Ubah status stock opname. |
| `POST` | `/api/opname/:stock_opname_id/apply` | ADMIN | Terapkan adjustment stok dari opname. |
| `DELETE` | `/api/opname/:stock_opname_id` | ADMIN | Soft delete stock opname. |

## Shift

Source: `route/shift.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/shift/active` | ADMIN, CASHIER | Cek shift aktif user saat ini. |
| `GET` | `/api/shift/my` | ADMIN, CASHIER | Ambil daftar shift milik user saat ini. |
| `POST` | `/api/shift/start` | ADMIN, CASHIER | Mulai shift. |
| `POST` | `/api/shift/end` | ADMIN, CASHIER | Akhiri shift. |
| `GET` | `/api/shift` | ADMIN | Ambil semua shift. |
| `GET` | `/api/shift/:shift_id` | ADMIN, CASHIER | Ambil detail shift. |
| `GET` | `/api/shift/:shift_id/summary` | ADMIN, CASHIER | Ambil ringkasan shift. |

## Cash Movement

Source: `route/cash-movement.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/cash-movement` | ADMIN, CASHIER | Ambil daftar pergerakan kas. |
| `GET` | `/api/cash-movement/:cash_movement_id` | ADMIN, CASHIER | Ambil detail pergerakan kas. |
| `POST` | `/api/cash-movement` | ADMIN, CASHIER | Buat pergerakan kas baru. |

## Order

Source: `route/order.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/order` | ADMIN, CASHIER | Ambil daftar/history order. |
| `GET` | `/api/order/:order_id` | ADMIN, CASHIER | Ambil detail order. |
| `POST` | `/api/order` | ADMIN, CASHIER | Buat order/checkout baru. |
| `PATCH` | `/api/order/:order_id/confirm` | ADMIN, CASHIER | Konfirmasi pembayaran order. |
| `PATCH` | `/api/order/:order_id/cancel` | ADMIN, CASHIER | Batalkan order. |
| `GET` | `/api/order/:order_id/receipt` | ADMIN, CASHIER | Ambil data receipt order. |

## Receipt

Source: `route/receipt.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/receipt/:order_id/pdf` | Public | Generate PDF struk on-demand. |
| `GET` | `/api/receipt/preview-sample` | ADMIN | Ambil preview sample struk tanpa order. |
| `GET` | `/api/receipt/:order_id/preview` | ADMIN, CASHIER | Ambil preview data struk. |
| `POST` | `/api/receipt/:order_id/send` | ADMIN, CASHIER | Kirim struk ke WhatsApp. |

## Store Setting

Source: `route/store-setting.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/store-setting/public/info` | Public | Ambil info publik toko. |
| `GET` | `/api/store-setting` | ADMIN | Ambil semua setting format array. |
| `GET` | `/api/store-setting/map` | ADMIN | Ambil semua setting format key-value map. |
| `PATCH` | `/api/store-setting/batch` | ADMIN | Batch update banyak setting. |
| `GET` | `/api/store-setting/:setting_key` | ADMIN | Ambil detail setting berdasarkan key. |
| `POST` | `/api/store-setting` | ADMIN | Upsert setting. |
| `PATCH` | `/api/store-setting/:setting_key` | ADMIN | Update setting berdasarkan key. |
| `DELETE` | `/api/store-setting/:setting_key` | ADMIN | Soft delete setting berdasarkan key. |

## Upload

Source: `route/upload.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `POST` | `/api/upload/image/:folder` | ADMIN | Upload gambar ke target folder `menu` atau `logo`. |
| `POST` | `/api/upload/image` | ADMIN | Upload gambar ke target default `menu`. |
| `DELETE` | `/api/upload/image/:folder/:filename` | ADMIN | Hapus gambar dari target folder tertentu. |
| `DELETE` | `/api/upload/image/:filename` | ADMIN | Hapus gambar dari target default `menu`. |

## Report Financial

Source: `route/report-financial.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/report/financial` | ADMIN | Ambil full financial report. |
| `GET` | `/api/report/financial/summary` | ADMIN | Ambil revenue summary. |
| `GET` | `/api/report/financial/payment` | ADMIN | Ambil payment breakdown. |
| `GET` | `/api/report/financial/cash-flow` | ADMIN | Ambil cash flow report. |
| `GET` | `/api/report/financial/top-menus` | ADMIN | Ambil top selling menus. |
| `GET` | `/api/report/financial/by-category` | ADMIN | Ambil sales by category. |

## Report Inventory

Source: `route/report-inventory.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/report/inventory` | ADMIN | Ambil full inventory report. |
| `GET` | `/api/report/inventory/current` | ADMIN | Ambil stok saat ini. |
| `GET` | `/api/report/inventory/movement` | ADMIN | Ambil ringkasan pergerakan stok. |
| `GET` | `/api/report/inventory/alerts` | ADMIN | Ambil alert stok rendah/habis. |
| `GET` | `/api/report/inventory/valuation` | ADMIN | Ambil valuasi inventory. |
| `GET` | `/api/report/inventory/opname` | ADMIN | Ambil riwayat stock opname. |
| `GET` | `/api/report/inventory/card` | ADMIN | Ambil kartu stok bahan. |

## Report Operational

Source: `route/report-operational.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/report/operational` | ADMIN | Ambil full operational report. |
| `GET` | `/api/report/operational/cashier` | ADMIN | Ambil performa kasir. |
| `GET` | `/api/report/operational/shift` | ADMIN | Ambil ringkasan shift. |
| `GET` | `/api/report/operational/transactions` | ADMIN | Ambil statistik transaksi. |
| `GET` | `/api/report/operational/menu` | ADMIN | Ambil performa menu. |
| `GET` | `/api/report/operational/order-status` | ADMIN | Ambil ringkasan status order. |

## Report Export

Source: `route/report-export.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `POST` | `/api/report/export/pdf` | ADMIN | Export report payload ke PDF. |
| `POST` | `/api/report/export/excel` | ADMIN | Export report payload ke Excel-compatible XLS. |

## SPK

Source: `route/spk.route.ts`

| Method | Endpoint | Akses | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/api/spk/analysis` | ADMIN | Jalankan analisis SPK. |
