"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawIngredientService = exports.getLowStockAlerts = exports.softDelete = exports.update = exports.create = exports.getDetail = exports.getAll = exports.getAllReferences = void 0;
const error_not_found_exception_1 = require("../../../../exception/error-not-found.exception");
const error_data_already_exist_exception_1 = require("../../../../exception/error-data-already-exist.exception");
const error_validation_exception_1 = require("../../../../exception/error-validation.exception");
const postgres_connection_1 = __importDefault(require("../../../../database/postgres.connection"));
const pagination_utility_1 = require("../../../../utility/pagination.utility");
const ingredient_raw_repository_1 = __importDefault(require("./ingredient-raw.repository"));
const unit_measure_service_1 = __importDefault(require("../../unit-measure/unit-measure.service"));
const ingredient_raw_types_1 = require("./ingredient-raw.types");
const prisma = (0, postgres_connection_1.default)();
/**
 * Get all raw ingredients (for dropdown/selection)
 */
const getAllReferences = async () => {
    try {
        return await ingredient_raw_repository_1.default.findAllReferences();
    }
    catch (error) {
        console.error(`--- Raw Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.getAllReferences = getAllReferences;
/**
 * Get all raw ingredients with pagination and filters
 */
const getAll = async (req) => {
    try {
        const pageNumber = parseInt(req.query.batch) || 1;
        const pageSize = parseInt(req.query.size) || 10;
        const pagination = (0, pagination_utility_1.getPagination)(pageNumber, pageSize);
        const options = {
            pagination: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        };
        // Set search and filters
        const filter = {
            search: req.query.search || null,
            unit_id: req.query.unit_id || null,
            low_stock: req.query.low_stock === 'true' || null,
        };
        const [data, totalData] = await Promise.all([
            ingredient_raw_repository_1.default.findAll(options, filter),
            ingredient_raw_repository_1.default.count(filter),
        ]);
        return {
            page: {
                total_record_count: totalData,
                batch_number: pageNumber,
                batch_size: data.length,
                max_batch_size: pageSize,
            },
            records: data,
        };
    }
    catch (error) {
        console.error(`--- Raw Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.getAll = getAll;
/**
 * Get raw ingredient detail by ID
 */
const getDetail = async (req) => {
    try {
        const ingredientId = req.params.ingredient_id;
        const ingredient = await ingredient_raw_repository_1.default.findById(ingredientId);
        if (!ingredient) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Bahan baku tidak ditemukan');
        }
        return ingredient;
    }
    catch (error) {
        console.error(`--- Raw Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.getDetail = getDetail;
/**
 * Create new raw ingredient
 */
const create = async (req) => {
    try {
        const body = req.body;
        // Check if name already exists
        const existingIngredient = await ingredient_raw_repository_1.default.findByName(body.name);
        if (existingIngredient) {
            throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Nama bahan baku sudah digunakan');
        }
        // Validate unit_id exists
        const unitMeasure = await unit_measure_service_1.default.findById(body.unit_id);
        if (!unitMeasure) {
            throw new error_validation_exception_1.ErrorValidationException('Satuan tidak ditemukan', [
                { location: 'body', field: 'unit_id', message: 'Satuan tidak ditemukan' },
            ]);
        }
        // Create raw ingredient in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const ingredient = await ingredient_raw_repository_1.default.create({
                name: body.name,
                unit_id: body.unit_id,
                type: ingredient_raw_types_1.IngredientType.RAW,
                stock_qty: body.stock_qty ?? 0,
                min_stock: body.min_stock,
                avg_cost: body.avg_cost ?? 0,
            }, transaction);
            return ingredient;
        });
        return result;
    }
    catch (error) {
        console.error(`--- Raw Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.create = create;
/**
 * Update raw ingredient by ID
 */
const update = async (req) => {
    try {
        const ingredientId = req.params.ingredient_id;
        const body = req.body;
        // Check if ingredient exists
        const existingIngredient = await ingredient_raw_repository_1.default.findById(ingredientId);
        if (!existingIngredient) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Bahan baku tidak ditemukan');
        }
        // Check if name already used by another ingredient
        if (body.name) {
            const duplicateIngredient = await ingredient_raw_repository_1.default.findByName(body.name, ingredientId);
            if (duplicateIngredient) {
                throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Nama bahan baku sudah digunakan');
            }
        }
        // Validate unit_id if provided
        if (body.unit_id) {
            const unitMeasure = await unit_measure_service_1.default.findById(body.unit_id);
            if (!unitMeasure) {
                throw new error_validation_exception_1.ErrorValidationException('Satuan tidak ditemukan', [
                    { location: 'body', field: 'unit_id', message: 'Satuan tidak ditemukan' },
                ]);
            }
        }
        // Prepare update data
        const updateData = {};
        if (body.name)
            updateData.name = body.name;
        if (body.unit_id)
            updateData.unit_id = body.unit_id;
        if (body.min_stock !== undefined)
            updateData.min_stock = body.min_stock;
        if (body.avg_cost !== undefined)
            updateData.avg_cost = body.avg_cost;
        // Update in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const ingredient = await ingredient_raw_repository_1.default.update(ingredientId, updateData, transaction);
            return ingredient;
        });
        return result;
    }
    catch (error) {
        console.error(`--- Raw Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.update = update;
/**
 * Soft delete raw ingredient by ID
 */
const softDelete = async (req) => {
    try {
        const ingredientId = req.params.ingredient_id;
        // Check if ingredient exists
        const existingIngredient = await ingredient_raw_repository_1.default.findById(ingredientId);
        if (!existingIngredient) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Bahan baku tidak ditemukan');
        }
        // Soft delete in transaction
        await prisma.$transaction(async (transaction) => {
            await ingredient_raw_repository_1.default.softDelete(ingredientId, transaction);
        });
        return {
            success: true,
            message: 'Bahan baku berhasil dihapus',
        };
    }
    catch (error) {
        console.error(`--- Raw Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.softDelete = softDelete;
/**
 * Get low stock alerts
 */
const getLowStockAlerts = async () => {
    try {
        const [ingredients, count] = await Promise.all([
            ingredient_raw_repository_1.default.findLowStock(),
            ingredient_raw_repository_1.default.countLowStock(),
        ]);
        return {
            total_count: count,
            records: ingredients,
        };
    }
    catch (error) {
        console.error(`--- Raw Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.getLowStockAlerts = getLowStockAlerts;
exports.rawIngredientService = {
    getAllReferences: exports.getAllReferences,
    getAll: exports.getAll,
    getDetail: exports.getDetail,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
    getLowStockAlerts: exports.getLowStockAlerts,
};
exports.default = exports.rawIngredientService;
//# sourceMappingURL=ingredient-raw.service.js.map