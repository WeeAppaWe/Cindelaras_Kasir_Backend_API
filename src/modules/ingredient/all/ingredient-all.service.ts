import ingredientAllRepository from './ingredient-all.repository';
import { IngredientReference } from './ingredient-all.types';

/**
 * Get all ingredients (for dropdown/selection)
 */
export const getAllReferences = async (): Promise<IngredientReference[]> => {
    try {
        return await ingredientAllRepository.findAllReferences();
    } catch (error) {
        console.error(`--- Ingredient All Service Error: ${(error as Error).message}`);
        throw error;
    }
};

export const ingredientAllService = {
    getAllReferences,
};

export default ingredientAllService;
