import { z } from 'zod';
/**
 * Query params schema for all ingredient references
 */
export declare const ingredientAllReferenceQuerySchema: z.ZodObject<{}, z.core.$strip>;
export type IngredientAllReferenceQuery = z.infer<typeof ingredientAllReferenceQuerySchema>;
export declare const ingredientAllSchemas: {
    referenceQuery: z.ZodObject<{}, z.core.$strip>;
};
export default ingredientAllSchemas;
//# sourceMappingURL=ingredient-all.schema.d.ts.map