"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = exports.softDelete = exports.update = exports.create = exports.detail = exports.showAll = exports.getReferences = void 0;
const category_service_1 = __importDefault(require("./category.service"));
const response_api_1 = __importDefault(require("../../../utility/response-api"));
/**
 * Get Category References (for dropdown)
 * GET /api/category/options
 */
const getReferences = async (req, res, next) => {
    try {
        const data = await category_service_1.default.getAllReferences();
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data pilihan kategori' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getReferences = getReferences;
/**
 * Get All Categories
 * GET /api/category
 */
const showAll = async (req, res, next) => {
    try {
        const data = await category_service_1.default.getAll(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data kategori' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.showAll = showAll;
/**
 * Get Category Detail
 * GET /api/category/:category_id
 */
const detail = async (req, res, next) => {
    try {
        const data = await category_service_1.default.getDetail(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil detail kategori' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.detail = detail;
/**
 * Create New Category
 * POST /api/category
 */
const create = async (req, res, next) => {
    try {
        const data = await category_service_1.default.create(req);
        res.status(201).json((0, response_api_1.default)({ code: 201, message: 'Kategori berhasil dibuat' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
/**
 * Update Category
 * PUT /api/category/:category_id
 */
const update = async (req, res, next) => {
    try {
        const data = await category_service_1.default.update(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Kategori berhasil diperbarui' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
/**
 * Delete Category (Soft Delete)
 * DELETE /api/category/:category_id
 */
const softDelete = async (req, res, next) => {
    try {
        const data = await category_service_1.default.softDelete(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Kategori berhasil dihapus' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.softDelete = softDelete;
exports.categoryController = {
    getReferences: exports.getReferences,
    showAll: exports.showAll,
    detail: exports.detail,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
};
exports.default = exports.categoryController;
//# sourceMappingURL=category.controller.js.map