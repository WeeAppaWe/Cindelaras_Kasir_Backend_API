/**
 * @swagger
 * tags:
 *   name: Report Export
 *   description: Export payload laporan menjadi file PDF atau Excel
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReportExportValueFormat:
 *       type: string
 *       enum: [text, number, currency, date, datetime, percent, boolean]
 *
 *     ReportExportColumnAlign:
 *       type: string
 *       enum: [left, center, right]
 *
 *     ReportExportPrimitive:
 *       oneOf:
 *         - type: string
 *         - type: number
 *         - type: boolean
 *       nullable: true
 *
 *     ReportExportPeriod:
 *       type: object
 *       required:
 *         - start_date
 *         - end_date
 *       properties:
 *         start_date:
 *           type: string
 *           example: "2026-01-01"
 *         end_date:
 *           type: string
 *           example: "2026-01-31"
 *
 *     ReportExportMetric:
 *       type: object
 *       required:
 *         - label
 *       properties:
 *         label:
 *           type: string
 *           maxLength: 100
 *           example: "Total Penjualan"
 *         value:
 *           $ref: '#/components/schemas/ReportExportPrimitive'
 *         format:
 *           $ref: '#/components/schemas/ReportExportValueFormat'
 *
 *     ReportExportColumn:
 *       type: object
 *       required:
 *         - key
 *         - header
 *       properties:
 *         key:
 *           type: string
 *           maxLength: 80
 *           example: "payment_type"
 *         header:
 *           type: string
 *           maxLength: 120
 *           example: "Metode Bayar"
 *         width:
 *           type: number
 *           maximum: 500
 *           example: 120
 *         align:
 *           $ref: '#/components/schemas/ReportExportColumnAlign'
 *         format:
 *           $ref: '#/components/schemas/ReportExportValueFormat'
 *
 *     ReportExportRow:
 *       type: object
 *       additionalProperties:
 *         $ref: '#/components/schemas/ReportExportPrimitive'
 *       example:
 *         payment_type: "CASH"
 *         transaction_count: 12
 *         total_amount: 750000
 *
 *     ReportExportTable:
 *       type: object
 *       required:
 *         - columns
 *         - rows
 *       properties:
 *         title:
 *           type: string
 *           maxLength: 150
 *           example: "Metode Bayar"
 *         columns:
 *           type: array
 *           minItems: 1
 *           maxItems: 50
 *           items:
 *             $ref: '#/components/schemas/ReportExportColumn'
 *         rows:
 *           type: array
 *           maxItems: 5000
 *           items:
 *             $ref: '#/components/schemas/ReportExportRow'
 *         empty_message:
 *           type: string
 *           maxLength: 150
 *           example: "Tidak ada data"
 *
 *     ReportExportSection:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           maxLength: 150
 *           example: "Ringkasan Operasional"
 *         summaries:
 *           type: array
 *           maxItems: 50
 *           items:
 *             $ref: '#/components/schemas/ReportExportMetric'
 *         tables:
 *           type: array
 *           maxItems: 20
 *           items:
 *             $ref: '#/components/schemas/ReportExportTable'
 *         notes:
 *           type: array
 *           maxItems: 20
 *           items:
 *             type: string
 *             maxLength: 300
 *
 *     ReportExportData:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           maxLength: 150
 *           example: "Laporan Finansial"
 *         subtitle:
 *           type: string
 *           maxLength: 200
 *           example: "Ringkasan penjualan"
 *         generated_at:
 *           type: string
 *           format: date-time
 *           example: "2026-01-25T10:30:00.000Z"
 *         period:
 *           $ref: '#/components/schemas/ReportExportPeriod'
 *         metadata:
 *           type: array
 *           maxItems: 50
 *           items:
 *             $ref: '#/components/schemas/ReportExportMetric'
 *         summaries:
 *           type: array
 *           maxItems: 50
 *           items:
 *             $ref: '#/components/schemas/ReportExportMetric'
 *         sections:
 *           type: array
 *           maxItems: 20
 *           items:
 *             $ref: '#/components/schemas/ReportExportSection'
 *         tables:
 *           type: array
 *           maxItems: 20
 *           items:
 *             $ref: '#/components/schemas/ReportExportTable'
 *
 *     ReportPdfOptions:
 *       type: object
 *       properties:
 *         file_name:
 *           type: string
 *           maxLength: 120
 *           description: Nama file. Ekstensi .pdf akan ditambahkan otomatis jika belum ada.
 *           example: "laporan-finansial"
 *         store_name:
 *           type: string
 *           maxLength: 150
 *           example: "Kedai UTY"
 *         page_size:
 *           type: string
 *           enum: [A4, LETTER]
 *           example: "A4"
 *         orientation:
 *           type: string
 *           enum: [portrait, landscape]
 *           example: "landscape"
 *
 *     ReportExcelOptions:
 *       type: object
 *       properties:
 *         file_name:
 *           type: string
 *           maxLength: 120
 *           description: Nama file. Ekstensi .xls akan ditambahkan otomatis jika belum ada.
 *           example: "laporan-finansial"
 *         sheet_name:
 *           type: string
 *           minLength: 1
 *           maxLength: 31
 *           example: "Finansial"
 *         store_name:
 *           type: string
 *           maxLength: 150
 *           example: "Kedai UTY"
 *
 *     ExportReportPdfInput:
 *       type: object
 *       required:
 *         - data
 *       properties:
 *         data:
 *           $ref: '#/components/schemas/ReportExportData'
 *         options:
 *           $ref: '#/components/schemas/ReportPdfOptions'
 *       example:
 *         data:
 *           title: "Laporan Finansial"
 *           subtitle: "Ringkasan penjualan"
 *           generated_at: "2026-01-25T10:30:00.000Z"
 *           period:
 *             start_date: "2026-01-01"
 *             end_date: "2026-01-31"
 *           summaries:
 *             - label: "Total Penjualan"
 *               value: 1250000
 *               format: "currency"
 *           tables:
 *             - title: "Metode Bayar"
 *               columns:
 *                 - key: "payment_type"
 *                   header: "Metode Bayar"
 *                 - key: "total_amount"
 *                   header: "Total"
 *                   format: "currency"
 *                   align: "right"
 *               rows:
 *                 - payment_type: "CASH"
 *                   total_amount: 750000
 *                 - payment_type: "QRIS"
 *                   total_amount: 500000
 *         options:
 *           file_name: "laporan-finansial"
 *           store_name: "Kedai UTY"
 *           page_size: "A4"
 *           orientation: "landscape"
 *
 *     ExportReportExcelInput:
 *       type: object
 *       required:
 *         - data
 *       properties:
 *         data:
 *           $ref: '#/components/schemas/ReportExportData'
 *         options:
 *           $ref: '#/components/schemas/ReportExcelOptions'
 *       example:
 *         data:
 *           title: "Laporan Finansial"
 *           subtitle: "Ringkasan penjualan"
 *           period:
 *             start_date: "2026-01-01"
 *             end_date: "2026-01-31"
 *           tables:
 *             - title: "Metode Bayar"
 *               columns:
 *                 - key: "payment_type"
 *                   header: "Metode Bayar"
 *                 - key: "total_amount"
 *                   header: "Total"
 *                   format: "currency"
 *                   align: "right"
 *               rows:
 *                 - payment_type: "CASH"
 *                   total_amount: 750000
 *         options:
 *           file_name: "laporan-finansial"
 *           sheet_name: "Finansial"
 *           store_name: "Kedai UTY"
 */

