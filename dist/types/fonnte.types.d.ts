/**
 * Parameters for sending WhatsApp message
 */
export interface SendMessageParams {
    /** Phone number (format: 628xxx) */
    target: string;
    /** Message text content */
    message: string;
}
/**
 * Response from Fonnte API after sending message
 */
export interface SendMessageResponse {
    status: boolean;
    id?: string;
    detail?: string;
    message?: string;
}
/**
 * Raw API response from Fonnte
 */
export interface FonnteApiResponse {
    status?: boolean;
    id?: string;
    detail?: string;
    reason?: string;
    message?: string;
}
//# sourceMappingURL=fonnte.types.d.ts.map