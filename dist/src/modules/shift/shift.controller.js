"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shiftController = exports.getMyShifts = exports.getShiftSummary = exports.endShift = exports.startShift = exports.getActiveShift = exports.detail = exports.showAll = void 0;
const response_api_1 = __importDefault(require("../../../utility/response-api"));
const shift_service_1 = __importDefault(require("./shift.service"));
// ============================================
// GET ALL SHIFTS (History)
// ============================================
const showAll = async (req, res, next) => {
    try {
        const result = await shift_service_1.default.getAll(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Data shift berhasil diambil' }, result));
    }
    catch (error) {
        next(error);
    }
};
exports.showAll = showAll;
// ============================================
// GET SHIFT DETAIL
// ============================================
const detail = async (req, res, next) => {
    try {
        const result = await shift_service_1.default.getDetail(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Detail shift berhasil diambil' }, result));
    }
    catch (error) {
        next(error);
    }
};
exports.detail = detail;
// ============================================
// GET ACTIVE SHIFT
// ============================================
const getActiveShift = async (req, res, next) => {
    try {
        const result = await shift_service_1.default.getActiveShift(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Status shift aktif berhasil diambil' }, result));
    }
    catch (error) {
        next(error);
    }
};
exports.getActiveShift = getActiveShift;
// ============================================
// START SHIFT (Buka Kas)
// ============================================
const startShift = async (req, res, next) => {
    try {
        const result = await shift_service_1.default.startShift(req);
        res.status(201).json((0, response_api_1.default)({ code: 201, message: result.message }, result));
    }
    catch (error) {
        next(error);
    }
};
exports.startShift = startShift;
// ============================================
// END SHIFT (Tutup Kas)
// ============================================
const endShift = async (req, res, next) => {
    try {
        const result = await shift_service_1.default.endShift(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: result.message }, result));
    }
    catch (error) {
        next(error);
    }
};
exports.endShift = endShift;
// ============================================
// GET SHIFT SUMMARY
// ============================================
const getShiftSummary = async (req, res, next) => {
    try {
        const result = await shift_service_1.default.getShiftSummary(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Ringkasan shift berhasil diambil' }, result));
    }
    catch (error) {
        next(error);
    }
};
exports.getShiftSummary = getShiftSummary;
// ============================================
// GET MY SHIFTS
// ============================================
const getMyShifts = async (req, res, next) => {
    try {
        const result = await shift_service_1.default.getMyShifts(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Data shift saya berhasil diambil' }, result));
    }
    catch (error) {
        next(error);
    }
};
exports.getMyShifts = getMyShifts;
exports.shiftController = {
    showAll: exports.showAll,
    detail: exports.detail,
    getActiveShift: exports.getActiveShift,
    startShift: exports.startShift,
    endShift: exports.endShift,
    getShiftSummary: exports.getShiftSummary,
    getMyShifts: exports.getMyShifts,
};
exports.default = exports.shiftController;
//# sourceMappingURL=shift.controller.js.map