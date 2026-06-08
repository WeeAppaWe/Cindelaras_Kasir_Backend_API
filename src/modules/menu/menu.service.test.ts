import menuService from './menu.service';
import menuRepository from './menu.repository';
import categoryRepository from '../category/category.repository';
import hppService from '../hpp/hpp.service';
import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import { ErrorDataAlreadyExistException } from '../../../exception/error-data-already-exist.exception';
import { ErrorValidationException } from '../../../exception/error-validation.exception';
import { AuthenticatedRequest } from '../../../types';
import {
    mockMenu,
    mockMenu2,
    mockMenuWithDetails,
    mockMenus,
} from '../../tests/mocks/menu.mock';
import { mockCategory } from '../../tests/mocks/category.mock';

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
            } as unknown as AuthenticatedRequest;

            (menuRepository.findAll as jest.Mock).mockResolvedValue([mockMenuWithDetails]);
            (menuRepository.count as jest.Mock).mockResolvedValue(1);

            const result = await menuService.getAll(mockRequest);

            expect(result).toBeDefined();
            expect(result.page.total_record_count).toBe(1);
            expect(result.page.batch_number).toBe(1);
            expect(result.records).toHaveLength(1);
            expect(result.records[0].name).toBe('Nasi Goreng');
        });

        it('should use default pagination when not provided', async () => {
            const mockRequest = { query: {} } as unknown as AuthenticatedRequest;

            (menuRepository.findAll as jest.Mock).mockResolvedValue([mockMenuWithDetails]);
            (menuRepository.count as jest.Mock).mockResolvedValue(1);

            const result = await menuService.getAll(mockRequest);

            expect(result.page.batch_number).toBe(1);
            expect(result.page.max_batch_size).toBe(10);
        });

        it('should pass search filter to repository', async () => {
            const mockRequest = { query: { search: 'nasi' } } as unknown as AuthenticatedRequest;

            (menuRepository.findAll as jest.Mock).mockResolvedValue([mockMenuWithDetails]);
            (menuRepository.count as jest.Mock).mockResolvedValue(1);

            await menuService.getAll(mockRequest);

            expect(menuRepository.findAll).toHaveBeenCalledWith(
                expect.any(Object),
                expect.objectContaining({ search: 'nasi' })
            );
        });

        it('should pass category_id filter to repository', async () => {
            const mockRequest = { query: { category_id: mockCategory.category_id } } as unknown as AuthenticatedRequest;

            (menuRepository.findAll as jest.Mock).mockResolvedValue([mockMenuWithDetails]);
            (menuRepository.count as jest.Mock).mockResolvedValue(1);

            await menuService.getAll(mockRequest);

            expect(menuRepository.findAll).toHaveBeenCalledWith(
                expect.any(Object),
                expect.objectContaining({ category_id: mockCategory.category_id })
            );
        });

        it('should pass is_available filter to repository', async () => {
            const mockRequest = { query: { is_available: 'true' } } as unknown as AuthenticatedRequest;

            (menuRepository.findAll as jest.Mock).mockResolvedValue([mockMenuWithDetails]);
            (menuRepository.count as jest.Mock).mockResolvedValue(1);

            await menuService.getAll(mockRequest);

            expect(menuRepository.findAll).toHaveBeenCalledWith(
                expect.any(Object),
                expect.objectContaining({ is_available: true })
            );
        });

        it('should return empty records when no menus found', async () => {
            const mockRequest = { query: {} } as unknown as AuthenticatedRequest;

            (menuRepository.findAll as jest.Mock).mockResolvedValue([]);
            (menuRepository.count as jest.Mock).mockResolvedValue(0);

            const result = await menuService.getAll(mockRequest);

            expect(result.records).toHaveLength(0);
            expect(result.page.total_record_count).toBe(0);
        });

        it('should calculate margin and profit for each menu', async () => {
            const mockRequest = { query: {} } as unknown as AuthenticatedRequest;

            (menuRepository.findAll as jest.Mock).mockResolvedValue([mockMenuWithDetails]);
            (menuRepository.count as jest.Mock).mockResolvedValue(1);

            const result = await menuService.getAll(mockRequest);

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
                params: { menu_id: mockMenu.menu_id },
            } as unknown as AuthenticatedRequest;

            const mockHppResult = {
                menu_id: mockMenu.menu_id,
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

            (menuRepository.findById as jest.Mock).mockResolvedValue(mockMenu);
            (hppService.calculateMenuHPP as jest.Mock).mockResolvedValue(mockHppResult);
            (hppService.getMenuCostSummary as jest.Mock).mockResolvedValue(mockCostSummary);

            const result = await menuService.getDetail(mockRequest);

            expect(result).toBeDefined();
            expect(result.menu_id).toBe(mockMenu.menu_id);
            expect(result.cost_summary).toEqual(mockCostSummary);
        });

        it('should throw ErrorNotFoundException when menu not found', async () => {
            const mockRequest = {
                params: { menu_id: 'non-existent-id' },
            } as unknown as AuthenticatedRequest;

            (menuRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(menuService.getDetail(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
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
                    category_id: mockCategory.category_id,
                    price: 15000,
                },
            } as unknown as AuthenticatedRequest;

            (menuRepository.findByName as jest.Mock).mockResolvedValue(mockMenu);

            await expect(menuService.create(mockRequest))
                .rejects
                .toThrow(ErrorDataAlreadyExistException);
        });

        it('should throw ErrorValidationException when category not found', async () => {
            const mockRequest = {
                body: {
                    name: 'New Menu',
                    category_id: 'non-existent-category',
                    price: 15000,
                },
            } as unknown as AuthenticatedRequest;

            (menuRepository.findByName as jest.Mock).mockResolvedValue(null);
            (categoryRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(menuService.create(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should create menu when all validations pass', async () => {
            const mockRequest = {
                body: {
                    name: 'Ayam Goreng',
                    category_id: mockCategory.category_id,
                    price: 20000,
                },
            } as unknown as AuthenticatedRequest;

            const newMenu = {
                ...mockMenu,
                menu_id: 'new-menu-id',
                name: 'Ayam Goreng',
                price: 20000,
                cost: 0,
            };

            (menuRepository.findByName as jest.Mock).mockResolvedValue(null);
            (categoryRepository.findById as jest.Mock).mockResolvedValue(mockCategory);
            (menuRepository.create as jest.Mock).mockResolvedValue(newMenu);

            const result = await menuService.create(mockRequest);

            expect(menuRepository.findByName).toHaveBeenCalledWith('Ayam Goreng');
            expect(categoryRepository.findById).toHaveBeenCalledWith(mockCategory.category_id);
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
            } as unknown as AuthenticatedRequest;

            (menuRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(menuService.update(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });

        it('should throw ErrorDataAlreadyExistException when name already used by another menu', async () => {
            const mockRequest = {
                params: { menu_id: mockMenu.menu_id },
                body: { name: 'Es Teh Manis' },
            } as unknown as AuthenticatedRequest;

            (menuRepository.findById as jest.Mock).mockResolvedValue(mockMenu);
            (menuRepository.findByName as jest.Mock).mockResolvedValue(mockMenu2);

            await expect(menuService.update(mockRequest))
                .rejects
                .toThrow(ErrorDataAlreadyExistException);
        });

        it('should throw ErrorValidationException when category_id not found', async () => {
            const mockRequest = {
                params: { menu_id: mockMenu.menu_id },
                body: { category_id: 'non-existent-category' },
            } as unknown as AuthenticatedRequest;

            (menuRepository.findById as jest.Mock).mockResolvedValue(mockMenu);
            (categoryRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(menuService.update(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should check name uniqueness with exclusion of current menu', async () => {
            const mockRequest = {
                params: { menu_id: mockMenu.menu_id },
                body: { name: 'New Unique Name' },
            } as unknown as AuthenticatedRequest;

            const updatedMenu = { ...mockMenu, name: 'New Unique Name' };

            (menuRepository.findById as jest.Mock).mockResolvedValue(mockMenu);
            (menuRepository.findByName as jest.Mock).mockResolvedValue(null);
            (menuRepository.update as jest.Mock).mockResolvedValue(updatedMenu);

            await menuService.update(mockRequest);

            expect(menuRepository.findByName).toHaveBeenCalledWith('New Unique Name', mockMenu.menu_id);
        });
    });

    // ============================================
    // SOFT DELETE TESTS
    // ============================================

    describe('softDelete', () => {
        it('should throw ErrorNotFoundException when menu not found', async () => {
            const mockRequest = {
                params: { menu_id: 'non-existent-id' },
            } as unknown as AuthenticatedRequest;

            (menuRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(menuService.softDelete(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });

        it('should throw ErrorValidationException when menu has orders', async () => {
            const mockRequest = {
                params: { menu_id: mockMenu.menu_id },
            } as unknown as AuthenticatedRequest;

            (menuRepository.findById as jest.Mock).mockResolvedValue(mockMenu);
            (menuRepository.hasOrders as jest.Mock).mockResolvedValue(true);

            await expect(menuService.softDelete(mockRequest))
                .rejects
                .toThrow(ErrorValidationException);
        });

        it('should return success response when menu deleted', async () => {
            const mockRequest = {
                params: { menu_id: mockMenu.menu_id },
            } as unknown as AuthenticatedRequest;

            (menuRepository.findById as jest.Mock).mockResolvedValue(mockMenu);
            (menuRepository.hasOrders as jest.Mock).mockResolvedValue(false);
            (menuRepository.softDelete as jest.Mock).mockResolvedValue(undefined);

            const result = await menuService.softDelete(mockRequest);

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
            } as unknown as AuthenticatedRequest;

            (menuRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(menuService.toggleAvailability(mockRequest))
                .rejects
                .toThrow(ErrorNotFoundException);
        });

        it('should toggle availability from true to false', async () => {
            const mockRequest = {
                params: { menu_id: mockMenu.menu_id },
            } as unknown as AuthenticatedRequest;

            // Menu is currently available (is_available: true)
            const activeMenu = { ...mockMenu, is_available: true };
            const toggledMenu = { ...mockMenu, is_available: false };

            (menuRepository.findById as jest.Mock).mockResolvedValue(activeMenu);
            (menuRepository.update as jest.Mock).mockResolvedValue(toggledMenu);

            const result = await menuService.toggleAvailability(mockRequest);

            expect(menuRepository.findById).toHaveBeenCalledWith(mockMenu.menu_id);
            expect(menuRepository.update).toHaveBeenCalledWith(mockMenu.menu_id, {
                is_available: false,
            });
            expect(result).toEqual(toggledMenu);
        });

        it('should toggle availability from false to true', async () => {
            const mockRequest = {
                params: { menu_id: mockMenu.menu_id },
            } as unknown as AuthenticatedRequest;

            // Menu is currently inactive (is_available: false)
            const inactiveMenu = { ...mockMenu, is_available: false };
            const toggledMenu = { ...mockMenu, is_available: true };

            (menuRepository.findById as jest.Mock).mockResolvedValue(inactiveMenu);
            (menuRepository.update as jest.Mock).mockResolvedValue(toggledMenu);

            const result = await menuService.toggleAvailability(mockRequest);

            expect(menuRepository.findById).toHaveBeenCalledWith(mockMenu.menu_id);
            expect(menuRepository.update).toHaveBeenCalledWith(mockMenu.menu_id, {
                is_available: true,
            });
            expect(result).toEqual(toggledMenu);
        });
    });
});
