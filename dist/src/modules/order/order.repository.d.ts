import { OrderFilter, OrderPaginationOptions, OrderWithUser, OrderWithDetails, ActiveShift } from './order.types';
import { Prisma } from '../../generated/prisma/client';
export declare const findAll: (options: OrderPaginationOptions, filter: OrderFilter) => Promise<OrderWithUser[]>;
export declare const count: (filter: OrderFilter) => Promise<number>;
export declare const findById: (orderId: string) => Promise<OrderWithUser | null>;
export declare const findByIdWithDetails: (orderId: string) => Promise<OrderWithDetails | null>;
export declare const create: (data: {
    shift_id: string;
    user_id: string;
    customer_name: string;
    customer_phone: string | null;
    total_amount: number;
    paid_amount: number;
    change_amount: number;
    payment_type: string;
    status: string;
}, items: Array<{
    menu_id: string;
    qty: number;
    price: number;
    subtotal: number;
}>, transaction?: Prisma.TransactionClient) => Promise<OrderWithDetails>;
export declare const updateStatus: (orderId: string, status: string, paidAmount?: number, transaction?: Prisma.TransactionClient) => Promise<OrderWithUser>;
export declare const confirmOrder: (orderId: string, paidAmount: number, changeAmount: number, receipt: string, transaction?: Prisma.TransactionClient) => Promise<OrderWithUser>;
export declare const softDelete: (orderId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
export declare const getActiveShift: (userId: string) => Promise<ActiveShift | null>;
export declare const findMenuById: (menuId: string) => Promise<{
    menu_id: string;
    name: string;
    price: number;
    is_available: boolean;
    recipes: Array<{
        ingredient_id: string;
        qty_needed: number;
    }>;
} | null>;
export declare const updateIngredientStock: (ingredientId: string, deductAmount: number, userId: string, stockTypeId: string, transaction: Prisma.TransactionClient) => Promise<void>;
export declare const getOrdersByShift: (shiftId: string) => Promise<{
    total_orders: number;
    total_sales: number;
    total_cash: number;
    total_qris: number;
}>;
export declare const orderRepository: {
    findAll: (options: OrderPaginationOptions, filter: OrderFilter) => Promise<OrderWithUser[]>;
    count: (filter: OrderFilter) => Promise<number>;
    findById: (orderId: string) => Promise<OrderWithUser | null>;
    findByIdWithDetails: (orderId: string) => Promise<OrderWithDetails | null>;
    create: (data: {
        shift_id: string;
        user_id: string;
        customer_name: string;
        customer_phone: string | null;
        total_amount: number;
        paid_amount: number;
        change_amount: number;
        payment_type: string;
        status: string;
    }, items: Array<{
        menu_id: string;
        qty: number;
        price: number;
        subtotal: number;
    }>, transaction?: Prisma.TransactionClient) => Promise<OrderWithDetails>;
    updateStatus: (orderId: string, status: string, paidAmount?: number, transaction?: Prisma.TransactionClient) => Promise<OrderWithUser>;
    confirmOrder: (orderId: string, paidAmount: number, changeAmount: number, receipt: string, transaction?: Prisma.TransactionClient) => Promise<OrderWithUser>;
    softDelete: (orderId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
    getActiveShift: (userId: string) => Promise<ActiveShift | null>;
    findMenuById: (menuId: string) => Promise<{
        menu_id: string;
        name: string;
        price: number;
        is_available: boolean;
        recipes: Array<{
            ingredient_id: string;
            qty_needed: number;
        }>;
    } | null>;
    updateIngredientStock: (ingredientId: string, deductAmount: number, userId: string, stockTypeId: string, transaction: Prisma.TransactionClient) => Promise<void>;
    getOrdersByShift: (shiftId: string) => Promise<{
        total_orders: number;
        total_sales: number;
        total_cash: number;
        total_qris: number;
    }>;
};
export default orderRepository;
//# sourceMappingURL=order.repository.d.ts.map