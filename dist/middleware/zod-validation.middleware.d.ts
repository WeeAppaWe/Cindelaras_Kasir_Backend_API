import { Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AuthenticatedRequest } from '../types';
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
export declare const zodValidation: <T>(schema: ZodSchema<T>, location?: ValidationLocation) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
export default zodValidation;
//# sourceMappingURL=zod-validation.middleware.d.ts.map