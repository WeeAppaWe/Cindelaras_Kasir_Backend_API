import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../types';
export declare const showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const detail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getActiveShift: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const startShift: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const endShift: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getShiftSummary: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getMyShifts: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const shiftController: {
    showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    detail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getActiveShift: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    startShift: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    endShift: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getShiftSummary: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getMyShifts: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default shiftController;
//# sourceMappingURL=shift.controller.d.ts.map