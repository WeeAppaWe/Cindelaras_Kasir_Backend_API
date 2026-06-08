"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashMovementController = exports.create = exports.detail = exports.showAll = void 0;
const cash_movement_service_1 = __importDefault(require("./cash-movement.service"));
const response_api_1 = __importDefault(require("../../../utility/response-api"));
/**
 * Get All Cash Movements
 * GET /api/cash-movement
 */
const showAll = async (req, res, next) => {
    try {
        const data = await cash_movement_service_1.default.getAll(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data mutasi kas' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.showAll = showAll;
/**
 * Get Cash Movement Detail
 * GET /api/cash-movement/:cash_movement_id
 */
const detail = async (req, res, next) => {
    try {
        const data = await cash_movement_service_1.default.getDetail(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil detail mutasi kas' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.detail = detail;
/**
 * Create New Cash Movement
 * POST /api/cash-movement
 */
const create = async (req, res, next) => {
    try {
        const data = await cash_movement_service_1.default.create(req);
        res.status(201).json((0, response_api_1.default)({ code: 201, message: data.message }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
exports.cashMovementController = {
    showAll: exports.showAll,
    detail: exports.detail,
    create: exports.create,
};
exports.default = exports.cashMovementController;
//# sourceMappingURL=cash-movement.controller.js.map