"use strict";
// ============================================
// ORDER TYPES
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptFormat = exports.OrderStatus = exports.PaymentType = void 0;
// Enums
var PaymentType;
(function (PaymentType) {
    PaymentType["CASH"] = "CASH";
    PaymentType["QRIS"] = "QRIS";
})(PaymentType || (exports.PaymentType = PaymentType = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["COMPLETED"] = "COMPLETED";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
// ============================================
// RECEIPT TYPES
// ============================================
var ReceiptFormat;
(function (ReceiptFormat) {
    ReceiptFormat["TEXT"] = "text";
    ReceiptFormat["ESCPOS"] = "escpos";
    ReceiptFormat["PDF"] = "pdf";
    ReceiptFormat["IMAGE"] = "image";
})(ReceiptFormat || (exports.ReceiptFormat = ReceiptFormat = {}));
//# sourceMappingURL=order.types.js.map