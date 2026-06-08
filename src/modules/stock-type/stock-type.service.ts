import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import { AuthenticatedRequest } from '../../../types';
import stockTypeRepository from './stock-type.repository';
import { StockTypeListResponse, StockTypeData } from './stock-type.types';

/**
 * Get all stock types
 */
export const getAll = async (): Promise<StockTypeListResponse> => {
    try {
        const stockTypes = await stockTypeRepository.findAll();
        return stockTypes;
    } catch (error) {
        console.error(`--- StockType Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get stock type detail by ID
 */
export const getDetail = async (req: AuthenticatedRequest): Promise<StockTypeData> => {
    try {
        const stockTypeId = req.params.stock_type_id;

        const stockType = await stockTypeRepository.findById(stockTypeId);

        if (!stockType) {
            throw new ErrorNotFoundException('Stock type tidak ditemukan');
        }

        return stockType;
    } catch (error) {
        console.error(`--- StockType Service Error: ${(error as Error).message}`);
        throw error;
    }
};

export const stockTypeService = {
    getAll,
    getDetail,
};

export default stockTypeService;
