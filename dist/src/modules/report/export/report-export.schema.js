"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportExportSchemas = exports.exportReportExcelSchema = exports.exportReportPdfSchema = exports.reportExcelOptionsSchema = exports.reportPdfOptionsSchema = exports.reportExportDataSchema = exports.reportExportSectionSchema = exports.reportExportTableSchema = exports.reportExportRowSchema = exports.reportExportColumnSchema = exports.reportExportMetricSchema = exports.reportExportPeriodSchema = exports.reportExportColumnAlignSchema = exports.reportExportValueFormatSchema = void 0;
const zod_1 = require("zod");
exports.reportExportValueFormatSchema = zod_1.z.enum([
    'text',
    'number',
    'currency',
    'date',
    'datetime',
    'percent',
    'boolean',
]);
exports.reportExportColumnAlignSchema = zod_1.z.enum(['left', 'center', 'right']);
const reportExportPrimitiveSchema = zod_1.z.union([
    zod_1.z.string(),
    zod_1.z.number(),
    zod_1.z.boolean(),
    zod_1.z.null(),
]);
exports.reportExportPeriodSchema = zod_1.z.object({
    start_date: zod_1.z.string().min(1, 'Tanggal mulai wajib diisi'),
    end_date: zod_1.z.string().min(1, 'Tanggal selesai wajib diisi'),
});
exports.reportExportMetricSchema = zod_1.z.object({
    label: zod_1.z.string().min(1, 'Label ringkasan wajib diisi').max(100, 'Label maksimal 100 karakter'),
    value: reportExportPrimitiveSchema.optional(),
    format: exports.reportExportValueFormatSchema.optional(),
});
exports.reportExportColumnSchema = zod_1.z.object({
    key: zod_1.z.string().min(1, 'Key kolom wajib diisi').max(80, 'Key kolom maksimal 80 karakter'),
    header: zod_1.z.string().min(1, 'Header kolom wajib diisi').max(120, 'Header kolom maksimal 120 karakter'),
    width: zod_1.z.number().positive('Lebar kolom harus lebih dari 0').max(500, 'Lebar kolom maksimal 500').optional(),
    align: exports.reportExportColumnAlignSchema.optional(),
    format: exports.reportExportValueFormatSchema.optional(),
});
exports.reportExportRowSchema = zod_1.z.record(zod_1.z.string(), reportExportPrimitiveSchema.optional());
exports.reportExportTableSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(150).optional(),
    columns: zod_1.z
        .array(exports.reportExportColumnSchema)
        .min(1, 'Minimal 1 kolom wajib diisi')
        .max(50, 'Maksimal 50 kolom'),
    rows: zod_1.z
        .array(exports.reportExportRowSchema)
        .max(5000, 'Maksimal 5000 baris per tabel'),
    empty_message: zod_1.z.string().max(150, 'Pesan kosong maksimal 150 karakter').optional(),
});
exports.reportExportSectionSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Judul section wajib diisi').max(150, 'Judul section maksimal 150 karakter'),
    summaries: zod_1.z.array(exports.reportExportMetricSchema).max(50, 'Maksimal 50 ringkasan per section').optional(),
    tables: zod_1.z.array(exports.reportExportTableSchema).max(20, 'Maksimal 20 tabel per section').optional(),
    notes: zod_1.z.array(zod_1.z.string().max(300, 'Catatan maksimal 300 karakter')).max(20, 'Maksimal 20 catatan').optional(),
});
exports.reportExportDataSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Judul laporan wajib diisi').max(150, 'Judul laporan maksimal 150 karakter'),
    subtitle: zod_1.z.string().max(200, 'Subtitle maksimal 200 karakter').optional(),
    generated_at: zod_1.z.union([zod_1.z.string(), zod_1.z.date()]).optional(),
    period: exports.reportExportPeriodSchema.optional(),
    metadata: zod_1.z.array(exports.reportExportMetricSchema).max(50, 'Maksimal 50 metadata').optional(),
    summaries: zod_1.z.array(exports.reportExportMetricSchema).max(50, 'Maksimal 50 ringkasan').optional(),
    sections: zod_1.z.array(exports.reportExportSectionSchema).max(20, 'Maksimal 20 section').optional(),
    tables: zod_1.z.array(exports.reportExportTableSchema).max(20, 'Maksimal 20 tabel').optional(),
});
exports.reportPdfOptionsSchema = zod_1.z.object({
    file_name: zod_1.z.string().min(1).max(120).optional(),
    store_name: zod_1.z.string().max(150).optional(),
    page_size: zod_1.z.enum(['A4', 'LETTER']).optional(),
    orientation: zod_1.z.enum(['portrait', 'landscape']).optional(),
});
exports.reportExcelOptionsSchema = zod_1.z.object({
    file_name: zod_1.z.string().min(1).max(120).optional(),
    sheet_name: zod_1.z.string().min(1).max(31).optional(),
    store_name: zod_1.z.string().max(150).optional(),
});
exports.exportReportPdfSchema = zod_1.z.object({
    data: exports.reportExportDataSchema,
    options: exports.reportPdfOptionsSchema.optional(),
});
exports.exportReportExcelSchema = zod_1.z.object({
    data: exports.reportExportDataSchema,
    options: exports.reportExcelOptionsSchema.optional(),
});
exports.reportExportSchemas = {
    valueFormat: exports.reportExportValueFormatSchema,
    columnAlign: exports.reportExportColumnAlignSchema,
    period: exports.reportExportPeriodSchema,
    metric: exports.reportExportMetricSchema,
    column: exports.reportExportColumnSchema,
    row: exports.reportExportRowSchema,
    table: exports.reportExportTableSchema,
    section: exports.reportExportSectionSchema,
    data: exports.reportExportDataSchema,
    pdfOptions: exports.reportPdfOptionsSchema,
    excelOptions: exports.reportExcelOptionsSchema,
    exportPdf: exports.exportReportPdfSchema,
    exportExcel: exports.exportReportExcelSchema,
};
exports.default = exports.reportExportSchemas;
//# sourceMappingURL=report-export.schema.js.map