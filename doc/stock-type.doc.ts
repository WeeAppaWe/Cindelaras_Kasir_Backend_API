/**
 * @swagger
 * tags:
 *   name: Stock Type
 *   description: Manajemen tipe stok (Masuk/Keluar/Penyesuaian)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StockTypeData:
 *       type: object
 *       properties:
 *         stock_type_id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           enum: [IN_PURCHASE, IN_PRODUCTION, OUT_SALES, OUT_PRODUCTION, OUT_DAMAGED, OUT_EXPIRED, ADJUSTMENT_OPNAME]
 *           description: Nama tipe stok
 *           example: "IN_PURCHASE"
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *
 *     StockTypeListResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/StockTypeData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data stock type"
 */

/**
 * @swagger
 * /stock-type:
 *   get:
 *     summary: Get all stock types
 *     description: Mengambil semua jenis tipe stok
 *     tags: [Stock Type]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Stock types retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StockTypeListResponse'
 *
 * /stock-type/{stock_type_id}:
 *   get:
 *     summary: Get stock type detail
 *     tags: [Stock Type]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: stock_type_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Stock type detail retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/StockTypeData'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Berhasil mengambil detail stock type"
 *       404:
 *         description: Stock type not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
