"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_service_1 = __importDefault(require("./category.service"));
const category_repository_1 = __importDefault(require("./category.repository"));
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const error_data_already_exist_exception_1 = require("../../../exception/error-data-already-exist.exception");
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const category_mock_1 = require("../../tests/mocks/category.mock");
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
            };
            category_repository_1.default.findAll.mockResolvedValue([category_mock_1.mockCategoryWithCount, category_mock_1.mockCategoryWithCount2]);
            category_repository_1.default.count.mockResolvedValue(2);
            const result = await category_service_1.default.getAll(mockRequest);
            expect(result).toBeDefined();
            expect(result.page.total_record_count).toBe(2);
            expect(result.page.batch_number).toBe(1);
            expect(result.page.batch_size).toBe(2);
            expect(result.page.max_batch_size).toBe(10);
            expect(result.records).toHaveLength(2);
            expect(result.records[0].name).toBe('Makanan');
        });
        it('should use default pagination when not provided', async () => {
            const mockRequest = { query: {} };
            category_repository_1.default.findAll.mockResolvedValue([category_mock_1.mockCategoryWithCount]);
            category_repository_1.default.count.mockResolvedValue(1);
            const result = await category_service_1.default.getAll(mockRequest);
            expect(result.page.batch_number).toBe(1);
            expect(result.page.max_batch_size).toBe(10);
            expect(category_repository_1.default.findAll).toHaveBeenCalledWith(expect.objectContaining({
                pagination: expect.objectContaining({ limit: 10, offset: 0 }),
            }), expect.any(Object));
        });
        it('should pass search filter to repository', async () => {
            const mockRequest = { query: { search: 'makanan' } };
            category_repository_1.default.findAll.mockResolvedValue([category_mock_1.mockCategoryWithCount]);
            category_repository_1.default.count.mockResolvedValue(1);
            await category_service_1.default.getAll(mockRequest);
            expect(category_repository_1.default.findAll).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ search: 'makanan' }));
        });
        it('should return empty records when no categories found', async () => {
            const mockRequest = { query: {} };
            category_repository_1.default.findAll.mockResolvedValue([]);
            category_repository_1.default.count.mockResolvedValue(0);
            const result = await category_service_1.default.getAll(mockRequest);
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
                params: { category_id: category_mock_1.mockCategory.category_id },
            };
            category_repository_1.default.findById.mockResolvedValue(category_mock_1.mockCategory);
            const result = await category_service_1.default.getDetail(mockRequest);
            expect(result).toBeDefined();
            expect(result.category_id).toBe(category_mock_1.mockCategory.category_id);
            expect(result.name).toBe('Makanan');
            expect(category_repository_1.default.findById).toHaveBeenCalledWith(category_mock_1.mockCategory.category_id);
        });
        it('should throw ErrorNotFoundException when category not found', async () => {
            const mockRequest = {
                params: { category_id: 'non-existent-id' },
            };
            category_repository_1.default.findById.mockResolvedValue(null);
            await expect(category_service_1.default.getDetail(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
    });
    // ============================================
    // CREATE TESTS
    // ============================================
    describe('create', () => {
        it('should throw ErrorDataAlreadyExistException when category name already exists', async () => {
            const mockRequest = {
                body: { name: 'Makanan' },
            };
            category_repository_1.default.findByName.mockResolvedValue(category_mock_1.mockCategory);
            await expect(category_service_1.default.create(mockRequest))
                .rejects
                .toThrow(error_data_already_exist_exception_1.ErrorDataAlreadyExistException);
            expect(category_repository_1.default.findByName).toHaveBeenCalledWith('Makanan');
        });
        it('should create category when name is unique', async () => {
            const mockRequest = {
                body: { name: 'Dessert' },
            };
            const newCategory = {
                category_id: '880e8400-e29b-41d4-a716-446655440010',
                name: 'Dessert',
                created_at: new Date(),
                updated_at: null,
            };
            category_repository_1.default.findByName.mockResolvedValue(null);
            category_repository_1.default.create.mockResolvedValue(newCategory);
            await category_service_1.default.create(mockRequest);
            expect(category_repository_1.default.findByName).toHaveBeenCalledWith('Dessert');
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
            };
            category_repository_1.default.findById.mockResolvedValue(null);
            await expect(category_service_1.default.update(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
        it('should throw ErrorDataAlreadyExistException when name already used by another category', async () => {
            const mockRequest = {
                params: { category_id: category_mock_1.mockCategory.category_id },
                body: { name: 'Minuman' },
            };
            category_repository_1.default.findById.mockResolvedValue(category_mock_1.mockCategory);
            category_repository_1.default.findByName.mockResolvedValue(category_mock_1.mockCategory2);
            await expect(category_service_1.default.update(mockRequest))
                .rejects
                .toThrow(error_data_already_exist_exception_1.ErrorDataAlreadyExistException);
        });
        it('should check name uniqueness with exclusion of current category', async () => {
            const mockRequest = {
                params: { category_id: category_mock_1.mockCategory.category_id },
                body: { name: 'New Name' },
            };
            const updatedCategory = {
                ...category_mock_1.mockCategory,
                name: 'New Name',
            };
            category_repository_1.default.findById.mockResolvedValue(category_mock_1.mockCategory);
            category_repository_1.default.findByName.mockResolvedValue(null);
            category_repository_1.default.update.mockResolvedValue(updatedCategory);
            await category_service_1.default.update(mockRequest);
            expect(category_repository_1.default.findByName).toHaveBeenCalledWith('New Name', category_mock_1.mockCategory.category_id);
        });
    });
    // ============================================
    // SOFT DELETE TESTS
    // ============================================
    describe('softDelete', () => {
        it('should throw ErrorNotFoundException when category not found', async () => {
            const mockRequest = {
                params: { category_id: 'non-existent-id' },
            };
            category_repository_1.default.findById.mockResolvedValue(null);
            await expect(category_service_1.default.softDelete(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
        it('should throw ErrorValidationException when category has menus', async () => {
            const mockRequest = {
                params: { category_id: category_mock_1.mockCategory.category_id },
            };
            category_repository_1.default.findById.mockResolvedValue(category_mock_1.mockCategory);
            category_repository_1.default.hasMenus.mockResolvedValue(true);
            await expect(category_service_1.default.softDelete(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should return success response when category deleted', async () => {
            const mockRequest = {
                params: { category_id: category_mock_1.mockCategory.category_id },
            };
            category_repository_1.default.findById.mockResolvedValue(category_mock_1.mockCategory);
            category_repository_1.default.hasMenus.mockResolvedValue(false);
            category_repository_1.default.softDelete.mockResolvedValue(undefined);
            const result = await category_service_1.default.softDelete(mockRequest);
            expect(result).toBeDefined();
            expect(result.success).toBe(true);
            expect(result.message).toBe('Kategori berhasil dihapus');
            expect(category_repository_1.default.findById).toHaveBeenCalledWith(category_mock_1.mockCategory.category_id);
        });
    });
});
//# sourceMappingURL=category.service.test.js.map