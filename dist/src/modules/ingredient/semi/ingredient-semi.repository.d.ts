import { SemiIngredientFilter, SemiIngredientPaginationOptions, SemiIngredientWithRelations, SemiIngredientWithCompositions } from './ingredient-semi.types';
import { Prisma } from '../../../generated/prisma/client';
/**
 * Find all semi ingredients with pagination and filters
 */
export declare const findAll: (options: SemiIngredientPaginationOptions, filter: SemiIngredientFilter) => Promise<SemiIngredientWithRelations[]>;
/**
 * Count semi ingredients with filters
 */
export declare const count: (filter: SemiIngredientFilter) => Promise<number>;
/**
 * Find semi ingredient by ID (basic info)
 */
export declare const findById: (ingredientId: string) => Promise<SemiIngredientWithRelations | null>;
/**
 * Find semi ingredient by ID with compositions
 */
export declare const findByIdWithCompositions: (ingredientId: string) => Promise<SemiIngredientWithCompositions | null>;
/**
 * Find semi ingredient by name (for validation - check duplicate)
 */
export declare const findByName: (name: string, excludeIngredientId?: string) => Promise<SemiIngredientWithRelations | null>;
/**
 * Create new semi ingredient
 */
export declare const create: (data: Prisma.IngredientUncheckedCreateInput, transaction?: Prisma.TransactionClient) => Promise<SemiIngredientWithRelations>;
/**
 * Update semi ingredient by ID
 */
export declare const update: (ingredientId: string, data: Prisma.IngredientUncheckedUpdateInput, transaction?: Prisma.TransactionClient) => Promise<SemiIngredientWithRelations>;
/**
 * Update avg_cost (HPP per unit) for semi ingredient
 */
export declare const updateAvgCost: (ingredientId: string, avgCost: number, transaction?: Prisma.TransactionClient) => Promise<void>;
/**
 * Soft delete semi ingredient (set deleted_at)
 */
export declare const softDelete: (ingredientId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
/**
 * Get all unit measures (for dropdown/selection)
 */
export declare const findAllUnitMeasures: () => Promise<{
    name: string;
    unit_measure_id: string;
}[]>;
/**
 * Find unit measure by ID
 */
export declare const findUnitMeasureById: (unitMeasureId: string) => Promise<{
    name: string;
    unit_measure_id: string;
}>;
export declare const semiIngredientRepository: {
    findAll: (options: SemiIngredientPaginationOptions, filter: SemiIngredientFilter) => Promise<SemiIngredientWithRelations[]>;
    count: (filter: SemiIngredientFilter) => Promise<number>;
    findById: (ingredientId: string) => Promise<SemiIngredientWithRelations | null>;
    findByIdWithCompositions: (ingredientId: string) => Promise<SemiIngredientWithCompositions | null>;
    findByName: (name: string, excludeIngredientId?: string) => Promise<SemiIngredientWithRelations | null>;
    create: (data: Prisma.IngredientUncheckedCreateInput, transaction?: Prisma.TransactionClient) => Promise<SemiIngredientWithRelations>;
    update: (ingredientId: string, data: Prisma.IngredientUncheckedUpdateInput, transaction?: Prisma.TransactionClient) => Promise<SemiIngredientWithRelations>;
    updateAvgCost: (ingredientId: string, avgCost: number, transaction?: Prisma.TransactionClient) => Promise<void>;
    softDelete: (ingredientId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
    findAllUnitMeasures: () => Promise<{
        name: string;
        unit_measure_id: string;
    }[]>;
    findUnitMeasureById: (unitMeasureId: string) => Promise<{
        name: string;
        unit_measure_id: string;
    }>;
};
export default semiIngredientRepository;
//# sourceMappingURL=ingredient-semi.repository.d.ts.map