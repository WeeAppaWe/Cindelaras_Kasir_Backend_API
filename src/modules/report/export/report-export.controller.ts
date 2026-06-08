import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../../types';
import type { ReportExportFileResult } from '../../../../types';
import reportExportService from './report-export.service';

const sendExportFile = (res: Response, file: ReportExportFileResult): void => {
    const fileBuffer = Buffer.from(file.content, file.encoding);

    res.setHeader('Content-Type', file.mime_type);
    res.setHeader('Content-Disposition', `attachment; filename="${file.file_name}"`);
    res.setHeader('Content-Length', fileBuffer.length);
    res.send(fileBuffer);
};

/**
 * Export report as PDF
 * POST /api/report/export/pdf
 */
export const exportPdf = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const file = await reportExportService.exportPdf(req);
        sendExportFile(res, file);
    } catch (error) {
        next(error);
    }
};

/**
 * Export report as Excel-compatible XLS
 * POST /api/report/export/excel
 */
export const exportExcel = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const file = await reportExportService.exportExcel(req);
        sendExportFile(res, file);
    } catch (error) {
        next(error);
    }
};

export const reportExportController = {
    exportPdf,
    exportExcel,
};

export default reportExportController;
