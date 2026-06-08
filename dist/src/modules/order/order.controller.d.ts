import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../types';
export declare const showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const detail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const create: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const confirmPayment: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const cancelOrder: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getReceipt: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const orderController: {
    showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    detail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    create: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    confirmPayment: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    cancelOrder: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getReceipt: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default orderController;
//# sourceMappingURL=order.controller.d.ts.map