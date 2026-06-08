"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stock_type_service_1 = require("./stock-type.service");
const stock_type_repository_1 = __importDefault(require("./stock-type.repository"));
const error_not_found_exception_1 = require("../../../exception/error-not-found.exception");
const stock_type_mock_1 = require("../../tests/mocks/stock-type.mock");
// Mock repository
jest.mock('./stock-type.repository');
describe('Stock Type Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // ============================================
    // GET ALL TESTS
    // ============================================
    describe('getAll', () => {
        it('should return list of stock types', async () => {
            const mockStockTypes = [stock_type_mock_1.mockStockType];
            stock_type_repository_1.default.findAll.mockResolvedValue(mockStockTypes);
            const result = await (0, stock_type_service_1.getAll)();
            expect(result).toEqual(mockStockTypes);
            expect(stock_type_repository_1.default.findAll).toHaveBeenCalledTimes(1);
        });
        it('should return empty list when no stock types found', async () => {
            stock_type_repository_1.default.findAll.mockResolvedValue([]);
            const result = await (0, stock_type_service_1.getAll)();
            expect(result).toEqual([]);
            expect(stock_type_repository_1.default.findAll).toHaveBeenCalledTimes(1);
        });
        it('should propagate errors from repository', async () => {
            const error = new Error('Database error');
            stock_type_repository_1.default.findAll.mockRejectedValue(error);
            await expect((0, stock_type_service_1.getAll)()).rejects.toThrow(error);
        });
    });
    // ============================================
    // GET DETAIL TESTS
    // ============================================
    describe('getDetail', () => {
        const mockRequest = {
            params: {
                stock_type_id: 'st-1',
            },
        };
        it('should return stock type detail when found', async () => {
            stock_type_repository_1.default.findById.mockResolvedValue(stock_type_mock_1.mockStockType);
            const result = await (0, stock_type_service_1.getDetail)(mockRequest);
            expect(result).toEqual(stock_type_mock_1.mockStockType);
            expect(stock_type_repository_1.default.findById).toHaveBeenCalledWith('st-1');
        });
        it('should throw ErrorNotFoundException when stock type not found', async () => {
            stock_type_repository_1.default.findById.mockResolvedValue(null);
            await expect((0, stock_type_service_1.getDetail)(mockRequest)).rejects.toThrow(error_not_found_exception_1.ErrorNotFoundException);
            await expect((0, stock_type_service_1.getDetail)(mockRequest)).rejects.toThrow('Stock type tidak ditemukan');
        });
        it('should propagate errors from repository', async () => {
            const error = new Error('Database error');
            stock_type_repository_1.default.findById.mockRejectedValue(error);
            await expect((0, stock_type_service_1.getDetail)(mockRequest)).rejects.toThrow(error);
        });
    });
});
//# sourceMappingURL=stock-type.service.test.js.map