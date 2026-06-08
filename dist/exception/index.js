"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaErrorException = exports.ErrorValidationException = exports.ErrorSyncronization = exports.ErrorPreviousStageNotPassed = exports.ErrorLimitException = exports.ErrorAuthenticationException = exports.ErrorQueryException = exports.ErrorModelDuplicateDataException = exports.ErrorModelNotFoundException = exports.ErrorCodeException = exports.ErrorInvalidParameterException = exports.ErrorDataAlreadyExistException = exports.ErrorNotFoundException = exports.handleErrors = exports.urlValidation = void 0;
const client_1 = require("../src/generated/prisma/client");
const prisma_error_exception_1 = require("./prisma-error.exception");
const error_not_found_exception_1 = require("./error-not-found.exception");
const error_data_already_exist_exception_1 = require("./error-data-already-exist.exception");
const error_invalid_parameter_exception_1 = require("./error-invalid-parameter.exception");
const error_code_exception_1 = require("./error-code.exception");
const error_model_not_found_exception_1 = require("./error-model-not-found.exception");
const error_model_duplicate_data_exception_1 = require("./error-model-duplicate-data.exception");
const error_query_exception_1 = require("./error-query.exception");
const error_authentication_exception_1 = require("./error-authentication.exception");
const error_limit_exception_1 = require("./error-limit.exception");
const error_previous_stage_not_passed_exception_1 = require("./error-previous-stage-not-passed.exception");
const error_syncronization_exception_1 = require("./error-syncronization.exception");
const error_validation_exception_1 = require("./error-validation.exception");
const urlValidation = (req, res, next) => {
    throw new error_not_found_exception_1.ErrorNotFoundException("Url Not Found");
};
exports.urlValidation = urlValidation;
const handleErrors = (err, req, res, next) => {
    if (err instanceof error_model_not_found_exception_1.ErrorModelNotFoundException) {
        return res.status(200).json({
            response: {},
            metaData: {
                message: `Ops, ${err.message ? err.message : 'Data tidak ditemukana.'}`,
                code: 200,
                response_code: "5574",
            },
        });
    }
    if (err instanceof error_authentication_exception_1.ErrorAuthenticationException) {
        return res.status(401).json({
            response: {},
            metaData: {
                message: `${err.message ? err.message : 'Not authenticated, wrong username or password.'}`,
                code: 401,
                response_code: '0001',
            },
        });
    }
    if (err instanceof error_not_found_exception_1.ErrorNotFoundException) {
        return res.status(404).json({
            response: {},
            metaData: {
                message: err.message || 'Data not found!',
                code: 404,
                response_code: "0001",
            },
        });
    }
    if (err instanceof error_data_already_exist_exception_1.ErrorDataAlreadyExistException) {
        return res.status(422).json({
            response: {},
            metaData: {
                message: `${err.message ? err.message : 'Data has been used.'}`,
                code: 422,
                response_code: "0001",
            },
        });
    }
    if (err instanceof error_invalid_parameter_exception_1.ErrorInvalidParameterException) {
        return res.status(422).json({
            response: {
                error: err.data
            },
            metaData: {
                message: err.message,
                code: 422,
                response_code: "5505",
            },
        });
    }
    if (err instanceof error_validation_exception_1.ErrorValidationException) {
        return res.status(422).json({
            response: {
                error: err.data
            },
            metaData: {
                message: err.message,
                code: 422,
                response_code: "5505",
            },
        });
    }
    if (err instanceof error_model_duplicate_data_exception_1.ErrorModelDuplicateDataException) {
        return res.status(422).json({
            response: err.data,
            metaData: {
                message: "Ops, " + err.message,
                code: 422,
                response_code: "5542",
            },
        });
    }
    if (err instanceof error_code_exception_1.ErrorCodeException) {
        return res.status(500).json({
            response: err.data,
            metaData: {
                message: `${err.message ? err.message : 'Internal server error.'}`,
                code: 500,
                response_code: "0001",
            },
        });
    }
    if (err instanceof error_query_exception_1.ErrorQueryException) {
        return res.status(err.data.metaData.code).json({
            response: err.data.data,
            metaData: {
                message: "Ops, terjadi kesalahan query. " + err.data.metaData.message,
                code: err.data.metaData.code,
                response_code: err.data.metaData.response_code,
            },
        });
    }
    if (err instanceof error_limit_exception_1.ErrorLimitException) {
        return res.status(422).json({
            response: {},
            metaData: {
                message: `${err.message ? err.message : 'Out of limit!'}`,
                code: 422,
                response_code: "0001",
            },
        });
    }
    if (err instanceof error_previous_stage_not_passed_exception_1.ErrorPreviousStageNotPassed) {
        return res.status(422).json({
            response: {},
            metaData: {
                message: err.message,
                code: 422,
                response_code: "0001",
            },
        });
    }
    if (err instanceof error_syncronization_exception_1.ErrorSyncronization) {
        return res.status(422).json({
            response: {},
            metaData: {
                message: err.message,
                code: 422,
                response_code: "0001",
            },
        });
    }
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError ||
        err instanceof client_1.Prisma.PrismaClientUnknownRequestError ||
        err instanceof client_1.Prisma.PrismaClientRustPanicError ||
        err instanceof client_1.Prisma.PrismaClientInitializationError ||
        err instanceof client_1.Prisma.PrismaClientValidationError) {
        err = new prisma_error_exception_1.PrismaErrorException(err);
    }
    if (err instanceof prisma_error_exception_1.PrismaErrorException) {
        return res.status(err.statusCode).json({
            response: {},
            metaData: {
                message: err.message,
                code: err.statusCode,
                response_code: err.response_code,
            },
        });
    }
    console.error(err);
    return res.status(500).json({
        response: {},
        metaData: {
            message: "Ops, " + err.message,
            code: 500,
            response_code: "0001",
        },
    });
};
exports.handleErrors = handleErrors;
// Re-export all exceptions
var error_not_found_exception_2 = require("./error-not-found.exception");
Object.defineProperty(exports, "ErrorNotFoundException", { enumerable: true, get: function () { return error_not_found_exception_2.ErrorNotFoundException; } });
var error_data_already_exist_exception_2 = require("./error-data-already-exist.exception");
Object.defineProperty(exports, "ErrorDataAlreadyExistException", { enumerable: true, get: function () { return error_data_already_exist_exception_2.ErrorDataAlreadyExistException; } });
var error_invalid_parameter_exception_2 = require("./error-invalid-parameter.exception");
Object.defineProperty(exports, "ErrorInvalidParameterException", { enumerable: true, get: function () { return error_invalid_parameter_exception_2.ErrorInvalidParameterException; } });
var error_code_exception_2 = require("./error-code.exception");
Object.defineProperty(exports, "ErrorCodeException", { enumerable: true, get: function () { return error_code_exception_2.ErrorCodeException; } });
var error_model_not_found_exception_2 = require("./error-model-not-found.exception");
Object.defineProperty(exports, "ErrorModelNotFoundException", { enumerable: true, get: function () { return error_model_not_found_exception_2.ErrorModelNotFoundException; } });
var error_model_duplicate_data_exception_2 = require("./error-model-duplicate-data.exception");
Object.defineProperty(exports, "ErrorModelDuplicateDataException", { enumerable: true, get: function () { return error_model_duplicate_data_exception_2.ErrorModelDuplicateDataException; } });
var error_query_exception_2 = require("./error-query.exception");
Object.defineProperty(exports, "ErrorQueryException", { enumerable: true, get: function () { return error_query_exception_2.ErrorQueryException; } });
var error_authentication_exception_2 = require("./error-authentication.exception");
Object.defineProperty(exports, "ErrorAuthenticationException", { enumerable: true, get: function () { return error_authentication_exception_2.ErrorAuthenticationException; } });
var error_limit_exception_2 = require("./error-limit.exception");
Object.defineProperty(exports, "ErrorLimitException", { enumerable: true, get: function () { return error_limit_exception_2.ErrorLimitException; } });
var error_previous_stage_not_passed_exception_2 = require("./error-previous-stage-not-passed.exception");
Object.defineProperty(exports, "ErrorPreviousStageNotPassed", { enumerable: true, get: function () { return error_previous_stage_not_passed_exception_2.ErrorPreviousStageNotPassed; } });
var error_syncronization_exception_2 = require("./error-syncronization.exception");
Object.defineProperty(exports, "ErrorSyncronization", { enumerable: true, get: function () { return error_syncronization_exception_2.ErrorSyncronization; } });
var error_validation_exception_2 = require("./error-validation.exception");
Object.defineProperty(exports, "ErrorValidationException", { enumerable: true, get: function () { return error_validation_exception_2.ErrorValidationException; } });
var prisma_error_exception_2 = require("./prisma-error.exception");
Object.defineProperty(exports, "PrismaErrorException", { enumerable: true, get: function () { return prisma_error_exception_2.PrismaErrorException; } });
//# sourceMappingURL=index.js.map