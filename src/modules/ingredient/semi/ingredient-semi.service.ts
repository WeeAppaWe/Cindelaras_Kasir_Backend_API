import { ErrorNotFoundException } from '../../../../exception/error-not-found.exception';
import { ErrorDataAlreadyExistException } from '../../../../exception/error-data-already-exist.exception';
import { ErrorValidationException } from '../../../../exception/error-validation.exception';
import getPrismaClient from '../../../../database/postgres.connection';
import { getPagination } from '../../../../utility/pagination.utility';
import { calculateHPP, roundCurrency } from '../../../../utility/cost-calculation.utility';
import { getMetadataInfo } from '../../../../utility/metadata-info.utility';
import { AuthenticatedRequest } from '../../../../types';
import semiIngredientRepository from './ingredient-semi.repository';
import unitMeasureService from '../../unit-measure/unit-measure.service';
import stockTypeRepository from '../../stock-type/stock-type.repository';
import compositionRepository from '../semi/composition/ingredient-semi-composition.repository';
import {
    CreateSemiIngredientRequest,
    UpdateSemiIngredientRequest,
    SemiIngredientListResponse,
    SemiIngredientWithRelations,
    SemiIngredientWithCompositions,
    DeleteSemiIngredientResponse,
    SemiIngredientHPPResult,
    IngredientType,
    ProduceSemiIngredientRequest,
    ProduceSemiIngredientResult,
    CreateAndProduceSemiIngredientRequest,
    CreateAndProduceSemiIngredientResult,
} from './ingredient-semi.types';
import { StockTypeName } from '../../stock-type/stock-type.schema';

const prisma = getPrismaClient();

/**
 * Get all semi ingredients with pagination and filters
 */
