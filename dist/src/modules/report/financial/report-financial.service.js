"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportFinancialService = exports.getFullReport = exports.getSalesByCategory = exports.getTopMenus = exports.getCashFlow = exports.getPaymentBreakdown = exports.getSummary = void 0;
const report_financial_repository_1 = __importDefault(require("./report-financial.repository"));
// ============================================
// HELPER FUNCTIONS
// ============================================
/**
 * Extract filter from request query
 */
const extractFilter = (req) => {
    return {
        start_date: req.query.start_date,
        end_date: req.query.end_date,
        shift_id: req.query.shift_id || null,
        user_id: req.query.user_id || null,
    };
};
/**
 * Create period object from filter
 */
const createPeriod = (filter) => ({
    start_date: filter.start_date,
    end_date: filter.end_date,
});
/**
 * Calculate COGS from order items using menu recipes
 */
const calculateCOGS = (orders) => {
    let totalCOGS = 0;
    for (const order of orders || []) {
        for (const item of order.order_items) {
            // Calculate cost per menu item from recipes
            let menuCost = 0;
            for (const recipe of item.menu.recipes) {
                const ingredientCost = Number(recipe.ingredient.avg_cost);
                const qtyNeeded = Number(recipe.qty_needed);
                menuCost += ingredientCost * qtyNeeded;
            }
            // Multiply by quantity ordered
            totalCOGS += menuCost * item.qty;
        }
    }
    return totalCOGS;
};
// ============================================
// GET SUMMARY (Revenue, COGS, Profit, Margin)
// ============================================
const getSummary = async (req) => {
    try {
        const filter = extractFilter(req);
        const orders = await report_financial_repository_1.default.getCompletedOrdersForPeriod(filter);
        const totalSales = orders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;
        const totalCOGS = calculateCOGS(orders);
        const grossProfit = totalSales - totalCOGS;
        const marginPercentage = totalSales > 0 ? (grossProfit / totalSales) * 100 : 0;
        const transactionCount = orders?.length || 0;
        const averageTransactionValue = transactionCount > 0 ? totalSales / transactionCount : 0;
        return {
            period: createPeriod(filter),
            revenue: {
                total_sales: Math.round(totalSales),
                total_cogs: Math.round(totalCOGS),
                gross_profit: Math.round(grossProfit),
                margin_percentage: Math.round(marginPercentage * 100) / 100,
            },
            transaction_count: transactionCount,
            average_transaction_value: Math.round(averageTransactionValue),
        };
    }
    catch (error) {
        console.error(`--- Report Financial Service Error: ${error.message}`);
        throw error;
    }
};
exports.getSummary = getSummary;
// ============================================
// GET PAYMENT BREAKDOWN (CASH vs QRIS)
// ============================================
const getPaymentBreakdown = async (req) => {
    try {
        const filter = extractFilter(req);
        const orders = await report_financial_repository_1.default.getCompletedOrdersForPeriod(filter);
        const totalTransactions = orders?.length || 0;
        const totalAmount = orders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;
        // Group by payment type
        const paymentMap = new Map();
        for (const order of orders || []) {
            const paymentType = order.payment_type;
            const existing = paymentMap.get(paymentType);
            if (existing) {
                existing.count += 1;
                existing.amount += Number(order.total_amount);
            }
            else {
                paymentMap.set(paymentType, {
                    count: 1,
                    amount: Number(order.total_amount),
                });
            }
        }
        const byPaymentType = Array.from(paymentMap.entries()).map(([paymentType, data]) => ({
            payment_type: paymentType,
            transaction_count: data.count,
            total_amount: Math.round(data.amount),
            percentage: totalAmount > 0 ? Math.round((data.amount / totalAmount) * 10000) / 100 : 0,
        }));
        // Sort by total amount descending
        byPaymentType.sort((a, b) => b.total_amount - a.total_amount);
        return {
            period: createPeriod(filter),
            total_transactions: totalTransactions,
            total_amount: Math.round(totalAmount),
            by_payment_type: byPaymentType,
        };
    }
    catch (error) {
        console.error(`--- Report Financial Service Error: ${error.message}`);
        throw error;
    }
};
exports.getPaymentBreakdown = getPaymentBreakdown;
// ============================================
// GET CASH FLOW
// ============================================
const getCashFlow = async (req) => {
    try {
        const filter = extractFilter(req);
        const [orders, cashMovements, shifts] = await Promise.all([
            report_financial_repository_1.default.getCompletedOrdersForPeriod(filter),
            report_financial_repository_1.default.getCashMovementsForPeriod(filter),
            report_financial_repository_1.default.getShiftsForPeriod(filter),
        ]);
        // Calculate opening cash from first shift
        const openingCash = shifts && shifts.length > 0 ? Number(shifts[0].start_cash) : 0;
        // Calculate closing cash from last shift (if ended)
        const lastShift = shifts && shifts.length > 0 ? shifts[shifts.length - 1] : null;
        const closingCash = lastShift?.end_cash ? Number(lastShift.end_cash) : 0;
        // Cash from CASH sales only
        const cashFromSales = orders
            ?.filter(order => order.payment_type === 'CASH')
            .reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;
        // Cash adjustments (IN)
        const cashAdjustmentsIn = cashMovements
            ?.filter(cm => cm.type === 'IN')
            .reduce((sum, cm) => sum + Number(cm.amount), 0) || 0;
        // Cash adjustments (OUT)
        const cashAdjustmentsOut = cashMovements
            ?.filter(cm => cm.type === 'OUT')
            .reduce((sum, cm) => sum + Number(cm.amount), 0) || 0;
        const totalCashIn = cashFromSales + cashAdjustmentsIn;
        const totalCashOut = cashAdjustmentsOut;
        const expectedCash = openingCash + totalCashIn - totalCashOut;
        const difference = closingCash - expectedCash;
        return {
            period: createPeriod(filter),
            opening_cash: Math.round(openingCash),
            cash_in: {
                from_sales: Math.round(cashFromSales),
                adjustments: Math.round(cashAdjustmentsIn),
                total: Math.round(totalCashIn),
            },
            cash_out: {
                adjustments: Math.round(cashAdjustmentsOut),
                total: Math.round(totalCashOut),
            },
            closing_cash: Math.round(closingCash),
            expected_cash: Math.round(expectedCash),
            difference: Math.round(difference),
        };
    }
    catch (error) {
        console.error(`--- Report Financial Service Error: ${error.message}`);
        throw error;
    }
};
exports.getCashFlow = getCashFlow;
// ============================================
// GET TOP MENUS
// ============================================
const getTopMenus = async (req) => {
    try {
        const filter = extractFilter(req);
        const limit = parseInt(req.query.limit) || 10;
        const aggregatedMenus = await report_financial_repository_1.default.getOrderItemsAggregatedByMenu(filter, limit);
        const totalRevenue = aggregatedMenus?.reduce((sum, m) => sum + m.revenue, 0) || 0;
        const topMenus = aggregatedMenus?.map(menu => ({
            menu_id: menu.menu_id,
            name: menu.name,
            category: menu.category,
            qty_sold: menu.qty_sold,
            revenue: Math.round(menu.revenue),
            percentage_of_total: totalRevenue > 0
                ? Math.round((menu.revenue / totalRevenue) * 10000) / 100
                : 0,
        })) || [];
        return {
            period: createPeriod(filter),
            total_revenue: Math.round(totalRevenue),
            top_menus: topMenus,
        };
    }
    catch (error) {
        console.error(`--- Report Financial Service Error: ${error.message}`);
        throw error;
    }
};
exports.getTopMenus = getTopMenus;
// ============================================
// GET SALES BY CATEGORY
// ============================================
const getSalesByCategory = async (req) => {
    try {
        const filter = extractFilter(req);
        const aggregatedCategories = await report_financial_repository_1.default.getOrderItemsAggregatedByCategory(filter);
        const totalRevenue = aggregatedCategories?.reduce((sum, c) => sum + c.revenue, 0) || 0;
        const byCategory = aggregatedCategories?.map(cat => ({
            category_id: cat.category_id,
            category_name: cat.category_name,
            qty_sold: cat.qty_sold,
            revenue: Math.round(cat.revenue),
            percentage: totalRevenue > 0
                ? Math.round((cat.revenue / totalRevenue) * 10000) / 100
                : 0,
        })) || [];
        return {
            period: createPeriod(filter),
            total_revenue: Math.round(totalRevenue),
            by_category: byCategory,
        };
    }
    catch (error) {
        console.error(`--- Report Financial Service Error: ${error.message}`);
        throw error;
    }
};
exports.getSalesByCategory = getSalesByCategory;
// ============================================
// GET FULL REPORT
// ============================================
const getFullReport = async (req) => {
    try {
        const filter = extractFilter(req);
        // Get all data in parallel
        const [summaryData, paymentData, cashFlowData, topMenusData, salesByCategoryData] = await Promise.all([
            (0, exports.getSummary)(req),
            (0, exports.getPaymentBreakdown)(req),
            (0, exports.getCashFlow)(req),
            (0, exports.getTopMenus)(req),
            (0, exports.getSalesByCategory)(req),
        ]);
        return {
            period: createPeriod(filter),
            summary: {
                revenue: summaryData.revenue,
                transaction_count: summaryData.transaction_count,
                average_transaction_value: summaryData.average_transaction_value,
            },
            payment_breakdown: {
                total_transactions: paymentData.total_transactions,
                total_amount: paymentData.total_amount,
                by_payment_type: paymentData.by_payment_type,
            },
            cash_flow: {
                opening_cash: cashFlowData.opening_cash,
                cash_in: cashFlowData.cash_in,
                cash_out: cashFlowData.cash_out,
                closing_cash: cashFlowData.closing_cash,
                expected_cash: cashFlowData.expected_cash,
                difference: cashFlowData.difference,
            },
            top_menus: topMenusData.top_menus,
            sales_by_category: salesByCategoryData.by_category,
        };
    }
    catch (error) {
        console.error(`--- Report Financial Service Error: ${error.message}`);
        throw error;
    }
};
exports.getFullReport = getFullReport;
// ============================================
// EXPORT SERVICE
// ============================================
exports.reportFinancialService = {
    getSummary: exports.getSummary,
    getPaymentBreakdown: exports.getPaymentBreakdown,
    getCashFlow: exports.getCashFlow,
    getTopMenus: exports.getTopMenus,
    getSalesByCategory: exports.getSalesByCategory,
    getFullReport: exports.getFullReport,
};
exports.default = exports.reportFinancialService;
//# sourceMappingURL=report-financial.service.js.map