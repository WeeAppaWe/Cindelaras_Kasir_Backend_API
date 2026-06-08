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
const opname_schema_1 = require("../src/modules/opname/opname.schema");
const opname_controller_1 = __importDefault(require("../src/modules/opname/opname.controller"));
const router = express_1.default.Router();
const pathGroup = 'opname';
// All routes require authentication and ADMIN role
const adminMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN])];
// ============================================
// Reference/Dropdown Routes (must be before :stock_opname_id routes)
// ============================================
// GET /api/opname/ingredients - Get all ingredients for opname form
router.get(`/${pathGroup}/ingredients`, ...adminMiddleware, opname_controller_1.default.getIngredients);
// ============================================
// CRUD Routes
// ============================================
// GET /api/opname - Get all stock opnames
router.get(`/${pathGroup}`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(opname_schema_1.opnameListQuerySchema, 'query'), opname_controller_1.default.showAll);
// GET /api/opname/:stock_opname_id - Get stock opname detail
router.get(`/${pathGroup}/:stock_opname_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(opname_schema_1.opnameIdParamSchema, 'params'), opname_controller_1.default.detail);
// POST /api/opname - Create new stock opname
router.post(`/${pathGroup}`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(opname_schema_1.createOpnameSchema), opname_controller_1.default.create);
// PATCH /api/opname/:stock_opname_id - Update stock opname
router.patch(`/${pathGroup}/:stock_opname_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(opname_schema_1.opnameIdParamSchema, 'params'), (0, zod_validation_middleware_1.zodValidation)(opname_schema_1.updateOpnameSchema), opname_controller_1.default.update);
// PATCH /api/opname/:stock_opname_id/status - Change stock opname status
router.patch(`/${pathGroup}/:stock_opname_id/status`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(opname_schema_1.opnameIdParamSchema, 'params'), (0, zod_validation_middleware_1.zodValidation)(opname_schema_1.changeStatusSchema), opname_controller_1.default.changeStatus);
// POST /api/opname/:stock_opname_id/apply - Apply adjustment to stock
router.post(`/${pathGroup}/:stock_opname_id/apply`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(opname_schema_1.opnameIdParamSchema, 'params'), opname_controller_1.default.applyAdjustment);
// DELETE /api/opname/:stock_opname_id - Soft delete stock opname
router.delete(`/${pathGroup}/:stock_opname_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(opname_schema_1.opnameIdParamSchema, 'params'), opname_controller_1.default.softDelete);
exports.default = router;
//# sourceMappingURL=opname.route.js.map