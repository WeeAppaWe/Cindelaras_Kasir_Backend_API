import { Response, NextFunction, Request } from 'express';
import { AuthenticatedRequest } from '../../../types';
/**
 * Get PDF Receipt (On-Demand Generation)
 * GET /api/receipt/:order_id/pdf
 * Public endpoint - no auth required (link shared via WhatsApp)
 */
export declare const getPdfReceipt: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Send Receipt to WhatsApp
 * POST /api/receipt/:order_id/send
 */
export declare const sendReceipt: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Receipt Preview Sample (JSON data)
 * GET /api/receipt/preview-sample
 */
export declare const getPreviewSample: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Receipt Preview PDF
 * POST /api/receipt/preview-pdf
 */
export declare const getPreviewPdf: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Receipt Preview (JSON data)
 * GET /api/receipt/:order_id/preview
 */
export declare const getReceiptPreview: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const receiptController: {
    getPdfReceipt: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    sendReceipt: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getPreviewSample: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getReceiptPreview: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getPreviewPdf: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
export default receiptController;
//# sourceMappingURL=receipt.controller.d.ts.map