export const getAll = async (req: AuthenticatedRequest): Promise<SemiIngredientListResponse> => {
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
            unit_id: (req.query.unit_id as string) || null,
        };

        const [data, totalData] = await Promise.all([
            semiIngredientRepository.findAll(options, filter),
            semiIngredientRepository.count(filter),
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
        console.error(`--- Semi Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get semi ingredient detail by ID (with compositions and HPP)
 */
export const getDetail = async (req: AuthenticatedRequest): Promise<SemiIngredientWithCompositions> => {
    try {
        const ingredientId = req.params.ingredient_id;

        const ingredient = await semiIngredientRepository.findByIdWithCompositions(ingredientId);

        if (!ingredient) {
            throw new ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }

        // Calculate total HPP from compositions
        const recipeItems = ingredient.child_compositions.map((c) => ({
            ingredient_id: c.child_id,
            qty_needed: Number(c.qty_needed),
            avg_cost: Number(c.child_ingredient.avg_cost),
        }));

        const totalHPP = roundCurrency(calculateHPP(recipeItems));

        return {
            ...ingredient,
            total_hpp: totalHPP,
        };
    } catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Create new semi ingredient
 */
export const create = async (req: AuthenticatedRequest): Promise<SemiIngredientWithRelations> => {
    try {
        const body: CreateSemiIngredientRequest = req.body;

        // Check if name already exists
        const existingIngredient = await semiIngredientRepository.findByName(body.name);
        if (existingIngredient) {
            throw new ErrorDataAlreadyExistException('Nama bahan setengah jadi sudah digunakan');
        }

        // Validate unit_id exists
        const unitMeasure = await unitMeasureService.findById(body.unit_id);
        if (!unitMeasure) {
            throw new ErrorValidationException('Satuan tidak ditemukan', [
                { location: 'body', field: 'unit_id', message: 'Satuan tidak ditemukan' },
            ]);
        }

        // Create semi ingredient in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const ingredient = await semiIngredientRepository.create(
                {
                    name: body.name,
                    unit_id: body.unit_id,
                    type: IngredientType.SEMI,
                    stock_qty: 0, // Start with 0 stock
                    min_stock: body.min_stock,
                    avg_cost: 0, // Will be calculated when compositions are added
                },
                transaction
            );

            return ingredient;
        });

        return result;
    } catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Update semi ingredient by ID
 */
export const update = async (req: AuthenticatedRequest): Promise<SemiIngredientWithRelations> => {
    try {
        const ingredientId = req.params.ingredient_id;
        const body: UpdateSemiIngredientRequest = req.body;

        // Check if ingredient exists
        const existingIngredient = await semiIngredientRepository.findById(ingredientId);
        if (!existingIngredient) {
            throw new ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }

        // Check if name already used by another ingredient
        if (body.name) {
            const duplicateIngredient = await semiIngredientRepository.findByName(body.name, ingredientId);
            if (duplicateIngredient) {
                throw new ErrorDataAlreadyExistException('Nama bahan setengah jadi sudah digunakan');
            }
        }

        // Validate unit_id if provided
        if (body.unit_id) {
            const unitMeasure = await unitMeasureService.findById(body.unit_id);
            if (!unitMeasure) {
                throw new ErrorValidationException('Satuan tidak ditemukan', [
                    { location: 'body', field: 'unit_id', message: 'Satuan tidak ditemukan' },
                ]);
            }
        }

        // Prepare update data
        const updateData: {
            name?: string;
            unit_id?: string;
            min_stock?: number;
        } = {};

        if (body.name) updateData.name = body.name;
        if (body.unit_id) updateData.unit_id = body.unit_id;
        if (body.min_stock !== undefined) updateData.min_stock = body.min_stock;

        // Update in transaction
        const result = await prisma.$transaction(async (transaction) => {
            const ingredient = await semiIngredientRepository.update(ingredientId, updateData, transaction);
            return ingredient;
        });

        return result;
    } catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Soft delete semi ingredient by ID
 */
export const softDelete = async (req: AuthenticatedRequest): Promise<DeleteSemiIngredientResponse> => {
    try {
        const ingredientId = req.params.ingredient_id;

        // Check if ingredient exists
        const existingIngredient = await semiIngredientRepository.findById(ingredientId);
        if (!existingIngredient) {
            throw new ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }

        // Soft delete in transaction
        await prisma.$transaction(async (transaction) => {
            await semiIngredientRepository.softDelete(ingredientId, transaction);
        });

        return {
            success: true,
            message: 'Bahan setengah jadi berhasil dihapus',
        };
    } catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Get HPP calculation for a semi ingredient
 */
export const getHPPCalculation = async (
    ingredientId: string,
    targetYield: number = 1
): Promise<SemiIngredientHPPResult> => {
    try {
        const ingredient = await semiIngredientRepository.findByIdWithCompositions(ingredientId);

        if (!ingredient) {
            throw new ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }

        const compositions = ingredient.child_compositions.map((c) => ({
            ingredient_id: c.child_id,
            ingredient_name: c.child_ingredient.name,
            qty_needed: Number(c.qty_needed),
            unit_name: c.child_ingredient.unit.name,
            unit_cost: Number(c.child_ingredient.avg_cost),
            subtotal: roundCurrency(Number(c.qty_needed) * Number(c.child_ingredient.avg_cost)),
        }));

        const recipeItems = compositions.map((c) => ({
            ingredient_id: c.ingredient_id,
            qty_needed: c.qty_needed,
            avg_cost: c.unit_cost,
        }));

        const totalHPP = roundCurrency(calculateHPP(recipeItems));
        const hppPerUnit = roundCurrency(totalHPP / targetYield);

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
    } catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Recalculate and update avg_cost (HPP per unit) for a semi ingredient
 */
export const recalculateAvgCost = async (
    ingredientId: string,
    targetYield: number = 1
): Promise<number> => {
    try {
        const hppResult = await getHPPCalculation(ingredientId, targetYield);

        await prisma.$transaction(async (transaction) => {
            await semiIngredientRepository.updateAvgCost(ingredientId, hppResult.hpp_per_unit, transaction);
        });

        return hppResult.hpp_per_unit;
    } catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Produce semi ingredient — deduct child ingredients stock and increment semi ingredient stock
 */
export const produce = async (req: AuthenticatedRequest): Promise<ProduceSemiIngredientResult> => {
    try {
        const ingredientId = req.params.ingredient_id;
        const body: ProduceSemiIngredientRequest = req.body;
        const metadata = getMetadataInfo(req);

        if (!metadata.account_id) {
            throw new ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }

        // 1. Ambil data bahan semi + komposisi + stock_qty child
        const ingredient = await semiIngredientRepository.findByIdWithCompositionsAndStock(ingredientId);

        // 2. Guard: tidak ditemukan
        if (!ingredient) {
            throw new ErrorNotFoundException('Bahan setengah jadi tidak ditemukan');
        }

        // 3. Guard: tidak punya komposisi
        if (ingredient.child_compositions.length === 0) {
            throw new ErrorValidationException('Bahan setengah jadi belum memiliki komposisi', [
                { location: 'body', field: 'ingredient_id', message: 'Bahan setengah jadi belum memiliki komposisi' },
            ]);
        }

        // 4. Hitung kebutuhan total per bahan penyusun
        const insufficientItems: { ingredient_name: string; needed: number; available: number }[] = [];

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
            throw new ErrorValidationException('Stok bahan penyusun tidak mencukupi', [
                {
                    location: 'body',
                    field: 'qty',
                    message: 'Stok bahan penyusun tidak mencukupi',
                },
                ...insufficientItems.map((item) => ({
                    location: 'body' as const,
                    field: item.ingredient_name,
                    message: `Dibutuhkan: ${item.needed}, tersedia: ${item.available}`,
                })),
            ]);
        }

        // Lookup stock types sebelum transaksi (pola dari inventory.service & opname.service)
        const [stockTypeOut, stockTypeIn] = await Promise.all([
            stockTypeRepository.findByName(StockTypeName.OUT_PRODUCTION),
            stockTypeRepository.findByName(StockTypeName.IN_PRODUCTION),
        ]);

        if (!stockTypeOut) {
            throw new ErrorValidationException('Tipe stok OUT_PRODUCTION tidak ditemukan', [
                { location: 'system', field: 'stock_type', message: 'Konfigurasi tipe stok tidak valid' },
            ]);
        }

        if (!stockTypeIn) {
            throw new ErrorValidationException('Tipe stok IN_PRODUCTION tidak ditemukan', [
                { location: 'system', field: 'stock_type', message: 'Konfigurasi tipe stok tidak valid' },
            ]);
        }

        // 7. Eksekusi dalam satu transaksi
        const deductedIngredients: ProduceSemiIngredientResult['deducted_ingredients'] = [];

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
            const recipeItems = ingredient.child_compositions.map((c: any) => ({
                ingredient_id: c.child_id,
                qty_needed: Number(c.qty_needed),
                avg_cost: Number(c.child_ingredient.avg_cost),
            }));

            const totalHPP = calculateHPP(recipeItems);
            const newAvgCost = roundCurrency(totalHPP / body.qty);

            await semiIngredientRepository.updateAvgCost(ingredientId, newAvgCost, transaction);
        });

        // 8. Ambil data terbaru bahan semi setelah transaksi
        const updatedIngredient = await semiIngredientRepository.findById(ingredientId);

        return {
            ingredient_id: updatedIngredient!.ingredient_id,
            name: updatedIngredient!.name,
            type: updatedIngredient!.type,
            stock_qty: Number(updatedIngredient!.stock_qty),
            min_stock: Number(updatedIngredient!.min_stock),
            avg_cost: Number(updatedIngredient!.avg_cost),
            unit: updatedIngredient!.unit,
            produced_qty: body.qty,
            deducted_ingredients: deductedIngredients,
        };
    } catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

/**
 * Create semi ingredient and immediately produce — all-in-one atomic operation
 */
export const createAndProduce = async (req: AuthenticatedRequest): Promise<CreateAndProduceSemiIngredientResult> => {
    try {
        const body: CreateAndProduceSemiIngredientRequest = req.body;
        const metadata = getMetadataInfo(req);

        // 1. Guard: user tidak terautentikasi
        if (!metadata.account_id) {
            throw new ErrorValidationException('User tidak terautentikasi', [
                { location: 'auth', field: 'user_id', message: 'User ID tidak ditemukan' },
            ]);
        }

        // 2. Validasi nama tidak duplikat
        const existingIngredient = await semiIngredientRepository.findByName(body.name);
        if (existingIngredient) {
            throw new ErrorDataAlreadyExistException('Nama bahan setengah jadi sudah digunakan');
        }

        // 3. Validasi unit_id exists
        const unitMeasure = await unitMeasureService.findById(body.unit_id);
        if (!unitMeasure) {
            throw new ErrorValidationException('Satuan tidak ditemukan', [
                { location: 'body', field: 'unit_id', message: 'Satuan tidak ditemukan' },
            ]);
        }

        // 4. Ambil data stok + avg_cost semua child ingredient sekaligus
        const childIds = body.compositions.map((c) => c.child_id);
        const ingredientDataList = await semiIngredientRepository.findIngredientsByIds(childIds);

        // 5. Guard: ada child_id yang tidak ditemukan
        if (ingredientDataList.length < childIds.length) {
            const foundIds = new Set(ingredientDataList.map((i) => i.ingredient_id));
            const missingIds = childIds.filter((id) => !foundIds.has(id));
            throw new ErrorValidationException('Beberapa bahan penyusun tidak ditemukan', [
                {
                    location: 'body',
                    field: 'compositions',
                    message: `Bahan penyusun tidak ditemukan: ${missingIds.join(', ')}`,
                },
            ]);
        }

        // Guard: compositions kosong (sudah dicek schema, tapi tetap guard di service)
        if (body.compositions.length === 0) {
            throw new ErrorValidationException('Komposisi tidak boleh kosong', [
                { location: 'body', field: 'compositions', message: 'Minimal satu komposisi diperlukan' },
            ]);
        }

        // Build a map untuk lookup cepat
        const ingredientMap = new Map(ingredientDataList.map((i) => [i.ingredient_id, i]));

        // 6 & 7. Hitung kebutuhan total dan kumpulkan SEMUA yang kurang stok
        const insufficientItems: { ingredient_name: string; needed: number; available: number }[] = [];

        for (const comp of body.compositions) {
            const ingredientData = ingredientMap.get(comp.child_id)!;
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
            throw new ErrorValidationException('Stok bahan penyusun tidak mencukupi', [
                {
                    location: 'body',
                    field: 'qty',
                    message: 'Stok bahan penyusun tidak mencukupi',
                },
                ...insufficientItems.map((item) => ({
                    location: 'body' as const,
                    field: item.ingredient_name,
                    message: `Dibutuhkan: ${item.needed}, tersedia: ${item.available}`,
                })),
            ]);
        }

        // Lookup stock types sebelum transaksi (pola dari inventory.service.ts)
        const [stockTypeOut, stockTypeIn] = await Promise.all([
            stockTypeRepository.findByName(StockTypeName.OUT_PRODUCTION),
            stockTypeRepository.findByName(StockTypeName.IN_PRODUCTION),
        ]);

        if (!stockTypeOut) {
            throw new ErrorValidationException('Tipe stok OUT_PRODUCTION tidak ditemukan', [
                { location: 'system', field: 'stock_type', message: 'Konfigurasi tipe stok tidak valid' },
            ]);
        }

        if (!stockTypeIn) {
            throw new ErrorValidationException('Tipe stok IN_PRODUCTION tidak ditemukan', [
                { location: 'system', field: 'stock_type', message: 'Konfigurasi tipe stok tidak valid' },
            ]);
        }

        // 9. Semua operasi DB dalam satu transaksi
        const deductedIngredients: CreateAndProduceSemiIngredientResult['deducted_ingredients'] = [];
        let newIngredientId: string;

        await prisma.$transaction(async (transaction) => {
            // a. CREATE ingredient baru (type SEMI, stock_qty=0, avg_cost=0)
            const newIngredient = await semiIngredientRepository.create(
                {
                    name: body.name,
                    unit_id: body.unit_id,
                    type: IngredientType.SEMI,
                    stock_qty: 0,
                    min_stock: body.min_stock,
                    avg_cost: 0,
                },
                transaction
            );

            newIngredientId = newIngredient.ingredient_id;

            // b. BULK CREATE compositions
            const compositionData = body.compositions.map((c) => ({
                parent_id: newIngredientId,
                child_id: c.child_id,
                qty_needed: c.qty_needed,
            }));
            await compositionRepository.createMany(compositionData, transaction);

            // c. Untuk tiap bahan penyusun: decrement stock_qty, INSERT stock_movement OUT_PRODUCTION
            for (const comp of body.compositions) {
                const ingredientData = ingredientMap.get(comp.child_id)!;
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
                const ingredientData = ingredientMap.get(comp.child_id)!;
                return {
                    ingredient_id: comp.child_id,
                    qty_needed: comp.qty_needed,
                    avg_cost: ingredientData.avg_cost,
                };
            });

            const totalHPP = calculateHPP(recipeItems);
            const newAvgCost = roundCurrency(totalHPP / body.qty);

            // f. Update avg_cost bahan semi
            await semiIngredientRepository.updateAvgCost(newIngredientId, newAvgCost, transaction);
        });

        // 10. Fetch data lengkap dengan komposisi untuk response
        const finalIngredient = await semiIngredientRepository.findByIdWithCompositions(newIngredientId!);

        return {
            ingredient_id: finalIngredient!.ingredient_id,
            name: finalIngredient!.name,
            type: finalIngredient!.type,
            stock_qty: Number(finalIngredient!.stock_qty),
            min_stock: Number(finalIngredient!.min_stock),
            avg_cost: Number(finalIngredient!.avg_cost),
            unit: finalIngredient!.unit,
            produced_qty: body.qty,
            compositions: finalIngredient!.child_compositions,
            deducted_ingredients: deductedIngredients,
        };
    } catch (error) {
        console.error(`--- Semi Ingredient Service Error: ${(error as Error).message}`);
        throw error;
    }
};

export const semiIngredientService = {
    getAll,
    getDetail,
    create,
    update,
    softDelete,
    getHPPCalculation,
    recalculateAvgCost,
    produce,
    createAndProduce,
};

export default semiIngredientService;
