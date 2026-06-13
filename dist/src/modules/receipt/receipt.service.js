"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiptService = exports.getReceiptPreview = exports.getPreviewSample = exports.sendReceipt = exports.getPdfReceipt = void 0;
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const receipt_repository_1 = __importDefault(require("./receipt.repository"));
const store_setting_repository_1 = __importDefault(require("../store-setting/store-setting.repository"));
const receipt_utility_1 = require("../../../utility/receipt.utility");
const fonnte_utility_1 = require("../../../utility/fonnte.utility");
/**
 * Get store settings for receipt
 */
const getStoreInfo = async () => {
    const settings = await store_setting_repository_1.default.findAll();
    const settingsMap = {};
    for (const setting of settings) {
        settingsMap[setting.setting_key] = setting.setting_value;
    }
    return {
        store_name: settingsMap['store_name'] || process.env.STORE_NAME || 'Toko Anda',
        store_address: settingsMap['store_address'] || process.env.STORE_ADDRESS || '',
        store_phone: settingsMap['store_phone'] || process.env.STORE_PHONE || '',
        store_logo: (0, receipt_utility_1.normalizeReceiptLogoValue)(settingsMap['store_logo'] || process.env.STORE_LOGO || ''),
        receipt_header: settingsMap['receipt_header'] || '',
        receipt_footer: settingsMap['receipt_footer'] || '',
    };
};
const getApiBaseUrl = () => {
    const baseUrl = process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 4000}`;
    const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');
    if (normalizedBaseUrl.toLowerCase().endsWith('/api')) {
        return normalizedBaseUrl;
    }
    return `${normalizedBaseUrl}/api`;
};
/**
 * Transform order data to receipt data format
 */
const transformToReceiptData = (order, storeInfo) => {
    const orderDate = new Date(order.created_at);
    return {
        store_name: storeInfo.store_name,
        store_address: storeInfo.store_address,
        store_phone: storeInfo.store_phone,
        store_logo: storeInfo.store_logo,
        receipt_header: storeInfo.receipt_header,
        receipt_footer: storeInfo.receipt_footer,
        order_id: order.order_id,
        receipt: order.receipt,
        order_date: orderDate.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }),
        order_time: orderDate.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        }),
        cashier_name: order.user.name,
        customer_name: order.customer_name,
        customer_phone: order.customer_phone,
        items: order.order_items.map((item) => ({
            name: item.menu.name,
            qty: item.qty,
            price: item.price,
            subtotal: item.subtotal,
        })),
        total: order.total_amount,
        payment_type: order.payment_type,
        order_type: order.order_type,
        paid_amount: order.paid_amount,
        change_amount: order.change_amount,
    };
};
const buildSampleReceiptData = (storeInfo) => {
    const now = new Date();
    const items = [
        {
            name: 'Nasi Goreng Spesial',
            qty: 1,
            price: 25000,
            subtotal: 25000,
        },
        {
            name: 'Es Teh Manis',
            qty: 2,
            price: 5000,
            subtotal: 10000,
        },
    ];
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);
    const paidAmount = 50000;
    return {
        store_name: storeInfo.store_name,
        store_address: storeInfo.store_address,
        store_phone: storeInfo.store_phone,
        store_logo: storeInfo.store_logo,
        receipt_header: storeInfo.receipt_header,
        receipt_footer: storeInfo.receipt_footer,
        order_id: '00000000-0000-0000-0000-000000000000',
        receipt: 'PREVIEW-SAMPLE',
        order_date: now.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }),
        order_time: now.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        }),
        cashier_name: 'Admin Preview',
        customer_name: 'Pelanggan Contoh',
        customer_phone: '081234567890',
        items,
        total,
        payment_type: 'CASH',
        order_type: 'DINE_IN',
        paid_amount: paidAmount,
        change_amount: paidAmount - total,
    };
};
/**
 * Generate PDF receipt on-demand
 * GET /api/receipt/:order_id/pdf
 */
const getPdfReceipt = async (req, res) => {
    try {
        const orderId = req.params.order_id;
        // Get order data
        const order = await receipt_repository_1.default.findOrderForReceipt(orderId);
        if (!order) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Order tidak ditemukan');
        }
        // Get store info
        const storeInfo = await getStoreInfo();
        // Transform to receipt data format
        const receiptData = transformToReceiptData(order, storeInfo);
        const fileReceiptNumber = (receiptData.receipt || receiptData.order_id).replace(/[^a-zA-Z0-9-]/g, '');
        // Generate PDF
        const pdfBase64 = await (0, receipt_utility_1.generatePdfReceipt)(receiptData);
        const pdfBuffer = Buffer.from(pdfBase64, 'base64');
        // Set response headers for PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="struk-${fileReceiptNumber}.pdf"`);
        res.setHeader('Content-Length', pdfBuffer.length);
        // Send PDF
        res.send(pdfBuffer);
    }
    catch (error) {
        console.error(`--- Receipt Service Error: ${error.message}`);
        throw error;
    }
};
exports.getPdfReceipt = getPdfReceipt;
/**
 * Send receipt link to WhatsApp
 * POST /api/receipt/:order_id/send
 */
