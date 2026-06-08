import { z } from 'zod';
/**
 * Constant untuk nama stock type yang ada di database.
 */
export declare const StockTypeName: {
    readonly IN_PURCHASE: "IN_PURCHASE";
    readonly IN_PRODUCTION: "IN_PRODUCTION";
    readonly OUT_SALES: "OUT_SALES";
    readonly OUT_PRODUCTION: "OUT_PRODUCTION";
    readonly OUT_DAMAGED: "OUT_DAMAGED";
    readonly OUT_EXPIRED: "OUT_EXPIRED";
    readonly ADJUSTMENT_OPNAME: "ADJUSTMENT_OPNAME";
};
export type StockTypeNameType = (typeof StockTypeName)[keyof typeof StockTypeName];
export declare const stockTypeIdParamSchema: z.ZodObject<{
    stock_type_id: z.ZodString;
}, z.core.$strip>;
export declare const stockTypeSchemas: {
    stockTypeIdParam: z.ZodObject<{
        stock_type_id: z.ZodString;
    }, z.core.$strip>;
};
export default stockTypeSchemas;
//# sourceMappingURL=stock-type.schema.d.ts.map