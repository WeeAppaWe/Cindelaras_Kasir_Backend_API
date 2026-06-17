"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuService = exports.toggleAvailability = exports.softDelete = exports.update = exports.create = exports.getDetail = exports.getAll = void 0;
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const error_data_already_exist_exception_1 = require("../../../exception/error-data-already-exist.exception");
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const pagination_utility_1 = require("../../../utility/pagination.utility");
const cost_calculation_utility_1 = require("../../../utility/cost-calculation.utility");
const menu_repository_1 = __importDefault(require("./menu.repository"));
const category_repository_1 = __importDefault(require("../category/category.repository"));
const hpp_service_1 = __importDefault(require("../hpp/hpp.service"));
const menu_availability_repository_1 = __importDefault(require("../../webhook/handlers/menu-availability.repository"));
const prisma = (0, postgres_connection_1.default)();
/**
 * Get all menus with pagination and filters
 */
const getAll = async (req) => {
    try {
        const pageNumber = parseInt(req.query.batch) || 1;
        const pageSize = parseInt(req.query.size) || 10;
        const pagination = (0, pagination_utility_1.getPagination)(pageNumber, pageSize);
        const options = {
            pagination: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        };
        // Set search and filters
        const filter = {
            search: req.query.search || null,
            category_id: req.query.category_id || null,
            is_available: req.query.is_available === 'true'
                ? true
                : req.query.is_available === 'false'
                    ? false
                    : null,
        };
        const [data, totalData] = await Promise.all([
            menu_repository_1.default.findAll(options, filter),
            menu_repository_1.default.count(filter),
        ]);
        // Add margin and profit calculations
        const records = data.map((menu) => ({
            ...menu,
            margin_percent: (0, cost_calculation_utility_1.roundCurrency)((0, cost_calculation_utility_1.calculateMarginPercent)(menu.price, menu.cost)),
            profit: (0, cost_calculation_utility_1.roundCurrency)((0, cost_calculation_utility_1.calculateProfit)(menu.price, menu.cost)),
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
    }
    catch (error) {
        console.error(`--- Menu Service Error: ${error.message}`);
        throw error;
    }
};
exports.getAll = getAll;
/**
 * Get menu detail by ID with recipes and cost summary
 */
const getDetail = async (req) => {
    try {
        const menuId = req.params.menu_id;
        const menu = await menu_repository_1.default.findById(menuId);
        if (!menu) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Menu tidak ditemukan');
        }
        // Get recipes with cost
        const hppResult = await hpp_service_1.default.calculateMenuHPP(menuId);
        // Get cost summary
        const costSummary = await hpp_service_1.default.getMenuCostSummary(menuId);
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
    }
    catch (error) {
        console.error(`--- Menu Service Error: ${error.message}`);
        throw error;
    }
};
exports.getDetail = getDetail;
/**
 * Create new menu
 */
const create = async (req) => {
    try {
        const body = req.body;
        // Check if menu name already exists
        const existingMenu = await menu_repository_1.default.findByName(body.name);
        if (existingMenu) {
            throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Nama menu sudah digunakan');
        }
        // Validate category exists
        const category = await category_repository_1.default.findById(body.category_id);
        if (!category) {
            throw new error_validation_exception_1.ErrorValidationException('Kategori tidak ditemukan', [
                { location: 'body', field: 'category_id', message: 'Kategori tidak ditemukan' },
            ]);
        }
        // Create menu
        const result = await menu_repository_1.default.create({
            name: body.name,
            category_id: body.category_id,
            price: body.price,
            cost: 0, // HPP will be calculated when recipes are added
            description: body.description || null,
            image_url: body.image_url || null,
            is_available: body.is_available ?? true,
        });
        return result;
    }
    catch (error) {
        console.error(`--- Menu Service Error: ${error.message}`);
        throw error;
    }
};
exports.create = create;
/**
 * Update menu by ID
 */
const update = async (req) => {
    try {
        const menuId = req.params.menu_id;
        const body = req.body;
        // Check if menu exists
        const existingMenu = await menu_repository_1.default.findById(menuId);
        if (!existingMenu) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Menu tidak ditemukan');
        }
        // Check if name already used by another menu
        if (body.name) {
            const duplicateMenu = await menu_repository_1.default.findByName(body.name, menuId);
            if (duplicateMenu) {
                throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Nama menu sudah digunakan');
            }
        }
        // Validate category if provided
        if (body.category_id) {
            const category = await category_repository_1.default.findById(body.category_id);
            if (!category) {
                throw new error_validation_exception_1.ErrorValidationException('Kategori tidak ditemukan', [
                    { location: 'body', field: 'category_id', message: 'Kategori tidak ditemukan' },
                ]);
            }
        }
        // Prepare update data
        const updateData = {};
        if (body.name !== undefined)
            updateData.name = body.name;
        if (body.category_id !== undefined)
            updateData.category_id = body.category_id;
        if (body.price !== undefined)
            updateData.price = body.price;
        if (body.description !== undefined)
            updateData.description = body.description;
        if (body.image_url !== undefined)
            updateData.image_url = body.image_url;
        if (body.is_available !== undefined)
            updateData.is_available = body.is_available;
        // Update menu
        const result = await menu_repository_1.default.update(menuId, updateData);
        return result;
    }
    catch (error) {
        console.error(`--- Menu Service Error: ${error.message}`);
        throw error;
    }
};
exports.update = update;
/**
 * Soft delete menu by ID
 */
const softDelete = async (req) => {
    try {
        const menuId = req.params.menu_id;
        // Check if menu exists
        const existingMenu = await menu_repository_1.default.findById(menuId);
        if (!existingMenu) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Menu tidak ditemukan');
        }
        // Check if menu has orders
        const hasOrders = await menu_repository_1.default.hasOrders(menuId);
        if (hasOrders) {
            throw new error_validation_exception_1.ErrorValidationException('Menu tidak dapat dihapus karena sudah pernah dipesan', [
                { location: 'params', field: 'menu_id', message: 'Menu sudah memiliki riwayat pesanan' },
            ]);
        }
        // Soft delete
        await menu_repository_1.default.softDelete(menuId);
        return {
            success: true,
            message: 'Menu berhasil dihapus',
        };
    }
    catch (error) {
        console.error(`--- Menu Service Error: ${error.message}`);
        throw error;
    }
};
exports.softDelete = softDelete;
/**
 * Toggle menu availability
 */
