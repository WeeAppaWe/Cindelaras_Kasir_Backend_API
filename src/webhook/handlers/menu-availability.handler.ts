import { StockChangedPayload } from '../webhook.emitter';
import menuAvailabilityRepository from './menu-availability.repository';

/**
 * Handle stock.changed event
 * Checks all affected menus and updates their availability based on ingredient stock
 *
 * Logic:
 * 1. Find all menus that use the changed ingredients
 * 2. Check which menus have insufficient stock (any ingredient stock_qty < qty_needed)
 * 3. Set insufficient menus to is_available = false
 * 4. Set sufficient menus back to is_available = true
 */
export const handleStockChanged = async (payload: StockChangedPayload): Promise<void> => {
    try {
        const { ingredient_ids } = payload;

        if (!ingredient_ids || ingredient_ids.length === 0) return;

        // 1. Find all menu IDs affected by these ingredients
        const affectedMenuIds = await menuAvailabilityRepository.findMenuIdsByIngredientIds(ingredient_ids);

        if (affectedMenuIds.length === 0) return;

        // 2. Find which of these menus have insufficient stock
        const insufficientMenuIds = await menuAvailabilityRepository.findMenuIdsWithInsufficientStock(affectedMenuIds);

        // 3. Determine which menus have sufficient stock
        const insufficientSet = new Set(insufficientMenuIds);
        const sufficientMenuIds = affectedMenuIds.filter((id) => !insufficientSet.has(id));

        // 4. Bulk update: set unavailable for insufficient, available for sufficient
        const [disabledCount, enabledCount] = await Promise.all([
            menuAvailabilityRepository.bulkUpdateMenuAvailability(insufficientMenuIds, false),
            menuAvailabilityRepository.bulkUpdateMenuAvailability(sufficientMenuIds, true),
        ]);

        if (disabledCount > 0 || enabledCount > 0) {
            console.log(
                `[Webhook] Menu availability updated: ${disabledCount} disabled, ${enabledCount} enabled`
            );
        }
    } catch (error) {
        // Fire-and-forget: log error but don't throw (don't break the main operation)
        console.error(`--- Menu Availability Handler Error: ${(error as Error).message}`);
    }
};

export const menuAvailabilityHandler = {
    handleStockChanged,
};

export default menuAvailabilityHandler;
