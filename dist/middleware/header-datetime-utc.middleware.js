"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
const headerDatetimeUtcMiddleware = (req, res, next) => {
    try {
        // set datetime UTC now
        req.datetime = dayjs_1.default.utc().format();
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = headerDatetimeUtcMiddleware;
//# sourceMappingURL=header-datetime-utc.middleware.js.map