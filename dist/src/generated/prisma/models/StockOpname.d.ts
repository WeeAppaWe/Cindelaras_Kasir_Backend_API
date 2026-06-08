import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model StockOpname
 *
 */
export type StockOpnameModel = runtime.Types.Result.DefaultSelection<Prisma.$StockOpnamePayload>;
export type AggregateStockOpname = {
    _count: StockOpnameCountAggregateOutputType | null;
    _min: StockOpnameMinAggregateOutputType | null;
    _max: StockOpnameMaxAggregateOutputType | null;
};
export type StockOpnameMinAggregateOutputType = {
    stock_opname_id: string | null;
    user_id: string | null;
    opname_date: Date | null;
    status: string | null;
    notes: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
export type StockOpnameMaxAggregateOutputType = {
    stock_opname_id: string | null;
    user_id: string | null;
    opname_date: Date | null;
    status: string | null;
    notes: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
export type StockOpnameCountAggregateOutputType = {
    stock_opname_id: number;
    user_id: number;
    opname_date: number;
    status: number;
    notes: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
};
export type StockOpnameMinAggregateInputType = {
    stock_opname_id?: true;
    user_id?: true;
    opname_date?: true;
    status?: true;
    notes?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
};
export type StockOpnameMaxAggregateInputType = {
    stock_opname_id?: true;
    user_id?: true;
    opname_date?: true;
    status?: true;
    notes?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
};
export type StockOpnameCountAggregateInputType = {
    stock_opname_id?: true;
    user_id?: true;
    opname_date?: true;
    status?: true;
    notes?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
};
export type StockOpnameAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which StockOpname to aggregate.
     */
    where?: Prisma.StockOpnameWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StockOpnames to fetch.
     */
    orderBy?: Prisma.StockOpnameOrderByWithRelationInput | Prisma.StockOpnameOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.StockOpnameWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StockOpnames from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StockOpnames.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned StockOpnames
    **/
    _count?: true | StockOpnameCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: StockOpnameMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: StockOpnameMaxAggregateInputType;
};
export type GetStockOpnameAggregateType<T extends StockOpnameAggregateArgs> = {
    [P in keyof T & keyof AggregateStockOpname]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStockOpname[P]> : Prisma.GetScalarType<T[P], AggregateStockOpname[P]>;
};
export type StockOpnameGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockOpnameWhereInput;
    orderBy?: Prisma.StockOpnameOrderByWithAggregationInput | Prisma.StockOpnameOrderByWithAggregationInput[];
    by: Prisma.StockOpnameScalarFieldEnum[] | Prisma.StockOpnameScalarFieldEnum;
    having?: Prisma.StockOpnameScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StockOpnameCountAggregateInputType | true;
    _min?: StockOpnameMinAggregateInputType;
    _max?: StockOpnameMaxAggregateInputType;
};
export type StockOpnameGroupByOutputType = {
    stock_opname_id: string;
    user_id: string;
    opname_date: Date;
    status: string;
    notes: string | null;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    _count: StockOpnameCountAggregateOutputType | null;
    _min: StockOpnameMinAggregateOutputType | null;
    _max: StockOpnameMaxAggregateOutputType | null;
};
type GetStockOpnameGroupByPayload<T extends StockOpnameGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StockOpnameGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StockOpnameGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StockOpnameGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StockOpnameGroupByOutputType[P]>;
}>>;
export type StockOpnameWhereInput = {
    AND?: Prisma.StockOpnameWhereInput | Prisma.StockOpnameWhereInput[];
    OR?: Prisma.StockOpnameWhereInput[];
    NOT?: Prisma.StockOpnameWhereInput | Prisma.StockOpnameWhereInput[];
    stock_opname_id?: Prisma.UuidFilter<"StockOpname"> | string;
    user_id?: Prisma.UuidFilter<"StockOpname"> | string;
    opname_date?: Prisma.DateTimeFilter<"StockOpname"> | Date | string;
    status?: Prisma.StringFilter<"StockOpname"> | string;
    notes?: Prisma.StringNullableFilter<"StockOpname"> | string | null;
    created_at?: Prisma.DateTimeFilter<"StockOpname"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"StockOpname"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"StockOpname"> | Date | string | null;
    items?: Prisma.StockOpnameItemListRelationFilter;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type StockOpnameOrderByWithRelationInput = {
    stock_opname_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    opname_date?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    items?: Prisma.StockOpnameItemOrderByRelationAggregateInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type StockOpnameWhereUniqueInput = Prisma.AtLeast<{
    stock_opname_id?: string;
    AND?: Prisma.StockOpnameWhereInput | Prisma.StockOpnameWhereInput[];
    OR?: Prisma.StockOpnameWhereInput[];
    NOT?: Prisma.StockOpnameWhereInput | Prisma.StockOpnameWhereInput[];
    user_id?: Prisma.UuidFilter<"StockOpname"> | string;
    opname_date?: Prisma.DateTimeFilter<"StockOpname"> | Date | string;
    status?: Prisma.StringFilter<"StockOpname"> | string;
    notes?: Prisma.StringNullableFilter<"StockOpname"> | string | null;
    created_at?: Prisma.DateTimeFilter<"StockOpname"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"StockOpname"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"StockOpname"> | Date | string | null;
    items?: Prisma.StockOpnameItemListRelationFilter;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "stock_opname_id">;
export type StockOpnameOrderByWithAggregationInput = {
    stock_opname_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    opname_date?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.StockOpnameCountOrderByAggregateInput;
    _max?: Prisma.StockOpnameMaxOrderByAggregateInput;
    _min?: Prisma.StockOpnameMinOrderByAggregateInput;
};
export type StockOpnameScalarWhereWithAggregatesInput = {
    AND?: Prisma.StockOpnameScalarWhereWithAggregatesInput | Prisma.StockOpnameScalarWhereWithAggregatesInput[];
    OR?: Prisma.StockOpnameScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StockOpnameScalarWhereWithAggregatesInput | Prisma.StockOpnameScalarWhereWithAggregatesInput[];
    stock_opname_id?: Prisma.UuidWithAggregatesFilter<"StockOpname"> | string;
    user_id?: Prisma.UuidWithAggregatesFilter<"StockOpname"> | string;
    opname_date?: Prisma.DateTimeWithAggregatesFilter<"StockOpname"> | Date | string;
    status?: Prisma.StringWithAggregatesFilter<"StockOpname"> | string;
    notes?: Prisma.StringNullableWithAggregatesFilter<"StockOpname"> | string | null;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"StockOpname"> | Date | string;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"StockOpname"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableWithAggregatesFilter<"StockOpname"> | Date | string | null;
};
export type StockOpnameCreateInput = {
    stock_opname_id?: string;
    opname_date: Date | string;
    status: string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    items?: Prisma.StockOpnameItemCreateNestedManyWithoutStock_opnameInput;
    user: Prisma.UserCreateNestedOneWithoutStock_opnamesInput;
};
export type StockOpnameUncheckedCreateInput = {
    stock_opname_id?: string;
    user_id: string;
    opname_date: Date | string;
    status: string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    items?: Prisma.StockOpnameItemUncheckedCreateNestedManyWithoutStock_opnameInput;
};
export type StockOpnameUpdateInput = {
    stock_opname_id?: Prisma.StringFieldUpdateOperationsInput | string;
    opname_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    items?: Prisma.StockOpnameItemUpdateManyWithoutStock_opnameNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutStock_opnamesNestedInput;
};
export type StockOpnameUncheckedUpdateInput = {
    stock_opname_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    opname_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    items?: Prisma.StockOpnameItemUncheckedUpdateManyWithoutStock_opnameNestedInput;
};
export type StockOpnameCreateManyInput = {
    stock_opname_id?: string;
    user_id: string;
    opname_date: Date | string;
    status: string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type StockOpnameUpdateManyMutationInput = {
    stock_opname_id?: Prisma.StringFieldUpdateOperationsInput | string;
    opname_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StockOpnameUncheckedUpdateManyInput = {
    stock_opname_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    opname_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StockOpnameListRelationFilter = {
    every?: Prisma.StockOpnameWhereInput;
    some?: Prisma.StockOpnameWhereInput;
    none?: Prisma.StockOpnameWhereInput;
};
export type StockOpnameOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StockOpnameCountOrderByAggregateInput = {
    stock_opname_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    opname_date?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type StockOpnameMaxOrderByAggregateInput = {
    stock_opname_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    opname_date?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type StockOpnameMinOrderByAggregateInput = {
    stock_opname_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    opname_date?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type StockOpnameScalarRelationFilter = {
    is?: Prisma.StockOpnameWhereInput;
    isNot?: Prisma.StockOpnameWhereInput;
};
export type StockOpnameCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StockOpnameCreateWithoutUserInput, Prisma.StockOpnameUncheckedCreateWithoutUserInput> | Prisma.StockOpnameCreateWithoutUserInput[] | Prisma.StockOpnameUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StockOpnameCreateOrConnectWithoutUserInput | Prisma.StockOpnameCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.StockOpnameCreateManyUserInputEnvelope;
    connect?: Prisma.StockOpnameWhereUniqueInput | Prisma.StockOpnameWhereUniqueInput[];
};
export type StockOpnameUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StockOpnameCreateWithoutUserInput, Prisma.StockOpnameUncheckedCreateWithoutUserInput> | Prisma.StockOpnameCreateWithoutUserInput[] | Prisma.StockOpnameUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StockOpnameCreateOrConnectWithoutUserInput | Prisma.StockOpnameCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.StockOpnameCreateManyUserInputEnvelope;
    connect?: Prisma.StockOpnameWhereUniqueInput | Prisma.StockOpnameWhereUniqueInput[];
};
export type StockOpnameUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StockOpnameCreateWithoutUserInput, Prisma.StockOpnameUncheckedCreateWithoutUserInput> | Prisma.StockOpnameCreateWithoutUserInput[] | Prisma.StockOpnameUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StockOpnameCreateOrConnectWithoutUserInput | Prisma.StockOpnameCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.StockOpnameUpsertWithWhereUniqueWithoutUserInput | Prisma.StockOpnameUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.StockOpnameCreateManyUserInputEnvelope;
    set?: Prisma.StockOpnameWhereUniqueInput | Prisma.StockOpnameWhereUniqueInput[];
    disconnect?: Prisma.StockOpnameWhereUniqueInput | Prisma.StockOpnameWhereUniqueInput[];
    delete?: Prisma.StockOpnameWhereUniqueInput | Prisma.StockOpnameWhereUniqueInput[];
    connect?: Prisma.StockOpnameWhereUniqueInput | Prisma.StockOpnameWhereUniqueInput[];
    update?: Prisma.StockOpnameUpdateWithWhereUniqueWithoutUserInput | Prisma.StockOpnameUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.StockOpnameUpdateManyWithWhereWithoutUserInput | Prisma.StockOpnameUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.StockOpnameScalarWhereInput | Prisma.StockOpnameScalarWhereInput[];
};
export type StockOpnameUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StockOpnameCreateWithoutUserInput, Prisma.StockOpnameUncheckedCreateWithoutUserInput> | Prisma.StockOpnameCreateWithoutUserInput[] | Prisma.StockOpnameUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StockOpnameCreateOrConnectWithoutUserInput | Prisma.StockOpnameCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.StockOpnameUpsertWithWhereUniqueWithoutUserInput | Prisma.StockOpnameUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.StockOpnameCreateManyUserInputEnvelope;
    set?: Prisma.StockOpnameWhereUniqueInput | Prisma.StockOpnameWhereUniqueInput[];
    disconnect?: Prisma.StockOpnameWhereUniqueInput | Prisma.StockOpnameWhereUniqueInput[];
    delete?: Prisma.StockOpnameWhereUniqueInput | Prisma.StockOpnameWhereUniqueInput[];
    connect?: Prisma.StockOpnameWhereUniqueInput | Prisma.StockOpnameWhereUniqueInput[];
    update?: Prisma.StockOpnameUpdateWithWhereUniqueWithoutUserInput | Prisma.StockOpnameUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.StockOpnameUpdateManyWithWhereWithoutUserInput | Prisma.StockOpnameUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.StockOpnameScalarWhereInput | Prisma.StockOpnameScalarWhereInput[];
};
export type StockOpnameCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.StockOpnameCreateWithoutItemsInput, Prisma.StockOpnameUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.StockOpnameCreateOrConnectWithoutItemsInput;
    connect?: Prisma.StockOpnameWhereUniqueInput;
};
export type StockOpnameUpdateOneRequiredWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.StockOpnameCreateWithoutItemsInput, Prisma.StockOpnameUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.StockOpnameCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.StockOpnameUpsertWithoutItemsInput;
    connect?: Prisma.StockOpnameWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StockOpnameUpdateToOneWithWhereWithoutItemsInput, Prisma.StockOpnameUpdateWithoutItemsInput>, Prisma.StockOpnameUncheckedUpdateWithoutItemsInput>;
};
export type StockOpnameCreateWithoutUserInput = {
    stock_opname_id?: string;
    opname_date: Date | string;
    status: string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    items?: Prisma.StockOpnameItemCreateNestedManyWithoutStock_opnameInput;
};
export type StockOpnameUncheckedCreateWithoutUserInput = {
    stock_opname_id?: string;
    opname_date: Date | string;
    status: string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    items?: Prisma.StockOpnameItemUncheckedCreateNestedManyWithoutStock_opnameInput;
};
export type StockOpnameCreateOrConnectWithoutUserInput = {
    where: Prisma.StockOpnameWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockOpnameCreateWithoutUserInput, Prisma.StockOpnameUncheckedCreateWithoutUserInput>;
};
export type StockOpnameCreateManyUserInputEnvelope = {
    data: Prisma.StockOpnameCreateManyUserInput | Prisma.StockOpnameCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type StockOpnameUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.StockOpnameWhereUniqueInput;
    update: Prisma.XOR<Prisma.StockOpnameUpdateWithoutUserInput, Prisma.StockOpnameUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.StockOpnameCreateWithoutUserInput, Prisma.StockOpnameUncheckedCreateWithoutUserInput>;
};
export type StockOpnameUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.StockOpnameWhereUniqueInput;
    data: Prisma.XOR<Prisma.StockOpnameUpdateWithoutUserInput, Prisma.StockOpnameUncheckedUpdateWithoutUserInput>;
};
export type StockOpnameUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.StockOpnameScalarWhereInput;
    data: Prisma.XOR<Prisma.StockOpnameUpdateManyMutationInput, Prisma.StockOpnameUncheckedUpdateManyWithoutUserInput>;
};
export type StockOpnameScalarWhereInput = {
    AND?: Prisma.StockOpnameScalarWhereInput | Prisma.StockOpnameScalarWhereInput[];
    OR?: Prisma.StockOpnameScalarWhereInput[];
    NOT?: Prisma.StockOpnameScalarWhereInput | Prisma.StockOpnameScalarWhereInput[];
    stock_opname_id?: Prisma.UuidFilter<"StockOpname"> | string;
    user_id?: Prisma.UuidFilter<"StockOpname"> | string;
    opname_date?: Prisma.DateTimeFilter<"StockOpname"> | Date | string;
    status?: Prisma.StringFilter<"StockOpname"> | string;
    notes?: Prisma.StringNullableFilter<"StockOpname"> | string | null;
    created_at?: Prisma.DateTimeFilter<"StockOpname"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"StockOpname"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"StockOpname"> | Date | string | null;
};
export type StockOpnameCreateWithoutItemsInput = {
    stock_opname_id?: string;
    opname_date: Date | string;
    status: string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutStock_opnamesInput;
};
export type StockOpnameUncheckedCreateWithoutItemsInput = {
    stock_opname_id?: string;
    user_id: string;
    opname_date: Date | string;
    status: string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type StockOpnameCreateOrConnectWithoutItemsInput = {
    where: Prisma.StockOpnameWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockOpnameCreateWithoutItemsInput, Prisma.StockOpnameUncheckedCreateWithoutItemsInput>;
};
export type StockOpnameUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.StockOpnameUpdateWithoutItemsInput, Prisma.StockOpnameUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.StockOpnameCreateWithoutItemsInput, Prisma.StockOpnameUncheckedCreateWithoutItemsInput>;
    where?: Prisma.StockOpnameWhereInput;
};
export type StockOpnameUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.StockOpnameWhereInput;
    data: Prisma.XOR<Prisma.StockOpnameUpdateWithoutItemsInput, Prisma.StockOpnameUncheckedUpdateWithoutItemsInput>;
};
export type StockOpnameUpdateWithoutItemsInput = {
    stock_opname_id?: Prisma.StringFieldUpdateOperationsInput | string;
    opname_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutStock_opnamesNestedInput;
};
export type StockOpnameUncheckedUpdateWithoutItemsInput = {
    stock_opname_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    opname_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StockOpnameCreateManyUserInput = {
    stock_opname_id?: string;
    opname_date: Date | string;
    status: string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type StockOpnameUpdateWithoutUserInput = {
    stock_opname_id?: Prisma.StringFieldUpdateOperationsInput | string;
    opname_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    items?: Prisma.StockOpnameItemUpdateManyWithoutStock_opnameNestedInput;
};
export type StockOpnameUncheckedUpdateWithoutUserInput = {
    stock_opname_id?: Prisma.StringFieldUpdateOperationsInput | string;
    opname_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    items?: Prisma.StockOpnameItemUncheckedUpdateManyWithoutStock_opnameNestedInput;
};
export type StockOpnameUncheckedUpdateManyWithoutUserInput = {
    stock_opname_id?: Prisma.StringFieldUpdateOperationsInput | string;
    opname_date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type StockOpnameCountOutputType
 */
export type StockOpnameCountOutputType = {
    items: number;
};
export type StockOpnameCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | StockOpnameCountOutputTypeCountItemsArgs;
};
/**
 * StockOpnameCountOutputType without action
 */
export type StockOpnameCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockOpnameCountOutputType
     */
    select?: Prisma.StockOpnameCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * StockOpnameCountOutputType without action
 */
export type StockOpnameCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockOpnameItemWhereInput;
};
export type StockOpnameSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    stock_opname_id?: boolean;
    user_id?: boolean;
    opname_date?: boolean;
    status?: boolean;
    notes?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    items?: boolean | Prisma.StockOpname$itemsArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.StockOpnameCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["stockOpname"]>;
export type StockOpnameSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    stock_opname_id?: boolean;
    user_id?: boolean;
    opname_date?: boolean;
    status?: boolean;
    notes?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["stockOpname"]>;
export type StockOpnameSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    stock_opname_id?: boolean;
    user_id?: boolean;
    opname_date?: boolean;
    status?: boolean;
    notes?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["stockOpname"]>;
export type StockOpnameSelectScalar = {
    stock_opname_id?: boolean;
    user_id?: boolean;
    opname_date?: boolean;
    status?: boolean;
    notes?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
};
export type StockOpnameOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"stock_opname_id" | "user_id" | "opname_date" | "status" | "notes" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["stockOpname"]>;
export type StockOpnameInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | Prisma.StockOpname$itemsArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.StockOpnameCountOutputTypeDefaultArgs<ExtArgs>;
};
export type StockOpnameIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type StockOpnameIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $StockOpnamePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StockOpname";
    objects: {
        items: Prisma.$StockOpnameItemPayload<ExtArgs>[];
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        stock_opname_id: string;
        user_id: string;
        opname_date: Date;
        status: string;
        notes: string | null;
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
    }, ExtArgs["result"]["stockOpname"]>;
    composites: {};
};
export type StockOpnameGetPayload<S extends boolean | null | undefined | StockOpnameDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StockOpnamePayload, S>;
export type StockOpnameCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StockOpnameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StockOpnameCountAggregateInputType | true;
};
export interface StockOpnameDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['StockOpname'];
        meta: {
            name: 'StockOpname';
        };
    };
    /**
     * Find zero or one StockOpname that matches the filter.
     * @param {StockOpnameFindUniqueArgs} args - Arguments to find a StockOpname
     * @example
     * // Get one StockOpname
     * const stockOpname = await prisma.stockOpname.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockOpnameFindUniqueArgs>(args: Prisma.SelectSubset<T, StockOpnameFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StockOpnameClient<runtime.Types.Result.GetResult<Prisma.$StockOpnamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one StockOpname that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockOpnameFindUniqueOrThrowArgs} args - Arguments to find a StockOpname
     * @example
     * // Get one StockOpname
     * const stockOpname = await prisma.stockOpname.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockOpnameFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StockOpnameFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StockOpnameClient<runtime.Types.Result.GetResult<Prisma.$StockOpnamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first StockOpname that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockOpnameFindFirstArgs} args - Arguments to find a StockOpname
     * @example
     * // Get one StockOpname
     * const stockOpname = await prisma.stockOpname.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockOpnameFindFirstArgs>(args?: Prisma.SelectSubset<T, StockOpnameFindFirstArgs<ExtArgs>>): Prisma.Prisma__StockOpnameClient<runtime.Types.Result.GetResult<Prisma.$StockOpnamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first StockOpname that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockOpnameFindFirstOrThrowArgs} args - Arguments to find a StockOpname
     * @example
     * // Get one StockOpname
     * const stockOpname = await prisma.stockOpname.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockOpnameFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StockOpnameFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StockOpnameClient<runtime.Types.Result.GetResult<Prisma.$StockOpnamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more StockOpnames that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockOpnameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StockOpnames
     * const stockOpnames = await prisma.stockOpname.findMany()
     *
     * // Get first 10 StockOpnames
     * const stockOpnames = await prisma.stockOpname.findMany({ take: 10 })
     *
     * // Only select the `stock_opname_id`
     * const stockOpnameWithStock_opname_idOnly = await prisma.stockOpname.findMany({ select: { stock_opname_id: true } })
     *
     */
    findMany<T extends StockOpnameFindManyArgs>(args?: Prisma.SelectSubset<T, StockOpnameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockOpnamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a StockOpname.
     * @param {StockOpnameCreateArgs} args - Arguments to create a StockOpname.
     * @example
     * // Create one StockOpname
     * const StockOpname = await prisma.stockOpname.create({
     *   data: {
     *     // ... data to create a StockOpname
     *   }
     * })
     *
     */
    create<T extends StockOpnameCreateArgs>(args: Prisma.SelectSubset<T, StockOpnameCreateArgs<ExtArgs>>): Prisma.Prisma__StockOpnameClient<runtime.Types.Result.GetResult<Prisma.$StockOpnamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many StockOpnames.
     * @param {StockOpnameCreateManyArgs} args - Arguments to create many StockOpnames.
     * @example
     * // Create many StockOpnames
     * const stockOpname = await prisma.stockOpname.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends StockOpnameCreateManyArgs>(args?: Prisma.SelectSubset<T, StockOpnameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many StockOpnames and returns the data saved in the database.
     * @param {StockOpnameCreateManyAndReturnArgs} args - Arguments to create many StockOpnames.
     * @example
     * // Create many StockOpnames
     * const stockOpname = await prisma.stockOpname.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many StockOpnames and only return the `stock_opname_id`
     * const stockOpnameWithStock_opname_idOnly = await prisma.stockOpname.createManyAndReturn({
     *   select: { stock_opname_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends StockOpnameCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StockOpnameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockOpnamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a StockOpname.
     * @param {StockOpnameDeleteArgs} args - Arguments to delete one StockOpname.
     * @example
     * // Delete one StockOpname
     * const StockOpname = await prisma.stockOpname.delete({
     *   where: {
     *     // ... filter to delete one StockOpname
     *   }
     * })
     *
     */
    delete<T extends StockOpnameDeleteArgs>(args: Prisma.SelectSubset<T, StockOpnameDeleteArgs<ExtArgs>>): Prisma.Prisma__StockOpnameClient<runtime.Types.Result.GetResult<Prisma.$StockOpnamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one StockOpname.
     * @param {StockOpnameUpdateArgs} args - Arguments to update one StockOpname.
     * @example
     * // Update one StockOpname
     * const stockOpname = await prisma.stockOpname.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends StockOpnameUpdateArgs>(args: Prisma.SelectSubset<T, StockOpnameUpdateArgs<ExtArgs>>): Prisma.Prisma__StockOpnameClient<runtime.Types.Result.GetResult<Prisma.$StockOpnamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more StockOpnames.
     * @param {StockOpnameDeleteManyArgs} args - Arguments to filter StockOpnames to delete.
     * @example
     * // Delete a few StockOpnames
     * const { count } = await prisma.stockOpname.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends StockOpnameDeleteManyArgs>(args?: Prisma.SelectSubset<T, StockOpnameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more StockOpnames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockOpnameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StockOpnames
     * const stockOpname = await prisma.stockOpname.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends StockOpnameUpdateManyArgs>(args: Prisma.SelectSubset<T, StockOpnameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more StockOpnames and returns the data updated in the database.
     * @param {StockOpnameUpdateManyAndReturnArgs} args - Arguments to update many StockOpnames.
     * @example
     * // Update many StockOpnames
     * const stockOpname = await prisma.stockOpname.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more StockOpnames and only return the `stock_opname_id`
     * const stockOpnameWithStock_opname_idOnly = await prisma.stockOpname.updateManyAndReturn({
     *   select: { stock_opname_id: true },
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
    updateManyAndReturn<T extends StockOpnameUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StockOpnameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockOpnamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one StockOpname.
     * @param {StockOpnameUpsertArgs} args - Arguments to update or create a StockOpname.
     * @example
     * // Update or create a StockOpname
     * const stockOpname = await prisma.stockOpname.upsert({
     *   create: {
     *     // ... data to create a StockOpname
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StockOpname we want to update
     *   }
     * })
     */
    upsert<T extends StockOpnameUpsertArgs>(args: Prisma.SelectSubset<T, StockOpnameUpsertArgs<ExtArgs>>): Prisma.Prisma__StockOpnameClient<runtime.Types.Result.GetResult<Prisma.$StockOpnamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of StockOpnames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockOpnameCountArgs} args - Arguments to filter StockOpnames to count.
     * @example
     * // Count the number of StockOpnames
     * const count = await prisma.stockOpname.count({
     *   where: {
     *     // ... the filter for the StockOpnames we want to count
     *   }
     * })
    **/
    count<T extends StockOpnameCountArgs>(args?: Prisma.Subset<T, StockOpnameCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StockOpnameCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a StockOpname.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockOpnameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StockOpnameAggregateArgs>(args: Prisma.Subset<T, StockOpnameAggregateArgs>): Prisma.PrismaPromise<GetStockOpnameAggregateType<T>>;
    /**
     * Group by StockOpname.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockOpnameGroupByArgs} args - Group by arguments.
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
    groupBy<T extends StockOpnameGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StockOpnameGroupByArgs['orderBy'];
    } : {
        orderBy?: StockOpnameGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StockOpnameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockOpnameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the StockOpname model
     */
    readonly fields: StockOpnameFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for StockOpname.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__StockOpnameClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    items<T extends Prisma.StockOpname$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StockOpname$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockOpnameItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the StockOpname model
 */
export interface StockOpnameFieldRefs {
    readonly stock_opname_id: Prisma.FieldRef<"StockOpname", 'String'>;
    readonly user_id: Prisma.FieldRef<"StockOpname", 'String'>;
    readonly opname_date: Prisma.FieldRef<"StockOpname", 'DateTime'>;
    readonly status: Prisma.FieldRef<"StockOpname", 'String'>;
    readonly notes: Prisma.FieldRef<"StockOpname", 'String'>;
    readonly created_at: Prisma.FieldRef<"StockOpname", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"StockOpname", 'DateTime'>;
    readonly deleted_at: Prisma.FieldRef<"StockOpname", 'DateTime'>;
}
/**
 * StockOpname findUnique
 */
export type StockOpnameFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockOpname
     */
    select?: Prisma.StockOpnameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockOpname
     */
    omit?: Prisma.StockOpnameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockOpnameInclude<ExtArgs> | null;
    /**
     * Filter, which StockOpname to fetch.
     */
    where: Prisma.StockOpnameWhereUniqueInput;
};
/**
 * StockOpname findUniqueOrThrow
 */
export type StockOpnameFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockOpname
     */
    select?: Prisma.StockOpnameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockOpname
     */
    omit?: Prisma.StockOpnameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockOpnameInclude<ExtArgs> | null;
    /**
     * Filter, which StockOpname to fetch.
     */
    where: Prisma.StockOpnameWhereUniqueInput;
};
/**
 * StockOpname findFirst
 */
export type StockOpnameFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockOpname
     */
    select?: Prisma.StockOpnameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockOpname
     */
    omit?: Prisma.StockOpnameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockOpnameInclude<ExtArgs> | null;
    /**
     * Filter, which StockOpname to fetch.
     */
    where?: Prisma.StockOpnameWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StockOpnames to fetch.
     */
    orderBy?: Prisma.StockOpnameOrderByWithRelationInput | Prisma.StockOpnameOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for StockOpnames.
     */
    cursor?: Prisma.StockOpnameWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StockOpnames from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StockOpnames.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StockOpnames.
     */
    distinct?: Prisma.StockOpnameScalarFieldEnum | Prisma.StockOpnameScalarFieldEnum[];
};
/**
 * StockOpname findFirstOrThrow
 */
export type StockOpnameFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockOpname
     */
    select?: Prisma.StockOpnameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockOpname
     */
    omit?: Prisma.StockOpnameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockOpnameInclude<ExtArgs> | null;
    /**
     * Filter, which StockOpname to fetch.
     */
    where?: Prisma.StockOpnameWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StockOpnames to fetch.
     */
    orderBy?: Prisma.StockOpnameOrderByWithRelationInput | Prisma.StockOpnameOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for StockOpnames.
     */
    cursor?: Prisma.StockOpnameWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StockOpnames from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StockOpnames.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StockOpnames.
     */
    distinct?: Prisma.StockOpnameScalarFieldEnum | Prisma.StockOpnameScalarFieldEnum[];
};
/**
 * StockOpname findMany
 */
export type StockOpnameFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockOpname
     */
    select?: Prisma.StockOpnameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockOpname
     */
    omit?: Prisma.StockOpnameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockOpnameInclude<ExtArgs> | null;
    /**
     * Filter, which StockOpnames to fetch.
     */
    where?: Prisma.StockOpnameWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StockOpnames to fetch.
     */
    orderBy?: Prisma.StockOpnameOrderByWithRelationInput | Prisma.StockOpnameOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing StockOpnames.
     */
    cursor?: Prisma.StockOpnameWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StockOpnames from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StockOpnames.
     */
    skip?: number;
    distinct?: Prisma.StockOpnameScalarFieldEnum | Prisma.StockOpnameScalarFieldEnum[];
};
/**
 * StockOpname create
 */
export type StockOpnameCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockOpname
     */
    select?: Prisma.StockOpnameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockOpname
     */
    omit?: Prisma.StockOpnameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockOpnameInclude<ExtArgs> | null;
    /**
     * The data needed to create a StockOpname.
     */
    data: Prisma.XOR<Prisma.StockOpnameCreateInput, Prisma.StockOpnameUncheckedCreateInput>;
};
/**
 * StockOpname createMany
 */
export type StockOpnameCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many StockOpnames.
     */
    data: Prisma.StockOpnameCreateManyInput | Prisma.StockOpnameCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * StockOpname createManyAndReturn
 */
export type StockOpnameCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockOpname
     */
    select?: Prisma.StockOpnameSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the StockOpname
     */
    omit?: Prisma.StockOpnameOmit<ExtArgs> | null;
    /**
     * The data used to create many StockOpnames.
     */
    data: Prisma.StockOpnameCreateManyInput | Prisma.StockOpnameCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockOpnameIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * StockOpname update
 */
export type StockOpnameUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockOpname
     */
    select?: Prisma.StockOpnameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockOpname
     */
    omit?: Prisma.StockOpnameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockOpnameInclude<ExtArgs> | null;
    /**
     * The data needed to update a StockOpname.
     */
    data: Prisma.XOR<Prisma.StockOpnameUpdateInput, Prisma.StockOpnameUncheckedUpdateInput>;
    /**
     * Choose, which StockOpname to update.
     */
    where: Prisma.StockOpnameWhereUniqueInput;
};
/**
 * StockOpname updateMany
 */
export type StockOpnameUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update StockOpnames.
     */
    data: Prisma.XOR<Prisma.StockOpnameUpdateManyMutationInput, Prisma.StockOpnameUncheckedUpdateManyInput>;
    /**
     * Filter which StockOpnames to update
     */
    where?: Prisma.StockOpnameWhereInput;
    /**
     * Limit how many StockOpnames to update.
     */
    limit?: number;
};
/**
 * StockOpname updateManyAndReturn
 */
export type StockOpnameUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockOpname
     */
    select?: Prisma.StockOpnameSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the StockOpname
     */
    omit?: Prisma.StockOpnameOmit<ExtArgs> | null;
    /**
     * The data used to update StockOpnames.
     */
    data: Prisma.XOR<Prisma.StockOpnameUpdateManyMutationInput, Prisma.StockOpnameUncheckedUpdateManyInput>;
    /**
     * Filter which StockOpnames to update
     */
    where?: Prisma.StockOpnameWhereInput;
    /**
     * Limit how many StockOpnames to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockOpnameIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * StockOpname upsert
 */
export type StockOpnameUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockOpname
     */
    select?: Prisma.StockOpnameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockOpname
     */
    omit?: Prisma.StockOpnameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockOpnameInclude<ExtArgs> | null;
    /**
     * The filter to search for the StockOpname to update in case it exists.
     */
    where: Prisma.StockOpnameWhereUniqueInput;
    /**
     * In case the StockOpname found by the `where` argument doesn't exist, create a new StockOpname with this data.
     */
    create: Prisma.XOR<Prisma.StockOpnameCreateInput, Prisma.StockOpnameUncheckedCreateInput>;
    /**
     * In case the StockOpname was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.StockOpnameUpdateInput, Prisma.StockOpnameUncheckedUpdateInput>;
};
/**
 * StockOpname delete
 */
export type StockOpnameDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockOpname
     */
    select?: Prisma.StockOpnameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockOpname
     */
    omit?: Prisma.StockOpnameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockOpnameInclude<ExtArgs> | null;
    /**
     * Filter which StockOpname to delete.
     */
    where: Prisma.StockOpnameWhereUniqueInput;
};
/**
 * StockOpname deleteMany
 */
export type StockOpnameDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which StockOpnames to delete
     */
    where?: Prisma.StockOpnameWhereInput;
    /**
     * Limit how many StockOpnames to delete.
     */
    limit?: number;
};
/**
 * StockOpname.items
 */
export type StockOpname$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockOpnameItem
     */
    select?: Prisma.StockOpnameItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockOpnameItem
     */
    omit?: Prisma.StockOpnameItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockOpnameItemInclude<ExtArgs> | null;
    where?: Prisma.StockOpnameItemWhereInput;
    orderBy?: Prisma.StockOpnameItemOrderByWithRelationInput | Prisma.StockOpnameItemOrderByWithRelationInput[];
    cursor?: Prisma.StockOpnameItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StockOpnameItemScalarFieldEnum | Prisma.StockOpnameItemScalarFieldEnum[];
};
/**
 * StockOpname without action
 */
export type StockOpnameDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockOpname
     */
    select?: Prisma.StockOpnameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockOpname
     */
    omit?: Prisma.StockOpnameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockOpnameInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=StockOpname.d.ts.map