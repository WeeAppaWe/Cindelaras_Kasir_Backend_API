"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compositionService = exports.previewHPP = exports.getAvailableIngredients = exports.deleteComposition = exports.updateComposition = exports.bulkAddCompositions = exports.addComposition = exports.getCompositions = void 0;
const error_not_found_exception_1 = require("../../../../../exception/error-not-found.exception");
const error_data_already_exist_exception_1 = require("../../../../../exception/error-data-already-exist.exception");
const error_validation_exception_1 = require("../../../../../exception/error-validation.exception");
const postgres_connection_1 = __importDefault(require("../../../../../database/postgres.connection"));
const cost_calculation_utility_1 = require("../../../../../utility/cost-calculation.utility");
const ingredient_semi_composition_repository_1 = __importDefault(require("./ingredient-semi-composition.repository"));
const ingredient_semi_repository_1 = __importDefault(require("../ingredient-semi.repository"));
const prisma = (0, postgres_connection_1.default)();
/**
 * Get all compositions for a semi ingredient
 */
const getCompositions = async (req) => {
    try {
        const parentId = req.params.ingredient_id;
        // Check if parent semi ingredient exists
        const parent = await ingredient_semi_repository_1.default.findById(parentId);
        if (!parent) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }
        const compositions = await ingredient_semi_composition_repository_1.default.findByParentId(parentId);
        // Calculate subtotals and total HPP
        const compositionsWithSubtotal = compositions.map((c) => ({
            ...c,
            subtotal: (0, cost_calculation_utility_1.roundCurrency)(Number(c.qty_needed) * Number(c.child_ingredient.avg_cost)),
        }));
        const recipeItems = compositions.map((c) => ({
            ingredient_id: c.child_id,
            qty_needed: Number(c.qty_needed),
            avg_cost: Number(c.child_ingredient.avg_cost),
        }));
        const totalHPP = (0, cost_calculation_utility_1.roundCurrency)((0, cost_calculation_utility_1.calculateHPP)(recipeItems));
        return {
            parent_ingredient: {
                ingredient_id: parent.ingredient_id,
                name: parent.name,
            },
            total_hpp: totalHPP,
            compositions: compositionsWithSubtotal,
        };
    }
    catch (error) {
        console.error(`--- Composition Service Error: ${error.message}`);
        throw error;
    }
};
exports.getCompositions = getCompositions;
/**
 * Add new composition to semi ingredient
 */
const addComposition = async (req) => {
    try {
        const parentId = req.params.ingredient_id;
        const body = req.body;
        // Check if parent semi ingredient exists
        const parent = await ingredient_semi_repository_1.default.findById(parentId);
        if (!parent) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }
        // Check if child ingredient exists and is RAW type
        const childIngredients = await ingredient_semi_composition_repository_1.default.findIngredientCostsByIds([body.child_id]);
        if (childIngredients.length === 0) {
            throw new error_validation_exception_1.ErrorValidationException('Bahan baku tidak ditemukan', [
                { location: 'body', field: 'child_id', message: 'Bahan baku tidak ditemukan' },
            ]);
        }
        // Check if composition already exists for this parent-child pair
        const existingComposition = await ingredient_semi_composition_repository_1.default.findByParentAndChild(parentId, body.child_id);
        if (existingComposition) {
            throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Bahan baku sudah ada dalam komposisi');
        }
        // Create composition in transaction and recalculate HPP
        const result = await prisma.$transaction(async (transaction) => {
            const composition = await ingredient_semi_composition_repository_1.default.create({
                parent_id: parentId,
                child_id: body.child_id,
                qty_needed: body.qty_needed,
            }, transaction);
            // Recalculate parent's avg_cost after adding composition
            await recalculateParentAvgCost(parentId, transaction);
            return composition;
        });
        return {
            ...result,
            subtotal: (0, cost_calculation_utility_1.roundCurrency)(Number(result.qty_needed) * Number(result.child_ingredient.avg_cost)),
        };
    }
    catch (error) {
        console.error(`--- Composition Service Error: ${error.message}`);
        throw error;
    }
};
exports.addComposition = addComposition;
/**
 * Bulk add compositions to semi ingredient
 */
