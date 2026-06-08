"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorDataAlreadyExistException = void 0;
class ErrorDataAlreadyExistException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ErrorDataAlreadyExistException';
        this.message = message;
    }
}
exports.ErrorDataAlreadyExistException = ErrorDataAlreadyExistException;
//# sourceMappingURL=error-data-already-exist.exception.js.map