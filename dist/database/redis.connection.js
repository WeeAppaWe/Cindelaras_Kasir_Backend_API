"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const db_config_1 = __importDefault(require("../config/db.config"));
const redisConfig = db_config_1.default.redis;
// Konfigurasi Redis
const redis = new ioredis_1.default({
    host: redisConfig.HOST,
    port: parseInt(redisConfig.PORT, 10),
    password: redisConfig.PASSWORD,
    db: redisConfig.DB,
});
exports.default = redis;
//# sourceMappingURL=redis.connection.js.map