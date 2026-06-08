"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectPostgres = exports.connectPostgres = exports.getPrismaClient = void 0;
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
// Import dari folder generated (TANPA /client)
const client_1 = require("../src/generated/prisma/client");
let prisma;
const getPrismaClient = () => {
    if (!prisma) {
        // 1. Buat Connection Pool menggunakan driver native 'pg'
        const pool = new pg_1.Pool({
            connectionString: process.env.DATABASE_URL
        });
        // 2. Buat Adapter Prisma untuk Postgres
        const adapter = new adapter_pg_1.PrismaPg(pool);
        // 3. Masukkan adapter ke constructor PrismaClient
        // Note: casting 'as any' mungkin diperlukan jika generated type belum sempurna mendeteksi adapter
        prisma = new client_1.PrismaClient({
            adapter,
            log: ['error']
        });
    }
    return prisma;
};
exports.getPrismaClient = getPrismaClient;
// Connect to database
const connectPostgres = async () => {
    const client = (0, exports.getPrismaClient)();
    await client.$connect();
    console.log('✅ PostgreSQL connected via Prisma Adapter (v7)');
};
exports.connectPostgres = connectPostgres;
// Disconnect from database
const disconnectPostgres = async () => {
    const client = (0, exports.getPrismaClient)();
    await client.$disconnect();
    console.log('🔌 PostgreSQL disconnected');
};
exports.disconnectPostgres = disconnectPostgres;
exports.default = exports.getPrismaClient;
//# sourceMappingURL=postgres.connection.js.map