import {
    OrderWithDetails,
    CreateOrderRequest,
    PaymentType,
    OrderStatus,
    OrderType,
    OrderWithUser,
    ConfirmPaymentRequest
} from '../../modules/order/order.types';

export const mockOrderUser = {
    user_id: 'user-123',
    name: 'Test Staff',
};

export const mockOrderShift = {
    shift_id: 'shift-123',
    start_time: new Date('2024-01-01T08:00:00Z'),
    end_time: null,
};

export const mockMenu = {
    menu_id: 'menu-1',
    name: 'Nasi Goreng',
    image_url: 'http://example.com/nasigoreng.jpg',
    price: 15000,
    is_available: true,
    recipes: [
        { ingredient_id: 'ing-1', qty_needed: 100 }
    ]
};

export const mockMenuUnavailable = {
    ...mockMenu,
    menu_id: 'menu-2',
    name: 'Es Kosong',
    is_available: false,
};

export const mockOrderItem = {
    order_item_id: 'item-1',
    menu_id: mockMenu.menu_id,
    qty: 2,
    price: 15000,
    subtotal: 30000,
    menu: {
        menu_id: mockMenu.menu_id,
        name: mockMenu.name,
        image_url: mockMenu.image_url,
    },
};

export const mockOrderPending: OrderWithDetails = {
    order_id: 'order-123',
    shift_id: mockOrderShift.shift_id,
    user_id: mockOrderUser.user_id,
    customer_name: 'Budi',
    customer_phone: '08123456789',
    receipt: null,
    total_amount: 30000,
    paid_amount: 0,
    change_amount: 0,
    payment_type: PaymentType.CASH,
    order_type: OrderType.DINE_IN,
    status: OrderStatus.PENDING,
    created_at: new Date('2024-01-01T10:00:00Z'),
    updated_at: null,
    user: mockOrderUser,
    shift: mockOrderShift,
    order_items: [mockOrderItem],
    _count: { order_items: 1 },
};

export const mockOrderCompleted: OrderWithDetails = {
    ...mockOrderPending,
    receipt: 'STR-20240101-ORDER123',
    status: OrderStatus.COMPLETED,
    paid_amount: 50000,
    change_amount: 20000,
    updated_at: new Date('2024-01-01T10:05:00Z'),
};

export const mockOrderList: OrderWithDetails[] = [mockOrderCompleted, mockOrderPending];

export const mockCreateOrderRequest: CreateOrderRequest = {
    customer_name: 'Budi',
    payment_type: PaymentType.CASH,
    order_type: OrderType.DINE_IN,
    items: [
        {
            menu_id: mockMenu.menu_id,
            qty: 2,
            price: 15000,
        }
    ],
};

export const mockConfirmPaymentRequest: ConfirmPaymentRequest = {
    paid_amount: 50000,
};
