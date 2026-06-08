import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model StockType
 *
 */
export type StockTypeModel = runtime.Types.Result.DefaultSelection<Prisma.$StockTypePayload>;
export type AggregateStockType = {
    _count: StockTypeCountAggregateOutputType | null;
    _min: StockTypeMinAggregateOutputType | null;
    _max: StockTypeMaxAggregateOutputType | null;
};
export type StockTypeMinAggregateOutputType = {
    stock_type_id: string | null;
    name: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
export type StockTypeMaxAggregateOutputType = {
    stock_type_id: string | null;
    name: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
export type StockTypeCountAggregateOutputType = {
    stock_type_id: number;
    name: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
};
export type StockTypeMinAggregateInputType = {
    stock_type_id?: true;
    name?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
};
export type StockTypeMaxAggregateInputType = {
    stock_type_id?: true;
    name?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
};
export type StockTypeCountAggregateInputType = {
    stock_type_id?: true;
    name?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
};
export type StockTypeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which StockType to aggregate.
     */
    where?: Prisma.StockTypeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StockTypes to fetch.
     */
    orderBy?: Prisma.StockTypeOrderByWithRelationInput | Prisma.StockTypeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.StockTypeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StockTypes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StockTypes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned StockTypes
    **/
    _count?: true | StockTypeCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: StockTypeMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: StockTypeMaxAggregateInputType;
};
export type GetStockTypeAggregateType<T extends StockTypeAggregateArgs> = {
    [P in keyof T & keyof AggregateStockType]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStockType[P]> : Prisma.GetScalarType<T[P], AggregateStockType[P]>;
};
export type StockTypeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockTypeWhereInput;
    orderBy?: Prisma.StockTypeOrderByWithAggregationInput | Prisma.StockTypeOrderByWithAggregationInput[];
    by: Prisma.StockTypeScalarFieldEnum[] | Prisma.StockTypeScalarFieldEnum;
    having?: Prisma.StockTypeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StockTypeCountAggregateInputType | true;
    _min?: StockTypeMinAggregateInputType;
    _max?: StockTypeMaxAggregateInputType;
};
export type StockTypeGroupByOutputType = {
    stock_type_id: string;
    name: string;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    _count: StockTypeCountAggregateOutputType | null;
    _min: StockTypeMinAggregateOutputType | null;
    _max: StockTypeMaxAggregateOutputType | null;
};
type GetStockTypeGroupByPayload<T extends StockTypeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StockTypeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StockTypeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StockTypeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StockTypeGroupByOutputType[P]>;
}>>;
export type StockTypeWhereInput = {
    AND?: Prisma.StockTypeWhereInput | Prisma.StockTypeWhereInput[];
    OR?: Prisma.StockTypeWhereInput[];
    NOT?: Prisma.StockTypeWhereInput | Prisma.StockTypeWhereInput[];
    stock_type_id?: Prisma.UuidFilter<"StockType"> | string;
    name?: Prisma.StringFilter<"StockType"> | string;
    created_at?: Prisma.DateTimeFilter<"StockType"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"StockType"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"StockType"> | Date | string | null;
    stock_movements?: Prisma.StockMovementListRelationFilter;
};
export type StockTypeOrderByWithRelationInput = {
    stock_type_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    stock_movements?: Prisma.StockMovementOrderByRelationAggregateInput;
};
export type StockTypeWhereUniqueInput = Prisma.AtLeast<{
    stock_type_id?: string;
    AND?: Prisma.StockTypeWhereInput | Prisma.StockTypeWhereInput[];
    OR?: Prisma.StockTypeWhereInput[];
    NOT?: Prisma.StockTypeWhereInput | Prisma.StockTypeWhereInput[];
    name?: Prisma.StringFilter<"StockType"> | string;
    created_at?: Prisma.DateTimeFilter<"StockType"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"StockType"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"StockType"> | Date | string | null;
    stock_movements?: Prisma.StockMovementListRelationFilter;
}, "stock_type_id">;
export type StockTypeOrderByWithAggregationInput = {
    stock_type_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.StockTypeCountOrderByAggregateInput;
    _max?: Prisma.StockTypeMaxOrderByAggregateInput;
    _min?: Prisma.StockTypeMinOrderByAggregateInput;
};
export type StockTypeScalarWhereWithAggregatesInput = {
    AND?: Prisma.StockTypeScalarWhereWithAggregatesInput | Prisma.StockTypeScalarWhereWithAggregatesInput[];
    OR?: Prisma.StockTypeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StockTypeScalarWhereWithAggregatesInput | Prisma.StockTypeScalarWhereWithAggregatesInput[];
    stock_type_id?: Prisma.UuidWithAggregatesFilter<"StockType"> | string;
    name?: Prisma.StringWithAggregatesFilter<"StockType"> | string;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"StockType"> | Date | string;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"StockType"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableWithAggregatesFilter<"StockType"> | Date | string | null;
};
export type StockTypeCreateInput = {
    stock_type_id?: string;
    name: string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    stock_movements?: Prisma.StockMovementCreateNestedManyWithoutStock_typeInput;
};
export type StockTypeUncheckedCreateInput = {
    stock_type_id?: string;
    name: string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    stock_movements?: Prisma.StockMovementUncheckedCreateNestedManyWithoutStock_typeInput;
};
export type StockTypeUpdateInput = {
    stock_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    stock_movements?: Prisma.StockMovementUpdateManyWithoutStock_typeNestedInput;
};
export type StockTypeUncheckedUpdateInput = {
    stock_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    stock_movements?: Prisma.StockMovementUncheckedUpdateManyWithoutStock_typeNestedInput;
};
export type StockTypeCreateManyInput = {
    stock_type_id?: string;
    name: string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type StockTypeUpdateManyMutationInput = {
    stock_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StockTypeUncheckedUpdateManyInput = {
    stock_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StockTypeCountOrderByAggregateInput = {
    stock_type_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type StockTypeMaxOrderByAggregateInput = {
    stock_type_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type StockTypeMinOrderByAggregateInput = {
    stock_type_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type StockTypeScalarRelationFilter = {
    is?: Prisma.StockTypeWhereInput;
    isNot?: Prisma.StockTypeWhereInput;
};
export type StockTypeCreateNestedOneWithoutStock_movementsInput = {
    create?: Prisma.XOR<Prisma.StockTypeCreateWithoutStock_movementsInput, Prisma.StockTypeUncheckedCreateWithoutStock_movementsInput>;
    connectOrCreate?: Prisma.StockTypeCreateOrConnectWithoutStock_movementsInput;
    connect?: Prisma.StockTypeWhereUniqueInput;
};
export type StockTypeUpdateOneRequiredWithoutStock_movementsNestedInput = {
    create?: Prisma.XOR<Prisma.StockTypeCreateWithoutStock_movementsInput, Prisma.StockTypeUncheckedCreateWithoutStock_movementsInput>;
    connectOrCreate?: Prisma.StockTypeCreateOrConnectWithoutStock_movementsInput;
    upsert?: Prisma.StockTypeUpsertWithoutStock_movementsInput;
    connect?: Prisma.StockTypeWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StockTypeUpdateToOneWithWhereWithoutStock_movementsInput, Prisma.StockTypeUpdateWithoutStock_movementsInput>, Prisma.StockTypeUncheckedUpdateWithoutStock_movementsInput>;
};
export type StockTypeCreateWithoutStock_movementsInput = {
    stock_type_id?: string;
    name: string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type StockTypeUncheckedCreateWithoutStock_movementsInput = {
    stock_type_id?: string;
    name: string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type StockTypeCreateOrConnectWithoutStock_movementsInput = {
    where: Prisma.StockTypeWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockTypeCreateWithoutStock_movementsInput, Prisma.StockTypeUncheckedCreateWithoutStock_movementsInput>;
};
export type StockTypeUpsertWithoutStock_movementsInput = {
    update: Prisma.XOR<Prisma.StockTypeUpdateWithoutStock_movementsInput, Prisma.StockTypeUncheckedUpdateWithoutStock_movementsInput>;
    create: Prisma.XOR<Prisma.StockTypeCreateWithoutStock_movementsInput, Prisma.StockTypeUncheckedCreateWithoutStock_movementsInput>;
    where?: Prisma.StockTypeWhereInput;
};
export type StockTypeUpdateToOneWithWhereWithoutStock_movementsInput = {
    where?: Prisma.StockTypeWhereInput;
    data: Prisma.XOR<Prisma.StockTypeUpdateWithoutStock_movementsInput, Prisma.StockTypeUncheckedUpdateWithoutStock_movementsInput>;
};
export type StockTypeUpdateWithoutStock_movementsInput = {
    stock_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StockTypeUncheckedUpdateWithoutStock_movementsInput = {
    stock_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type StockTypeCountOutputType
 */
export type StockTypeCountOutputType = {
    stock_movements: number;
};
export type StockTypeCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    stock_movements?: boolean | StockTypeCountOutputTypeCountStock_movementsArgs;
};
/**
 * StockTypeCountOutputType without action
 */
export type StockTypeCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockTypeCountOutputType
     */
    select?: Prisma.StockTypeCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * StockTypeCountOutputType without action
 */
export type StockTypeCountOutputTypeCountStock_movementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockMovementWhereInput;
};
export type StockTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    stock_type_id?: boolean;
    name?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    stock_movements?: boolean | Prisma.StockType$stock_movementsArgs<ExtArgs>;
    _count?: boolean | Prisma.StockTypeCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["stockType"]>;
export type StockTypeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    stock_type_id?: boolean;
    name?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
}, ExtArgs["result"]["stockType"]>;
export type StockTypeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    stock_type_id?: boolean;
    name?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
}, ExtArgs["result"]["stockType"]>;
export type StockTypeSelectScalar = {
    stock_type_id?: boolean;
    name?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
};
export type StockTypeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"stock_type_id" | "name" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["stockType"]>;
export type StockTypeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    stock_movements?: boolean | Prisma.StockType$stock_movementsArgs<ExtArgs>;
    _count?: boolean | Prisma.StockTypeCountOutputTypeDefaultArgs<ExtArgs>;
};
export type StockTypeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type StockTypeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $StockTypePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StockType";
    objects: {
        stock_movements: Prisma.$StockMovementPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        stock_type_id: string;
        name: string;
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
    }, ExtArgs["result"]["stockType"]>;
    composites: {};
};
export type StockTypeGetPayload<S extends boolean | null | undefined | StockTypeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StockTypePayload, S>;
export type StockTypeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StockTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StockTypeCountAggregateInputType | true;
};
export interface StockTypeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['StockType'];
        meta: {
            name: 'StockType';
        };
    };
    /**
     * Find zero or one StockType that matches the filter.
     * @param {StockTypeFindUniqueArgs} args - Arguments to find a StockType
     * @example
     * // Get one StockType
     * const stockType = await prisma.stockType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockTypeFindUniqueArgs>(args: Prisma.SelectSubset<T, StockTypeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StockTypeClient<runtime.Types.Result.GetResult<Prisma.$StockTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one StockType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockTypeFindUniqueOrThrowArgs} args - Arguments to find a StockType
     * @example
     * // Get one StockType
     * const stockType = await prisma.stockType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockTypeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StockTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StockTypeClient<runtime.Types.Result.GetResult<Prisma.$StockTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first StockType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTypeFindFirstArgs} args - Arguments to find a StockType
     * @example
     * // Get one StockType
     * const stockType = await prisma.stockType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockTypeFindFirstArgs>(args?: Prisma.SelectSubset<T, StockTypeFindFirstArgs<ExtArgs>>): Prisma.Prisma__StockTypeClient<runtime.Types.Result.GetResult<Prisma.$StockTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first StockType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTypeFindFirstOrThrowArgs} args - Arguments to find a StockType
     * @example
     * // Get one StockType
     * const stockType = await prisma.stockType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockTypeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StockTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StockTypeClient<runtime.Types.Result.GetResult<Prisma.$StockTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more StockTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StockTypes
     * const stockTypes = await prisma.stockType.findMany()
     *
     * // Get first 10 StockTypes
     * const stockTypes = await prisma.stockType.findMany({ take: 10 })
     *
     * // Only select the `stock_type_id`
     * const stockTypeWithStock_type_idOnly = await prisma.stockType.findMany({ select: { stock_type_id: true } })
     *
     */
    findMany<T extends StockTypeFindManyArgs>(args?: Prisma.SelectSubset<T, StockTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a StockType.
     * @param {StockTypeCreateArgs} args - Arguments to create a StockType.
     * @example
     * // Create one StockType
     * const StockType = await prisma.stockType.create({
     *   data: {
     *     // ... data to create a StockType
     *   }
     * })
     *
     */
    create<T extends StockTypeCreateArgs>(args: Prisma.SelectSubset<T, StockTypeCreateArgs<ExtArgs>>): Prisma.Prisma__StockTypeClient<runtime.Types.Result.GetResult<Prisma.$StockTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many StockTypes.
     * @param {StockTypeCreateManyArgs} args - Arguments to create many StockTypes.
     * @example
     * // Create many StockTypes
     * const stockType = await prisma.stockType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends StockTypeCreateManyArgs>(args?: Prisma.SelectSubset<T, StockTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many StockTypes and returns the data saved in the database.
     * @param {StockTypeCreateManyAndReturnArgs} args - Arguments to create many StockTypes.
     * @example
     * // Create many StockTypes
     * const stockType = await prisma.stockType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many StockTypes and only return the `stock_type_id`
     * const stockTypeWithStock_type_idOnly = await prisma.stockType.createManyAndReturn({
     *   select: { stock_type_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends StockTypeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StockTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a StockType.
     * @param {StockTypeDeleteArgs} args - Arguments to delete one StockType.
     * @example
     * // Delete one StockType
     * const StockType = await prisma.stockType.delete({
     *   where: {
     *     // ... filter to delete one StockType
     *   }
     * })
     *
     */
    delete<T extends StockTypeDeleteArgs>(args: Prisma.SelectSubset<T, StockTypeDeleteArgs<ExtArgs>>): Prisma.Prisma__StockTypeClient<runtime.Types.Result.GetResult<Prisma.$StockTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one StockType.
     * @param {StockTypeUpdateArgs} args - Arguments to update one StockType.
     * @example
     * // Update one StockType
     * const stockType = await prisma.stockType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends StockTypeUpdateArgs>(args: Prisma.SelectSubset<T, StockTypeUpdateArgs<ExtArgs>>): Prisma.Prisma__StockTypeClient<runtime.Types.Result.GetResult<Prisma.$StockTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more StockTypes.
     * @param {StockTypeDeleteManyArgs} args - Arguments to filter StockTypes to delete.
     * @example
     * // Delete a few StockTypes
     * const { count } = await prisma.stockType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends StockTypeDeleteManyArgs>(args?: Prisma.SelectSubset<T, StockTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more StockTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StockTypes
     * const stockType = await prisma.stockType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends StockTypeUpdateManyArgs>(args: Prisma.SelectSubset<T, StockTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more StockTypes and returns the data updated in the database.
     * @param {StockTypeUpdateManyAndReturnArgs} args - Arguments to update many StockTypes.
     * @example
     * // Update many StockTypes
     * const stockType = await prisma.stockType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more StockTypes and only return the `stock_type_id`
     * const stockTypeWithStock_type_idOnly = await prisma.stockType.updateManyAndReturn({
     *   select: { stock_type_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends StockTypeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StockTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one StockType.
     * @param {StockTypeUpsertArgs} args - Arguments to update or create a StockType.
     * @example
     * // Update or create a StockType
     * const stockType = await prisma.stockType.upsert({
     *   create: {
     *     // ... data to create a StockType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StockType we want to update
     *   }
     * })
     */
    upsert<T extends StockTypeUpsertArgs>(args: Prisma.SelectSubset<T, StockTypeUpsertArgs<ExtArgs>>): Prisma.Prisma__StockTypeClient<runtime.Types.Result.GetResult<Prisma.$StockTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of StockTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTypeCountArgs} args - Arguments to filter StockTypes to count.
     * @example
     * // Count the number of StockTypes
     * const count = await prisma.stockType.count({
     *   where: {
     *     // ... the filter for the StockTypes we want to count
     *   }
     * })
    **/
    count<T extends StockTypeCountArgs>(args?: Prisma.Subset<T, StockTypeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StockTypeCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a StockType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StockTypeAggregateArgs>(args: Prisma.Subset<T, StockTypeAggregateArgs>): Prisma.PrismaPromise<GetStockTypeAggregateType<T>>;
    /**
     * Group by StockType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends StockTypeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StockTypeGroupByArgs['orderBy'];
    } : {
        orderBy?: StockTypeGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StockTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the StockType model
     */
    readonly fields: StockTypeFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for StockType.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__StockTypeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    stock_movements<T extends Prisma.StockType$stock_movementsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StockType$stock_movementsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the StockType model
 */
export interface StockTypeFieldRefs {
    readonly stock_type_id: Prisma.FieldRef<"StockType", 'String'>;
    readonly name: Prisma.FieldRef<"StockType", 'String'>;
    readonly created_at: Prisma.FieldRef<"StockType", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"StockType", 'DateTime'>;
    readonly deleted_at: Prisma.FieldRef<"StockType", 'DateTime'>;
}
/**
 * StockType findUnique
 */
export type StockTypeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockType
     */
    select?: Prisma.StockTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockType
     */
    omit?: Prisma.StockTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockTypeInclude<ExtArgs> | null;
    /**
     * Filter, which StockType to fetch.
     */
    where: Prisma.StockTypeWhereUniqueInput;
};
/**
 * StockType findUniqueOrThrow
 */
export type StockTypeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockType
     */
    select?: Prisma.StockTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockType
     */
    omit?: Prisma.StockTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockTypeInclude<ExtArgs> | null;
    /**
     * Filter, which StockType to fetch.
     */
    where: Prisma.StockTypeWhereUniqueInput;
};
/**
 * StockType findFirst
 */
export type StockTypeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockType
     */
    select?: Prisma.StockTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockType
     */
    omit?: Prisma.StockTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockTypeInclude<ExtArgs> | null;
    /**
     * Filter, which StockType to fetch.
     */
    where?: Prisma.StockTypeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StockTypes to fetch.
     */
    orderBy?: Prisma.StockTypeOrderByWithRelationInput | Prisma.StockTypeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for StockTypes.
     */
    cursor?: Prisma.StockTypeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StockTypes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StockTypes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StockTypes.
     */
    distinct?: Prisma.StockTypeScalarFieldEnum | Prisma.StockTypeScalarFieldEnum[];
};
/**
 * StockType findFirstOrThrow
 */
export type StockTypeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockType
     */
    select?: Prisma.StockTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockType
     */
    omit?: Prisma.StockTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockTypeInclude<ExtArgs> | null;
    /**
     * Filter, which StockType to fetch.
     */
    where?: Prisma.StockTypeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StockTypes to fetch.
     */
    orderBy?: Prisma.StockTypeOrderByWithRelationInput | Prisma.StockTypeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for StockTypes.
     */
    cursor?: Prisma.StockTypeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StockTypes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StockTypes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StockTypes.
     */
    distinct?: Prisma.StockTypeScalarFieldEnum | Prisma.StockTypeScalarFieldEnum[];
};
/**
 * StockType findMany
 */
export type StockTypeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockType
     */
    select?: Prisma.StockTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockType
     */
    omit?: Prisma.StockTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockTypeInclude<ExtArgs> | null;
    /**
     * Filter, which StockTypes to fetch.
     */
    where?: Prisma.StockTypeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StockTypes to fetch.
     */
    orderBy?: Prisma.StockTypeOrderByWithRelationInput | Prisma.StockTypeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing StockTypes.
     */
    cursor?: Prisma.StockTypeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StockTypes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StockTypes.
     */
    skip?: number;
    distinct?: Prisma.StockTypeScalarFieldEnum | Prisma.StockTypeScalarFieldEnum[];
};
/**
 * StockType create
 */
export type StockTypeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockType
     */
    select?: Prisma.StockTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockType
     */
    omit?: Prisma.StockTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockTypeInclude<ExtArgs> | null;
    /**
     * The data needed to create a StockType.
     */
    data: Prisma.XOR<Prisma.StockTypeCreateInput, Prisma.StockTypeUncheckedCreateInput>;
};
/**
 * StockType createMany
 */
export type StockTypeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many StockTypes.
     */
    data: Prisma.StockTypeCreateManyInput | Prisma.StockTypeCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * StockType createManyAndReturn
 */
export type StockTypeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockType
     */
    select?: Prisma.StockTypeSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the StockType
     */
    omit?: Prisma.StockTypeOmit<ExtArgs> | null;
    /**
     * The data used to create many StockTypes.
     */
    data: Prisma.StockTypeCreateManyInput | Prisma.StockTypeCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * StockType update
 */
export type StockTypeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockType
     */
    select?: Prisma.StockTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockType
     */
    omit?: Prisma.StockTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockTypeInclude<ExtArgs> | null;
    /**
     * The data needed to update a StockType.
     */
    data: Prisma.XOR<Prisma.StockTypeUpdateInput, Prisma.StockTypeUncheckedUpdateInput>;
    /**
     * Choose, which StockType to update.
     */
    where: Prisma.StockTypeWhereUniqueInput;
};
/**
 * StockType updateMany
 */
export type StockTypeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update StockTypes.
     */
    data: Prisma.XOR<Prisma.StockTypeUpdateManyMutationInput, Prisma.StockTypeUncheckedUpdateManyInput>;
    /**
     * Filter which StockTypes to update
     */
    where?: Prisma.StockTypeWhereInput;
    /**
     * Limit how many StockTypes to update.
     */
    limit?: number;
};
/**
 * StockType updateManyAndReturn
 */
export type StockTypeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockType
     */
    select?: Prisma.StockTypeSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the StockType
     */
    omit?: Prisma.StockTypeOmit<ExtArgs> | null;
    /**
     * The data used to update StockTypes.
     */
    data: Prisma.XOR<Prisma.StockTypeUpdateManyMutationInput, Prisma.StockTypeUncheckedUpdateManyInput>;
    /**
     * Filter which StockTypes to update
     */
    where?: Prisma.StockTypeWhereInput;
    /**
     * Limit how many StockTypes to update.
     */
    limit?: number;
};
/**
 * StockType upsert
 */
export type StockTypeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockType
     */
    select?: Prisma.StockTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockType
     */
    omit?: Prisma.StockTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockTypeInclude<ExtArgs> | null;
    /**
     * The filter to search for the StockType to update in case it exists.
     */
    where: Prisma.StockTypeWhereUniqueInput;
    /**
     * In case the StockType found by the `where` argument doesn't exist, create a new StockType with this data.
     */
    create: Prisma.XOR<Prisma.StockTypeCreateInput, Prisma.StockTypeUncheckedCreateInput>;
    /**
     * In case the StockType was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.StockTypeUpdateInput, Prisma.StockTypeUncheckedUpdateInput>;
};
/**
 * StockType delete
 */
export type StockTypeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockType
     */
    select?: Prisma.StockTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockType
     */
    omit?: Prisma.StockTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockTypeInclude<ExtArgs> | null;
    /**
     * Filter which StockType to delete.
     */
    where: Prisma.StockTypeWhereUniqueInput;
};
/**
 * StockType deleteMany
 */
export type StockTypeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which StockTypes to delete
     */
    where?: Prisma.StockTypeWhereInput;
    /**
     * Limit how many StockTypes to delete.
     */
    limit?: number;
};
/**
 * StockType.stock_movements
 */
export type StockType$stock_movementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: Prisma.StockMovementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: Prisma.StockMovementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockMovementInclude<ExtArgs> | null;
    where?: Prisma.StockMovementWhereInput;
    orderBy?: Prisma.StockMovementOrderByWithRelationInput | Prisma.StockMovementOrderByWithRelationInput[];
    cursor?: Prisma.StockMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StockMovementScalarFieldEnum | Prisma.StockMovementScalarFieldEnum[];
};
/**
 * StockType without action
 */
export type StockTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockType
     */
    select?: Prisma.StockTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockType
     */
    omit?: Prisma.StockTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockTypeInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=StockType.d.ts.map