import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
// Import dari folder generated (TANPA /client)
import { PrismaClient } from '../src/generated/prisma/client';

let prisma: InstanceType<typeof PrismaClient>;

export const getPrismaClient = (): InstanceType<typeof PrismaClient> => {
    if (!prisma) {
        // 1. Buat Connection Pool menggunakan driver native 'pg'
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL
        });

        // 2. Buat Adapter Prisma untuk Postgres
        const adapter = new PrismaPg(pool);

        // 3. Masukkan adapter ke constructor PrismaClient
        // Note: casting 'as any' mungkin diperlukan jika generated type belum sempurna mendeteksi adapter
        prisma = new (PrismaClient as any)({
            adapter,
            log: ['error']
        });
    }
    return prisma;
};

// Connect to database
export const connectPostgres = async (): Promise<void> => {
    const client = getPrismaClient();
    await client.$connect();
    console.log('✅ PostgreSQL connected via Prisma Adapter (v7)');
};

// Disconnect from database
export const disconnectPostgres = async (): Promise<void> => {
    const client = getPrismaClient();
    await client.$disconnect();
    console.log('🔌 PostgreSQL disconnected');
};

export default getPrismaClient;