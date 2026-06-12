"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.semiIngredientService = exports.createAndProduce = exports.produce = exports.recalculateAvgCost = exports.getHPPCalculation = exports.softDelete = exports.update = exports.create = exports.getDetail = exports.getAll = exports.getAllReferences = void 0;
const error_not_found_exception_1 = require("../../../../exception/error-not-found.exception");
const error_data_already_exist_exception_1 = require("../../../../exception/error-data-already-exist.exception");
const error_validation_exception_1 = require("../../../../exception/error-validation.exception");
const postgres_connection_1 = __importDefault(require("../../../../database/postgres.connection"));
const pagination_utility_1 = require("../../../../utility/pagination.utility");
const cost_calculation_utility_1 = require("../../../../utility/cost-calculation.utility");
const metadata_info_utility_1 = require("../../../../utility/metadata-info.utility");
const ingredient_semi_repository_1 = __importDefault(require("./ingredient-semi.repository"));
const unit_measure_service_1 = __importDefault(require("../../unit-measure/unit-measure.service"));
const stock_type_repository_1 = __importDefault(require("../../stock-type/stock-type.repository"));
const ingredient_semi_composition_repository_1 = __importDefault(require("../semi/composition/ingredient-semi-composition.repository"));
const ingredient_semi_types_1 = require("./ingredient-semi.types");
const stock_type_schema_1 = require("../../stock-type/stock-type.schema");
const prisma = (0, postgres_connection_1.default)();
/**
 * Get all semi ingredients (for dropdown/selection)
 */
const getAllReferences = async () => {
    try {
        return await ingredient_semi_repository_1.default.findAllReferences();
    }
    catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.getAllReferences = getAllReferences;
/**
 * Get all semi ingredients with pagination and filters
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
            unit_id: req.query.unit_id || null,
        };
        const [data, totalData] = await Promise.all([
            ingredient_semi_repository_1.default.findAll(options, filter),
            ingredient_semi_repository_1.default.count(filter),
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
        console.error(`--- Semi Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.getAll = getAll;
/**
 * Get semi ingredient detail by ID (with compositions and HPP)
 */
const getDetail = async (req) => {
    try {
        const ingredientId = req.params.ingredient_id;
        const ingredient = await ingredient_semi_repository_1.default.findByIdWithCompositions(ingredientId);
        if (!ingredient) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }
        // Calculate total HPP from compositions
        const recipeItems = ingredient.child_compositions.map((c) => ({
            ingredient_id: c.child_id,
            qty_needed: Number(c.qty_needed),
            avg_cost: Number(c.child_ingredient.avg_cost),
        }));
        const totalHPP = (0, cost_calculation_utility_1.roundCurrency)((0, cost_calculation_utility_1.calculateHPP)(recipeItems));
        return {
            ...ingredient,
            total_hpp: totalHPP,
        };
    }
    catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.getDetail = getDetail;
/**
 * Create new semi ingredient
 */
const create = async (req) => {
    try {
        const body = req.body;
        // Check if name already exists
        const existingIngredient = await ingredient_semi_repository_1.default.findByName(body.name);
        if (existingIngredient) {
            throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Nama bahan setengah jadi sudah digunakan');
        }
        // Validate unit_id exists
        const unitMeasure = await unit_measure_service_1.default.findById(body.unit_id);
        if (!unitMeasure) {
            throw new error_validation_exception_1.ErrorValidationException('Satuan tidak ditemukan', [
                { location: 'body', field: 'unit_id', message: 'Satuan tidak ditemukan' },
            ]);
        }
        // Create semi ingredient in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const ingredient = await ingredient_semi_repository_1.default.create({
                name: body.name,
                unit_id: body.unit_id,
                type: ingredient_semi_types_1.IngredientType.SEMI,
                stock_qty: 0, // Start with 0 stock
                min_stock: body.min_stock,
                avg_cost: 0, // Will be calculated when compositions are added
            }, transaction);
            return ingredient;
        });
        return result;
    }
    catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.create = create;
