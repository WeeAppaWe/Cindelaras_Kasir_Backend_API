import { AuthenticatedRequest } from '../../../../types';
import { CurrentStockResponse, StockMovementSummaryResponse, StockAlertsResponse, InventoryValuationResponse, OpnameHistoryResponse, IngredientMovementCardResponse, FullInventoryReportResponse } from './report-inventory.types';
export declare const getCurrentStock: (req: AuthenticatedRequest) => Promise<CurrentStockResponse>;
export declare const getMovementSummary: (req: AuthenticatedRequest) => Promise<StockMovementSummaryResponse>;
export declare const getStockAlerts: (req: AuthenticatedRequest) => Promise<StockAlertsResponse>;
export declare const getInventoryValuation: (req: AuthenticatedRequest) => Promise<InventoryValuationResponse>;
export declare const getOpnameHistory: (req: AuthenticatedRequest) => Promise<OpnameHistoryResponse>;
export declare const getIngredientCard: (req: AuthenticatedRequest) => Promise<IngredientMovementCardResponse | null>;
export declare const getFullReport: (req: AuthenticatedRequest) => Promise<FullInventoryReportResponse>;
export declare const reportInventoryService: {
    getCurrentStock: (req: AuthenticatedRequest) => Promise<CurrentStockResponse>;
    getMovementSummary: (req: AuthenticatedRequest) => Promise<StockMovementSummaryResponse>;
    getStockAlerts: (req: AuthenticatedRequest) => Promise<StockAlertsResponse>;
    getInventoryValuation: (req: AuthenticatedRequest) => Promise<InventoryValuationResponse>;
    getOpnameHistory: (req: AuthenticatedRequest) => Promise<OpnameHistoryResponse>;
    getIngredientCard: (req: AuthenticatedRequest) => Promise<IngredientMovementCardResponse | null>;
    getFullReport: (req: AuthenticatedRequest) => Promise<FullInventoryReportResponse>;
};
export default reportInventoryService;
//# sourceMappingURL=report-inventory.service.d.ts.map