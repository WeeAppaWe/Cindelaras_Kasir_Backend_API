"use strict";
// Fonnte WhatsApp API Utility
// Documentation: https://fonnte.com/api
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFonnteConfigured = exports.sendWhatsAppMessage = exports.formatPhoneNumber = void 0;
const fonnte_config_1 = __importDefault(require("../config/fonnte.config"));
/**
 * Format phone number to Indonesian format (628xxx)
 * Handles: 08xxx, +628xxx, 628xxx, 8xxx
 */
const formatPhoneNumber = (phone) => {
    // Remove all non-numeric characters
    let cleaned = phone.replace(/\D/g, '');
    // Handle various formats
    if (cleaned.startsWith('0')) {
        // 08xxx → 628xxx
        cleaned = '62' + cleaned.substring(1);
    }
    else if (cleaned.startsWith('8')) {
        // 8xxx → 628xxx
        cleaned = '62' + cleaned;
    }
    // 628xxx stays as is
    return cleaned;
};
exports.formatPhoneNumber = formatPhoneNumber;
/**
 * Send text message via Fonnte (Free tier)
 */
const sendWhatsAppMessage = async (params) => {
    try {
        const { target, message } = params;
        const formattedPhone = (0, exports.formatPhoneNumber)(target);
        const formData = new URLSearchParams();
        formData.append('target', formattedPhone);
        formData.append('message', message);
        const response = await fetch(`${fonnte_config_1.default.baseUrl}${fonnte_config_1.default.endpoints.send}`, {
            method: 'POST',
            headers: {
                'Authorization': fonnte_config_1.default.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        });
        const result = await response.json();
        return {
            status: result.status === true,
            id: result.id,
            detail: result.detail,
            message: result.reason || result.message,
        };
    }
    catch (error) {
        console.error('Fonnte send message error:', error);
        return {
            status: false,
            message: error instanceof Error ? error.message : 'Gagal mengirim pesan WhatsApp',
        };
    }
};
exports.sendWhatsAppMessage = sendWhatsAppMessage;
/**
 * Check if Fonnte token is configured
 */
const isFonnteConfigured = () => {
    return !!fonnte_config_1.default.token && fonnte_config_1.default.token.length > 0;
};
exports.isFonnteConfigured = isFonnteConfigured;
exports.default = {
    sendWhatsAppMessage: exports.sendWhatsAppMessage,
    formatPhoneNumber: exports.formatPhoneNumber,
    isFonnteConfigured: exports.isFonnteConfigured,
};
//# sourceMappingURL=fonnte.utility.js.map