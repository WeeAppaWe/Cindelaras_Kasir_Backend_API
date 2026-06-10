import { z } from 'zod';

/**
 * Query params schema for all ingredient references
 */
export const ingredientAllReferenceQuerySchema = z.object({});

// Infer types from schemas
export type IngredientAllReferenceQuery = z.infer<typeof ingredientAllReferenceQuerySchema>;

// Export schemas
export const ingredientAllSchemas = {
    referenceQuery: ingredientAllReferenceQuerySchema,
};

export default ingredientAllSchemas;
