"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockTypeSchemas = exports.stockTypeIdParamSchema = exports.StockTypeName = void 0;
const zod_1 = require("zod");
// ============================================
// STOCK TYPE CONSTANTS
// ============================================
/**
 * Constant untuk nama stock type yang ada di database.
 */
exports.StockTypeName = {
    // Barang Masuk
    IN_PURCHASE: 'IN_PURCHASE', // Pembelian dari supplier
    IN_PRODUCTION: 'IN_PRODUCTION', // Hasil produksi semi-ingredient
    // Barang Keluar
    OUT_SALES: 'OUT_SALES', // Penjualan (transaksi kasir)
    OUT_PRODUCTION: 'OUT_PRODUCTION', // Dipakai untuk produksi
    OUT_DAMAGED: 'OUT_DAMAGED', // Rusak
    OUT_EXPIRED: 'OUT_EXPIRED', // Kedaluarsa
    // Penyesuaian
    ADJUSTMENT_OPNAME: 'ADJUSTMENT_OPNAME', // Penyesuaian dari stock opname
};
// ============================================
// PARAM SCHEMAS
// ============================================
exports.stockTypeIdParamSchema = zod_1.z.object({
    stock_type_id: zod_1.z
        .string()
        .uuid('Format stock_type_id tidak valid'),
});
// ============================================
// EXPORT SCHEMAS
// ============================================
exports.stockTypeSchemas = {
    stockTypeIdParam: exports.stockTypeIdParamSchema,
};
exports.default = exports.stockTypeSchemas;
//# sourceMappingURL=stock-type.schema.js.map