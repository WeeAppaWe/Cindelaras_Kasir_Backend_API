import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../../types';
/**
 * Export report as PDF
 * POST /api/report/export/pdf
 */
export declare const exportPdf: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Export report as Excel-compatible XLS
 * POST /api/report/export/excel
 */
export declare const exportExcel: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const reportExportController: {
    exportPdf: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    exportExcel: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default reportExportController;
//# sourceMappingURL=report-export.controller.d.ts.map