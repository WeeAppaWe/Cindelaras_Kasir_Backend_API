"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReportExcel = void 0;
const format_money_utility_1 = require("./format-money.utility");
const sanitizeFileName = (value) => {
    const cleaned = value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-_]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return cleaned || 'laporan';
};
const ensureExtension = (fileName, extension) => {
    return fileName.toLowerCase().endsWith(extension) ? fileName : `${fileName}${extension}`;
};
const sanitizeSheetName = (value) => {
    const cleaned = value
        .replace(/[\[\]:*?/\\]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 31);
    return cleaned || 'Laporan';
};
const escapeXml = (value) => {
    return String(value ?? '').replace(/[<>&"']/g, (char) => {
        const entities = {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '"': '&quot;',
            "'": '&apos;',
        };
        return entities[char];
    });
};
const formatDate = (value, withTime = false) => {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
        return String(value);
    }
    return withTime
        ? date.toLocaleString('id-ID')
        : date.toLocaleDateString('id-ID');
};
const formatValue = (value, format = 'text') => {
    if (value === null || value === undefined || value === '') {
        return '-';
    }
    if (format === 'currency') {
        return (0, format_money_utility_1.formatMoney)(Number(value));
    }
    if (format === 'number') {
        return (0, format_money_utility_1.formatNumber)(Number(value));
    }
    if (format === 'percent') {
        return `${(0, format_money_utility_1.formatNumber)(Number(value))}%`;
    }
    if (format === 'date') {
        return formatDate(value);
    }
    if (format === 'datetime') {
        return formatDate(value, true);
    }
    if (format === 'boolean') {
        return value ? 'Ya' : 'Tidak';
    }
    return String(value);
};
const getFileName = (data, options) => {
    const baseName = options?.file_name || sanitizeFileName(data.title);
    return ensureExtension(baseName, '.xls');
};
const getGeneratedAt = (data) => {
    return formatDate(data.generated_at || new Date(), true);
};
const row = (cells) => {
    return `<Row>${cells.join('')}</Row>`;
};
const cell = (value, styleId = 'Default') => {
    return `<Cell ss:StyleID="${styleId}"><Data ss:Type="String">${escapeXml(String(value ?? ''))}</Data></Cell>`;
};
const blankRow = () => '<Row/>';
const metricRows = (metrics = []) => {
    return metrics.map((metric) => row([
        cell(metric.label, 'Label'),
        cell(formatValue(metric.value, metric.format), 'Value'),
    ]));
};
const tableRows = (table) => {
    const rows = [];
    if (table.title) {
        rows.push(row([cell(table.title, 'Section')]));
    }
    rows.push(row(table.columns.map((column) => cell(column.header, 'TableHeader'))));
    if (table.rows.length === 0) {
        rows.push(row([cell(table.empty_message || 'Tidak ada data', 'Muted')]));
        return rows;
    }
    table.rows.forEach((item) => {
        rows.push(row(table.columns.map((column) => {
            return cell(formatValue(item[column.key], column.format), 'TableCell');
        })));
    });
    return rows;
};
const worksheetRows = (data, options) => {
    const rows = [
        row([cell(data.title, 'Title')]),
    ];
    if (data.subtitle) {
        rows.push(row([cell(data.subtitle, 'Subtitle')]));
    }
    if (options?.store_name) {
        rows.push(row([cell('Nama Toko', 'Label'), cell(options.store_name, 'Value')]));
    }
    rows.push(row([cell('Dibuat', 'Label'), cell(getGeneratedAt(data), 'Value')]));
    if (data.period) {
        rows.push(row([cell('Periode Mulai', 'Label'), cell(formatValue(data.period.start_date, 'date'), 'Value')]), row([cell('Periode Selesai', 'Label'), cell(formatValue(data.period.end_date, 'date'), 'Value')]));
    }
    if (data.metadata?.length) {
        rows.push(blankRow(), row([cell('Informasi Laporan', 'Section')]), ...metricRows(data.metadata));
    }
    if (data.summaries?.length) {
        rows.push(blankRow(), row([cell('Ringkasan', 'Section')]), ...metricRows(data.summaries));
    }
    data.tables?.forEach((table) => {
        rows.push(blankRow(), ...tableRows(table));
    });
    data.sections?.forEach((section) => {
        rows.push(blankRow(), row([cell(section.title, 'Section')]));
        if (section.summaries?.length) {
            rows.push(...metricRows(section.summaries));
        }
        section.notes?.forEach((note) => {
            rows.push(row([cell(note, 'Muted')]));
        });
        section.tables?.forEach((table) => {
            rows.push(blankRow(), ...tableRows(table));
        });
    });
    return rows;
};
const buildWorkbookXml = (data, options) => {
    const sheetName = sanitizeSheetName(options?.sheet_name || data.title);
    const rows = worksheetRows(data, options).join('');
    return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Center"/>
   <Font ss:FontName="Arial" ss:Size="10"/>
  </Style>
  <Style ss:ID="Title">
   <Font ss:FontName="Arial" ss:Size="16" ss:Bold="1" ss:Color="#0F766E"/>
  </Style>
  <Style ss:ID="Subtitle">
   <Font ss:FontName="Arial" ss:Size="10" ss:Color="#64748B"/>
  </Style>
  <Style ss:ID="Section">
   <Font ss:FontName="Arial" ss:Size="11" ss:Bold="1" ss:Color="#0F766E"/>
  </Style>
  <Style ss:ID="Label">
   <Font ss:FontName="Arial" ss:Size="10" ss:Color="#64748B"/>
  </Style>
  <Style ss:ID="Value">
   <Font ss:FontName="Arial" ss:Size="10" ss:Bold="1"/>
  </Style>
  <Style ss:ID="TableHeader">
   <Interior ss:Color="#ECFDF5" ss:Pattern="Solid"/>
   <Font ss:FontName="Arial" ss:Size="10" ss:Bold="1" ss:Color="#0F766E"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
   </Borders>
  </Style>
  <Style ss:ID="TableCell">
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
  </Style>
  <Style ss:ID="Muted">
   <Font ss:FontName="Arial" ss:Size="10" ss:Italic="1" ss:Color="#64748B"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="${escapeXml(sheetName)}">
  <Table ss:DefaultColumnWidth="120">${rows}</Table>
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <FreezePanes/>
   <FrozenNoSplit/>
   <SplitHorizontal>1</SplitHorizontal>
   <TopRowBottomPane>1</TopRowBottomPane>
   <ActivePane>2</ActivePane>
  </WorksheetOptions>
 </Worksheet>
</Workbook>`;
};
const generateReportExcel = (data, options) => {
    const workbookXml = buildWorkbookXml(data, options);
    return {
        file_name: getFileName(data, options),
        mime_type: 'application/vnd.ms-excel',
        encoding: 'base64',
        content: Buffer.from(workbookXml, 'utf8').toString('base64'),
    };
};
exports.generateReportExcel = generateReportExcel;
exports.default = {
    generateReportExcel: exports.generateReportExcel,
};
//# sourceMappingURL=report-excel.utility.js.map