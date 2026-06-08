import { CompositionWithDetails, AvailableRawIngredient } from './ingredient-semi-composition.types';
import { Prisma } from '../../../../generated/prisma/client';
/**
 * Find all compositions for a parent semi ingredient
 */
export declare const findByParentId: (parentId: string, transaction?: Prisma.TransactionClient) => Promise<CompositionWithDetails[]>;
/**
 * Find composition by ID
 */
export declare const findById: (compositionId: string, transaction?: Prisma.TransactionClient) => Promise<CompositionWithDetails | null>;
/**
 * Find composition by parent and child (check duplicate)
 */
export declare const findByParentAndChild: (parentId: string, childId: string, excludeCompositionId?: string) => Promise<CompositionWithDetails | null>;
/**
 * Create new composition
 */
export declare const create: (data: {
    parent_id: string;
    child_id: string;
    qty_needed: number;
}, transaction?: Prisma.TransactionClient) => Promise<CompositionWithDetails>;
/**
 * Create many compositions (bulk)
 */
export declare const createMany: (compositions: {
    parent_id: string;
    child_id: string;
    qty_needed: number;
}[], transaction?: Prisma.TransactionClient) => Promise<number>;
/**
 * Update composition by ID
 */
export declare const update: (compositionId: string, data: {
    qty_needed: number;
}, transaction?: Prisma.TransactionClient) => Promise<CompositionWithDetails>;
/**
 * Soft delete composition by ID
 */
export declare const softDelete: (compositionId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
/**
 * Soft delete all compositions for a parent
 */
export declare const softDeleteByParentId: (parentId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
/**
 * Find all available RAW ingredients (for composition selection)
 */
export declare const findAvailableRawIngredients: () => Promise<AvailableRawIngredient[]>;
/**
 * Find ingredient costs by IDs (for HPP calculation)
 */
export declare const findIngredientCostsByIds: (ingredientIds: string[]) => Promise<{
    ingredient_id: string;
    name: string;
    avg_cost: number;
    unit_name: string;
}[]>;
export declare const compositionRepository: {
    findByParentId: (parentId: string, transaction?: Prisma.TransactionClient) => Promise<CompositionWithDetails[]>;
    findById: (compositionId: string, transaction?: Prisma.TransactionClient) => Promise<CompositionWithDetails | null>;
    findByParentAndChild: (parentId: string, childId: string, excludeCompositionId?: string) => Promise<CompositionWithDetails | null>;
    create: (data: {
        parent_id: string;
        child_id: string;
        qty_needed: number;
    }, transaction?: Prisma.TransactionClient) => Promise<CompositionWithDetails>;
    createMany: (compositions: {
        parent_id: string;
        child_id: string;
        qty_needed: number;
    }[], transaction?: Prisma.TransactionClient) => Promise<number>;
    update: (compositionId: string, data: {
        qty_needed: number;
    }, transaction?: Prisma.TransactionClient) => Promise<CompositionWithDetails>;
    softDelete: (compositionId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
    softDeleteByParentId: (parentId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
    findAvailableRawIngredients: () => Promise<AvailableRawIngredient[]>;
    findIngredientCostsByIds: (ingredientIds: string[]) => Promise<{
        ingredient_id: string;
        name: string;
        avg_cost: number;
        unit_name: string;
    }[]>;
};
export default compositionRepository;
//# sourceMappingURL=ingredient-semi-composition.repository.d.ts.map