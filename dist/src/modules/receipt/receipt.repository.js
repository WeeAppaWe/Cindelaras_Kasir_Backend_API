"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiptRepository = exports.findOrderForReceipt = void 0;
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
/**
 * Find order by ID with all related data for receipt
 */
const findOrderForReceipt = async (orderId) => {
    try {
        const order = await prisma.order.findUnique({
            where: {
                order_id: orderId,
                deleted_at: null,
            },
            select: {
                order_id: true,
                receipt: true,
                customer_name: true,
                customer_phone: true,
                total_amount: true,
                paid_amount: true,
                change_amount: true,
                payment_type: true,
                order_type: true,
                status: true,
                created_at: true,
                user: {
                    select: {
                        name: true,
                    },
                },
                order_items: {
                    where: {
                        deleted_at: null,
                    },
                    select: {
                        qty: true,
                        price: true,
                        subtotal: true,
                        menu: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        if (!order)
            return null;
        return {
            ...order,
            total_amount: Number(order.total_amount),
            paid_amount: Number(order.paid_amount),
            change_amount: Number(order.change_amount),
            order_items: order.order_items.map((item) => ({
                ...item,
                price: Number(item.price),
                subtotal: Number(item.subtotal),
            })),
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findOrderForReceipt = findOrderForReceipt;
exports.receiptRepository = {
    findOrderForReceipt: exports.findOrderForReceipt,
};
exports.default = exports.receiptRepository;
//# sourceMappingURL=receipt.repository.js.map