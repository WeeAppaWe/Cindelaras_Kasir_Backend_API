"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.semiIngredientService = exports.recalculateAvgCost = exports.getHPPCalculation = exports.softDelete = exports.update = exports.create = exports.getDetail = exports.getAll = void 0;
const error_not_found_exception_1 = require("../../../../exception/error-not-found.exception");
const error_data_already_exist_exception_1 = require("../../../../exception/error-data-already-exist.exception");
const error_validation_exception_1 = require("../../../../exception/error-validation.exception");
const postgres_connection_1 = __importDefault(require("../../../../database/postgres.connection"));
const pagination_utility_1 = require("../../../../utility/pagination.utility");
const cost_calculation_utility_1 = require("../../../../utility/cost-calculation.utility");
const ingredient_semi_repository_1 = __importDefault(require("./ingredient-semi.repository"));
const unit_measure_service_1 = __importDefault(require("../../unit-measure/unit-measure.service"));
const ingredient_semi_types_1 = require("./ingredient-semi.types");
const prisma = (0, postgres_connection_1.default)();
/**
 * Get all semi ingredients with pagination and filters
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
        const filter = {
            search: req.query.search || null,
            unit_id: req.query.unit_id || null,
        };
        const [data, totalData] = await Promise.all([
            ingredient_semi_repository_1.default.findAll(options, filter),
            ingredient_semi_repository_1.default.count(filter),
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
        console.error(`--- Semi Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.getAll = getAll;
/**
 * Get semi ingredient detail by ID (with compositions and HPP)
 */
const getDetail = async (req) => {
    try {
        const ingredientId = req.params.ingredient_id;
        const ingredient = await ingredient_semi_repository_1.default.findByIdWithCompositions(ingredientId);
        if (!ingredient) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }
        // Calculate total HPP from compositions
        const recipeItems = ingredient.child_compositions.map((c) => ({
            ingredient_id: c.child_id,
            qty_needed: Number(c.qty_needed),
            avg_cost: Number(c.child_ingredient.avg_cost),
        }));
        const totalHPP = (0, cost_calculation_utility_1.roundCurrency)((0, cost_calculation_utility_1.calculateHPP)(recipeItems));
        return {
            ...ingredient,
            total_hpp: totalHPP,
        };
    }
    catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.getDetail = getDetail;
/**
 * Create new semi ingredient
 */
const create = async (req) => {
    try {
        const body = req.body;
        // Check if name already exists
        const existingIngredient = await ingredient_semi_repository_1.default.findByName(body.name);
        if (existingIngredient) {
            throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Nama bahan setengah jadi sudah digunakan');
        }
        // Validate unit_id exists
        const unitMeasure = await unit_measure_service_1.default.findById(body.unit_id);
        if (!unitMeasure) {
            throw new error_validation_exception_1.ErrorValidationException('Satuan tidak ditemukan', [
                { location: 'body', field: 'unit_id', message: 'Satuan tidak ditemukan' },
            ]);
        }
        // Create semi ingredient in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const ingredient = await ingredient_semi_repository_1.default.create({
                name: body.name,
                unit_id: body.unit_id,
                type: ingredient_semi_types_1.IngredientType.SEMI,
                stock_qty: 0, // Start with 0 stock
                min_stock: body.min_stock,
                avg_cost: 0, // Will be calculated when compositions are added
            }, transaction);
            return ingredient;
        });
        return result;
    }
    catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.create = create;
/**
 * Update semi ingredient by ID
 */
const update = async (req) => {
    try {
        const ingredientId = req.params.ingredient_id;
        const body = req.body;
        // Check if ingredient exists
        const existingIngredient = await ingredient_semi_repository_1.default.findById(ingredientId);
        if (!existingIngredient) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }
        // Check if name already used by another ingredient
        if (body.name) {
            const duplicateIngredient = await ingredient_semi_repository_1.default.findByName(body.name, ingredientId);
            if (duplicateIngredient) {
                throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Nama bahan setengah jadi sudah digunakan');
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
        // Update in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const ingredient = await ingredient_semi_repository_1.default.update(ingredientId, updateData, transaction);
            return ingredient;
        });
        return result;
    }
    catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.update = update;
/**
 * Soft delete semi ingredient by ID
 */
const softDelete = async (req) => {
    try {
        const ingredientId = req.params.ingredient_id;
        // Check if ingredient exists
        const existingIngredient = await ingredient_semi_repository_1.default.findById(ingredientId);
        if (!existingIngredient) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }
        // Soft delete in transaction
        await prisma.$transaction(async (transaction) => {
            await ingredient_semi_repository_1.default.softDelete(ingredientId, transaction);
        });
        return {
            success: true,
            message: 'Bahan setengah jadi berhasil dihapus',
        };
    }
    catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.softDelete = softDelete;
/**
 * Get HPP calculation for a semi ingredient
 */
const getHPPCalculation = async (ingredientId, targetYield = 1) => {
    try {
        const ingredient = await ingredient_semi_repository_1.default.findByIdWithCompositions(ingredientId);
        if (!ingredient) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }
        const compositions = ingredient.child_compositions.map((c) => ({
            ingredient_id: c.child_id,
            ingredient_name: c.child_ingredient.name,
            qty_needed: Number(c.qty_needed),
            unit_name: c.child_ingredient.unit.name,
            unit_cost: Number(c.child_ingredient.avg_cost),
            subtotal: (0, cost_calculation_utility_1.roundCurrency)(Number(c.qty_needed) * Number(c.child_ingredient.avg_cost)),
        }));
        const recipeItems = compositions.map((c) => ({
            ingredient_id: c.ingredient_id,
            qty_needed: c.qty_needed,
            avg_cost: c.unit_cost,
        }));
        const totalHPP = (0, cost_calculation_utility_1.roundCurrency)((0, cost_calculation_utility_1.calculateHPP)(recipeItems));
        const hppPerUnit = (0, cost_calculation_utility_1.roundCurrency)(totalHPP / targetYield);
        return {
            total_hpp: totalHPP,
            target_yield: targetYield,
            hpp_per_unit: hppPerUnit,
            composition_count: compositions.length,
            compositions: compositions.map((c) => ({
                ingredient_name: c.ingredient_name,
                qty_needed: c.qty_needed,
                unit_name: c.unit_name,
                unit_cost: c.unit_cost,
                subtotal: c.subtotal,
            })),
        };
    }
    catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.getHPPCalculation = getHPPCalculation;
/**
 * Recalculate and update avg_cost (HPP per unit) for a semi ingredient
 */
const recalculateAvgCost = async (ingredientId, targetYield = 1) => {
    try {
        const hppResult = await (0, exports.getHPPCalculation)(ingredientId, targetYield);
        await prisma.$transaction(async (transaction) => {
            await ingredient_semi_repository_1.default.updateAvgCost(ingredientId, hppResult.hpp_per_unit, transaction);
        });
        return hppResult.hpp_per_unit;
    }
    catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.recalculateAvgCost = recalculateAvgCost;
exports.semiIngredientService = {
    getAll: exports.getAll,
    getDetail: exports.getDetail,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
    getHPPCalculation: exports.getHPPCalculation,
    recalculateAvgCost: exports.recalculateAvgCost,
};
exports.default = exports.semiIngredientService;
//# sourceMappingURL=ingredient-semi.service.js.map