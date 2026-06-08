"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorNotFoundException = void 0;
class ErrorNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ErrorNotFoundException';
        this.message = message;
    }
}
exports.ErrorNotFoundException = ErrorNotFoundException;
//# sourceMappingURL=error-not-found.exception.js.map