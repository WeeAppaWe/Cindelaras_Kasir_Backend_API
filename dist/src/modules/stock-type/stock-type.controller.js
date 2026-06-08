"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockTypeController = exports.detail = exports.showAll = void 0;
const stock_type_service_1 = __importDefault(require("./stock-type.service"));
const response_api_1 = __importDefault(require("../../../utility/response-api"));
/**
 * Get All Stock Types
 * GET /api/stock-type
 */
const showAll = async (req, res, next) => {
    try {
        const data = await stock_type_service_1.default.getAll();
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil daftar tipe stok' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.showAll = showAll;
/**
 * Get Stock Type Detail
 * GET /api/stock-type/:stock_type_id
 */
const detail = async (req, res, next) => {
    try {
        const data = await stock_type_service_1.default.getDetail(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil detail tipe stok' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.detail = detail;
exports.stockTypeController = {
    showAll: exports.showAll,
    detail: exports.detail,
};
exports.default = exports.stockTypeController;
//# sourceMappingURL=stock-type.controller.js.map