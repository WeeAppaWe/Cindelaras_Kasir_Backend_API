import { MenuFilter, MenuPaginationOptions, MenuData, MenuWithDetails } from './menu.types';
import { Prisma } from '../../generated/prisma/client';
/**
 * Find all menus with pagination and filters
 */
export declare const findAll: (options: MenuPaginationOptions, filter: MenuFilter) => Promise<MenuWithDetails[]>;
/**
 * Count menus with filters
 */
export declare const count: (filter: MenuFilter) => Promise<number>;
/**
 * Find menu by ID
 */
export declare const findById: (menuId: string) => Promise<MenuData | null>;
/**
 * Find menu by name (for validation - check duplicate)
 */
export declare const findByName: (name: string, excludeMenuId?: string) => Promise<MenuData | null>;
/**
 * Create new menu
 */
export declare const create: (data: Prisma.MenuUncheckedCreateInput, transaction?: Prisma.TransactionClient) => Promise<MenuData>;
/**
 * Update menu by ID
 */
export declare const update: (menuId: string, data: Prisma.MenuUncheckedUpdateInput, transaction?: Prisma.TransactionClient) => Promise<MenuData>;
/**
 * Soft delete menu (set deleted_at)
 */
export declare const softDelete: (menuId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
/**
 * Check if menu has orders (for delete validation)
 */
export declare const hasOrders: (menuId: string) => Promise<boolean>;
export declare const menuRepository: {
    findAll: (options: MenuPaginationOptions, filter: MenuFilter) => Promise<MenuWithDetails[]>;
    count: (filter: MenuFilter) => Promise<number>;
    findById: (menuId: string) => Promise<MenuData | null>;
    findByName: (name: string, excludeMenuId?: string) => Promise<MenuData | null>;
    create: (data: Prisma.MenuUncheckedCreateInput, transaction?: Prisma.TransactionClient) => Promise<MenuData>;
    update: (menuId: string, data: Prisma.MenuUncheckedUpdateInput, transaction?: Prisma.TransactionClient) => Promise<MenuData>;
    softDelete: (menuId: string, transaction?: Prisma.TransactionClient) => Promise<void>;
    hasOrders: (menuId: string) => Promise<boolean>;
};
export default menuRepository;
//# sourceMappingURL=menu.repository.d.ts.map