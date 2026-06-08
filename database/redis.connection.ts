import IORedis from 'ioredis';
import dbConfig from '../config/db.config';

const redisConfig = dbConfig.redis;

// Konfigurasi Redis
const redis = new IORedis({
    host: redisConfig.HOST,
    port: parseInt(redisConfig.PORT, 10),
    password: redisConfig.PASSWORD,
    db: redisConfig.DB,
});

export default redis;
