"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeSettingRepository = exports.softDeleteByKey = exports.batchUpsert = exports.upsert = exports.updateByKey = exports.create = exports.findById = exports.findByKey = exports.findAll = void 0;
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
// Select fields for store setting queries
const storeSettingSelectFields = {
    store_setting_id: true,
    setting_key: true,
    setting_value: true,
    created_at: true,
    updated_at: true,
};
/**
 * Find all store settings
 */
const findAll = async () => {
    try {
        const settings = await prisma.storeSetting.findMany({
            where: {
                deleted_at: null,
            },
            select: storeSettingSelectFields,
            orderBy: { setting_key: 'asc' },
        });
        return settings;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findAll = findAll;
/**
 * Find setting by key
 */
const findByKey = async (settingKey) => {
    try {
        const setting = await prisma.storeSetting.findFirst({
            where: {
                setting_key: settingKey,
                deleted_at: null,
            },
            select: storeSettingSelectFields,
        });
        return setting;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findByKey = findByKey;
/**
 * Find setting by ID
 */
const findById = async (settingId) => {
    try {
        const setting = await prisma.storeSetting.findUnique({
            where: {
                store_setting_id: settingId,
                deleted_at: null,
            },
            select: storeSettingSelectFields,
        });
        return setting;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findById = findById;
/**
 * Create new setting
 */
const create = async (data, transaction) => {
    try {
        const client = transaction || prisma;
        const setting = await client.storeSetting.create({
            data: {
                setting_key: data.setting_key,
                setting_value: data.setting_value,
            },
            select: storeSettingSelectFields,
        });
        return setting;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.create = create;
/**
 * Update setting by key
 */
const updateByKey = async (settingKey, settingValue, transaction) => {
    try {
        const client = transaction || prisma;
        // Find the setting first
        const existing = await client.storeSetting.findFirst({
            where: {
                setting_key: settingKey,
                deleted_at: null,
            },
        });
        if (!existing) {
            throw new Error('Setting not found');
        }
        const setting = await client.storeSetting.update({
            where: { store_setting_id: existing.store_setting_id },
            data: { setting_value: settingValue },
            select: storeSettingSelectFields,
        });
        return setting;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.updateByKey = updateByKey;
/**
 * Upsert setting (create or update)
 */
const upsert = async (settingKey, settingValue, transaction) => {
    try {
        const client = transaction || prisma;
        // Check if setting exists
        const existing = await client.storeSetting.findFirst({
            where: {
                setting_key: settingKey,
                deleted_at: null,
            },
        });
        if (existing) {
            // Update existing
            const setting = await client.storeSetting.update({
                where: { store_setting_id: existing.store_setting_id },
                data: { setting_value: settingValue },
                select: storeSettingSelectFields,
            });
            return setting;
        }
        else {
            // Create new
            const setting = await client.storeSetting.create({
                data: {
                    setting_key: settingKey,
                    setting_value: settingValue,
                },
                select: storeSettingSelectFields,
            });
            return setting;
        }
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.upsert = upsert;
/**
 * Batch upsert settings
 */
const batchUpsert = async (settings, transaction) => {
    try {
        const client = transaction || prisma;
        let count = 0;
        for (const setting of settings) {
            await (0, exports.upsert)(setting.setting_key, setting.setting_value, client);
            count++;
        }
        return count;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.batchUpsert = batchUpsert;
/**
 * Soft delete setting by key
 */
const softDeleteByKey = async (settingKey, transaction) => {
    try {
        const client = transaction || prisma;
        const existing = await client.storeSetting.findFirst({
            where: {
                setting_key: settingKey,
                deleted_at: null,
            },
        });
        if (existing) {
            await client.storeSetting.update({
                where: { store_setting_id: existing.store_setting_id },
                data: { deleted_at: new Date() },
            });
        }
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.softDeleteByKey = softDeleteByKey;
exports.storeSettingRepository = {
    findAll: exports.findAll,
    findByKey: exports.findByKey,
    findById: exports.findById,
    create: exports.create,
    updateByKey: exports.updateByKey,
    upsert: exports.upsert,
    batchUpsert: exports.batchUpsert,
    softDeleteByKey: exports.softDeleteByKey,
};
exports.default = exports.storeSettingRepository;
//# sourceMappingURL=store-setting.repository.js.map