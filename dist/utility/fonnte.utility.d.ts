import type { SendMessageParams, SendMessageResponse } from '../types/fonnte.types';
/**
 * Format phone number to Indonesian format (628xxx)
 * Handles: 08xxx, +628xxx, 628xxx, 8xxx
 */
export declare const formatPhoneNumber: (phone: string) => string;
/**
 * Send text message via Fonnte (Free tier)
 */
export declare const sendWhatsAppMessage: (params: SendMessageParams) => Promise<SendMessageResponse>;
/**
 * Check if Fonnte token is configured
 */
export declare const isFonnteConfigured: () => boolean;
declare const _default: {
    sendWhatsAppMessage: (params: SendMessageParams) => Promise<SendMessageResponse>;
    formatPhoneNumber: (phone: string) => string;
    isFonnteConfigured: () => boolean;
};
export default _default;
//# sourceMappingURL=fonnte.utility.d.ts.map