import { Request, Response, NextFunction } from 'express';
import { Prisma } from '../src/generated/prisma/client';
import { PrismaErrorException } from './prisma-error.exception';
import { ErrorNotFoundException } from './error-not-found.exception';
import { ErrorDataAlreadyExistException } from './error-data-already-exist.exception';
import { ErrorInvalidParameterException } from './error-invalid-parameter.exception';
import { ErrorCodeException } from './error-code.exception';
import { ErrorModelNotFoundException } from './error-model-not-found.exception';
import { ErrorModelDuplicateDataException } from './error-model-duplicate-data.exception';
import { ErrorQueryException } from './error-query.exception';
import { ErrorAuthenticationException } from './error-authentication.exception';
import { ErrorLimitException } from './error-limit.exception';
import { ErrorPreviousStageNotPassed } from './error-previous-stage-not-passed.exception';
import { ErrorSyncronization } from './error-syncronization.exception';
import { ErrorValidationException } from './error-validation.exception';

export const urlValidation = (req: Request, res: Response, next: NextFunction): void => {
    throw new ErrorNotFoundException("Url Not Found");
};

export const handleErrors = (err: Error, req: Request, res: Response, next: NextFunction): Response => {
    if (err instanceof ErrorModelNotFoundException) {
        return res.status(200).json({
            response: {},
            metaData: {
                message: `Ops, ${err.message ? err.message : 'Data tidak ditemukana.'}`,
                code: 200,
                response_code: "5574",
            },
        });
    }

    if (err instanceof ErrorAuthenticationException) {
        return res.status(401).json({
            response: {},
            metaData: {
                message: `${err.message ? err.message : 'Not authenticated, wrong username or password.'}`,
                code: 401,
                response_code: '0001',
            },
        });
    }

    if (err instanceof ErrorNotFoundException) {
        return res.status(404).json({
            response: {},
            metaData: {
                message: err.message || 'Data not found!',
                code: 404,
                response_code: "0001",
            },
        });
    }

    if (err instanceof ErrorDataAlreadyExistException) {
        return res.status(422).json({
            response: {},
            metaData: {
                message: `${err.message ? err.message : 'Data has been used.'}`,
                code: 422,
                response_code: "0001",
            },
        });
    }

    if (err instanceof ErrorInvalidParameterException) {
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

    if (err instanceof ErrorValidationException) {
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

    if (err instanceof ErrorModelDuplicateDataException) {
        return res.status(422).json({
            response: err.data,
            metaData: {
                message: "Ops, " + err.message,
                code: 422,
                response_code: "5542",
            },
        });
    }

    if (err instanceof ErrorCodeException) {
        return res.status(500).json({
            response: err.data,
            metaData: {
                message: `${err.message ? err.message : 'Internal server error.'}`,
                code: 500,
                response_code: "0001",
            },
        });
    }

    if (err instanceof ErrorQueryException) {
        return res.status(err.data.metaData.code).json({
            response: err.data.data,
            metaData: {
                message: "Ops, terjadi kesalahan query. " + err.data.metaData.message,
                code: err.data.metaData.code,
                response_code: err.data.metaData.response_code,
            },
        });
    }

    if (err instanceof ErrorLimitException) {
        return res.status(422).json({
            response: {},
            metaData: {
                message: `${err.message ? err.message : 'Out of limit!'}`,
                code: 422,
                response_code: "0001",
            },
        });
    }

    if (err instanceof ErrorPreviousStageNotPassed) {
        return res.status(422).json({
            response: {},
            metaData: {
                message: err.message,
                code: 422,
                response_code: "0001",
            },
        });
    }

    if (err instanceof ErrorSyncronization) {
        return res.status(422).json({
            response: {},
            metaData: {
                message: err.message,
                code: 422,
                response_code: "0001",
            },
        });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError ||
        err instanceof Prisma.PrismaClientUnknownRequestError ||
        err instanceof Prisma.PrismaClientRustPanicError ||
        err instanceof Prisma.PrismaClientInitializationError ||
        err instanceof Prisma.PrismaClientValidationError
    ) {
        err = new PrismaErrorException(err);
    }

    if (err instanceof PrismaErrorException) {
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

// Re-export all exceptions
export { ErrorNotFoundException } from './error-not-found.exception';
export { ErrorDataAlreadyExistException } from './error-data-already-exist.exception';
export { ErrorInvalidParameterException } from './error-invalid-parameter.exception';
export { ErrorCodeException } from './error-code.exception';
export { ErrorModelNotFoundException } from './error-model-not-found.exception';
export { ErrorModelDuplicateDataException } from './error-model-duplicate-data.exception';
export { ErrorQueryException } from './error-query.exception';
export { ErrorAuthenticationException } from './error-authentication.exception';
export { ErrorLimitException } from './error-limit.exception';
export { ErrorPreviousStageNotPassed } from './error-previous-stage-not-passed.exception';
export { ErrorSyncronization } from './error-syncronization.exception';
export { ErrorValidationException } from './error-validation.exception';
export { PrismaErrorException } from './prisma-error.exception';
