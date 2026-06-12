import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import { ErrorValidationException } from '../../../exception/error-validation.exception';
import getPrismaClient from '../../../database/postgres.connection';
import { getPagination } from '../../../utility/pagination.utility';
import { roundCurrency } from '../../../utility/cost-calculation.utility';
import { getMetadataInfo } from '../../../utility/metadata-info.utility';
import { AuthenticatedRequest } from '../../../types';
import inventoryRepository from './inventory.repository';
import stockTypeRepository from '../stock-type/stock-type.repository';
import {
    StockInRequest,
    StockOutRequest,
    StockMovementListResponse,
    StockMovementWithDetails,
    StockTypeData,
} from './inventory.types';
import { StockTypeName } from '../stock-type/stock-type.schema';

const prisma = getPrismaClient();

/**
 * Get all stock movements with pagination and filters (Riwayat Stok)
 */
export const getHistory = async (req: AuthenticatedRequest): Promise<StockMovementListResponse> => {
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

        const filter = {
            search: (req.query.search as string) || null,
            ingredient_id: (req.query.ingredient_id as string) || null,
            supplier_id: (req.query.supplier_id as string) || null,
            stock_type_id: (req.query.stock_type_id as string) || null,
            date_from: req.query.date_from ? new Date(req.query.date_from as string) : null,
            date_to: req.query.date_to ? new Date(req.query.date_to as string) : null,
        };

        const [data, totalData] = await Promise.all([
            inventoryRepository.findAll(options, filter),
            inventoryRepository.count(filter),
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
    } catch (error) {
        console.error(`--- Inventory Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get stock movement detail by ID
 */
export const getDetail = async (req: AuthenticatedRequest): Promise<StockMovementWithDetails> => {
    try {
        const stockMovementId = req.params.stock_movement_id;

        const movement = await inventoryRepository.findById(stockMovementId);

        if (!movement) {
            throw new ErrorNotFoundException('Pergerakan stok tidak ditemukan');
        }

        return movement;
    } catch (error) {
        console.error(`--- Inventory Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Stock IN - Barang masuk dari supplier
 */
export const stockIn = async (req: AuthenticatedRequest): Promise<StockMovementWithDetails> => {
    try {
        const body: StockInRequest = req.body;
        const metadata = getMetadataInfo(req);

        if (!metadata.account_id) {
            throw new ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }

        // Validate ingredient exists
        const ingredient = await inventoryRepository.findIngredientById(body.ingredient_id);
        if (!ingredient) {
            throw new ErrorValidationException('Bahan tidak ditemukan', [
                { location: 'body', field: 'ingredient_id', message: 'Bahan tidak ditemukan' },
            ]);
        }

        // Validate supplier exists
        const supplier = await inventoryRepository.findSupplierById(body.supplier_id);
        if (!supplier) {
            throw new ErrorValidationException('Supplier tidak ditemukan', [
                { location: 'body', field: 'supplier_id', message: 'Supplier tidak ditemukan' },
            ]);
        }

        // Get stock type IN_PURCHASE
        const stockType = await stockTypeRepository.findByName(StockTypeName.IN_PURCHASE);
        if (!stockType) {
            throw new ErrorValidationException('Tipe stok IN tidak ditemukan', [
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
        const newAvgCost =
            newStock > 0
                ? roundCurrency((currentStock * currentAvgCost + incomingQty * incomingCost) / newStock)
                : incomingCost;

        // Create movement and update stock in transaction
        const result = await prisma.$transaction(async (transaction) => {
            // Update ingredient stock
            await inventoryRepository.updateIngredientStock(
                body.ingredient_id,
                newStock,
                newAvgCost,
                transaction
            );

            // Create stock movement record
            const movement = await inventoryRepository.create(
                {
                    supplier_id: body.supplier_id,
                    ingredient_id: body.ingredient_id,
                    user_id: metadata.account_id,
                    stock_type_id: stockType.stock_type_id,
                    qty: incomingQty,
                    unit_cost: incomingCost,
                    current_stock: newStock,
                    notes: body.notes || null,
                },
                transaction
            );

            return movement;
        });

        // Fetch complete data with relations
        const fullMovement = await inventoryRepository.findById(result.stock_movement_id);
        return fullMovement!;
    } catch (error) {
        console.error(`--- Inventory Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Stock OUT - Barang keluar (rusak/kedaluarsa)
 */
export const stockOut = async (req: AuthenticatedRequest): Promise<StockMovementWithDetails> => {
    try {
        const body: StockOutRequest = req.body;
        const metadata = getMetadataInfo(req);

        if (!metadata.account_id) {
            throw new ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }

        // Validate ingredient exists
        const ingredient = await inventoryRepository.findIngredientById(body.ingredient_id);
        if (!ingredient) {
            throw new ErrorValidationException('Bahan tidak ditemukan', [
                { location: 'body', field: 'ingredient_id', message: 'Bahan tidak ditemukan' },
            ]);
        }

        // Check if enough stock
        const currentStock = Number(ingredient.stock_qty);
        if (currentStock < body.qty) {
            throw new ErrorValidationException('Stok tidak mencukupi', [
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
            ? StockTypeName.OUT_EXPIRED
            : StockTypeName.OUT_DAMAGED;
        const stockType = await stockTypeRepository.findByName(stockTypeName);
        if (!stockType) {
            throw new ErrorValidationException('Tipe stok OUT tidak ditemukan', [
                { location: 'system', field: 'stock_type', message: 'Konfigurasi tipe stok tidak valid' },
            ]);
        }

        // Calculate new stock
        const newStock = currentStock - body.qty;

        // Build notes with reason
        const reasonLabels: Record<string, string> = {
            DAMAGED: 'Rusak',
            EXPIRED: 'Kedaluarsa',
            OTHER: 'Lainnya',
        };
        const reasonNote = `[${reasonLabels[body.reason]}]`;
        const fullNotes = body.notes ? `${reasonNote} ${body.notes}` : reasonNote;

        // Create movement and update stock in transaction
        const result = await prisma.$transaction(async (transaction) => {
            // Update ingredient stock (no change to avg_cost on stock out)
            await inventoryRepository.updateIngredientStock(body.ingredient_id, newStock, undefined, transaction);

            // Create stock movement record (qty stored as negative for OUT)
            const movement = await inventoryRepository.create(
                {
                    supplier_id: null,
                    ingredient_id: body.ingredient_id,
                    user_id: metadata.account_id,
                    stock_type_id: stockType.stock_type_id,
                    qty: -body.qty, // Negative for OUT
                    unit_cost: null,
                    current_stock: newStock,
                    notes: fullNotes,
                },
                transaction
            );

            return movement;
        });

        // Fetch complete data with relations
        const fullMovement = await inventoryRepository.findById(result.stock_movement_id);
        return fullMovement!;
    } catch (error) {
        console.error(`--- Inventory Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get stock movement history by ingredient ID
 */
export const getHistoryByIngredient = async (req: AuthenticatedRequest): Promise<StockMovementListResponse> => {
    try {
        const ingredientId = req.params.ingredient_id;
        const pageNumber = parseInt(req.query.batch as string) || 1;
        const pageSize = parseInt(req.query.size as string) || 10;
        const pagination = getPagination(pageNumber, pageSize);

        // Validate ingredient exists
        const ingredient = await inventoryRepository.findIngredientById(ingredientId);
        if (!ingredient) {
            throw new ErrorNotFoundException('Bahan tidak ditemukan');
        }

        const options = {
            pagination: {
                limit: pagination.limit,
                offset: pagination.offset,
            },
        };

        const filter = { ingredient_id: ingredientId };

        const [data, totalData] = await Promise.all([
            inventoryRepository.findByIngredientId(ingredientId, options),
            inventoryRepository.count(filter),
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
    } catch (error) {
        console.error(`--- Inventory Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get available stock types
 */
export const getStockTypes = async (): Promise<StockTypeData[]> => {
    try {
        return await inventoryRepository.findAllStockTypes();
    } catch (error) {
        console.error(`--- Inventory Service Error: ${(error as Error).message}`);
        throw error;
    }
};

export const inventoryService = {
    getHistory,
    getDetail,
    stockIn,
    stockOut,
    getHistoryByIngredient,
    getStockTypes,
};

export default inventoryService;
