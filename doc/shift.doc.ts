/**
 * @swagger
 * tags:
 *   name: Shift
 *   description: Manajemen shift kasir (buka/tutup kas)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StartShiftInput:
 *       type: object
 *       required:
 *         - start_cash
 *       properties:
 *         start_cash:
 *           type: number
 *           minimum: 0
 *           maximum: 100000000
 *           description: Modal awal kas
 *           example: 500000
 *
 *     EndShiftInput:
 *       type: object
 *       required:
 *         - end_cash
 *       properties:
 *         end_cash:
 *           type: number
 *           minimum: 0
 *           maximum: 100000000
 *           description: Kas akhir setelah dihitung
 *           example: 1500000
 *         notes:
 *           type: string
 *           maxLength: 500
 *           description: Catatan akhir shift
 *           example: "Shift berjalan lancar"
 *
 *     ShiftData:
 *       type: object
 *       properties:
 *         shift_id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *         start_cash:
 *           type: number
 *           example: 500000
 *         end_cash:
 *           type: number
 *           nullable: true
 *         sold_total:
 *           type: number
 *           nullable: true
 *         start_time:
 *           type: string
 *           format: date-time
 *         end_time:
 *           type: string
 *           format: date-time
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
 *             orders:
 *               type: integer
 *
 *     ShiftSummary:
 *       type: object
 *       properties:
 *         shift_id:
 *           type: string
 *           format: uuid
 *         user_name:
 *           type: string
 *         start_time:
 *           type: string
 *           format: date-time
 *         end_time:
 *           type: string
 *           format: date-time
 *         start_cash:
 *           type: number
 *           example: 500000
 *         end_cash:
 *           type: number
 *           example: 1500000
 *         sold_total:
 *           type: number
 *           example: 1200000
 *         expected_cash:
 *           type: number
 *           description: start_cash + cash_sales
 *           example: 1600000
 *         difference:
 *           type: number
 *           description: end_cash - expected_cash (selisih kas)
 *           example: -100000
 *         total_orders:
 *           type: integer
 *           example: 25
 *         completed_orders:
 *           type: integer
 *           example: 23
 *         cancelled_orders:
 *           type: integer
 *           example: 2
 *         cash_sales:
 *           type: number
 *           example: 1100000
 *         qris_sales:
 *           type: number
 *           example: 100000
 *
 *     ShiftListResponse:
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
 *                 $ref: '#/components/schemas/ShiftData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data shift"
 *
 *     ActiveShiftResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: object
 *           properties:
 *             is_active:
 *               type: boolean
 *             shift:
 *               $ref: '#/components/schemas/ShiftData'
 *         metaData:
 *           $ref: '#/components/schemas/MetaData'
 */

/**
 * @swagger
 * /shift/active:
 *   get:
 *     summary: Check active shift for current user
 *     description: Mengecek apakah user sedang memiliki shift aktif
 *     tags: [Shift]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Active shift status retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ActiveShiftResponse'
 *
 * /shift/my:
 *   get:
 *     summary: Get current user's shifts
 *     tags: [Shift]
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
 *         description: User's shifts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShiftListResponse'
 *
 * /shift/start:
 *   post:
 *     summary: Start new shift (Buka Kas)
 *     description: Membuka shift baru dengan modal awal
 *     tags: [Shift]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StartShiftInput'
 *     responses:
 *       201:
 *         description: Shift started successfully
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
 *                       example: "Shift berhasil dibuka"
 *                     shift:
 *                       $ref: '#/components/schemas/ShiftData'
 *       400:
 *         description: User sudah memiliki shift aktif
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                 message: "Anda sudah memiliki shift aktif"
 *                 code: 400
 *                 response_code: "400"
 *
 * /shift/end:
 *   post:
 *     summary: End current shift (Tutup Kas)
 *     description: Menutup shift aktif dengan kas akhir
 *     tags: [Shift]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EndShiftInput'
 *     responses:
 *       200:
 *         description: Shift ended successfully
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
 *                       example: "Shift berhasil ditutup"
 *                     summary:
 *                       $ref: '#/components/schemas/ShiftSummary'
 *       400:
 *         description: Tidak ada shift aktif
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                 message: "Tidak ada shift aktif"
 *                 code: 400
 *                 response_code: "400"
 *
 * /shift:
 *   get:
 *     summary: Get all shifts (Admin only)
 *     tags: [Shift]
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
 *         name: user_id
 *         schema:
 *           type: string
 *           format: uuid
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
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Shifts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShiftListResponse'
 *
 * /shift/{shift_id}:
 *   get:
 *     summary: Get shift detail
 *     tags: [Shift]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: shift_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Shift detail retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/ShiftData'
 *       404:
 *         description: Shift not found
 *
 * /shift/{shift_id}/summary:
 *   get:
 *     summary: Get shift summary with order statistics
 *     description: Ringkasan shift termasuk statistik penjualan dan selisih kas
 *     tags: [Shift]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: shift_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Shift summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/ShiftSummary'
 *       404:
 *         description: Shift not found
 */
