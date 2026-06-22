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
 * Get sample receipt preview data for admin store-setting page.
 * GET /api/receipt/preview-sample
 */
export declare const getPreviewSample: (req?: Request) => Promise<ReceiptDataForGenerator>;
/**
 * Generate sample PDF receipt for admin store-setting page preview.
 * POST /api/receipt/preview-pdf
 */
export declare const getPreviewPdf: (req: Request, res: Response) => Promise<void>;
/**
 * Get receipt preview (JSON data for frontend display)
 * GET /api/receipt/:order_id/preview
 */
export declare const getReceiptPreview: (req: AuthenticatedRequest) => Promise<ReceiptDataForGenerator>;
export declare const receiptService: {
    getPdfReceipt: (req: Request, res: Response) => Promise<void>;
    sendReceipt: (req: AuthenticatedRequest) => Promise<SendReceiptResponse>;
    getPreviewSample: (req?: Request) => Promise<ReceiptDataForGenerator>;
    getReceiptPreview: (req: AuthenticatedRequest) => Promise<ReceiptDataForGenerator>;
    getPreviewPdf: (req: Request, res: Response) => Promise<void>;
};
export default receiptService;
//# sourceMappingURL=receipt.service.d.ts.map