import { ErrorNotFoundException } from '../../../../../exception/error-not-found.exception';
import { ErrorDataAlreadyExistException } from '../../../../../exception/error-data-already-exist.exception';
import { ErrorValidationException } from '../../../../../exception/error-validation.exception';
import getPrismaClient from '../../../../../database/postgres.connection';
import { calculateHPP, roundCurrency } from '../../../../../utility/cost-calculation.utility';
import { AuthenticatedRequest } from '../../../../../types';
import compositionRepository from './ingredient-semi-composition.repository';
import semiIngredientRepository from '../ingredient-semi.repository';
import {
    CreateCompositionRequest,
    UpdateCompositionRequest,
    BulkAddCompositionsRequest,
    CompositionListResponse,
    CompositionWithDetails,
    DeleteCompositionResponse,
    AvailableRawIngredient,
    HPPPreviewRequest,
    HPPPreviewResponse,
} from './ingredient-semi-composition.types';
import { IngredientType } from '../ingredient-semi.types';

const prisma = getPrismaClient();

/**
 * Get all compositions for a semi ingredient
 */
export const getCompositions = async (req: AuthenticatedRequest): Promise<CompositionListResponse> => {
    try {
        const parentId = req.params.ingredient_id;

        // Check if parent semi ingredient exists
        const parent = await semiIngredientRepository.findById(parentId);
        if (!parent) {
            throw new ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }

        const compositions = await compositionRepository.findByParentId(parentId);

        // Calculate subtotals and total HPP
        const compositionsWithSubtotal = compositions.map((c) => ({
            ...c,
            subtotal: roundCurrency(Number(c.qty_needed) * Number(c.child_ingredient.avg_cost)),
        }));

        const recipeItems = compositions.map((c) => ({
            ingredient_id: c.child_id,
            qty_needed: Number(c.qty_needed),
            avg_cost: Number(c.child_ingredient.avg_cost),
        }));

        const totalHPP = roundCurrency(calculateHPP(recipeItems));

        return {
            parent_ingredient: {
                ingredient_id: parent.ingredient_id,
                name: parent.name,
            },
            total_hpp: totalHPP,
            compositions: compositionsWithSubtotal,
        };
    } catch (error) {
        console.error(`--- Composition Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Add new composition to semi ingredient
 */
export const addComposition = async (req: AuthenticatedRequest): Promise<CompositionWithDetails> => {
    try {
        const parentId = req.params.ingredient_id;
        const body: CreateCompositionRequest = req.body;

        // Check if parent semi ingredient exists
        const parent = await semiIngredientRepository.findById(parentId);
        if (!parent) {
            throw new ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }

        // Check if child ingredient exists and is RAW type
        const childIngredients = await compositionRepository.findIngredientCostsByIds([body.child_id]);
        if (childIngredients.length === 0) {
            throw new ErrorValidationException('Bahan baku tidak ditemukan', [
                { location: 'body', field: 'child_id', message: 'Bahan baku tidak ditemukan' },
            ]);
        }

        // Check if composition already exists for this parent-child pair
        const existingComposition = await compositionRepository.findByParentAndChild(parentId, body.child_id);
        if (existingComposition) {
            throw new ErrorDataAlreadyExistException('Bahan baku sudah ada dalam komposisi');
        }

        // Create composition in transaction and recalculate HPP
        const result = await prisma.$transaction(async (transaction) => {
            const composition = await compositionRepository.create(
                {
                    parent_id: parentId,
                    child_id: body.child_id,
                    qty_needed: body.qty_needed,
                },
                transaction
            );

            // Recalculate parent's avg_cost after adding composition
            await recalculateParentAvgCost(parentId, transaction);

            return composition;
        });

        return {
            ...result,
            subtotal: roundCurrency(Number(result.qty_needed) * Number(result.child_ingredient.avg_cost)),
        };
    } catch (error) {
        console.error(`--- Composition Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Bulk add compositions to semi ingredient
 */
export const bulkAddCompositions = async (req: AuthenticatedRequest): Promise<CompositionListResponse> => {
    try {
        const parentId = req.params.ingredient_id;
        const body: BulkAddCompositionsRequest = req.body;

        // Check if parent semi ingredient exists
        const parent = await semiIngredientRepository.findById(parentId);
        if (!parent) {
            throw new ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }

        // Validate all child ingredients exist
        const childIds = body.compositions.map((c) => c.child_id);
        const childIngredients = await compositionRepository.findIngredientCostsByIds(childIds);

        if (childIngredients.length !== childIds.length) {
            const foundIds = childIngredients.map((i) => i.ingredient_id);
            const missingIds = childIds.filter((id) => !foundIds.includes(id));
            throw new ErrorValidationException('Beberapa bahan baku tidak ditemukan', [
                { location: 'body', field: 'compositions', message: `Bahan tidak ditemukan: ${missingIds.join(', ')}` },
            ]);
        }

        // Create compositions in transaction and return updated data
        const result = await prisma.$transaction(async (transaction) => {
            // Delete existing compositions first
            await compositionRepository.softDeleteByParentId(parentId, transaction);

            // Create new compositions
            const compositionsData = body.compositions.map((c) => ({
                parent_id: parentId,
                child_id: c.child_id,
                qty_needed: c.qty_needed,
            }));

            await compositionRepository.createMany(compositionsData, transaction);

            // Recalculate parent's avg_cost
            await recalculateParentAvgCost(parentId, transaction, body.target_yield);

            // Fetch updated compositions within transaction for read consistency
            const compositions = await compositionRepository.findByParentId(parentId, transaction);

            // Calculate subtotals and total HPP within transaction
            const compositionsWithSubtotal = compositions.map((c) => ({
                ...c,
                subtotal: roundCurrency(Number(c.qty_needed) * Number(c.child_ingredient.avg_cost)),
            }));

            const recipeItems = compositions.map((c) => ({
                ingredient_id: c.child_id,
                qty_needed: Number(c.qty_needed),
                avg_cost: Number(c.child_ingredient.avg_cost),
            }));

            const totalHPP = roundCurrency(calculateHPP(recipeItems));

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
    } catch (error) {
        console.error(`--- Composition Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Update composition quantity
 */
export const updateComposition = async (req: AuthenticatedRequest): Promise<CompositionWithDetails> => {
    try {
        const parentId = req.params.ingredient_id;
        const compositionId = req.params.composition_id;
        const body: UpdateCompositionRequest = req.body;

        // Check if composition exists
        const existingComposition = await compositionRepository.findById(compositionId);
        if (!existingComposition) {
            throw new ErrorNotFoundException('Komposisi tidak ditemukan');
        }

        // Verify composition belongs to the parent
        if (existingComposition.parent_id !== parentId) {
            throw new ErrorValidationException('Komposisi tidak ditemukan untuk bahan ini', [
                { location: 'params', field: 'composition_id', message: 'Komposisi tidak sesuai' },
            ]);
        }

        // Update composition in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const composition = await compositionRepository.update(
                compositionId,
                { qty_needed: body.qty_needed },
                transaction
            );

            // Recalculate parent's avg_cost after update
            await recalculateParentAvgCost(parentId, transaction);

            return composition;
        });

        return {
            ...result,
            subtotal: roundCurrency(Number(result.qty_needed) * Number(result.child_ingredient.avg_cost)),
        };
    } catch (error) {
        console.error(`--- Composition Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Delete composition
 */
export const deleteComposition = async (req: AuthenticatedRequest): Promise<DeleteCompositionResponse> => {
    try {
        const parentId = req.params.ingredient_id;
        const compositionId = req.params.composition_id;

        // Check if composition exists
        const existingComposition = await compositionRepository.findById(compositionId);
        if (!existingComposition) {
            throw new ErrorNotFoundException('Komposisi tidak ditemukan');
        }

        // Verify composition belongs to the parent
        if (existingComposition.parent_id !== parentId) {
            throw new ErrorValidationException('Komposisi tidak ditemukan untuk bahan ini', [
                { location: 'params', field: 'composition_id', message: 'Komposisi tidak sesuai' },
            ]);
        }

        // Delete in transaction and recalculate HPP
        await prisma.$transaction(async (transaction) => {
            await compositionRepository.softDelete(compositionId, transaction);
            await recalculateParentAvgCost(parentId, transaction);
        });

        return {
            success: true,
            message: 'Komposisi berhasil dihapus',
        };
    } catch (error) {
        console.error(`--- Composition Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get available raw ingredients for composition
 */
export const getAvailableIngredients = async (): Promise<AvailableRawIngredient[]> => {
    try {
        return await compositionRepository.findAvailableRawIngredients();
    } catch (error) {
        console.error(`--- Composition Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Preview HPP calculation before saving
 */
export const previewHPP = async (req: AuthenticatedRequest): Promise<HPPPreviewResponse> => {
    try {
        const body: HPPPreviewRequest = req.body;
        const targetYield = body.target_yield || 1;

        // Get ingredient costs
        const ingredientIds = body.compositions.map((c) => c.ingredient_id);
        const ingredients = await compositionRepository.findIngredientCostsByIds(ingredientIds);

        const ingredientMap = new Map(
            ingredients.map((i) => [i.ingredient_id, i])
        );

        const compositionsWithCost = body.compositions.map((c) => {
            const ingredient = ingredientMap.get(c.ingredient_id);
            if (!ingredient) {
                throw new ErrorValidationException('Bahan baku tidak ditemukan', [
                    { location: 'body', field: 'compositions', message: `Ingredient ${c.ingredient_id} tidak ditemukan` },
                ]);
            }
            return {
                ingredient_id: c.ingredient_id,
                ingredient_name: ingredient.name,
                qty_needed: c.qty_needed,
                unit_name: ingredient.unit_name,
                unit_cost: ingredient.avg_cost,
                subtotal: roundCurrency(c.qty_needed * ingredient.avg_cost),
            };
        });

        const recipeItems = compositionsWithCost.map((c) => ({
            ingredient_id: c.ingredient_id,
            qty_needed: c.qty_needed,
            avg_cost: c.unit_cost,
        }));

        const totalHPP = roundCurrency(calculateHPP(recipeItems));
        const hppPerUnit = roundCurrency(totalHPP / targetYield);

        return {
            total_hpp: totalHPP,
            target_yield: targetYield,
            hpp_per_unit: hppPerUnit,
            compositions: compositionsWithCost,
        };
    } catch (error) {
        console.error(`--- Composition Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Helper: Recalculate parent's avg_cost based on compositions
 */
const recalculateParentAvgCost = async (
    parentId: string,
    transaction: any,
    targetYield: number = 1
): Promise<void> => {
    const compositions = await compositionRepository.findByParentId(parentId, transaction);

    const recipeItems = compositions.map((c) => ({
        ingredient_id: c.child_id,
        qty_needed: Number(c.qty_needed),
        avg_cost: Number(c.child_ingredient.avg_cost),
    }));

    const totalHPP = calculateHPP(recipeItems);
    const avgCost = roundCurrency(totalHPP / targetYield);

    await semiIngredientRepository.updateAvgCost(parentId, avgCost, transaction);
};

export const compositionService = {
    getCompositions,
    addComposition,
    bulkAddCompositions,
    updateComposition,
    deleteComposition,
    getAvailableIngredients,
    previewHPP,
};

export default compositionService;
