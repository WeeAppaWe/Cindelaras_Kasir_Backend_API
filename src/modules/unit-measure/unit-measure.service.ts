import { ErrorDataAlreadyExistException } from '../../../exception/error-data-already-exist.exception';
import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import { ErrorValidationException } from '../../../exception/error-validation.exception';
import { AuthenticatedRequest } from '../../../types';
import { getPagination } from '../../../utility/pagination.utility';
import unitMeasureRepository from './unit-measure.repository';
import {
    CreateUnitMeasureRequest,
    DeleteUnitMeasureResponse,
    UnitMeasureData,
    UnitMeasureListResponse,
    UnitMeasureReference,
    UpdateUnitMeasureRequest,
} from './unit-measure.types';

/**
 * Get all unit measures (for dropdown/selection)
 */
export const getAllReferences = async (): Promise<UnitMeasureReference[]> => {
    try {
        return await unitMeasureRepository.findAllReferences();
    } catch (error) {
        console.error(`--- Unit Measure Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get all unit measures with pagination and filters
 */
export const getAll = async (req: AuthenticatedRequest): Promise<UnitMeasureListResponse> => {
    try {
        const pageNumber = parseInt(req.query.batch as string) || 1;
        const pageSize = parseInt(req.query.size as string) || 10;
        const pagination = getPagination(pageNumber, pageSize);

        const options = {
            pagination: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        };

        const filter = {
            search: (req.query.search as string) || null,
        };

        const [data, totalData] = await Promise.all([
            unitMeasureRepository.findAll(options, filter),
            unitMeasureRepository.count(filter),
        ]);

        return {
            page: {
                total_record_count: totalData,
                batch_number: pageNumber,
                batch_size: data.length,
                max_batch_size: pageSize,
            },
            records: data,
        };
    } catch (error) {
        console.error(`--- Unit Measure Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get unit measure detail by ID
 */
export const getDetail = async (req: AuthenticatedRequest): Promise<UnitMeasureData> => {
    try {
        const unitMeasureId = req.params.unit_measure_id;

        const unit = await unitMeasureRepository.findById(unitMeasureId);

        if (!unit) {
            throw new ErrorNotFoundException('Satuan tidak ditemukan');
        }

        return unit;
    } catch (error) {
        console.error(`--- Unit Measure Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Find unit measure by ID (for validation)
 */
export const findById = async (unitMeasureId: string): Promise<UnitMeasureReference | null> => {
    try {
        return await unitMeasureRepository.findById(unitMeasureId);
    } catch (error) {
        console.error(`--- Unit Measure Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Create new unit measure
 */
export const create = async (req: AuthenticatedRequest): Promise<UnitMeasureData> => {
    try {
        const body: CreateUnitMeasureRequest = req.body;

        const existingUnit = await unitMeasureRepository.findByName(body.name);
        if (existingUnit) {
            throw new ErrorDataAlreadyExistException('Nama satuan sudah digunakan');
        }

        return await unitMeasureRepository.create({
            name: body.name,
        });
    } catch (error) {
        console.error(`--- Unit Measure Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Update unit measure by ID
 */
export const update = async (req: AuthenticatedRequest): Promise<UnitMeasureData> => {
    try {
        const unitMeasureId = req.params.unit_measure_id;
        const body: UpdateUnitMeasureRequest = req.body;

        const existingUnit = await unitMeasureRepository.findById(unitMeasureId);
        if (!existingUnit) {
            throw new ErrorNotFoundException('Satuan tidak ditemukan');
        }

        if (body.name) {
            const duplicateUnit = await unitMeasureRepository.findByName(body.name, unitMeasureId);
            if (duplicateUnit) {
                throw new ErrorDataAlreadyExistException('Nama satuan sudah digunakan');
            }
        }

        const updateData: { name?: string } = {};

        if (body.name) updateData.name = body.name;

        return await unitMeasureRepository.update(unitMeasureId, updateData);
    } catch (error) {
        console.error(`--- Unit Measure Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Soft delete unit measure by ID
 */
export const softDelete = async (req: AuthenticatedRequest): Promise<DeleteUnitMeasureResponse> => {
    try {
        const unitMeasureId = req.params.unit_measure_id;

        const existingUnit = await unitMeasureRepository.findById(unitMeasureId);
        if (!existingUnit) {
            throw new ErrorNotFoundException('Satuan tidak ditemukan');
        }

        const hasIngredients = await unitMeasureRepository.hasIngredients(unitMeasureId);
        if (hasIngredients) {
            throw new ErrorValidationException('Satuan tidak dapat dihapus karena masih digunakan oleh bahan', [
                { location: 'params', field: 'unit_measure_id', message: 'Satuan masih memiliki bahan terkait' },
            ]);
        }

        await unitMeasureRepository.softDelete(unitMeasureId);

        return {
            success: true,
            message: 'Satuan berhasil dihapus',
        };
    } catch (error) {
        console.error(`--- Unit Measure Service Error: ${(error as Error).message}`);
        throw error;
    }
};

export const unitMeasureService = {
    getAllReferences,
    getAll,
    getDetail,
    findById,
    create,
    update,
    softDelete,
};

export default unitMeasureService;
