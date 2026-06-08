import PDFDocument from 'pdfkit';
import type {
    ReportExportColumn,
    ReportExportData,
    ReportExportFileResult,
    ReportExportMetric,
    ReportExportPrimitive,
    ReportExportTable,
    ReportPdfOptions,
} from '../types';
import { formatMoney, formatNumber } from './format-money.utility';

const PAGE_MARGIN = 36;
const HEADER_HEIGHT = 74;
const FOOTER_HEIGHT = 24;
const DEFAULT_ACCENT = '#0F766E';

const sanitizeFileName = (value: string): string => {
    const cleaned = value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-_]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return cleaned || 'laporan';
};

const ensureExtension = (fileName: string, extension: string): string => {
    return fileName.toLowerCase().endsWith(extension) ? fileName : `${fileName}${extension}`;
};

const formatDate = (value: string | Date, withTime = false): string => {
    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) {
        return String(value);
    }

    return withTime
        ? date.toLocaleString('id-ID')
        : date.toLocaleDateString('id-ID');
};

const formatValue = (value: ReportExportPrimitive, format = 'text'): string => {
    if (value === null || value === undefined || value === '') {
        return '-';
    }

    if (format === 'currency') {
        return formatMoney(Number(value));
    }

    if (format === 'number') {
        return formatNumber(Number(value));
    }

    if (format === 'percent') {
        return `${formatNumber(Number(value))}%`;
    }

    if (format === 'date') {
        return formatDate(value as string | Date);
    }

    if (format === 'datetime') {
        return formatDate(value as string | Date, true);
    }

    if (format === 'boolean') {
        return value ? 'Ya' : 'Tidak';
    }

    return String(value);
};

const getFileName = (data: ReportExportData, options?: ReportPdfOptions): string => {
    const baseName = options?.file_name || sanitizeFileName(data.title);

    return ensureExtension(baseName, '.pdf');
};

const getGeneratedAt = (data: ReportExportData): string => {
    return formatDate(data.generated_at || new Date(), true);
};

const getTableColumnWidths = (
    columns: ReportExportColumn[],
    availableWidth: number
): number[] => {
    const configuredTotal = columns.reduce((sum, column) => sum + (column.width || 0), 0);

    if (configuredTotal > 0) {
        const remainingColumns = columns.filter((column) => !column.width).length;
        const configuredWidth = columns.reduce((sum, column) => sum + (column.width || 0), 0);
        const remainingWidth = Math.max(availableWidth - configuredWidth, 0);
        const fallbackWidth = remainingColumns > 0 ? remainingWidth / remainingColumns : 0;

        return columns.map((column) => column.width || fallbackWidth);
    }

    return columns.map(() => availableWidth / Math.max(columns.length, 1));
};

const createReportFileResult = (
    data: ReportExportData,
    options: ReportPdfOptions | undefined,
    buffer: Buffer
): ReportExportFileResult => {
    return {
        file_name: getFileName(data, options),
        mime_type: 'application/pdf',
        encoding: 'base64',
        content: buffer.toString('base64'),
    };
};

