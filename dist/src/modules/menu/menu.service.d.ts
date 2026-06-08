import { AuthenticatedRequest } from '../../../types';
import { MenuListResponse, MenuData, MenuDetailResponse, DeleteMenuResponse } from './menu.types';
/**
 * Get all menus with pagination and filters
 */
export declare const getAll: (req: AuthenticatedRequest) => Promise<MenuListResponse>;
/**
 * Get menu detail by ID with recipes and cost summary
 */
export declare const getDetail: (req: AuthenticatedRequest) => Promise<MenuDetailResponse>;
/**
 * Create new menu
 */
export declare const create: (req: AuthenticatedRequest) => Promise<MenuData>;
/**
 * Update menu by ID
 */
export declare const update: (req: AuthenticatedRequest) => Promise<MenuData>;
/**
 * Soft delete menu by ID
 */
export declare const softDelete: (req: AuthenticatedRequest) => Promise<DeleteMenuResponse>;
/**
 * Toggle menu availability
 */
export declare const toggleAvailability: (req: AuthenticatedRequest) => Promise<MenuData>;
export declare const menuService: {
    getAll: (req: AuthenticatedRequest) => Promise<MenuListResponse>;
    getDetail: (req: AuthenticatedRequest) => Promise<MenuDetailResponse>;
    create: (req: AuthenticatedRequest) => Promise<MenuData>;
    update: (req: AuthenticatedRequest) => Promise<MenuData>;
    softDelete: (req: AuthenticatedRequest) => Promise<DeleteMenuResponse>;
    toggleAvailability: (req: AuthenticatedRequest) => Promise<MenuData>;
};
export default menuService;
//# sourceMappingURL=menu.service.d.ts.map