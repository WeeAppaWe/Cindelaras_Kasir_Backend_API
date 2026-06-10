"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredientAllSchemas = exports.ingredientAllReferenceQuerySchema = void 0;
const zod_1 = require("zod");
/**
 * Query params schema for all ingredient references
 */
exports.ingredientAllReferenceQuerySchema = zod_1.z.object({});
// Export schemas
exports.ingredientAllSchemas = {
    referenceQuery: exports.ingredientAllReferenceQuerySchema,
};
exports.default = exports.ingredientAllSchemas;
//# sourceMappingURL=ingredient-all.schema.js.map