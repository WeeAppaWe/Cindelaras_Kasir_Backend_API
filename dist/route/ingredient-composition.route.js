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
// Composition imports
const ingredient_semi_composition_schema_1 = require("../src/modules/ingredient/semi/composition/ingredient-semi-composition.schema");
const ingredient_semi_composition_controller_1 = __importDefault(require("../src/modules/ingredient/semi/composition/ingredient-semi-composition.controller"));
const router = express_1.default.Router();
// All routes require authentication and ADMIN role
const adminMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN])];
// ============================================
// COMPOSITION UTILITY ROUTES (/api/ingredient/semi/composition/...)
// Must be registered BEFORE ingredient-semi routes to avoid conflict with :ingredient_id
// ============================================
const semiPath = 'ingredient/semi';
// Get available raw ingredients for composition dropdown
router.get(`/${semiPath}/composition/available-ingredients`, ...adminMiddleware, ingredient_semi_composition_controller_1.default.getAvailableIngredients);
// Preview HPP calculation before saving
router.post(`/${semiPath}/composition/preview-hpp`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(ingredient_semi_composition_schema_1.hppPreviewSchema), ingredient_semi_composition_controller_1.default.previewHPP);
// ============================================
// COMPOSITION ROUTES (/api/ingredient/semi/:ingredient_id/composition)
// ============================================
// Get all compositions for a semi ingredient
router.get(`/${semiPath}/:ingredient_id/composition`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(ingredient_semi_composition_schema_1.parentIngredientIdParamSchema, 'params'), ingredient_semi_composition_controller_1.default.showAll);
// Add single composition
router.post(`/${semiPath}/:ingredient_id/composition`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(ingredient_semi_composition_schema_1.parentIngredientIdParamSchema, 'params'), (0, zod_validation_middleware_1.zodValidation)(ingredient_semi_composition_schema_1.createCompositionSchema), ingredient_semi_composition_controller_1.default.addComposition);
// Bulk add compositions (replace all)
router.post(`/${semiPath}/:ingredient_id/composition/bulk`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(ingredient_semi_composition_schema_1.parentIngredientIdParamSchema, 'params'), (0, zod_validation_middleware_1.zodValidation)(ingredient_semi_composition_schema_1.bulkAddCompositionsSchema), ingredient_semi_composition_controller_1.default.bulkAddCompositions);
// Update composition quantity
router.patch(`/${semiPath}/:ingredient_id/composition/:composition_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(ingredient_semi_composition_schema_1.compositionIdParamSchema, 'params'), (0, zod_validation_middleware_1.zodValidation)(ingredient_semi_composition_schema_1.updateCompositionSchema), ingredient_semi_composition_controller_1.default.updateComposition);
// Delete composition
router.delete(`/${semiPath}/:ingredient_id/composition/:composition_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(ingredient_semi_composition_schema_1.compositionIdParamSchema, 'params'), ingredient_semi_composition_controller_1.default.deleteComposition);
exports.default = router;
//# sourceMappingURL=ingredient-composition.route.js.map