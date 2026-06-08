export type ReportExportPrimitive = string | number | boolean | Date | null | undefined;

export type ReportExportValueFormat =
    | 'text'
    | 'number'
    | 'currency'
    | 'date'
    | 'datetime'
    | 'percent'
    | 'boolean';

export type ReportExportColumnAlign = 'left' | 'center' | 'right';

export interface ReportExportPeriod {
    start_date: string;
    end_date: string;
}

export interface ReportExportMetric {
    label: string;
    value: ReportExportPrimitive;
    format?: ReportExportValueFormat;
}

export interface ReportExportColumn {
    key: string;
    header: string;
    width?: number;
    align?: ReportExportColumnAlign;
    format?: ReportExportValueFormat;
}

export interface ReportExportRow {
    [key: string]: ReportExportPrimitive;
}

export interface ReportExportTable {
    title?: string;
    columns: ReportExportColumn[];
    rows: ReportExportRow[];
    empty_message?: string;
}

export interface ReportExportSection {
    title: string;
    summaries?: ReportExportMetric[];
    tables?: ReportExportTable[];
    notes?: string[];
}

export interface ReportExportData {
    title: string;
    subtitle?: string;
    generated_at?: string | Date;
    period?: ReportExportPeriod;
    metadata?: ReportExportMetric[];
    summaries?: ReportExportMetric[];
    sections?: ReportExportSection[];
    tables?: ReportExportTable[];
}

export interface ReportExportFileResult {
    file_name: string;
    mime_type: string;
    encoding: 'base64';
    content: string;
}

export interface ReportPdfOptions {
    file_name?: string;
    store_name?: string;
    page_size?: 'A4' | 'LETTER';
    orientation?: 'portrait' | 'landscape';
}

export interface ReportExcelOptions {
    file_name?: string;
    sheet_name?: string;
    store_name?: string;
}
