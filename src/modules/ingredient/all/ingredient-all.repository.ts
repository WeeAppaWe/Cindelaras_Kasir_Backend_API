import getPrismaClient from '../../../../database/postgres.connection';
import { handlePrismaError } from '../../../../utility/prisma-error-handler.utility';
import { IngredientReference } from './ingredient-all.types';

const prisma = getPrismaClient();

// Select fields for dropdown/reference usage
const ingredientReferenceSelectFields = {
    ingredient_id: true,
    name: true,
    type: true,
    unit: {
        select: {
            unit_measure_id: true,
            name: true,
        },
    },
};

/**
 * Find all ingredients (for dropdown/selection)
 */
export const findAllReferences = async (): Promise<IngredientReference[]> => {
    try {
        const ingredients = await prisma.ingredient.findMany({
            where: {
                deleted_at: null,
            },
            select: ingredientReferenceSelectFields,
            orderBy: [
                { type: 'asc' },
                { name: 'asc' },
            ],
        });

        return ingredients as IngredientReference[];
    } catch (error) {
        console.error('--- Repository Error:', error);
        handlePrismaError(error);
    }
};

export const ingredientAllRepository = {
    findAllReferences,
};

export default ingredientAllRepository;