const bulkAddCompositions = async (req) => {
    try {
        const parentId = req.params.ingredient_id;
        const body = req.body;
        // Check if parent semi ingredient exists
        const parent = await ingredient_semi_repository_1.default.findById(parentId);
        if (!parent) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }
        // Validate all child ingredients exist
        const childIds = body.compositions.map((c) => c.child_id);
        const childIngredients = await ingredient_semi_composition_repository_1.default.findIngredientCostsByIds(childIds);
        if (childIngredients.length !== childIds.length) {
            const foundIds = childIngredients.map((i) => i.ingredient_id);
            const missingIds = childIds.filter((id) => !foundIds.includes(id));
            throw new error_validation_exception_1.ErrorValidationException('Beberapa bahan baku tidak ditemukan', [
                { location: 'body', field: 'compositions', message: `Bahan tidak ditemukan: ${missingIds.join(', ')}` },
            ]);
        }
        // Create compositions in transaction and return updated data
        const result = await prisma.$transaction(async (transaction) => {
            // 1. Soft delete items that are no longer in the payload
            await ingredient_semi_composition_repository_1.default.softDeleteMissing(parentId, childIds, transaction);
            // 2. Upsert (Update or Insert) the items from the payload
            // Using Promise.all since Prisma doesn't have an upsertMany yet
            await Promise.all(body.compositions.map((c) => ingredient_semi_composition_repository_1.default.upsert({
                parent_id: parentId,
                child_id: c.child_id,
                qty_needed: c.qty_needed,
            }, transaction)));
            // Recalculate parent's avg_cost
            await recalculateParentAvgCost(parentId, transaction, body.target_yield);
            // Fetch updated compositions within transaction for read consistency
            const compositions = await ingredient_semi_composition_repository_1.default.findByParentId(parentId, transaction);
            // Calculate subtotals and total HPP within transaction
            const compositionsWithSubtotal = compositions.map((c) => ({
                ...c,
                subtotal: (0, cost_calculation_utility_1.roundCurrency)(Number(c.qty_needed) * Number(c.child_ingredient.avg_cost)),
            }));
            const recipeItems = compositions.map((c) => ({
                ingredient_id: c.child_id,
                qty_needed: Number(c.qty_needed),
                avg_cost: Number(c.child_ingredient.avg_cost),
            }));
            const totalHPP = (0, cost_calculation_utility_1.roundCurrency)((0, cost_calculation_utility_1.calculateHPP)(recipeItems));
            return {
                parent_ingredient: {
                    ingredient_id: parent.ingredient_id,
                    name: parent.name,
                },
                total_hpp: totalHPP,
                compositions: compositionsWithSubtotal,
            };
        });
        return result;
    }
    catch (error) {
        console.error(`--- Composition Service Error: ${error.message}`);
        throw error;
    }
};
exports.bulkAddCompositions = bulkAddCompositions;
/**
 * Update composition quantity
 */
const updateComposition = async (req) => {
    try {
        const parentId = req.params.ingredient_id;
        const compositionId = req.params.composition_id;
        const body = req.body;
        // Check if composition exists
        const existingComposition = await ingredient_semi_composition_repository_1.default.findById(compositionId);
        if (!existingComposition) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Komposisi tidak ditemukan');
        }
        // Verify composition belongs to the parent
        if (existingComposition.parent_id !== parentId) {
            throw new error_validation_exception_1.ErrorValidationException('Komposisi tidak ditemukan untuk bahan ini', [
                { location: 'params', field: 'composition_id', message: 'Komposisi tidak sesuai' },
            ]);
        }
        // Update composition in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const composition = await ingredient_semi_composition_repository_1.default.update(compositionId, { qty_needed: body.qty_needed }, transaction);
            // Recalculate parent's avg_cost after update
            await recalculateParentAvgCost(parentId, transaction);
            return composition;
        });
        return {
            ...result,
            subtotal: (0, cost_calculation_utility_1.roundCurrency)(Number(result.qty_needed) * Number(result.child_ingredient.avg_cost)),
        };
    }
    catch (error) {
        console.error(`--- Composition Service Error: ${error.message}`);
        throw error;
    }
};
exports.updateComposition = updateComposition;
/**
 * Delete composition
 */
