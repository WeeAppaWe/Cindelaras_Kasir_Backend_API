"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = exports.getReceipt = exports.cancelOrder = exports.confirmPayment = exports.create = exports.getDetail = exports.getAll = void 0;
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const pagination_utility_1 = require("../../../utility/pagination.utility");
const format_money_utility_1 = require("../../../utility/format-money.utility");
const metadata_info_utility_1 = require("../../../utility/metadata-info.utility");
const receipt_number_utility_1 = require("../../../utility/receipt-number.utility");
const order_repository_1 = __importDefault(require("./order.repository"));
const stock_type_repository_1 = __importDefault(require("../stock-type/stock-type.repository"));
const receipt_utility_1 = __importDefault(require("../../../utility/receipt.utility"));
const order_schema_1 = require("./order.schema");
const store_setting_repository_1 = __importDefault(require("../store-setting/store-setting.repository"));
// Remove global prisma instance to allow mocking in tests
// const prisma = getPrismaClient(); { }
// ============================================
// GET ALL ORDERS (History)
// ============================================
const getAll = async (req) => {
    try {
        const pageNumber = parseInt(req.query.batch) || 1;
        const pageSize = parseInt(req.query.size) || 10;
        const pagination = (0, pagination_utility_1.getPagination)(pageNumber, pageSize);
        const options = {
            pagination: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        };
        const filter = {
            search: req.query.search || null,
            status: req.query.status || null,
            payment_type: req.query.payment_type || null,
            order_type: req.query.order_type || null,
            shift_id: req.query.shift_id || null,
            start_date: req.query.start_date || null,
            end_date: req.query.end_date || null,
        };
        const [data, totalData] = await Promise.all([
            order_repository_1.default.findAll(options, filter),
            order_repository_1.default.count(filter),
        ]);
        return {
            page: {
                total_record_count: totalData,
                batch_number: pageNumber,
                batch_size: data.length,
                max_batch_size: pageSize,
            },
            records: data,
        };
    }
    catch (error) {
        console.error(`--- Order Service Error: ${error.message}`);
        throw error;
    }
};
exports.getAll = getAll;
// ============================================
// GET ORDER DETAIL
// ============================================
const getDetail = async (req) => {
    try {
        const orderId = req.params.order_id;
        const order = await order_repository_1.default.findByIdWithDetails(orderId);
        if (!order) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Pesanan tidak ditemukan');
        }
        return order;
    }
    catch (error) {
        console.error(`--- Order Service Error: ${error.message}`);
        throw error;
    }
};
exports.getDetail = getDetail;
// ============================================
// CREATE ORDER (Checkout)
// ============================================
/**
 * Create order dari checkout kasir
 *
 * Flow:
 * 1. Validasi user terautentikasi
 * 2. Validasi ada shift aktif
 * 3. Validasi semua menu exist dan available
 * 4. Hitung total dari items
 * 5. Untuk CASH: validasi paid_amount >= total, hitung kembalian
 * 6. Untuk QRIS: status PENDING, paid_amount = total, change = 0
 * 7. Simpan order dengan items dalam transaction
 * 8. Kurangi stok bahan baku berdasarkan resep
 */
