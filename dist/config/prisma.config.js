"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const dotenv_expand_1 = __importDefault(require("dotenv-expand"));
const config_1 = require("prisma/config");
// Load and expand environment variables (enables ${VAR} interpolation)
dotenv_expand_1.default.expand(dotenv_1.default.config());
exports.default = (0, config_1.defineConfig)({
    schema: "../prisma/schema.prisma",
    migrations: {
        path: "../prisma/migrations",
    },
    datasource: {
        url: process.env["DATABASE_URL"]
    },
});
//# sourceMappingURL=prisma.config.js.map