"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorLimitException = void 0;
class ErrorLimitException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ErrorLimitException';
        this.message = message;
    }
}
exports.ErrorLimitException = ErrorLimitException;
//# sourceMappingURL=error-limit.exception.js.map