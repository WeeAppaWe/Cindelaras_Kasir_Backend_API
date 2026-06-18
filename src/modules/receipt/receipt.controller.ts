import { Response, NextFunction, Request } from 'express';
import receiptService from './receipt.service';
import responseApi from '../../../utility/response-api';
import { AuthenticatedRequest } from '../../../types';

/**
 * Get PDF Receipt (On-Demand Generation)
 * GET /api/receipt/:order_id/pdf
 * Public endpoint - no auth required (link shared via WhatsApp)
 */
export const getPdfReceipt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await receiptService.getPdfReceipt(req, res);
  } catch (error) {
    next(error);
  }
};

/**
 * Send Receipt to WhatsApp
 * POST /api/receipt/:order_id/send
 */
export const sendReceipt = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await receiptService.sendReceipt(req);
    res.status(200).json(responseApi({ code: 200, message: data.message }, data));
  } catch (error) {
    next(error);
  }
};

/**
 * Get Receipt Preview Sample (JSON data)
 * GET /api/receipt/preview-sample
 */
export const getPreviewSample = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await receiptService.getPreviewSample();
    res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil preview sample struk' }, data));
  } catch (error) {
    next(error);
  }
};

/**
 * Get Receipt Preview PDF
 * POST /api/receipt/preview-pdf
 */
export const getPreviewPdf = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await receiptService.getPreviewPdf(req, res);
  } catch (error) {
    next(error);
  }
};

/**
 * Get Receipt Preview (JSON data)
 * GET /api/receipt/:order_id/preview
 */
export const getReceiptPreview = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await receiptService.getReceiptPreview(req);
    res.status(200).json(responseApi({ code: 200, message: 'Berhasil mengambil data struk' }, data));
  } catch (error) {
    next(error);
  }
};

export const receiptController = {
  getPdfReceipt,
  sendReceipt,
  getPreviewSample,
  getReceiptPreview,
  getPreviewPdf,
};

export default receiptController;
