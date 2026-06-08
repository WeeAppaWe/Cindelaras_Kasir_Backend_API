import { Response, NextFunction } from 'express';
import responseApi from '../../../utility/response-api';
import orderService from './order.service';
import { AuthenticatedRequest } from '../../../types';

// ============================================
// GET ALL ORDERS (History)
// ============================================

export const showAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await orderService.getAll(req);
        res.status(200).json(responseApi({ code: 200, message: 'Data pesanan berhasil diambil' }, result));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET ORDER DETAIL
// ============================================

export const detail = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await orderService.getDetail(req);
        res.status(200).json(responseApi({ code: 200, message: 'Detail pesanan berhasil diambil' }, result));
    } catch (error) {
        next(error);
    }
};

// ============================================
// CREATE ORDER (Checkout)
// ============================================

export const create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await orderService.create(req);
        res.status(201).json(responseApi({ code: 201, message: result.message }, result));
    } catch (error) {
        next(error);
    }
};

// ============================================
// CONFIRM PAYMENT (for QRIS)
// ============================================

export const confirmPayment = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await orderService.confirmPayment(req);
        res.status(200).json(responseApi({ code: 200, message: result.message }, result));
    } catch (error) {
        next(error);
    }
};

// ============================================
// CANCEL ORDER
// ============================================

export const cancelOrder = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await orderService.cancelOrder(req);
        res.status(200).json(responseApi({ code: 200, message: result.message }, result));
    } catch (error) {
        next(error);
    }
};

// ============================================
// GET RECEIPT (for printing)
// ============================================

export const getReceipt = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await orderService.getReceipt(req);
        res.status(200).json(responseApi({ code: 200, message: 'Struk berhasil diambil' }, result));
    } catch (error) {
        next(error);
    }
};

export const orderController = {
    showAll,
    detail,
    create,
    confirmPayment,
    cancelOrder,
    getReceipt,
};

export default orderController;

