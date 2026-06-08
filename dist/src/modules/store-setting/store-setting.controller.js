"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeSettingController = exports.getPublicInfo = exports.deleteByKey = exports.batchUpdate = exports.upsertByKey = exports.upsert = exports.getByKey = exports.showAllAsMap = exports.showAll = void 0;
const store_setting_service_1 = __importDefault(require("./store-setting.service"));
const response_api_1 = __importDefault(require("../../../utility/response-api"));
/**
 * Get All Store Settings (as array)
 * GET /api/store-setting
 */
const showAll = async (req, res, next) => {
    try {
        const data = await store_setting_service_1.default.getAll(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data pengaturan toko' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.showAll = showAll;
/**
 * Get All Store Settings as Map (key-value object)
 * GET /api/store-setting/map
 */
const showAllAsMap = async (req, res, next) => {
    try {
        const data = await store_setting_service_1.default.getAllAsMap(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data pengaturan toko' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.showAllAsMap = showAllAsMap;
/**
 * Get Store Setting by Key
 * GET /api/store-setting/:setting_key
 */
const getByKey = async (req, res, next) => {
    try {
        const data = await store_setting_service_1.default.getByKey(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil pengaturan' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getByKey = getByKey;
/**
 * Upsert Store Setting (create or update)
 * POST /api/store-setting
 */
const upsert = async (req, res, next) => {
    try {
        const data = await store_setting_service_1.default.upsert(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: data.message }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.upsert = upsert;
/**
 * Update Store Setting by Key (upsert)
 * PUT /api/store-setting/:setting_key
 */
const upsertByKey = async (req, res, next) => {
    try {
        const data = await store_setting_service_1.default.upsertByKey(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: data.message }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.upsertByKey = upsertByKey;
/**
 * Batch Update Store Settings
 * PUT /api/store-setting/batch
 */
const batchUpdate = async (req, res, next) => {
    try {
        const data = await store_setting_service_1.default.batchUpdate(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: data.message }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.batchUpdate = batchUpdate;
/**
 * Delete Store Setting by Key (Soft Delete)
 * DELETE /api/store-setting/:setting_key
 */
const deleteByKey = async (req, res, next) => {
    try {
        const data = await store_setting_service_1.default.deleteByKey(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: data.message }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.deleteByKey = deleteByKey;
/**
 * Get Public Store Info (name and logo only)
 * GET /api/store-setting/public/info
 * This endpoint is accessible by authenticated users (Admin & Cashier)
 */
const getPublicInfo = async (req, res, next) => {
    try {
        const data = await store_setting_service_1.default.getPublicInfo();
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil info toko' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getPublicInfo = getPublicInfo;
exports.storeSettingController = {
    showAll: exports.showAll,
    showAllAsMap: exports.showAllAsMap,
    getByKey: exports.getByKey,
    upsert: exports.upsert,
    upsertByKey: exports.upsertByKey,
    batchUpdate: exports.batchUpdate,
    deleteByKey: exports.deleteByKey,
    getPublicInfo: exports.getPublicInfo,
};
exports.default = exports.storeSettingController;
//# sourceMappingURL=store-setting.controller.js.map