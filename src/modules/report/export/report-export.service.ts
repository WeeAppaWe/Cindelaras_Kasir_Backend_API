import { AuthenticatedRequest } from '../../../../types';
import { generateReportExcel } from '../../../../utility/report-excel.utility';
import { generateReportPdf } from '../../../../utility/report-pdf.utility';
import {
    ExportReportExcelRequest,
    ExportReportFileResponse,
    ExportReportPdfRequest,
} from './report-export.types';

export const exportPdf = async (req: AuthenticatedRequest): Promise<ExportReportFileResponse> => {
    try {
        const body: ExportReportPdfRequest = req.body;

        return await generateReportPdf(body.data, body.options);
    } catch (error) {
        console.error(`--- Report Export Service Error: ${(error as Error).message}`);
        throw error;
    }
};

export const exportExcel = async (req: AuthenticatedRequest): Promise<ExportReportFileResponse> => {
    try {
        const body: ExportReportExcelRequest = req.body;

        return generateReportExcel(body.data, body.options);
    } catch (error) {
        console.error(`--- Report Export Service Error: ${(error as Error).message}`);
        throw error;
    }
};

export const reportExportService = {
    exportPdf,
    exportExcel,
};

export default reportExportService;
