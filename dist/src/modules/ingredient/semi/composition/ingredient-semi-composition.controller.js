"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compositionController = exports.previewHPP = exports.getAvailableIngredients = exports.deleteComposition = exports.updateComposition = exports.bulkAddCompositions = exports.addComposition = exports.showAll = void 0;
const ingredient_semi_composition_service_1 = __importDefault(require("./ingredient-semi-composition.service"));
const response_api_1 = __importDefault(require("../../../../../utility/response-api"));
/**
 * Get All Compositions for Semi Ingredient
 * GET /api/ingredient/semi/:ingredient_id/composition
 */
const showAll = async (req, res, next) => {
    try {
        const data = await ingredient_semi_composition_service_1.default.getCompositions(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil komposisi bahan' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.showAll = showAll;
/**
 * Add Composition to Semi Ingredient
 * POST /api/ingredient/semi/:ingredient_id/composition
 */
const addComposition = async (req, res, next) => {
    try {
        const data = await ingredient_semi_composition_service_1.default.addComposition(req);
        res.status(201).json((0, response_api_1.default)({ code: 201, message: 'Bahan berhasil ditambahkan ke komposisi' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.addComposition = addComposition;
/**
 * Bulk Add Compositions to Semi Ingredient
 * POST /api/ingredient/semi/:ingredient_id/composition/bulk
 */
const bulkAddCompositions = async (req, res, next) => {
    try {
        const data = await ingredient_semi_composition_service_1.default.bulkAddCompositions(req);
        res.status(201).json((0, response_api_1.default)({ code: 201, message: 'Komposisi berhasil diperbarui' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.bulkAddCompositions = bulkAddCompositions;
/**
 * Update Composition Quantity
 * PUT /api/ingredient/semi/:ingredient_id/composition/:composition_id
 */
const updateComposition = async (req, res, next) => {
    try {
        const data = await ingredient_semi_composition_service_1.default.updateComposition(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Komposisi berhasil diperbarui' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.updateComposition = updateComposition;
/**
 * Delete Composition
 * DELETE /api/ingredient/semi/:ingredient_id/composition/:composition_id
 */
const deleteComposition = async (req, res, next) => {
    try {
        const data = await ingredient_semi_composition_service_1.default.deleteComposition(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Komposisi berhasil dihapus' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.deleteComposition = deleteComposition;
/**
 * Get Available Ingredients for Composition (RAW + SEMI, exclude self)
 * GET /api/ingredient/semi/composition/available-ingredients?exclude_id=:ingredient_id
 */
const getAvailableIngredients = async (req, res, next) => {
    try {
        const data = await ingredient_semi_composition_service_1.default.getAvailableIngredients(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil daftar bahan tersedia' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getAvailableIngredients = getAvailableIngredients;
/**
 * Preview HPP Calculation
 * POST /api/ingredient/semi/composition/preview-hpp
 */
const previewHPP = async (req, res, next) => {
    try {
        const data = await ingredient_semi_composition_service_1.default.previewHPP(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil menghitung preview HPP' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.previewHPP = previewHPP;
exports.compositionController = {
    showAll: exports.showAll,
    addComposition: exports.addComposition,
    bulkAddCompositions: exports.bulkAddCompositions,
    updateComposition: exports.updateComposition,
    deleteComposition: exports.deleteComposition,
    getAvailableIngredients: exports.getAvailableIngredients,
    previewHPP: exports.previewHPP,
};
exports.default = exports.compositionController;
//# sourceMappingURL=ingredient-semi-composition.controller.js.map