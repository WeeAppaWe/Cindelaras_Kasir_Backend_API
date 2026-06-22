import { z } from 'zod';

export const reportExportValueFormatSchema = z.enum([
    'text',
    'number',
    'currency',
    'date',
    'datetime',
    'percent',
    'boolean',
]);

export const reportExportColumnAlignSchema = z.enum(['left', 'center', 'right']);

const reportExportPrimitiveSchema = z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
]);

export const reportExportPeriodSchema = z.object({
    start_date: z.string().min(1, 'Tanggal mulai wajib diisi'),
    end_date: z.string().min(1, 'Tanggal selesai wajib diisi'),
});

export const reportExportMetricSchema = z.object({
    label: z.string().min(1, 'Label ringkasan wajib diisi').max(100, 'Label maksimal 100 karakter'),
    value: reportExportPrimitiveSchema.optional(),
    format: reportExportValueFormatSchema.optional(),
});

export const reportExportColumnSchema = z.object({
    key: z.string().min(1, 'Key kolom wajib diisi').max(80, 'Key kolom maksimal 80 karakter'),
    header: z.string().min(1, 'Header kolom wajib diisi').max(120, 'Header kolom maksimal 120 karakter'),
    width: z.number().positive('Lebar kolom harus lebih dari 0').max(500, 'Lebar kolom maksimal 500').optional(),
    align: reportExportColumnAlignSchema.optional(),
    format: reportExportValueFormatSchema.optional(),
});

export const reportExportRowSchema = z.record(z.string(), reportExportPrimitiveSchema.optional());

export const reportExportTableSchema = z.object({
    title: z.string().min(1).max(150).optional(),
    columns: z
        .array(reportExportColumnSchema)
        .min(1, 'Minimal 1 kolom wajib diisi')
        .max(50, 'Maksimal 50 kolom'),
    rows: z
        .array(reportExportRowSchema)
        .max(5000, 'Maksimal 5000 baris per tabel'),
    empty_message: z.string().max(150, 'Pesan kosong maksimal 150 karakter').optional(),
});

export const reportExportSectionSchema = z.object({
    title: z.string().min(1, 'Judul section wajib diisi').max(150, 'Judul section maksimal 150 karakter'),
    summaries: z.array(reportExportMetricSchema).max(50, 'Maksimal 50 ringkasan per section').optional(),
    tables: z.array(reportExportTableSchema).max(20, 'Maksimal 20 tabel per section').optional(),
    notes: z.array(z.string().max(300, 'Catatan maksimal 300 karakter')).max(20, 'Maksimal 20 catatan').optional(),
});

export const reportExportDataSchema = z.object({
    title: z.string().min(1, 'Judul laporan wajib diisi').max(150, 'Judul laporan maksimal 150 karakter'),
    subtitle: z.string().max(200, 'Subtitle maksimal 200 karakter').optional(),
    generated_at: z.union([z.string(), z.date()]).optional(),
    period: reportExportPeriodSchema.optional(),
    metadata: z.array(reportExportMetricSchema).max(50, 'Maksimal 50 metadata').optional(),
    summaries: z.array(reportExportMetricSchema).max(50, 'Maksimal 50 ringkasan').optional(),
    sections: z.array(reportExportSectionSchema).max(20, 'Maksimal 20 section').optional(),
    tables: z.array(reportExportTableSchema).max(20, 'Maksimal 20 tabel').optional(),
});

export const reportPdfOptionsSchema = z.object({
    file_name: z.string().min(1).max(120).optional(),
    store_name: z.string().max(150).optional(),
    page_size: z.enum(['A4', 'LETTER']).optional(),
    orientation: z.enum(['portrait', 'landscape']).optional(),
    timezone: z.string().optional(),
});

export const reportExcelOptionsSchema = z.object({
    file_name: z.string().min(1).max(120).optional(),
    sheet_name: z.string().min(1).max(31).optional(),
    store_name: z.string().max(150).optional(),
    timezone: z.string().optional(),
});

export const exportReportPdfSchema = z.object({
    data: reportExportDataSchema,
    options: reportPdfOptionsSchema.optional(),
});

export const exportReportExcelSchema = z.object({
    data: reportExportDataSchema,
    options: reportExcelOptionsSchema.optional(),
});

export type ExportReportPdfInput = z.infer<typeof exportReportPdfSchema>;
export type ExportReportExcelInput = z.infer<typeof exportReportExcelSchema>;

export const reportExportSchemas = {
    valueFormat: reportExportValueFormatSchema,
    columnAlign: reportExportColumnAlignSchema,
    period: reportExportPeriodSchema,
    metric: reportExportMetricSchema,
    column: reportExportColumnSchema,
    row: reportExportRowSchema,
    table: reportExportTableSchema,
    section: reportExportSectionSchema,
    data: reportExportDataSchema,
    pdfOptions: reportPdfOptionsSchema,
    excelOptions: reportExcelOptionsSchema,
    exportPdf: exportReportPdfSchema,
    exportExcel: exportReportExcelSchema,
};

export default reportExportSchemas;
