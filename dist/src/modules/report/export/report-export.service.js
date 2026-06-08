"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportExportService = exports.exportExcel = exports.exportPdf = void 0;
const report_excel_utility_1 = require("../../../../utility/report-excel.utility");
const report_pdf_utility_1 = require("../../../../utility/report-pdf.utility");
const exportPdf = async (req) => {
    try {
        const body = req.body;
        return await (0, report_pdf_utility_1.generateReportPdf)(body.data, body.options);
    }
    catch (error) {
        console.error(`--- Report Export Service Error: ${error.message}`);
        throw error;
    }
};
exports.exportPdf = exportPdf;
const exportExcel = async (req) => {
    try {
        const body = req.body;
        return (0, report_excel_utility_1.generateReportExcel)(body.data, body.options);
    }
    catch (error) {
        console.error(`--- Report Export Service Error: ${error.message}`);
        throw error;
    }
};
exports.exportExcel = exportExcel;
exports.reportExportService = {
    exportPdf: exports.exportPdf,
    exportExcel: exports.exportExcel,
};
exports.default = exports.reportExportService;
//# sourceMappingURL=report-export.service.js.map