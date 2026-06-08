import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';
import {
  settingKeyParamSchema,
  updateSettingSchema,
  upsertSettingSchema,
  batchUpdateSettingsSchema,
} from '../src/modules/store-setting/store-setting.schema';
import storeSettingController from '../src/modules/store-setting/store-setting.controller';

const router: Router = express.Router();

const pathGroup = 'store-setting';

// All routes require authentication and ADMIN role
const adminMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN])];

// Authenticated middleware (any role - Admin or Cashier)
const authMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN, RoleName.CASHIER])];

// ============================================
// Store Setting Routes
// ============================================

// GET /api/store-setting/public/info - Get public store info (name & logo only)
// Accessible by all authenticated users (Admin & Cashier)
// Accessible by Public (no auth required)
router.get(
  `/${pathGroup}/public/info`,
  storeSettingController.getPublicInfo
);

// GET /api/store-setting - Get all settings (array format)
router.get(
  `/${pathGroup}`,
  ...adminMiddleware,
  storeSettingController.showAll
);

// GET /api/store-setting/map - Get all settings (key-value map format)
router.get(
  `/${pathGroup}/map`,
  ...adminMiddleware,
  storeSettingController.showAllAsMap
);

// PATCH /api/store-setting/batch - Batch update multiple settings
router.patch(
  `/${pathGroup}/batch`,
  ...adminMiddleware,
  zodValidation(batchUpdateSettingsSchema),
  storeSettingController.batchUpdate
);

// GET /api/store-setting/:setting_key - Get single setting by key
router.get(
  `/${pathGroup}/:setting_key`,
  ...adminMiddleware,
  zodValidation(settingKeyParamSchema, 'params'),
  storeSettingController.getByKey
);

// POST /api/store-setting - Create or update setting (upsert)
router.post(
  `/${pathGroup}`,
  ...adminMiddleware,
  zodValidation(upsertSettingSchema),
  storeSettingController.upsert
);

// PATCH /api/store-setting/:setting_key - Update single setting by key
router.patch(
  `/${pathGroup}/:setting_key`,
  ...adminMiddleware,
  zodValidation(settingKeyParamSchema, 'params'),
  zodValidation(updateSettingSchema),
  storeSettingController.upsertByKey
);

// DELETE /api/store-setting/:setting_key - Delete setting by key
router.delete(
  `/${pathGroup}/:setting_key`,
  ...adminMiddleware,
  zodValidation(settingKeyParamSchema, 'params'),
  storeSettingController.deleteByKey
);

export default router;