const deleteComposition = async (req) => {
    try {
        const parentId = req.params.ingredient_id;
        const compositionId = req.params.composition_id;
        // Check if composition exists
        const existingComposition = await ingredient_semi_composition_repository_1.default.findById(compositionId);
        if (!existingComposition) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Komposisi tidak ditemukan');
        }
        // Verify composition belongs to the parent
        if (existingComposition.parent_id !== parentId) {
            throw new error_validation_exception_1.ErrorValidationException('Komposisi tidak ditemukan untuk bahan ini', [
                { location: 'params', field: 'composition_id', message: 'Komposisi tidak sesuai' },
            ]);
        }
        // Delete in transaction and recalculate HPP
        await prisma.$transaction(async (transaction) => {
            await ingredient_semi_composition_repository_1.default.softDelete(compositionId, transaction);
            await recalculateParentAvgCost(parentId, transaction);
        });
        return {
            success: true,
            message: 'Komposisi berhasil dihapus',
        };
    }
    catch (error) {
        console.error(`--- Composition Service Error: ${error.message}`);
        throw error;
    }
};
exports.deleteComposition = deleteComposition;
/**
 * Get available ingredients (RAW + SEMI) for composition
 * Exclude the parent ingredient itself to prevent self-reference
 */
const getAvailableIngredients = async (req) => {
    try {
        const excludeId = req.query.exclude_id || undefined;
        return await ingredient_semi_composition_repository_1.default.findAvailableRawIngredients(excludeId);
    }
    catch (error) {
        console.error(`--- Composition Service Error: ${error.message}`);
        throw error;
    }
};
exports.getAvailableIngredients = getAvailableIngredients;
/**
 * Preview HPP calculation before saving
 */
const previewHPP = async (req) => {
    try {
        const body = req.body;
        const targetYield = body.target_yield || 1;
        // Get ingredient costs
        const ingredientIds = body.compositions.map((c) => c.ingredient_id);
        const ingredients = await ingredient_semi_composition_repository_1.default.findIngredientCostsByIds(ingredientIds);
        const ingredientMap = new Map(ingredients.map((i) => [i.ingredient_id, i]));
        const compositionsWithCost = body.compositions.map((c) => {
            const ingredient = ingredientMap.get(c.ingredient_id);
            if (!ingredient) {
                throw new error_validation_exception_1.ErrorValidationException('Bahan baku tidak ditemukan', [
                    { location: 'body', field: 'compositions', message: `Ingredient ${c.ingredient_id} tidak ditemukan` },
                ]);
            }
            return {
                ingredient_id: c.ingredient_id,
                ingredient_name: ingredient.name,
                qty_needed: c.qty_needed,
                unit_name: ingredient.unit_name,
                unit_cost: ingredient.avg_cost,
                subtotal: (0, cost_calculation_utility_1.roundCurrency)(c.qty_needed * ingredient.avg_cost),
            };
        });
        const recipeItems = compositionsWithCost.map((c) => ({
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
            compositions: compositionsWithCost,
        };
    }
    catch (error) {
        console.error(`--- Composition Service Error: ${error.message}`);
        throw error;
    }
};
exports.previewHPP = previewHPP;
/**
 * Helper: Recalculate parent's avg_cost based on compositions
 */
const recalculateParentAvgCost = async (parentId, transaction, targetYield = 1) => {
    const compositions = await ingredient_semi_composition_repository_1.default.findByParentId(parentId, transaction);
    const recipeItems = compositions.map((c) => ({
        ingredient_id: c.child_id,
        qty_needed: Number(c.qty_needed),
        avg_cost: Number(c.child_ingredient.avg_cost),
    }));
    const totalHPP = (0, cost_calculation_utility_1.calculateHPP)(recipeItems);
    const avgCost = (0, cost_calculation_utility_1.roundCurrency)(totalHPP / targetYield);
    await ingredient_semi_repository_1.default.updateAvgCost(parentId, avgCost, transaction);
};
exports.compositionService = {
    getCompositions: exports.getCompositions,
    addComposition: exports.addComposition,
    bulkAddCompositions: exports.bulkAddCompositions,
    updateComposition: exports.updateComposition,
    deleteComposition: exports.deleteComposition,
    getAvailableIngredients: exports.getAvailableIngredients,
    previewHPP: exports.previewHPP,
};
exports.default = exports.compositionService;
//# sourceMappingURL=ingredient-semi-composition.service.js.map