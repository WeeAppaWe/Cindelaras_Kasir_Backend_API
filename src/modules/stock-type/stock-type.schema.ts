import { z } from 'zod';

// ============================================
// STOCK TYPE CONSTANTS
// ============================================

/**
 * Constant untuk nama stock type yang ada di database.
 */
export const StockTypeName = {
    // Barang Masuk
    IN_PURCHASE: 'IN_PURCHASE',         // Pembelian dari supplier
    IN_PRODUCTION: 'IN_PRODUCTION',     // Hasil produksi semi-ingredient

    // Barang Keluar
    OUT_SALES: 'OUT_SALES',             // Penjualan (transaksi kasir)
    OUT_PRODUCTION: 'OUT_PRODUCTION',   // Dipakai untuk produksi
    OUT_DAMAGED: 'OUT_DAMAGED',         // Rusak
    OUT_EXPIRED: 'OUT_EXPIRED',         // Kedaluarsa

    // Penyesuaian
    ADJUSTMENT_OPNAME: 'ADJUSTMENT_OPNAME', // Penyesuaian dari stock opname
} as const;

export type StockTypeNameType = (typeof StockTypeName)[keyof typeof StockTypeName];

// ============================================
// PARAM SCHEMAS
// ============================================

export const stockTypeIdParamSchema = z.object({
    stock_type_id: z
        .string()
        .uuid('Format stock_type_id tidak valid'),
});

// ============================================
// EXPORT SCHEMAS
// ============================================

export const stockTypeSchemas = {
    stockTypeIdParam: stockTypeIdParamSchema,
};

export default stockTypeSchemas;
