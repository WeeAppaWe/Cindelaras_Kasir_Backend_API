"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_service_1 = __importDefault(require("./menu.service"));
const menu_repository_1 = __importDefault(require("./menu.repository"));
const category_repository_1 = __importDefault(require("../category/category.repository"));
const hpp_service_1 = __importDefault(require("../hpp/hpp.service"));
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const error_data_already_exist_exception_1 = require("../../../exception/error-data-already-exist.exception");
const error_validation_exception_1 = require("../../../exception/error-validation.exception");
const menu_mock_1 = require("../../tests/mocks/menu.mock");
const category_mock_1 = require("../../tests/mocks/category.mock");
// ============================================
// MOCKS
// ============================================
jest.mock('./menu.repository');
jest.mock('../category/category.repository');
jest.mock('../hpp/hpp.service');
// Mock getPrismaClient
jest.mock('../../../database/postgres.connection', () => {
    const transactionMock = jest.fn().mockImplementation(async (callback) => {
        const result = await callback({});
        return result;
    });
    return {
        __esModule: true,
        default: jest.fn(() => ({
            $transaction: transactionMock,
            menu: { update: jest.fn(), create: jest.fn() },
        })),
    };
});
// ============================================
// TEST SUITES
// ============================================
describe('Menu Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // ============================================
    // GET ALL TESTS
    // ============================================
    describe('getAll', () => {
        it('should return paginated list of menus', async () => {
            const mockRequest = {
                query: { batch: '1', size: '10' },
            };
            menu_repository_1.default.findAll.mockResolvedValue([menu_mock_1.mockMenuWithDetails]);
            menu_repository_1.default.count.mockResolvedValue(1);
            const result = await menu_service_1.default.getAll(mockRequest);
            expect(result).toBeDefined();
            expect(result.page.total_record_count).toBe(1);
            expect(result.page.batch_number).toBe(1);
            expect(result.records).toHaveLength(1);
            expect(result.records[0].name).toBe('Nasi Goreng');
        });
        it('should use default pagination when not provided', async () => {
            const mockRequest = { query: {} };
            menu_repository_1.default.findAll.mockResolvedValue([menu_mock_1.mockMenuWithDetails]);
            menu_repository_1.default.count.mockResolvedValue(1);
            const result = await menu_service_1.default.getAll(mockRequest);
            expect(result.page.batch_number).toBe(1);
            expect(result.page.max_batch_size).toBe(10);
        });
        it('should pass search filter to repository', async () => {
            const mockRequest = { query: { search: 'nasi' } };
            menu_repository_1.default.findAll.mockResolvedValue([menu_mock_1.mockMenuWithDetails]);
            menu_repository_1.default.count.mockResolvedValue(1);
            await menu_service_1.default.getAll(mockRequest);
            expect(menu_repository_1.default.findAll).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ search: 'nasi' }));
        });
        it('should pass category_id filter to repository', async () => {
            const mockRequest = { query: { category_id: category_mock_1.mockCategory.category_id } };
            menu_repository_1.default.findAll.mockResolvedValue([menu_mock_1.mockMenuWithDetails]);
            menu_repository_1.default.count.mockResolvedValue(1);
            await menu_service_1.default.getAll(mockRequest);
            expect(menu_repository_1.default.findAll).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ category_id: category_mock_1.mockCategory.category_id }));
        });
        it('should pass is_available filter to repository', async () => {
            const mockRequest = { query: { is_available: 'true' } };
            menu_repository_1.default.findAll.mockResolvedValue([menu_mock_1.mockMenuWithDetails]);
            menu_repository_1.default.count.mockResolvedValue(1);
            await menu_service_1.default.getAll(mockRequest);
            expect(menu_repository_1.default.findAll).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ is_available: true }));
        });
        it('should return empty records when no menus found', async () => {
            const mockRequest = { query: {} };
            menu_repository_1.default.findAll.mockResolvedValue([]);
            menu_repository_1.default.count.mockResolvedValue(0);
            const result = await menu_service_1.default.getAll(mockRequest);
            expect(result.records).toHaveLength(0);
            expect(result.page.total_record_count).toBe(0);
        });
        it('should calculate margin and profit for each menu', async () => {
            const mockRequest = { query: {} };
            menu_repository_1.default.findAll.mockResolvedValue([menu_mock_1.mockMenuWithDetails]);
            menu_repository_1.default.count.mockResolvedValue(1);
            const result = await menu_service_1.default.getAll(mockRequest);
            expect(result.records[0].margin_percent).toBeDefined();
            expect(result.records[0].profit).toBeDefined();
        });
    });
    // ============================================
    // GET DETAIL TESTS
    // ============================================
    describe('getDetail', () => {
        it('should return menu detail by ID', async () => {
            const mockRequest = {
                params: { menu_id: menu_mock_1.mockMenu.menu_id },
            };
            const mockHppResult = {
                menu_id: menu_mock_1.mockMenu.menu_id,
                total_hpp: 5000,
                recipe_count: 2,
                recipes: [],
            };
            const mockCostSummary = {
                hpp: 5000,
                price: 15000,
                margin_percent: 66.67,
                profit: 10000,
            };
            menu_repository_1.default.findById.mockResolvedValue(menu_mock_1.mockMenu);
            hpp_service_1.default.calculateMenuHPP.mockResolvedValue(mockHppResult);
            hpp_service_1.default.getMenuCostSummary.mockResolvedValue(mockCostSummary);
            const result = await menu_service_1.default.getDetail(mockRequest);
            expect(result).toBeDefined();
            expect(result.menu_id).toBe(menu_mock_1.mockMenu.menu_id);
            expect(result.cost_summary).toEqual(mockCostSummary);
        });
        it('should throw ErrorNotFoundException when menu not found', async () => {
            const mockRequest = {
                params: { menu_id: 'non-existent-id' },
            };
            menu_repository_1.default.findById.mockResolvedValue(null);
            await expect(menu_service_1.default.getDetail(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
    });
    // ============================================
    // CREATE TESTS
    // ============================================
    describe('create', () => {
        it('should throw ErrorDataAlreadyExistException when menu name already exists', async () => {
            const mockRequest = {
                body: {
                    name: 'Nasi Goreng',
                    category_id: category_mock_1.mockCategory.category_id,
                    price: 15000,
                },
            };
            menu_repository_1.default.findByName.mockResolvedValue(menu_mock_1.mockMenu);
            await expect(menu_service_1.default.create(mockRequest))
                .rejects
                .toThrow(error_data_already_exist_exception_1.ErrorDataAlreadyExistException);
        });
        it('should throw ErrorValidationException when category not found', async () => {
            const mockRequest = {
                body: {
                    name: 'New Menu',
                    category_id: 'non-existent-category',
                    price: 15000,
                },
            };
            menu_repository_1.default.findByName.mockResolvedValue(null);
            category_repository_1.default.findById.mockResolvedValue(null);
            await expect(menu_service_1.default.create(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should create menu when all validations pass', async () => {
            const mockRequest = {
                body: {
                    name: 'Ayam Goreng',
                    category_id: category_mock_1.mockCategory.category_id,
                    price: 20000,
                },
            };
            const newMenu = {
                ...menu_mock_1.mockMenu,
                menu_id: 'new-menu-id',
                name: 'Ayam Goreng',
                price: 20000,
                cost: 0,
            };
            menu_repository_1.default.findByName.mockResolvedValue(null);
            category_repository_1.default.findById.mockResolvedValue(category_mock_1.mockCategory);
            menu_repository_1.default.create.mockResolvedValue(newMenu);
            const result = await menu_service_1.default.create(mockRequest);
            expect(menu_repository_1.default.findByName).toHaveBeenCalledWith('Ayam Goreng');
            expect(category_repository_1.default.findById).toHaveBeenCalledWith(category_mock_1.mockCategory.category_id);
        });
    });
    // ============================================
    // UPDATE TESTS
    // ============================================
    describe('update', () => {
        it('should throw ErrorNotFoundException when menu not found', async () => {
            const mockRequest = {
                params: { menu_id: 'non-existent-id' },
                body: { name: 'Updated Name' },
            };
            menu_repository_1.default.findById.mockResolvedValue(null);
            await expect(menu_service_1.default.update(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
        it('should throw ErrorDataAlreadyExistException when name already used by another menu', async () => {
            const mockRequest = {
                params: { menu_id: menu_mock_1.mockMenu.menu_id },
                body: { name: 'Es Teh Manis' },
            };
            menu_repository_1.default.findById.mockResolvedValue(menu_mock_1.mockMenu);
            menu_repository_1.default.findByName.mockResolvedValue(menu_mock_1.mockMenu2);
            await expect(menu_service_1.default.update(mockRequest))
                .rejects
                .toThrow(error_data_already_exist_exception_1.ErrorDataAlreadyExistException);
        });
        it('should throw ErrorValidationException when category_id not found', async () => {
            const mockRequest = {
                params: { menu_id: menu_mock_1.mockMenu.menu_id },
                body: { category_id: 'non-existent-category' },
            };
            menu_repository_1.default.findById.mockResolvedValue(menu_mock_1.mockMenu);
            category_repository_1.default.findById.mockResolvedValue(null);
            await expect(menu_service_1.default.update(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should check name uniqueness with exclusion of current menu', async () => {
            const mockRequest = {
                params: { menu_id: menu_mock_1.mockMenu.menu_id },
                body: { name: 'New Unique Name' },
            };
            const updatedMenu = { ...menu_mock_1.mockMenu, name: 'New Unique Name' };
            menu_repository_1.default.findById.mockResolvedValue(menu_mock_1.mockMenu);
            menu_repository_1.default.findByName.mockResolvedValue(null);
            menu_repository_1.default.update.mockResolvedValue(updatedMenu);
            await menu_service_1.default.update(mockRequest);
            expect(menu_repository_1.default.findByName).toHaveBeenCalledWith('New Unique Name', menu_mock_1.mockMenu.menu_id);
        });
    });
    // ============================================
    // SOFT DELETE TESTS
    // ============================================
    describe('softDelete', () => {
        it('should throw ErrorNotFoundException when menu not found', async () => {
            const mockRequest = {
                params: { menu_id: 'non-existent-id' },
            };
            menu_repository_1.default.findById.mockResolvedValue(null);
            await expect(menu_service_1.default.softDelete(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
        it('should throw ErrorValidationException when menu has orders', async () => {
            const mockRequest = {
                params: { menu_id: menu_mock_1.mockMenu.menu_id },
            };
            menu_repository_1.default.findById.mockResolvedValue(menu_mock_1.mockMenu);
            menu_repository_1.default.hasOrders.mockResolvedValue(true);
            await expect(menu_service_1.default.softDelete(mockRequest))
                .rejects
                .toThrow(error_validation_exception_1.ErrorValidationException);
        });
        it('should return success response when menu deleted', async () => {
            const mockRequest = {
                params: { menu_id: menu_mock_1.mockMenu.menu_id },
            };
            menu_repository_1.default.findById.mockResolvedValue(menu_mock_1.mockMenu);
            menu_repository_1.default.hasOrders.mockResolvedValue(false);
            menu_repository_1.default.softDelete.mockResolvedValue(undefined);
            const result = await menu_service_1.default.softDelete(mockRequest);
            expect(result).toBeDefined();
            expect(result.success).toBe(true);
            expect(result.message).toBe('Menu berhasil dihapus');
        });
    });
    // ============================================
    // TOGGLE AVAILABILITY TESTS
    // ============================================
    describe('toggleAvailability', () => {
        it('should throw ErrorNotFoundException when menu not found', async () => {
            const mockRequest = {
                params: { menu_id: 'non-existent-id' },
            };
            menu_repository_1.default.findById.mockResolvedValue(null);
            await expect(menu_service_1.default.toggleAvailability(mockRequest))
                .rejects
                .toThrow(error_not_found_exception_1.ErrorNotFoundException);
        });
        it('should toggle availability from true to false', async () => {
            const mockRequest = {
                params: { menu_id: menu_mock_1.mockMenu.menu_id },
            };
            // Menu is currently available (is_available: true)
            const activeMenu = { ...menu_mock_1.mockMenu, is_available: true };
            const toggledMenu = { ...menu_mock_1.mockMenu, is_available: false };
            menu_repository_1.default.findById.mockResolvedValue(activeMenu);
            menu_repository_1.default.update.mockResolvedValue(toggledMenu);
            const result = await menu_service_1.default.toggleAvailability(mockRequest);
            expect(menu_repository_1.default.findById).toHaveBeenCalledWith(menu_mock_1.mockMenu.menu_id);
            expect(menu_repository_1.default.update).toHaveBeenCalledWith(menu_mock_1.mockMenu.menu_id, {
                is_available: false,
            });
            expect(result).toEqual(toggledMenu);
        });
        it('should toggle availability from false to true', async () => {
            const mockRequest = {
                params: { menu_id: menu_mock_1.mockMenu.menu_id },
            };
            // Menu is currently inactive (is_available: false)
            const inactiveMenu = { ...menu_mock_1.mockMenu, is_available: false };
            const toggledMenu = { ...menu_mock_1.mockMenu, is_available: true };
            menu_repository_1.default.findById.mockResolvedValue(inactiveMenu);
            menu_repository_1.default.update.mockResolvedValue(toggledMenu);
            const result = await menu_service_1.default.toggleAvailability(mockRequest);
            expect(menu_repository_1.default.findById).toHaveBeenCalledWith(menu_mock_1.mockMenu.menu_id);
            expect(menu_repository_1.default.update).toHaveBeenCalledWith(menu_mock_1.mockMenu.menu_id, {
                is_available: true,
            });
            expect(result).toEqual(toggledMenu);
        });
    });
});
//# sourceMappingURL=menu.service.test.js.map