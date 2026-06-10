import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';
import {
  orderIdParamSchema,
  sendReceiptSchema,
} from '../src/modules/receipt/receipt.schema';
import receiptController from '../src/modules/receipt/receipt.controller';

const router: Router = express.Router();

const pathGroup = 'receipt';

// Middleware for authenticated routes (kasir or admin)
const authMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN, RoleName.CASHIER])];
const adminMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN])];

// ============================================
// Receipt Routes
// ============================================

// GET /api/receipt/preview-sample - Get sample receipt data for admin setting preview
router.get(
  `/${pathGroup}/preview-sample`,
  ...adminMiddleware,
  receiptController.getPreviewSample
);

// GET /api/receipt/:order_id/pdf - Generate PDF on-demand (PUBLIC - no auth)
// This is accessed via WhatsApp link by customer
router.get(
  `/${pathGroup}/:order_id/pdf`,
  zodValidation(orderIdParamSchema, 'params'),
  receiptController.getPdfReceipt
);

// GET /api/receipt/:order_id/preview - Get receipt data for preview (Authenticated)
router.get(
  `/${pathGroup}/:order_id/preview`,
  ...authMiddleware,
  zodValidation(orderIdParamSchema, 'params'),
  receiptController.getReceiptPreview
);

// POST /api/receipt/:order_id/send - Send receipt to WhatsApp (Authenticated)
router.post(
  `/${pathGroup}/:order_id/send`,
  ...authMiddleware,
  zodValidation(orderIdParamSchema, 'params'),
  zodValidation(sendReceiptSchema),
  receiptController.sendReceipt
);

export default router;
