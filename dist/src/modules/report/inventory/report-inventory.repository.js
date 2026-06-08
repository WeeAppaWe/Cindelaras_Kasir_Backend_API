"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportInventoryRepository = exports.getLastRestockDates = exports.getIngredientMovements = exports.getStockOpnamesForPeriod = exports.getStockMovementsForPeriod = exports.getAllIngredientsWithStatus = void 0;
const postgres_connection_1 = __importDefault(require("../../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
// ============================================
// HELPER FUNCTIONS
// ============================================
const buildDateRangeFilter = (filter) => {
    const startDate = new Date(filter.start_date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(filter.end_date);
    endDate.setHours(23, 59, 59, 999);
    return { startDate, endDate };
};
// ============================================
// GET ALL INGREDIENTS WITH STOCK STATUS
// ============================================
const getAllIngredientsWithStatus = async (ingredientType, status, limit = 100) => {
    try {
        const where = {
            deleted_at: null,
        };
        if (ingredientType) {
            where.type = ingredientType;
        }
        const ingredients = await prisma.ingredient.findMany({
            where,
            include: {
                unit: {
                    select: {
                        unit_measure_id: true,
                        name: true,
                    },
                },
            },
            orderBy: {
                name: 'asc',
            },
            take: limit,
        });
        // Apply status filter in memory
        let filtered = ingredients;
        if (status === 'low') {
            filtered = ingredients.filter(i => Number(i.stock_qty) > 0 && Number(i.stock_qty) < Number(i.min_stock));
        }
        else if (status === 'out') {
            filtered = ingredients.filter(i => Number(i.stock_qty) <= 0);
        }
        return filtered;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getAllIngredientsWithStatus = getAllIngredientsWithStatus;
// ============================================
// GET STOCK MOVEMENTS FOR PERIOD
// ============================================
const getStockMovementsForPeriod = async (filter) => {
    try {
        const { startDate, endDate } = buildDateRangeFilter(filter);
        const where = {
            deleted_at: null,
            created_at: {
                gte: startDate,
                lte: endDate,
            },
        };
        if (filter.ingredient_id) {
            where.ingredient_id = filter.ingredient_id;
        }
        if (filter.supplier_id) {
            where.supplier_id = filter.supplier_id;
        }
        if (filter.ingredient_type) {
            where.ingredient = {
                type: filter.ingredient_type,
            };
        }
        const movements = await prisma.stockMovement.findMany({
            where,
            include: {
                ingredient: {
                    select: {
                        ingredient_id: true,
                        name: true,
                        type: true,
                        avg_cost: true,
                        unit: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                stock_type: {
                    select: {
                        stock_type_id: true,
                        name: true,
                    },
                },
                supplier: {
                    select: {
                        supplier_id: true,
                        name: true,
                    },
                },
                user: {
                    select: {
                        user_id: true,
                        name: true,
                    },
                },
            },
            orderBy: {
                created_at: 'asc',
            },
        });
        return movements;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getStockMovementsForPeriod = getStockMovementsForPeriod;
// ============================================
// GET STOCK OPNAMES FOR PERIOD
// ============================================
const getStockOpnamesForPeriod = async (filter) => {
    try {
        const { startDate, endDate } = buildDateRangeFilter(filter);
        const opnames = await prisma.stockOpname.findMany({
            where: {
                deleted_at: null,
                opname_date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: {
                user: {
                    select: {
                        user_id: true,
                        name: true,
                    },
                },
                items: {
                    where: {
                        deleted_at: null,
                    },
                    select: {
                        stock_opname_item_id: true,
                        system_qty: true,
                        physical_qty: true,
                        difference: true,
                    },
                },
            },
            orderBy: {
                opname_date: 'desc',
            },
        });
        return opnames;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getStockOpnamesForPeriod = getStockOpnamesForPeriod;
// ============================================
// GET INGREDIENT MOVEMENTS FOR CARD
// ============================================
const getIngredientMovements = async (ingredientId, startDate, endDate) => {
    try {
        // Get ingredient details
        const ingredient = await prisma.ingredient.findUnique({
            where: {
                ingredient_id: ingredientId,
                deleted_at: null,
            },
            include: {
                unit: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        if (!ingredient) {
            return null;
        }
        // Get movements for period
        const movements = await prisma.stockMovement.findMany({
            where: {
                ingredient_id: ingredientId,
                deleted_at: null,
                created_at: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: {
                stock_type: {
                    select: {
                        name: true,
                    },
                },
                supplier: {
                    select: {
                        name: true,
                    },
                },
                user: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                created_at: 'asc',
            },
        });
        // Get last movement before start date (for opening balance)
        const lastMovementBefore = await prisma.stockMovement.findFirst({
            where: {
                ingredient_id: ingredientId,
                deleted_at: null,
                created_at: {
                    lt: startDate,
                },
            },
            orderBy: {
                created_at: 'desc',
            },
            select: {
                current_stock: true,
            },
        });
        return {
            ingredient,
            movements,
            openingBalance: lastMovementBefore ? Number(lastMovementBefore.current_stock) : 0,
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getIngredientMovements = getIngredientMovements;
// ============================================
// GET LAST RESTOCK DATE PER INGREDIENT
// ============================================
const getLastRestockDates = async (ingredientIds) => {
    try {
        const restocks = await prisma.stockMovement.findMany({
            where: {
                ingredient_id: { in: ingredientIds },
                deleted_at: null,
                stock_type: {
                    name: { in: ['IN_PURCHASE', 'IN_PRODUCTION'] },
                },
            },
            orderBy: {
                created_at: 'desc',
            },
            distinct: ['ingredient_id'],
            select: {
                ingredient_id: true,
                created_at: true,
            },
        });
        const map = new Map();
        for (const r of restocks) {
            map.set(r.ingredient_id, r.created_at);
        }
        return map;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getLastRestockDates = getLastRestockDates;
// ============================================
// EXPORT REPOSITORY
// ============================================
exports.reportInventoryRepository = {
    getAllIngredientsWithStatus: exports.getAllIngredientsWithStatus,
    getStockMovementsForPeriod: exports.getStockMovementsForPeriod,
    getStockOpnamesForPeriod: exports.getStockOpnamesForPeriod,
    getIngredientMovements: exports.getIngredientMovements,
    getLastRestockDates: exports.getLastRestockDates,
};
exports.default = exports.reportInventoryRepository;
//# sourceMappingURL=report-inventory.repository.js.map