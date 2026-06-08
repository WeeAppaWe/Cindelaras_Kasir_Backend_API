"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitMeasureRepository = exports.hasIngredients = exports.softDelete = exports.update = exports.create = exports.findByName = exports.findById = exports.count = exports.findAll = exports.findAllReferences = void 0;
const postgres_connection_1 = __importDefault(require("../../../database/postgres.connection"));
const prisma_error_handler_utility_1 = require("../../../utility/prisma-error-handler.utility");
const prisma = (0, postgres_connection_1.default)();
// Select fields for dropdown/reference usage
const unitMeasureReferenceSelectFields = {
    unit_measure_id: true,
    name: true,
};
// Select fields for CRUD responses
const unitMeasureSelectFields = {
    ...unitMeasureReferenceSelectFields,
    created_at: true,
    updated_at: true,
};
/**
 * Find all unit measures (for dropdown/selection)
 */
const findAllReferences = async () => {
    try {
        const units = await prisma.unitMeasure.findMany({
            where: { deleted_at: null },
            select: unitMeasureReferenceSelectFields,
            orderBy: { name: 'asc' },
        });
        return units;
    }
    catch (error) {
        console.error('--- Unit Measure Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findAllReferences = findAllReferences;
/**
 * Find all unit measures with pagination and filters
 */
const findAll = async (options, filter) => {
    try {
        const { pagination } = options;
        const { search } = filter;
        const where = {
            deleted_at: null,
        };
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }
        const units = await prisma.unitMeasure.findMany({
            where,
            select: unitMeasureSelectFields,
            orderBy: { name: 'asc' },
            take: pagination.limit,
            skip: pagination.offset,
        });
        return units;
    }
    catch (error) {
        console.error('--- Unit Measure Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findAll = findAll;
/**
 * Count unit measures with filters
 */
const count = async (filter) => {
    try {
        const { search } = filter;
        const where = {
            deleted_at: null,
        };
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }
        return await prisma.unitMeasure.count({ where });
    }
    catch (error) {
        console.error('--- Unit Measure Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.count = count;
/**
 * Find unit measure by ID
 */
const findById = async (unitMeasureId) => {
    try {
        const unit = await prisma.unitMeasure.findUnique({
            where: {
                unit_measure_id: unitMeasureId,
                deleted_at: null,
            },
            select: unitMeasureSelectFields,
        });
        return unit;
    }
    catch (error) {
        console.error('--- Unit Measure Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findById = findById;
/**
 * Find unit measure by name (for validation - check duplicate)
 */
const findByName = async (name, excludeUnitMeasureId) => {
    try {
        const where = {
            name: { equals: name, mode: 'insensitive' },
            deleted_at: null,
        };
        if (excludeUnitMeasureId) {
            where.unit_measure_id = { not: excludeUnitMeasureId };
        }
        const unit = await prisma.unitMeasure.findFirst({
            where,
            select: unitMeasureSelectFields,
        });
        return unit;
    }
    catch (error) {
        console.error('--- Unit Measure Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.findByName = findByName;
/**
 * Create new unit measure
 */
const create = async (data, transaction) => {
    try {
        const client = transaction || prisma;
        const unit = await client.unitMeasure.create({
            data,
            select: unitMeasureSelectFields,
        });
        return unit;
    }
    catch (error) {
        console.error('--- Unit Measure Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.create = create;
/**
 * Update unit measure by ID
 */
const update = async (unitMeasureId, data, transaction) => {
    try {
        const client = transaction || prisma;
        const unit = await client.unitMeasure.update({
            where: { unit_measure_id: unitMeasureId },
            data,
            select: unitMeasureSelectFields,
        });
        return unit;
    }
    catch (error) {
        console.error('--- Unit Measure Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.update = update;
/**
 * Soft delete unit measure (set deleted_at)
 */
const softDelete = async (unitMeasureId, transaction) => {
    try {
        const client = transaction || prisma;
        await client.unitMeasure.update({
            where: { unit_measure_id: unitMeasureId },
            data: { deleted_at: new Date() },
        });
    }
    catch (error) {
        console.error('--- Unit Measure Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.softDelete = softDelete;
/**
 * Check if unit measure has active ingredients
 */
const hasIngredients = async (unitMeasureId) => {
    try {
        const count = await prisma.ingredient.count({
            where: {
                unit_id: unitMeasureId,
                deleted_at: null,
            },
        });
        return count > 0;
    }
    catch (error) {
        console.error('--- Unit Measure Repository Error:', error);
        (0, prisma_error_handler_utility_1.handlePrismaError)(error);
    }
};
exports.hasIngredients = hasIngredients;
exports.unitMeasureRepository = {
    findAllReferences: exports.findAllReferences,
    findAll: exports.findAll,
    count: exports.count,
    findById: exports.findById,
    findByName: exports.findByName,
    create: exports.create,
    update: exports.update,
    softDelete: exports.softDelete,
    hasIngredients: exports.hasIngredients,
};
exports.default = exports.unitMeasureRepository;
//# sourceMappingURL=unit-measure.repository.js.map