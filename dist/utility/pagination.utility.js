"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = void 0;
const getPagination = (pageNumber = 1, pageSize = 10) => {
    return {
        limit: pageSize,
        offset: (pageNumber - 1) * pageSize
    };
};
exports.getPagination = getPagination;
exports.default = { getPagination: exports.getPagination };
//# sourceMappingURL=pagination.utility.js.map