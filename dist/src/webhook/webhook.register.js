"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWebhooks = void 0;
const webhook_emitter_1 = __importDefault(require("./webhook.emitter"));
const menu_availability_handler_1 = require("./handlers/menu-availability.handler");
/**
 * Register all webhook event handlers
 * Called once at application startup
 */
const registerWebhooks = () => {
    webhook_emitter_1.default.on('stock.changed', menu_availability_handler_1.handleStockChanged);
    console.log('[Webhook] All handlers registered');
};
exports.registerWebhooks = registerWebhooks;
exports.default = exports.registerWebhooks;
//# sourceMappingURL=webhook.register.js.map