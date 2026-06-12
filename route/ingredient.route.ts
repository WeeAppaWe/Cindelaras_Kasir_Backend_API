import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';

// All Ingredient imports
import { ingredientAllReferenceQuerySchema } from '../src/modules/ingredient/all/ingredient-all.schema';
import ingredientAllController from '../src/modules/ingredient/all/ingredient-all.controller';

// Raw Ingredient imports
import {
    createRawIngredientSchema,
    updateRawIngredientSchema,
    ingredientIdParamSchema,
    rawIngredientReferenceQuerySchema,
    rawIngredientListQuerySchema,
} from '../src/modules/ingredient/raw/ingredient-raw.schema';
import rawIngredientController from '../src/modules/ingredient/raw/ingredient-raw.controller';

// Semi Ingredient imports
import {
    createSemiIngredientSchema,
    updateSemiIngredientSchema,
    semiIngredientIdParamSchema,
    semiIngredientListQuerySchema,
    produceSemiIngredientSchema,
    createAndProduceSemiIngredientSchema,
    semiIngredientReferenceQuerySchema,
} from '../src/modules/ingredient/semi/ingredient-semi.schema';
import semiIngredientController from '../src/modules/ingredient/semi/ingredient-semi.controller';

const router: Router = express.Router();

// All routes require authentication and ADMIN role
const adminMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN])];

// ============================================
// ALL INGREDIENT ROUTES (/api/ingredient)
// ============================================
const ingredientPath = 'ingredient';

// Reference/Dropdown Routes
router.get(
    `/${ingredientPath}/options`,
    ...adminMiddleware,
    zodValidation(ingredientAllReferenceQuerySchema, 'query'),
    ingredientAllController.getReferences
);

// ============================================
// RAW INGREDIENT ROUTES (/api/ingredient/raw)
// ============================================
const rawPath = 'ingredient/raw';

// Reference/Dropdown Routes (must be before :ingredient_id routes)
router.get(
    `/${rawPath}/options`,
    ...adminMiddleware,
    zodValidation(rawIngredientReferenceQuerySchema, 'query'),
    rawIngredientController.getReferences
);
router.get(`/${rawPath}/units`, ...adminMiddleware, rawIngredientController.getUnitMeasures);
router.get(`/${rawPath}/low-stock`, ...adminMiddleware, rawIngredientController.getLowStockAlerts);

// CRUD Routes
router.get(
    `/${rawPath}`,
    ...adminMiddleware,
    zodValidation(rawIngredientListQuerySchema, 'query'),
    rawIngredientController.showAll
);

router.get(
    `/${rawPath}/:ingredient_id`,
    ...adminMiddleware,
    zodValidation(ingredientIdParamSchema, 'params'),
    rawIngredientController.detail
);

router.post(
    `/${rawPath}`,
    ...adminMiddleware,
    zodValidation(createRawIngredientSchema),
    rawIngredientController.create
);

router.patch(
    `/${rawPath}/:ingredient_id`,
    ...adminMiddleware,
    zodValidation(ingredientIdParamSchema, 'params'),
    zodValidation(updateRawIngredientSchema),
    rawIngredientController.update
);

router.delete(
    `/${rawPath}/:ingredient_id`,
    ...adminMiddleware,
    zodValidation(ingredientIdParamSchema, 'params'),
    rawIngredientController.softDelete
);

// ============================================
// SEMI INGREDIENT ROUTES (/api/ingredient/semi)
// ============================================
const semiPath = 'ingredient/semi';

// Reference/Dropdown Routes (must be before :ingredient_id routes)
router.get(`/${semiPath}/units`, ...adminMiddleware, semiIngredientController.getUnitMeasures);

// Options/Reference dropdown route (must be before :ingredient_id routes)
router.get(
    `/${semiPath}/options`,
    ...adminMiddleware,
    zodValidation(semiIngredientReferenceQuerySchema, 'query'),
    semiIngredientController.getReferences
);

// Create and produce (all-in-one) — must be before POST /${semiPath} to avoid ambiguity
router.post(
    `/${semiPath}/create-and-produce`,
    ...adminMiddleware,
    zodValidation(createAndProduceSemiIngredientSchema),
    semiIngredientController.createAndProduce
);

// Production route (must be before :ingredient_id routes)
router.post(
    `/${semiPath}/:ingredient_id/produce`,
    ...adminMiddleware,
    zodValidation(semiIngredientIdParamSchema, 'params'),
    zodValidation(produceSemiIngredientSchema),
    semiIngredientController.produce
);

// CRUD Routes for Semi Ingredient
router.get(
    `/${semiPath}`,
    ...adminMiddleware,
    zodValidation(semiIngredientListQuerySchema, 'query'),
    semiIngredientController.showAll
);

router.get(
    `/${semiPath}/:ingredient_id`,
    ...adminMiddleware,
    zodValidation(semiIngredientIdParamSchema, 'params'),
    semiIngredientController.detail
);

router.post(
    `/${semiPath}`,
    ...adminMiddleware,
    zodValidation(createSemiIngredientSchema),
    semiIngredientController.create
);

router.patch(
    `/${semiPath}/:ingredient_id`,
    ...adminMiddleware,
    zodValidation(semiIngredientIdParamSchema, 'params'),
    zodValidation(updateSemiIngredientSchema),
    semiIngredientController.update
);

router.delete(
    `/${semiPath}/:ingredient_id`,
    ...adminMiddleware,
    zodValidation(semiIngredientIdParamSchema, 'params'),
    semiIngredientController.softDelete
);

// HPP Calculation Routes
router.get(
    `/${semiPath}/:ingredient_id/hpp`,
    ...adminMiddleware,
    zodValidation(semiIngredientIdParamSchema, 'params'),
    semiIngredientController.getHPPCalculation
);

router.post(
    `/${semiPath}/:ingredient_id/recalculate-hpp`,
    ...adminMiddleware,
    zodValidation(semiIngredientIdParamSchema, 'params'),
    semiIngredientController.recalculateHPP
);

export default router;
