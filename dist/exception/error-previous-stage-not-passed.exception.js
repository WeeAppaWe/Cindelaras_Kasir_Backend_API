"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorPreviousStageNotPassed = void 0;
class ErrorPreviousStageNotPassed extends Error {
    constructor(message) {
        super(message || "All previous stage status must be passed!");
        this.name = 'ErrorPreviousStageNotPassed';
        this.message = message ? message : "All previous stage status must be passed!";
    }
}
exports.ErrorPreviousStageNotPassed = ErrorPreviousStageNotPassed;
//# sourceMappingURL=error-previous-stage-not-passed.exception.js.map