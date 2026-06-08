const ErrorNotFoundException = require('../../exception/error-not-found.exception').ErrorNotFoundException;
const { v7: uuidv7 } = require('uuid');
const db = require('../../database/mysql.connection');
const { getPagination } = require('../../utility/pagination.utility');
const { getMetadataInfo } = require('../../utility/metadata-info.utility');

// repository
const clinicRepo = require('../repository/clinic-clinic-admin.repository');

// --- main service ---

/**
 * Get all clinics with pagination and filters
 */
const getAll = async (req) => {
    try {
        const pageNumber = parseInt(req.query.batch || 1);
        const pageSize = parseInt(req.query.size || 10);
        const pagination = getPagination(pageNumber, pageSize);

        const options = {
            pagination: {
                limit: pagination.limit,
                offset: pagination.offset
            }
        };

        // set search and/or filter
        const filter = {
            search: req.query.search || null
        };

        const [data, totalData] = await Promise.all([
            clinicRepo.findAll(options, filter),
            clinicRepo.count(filter)
        ]);

        return {
            page: {
                total_record_count: totalData,
                batch_number: pageNumber,
                batch_size: data.length,
                max_batch_size: pageSize
            },
            records: data
        };
    } catch (error) {
        console.error(`--- Service Error: ${error.message}`);
        throw error;
    }
};

/**
 * Get clinic detail by ID
 */
const getDetail = async (req) => {
    try {
        const clinicId = req.params.clinic_id;

        const data = await clinicRepo.findOne({ clinic_id: clinicId });

        if (!data) {
            throw new ErrorNotFoundException('Clinic not found');
        }

        return data;
    } catch (error) {
        console.error(`--- Service Error: ${error.message}`);
        throw error;
    }
};

/**
 * Create new clinic
 */
const create = async (req) => {
    const transaction = await db.sequelize.transaction();

    try {
        const metadata = getMetadataInfo(req);

        const payload = {
            clinic_id: uuidv7(),
            name: req.body.name,
            address: req.body.address || null,
            phone: req.body.phone || null,
            created_at: metadata.current_datetime,
            created_by: metadata.account_id || null,
            updated_at: metadata.current_datetime,
            updated_by: metadata.account_id || null
        };

        const createData = await clinicRepo.create(payload, transaction);

        await transaction.commit();

        return createData;
    } catch (error) {
        await transaction.rollback();
        console.error(`--- Service Error: ${error.message}`);
        throw error;
    }
};

/**
 * Update clinic
 */
const update = async (req) => {
    const clinicId = req.params.clinic_id;
    const transaction = await db.sequelize.transaction();

    try {
        const metadata = getMetadataInfo(req);

        // Check if clinic exists
        const clinic = await clinicRepo.findOne({ clinic_id: clinicId });
        if (!clinic) {
            throw new ErrorNotFoundException('Clinic not found');
        }

        const payload = {
            name: req.body.name || clinic.name,
            address: req.body.address || clinic.address,
            phone: req.body.phone || clinic.phone,
            updated_at: metadata.current_datetime,
            updated_by: metadata.account_id || null
        };

        await clinicRepo.update(payload, { clinic_id: clinicId }, transaction);

        await transaction.commit();

        return payload;
    } catch (error) {
        await transaction.rollback();
        console.error(`--- Service Error: ${error.message}`);
        throw error;
    }
};

/**
 * Soft delete clinic (mark as deleted)
 */
const softDelete = async (req) => {
    const clinicId = req.params.clinic_id;
    const transaction = await db.sequelize.transaction();

    try {
        const metadata = getMetadataInfo(req);

        // Check if clinic exists
        const clinic = await clinicRepo.findOne({ clinic_id: clinicId });
        if (!clinic) {
            throw new ErrorNotFoundException('Clinic not found');
        }

        const payload = {
            deleted_at: metadata.current_datetime,
            deleted_by: metadata.account_id || null,
            updated_at: metadata.current_datetime,
            updated_by: metadata.account_id || null
        };

        await clinicRepo.update(payload, { clinic_id: clinicId }, transaction);

        await transaction.commit();

        return payload;
    } catch (error) {
        await transaction.rollback();
        console.error(`--- Service Error: ${error.message}`);
        throw error;
    }
};

module.exports = {
    getAll,
    getDetail,
    create,
    update,
    softDelete
};
