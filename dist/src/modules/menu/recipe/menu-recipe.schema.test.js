"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menu_recipe_schema_1 = require("./menu-recipe.schema");
const menu_mock_1 = require("../../../tests/mocks/menu.mock");
// ============================================
// CREATE RECIPE SCHEMA TESTS
// ============================================
describe('Recipe Schema Validation', () => {
    describe('createRecipeSchema', () => {
        it('should pass validation with valid data', () => {
            const result = menu_recipe_schema_1.createRecipeSchema.safeParse(menu_mock_1.mockCreateRecipeData.valid);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.ingredient_id).toBe('aaa08400-e29b-41d4-a716-446655440001');
                expect(result.data.qty_needed).toBe(100);
            }
        });
        it('should fail validation with invalid ingredient_id', () => {
            const result = menu_recipe_schema_1.createRecipeSchema.safeParse({
                ingredient_id: 'invalid-uuid',
                qty_needed: 100,
            });
            expect(result.success).toBe(false);
        });
        it('should fail validation with zero qty_needed', () => {
            const result = menu_recipe_schema_1.createRecipeSchema.safeParse({
                ingredient_id: 'aaa08400-e29b-41d4-a716-446655440001',
                qty_needed: 0,
            });
            expect(result.success).toBe(false);
        });
        it('should fail validation with negative qty_needed', () => {
            const result = menu_recipe_schema_1.createRecipeSchema.safeParse({
                ingredient_id: 'aaa08400-e29b-41d4-a716-446655440001',
                qty_needed: -10,
            });
            expect(result.success).toBe(false);
        });
        it('should pass validation with decimal qty_needed', () => {
            const result = menu_recipe_schema_1.createRecipeSchema.safeParse({
                ingredient_id: 'aaa08400-e29b-41d4-a716-446655440001',
                qty_needed: 0.5,
            });
            expect(result.success).toBe(true);
        });
    });
    // ============================================
    // UPDATE RECIPE SCHEMA TESTS
    // ============================================
    describe('updateRecipeSchema', () => {
        it('should pass validation with valid qty_needed', () => {
            const result = menu_recipe_schema_1.updateRecipeSchema.safeParse({ qty_needed: 200 });
            expect(result.success).toBe(true);
        });
        it('should fail validation with zero qty_needed', () => {
            const result = menu_recipe_schema_1.updateRecipeSchema.safeParse({ qty_needed: 0 });
            expect(result.success).toBe(false);
        });
        it('should fail validation with negative qty_needed', () => {
            const result = menu_recipe_schema_1.updateRecipeSchema.safeParse({ qty_needed: -50 });
            expect(result.success).toBe(false);
        });
    });
    // ============================================
    // BULK RECIPE SCHEMA TESTS
    // ============================================
    describe('bulkRecipeSchema', () => {
        it('should pass validation with valid recipes array', () => {
            const result = menu_recipe_schema_1.bulkRecipeSchema.safeParse(menu_mock_1.mockBulkRecipeData.valid);
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.recipes).toHaveLength(2);
            }
        });
        it('should fail validation with empty recipes array', () => {
            const result = menu_recipe_schema_1.bulkRecipeSchema.safeParse({ recipes: [] });
            expect(result.success).toBe(false);
            if (!result.success) {
                const recipeError = result.error.issues.find((issue) => issue.path.includes('recipes'));
                expect(recipeError).toBeDefined();
            }
        });
        it('should fail validation with invalid ingredient_id in recipe', () => {
            const result = menu_recipe_schema_1.bulkRecipeSchema.safeParse({
                recipes: [
                    { ingredient_id: 'invalid-uuid', qty_needed: 100 },
                ],
            });
            expect(result.success).toBe(false);
        });
        it('should fail validation with zero qty_needed in recipe', () => {
            const result = menu_recipe_schema_1.bulkRecipeSchema.safeParse({
                recipes: [
                    { ingredient_id: 'aaa08400-e29b-41d4-a716-446655440001', qty_needed: 0 },
                ],
            });
            expect(result.success).toBe(false);
        });
    });
    // ============================================
    // RECIPE ID PARAM SCHEMA TESTS
    // ============================================
    describe('recipeIdParamSchema', () => {
        it('should pass validation with valid UUIDs', () => {
            const result = menu_recipe_schema_1.recipeIdParamSchema.safeParse({
                menu_id: '990e8400-e29b-41d4-a716-446655440001',
                recipe_id: 'ccc08400-e29b-41d4-a716-446655440001',
            });
            expect(result.success).toBe(true);
        });
        it('should fail validation with invalid menu_id', () => {
            const result = menu_recipe_schema_1.recipeIdParamSchema.safeParse({
                menu_id: 'invalid-uuid',
                recipe_id: 'ccc08400-e29b-41d4-a716-446655440001',
            });
            expect(result.success).toBe(false);
        });
        it('should fail validation with invalid recipe_id', () => {
            const result = menu_recipe_schema_1.recipeIdParamSchema.safeParse({
                menu_id: '990e8400-e29b-41d4-a716-446655440001',
                recipe_id: 'invalid-uuid',
            });
            expect(result.success).toBe(false);
        });
        it('should fail validation with missing params', () => {
            const result = menu_recipe_schema_1.recipeIdParamSchema.safeParse({});
            expect(result.success).toBe(false);
        });
    });
    // ============================================
    // MENU RECIPE PARAM SCHEMA TESTS
    // ============================================
    describe('menuRecipeParamSchema', () => {
        it('should pass validation with valid menu_id', () => {
            const result = menu_recipe_schema_1.menuRecipeParamSchema.safeParse({
                menu_id: '990e8400-e29b-41d4-a716-446655440001',
            });
            expect(result.success).toBe(true);
        });
        it('should fail validation with invalid menu_id', () => {
            const result = menu_recipe_schema_1.menuRecipeParamSchema.safeParse({
                menu_id: 'invalid-uuid',
            });
            expect(result.success).toBe(false);
        });
    });
});
//# sourceMappingURL=menu-recipe.schema.test.js.map