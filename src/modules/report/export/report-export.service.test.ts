import { AuthenticatedRequest } from '../../../../types';
import { generateReportExcel } from '../../../../utility/report-excel.utility';
import { generateReportPdf } from '../../../../utility/report-pdf.utility';
import { exportExcel, exportPdf } from './report-export.service';

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
            encoding: 'base64' as const,
            content: 'JVBERi0=',
        };
        (generateReportPdf as jest.Mock).mockResolvedValue(mockResponse);

        const req = {
            body: {
                data: reportData,
                options: {
                    store_name: 'Toko Test',
                },
            },
        } as unknown as AuthenticatedRequest;

        const result = await exportPdf(req);

        expect(result).toEqual(mockResponse);
        expect(generateReportPdf).toHaveBeenCalledWith(reportData, { store_name: 'Toko Test' });
    });

    it('should export report as Excel using report Excel utility', async () => {
        const mockResponse = {
            file_name: 'laporan-operasional.xls',
            mime_type: 'application/vnd.ms-excel',
            encoding: 'base64' as const,
            content: 'PD94bWw=',
        };
        (generateReportExcel as jest.Mock).mockReturnValue(mockResponse);

        const req = {
            body: {
                data: reportData,
                options: {
                    sheet_name: 'Operasional',
                },
            },
        } as unknown as AuthenticatedRequest;

        const result = await exportExcel(req);

        expect(result).toEqual(mockResponse);
        expect(generateReportExcel).toHaveBeenCalledWith(reportData, { sheet_name: 'Operasional' });
    });
});
