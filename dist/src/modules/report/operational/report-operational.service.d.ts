import { AuthenticatedRequest } from '../../../../types';
import { CashierPerformanceResponse, ShiftSummaryResponse, TransactionStatsResponse, MenuPerformanceResponse, OrderStatusResponse, FullOperationalReportResponse } from './report-operational.types';
export declare const getCashierPerformance: (req: AuthenticatedRequest) => Promise<CashierPerformanceResponse>;
export declare const getShiftSummary: (req: AuthenticatedRequest) => Promise<ShiftSummaryResponse>;
export declare const getTransactionStats: (req: AuthenticatedRequest) => Promise<TransactionStatsResponse>;
export declare const getMenuPerformance: (req: AuthenticatedRequest) => Promise<MenuPerformanceResponse>;
export declare const getOrderStatus: (req: AuthenticatedRequest) => Promise<OrderStatusResponse>;
export declare const getFullReport: (req: AuthenticatedRequest) => Promise<FullOperationalReportResponse>;
export declare const reportOperationalService: {
    getCashierPerformance: (req: AuthenticatedRequest) => Promise<CashierPerformanceResponse>;
    getShiftSummary: (req: AuthenticatedRequest) => Promise<ShiftSummaryResponse>;
    getTransactionStats: (req: AuthenticatedRequest) => Promise<TransactionStatsResponse>;
    getMenuPerformance: (req: AuthenticatedRequest) => Promise<MenuPerformanceResponse>;
    getOrderStatus: (req: AuthenticatedRequest) => Promise<OrderStatusResponse>;
    getFullReport: (req: AuthenticatedRequest) => Promise<FullOperationalReportResponse>;
};
export default reportOperationalService;
//# sourceMappingURL=report-operational.service.d.ts.map