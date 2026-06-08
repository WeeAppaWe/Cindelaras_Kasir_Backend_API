/**
 * @swagger
 * tags:
 *   name: SPK
 *   description: Sistem Pendukung Keputusan (Smart Purchasing)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SPKConfig:
 *       type: object
 *       properties:
 *         target_days:
 *           type: integer
 *           description: Target hari stok aman
 *           default: 7
 *         buffer_percent:
 *           type: number
 *           description: Buffer keamanan dalam %
 *           default: 10
 *         lookback_days:
 *           type: integer
 *           description: Hari ke belakang untuk analisa
 *           default: 30
 *         ingredient_type:
 *           type: string
 *           enum: [raw, semi, all]
 *           default: all
 *         supplier_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *
 *     DailyUsage:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *         qty:
 *           type: number
 *
 *     IngredientForecast:
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
 *         daily_usages:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DailyUsage'
 *         wma_daily_average:
 *           type: number
 *
 *     EnrichedOrderItem:
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
 *         wma_daily_average:
 *           type: number
 *         current_stock:
 *           type: number
 *         min_stock:
 *           type: number
 *         suggested_qty:
 *           type: number
 *         avg_cost:
 *           type: number
 *         estimated_cost:
 *           type: number
 *         supplier_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         supplier_name:
 *           type: string
 *           nullable: true
 *
 *     SupplierOrderItem:
 *       type: object
 *       properties:
 *         ingredient_id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         unit:
 *           type: string
 *         suggested_qty:
 *           type: number
 *         unit_price:
 *           type: number
 *         estimated_cost:
 *           type: number
 *
 *     SupplierGroup:
 *       type: object
 *       properties:
 *         supplier_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         supplier_name:
 *           type: string
 *         contact:
 *           type: string
 *           nullable: true
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SupplierOrderItem'
 *         total_items:
 *           type: integer
 *         total_estimated_cost:
 *           type: number
 *
 *     SPKAnalysisResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             config:
 *               $ref: '#/components/schemas/SPKConfig'
 *             analysis_date:
 *               type: string
 *               format: date-time
 *             lookback_period:
 *               type: object
 *               properties:
 *                 start_date:
 *                   type: string
 *                   format: date
 *                 end_date:
 *                   type: string
 *                   format: date
 *             summary:
 *               type: object
 *               properties:
 *                 total_ingredients_analyzed:
 *                   type: integer
 *                 total_needing_restock:
 *                   type: integer
 *                 total_estimated_cost:
 *                   type: number
 *                 total_suppliers:
 *                   type: integer
 *             by_supplier:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SupplierGroup'
 *             all_items:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EnrichedOrderItem'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Analisa SPK berhasil dijalankan"
 */

/**
 * @swagger
 * /spk/analysis:
 *   get:
 *     summary: Run SPK analysis (Smart Purchasing)
 *     description: Menjalankan analisa kebutuhan stok menggunakan metode WMA (Weighted Moving Average)
 *     tags: [SPK]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: target_days
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 90
 *           default: 7
 *         description: Target hari stok aman
 *       - in: query
 *         name: buffer_percent
 *         schema:
 *           type: integer
 *           minimum: 0
 *           maximum: 100
 *           default: 10
 *         description: Buffer keamanan stok (%)
 *       - in: query
 *         name: lookback_days
 *         schema:
 *           type: integer
 *           minimum: 7
 *           maximum: 90
 *           default: 30
 *         description: Hari ke belakang untuk analisa tren
 *       - in: query
 *         name: ingredient_type
 *         schema:
 *           type: string
 *           enum: [raw, semi, all]
 *           default: all
 *       - in: query
 *         name: supplier_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter analisa untuk supplier tertentu
 *     responses:
 *       200:
 *         description: SPK analysis successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SPKAnalysisResponse'
 *       400:
 *         description: Validation error
 */
