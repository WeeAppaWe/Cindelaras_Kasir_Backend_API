"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorAuthenticationException = void 0;
class ErrorAuthenticationException extends Error {
    constructor(message, data = null) {
        super(message);
        this.name = 'ErrorAuthenticationException';
        this.message = message;
        this.data = data;
    }
}
exports.ErrorAuthenticationException = ErrorAuthenticationException;
//# sourceMappingURL=error-authentication.exception.js.map