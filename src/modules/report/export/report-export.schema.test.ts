import {
    exportReportExcelSchema,
    exportReportPdfSchema,
    reportExportDataSchema,
    reportExportTableSchema,
} from './report-export.schema';

describe('Report Export Schema', () => {
    const validReportData = {
        title: 'Laporan Finansial',
        subtitle: 'Ringkasan penjualan',
        generated_at: '2026-01-25T10:30:00.000Z',
        period: {
            start_date: '2026-01-01',
            end_date: '2026-01-31',
        },
        summaries: [
            { label: 'Total Penjualan', value: 1250000, format: 'currency' },
        ],
        tables: [
            {
                title: 'Metode Bayar',
                columns: [
                    { key: 'payment_type', header: 'Metode Bayar' },
                    { key: 'total_amount', header: 'Total', format: 'currency', align: 'right' },
                ],
                rows: [
                    { payment_type: 'CASH', total_amount: 750000 },
                    { payment_type: 'QRIS', total_amount: 500000 },
                ],
            },
        ],
    };

    describe('reportExportDataSchema', () => {
        it('should validate flexible report data', () => {
            const result = reportExportDataSchema.parse(validReportData);

            expect(result.title).toBe('Laporan Finansial');
            expect(result.tables?.[0].rows).toHaveLength(2);
        });

        it('should reject empty report title', () => {
            expect(() => reportExportDataSchema.parse({
                ...validReportData,
                title: '',
            })).toThrow();
        });

        it('should allow sections for nested report content', () => {
            const result = reportExportDataSchema.parse({
                title: 'Laporan Lengkap',
                sections: [
                    {
                        title: 'Operasional',
                        summaries: [
                            { label: 'Total Transaksi', value: 10, format: 'number' },
                        ],
                        tables: validReportData.tables,
                    },
                ],
            });

            expect(result.sections?.[0].title).toBe('Operasional');
        });
    });

    describe('reportExportTableSchema', () => {
        it('should reject table without columns', () => {
            expect(() => reportExportTableSchema.parse({
                title: 'Invalid Table',
                columns: [],
                rows: [],
            })).toThrow();
        });

        it('should reject unsupported column format', () => {
            expect(() => reportExportTableSchema.parse({
                title: 'Invalid Format',
                columns: [
                    { key: 'total', header: 'Total', format: 'money' },
                ],
                rows: [],
            })).toThrow();
        });
    });

    describe('export schemas', () => {
        it('should validate PDF export request', () => {
            const result = exportReportPdfSchema.parse({
                data: validReportData,
                options: {
                    file_name: 'laporan-finansial',
                    store_name: 'Toko Test',
                    page_size: 'A4',
                    orientation: 'landscape',
                },
            });

            expect(result.options?.orientation).toBe('landscape');
        });

        it('should validate Excel export request', () => {
            const result = exportReportExcelSchema.parse({
                data: validReportData,
                options: {
                    file_name: 'laporan-finansial',
                    sheet_name: 'Finansial',
                    store_name: 'Toko Test',
                },
            });

            expect(result.options?.sheet_name).toBe('Finansial');
        });
    });
});
