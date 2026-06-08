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
// Inventory imports
const inventory_schema_1 = require("../src/modules/inventory/inventory.schema");
const inventory_controller_1 = __importDefault(require("../src/modules/inventory/inventory.controller"));
const router = express_1.default.Router();
// All routes require authentication and ADMIN role
const adminMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN])];
// ============================================
// INVENTORY ROUTES (/api/inventory)
// ============================================
const basePath = 'inventory';
// Reference routes (must be before param routes)
router.get(`/${basePath}/stock-types`, ...adminMiddleware, inventory_controller_1.default.getStockTypes);
// Stock IN - Barang Masuk dari Supplier
router.post(`/${basePath}/stock-in`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(inventory_schema_1.stockInSchema), inventory_controller_1.default.stockIn);
// Stock OUT - Barang Keluar (Rusak/Kedaluarsa)
router.post(`/${basePath}/stock-out`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(inventory_schema_1.stockOutSchema), inventory_controller_1.default.stockOut);
// Get stock history by ingredient
router.get(`/${basePath}/ingredient/:ingredient_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(inventory_schema_1.ingredientIdParamSchema, 'params'), inventory_controller_1.default.getHistoryByIngredient);
// Get all stock movements (history)
router.get(`/${basePath}`, ...adminMiddleware, inventory_controller_1.default.getHistory);
// Get stock movement detail
router.get(`/${basePath}/:stock_movement_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(inventory_schema_1.stockMovementIdParamSchema, 'params'), inventory_controller_1.default.getDetail);
exports.default = router;
//# sourceMappingURL=inventory.route.js.map