const create = async (req) => {
    try {
        const body = req.body;
        const metadata = (0, metadata_info_utility_1.getMetadataInfo)(req);
        // 1. Validate user authenticated
        if (!metadata.account_id) {
            throw new error_validation_exception_1.ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }
        // 2. Validate active shift exists
        const activeShift = await order_repository_1.default.getActiveShift(metadata.account_id);
        if (!activeShift) {
            throw new error_validation_exception_1.ErrorValidationException('Tidak ada shift aktif', [
                { location: 'system', field: 'shift', message: 'Silakan mulai shift terlebih dahulu' },
            ]);
        }
        // 3. Validate all menus and prepare items
        const orderItems = [];
        for (const item of body.items) {
            const menu = await order_repository_1.default.findMenuById(item.menu_id);
            if (!menu) {
                throw new error_validation_exception_1.ErrorValidationException(`Menu dengan ID ${item.menu_id} tidak ditemukan`, [
                    { location: 'body', field: 'items', message: `Menu tidak ditemukan` },
                ]);
            }
            if (!menu.is_available) {
                throw new error_validation_exception_1.ErrorValidationException(`Menu "${menu.name}" tidak tersedia`, [
                    { location: 'body', field: 'items', message: `Menu "${menu.name}" sedang tidak tersedia` },
                ]);
            }
            // Use price from request (FE sends the price from cart)
            const subtotal = item.price * item.qty;
            orderItems.push({
                menu_id: item.menu_id,
                qty: item.qty,
                price: item.price,
                subtotal: subtotal,
            });
        }
        // 4. Calculate total
        const totalAmount = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
        // 5. All orders start as PENDING (confirmation needed)
        // Stock will be deducted when payment is confirmed (COMPLETED)
        const paidAmount = 0;
        const changeAmount = 0;
        const status = order_schema_1.OrderStatus.PENDING;
        // 6. Create order (without stock deduction - that happens at confirmPayment)
        const result = await order_repository_1.default.create({
            shift_id: activeShift.shift_id,
            user_id: metadata.account_id,
            customer_name: body.customer_name || null,
            customer_phone: body.customer_phone || null,
            total_amount: totalAmount,
            paid_amount: paidAmount,
            change_amount: changeAmount,
            payment_type: body.payment_type,
            order_type: body.order_type,
            status: status,
        }, orderItems);
        // Fetch complete order data
        const fullOrder = await order_repository_1.default.findByIdWithDetails(result.order_id);
        return {
            order: fullOrder,
            change_amount: 0, // Will be calculated on confirmation
            message: 'Pesanan berhasil dibuat. Silakan konfirmasi pembayaran.',
        };
    }
    catch (error) {
        console.error(`--- Order Service Error: ${error.message}`);
        throw error;
    }
};
exports.create = create;
// ============================================
// CONFIRM PAYMENT (for both CASH and QRIS)
// ============================================
/**
 * Konfirmasi pembayaran oleh kasir
 * - CASH: Wajib input paid_amount, hitung kembalian
 * - QRIS: paid_amount = total_amount, change = 0
 * Mengubah status dari PENDING ke COMPLETED
 * PENTING: Stock dikurangi di sini (bukan saat create order)
 */
