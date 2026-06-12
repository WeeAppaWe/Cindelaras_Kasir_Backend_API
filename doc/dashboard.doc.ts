/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: KPI cards, chart tren penjualan, menu terlaris, status persediaan, dan mutasi stok terbaru untuk halaman utama dashboard
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DashboardRevenueKPI:
 *       type: object
 *       description: KPI Omset Hari Ini
 *       properties:
 *         today:
 *           type: number
 *           description: Total revenue order COMPLETED hari ini
 *           example: 3865000
 *         yesterday:
 *           type: number
 *           description: Total revenue order COMPLETED kemarin
 *           example: 3500000
 *         change_amount:
 *           type: number
 *           description: Selisih nominal vs kemarin (bisa negatif)
 *           example: 365000
 *         change_percentage:
 *           type: number
 *           nullable: true
 *           description: Persentase perubahan vs kemarin. null jika kemarin = 0
 *           example: 10.43
 *
 *     DashboardTransactionKPI:
 *       type: object
 *       description: KPI Total Transaksi Hari Ini
 *       properties:
 *         today:
 *           type: integer
 *           description: Jumlah order COMPLETED hari ini
 *           example: 52
 *         yesterday:
 *           type: integer
 *           description: Jumlah order COMPLETED kemarin
 *           example: 50
 *         change:
 *           type: integer
 *           description: Selisih jumlah transaksi vs kemarin (bisa negatif)
 *           example: 2
 *
 *     DashboardProfitKPI:
 *       type: object
 *       description: KPI Estimasi Profit (Gross Profit)
 *       properties:
 *         gross_profit:
 *           type: number
 *           description: Gross profit = total_revenue - total_cogs
 *           example: 1584650
 *         total_revenue:
 *           type: number
 *           description: Total revenue hari ini
 *           example: 3865000
 *         total_cogs:
 *           type: number
 *           description: Total COGS dihitung dari menu.cost × qty per order item
 *           example: 2280350
 *         margin_percentage:
 *           type: number
 *           description: Persentase margin kotor = (gross_profit / total_revenue) × 100. 0 jika tidak ada transaksi
 *           example: 41
 *
 *     DashboardLowStockKPI:
 *       type: object
 *       description: KPI Stok Menipis
 *       properties:
 *         count:
 *           type: integer
 *           description: Jumlah bahan (RAW dan SEMI) dengan stock_qty < min_stock, termasuk yang habis
 *           example: 3
 *
 *     DashboardKPIResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             date:
 *               type: string
 *               format: date
 *               description: Tanggal yang ditampilkan (YYYY-MM-DD)
 *               example: "2024-06-15"
 *             revenue:
 *               $ref: '#/components/schemas/DashboardRevenueKPI'
 *             transactions:
 *               $ref: '#/components/schemas/DashboardTransactionKPI'
 *             profit:
 *               $ref: '#/components/schemas/DashboardProfitKPI'
 *             low_stock:
 *               $ref: '#/components/schemas/DashboardLowStockKPI'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data KPI dashboard"
 *
 *     SalesTrendDataPoint:
 *       type: object
 *       description: Satu titik data harian pada chart tren penjualan
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           description: Tanggal (YYYY-MM-DD)
 *           example: "2024-06-06"
 *         label:
 *           type: string
 *           description: Label pendek untuk sumbu X chart
 *           example: "06 Jun"
 *         revenue:
 *           type: number
 *           description: Total omset order COMPLETED pada hari ini. 0 jika tidak ada transaksi.
 *           example: 3200000
 *         transaction_count:
 *           type: integer
 *           description: Jumlah order COMPLETED pada hari ini. 0 jika tidak ada transaksi.
 *           example: 47
 *
 *     DashboardSalesTrendResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             period_days:
 *               type: integer
 *               description: Rentang hari yang dipilih (7, 14, atau 30)
 *               example: 7
 *             start_date:
 *               type: string
 *               format: date
 *               description: Tanggal awal periode (YYYY-MM-DD)
 *               example: "2024-06-06"
 *             end_date:
 *               type: string
 *               format: date
 *               description: Tanggal akhir periode / hari ini (YYYY-MM-DD)
 *               example: "2024-06-12"
 *             data:
 *               type: array
 *               description: Array data harian, selalu N items sesuai period_days. Hari tanpa transaksi bernilai 0.
 *               items:
 *                 $ref: '#/components/schemas/SalesTrendDataPoint'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data tren penjualan"
 *
 *     TopMenuItem:
 *       type: object
 *       description: Satu menu dalam daftar menu terlaris
 *       properties:
 *         rank:
 *           type: integer
 *           description: Peringkat menu (1 = terlaris)
 *           example: 1
 *         menu_id:
 *           type: string
 *           format: uuid
 *           example: "menu-uuid-001"
 *         menu_name:
 *           type: string
 *           description: Nama menu
 *           example: "Ayam Penyet Sambal Bawang"
 *         category_name:
 *           type: string
 *           description: Nama kategori menu
 *           example: "Penyetan"
 *         qty_sold:
 *           type: integer
 *           description: Total porsi terjual pada hari tersebut
 *           example: 86
 *         revenue:
 *           type: number
 *           description: Total omset menu ini (price × qty dari order_items.subtotal)
 *           example: 2150000
 *         margin_percentage:
 *           type: integer
 *           description: Margin kotor menu = round((price - cost) / price × 100). 0 jika price = 0.
 *           example: 42
 *
 *     DashboardTopMenusResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             date:
 *               type: string
 *               format: date
 *               description: Tanggal yang ditampilkan (YYYY-MM-DD)
 *               example: "2024-06-15"
 *             total_items:
 *               type: integer
 *               description: Jumlah menu yang dikembalikan (0–5)
 *               example: 5
 *             items:
 *               type: array
 *               description: Daftar menu terlaris, diurutkan dari terlaris (rank 1)
 *               items:
 *                 $ref: '#/components/schemas/TopMenuItem'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data menu terlaris"
 *
 *     StockStatusCategory:
 *       type: object
 *       description: Satu kategori status persediaan untuk radial chart
 *       properties:
 *         status:
 *           type: string
 *           enum: [AMAN, MENIPIS, KRITIS]
 *           description: |
 *             Status persediaan:
 *             - AMAN: stock_qty >= min_stock
 *             - MENIPIS: 0 < stock_qty < min_stock
 *             - KRITIS: stock_qty <= 0
 *           example: "AMAN"
 *         count:
 *           type: integer
 *           description: Jumlah bahan dalam kategori ini
 *           example: 5
 *         percentage:
 *           type: number
 *           description: Persentase terhadap total bahan (dibulatkan 2 desimal). 0 jika tidak ada bahan.
 *           example: 50
 *
 *     DashboardStockStatusResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             total_ingredients:
 *               type: integer
 *               description: Total semua bahan (RAW + SEMI) yang aktif
 *               example: 10
 *             categories:
 *               type: array
 *               description: Selalu 3 item dengan urutan tetap — AMAN, MENIPIS, KRITIS
 *               items:
 *                 $ref: '#/components/schemas/StockStatusCategory'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil status persediaan"
 *
 *     RecentStockMovementItem:
 *       type: object
 *       description: Satu baris mutasi stok pada tabel aktivitas dashboard
 *       properties:
 *         stock_movement_id:
 *           type: string
 *           format: uuid
 *           example: "sm-uuid-001"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Waktu mutasi terjadi (ISO 8601)
 *           example: "2024-06-15T08:30:00.000Z"
 *         ingredient_name:
 *           type: string
 *           description: Nama bahan yang bergerak
 *           example: "Tepung Terigu"
 *         stock_type_name:
 *           type: string
 *           description: Tipe mutasi stok, misal IN_PURCHASE, OUT_SALES, ADJUSTMENT, OUT_PRODUCTION
 *           example: "IN_PURCHASE"
 *         qty:
 *           type: number
 *           description: Jumlah yang bergerak. Bisa positif (masuk) atau negatif (keluar) bergantung tipe.
 *           example: 50
 *         current_stock:
 *           type: number
 *           description: Saldo stok bahan setelah mutasi ini terjadi
 *           example: 150
 *
 *     DashboardRecentStockMovementsResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             total_items:
 *               type: integer
 *               description: Jumlah mutasi yang dikembalikan (0–10)
 *               example: 10
 *             items:
 *               type: array
 *               description: Daftar mutasi stok terbaru, diurutkan dari terbaru ke terlama
 *               items:
 *                 $ref: '#/components/schemas/RecentStockMovementItem'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil mutasi stok terbaru"
 */

