/**
 * @swagger
 * tags:
 *   name: Cash Movement
 *   description: Manajemen mutasi kas (penyesuaian kas masuk/keluar pada shift)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCashMovementInput:
 *       type: object
 *       required:
 *         - type
 *         - amount
 *       properties:
 *         type:
 *           type: string
 *           enum: [IN, OUT]
 *           description: Tipe mutasi (IN = kas masuk, OUT = kas keluar)
 *           example: "IN"
 *         amount:
 *           type: number
 *           minimum: 1
 *           description: Jumlah nominal mutasi
 *           example: 100000
 *         note:
 *           type: string
 *           maxLength: 255
 *           description: Catatan/keterangan mutasi
 *           example: "Penambahan modal awal"
 *
 *     CashMovementData:
 *       type: object
 *       properties:
 *         cash_movement_id:
 *           type: string
 *           format: uuid
 *         shift_id:
 *           type: string
 *           format: uuid
 *         type:
 *           type: string
 *           enum: [IN, OUT]
 *         amount:
 *           type: number
 *           example: 100000
 *         note:
 *           type: string
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         shift:
 *           type: object
 *           properties:
 *             shift_id:
 *               type: string
 *               format: uuid
 *             start_time:
 *               type: string
 *               format: date-time
 *             end_time:
 *               type: string
 *               format: date-time
 *               nullable: true
 *
 *     CashMovementSummary:
 *       type: object
 *       properties:
 *         total_in:
 *           type: number
 *           description: Total kas masuk
 *           example: 500000
 *         total_out:
 *           type: number
 *           description: Total kas keluar
 *           example: 200000
 *         net_amount:
 *           type: number
 *           description: Selisih bersih (total_in - total_out)
 *           example: 300000
 *
 *     CashMovementListResponse:
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
 *                 $ref: '#/components/schemas/CashMovementData'
 *             summary:
 *               $ref: '#/components/schemas/CashMovementSummary'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data mutasi kas"
 *
 *     CashMovementDetailResponse:
 *       type: object
 *       properties:
 *         response:
 *           $ref: '#/components/schemas/CashMovementData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil detail mutasi kas"
 *
 *     CashMovementCreateResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: "Mutasi kas berhasil dicatat"
 *             cash_movement:
 *               $ref: '#/components/schemas/CashMovementData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Mutasi kas berhasil dicatat"
 *                 code:
 *                   example: 201
 */

/**
 * @swagger
 * /cash-movement:
 *   get:
 *     summary: Get all cash movements
 *     description: Mengambil daftar mutasi kas dengan pagination dan filter
 *     tags: [Cash Movement]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: batch
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Nomor halaman
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *           maximum: 100
 *         description: Jumlah data per halaman
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [IN, OUT]
 *         description: Filter berdasarkan tipe mutasi
 *       - in: query
 *         name: shift_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter berdasarkan shift
 *     responses:
 *       200:
 *         description: Cash movements retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CashMovementListResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   post:
 *     summary: Create new cash movement
 *     description: Mencatat mutasi kas baru (hanya bisa dilakukan saat shift aktif)
 *     tags: [Cash Movement]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCashMovementInput'
 *     responses:
 *       201:
 *         description: Cash movement created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CashMovementCreateResponse'
 *       400:
 *         description: Validation error atau shift tidak aktif
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               NoActiveShift:
 *                 summary: Tidak ada shift aktif
 *                 value:
 *                   response: []
 *                   metaData:
 *                     message: "Tidak ada shift aktif. Silakan buka shift terlebih dahulu"
 *                     code: 400
 *                     response_code: "400"
 *               InvalidType:
 *                 summary: Tipe mutasi tidak valid
 *                 value:
 *                   response:
 *                     - location: "body"
 *                       field: "type"
 *                       message: "Tipe mutasi harus IN atau OUT"
 *                   metaData:
 *                     message: "Tipe mutasi harus IN atau OUT"
 *                     code: 400
 *                     response_code: "400"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /cash-movement/{cash_movement_id}:
 *   get:
 *     summary: Get cash movement detail
 *     description: Mengambil detail mutasi kas berdasarkan ID
 *     tags: [Cash Movement]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: cash_movement_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID mutasi kas
 *     responses:
 *       200:
 *         description: Cash movement detail retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CashMovementDetailResponse'
 *       404:
 *         description: Cash movement not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                 message: "Mutasi kas tidak ditemukan"
 *                 code: 404
 *                 response_code: "404"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
