"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spkRepository = exports.getLastSupplierForIngredients = exports.getAllIngredients = exports.getOrderItemsWithRecipes = void 0;
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
// ============================================
// GET ORDER ITEMS WITH RECIPES FOR PERIOD
// ============================================
/**
 * Ambil semua order items dalam periode tertentu dengan data recipe explosion
 * untuk menghitung pemakaian bahan per hari
 */
const getOrderItemsWithRecipes = async (startDate, endDate) => {
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
    }
    catch (error) {
        console.error('--- SPK Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getOrderItemsWithRecipes = getOrderItemsWithRecipes;
// ============================================
// GET ALL INGREDIENTS
// ============================================
/**
 * Ambil semua ingredients untuk analisa
 */
const getAllIngredients = async (ingredientType) => {
    try {
        const where = {
            deleted_at: null,
        };
        if (ingredientType && ingredientType !== 'all') {
            where.type = ingredientType;
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
    }
    catch (error) {
        console.error('--- SPK Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getAllIngredients = getAllIngredients;
// ============================================
// GET LAST SUPPLIER FOR INGREDIENTS
// ============================================
/**
 * Ambil supplier terakhir untuk setiap ingredient dari stock movements
 */
const getLastSupplierForIngredients = async (ingredientIds) => {
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
            supplier_id: m.supplier.supplier_id,
            supplier_name: m.supplier.name,
            supplier_contact: m.supplier.phone,
        }));
    }
    catch (error) {
        console.error('--- SPK Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getLastSupplierForIngredients = getLastSupplierForIngredients;
// ============================================
// EXPORT REPOSITORY
// ============================================
exports.spkRepository = {
    getOrderItemsWithRecipes: exports.getOrderItemsWithRecipes,
    getAllIngredients: exports.getAllIngredients,
    getLastSupplierForIngredients: exports.getLastSupplierForIngredients,
};
exports.default = exports.spkRepository;
//# sourceMappingURL=spk.repository.js.map