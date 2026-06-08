"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorSyncronization = void 0;
class ErrorSyncronization extends Error {
    constructor(message) {
        super(message || "Synchronization failed!");
        this.name = 'ErrorSyncronization';
        this.message = message ? message : "Synchronization failed!";
    }
}
exports.ErrorSyncronization = ErrorSyncronization;
//# sourceMappingURL=error-syncronization.exception.js.map