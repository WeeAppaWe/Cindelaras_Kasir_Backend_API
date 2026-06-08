import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../types';
/**
 * Get Stock Movement History
 * GET /api/inventory
 */
export declare const getHistory: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Stock Movement Detail
 * GET /api/inventory/:stock_movement_id
 */
export declare const getDetail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Stock IN - Barang Masuk dari Supplier
 * POST /api/inventory/stock-in
 */
export declare const stockIn: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Stock OUT - Barang Keluar (Rusak/Kedaluarsa)
 * POST /api/inventory/stock-out
 */
export declare const stockOut: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Stock Movement History by Ingredient
 * GET /api/inventory/ingredient/:ingredient_id
 */
export declare const getHistoryByIngredient: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get Available Stock Types
 * GET /api/inventory/stock-types
 */
export declare const getStockTypes: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const inventoryController: {
    getHistory: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getDetail: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    stockIn: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    stockOut: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getHistoryByIngredient: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
    getStockTypes: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
};
export default inventoryController;
//# sourceMappingURL=inventory.controller.d.ts.map