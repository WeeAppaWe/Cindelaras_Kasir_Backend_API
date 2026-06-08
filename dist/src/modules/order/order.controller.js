"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = exports.getReceipt = exports.cancelOrder = exports.confirmPayment = exports.create = exports.detail = exports.showAll = void 0;
const response_api_1 = __importDefault(require("../../../utility/response-api"));
const order_service_1 = __importDefault(require("./order.service"));
// ============================================
// GET ALL ORDERS (History)
// ============================================
const showAll = async (req, res, next) => {
    try {
        const result = await order_service_1.default.getAll(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Data pesanan berhasil diambil' }, result));
    }
    catch (error) {
        next(error);
    }
};
exports.showAll = showAll;
// ============================================
// GET ORDER DETAIL
// ============================================
const detail = async (req, res, next) => {
    try {
        const result = await order_service_1.default.getDetail(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Detail pesanan berhasil diambil' }, result));
    }
    catch (error) {
        next(error);
    }
};
exports.detail = detail;
// ============================================
// CREATE ORDER (Checkout)
// ============================================
const create = async (req, res, next) => {
    try {
        const result = await order_service_1.default.create(req);
        res.status(201).json((0, response_api_1.default)({ code: 201, message: result.message }, result));
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
// ============================================
// CONFIRM PAYMENT (for QRIS)
// ============================================
const confirmPayment = async (req, res, next) => {
    try {
        const result = await order_service_1.default.confirmPayment(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: result.message }, result));
    }
    catch (error) {
        next(error);
    }
};
exports.confirmPayment = confirmPayment;
// ============================================
// CANCEL ORDER
// ============================================
const cancelOrder = async (req, res, next) => {
    try {
        const result = await order_service_1.default.cancelOrder(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: result.message }, result));
    }
    catch (error) {
        next(error);
    }
};
exports.cancelOrder = cancelOrder;
// ============================================
// GET RECEIPT (for printing)
// ============================================
const getReceipt = async (req, res, next) => {
    try {
        const result = await order_service_1.default.getReceipt(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Struk berhasil diambil' }, result));
    }
    catch (error) {
        next(error);
    }
};
exports.getReceipt = getReceipt;
exports.orderController = {
    showAll: exports.showAll,
    detail: exports.detail,
    create: exports.create,
    confirmPayment: exports.confirmPayment,
    cancelOrder: exports.cancelOrder,
    getReceipt: exports.getReceipt,
};
exports.default = exports.orderController;
//# sourceMappingURL=order.controller.js.map