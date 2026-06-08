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
const shift_schema_1 = require("../src/modules/shift/shift.schema");
const shift_controller_1 = __importDefault(require("../src/modules/shift/shift.controller"));
const router = express_1.default.Router();
const pathGroup = 'shift';
// Middleware - Cashier and Admin can access shift endpoints
const cashierMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN, auth_schema_1.RoleName.CASHIER])];
const adminMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN])];
// ============================================
// Shift Action Routes (must be before :shift_id routes)
// ============================================
// GET /api/shift/active - Check active shift for current user
router.get(`/${pathGroup}/active`, ...cashierMiddleware, shift_controller_1.default.getActiveShift);
// GET /api/shift/my - Get current user's shifts
router.get(`/${pathGroup}/my`, ...cashierMiddleware, (0, zod_validation_middleware_1.zodValidation)(shift_schema_1.shiftListQuerySchema, 'query'), shift_controller_1.default.getMyShifts);
// POST /api/shift/start - Start new shift (Buka Kas)
router.post(`/${pathGroup}/start`, ...cashierMiddleware, (0, zod_validation_middleware_1.zodValidation)(shift_schema_1.startShiftSchema), shift_controller_1.default.startShift);
// POST /api/shift/end - End current shift (Tutup Kas)
router.post(`/${pathGroup}/end`, ...cashierMiddleware, (0, zod_validation_middleware_1.zodValidation)(shift_schema_1.endShiftSchema), shift_controller_1.default.endShift);
// ============================================
// CRUD Routes
// ============================================
// GET /api/shift - Get all shifts (Admin only)
router.get(`/${pathGroup}`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(shift_schema_1.shiftListQuerySchema, 'query'), shift_controller_1.default.showAll);
// GET /api/shift/:shift_id - Get shift detail
router.get(`/${pathGroup}/:shift_id`, ...cashierMiddleware, (0, zod_validation_middleware_1.zodValidation)(shift_schema_1.shiftIdParamSchema, 'params'), shift_controller_1.default.detail);
// GET /api/shift/:shift_id/summary - Get shift summary with order stats
router.get(`/${pathGroup}/:shift_id/summary`, ...cashierMiddleware, (0, zod_validation_middleware_1.zodValidation)(shift_schema_1.shiftIdParamSchema, 'params'), shift_controller_1.default.getShiftSummary);
exports.default = router;
//# sourceMappingURL=shift.route.js.map