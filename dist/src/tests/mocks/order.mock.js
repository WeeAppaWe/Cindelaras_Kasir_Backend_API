"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockConfirmPaymentRequest = exports.mockCreateOrderRequest = exports.mockOrderList = exports.mockOrderCompleted = exports.mockOrderPending = exports.mockOrderItem = exports.mockMenuUnavailable = exports.mockMenu = exports.mockOrderShift = exports.mockOrderUser = void 0;
const order_types_1 = require("../../modules/order/order.types");
exports.mockOrderUser = {
    user_id: 'user-123',
    name: 'Test Staff',
};
exports.mockOrderShift = {
    shift_id: 'shift-123',
    start_time: new Date('2024-01-01T08:00:00Z'),
    end_time: null,
};
exports.mockMenu = {
    menu_id: 'menu-1',
    name: 'Nasi Goreng',
    image_url: 'http://example.com/nasigoreng.jpg',
    price: 15000,
    is_available: true,
    recipes: [
        { ingredient_id: 'ing-1', qty_needed: 100 }
    ]
};
exports.mockMenuUnavailable = {
    ...exports.mockMenu,
    menu_id: 'menu-2',
    name: 'Es Kosong',
    is_available: false,
};
exports.mockOrderItem = {
    order_item_id: 'item-1',
    menu_id: exports.mockMenu.menu_id,
    qty: 2,
    price: 15000,
    subtotal: 30000,
    menu: {
        menu_id: exports.mockMenu.menu_id,
        name: exports.mockMenu.name,
        image_url: exports.mockMenu.image_url,
    },
};
exports.mockOrderPending = {
    order_id: 'order-123',
    shift_id: exports.mockOrderShift.shift_id,
    user_id: exports.mockOrderUser.user_id,
    customer_name: 'Budi',
    customer_phone: '08123456789',
    receipt: null,
    total_amount: 30000,
    paid_amount: 0,
    change_amount: 0,
    payment_type: order_types_1.PaymentType.CASH,
    status: order_types_1.OrderStatus.PENDING,
    created_at: new Date('2024-01-01T10:00:00Z'),
    updated_at: null,
    user: exports.mockOrderUser,
    shift: exports.mockOrderShift,
    order_items: [exports.mockOrderItem],
    _count: { order_items: 1 },
};
exports.mockOrderCompleted = {
    ...exports.mockOrderPending,
    receipt: 'STR-20240101-ORDER123',
    status: order_types_1.OrderStatus.COMPLETED,
    paid_amount: 50000,
    change_amount: 20000,
    updated_at: new Date('2024-01-01T10:05:00Z'),
};
exports.mockOrderList = [exports.mockOrderCompleted, exports.mockOrderPending];
exports.mockCreateOrderRequest = {
    customer_name: 'Budi',
    payment_type: order_types_1.PaymentType.CASH,
    items: [
        {
            menu_id: exports.mockMenu.menu_id,
            qty: 2,
            price: 15000,
        }
    ],
};
exports.mockConfirmPaymentRequest = {
    paid_amount: 50000,
};
//# sourceMappingURL=order.mock.js.map