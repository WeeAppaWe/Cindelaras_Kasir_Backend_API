/**
 * @swagger
 * tags:
 *   name: Report Operational
 *   description: Laporan operasional (Kinerja Kasir, Shift, Transaksi, Performa Menu)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CashierPerformanceItem:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         total_shifts:
 *           type: integer
 *         total_transactions:
 *           type: integer
 *         total_sales:
 *           type: number
 *         average_per_transaction:
 *           type: number
 *         cancelled_orders:
 *           type: integer
 *         cancellation_rate:
 *           type: number
 *           format: float
 *           description: Persentase pembatalan (0-100)
 *
 *     CashierPerformanceResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             period:
 *               $ref: '#/components/schemas/ReportPeriod'
 *             total_cashiers:
 *               type: integer
 *             cashiers:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CashierPerformanceItem'
 *         metaData:
 *           $ref: '#/components/schemas/MetaData'
 *
 *     ShiftSummaryItem:
 *       type: object
 *       properties:
 *         shift_id:
 *           type: string
 *           format: uuid
 *         user:
 *           type: object
 *           properties:
 *             user_id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *         date:
 *           type: string
 *           format: date
 *         start_time:
 *           type: string
 *           format: time
 *         end_time:
 *           type: string
 *           format: time
 *           nullable: true
 *         duration_minutes:
 *           type: number
 *           nullable: true
 *         start_cash:
 *           type: number
 *         end_cash:
 *           type: number
 *           nullable: true
 *         sold_total:
 *           type: number
 *           nullable: true
 *         cash_difference:
 *           type: number
 *           nullable: true
 *         transaction_count:
 *           type: integer
 *         status:
 *           type: string
 *           enum: [ACTIVE, CLOSED]
 *
 *     ShiftSummaryResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             period:
 *               $ref: '#/components/schemas/ReportPeriod'
 *             total_shifts:
 *               type: integer
 *             active_shifts:
 *               type: integer
 *             closed_shifts:
 *               type: integer
 *             shifts:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShiftSummaryItem'
 *         metaData:
 *           $ref: '#/components/schemas/MetaData'
 *
 *     HourlyStats:
 *       type: object
 *       properties:
 *         hour:
 *           type: integer
 *           description: Jam (0-23)
 *         transaction_count:
 *           type: integer
 *         total_sales:
 *           type: number
 *
 *     DailyStats:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *         day_name:
 *           type: string
 *         transaction_count:
 *           type: integer
 *         total_sales:
 *           type: number
 *
 *     TransactionStatsResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             period:
 *               $ref: '#/components/schemas/ReportPeriod'
 *             total_transactions:
 *               type: integer
 *             total_sales:
 *               type: number
 *             average_per_transaction:
 *               type: number
 *             peak_hour:
 *               type: integer
 *             busiest_day:
 *               type: string
 *             hourly_breakdown:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HourlyStats'
 *             daily_breakdown:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DailyStats'
 *         metaData:
 *           $ref: '#/components/schemas/MetaData'
 *
 *     MenuPerformanceItem:
 *       type: object
 *       properties:
 *         menu_id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         category:
 *           type: string
 *         qty_sold:
 *           type: integer
 *         revenue:
 *           type: number
 *         cost:
 *           type: number
 *         profit:
 *           type: number
 *         margin_percentage:
 *           type: number
 *
 *     MenuPerformanceResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             period:
 *               $ref: '#/components/schemas/ReportPeriod'
 *             total_menus_sold:
 *               type: integer
 *             total_revenue:
 *               type: number
 *             total_profit:
 *               type: number
 *             menus:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuPerformanceItem'
 *         metaData:
 *           $ref: '#/components/schemas/MetaData'
 *
 *     OrderStatusItem:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [PENDING, COMPLETED, CANCELLED]
 *         count:
 *           type: integer
 *         percentage:
 *           type: number
 *
 *     OrderStatusResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             period:
 *               $ref: '#/components/schemas/ReportPeriod'
 *             total_orders:
 *               type: integer
 *             by_status:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderStatusItem'
 *         metaData:
 *           $ref: '#/components/schemas/MetaData'
 *
 *     FullOperationalReportResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             period:
 *               $ref: '#/components/schemas/ReportPeriod'
 *             cashier_summary:
 *               type: object
 *               properties:
 *                 total_cashiers:
 *                   type: integer
 *                 top_performer:
 *                   $ref: '#/components/schemas/CashierPerformanceItem'
 *             shift_summary:
 *               type: object
 *               properties:
 *                 total_shifts:
 *                   type: integer
 *                 active_shifts:
 *                   type: integer
 *                 closed_shifts:
 *                   type: integer
 *             transaction_stats:
 *               type: object
 *               properties:
 *                 total_transactions:
 *                   type: integer
 *                 total_sales:
 *                   type: number
 *                 average_per_transaction:
 *                   type: number
 *                 peak_hour:
 *                   type: integer
 *                 busiest_day:
 *                   type: string
 *             order_status:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderStatusItem'
 *             top_menus:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuPerformanceItem'
 *         metaData:
 *           $ref: '#/components/schemas/MetaData'
 */

/**
 * @swagger
 * /report/operational:
 *   get:
 *     summary: Get full operational report
 *     description: Mengambil laporan operasional lengkap (Kinerja Kasir, Shift, Transaksi, Status Order, Top Menu)
 *     tags: [Report Operational]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: start_date
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *       - in: query
 *         name: end_date
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *       - in: query
 *         name: shift_id
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Full operational report retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FullOperationalReportResponse'
 *
 * /report/operational/cashier:
 *   get:
 *     summary: Get cashier performance
 *     tags: [Report Operational]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: start_date
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *       - in: query
 *         name: end_date
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *     responses:
 *       200:
 *         description: Cashier performance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CashierPerformanceResponse'
 *
 * /report/operational/shift:
 *   get:
 *     summary: Get shift summary
 *     tags: [Report Operational]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: start_date
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *       - in: query
 *         name: end_date
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Shift summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShiftSummaryResponse'
 *
 * /report/operational/transactions:
 *   get:
 *     summary: Get transaction statistics (hourly & daily)
 *     tags: [Report Operational]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: start_date
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *       - in: query
 *         name: end_date
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *       - in: query
 *         name: shift_id
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Transaction stats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionStatsResponse'
 *
 * /report/operational/menu:
 *   get:
 *     summary: Get menu performance (profitability)
 *     tags: [Report Operational]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: start_date
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *       - in: query
 *         name: end_date
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           maximum: 100
 *     responses:
 *       200:
 *         description: Menu performance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuPerformanceResponse'
 *
 * /report/operational/order-status:
 *   get:
 *     summary: Get order status summary
 *     tags: [Report Operational]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: start_date
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *       - in: query
 *         name: end_date
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *     responses:
 *       200:
 *         description: Order status summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderStatusResponse'
 */
