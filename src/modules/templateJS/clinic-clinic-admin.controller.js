const resFormat = require('../../utility/response-api');

// service
const clinicService = require('../service/clinic-clinic-admin.service');

// get all
const showAll = async (req, res, next) => {
    try {
        const data = await clinicService.getAll(req);
        return res.status(200).send(resFormat({ code: 200 }, data));
    } catch (error) {
        next(error);
    }
};

// get detail
const detail = async (req, res, next) => {
    try {
        const data = await clinicService.getDetail(req);
        return res.status(200).send(resFormat({ code: 200 }, data));
    } catch (error) {
        next(error);
    }
};

// create
const create = async (req, res, next) => {
    try {
        const data = await clinicService.create(req);
        return res.status(200).send(resFormat({ code: 200 }, data));
    } catch (error) {
        next(error);
    }
};

// update
const update = async (req, res, next) => {
    try {
        const data = await clinicService.update(req);
        return res.status(200).send(resFormat({ code: 200 }, data));
    } catch (error) {
        next(error);
    }
};

// delete
const softDelete = async (req, res, next) => {
    try {
        const data = await clinicService.softDelete(req);
        return res.status(200).send(resFormat({ code: 200 }, data));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    showAll,
    detail,
    create,
    update,
    softDelete
};