const sendReceipt = async (req) => {
    try {
        const orderId = req.params.order_id;
        const { phone } = req.body;
        // Check if Fonnte is configured
        if (!(0, fonnte_utility_1.isFonnteConfigured)()) {
            throw new error_validation_exception_1.ErrorValidationException('Fonnte belum dikonfigurasi', [
                { location: 'server', field: 'fonnte_token', message: 'Token Fonnte tidak ditemukan' },
            ]);
        }
        // Get order data
        const order = await receipt_repository_1.default.findOrderForReceipt(orderId);
        if (!order) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Order tidak ditemukan');
        }
        // Get store info
        const storeInfo = await getStoreInfo();
        // Build receipt URL
        const receiptUrl = `${getApiBaseUrl()}/receipt/${orderId}/pdf`;
        const receiptNumber = order.receipt || '-';
        // Format message
        const message = `Terima kasih telah berbelanja di ${storeInfo.store_name}! 🙏

No. Struk: ${receiptNumber}
Total: Rp ${order.total_amount.toLocaleString('id-ID')}
Pembayaran: ${order.payment_type}

📄 Lihat struk digital Anda:
${receiptUrl}

Struk ini berlaku sebagai bukti pembayaran yang sah.
Terima kasih! 🙏`;
        // Send WhatsApp message
        const waResult = await (0, fonnte_utility_1.sendWhatsAppMessage)({
            target: phone,
            message: message,
        });
        if (!waResult.status) {
            return {
                success: false,
                message: waResult.message || 'Gagal mengirim pesan WhatsApp',
                receipt_url: receiptUrl,
                whatsapp_status: false,
            };
        }
        return {
            success: true,
            message: 'Struk berhasil dikirim ke WhatsApp',
            receipt_url: receiptUrl,
            whatsapp_status: true,
        };
    }
    catch (error) {
        console.error(`--- Receipt Service Error: ${error.message}`);
        throw error;
    }
};
exports.sendReceipt = sendReceipt;
/**
 * Get sample receipt preview data for admin store-setting page.
 * GET /api/receipt/preview-sample
 */
const getPreviewSample = async () => {
    try {
        const storeInfo = await getStoreInfo();
        return buildSampleReceiptData(storeInfo);
    }
    catch (error) {
        console.error(`--- Receipt Service Error: ${error.message}`);
        throw error;
    }
};
exports.getPreviewSample = getPreviewSample;
/**
 * Get receipt preview (JSON data for frontend display)
 * GET /api/receipt/:order_id/preview
 */
const getReceiptPreview = async (req) => {
    try {
        const orderId = req.params.order_id;
        // Get order data
        const order = await receipt_repository_1.default.findOrderForReceipt(orderId);
        if (!order) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Order tidak ditemukan');
        }
        // Get store info
        const storeInfo = await getStoreInfo();
        // Transform to receipt data format
        return transformToReceiptData(order, storeInfo);
    }
    catch (error) {
        console.error(`--- Receipt Service Error: ${error.message}`);
        throw error;
    }
};
exports.getReceiptPreview = getReceiptPreview;
exports.receiptService = {
    getPdfReceipt: exports.getPdfReceipt,
    sendReceipt: exports.sendReceipt,
    getPreviewSample: exports.getPreviewSample,
    getReceiptPreview: exports.getReceiptPreview,
};
exports.default = exports.receiptService;
//# sourceMappingURL=receipt.service.js.map