const toggleAvailability = async (req) => {
    try {
        const menuId = req.params.menu_id;
        // Check if menu exists
        const existingMenu = await menu_repository_1.default.findById(menuId);
        if (!existingMenu) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Menu tidak ditemukan');
        }
        const isActivating = !existingMenu.is_available;
        // If trying to activate, ensure stock is sufficient
        if (isActivating) {
            const insufficient = await menu_availability_repository_1.default.findMenuIdsWithInsufficientStock([menuId]);
            if (insufficient.length > 0) {
                throw new error_validation_exception_1.ErrorValidationException('Stok bahan tidak mencukupi, menu tidak dapat diaktifkan', [
                    { location: 'system', field: 'is_available', message: 'Stok bahan resep kurang dari kebutuhan minimum' }
                ]);
            }
        }
        // Toggle availability - no transaction needed for single update
        const result = await menu_repository_1.default.update(menuId, {
            is_available: isActivating,
        });
        return result;
    }
    catch (error) {
        console.error(`--- Menu Service Error: ${error.message}`);
        throw error;
    }
};
exports.toggleAvailability = toggleAvailability;
exports.menuService = {
    getAll: exports.getAll,
    getDetail: exports.getDetail,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
    toggleAvailability: exports.toggleAvailability,
};
exports.default = exports.menuService;
//# sourceMappingURL=menu.service.js.map