/**
 * @swagger
 * /dashboard/kpi:
 *   get:
 *     summary: Get 4 KPI cards for dashboard
 *     description: |
 *       Mengambil 4 KPI card untuk halaman utama dashboard:
 *       - **Omset Hari Ini** — total revenue + perbandingan % vs kemarin
 *       - **Total Transaksi** — jumlah order + selisih vs kemarin
 *       - **Estimasi Profit** — gross profit + margin % berdasarkan modal resep (menu.cost)
 *       - **Stok Menipis** — jumlah bahan yang stock_qty < min_stock
 *
 *       Semua data diambil berdasarkan tanggal yang dikirim (default: hari ini).
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: false
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *           example: "2024-06-15"
 *         description: Tanggal target (YYYY-MM-DD). Default ke tanggal hari ini jika tidak diisi.
 *     responses:
 *       200:
 *         description: KPI dashboard berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardKPIResponse'
 *             example:
 *               response:
 *                 date: "2024-06-15"
 *                 revenue:
 *                   today: 3865000
 *                   yesterday: 3500000
 *                   change_amount: 365000
 *                   change_percentage: 10.43
 *                 transactions:
 *                   today: 52
 *                   yesterday: 50
 *                   change: 2
 *                 profit:
 *                   gross_profit: 1584650
 *                   total_revenue: 3865000
 *                   total_cogs: 2280350
 *                   margin_percentage: 41
 *                 low_stock:
 *                   count: 3
 *               metaData:
 *                 message: "Berhasil mengambil data KPI dashboard"
 *                 code: 200
 *                 response_code: "0000"
 *       400:
 *         description: Format date tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                 message: "Format date tidak valid, gunakan YYYY-MM-DD"
 *                 code: 400
 *                 response_code: "400"
 *
 * /dashboard/sales-trend:
 *   get:
 *     summary: Get daily sales trend for chart
 *     description: |
 *       Mengambil data tren penjualan harian (omset + jumlah transaksi) untuk chart di halaman dashboard.
 *
 *       Hasil selalu berisi tepat N data point sesuai `days`. Hari yang tidak memiliki transaksi
 *       akan tetap muncul dengan nilai `revenue: 0` dan `transaction_count: 0`.
 *
 *       Periode yang didukung: **7 hari**, **14 hari**, atau **30 hari** (dihitung mundur dari hari ini).
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: days
 *         required: false
 *         schema:
 *           type: integer
 *           enum: [7, 14, 30]
 *           default: 7
 *           example: 7
 *         description: Rentang hari yang ditampilkan. Hanya menerima nilai 7, 14, atau 30. Default 7.
 *     responses:
 *       200:
 *         description: Data tren penjualan berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardSalesTrendResponse'
 *             example:
 *               response:
 *                 period_days: 7
 *                 start_date: "2024-06-06"
 *                 end_date: "2024-06-12"
 *                 data:
 *                   - date: "2024-06-06"
 *                     label: "06 Jun"
 *                     revenue: 3200000
 *                     transaction_count: 47
 *                   - date: "2024-06-07"
 *                     label: "07 Jun"
 *                     revenue: 3450000
 *                     transaction_count: 51
 *                   - date: "2024-06-08"
 *                     label: "08 Jun"
 *                     revenue: 3600000
 *                     transaction_count: 55
 *                   - date: "2024-06-09"
 *                     label: "09 Jun"
 *                     revenue: 3800000
 *                     transaction_count: 62
 *                   - date: "2024-06-10"
 *                     label: "10 Jun"
 *                     revenue: 3550000
 *                     transaction_count: 58
 *                   - date: "2024-06-11"
 *                     label: "11 Jun"
 *                     revenue: 0
 *                     transaction_count: 0
 *                   - date: "2024-06-12"
 *                     label: "12 Jun"
 *                     revenue: 3100000
 *                     transaction_count: 49
 *               metaData:
 *                 message: "Berhasil mengambil data tren penjualan"
 *                 code: 200
 *                 response_code: "0000"
 *       400:
 *         description: Nilai days tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                 message: "Nilai days tidak valid, gunakan 7, 14, atau 30"
 *                 code: 400
 *                 response_code: "400"
 *
 * /dashboard/top-menus:
 *   get:
 *     summary: Get top 5 best-selling menus for dashboard
 *     description: |
 *       Mengambil 5 menu terlaris berdasarkan jumlah porsi (`qty_sold`) dari order COMPLETED pada hari tertentu.
 *       Setiap item menyertakan nama menu, kategori, jumlah porsi, total omset, dan persentase margin kotor.
 *
 *       Digunakan untuk widget **Menu Terlaris** di halaman dashboard — menampilkan bar chart horizontal
 *       dan daftar detail dengan ranking.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: false
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *           example: "2024-06-15"
 *         description: Tanggal target (YYYY-MM-DD). Default ke tanggal hari ini jika tidak diisi.
 *     responses:
 *       200:
 *         description: Data menu terlaris berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardTopMenusResponse'
 *             example:
 *               response:
 *                 date: "2024-06-15"
 *                 total_items: 5
 *                 items:
 *                   - rank: 1
 *                     menu_id: "menu-uuid-001"
 *                     menu_name: "Ayam Penyet Sambal Bawang"
 *                     category_name: "Penyetan"
 *                     qty_sold: 86
 *                     revenue: 2150000
 *                     margin_percentage: 42
 *                   - rank: 2
 *                     menu_id: "menu-uuid-002"
 *                     menu_name: "Lele Bakar Madu"
 *                     category_name: "Bebakaran"
 *                     qty_sold: 64
 *                     revenue: 1536000
 *                     margin_percentage: 38
 *                   - rank: 3
 *                     menu_id: "menu-uuid-003"
 *                     menu_name: "Ayam Bakar Cindelaras"
 *                     category_name: "Bebakaran"
 *                     qty_sold: 58
 *                     revenue: 1740000
 *                     margin_percentage: 45
 *                   - rank: 4
 *                     menu_id: "menu-uuid-004"
 *                     menu_name: "Es Teh Manis"
 *                     category_name: "Minuman"
 *                     qty_sold: 112
 *                     revenue: 560000
 *                     margin_percentage: 61
 *                   - rank: 5
 *                     menu_id: "menu-uuid-005"
 *                     menu_name: "Nasi Putih"
 *                     category_name: "Makanan Pokok"
 *                     qty_sold: 50
 *                     revenue: 250000
 *                     margin_percentage: 60
 *               metaData:
 *                 message: "Berhasil mengambil data menu terlaris"
 *                 code: 200
 *                 response_code: "0000"
 *       400:
 *         description: Format date tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                 message: "Format date tidak valid, gunakan YYYY-MM-DD"
 *                 code: 400
 *                 response_code: "400"
 *
 * /dashboard/stock-status:
 *   get:
 *     summary: Get stock status distribution for radial chart
 *     description: |
 *       Mengambil distribusi status persediaan seluruh bahan (RAW + SEMI) untuk radial chart di halaman dashboard.
 *
 *       Setiap bahan dikategorikan berdasarkan perbandingan `stock_qty` dengan `min_stock`:
 *       - **AMAN** — `stock_qty >= min_stock` (stok lebih dari batas minimum)
 *       - **MENIPIS** — `0 < stock_qty < min_stock` (mendekati batas minimum)
 *       - **KRITIS** — `stock_qty <= 0` (stok habis atau negatif)
 *
 *       Endpoint ini tidak membutuhkan query parameter — selalu mengembalikan kondisi real-time saat ini.
 *       Response selalu berisi tepat 3 kategori dalam urutan tetap: AMAN → MENIPIS → KRITIS.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Status persediaan berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardStockStatusResponse'
 *             example:
 *               response:
 *                 total_ingredients: 10
 *                 categories:
 *                   - status: "AMAN"
 *                     count: 5
 *                     percentage: 50
 *                   - status: "MENIPIS"
 *                     count: 3
 *                     percentage: 30
 *                   - status: "KRITIS"
 *                     count: 2
 *                     percentage: 20
 *               metaData:
 *                 message: "Berhasil mengambil status persediaan"
 *                 code: 200
 *                 response_code: "0000"
 *
 * /dashboard/recent-stock-movements:
 *   get:
 *     summary: Get 10 most recent stock movements for dashboard activity table
 *     description: |
 *       Mengambil 10 mutasi stok (stock movement) terbaru untuk tabel aktivitas di halaman dashboard.
 *
 *       Setiap baris menampilkan: waktu mutasi, nama bahan, tipe mutasi, jumlah yang bergerak, dan saldo stok setelah mutasi.
 *
 *       Endpoint ini tidak membutuhkan query parameter — selalu mengembalikan 10 mutasi terbaru secara real-time.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Mutasi stok terbaru berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardRecentStockMovementsResponse'
 *             example:
 *               response:
 *                 total_items: 3
 *                 items:
 *                   - stock_movement_id: "sm-uuid-001"
 *                     created_at: "2024-06-15T08:30:00.000Z"
 *                     ingredient_name: "Tepung Terigu"
 *                     stock_type_name: "IN_PURCHASE"
 *                     qty: 50
 *                     current_stock: 150
 *                   - stock_movement_id: "sm-uuid-002"
 *                     created_at: "2024-06-15T07:45:00.000Z"
 *                     ingredient_name: "Bawang Merah"
 *                     stock_type_name: "OUT_SALES"
 *                     qty: -2
 *                     current_stock: 48
 *                   - stock_movement_id: "sm-uuid-003"
 *                     created_at: "2024-06-15T07:30:00.000Z"
 *                     ingredient_name: "Minyak Goreng"
 *                     stock_type_name: "OUT_PRODUCTION"
 *                     qty: -5
 *                     current_stock: 20
 *               metaData:
 *                 message: "Berhasil mengambil mutasi stok terbaru"
 *                 code: 200
 *                 response_code: "0000"
 */
