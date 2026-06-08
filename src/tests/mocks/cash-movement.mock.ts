import {
    CashMovementWithShift,
    CashMovementSummary,
    CreateCashMovementRequest
} from '../../modules/cash-movement/cash-movement.types';

export const mockCashMovement: CashMovementWithShift = {
    cash_movement_id: 'cm-123',
    shift_id: 'shift-123',
    type: 'IN',
    amount: 50000,
    note: 'Initial cash',
    created_at: new Date('2024-01-01T08:00:00Z'),
    updated_at: null,
    shift: {
        shift_id: 'shift-123',
        start_time: new Date('2024-01-01T08:00:00Z'),
        end_time: null,
    },
};

export const mockCashMovementOut: CashMovementWithShift = {
    cash_movement_id: 'cm-124',
    shift_id: 'shift-123',
    type: 'OUT',
    amount: 10000,
    note: 'Buy supplies',
    created_at: new Date('2024-01-01T10:00:00Z'),
    updated_at: null,
    shift: {
        shift_id: 'shift-123',
        start_time: new Date('2024-01-01T08:00:00Z'),
        end_time: null,
    },
};

export const mockCashMovementList: CashMovementWithShift[] = [mockCashMovement, mockCashMovementOut];

export const mockCashMovementSummary: CashMovementSummary = {
    total_in: 50000,
    total_out: 10000,
    net_amount: 40000,
};

export const mockCreateCashMovementRequest: CreateCashMovementRequest = {
    type: 'IN',
    amount: 100000,
    note: 'Additional cash',
};
