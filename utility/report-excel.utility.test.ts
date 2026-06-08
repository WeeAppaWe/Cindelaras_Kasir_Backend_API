import { generateReportExcel } from './report-excel.utility';
import type { ReportExportData } from '../types';

describe('Report Excel Utility', () => {
    const sampleReport: ReportExportData = {
        title: 'Laporan Finansial',
        subtitle: 'Ringkasan penjualan harian',
        generated_at: new Date('2026-01-25T10:30:00.000Z'),
        period: {
            start_date: '2026-01-01',
            end_date: '2026-01-31',
        },
        metadata: [
            { label: 'Dibuat Oleh', value: 'Kasir & Admin' },
        ],
        summaries: [
            { label: 'Total Penjualan', value: 1250000, format: 'currency' },
            { label: 'Total Transaksi', value: 42, format: 'number' },
        ],
        tables: [
            {
                title: 'Penjualan per Metode Bayar',
                columns: [
                    { key: 'payment_type', header: 'Metode Bayar' },
                    { key: 'transaction_count', header: 'Transaksi', format: 'number' },
                    { key: 'total_amount', header: 'Total', format: 'currency' },
                ],
                rows: [
                    { payment_type: 'CASH', transaction_count: 25, total_amount: 750000 },
                    { payment_type: 'QRIS', transaction_count: 17, total_amount: 500000 },
                ],
            },
        ],
    };

    it('should generate Excel-compatible base64 file result', () => {
        const result = generateReportExcel(sampleReport);

        expect(result.file_name).toBe('laporan-finansial.xls');
        expect(result.mime_type).toBe('application/vnd.ms-excel');
        expect(result.encoding).toBe('base64');
        expect(result.content.length).toBeGreaterThan(0);
    });

    it('should include workbook template and report data', () => {
        const result = generateReportExcel(sampleReport, {
            sheet_name: 'Laporan Bulanan',
            store_name: 'Toko Test',
        });
        const xml = Buffer.from(result.content, 'base64').toString('utf8');

        expect(xml).toContain('<?mso-application progid="Excel.Sheet"?>');
        expect(xml).toContain('<Workbook');
        expect(xml).toContain('Worksheet ss:Name="Laporan Bulanan"');
        expect(xml).toContain('Laporan Finansial');
        expect(xml).toContain('Toko Test');
        expect(xml).toContain('Penjualan per Metode Bayar');
        expect(xml).toContain('CASH');
        expect(xml).toContain('QRIS');
        expect(xml).toContain('Rp');
    });

    it('should escape XML-sensitive characters', () => {
        const result = generateReportExcel(sampleReport);
        const xml = Buffer.from(result.content, 'base64').toString('utf8');

        expect(xml).toContain('Kasir &amp; Admin');
        expect(xml).not.toContain('Kasir & Admin');
    });

    it('should keep custom file extension when provided', () => {
        const result = generateReportExcel(sampleReport, {
            file_name: 'custom-report.xls',
        });

        expect(result.file_name).toBe('custom-report.xls');
    });
});
