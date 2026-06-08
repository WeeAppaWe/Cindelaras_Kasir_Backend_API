import categoryService from './category.service';
import categoryRepository from './category.repository';
import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import { ErrorDataAlreadyExistException } from '../../../exception/error-data-already-exist.exception';
import { ErrorValidationException } from '../../../exception/error-validation.exception';
import { AuthenticatedRequest } from '../../../types';
import {
    mockCategory,
    mockCategory2,
    mockCategoryWithCount,
    mockCategoryWithCount2,
    mockCategoriesWithCount,
} from '../../tests/mocks/category.mock';

// ============================================
// MOCKS
// ============================================

jest.mock('./category.repository');

// Mock getPrismaClient - create mock transaction inside factory
jest.mock('../../../database/postgres.connection', () => {
    const transactionMock = jest.fn().mockImplementation(async (callback) => {
        const result = await callback({});
        return result;
    });

    return {
        __esModule: true,
        default: jest.fn(() => ({
            $transaction: transactionMock,
            category: { update: jest.fn(), create: jest.fn() },
        })),
    };
});

// ============================================
// TEST SUITES
// ============================================

describe('Category Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ============================================
    // GET ALL TESTS
    // ============================================

    describe('getAll', () => {
        it('should return paginated list of categories', async () => {
            const mockRequest = {
                query: { batch: '1', size: '10' },
            } as unknown as AuthenticatedRequest;

            (categoryRepository.findAll as jest.Mock).mockResolvedValue([mockCategoryWithCount, mockCategoryWithCount2]);
            (categoryRepository.count as jest.Mock).mockResolvedValue(2);

            const result = await categoryService.getAll(mockRequest);

            expect(result).toBeDefined();
            expect(result.page.total_record_count).toBe(2);
            expect(result.page.batch_number).toBe(1);
            expect(result.page.batch_size).toBe(2);
            expect(result.page.max_batch_size).toBe(10);
            expect(result.records).toHaveLength(2);
            expect(result.records[0].name).toBe('Makanan');
        });

        it('should use default pagination when not provided', async () => {
            const mockRequest = { query: {} } as unknown as AuthenticatedRequest;

            (categoryRepository.findAll as jest.Mock).mockResolvedValue([mockCategoryWithCount]);
            (categoryRepository.count as jest.Mock).mockResolvedValue(1);

            const result = await categoryService.getAll(mockRequest);

            expect(result.page.batch_number).toBe(1);
            expect(result.page.max_batch_size).toBe(10);
            expect(categoryRepository.findAll).toHaveBeenCalledWith(
                expect.objectContaining({
                    pagination: expect.objectContaining({ limit: 10, offset: 0 }),
                }),
                expect.any(Object)
            );
        });

        it('should pass search filter to repository', async () => {
            const mockRequest = { query: { search: 'makanan' } } as unknown as AuthenticatedRequest;

            (categoryRepository.findAll as jest.Mock).mockResolvedValue([mockCategoryWithCount]);
            (categoryRepository.count as jest.Mock).mockResolvedValue(1);

            await categoryService.getAll(mockRequest);

            expect(categoryRepository.findAll).toHaveBeenCalledWith(
                expect.any(Object),
                expect.objectContaining({ search: 'makanan' })
            );
        });

        it('should return empty records when no categories found', async () => {
            const mockRequest = { query: {} } as unknown as AuthenticatedRequest;

            (categoryRepository.findAll as jest.Mock).mockResolvedValue([]);
            (categoryRepository.count as jest.Mock).mockResolvedValue(0);

            const result = await categoryService.getAll(mockRequest);

            expect(result.records).toHaveLength(0);
            expect(result.page.total_record_count).toBe(0);
        });
    });

    // ============================================
    // GET DETAIL TESTS
    // ============================================

    describe('getDetail', () => {
        it('should return category detail by ID', async () => {
            const mockRequest = {
                params: { category_id: mockCategory.category_id },
            } as unknown as AuthenticatedRequest;

            (categoryRepository.findById as jest.Mock).mockResolvedValue(mockCategory);

            const result = await categoryService.getDetail(mockRequest);

            expect(result).toBeDefined();
            expect(result.category_id).toBe(mockCategory.category_id);
            expect(result.name).toBe('Makanan');
            expect(categoryRepository.findById).toHaveBeenCalledWith(mockCategory.category_id);
        });

        it('should throw ErrorNotFoundException when category not found', async () => {
            const mockRequest = {
                params: { category_id: 'non-existent-id' },
            } as unknown as AuthenticatedRequest;

            (categoryRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(categoryService.getDetail(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });
    });

    // ============================================
    // CREATE TESTS
    // ============================================

    describe('create', () => {
        it('should throw ErrorDataAlreadyExistException when category name already exists', async () => {
            const mockRequest = {
                body: { name: 'Makanan' },
            } as unknown as AuthenticatedRequest;

            (categoryRepository.findByName as jest.Mock).mockResolvedValue(mockCategory);

            await expect(categoryService.create(mockRequest))
                .rejects
                .toThrow(ErrorDataAlreadyExistException);

            expect(categoryRepository.findByName).toHaveBeenCalledWith('Makanan');
        });

        it('should create category when name is unique', async () => {
            const mockRequest = {
                body: { name: 'Dessert' },
            } as unknown as AuthenticatedRequest;

            const newCategory = {
                category_id: '880e8400-e29b-41d4-a716-446655440010',
                name: 'Dessert',
                created_at: new Date(),
                updated_at: null,
            };

            (categoryRepository.findByName as jest.Mock).mockResolvedValue(null);
            (categoryRepository.create as jest.Mock).mockResolvedValue(newCategory);

            await categoryService.create(mockRequest);

            expect(categoryRepository.findByName).toHaveBeenCalledWith('Dessert');
        });
    });

    // ============================================
    // UPDATE TESTS
    // ============================================

    describe('update', () => {
        it('should throw ErrorNotFoundException when category not found', async () => {
            const mockRequest = {
                params: { category_id: 'non-existent-id' },
                body: { name: 'Updated Name' },
            } as unknown as AuthenticatedRequest;

            (categoryRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(categoryService.update(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });

        it('should throw ErrorDataAlreadyExistException when name already used by another category', async () => {
            const mockRequest = {
                params: { category_id: mockCategory.category_id },
                body: { name: 'Minuman' },
            } as unknown as AuthenticatedRequest;

            (categoryRepository.findById as jest.Mock).mockResolvedValue(mockCategory);
            (categoryRepository.findByName as jest.Mock).mockResolvedValue(mockCategory2);

            await expect(categoryService.update(mockRequest))
                .rejects
                .toThrow(ErrorDataAlreadyExistException);
        });

        it('should check name uniqueness with exclusion of current category', async () => {
            const mockRequest = {
                params: { category_id: mockCategory.category_id },
                body: { name: 'New Name' },
            } as unknown as AuthenticatedRequest;

            const updatedCategory = {
                ...mockCategory,
                name: 'New Name',
            };

            (categoryRepository.findById as jest.Mock).mockResolvedValue(mockCategory);
            (categoryRepository.findByName as jest.Mock).mockResolvedValue(null);
            (categoryRepository.update as jest.Mock).mockResolvedValue(updatedCategory);

            await categoryService.update(mockRequest);

            expect(categoryRepository.findByName).toHaveBeenCalledWith('New Name', mockCategory.category_id);
        });
    });

    // ============================================
    // SOFT DELETE TESTS
    // ============================================

    describe('softDelete', () => {
        it('should throw ErrorNotFoundException when category not found', async () => {
            const mockRequest = {
                params: { category_id: 'non-existent-id' },
            } as unknown as AuthenticatedRequest;

            (categoryRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(categoryService.softDelete(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });

        it('should throw ErrorValidationException when category has menus', async () => {
            const mockRequest = {
                params: { category_id: mockCategory.category_id },
            } as unknown as AuthenticatedRequest;

            (categoryRepository.findById as jest.Mock).mockResolvedValue(mockCategory);
            (categoryRepository.hasMenus as jest.Mock).mockResolvedValue(true);

            await expect(categoryService.softDelete(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should return success response when category deleted', async () => {
            const mockRequest = {
                params: { category_id: mockCategory.category_id },
            } as unknown as AuthenticatedRequest;

            (categoryRepository.findById as jest.Mock).mockResolvedValue(mockCategory);
            (categoryRepository.hasMenus as jest.Mock).mockResolvedValue(false);
            (categoryRepository.softDelete as jest.Mock).mockResolvedValue(undefined);

            const result = await categoryService.softDelete(mockRequest);

            expect(result).toBeDefined();
            expect(result.success).toBe(true);
            expect(result.message).toBe('Kategori berhasil dihapus');
            expect(categoryRepository.findById).toHaveBeenCalledWith(mockCategory.category_id);
        });
    });
});
