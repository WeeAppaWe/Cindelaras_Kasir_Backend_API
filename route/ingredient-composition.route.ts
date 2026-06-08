import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';

// Composition imports
import {
    createCompositionSchema,
    updateCompositionSchema,
    bulkAddCompositionsSchema,
    parentIngredientIdParamSchema,
    compositionIdParamSchema,
    hppPreviewSchema,
} from '../src/modules/ingredient/semi/composition/ingredient-semi-composition.schema';
import compositionController from '../src/modules/ingredient/semi/composition/ingredient-semi-composition.controller';

const router: Router = express.Router();

// All routes require authentication and ADMIN role
const adminMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN])];

// ============================================
// COMPOSITION UTILITY ROUTES (/api/ingredient/semi/composition/...)
// Must be registered BEFORE ingredient-semi routes to avoid conflict with :ingredient_id
// ============================================
const semiPath = 'ingredient/semi';

// Get available raw ingredients for composition dropdown
router.get(
    `/${semiPath}/composition/available-ingredients`,
    ...adminMiddleware,
    compositionController.getAvailableIngredients
);

// Preview HPP calculation before saving
router.post(
    `/${semiPath}/composition/preview-hpp`,
    ...adminMiddleware,
    zodValidation(hppPreviewSchema),
    compositionController.previewHPP
);

// ============================================
// COMPOSITION ROUTES (/api/ingredient/semi/:ingredient_id/composition)
// ============================================

// Get all compositions for a semi ingredient
router.get(
    `/${semiPath}/:ingredient_id/composition`,
    ...adminMiddleware,
    zodValidation(parentIngredientIdParamSchema, 'params'),
    compositionController.showAll
);

// Add single composition
router.post(
    `/${semiPath}/:ingredient_id/composition`,
    ...adminMiddleware,
    zodValidation(parentIngredientIdParamSchema, 'params'),
    zodValidation(createCompositionSchema),
    compositionController.addComposition
);

// Bulk add compositions (replace all)
router.post(
    `/${semiPath}/:ingredient_id/composition/bulk`,
    ...adminMiddleware,
    zodValidation(parentIngredientIdParamSchema, 'params'),
    zodValidation(bulkAddCompositionsSchema),
    compositionController.bulkAddCompositions
);

// Update composition quantity
router.patch(
    `/${semiPath}/:ingredient_id/composition/:composition_id`,
    ...adminMiddleware,
    zodValidation(compositionIdParamSchema, 'params'),
    zodValidation(updateCompositionSchema),
    compositionController.updateComposition
);

// Delete composition
router.delete(
    `/${semiPath}/:ingredient_id/composition/:composition_id`,
    ...adminMiddleware,
    zodValidation(compositionIdParamSchema, 'params'),
    compositionController.deleteComposition
);

export default router;
