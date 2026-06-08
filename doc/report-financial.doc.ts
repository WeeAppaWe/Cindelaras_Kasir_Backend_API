/**
 * @swagger
 * tags:
 *   name: Report Financial
 *   description: Laporan keuangan (Revenue, Cash Flow, Top Sales)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReportPeriod:
 *       type: object
 *       properties:
 *         start_date:
 *           type: string
 *           format: date
 *         end_date:
 *           type: string
 *           format: date
 *
 *     RevenueSummary:
 *       type: object
 *       properties:
 *         total_sales:
 *           type: number
 *         total_cogs:
 *           type: number
 *         gross_profit:
 *           type: number
 *         margin_percentage:
 *           type: number
 *
 *     FinancialSummaryResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             period:
 *               $ref: '#/components/schemas/ReportPeriod'
 *             revenue:
 *               $ref: '#/components/schemas/RevenueSummary'
 *             transaction_count:
 *               type: integer
 *             average_transaction_value:
 *               type: number
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil ringkasan laporan"
 *
 *     PaymentTypeDetail:
 *       type: object
 *       properties:
 *         payment_type:
 *           type: string
 *           enum: [CASH, QRIS]
 *         transaction_count:
 *           type: integer
 *         total_amount:
 *           type: number
 *         percentage:
 *           type: number
 *
 *     PaymentBreakdownResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             period:
 *               $ref: '#/components/schemas/ReportPeriod'
 *             total_transactions:
 *               type: integer
 *             total_amount:
 *               type: number
 *             by_payment_type:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PaymentTypeDetail'
 *         metaData:
 *           $ref: '#/components/schemas/MetaData'
 *
 *     CashFlowResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             period:
 *               $ref: '#/components/schemas/ReportPeriod'
 *             opening_cash:
 *               type: number
 *             cash_in:
 *               type: object
 *               properties:
 *                 from_sales:
 *                   type: number
 *                 adjustments:
 *                   type: number
 *                 total:
 *                   type: number
 *             cash_out:
 *               type: object
 *               properties:
 *                 adjustments:
 *                   type: number
 *                 total:
 *                   type: number
 *             closing_cash:
 *               type: number
 *             expected_cash:
 *               type: number
 *             difference:
 *               type: number
 *         metaData:
 *           $ref: '#/components/schemas/MetaData'
 *
 *     TopMenuItem:
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
 *         percentage_of_total:
 *           type: number
 *
 *     TopMenusResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             period:
 *               $ref: '#/components/schemas/ReportPeriod'
 *             total_revenue:
 *               type: number
 *             top_menus:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TopMenuItem'
 *         metaData:
 *           $ref: '#/components/schemas/MetaData'
 *
 *     SalesByCategoryItem:
 *       type: object
 *       properties:
 *         category_id:
 *           type: string
 *           format: uuid
 *         category_name:
 *           type: string
 *         qty_sold:
 *           type: integer
 *         revenue:
 *           type: number
 *         percentage:
 *           type: number
 *
 *     SalesByCategoryResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             period:
 *               $ref: '#/components/schemas/ReportPeriod'
 *             total_revenue:
 *               type: number
 *             by_category:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SalesByCategoryItem'
 *         metaData:
 *           $ref: '#/components/schemas/MetaData'
 *
 *     FullFinancialReportResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             period:
 *               $ref: '#/components/schemas/ReportPeriod'
 *             summary:
 *               type: object
 *               properties:
 *                 revenue:
 *                   $ref: '#/components/schemas/RevenueSummary'
 *                 transaction_count:
 *                   type: integer
 *                 average_transaction_value:
 *                   type: number
 *             payment_breakdown:
 *               type: object
 *               properties:
 *                 total_transactions:
 *                   type: integer
 *                 total_amount:
 *                   type: number
 *                 by_payment_type:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PaymentTypeDetail'
 *             cash_flow:
 *               type: object
 *               properties:
 *                 opening_cash:
 *                   type: number
 *                 cash_in:
 *                   type: object
 *                   properties:
 *                     from_sales:
 *                       type: number
 *                     adjustments:
 *                       type: number
 *                     total:
 *                       type: number
 *                 cash_out:
 *                   type: object
 *                   properties:
 *                     adjustments:
 *                       type: number
 *                     total:
 *                       type: number
 *                 closing_cash:
 *                   type: number
 *                 expected_cash:
 *                   type: number
 *                 difference:
 *                   type: number
 *             top_menus:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TopMenuItem'
 *             sales_by_category:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SalesByCategoryItem'
 *         metaData:
 *           $ref: '#/components/schemas/MetaData'
 */

/**
 * @swagger
 * /report/financial:
 *   get:
 *     summary: Get full financial report
 *     description: Mengambil laporan keuangan lengkap (Ringkasan, Pembayaran, Arus Kas, Top Menu, Kategori)
 *     tags: [Report Financial]
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
 *         description: Full report retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FullFinancialReportResponse'
 *
 * /report/financial/summary:
 *   get:
 *     summary: Get revenue summary
 *     tags: [Report Financial]
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
 *         description: Revenue summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FinancialSummaryResponse'
 *
 * /report/financial/payment:
 *   get:
 *     summary: Get payment breakdown
 *     tags: [Report Financial]
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
 *         description: Payment breakdown retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentBreakdownResponse'
 *
 * /report/financial/cash-flow:
 *   get:
 *     summary: Get cash flow report
 *     tags: [Report Financial]
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
 *         description: Cash flow report retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CashFlowResponse'
 *
 * /report/financial/top-menus:
 *   get:
 *     summary: Get top selling menus
 *     tags: [Report Financial]
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
 *           default: 10
 *           maximum: 50
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
 *         description: Top menus retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TopMenusResponse'
 *
 * /report/financial/by-category:
 *   get:
 *     summary: Get sales by category
 *     tags: [Report Financial]
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
 *         description: Sales by category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SalesByCategoryResponse'
 */
