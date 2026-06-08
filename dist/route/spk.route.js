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
const spk_schema_1 = require("../src/modules/spk/spk.schema");
const spk_controller_1 = __importDefault(require("../src/modules/spk/spk.controller"));
const router = express_1.default.Router();
const pathGroup = 'spk';
// All routes require authentication and ADMIN role
const adminMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN])];
// ============================================
// SPK ROUTES
// ============================================
// GET /api/spk/analysis - Run SPK analysis
router.get(`/${pathGroup}/analysis`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(spk_schema_1.spkConfigSchema, 'query'), spk_controller_1.default.runAnalysis);
exports.default = router;
//# sourceMappingURL=spk.route.js.map