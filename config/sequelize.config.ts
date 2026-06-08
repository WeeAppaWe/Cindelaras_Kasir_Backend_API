import dbConfig from './db.config';

interface SequelizeEnvConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    port: string;
    dialect: string;
    logging: typeof console.log;
}

// Map the 'mysql' config from db.config.ts to the keys expected by Sequelize CLI
// Need to map the keys to lowercase because Sequelize CLI expects lowercase keys (username, password, etc.)
// db.config.ts uses uppercase keys (USERNAME, PASSWORD, etc.).

const mapConfig = (config: typeof dbConfig.mysql): SequelizeEnvConfig => ({
    username: config.USERNAME,
    password: config.PASSWORD,
    database: config.DB,
    host: config.HOST,
    port: config.PORT,
    dialect: config.DIALECT,
    logging: config.LOGGING,
    // dialectOptions: config.OPTIONS // Map OPTIONS to dialectOptions if needed, usually pool settings go to 'pool' or root
});

const sequelizeConfig = mapConfig(dbConfig.mysql);

export default {
    development: sequelizeConfig,
    test: sequelizeConfig,
    production: sequelizeConfig
};
