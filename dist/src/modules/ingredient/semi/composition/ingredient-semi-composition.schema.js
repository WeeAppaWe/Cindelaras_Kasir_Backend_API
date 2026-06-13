"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compositionSchemas = exports.hppPreviewSchema = exports.compositionIdParamSchema = exports.parentIngredientIdParamSchema = exports.bulkAddCompositionsSchema = exports.updateCompositionSchema = exports.createCompositionSchema = void 0;
const zod_1 = require("zod");
// ============================================
// ZOD SCHEMAS
// ============================================
/**
 * Create composition schema
 */
exports.createCompositionSchema = zod_1.z.object({
    child_id: zod_1.z
        .string()
        .uuid('Format ingredient_id tidak valid'),
    qty_needed: zod_1.z
        .number()
        .positive('Jumlah harus lebih dari 0'),
});
/**
 * Update composition schema
 */
exports.updateCompositionSchema = zod_1.z.object({
    qty_needed: zod_1.z
        .number()
        .positive('Jumlah harus lebih dari 0'),
});
/**
 * Bulk add compositions schema
 */
exports.bulkAddCompositionsSchema = zod_1.z.object({
    compositions: zod_1.z.array(zod_1.z.object({
        child_id: zod_1.z.string().uuid('Format ingredient_id tidak valid'),
        qty_needed: zod_1.z.number().positive('Jumlah harus lebih dari 0'),
    })).min(1, 'Minimal 1 bahan dalam komposisi'),
    target_yield: zod_1.z.number().min(0.01, 'Target yield harus lebih dari 0').default(1).optional(),
});
/**
 * Parent ingredient ID param schema
 */
exports.parentIngredientIdParamSchema = zod_1.z.object({
    ingredient_id: zod_1.z
        .string()
        .uuid('Format ingredient_id tidak valid'),
});
/**
 * Composition ID param schema
 */
exports.compositionIdParamSchema = zod_1.z.object({
    ingredient_id: zod_1.z
        .string()
        .uuid('Format ingredient_id tidak valid'),
    composition_id: zod_1.z
        .string()
        .uuid('Format composition_id tidak valid'),
});
/**
 * HPP Preview request schema
 */
exports.hppPreviewSchema = zod_1.z.object({
    compositions: zod_1.z.array(zod_1.z.object({
        ingredient_id: zod_1.z.string().uuid('Format ingredient_id tidak valid'),
        qty_needed: zod_1.z.number().positive('Jumlah harus lebih dari 0'),
    })).min(1, 'Minimal 1 bahan untuk preview HPP'),
    target_yield: zod_1.z.number().min(0.01, 'Target yield harus lebih dari 0').default(1).optional(),
});
// Export schemas
exports.compositionSchemas = {
    create: exports.createCompositionSchema,
    update: exports.updateCompositionSchema,
    bulkAdd: exports.bulkAddCompositionsSchema,
    parentIngredientIdParam: exports.parentIngredientIdParamSchema,
    compositionIdParam: exports.compositionIdParamSchema,
    hppPreview: exports.hppPreviewSchema,
};
exports.default = exports.compositionSchemas;
//# sourceMappingURL=ingredient-semi-composition.schema.js.map