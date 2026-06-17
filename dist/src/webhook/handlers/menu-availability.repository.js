"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuAvailabilityRepository = exports.bulkUpdateMenuAvailability = exports.findMenuIdsWithInsufficientStock = exports.findMenuIdsByIngredientIds = void 0;
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
/**
 * Find all menu IDs that use any of the given ingredient IDs in their recipe
 */
const findMenuIdsByIngredientIds = async (ingredientIds) => {
    try {
        const recipes = await prisma.menuRecipe.findMany({
            where: {
                ingredient_id: { in: ingredientIds },
                deleted_at: null,
                menu: { deleted_at: null },
            },
            select: { menu_id: true },
            distinct: ['menu_id'],
        });
        return recipes.map((r) => r.menu_id);
    }
    catch (error) {
        console.error('--- Menu Availability Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findMenuIdsByIngredientIds = findMenuIdsByIngredientIds;
/**
 * Find menu IDs that have at least one ingredient with insufficient stock
 * Uses raw query because Prisma doesn't support comparing two columns (stock_qty < qty_needed)
 */
const findMenuIdsWithInsufficientStock = async (menuIds) => {
    try {
        const result = await prisma.$queryRaw `
            SELECT DISTINCT mr.menu_id
            FROM menu_recipes mr
            JOIN ingredients i ON mr.ingredient_id = i.ingredient_id
            WHERE mr.menu_id = ANY(${menuIds}::uuid[])
              AND mr.deleted_at IS NULL
              AND i.deleted_at IS NULL
              AND i.stock_qty < mr.qty_needed
        `;
        return result.map((r) => r.menu_id);
    }
    catch (error) {
        console.error('--- Menu Availability Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findMenuIdsWithInsufficientStock = findMenuIdsWithInsufficientStock;
/**
 * Bulk update is_available for multiple menus
 * Only updates menus that need changing (avoids unnecessary writes)
 */
const bulkUpdateMenuAvailability = async (menuIds, isAvailable) => {
    try {
        if (menuIds.length === 0)
            return 0;
        const result = await prisma.menu.updateMany({
            where: {
                menu_id: { in: menuIds },
                deleted_at: null,
                is_available: !isAvailable,
            },
            data: { is_available: isAvailable },
        });
        return result.count;
    }
    catch (error) {
        console.error('--- Menu Availability Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.bulkUpdateMenuAvailability = bulkUpdateMenuAvailability;
exports.menuAvailabilityRepository = {
    findMenuIdsByIngredientIds: exports.findMenuIdsByIngredientIds,
    findMenuIdsWithInsufficientStock: exports.findMenuIdsWithInsufficientStock,
    bulkUpdateMenuAvailability: exports.bulkUpdateMenuAvailability,
};
exports.default = exports.menuAvailabilityRepository;
//# sourceMappingURL=menu-availability.repository.js.map