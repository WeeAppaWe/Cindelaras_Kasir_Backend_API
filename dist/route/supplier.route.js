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
// Supplier imports
const supplier_schema_1 = require("../src/modules/supplier/supplier.schema");
const supplier_controller_1 = __importDefault(require("../src/modules/supplier/supplier.controller"));
const router = express_1.default.Router();
// All routes require authentication and ADMIN role
const adminMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN])];
// ============================================
// SUPPLIER ROUTES (/api/supplier)
// ============================================
const basePath = 'supplier';
// CRUD Routes
router.get(`/${basePath}`, ...adminMiddleware, supplier_controller_1.default.showAll);
router.get(`/${basePath}/:supplier_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(supplier_schema_1.supplierIdParamSchema, 'params'), supplier_controller_1.default.detail);
router.post(`/${basePath}`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(supplier_schema_1.createSupplierSchema), supplier_controller_1.default.create);
router.patch(`/${basePath}/:supplier_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(supplier_schema_1.supplierIdParamSchema, 'params'), (0, zod_validation_middleware_1.zodValidation)(supplier_schema_1.updateSupplierSchema), supplier_controller_1.default.update);
router.delete(`/${basePath}/:supplier_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(supplier_schema_1.supplierIdParamSchema, 'params'), supplier_controller_1.default.softDelete);
exports.default = router;
//# sourceMappingURL=supplier.route.js.map