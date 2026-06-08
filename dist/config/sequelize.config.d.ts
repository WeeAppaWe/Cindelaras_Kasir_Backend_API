interface SequelizeEnvConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    port: string;
    dialect: string;
    logging: typeof console.log;
}
declare const _default: {
    development: SequelizeEnvConfig;
    test: SequelizeEnvConfig;
    production: SequelizeEnvConfig;
};
export default _default;
//# sourceMappingURL=sequelize.config.d.ts.map