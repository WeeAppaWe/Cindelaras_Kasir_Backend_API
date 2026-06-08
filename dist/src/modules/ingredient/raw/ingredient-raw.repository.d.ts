import { RawIngredientFilter, RawIngredientPaginationOptions, RawIngredientWithRelations } from './ingredient-raw.types';
import { Prisma } from '../../../generated/prisma/client';
/**
 * Find all raw ingredients with pagination and filters
 */
export declare const findAll: (options: RawIngredientPaginationOptions, filter: RawIngredientFilter) => Promise<RawIngredientWithRelations[]>;
/**
 * Count raw ingredients with filters
 */
export declare const count: (filter: RawIngredientFilter) => Promise<number>;
/**
 * Find raw ingredient by ID
 */
export declare const findById: (ingredientId: string) => Promise<RawIngredientWithRelations | null>;
/**
 * Find raw ingredient by name (for validation - check duplicate)
 */
export declare const findByName: (name: string, excludeIngredientId?: string) => Promise<RawIngredientWithRelations | null>;
/**
 * Create new raw ingredient
 */
export declare const create: (data: Prisma.IngredientUncheckedCreateInput, transaction?: Prisma.TransactionClient) => Promise<RawIngredientWithRelations>;
/**
 * Update raw ingredient by ID
 */
export declare const update: (ingredientId: string, data: Prisma.IngredientUncheckedUpdateInput, transaction?: Prisma.TransactionClient) => Promise<RawIngredientWithRelations>;
/**
 * Soft delete raw ingredient (set deleted_at)
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
/**
 * Get low stock raw ingredients (stock_qty < min_stock)
 */
export declare const findLowStock: () => Promise<RawIngredientWithRelations[]>;
/**
 * Count low stock raw ingredients
 */
export declare const countLowStock: () => Promise<number>;
export declare const rawIngredientRepository: {
    findAll: (options: RawIngredientPaginationOptions, filter: RawIngredientFilter) => Promise<RawIngredientWithRelations[]>;
    count: (filter: RawIngredientFilter) => Promise<number>;
    findById: (ingredientId: string) => Promise<RawIngredientWithRelations | null>;
    findByName: (name: string, excludeIngredientId?: string) => Promise<RawIngredientWithRelations | null>;
    create: (data: Prisma.IngredientUncheckedCreateInput, transaction?: Prisma.TransactionClient) => Promise<RawIngredientWithRelations>;
    update: (ingredientId: string, data: Prisma.IngredientUncheckedUpdateInput, transaction?: Prisma.TransactionClient) => Promise<RawIngredientWithRelations>;
    softDelete: (ingredientId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
    findAllUnitMeasures: () => Promise<{
        name: string;
        unit_measure_id: string;
    }[]>;
    findUnitMeasureById: (unitMeasureId: string) => Promise<{
        name: string;
        unit_measure_id: string;
    }>;
    findLowStock: () => Promise<RawIngredientWithRelations[]>;
    countLowStock: () => Promise<number>;
};
export default rawIngredientRepository;
//# sourceMappingURL=ingredient-raw.repository.d.ts.map