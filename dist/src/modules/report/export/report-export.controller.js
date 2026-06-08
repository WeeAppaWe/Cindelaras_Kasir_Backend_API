"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportExportController = exports.exportExcel = exports.exportPdf = void 0;
const report_export_service_1 = __importDefault(require("./report-export.service"));
const sendExportFile = (res, file) => {
    const fileBuffer = Buffer.from(file.content, file.encoding);
    res.setHeader('Content-Type', file.mime_type);
    res.setHeader('Content-Disposition', `attachment; filename="${file.file_name}"`);
    res.setHeader('Content-Length', fileBuffer.length);
    res.send(fileBuffer);
};
/**
 * Export report as PDF
 * POST /api/report/export/pdf
 */
const exportPdf = async (req, res, next) => {
    try {
        const file = await report_export_service_1.default.exportPdf(req);
        sendExportFile(res, file);
    }
    catch (error) {
        next(error);
    }
};
exports.exportPdf = exportPdf;
/**
 * Export report as Excel-compatible XLS
 * POST /api/report/export/excel
 */
const exportExcel = async (req, res, next) => {
    try {
        const file = await report_export_service_1.default.exportExcel(req);
        sendExportFile(res, file);
    }
    catch (error) {
        next(error);
    }
};
exports.exportExcel = exportExcel;
exports.reportExportController = {
    exportPdf: exports.exportPdf,
    exportExcel: exports.exportExcel,
};
exports.default = exports.reportExportController;
//# sourceMappingURL=report-export.controller.js.map