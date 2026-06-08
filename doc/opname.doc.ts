/**
 * @swagger
 * tags:
 *   name: Stock Opname
 *   description: Manajemen stock opname (pengecekan stok fisik vs sistem)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OpnameItemInput:
 *       type: object
 *       required:
 *         - ingredient_id
 *         - physical_qty
 *       properties:
 *         ingredient_id:
 *           type: string
 *           format: uuid
 *         physical_qty:
 *           type: number
 *           minimum: 0
 *           description: Jumlah stok fisik hasil pengecekan
 *           example: 45
 *
 *     CreateOpnameInput:
 *       type: object
 *       required:
 *         - opname_date
 *         - items
 *       properties:
 *         opname_date:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *           description: Tanggal opname (YYYY-MM-DD)
 *           example: "2026-01-04"
 *         notes:
 *           type: string
 *           maxLength: 500
 *           example: "Opname bulanan Januari"
 *         items:
 *           type: array
 *           minItems: 1
 *           items:
 *             $ref: '#/components/schemas/OpnameItemInput'
 *
 *     UpdateOpnameInput:
 *       type: object
 *       properties:
 *         notes:
 *           type: string
 *           maxLength: 500
 *         items:
 *           type: array
 *           minItems: 1
 *           items:
 *             $ref: '#/components/schemas/OpnameItemInput'
 *
 *     ChangeStatusInput:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum: [COMPLETED, CANCELLED]
 *           description: Status baru (hanya COMPLETED atau CANCELLED)
 *           example: "COMPLETED"
 *
 *     OpnameItemWithDetails:
 *       type: object
 *       properties:
 *         stock_opname_item_id:
 *           type: string
 *           format: uuid
 *         ingredient_id:
 *           type: string
 *           format: uuid
 *         system_qty:
 *           type: number
 *           description: Stok di sistem
 *         physical_qty:
 *           type: number
 *           description: Stok fisik hasil opname
 *         difference:
 *           type: number
 *           description: Selisih (physical - system)
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
 *                   format: uuid
 *                 name:
 *                   type: string
 *
 *     OpnameData:
 *       type: object
 *       properties:
 *         stock_opname_id:
 *           type: string
 *           format: uuid
 *         opname_date:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [DRAFT, COMPLETED, APPLIED, CANCELLED]
 *         notes:
 *           type: string
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         user:
 *           type: object
 *           properties:
 *             user_id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *         _count:
 *           type: object
 *           properties:
 *             items:
 *               type: integer
 *
 *     OpnameWithDetails:
 *       allOf:
 *         - $ref: '#/components/schemas/OpnameData'
 *         - type: object
 *           properties:
 *             items:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OpnameItemWithDetails'
 *
 *     OpnameListResponse:
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
 *                 $ref: '#/components/schemas/OpnameData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data stock opname"
 *
 *     IngredientForOpname:
 *       type: object
 *       properties:
 *         ingredient_id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         stock_qty:
 *           type: number
 *         unit:
 *           type: object
 *           properties:
 *             unit_measure_id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 */

/**
 * @swagger
 * /opname/ingredients:
 *   get:
 *     summary: Get all ingredients for opname form
 *     description: Mengambil daftar bahan dengan stok saat ini untuk form opname
 *     tags: [Stock Opname]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Ingredients retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/IngredientForOpname'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Berhasil mengambil daftar bahan"
 *
 * /opname:
 *   get:
 *     summary: Get all stock opnames
 *     tags: [Stock Opname]
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
 *           maximum: 100
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [DRAFT, COMPLETED, APPLIED, CANCELLED]
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}$'
 *     responses:
 *       200:
 *         description: Stock opnames retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OpnameListResponse'
 *
 *   post:
 *     summary: Create new stock opname
 *     description: Membuat opname baru dengan status DRAFT
 *     tags: [Stock Opname]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOpnameInput'
 *     responses:
 *       201:
 *         description: Stock opname created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/OpnameWithDetails'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Stock opname berhasil dibuat"
 *       400:
 *         description: Validation error
 *
 * /opname/{stock_opname_id}:
 *   get:
 *     summary: Get stock opname detail
 *     tags: [Stock Opname]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: stock_opname_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Stock opname detail retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/OpnameWithDetails'
 *       404:
 *         description: Stock opname not found
 *
 *   patch:
 *     summary: Update stock opname
 *     description: Update notes atau items (hanya untuk status DRAFT)
 *     tags: [Stock Opname]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: stock_opname_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOpnameInput'
 *     responses:
 *       200:
 *         description: Stock opname updated successfully
 *       400:
 *         description: Cannot update, opname is not in DRAFT status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                 message: "Hanya opname dengan status DRAFT yang bisa diubah"
 *                 code: 400
 *                 response_code: "400"
 *       404:
 *         description: Stock opname not found
 *
 *   delete:
 *     summary: Soft delete stock opname
 *     tags: [Stock Opname]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: stock_opname_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Stock opname deleted successfully
 *       404:
 *         description: Stock opname not found
 *
 * /opname/{stock_opname_id}/status:
 *   patch:
 *     summary: Change stock opname status
 *     description: Ubah status ke COMPLETED atau CANCELLED (dari DRAFT)
 *     tags: [Stock Opname]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: stock_opname_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangeStatusInput'
 *     responses:
 *       200:
 *         description: Status changed successfully
 *       400:
 *         description: Invalid status transition
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /opname/{stock_opname_id}/apply:
 *   post:
 *     summary: Apply adjustment to stock
 *     description: Aplikasikan selisih opname ke stok (mengubah status ke APPLIED)
 *     tags: [Stock Opname]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: stock_opname_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Adjustment applied successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: "Penyesuaian stok berhasil diaplikasikan"
 *                     adjustments_count:
 *                       type: integer
 *                       example: 5
 *       400:
 *         description: Cannot apply, opname status is not COMPLETED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                 message: "Hanya opname dengan status COMPLETED yang bisa diaplikasikan"
 *                 code: 400
 *                 response_code: "400"
 *       404:
 *         description: Stock opname not found
 */