const confirmPayment = async (req) => {
    try {
        const orderId = req.params.order_id;
        const body = req.body;
        // Check order exists with details (including menu recipes for stock calculation)
        const order = await order_repository_1.default.findByIdWithDetails(orderId);
        if (!order) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Pesanan tidak ditemukan');
        }
        // Validate order is PENDING
        if (order.status !== order_schema_1.OrderStatus.PENDING) {
            throw new error_validation_exception_1.ErrorValidationException('Pesanan tidak dalam status menunggu pembayaran', [
                {
                    location: 'params',
                    field: 'order_id',
                    message: `Status pesanan: ${order.status}`,
                },
            ]);
        }
        let paidAmount;
        let changeAmount;
        if (order.payment_type === order_schema_1.PaymentType.CASH) {
            // CASH: validate paid_amount is enough
            paidAmount = body.paid_amount;
            if (!paidAmount || paidAmount <= 0) {
                throw new error_validation_exception_1.ErrorValidationException('Jumlah bayar wajib diisi untuk pembayaran tunai', [
                    { location: 'body', field: 'paid_amount', message: 'Jumlah bayar wajib diisi' },
                ]);
            }
            if (paidAmount < order.total_amount) {
                throw new error_validation_exception_1.ErrorValidationException('Jumlah bayar kurang dari total', [
                    {
                        location: 'body',
                        field: 'paid_amount',
                        message: `Jumlah bayar (${paidAmount}) kurang dari total (${order.total_amount})`,
                    },
                ]);
            }
            changeAmount = paidAmount - order.total_amount;
        }
        else {
            // QRIS: paid = total, no change
            paidAmount = order.total_amount;
            changeAmount = 0;
        }
        // Calculate stock deductions based on order items and their recipes
        const stockDeductions = new Map();
        for (const orderItem of order.order_items) {
            // Get menu with recipes
            const menu = await order_repository_1.default.findMenuById(orderItem.menu_id);
            if (menu && menu.recipes) {
                for (const recipe of menu.recipes) {
                    const currentDeduction = stockDeductions.get(recipe.ingredient_id) || 0;
                    stockDeductions.set(recipe.ingredient_id, currentDeduction + (recipe.qty_needed * orderItem.qty));
                }
            }
        }
        // Get stock type for sales (OUT_SALES)
        const stockType = await stock_type_repository_1.default.findByName('OUT_SALES');
        if (!stockType) {
            throw new error_validation_exception_1.ErrorValidationException('Konfigurasi tipe stok tidak ditemukan', [
                { location: 'system', field: 'stock_type', message: 'Tipe stok OUT_SALES tidak ditemukan' },
            ]);
        }
        const receiptNumber = order.receipt || (0, receipt_number_utility_1.generateReceiptNumber)(order.order_id, order.created_at);
        // Confirm order AND deduct stock in single transaction (ACID)
        await (0, postgres_connection_1.default)().$transaction(async (transaction) => {
            // 1. Update order status to COMPLETED with payment details
            await order_repository_1.default.confirmOrder(orderId, paidAmount, changeAmount, receiptNumber, transaction);
            // 2. Deduct ingredient stocks and create stock movement records
            for (const [ingredientId, deductAmount] of stockDeductions) {
                await order_repository_1.default.updateIngredientStock(ingredientId, deductAmount, order.user_id, stockType.stock_type_id, transaction);
            }
        });
        // Fetch updated order
        const updatedOrder = await order_repository_1.default.findByIdWithDetails(orderId);
        // Build message
        const message = order.payment_type === order_schema_1.PaymentType.CASH
            ? `Pembayaran berhasil. Kembalian: ${(0, format_money_utility_1.formatMoney)(changeAmount)}`
            : 'Pembayaran QRIS berhasil dikonfirmasi';
        return {
            success: true,
            message: message,
            order: updatedOrder,
        };
    }
    catch (error) {
        console.error(`--- Order Service Error: ${error.message}`);
        throw error;
    }
};
exports.confirmPayment = confirmPayment;
// ============================================
// CANCEL ORDER
// ============================================
/**
 * Batalkan pesanan (hanya untuk PENDING)
 * Note: Tidak perlu mengembalikan stok karena stok belum dikurangi (hanya dikurangi saat confirm)
 */
const cancelOrder = async (req) => {
    try {
        const orderId = req.params.order_id;
        // Check order exists
        const order = await order_repository_1.default.findById(orderId);
        if (!order) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Pesanan tidak ditemukan');
        }
        // Only allow cancel for PENDING orders
        if (order.status !== order_schema_1.OrderStatus.PENDING) {
            throw new error_validation_exception_1.ErrorValidationException('Hanya pesanan dengan status PENDING yang dapat dibatalkan', [
                {
                    location: 'params',
                    field: 'order_id',
                    message: `Status pesanan: ${order.status}`,
                },
            ]);
        }
        // Update status to CANCELLED
        await order_repository_1.default.updateStatus(orderId, order_schema_1.OrderStatus.CANCELLED);
        return {
            success: true,
            message: 'Pesanan berhasil dibatalkan',
        };
    }
    catch (error) {
        console.error(`--- Order Service Error: ${error.message}`);
        throw error;
    }
};
exports.cancelOrder = cancelOrder;
const getReceiptStoreInfo = async () => {
    const settings = await store_setting_repository_1.default.findAll();
    const settingsMap = {};
    for (const setting of settings) {
        settingsMap[setting.setting_key] = setting.setting_value;
    }
    return {
        store_name: settingsMap['store_name'] || process.env.STORE_NAME || 'Toko Anda',
        store_address: settingsMap['store_address'] || process.env.STORE_ADDRESS || '',
        store_phone: settingsMap['store_phone'] || process.env.STORE_PHONE || '',
        store_logo: settingsMap['store_logo'] || process.env.STORE_LOGO || '',
        receipt_header: settingsMap['receipt_header'] || '',
        receipt_footer: settingsMap['receipt_footer'] || '',
    };
};
/**
 * Generate receipt untuk order
 * Format: text (plain text) atau escpos (ESC/POS commands)
 */
