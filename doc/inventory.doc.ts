/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Manajemen inventaris (Stock In/Out, Movement History)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StockInInput:
 *       type: object
 *       required:
 *         - ingredient_id
 *         - supplier_id
 *         - qty
 *         - unit_cost
 *       properties:
 *         ingredient_id:
 *           type: string
 *           format: uuid
 *         supplier_id:
 *           type: string
 *           format: uuid
 *         qty:
 *           type: number
 *           minimum: 0
 *           description: Jumlah barang masuk
 *           example: 100
 *         unit_cost:
 *           type: number
 *           minimum: 0
 *           description: Harga satuan beli
 *           example: 5000
 *         notes:
 *           type: string
 *           maxLength: 500
 *           nullable: true
 *
 *     StockOutInput:
 *       type: object
 *       required:
 *         - ingredient_id
 *         - qty
 *         - reason
 *       properties:
 *         ingredient_id:
 *           type: string
 *           format: uuid
 *         qty:
 *           type: number
 *           minimum: 0
 *           description: Jumlah barang keluar
 *           example: 5
 *         reason:
 *           type: string
 *           enum: [DAMAGED, EXPIRED, OTHER]
 *           description: Alasan pengeluaran stok
 *           example: "DAMAGED"
 *         notes:
 *           type: string
 *           maxLength: 500
 *           nullable: true
 *
 *     StockMovementData:
 *       type: object
 *       properties:
 *         stock_movement_id:
 *           type: string
 *           format: uuid
 *         supplier_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         ingredient_id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *         stock_type_id:
 *           type: string
 *           format: uuid
 *         qty:
 *           type: number
 *         unit_cost:
 *           type: number
 *           nullable: true
 *         current_stock:
 *           type: number
 *         notes:
 *           type: string
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         ingredient:
 *           type: object
 *           properties:
 *             ingredient_id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *             unit:
 *               type: object
 *               properties:
 *                 unit_measure_id:
 *                   type: string
 *                 name:
 *                   type: string
 *         supplier:
 *           type: object
 *           nullable: true
 *           properties:
 *             supplier_id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *         stock_type:
 *           type: object
 *           properties:
 *             stock_type_id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *         user:
 *           type: object
 *           properties:
 *             user_id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *
 *     StockMovementListResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             page:
 *               type: object
 *               properties:
 *                 total_record_count:
 *                   type: integer
 *                 batch_number:
 *                   type: integer
 *                 batch_size:
 *                   type: integer
 *                 max_batch_size:
 *                   type: integer
 *             records:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StockMovementData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil riwayat stok"
 */

/**
 * @swagger
 * /inventory/stock-types:
 *   get:
 *     summary: Get all stock types reference
 *     description: Mengambil daftar tipe stok untuk referensi (duplicate of /stock-type)
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Stock types retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/StockTypeData'
 *                 metaData:
 *                   $ref: '#/components/schemas/MetaData'
 *
 * /inventory/stock-in:
 *   post:
 *     summary: Stock IN (Purchase)
 *     description: Mencatat barang masuk dari supplier (Pembelian)
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StockInInput'
 *     responses:
 *       201:
 *         description: Stock IN recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/StockMovementData'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Stok masuk berhasil dicatat"
 *       400:
 *         description: Validation error
 *
 * /inventory/stock-out:
 *   post:
 *     summary: Stock OUT (Damaged/Expired)
 *     description: Mencatat barang keluar karena rusak, kadaluarsa, atau lainnya
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StockOutInput'
 *     responses:
 *       201:
 *         description: Stock OUT recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/StockMovementData'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Stok keluar berhasil dicatat"
 *       400:
 *         description: Validation error or insufficient stock
 *
 * /inventory:
 *   get:
 *     summary: Get all stock movements (history)
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: batch
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: ingredient_id
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: supplier_id
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: stock_type_id
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: date_from
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: date_to
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Stock movements retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StockMovementListResponse'
 *
 * /inventory/{stock_movement_id}:
 *   get:
 *     summary: Get stock movement detail
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: stock_movement_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Stock movement detail retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/StockMovementData'
 *       404:
 *         description: Stock movement not found
 *
 * /inventory/ingredient/{ingredient_id}:
 *   get:
 *     summary: Get stock stats by ingredient
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: ingredient_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Ingredient stock stats retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *                   properties:
 *                     ingredient_id:
 *                       type: string
 *                     ingredient_name:
 *                       type: string
 *                     current_stock:
 *                       type: number
 *                     total_in:
 *                       type: number
 *                     total_out:
 *                       type: number
 *                     last_movement_date:
 *                       type: string
 *                       format: date-time
 */
