import { generateReportPdf } from './report-pdf.utility';
import type { ReportExportData } from '../types';

describe('Report PDF Utility', () => {
    const sampleReport: ReportExportData = {
        title: 'Laporan Operasional',
        subtitle: 'Ringkasan transaksi kasir',
        generated_at: new Date('2026-01-25T10:30:00.000Z'),
        period: {
            start_date: '2026-01-01',
            end_date: '2026-01-31',
        },
        metadata: [
            { label: 'Outlet', value: 'Toko Test' },
        ],
        summaries: [
            { label: 'Total Transaksi', value: 42, format: 'number' },
            { label: 'Total Penjualan', value: 1250000, format: 'currency' },
        ],
        tables: [
            {
                title: 'Statistik Harian',
                columns: [
                    { key: 'date', header: 'Tanggal', format: 'date', width: 120 },
                    { key: 'transaction_count', header: 'Transaksi', format: 'number', align: 'right' },
                    { key: 'total_sales', header: 'Penjualan', format: 'currency', align: 'right' },
                ],
                rows: [
                    { date: '2026-01-01', transaction_count: 12, total_sales: 350000 },
                    { date: '2026-01-02', transaction_count: 30, total_sales: 900000 },
                ],
            },
        ],
    };

    it('should generate PDF base64 file result', async () => {
        const result = await generateReportPdf(sampleReport, {
            store_name: 'Toko Test',
        });
        const pdfBuffer = Buffer.from(result.content, 'base64');

        expect(result.file_name).toBe('laporan-operasional.pdf');
        expect(result.mime_type).toBe('application/pdf');
        expect(result.encoding).toBe('base64');
        expect(pdfBuffer.subarray(0, 4).toString()).toBe('%PDF');
        expect(pdfBuffer.length).toBeGreaterThan(1000);
    });

    it('should append pdf extension to custom file name', async () => {
        const result = await generateReportPdf(sampleReport, {
            file_name: 'custom-report',
        });

        expect(result.file_name).toBe('custom-report.pdf');
    });

    it('should handle empty report tables', async () => {
        const result = await generateReportPdf({
            ...sampleReport,
            tables: [
                {
                    title: 'Data Kosong',
                    columns: [
                        { key: 'name', header: 'Nama' },
                    ],
                    rows: [],
                },
            ],
        });

        expect(result.content.length).toBeGreaterThan(0);
    });
});