const getReceipt = async (req) => {
    try {
        const orderId = req.params.order_id;
        const format = req.query.format || 'text';
        // Get order with details
        const order = await order_repository_1.default.findByIdWithDetails(orderId);
        if (!order) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Pesanan tidak ditemukan');
        }
        const storeInfo = await getReceiptStoreInfo();
        // Build receipt data
        const orderDate = new Date(order.created_at);
        const receiptData = {
            store_name: storeInfo.store_name,
            store_address: storeInfo.store_address,
            store_phone: storeInfo.store_phone,
            store_logo: storeInfo.store_logo,
            receipt_header: storeInfo.receipt_header,
            receipt_footer: storeInfo.receipt_footer,
            order_id: order.order_id,
            receipt: order.receipt,
            order_date: orderDate.toLocaleDateString('id-ID'),
            order_time: orderDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            cashier_name: order.user.name,
            customer_name: order.customer_name,
            customer_phone: order.customer_phone,
            items: order.order_items.map((item) => ({
                name: item.menu.name,
                qty: item.qty,
                price: item.price,
                subtotal: item.subtotal,
            })),
            subtotal: order.total_amount,
            total: order.total_amount,
            payment_type: order.payment_type,
            order_type: order.order_type,
            paid_amount: order.paid_amount,
            change_amount: order.change_amount,
            status: order.status,
        };
        // Generate content based on format
        let content;
        switch (format) {
            case 'escpos':
                content = generateEscPosReceipt(receiptData);
                break;
            case 'pdf':
                content = await receipt_utility_1.default.generatePdfReceipt(receiptData);
                break;
            case 'image':
                content = receipt_utility_1.default.generateHtmlReceipt(receiptData);
                break;
            default:
                content = generateTextReceipt(receiptData);
        }
        return {
            format,
            content,
            data: receiptData,
        };
    }
    catch (error) {
        console.error(`--- Order Service Error: ${error.message}`);
        throw error;
    }
};
exports.getReceipt = getReceipt;
/**
 * Generate plain text receipt
 */
const generateTextReceipt = (data) => {
    const width = 32; // Thermal printer typical width
    const line = '='.repeat(width);
    const dashLine = '-'.repeat(width);
    const center = (text) => {
        const padding = Math.max(0, Math.floor((width - text.length) / 2));
        return ' '.repeat(padding) + text;
    };
    const lines = [];
    const receiptNumber = data.receipt || '-';
    // Header
    lines.push(center(data.store_name));
    data.store_address.split('\n').forEach((addr) => lines.push(center(addr)));
    if (data.store_phone) {
        lines.push(center(`Telp: ${data.store_phone}`));
    }
    if (data.receipt_header) {
        data.receipt_header.split('\n').forEach((header) => lines.push(center(header)));
    }
    lines.push(line);
    // Order info
    lines.push(`No: ${receiptNumber}`);
    lines.push(`Tgl: ${data.order_date} ${data.order_time}`);
    lines.push(`Kasir: ${data.cashier_name}`);
    if (data.customer_name) {
        lines.push(`Pelanggan: ${data.customer_name}`);
    }
    lines.push(`Tipe Pesanan: ${data.order_type}`);
    lines.push(dashLine);
    // Items
    data.items.forEach((item) => {
        lines.push(item.name);
        const itemLine = `  ${item.qty} x ${(0, format_money_utility_1.formatMoney)(item.price)}`;
        const subtotal = (0, format_money_utility_1.formatMoney)(item.subtotal);
        const spaces = width - itemLine.length - subtotal.length;
        lines.push(itemLine + ' '.repeat(Math.max(1, spaces)) + subtotal);
    });
    lines.push(dashLine);
    // Totals
    const addTotalLine = (label, value) => {
        const spaces = width - label.length - value.length;
        lines.push(label + ' '.repeat(Math.max(1, spaces)) + value);
    };
    addTotalLine('TOTAL', (0, format_money_utility_1.formatMoney)(data.total));
    addTotalLine(`Bayar (${data.payment_type})`, (0, format_money_utility_1.formatMoney)(data.paid_amount));
    if (data.change_amount > 0) {
        addTotalLine('Kembalian', (0, format_money_utility_1.formatMoney)(data.change_amount));
    }
    lines.push(line);
    // Footer
    lines.push(center('Terima Kasih'));
    const footerLines = data.receipt_footer
        ? data.receipt_footer.split('\n')
        : ['Selamat Menikmati'];
    footerLines.forEach((footer) => lines.push(center(footer)));
    lines.push('');
    return lines.join('\n');
};
/**
 * Generate ESC/POS receipt
 * ESC/POS is a command set for thermal printers
 */
