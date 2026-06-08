import { Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { AuthenticatedRequest } from '../types';
import { ErrorValidationException } from '../exception/error-validation.exception';

/**
 * Validation location type
 */
type ValidationLocation = 'body' | 'params' | 'query';

/**
 * Zod validation middleware factory
 * Creates a middleware that validates request data against provided Zod schema
 * 
 * @param schema - Zod schema to validate against
 * @param location - Where to validate: 'body' (default), 'params', or 'query'
 * @returns Express middleware function
 * 
 * @example
 * // Validate body (default):
 * router.post('/user', zodValidation(createUserSchema), userController.create);
 * 
 * // Validate params:
 * router.get('/user/:user_id', zodValidation(userIdParamSchema, 'params'), userController.detail);
 * 
 * // Validate query:
 * router.get('/user', zodValidation(userListQuerySchema, 'query'), userController.showAll);
 */
export const zodValidation = <T>(schema: ZodSchema<T>, location: ValidationLocation = 'body') => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        try {
            // Get data to validate based on location
            let dataToValidate: unknown;
            switch (location) {
                case 'params':
                    dataToValidate = req.params;
                    break;
                case 'query':
                    dataToValidate = req.query;
                    break;
                case 'body':
                default:
                    dataToValidate = req.body;
                    break;
            }

            // Validate data
            const validatedData = schema.parse(dataToValidate);

            // Attach validated data back to request
            // Note: req.query and req.params are read-only in Express, so we can't reassign them
            // However, validation ensures the data is valid, and services can still access
            // req.query and req.params directly (they're already validated at this point)
            switch (location) {
                case 'params':
                    // req.params is read-only, but validation ensures it's valid
                    // Services can still use req.params directly
                    // If you need typed params, consider using req.validatedParams = validatedData
                    break;
                case 'query':
                    // req.query is read-only, but validation ensures it's valid
                    // Services can still use req.query directly
                    // If you need typed query, consider using req.validatedQuery = validatedData
                    break;
                case 'body':
                default:
                    // req.body is writable, so we can assign validated data
                    req.body = validatedData;
                    break;
            }

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                // Format Zod errors to match your ValidationErrorItem format
                const formattedErrors = error.issues.map((issue) => ({
                    location: location,
                    field: issue.path.join('.'),
                    message: issue.message,
                }));

                next(new ErrorValidationException('Validasi gagal', formattedErrors));
            } else {
                next(error);
            }
        }
    };
};

export default zodValidation;
