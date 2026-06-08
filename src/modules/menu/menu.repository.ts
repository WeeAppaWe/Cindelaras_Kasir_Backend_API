import getPrismaClient from '../../../database/postgres.connection';
import { handlePrismaError } from '../../../utility/prisma-error-handler.utility';
import { MenuFilter, MenuPaginationOptions, MenuData, MenuWithDetails } from './menu.types';
import { Prisma } from '../../generated/prisma/client';

const prisma = getPrismaClient();

// Select fields for menu queries
const menuSelectFields = {
    menu_id: true,
    name: true,
    price: true,
    cost: true,
    description: true,
    image_url: true,
    is_available: true,
    created_at: true,
    updated_at: true,
    category: {
        select: {
            category_id: true,
            name: true,
        },
    },
};

// Select fields with recipe count
const menuWithCountSelectFields = {
    ...menuSelectFields,
    _count: {
        select: {
            recipes: true,
        },
    },
};

/**
 * Find all menus with pagination and filters
 */
export const findAll = async (
    options: MenuPaginationOptions,
    filter: MenuFilter
): Promise<MenuWithDetails[]> => {
    try {
        const { pagination } = options;
        const { search, category_id, is_available } = filter;

        const where: Prisma.MenuWhereInput = {
            deleted_at: null,
        };

        // Search by name
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }

        // Filter by category
        if (category_id) {
            where.category_id = category_id;
        }

        // Filter by availability
        if (is_available !== undefined && is_available !== null) {
            where.is_available = is_available;
        }

        const menus = await prisma.menu.findMany({
            where,
            select: menuWithCountSelectFields,
            orderBy: { name: 'asc' },
            take: pagination.limit,
            skip: pagination.offset,
        });

        return menus.map((menu) => ({
            menu_id: menu.menu_id,
            name: menu.name,
            price: Number(menu.price),
            cost: Number(menu.cost),
            description: menu.description,
            image_url: menu.image_url,
            is_available: menu.is_available,
            created_at: menu.created_at,
            updated_at: menu.updated_at,
            category: menu.category,
            _count: menu._count,
        })) as MenuWithDetails[];
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Count menus with filters
 */
export const count = async (filter: MenuFilter): Promise<number> => {
    try {
        const { search, category_id, is_available } = filter;

        const where: Prisma.MenuWhereInput = {
            deleted_at: null,
        };

        // Search by name
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }

        // Filter by category
        if (category_id) {
            where.category_id = category_id;
        }

        // Filter by availability
        if (is_available !== undefined && is_available !== null) {
            where.is_available = is_available;
        }

        return await prisma.menu.count({ where });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find menu by ID
 */
export const findById = async (menuId: string): Promise<MenuData | null> => {
    try {
        const menu = await prisma.menu.findUnique({
            where: {
                menu_id: menuId,
                deleted_at: null,
            },
            select: menuSelectFields,
        });

        if (!menu) return null;

        return {
            menu_id: menu.menu_id,
            name: menu.name,
            price: Number(menu.price),
            cost: Number(menu.cost),
            description: menu.description,
            image_url: menu.image_url,
            is_available: menu.is_available,
            created_at: menu.created_at,
            updated_at: menu.updated_at,
            category: menu.category,
        };
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Find menu by name (for validation - check duplicate)
 */
export const findByName = async (
    name: string,
    excludeMenuId?: string
): Promise<MenuData | null> => {
    try {
        const where: Prisma.MenuWhereInput = {
            name: { equals: name, mode: 'insensitive' },
            deleted_at: null,
        };

        // Exclude specific menu (for update validation)
        if (excludeMenuId) {
            where.menu_id = { not: excludeMenuId };
        }

        const menu = await prisma.menu.findFirst({
            where,
            select: menuSelectFields,
        });

        if (!menu) return null;

        return {
            menu_id: menu.menu_id,
            name: menu.name,
            price: Number(menu.price),
            cost: Number(menu.cost),
            description: menu.description,
            image_url: menu.image_url,
            is_available: menu.is_available,
            created_at: menu.created_at,
            updated_at: menu.updated_at,
            category: menu.category,
        };
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Create new menu
 */
export const create = async (
    data: Prisma.MenuUncheckedCreateInput,
    transaction?: Prisma.TransactionClient
): Promise<MenuData> => {
    try {
        const client = transaction || prisma;

        const menu = await client.menu.create({
            data,
            select: menuSelectFields,
        });

        return {
            menu_id: menu.menu_id,
            name: menu.name,
            price: Number(menu.price),
            cost: Number(menu.cost),
            description: menu.description,
            image_url: menu.image_url,
            is_available: menu.is_available,
            created_at: menu.created_at,
            updated_at: menu.updated_at,
            category: menu.category,
        };
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Update menu by ID
 */
export const update = async (
    menuId: string,
    data: Prisma.MenuUncheckedUpdateInput,
    transaction?: Prisma.TransactionClient
): Promise<MenuData> => {
    try {
        const client = transaction || prisma;

        const menu = await client.menu.update({
            where: { menu_id: menuId },
            data,
            select: menuSelectFields,
        });

        return {
            menu_id: menu.menu_id,
            name: menu.name,
            price: Number(menu.price),
            cost: Number(menu.cost),
            description: menu.description,
            image_url: menu.image_url,
            is_available: menu.is_available,
            created_at: menu.created_at,
            updated_at: menu.updated_at,
            category: menu.category,
        };
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Soft delete menu (set deleted_at)
 */
export const softDelete = async (
    menuId: string,
    transaction?: Prisma.TransactionClient
): Promise<void> => {
    try {
        const client = transaction || prisma;

        await client.menu.update({
            where: { menu_id: menuId },
            data: { deleted_at: new Date() },
        });
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

/**
 * Check if menu has orders (for delete validation)
 */
export const hasOrders = async (menuId: string): Promise<boolean> => {
    try {
        const count = await prisma.orderItem.count({
            where: {
                menu_id: menuId,
                deleted_at: null,
            },
        });

        return count > 0;
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

export const menuRepository = {
    findAll,
    count,
    findById,
    findByName,
    create,
    update,
    softDelete,
    hasOrders,
};

export default menuRepository;
