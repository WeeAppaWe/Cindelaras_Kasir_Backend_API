"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
/**
 * Internal webhook event emitter
 * Used to decouple stock changes from side-effects (e.g. menu availability)
 */
const webhookEmitter = new events_1.EventEmitter();
exports.default = webhookEmitter;
//# sourceMappingURL=webhook.emitter.js.map