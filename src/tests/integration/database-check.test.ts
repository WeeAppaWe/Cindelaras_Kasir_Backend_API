import { getPrismaClient, connectPostgres, disconnectPostgres } from '../../../database/postgres.connection';

/**
 * DATABASE INTEGRATION TEST
 * 
 * Test ini memastikan aplikasi bisa:
 * 1. Terkoneksi ke PostgreSQL via Prisma Adapter
 * 2. Menjalankan query SQL sederhana (SELECT 1)
 * 
 * PERINGATAN: Test ini membutuhkan database yang AKTIF dan running.
 * Ini bukan Unit Test (mocked), tapi Integration Test.
 */
describe('Database Connection Integration (Real DB)', () => {

    // Set timeout lebih lama karena koneksi DB butuh waktu
    jest.setTimeout(30000);

    beforeAll(async () => {
        try {
            await connectPostgres();
        } catch (error) {
            console.error('Failed to connect to DB during test setup:', error);
            throw error;
        }
    });

    afterAll(async () => {
        await disconnectPostgres();
    });

    it('should successfully execute a raw SQL query (SELECT 1)', async () => {
        const prisma = getPrismaClient();

        // Menjalankan query standar 'SELECT 1' untuk cek hidup/mati DB
        const result: any = await prisma.$queryRaw`SELECT 1 as status`;

        // Debug output
        // console.log('Ping Result:', result);

        // Validasi response
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);

        // Biasanya return [{ status: 1n }] (BigInt) atau [{ status: 1 }]
        // Kita cek truthiness saja cukup
        const row = result[0];
        expect(row).toHaveProperty('status');
    }, 15000);

    it('should have Prisma Client properly initialized', () => {
        const prisma = getPrismaClient();

        // Pastikan object prisma ada method-method utamanya
        expect(prisma).toBeDefined();
        expect(prisma.$connect).toBeDefined();
        expect(prisma.$disconnect).toBeDefined();
        expect(prisma.$queryRaw).toBeDefined();
    });
});
