import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../types';
/**
 * Get Unit Measure References (for dropdown)
 * GET /api/unit-measure/options
 */
export declare const getReferences: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get All Unit Measures
 * GET /api/unit-measure
 */
export declare const showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Unit Measure Detail
 * GET /api/unit-measure/:unit_measure_id
 */
export declare const detail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Create New Unit Measure
 * POST /api/unit-measure
 */
export declare const create: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update Unit Measure
 * PATCH /api/unit-measure/:unit_measure_id
 */
export declare const update: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Delete Unit Measure (Soft Delete)
 * DELETE /api/unit-measure/:unit_measure_id
 */
export declare const softDelete: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const unitMeasureController: {
    getReferences: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    showAll: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    detail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    create: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    update: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    softDelete: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default unitMeasureController;
//# sourceMappingURL=unit-measure.controller.d.ts.map