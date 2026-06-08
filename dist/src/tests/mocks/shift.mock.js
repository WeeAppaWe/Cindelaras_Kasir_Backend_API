"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockEndShiftRequest = exports.mockStartShiftRequest = exports.mockOrderStats = exports.mockShiftSummary = exports.mockShiftList = exports.mockClosedShift = exports.mockActiveShift = exports.mockUser = void 0;
exports.mockUser = {
    user_id: 'user-123',
    name: 'Test Cashier',
};
exports.mockActiveShift = {
    shift_id: 'shift-123',
    user_id: exports.mockUser.user_id,
    start_cash: 50000,
    end_cash: null,
    sold_total: null,
    start_time: new Date('2024-01-01T08:00:00Z'),
    end_time: null,
    created_at: new Date('2024-01-01T08:00:00Z'),
    updated_at: null,
    user: exports.mockUser,
    _count: {
        orders: 5,
    },
};
exports.mockClosedShift = {
    ...exports.mockActiveShift,
    end_cash: 150000,
    sold_total: 100000,
    end_time: new Date('2024-01-01T17:00:00Z'),
    updated_at: new Date('2024-01-01T17:00:00Z'),
};
exports.mockShiftList = [exports.mockActiveShift, exports.mockClosedShift];
exports.mockShiftSummary = {
    shift_id: exports.mockActiveShift.shift_id,
    user_name: exports.mockUser.name,
    start_time: exports.mockActiveShift.start_time,
    end_time: new Date('2024-01-01T17:00:00Z'),
    start_cash: 50000,
    end_cash: 150000,
    sold_total: 100000,
    expected_cash: 150000,
    difference: 0,
    total_orders: 5,
    completed_orders: 5,
    cancelled_orders: 0,
    cash_sales: 100000,
    qris_sales: 0,
};
exports.mockOrderStats = {
    total_orders: 5,
    completed_orders: 5,
    cancelled_orders: 0,
    pending_orders: 0,
    cash_sales: 100000,
    qris_sales: 0,
    total_sales: 100000,
};
exports.mockStartShiftRequest = {
    start_cash: 50000,
};
exports.mockEndShiftRequest = {
    end_cash: 150000,
};
//# sourceMappingURL=shift.mock.js.map