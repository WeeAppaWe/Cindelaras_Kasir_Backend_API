"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supplierController = exports.softDelete = exports.update = exports.create = exports.detail = exports.showAll = void 0;
const supplier_service_1 = __importDefault(require("./supplier.service"));
const response_api_1 = __importDefault(require("../../../utility/response-api"));
/**
 * Get All Suppliers
 * GET /api/supplier
 */
const showAll = async (req, res, next) => {
    try {
        const data = await supplier_service_1.default.getAll(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data supplier' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.showAll = showAll;
/**
 * Get Supplier Detail
 * GET /api/supplier/:supplier_id
 */
const detail = async (req, res, next) => {
    try {
        const data = await supplier_service_1.default.getDetail(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil detail supplier' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.detail = detail;
/**
 * Create New Supplier
 * POST /api/supplier
 */
const create = async (req, res, next) => {
    try {
        const data = await supplier_service_1.default.create(req);
        res.status(201).json((0, response_api_1.default)({ code: 201, message: 'Supplier berhasil dibuat' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
/**
 * Update Supplier
 * PATCH /api/supplier/:supplier_id
 */
const update = async (req, res, next) => {
    try {
        const data = await supplier_service_1.default.update(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Supplier berhasil diperbarui' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
/**
 * Delete Supplier (Soft Delete)
 * DELETE /api/supplier/:supplier_id
 */
const softDelete = async (req, res, next) => {
    try {
        const data = await supplier_service_1.default.softDelete(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Supplier berhasil dihapus' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.softDelete = softDelete;
exports.supplierController = {
    showAll: exports.showAll,
    detail: exports.detail,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
};
exports.default = exports.supplierController;
//# sourceMappingURL=supplier.controller.js.map