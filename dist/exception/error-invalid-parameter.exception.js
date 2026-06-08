"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorInvalidParameterException = void 0;
class ErrorInvalidParameterException extends Error {
    constructor(message, data = null) {
        super(message || "Invalid parameter!");
        this.name = 'ErrorInvalidParameterException';
        this.message = message ? message : "Invalid parameter!";
        this.data = data;
    }
}
exports.ErrorInvalidParameterException = ErrorInvalidParameterException;
//# sourceMappingURL=error-invalid-parameter.exception.js.map