const generateEscPosReceipt = (data) => {
    // ESC/POS Commands
    const ESC = '\x1B';
    const GS = '\x1D';
    const INIT = ESC + '@'; // Initialize printer
    const CENTER = ESC + 'a' + '\x01'; // Center align
    const LEFT = ESC + 'a' + '\x00'; // Left align
    const BOLD_ON = ESC + 'E' + '\x01'; // Bold on
    const BOLD_OFF = ESC + 'E' + '\x00'; // Bold off
    const DOUBLE_ON = GS + '!' + '\x11'; // Double width/height
    const DOUBLE_OFF = GS + '!' + '\x00'; // Normal size
    const CUT = GS + 'V' + '\x00'; // Full cut
    const LF = '\n';
    let receipt = '';
    const receiptNumber = data.receipt || '-';
    // Initialize
    receipt += INIT;
    // Header - Store name (centered, bold, double size)
    receipt += CENTER + BOLD_ON + DOUBLE_ON;
    receipt += data.store_name + LF;
    receipt += DOUBLE_OFF + BOLD_OFF;
    // Address
    data.store_address.split('\n').forEach((addr) => {
        receipt += addr + LF;
    });
    if (data.store_phone) {
        receipt += `Telp: ${data.store_phone}` + LF;
    }
    if (data.receipt_header) {
        data.receipt_header.split('\n').forEach((header) => {
            receipt += header + LF;
        });
    }
    receipt += '================================' + LF;
    // Order info (left aligned)
    receipt += LEFT;
    receipt += `No: ${receiptNumber}` + LF;
    receipt += `Tgl: ${data.order_date} ${data.order_time}` + LF;
    receipt += `Kasir: ${data.cashier_name}` + LF;
    if (data.customer_name) {
        receipt += `Pelanggan: ${data.customer_name}` + LF;
    }
    receipt += `Tipe Pesanan: ${data.order_type}` + LF;
    receipt += '--------------------------------' + LF;
    // Items
    data.items.forEach((item) => {
        receipt += item.name + LF;
        receipt += `  ${item.qty} x ${(0, format_money_utility_1.formatMoney)(item.price)}`;
        receipt += `  ${(0, format_money_utility_1.formatMoney)(item.subtotal)}` + LF;
    });
    receipt += '--------------------------------' + LF;
    // Totals
    receipt += BOLD_ON;
    receipt += `TOTAL: ${(0, format_money_utility_1.formatMoney)(data.total)}` + LF;
    receipt += BOLD_OFF;
    receipt += `Bayar (${data.payment_type}): ${(0, format_money_utility_1.formatMoney)(data.paid_amount)}` + LF;
    if (data.change_amount > 0) {
        receipt += `Kembalian: ${(0, format_money_utility_1.formatMoney)(data.change_amount)}` + LF;
    }
    receipt += '================================' + LF;
    // Footer (centered)
    receipt += CENTER;
    receipt += 'Terima Kasih' + LF;
    const footerLines = data.receipt_footer
        ? data.receipt_footer.split('\n')
        : ['Selamat Menikmati'];
    footerLines.forEach((footer) => {
        receipt += footer + LF;
    });
    receipt += LF + LF + LF;
    // Cut paper
    receipt += CUT;
    return receipt;
};
exports.orderService = {
    getAll: exports.getAll,
    getDetail: exports.getDetail,
    create: exports.create,
    confirmPayment: exports.confirmPayment,
    cancelOrder: exports.cancelOrder,
    getReceipt: exports.getReceipt,
};
exports.default = exports.orderService;
//# sourceMappingURL=order.service.js.map