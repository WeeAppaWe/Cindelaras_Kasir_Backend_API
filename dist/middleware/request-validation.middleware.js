"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const error_invalid_parameter_exception_1 = require("../exception/error-invalid-parameter.exception");
const requestValidationMiddleware = (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new error_invalid_parameter_exception_1.ErrorInvalidParameterException('Invalid request body!', errors.array().map((item) => {
                const err = {
                    location: item.type,
                    field: 'path' in item ? item.path : '',
                    message: item.msg
                };
                return err;
            }));
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = requestValidationMiddleware;
//# sourceMappingURL=request-validation.middleware.js.map