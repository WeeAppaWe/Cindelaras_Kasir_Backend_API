"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.semiIngredientController = exports.createAndProduce = exports.produce = exports.recalculateHPP = exports.getHPPCalculation = exports.getUnitMeasures = exports.softDelete = exports.update = exports.create = exports.detail = exports.showAll = void 0;
const ingredient_semi_service_1 = __importDefault(require("./ingredient-semi.service"));
const unit_measure_service_1 = __importDefault(require("../../unit-measure/unit-measure.service"));
const response_api_1 = __importDefault(require("../../../../utility/response-api"));
/**
 * Get All Semi Ingredients
 * GET /api/ingredient/semi
 */
const showAll = async (req, res, next) => {
    try {
        const data = await ingredient_semi_service_1.default.getAll(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data bahan setengah jadi' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.showAll = showAll;
/**
 * Get Semi Ingredient Detail (with compositions and HPP)
 * GET /api/ingredient/semi/:ingredient_id
 */
const detail = async (req, res, next) => {
    try {
        const data = await ingredient_semi_service_1.default.getDetail(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil detail bahan setengah jadi' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.detail = detail;
/**
 * Create New Semi Ingredient
 * POST /api/ingredient/semi
 */
const create = async (req, res, next) => {
    try {
        const data = await ingredient_semi_service_1.default.create(req);
        res.status(201).json((0, response_api_1.default)({ code: 201, message: 'Bahan setengah jadi berhasil dibuat' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
/**
 * Update Semi Ingredient
 * PUT /api/ingredient/semi/:ingredient_id
 */
const update = async (req, res, next) => {
    try {
        const data = await ingredient_semi_service_1.default.update(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Bahan setengah jadi berhasil diperbarui' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
/**
 * Delete Semi Ingredient (Soft Delete)
 * DELETE /api/ingredient/semi/:ingredient_id
 */
const softDelete = async (req, res, next) => {
    try {
        const data = await ingredient_semi_service_1.default.softDelete(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Bahan setengah jadi berhasil dihapus' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.softDelete = softDelete;
/**
 * Get All Unit Measures (for dropdown)
 * GET /api/ingredient/semi/units
 */
const getUnitMeasures = async (req, res, next) => {
    try {
        const data = await unit_measure_service_1.default.getAllReferences();
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil mengambil data satuan' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getUnitMeasures = getUnitMeasures;
/**
 * Get HPP Calculation for Semi Ingredient
 * GET /api/ingredient/semi/:ingredient_id/hpp
 */
const getHPPCalculation = async (req, res, next) => {
    try {
        const ingredientId = req.params.ingredient_id;
        const targetYield = parseFloat(req.query.target_yield) || 1;
        const data = await ingredient_semi_service_1.default.getHPPCalculation(ingredientId, targetYield);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Berhasil menghitung HPP' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.getHPPCalculation = getHPPCalculation;
/**
 * Recalculate and Update avg_cost (HPP per unit)
 * POST /api/ingredient/semi/:ingredient_id/recalculate-hpp
 */
const recalculateHPP = async (req, res, next) => {
    try {
        const ingredientId = req.params.ingredient_id;
        const targetYield = parseFloat(req.body.target_yield) || 1;
        const newAvgCost = await ingredient_semi_service_1.default.recalculateAvgCost(ingredientId, targetYield);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'HPP berhasil dihitung ulang' }, { avg_cost: newAvgCost }));
    }
    catch (error) {
        next(error);
    }
};
exports.recalculateHPP = recalculateHPP;
/**
 * Produce Semi Ingredient — deduct child stock, increment semi stock
 * POST /api/ingredient/semi/:ingredient_id/produce
 */
const produce = async (req, res, next) => {
    try {
        const data = await ingredient_semi_service_1.default.produce(req);
        res.status(200).json((0, response_api_1.default)({ code: 200, message: 'Produksi berhasil dicatat' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.produce = produce;
/**
 * Create and Produce Semi Ingredient (all-in-one)
 * POST /api/ingredient/semi/create-and-produce
 */
const createAndProduce = async (req, res, next) => {
    try {
        const data = await ingredient_semi_service_1.default.createAndProduce(req);
        res.status(201).json((0, response_api_1.default)({ code: 201, message: 'Bahan setengah jadi berhasil dibuat dan diproduksi' }, data));
    }
    catch (error) {
        next(error);
    }
};
exports.createAndProduce = createAndProduce;
exports.semiIngredientController = {
    showAll: exports.showAll,
    detail: exports.detail,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
    getUnitMeasures: exports.getUnitMeasures,
    getHPPCalculation: exports.getHPPCalculation,
    recalculateHPP: exports.recalculateHPP,
    produce: exports.produce,
    createAndProduce: exports.createAndProduce,
};
exports.default = exports.semiIngredientController;
//# sourceMappingURL=ingredient-semi.controller.js.map