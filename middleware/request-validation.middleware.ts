import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { ErrorInvalidParameterException } from '../exception/error-invalid-parameter.exception';

interface FormattedError {
    location: string;
    field: string;
    message: string;
}

const requestValidationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ErrorInvalidParameterException(
                'Invalid request body!',
                errors.array().map((item: ValidationError): FormattedError => {
                    const err: FormattedError = {
                        location: item.type,
                        field: 'path' in item ? item.path : '',
                        message: item.msg
                    };

                    return err;
                })
            );
        }
        next();
    } catch (error) {
        next(error);
    }
};

export default requestValidationMiddleware;
