import ingredientAllService from './ingredient-all.service';
import ingredientAllRepository from './ingredient-all.repository';
import { mockAllIngredientReferences } from '../../../tests/mocks/ingredient.mock';

// Mock dependencies
jest.mock('../../../generated/prisma/client', () => ({
    Prisma: {
        PrismaClientKnownRequestError: class PrismaClientKnownRequestError extends Error { },
        PrismaClientUnknownRequestError: class PrismaClientUnknownRequestError extends Error { },
        PrismaClientRustPanicError: class PrismaClientRustPanicError extends Error { },
        PrismaClientInitializationError: class PrismaClientInitializationError extends Error { },
        PrismaClientValidationError: class PrismaClientValidationError extends Error { },
    },
}));
jest.mock('./ingredient-all.repository');
jest.mock('../../../../database/postgres.connection', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        ingredient: {
            findMany: jest.fn(),
        },
    })),
}));

describe('Ingredient All Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllReferences', () => {
        it('should return all ingredient references for dropdown', async () => {
            // Arrange
            (ingredientAllRepository.findAllReferences as jest.Mock).mockResolvedValue(mockAllIngredientReferences);

            // Act
            const result = await ingredientAllService.getAllReferences();

            // Assert
            expect(result).toHaveLength(2);
            expect(result[0].type).toBe('RAW');
            expect(result[1].type).toBe('SEMI');
            expect(result).toEqual(mockAllIngredientReferences);
            expect(ingredientAllRepository.findAllReferences).toHaveBeenCalledTimes(1);
        });

        it('should return empty array when no ingredient references exist', async () => {
            // Arrange
            (ingredientAllRepository.findAllReferences as jest.Mock).mockResolvedValue([]);

            // Act
            const result = await ingredientAllService.getAllReferences();

            // Assert
            expect(result).toHaveLength(0);
            expect(ingredientAllRepository.findAllReferences).toHaveBeenCalledTimes(1);
        });

        it('should propagate error from repository', async () => {
            // Arrange
            const mockError = new Error('Database connection failed');
            (ingredientAllRepository.findAllReferences as jest.Mock).mockRejectedValue(mockError);

            // Act & Assert
            await expect(ingredientAllService.getAllReferences())
                .rejects
                .toThrow('Database connection failed');
        });
    });
});
