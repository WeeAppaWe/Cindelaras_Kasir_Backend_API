import { StockMovementFilter, StockMovementPaginationOptions, StockMovementWithDetails, StockTypeData } from './inventory.types';
import { Prisma } from '../../generated/prisma/client';
/**
 * Find all stock movements with pagination and filters
 */
export declare const findAll: (options: StockMovementPaginationOptions, filter: StockMovementFilter) => Promise<StockMovementWithDetails[]>;
/**
 * Count stock movements with filters
 */
export declare const count: (filter: StockMovementFilter) => Promise<number>;
/**
 * Find stock movement by ID
 */
export declare const findById: (stockMovementId: string) => Promise<StockMovementWithDetails | null>;
/**
 * Create new stock movement
 */
export declare const create: (data: Prisma.StockMovementUncheckedCreateInput, transaction?: Prisma.TransactionClient) => Promise<StockMovementWithDetails>;
/**
 * Find stock types
 */
export declare const findAllStockTypes: () => Promise<StockTypeData[]>;
/**
 * Find ingredient by ID
 */
export declare const findIngredientById: (ingredientId: string) => Promise<{
    ingredient_id: string;
    name: string;
    stock_qty: import("@prisma/client/runtime/client").Decimal;
    avg_cost: import("@prisma/client/runtime/client").Decimal;
    unit: {
        name: string;
        unit_measure_id: string;
    };
}>;
/**
 * Find supplier by ID
 */
export declare const findSupplierById: (supplierId: string) => Promise<{
    name: string;
    supplier_id: string;
}>;
/**
 * Update ingredient stock quantity and avg_cost
 */
export declare const updateIngredientStock: (ingredientId: string, stockQty: number, avgCost?: number, transaction?: Prisma.TransactionClient) => Promise<void>;
/**
 * Get stock movements by ingredient (for history)
 */
export declare const findByIngredientId: (ingredientId: string, options: StockMovementPaginationOptions) => Promise<StockMovementWithDetails[]>;
export declare const inventoryRepository: {
    findAll: (options: StockMovementPaginationOptions, filter: StockMovementFilter) => Promise<StockMovementWithDetails[]>;
    count: (filter: StockMovementFilter) => Promise<number>;
    findById: (stockMovementId: string) => Promise<StockMovementWithDetails | null>;
    create: (data: Prisma.StockMovementUncheckedCreateInput, transaction?: Prisma.TransactionClient) => Promise<StockMovementWithDetails>;
    findAllStockTypes: () => Promise<StockTypeData[]>;
    findIngredientById: (ingredientId: string) => Promise<{
        ingredient_id: string;
        name: string;
        stock_qty: import("@prisma/client/runtime/client").Decimal;
        avg_cost: import("@prisma/client/runtime/client").Decimal;
        unit: {
            name: string;
            unit_measure_id: string;
        };
    }>;
    findSupplierById: (supplierId: string) => Promise<{
        name: string;
        supplier_id: string;
    }>;
    updateIngredientStock: (ingredientId: string, stockQty: number, avgCost?: number, transaction?: Prisma.TransactionClient) => Promise<void>;
    findByIngredientId: (ingredientId: string, options: StockMovementPaginationOptions) => Promise<StockMovementWithDetails[]>;
};
export default inventoryRepository;
//# sourceMappingURL=inventory.repository.d.ts.map