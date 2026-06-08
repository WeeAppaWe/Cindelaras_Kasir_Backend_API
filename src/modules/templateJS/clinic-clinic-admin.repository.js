const ErrorQueryException = require('../../exception/error-query.exception').ErrorQueryException;
const errorFormat = require('../../utility/error-format');

// model
const db = require('../../database/mysql.connection');
const Clinic = db.clinic;

// --- main repository ---

/**
 * Find all clinics
 */
const findAll = async (options, filter) => {
    try {
        const { pagination } = options;
        const { search = null } = filter;

        const config = {
            attributes: ['clinic_id', 'name', 'address', 'phone', 'created_at', 'updated_at'],
            where: {
                deleted_at: null
            },
            order: [['name', 'ASC']],
            limit: pagination.limit,
            offset: pagination.offset
        };

        // Search
        if (search) {
            config.where[db.Op.or] = [
                { name: { [db.Op.like]: `%${search}%` } }
            ];
        }

        return await Clinic.findAll(config);
    } catch (error) {
        const errObj = await errorFormat.sequelizeDB(error);
        throw new ErrorQueryException(errObj.metaData.message, errObj);
    }
};

/**
 * Count clinics
 */
const count = async (filter) => {
    try {
        const { search = null } = filter;

        const config = {
            where: {
                deleted_at: null
            }
        };

        // Search
        if (search) {
            config.where[db.Op.or] = [
                { name: { [db.Op.like]: `%${search}%` } }
            ];
        }

        return await Clinic.count(config);
    } catch (error) {
        const errObj = await errorFormat.sequelizeDB(error);
        throw new ErrorQueryException(errObj.metaData.message, errObj);
    }
};

/**
 * Find single clinic by where condition
 */
const findOne = async (where) => {
    try {
        const config = {
            attributes: ['clinic_id', 'name', 'address', 'phone', 'created_at', 'updated_at'],
            where: {
                ...where,
                deleted_at: null
            }
        };

        return await Clinic.findOne(config);
    } catch (error) {
        const errObj = await errorFormat.sequelizeDB(error);
        throw new ErrorQueryException(errObj.metaData.message, errObj);
    }
};

/**
 * Create new clinic
 */
const create = async (payload, transaction = null) => {
    try {
        const config = {};

        if (transaction) {
            config.transaction = transaction;
        }

        return await Clinic.create(payload, config);
    } catch (error) {
        const errObj = await errorFormat.sequelizeDB(error);
        throw new ErrorQueryException(errObj.metaData.message, errObj);
    }
};

/**
 * Update clinic
 */
const update = async (payload, where, transaction = null) => {
    try {
        const config = {
            where: where
        };

        if (transaction) {
            config.transaction = transaction;
        }

        return await Clinic.update(payload, config);
    } catch (error) {
        const errObj = await errorFormat.sequelizeDB(error);
        throw new ErrorQueryException(errObj.metaData.message, errObj);
    }
};

// --- functional repository ---

/**
 * Get total clinics by condition (for validation)
 */
const getTotalClinic = async (where = {}, exclude) => {
    try {
        const config = {
            where: {
                ...where,
                deleted_at: null
            }
        };

        if (exclude) {
            config.where = {
                ...where,
                clinic_id: {
                    [db.Op.not]: exclude
                }
            };
        }

        return await Clinic.count(config);
    } catch (error) {
        const errObj = await errorFormat.sequelizeDB(error);
        throw new ErrorQueryException(errObj.metaData.message, errObj);
    }
};

module.exports = {
    findAll,
    count,
    findOne,
    create,
    update,
    getTotalClinic
};
