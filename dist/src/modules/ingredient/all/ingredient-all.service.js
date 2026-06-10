"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredientAllService = exports.getAllReferences = void 0;
const ingredient_all_repository_1 = __importDefault(require("./ingredient-all.repository"));
/**
 * Get all ingredients (for dropdown/selection)
 */
const getAllReferences = async () => {
    try {
        return await ingredient_all_repository_1.default.findAllReferences();
    }
    catch (error) {
        console.error(`--- Ingredient All Service Error: ${error.message}`);
        throw error;
    }
};
exports.getAllReferences = getAllReferences;
exports.ingredientAllService = {
    getAllReferences: exports.getAllReferences,
};
exports.default = exports.ingredientAllService;
//# sourceMappingURL=ingredient-all.service.js.map