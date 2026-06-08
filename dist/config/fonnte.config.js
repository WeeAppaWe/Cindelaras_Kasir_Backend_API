"use strict";
// Fonnte WhatsApp API Configuration
Object.defineProperty(exports, "__esModule", { value: true });
exports.fonnteConfig = void 0;
exports.fonnteConfig = {
    token: process.env.FONNTE_TOKEN || '',
    baseUrl: 'https://api.fonnte.com',
    endpoints: {
        send: '/send',
        sendFile: '/send',
    },
};
exports.default = exports.fonnteConfig;
//# sourceMappingURL=fonnte.config.js.map