export const generateReportPdf = async (
    data: ReportExportData,
    options?: ReportPdfOptions
): Promise<ReportExportFileResult> => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({
                size: options?.page_size || 'A4',
                layout: options?.orientation || 'landscape',
                margin: PAGE_MARGIN,
                bufferPages: true,
            });
            const chunks: Buffer[] = [];
            const pageWidth = doc.page.width;
            const pageHeight = doc.page.height;
            const contentWidth = pageWidth - PAGE_MARGIN * 2;
            const pageBottom = pageHeight - PAGE_MARGIN - FOOTER_HEIGHT;

            doc.on('data', (chunk: Buffer) => chunks.push(chunk));
            doc.on('end', () => {
                resolve(createReportFileResult(data, options, Buffer.concat(chunks)));
            });
            doc.on('error', reject);

            const ensureSpace = (height: number): void => {
                if (doc.y + height <= pageBottom) {
                    return;
                }

                doc.addPage();
                doc.y = PAGE_MARGIN;
            };

            const drawHeader = (): void => {
                doc.rect(0, 0, pageWidth, HEADER_HEIGHT).fill(DEFAULT_ACCENT);
                doc
                    .font('Helvetica-Bold')
                    .fontSize(18)
                    .fillColor('#FFFFFF')
                    .text(data.title, PAGE_MARGIN, 18, {
                        width: contentWidth * 0.62,
                        lineGap: 1,
                    });

                if (data.subtitle) {
                    doc
                        .font('Helvetica')
                        .fontSize(9)
                        .fillColor('#D1FAE5')
                        .text(data.subtitle, PAGE_MARGIN, doc.y + 3, {
                            width: contentWidth * 0.62,
                        });
                }

                doc
                    .font('Helvetica')
                    .fontSize(8)
                    .fillColor('#D1FAE5')
                    .text(options?.store_name || '', PAGE_MARGIN + contentWidth * 0.62, 20, {
                        width: contentWidth * 0.38,
                        align: 'right',
                    })
                    .text(`Dibuat: ${getGeneratedAt(data)}`, PAGE_MARGIN + contentWidth * 0.62, 36, {
                        width: contentWidth * 0.38,
                        align: 'right',
                    });

                doc.y = HEADER_HEIGHT + 18;
            };

            const drawMetrics = (metrics: ReportExportMetric[] = []): void => {
                if (metrics.length === 0) {
                    return;
                }

                const gap = 10;
                const columns = 4;
                const cardWidth = (contentWidth - gap * (columns - 1)) / columns;
                let x = PAGE_MARGIN;

                ensureSpace(54);

                metrics.forEach((metric, index) => {
                    if (index > 0 && index % columns === 0) {
                        doc.y += 62;
                        x = PAGE_MARGIN;
                        ensureSpace(54);
                    }

                    const y = doc.y;
                    doc.roundedRect(x, y, cardWidth, 52, 6).fillAndStroke('#F8FAFC', '#E5E7EB');
                    doc
                        .font('Helvetica')
                        .fontSize(7)
                        .fillColor('#6B7280')
                        .text(metric.label, x + 10, y + 10, { width: cardWidth - 20 });
                    doc
                        .font('Helvetica-Bold')
                        .fontSize(12)
                        .fillColor('#111827')
                        .text(formatValue(metric.value, metric.format), x + 10, y + 26, {
                            width: cardWidth - 20,
                            ellipsis: true,
                        });

                    x += cardWidth + gap;
                });

                doc.y += 68;
            };

            const drawMetadata = (metrics: ReportExportMetric[] = []): void => {
                const metadata: ReportExportMetric[] = [];

                if (data.period) {
                    metadata.push(
                        { label: 'Periode Mulai', value: data.period.start_date, format: 'date' },
                        { label: 'Periode Selesai', value: data.period.end_date, format: 'date' }
                    );
                }

                metadata.push(...metrics);

                if (metadata.length === 0) {
                    return;
                }

                ensureSpace(metadata.length * 15 + 12);
                doc
                    .font('Helvetica-Bold')
                    .fontSize(9)
                    .fillColor('#111827')
                    .text('Informasi Laporan', PAGE_MARGIN, doc.y, { width: contentWidth });
                doc.y += 8;

                metadata.forEach((item) => {
                    const rowY = doc.y;
                    doc
                        .font('Helvetica')
                        .fontSize(8)
                        .fillColor('#6B7280')
                        .text(item.label, PAGE_MARGIN, rowY, { width: 130 });
                    doc
                        .font('Helvetica-Bold')
                        .fontSize(8)
                        .fillColor('#111827')
                        .text(formatValue(item.value, item.format), PAGE_MARGIN + 140, rowY, {
                            width: contentWidth - 140,
                        });
                    doc.y = rowY + 15;
                });

                doc.y += 8;
            };

            const drawTableHeader = (table: ReportExportTable, columnWidths: number[]): void => {
                const headerHeight = 22;
                let x = PAGE_MARGIN;
                const y = doc.y;

                doc.rect(PAGE_MARGIN, y, contentWidth, headerHeight).fill('#F1F5F9');
                table.columns.forEach((column, index) => {
                    doc
                        .font('Helvetica-Bold')
                        .fontSize(7)
                        .fillColor('#374151')
                        .text(column.header, x + 5, y + 7, {
                            width: columnWidths[index] - 10,
                            align: column.align || 'left',
                            ellipsis: true,
                        });
                    x += columnWidths[index];
                });
                doc.y = y + headerHeight;
            };

            const drawTable = (table: ReportExportTable): void => {
                if (table.columns.length === 0) {
                    return;
                }

                ensureSpace(54);

                if (table.title) {
                    doc
                        .font('Helvetica-Bold')
                        .fontSize(11)
                        .fillColor('#111827')
                        .text(table.title, PAGE_MARGIN, doc.y, { width: contentWidth });
                    doc.y += 10;
                }

                const columnWidths = getTableColumnWidths(table.columns, contentWidth);
                drawTableHeader(table, columnWidths);

                if (table.rows.length === 0) {
                    ensureSpace(26);
                    doc
                        .font('Helvetica-Oblique')
                        .fontSize(8)
                        .fillColor('#6B7280')
                        .text(table.empty_message || 'Tidak ada data', PAGE_MARGIN + 6, doc.y + 8, {
                            width: contentWidth - 12,
                        });
                    doc.y += 28;
                    return;
                }

                table.rows.forEach((row, rowIndex) => {
                    const cells = table.columns.map((column) => formatValue(row[column.key], column.format));
                    const rowHeight = Math.max(
                        24,
                        ...cells.map((cell, index) => {
                            return doc.heightOfString(cell, {
                                width: columnWidths[index] - 10,
                            }) + 12;
                        })
                    );

                    if (doc.y + rowHeight > pageBottom) {
                        doc.addPage();
                        doc.y = PAGE_MARGIN;
                        drawTableHeader(table, columnWidths);
                    }

                    let x = PAGE_MARGIN;
                    const y = doc.y;
                    doc
                        .rect(PAGE_MARGIN, y, contentWidth, rowHeight)
                        .fill(rowIndex % 2 === 0 ? '#FFFFFF' : '#FAFAFA');

                    cells.forEach((cell, index) => {
                        const column = table.columns[index];
                        doc
                            .font('Helvetica')
                            .fontSize(7)
                            .fillColor('#111827')
                            .text(cell, x + 5, y + 7, {
                                width: columnWidths[index] - 10,
                                align: column.align || 'left',
                            });
                        x += columnWidths[index];
                    });

                    doc
                        .moveTo(PAGE_MARGIN, y + rowHeight)
                        .lineTo(PAGE_MARGIN + contentWidth, y + rowHeight)
                        .strokeColor('#E5E7EB')
                        .lineWidth(0.5)
                        .stroke();
                    doc.y = y + rowHeight;
                });

                doc.y += 18;
            };

            const drawSection = (sectionTitle: string): void => {
                ensureSpace(34);
                doc
                    .font('Helvetica-Bold')
                    .fontSize(13)
                    .fillColor(DEFAULT_ACCENT)
                    .text(sectionTitle, PAGE_MARGIN, doc.y, { width: contentWidth });
                doc.y += 10;
            };

            drawHeader();
            drawMetadata(data.metadata);
            drawMetrics(data.summaries);

            data.tables?.forEach(drawTable);

            data.sections?.forEach((section) => {
                drawSection(section.title);
                drawMetrics(section.summaries);
                section.notes?.forEach((note) => {
                    ensureSpace(16);
                    doc
                        .font('Helvetica')
                        .fontSize(8)
                        .fillColor('#374151')
                        .text(note, PAGE_MARGIN, doc.y, { width: contentWidth });
                    doc.y += 8;
                });
                section.tables?.forEach(drawTable);
            });

            const totalPages = doc.bufferedPageRange().count;
            for (let index = 0; index < totalPages; index++) {
                doc.switchToPage(index);
                doc
                    .font('Helvetica')
                    .fontSize(8)
                    .fillColor('#6B7280')
                    .text(
                        `Halaman ${index + 1} dari ${totalPages}`,
                        PAGE_MARGIN,
                        pageHeight - PAGE_MARGIN + 8,
                        { width: contentWidth, align: 'right' }
                    );
            }

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
};

export default {
    generateReportPdf,
};
