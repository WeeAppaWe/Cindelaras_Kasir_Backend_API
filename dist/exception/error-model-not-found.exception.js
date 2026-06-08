"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorModelNotFoundException = void 0;
class ErrorModelNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ErrorModelNotFoundException';
        this.message = message;
    }
}
exports.ErrorModelNotFoundException = ErrorModelNotFoundException;
//# sourceMappingURL=error-model-not-found.exception.js.map