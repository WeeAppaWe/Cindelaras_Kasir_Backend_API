import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import { ErrorDataAlreadyExistException } from '../../../exception/error-data-already-exist.exception';
import { ErrorValidationException } from '../../../exception/error-validation.exception';
import getPrismaClient from '../../../database/postgres.connection';
import { getPagination } from '../../../utility/pagination.utility';
import { calculateMarginPercent, calculateProfit, roundCurrency } from '../../../utility/cost-calculation.utility';
import { AuthenticatedRequest } from '../../../types';
import menuRepository from './menu.repository';
import categoryRepository from '../category/category.repository';
import hppService from '../hpp/hpp.service';
import menuAvailabilityRepository from '../../webhook/handlers/menu-availability.repository';
import {
    CreateMenuRequest,
    UpdateMenuRequest,
    MenuListResponse,
    MenuData,
    MenuDetailResponse,
    DeleteMenuResponse,
    MenuWithDetails,
} from './menu.types';

const prisma = getPrismaClient();

/**
 * Get all menus with pagination and filters
 */
export const getAll = async (req: AuthenticatedRequest): Promise<MenuListResponse> => {
    try {
        const pageNumber = parseInt(req.query.batch as string) || 1;
        const pageSize = parseInt(req.query.size as string) || 10;
        const pagination = getPagination(pageNumber, pageSize);

        const options = {
            pagination: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        };

        // Set search and filters
        const filter = {
            search: (req.query.search as string) || null,
            category_id: (req.query.category_id as string) || null,
            is_available: req.query.is_available === 'true'
                ? true
                : req.query.is_available === 'false'
                    ? false
                    : null,
        };

        const [data, totalData] = await Promise.all([
            menuRepository.findAll(options, filter),
            menuRepository.count(filter),
        ]);

        // Add margin and profit calculations
        const records: MenuWithDetails[] = data.map((menu) => ({
            ...menu,
            margin_percent: roundCurrency(calculateMarginPercent(menu.price, menu.cost)),
            profit: roundCurrency(calculateProfit(menu.price, menu.cost)),
        }));

        return {
            page: {
                total_record_count: totalData,
                batch_number: pageNumber,
                batch_size: data.length,
                max_batch_size: pageSize,
            },
            records,
        };
    } catch (error) {
        console.error(`--- Menu Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get menu detail by ID with recipes and cost summary
 */
export const getDetail = async (req: AuthenticatedRequest): Promise<MenuDetailResponse> => {
    try {
        const menuId = req.params.menu_id;

        const menu = await menuRepository.findById(menuId);

        if (!menu) {
            throw new ErrorNotFoundException('Menu tidak ditemukan');
        }

        // Get recipes with cost
        const hppResult = await hppService.calculateMenuHPP(menuId);

        // Get cost summary
        const costSummary = await hppService.getMenuCostSummary(menuId);

        return {
            ...menu,
            recipes: hppResult.recipes.map((r) => ({
                menu_recipe_id: r.menu_recipe_id,
                ingredient_id: r.ingredient_id,
                ingredient_name: r.ingredient_name,
                qty_needed: r.qty_needed,
                unit_name: r.unit_name,
                unit_cost: r.unit_cost,
                subtotal: r.subtotal,
            })),
            cost_summary: costSummary,
        };
    } catch (error) {
        console.error(`--- Menu Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Create new menu
 */
export const create = async (req: AuthenticatedRequest): Promise<MenuData> => {
    try {
        const body: CreateMenuRequest = req.body;

        // Check if menu name already exists
        const existingMenu = await menuRepository.findByName(body.name);
        if (existingMenu) {
            throw new ErrorDataAlreadyExistException('Nama menu sudah digunakan');
        }

        // Validate category exists
        const category = await categoryRepository.findById(body.category_id);
        if (!category) {
            throw new ErrorValidationException('Kategori tidak ditemukan', [
                { location: 'body', field: 'category_id', message: 'Kategori tidak ditemukan' },
            ]);
        }

        // Create menu
        const result = await menuRepository.create(
            {
                name: body.name,
                category_id: body.category_id,
                price: body.price,
                cost: 0, // HPP will be calculated when recipes are added
                description: body.description || null,
                image_url: body.image_url || null,
                is_available: body.is_available ?? true,
            }
        );

        return result;
    } catch (error) {
        console.error(`--- Menu Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Update menu by ID
 */
export const update = async (req: AuthenticatedRequest): Promise<MenuData> => {
    try {
        const menuId = req.params.menu_id;
        const body: UpdateMenuRequest = req.body;

        // Check if menu exists
        const existingMenu = await menuRepository.findById(menuId);
        if (!existingMenu) {
            throw new ErrorNotFoundException('Menu tidak ditemukan');
        }

        // Check if name already used by another menu
        if (body.name) {
            const duplicateMenu = await menuRepository.findByName(body.name, menuId);
            if (duplicateMenu) {
                throw new ErrorDataAlreadyExistException('Nama menu sudah digunakan');
            }
        }

        // Validate category if provided
        if (body.category_id) {
            const category = await categoryRepository.findById(body.category_id);
            if (!category) {
                throw new ErrorValidationException('Kategori tidak ditemukan', [
                    { location: 'body', field: 'category_id', message: 'Kategori tidak ditemukan' },
                ]);
            }
        }

        // Prepare update data
        const updateData: {
            name?: string;
            category_id?: string;
            price?: number;
            description?: string | null;
            image_url?: string | null;
            is_available?: boolean;
        } = {};

        if (body.name !== undefined) updateData.name = body.name;
        if (body.category_id !== undefined) updateData.category_id = body.category_id;
        if (body.price !== undefined) updateData.price = body.price;
        if (body.description !== undefined) updateData.description = body.description;
        if (body.image_url !== undefined) updateData.image_url = body.image_url;
        if (body.is_available !== undefined) updateData.is_available = body.is_available;

        // Update menu
        const result = await menuRepository.update(menuId, updateData);

        return result;
    } catch (error) {
        console.error(`--- Menu Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Soft delete menu by ID
 */
export const softDelete = async (req: AuthenticatedRequest): Promise<DeleteMenuResponse> => {
    try {
        const menuId = req.params.menu_id;

        // Check if menu exists
        const existingMenu = await menuRepository.findById(menuId);
        if (!existingMenu) {
            throw new ErrorNotFoundException('Menu tidak ditemukan');
        }

        // Check if menu has orders
        const hasOrders = await menuRepository.hasOrders(menuId);
        if (hasOrders) {
            throw new ErrorValidationException('Menu tidak dapat dihapus karena sudah pernah dipesan', [
                { location: 'params', field: 'menu_id', message: 'Menu sudah memiliki riwayat pesanan' },
            ]);
        }

        // Soft delete
        await menuRepository.softDelete(menuId);

        return {
            success: true,
            message: 'Menu berhasil dihapus',
        };
    } catch (error) {
        console.error(`--- Menu Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Toggle menu availability
 */
export const toggleAvailability = async (req: AuthenticatedRequest): Promise<MenuData> => {
    try {
        const menuId = req.params.menu_id;

        // Check if menu exists
        const existingMenu = await menuRepository.findById(menuId);
        if (!existingMenu) {
            throw new ErrorNotFoundException('Menu tidak ditemukan');
        }

        const isActivating = !existingMenu.is_available;

        // If trying to activate, ensure stock is sufficient
        if (isActivating) {
            const insufficient = await menuAvailabilityRepository.findMenuIdsWithInsufficientStock([menuId]);

            if (insufficient.length > 0) {
                throw new ErrorValidationException('Stok bahan tidak mencukupi, menu tidak dapat diaktifkan', [
                    { location: 'system', field: 'is_available', message: 'Stok bahan resep kurang dari kebutuhan minimum' }
                ]);
            }
        }

        // Toggle availability - no transaction needed for single update
        const result = await menuRepository.update(menuId, {
            is_available: isActivating,
        });

        return result;
    } catch (error) {
        console.error(`--- Menu Service Error: ${(error as Error).message}`);
        throw error;
    }
};

export const menuService = {
    getAll,
    getDetail,
    create,
    update,
    softDelete,
    toggleAvailability,
};

export default menuService;
