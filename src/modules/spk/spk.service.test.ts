import { AuthenticatedRequest } from '../../../types';
import { runAnalysis } from './spk.service';
import spkRepository from './spk.repository';
import {
    mockOrdersWithRecipes,
    mockAllIngredients,
    mockSuppliers,
} from '../../tests/mocks/spk.mock';

// Mock dependencies
jest.mock('./spk.repository');

describe('SPK Service', () => {
    const mockRequest = {
        query: {
            target_days: '7',
            buffer_percent: '10',
            lookback_days: '30',
        },
        params: {},
        body: {},
    } as unknown as AuthenticatedRequest;

    beforeEach(() => {
        jest.clearAllMocks();

        // Default mock implementations
        (spkRepository.getOrderItemsWithRecipes as jest.Mock)
            .mockResolvedValue(mockOrdersWithRecipes);
        (spkRepository.getAllIngredients as jest.Mock)
            .mockResolvedValue(mockAllIngredients);
        (spkRepository.getLastSupplierForIngredients as jest.Mock)
            .mockResolvedValue(mockSuppliers);
    });

    // ============================================
    // RUN ANALYSIS TESTS
    // ============================================

    describe('runAnalysis', () => {
        it('should return SPK analysis response', async () => {
            const result = await runAnalysis(mockRequest);

            expect(result.config).toBeDefined();
            expect(result.config.target_days).toBe(7);
            expect(result.config.buffer_percent).toBe(10);
            expect(result.config.lookback_days).toBe(30);
        });

        it('should include analysis date and lookback period', async () => {
            const result = await runAnalysis(mockRequest);

            expect(result.analysis_date).toBeDefined();
            expect(result.lookback_period.start_date).toBeDefined();
            expect(result.lookback_period.end_date).toBeDefined();
        });

        it('should calculate summary correctly', async () => {
            const result = await runAnalysis(mockRequest);

            expect(result.summary.total_ingredients_analyzed).toBe(3);
            expect(result.summary.total_needing_restock).toBeGreaterThanOrEqual(0);
        });

        it('should return items grouped by supplier', async () => {
            const result = await runAnalysis(mockRequest);

            expect(result.by_supplier).toBeDefined();
            expect(Array.isArray(result.by_supplier)).toBe(true);
        });

        it('should enrich items with supplier data', async () => {
            const result = await runAnalysis(mockRequest);

            // Items with supplier should have supplier info
            const itemWithSupplier = result.all_items.find(
                i => i.supplier_id !== null
            );

            if (itemWithSupplier) {
                expect(itemWithSupplier.supplier_name).toBeDefined();
            }
        });

        it('should calculate WMA-based suggestions', async () => {
            const result = await runAnalysis(mockRequest);

            // All items should have WMA calculated
            for (const item of result.all_items) {
                expect(item.wma_daily_average).toBeGreaterThanOrEqual(0);
                expect(item.suggested_qty).toBeGreaterThanOrEqual(0);
                expect(item.estimated_cost).toBeGreaterThanOrEqual(0);
            }
        });

        it('should calculate total estimated cost', async () => {
            const result = await runAnalysis(mockRequest);

            const calculatedTotal = result.all_items.reduce(
                (sum, item) => sum + item.estimated_cost, 0
            );

            expect(result.summary.total_estimated_cost).toBe(calculatedTotal);
        });

        it('should handle empty orders', async () => {
            (spkRepository.getOrderItemsWithRecipes as jest.Mock)
                .mockResolvedValue([]);

            const result = await runAnalysis(mockRequest);

            // With no orders, WMA should be 0 for all items
            // But items that are below min_stock might still need restock
            expect(result.summary.total_ingredients_analyzed).toBe(3);
        });

        it('should handle empty ingredients', async () => {
            (spkRepository.getAllIngredients as jest.Mock)
                .mockResolvedValue([]);

            const result = await runAnalysis(mockRequest);

            expect(result.summary.total_ingredients_analyzed).toBe(0);
            expect(result.summary.total_needing_restock).toBe(0);
            expect(result.all_items).toHaveLength(0);
        });

        it('should handle null ingredients', async () => {
            (spkRepository.getAllIngredients as jest.Mock)
                .mockResolvedValue(null);

            const result = await runAnalysis(mockRequest);

            expect(result.summary.total_ingredients_analyzed).toBe(0);
            expect(result.all_items).toHaveLength(0);
        });

        it('should handle no suppliers', async () => {
            (spkRepository.getLastSupplierForIngredients as jest.Mock)
                .mockResolvedValue([]);

            const result = await runAnalysis(mockRequest);

            // Items should still be returned but without supplier
            expect(result.summary.total_ingredients_analyzed).toBe(3);
        });

        it('should filter by ingredient_type when specified', async () => {
            const rawOnlyRequest = {
                query: {
                    target_days: '7',
                    buffer_percent: '10',
                    lookback_days: '30',
                    ingredient_type: 'raw',
                },
            } as unknown as AuthenticatedRequest;

            await runAnalysis(rawOnlyRequest);

            expect(spkRepository.getAllIngredients).toHaveBeenCalledWith('raw');
        });

        it('should group items by supplier correctly', async () => {
            const result = await runAnalysis(mockRequest);

            // Each supplier group should have items
            for (const group of result.by_supplier) {
                expect(group.items.length).toBeGreaterThanOrEqual(1);
                expect(group.total_items).toBe(group.items.length);

                // Total cost should match sum of items
                const calculatedTotal = group.items.reduce(
                    (sum, item) => sum + item.estimated_cost, 0
                );
                expect(group.total_estimated_cost).toBe(calculatedTotal);
            }
        });

        it('should sort supplier groups by total cost descending', async () => {
            const result = await runAnalysis(mockRequest);

            for (let i = 0; i < result.by_supplier.length - 1; i++) {
                expect(result.by_supplier[i].total_estimated_cost)
                    .toBeGreaterThanOrEqual(result.by_supplier[i + 1].total_estimated_cost);
            }
        });

        it('should apply buffer percentage correctly', async () => {
            // Request with 0% buffer
            const noBufferRequest = {
                query: {
                    target_days: '7',
                    buffer_percent: '0',
                    lookback_days: '30',
                },
            } as unknown as AuthenticatedRequest;

            const resultNoBuffer = await runAnalysis(noBufferRequest);

            // Request with 50% buffer
            const highBufferRequest = {
                query: {
                    target_days: '7',
                    buffer_percent: '50',
                    lookback_days: '30',
                },
            } as unknown as AuthenticatedRequest;

            const resultHighBuffer = await runAnalysis(highBufferRequest);

            // Higher buffer should generally result in higher suggested quantities
            if (resultNoBuffer.all_items.length > 0 && resultHighBuffer.all_items.length > 0) {
                const noBufferTotal = resultNoBuffer.all_items.reduce(
                    (sum, i) => sum + i.suggested_qty, 0
                );
                const highBufferTotal = resultHighBuffer.all_items.reduce(
                    (sum, i) => sum + i.suggested_qty, 0
                );
                expect(highBufferTotal).toBeGreaterThanOrEqual(noBufferTotal);
            }
        });
    });
});
