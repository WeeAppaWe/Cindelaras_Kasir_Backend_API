"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = exports.softDelete = exports.update = exports.create = exports.getDetail = exports.getAll = void 0;
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const error_data_already_exist_exception_1 = require("../../../exception/error-data-already-exist.exception");
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const pagination_utility_1 = require("../../../utility/pagination.utility");
const category_repository_1 = __importDefault(require("./category.repository"));
const prisma = (0, postgres_connection_1.default)();
/**
 * Get all categories with pagination and filters
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
        // Set search filter
        const filter = {
            search: req.query.search || null,
        };
        const [data, totalData] = await Promise.all([
            category_repository_1.default.findAll(options, filter),
            category_repository_1.default.count(filter),
        ]);
        return {
            page: {
                total_record_count: totalData,
                batch_number: pageNumber,
                batch_size: data.length,
                max_batch_size: pageSize,
            },
            records: data,
        };
    }
    catch (error) {
        console.error(`--- Category Service Error: ${error.message}`);
        throw error;
    }
};
exports.getAll = getAll;
/**
 * Get category detail by ID
 */
const getDetail = async (req) => {
    try {
        const categoryId = req.params.category_id;
        const category = await category_repository_1.default.findById(categoryId);
        if (!category) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Kategori tidak ditemukan');
        }
        return category;
    }
    catch (error) {
        console.error(`--- Category Service Error: ${error.message}`);
        throw error;
    }
};
exports.getDetail = getDetail;
/**
 * Create new category
 */
const create = async (req) => {
    try {
        const body = req.body;
        // Check if category name already exists
        const existingCategory = await category_repository_1.default.findByName(body.name);
        if (existingCategory) {
            throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Nama kategori sudah digunakan');
        }
        // Create category
        const result = await category_repository_1.default.create({
            name: body.name,
        });
        return result;
    }
    catch (error) {
        console.error(`--- Category Service Error: ${error.message}`);
        throw error;
    }
};
exports.create = create;
/**
 * Update category by ID
 */
const update = async (req) => {
    try {
        const categoryId = req.params.category_id;
        const body = req.body;
        // Check if category exists
        const existingCategory = await category_repository_1.default.findById(categoryId);
        if (!existingCategory) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Kategori tidak ditemukan');
        }
        // Check if name already used by another category
        if (body.name) {
            const duplicateCategory = await category_repository_1.default.findByName(body.name, categoryId);
            if (duplicateCategory) {
                throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Nama kategori sudah digunakan');
            }
        }
        // Prepare update data
        const updateData = {};
        if (body.name)
            updateData.name = body.name;
        // Update category
        const result = await category_repository_1.default.update(categoryId, updateData);
        return result;
    }
    catch (error) {
        console.error(`--- Category Service Error: ${error.message}`);
        throw error;
    }
};
exports.update = update;
/**
 * Soft delete category by ID
 */
const softDelete = async (req) => {
    try {
        const categoryId = req.params.category_id;
        // Check if category exists
        const existingCategory = await category_repository_1.default.findById(categoryId);
        if (!existingCategory) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Kategori tidak ditemukan');
        }
        // Check if category has menus
        const hasMenus = await category_repository_1.default.hasMenus(categoryId);
        if (hasMenus) {
            throw new error_validation_exception_1.ErrorValidationException('Kategori tidak dapat dihapus karena masih memiliki menu', [
                { location: 'params', field: 'category_id', message: 'Kategori masih memiliki menu terkait' },
            ]);
        }
        // Soft delete
        await category_repository_1.default.softDelete(categoryId);
        return {
            success: true,
            message: 'Kategori berhasil dihapus',
        };
    }
    catch (error) {
        console.error(`--- Category Service Error: ${error.message}`);
        throw error;
    }
};
exports.softDelete = softDelete;
exports.categoryService = {
    getAll: exports.getAll,
    getDetail: exports.getDetail,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
};
exports.default = exports.categoryService;
//# sourceMappingURL=category.service.js.map