import { StockChangedPayload } from '../webhook.emitter';
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
export declare const handleStockChanged: (payload: StockChangedPayload) => Promise<void>;
export declare const menuAvailabilityHandler: {
    handleStockChanged: (payload: StockChangedPayload) => Promise<void>;
};
export default menuAvailabilityHandler;
//# sourceMappingURL=menu-availability.handler.d.ts.map