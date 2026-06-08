import { AuthenticatedRequest } from '../../../types';
import { StockTypeListResponse, StockTypeData } from './stock-type.types';
/**
 * Get all stock types
 */
export declare const getAll: () => Promise<StockTypeListResponse>;
/**
 * Get stock type detail by ID
 */
export declare const getDetail: (req: AuthenticatedRequest) => Promise<StockTypeData>;
export declare const stockTypeService: {
    getAll: () => Promise<StockTypeListResponse>;
    getDetail: (req: AuthenticatedRequest) => Promise<StockTypeData>;
};
export default stockTypeService;
//# sourceMappingURL=stock-type.service.d.ts.map