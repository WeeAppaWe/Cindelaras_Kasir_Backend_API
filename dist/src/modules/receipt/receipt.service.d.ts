import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../../types';
import { ReceiptDataForGenerator } from '../../../types/receipt.types';
import { SendReceiptResponse } from './receipt.types';
/**
 * Generate PDF receipt on-demand
 * GET /api/receipt/:order_id/pdf
 */
export declare const getPdfReceipt: (req: Request, res: Response) => Promise<void>;
/**
 * Send receipt link to WhatsApp
 * POST /api/receipt/:order_id/send
 */
export declare const sendReceipt: (req: AuthenticatedRequest) => Promise<SendReceiptResponse>;
/**
 * Get receipt preview (JSON data for frontend display)
 * GET /api/receipt/:order_id/preview
 */
export declare const getReceiptPreview: (req: AuthenticatedRequest) => Promise<ReceiptDataForGenerator>;
export declare const receiptService: {
    getPdfReceipt: (req: Request, res: Response) => Promise<void>;
    sendReceipt: (req: AuthenticatedRequest) => Promise<SendReceiptResponse>;
    getReceiptPreview: (req: AuthenticatedRequest) => Promise<ReceiptDataForGenerator>;
};
export default receiptService;
//# sourceMappingURL=receipt.service.d.ts.map