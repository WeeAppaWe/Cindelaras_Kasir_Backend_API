"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorQueryException = void 0;
class ErrorQueryException extends Error {
    constructor(message, data = {}) {
        super(message);
        this.name = 'ErrorQueryException';
        this.message = message;
        this.data = data;
    }
}
exports.ErrorQueryException = ErrorQueryException;
//# sourceMappingURL=error-query.exception.js.map