"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockTypeService = exports.getDetail = exports.getAll = void 0;
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const stock_type_repository_1 = __importDefault(require("./stock-type.repository"));
/**
 * Get all stock types
 */
const getAll = async () => {
    try {
        const stockTypes = await stock_type_repository_1.default.findAll();
        return stockTypes;
    }
    catch (error) {
        console.error(`--- StockType Service Error: ${error.message}`);
        throw error;
    }
};
exports.getAll = getAll;
/**
 * Get stock type detail by ID
 */
const getDetail = async (req) => {
    try {
        const stockTypeId = req.params.stock_type_id;
        const stockType = await stock_type_repository_1.default.findById(stockTypeId);
        if (!stockType) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Stock type tidak ditemukan');
        }
        return stockType;
    }
    catch (error) {
        console.error(`--- StockType Service Error: ${error.message}`);
        throw error;
    }
};
exports.getDetail = getDetail;
exports.stockTypeService = {
    getAll: exports.getAll,
    getDetail: exports.getDetail,
};
exports.default = exports.stockTypeService;
//# sourceMappingURL=stock-type.service.js.map