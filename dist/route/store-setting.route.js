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
const store_setting_schema_1 = require("../src/modules/store-setting/store-setting.schema");
const store_setting_controller_1 = __importDefault(require("../src/modules/store-setting/store-setting.controller"));
const router = express_1.default.Router();
const pathGroup = 'store-setting';
// All routes require authentication and ADMIN role
const adminMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN])];
// Authenticated middleware (any role - Admin or Cashier)
const authMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN, auth_schema_1.RoleName.CASHIER])];
// ============================================
// Store Setting Routes
// ============================================
// GET /api/store-setting/public/info - Get public store info (name & logo only)
// Accessible by all authenticated users (Admin & Cashier)
// Accessible by Public (no auth required)
router.get(`/${pathGroup}/public/info`, store_setting_controller_1.default.getPublicInfo);
// GET /api/store-setting - Get all settings (array format)
router.get(`/${pathGroup}`, ...adminMiddleware, store_setting_controller_1.default.showAll);
// GET /api/store-setting/map - Get all settings (key-value map format)
router.get(`/${pathGroup}/map`, ...adminMiddleware, store_setting_controller_1.default.showAllAsMap);
// PATCH /api/store-setting/batch - Batch update multiple settings
router.patch(`/${pathGroup}/batch`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(store_setting_schema_1.batchUpdateSettingsSchema), store_setting_controller_1.default.batchUpdate);
// GET /api/store-setting/:setting_key - Get single setting by key
router.get(`/${pathGroup}/:setting_key`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(store_setting_schema_1.settingKeyParamSchema, 'params'), store_setting_controller_1.default.getByKey);
// POST /api/store-setting - Create or update setting (upsert)
router.post(`/${pathGroup}`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(store_setting_schema_1.upsertSettingSchema), store_setting_controller_1.default.upsert);
// PATCH /api/store-setting/:setting_key - Update single setting by key
router.patch(`/${pathGroup}/:setting_key`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(store_setting_schema_1.settingKeyParamSchema, 'params'), (0, zod_validation_middleware_1.zodValidation)(store_setting_schema_1.updateSettingSchema), store_setting_controller_1.default.upsertByKey);
// DELETE /api/store-setting/:setting_key - Delete setting by key
router.delete(`/${pathGroup}/:setting_key`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(store_setting_schema_1.settingKeyParamSchema, 'params'), store_setting_controller_1.default.deleteByKey);
exports.default = router;
//# sourceMappingURL=store-setting.route.js.map