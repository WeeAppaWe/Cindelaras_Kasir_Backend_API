"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryService = exports.getStockTypes = exports.getHistoryByIngredient = exports.stockOut = exports.stockIn = exports.getDetail = exports.getHistory = void 0;
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const pagination_utility_1 = require("../../../utility/pagination.utility");
const cost_calculation_utility_1 = require("../../../utility/cost-calculation.utility");
const metadata_info_utility_1 = require("../../../utility/metadata-info.utility");
const inventory_repository_1 = __importDefault(require("./inventory.repository"));
const stock_type_repository_1 = __importDefault(require("../stock-type/stock-type.repository"));
const webhook_emitter_1 = __importDefault(require("../../webhook/webhook.emitter"));
const stock_type_schema_1 = require("../stock-type/stock-type.schema");
const prisma = (0, postgres_connection_1.default)();
/**
 * Get all stock movements with pagination and filters (Riwayat Stok)
 */
const getHistory = async (req) => {
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
            ingredient_id: req.query.ingredient_id || null,
            supplier_id: req.query.supplier_id || null,
            stock_type_id: req.query.stock_type_id || null,
            date_from: req.query.date_from ? new Date(req.query.date_from) : null,
            date_to: req.query.date_to ? new Date(req.query.date_to) : null,
        };
        const [data, totalData] = await Promise.all([
            inventory_repository_1.default.findAll(options, filter),
            inventory_repository_1.default.count(filter),
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
        console.error(`--- Inventory Service Error: ${error.message}`);
        throw error;
    }
};
exports.getHistory = getHistory;
/**
 * Get stock movement detail by ID
 */
const getDetail = async (req) => {
    try {
        const stockMovementId = req.params.stock_movement_id;
        const movement = await inventory_repository_1.default.findById(stockMovementId);
        if (!movement) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Pergerakan stok tidak ditemukan');
        }
        return movement;
    }
    catch (error) {
        console.error(`--- Inventory Service Error: ${error.message}`);
        throw error;
    }
};
exports.getDetail = getDetail;
/**
 * Stock IN - Barang masuk dari supplier
 */
const stockIn = async (req) => {
    try {
        const body = req.body;
        const metadata = (0, metadata_info_utility_1.getMetadataInfo)(req);
        if (!metadata.account_id) {
            throw new error_validation_exception_1.ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }
        // Validate ingredient exists
        const ingredient = await inventory_repository_1.default.findIngredientById(body.ingredient_id);
        if (!ingredient) {
            throw new error_validation_exception_1.ErrorValidationException('Bahan tidak ditemukan', [
                { location: 'body', field: 'ingredient_id', message: 'Bahan tidak ditemukan' },
            ]);
        }
        // Validate supplier exists
        const supplier = await inventory_repository_1.default.findSupplierById(body.supplier_id);
        if (!supplier) {
            throw new error_validation_exception_1.ErrorValidationException('Supplier tidak ditemukan', [
                { location: 'body', field: 'supplier_id', message: 'Supplier tidak ditemukan' },
            ]);
        }
        // Get stock type IN_PURCHASE
        const stockType = await stock_type_repository_1.default.findByName(stock_type_schema_1.StockTypeName.IN_PURCHASE);
        if (!stockType) {
            throw new error_validation_exception_1.ErrorValidationException('Tipe stok IN tidak ditemukan', [
                { location: 'system', field: 'stock_type', message: 'Konfigurasi tipe stok tidak valid' },
            ]);
        }
        // Calculate new stock and avg_cost
        const currentStock = Number(ingredient.stock_qty);
        const currentAvgCost = Number(ingredient.avg_cost);
        const incomingQty = body.qty;
        const incomingCost = body.unit_cost;
        const newStock = currentStock + incomingQty;
        // Calculate new weighted average cost
        // Formula: ((currentStock * currentAvgCost) + (incomingQty * incomingCost)) / newStock
        const newAvgCost = newStock > 0
            ? (0, cost_calculation_utility_1.roundCurrency)((currentStock * currentAvgCost + incomingQty * incomingCost) / newStock)
            : incomingCost;
        // Create movement and update stock in transaction
        const result = await prisma.$transaction(async (transaction) => {
            // Update ingredient stock
            await inventory_repository_1.default.updateIngredientStock(body.ingredient_id, newStock, newAvgCost, transaction);
            // Create stock movement record
            const movement = await inventory_repository_1.default.create({
                supplier_id: body.supplier_id,
                ingredient_id: body.ingredient_id,
                user_id: metadata.account_id,
                stock_type_id: stockType.stock_type_id,
                qty: incomingQty,
                unit_cost: incomingCost,
                current_stock: newStock,
                notes: body.notes || null,
            }, transaction);
            return movement;
        });
        // Webhook: notify stock changed for menu availability check
        webhook_emitter_1.default.emit('stock.changed', { ingredient_ids: [body.ingredient_id] });
        // Fetch complete data with relations
        const fullMovement = await inventory_repository_1.default.findById(result.stock_movement_id);
        return fullMovement;
    }
    catch (error) {
        console.error(`--- Inventory Service Error: ${error.message}`);
        throw error;
    }
};
exports.stockIn = stockIn;
/**
 * Stock OUT - Barang keluar (rusak/kedaluarsa)
 */
