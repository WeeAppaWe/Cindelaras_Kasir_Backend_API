/**
 * Find all menu IDs that use any of the given ingredient IDs in their recipe
 */
export declare const findMenuIdsByIngredientIds: (ingredientIds: string[]) => Promise<string[]>;
/**
 * Find menu IDs that have at least one ingredient with insufficient stock
 * Uses raw query because Prisma doesn't support comparing two columns (stock_qty < qty_needed)
 */
export declare const findMenuIdsWithInsufficientStock: (menuIds: string[]) => Promise<string[]>;
/**
 * Bulk update is_available for multiple menus
 * Only updates menus that need changing (avoids unnecessary writes)
 */
export declare const bulkUpdateMenuAvailability: (menuIds: string[], isAvailable: boolean) => Promise<number>;
export declare const menuAvailabilityRepository: {
    findMenuIdsByIngredientIds: (ingredientIds: string[]) => Promise<string[]>;
    findMenuIdsWithInsufficientStock: (menuIds: string[]) => Promise<string[]>;
    bulkUpdateMenuAvailability: (menuIds: string[], isAvailable: boolean) => Promise<number>;
};
export default menuAvailabilityRepository;
//# sourceMappingURL=menu-availability.repository.d.ts.map