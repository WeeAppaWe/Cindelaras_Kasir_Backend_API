// MySQL Database config interface
export interface MySQLConfig {
    HOST: string;
    PORT: string;
    USERNAME: string;
    PASSWORD: string;
    DB: string;
    DIALECT: string;
    OPTIONS: {
        max: number;
        min: number;
        acquire: number;
        idle: number;
    };
    LOGGING: typeof console.log;
}

// Redis config interface
export interface RedisConfig {
    HOST: string;
    PORT: string;
    PASSWORD: string;
    DB: number;
}

// PostgreSQL config interface
export interface PostgresConfig {
    HOST: string;
    PORT: string;
    USER: string;
    PASSWORD: string;
    DATABASE: string;
}

// Combined database config
export interface DBConfig {
    mysql: MySQLConfig;
    redis: RedisConfig;
    postgres?: PostgresConfig;
}
