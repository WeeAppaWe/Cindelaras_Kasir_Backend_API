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
const unit_measure_schema_1 = require("../src/modules/unit-measure/unit-measure.schema");
const unit_measure_controller_1 = __importDefault(require("../src/modules/unit-measure/unit-measure.controller"));
const router = express_1.default.Router();
const pathGroup = 'unit-measure';
// All routes require authentication and ADMIN role
const adminMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN])];
// ============================================
// Unit Measure Routes
// ============================================
// GET /api/unit-measure/options - Get unit measure references for dropdown
router.get(`/${pathGroup}/options`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(unit_measure_schema_1.unitMeasureReferenceQuerySchema, 'query'), unit_measure_controller_1.default.getReferences);
// GET /api/unit-measure - Get all unit measures
router.get(`/${pathGroup}`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(unit_measure_schema_1.unitMeasureListQuerySchema, 'query'), unit_measure_controller_1.default.showAll);
// GET /api/unit-measure/:unit_measure_id - Get unit measure detail
router.get(`/${pathGroup}/:unit_measure_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(unit_measure_schema_1.unitMeasureIdParamSchema, 'params'), unit_measure_controller_1.default.detail);
// POST /api/unit-measure - Create new unit measure
router.post(`/${pathGroup}`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(unit_measure_schema_1.createUnitMeasureSchema), unit_measure_controller_1.default.create);
// PATCH /api/unit-measure/:unit_measure_id - Update unit measure
router.patch(`/${pathGroup}/:unit_measure_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(unit_measure_schema_1.unitMeasureIdParamSchema, 'params'), (0, zod_validation_middleware_1.zodValidation)(unit_measure_schema_1.updateUnitMeasureSchema), unit_measure_controller_1.default.update);
// DELETE /api/unit-measure/:unit_measure_id - Soft delete unit measure
router.delete(`/${pathGroup}/:unit_measure_id`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(unit_measure_schema_1.unitMeasureIdParamSchema, 'params'), unit_measure_controller_1.default.softDelete);
exports.default = router;
//# sourceMappingURL=unit-measure.route.js.map