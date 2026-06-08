"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawIngredientSchemas = exports.rawIngredientListQuerySchema = exports.ingredientIdParamSchema = exports.updateRawIngredientSchema = exports.createRawIngredientSchema = exports.IngredientType = void 0;
const zod_1 = require("zod");
// ============================================
// CONSTANTS
// ============================================
/**
 * Ingredient type - RAW for raw materials
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
 * Create raw ingredient schema
 */
exports.createRawIngredientSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, 'Nama bahan baku minimal 2 karakter')
        .max(100, 'Nama bahan baku maksimal 100 karakter'),
    unit_id: zod_1.z
        .string()
        .uuid('Format unit_id tidak valid'),
    stock_qty: zod_1.z
        .number()
        .min(0, 'Stok tidak boleh negatif')
        .default(0)
        .optional(),
    min_stock: zod_1.z
        .number()
        .min(0, 'Stok minimal tidak boleh negatif'),
    avg_cost: zod_1.z
        .number()
        .min(0, 'Harga rata-rata tidak boleh negatif')
        .default(0)
        .optional(),
});
/**
 * Update raw ingredient schema
 */
exports.updateRawIngredientSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, 'Nama bahan baku minimal 2 karakter')
        .max(100, 'Nama bahan baku maksimal 100 karakter')
        .optional(),
    unit_id: zod_1.z
        .string()
        .uuid('Format unit_id tidak valid')
        .optional(),
    min_stock: zod_1.z
        .number()
        .min(0, 'Stok minimal tidak boleh negatif')
        .optional(),
    avg_cost: zod_1.z
        .number()
        .min(0, 'Harga rata-rata tidak boleh negatif')
        .optional(),
});
/**
 * Ingredient ID param schema
 */
exports.ingredientIdParamSchema = zod_1.z.object({
    ingredient_id: zod_1.z
        .string()
        .uuid('Format ingredient_id tidak valid'),
});
/**
 * Query params schema for list raw ingredients
 */
exports.rawIngredientListQuerySchema = zod_1.z.object({
    batch: zod_1.z.coerce.number().min(1).default(1).optional(),
    size: zod_1.z.coerce.number().min(1).max(100).default(10).optional(),
    search: zod_1.z.string().optional(),
    unit_id: zod_1.z.string().uuid('Format unit_id tidak valid').optional(),
    low_stock: zod_1.z.coerce.boolean().optional(),
});
// Export schemas
exports.rawIngredientSchemas = {
    create: exports.createRawIngredientSchema,
    update: exports.updateRawIngredientSchema,
    ingredientIdParam: exports.ingredientIdParamSchema,
    listQuery: exports.rawIngredientListQuerySchema,
};
exports.default = exports.rawIngredientSchemas;
//# sourceMappingURL=ingredient-raw.schema.js.map