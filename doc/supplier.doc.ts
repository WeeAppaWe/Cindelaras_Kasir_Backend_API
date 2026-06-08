/**
 * @swagger
 * tags:
 *   name: Supplier
 *   description: Manajemen data supplier/pemasok
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateSupplierInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: "PT Sumber Makmur"
 *         phone:
 *           type: string
 *           maxLength: 20
 *           nullable: true
 *           example: "021-12345678"
 *         address:
 *           type: string
 *           maxLength: 500
 *           nullable: true
 *           example: "Jl. Raya Industri No. 123, Jakarta"
 *
 *     UpdateSupplierInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *         phone:
 *           type: string
 *           maxLength: 20
 *           nullable: true
 *         address:
 *           type: string
 *           maxLength: 500
 *           nullable: true
 *
 *     SupplierData:
 *       type: object
 *       properties:
 *         supplier_id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         phone:
 *           type: string
 *           nullable: true
 *         address:
 *           type: string
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         _count:
 *           type: object
 *           properties:
 *             stock_movements:
 *               type: integer
 *               description: Jumlah transaksi stok dengan supplier ini
 *
 *     SupplierListResponse:
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
 *                 $ref: '#/components/schemas/SupplierData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data supplier"
 */

/**
 * @swagger
 * /supplier:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Supplier]
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
 *         description: Search by supplier name
 *     responses:
 *       200:
 *         description: Suppliers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SupplierListResponse'
 *
 *   post:
 *     summary: Create new supplier
 *     tags: [Supplier]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSupplierInput'
 *     responses:
 *       201:
 *         description: Supplier created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/SupplierData'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Supplier berhasil dibuat"
 *       400:
 *         description: Validation error
 *
 * /supplier/{supplier_id}:
 *   get:
 *     summary: Get supplier detail
 *     tags: [Supplier]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: supplier_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Supplier detail retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/SupplierData'
 *       404:
 *         description: Supplier not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                 message: "Supplier tidak ditemukan"
 *                 code: 404
 *                 response_code: "404"
 *
 *   patch:
 *     summary: Update supplier
 *     tags: [Supplier]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: supplier_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSupplierInput'
 *     responses:
 *       200:
 *         description: Supplier updated successfully
 *       404:
 *         description: Supplier not found
 *
 *   delete:
 *     summary: Soft delete supplier
 *     tags: [Supplier]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: supplier_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Supplier deleted successfully
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
 *                       example: "Supplier berhasil dihapus"
 *       404:
 *         description: Supplier not found
 */
