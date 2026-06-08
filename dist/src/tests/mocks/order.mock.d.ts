import { OrderWithDetails, CreateOrderRequest, ConfirmPaymentRequest } from '../../modules/order/order.types';
export declare const mockOrderUser: {
    user_id: string;
    name: string;
};
export declare const mockOrderShift: {
    shift_id: string;
    start_time: Date;
    end_time: any;
};
export declare const mockMenu: {
    menu_id: string;
    name: string;
    image_url: string;
    price: number;
    is_available: boolean;
    recipes: {
        ingredient_id: string;
        qty_needed: number;
    }[];
};
export declare const mockMenuUnavailable: {
    menu_id: string;
    name: string;
    is_available: boolean;
    image_url: string;
    price: number;
    recipes: {
        ingredient_id: string;
        qty_needed: number;
    }[];
};
export declare const mockOrderItem: {
    order_item_id: string;
    menu_id: string;
    qty: number;
    price: number;
    subtotal: number;
    menu: {
        menu_id: string;
        name: string;
        image_url: string;
    };
};
export declare const mockOrderPending: OrderWithDetails;
export declare const mockOrderCompleted: OrderWithDetails;
export declare const mockOrderList: OrderWithDetails[];
export declare const mockCreateOrderRequest: CreateOrderRequest;
export declare const mockConfirmPaymentRequest: ConfirmPaymentRequest;
//# sourceMappingURL=order.mock.d.ts.map