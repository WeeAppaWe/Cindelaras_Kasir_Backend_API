import { Response, NextFunction } from 'express';
import { ErrorAuthenticationException } from '../exception/error-authentication.exception';
import { AuthenticatedRequest } from '../types';
import { RoleName } from '../src/modules/auth/auth.schema';

/**
 * Role validation middleware
 * @param allowedRoles - Array of allowed role names (use RoleName enum)
 * @example roleValidation([RoleName.ADMIN, RoleName.CASHIER])
 */
export const roleValidation = (allowedRoles: RoleName[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        try {
            // Ensure user is authenticated and has a role
            if (!req.user || !req.user.role) {
                throw new ErrorAuthenticationException('Unauthorized access. User role not found.');
            }

            const userRole = req.user.role.name as RoleName;

            // Check if user's role is in the allowedRoles array
            if (!allowedRoles.includes(userRole)) {
                throw new ErrorAuthenticationException('Forbidden access. You do not have permission to access this resource.');
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};

export default roleValidation;
