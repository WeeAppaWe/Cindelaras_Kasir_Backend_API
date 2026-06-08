"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReceiptNumber = exports.formatReceiptDate = void 0;
const RECEIPT_PREFIX = 'STR';
const padTwoDigits = (value) => value.toString().padStart(2, '0');
const formatReceiptDate = (date) => {
    const year = date.getFullYear();
    const month = padTwoDigits(date.getMonth() + 1);
    const day = padTwoDigits(date.getDate());
    return `${year}${month}${day}`;
};
exports.formatReceiptDate = formatReceiptDate;
const generateReceiptNumber = (orderId, date = new Date()) => {
    const normalizedOrderId = orderId.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const orderSuffix = normalizedOrderId.slice(-12);
    return `${RECEIPT_PREFIX}-${(0, exports.formatReceiptDate)(date)}-${orderSuffix}`;
};
exports.generateReceiptNumber = generateReceiptNumber;
exports.default = {
    generateReceiptNumber: exports.generateReceiptNumber,
    formatReceiptDate: exports.formatReceiptDate,
};
//# sourceMappingURL=receipt-number.utility.js.map