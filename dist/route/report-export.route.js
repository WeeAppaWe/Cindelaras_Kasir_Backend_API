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
const report_export_schema_1 = require("../src/modules/report/export/report-export.schema");
const report_export_controller_1 = __importDefault(require("../src/modules/report/export/report-export.controller"));
const router = express_1.default.Router();
const pathGroup = 'report/export';
// All routes require authentication and ADMIN role
const adminMiddleware = [token_validation_middleware_1.tokenValidation, (0, role_validation_middleware_1.roleValidation)([auth_schema_1.RoleName.ADMIN])];
// ============================================
// REPORT EXPORT ROUTES
// ============================================
// POST /api/report/export/pdf - Export any report payload as PDF
router.post(`/${pathGroup}/pdf`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(report_export_schema_1.exportReportPdfSchema), report_export_controller_1.default.exportPdf);
// POST /api/report/export/excel - Export any report payload as Excel-compatible XLS
router.post(`/${pathGroup}/excel`, ...adminMiddleware, (0, zod_validation_middleware_1.zodValidation)(report_export_schema_1.exportReportExcelSchema), report_export_controller_1.default.exportExcel);
exports.default = router;
//# sourceMappingURL=report-export.route.js.map