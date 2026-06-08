import {
    ShiftWithUser,
    ShiftSummary,
    StartShiftRequest,
    EndShiftRequest,
    ShiftOrderStats
} from '../../modules/shift/shift.types';

export const mockUser = {
    user_id: 'user-123',
    name: 'Test Cashier',
};

export const mockActiveShift: ShiftWithUser = {
    shift_id: 'shift-123',
    user_id: mockUser.user_id,
    start_cash: 50000,
    end_cash: null,
    sold_total: null,
    start_time: new Date('2024-01-01T08:00:00Z'),
    end_time: null,
    created_at: new Date('2024-01-01T08:00:00Z'),
    updated_at: null,
    user: mockUser,
    _count: {
        orders: 5,
    },
};

export const mockClosedShift: ShiftWithUser = {
    ...mockActiveShift,
    end_cash: 150000,
    sold_total: 100000,
    end_time: new Date('2024-01-01T17:00:00Z'),
    updated_at: new Date('2024-01-01T17:00:00Z'),
};

export const mockShiftList: ShiftWithUser[] = [mockActiveShift, mockClosedShift];

export const mockShiftSummary: ShiftSummary = {
    shift_id: mockActiveShift.shift_id,
    user_name: mockUser.name,
    start_time: mockActiveShift.start_time,
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

export const mockOrderStats: ShiftOrderStats = {
    total_orders: 5,
    completed_orders: 5,
    cancelled_orders: 0,
    pending_orders: 0,
    cash_sales: 100000,
    qris_sales: 0,
    total_sales: 100000,
};

export const mockStartShiftRequest: StartShiftRequest = {
    start_cash: 50000,
};

export const mockEndShiftRequest: EndShiftRequest = {
    end_cash: 150000,
};
