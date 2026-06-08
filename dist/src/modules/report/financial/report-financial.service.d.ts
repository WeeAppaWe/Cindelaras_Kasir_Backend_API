import { AuthenticatedRequest } from '../../../../types';
import { SummaryResponse, PaymentBreakdownResponse, CashFlowResponse, TopMenusResponse, SalesByCategoryResponse, FullFinancialReportResponse } from './report-financial.types';
export declare const getSummary: (req: AuthenticatedRequest) => Promise<SummaryResponse>;
export declare const getPaymentBreakdown: (req: AuthenticatedRequest) => Promise<PaymentBreakdownResponse>;
export declare const getCashFlow: (req: AuthenticatedRequest) => Promise<CashFlowResponse>;
export declare const getTopMenus: (req: AuthenticatedRequest) => Promise<TopMenusResponse>;
export declare const getSalesByCategory: (req: AuthenticatedRequest) => Promise<SalesByCategoryResponse>;
export declare const getFullReport: (req: AuthenticatedRequest) => Promise<FullFinancialReportResponse>;
export declare const reportFinancialService: {
    getSummary: (req: AuthenticatedRequest) => Promise<SummaryResponse>;
    getPaymentBreakdown: (req: AuthenticatedRequest) => Promise<PaymentBreakdownResponse>;
    getCashFlow: (req: AuthenticatedRequest) => Promise<CashFlowResponse>;
    getTopMenus: (req: AuthenticatedRequest) => Promise<TopMenusResponse>;
    getSalesByCategory: (req: AuthenticatedRequest) => Promise<SalesByCategoryResponse>;
    getFullReport: (req: AuthenticatedRequest) => Promise<FullFinancialReportResponse>;
};
export default reportFinancialService;
//# sourceMappingURL=report-financial.service.d.ts.map