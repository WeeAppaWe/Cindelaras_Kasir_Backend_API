"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeSettingService = exports.getPublicInfo = exports.deleteByKey = exports.batchUpdate = exports.upsert = exports.upsertByKey = exports.getByKey = exports.getAllAsMap = exports.getAll = void 0;
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const store_setting_repository_1 = __importDefault(require("./store-setting.repository"));
const prisma = (0, postgres_connection_1.default)();
/**
 * Get all store settings (as array)
 */
const getAll = async (req) => {
    try {
        const settings = await store_setting_repository_1.default.findAll();
        return {
            records: settings,
            total: settings.length,
        };
    }
    catch (error) {
        console.error(`--- Store Setting Service Error: ${error.message}`);
        throw error;
    }
};
exports.getAll = getAll;
/**
 * Get all store settings as key-value map (easier for FE)
 */
const getAllAsMap = async (req) => {
    try {
        const settings = await store_setting_repository_1.default.findAll();
        // Convert to key-value object
        const settingsMap = {};
        for (const setting of settings) {
            settingsMap[setting.setting_key] = setting.setting_value;
        }
        return settingsMap;
    }
    catch (error) {
        console.error(`--- Store Setting Service Error: ${error.message}`);
        throw error;
    }
};
exports.getAllAsMap = getAllAsMap;
/**
 * Get single setting by key
 */
const getByKey = async (req) => {
    try {
        const settingKey = req.params.setting_key;
        const setting = await store_setting_repository_1.default.findByKey(settingKey);
        if (!setting) {
            throw new error_not_found_exception_1.ErrorNotFoundException(`Setting '${settingKey}' tidak ditemukan`);
        }
        return setting;
    }
    catch (error) {
        console.error(`--- Store Setting Service Error: ${error.message}`);
        throw error;
    }
};
exports.getByKey = getByKey;
/**
 * Update or create single setting by key (upsert)
 */
const upsertByKey = async (req) => {
    try {
        const settingKey = req.params.setting_key;
        const { setting_value } = req.body;
        const result = await store_setting_repository_1.default.upsert(settingKey, setting_value);
        return {
            success: true,
            message: `Setting '${settingKey}' berhasil disimpan`,
            data: result,
        };
    }
    catch (error) {
        console.error(`--- Store Setting Service Error: ${error.message}`);
        throw error;
    }
};
exports.upsertByKey = upsertByKey;
/**
 * Upsert setting (create or update) - POST endpoint
 */
const upsert = async (req) => {
    try {
        const body = req.body;
        const result = await store_setting_repository_1.default.upsert(body.setting_key, body.setting_value);
        return {
            success: true,
            message: `Setting '${body.setting_key}' berhasil disimpan`,
            data: result,
        };
    }
    catch (error) {
        console.error(`--- Store Setting Service Error: ${error.message}`);
        throw error;
    }
};
exports.upsert = upsert;
/**
 * Batch update multiple settings (upsert)
 */
const batchUpdate = async (req) => {
    try {
        const body = req.body;
        // Use transaction for batch update
        const updatedCount = await prisma.$transaction(async (tx) => {
            return await store_setting_repository_1.default.batchUpsert(body.settings, tx);
        });
        return {
            success: true,
            message: `${updatedCount} setting berhasil diperbarui`,
            updated_count: updatedCount,
        };
    }
    catch (error) {
        console.error(`--- Store Setting Service Error: ${error.message}`);
        throw error;
    }
};
exports.batchUpdate = batchUpdate;
/**
 * Delete setting by key (soft delete)
 */
const deleteByKey = async (req) => {
    try {
        const settingKey = req.params.setting_key;
        // Check if exists
        const existing = await store_setting_repository_1.default.findByKey(settingKey);
        if (!existing) {
            throw new error_not_found_exception_1.ErrorNotFoundException(`Setting '${settingKey}' tidak ditemukan`);
        }
        await store_setting_repository_1.default.softDeleteByKey(settingKey);
        return {
            success: true,
            message: `Setting '${settingKey}' berhasil dihapus`,
        };
    }
    catch (error) {
        console.error(`--- Store Setting Service Error: ${error.message}`);
        throw error;
    }
};
exports.deleteByKey = deleteByKey;
/**
 * Get public store info (name and logo only)
 * Accessible by all authenticated users
 */
const getPublicInfo = async () => {
    try {
        const settings = await store_setting_repository_1.default.findAll();
        // Extract only name and logo
        let storeName = '';
        let storeLogo = '';
        for (const setting of settings) {
            if (setting.setting_key === 'store_name') {
                storeName = setting.setting_value;
            }
            else if (setting.setting_key === 'store_logo') {
                storeLogo = setting.setting_value;
            }
        }
        return {
            store_name: storeName,
            store_logo: storeLogo,
        };
    }
    catch (error) {
        console.error(`--- Store Setting Service Error: ${error.message}`);
        throw error;
    }
};
exports.getPublicInfo = getPublicInfo;
exports.storeSettingService = {
    getAll: exports.getAll,
    getAllAsMap: exports.getAllAsMap,
    getByKey: exports.getByKey,
    upsertByKey: exports.upsertByKey,
    upsert: exports.upsert,
    batchUpdate: exports.batchUpdate,
    deleteByKey: exports.deleteByKey,
    getPublicInfo: exports.getPublicInfo,
};
exports.default = exports.storeSettingService;
//# sourceMappingURL=store-setting.service.js.map