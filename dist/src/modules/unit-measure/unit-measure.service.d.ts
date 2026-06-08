import { AuthenticatedRequest } from '../../../types';
import { DeleteUnitMeasureResponse, UnitMeasureData, UnitMeasureListResponse, UnitMeasureReference } from './unit-measure.types';
/**
 * Get all unit measures (for dropdown/selection)
 */
export declare const getAllReferences: () => Promise<UnitMeasureReference[]>;
/**
 * Get all unit measures with pagination and filters
 */
export declare const getAll: (req: AuthenticatedRequest) => Promise<UnitMeasureListResponse>;
/**
 * Get unit measure detail by ID
 */
export declare const getDetail: (req: AuthenticatedRequest) => Promise<UnitMeasureData>;
/**
 * Find unit measure by ID (for validation)
 */
export declare const findById: (unitMeasureId: string) => Promise<UnitMeasureReference | null>;
/**
 * Create new unit measure
 */
export declare const create: (req: AuthenticatedRequest) => Promise<UnitMeasureData>;
/**
 * Update unit measure by ID
 */
export declare const update: (req: AuthenticatedRequest) => Promise<UnitMeasureData>;
/**
 * Soft delete unit measure by ID
 */
export declare const softDelete: (req: AuthenticatedRequest) => Promise<DeleteUnitMeasureResponse>;
export declare const unitMeasureService: {
    getAllReferences: () => Promise<UnitMeasureReference[]>;
    getAll: (req: AuthenticatedRequest) => Promise<UnitMeasureListResponse>;
    getDetail: (req: AuthenticatedRequest) => Promise<UnitMeasureData>;
    findById: (unitMeasureId: string) => Promise<UnitMeasureReference | null>;
    create: (req: AuthenticatedRequest) => Promise<UnitMeasureData>;
    update: (req: AuthenticatedRequest) => Promise<UnitMeasureData>;
    softDelete: (req: AuthenticatedRequest) => Promise<DeleteUnitMeasureResponse>;
};
export default unitMeasureService;
//# sourceMappingURL=unit-measure.service.d.ts.map