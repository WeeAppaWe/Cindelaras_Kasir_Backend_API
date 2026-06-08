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
// Stock Type imports
const stock_type_schema_1 = require("../src/modules/stock-type/stock-type.schema");
const stock_type_controller_1 = __importDefault(require("../src/modules/stock-type/stock-type.controller"));
const router = express_1.default.Router();
// All routes require authentication and ADMIN role
const adminMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN])];
// ============================================
// STOCK TYPE ROUTES (/api/stock-type)
// ============================================
const basePath = 'stock-type';
// Get all stock types
router.get(`/${basePath}`, ...adminMiddleware, stock_type_controller_1.default.showAll);
// Get stock type detail
router.get(`/${basePath}/:stock_type_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(stock_type_schema_1.stockTypeIdParamSchema, 'params'), stock_type_controller_1.default.detail);
exports.default = router;
//# sourceMappingURL=stock-type.route.js.map