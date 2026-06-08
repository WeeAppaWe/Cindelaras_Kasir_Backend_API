import { AuthenticatedRequest } from '../../../types';
import { StockMovementListResponse, StockMovementWithDetails, StockTypeData } from './inventory.types';
/**
 * Get all stock movements with pagination and filters (Riwayat Stok)
 */
export declare const getHistory: (req: AuthenticatedRequest) => Promise<StockMovementListResponse>;
/**
 * Get stock movement detail by ID
 */
export declare const getDetail: (req: AuthenticatedRequest) => Promise<StockMovementWithDetails>;
/**
 * Stock IN - Barang masuk dari supplier
 */
export declare const stockIn: (req: AuthenticatedRequest) => Promise<StockMovementWithDetails>;
/**
 * Stock OUT - Barang keluar (rusak/kedaluarsa)
 */
export declare const stockOut: (req: AuthenticatedRequest) => Promise<StockMovementWithDetails>;
/**
 * Get stock movement history by ingredient ID
 */
export declare const getHistoryByIngredient: (req: AuthenticatedRequest) => Promise<StockMovementListResponse>;
/**
 * Get available stock types
 */
export declare const getStockTypes: () => Promise<StockTypeData[]>;
export declare const inventoryService: {
    getHistory: (req: AuthenticatedRequest) => Promise<StockMovementListResponse>;
    getDetail: (req: AuthenticatedRequest) => Promise<StockMovementWithDetails>;
    stockIn: (req: AuthenticatedRequest) => Promise<StockMovementWithDetails>;
    stockOut: (req: AuthenticatedRequest) => Promise<StockMovementWithDetails>;
    getHistoryByIngredient: (req: AuthenticatedRequest) => Promise<StockMovementListResponse>;
    getStockTypes: () => Promise<StockTypeData[]>;
};
export default inventoryService;
//# sourceMappingURL=inventory.service.d.ts.map