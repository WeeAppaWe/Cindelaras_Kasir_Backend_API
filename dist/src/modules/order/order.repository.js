"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRepository = exports.getOrdersByShift = exports.findStockTypeByName = exports.updateIngredientStock = exports.findMenuById = exports.getActiveShift = exports.softDelete = exports.confirmOrder = exports.updateStatus = exports.create = exports.findByIdWithDetails = exports.findById = exports.count = exports.findAll = void 0;
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
// ============================================
// SELECT FIELDS
// ============================================
const orderListSelectFields = {
    order_id: true,
    shift_id: true,
    user_id: true,
    customer_name: true,
    customer_phone: true,
    receipt: true,
    total_amount: true,
    paid_amount: true,
    change_amount: true,
    payment_type: true,
    status: true,
    created_at: true,
    updated_at: true,
    user: {
        select: {
            user_id: true,
            name: true,
        },
    },
    _count: {
        select: {
            order_items: true,
        },
    },
};
const orderDetailSelectFields = {
    order_id: true,
    shift_id: true,
    user_id: true,
    customer_name: true,
    customer_phone: true,
    receipt: true,
    total_amount: true,
    paid_amount: true,
    change_amount: true,
    payment_type: true,
    status: true,
    created_at: true,
    updated_at: true,
    user: {
        select: {
            user_id: true,
            name: true,
        },
    },
    shift: {
        select: {
            shift_id: true,
            start_time: true,
            end_time: true,
        },
    },
    order_items: {
        where: {
            deleted_at: null,
        },
        select: {
            order_item_id: true,
            menu_id: true,
            qty: true,
            price: true,
            subtotal: true,
            menu: {
                select: {
                    menu_id: true,
                    name: true,
                    image_url: true,
                },
            },
        },
        orderBy: {
            created_at: 'asc',
        },
    },
};
// ============================================
// FIND ALL ORDERS
// ============================================
const findAll = async (options, filter) => {
    try {
        const { pagination } = options;
        const { search, status, payment_type, shift_id, start_date, end_date } = filter;
        const where = {
            deleted_at: null,
        };
        // Search by customer name
        if (search) {
            where.customer_name = { contains: search, mode: 'insensitive' };
        }
        // Filter by status
        if (status) {
            where.status = status;
        }
        // Filter by payment type
        if (payment_type) {
            where.payment_type = payment_type;
        }
        // Filter by shift
        if (shift_id) {
            where.shift_id = shift_id;
        }
        // Filter by date range
        if (start_date || end_date) {
            where.created_at = {};
            if (start_date) {
                where.created_at.gte = new Date(start_date);
            }
            if (end_date) {
                // Set end date to end of day
                const endDateTime = new Date(end_date);
                endDateTime.setHours(23, 59, 59, 999);
                where.created_at.lte = endDateTime;
            }
        }
        const orders = await prisma.order.findMany({
            where,
            select: orderListSelectFields,
            orderBy: { created_at: 'desc' },
            take: pagination.limit,
            skip: pagination.offset,
        });
        // Transform Decimal to number
        return orders.map((order) => ({
            ...order,
            total_amount: Number(order.total_amount),
            paid_amount: Number(order.paid_amount),
            change_amount: Number(order.change_amount),
        }));
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findAll = findAll;
// ============================================
// COUNT ORDERS
// ============================================
const count = async (filter) => {
    try {
        const { search, status, payment_type, shift_id, start_date, end_date } = filter;
        const where = {
            deleted_at: null,
        };
        if (search) {
            where.customer_name = { contains: search, mode: 'insensitive' };
        }
        if (status) {
            where.status = status;
        }
        if (payment_type) {
            where.payment_type = payment_type;
        }
        if (shift_id) {
            where.shift_id = shift_id;
        }
        if (start_date || end_date) {
            where.created_at = {};
            if (start_date) {
                where.created_at.gte = new Date(start_date);
            }
            if (end_date) {
                const endDateTime = new Date(end_date);
                endDateTime.setHours(23, 59, 59, 999);
                where.created_at.lte = endDateTime;
            }
        }
        return await prisma.order.count({ where });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.count = count;
// ============================================
// FIND BY ID
// ============================================
const findById = async (orderId) => {
    try {
        const order = await prisma.order.findUnique({
            where: {
                order_id: orderId,
                deleted_at: null,
            },
            select: orderListSelectFields,
        });
        if (!order)
            return null;
        return {
            ...order,
            total_amount: Number(order.total_amount),
            paid_amount: Number(order.paid_amount),
            change_amount: Number(order.change_amount),
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findById = findById;
// ============================================
// FIND BY ID WITH DETAILS
// ============================================
const findByIdWithDetails = async (orderId) => {
    try {
        const order = await prisma.order.findUnique({
            where: {
                order_id: orderId,
                deleted_at: null,
            },
            select: orderDetailSelectFields,
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
exports.findByIdWithDetails = findByIdWithDetails;
// ============================================
// CREATE ORDER WITH ITEMS
// ============================================
const create = async (data, items, transaction) => {
    try {
        const client = transaction || prisma;
        const order = await client.order.create({
            data: {
                shift_id: data.shift_id,
                user_id: data.user_id,
                customer_name: data.customer_name,
                customer_phone: data.customer_phone,
                total_amount: data.total_amount,
                paid_amount: data.paid_amount,
                change_amount: data.change_amount,
                payment_type: data.payment_type,
                status: data.status,
                order_items: {
                    create: items.map((item) => ({
                        menu_id: item.menu_id,
                        qty: item.qty,
                        price: item.price,
                        subtotal: item.subtotal,
                    })),
                },
            },
            select: orderDetailSelectFields,
        });
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
exports.create = create;
// ============================================
// UPDATE ORDER STATUS
// ============================================
const updateStatus = async (orderId, status, paidAmount, transaction) => {
    try {
        const client = transaction || prisma;
        const updateData = {
            status,
        };
        if (paidAmount !== undefined) {
            updateData.paid_amount = paidAmount;
            updateData.change_amount = 0; // For QRIS, change is always 0
        }
        const order = await client.order.update({
            where: { order_id: orderId },
            data: updateData,
            select: orderListSelectFields,
        });
        return {
            ...order,
            total_amount: Number(order.total_amount),
            paid_amount: Number(order.paid_amount),
            change_amount: Number(order.change_amount),
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.updateStatus = updateStatus;
// ============================================
// CONFIRM ORDER (Update payment details)
// ============================================
const confirmOrder = async (orderId, paidAmount, changeAmount, receipt, transaction) => {
    try {
        const client = transaction || prisma;
        const order = await client.order.update({
            where: { order_id: orderId },
            data: {
                status: 'COMPLETED',
                receipt,
                paid_amount: paidAmount,
                change_amount: changeAmount,
            },
            select: orderListSelectFields,
        });
        return {
            ...order,
            total_amount: Number(order.total_amount),
            paid_amount: Number(order.paid_amount),
            change_amount: Number(order.change_amount),
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.confirmOrder = confirmOrder;
// ============================================
// SOFT DELETE ORDER
// ============================================
const softDelete = async (orderId, transaction) => {
    try {
        const client = transaction || prisma;
        await client.order.update({
            where: { order_id: orderId },
            data: { deleted_at: new Date() },
        });
        // Also soft delete order items
        await client.orderItem.updateMany({
            where: { order_id: orderId },
            data: { deleted_at: new Date() },
        });
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.softDelete = softDelete;
// ============================================
// GET ACTIVE SHIFT FOR USER
// ============================================
const getActiveShift = async (userId) => {
    try {
        const shift = await prisma.shift.findFirst({
            where: {
                user_id: userId,
                end_time: null, // No end time means shift is still active
                deleted_at: null,
            },
            select: {
                shift_id: true,
                user_id: true,
                start_cash: true,
                start_time: true,
            },
            orderBy: {
                start_time: 'desc',
            },
        });
        if (!shift)
            return null;
        return {
            ...shift,
            start_cash: Number(shift.start_cash),
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getActiveShift = getActiveShift;
// ============================================
// FIND MENU BY ID
// ============================================
const findMenuById = async (menuId) => {
    try {
        const menu = await prisma.menu.findUnique({
            where: {
                menu_id: menuId,
                deleted_at: null,
            },
            select: {
                menu_id: true,
                name: true,
                price: true,
                is_available: true,
                recipes: {
                    where: { deleted_at: null },
                    select: {
                        ingredient_id: true,
                        qty_needed: true,
                    },
                },
            },
        });
        if (!menu)
            return null;
        return {
            ...menu,
            price: Number(menu.price),
            recipes: menu.recipes.map((r) => ({
                ingredient_id: r.ingredient_id,
                qty_needed: Number(r.qty_needed),
            })),
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findMenuById = findMenuById;
// ============================================
// UPDATE INGREDIENT STOCK (for stock deduction)
// ============================================
const updateIngredientStock = async (ingredientId, deductAmount, userId, stockTypeId, transaction) => {
    try {
        // 1. Update stock (decrement) and get the new stock value
        const updatedIngredient = await transaction.ingredient.update({
            where: { ingredient_id: ingredientId },
            data: {
                stock_qty: {
                    decrement: deductAmount,
                },
            },
            select: {
                stock_qty: true,
            },
        });
        // 2. Create Stock Movement record
        // Qty is negative for outgoing stock (Sales)
        const movement = await transaction.stockMovement.create({
            data: {
                ingredient_id: ingredientId,
                user_id: userId,
                stock_type_id: stockTypeId,
                qty: -deductAmount, // Negative for OUT
                current_stock: updatedIngredient.stock_qty,
                notes: 'Penjualan via Kasir',
            },
        });
        console.log('[DEBUG] StockMovement created:', movement);
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.updateIngredientStock = updateIngredientStock;
// ============================================
// FIND STOCK TYPE BY NAME
// ============================================
const findStockTypeByName = async (name) => {
    try {
        const stockType = await prisma.stockType.findFirst({
            where: {
                name: { equals: name, mode: 'insensitive' },
                deleted_at: null,
            },
            select: {
                stock_type_id: true,
                name: true,
            },
        });
        return stockType;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findStockTypeByName = findStockTypeByName;
// ============================================
// GET ORDERS BY SHIFT (for shift summary)
// ============================================
const getOrdersByShift = async (shiftId) => {
    try {
        const orders = await prisma.order.findMany({
            where: {
                shift_id: shiftId,
                status: 'COMPLETED',
                deleted_at: null,
            },
            select: {
                total_amount: true,
                payment_type: true,
            },
        });
        const total_orders = orders.length;
        const total_sales = orders.reduce((sum, o) => sum + Number(o.total_amount), 0);
        const total_cash = orders
            .filter((o) => o.payment_type === 'CASH')
            .reduce((sum, o) => sum + Number(o.total_amount), 0);
        const total_qris = orders
            .filter((o) => o.payment_type === 'QRIS')
            .reduce((sum, o) => sum + Number(o.total_amount), 0);
        return {
            total_orders,
            total_sales,
            total_cash,
            total_qris,
        };
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.getOrdersByShift = getOrdersByShift;
exports.orderRepository = {
    findAll: exports.findAll,
    count: exports.count,
    findById: exports.findById,
    findByIdWithDetails: exports.findByIdWithDetails,
    create: exports.create,
    updateStatus: exports.updateStatus,
    confirmOrder: exports.confirmOrder,
    softDelete: exports.softDelete,
    getActiveShift: exports.getActiveShift,
    findMenuById: exports.findMenuById,
    updateIngredientStock: exports.updateIngredientStock,
    getOrdersByShift: exports.getOrdersByShift,
    findStockTypeByName: exports.findStockTypeByName,
};
exports.default = exports.orderRepository;
//# sourceMappingURL=order.repository.js.map