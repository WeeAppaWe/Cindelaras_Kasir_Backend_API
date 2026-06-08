import { Response, NextFunction } from 'express';
import responseApi from '../../../utility/response-api';
import shiftService from './shift.service';
import { AuthenticatedRequest } from '../../../types';

// ============================================
// GET ALL SHIFTS (History)
// ============================================

export const showAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await shiftService.getAll(req);
        res.status(200).json(responseApi({ code: 200, message: 'Data shift berhasil diambil' }, result));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET SHIFT DETAIL
// ============================================

export const detail = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await shiftService.getDetail(req);
        res.status(200).json(responseApi({ code: 200, message: 'Detail shift berhasil diambil' }, result));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET ACTIVE SHIFT
// ============================================

export const getActiveShift = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await shiftService.getActiveShift(req);
        res.status(200).json(responseApi({ code: 200, message: 'Status shift aktif berhasil diambil' }, result));
    } catch (error) {
        next(error);
    }
};

// ============================================
// START SHIFT (Buka Kas)
// ============================================

export const startShift = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await shiftService.startShift(req);
        res.status(201).json(responseApi({ code: 201, message: result.message }, result));
    } catch (error) {
        next(error);
    }
};

// ============================================
// END SHIFT (Tutup Kas)
// ============================================

export const endShift = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await shiftService.endShift(req);
        res.status(200).json(responseApi({ code: 200, message: result.message }, result));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET SHIFT SUMMARY
// ============================================

export const getShiftSummary = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await shiftService.getShiftSummary(req);
        res.status(200).json(responseApi({ code: 200, message: 'Ringkasan shift berhasil diambil' }, result));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET MY SHIFTS
// ============================================

export const getMyShifts = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await shiftService.getMyShifts(req);
        res.status(200).json(responseApi({ code: 200, message: 'Data shift saya berhasil diambil' }, result));
    } catch (error) {
        next(error);
    }
};

export const shiftController = {
    showAll,
    detail,
    getActiveShift,
    startShift,
    endShift,
    getShiftSummary,
    getMyShifts,
};

export default shiftController;
