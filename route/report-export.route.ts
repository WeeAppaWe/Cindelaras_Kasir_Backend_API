import express, { Router } from 'express';
import { tokenValidation } from '../middleware/token-validation.middleware';
import { roleValidation } from '../middleware/role-validation.middleware';
import { zodValidation } from '../middleware/zod-validation.middleware';
import { RoleName } from '../src/modules/auth/auth.schema';
import {
    exportReportExcelSchema,
    exportReportPdfSchema,
} from '../src/modules/report/export/report-export.schema';
import reportExportController from '../src/modules/report/export/report-export.controller';

const router: Router = express.Router();

const pathGroup = 'report/export';

// All routes require authentication and ADMIN role
const adminMiddleware = [tokenValidation, roleValidation([RoleName.ADMIN])];

// ============================================
// REPORT EXPORT ROUTES
// ============================================

// POST /api/report/export/pdf - Export any report payload as PDF
router.post(
    `/${pathGroup}/pdf`,
    ...adminMiddleware,
    zodValidation(exportReportPdfSchema),
    reportExportController.exportPdf
);

// POST /api/report/export/excel - Export any report payload as Excel-compatible XLS
router.post(
    `/${pathGroup}/excel`,
    ...adminMiddleware,
    zodValidation(exportReportExcelSchema),
    reportExportController.exportExcel
);

export default router;
