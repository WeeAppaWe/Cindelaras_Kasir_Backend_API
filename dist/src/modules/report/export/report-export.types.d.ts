import type { ReportExcelOptions, ReportExportData, ReportExportFileResult, ReportPdfOptions } from '../../../../types';
export interface ExportReportPdfRequest {
    data: ReportExportData;
    options?: ReportPdfOptions;
}
export interface ExportReportExcelRequest {
    data: ReportExportData;
    options?: ReportExcelOptions;
}
export type ExportReportFileResponse = ReportExportFileResult;
//# sourceMappingURL=report-export.types.d.ts.map