/**
 * @swagger
 * tags:
 *   name: Report Inventory
 *   description: Laporan inventaris (Stok, Pergerakan, Valuasi, Opname, Kartu Stok)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CurrentStockItem:
 *       type: object
 *       properties:
 *         ingredient_id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         unit:
 *           type: string
 *         current_stock:
 *           type: number
 *         min_stock:
 *           type: number
 *         avg_cost:
 *           type: number
 *         stock_value:
 *           type: number
 *         status:
 *           type: string
 *           enum: [NORMAL, LOW, OUT]
 *
 *     CurrentStockResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             total_items:
 *               type: integer
 *             total_value:
 *               type: number
 *             low_stock_count:
 *               type: integer
 *             out_of_stock_count:
 *               type: integer
 *             items:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CurrentStockItem'
 *         metaData:
 *           $ref: '#/components/schemas/MetaData'
 *
 *     MovementByType:
 *       type: object
 *       properties:
 *         stock_type:
 *           type: string
 *         stock_type_name:
 *           type: string
 *         qty:
 *           type: number
 *         value:
 *           type: number
 *         transaction_count:
 *           type: integer
 *
 *     StockMovementSummaryResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             period:
 *               $ref: '#/components/schemas/ReportPeriod'
 *             total_in:
 *               type: object
 *               properties:
 *                 qty:
 *                   type: number
 *                 value:
 *                   type: number
 *                 by_type:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MovementByType'
 *             total_out:
 *               type: object
 *               properties:
 *                 qty:
 *                   type: number
 *                 value:
 *                   type: number
 *                 by_type:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MovementByType'
 *             adjustments:
 *               type: object
 *               properties:
 *                 qty:
 *                   type: number
 *                 value:
 *                   type: number
 *                 by_type:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MovementByType'
 *             shrinkage:
 *               type: object
 *               properties:
 *                 damaged_qty:
 *                   type: number
 *                 damaged_value:
 *                   type: number
 *                 expired_qty:
 *                   type: number
 *                 expired_value:
 *                   type: number
 *                 total_value:
 *                   type: number
 *         metaData:
 *           $ref: '#/components/schemas/MetaData'
 *
 *     StockAlertItem:
 *       type: object
 *       properties:
 *         ingredient_id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         unit:
 *           type: string
 *         current_stock:
 *           type: number
 *         min_stock:
 *           type: number
 *         shortage:
 *           type: number
 *         status:
 *           type: string
 *           enum: [LOW, OUT]
 *         last_restock_date:
 *           type: string
 *           format: date-time
 *           nullable: true
 *
 *     StockAlertsResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             total_alerts:
 *               type: integer
 *             low_stock_items:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StockAlertItem'
 *             out_of_stock_items:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StockAlertItem'
 *         metaData:
 *           $ref: '#/components/schemas/MetaData'
 *
 *     ValuationByType:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *         item_count:
 *           type: integer
 *         total_qty:
 *           type: number
 *         total_value:
 *           type: number
 *         percentage:
 *           type: number
 *
 *     InventoryValuationResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             total_items:
 *               type: integer
 *             total_value:
 *               type: number
 *             by_ingredient_type:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ValuationByType'
 *             top_value_items:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CurrentStockItem'
 *         metaData:
 *           $ref: '#/components/schemas/MetaData'
 *
 *     OpnameHistoryItem:
 *       type: object
 *       properties:
 *         stock_opname_id:
 *           type: string
 *           format: uuid
 *         opname_date:
 *           type: string
 *           format: date-time
 *         user:
 *           type: object
 *           properties:
 *             user_id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *         status:
 *           type: string
 *         total_items:
 *           type: integer
 *         total_difference:
 *           type: number
 *         notes:
 *           type: string
 *           nullable: true
 *
 *     OpnameHistoryResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             period:
 *               $ref: '#/components/schemas/ReportPeriod'
 *             total_opnames:
 *               type: integer
 *             opnames:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OpnameHistoryItem'
 *         metaData:
 *           $ref: '#/components/schemas/MetaData'
 *
 *     MovementCardItem:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *         stock_type:
 *           type: string
 *         description:
 *           type: string
 *         in_qty:
 *           type: number
 *           nullable: true
 *         out_qty:
 *           type: number
 *           nullable: true
 *         balance:
 *           type: number
 *         unit_cost:
 *           type: number
 *           nullable: true
 *         user:
 *           type: string
 *
 *     IngredientMovementCardResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             ingredient:
 *               type: object
 *               properties:
 *                 ingredient_id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                 type:
 *                   type: string
 *                 unit:
 *                   type: string
 *             period:
 *               $ref: '#/components/schemas/ReportPeriod'
 *             opening_balance:
 *               type: number
 *             closing_balance:
 *               type: number
 *             total_in:
 *               type: number
 *             total_out:
 *               type: number
 *             movements:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MovementCardItem'
 *         metaData:
 *           $ref: '#/components/schemas/MetaData'
 *
 *     FullInventoryReportResponse:
 *       type: object
 *       description: Laporan persediaan lengkap — kondisi stok seluruh bahan baku saat ini
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             total_items:
 *               type: integer
 *               description: Jumlah total bahan yang tampil
 *             total_value:
 *               type: number
 *               description: Total nilai seluruh aset stok (Rp)
 *             low_stock_count:
 *               type: integer
 *               description: Jumlah bahan dengan status LOW (menipis)
 *             out_of_stock_count:
 *               type: integer
 *               description: Jumlah bahan dengan status OUT (habis)
 *             items:
 *               type: array
 *               description: Detail per bahan, diurutkan ascending berdasarkan nama
 *               items:
 *                 $ref: '#/components/schemas/CurrentStockItem'
 *         metaData:
 *           $ref: '#/components/schemas/MetaData'
 */

/**
 * @swagger
 * /report/inventory:
 *   get:
 *     summary: Get full inventory report
 *     tags: [Report Inventory]
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
 *         name: ingredient_type
 *         schema:
 *           type: string
 *           enum: [raw, semi]
 *     responses:
 *       200:
 *         description: Full inventory report retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FullInventoryReportResponse'
 *
 * /report/inventory/current:
 *   get:
 *     summary: Get current stock
 *     tags: [Report Inventory]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: ingredient_type
 *         schema:
 *           type: string
 *           enum: [raw, semi]
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [all, low, out]
 *           default: all
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *     responses:
 *       200:
 *         description: Current stock retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CurrentStockResponse'
 *
 * /report/inventory/movement:
 *   get:
 *     summary: Get stock movement summary
 *     tags: [Report Inventory]
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
 *         name: ingredient_type
 *         schema:
 *           type: string
 *           enum: [raw, semi]
 *       - in: query
 *         name: supplier_id
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Movement summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StockMovementSummaryResponse'
 *
 * /report/inventory/alerts:
 *   get:
 *     summary: Get stock alerts (low/out of stock)
 *     tags: [Report Inventory]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Stock alerts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StockAlertsResponse'
 *
 * /report/inventory/valuation:
 *   get:
 *     summary: Get inventory valuation
 *     tags: [Report Inventory]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Inventory valuation retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryValuationResponse'
 *
 * /report/inventory/opname:
 *   get:
 *     summary: Get stock opname history
 *     tags: [Report Inventory]
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
 *         description: Opname history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OpnameHistoryResponse'
 *
 * /report/inventory/card:
 *   get:
 *     summary: Get ingredient movement card (Kartu Stok)
 *     tags: [Report Inventory]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: ingredient_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
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
 *         description: Ingredient movement card retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IngredientMovementCardResponse'
 */
