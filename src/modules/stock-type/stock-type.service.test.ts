import { getAll, getDetail } from './stock-type.service';
import stockTypeRepository from './stock-type.repository';
import { ErrorNotFoundException } from '../../../exception/error-not-found.exception';
import { AuthenticatedRequest } from '../../../types';
import { mockStockType, mockStockTypes } from '../../tests/mocks/stock-type.mock';

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
            const mockStockTypes = [mockStockType];
            (stockTypeRepository.findAll as jest.Mock).mockResolvedValue(mockStockTypes);

            const result = await getAll();

            expect(result).toEqual(mockStockTypes);
            expect(stockTypeRepository.findAll).toHaveBeenCalledTimes(1);
        });

        it('should return empty list when no stock types found', async () => {
            (stockTypeRepository.findAll as jest.Mock).mockResolvedValue([]);

            const result = await getAll();

            expect(result).toEqual([]);
            expect(stockTypeRepository.findAll).toHaveBeenCalledTimes(1);
        });

        it('should propagate errors from repository', async () => {
            const error = new Error('Database error');
            (stockTypeRepository.findAll as jest.Mock).mockRejectedValue(error);

            await expect(getAll()).rejects.toThrow(error);
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
        } as unknown as AuthenticatedRequest;

        it('should return stock type detail when found', async () => {
            (stockTypeRepository.findById as jest.Mock).mockResolvedValue(mockStockType);

            const result = await getDetail(mockRequest);

            expect(result).toEqual(mockStockType);
            expect(stockTypeRepository.findById).toHaveBeenCalledWith('st-1');
        });

        it('should throw ErrorNotFoundException when stock type not found', async () => {
            (stockTypeRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(getDetail(mockRequest)).rejects.toThrow(ErrorNotFoundException);
            await expect(getDetail(mockRequest)).rejects.toThrow('Stock type tidak ditemukan');
        });

        it('should propagate errors from repository', async () => {
            const error = new Error('Database error');
            (stockTypeRepository.findById as jest.Mock).mockRejectedValue(error);

            await expect(getDetail(mockRequest)).rejects.toThrow(error);
        });
    });
});
