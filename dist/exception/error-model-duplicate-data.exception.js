"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorModelDuplicateDataException = void 0;
class ErrorModelDuplicateDataException extends Error {
    constructor(message, data = null) {
        super(message || "Data sudah diinputkan");
        this.name = 'ErrorModelDuplicateDataException';
        this.message = message ? message : "Data sudah diinputkan";
        this.data = data;
    }
}
exports.ErrorModelDuplicateDataException = ErrorModelDuplicateDataException;
//# sourceMappingURL=error-model-duplicate-data.exception.js.map