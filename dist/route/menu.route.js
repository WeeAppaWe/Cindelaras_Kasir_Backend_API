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
const menu_schema_1 = require("../src/modules/menu/menu.schema");
const menu_controller_1 = __importDefault(require("../src/modules/menu/menu.controller"));
const router = express_1.default.Router();
const pathGroup = 'menu';
// Role configurations
const adminOnly = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN])];
const adminAndCashier = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN, auth_schema_1.RoleName.CASHIER])];
// ============================================
// READ Routes (ADMIN & CASHIER)
// ============================================
// GET /api/menu - Get all menus (with pagination & filters)
router.get(`/${pathGroup}`, ...adminAndCashier, (0, zod_validation_middleware_1.zodValidation)(menu_schema_1.menuListQuerySchema, 'query'), menu_controller_1.default.showAll);
// GET /api/menu/:menu_id - Get menu detail
router.get(`/${pathGroup}/:menu_id`, ...adminAndCashier, (0, zod_validation_middleware_1.zodValidation)(menu_schema_1.menuIdParamSchema, 'params'), menu_controller_1.default.detail);
// ============================================
// WRITE Routes (ADMIN only)
// ============================================
// POST /api/menu - Create new menu
router.post(`/${pathGroup}`, ...adminOnly, (0, zod_validation_middleware_1.zodValidation)(menu_schema_1.createMenuSchema), menu_controller_1.default.create);
// PATCH /api/menu/:menu_id - Update menu
router.patch(`/${pathGroup}/:menu_id`, ...adminOnly, (0, zod_validation_middleware_1.zodValidation)(menu_schema_1.menuIdParamSchema, 'params'), (0, zod_validation_middleware_1.zodValidation)(menu_schema_1.updateMenuSchema), menu_controller_1.default.update);
// PATCH /api/menu/:menu_id/toggle-availability - Toggle menu availability
router.patch(`/${pathGroup}/:menu_id/toggle-availability`, ...adminOnly, (0, zod_validation_middleware_1.zodValidation)(menu_schema_1.menuIdParamSchema, 'params'), menu_controller_1.default.toggleAvailability);
// DELETE /api/menu/:menu_id - Soft delete menu
router.delete(`/${pathGroup}/:menu_id`, ...adminOnly, (0, zod_validation_middleware_1.zodValidation)(menu_schema_1.menuIdParamSchema, 'params'), menu_controller_1.default.softDelete);
exports.default = router;
//# sourceMappingURL=menu.route.js.map