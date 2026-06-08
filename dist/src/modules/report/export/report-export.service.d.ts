import { AuthenticatedRequest } from '../../../../types';
import { ExportReportFileResponse } from './report-export.types';
export declare const exportPdf: (req: AuthenticatedRequest) => Promise<ExportReportFileResponse>;
export declare const exportExcel: (req: AuthenticatedRequest) => Promise<ExportReportFileResponse>;
export declare const reportExportService: {
    exportPdf: (req: AuthenticatedRequest) => Promise<ExportReportFileResponse>;
    exportExcel: (req: AuthenticatedRequest) => Promise<ExportReportFileResponse>;
};
export default reportExportService;
//# sourceMappingURL=report-export.service.d.ts.map