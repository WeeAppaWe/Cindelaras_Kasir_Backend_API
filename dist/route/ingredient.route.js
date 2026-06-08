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
// Raw Ingredient imports
const ingredient_raw_schema_1 = require("../src/modules/ingredient/raw/ingredient-raw.schema");
const ingredient_raw_controller_1 = __importDefault(require("../src/modules/ingredient/raw/ingredient-raw.controller"));
// Semi Ingredient imports
const ingredient_semi_schema_1 = require("../src/modules/ingredient/semi/ingredient-semi.schema");
const ingredient_semi_controller_1 = __importDefault(require("../src/modules/ingredient/semi/ingredient-semi.controller"));
const router = express_1.default.Router();
// All routes require authentication and ADMIN role
const adminMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN])];
// ============================================
// RAW INGREDIENT ROUTES (/api/ingredient/raw)
// ============================================
const rawPath = 'ingredient/raw';
// Reference/Dropdown Routes (must be before :ingredient_id routes)
router.get(`/${rawPath}/units`, ...adminMiddleware, ingredient_raw_controller_1.default.getUnitMeasures);
router.get(`/${rawPath}/low-stock`, ...adminMiddleware, ingredient_raw_controller_1.default.getLowStockAlerts);
// CRUD Routes
router.get(`/${rawPath}`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(ingredient_raw_schema_1.rawIngredientListQuerySchema, 'query'), ingredient_raw_controller_1.default.showAll);
router.get(`/${rawPath}/:ingredient_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(ingredient_raw_schema_1.ingredientIdParamSchema, 'params'), ingredient_raw_controller_1.default.detail);
router.post(`/${rawPath}`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(ingredient_raw_schema_1.createRawIngredientSchema), ingredient_raw_controller_1.default.create);
router.patch(`/${rawPath}/:ingredient_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(ingredient_raw_schema_1.ingredientIdParamSchema, 'params'), (0, zod_validation_middleware_1.zodValidation)(ingredient_raw_schema_1.updateRawIngredientSchema), ingredient_raw_controller_1.default.update);
router.delete(`/${rawPath}/:ingredient_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(ingredient_raw_schema_1.ingredientIdParamSchema, 'params'), ingredient_raw_controller_1.default.softDelete);
// ============================================
// SEMI INGREDIENT ROUTES (/api/ingredient/semi)
// ============================================
const semiPath = 'ingredient/semi';
// Reference/Dropdown Routes (must be before :ingredient_id routes)
router.get(`/${semiPath}/units`, ...adminMiddleware, ingredient_semi_controller_1.default.getUnitMeasures);
// CRUD Routes for Semi Ingredient
router.get(`/${semiPath}`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(ingredient_semi_schema_1.semiIngredientListQuerySchema, 'query'), ingredient_semi_controller_1.default.showAll);
router.get(`/${semiPath}/:ingredient_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(ingredient_semi_schema_1.semiIngredientIdParamSchema, 'params'), ingredient_semi_controller_1.default.detail);
router.post(`/${semiPath}`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(ingredient_semi_schema_1.createSemiIngredientSchema), ingredient_semi_controller_1.default.create);
router.patch(`/${semiPath}/:ingredient_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(ingredient_semi_schema_1.semiIngredientIdParamSchema, 'params'), (0, zod_validation_middleware_1.zodValidation)(ingredient_semi_schema_1.updateSemiIngredientSchema), ingredient_semi_controller_1.default.update);
router.delete(`/${semiPath}/:ingredient_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(ingredient_semi_schema_1.semiIngredientIdParamSchema, 'params'), ingredient_semi_controller_1.default.softDelete);
// HPP Calculation Routes
router.get(`/${semiPath}/:ingredient_id/hpp`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(ingredient_semi_schema_1.semiIngredientIdParamSchema, 'params'), ingredient_semi_controller_1.default.getHPPCalculation);
router.post(`/${semiPath}/:ingredient_id/recalculate-hpp`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(ingredient_semi_schema_1.semiIngredientIdParamSchema, 'params'), ingredient_semi_controller_1.default.recalculateHPP);
exports.default = router;
//# sourceMappingURL=ingredient.route.js.map