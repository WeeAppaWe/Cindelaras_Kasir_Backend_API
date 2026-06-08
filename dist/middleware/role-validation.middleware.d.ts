import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { RoleName } from '../src/modules/auth/auth.schema';
/**
 * Role validation middleware
 * @param allowedRoles - Array of allowed role names (use RoleName enum)
 * @example roleValidation([RoleName.ADMIN, RoleName.CASHIER])
 */
export declare const roleValidation: (allowedRoles: RoleName[]) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
export default roleValidation;
//# sourceMappingURL=role-validation.middleware.d.ts.map