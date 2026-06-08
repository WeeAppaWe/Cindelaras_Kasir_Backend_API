"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockCreateCashMovementRequest = exports.mockCashMovementSummary = exports.mockCashMovementList = exports.mockCashMovementOut = exports.mockCashMovement = void 0;
exports.mockCashMovement = {
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
exports.mockCashMovementOut = {
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
exports.mockCashMovementList = [exports.mockCashMovement, exports.mockCashMovementOut];
exports.mockCashMovementSummary = {
    total_in: 50000,
    total_out: 10000,
    net_amount: 40000,
};
exports.mockCreateCashMovementRequest = {
    type: 'IN',
    amount: 100000,
    note: 'Additional cash',
};
//# sourceMappingURL=cash-movement.mock.js.map