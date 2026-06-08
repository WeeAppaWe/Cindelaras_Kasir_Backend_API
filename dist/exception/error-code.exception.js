"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodeException = void 0;
class ErrorCodeException extends Error {
    constructor(message, data = {}) {
        super(message);
        this.name = 'ErrorCodeException';
        this.message = message;
        this.data = data;
    }
}
exports.ErrorCodeException = ErrorCodeException;
//# sourceMappingURL=error-code.exception.js.map