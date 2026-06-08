import { StockTypeData } from './stock-type.types';
/**
 * Find all stock types
 */
export declare const findAll: () => Promise<StockTypeData[]>;
/**
 * Find stock type by ID
 */
export declare const findById: (stockTypeId: string) => Promise<StockTypeData | null>;
export declare const stockTypeRepository: {
    findAll: () => Promise<StockTypeData[]>;
    findById: (stockTypeId: string) => Promise<StockTypeData | null>;
};
export default stockTypeRepository;
//# sourceMappingURL=stock-type.repository.d.ts.map