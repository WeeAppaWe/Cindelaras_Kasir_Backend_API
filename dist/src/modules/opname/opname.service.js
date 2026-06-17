"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.opnameService = exports.getIngredients = exports.softDelete = exports.applyAdjustment = exports.changeStatus = exports.update = exports.create = exports.getDetail = exports.getAll = void 0;
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const metadata_info_utility_1 = require("../../../utility/metadata-info.utility");
const opname_repository_1 = __importDefault(require("./opname.repository"));
const stock_type_repository_1 = __importDefault(require("../stock-type/stock-type.repository"));
const webhook_emitter_1 = __importDefault(require("../../webhook/webhook.emitter"));
const opname_schema_1 = require("./opname.schema");
const stock_type_schema_1 = require("../stock-type/stock-type.schema");
const pagination_utility_1 = require("../../../utility/pagination.utility");
const prisma = (0, postgres_connection_1.default)();
/**
 * Get all stock opnames with pagination and filters
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
            status: req.query.status || null,
            start_date: req.query.start_date || null,
            end_date: req.query.end_date || null,
        };
        const [data, totalData] = await Promise.all([
            opname_repository_1.default.findAll(options, filter),
            opname_repository_1.default.count(filter),
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
        console.error(`--- Opname Service Error: ${error.message}`);
        throw error;
    }
};
exports.getAll = getAll;
/**
 * Get stock opname detail by ID
 */
const getDetail = async (req) => {
    try {
        const opnameId = req.params.stock_opname_id;
        const opname = await opname_repository_1.default.findByIdWithDetails(opnameId);
        if (!opname) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Stock opname tidak ditemukan');
        }
        return opname;
    }
    catch (error) {
        console.error(`--- Opname Service Error: ${error.message}`);
        throw error;
    }
};
exports.getDetail = getDetail;
/**
 * Create new stock opname
 */
const create = async (req) => {
    try {
        const body = req.body;
        const metadata = (0, metadata_info_utility_1.getMetadataInfo)(req);
        if (!metadata.account_id) {
            throw new error_validation_exception_1.ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'id', message: 'User tidak terautentikasi' },
            ]);
        }
        // Validate all ingredients exist and get their current stock
        const itemsWithStock = [];
        for (const item of body.items) {
            const currentStock = await opname_repository_1.default.getIngredientStock(item.ingredient_id);
            if (currentStock === null) {
                throw new error_validation_exception_1.ErrorValidationException(`Bahan dengan ID ${item.ingredient_id} tidak ditemukan`, [
                    { location: 'body', field: 'items', message: `Bahan dengan ID ${item.ingredient_id} tidak ditemukan` },
                ]);
            }
            const difference = item.physical_qty - currentStock;
            itemsWithStock.push({
                ingredient_id: item.ingredient_id,
                system_qty: currentStock,
                physical_qty: item.physical_qty,
                difference: difference,
            });
        }
        // Create opname in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const opname = await opname_repository_1.default.create({
                user_id: metadata.account_id,
                opname_date: new Date(body.opname_date),
                status: opname_schema_1.OpnameStatus.DRAFT,
                notes: body.notes || null,
            }, itemsWithStock, transaction);
            return opname;
        });
        return result;
    }
    catch (error) {
        console.error(`--- Opname Service Error: ${error.message}`);
        throw error;
    }
};
exports.create = create;
/**
 * Update stock opname (only DRAFT status)
 */
