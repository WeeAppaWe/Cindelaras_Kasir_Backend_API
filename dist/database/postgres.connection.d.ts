import { PrismaClient } from '../src/generated/prisma/client';
export declare const getPrismaClient: () => InstanceType<typeof PrismaClient>;
export declare const connectPostgres: () => Promise<void>;
export declare const disconnectPostgres: () => Promise<void>;
export default getPrismaClient;
//# sourceMappingURL=postgres.connection.d.ts.map