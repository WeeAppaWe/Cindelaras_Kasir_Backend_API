/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Manajemen pesanan/transaksi penjualan
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItemInput:
 *       type: object
 *       required:
 *         - menu_id
 *         - qty
 *         - price
 *       properties:
 *         menu_id:
 *           type: string
 *           format: uuid
 *         qty:
 *           type: integer
 *           minimum: 1
 *           example: 2
 *         price:
 *           type: number
 *           minimum: 0
 *           example: 25000
 *
 *     CreateOrderInput:
 *       type: object
 *       required:
 *         - customer_name
 *         - payment_type
 *         - items
 *       properties:
 *         customer_name:
 *           type: string
 *           maxLength: 50
 *           example: "Budi"
 *         customer_phone:
 *           type: string
 *           maxLength: 20
 *           example: "08123456789"
 *         payment_type:
 *           type: string
 *           enum: [CASH, QRIS]
 *           example: "CASH"
 *         items:
 *           type: array
 *           minItems: 1
 *           items:
 *             $ref: '#/components/schemas/OrderItemInput'
 *
 *     ConfirmPaymentInput:
 *       type: object
 *       properties:
 *         paid_amount:
 *           type: number
 *           minimum: 0
 *           description: Jumlah uang yang dibayarkan (wajib untuk CASH)
 *           example: 50000
 *
 *     OrderItemWithMenu:
 *       type: object
 *       properties:
 *         order_item_id:
 *           type: string
 *           format: uuid
 *         menu_id:
 *           type: string
 *           format: uuid
 *         qty:
 *           type: integer
 *         price:
 *           type: number
 *         subtotal:
 *           type: number
 *         menu:
 *           type: object
 *           properties:
 *             menu_id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *             image_url:
 *               type: string
 *               nullable: true
 *
 *     OrderData:
 *       type: object
 *       properties:
 *         order_id:
 *           type: string
 *           format: uuid
 *         shift_id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *         customer_name:
 *           type: string
 *           nullable: true
 *         customer_phone:
 *           type: string
 *           nullable: true
 *         receipt:
 *           type: string
 *           nullable: true
 *           description: Nomor struk yang dibuat saat pembayaran dikonfirmasi
 *           example: "RCP-240101-0001"
 *         total_amount:
 *           type: number
 *           example: 50000
 *         paid_amount:
 *           type: number
 *           example: 50000
 *         change_amount:
 *           type: number
 *           example: 0
 *         payment_type:
 *           type: string
 *           enum: [CASH, QRIS]
 *         status:
 *           type: string
 *           enum: [PENDING, COMPLETED, CANCELLED]
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
 *         order_items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItemWithMenu'
 *
 *     ReceiptData:
 *       type: object
 *       properties:
 *         store_name:
 *           type: string
 *         store_address:
 *           type: string
 *         store_phone:
 *           type: string
 *           description: Nomor telepon toko dari store setting
 *           example: "0274-123456"
 *         store_logo:
 *           type: string
 *           description: URL/path logo toko dari store setting
 *           example: "/uploads/logo.png"
 *         order_id:
 *           type: string
 *           format: uuid
 *           description: UUIDv7 order dari database untuk kebutuhan teknis, tidak ditampilkan pada struk cetak/PDF/HTML
 *         receipt:
 *           type: string
 *           nullable: true
 *           description: Nomor struk bisnis yang ditampilkan pada struk. Jika belum ada, tampilan nomor struk menjadi "-".
 *           example: "RCP-240101-0001"
 *         order_date:
 *           type: string
 *         order_time:
 *           type: string
 *         cashier_name:
 *           type: string
 *         customer_name:
 *           type: string
 *           nullable: true
 *         customer_phone:
 *           type: string
 *           nullable: true
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               qty:
 *                 type: integer
 *               price:
 *                 type: number
 *               subtotal:
 *                 type: number
 *         subtotal:
 *           type: number
 *         total:
 *           type: number
 *         payment_type:
 *           type: string
 *         paid_amount:
 *           type: number
 *         change_amount:
 *           type: number
 *         status:
 *           type: string
 *
 *     OrderListResponse:
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
 *                 $ref: '#/components/schemas/OrderData'
 *         metaData:
 *           allOf:
 *             - $ref: '#/components/schemas/MetaData'
 *             - type: object
 *               properties:
 *                 message:
 *                   example: "Berhasil mengambil data order"
 */

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all orders (history)
 *     tags: [Order]
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
 *         description: Search by customer name
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, COMPLETED, CANCELLED]
 *       - in: query
 *         name: payment_type
 *         schema:
 *           type: string
 *           enum: [CASH, QRIS]
 *       - in: query
 *         name: shift_id
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
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderListResponse'
 *
 *   post:
 *     summary: Create new order (Checkout)
 *     description: Membuat order baru dengan status PENDING. Pembayaran CASH maupun QRIS perlu dikonfirmasi melalui endpoint confirm.
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderInput'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *                   properties:
 *                     order:
 *                       $ref: '#/components/schemas/OrderData'
 *                     change_amount:
 *                       type: number
 *                     message:
 *                       type: string
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Order berhasil dibuat"
 *       400:
 *         description: Validation error atau tidak ada shift aktif
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
 *                     message: "Tidak ada shift aktif"
 *                     code: 400
 *                     response_code: "400"
 *
 * /order/{order_id}:
 *   get:
 *     summary: Get order detail
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Order detail retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/OrderData'
 *       404:
 *         description: Order not found
 *
 * /order/{order_id}/confirm:
 *   patch:
 *     summary: Confirm payment
 *     description: Konfirmasi pembayaran untuk order PENDING. CASH wajib mengirim paid_amount, sedangkan QRIS otomatis memakai total order.
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfirmPaymentInput'
 *     responses:
 *       200:
 *         description: Payment confirmed successfully
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
 *                       example: "Pembayaran berhasil dikonfirmasi"
 *                     order:
 *                       $ref: '#/components/schemas/OrderData'
 *       400:
 *         description: Order sudah COMPLETED atau CANCELLED
 *       404:
 *         description: Order not found
 *
 * /order/{order_id}/cancel:
 *   patch:
 *     summary: Cancel order
 *     description: Batalkan order (hanya untuk status PENDING)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Order cancelled successfully
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
 *                       example: "Order berhasil dibatalkan"
 *       400:
 *         description: Order sudah COMPLETED atau sudah CANCELLED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               response: []
 *               metaData:
 *                 message: "Order yang sudah selesai tidak dapat dibatalkan"
 *                 code: 400
 *                 response_code: "400"
 *       404:
 *         description: Order not found
 *
 * /order/{order_id}/receipt:
 *   get:
 *     summary: Get receipt for printing
 *     description: Mengambil data struk dalam berbagai format
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [text, escpos, pdf, image]
 *           default: text
 *         description: Format output struk
 *     responses:
 *       200:
 *         description: Receipt data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *                   properties:
 *                     format:
 *                       type: string
 *                       example: "text"
 *                     content:
 *                       type: string
 *                       description: Formatted receipt content
 *                     data:
 *                       $ref: '#/components/schemas/ReceiptData'
 *       404:
 *         description: Order not found
 */
