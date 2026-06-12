"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredientAllRepository = exports.findAllReferences = void 0;
const postgres_connection_1 = __importDefault(require("../../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
// Select fields for dropdown/reference usage
const ingredientReferenceSelectFields = {
    ingredient_id: true,
    name: true,
    type: true,
    avg_cost: true,
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
const findAllReferences = async () => {
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
        return ingredients;
    }
    catch (error) {
        console.error('--- Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findAllReferences = findAllReferences;
exports.ingredientAllRepository = {
    findAllReferences: exports.findAllReferences,
};
exports.default = exports.ingredientAllRepository;
//# sourceMappingURL=ingredient-all.repository.js.map