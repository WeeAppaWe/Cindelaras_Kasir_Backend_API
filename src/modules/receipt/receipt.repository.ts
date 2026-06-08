import getPrismaClient from '../../../database/postgres.connection';
import { handlePrismaError } from '../../../utility/prisma-error-handler.utility';
import { ReceiptOrderData } from './receipt.types';

const prisma = getPrismaClient();

/**
 * Find order by ID with all related data for receipt
 */
export const findOrderForReceipt = async (orderId: string): Promise<ReceiptOrderData | null> => {
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

    if (!order) return null;

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
  } catch (error) {
    console.error('--- Repository Error:', error);
    handlePrismaError(error);
  }
};

export const receiptRepository = {
  findOrderForReceipt,
};

export default receiptRepository;
