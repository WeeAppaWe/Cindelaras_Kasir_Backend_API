"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuController = exports.toggleAvailability = exports.softDelete = exports.update = exports.create = exports.detail = exports.showAll = void 0;
const menu_service_1 = __importDefault(require("./menu.service"));
const response_api_1 = __importDefault(require("../../../utility/response-api"));
/**
 * Get All Menus
 * GET /api/menu
 */
const showAll = async (req, res, next) => {
    try {
        const data = await menu_service_1.default.getAll(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data menu' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.showAll = showAll;
/**
 * Get Menu Detail
 * GET /api/menu/:menu_id
 */
const detail = async (req, res, next) => {
    try {
        const data = await menu_service_1.default.getDetail(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil detail menu' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.detail = detail;
/**
 * Create New Menu
 * POST /api/menu
 */
const create = async (req, res, next) => {
    try {
        const data = await menu_service_1.default.create(req);
        res.status(201).json((0, response_api_1.default)({ code: 201, message: 'Menu berhasil dibuat' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
/**
 * Update Menu
 * PUT /api/menu/:menu_id
 */
const update = async (req, res, next) => {
    try {
        const data = await menu_service_1.default.update(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Menu berhasil diperbarui' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
/**
 * Delete Menu (Soft Delete)
 * DELETE /api/menu/:menu_id
 */
const softDelete = async (req, res, next) => {
    try {
        const data = await menu_service_1.default.softDelete(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Menu berhasil dihapus' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.softDelete = softDelete;
/**
 * Toggle Menu Availability
 * PATCH /api/menu/:menu_id/toggle-availability
 */
const toggleAvailability = async (req, res, next) => {
    try {
        const data = await menu_service_1.default.toggleAvailability(req);
        const message = data.is_available ? 'Menu diaktifkan' : 'Menu dinonaktifkan';
        res.status(200).json((0, response_api_1.default)({ code: 200, message }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.toggleAvailability = toggleAvailability;
exports.menuController = {
    showAll: exports.showAll,
    detail: exports.detail,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
    toggleAvailability: exports.toggleAvailability,
};
exports.default = exports.menuController;
//# sourceMappingURL=menu.controller.js.map