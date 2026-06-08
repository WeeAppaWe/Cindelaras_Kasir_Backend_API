"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuRecipeController = exports.bulkUpdate = exports.removeRecipe = exports.updateRecipe = exports.addRecipe = exports.showAll = void 0;
const menu_recipe_service_1 = __importDefault(require("./menu-recipe.service"));
const response_api_1 = __importDefault(require("../../../../utility/response-api"));
/**
 * Get All Recipes for a Menu
 * GET /api/menu/:menu_id/recipe
 */
const showAll = async (req, res, next) => {
    try {
        const data = await menu_recipe_service_1.default.getByMenuId(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data resep' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.showAll = showAll;
/**
 * Add Recipe to Menu
 * POST /api/menu/:menu_id/recipe
 */
const addRecipe = async (req, res, next) => {
    try {
        const data = await menu_recipe_service_1.default.addRecipe(req);
        res.status(201).json((0, response_api_1.default)({ code: 201, message: 'Bahan berhasil ditambahkan ke resep' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.addRecipe = addRecipe;
/**
 * Update Recipe Qty
 * PUT /api/menu/:menu_id/recipe/:recipe_id
 */
const updateRecipe = async (req, res, next) => {
    try {
        const data = await menu_recipe_service_1.default.updateRecipe(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Jumlah bahan berhasil diperbarui' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.updateRecipe = updateRecipe;
/**
 * Remove Recipe from Menu
 * DELETE /api/menu/:menu_id/recipe/:recipe_id
 */
const removeRecipe = async (req, res, next) => {
    try {
        const data = await menu_recipe_service_1.default.removeRecipe(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Bahan berhasil dihapus dari resep' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.removeRecipe = removeRecipe;
/**
 * Bulk Update Recipes (Replace All)
 * PUT /api/menu/:menu_id/recipe
 */
const bulkUpdate = async (req, res, next) => {
    try {
        const data = await menu_recipe_service_1.default.bulkUpdateRecipes(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Resep berhasil diperbarui' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.bulkUpdate = bulkUpdate;
exports.menuRecipeController = {
    showAll: exports.showAll,
    addRecipe: exports.addRecipe,
    updateRecipe: exports.updateRecipe,
    removeRecipe: exports.removeRecipe,
    bulkUpdate: exports.bulkUpdate,
};
exports.default = exports.menuRecipeController;
//# sourceMappingURL=menu-recipe.controller.js.map