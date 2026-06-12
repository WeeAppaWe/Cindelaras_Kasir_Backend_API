import { OpnameFilter, OpnamePaginationOptions, OpnameWithUser, OpnameWithDetails, IngredientForOpname } from './opname.types';
import { Prisma } from '../../generated/prisma/client';
/**
 * Find all stock opnames with pagination and filters
 */
export declare const findAll: (options: OpnamePaginationOptions, filter: OpnameFilter) => Promise<OpnameWithUser[]>;
/**
 * Count stock opnames with filters
 */
export declare const count: (filter: OpnameFilter) => Promise<number>;
/**
 * Find stock opname by ID
 */
export declare const findById: (opnameId: string) => Promise<OpnameWithUser | null>;
/**
 * Find stock opname by ID with full details (including items)
 */
export declare const findByIdWithDetails: (opnameId: string) => Promise<OpnameWithDetails | null>;
/**
 * Create new stock opname with items
 */
export declare const create: (data: {
    user_id: string;
    opname_date: Date;
    status: string;
    notes?: string | null;
}, items: Array<{
    ingredient_id: string;
    system_qty: number;
    physical_qty: number;
    difference: number;
}>, transaction?: Prisma.TransactionClient) => Promise<OpnameWithDetails>;
/**
 * Update stock opname
 */
export declare const update: (opnameId: string, data: {
    notes?: string | null;
}, transaction?: Prisma.TransactionClient) => Promise<OpnameWithDetails>;
/**
 * Update opname status
 */
export declare const updateStatus: (opnameId: string, status: string, transaction?: Prisma.TransactionClient) => Promise<OpnameWithUser>;
/**
 * Delete all items of an opname (for replacement)
 */
export declare const deleteItems: (opnameId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
/**
 * Add items to opname
 */
export declare const addItems: (opnameId: string, items: Array<{
    ingredient_id: string;
    system_qty: number;
    physical_qty: number;
    difference: number;
}>, transaction?: Prisma.TransactionClient) => Promise<void>;
/**
 * Soft delete stock opname
 */
export declare const softDelete: (opnameId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
/**
 * Get ingredient current stock by ID
 */
export declare const getIngredientStock: (ingredientId: string, transaction?: Prisma.TransactionClient) => Promise<number | null>;
/**
 * Get all ingredients for opname form
 */
export declare const getIngredientsForOpname: () => Promise<IngredientForOpname[]>;
/**
 * Update ingredient stock (for adjustment)
 */
export declare const updateIngredientStock: (ingredientId: string, newStockQty: number, transaction?: Prisma.TransactionClient) => Promise<void>;
/**
 * Get opname items for adjustment
 */
export declare const getOpnameItems: (opnameId: string, transaction?: Prisma.TransactionClient) => Promise<Array<{
    ingredient_id: string;
    physical_qty: number;
    difference: number;
}>>;
/**
 * Create stock movement record (for adjustment audit trail)
 */
export declare const createStockMovement: (data: {
    ingredient_id: string;
    user_id: string;
    stock_type_id: string;
    qty: number;
    current_stock: number;
    notes?: string | null;
}, transaction?: Prisma.TransactionClient) => Promise<void>;
export declare const opnameRepository: {
    findAll: (options: OpnamePaginationOptions, filter: OpnameFilter) => Promise<OpnameWithUser[]>;
    count: (filter: OpnameFilter) => Promise<number>;
    findById: (opnameId: string) => Promise<OpnameWithUser | null>;
    findByIdWithDetails: (opnameId: string) => Promise<OpnameWithDetails | null>;
    create: (data: {
        user_id: string;
        opname_date: Date;
        status: string;
        notes?: string | null;
    }, items: Array<{
        ingredient_id: string;
        system_qty: number;
        physical_qty: number;
        difference: number;
    }>, transaction?: Prisma.TransactionClient) => Promise<OpnameWithDetails>;
    update: (opnameId: string, data: {
        notes?: string | null;
    }, transaction?: Prisma.TransactionClient) => Promise<OpnameWithDetails>;
    updateStatus: (opnameId: string, status: string, transaction?: Prisma.TransactionClient) => Promise<OpnameWithUser>;
    deleteItems: (opnameId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
    addItems: (opnameId: string, items: Array<{
        ingredient_id: string;
        system_qty: number;
        physical_qty: number;
        difference: number;
    }>, transaction?: Prisma.TransactionClient) => Promise<void>;
    softDelete: (opnameId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
    getIngredientStock: (ingredientId: string, transaction?: Prisma.TransactionClient) => Promise<number | null>;
    getIngredientsForOpname: () => Promise<IngredientForOpname[]>;
    updateIngredientStock: (ingredientId: string, newStockQty: number, transaction?: Prisma.TransactionClient) => Promise<void>;
    getOpnameItems: (opnameId: string, transaction?: Prisma.TransactionClient) => Promise<Array<{
        ingredient_id: string;
        physical_qty: number;
        difference: number;
    }>>;
    createStockMovement: (data: {
        ingredient_id: string;
        user_id: string;
        stock_type_id: string;
        qty: number;
        current_stock: number;
        notes?: string | null;
    }, transaction?: Prisma.TransactionClient) => Promise<void>;
};
export default opnameRepository;
//# sourceMappingURL=opname.repository.d.ts.map