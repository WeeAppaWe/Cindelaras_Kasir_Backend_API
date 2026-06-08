import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model UnitMeasure
 *
 */
export type UnitMeasureModel = runtime.Types.Result.DefaultSelection<Prisma.$UnitMeasurePayload>;
export type AggregateUnitMeasure = {
    _count: UnitMeasureCountAggregateOutputType | null;
    _min: UnitMeasureMinAggregateOutputType | null;
    _max: UnitMeasureMaxAggregateOutputType | null;
};
export type UnitMeasureMinAggregateOutputType = {
    unit_measure_id: string | null;
    name: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
export type UnitMeasureMaxAggregateOutputType = {
    unit_measure_id: string | null;
    name: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
export type UnitMeasureCountAggregateOutputType = {
    unit_measure_id: number;
    name: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
};
export type UnitMeasureMinAggregateInputType = {
    unit_measure_id?: true;
    name?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
};
export type UnitMeasureMaxAggregateInputType = {
    unit_measure_id?: true;
    name?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
};
export type UnitMeasureCountAggregateInputType = {
    unit_measure_id?: true;
    name?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
};
export type UnitMeasureAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which UnitMeasure to aggregate.
     */
    where?: Prisma.UnitMeasureWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UnitMeasures to fetch.
     */
    orderBy?: Prisma.UnitMeasureOrderByWithRelationInput | Prisma.UnitMeasureOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UnitMeasureWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UnitMeasures from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UnitMeasures.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned UnitMeasures
    **/
    _count?: true | UnitMeasureCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UnitMeasureMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UnitMeasureMaxAggregateInputType;
};
export type GetUnitMeasureAggregateType<T extends UnitMeasureAggregateArgs> = {
    [P in keyof T & keyof AggregateUnitMeasure]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUnitMeasure[P]> : Prisma.GetScalarType<T[P], AggregateUnitMeasure[P]>;
};
export type UnitMeasureGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UnitMeasureWhereInput;
    orderBy?: Prisma.UnitMeasureOrderByWithAggregationInput | Prisma.UnitMeasureOrderByWithAggregationInput[];
    by: Prisma.UnitMeasureScalarFieldEnum[] | Prisma.UnitMeasureScalarFieldEnum;
    having?: Prisma.UnitMeasureScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UnitMeasureCountAggregateInputType | true;
    _min?: UnitMeasureMinAggregateInputType;
    _max?: UnitMeasureMaxAggregateInputType;
};
export type UnitMeasureGroupByOutputType = {
    unit_measure_id: string;
    name: string;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    _count: UnitMeasureCountAggregateOutputType | null;
    _min: UnitMeasureMinAggregateOutputType | null;
    _max: UnitMeasureMaxAggregateOutputType | null;
};
type GetUnitMeasureGroupByPayload<T extends UnitMeasureGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UnitMeasureGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UnitMeasureGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UnitMeasureGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UnitMeasureGroupByOutputType[P]>;
}>>;
export type UnitMeasureWhereInput = {
    AND?: Prisma.UnitMeasureWhereInput | Prisma.UnitMeasureWhereInput[];
    OR?: Prisma.UnitMeasureWhereInput[];
    NOT?: Prisma.UnitMeasureWhereInput | Prisma.UnitMeasureWhereInput[];
    unit_measure_id?: Prisma.UuidFilter<"UnitMeasure"> | string;
    name?: Prisma.StringFilter<"UnitMeasure"> | string;
    created_at?: Prisma.DateTimeFilter<"UnitMeasure"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"UnitMeasure"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"UnitMeasure"> | Date | string | null;
    ingredients?: Prisma.IngredientListRelationFilter;
};
export type UnitMeasureOrderByWithRelationInput = {
    unit_measure_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    ingredients?: Prisma.IngredientOrderByRelationAggregateInput;
};
export type UnitMeasureWhereUniqueInput = Prisma.AtLeast<{
    unit_measure_id?: string;
    AND?: Prisma.UnitMeasureWhereInput | Prisma.UnitMeasureWhereInput[];
    OR?: Prisma.UnitMeasureWhereInput[];
    NOT?: Prisma.UnitMeasureWhereInput | Prisma.UnitMeasureWhereInput[];
    name?: Prisma.StringFilter<"UnitMeasure"> | string;
    created_at?: Prisma.DateTimeFilter<"UnitMeasure"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"UnitMeasure"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"UnitMeasure"> | Date | string | null;
    ingredients?: Prisma.IngredientListRelationFilter;
}, "unit_measure_id">;
export type UnitMeasureOrderByWithAggregationInput = {
    unit_measure_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.UnitMeasureCountOrderByAggregateInput;
    _max?: Prisma.UnitMeasureMaxOrderByAggregateInput;
    _min?: Prisma.UnitMeasureMinOrderByAggregateInput;
};
export type UnitMeasureScalarWhereWithAggregatesInput = {
    AND?: Prisma.UnitMeasureScalarWhereWithAggregatesInput | Prisma.UnitMeasureScalarWhereWithAggregatesInput[];
    OR?: Prisma.UnitMeasureScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UnitMeasureScalarWhereWithAggregatesInput | Prisma.UnitMeasureScalarWhereWithAggregatesInput[];
    unit_measure_id?: Prisma.UuidWithAggregatesFilter<"UnitMeasure"> | string;
    name?: Prisma.StringWithAggregatesFilter<"UnitMeasure"> | string;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"UnitMeasure"> | Date | string;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"UnitMeasure"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableWithAggregatesFilter<"UnitMeasure"> | Date | string | null;
};
export type UnitMeasureCreateInput = {
    unit_measure_id?: string;
    name: string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    ingredients?: Prisma.IngredientCreateNestedManyWithoutUnitInput;
};
export type UnitMeasureUncheckedCreateInput = {
    unit_measure_id?: string;
    name: string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    ingredients?: Prisma.IngredientUncheckedCreateNestedManyWithoutUnitInput;
};
export type UnitMeasureUpdateInput = {
    unit_measure_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ingredients?: Prisma.IngredientUpdateManyWithoutUnitNestedInput;
};
export type UnitMeasureUncheckedUpdateInput = {
    unit_measure_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ingredients?: Prisma.IngredientUncheckedUpdateManyWithoutUnitNestedInput;
};
export type UnitMeasureCreateManyInput = {
    unit_measure_id?: string;
    name: string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type UnitMeasureUpdateManyMutationInput = {
    unit_measure_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type UnitMeasureUncheckedUpdateManyInput = {
    unit_measure_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type UnitMeasureScalarRelationFilter = {
    is?: Prisma.UnitMeasureWhereInput;
    isNot?: Prisma.UnitMeasureWhereInput;
};
export type UnitMeasureCountOrderByAggregateInput = {
    unit_measure_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type UnitMeasureMaxOrderByAggregateInput = {
    unit_measure_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type UnitMeasureMinOrderByAggregateInput = {
    unit_measure_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type UnitMeasureCreateNestedOneWithoutIngredientsInput = {
    create?: Prisma.XOR<Prisma.UnitMeasureCreateWithoutIngredientsInput, Prisma.UnitMeasureUncheckedCreateWithoutIngredientsInput>;
    connectOrCreate?: Prisma.UnitMeasureCreateOrConnectWithoutIngredientsInput;
    connect?: Prisma.UnitMeasureWhereUniqueInput;
};
export type UnitMeasureUpdateOneRequiredWithoutIngredientsNestedInput = {
    create?: Prisma.XOR<Prisma.UnitMeasureCreateWithoutIngredientsInput, Prisma.UnitMeasureUncheckedCreateWithoutIngredientsInput>;
    connectOrCreate?: Prisma.UnitMeasureCreateOrConnectWithoutIngredientsInput;
    upsert?: Prisma.UnitMeasureUpsertWithoutIngredientsInput;
    connect?: Prisma.UnitMeasureWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UnitMeasureUpdateToOneWithWhereWithoutIngredientsInput, Prisma.UnitMeasureUpdateWithoutIngredientsInput>, Prisma.UnitMeasureUncheckedUpdateWithoutIngredientsInput>;
};
export type UnitMeasureCreateWithoutIngredientsInput = {
    unit_measure_id?: string;
    name: string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type UnitMeasureUncheckedCreateWithoutIngredientsInput = {
    unit_measure_id?: string;
    name: string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type UnitMeasureCreateOrConnectWithoutIngredientsInput = {
    where: Prisma.UnitMeasureWhereUniqueInput;
    create: Prisma.XOR<Prisma.UnitMeasureCreateWithoutIngredientsInput, Prisma.UnitMeasureUncheckedCreateWithoutIngredientsInput>;
};
export type UnitMeasureUpsertWithoutIngredientsInput = {
    update: Prisma.XOR<Prisma.UnitMeasureUpdateWithoutIngredientsInput, Prisma.UnitMeasureUncheckedUpdateWithoutIngredientsInput>;
    create: Prisma.XOR<Prisma.UnitMeasureCreateWithoutIngredientsInput, Prisma.UnitMeasureUncheckedCreateWithoutIngredientsInput>;
    where?: Prisma.UnitMeasureWhereInput;
};
export type UnitMeasureUpdateToOneWithWhereWithoutIngredientsInput = {
    where?: Prisma.UnitMeasureWhereInput;
    data: Prisma.XOR<Prisma.UnitMeasureUpdateWithoutIngredientsInput, Prisma.UnitMeasureUncheckedUpdateWithoutIngredientsInput>;
};
export type UnitMeasureUpdateWithoutIngredientsInput = {
    unit_measure_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type UnitMeasureUncheckedUpdateWithoutIngredientsInput = {
    unit_measure_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type UnitMeasureCountOutputType
 */
export type UnitMeasureCountOutputType = {
    ingredients: number;
};
export type UnitMeasureCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ingredients?: boolean | UnitMeasureCountOutputTypeCountIngredientsArgs;
};
/**
 * UnitMeasureCountOutputType without action
 */
export type UnitMeasureCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitMeasureCountOutputType
     */
    select?: Prisma.UnitMeasureCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * UnitMeasureCountOutputType without action
 */
export type UnitMeasureCountOutputTypeCountIngredientsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IngredientWhereInput;
};
export type UnitMeasureSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    unit_measure_id?: boolean;
    name?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    ingredients?: boolean | Prisma.UnitMeasure$ingredientsArgs<ExtArgs>;
    _count?: boolean | Prisma.UnitMeasureCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["unitMeasure"]>;
export type UnitMeasureSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    unit_measure_id?: boolean;
    name?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
}, ExtArgs["result"]["unitMeasure"]>;
export type UnitMeasureSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    unit_measure_id?: boolean;
    name?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
}, ExtArgs["result"]["unitMeasure"]>;
export type UnitMeasureSelectScalar = {
    unit_measure_id?: boolean;
    name?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
};
export type UnitMeasureOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"unit_measure_id" | "name" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["unitMeasure"]>;
export type UnitMeasureInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ingredients?: boolean | Prisma.UnitMeasure$ingredientsArgs<ExtArgs>;
    _count?: boolean | Prisma.UnitMeasureCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UnitMeasureIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UnitMeasureIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UnitMeasurePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UnitMeasure";
    objects: {
        ingredients: Prisma.$IngredientPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        unit_measure_id: string;
        name: string;
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
    }, ExtArgs["result"]["unitMeasure"]>;
    composites: {};
};
export type UnitMeasureGetPayload<S extends boolean | null | undefined | UnitMeasureDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UnitMeasurePayload, S>;
export type UnitMeasureCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UnitMeasureFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UnitMeasureCountAggregateInputType | true;
};
export interface UnitMeasureDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UnitMeasure'];
        meta: {
            name: 'UnitMeasure';
        };
    };
    /**
     * Find zero or one UnitMeasure that matches the filter.
     * @param {UnitMeasureFindUniqueArgs} args - Arguments to find a UnitMeasure
     * @example
     * // Get one UnitMeasure
     * const unitMeasure = await prisma.unitMeasure.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UnitMeasureFindUniqueArgs>(args: Prisma.SelectSubset<T, UnitMeasureFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UnitMeasureClient<runtime.Types.Result.GetResult<Prisma.$UnitMeasurePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one UnitMeasure that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UnitMeasureFindUniqueOrThrowArgs} args - Arguments to find a UnitMeasure
     * @example
     * // Get one UnitMeasure
     * const unitMeasure = await prisma.unitMeasure.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UnitMeasureFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UnitMeasureFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UnitMeasureClient<runtime.Types.Result.GetResult<Prisma.$UnitMeasurePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first UnitMeasure that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitMeasureFindFirstArgs} args - Arguments to find a UnitMeasure
     * @example
     * // Get one UnitMeasure
     * const unitMeasure = await prisma.unitMeasure.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UnitMeasureFindFirstArgs>(args?: Prisma.SelectSubset<T, UnitMeasureFindFirstArgs<ExtArgs>>): Prisma.Prisma__UnitMeasureClient<runtime.Types.Result.GetResult<Prisma.$UnitMeasurePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first UnitMeasure that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitMeasureFindFirstOrThrowArgs} args - Arguments to find a UnitMeasure
     * @example
     * // Get one UnitMeasure
     * const unitMeasure = await prisma.unitMeasure.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UnitMeasureFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UnitMeasureFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UnitMeasureClient<runtime.Types.Result.GetResult<Prisma.$UnitMeasurePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more UnitMeasures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitMeasureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UnitMeasures
     * const unitMeasures = await prisma.unitMeasure.findMany()
     *
     * // Get first 10 UnitMeasures
     * const unitMeasures = await prisma.unitMeasure.findMany({ take: 10 })
     *
     * // Only select the `unit_measure_id`
     * const unitMeasureWithUnit_measure_idOnly = await prisma.unitMeasure.findMany({ select: { unit_measure_id: true } })
     *
     */
    findMany<T extends UnitMeasureFindManyArgs>(args?: Prisma.SelectSubset<T, UnitMeasureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UnitMeasurePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a UnitMeasure.
     * @param {UnitMeasureCreateArgs} args - Arguments to create a UnitMeasure.
     * @example
     * // Create one UnitMeasure
     * const UnitMeasure = await prisma.unitMeasure.create({
     *   data: {
     *     // ... data to create a UnitMeasure
     *   }
     * })
     *
     */
    create<T extends UnitMeasureCreateArgs>(args: Prisma.SelectSubset<T, UnitMeasureCreateArgs<ExtArgs>>): Prisma.Prisma__UnitMeasureClient<runtime.Types.Result.GetResult<Prisma.$UnitMeasurePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many UnitMeasures.
     * @param {UnitMeasureCreateManyArgs} args - Arguments to create many UnitMeasures.
     * @example
     * // Create many UnitMeasures
     * const unitMeasure = await prisma.unitMeasure.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UnitMeasureCreateManyArgs>(args?: Prisma.SelectSubset<T, UnitMeasureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many UnitMeasures and returns the data saved in the database.
     * @param {UnitMeasureCreateManyAndReturnArgs} args - Arguments to create many UnitMeasures.
     * @example
     * // Create many UnitMeasures
     * const unitMeasure = await prisma.unitMeasure.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many UnitMeasures and only return the `unit_measure_id`
     * const unitMeasureWithUnit_measure_idOnly = await prisma.unitMeasure.createManyAndReturn({
     *   select: { unit_measure_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UnitMeasureCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UnitMeasureCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UnitMeasurePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a UnitMeasure.
     * @param {UnitMeasureDeleteArgs} args - Arguments to delete one UnitMeasure.
     * @example
     * // Delete one UnitMeasure
     * const UnitMeasure = await prisma.unitMeasure.delete({
     *   where: {
     *     // ... filter to delete one UnitMeasure
     *   }
     * })
     *
     */
    delete<T extends UnitMeasureDeleteArgs>(args: Prisma.SelectSubset<T, UnitMeasureDeleteArgs<ExtArgs>>): Prisma.Prisma__UnitMeasureClient<runtime.Types.Result.GetResult<Prisma.$UnitMeasurePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one UnitMeasure.
     * @param {UnitMeasureUpdateArgs} args - Arguments to update one UnitMeasure.
     * @example
     * // Update one UnitMeasure
     * const unitMeasure = await prisma.unitMeasure.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UnitMeasureUpdateArgs>(args: Prisma.SelectSubset<T, UnitMeasureUpdateArgs<ExtArgs>>): Prisma.Prisma__UnitMeasureClient<runtime.Types.Result.GetResult<Prisma.$UnitMeasurePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more UnitMeasures.
     * @param {UnitMeasureDeleteManyArgs} args - Arguments to filter UnitMeasures to delete.
     * @example
     * // Delete a few UnitMeasures
     * const { count } = await prisma.unitMeasure.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UnitMeasureDeleteManyArgs>(args?: Prisma.SelectSubset<T, UnitMeasureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more UnitMeasures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitMeasureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UnitMeasures
     * const unitMeasure = await prisma.unitMeasure.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UnitMeasureUpdateManyArgs>(args: Prisma.SelectSubset<T, UnitMeasureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more UnitMeasures and returns the data updated in the database.
     * @param {UnitMeasureUpdateManyAndReturnArgs} args - Arguments to update many UnitMeasures.
     * @example
     * // Update many UnitMeasures
     * const unitMeasure = await prisma.unitMeasure.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more UnitMeasures and only return the `unit_measure_id`
     * const unitMeasureWithUnit_measure_idOnly = await prisma.unitMeasure.updateManyAndReturn({
     *   select: { unit_measure_id: true },
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
    updateManyAndReturn<T extends UnitMeasureUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UnitMeasureUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UnitMeasurePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one UnitMeasure.
     * @param {UnitMeasureUpsertArgs} args - Arguments to update or create a UnitMeasure.
     * @example
     * // Update or create a UnitMeasure
     * const unitMeasure = await prisma.unitMeasure.upsert({
     *   create: {
     *     // ... data to create a UnitMeasure
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UnitMeasure we want to update
     *   }
     * })
     */
    upsert<T extends UnitMeasureUpsertArgs>(args: Prisma.SelectSubset<T, UnitMeasureUpsertArgs<ExtArgs>>): Prisma.Prisma__UnitMeasureClient<runtime.Types.Result.GetResult<Prisma.$UnitMeasurePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of UnitMeasures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitMeasureCountArgs} args - Arguments to filter UnitMeasures to count.
     * @example
     * // Count the number of UnitMeasures
     * const count = await prisma.unitMeasure.count({
     *   where: {
     *     // ... the filter for the UnitMeasures we want to count
     *   }
     * })
    **/
    count<T extends UnitMeasureCountArgs>(args?: Prisma.Subset<T, UnitMeasureCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UnitMeasureCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a UnitMeasure.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitMeasureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UnitMeasureAggregateArgs>(args: Prisma.Subset<T, UnitMeasureAggregateArgs>): Prisma.PrismaPromise<GetUnitMeasureAggregateType<T>>;
    /**
     * Group by UnitMeasure.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitMeasureGroupByArgs} args - Group by arguments.
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
    groupBy<T extends UnitMeasureGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UnitMeasureGroupByArgs['orderBy'];
    } : {
        orderBy?: UnitMeasureGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UnitMeasureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUnitMeasureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the UnitMeasure model
     */
    readonly fields: UnitMeasureFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for UnitMeasure.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UnitMeasureClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    ingredients<T extends Prisma.UnitMeasure$ingredientsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UnitMeasure$ingredientsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the UnitMeasure model
 */
export interface UnitMeasureFieldRefs {
    readonly unit_measure_id: Prisma.FieldRef<"UnitMeasure", 'String'>;
    readonly name: Prisma.FieldRef<"UnitMeasure", 'String'>;
    readonly created_at: Prisma.FieldRef<"UnitMeasure", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"UnitMeasure", 'DateTime'>;
    readonly deleted_at: Prisma.FieldRef<"UnitMeasure", 'DateTime'>;
}
/**
 * UnitMeasure findUnique
 */
export type UnitMeasureFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitMeasure
     */
    select?: Prisma.UnitMeasureSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UnitMeasure
     */
    omit?: Prisma.UnitMeasureOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UnitMeasureInclude<ExtArgs> | null;
    /**
     * Filter, which UnitMeasure to fetch.
     */
    where: Prisma.UnitMeasureWhereUniqueInput;
};
/**
 * UnitMeasure findUniqueOrThrow
 */
export type UnitMeasureFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitMeasure
     */
    select?: Prisma.UnitMeasureSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UnitMeasure
     */
    omit?: Prisma.UnitMeasureOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UnitMeasureInclude<ExtArgs> | null;
    /**
     * Filter, which UnitMeasure to fetch.
     */
    where: Prisma.UnitMeasureWhereUniqueInput;
};
/**
 * UnitMeasure findFirst
 */
export type UnitMeasureFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitMeasure
     */
    select?: Prisma.UnitMeasureSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UnitMeasure
     */
    omit?: Prisma.UnitMeasureOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UnitMeasureInclude<ExtArgs> | null;
    /**
     * Filter, which UnitMeasure to fetch.
     */
    where?: Prisma.UnitMeasureWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UnitMeasures to fetch.
     */
    orderBy?: Prisma.UnitMeasureOrderByWithRelationInput | Prisma.UnitMeasureOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UnitMeasures.
     */
    cursor?: Prisma.UnitMeasureWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UnitMeasures from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UnitMeasures.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UnitMeasures.
     */
    distinct?: Prisma.UnitMeasureScalarFieldEnum | Prisma.UnitMeasureScalarFieldEnum[];
};
/**
 * UnitMeasure findFirstOrThrow
 */
export type UnitMeasureFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitMeasure
     */
    select?: Prisma.UnitMeasureSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UnitMeasure
     */
    omit?: Prisma.UnitMeasureOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UnitMeasureInclude<ExtArgs> | null;
    /**
     * Filter, which UnitMeasure to fetch.
     */
    where?: Prisma.UnitMeasureWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UnitMeasures to fetch.
     */
    orderBy?: Prisma.UnitMeasureOrderByWithRelationInput | Prisma.UnitMeasureOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UnitMeasures.
     */
    cursor?: Prisma.UnitMeasureWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UnitMeasures from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UnitMeasures.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UnitMeasures.
     */
    distinct?: Prisma.UnitMeasureScalarFieldEnum | Prisma.UnitMeasureScalarFieldEnum[];
};
/**
 * UnitMeasure findMany
 */
export type UnitMeasureFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitMeasure
     */
    select?: Prisma.UnitMeasureSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UnitMeasure
     */
    omit?: Prisma.UnitMeasureOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UnitMeasureInclude<ExtArgs> | null;
    /**
     * Filter, which UnitMeasures to fetch.
     */
    where?: Prisma.UnitMeasureWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UnitMeasures to fetch.
     */
    orderBy?: Prisma.UnitMeasureOrderByWithRelationInput | Prisma.UnitMeasureOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing UnitMeasures.
     */
    cursor?: Prisma.UnitMeasureWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UnitMeasures from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UnitMeasures.
     */
    skip?: number;
    distinct?: Prisma.UnitMeasureScalarFieldEnum | Prisma.UnitMeasureScalarFieldEnum[];
};
/**
 * UnitMeasure create
 */
export type UnitMeasureCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitMeasure
     */
    select?: Prisma.UnitMeasureSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UnitMeasure
     */
    omit?: Prisma.UnitMeasureOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UnitMeasureInclude<ExtArgs> | null;
    /**
     * The data needed to create a UnitMeasure.
     */
    data: Prisma.XOR<Prisma.UnitMeasureCreateInput, Prisma.UnitMeasureUncheckedCreateInput>;
};
/**
 * UnitMeasure createMany
 */
export type UnitMeasureCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many UnitMeasures.
     */
    data: Prisma.UnitMeasureCreateManyInput | Prisma.UnitMeasureCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * UnitMeasure createManyAndReturn
 */
export type UnitMeasureCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitMeasure
     */
    select?: Prisma.UnitMeasureSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the UnitMeasure
     */
    omit?: Prisma.UnitMeasureOmit<ExtArgs> | null;
    /**
     * The data used to create many UnitMeasures.
     */
    data: Prisma.UnitMeasureCreateManyInput | Prisma.UnitMeasureCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * UnitMeasure update
 */
export type UnitMeasureUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitMeasure
     */
    select?: Prisma.UnitMeasureSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UnitMeasure
     */
    omit?: Prisma.UnitMeasureOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UnitMeasureInclude<ExtArgs> | null;
    /**
     * The data needed to update a UnitMeasure.
     */
    data: Prisma.XOR<Prisma.UnitMeasureUpdateInput, Prisma.UnitMeasureUncheckedUpdateInput>;
    /**
     * Choose, which UnitMeasure to update.
     */
    where: Prisma.UnitMeasureWhereUniqueInput;
};
/**
 * UnitMeasure updateMany
 */
export type UnitMeasureUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update UnitMeasures.
     */
    data: Prisma.XOR<Prisma.UnitMeasureUpdateManyMutationInput, Prisma.UnitMeasureUncheckedUpdateManyInput>;
    /**
     * Filter which UnitMeasures to update
     */
    where?: Prisma.UnitMeasureWhereInput;
    /**
     * Limit how many UnitMeasures to update.
     */
    limit?: number;
};
/**
 * UnitMeasure updateManyAndReturn
 */
export type UnitMeasureUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitMeasure
     */
    select?: Prisma.UnitMeasureSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the UnitMeasure
     */
    omit?: Prisma.UnitMeasureOmit<ExtArgs> | null;
    /**
     * The data used to update UnitMeasures.
     */
    data: Prisma.XOR<Prisma.UnitMeasureUpdateManyMutationInput, Prisma.UnitMeasureUncheckedUpdateManyInput>;
    /**
     * Filter which UnitMeasures to update
     */
    where?: Prisma.UnitMeasureWhereInput;
    /**
     * Limit how many UnitMeasures to update.
     */
    limit?: number;
};
/**
 * UnitMeasure upsert
 */
export type UnitMeasureUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitMeasure
     */
    select?: Prisma.UnitMeasureSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UnitMeasure
     */
    omit?: Prisma.UnitMeasureOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UnitMeasureInclude<ExtArgs> | null;
    /**
     * The filter to search for the UnitMeasure to update in case it exists.
     */
    where: Prisma.UnitMeasureWhereUniqueInput;
    /**
     * In case the UnitMeasure found by the `where` argument doesn't exist, create a new UnitMeasure with this data.
     */
    create: Prisma.XOR<Prisma.UnitMeasureCreateInput, Prisma.UnitMeasureUncheckedCreateInput>;
    /**
     * In case the UnitMeasure was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UnitMeasureUpdateInput, Prisma.UnitMeasureUncheckedUpdateInput>;
};
/**
 * UnitMeasure delete
 */
export type UnitMeasureDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitMeasure
     */
    select?: Prisma.UnitMeasureSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UnitMeasure
     */
    omit?: Prisma.UnitMeasureOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UnitMeasureInclude<ExtArgs> | null;
    /**
     * Filter which UnitMeasure to delete.
     */
    where: Prisma.UnitMeasureWhereUniqueInput;
};
/**
 * UnitMeasure deleteMany
 */
export type UnitMeasureDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which UnitMeasures to delete
     */
    where?: Prisma.UnitMeasureWhereInput;
    /**
     * Limit how many UnitMeasures to delete.
     */
    limit?: number;
};
/**
 * UnitMeasure.ingredients
 */
export type UnitMeasure$ingredientsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: Prisma.IngredientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: Prisma.IngredientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IngredientInclude<ExtArgs> | null;
    where?: Prisma.IngredientWhereInput;
    orderBy?: Prisma.IngredientOrderByWithRelationInput | Prisma.IngredientOrderByWithRelationInput[];
    cursor?: Prisma.IngredientWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IngredientScalarFieldEnum | Prisma.IngredientScalarFieldEnum[];
};
/**
 * UnitMeasure without action
 */
export type UnitMeasureDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitMeasure
     */
    select?: Prisma.UnitMeasureSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UnitMeasure
     */
    omit?: Prisma.UnitMeasureOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UnitMeasureInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=UnitMeasure.d.ts.map