"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.getUserStatuses = exports.getRoles = exports.softDelete = exports.update = exports.create = exports.detail = exports.showAll = void 0;
const user_service_1 = __importDefault(require("./user.service"));
const response_api_1 = __importDefault(require("../../../utility/response-api"));
/**
 * Get All Users
 * GET /api/user
 */
const showAll = async (req, res, next) => {
    try {
        const data = await user_service_1.default.getAll(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data user' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.showAll = showAll;
/**
 * Get User Detail
 * GET /api/user/:user_id
 */
const detail = async (req, res, next) => {
    try {
        const data = await user_service_1.default.getDetail(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil detail user' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.detail = detail;
/**
 * Create New User
 * POST /api/user
 */
const create = async (req, res, next) => {
    try {
        const data = await user_service_1.default.create(req);
        res.status(201).json((0, response_api_1.default)({ code: 201, message: 'User berhasil dibuat' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
/**
 * Update User
 * PUT /api/user/:user_id
 */
const update = async (req, res, next) => {
    try {
        const data = await user_service_1.default.update(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'User berhasil diperbarui' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
/**
 * Delete User (Soft Delete)
 * DELETE /api/user/:user_id
 */
const softDelete = async (req, res, next) => {
    try {
        const data = await user_service_1.default.softDelete(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'User berhasil dihapus' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.softDelete = softDelete;
/**
 * Get All Roles (for dropdown)
 * GET /api/user/roles
 */
const getRoles = async (req, res, next) => {
    try {
        const data = await user_service_1.default.getRoles();
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data role' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getRoles = getRoles;
/**
 * Get All User Statuses (for dropdown)
 * GET /api/user/statuses
 */
const getUserStatuses = async (req, res, next) => {
    try {
        const data = await user_service_1.default.getUserStatuses();
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data status user' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getUserStatuses = getUserStatuses;
exports.userController = {
    showAll: exports.showAll,
    detail: exports.detail,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
    getRoles: exports.getRoles,
    getUserStatuses: exports.getUserStatuses,
};
exports.default = exports.userController;
//# sourceMappingURL=user.controller.js.map