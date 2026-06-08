/**
 * @swagger
 * tags:
 *   name: Receipt
 *   description: Generate dan kirim struk digital via WhatsApp
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReceiptItem:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Nasi Goreng Spesial"
 *         qty:
 *           type: integer
 *           example: 2
 *         price:
 *           type: number
 *           example: 25000
 *         subtotal:
 *           type: number
 *           example: 50000
 *
 *     ReceiptPreviewResponse:
 *       type: object
 *       properties:
 *         store_name:
 *           type: string
 *           example: "Cindelaras Resto"
 *         store_address:
 *           type: string
 *           example: "Jl. Ringroad Utara, Yogyakarta"
 *         store_phone:
 *           type: string
 *           example: "0274-123456"
 *         store_logo:
 *           type: string
 *           example: "/uploads/logo.png"
 *         order_id:
 *           type: string
 *           format: uuid
 *           description: UUIDv7 order untuk kebutuhan teknis, tidak ditampilkan pada struk cetak/PDF/HTML
 *         receipt:
 *           type: string
 *           nullable: true
 *           description: Nomor struk bisnis yang ditampilkan pada struk. Jika belum ada, tampilan nomor struk menjadi "-".
 *           example: "RCP-240101-0001"
 *         order_date:
 *           type: string
 *           example: "25 Jan 2026"
 *         order_time:
 *           type: string
 *           example: "14:30"
 *         cashier_name:
 *           type: string
 *           example: "Budi"
 *         customer_name:
 *           type: string
 *           nullable: true
 *           example: "Andi"
 *         customer_phone:
 *           type: string
 *           nullable: true
 *           example: "08123456789"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ReceiptItem'
 *         total:
 *           type: number
 *           example: 125000
 *         payment_type:
 *           type: string
 *           example: "CASH"
 *         paid_amount:
 *           type: number
 *           example: 150000
 *         change_amount:
 *           type: number
 *           example: 25000
 *
 *     SendReceiptRequest:
 *       type: object
 *       required:
 *         - phone
 *       properties:
 *         phone:
 *           type: string
 *           description: Nomor WhatsApp customer (format 08xxx atau 628xxx)
 *           example: "08123456789"
 *
 *     SendReceiptResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Struk berhasil dikirim ke WhatsApp"
 *         receipt_url:
 *           type: string
 *           example: "https://api.tokoku.com/api/receipt/xxx-xxx/pdf"
 *         whatsapp_status:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /receipt/{order_id}/pdf:
 *   get:
 *     summary: Download/view PDF receipt
 *     description: |
 *       Generate dan return PDF struk secara on-demand.
 *       Endpoint ini PUBLIC (tanpa auth) karena link dikirim ke customer via WhatsApp.
 *       PDF di-generate dari data order di database setiap kali link diakses.
 *     tags: [Receipt]
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID Order
 *     responses:
 *       200:
 *         description: PDF file
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Order not found
 *
 * /receipt/{order_id}/preview:
 *   get:
 *     summary: Get receipt data for preview
 *     description: Mengambil data struk dalam format JSON untuk preview di frontend
 *     tags: [Receipt]
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
 *         description: Receipt preview data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/ReceiptPreviewResponse'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Berhasil mengambil data struk"
 *       404:
 *         description: Order not found
 *
 * /receipt/{order_id}/send:
 *   post:
 *     summary: Send receipt link to WhatsApp
 *     description: |
 *       Mengirim link struk digital ke nomor WhatsApp customer.
 *       Menggunakan Fonnte API (free tier - text only).
 *       Customer akan menerima pesan berisi link untuk melihat/download struk PDF.
 *     tags: [Receipt]
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
 *             $ref: '#/components/schemas/SendReceiptRequest'
 *     responses:
 *       200:
 *         description: Receipt sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   $ref: '#/components/schemas/SendReceiptResponse'
 *                 metaData:
 *                   allOf:
 *                     - $ref: '#/components/schemas/MetaData'
 *                     - type: object
 *                       properties:
 *                         message:
 *                           example: "Struk berhasil dikirim ke WhatsApp"
 *       404:
 *         description: Order not found
 *       400:
 *         description: Fonnte not configured or invalid phone number
 */