/**
 * Update semi ingredient by ID
 */
const update = async (req) => {
    try {
        const ingredientId = req.params.ingredient_id;
        const body = req.body;
        // Check if ingredient exists
        const existingIngredient = await ingredient_semi_repository_1.default.findById(ingredientId);
        if (!existingIngredient) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }
        // Check if name already used by another ingredient
        if (body.name) {
            const duplicateIngredient = await ingredient_semi_repository_1.default.findByName(body.name, ingredientId);
            if (duplicateIngredient) {
                throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Nama bahan setengah jadi sudah digunakan');
            }
        }
        // Validate unit_id if provided
        if (body.unit_id) {
            const unitMeasure = await unit_measure_service_1.default.findById(body.unit_id);
            if (!unitMeasure) {
                throw new error_validation_exception_1.ErrorValidationException('Satuan tidak ditemukan', [
                    { location: 'body', field: 'unit_id', message: 'Satuan tidak ditemukan' },
                ]);
            }
        }
        // Prepare update data
        const updateData = {};
        if (body.name)
            updateData.name = body.name;
        if (body.unit_id)
            updateData.unit_id = body.unit_id;
        if (body.min_stock !== undefined)
            updateData.min_stock = body.min_stock;
        // Update in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const ingredient = await ingredient_semi_repository_1.default.update(ingredientId, updateData, transaction);
            return ingredient;
        });
        return result;
    }
    catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.update = update;
/**
 * Soft delete semi ingredient by ID
 */
const softDelete = async (req) => {
    try {
        const ingredientId = req.params.ingredient_id;
        // Check if ingredient exists
        const existingIngredient = await ingredient_semi_repository_1.default.findById(ingredientId);
        if (!existingIngredient) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }
        // Soft delete in transaction
        await prisma.$transaction(async (transaction) => {
            await ingredient_semi_repository_1.default.softDelete(ingredientId, transaction);
        });
        return {
            success: true,
            message: 'Bahan setengah jadi berhasil dihapus',
        };
    }
    catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.softDelete = softDelete;
/**
 * Get HPP calculation for a semi ingredient
 */
const getHPPCalculation = async (ingredientId, targetYield = 1) => {
    try {
        const ingredient = await ingredient_semi_repository_1.default.findByIdWithCompositions(ingredientId);
        if (!ingredient) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }
        const compositions = ingredient.child_compositions.map((c) => ({
            ingredient_id: c.child_id,
            ingredient_name: c.child_ingredient.name,
            qty_needed: Number(c.qty_needed),
            unit_name: c.child_ingredient.unit.name,
            unit_cost: Number(c.child_ingredient.avg_cost),
            subtotal: (0, cost_calculation_utility_1.roundCurrency)(Number(c.qty_needed) * Number(c.child_ingredient.avg_cost)),
        }));
        const recipeItems = compositions.map((c) => ({
            ingredient_id: c.ingredient_id,
            qty_needed: c.qty_needed,
            avg_cost: c.unit_cost,
        }));
        const totalHPP = (0, cost_calculation_utility_1.roundCurrency)((0, cost_calculation_utility_1.calculateHPP)(recipeItems));
        const hppPerUnit = (0, cost_calculation_utility_1.roundCurrency)(totalHPP / targetYield);
        return {
            total_hpp: totalHPP,
            target_yield: targetYield,
            hpp_per_unit: hppPerUnit,
            composition_count: compositions.length,
            compositions: compositions.map((c) => ({
                ingredient_name: c.ingredient_name,
                qty_needed: c.qty_needed,
                unit_name: c.unit_name,
                unit_cost: c.unit_cost,
                subtotal: c.subtotal,
            })),
        };
    }
    catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.getHPPCalculation = getHPPCalculation;
/**
 * Recalculate and update avg_cost (HPP per unit) for a semi ingredient
 */
