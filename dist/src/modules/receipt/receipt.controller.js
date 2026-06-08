"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiptController = exports.getReceiptPreview = exports.sendReceipt = exports.getPdfReceipt = void 0;
const receipt_service_1 = __importDefault(require("./receipt.service"));
const response_api_1 = __importDefault(require("../../../utility/response-api"));
/**
 * Get PDF Receipt (On-Demand Generation)
 * GET /api/receipt/:order_id/pdf
 * Public endpoint - no auth required (link shared via WhatsApp)
 */
const getPdfReceipt = async (req, res, next) => {
    try {
        await receipt_service_1.default.getPdfReceipt(req, res);
    }
    catch (error) {
        next(error);
    }
};
exports.getPdfReceipt = getPdfReceipt;
/**
 * Send Receipt to WhatsApp
 * POST /api/receipt/:order_id/send
 */
const sendReceipt = async (req, res, next) => {
    try {
        const data = await receipt_service_1.default.sendReceipt(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: data.message }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.sendReceipt = sendReceipt;
/**
 * Get Receipt Preview (JSON data)
 * GET /api/receipt/:order_id/preview
 */
const getReceiptPreview = async (req, res, next) => {
    try {
        const data = await receipt_service_1.default.getReceiptPreview(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data struk' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getReceiptPreview = getReceiptPreview;
exports.receiptController = {
    getPdfReceipt: exports.getPdfReceipt,
    sendReceipt: exports.sendReceipt,
    getReceiptPreview: exports.getReceiptPreview,
};
exports.default = exports.receiptController;
//# sourceMappingURL=receipt.controller.js.map