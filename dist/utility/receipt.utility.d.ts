import { ReceiptDataForGenerator } from '../types';
/**
 * Generate PDF receipt as base64 string
 */
export declare const generatePdfReceipt: (data: ReceiptDataForGenerator) => Promise<string>;
/**
 * Generate HTML receipt that can be converted to image on frontend
 * Using inline styles for standalone rendering
 */
export declare const generateHtmlReceipt: (data: ReceiptDataForGenerator) => string;
declare const _default: {
    generatePdfReceipt: (data: ReceiptDataForGenerator) => Promise<string>;
    generateHtmlReceipt: (data: ReceiptDataForGenerator) => string;
};
export default _default;
//# sourceMappingURL=receipt.utility.d.ts.map