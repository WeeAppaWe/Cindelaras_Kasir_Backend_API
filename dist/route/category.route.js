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
const category_schema_1 = require("../src/modules/category/category.schema");
const category_controller_1 = __importDefault(require("../src/modules/category/category.controller"));
const router = express_1.default.Router();
const pathGroup = 'category';
// All routes require authentication and ADMIN role
const adminMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN])];
// ============================================
// CRUD Routes
// ============================================
// GET /api/category - Get all categories
router.get(`/${pathGroup}`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(category_schema_1.categoryListQuerySchema, 'query'), category_controller_1.default.showAll);
// GET /api/category/:category_id - Get category detail
router.get(`/${pathGroup}/:category_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(category_schema_1.categoryIdParamSchema, 'params'), category_controller_1.default.detail);
// POST /api/category - Create new category
router.post(`/${pathGroup}`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(category_schema_1.createCategorySchema), category_controller_1.default.create);
// PATCH /api/category/:category_id - Update category
router.patch(`/${pathGroup}/:category_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(category_schema_1.categoryIdParamSchema, 'params'), (0, zod_validation_middleware_1.zodValidation)(category_schema_1.updateCategorySchema), category_controller_1.default.update);
// DELETE /api/category/:category_id - Soft delete category
router.delete(`/${pathGroup}/:category_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(category_schema_1.categoryIdParamSchema, 'params'), category_controller_1.default.softDelete);
exports.default = router;
//# sourceMappingURL=category.route.js.map