const stockOut = async (req) => {
    try {
        const body = req.body;
        const metadata = (0, metadata_info_utility_1.getMetadataInfo)(req);
        if (!metadata.account_id) {
            throw new error_validation_exception_1.ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }
        // Validate ingredient exists
        const ingredient = await inventory_repository_1.default.findIngredientById(body.ingredient_id);
        if (!ingredient) {
            throw new error_validation_exception_1.ErrorValidationException('Bahan tidak ditemukan', [
                { location: 'body', field: 'ingredient_id', message: 'Bahan tidak ditemukan' },
            ]);
        }
        // Check if enough stock
        const currentStock = Number(ingredient.stock_qty);
        if (currentStock < body.qty) {
            throw new error_validation_exception_1.ErrorValidationException('Stok tidak mencukupi', [
                {
                    location: 'body',
                    field: 'qty',
                    message: `Stok saat ini: ${currentStock}, diminta: ${body.qty}`,
                },
            ]);
        }
        // Get stock type OUT_DAMAGED/OUT_EXPIRED
        // Determine the correct stock type based on reason
        const stockTypeName = body.reason === 'EXPIRED'
            ? stock_type_schema_1.StockTypeName.OUT_EXPIRED
            : stock_type_schema_1.StockTypeName.OUT_DAMAGED;
        const stockType = await stock_type_repository_1.default.findByName(stockTypeName);
        if (!stockType) {
            throw new error_validation_exception_1.ErrorValidationException('Tipe stok OUT tidak ditemukan', [
                { location: 'system', field: 'stock_type', message: 'Konfigurasi tipe stok tidak valid' },
            ]);
        }
        // Calculate new stock
        const newStock = currentStock - body.qty;
        // Build notes with reason
        const reasonLabels = {
            DAMAGED: 'Rusak',
            EXPIRED: 'Kedaluarsa',
            OTHER: 'Lainnya',
        };
        const reasonNote = `[${reasonLabels[body.reason]}]`;
        const fullNotes = body.notes ? `${reasonNote} ${body.notes}` : reasonNote;
        // Create movement and update stock in transaction
        const result = await prisma.$transaction(async (transaction) => {
            // Update ingredient stock (no change to avg_cost on stock out)
            await inventory_repository_1.default.updateIngredientStock(body.ingredient_id, newStock, undefined, transaction);
            // Create stock movement record (qty stored as negative for OUT)
            const movement = await inventory_repository_1.default.create({
                supplier_id: null,
                ingredient_id: body.ingredient_id,
                user_id: metadata.account_id,
                stock_type_id: stockType.stock_type_id,
                qty: -body.qty, // Negative for OUT
                unit_cost: null,
                current_stock: newStock,
                notes: fullNotes,
            }, transaction);
            return movement;
        });
        // Webhook: notify stock changed for menu availability check
        webhook_emitter_1.default.emit('stock.changed', { ingredient_ids: [body.ingredient_id] });
        // Fetch complete data with relations
        const fullMovement = await inventory_repository_1.default.findById(result.stock_movement_id);
        return fullMovement;
    }
    catch (error) {
        console.error(`--- Inventory Service Error: ${error.message}`);
        throw error;
    }
};
exports.stockOut = stockOut;
/**
 * Get stock movement history by ingredient ID
 */
const getHistoryByIngredient = async (req) => {
    try {
        const ingredientId = req.params.ingredient_id;
        const pageNumber = parseInt(req.query.batch) || 1;
        const pageSize = parseInt(req.query.size) || 10;
        const pagination = (0, pagination_utility_1.getPagination)(pageNumber, pageSize);
        // Validate ingredient exists
        const ingredient = await inventory_repository_1.default.findIngredientById(ingredientId);
        if (!ingredient) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Bahan tidak ditemukan');
        }
        const options = {
            pagination: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        };
        const filter = { ingredient_id: ingredientId };
        const [data, totalData] = await Promise.all([
            inventory_repository_1.default.findByIngredientId(ingredientId, options),
            inventory_repository_1.default.count(filter),
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
        console.error(`--- Inventory Service Error: ${error.message}`);
        throw error;
    }
};
exports.getHistoryByIngredient = getHistoryByIngredient;
/**
 * Get available stock types
 */
const getStockTypes = async () => {
    try {
        return await inventory_repository_1.default.findAllStockTypes();
    }
    catch (error) {
        console.error(`--- Inventory Service Error: ${error.message}`);
        throw error;
    }
};
exports.getStockTypes = getStockTypes;
exports.inventoryService = {
    getHistory: exports.getHistory,
    getDetail: exports.getDetail,
    stockIn: exports.stockIn,
    stockOut: exports.stockOut,
    getHistoryByIngredient: exports.getHistoryByIngredient,
    getStockTypes: exports.getStockTypes,
};
exports.default = exports.inventoryService;
//# sourceMappingURL=inventory.service.js.map