const update = async (req) => {
    try {
        const opnameId = req.params.stock_opname_id;
        const body = req.body;
        // Check if opname exists
        const existingOpname = await opname_repository_1.default.findById(opnameId);
        if (!existingOpname) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Stock opname tidak ditemukan');
        }
        // Only allow update on DRAFT status
        if (existingOpname.status !== opname_schema_1.OpnameStatus.DRAFT) {
            throw new error_validation_exception_1.ErrorValidationException('Hanya opname dengan status DRAFT yang dapat diubah', [
                { location: 'params', field: 'stock_opname_id', message: 'Opname sudah tidak dalam status DRAFT' },
            ]);
        }
        // Update in transaction
        const result = await prisma.$transaction(async (transaction) => {
            // Update notes if provided
            if (body.notes !== undefined) {
                await opname_repository_1.default.update(opnameId, { notes: body.notes || null }, transaction);
            }
            // Update items if provided
            if (body.items && body.items.length > 0) {
                // Validate all ingredients and prepare items with stock
                const itemsWithStock = [];
                for (const item of body.items) {
                    const currentStock = await opname_repository_1.default.getIngredientStock(item.ingredient_id, transaction);
                    if (currentStock === null) {
                        throw new error_validation_exception_1.ErrorValidationException(`Bahan dengan ID ${item.ingredient_id} tidak ditemukan`, [
                            { location: 'body', field: 'items', message: `Bahan dengan ID ${item.ingredient_id} tidak ditemukan` },
                        ]);
                    }
                    const difference = item.physical_qty - currentStock;
                    itemsWithStock.push({
                        ingredient_id: item.ingredient_id,
                        system_qty: currentStock,
                        physical_qty: item.physical_qty,
                        difference: difference,
                    });
                }
                // Delete old items and add new ones
                await opname_repository_1.default.deleteItems(opnameId, transaction);
                await opname_repository_1.default.addItems(opnameId, itemsWithStock, transaction);
            }
            // Fetch updated opname with details
            const updated = await opname_repository_1.default.findByIdWithDetails(opnameId);
            return updated;
        });
        return result;
    }
    catch (error) {
        console.error(`--- Opname Service Error: ${error.message}`);
        throw error;
    }
};
exports.update = update;
/**
 * Change opname status (DRAFT -> COMPLETED or CANCELLED)
 */
const changeStatus = async (req) => {
    try {
        const opnameId = req.params.stock_opname_id;
        const { status } = req.body;
        // Check if opname exists
        const existingOpname = await opname_repository_1.default.findById(opnameId);
        if (!existingOpname) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Stock opname tidak ditemukan');
        }
        // Only allow status change from DRAFT
        if (existingOpname.status !== opname_schema_1.OpnameStatus.DRAFT) {
            throw new error_validation_exception_1.ErrorValidationException('Hanya opname dengan status DRAFT yang dapat diubah statusnya', [
                { location: 'params', field: 'stock_opname_id', message: 'Opname sudah tidak dalam status DRAFT' },
            ]);
        }
        // Update status
        await opname_repository_1.default.updateStatus(opnameId, status);
        // Fetch updated opname with details
        const updated = await opname_repository_1.default.findByIdWithDetails(opnameId);
        return updated;
    }
    catch (error) {
        console.error(`--- Opname Service Error: ${error.message}`);
        throw error;
    }
};
exports.changeStatus = changeStatus;
/**
 * Apply adjustment to stock (COMPLETED -> APPLIED)
 */
