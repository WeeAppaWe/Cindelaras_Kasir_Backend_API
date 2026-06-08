import { UnitMeasureData, UnitMeasureFilter, UnitMeasurePaginationOptions, UnitMeasureReference } from './unit-measure.types';
import { Prisma } from '../../generated/prisma/client';
/**
 * Find all unit measures (for dropdown/selection)
 */
export declare const findAllReferences: () => Promise<UnitMeasureReference[]>;
/**
 * Find all unit measures with pagination and filters
 */
export declare const findAll: (options: UnitMeasurePaginationOptions, filter: UnitMeasureFilter) => Promise<UnitMeasureData[]>;
/**
 * Count unit measures with filters
 */
export declare const count: (filter: UnitMeasureFilter) => Promise<number>;
/**
 * Find unit measure by ID
 */
export declare const findById: (unitMeasureId: string) => Promise<UnitMeasureData | null>;
/**
 * Find unit measure by name (for validation - check duplicate)
 */
export declare const findByName: (name: string, excludeUnitMeasureId?: string) => Promise<UnitMeasureData | null>;
/**
 * Create new unit measure
 */
export declare const create: (data: Prisma.UnitMeasureCreateInput, transaction?: Prisma.TransactionClient) => Promise<UnitMeasureData>;
/**
 * Update unit measure by ID
 */
export declare const update: (unitMeasureId: string, data: Prisma.UnitMeasureUpdateInput, transaction?: Prisma.TransactionClient) => Promise<UnitMeasureData>;
/**
 * Soft delete unit measure (set deleted_at)
 */
export declare const softDelete: (unitMeasureId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
/**
 * Check if unit measure has active ingredients
 */
export declare const hasIngredients: (unitMeasureId: string) => Promise<boolean>;
export declare const unitMeasureRepository: {
    findAllReferences: () => Promise<UnitMeasureReference[]>;
    findAll: (options: UnitMeasurePaginationOptions, filter: UnitMeasureFilter) => Promise<UnitMeasureData[]>;
    count: (filter: UnitMeasureFilter) => Promise<number>;
    findById: (unitMeasureId: string) => Promise<UnitMeasureData | null>;
    findByName: (name: string, excludeUnitMeasureId?: string) => Promise<UnitMeasureData | null>;
    create: (data: Prisma.UnitMeasureCreateInput, transaction?: Prisma.TransactionClient) => Promise<UnitMeasureData>;
    update: (unitMeasureId: string, data: Prisma.UnitMeasureUpdateInput, transaction?: Prisma.TransactionClient) => Promise<UnitMeasureData>;
    softDelete: (unitMeasureId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
    hasIngredients: (unitMeasureId: string) => Promise<boolean>;
};
export default unitMeasureRepository;
//# sourceMappingURL=unit-measure.repository.d.ts.map