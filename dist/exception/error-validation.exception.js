"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorValidationException = void 0;
class ErrorValidationException extends Error {
    constructor(message, data = null) {
        super(message);
        this.name = 'ErrorValidationException';
        this.message = message;
        this.data = data;
    }
}
exports.ErrorValidationException = ErrorValidationException;
//# sourceMappingURL=error-validation.exception.js.map