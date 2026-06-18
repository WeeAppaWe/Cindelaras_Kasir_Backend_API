import getPrismaClient from '../../../database/postgres.connection';
import { handlePrismaError } from '../../../utility/prisma-error-handler.utility';
import { IngredientData, IngredientSupplier, IngredientCompositionData } from './spk.types';

const prisma = getPrismaClient();

// ============================================
// GET ORDER ITEMS WITH RECIPES FOR PERIOD
// ============================================

/**
 * Ambil semua order items dalam periode tertentu dengan data recipe explosion
 * untuk menghitung pemakaian bahan per hari
 */
export const getOrderItemsWithRecipes = async (startDate: Date, endDate: Date) => {
    try {
        const orders = await prisma.order.findMany({
            where: {
                deleted_at: null,
                status: 'COMPLETED',
                created_at: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: {
                order_items: {
                    where: {
                        deleted_at: null,
                    },
                    include: {
                        menu: {
                            include: {
                                recipes: {
                                    where: {
                                        deleted_at: null,
                                    },
                                    include: {
                                        ingredient: {
                                            include: {
                                                unit: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        return orders;
    } catch (error) {
        console.error('--- SPK Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// GET ALL INGREDIENTS
// ============================================

/**
 * Ambil semua ingredients untuk analisa
 */
export const getAllIngredients = async (
    ingredientType?: 'raw' | 'semi' | 'all' | null
): Promise<IngredientData[] | undefined> => {
    try {
        const where: { deleted_at: null; type?: string } = {
            deleted_at: null,
        };

        if (ingredientType && ingredientType !== 'all') {
            where.type = ingredientType.toUpperCase();
        }

        const ingredients = await prisma.ingredient.findMany({
            where,
            include: {
                unit: true,
            },
            orderBy: {
                name: 'asc',
            },
        });

        return ingredients.map(i => ({
            ingredient_id: i.ingredient_id,
            name: i.name,
            type: i.type,
            stock_qty: Number(i.stock_qty),
            min_stock: Number(i.min_stock),
            avg_cost: Number(i.avg_cost),
            unit_name: i.unit.name,
        }));
    } catch (error) {
        console.error('--- SPK Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// GET LAST SUPPLIER FOR INGREDIENTS
// ============================================

/**
 * Ambil supplier terakhir untuk setiap ingredient dari stock movements
 */
export const getLastSupplierForIngredients = async (
    ingredientIds: string[]
): Promise<IngredientSupplier[] | undefined> => {
    try {
        // Get last stock movement with supplier for each ingredient
        const movements = await prisma.stockMovement.findMany({
            where: {
                deleted_at: null,
                ingredient_id: { in: ingredientIds },
                supplier_id: { not: null },
            },
            orderBy: {
                created_at: 'desc',
            },
            distinct: ['ingredient_id'],
            include: {
                supplier: true,
            },
        });

        return movements
            .filter(m => m.supplier !== null)
            .map(m => ({
                ingredient_id: m.ingredient_id,
                supplier_id: m.supplier!.supplier_id,
                supplier_name: m.supplier!.name,
                supplier_contact: m.supplier!.phone,
            }));
    } catch (error) {
        console.error('--- SPK Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// GET ALL INGREDIENT COMPOSITIONS (BOM)
// ============================================

/**
 * Ambil semua komposisi bahan (Bill of Materials)
 * untuk recursive recipe explosion pada SPK
 */
export const getAllIngredientCompositions = async (): Promise<IngredientCompositionData[] | undefined> => {
    try {
        const compositions = await prisma.ingredientComposition.findMany({
            where: {
                deleted_at: null,
            },
        });

        return compositions.map(c => ({
            parent_id: c.parent_id,
            child_id: c.child_id,
            qty_needed: Number(c.qty_needed),
        }));
    } catch (error) {
        console.error('--- SPK Repository Error:', error);
        handlePrismaError(error);
    }
};

// ============================================
// EXPORT REPOSITORY
// ============================================

export const spkRepository = {
    getOrderItemsWithRecipes,
    getAllIngredients,
    getAllIngredientCompositions,
    getLastSupplierForIngredients,
};

export default spkRepository;