/**
 * @swagger
 * /report/export/pdf:
 *   post:
 *     summary: Export report as PDF
 *     description: Mengubah payload laporan generik menjadi file PDF dan mengirimkannya sebagai attachment.
 *     tags: [Report Export]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExportReportPdfInput'
 *     responses:
 *       200:
 *         description: PDF file generated successfully
 *         headers:
 *           Content-Disposition:
 *             description: Attachment filename
 *             schema:
 *               type: string
 *               example: 'attachment; filename="laporan-finansial.pdf"'
 *           Content-Length:
 *             description: File size in bytes
 *             schema:
 *               type: integer
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /report/export/excel:
 *   post:
 *     summary: Export report as Excel-compatible XLS
 *     description: Mengubah payload laporan generik menjadi file XLS compatible dengan Microsoft Excel dan mengirimkannya sebagai attachment.
 *     tags: [Report Export]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExportReportExcelInput'
 *     responses:
 *       200:
 *         description: Excel-compatible XLS file generated successfully
 *         headers:
 *           Content-Disposition:
 *             description: Attachment filename
 *             schema:
 *               type: string
 *               example: 'attachment; filename="laporan-finansial.xls"'
 *           Content-Length:
 *             description: File size in bytes
 *             schema:
 *               type: integer
 *         content:
 *           application/vnd.ms-excel:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
