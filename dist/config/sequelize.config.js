"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("./db.config"));
// Map the 'mysql' config from db.config.ts to the keys expected by Sequelize CLI
// Need to map the keys to lowercase because Sequelize CLI expects lowercase keys (username, password, etc.)
// db.config.ts uses uppercase keys (USERNAME, PASSWORD, etc.).
const mapConfig = (config) => ({
    username: config.USERNAME,
    password: config.PASSWORD,
    database: config.DB,
    host: config.HOST,
    port: config.PORT,
    dialect: config.DIALECT,
    logging: config.LOGGING,
    // dialectOptions: config.OPTIONS // Map OPTIONS to dialectOptions if needed, usually pool settings go to 'pool' or root
});
const sequelizeConfig = mapConfig(db_config_1.default.mysql);
exports.default = {
    development: sequelizeConfig,
    test: sequelizeConfig,
    production: sequelizeConfig
};
//# sourceMappingURL=sequelize.config.js.map