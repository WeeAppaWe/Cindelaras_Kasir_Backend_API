import getPrismaClient from '../../../database/postgres.connection';
import { handlePrismaError } from '../../../utility/prisma-error-handler.utility';

const prisma = getPrismaClient();

/**
 * Find all menu IDs that use any of the given ingredient IDs in their recipe
 */
export const findMenuIdsByIngredientIds = async (ingredientIds: string[]): Promise<string[]> => {
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
    } catch (error) {
        console.error('--- Menu Availability Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find menu IDs that have at least one ingredient with insufficient stock
 * Uses raw query because Prisma doesn't support comparing two columns (stock_qty < qty_needed)
 */
export const findMenuIdsWithInsufficientStock = async (menuIds: string[]): Promise<string[]> => {
    try {
        const result = await prisma.$queryRaw<{ menu_id: string }[]>`
            SELECT DISTINCT mr.menu_id
            FROM menu_recipes mr
            JOIN ingredients i ON mr.ingredient_id = i.ingredient_id
            WHERE mr.menu_id = ANY(${menuIds}::uuid[])
              AND mr.deleted_at IS NULL
              AND i.deleted_at IS NULL
              AND i.stock_qty < mr.qty_needed
        `;

        return result.map((r) => r.menu_id);
    } catch (error) {
        console.error('--- Menu Availability Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Bulk update is_available for multiple menus
 * Only updates menus that need changing (avoids unnecessary writes)
 */
export const bulkUpdateMenuAvailability = async (
    menuIds: string[],
    isAvailable: boolean
): Promise<number> => {
    try {
        if (menuIds.length === 0) return 0;

        const result = await prisma.menu.updateMany({
            where: {
                menu_id: { in: menuIds },
                deleted_at: null,
                is_available: !isAvailable,
            },
            data: { is_available: isAvailable },
        });

        return result.count;
    } catch (error) {
        console.error('--- Menu Availability Repository Error:', error);
        handlePrismaError(error);
    }
};

export const menuAvailabilityRepository = {
    findMenuIdsByIngredientIds,
    findMenuIdsWithInsufficientStock,
    bulkUpdateMenuAvailability,
};

export default menuAvailabilityRepository;
