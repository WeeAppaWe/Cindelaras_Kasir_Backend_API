"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const token_validation_middleware_1 = require("../middleware/token-validation.middleware");
const role_validation_middleware_1 = require("../middleware/role-validation.middleware");
const zod_validation_middleware_1 = require("../middleware/zod-validation.middleware");
const auth_schema_1 = require("../src/modules/auth/auth.schema");
const receipt_schema_1 = require("../src/modules/receipt/receipt.schema");
const receipt_controller_1 = __importDefault(require("../src/modules/receipt/receipt.controller"));
const router = express_1.default.Router();
const pathGroup = 'receipt';
// Middleware for authenticated routes (kasir or admin)
const authMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN, auth_schema_1.RoleName.CASHIER])];
// ============================================
// Receipt Routes
// ============================================
// GET /api/receipt/:order_id/pdf - Generate PDF on-demand (PUBLIC - no auth)
// This is accessed via WhatsApp link by customer
router.get(`/${pathGroup}/:order_id/pdf`, (0, zod_validation_middleware_1.zodValidation)(receipt_schema_1.orderIdParamSchema, 'params'), receipt_controller_1.default.getPdfReceipt);
// GET /api/receipt/:order_id/preview - Get receipt data for preview (Authenticated)
router.get(`/${pathGroup}/:order_id/preview`, ...authMiddleware, (0, zod_validation_middleware_1.zodValidation)(receipt_schema_1.orderIdParamSchema, 'params'), receipt_controller_1.default.getReceiptPreview);
// POST /api/receipt/:order_id/send - Send receipt to WhatsApp (Authenticated)
router.post(`/${pathGroup}/:order_id/send`, ...authMiddleware, (0, zod_validation_middleware_1.zodValidation)(receipt_schema_1.orderIdParamSchema, 'params'), (0, zod_validation_middleware_1.zodValidation)(receipt_schema_1.sendReceiptSchema), receipt_controller_1.default.sendReceipt);
exports.default = router;
//# sourceMappingURL=receipt.route.js.map