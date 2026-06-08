import { Sequelize, QueryTypes, Op, DataTypes } from 'sequelize';
import fs from 'fs';
import path from 'path';
import dbConfig from '../config/db.config';

const mysqlConfig = dbConfig.mysql;

const sequelize = new Sequelize(
    mysqlConfig.DB,
    mysqlConfig.USERNAME,
    mysqlConfig.PASSWORD,
    {
        host: mysqlConfig.HOST,
        port: parseInt(mysqlConfig.PORT, 10),
        dialect: 'mysql',
        pool: mysqlConfig.OPTIONS,
        logging: mysqlConfig.LOGGING,
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to the database mysql!');
    })
    .catch((err: Error) => {
        console.log('Cannot connect to the database mysql:', err);
    });

interface DatabaseModels {
    [key: string]: any;
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
    Op: typeof Op;
    QueryTypes: typeof QueryTypes;
}

const db: DatabaseModels = {
    sequelize,
    Sequelize,
    Op,
    QueryTypes
};

const modelsFolder = path.join(__dirname, '../src/model/mariadb');

if (fs.existsSync(modelsFolder)) {
    fs.readdirSync(modelsFolder)
        .filter((file: string) => {
            return (
                !file.startsWith('.') && file !== modelsFolder && file.endsWith('.js')
            );
        })
        .forEach((file: string) => {
            const model = require(path.join(modelsFolder, file))(sequelize, DataTypes);
            db[model.name] = model;
        });

    Object.keys(db).forEach((modelName: string) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
}

export default db;
