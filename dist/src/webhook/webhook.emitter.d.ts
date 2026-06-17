import { EventEmitter } from 'events';
/**
 * Payload for stock.changed event
 * Emitted whenever ingredient stock_qty is modified
 */
export type StockChangedPayload = {
    ingredient_ids: string[];
};
/**
 * Internal webhook event emitter
 * Used to decouple stock changes from side-effects (e.g. menu availability)
 */
declare const webhookEmitter: EventEmitter<any>;
export default webhookEmitter;
//# sourceMappingURL=webhook.emitter.d.ts.map