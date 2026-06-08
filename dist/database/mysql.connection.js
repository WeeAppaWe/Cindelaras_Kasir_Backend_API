"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db_config_1 = __importDefault(require("../config/db.config"));
const mysqlConfig = db_config_1.default.mysql;
const sequelize = new sequelize_1.Sequelize(mysqlConfig.DB, mysqlConfig.USERNAME, mysqlConfig.PASSWORD, {
    host: mysqlConfig.HOST,
    port: parseInt(mysqlConfig.PORT, 10),
    dialect: 'mysql',
    pool: mysqlConfig.OPTIONS,
    logging: mysqlConfig.LOGGING,
});
sequelize
    .authenticate()
    .then(() => {
    console.log('Connected to the database mysql!');
})
    .catch((err) => {
    console.log('Cannot connect to the database mysql:', err);
});
const db = {
    sequelize,
    Sequelize: sequelize_1.Sequelize,
    Op: sequelize_1.Op,
    QueryTypes: sequelize_1.QueryTypes
};
const modelsFolder = path_1.default.join(__dirname, '../src/model/mariadb');
if (fs_1.default.existsSync(modelsFolder)) {
    fs_1.default.readdirSync(modelsFolder)
        .filter((file) => {
        return (!file.startsWith('.') && file !== modelsFolder && file.endsWith('.js'));
    })
        .forEach((file) => {
        const model = require(path_1.default.join(modelsFolder, file))(sequelize, sequelize_1.DataTypes);
        db[model.name] = model;
    });
    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
}
exports.default = db;
//# sourceMappingURL=mysql.connection.js.map