const recalculateAvgCost = async (ingredientId, targetYield = 1) => {
    try {
        const hppResult = await (0, exports.getHPPCalculation)(ingredientId, targetYield);
        await prisma.$transaction(async (transaction) => {
            await ingredient_semi_repository_1.default.updateAvgCost(ingredientId, hppResult.hpp_per_unit, transaction);
        });
        return hppResult.hpp_per_unit;
    }
    catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.recalculateAvgCost = recalculateAvgCost;
/**
 * Produce semi ingredient — deduct child ingredients stock and increment semi ingredient stock
 */
const produce = async (req) => {
    try {
        const ingredientId = req.params.ingredient_id;
        const body = req.body;
        const metadata = (0, metadata_info_utility_1.getMetadataInfo)(req);
        if (!metadata.account_id) {
            throw new error_validation_exception_1.ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }
        // 1. Ambil data bahan semi + komposisi + stock_qty child
        const ingredient = await ingredient_semi_repository_1.default.findByIdWithCompositionsAndStock(ingredientId);
        // 2. Guard: tidak ditemukan
        if (!ingredient) {
            throw new error_not_found_exception_1.ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }
        // 3. Guard: tidak punya komposisi
        if (ingredient.child_compositions.length === 0) {
            throw new error_validation_exception_1.ErrorValidationException('Bahan setengah jadi belum memiliki komposisi', [
                { location: 'body', field: 'ingredient_id', message: 'Bahan setengah jadi belum memiliki komposisi' },
            ]);
        }
        // 4. Hitung kebutuhan total per bahan penyusun
        const insufficientItems = [];
        for (const composition of ingredient.child_compositions) {
            const qtyNeededTotal = Number(composition.qty_needed) * body.qty;
            const available = Number(composition.child_ingredient.stock_qty);
            if (available < qtyNeededTotal) {
                insufficientItems.push({
                    ingredient_name: composition.child_ingredient.name,
                    needed: qtyNeededTotal,
                    available,
                });
            }
        }
        // 5 & 6. Guard: ada stok yang kurang
        if (insufficientItems.length > 0) {
            throw new error_validation_exception_1.ErrorValidationException('Stok bahan penyusun tidak mencukupi', [
                {
                    location: 'body',
                    field: 'qty',
                    message: 'Stok bahan penyusun tidak mencukupi',
                },
                ...insufficientItems.map((item) => ({
                    location: 'body',
                    field: item.ingredient_name,
                    message: `Dibutuhkan: ${item.needed}, tersedia: ${item.available}`,
                })),
            ]);
        }
        // Lookup stock types sebelum transaksi (pola dari inventory.service & opname.service)
        const [stockTypeOut, stockTypeIn] = await Promise.all([
            stock_type_repository_1.default.findByName(stock_type_schema_1.StockTypeName.OUT_PRODUCTION),
            stock_type_repository_1.default.findByName(stock_type_schema_1.StockTypeName.IN_PRODUCTION),
        ]);
        if (!stockTypeOut) {
            throw new error_validation_exception_1.ErrorValidationException('Tipe stok OUT_PRODUCTION tidak ditemukan', [
                { location: 'system', field: 'stock_type', message: 'Konfigurasi tipe stok tidak valid' },
            ]);
        }
        if (!stockTypeIn) {
            throw new error_validation_exception_1.ErrorValidationException('Tipe stok IN_PRODUCTION tidak ditemukan', [
                { location: 'system', field: 'stock_type', message: 'Konfigurasi tipe stok tidak valid' },
            ]);
        }
        // 7. Eksekusi dalam satu transaksi
        const deductedIngredients = [];
        await prisma.$transaction(async (transaction) => {
            // a. Untuk tiap bahan penyusun: decrement stock, INSERT stock_movement OUT
            for (const composition of ingredient.child_compositions) {
                const qtyDeducted = Number(composition.qty_needed) * body.qty;
                const currentChildStock = Number(composition.child_ingredient.stock_qty);
                const remainingStock = currentChildStock - qtyDeducted;
                // Decrement stock child ingredient
                await transaction.ingredient.update({
                    where: { ingredient_id: composition.child_ingredient.ingredient_id },
                    data: { stock_qty: remainingStock },
                });
                // Insert stock_movement OUT_PRODUCTION (qty negatif)
                await transaction.stockMovement.create({
                    data: {
                        ingredient_id: composition.child_ingredient.ingredient_id,
                        user_id: metadata.account_id,
                        stock_type_id: stockTypeOut.stock_type_id,
                        qty: -qtyDeducted,
                        current_stock: remainingStock,
                        notes: `[Produksi] ${body.notes || ''}`.trim(),
                    },
                });
                deductedIngredients.push({
                    ingredient_id: composition.child_ingredient.ingredient_id,
                    ingredient_name: composition.child_ingredient.name,
                    qty_deducted: qtyDeducted,
                    remaining_stock: remainingStock,
                });
            }
            // b. Increment stock bahan semi, INSERT stock_movement IN_PRODUCTION
            const currentSemiStock = Number(ingredient.stock_qty);
            const newSemiStock = currentSemiStock + body.qty;
            await transaction.ingredient.update({
                where: { ingredient_id: ingredientId },
                data: { stock_qty: newSemiStock },
            });
            await transaction.stockMovement.create({
                data: {
                    ingredient_id: ingredientId,
                    user_id: metadata.account_id,
                    stock_type_id: stockTypeIn.stock_type_id,
                    qty: body.qty,
                    current_stock: newSemiStock,
                    notes: `[Hasil Produksi] ${body.notes || ''}`.trim(),
                },
            });
            // c. Recalculate avg_cost bahan semi dengan target_yield = qty (jumlah unit yang diproduksi)
            const recipeItems = ingredient.child_compositions.map((c) => ({
                ingredient_id: c.child_id,
                qty_needed: Number(c.qty_needed),
                avg_cost: Number(c.child_ingredient.avg_cost),
            }));
            const totalHPP = (0, cost_calculation_utility_1.calculateHPP)(recipeItems);
            const newAvgCost = (0, cost_calculation_utility_1.roundCurrency)(totalHPP / body.qty);
            await ingredient_semi_repository_1.default.updateAvgCost(ingredientId, newAvgCost, transaction);
        });
        // 8. Ambil data terbaru bahan semi setelah transaksi
        const updatedIngredient = await ingredient_semi_repository_1.default.findById(ingredientId);
        return {
            ingredient_id: updatedIngredient.ingredient_id,
            name: updatedIngredient.name,
            type: updatedIngredient.type,
            stock_qty: Number(updatedIngredient.stock_qty),
            min_stock: Number(updatedIngredient.min_stock),
            avg_cost: Number(updatedIngredient.avg_cost),
            unit: updatedIngredient.unit,
            produced_qty: body.qty,
            deducted_ingredients: deductedIngredients,
        };
    }
    catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.produce = produce;
/**
 * Create semi ingredient and immediately produce — all-in-one atomic operation
 */
const createAndProduce = async (req) => {
    try {
        const body = req.body;
        const metadata = (0, metadata_info_utility_1.getMetadataInfo)(req);
        // 1. Guard: user tidak terautentikasi
        if (!metadata.account_id) {
            throw new error_validation_exception_1.ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }
        // 2. Validasi nama tidak duplikat
        const existingIngredient = await ingredient_semi_repository_1.default.findByName(body.name);
        if (existingIngredient) {
            throw new error_data_already_exist_exception_1.ErrorDataAlreadyExistException('Nama bahan setengah jadi sudah digunakan');
        }
        // 3. Validasi unit_id exists
        const unitMeasure = await unit_measure_service_1.default.findById(body.unit_id);
        if (!unitMeasure) {
            throw new error_validation_exception_1.ErrorValidationException('Satuan tidak ditemukan', [
                { location: 'body', field: 'unit_id', message: 'Satuan tidak ditemukan' },
            ]);
        }
        // 4. Ambil data stok + avg_cost semua child ingredient sekaligus
        const childIds = body.compositions.map((c) => c.child_id);
        const ingredientDataList = await ingredient_semi_repository_1.default.findIngredientsByIds(childIds);
        // 5. Guard: ada child_id yang tidak ditemukan
        if (ingredientDataList.length < childIds.length) {
            const foundIds = new Set(ingredientDataList.map((i) => i.ingredient_id));
            const missingIds = childIds.filter((id) => !foundIds.has(id));
            throw new error_validation_exception_1.ErrorValidationException('Beberapa bahan penyusun tidak ditemukan', [
                {
                    location: 'body',
                    field: 'compositions',
                    message: `Bahan penyusun tidak ditemukan: ${missingIds.join(', ')}`,
                },
            ]);
        }
        // Guard: compositions kosong (sudah dicek schema, tapi tetap guard di service)
        if (body.compositions.length === 0) {
            throw new error_validation_exception_1.ErrorValidationException('Komposisi tidak boleh kosong', [
                { location: 'body', field: 'compositions', message: 'Minimal satu komposisi diperlukan' },
            ]);
        }
        // Build a map untuk lookup cepat
        const ingredientMap = new Map(ingredientDataList.map((i) => [i.ingredient_id, i]));
        // 6 & 7. Hitung kebutuhan total dan kumpulkan SEMUA yang kurang stok
        const insufficientItems = [];
        for (const comp of body.compositions) {
            const ingredientData = ingredientMap.get(comp.child_id);
            const qtyNeededTotal = comp.qty_needed * body.qty;
            if (ingredientData.stock_qty < qtyNeededTotal) {
                insufficientItems.push({
                    ingredient_name: ingredientData.name,
                    needed: qtyNeededTotal,
                    available: ingredientData.stock_qty,
                });
            }
        }
        // 8. Guard: ada stok kurang → throw dengan detail semua bahan
        if (insufficientItems.length > 0) {
            throw new error_validation_exception_1.ErrorValidationException('Stok bahan penyusun tidak mencukupi', [
                {
                    location: 'body',
                    field: 'qty',
                    message: 'Stok bahan penyusun tidak mencukupi',
                },
                ...insufficientItems.map((item) => ({
                    location: 'body',
                    field: item.ingredient_name,
                    message: `Dibutuhkan: ${item.needed}, tersedia: ${item.available}`,
                })),
            ]);
        }
        // Lookup stock types sebelum transaksi (pola dari inventory.service.ts)
        const [stockTypeOut, stockTypeIn] = await Promise.all([
            stock_type_repository_1.default.findByName(stock_type_schema_1.StockTypeName.OUT_PRODUCTION),
            stock_type_repository_1.default.findByName(stock_type_schema_1.StockTypeName.IN_PRODUCTION),
        ]);
        if (!stockTypeOut) {
            throw new error_validation_exception_1.ErrorValidationException('Tipe stok OUT_PRODUCTION tidak ditemukan', [
                { location: 'system', field: 'stock_type', message: 'Konfigurasi tipe stok tidak valid' },
            ]);
        }
        if (!stockTypeIn) {
            throw new error_validation_exception_1.ErrorValidationException('Tipe stok IN_PRODUCTION tidak ditemukan', [
                { location: 'system', field: 'stock_type', message: 'Konfigurasi tipe stok tidak valid' },
            ]);
        }
        // 9. Semua operasi DB dalam satu transaksi
        const deductedIngredients = [];
        let newIngredientId;
        await prisma.$transaction(async (transaction) => {
            // a. CREATE ingredient baru (type SEMI, stock_qty=0, avg_cost=0)
            const newIngredient = await ingredient_semi_repository_1.default.create({
                name: body.name,
                unit_id: body.unit_id,
                type: ingredient_semi_types_1.IngredientType.SEMI,
                stock_qty: 0,
                min_stock: body.min_stock,
                avg_cost: 0,
            }, transaction);
            newIngredientId = newIngredient.ingredient_id;
            // b. BULK CREATE compositions
            const compositionData = body.compositions.map((c) => ({
                parent_id: newIngredientId,
                child_id: c.child_id,
                qty_needed: c.qty_needed,
            }));
            await ingredient_semi_composition_repository_1.default.createMany(compositionData, transaction);
            // c. Untuk tiap bahan penyusun: decrement stock_qty, INSERT stock_movement OUT_PRODUCTION
            for (const comp of body.compositions) {
                const ingredientData = ingredientMap.get(comp.child_id);
                const qtyDeducted = comp.qty_needed * body.qty;
                const remainingStock = ingredientData.stock_qty - qtyDeducted;
                await transaction.ingredient.update({
                    where: { ingredient_id: comp.child_id },
                    data: { stock_qty: remainingStock },
                });
                await transaction.stockMovement.create({
                    data: {
                        ingredient_id: comp.child_id,
                        user_id: metadata.account_id,
                        stock_type_id: stockTypeOut.stock_type_id,
                        qty: -qtyDeducted,
                        current_stock: remainingStock,
                        notes: `[Produksi] ${body.notes || ''}`.trim(),
                    },
                });
                deductedIngredients.push({
                    ingredient_id: comp.child_id,
                    ingredient_name: ingredientData.name,
                    qty_deducted: qtyDeducted,
                    remaining_stock: remainingStock,
                });
            }
            // d. Increment stock bahan semi sebesar qty, INSERT stock_movement IN_PRODUCTION
            const newSemiStock = body.qty;
            await transaction.ingredient.update({
                where: { ingredient_id: newIngredientId },
                data: { stock_qty: newSemiStock },
            });
            await transaction.stockMovement.create({
                data: {
                    ingredient_id: newIngredientId,
                    user_id: metadata.account_id,
                    stock_type_id: stockTypeIn.stock_type_id,
                    qty: body.qty,
                    current_stock: newSemiStock,
                    notes: `[Hasil Produksi] ${body.notes || ''}`.trim(),
                },
            });
            // e. Hitung HPP: totalHPP = sum(qty_needed * avg_cost), newAvgCost = roundCurrency(totalHPP / qty)
            const recipeItems = body.compositions.map((comp) => {
                const ingredientData = ingredientMap.get(comp.child_id);
                return {
                    ingredient_id: comp.child_id,
                    qty_needed: comp.qty_needed,
                    avg_cost: ingredientData.avg_cost,
                };
            });
            const totalHPP = (0, cost_calculation_utility_1.calculateHPP)(recipeItems);
            const newAvgCost = (0, cost_calculation_utility_1.roundCurrency)(totalHPP / body.qty);
            // f. Update avg_cost bahan semi
            await ingredient_semi_repository_1.default.updateAvgCost(newIngredientId, newAvgCost, transaction);
        });
        // 10. Fetch data lengkap dengan komposisi untuk response
        const finalIngredient = await ingredient_semi_repository_1.default.findByIdWithCompositions(newIngredientId);
        return {
            ingredient_id: finalIngredient.ingredient_id,
            name: finalIngredient.name,
            type: finalIngredient.type,
            stock_qty: Number(finalIngredient.stock_qty),
            min_stock: Number(finalIngredient.min_stock),
            avg_cost: Number(finalIngredient.avg_cost),
            unit: finalIngredient.unit,
            produced_qty: body.qty,
            compositions: finalIngredient.child_compositions,
            deducted_ingredients: deductedIngredients,
        };
    }
    catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${error.message}`);
        throw error;
    }
};
exports.createAndProduce = createAndProduce;
exports.semiIngredientService = {
    getAllReferences: exports.getAllReferences,
    getAll: exports.getAll,
    getDetail: exports.getDetail,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
    getHPPCalculation: exports.getHPPCalculation,
    recalculateAvgCost: exports.recalculateAvgCost,
    produce: exports.produce,
    createAndProduce: exports.createAndProduce,
};
exports.default = exports.semiIngredientService;
//# sourceMappingURL=ingredient-semi.service.js.map