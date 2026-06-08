"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const report_excel_utility_1 = require("../../../../utility/report-excel.utility");
const report_pdf_utility_1 = require("../../../../utility/report-pdf.utility");
const report_export_service_1 = require("./report-export.service");
jest.mock('../../../../utility/report-pdf.utility', () => ({
    generateReportPdf: jest.fn(),
}));
jest.mock('../../../../utility/report-excel.utility', () => ({
    generateReportExcel: jest.fn(),
}));
describe('Report Export Service', () => {
    const reportData = {
        title: 'Laporan Operasional',
        summaries: [
            { label: 'Total Transaksi', value: 12, format: 'number' },
        ],
        tables: [
            {
                title: 'Transaksi',
                columns: [
                    { key: 'date', header: 'Tanggal' },
                    { key: 'total', header: 'Total', format: 'currency' },
                ],
                rows: [
                    { date: '2026-01-01', total: 250000 },
                ],
            },
        ],
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should export report as PDF using report PDF utility', async () => {
        const mockResponse = {
            file_name: 'laporan-operasional.pdf',
            mime_type: 'application/pdf',
            encoding: 'base64',
            content: 'JVBERi0=',
        };
        report_pdf_utility_1.generateReportPdf.mockResolvedValue(mockResponse);
        const req = {
            body: {
                data: reportData,
                options: {
                    store_name: 'Toko Test',
                },
            },
        };
        const result = await (0, report_export_service_1.exportPdf)(req);
        expect(result).toEqual(mockResponse);
        expect(report_pdf_utility_1.generateReportPdf).toHaveBeenCalledWith(reportData, { store_name: 'Toko Test' });
    });
    it('should export report as Excel using report Excel utility', async () => {
        const mockResponse = {
            file_name: 'laporan-operasional.xls',
            mime_type: 'application/vnd.ms-excel',
            encoding: 'base64',
            content: 'PD94bWw=',
        };
        report_excel_utility_1.generateReportExcel.mockReturnValue(mockResponse);
        const req = {
            body: {
                data: reportData,
                options: {
                    sheet_name: 'Operasional',
                },
            },
        };
        const result = await (0, report_export_service_1.exportExcel)(req);
        expect(result).toEqual(mockResponse);
        expect(report_excel_utility_1.generateReportExcel).toHaveBeenCalledWith(reportData, { sheet_name: 'Operasional' });
    });
});
//# sourceMappingURL=report-export.service.test.js.map