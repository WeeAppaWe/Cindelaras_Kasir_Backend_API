"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredientAllController = exports.getReferences = void 0;
const ingredient_all_service_1 = __importDefault(require("./ingredient-all.service"));
const response_api_1 = __importDefault(require("../../../../utility/response-api"));
/**
 * Get Ingredient References (for dropdown)
 * GET /api/ingredient/options
 */
const getReferences = async (req, res, next) => {
    try {
        const data = await ingredient_all_service_1.default.getAllReferences();
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data pilihan bahan' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getReferences = getReferences;
exports.ingredientAllController = {
    getReferences: exports.getReferences,
};
exports.default = exports.ingredientAllController;
//# sourceMappingURL=ingredient-all.controller.js.map