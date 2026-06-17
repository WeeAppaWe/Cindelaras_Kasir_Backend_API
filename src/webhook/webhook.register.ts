import webhookEmitter from './webhook.emitter';
import { handleStockChanged } from './handlers/menu-availability.handler';

/**
 * Register all webhook event handlers
 * Called once at application startup
 */
export const registerWebhooks = (): void => {
    webhookEmitter.on('stock.changed', handleStockChanged);
    console.log('[Webhook] All handlers registered');
};

export default registerWebhooks;
