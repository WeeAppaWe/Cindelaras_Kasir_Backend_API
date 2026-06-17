"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuAvailabilityHandler = exports.handleStockChanged = void 0;
const menu_availability_repository_1 = __importDefault(require("./menu-availability.repository"));
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
const handleStockChanged = async (payload) => {
    try {
        const { ingredient_ids } = payload;
        if (!ingredient_ids || ingredient_ids.length === 0)
            return;
        // 1. Find all menu IDs affected by these ingredients
        const affectedMenuIds = await menu_availability_repository_1.default.findMenuIdsByIngredientIds(ingredient_ids);
        if (affectedMenuIds.length === 0)
            return;
        // 2. Find which of these menus have insufficient stock
        const insufficientMenuIds = await menu_availability_repository_1.default.findMenuIdsWithInsufficientStock(affectedMenuIds);
        // 3. Determine which menus have sufficient stock
        const insufficientSet = new Set(insufficientMenuIds);
        const sufficientMenuIds = affectedMenuIds.filter((id) => !insufficientSet.has(id));
        // 4. Bulk update: set unavailable for insufficient, available for sufficient
        const [disabledCount, enabledCount] = await Promise.all([
            menu_availability_repository_1.default.bulkUpdateMenuAvailability(insufficientMenuIds, false),
            menu_availability_repository_1.default.bulkUpdateMenuAvailability(sufficientMenuIds, true),
        ]);
        if (disabledCount > 0 || enabledCount > 0) {
            console.log(`[Webhook] Menu availability updated: ${disabledCount} disabled, ${enabledCount} enabled`);
        }
    }
    catch (error) {
        // Fire-and-forget: log error but don't throw (don't break the main operation)
        console.error(`--- Menu Availability Handler Error: ${error.message}`);
    }
};
exports.handleStockChanged = handleStockChanged;
exports.menuAvailabilityHandler = {
    handleStockChanged: exports.handleStockChanged,
};
exports.default = exports.menuAvailabilityHandler;
//# sourceMappingURL=menu-availability.handler.js.map