const applyAdjustment = async (req) => {
    try {
        const opnameId = req.params.stock_opname_id;
        const metadata = (0, metadata_info_utility_1.getMetadataInfo)(req);
        if (!metadata.account_id) {
            throw new error_validation_exception_1.ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }
        const existingOpname = await opname_repository_1.default.findById(opnameId);
        if (!existingOpname) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Stock opname tidak ditemukan');
        }
        if (existingOpname.status !== opname_schema_1.OpnameStatus.COMPLETED) {
            throw new error_validation_exception_1.ErrorValidationException('Hanya opname dengan status COMPLETED yang dapat diaplikasikan', [
                { location: 'params', field: 'stock_opname_id', message: 'Opname harus dalam status COMPLETED untuk dapat diaplikasikan' },
            ]);
        }
        // Get ADJUSTMENT_OPNAME stock type — required before entering transaction
        const stockType = await stock_type_repository_1.default.findByName(stock_type_schema_1.StockTypeName.ADJUSTMENT_OPNAME);
        if (!stockType) {
            throw new error_validation_exception_1.ErrorValidationException('Tipe stok ADJUSTMENT_OPNAME tidak ditemukan', [
                { location: 'system', field: 'stock_type', message: 'Konfigurasi tipe stok tidak valid' },
            ]);
        }
        const result = await prisma.$transaction(async (transaction) => {
            const items = await opname_repository_1.default.getOpnameItems(opnameId, transaction);
            for (const item of items) {
                // Update ingredient stock to physical count
                await opname_repository_1.default.updateIngredientStock(item.ingredient_id, item.physical_qty, transaction);
                // Skip recording stock movement if there is no difference
                if (item.difference === 0) {
                    continue;
                }
                // Record stock movement for audit trail
                // qty stored as difference (positive = surplus, negative = shrinkage)
                await opname_repository_1.default.createStockMovement({
                    ingredient_id: item.ingredient_id,
                    user_id: metadata.account_id,
                    stock_type_id: stockType.stock_type_id,
                    qty: item.difference,
                    current_stock: item.physical_qty,
                    notes: `Penyesuaian stock opname #${opnameId.slice(-8).toUpperCase()}`,
                }, transaction);
            }
            await opname_repository_1.default.updateStatus(opnameId, opname_schema_1.OpnameStatus.APPLIED, transaction);
            return items;
        });
        // Webhook: notify stock changed for menu availability check
        const changedIngredientIds = result.map((item) => item.ingredient_id);
        if (changedIngredientIds.length > 0) {
            webhook_emitter_1.default.emit('stock.changed', { ingredient_ids: changedIngredientIds });
        }
        return {
            success: true,
            message: 'Adjustment berhasil diaplikasikan',
            adjustments_count: result.length,
        };
    }
    catch (error) {
        console.error(`--- Opname Service Error: ${error.message}`);
        throw error;
    }
};
exports.applyAdjustment = applyAdjustment;
/**
 * Soft delete stock opname (only DRAFT or CANCELLED)
 */
const softDelete = async (req) => {
    try {
        const opnameId = req.params.stock_opname_id;
        // Check if opname exists
        const existingOpname = await opname_repository_1.default.findById(opnameId);
        if (!existingOpname) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Stock opname tidak ditemukan');
        }
        // Only allow delete on DRAFT or CANCELLED status
        if (existingOpname.status !== opname_schema_1.OpnameStatus.DRAFT && existingOpname.status !== opname_schema_1.OpnameStatus.CANCELLED) {
            throw new error_validation_exception_1.ErrorValidationException('Hanya opname dengan status DRAFT atau CANCELLED yang dapat dihapus', [
                { location: 'params', field: 'stock_opname_id', message: 'Opname sudah tidak dapat dihapus' },
            ]);
        }
        // Soft delete
        await opname_repository_1.default.softDelete(opnameId);
        return {
            success: true,
            message: 'Stock opname berhasil dihapus',
        };
    }
    catch (error) {
        console.error(`--- Opname Service Error: ${error.message}`);
        throw error;
    }
};
exports.softDelete = softDelete;
/**
 * Get all ingredients for opname form
 */
const getIngredients = async () => {
    try {
        return await opname_repository_1.default.getIngredientsForOpname();
    }
    catch (error) {
        console.error(`--- Opname Service Error: ${error.message}`);
        throw error;
    }
};
exports.getIngredients = getIngredients;
exports.opnameService = {
    getAll: exports.getAll,
    getDetail: exports.getDetail,
    create: exports.create,
    update: exports.update,
    changeStatus: exports.changeStatus,
    applyAdjustment: exports.applyAdjustment,
    softDelete: exports.softDelete,
    getIngredients: exports.getIngredients,
};
exports.default = exports.opnameService;
//# sourceMappingURL=opname.service.js.map