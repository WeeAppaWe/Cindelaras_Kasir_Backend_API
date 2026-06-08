"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supplierService = exports.softDelete = exports.update = exports.create = exports.getDetail = exports.getAll = void 0;
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const error_data_already_exist_exception_1 = require("../../../exception/error-data-already-exist.exception");
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const pagination_utility_1 = require("../../../utility/pagination.utility");
const supplier_repository_1 = __importDefault(require("./supplier.repository"));
const prisma = (0, postgres_connection_1.default)();
/**
 * Get all suppliers with pagination and filters
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
        const filter = {
            search: req.query.search || null,
        };
        const [data, totalData] = await Promise.all([
            supplier_repository_1.default.findAll(options, filter),
            supplier_repository_1.default.count(filter),
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
        console.error(`--- Supplier Service Error: ${error.message}`);
        throw error;
    }
};
exports.getAll = getAll;
/**
 * Get supplier detail by ID
 */
const getDetail = async (req) => {
    try {
        const supplierId = req.params.supplier_id;
        const supplier = await supplier_repository_1.default.findById(supplierId);
        if (!supplier) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Supplier tidak ditemukan');
        }
        return supplier;
    }
    catch (error) {
        console.error(`--- Supplier Service Error: ${error.message}`);
        throw error;
    }
};
exports.getDetail = getDetail;
/**
 * Create new supplier
 */
const create = async (req) => {
    try {
        const body = req.body;
        // Check if name already exists
        const existingSupplier = await supplier_repository_1.default.findByName(body.name);
        if (existingSupplier) {
            throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Nama supplier sudah digunakan');
        }
        // Create supplier in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const supplier = await supplier_repository_1.default.create({
                name: body.name,
                phone: body.phone || null,
                address: body.address || null,
            }, transaction);
            return supplier;
        });
        // Fetch supplier with count
        const supplierWithDetails = await supplier_repository_1.default.findById(result.supplier_id);
        return supplierWithDetails;
    }
    catch (error) {
        console.error(`--- Supplier Service Error: ${error.message}`);
        throw error;
    }
};
exports.create = create;
/**
 * Update supplier by ID
 */
const update = async (req) => {
    try {
        const supplierId = req.params.supplier_id;
        const body = req.body;
        // Check if supplier exists
        const existingSupplier = await supplier_repository_1.default.findById(supplierId);
        if (!existingSupplier) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Supplier tidak ditemukan');
        }
        // Check if name already used by another supplier
        if (body.name) {
            const duplicateSupplier = await supplier_repository_1.default.findByName(body.name, supplierId);
            if (duplicateSupplier) {
                throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Nama supplier sudah digunakan');
            }
        }
        // Prepare update data
        const updateData = {};
        if (body.name)
            updateData.name = body.name;
        if (body.phone !== undefined)
            updateData.phone = body.phone || null;
        if (body.address !== undefined)
            updateData.address = body.address || null;
        // Update in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const supplier = await supplier_repository_1.default.update(supplierId, updateData, transaction);
            return supplier;
        });
        // Fetch supplier with count
        const supplierWithDetails = await supplier_repository_1.default.findById(result.supplier_id);
        return supplierWithDetails;
    }
    catch (error) {
        console.error(`--- Supplier Service Error: ${error.message}`);
        throw error;
    }
};
exports.update = update;
/**
 * Soft delete supplier by ID
 */
const softDelete = async (req) => {
    try {
        const supplierId = req.params.supplier_id;
        // Check if supplier exists
        const existingSupplier = await supplier_repository_1.default.findById(supplierId);
        if (!existingSupplier) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Supplier tidak ditemukan');
        }
        // Soft delete in transaction
        await prisma.$transaction(async (transaction) => {
            await supplier_repository_1.default.softDelete(supplierId, transaction);
        });
        return {
            success: true,
            message: 'Supplier berhasil dihapus',
        };
    }
    catch (error) {
        console.error(`--- Supplier Service Error: ${error.message}`);
        throw error;
    }
};
exports.softDelete = softDelete;
exports.supplierService = {
    getAll: exports.getAll,
    getDetail: exports.getDetail,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
};
exports.default = exports.supplierService;
//# sourceMappingURL=supplier.service.js.map