"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semiIngredientSchemas = exports.semiIngredientListQuerySchema = exports.semiIngredientIdParamSchema = exports.updateSemiIngredientSchema = exports.createSemiIngredientSchema = exports.IngredientType = void 0;
const zod_1 = require("zod");
// ============================================
// CONSTANTS
// ============================================
/**
 * Ingredient type - SEMI for semi-finished materials
 */
var IngredientType;
(function (IngredientType) {
    IngredientType["RAW"] = "RAW";
    IngredientType["SEMI"] = "SEMI";
})(IngredientType || (exports.IngredientType = IngredientType = {}));
// ============================================
// ZOD SCHEMAS
// ============================================
/**
 * Create semi ingredient schema
 */
exports.createSemiIngredientSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, 'Nama bahan setengah jadi minimal 2 karakter')
        .max(100, 'Nama bahan setengah jadi maksimal 100 karakter'),
    unit_id: zod_1.z
        .string()
        .uuid('Format unit_id tidak valid'),
    min_stock: zod_1.z
        .number()
        .min(0, 'Stok minimal tidak boleh negatif'),
    target_yield: zod_1.z
        .number()
        .min(0.01, 'Target yield harus lebih dari 0')
        .default(1)
        .optional(),
});
/**
 * Update semi ingredient schema
 */
exports.updateSemiIngredientSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, 'Nama bahan setengah jadi minimal 2 karakter')
        .max(100, 'Nama bahan setengah jadi maksimal 100 karakter')
        .optional(),
    unit_id: zod_1.z
        .string()
        .uuid('Format unit_id tidak valid')
        .optional(),
    min_stock: zod_1.z
        .number()
        .min(0, 'Stok minimal tidak boleh negatif')
        .optional(),
    target_yield: zod_1.z
        .number()
        .min(0.01, 'Target yield harus lebih dari 0')
        .optional(),
});
/**
 * Ingredient ID param schema
 */
exports.semiIngredientIdParamSchema = zod_1.z.object({
    ingredient_id: zod_1.z
        .string()
        .uuid('Format ingredient_id tidak valid'),
});
/**
 * Query params schema for list semi ingredients
 */
exports.semiIngredientListQuerySchema = zod_1.z.object({
    batch: zod_1.z.coerce.number().min(1).default(1).optional(),
    size: zod_1.z.coerce.number().min(1).max(100).default(10).optional(),
    search: zod_1.z.string().optional(),
    unit_id: zod_1.z.string().uuid('Format unit_id tidak valid').optional(),
});
// Export schemas
exports.semiIngredientSchemas = {
    create: exports.createSemiIngredientSchema,
    update: exports.updateSemiIngredientSchema,
    ingredientIdParam: exports.semiIngredientIdParamSchema,
    listQuery: exports.semiIngredientListQuerySchema,
};
exports.default = exports.semiIngredientSchemas;
//# sourceMappingURL=ingredient-semi.schema.js.map