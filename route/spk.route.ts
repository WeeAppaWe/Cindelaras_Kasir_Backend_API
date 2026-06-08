import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';
import { spkConfigSchema } from '../src/modules/spk/spk.schema';
import spkController from '../src/modules/spk/spk.controller';

const router: Router = express.Router();

const pathGroup = 'spk';

// All routes require authentication and ADMIN role
const adminMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN])];

// ============================================
// SPK ROUTES
// ============================================

// GET /api/spk/analysis - Run SPK analysis
router.get(
    `/${pathGroup}/analysis`,
    ...adminMiddleware,
    zodValidation(spkConfigSchema, 'query'),
    spkController.runAnalysis
);

export default router;
