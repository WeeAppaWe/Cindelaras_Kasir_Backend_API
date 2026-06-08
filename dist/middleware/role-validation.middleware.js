"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleValidation = void 0;
const error_authentication_exception_1 = require("../exception/error-authentication.exception");
/**
 * Role validation middleware
 * @param allowedRoles - Array of allowed role names (use RoleName enum)
 * @example roleValidation([RoleName.ADMIN, RoleName.CASHIER])
 */
const roleValidation = (allowedRoles) => {
    return (req, res, next) => {
        try {
            // Ensure user is authenticated and has a role
            if (!req.user || !req.user.role) {
                throw new error_authentication_exception_1.ErrorAuthenticationException('Unauthorized access. User role not found.');
            }
            const userRole = req.user.role.name;
            // Check if user's role is in the allowedRoles array
            if (!allowedRoles.includes(userRole)) {
                throw new error_authentication_exception_1.ErrorAuthenticationException('Forbidden access. You do not have permission to access this resource.');
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.roleValidation = roleValidation;
exports.default = exports.roleValidation;
//# sourceMappingURL=role-validation.middleware.js.map