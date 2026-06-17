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
const webhookEmitter = new EventEmitter();

export default webhookEmitter;
