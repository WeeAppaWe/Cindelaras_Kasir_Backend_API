import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Shift
 *
 */
export type ShiftModel = runtime.Types.Result.DefaultSelection<Prisma.$ShiftPayload>;
export type AggregateShift = {
    _count: ShiftCountAggregateOutputType | null;
    _avg: ShiftAvgAggregateOutputType | null;
    _sum: ShiftSumAggregateOutputType | null;
    _min: ShiftMinAggregateOutputType | null;
    _max: ShiftMaxAggregateOutputType | null;
};
export type ShiftAvgAggregateOutputType = {
    start_cash: runtime.Decimal | null;
    end_cash: runtime.Decimal | null;
    sold_total: runtime.Decimal | null;
};
export type ShiftSumAggregateOutputType = {
    start_cash: runtime.Decimal | null;
    end_cash: runtime.Decimal | null;
    sold_total: runtime.Decimal | null;
};
export type ShiftMinAggregateOutputType = {
    shift_id: string | null;
    user_id: string | null;
    start_cash: runtime.Decimal | null;
    end_cash: runtime.Decimal | null;
    sold_total: runtime.Decimal | null;
    start_time: Date | null;
    end_time: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
export type ShiftMaxAggregateOutputType = {
    shift_id: string | null;
    user_id: string | null;
    start_cash: runtime.Decimal | null;
    end_cash: runtime.Decimal | null;
    sold_total: runtime.Decimal | null;
    start_time: Date | null;
    end_time: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
export type ShiftCountAggregateOutputType = {
    shift_id: number;
    user_id: number;
    start_cash: number;
    end_cash: number;
    sold_total: number;
    start_time: number;
    end_time: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
};
export type ShiftAvgAggregateInputType = {
    start_cash?: true;
    end_cash?: true;
    sold_total?: true;
};
export type ShiftSumAggregateInputType = {
    start_cash?: true;
    end_cash?: true;
    sold_total?: true;
};
export type ShiftMinAggregateInputType = {
    shift_id?: true;
    user_id?: true;
    start_cash?: true;
    end_cash?: true;
    sold_total?: true;
    start_time?: true;
    end_time?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
};
export type ShiftMaxAggregateInputType = {
    shift_id?: true;
    user_id?: true;
    start_cash?: true;
    end_cash?: true;
    sold_total?: true;
    start_time?: true;
    end_time?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
};
export type ShiftCountAggregateInputType = {
    shift_id?: true;
    user_id?: true;
    start_cash?: true;
    end_cash?: true;
    sold_total?: true;
    start_time?: true;
    end_time?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
};
export type ShiftAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Shift to aggregate.
     */
    where?: Prisma.ShiftWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Shifts to fetch.
     */
    orderBy?: Prisma.ShiftOrderByWithRelationInput | Prisma.ShiftOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ShiftWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Shifts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Shifts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Shifts
    **/
    _count?: true | ShiftCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ShiftAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ShiftSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ShiftMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ShiftMaxAggregateInputType;
};
export type GetShiftAggregateType<T extends ShiftAggregateArgs> = {
    [P in keyof T & keyof AggregateShift]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateShift[P]> : Prisma.GetScalarType<T[P], AggregateShift[P]>;
};
export type ShiftGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShiftWhereInput;
    orderBy?: Prisma.ShiftOrderByWithAggregationInput | Prisma.ShiftOrderByWithAggregationInput[];
    by: Prisma.ShiftScalarFieldEnum[] | Prisma.ShiftScalarFieldEnum;
    having?: Prisma.ShiftScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ShiftCountAggregateInputType | true;
    _avg?: ShiftAvgAggregateInputType;
    _sum?: ShiftSumAggregateInputType;
    _min?: ShiftMinAggregateInputType;
    _max?: ShiftMaxAggregateInputType;
};
export type ShiftGroupByOutputType = {
    shift_id: string;
    user_id: string;
    start_cash: runtime.Decimal;
    end_cash: runtime.Decimal | null;
    sold_total: runtime.Decimal | null;
    start_time: Date;
    end_time: Date | null;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    _count: ShiftCountAggregateOutputType | null;
    _avg: ShiftAvgAggregateOutputType | null;
    _sum: ShiftSumAggregateOutputType | null;
    _min: ShiftMinAggregateOutputType | null;
    _max: ShiftMaxAggregateOutputType | null;
};
type GetShiftGroupByPayload<T extends ShiftGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ShiftGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ShiftGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ShiftGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ShiftGroupByOutputType[P]>;
}>>;
export type ShiftWhereInput = {
    AND?: Prisma.ShiftWhereInput | Prisma.ShiftWhereInput[];
    OR?: Prisma.ShiftWhereInput[];
    NOT?: Prisma.ShiftWhereInput | Prisma.ShiftWhereInput[];
    shift_id?: Prisma.UuidFilter<"Shift"> | string;
    user_id?: Prisma.UuidFilter<"Shift"> | string;
    start_cash?: Prisma.DecimalFilter<"Shift"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: Prisma.DecimalNullableFilter<"Shift"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: Prisma.DecimalNullableFilter<"Shift"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time?: Prisma.DateTimeFilter<"Shift"> | Date | string;
    end_time?: Prisma.DateTimeNullableFilter<"Shift"> | Date | string | null;
    created_at?: Prisma.DateTimeFilter<"Shift"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"Shift"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"Shift"> | Date | string | null;
    cash_movements?: Prisma.CashMovementListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type ShiftOrderByWithRelationInput = {
    shift_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    start_cash?: Prisma.SortOrder;
    end_cash?: Prisma.SortOrderInput | Prisma.SortOrder;
    sold_total?: Prisma.SortOrderInput | Prisma.SortOrder;
    start_time?: Prisma.SortOrder;
    end_time?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    cash_movements?: Prisma.CashMovementOrderByRelationAggregateInput;
    orders?: Prisma.OrderOrderByRelationAggregateInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type ShiftWhereUniqueInput = Prisma.AtLeast<{
    shift_id?: string;
    AND?: Prisma.ShiftWhereInput | Prisma.ShiftWhereInput[];
    OR?: Prisma.ShiftWhereInput[];
    NOT?: Prisma.ShiftWhereInput | Prisma.ShiftWhereInput[];
    user_id?: Prisma.UuidFilter<"Shift"> | string;
    start_cash?: Prisma.DecimalFilter<"Shift"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: Prisma.DecimalNullableFilter<"Shift"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: Prisma.DecimalNullableFilter<"Shift"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time?: Prisma.DateTimeFilter<"Shift"> | Date | string;
    end_time?: Prisma.DateTimeNullableFilter<"Shift"> | Date | string | null;
    created_at?: Prisma.DateTimeFilter<"Shift"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"Shift"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"Shift"> | Date | string | null;
    cash_movements?: Prisma.CashMovementListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "shift_id">;
export type ShiftOrderByWithAggregationInput = {
    shift_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    start_cash?: Prisma.SortOrder;
    end_cash?: Prisma.SortOrderInput | Prisma.SortOrder;
    sold_total?: Prisma.SortOrderInput | Prisma.SortOrder;
    start_time?: Prisma.SortOrder;
    end_time?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ShiftCountOrderByAggregateInput;
    _avg?: Prisma.ShiftAvgOrderByAggregateInput;
    _max?: Prisma.ShiftMaxOrderByAggregateInput;
    _min?: Prisma.ShiftMinOrderByAggregateInput;
    _sum?: Prisma.ShiftSumOrderByAggregateInput;
};
export type ShiftScalarWhereWithAggregatesInput = {
    AND?: Prisma.ShiftScalarWhereWithAggregatesInput | Prisma.ShiftScalarWhereWithAggregatesInput[];
    OR?: Prisma.ShiftScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ShiftScalarWhereWithAggregatesInput | Prisma.ShiftScalarWhereWithAggregatesInput[];
    shift_id?: Prisma.UuidWithAggregatesFilter<"Shift"> | string;
    user_id?: Prisma.UuidWithAggregatesFilter<"Shift"> | string;
    start_cash?: Prisma.DecimalWithAggregatesFilter<"Shift"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: Prisma.DecimalNullableWithAggregatesFilter<"Shift"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: Prisma.DecimalNullableWithAggregatesFilter<"Shift"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time?: Prisma.DateTimeWithAggregatesFilter<"Shift"> | Date | string;
    end_time?: Prisma.DateTimeNullableWithAggregatesFilter<"Shift"> | Date | string | null;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"Shift"> | Date | string;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"Shift"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableWithAggregatesFilter<"Shift"> | Date | string | null;
};
export type ShiftCreateInput = {
    shift_id?: string;
    start_cash: runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time: Date | string;
    end_time?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    cash_movements?: Prisma.CashMovementCreateNestedManyWithoutShiftInput;
    orders?: Prisma.OrderCreateNestedManyWithoutShiftInput;
    user: Prisma.UserCreateNestedOneWithoutShiftsInput;
};
export type ShiftUncheckedCreateInput = {
    shift_id?: string;
    user_id: string;
    start_cash: runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time: Date | string;
    end_time?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    cash_movements?: Prisma.CashMovementUncheckedCreateNestedManyWithoutShiftInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutShiftInput;
};
export type ShiftUpdateInput = {
    shift_id?: Prisma.StringFieldUpdateOperationsInput | string;
    start_cash?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    end_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cash_movements?: Prisma.CashMovementUpdateManyWithoutShiftNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutShiftNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutShiftsNestedInput;
};
export type ShiftUncheckedUpdateInput = {
    shift_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    start_cash?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    end_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cash_movements?: Prisma.CashMovementUncheckedUpdateManyWithoutShiftNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutShiftNestedInput;
};
export type ShiftCreateManyInput = {
    shift_id?: string;
    user_id: string;
    start_cash: runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time: Date | string;
    end_time?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type ShiftUpdateManyMutationInput = {
    shift_id?: Prisma.StringFieldUpdateOperationsInput | string;
    start_cash?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    end_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ShiftUncheckedUpdateManyInput = {
    shift_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    start_cash?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    end_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ShiftListRelationFilter = {
    every?: Prisma.ShiftWhereInput;
    some?: Prisma.ShiftWhereInput;
    none?: Prisma.ShiftWhereInput;
};
export type ShiftOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ShiftCountOrderByAggregateInput = {
    shift_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    start_cash?: Prisma.SortOrder;
    end_cash?: Prisma.SortOrder;
    sold_total?: Prisma.SortOrder;
    start_time?: Prisma.SortOrder;
    end_time?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type ShiftAvgOrderByAggregateInput = {
    start_cash?: Prisma.SortOrder;
    end_cash?: Prisma.SortOrder;
    sold_total?: Prisma.SortOrder;
};
export type ShiftMaxOrderByAggregateInput = {
    shift_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    start_cash?: Prisma.SortOrder;
    end_cash?: Prisma.SortOrder;
    sold_total?: Prisma.SortOrder;
    start_time?: Prisma.SortOrder;
    end_time?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type ShiftMinOrderByAggregateInput = {
    shift_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    start_cash?: Prisma.SortOrder;
    end_cash?: Prisma.SortOrder;
    sold_total?: Prisma.SortOrder;
    start_time?: Prisma.SortOrder;
    end_time?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type ShiftSumOrderByAggregateInput = {
    start_cash?: Prisma.SortOrder;
    end_cash?: Prisma.SortOrder;
    sold_total?: Prisma.SortOrder;
};
export type ShiftScalarRelationFilter = {
    is?: Prisma.ShiftWhereInput;
    isNot?: Prisma.ShiftWhereInput;
};
export type ShiftCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ShiftCreateWithoutUserInput, Prisma.ShiftUncheckedCreateWithoutUserInput> | Prisma.ShiftCreateWithoutUserInput[] | Prisma.ShiftUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ShiftCreateOrConnectWithoutUserInput | Prisma.ShiftCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ShiftCreateManyUserInputEnvelope;
    connect?: Prisma.ShiftWhereUniqueInput | Prisma.ShiftWhereUniqueInput[];
};
export type ShiftUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ShiftCreateWithoutUserInput, Prisma.ShiftUncheckedCreateWithoutUserInput> | Prisma.ShiftCreateWithoutUserInput[] | Prisma.ShiftUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ShiftCreateOrConnectWithoutUserInput | Prisma.ShiftCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ShiftCreateManyUserInputEnvelope;
    connect?: Prisma.ShiftWhereUniqueInput | Prisma.ShiftWhereUniqueInput[];
};
export type ShiftUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ShiftCreateWithoutUserInput, Prisma.ShiftUncheckedCreateWithoutUserInput> | Prisma.ShiftCreateWithoutUserInput[] | Prisma.ShiftUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ShiftCreateOrConnectWithoutUserInput | Prisma.ShiftCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ShiftUpsertWithWhereUniqueWithoutUserInput | Prisma.ShiftUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ShiftCreateManyUserInputEnvelope;
    set?: Prisma.ShiftWhereUniqueInput | Prisma.ShiftWhereUniqueInput[];
    disconnect?: Prisma.ShiftWhereUniqueInput | Prisma.ShiftWhereUniqueInput[];
    delete?: Prisma.ShiftWhereUniqueInput | Prisma.ShiftWhereUniqueInput[];
    connect?: Prisma.ShiftWhereUniqueInput | Prisma.ShiftWhereUniqueInput[];
    update?: Prisma.ShiftUpdateWithWhereUniqueWithoutUserInput | Prisma.ShiftUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ShiftUpdateManyWithWhereWithoutUserInput | Prisma.ShiftUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ShiftScalarWhereInput | Prisma.ShiftScalarWhereInput[];
};
export type ShiftUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ShiftCreateWithoutUserInput, Prisma.ShiftUncheckedCreateWithoutUserInput> | Prisma.ShiftCreateWithoutUserInput[] | Prisma.ShiftUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ShiftCreateOrConnectWithoutUserInput | Prisma.ShiftCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ShiftUpsertWithWhereUniqueWithoutUserInput | Prisma.ShiftUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ShiftCreateManyUserInputEnvelope;
    set?: Prisma.ShiftWhereUniqueInput | Prisma.ShiftWhereUniqueInput[];
    disconnect?: Prisma.ShiftWhereUniqueInput | Prisma.ShiftWhereUniqueInput[];
    delete?: Prisma.ShiftWhereUniqueInput | Prisma.ShiftWhereUniqueInput[];
    connect?: Prisma.ShiftWhereUniqueInput | Prisma.ShiftWhereUniqueInput[];
    update?: Prisma.ShiftUpdateWithWhereUniqueWithoutUserInput | Prisma.ShiftUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ShiftUpdateManyWithWhereWithoutUserInput | Prisma.ShiftUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ShiftScalarWhereInput | Prisma.ShiftScalarWhereInput[];
};
export type ShiftCreateNestedOneWithoutCash_movementsInput = {
    create?: Prisma.XOR<Prisma.ShiftCreateWithoutCash_movementsInput, Prisma.ShiftUncheckedCreateWithoutCash_movementsInput>;
    connectOrCreate?: Prisma.ShiftCreateOrConnectWithoutCash_movementsInput;
    connect?: Prisma.ShiftWhereUniqueInput;
};
export type ShiftUpdateOneRequiredWithoutCash_movementsNestedInput = {
    create?: Prisma.XOR<Prisma.ShiftCreateWithoutCash_movementsInput, Prisma.ShiftUncheckedCreateWithoutCash_movementsInput>;
    connectOrCreate?: Prisma.ShiftCreateOrConnectWithoutCash_movementsInput;
    upsert?: Prisma.ShiftUpsertWithoutCash_movementsInput;
    connect?: Prisma.ShiftWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ShiftUpdateToOneWithWhereWithoutCash_movementsInput, Prisma.ShiftUpdateWithoutCash_movementsInput>, Prisma.ShiftUncheckedUpdateWithoutCash_movementsInput>;
};
export type ShiftCreateNestedOneWithoutOrdersInput = {
    create?: Prisma.XOR<Prisma.ShiftCreateWithoutOrdersInput, Prisma.ShiftUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.ShiftCreateOrConnectWithoutOrdersInput;
    connect?: Prisma.ShiftWhereUniqueInput;
};
export type ShiftUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.ShiftCreateWithoutOrdersInput, Prisma.ShiftUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.ShiftCreateOrConnectWithoutOrdersInput;
    upsert?: Prisma.ShiftUpsertWithoutOrdersInput;
    connect?: Prisma.ShiftWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ShiftUpdateToOneWithWhereWithoutOrdersInput, Prisma.ShiftUpdateWithoutOrdersInput>, Prisma.ShiftUncheckedUpdateWithoutOrdersInput>;
};
export type ShiftCreateWithoutUserInput = {
    shift_id?: string;
    start_cash: runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time: Date | string;
    end_time?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    cash_movements?: Prisma.CashMovementCreateNestedManyWithoutShiftInput;
    orders?: Prisma.OrderCreateNestedManyWithoutShiftInput;
};
export type ShiftUncheckedCreateWithoutUserInput = {
    shift_id?: string;
    start_cash: runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time: Date | string;
    end_time?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    cash_movements?: Prisma.CashMovementUncheckedCreateNestedManyWithoutShiftInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutShiftInput;
};
export type ShiftCreateOrConnectWithoutUserInput = {
    where: Prisma.ShiftWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShiftCreateWithoutUserInput, Prisma.ShiftUncheckedCreateWithoutUserInput>;
};
export type ShiftCreateManyUserInputEnvelope = {
    data: Prisma.ShiftCreateManyUserInput | Prisma.ShiftCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ShiftUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ShiftWhereUniqueInput;
    update: Prisma.XOR<Prisma.ShiftUpdateWithoutUserInput, Prisma.ShiftUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ShiftCreateWithoutUserInput, Prisma.ShiftUncheckedCreateWithoutUserInput>;
};
export type ShiftUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ShiftWhereUniqueInput;
    data: Prisma.XOR<Prisma.ShiftUpdateWithoutUserInput, Prisma.ShiftUncheckedUpdateWithoutUserInput>;
};
export type ShiftUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ShiftScalarWhereInput;
    data: Prisma.XOR<Prisma.ShiftUpdateManyMutationInput, Prisma.ShiftUncheckedUpdateManyWithoutUserInput>;
};
export type ShiftScalarWhereInput = {
    AND?: Prisma.ShiftScalarWhereInput | Prisma.ShiftScalarWhereInput[];
    OR?: Prisma.ShiftScalarWhereInput[];
    NOT?: Prisma.ShiftScalarWhereInput | Prisma.ShiftScalarWhereInput[];
    shift_id?: Prisma.UuidFilter<"Shift"> | string;
    user_id?: Prisma.UuidFilter<"Shift"> | string;
    start_cash?: Prisma.DecimalFilter<"Shift"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: Prisma.DecimalNullableFilter<"Shift"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: Prisma.DecimalNullableFilter<"Shift"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time?: Prisma.DateTimeFilter<"Shift"> | Date | string;
    end_time?: Prisma.DateTimeNullableFilter<"Shift"> | Date | string | null;
    created_at?: Prisma.DateTimeFilter<"Shift"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"Shift"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"Shift"> | Date | string | null;
};
export type ShiftCreateWithoutCash_movementsInput = {
    shift_id?: string;
    start_cash: runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time: Date | string;
    end_time?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    orders?: Prisma.OrderCreateNestedManyWithoutShiftInput;
    user: Prisma.UserCreateNestedOneWithoutShiftsInput;
};
export type ShiftUncheckedCreateWithoutCash_movementsInput = {
    shift_id?: string;
    user_id: string;
    start_cash: runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time: Date | string;
    end_time?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutShiftInput;
};
export type ShiftCreateOrConnectWithoutCash_movementsInput = {
    where: Prisma.ShiftWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShiftCreateWithoutCash_movementsInput, Prisma.ShiftUncheckedCreateWithoutCash_movementsInput>;
};
export type ShiftUpsertWithoutCash_movementsInput = {
    update: Prisma.XOR<Prisma.ShiftUpdateWithoutCash_movementsInput, Prisma.ShiftUncheckedUpdateWithoutCash_movementsInput>;
    create: Prisma.XOR<Prisma.ShiftCreateWithoutCash_movementsInput, Prisma.ShiftUncheckedCreateWithoutCash_movementsInput>;
    where?: Prisma.ShiftWhereInput;
};
export type ShiftUpdateToOneWithWhereWithoutCash_movementsInput = {
    where?: Prisma.ShiftWhereInput;
    data: Prisma.XOR<Prisma.ShiftUpdateWithoutCash_movementsInput, Prisma.ShiftUncheckedUpdateWithoutCash_movementsInput>;
};
export type ShiftUpdateWithoutCash_movementsInput = {
    shift_id?: Prisma.StringFieldUpdateOperationsInput | string;
    start_cash?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    end_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    orders?: Prisma.OrderUpdateManyWithoutShiftNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutShiftsNestedInput;
};
export type ShiftUncheckedUpdateWithoutCash_movementsInput = {
    shift_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    start_cash?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    end_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutShiftNestedInput;
};
export type ShiftCreateWithoutOrdersInput = {
    shift_id?: string;
    start_cash: runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time: Date | string;
    end_time?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    cash_movements?: Prisma.CashMovementCreateNestedManyWithoutShiftInput;
    user: Prisma.UserCreateNestedOneWithoutShiftsInput;
};
export type ShiftUncheckedCreateWithoutOrdersInput = {
    shift_id?: string;
    user_id: string;
    start_cash: runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time: Date | string;
    end_time?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    cash_movements?: Prisma.CashMovementUncheckedCreateNestedManyWithoutShiftInput;
};
export type ShiftCreateOrConnectWithoutOrdersInput = {
    where: Prisma.ShiftWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShiftCreateWithoutOrdersInput, Prisma.ShiftUncheckedCreateWithoutOrdersInput>;
};
export type ShiftUpsertWithoutOrdersInput = {
    update: Prisma.XOR<Prisma.ShiftUpdateWithoutOrdersInput, Prisma.ShiftUncheckedUpdateWithoutOrdersInput>;
    create: Prisma.XOR<Prisma.ShiftCreateWithoutOrdersInput, Prisma.ShiftUncheckedCreateWithoutOrdersInput>;
    where?: Prisma.ShiftWhereInput;
};
export type ShiftUpdateToOneWithWhereWithoutOrdersInput = {
    where?: Prisma.ShiftWhereInput;
    data: Prisma.XOR<Prisma.ShiftUpdateWithoutOrdersInput, Prisma.ShiftUncheckedUpdateWithoutOrdersInput>;
};
export type ShiftUpdateWithoutOrdersInput = {
    shift_id?: Prisma.StringFieldUpdateOperationsInput | string;
    start_cash?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    end_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cash_movements?: Prisma.CashMovementUpdateManyWithoutShiftNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutShiftsNestedInput;
};
export type ShiftUncheckedUpdateWithoutOrdersInput = {
    shift_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    start_cash?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    end_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cash_movements?: Prisma.CashMovementUncheckedUpdateManyWithoutShiftNestedInput;
};
export type ShiftCreateManyUserInput = {
    shift_id?: string;
    start_cash: runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time: Date | string;
    end_time?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type ShiftUpdateWithoutUserInput = {
    shift_id?: Prisma.StringFieldUpdateOperationsInput | string;
    start_cash?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    end_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cash_movements?: Prisma.CashMovementUpdateManyWithoutShiftNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutShiftNestedInput;
};
export type ShiftUncheckedUpdateWithoutUserInput = {
    shift_id?: Prisma.StringFieldUpdateOperationsInput | string;
    start_cash?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    end_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    cash_movements?: Prisma.CashMovementUncheckedUpdateManyWithoutShiftNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutShiftNestedInput;
};
export type ShiftUncheckedUpdateManyWithoutUserInput = {
    shift_id?: Prisma.StringFieldUpdateOperationsInput | string;
    start_cash?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    end_cash?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    sold_total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    start_time?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    end_time?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type ShiftCountOutputType
 */
export type ShiftCountOutputType = {
    cash_movements: number;
    orders: number;
};
export type ShiftCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    cash_movements?: boolean | ShiftCountOutputTypeCountCash_movementsArgs;
    orders?: boolean | ShiftCountOutputTypeCountOrdersArgs;
};
/**
 * ShiftCountOutputType without action
 */
export type ShiftCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShiftCountOutputType
     */
    select?: Prisma.ShiftCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * ShiftCountOutputType without action
 */
export type ShiftCountOutputTypeCountCash_movementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CashMovementWhereInput;
};
/**
 * ShiftCountOutputType without action
 */
export type ShiftCountOutputTypeCountOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderWhereInput;
};
export type ShiftSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    shift_id?: boolean;
    user_id?: boolean;
    start_cash?: boolean;
    end_cash?: boolean;
    sold_total?: boolean;
    start_time?: boolean;
    end_time?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    cash_movements?: boolean | Prisma.Shift$cash_movementsArgs<ExtArgs>;
    orders?: boolean | Prisma.Shift$ordersArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.ShiftCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shift"]>;
export type ShiftSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    shift_id?: boolean;
    user_id?: boolean;
    start_cash?: boolean;
    end_cash?: boolean;
    sold_total?: boolean;
    start_time?: boolean;
    end_time?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shift"]>;
export type ShiftSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    shift_id?: boolean;
    user_id?: boolean;
    start_cash?: boolean;
    end_cash?: boolean;
    sold_total?: boolean;
    start_time?: boolean;
    end_time?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shift"]>;
export type ShiftSelectScalar = {
    shift_id?: boolean;
    user_id?: boolean;
    start_cash?: boolean;
    end_cash?: boolean;
    sold_total?: boolean;
    start_time?: boolean;
    end_time?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
};
export type ShiftOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"shift_id" | "user_id" | "start_cash" | "end_cash" | "sold_total" | "start_time" | "end_time" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["shift"]>;
export type ShiftInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    cash_movements?: boolean | Prisma.Shift$cash_movementsArgs<ExtArgs>;
    orders?: boolean | Prisma.Shift$ordersArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.ShiftCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ShiftIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ShiftIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ShiftPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Shift";
    objects: {
        cash_movements: Prisma.$CashMovementPayload<ExtArgs>[];
        orders: Prisma.$OrderPayload<ExtArgs>[];
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        shift_id: string;
        user_id: string;
        start_cash: runtime.Decimal;
        end_cash: runtime.Decimal | null;
        sold_total: runtime.Decimal | null;
        start_time: Date;
        end_time: Date | null;
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
    }, ExtArgs["result"]["shift"]>;
    composites: {};
};
export type ShiftGetPayload<S extends boolean | null | undefined | ShiftDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ShiftPayload, S>;
export type ShiftCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ShiftFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ShiftCountAggregateInputType | true;
};
export interface ShiftDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Shift'];
        meta: {
            name: 'Shift';
        };
    };
    /**
     * Find zero or one Shift that matches the filter.
     * @param {ShiftFindUniqueArgs} args - Arguments to find a Shift
     * @example
     * // Get one Shift
     * const shift = await prisma.shift.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShiftFindUniqueArgs>(args: Prisma.SelectSubset<T, ShiftFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ShiftClient<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Shift that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShiftFindUniqueOrThrowArgs} args - Arguments to find a Shift
     * @example
     * // Get one Shift
     * const shift = await prisma.shift.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShiftFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ShiftFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShiftClient<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Shift that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftFindFirstArgs} args - Arguments to find a Shift
     * @example
     * // Get one Shift
     * const shift = await prisma.shift.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShiftFindFirstArgs>(args?: Prisma.SelectSubset<T, ShiftFindFirstArgs<ExtArgs>>): Prisma.Prisma__ShiftClient<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Shift that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftFindFirstOrThrowArgs} args - Arguments to find a Shift
     * @example
     * // Get one Shift
     * const shift = await prisma.shift.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShiftFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ShiftFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShiftClient<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Shifts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shifts
     * const shifts = await prisma.shift.findMany()
     *
     * // Get first 10 Shifts
     * const shifts = await prisma.shift.findMany({ take: 10 })
     *
     * // Only select the `shift_id`
     * const shiftWithShift_idOnly = await prisma.shift.findMany({ select: { shift_id: true } })
     *
     */
    findMany<T extends ShiftFindManyArgs>(args?: Prisma.SelectSubset<T, ShiftFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Shift.
     * @param {ShiftCreateArgs} args - Arguments to create a Shift.
     * @example
     * // Create one Shift
     * const Shift = await prisma.shift.create({
     *   data: {
     *     // ... data to create a Shift
     *   }
     * })
     *
     */
    create<T extends ShiftCreateArgs>(args: Prisma.SelectSubset<T, ShiftCreateArgs<ExtArgs>>): Prisma.Prisma__ShiftClient<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Shifts.
     * @param {ShiftCreateManyArgs} args - Arguments to create many Shifts.
     * @example
     * // Create many Shifts
     * const shift = await prisma.shift.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ShiftCreateManyArgs>(args?: Prisma.SelectSubset<T, ShiftCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Shifts and returns the data saved in the database.
     * @param {ShiftCreateManyAndReturnArgs} args - Arguments to create many Shifts.
     * @example
     * // Create many Shifts
     * const shift = await prisma.shift.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Shifts and only return the `shift_id`
     * const shiftWithShift_idOnly = await prisma.shift.createManyAndReturn({
     *   select: { shift_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ShiftCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ShiftCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Shift.
     * @param {ShiftDeleteArgs} args - Arguments to delete one Shift.
     * @example
     * // Delete one Shift
     * const Shift = await prisma.shift.delete({
     *   where: {
     *     // ... filter to delete one Shift
     *   }
     * })
     *
     */
    delete<T extends ShiftDeleteArgs>(args: Prisma.SelectSubset<T, ShiftDeleteArgs<ExtArgs>>): Prisma.Prisma__ShiftClient<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Shift.
     * @param {ShiftUpdateArgs} args - Arguments to update one Shift.
     * @example
     * // Update one Shift
     * const shift = await prisma.shift.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ShiftUpdateArgs>(args: Prisma.SelectSubset<T, ShiftUpdateArgs<ExtArgs>>): Prisma.Prisma__ShiftClient<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Shifts.
     * @param {ShiftDeleteManyArgs} args - Arguments to filter Shifts to delete.
     * @example
     * // Delete a few Shifts
     * const { count } = await prisma.shift.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ShiftDeleteManyArgs>(args?: Prisma.SelectSubset<T, ShiftDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Shifts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shifts
     * const shift = await prisma.shift.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ShiftUpdateManyArgs>(args: Prisma.SelectSubset<T, ShiftUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Shifts and returns the data updated in the database.
     * @param {ShiftUpdateManyAndReturnArgs} args - Arguments to update many Shifts.
     * @example
     * // Update many Shifts
     * const shift = await prisma.shift.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Shifts and only return the `shift_id`
     * const shiftWithShift_idOnly = await prisma.shift.updateManyAndReturn({
     *   select: { shift_id: true },
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
    updateManyAndReturn<T extends ShiftUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ShiftUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Shift.
     * @param {ShiftUpsertArgs} args - Arguments to update or create a Shift.
     * @example
     * // Update or create a Shift
     * const shift = await prisma.shift.upsert({
     *   create: {
     *     // ... data to create a Shift
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shift we want to update
     *   }
     * })
     */
    upsert<T extends ShiftUpsertArgs>(args: Prisma.SelectSubset<T, ShiftUpsertArgs<ExtArgs>>): Prisma.Prisma__ShiftClient<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Shifts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftCountArgs} args - Arguments to filter Shifts to count.
     * @example
     * // Count the number of Shifts
     * const count = await prisma.shift.count({
     *   where: {
     *     // ... the filter for the Shifts we want to count
     *   }
     * })
    **/
    count<T extends ShiftCountArgs>(args?: Prisma.Subset<T, ShiftCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ShiftCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Shift.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ShiftAggregateArgs>(args: Prisma.Subset<T, ShiftAggregateArgs>): Prisma.PrismaPromise<GetShiftAggregateType<T>>;
    /**
     * Group by Shift.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShiftGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ShiftGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ShiftGroupByArgs['orderBy'];
    } : {
        orderBy?: ShiftGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ShiftGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShiftGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Shift model
     */
    readonly fields: ShiftFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Shift.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ShiftClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    cash_movements<T extends Prisma.Shift$cash_movementsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Shift$cash_movementsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CashMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    orders<T extends Prisma.Shift$ordersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Shift$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Shift model
 */
export interface ShiftFieldRefs {
    readonly shift_id: Prisma.FieldRef<"Shift", 'String'>;
    readonly user_id: Prisma.FieldRef<"Shift", 'String'>;
    readonly start_cash: Prisma.FieldRef<"Shift", 'Decimal'>;
    readonly end_cash: Prisma.FieldRef<"Shift", 'Decimal'>;
    readonly sold_total: Prisma.FieldRef<"Shift", 'Decimal'>;
    readonly start_time: Prisma.FieldRef<"Shift", 'DateTime'>;
    readonly end_time: Prisma.FieldRef<"Shift", 'DateTime'>;
    readonly created_at: Prisma.FieldRef<"Shift", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"Shift", 'DateTime'>;
    readonly deleted_at: Prisma.FieldRef<"Shift", 'DateTime'>;
}
/**
 * Shift findUnique
 */
export type ShiftFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: Prisma.ShiftSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Shift
     */
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShiftInclude<ExtArgs> | null;
    /**
     * Filter, which Shift to fetch.
     */
    where: Prisma.ShiftWhereUniqueInput;
};
/**
 * Shift findUniqueOrThrow
 */
export type ShiftFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: Prisma.ShiftSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Shift
     */
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShiftInclude<ExtArgs> | null;
    /**
     * Filter, which Shift to fetch.
     */
    where: Prisma.ShiftWhereUniqueInput;
};
/**
 * Shift findFirst
 */
export type ShiftFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: Prisma.ShiftSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Shift
     */
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShiftInclude<ExtArgs> | null;
    /**
     * Filter, which Shift to fetch.
     */
    where?: Prisma.ShiftWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Shifts to fetch.
     */
    orderBy?: Prisma.ShiftOrderByWithRelationInput | Prisma.ShiftOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Shifts.
     */
    cursor?: Prisma.ShiftWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Shifts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Shifts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Shifts.
     */
    distinct?: Prisma.ShiftScalarFieldEnum | Prisma.ShiftScalarFieldEnum[];
};
/**
 * Shift findFirstOrThrow
 */
export type ShiftFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: Prisma.ShiftSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Shift
     */
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShiftInclude<ExtArgs> | null;
    /**
     * Filter, which Shift to fetch.
     */
    where?: Prisma.ShiftWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Shifts to fetch.
     */
    orderBy?: Prisma.ShiftOrderByWithRelationInput | Prisma.ShiftOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Shifts.
     */
    cursor?: Prisma.ShiftWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Shifts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Shifts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Shifts.
     */
    distinct?: Prisma.ShiftScalarFieldEnum | Prisma.ShiftScalarFieldEnum[];
};
/**
 * Shift findMany
 */
export type ShiftFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: Prisma.ShiftSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Shift
     */
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShiftInclude<ExtArgs> | null;
    /**
     * Filter, which Shifts to fetch.
     */
    where?: Prisma.ShiftWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Shifts to fetch.
     */
    orderBy?: Prisma.ShiftOrderByWithRelationInput | Prisma.ShiftOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Shifts.
     */
    cursor?: Prisma.ShiftWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Shifts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Shifts.
     */
    skip?: number;
    distinct?: Prisma.ShiftScalarFieldEnum | Prisma.ShiftScalarFieldEnum[];
};
/**
 * Shift create
 */
export type ShiftCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: Prisma.ShiftSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Shift
     */
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShiftInclude<ExtArgs> | null;
    /**
     * The data needed to create a Shift.
     */
    data: Prisma.XOR<Prisma.ShiftCreateInput, Prisma.ShiftUncheckedCreateInput>;
};
/**
 * Shift createMany
 */
export type ShiftCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Shifts.
     */
    data: Prisma.ShiftCreateManyInput | Prisma.ShiftCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Shift createManyAndReturn
 */
export type ShiftCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: Prisma.ShiftSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Shift
     */
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    /**
     * The data used to create many Shifts.
     */
    data: Prisma.ShiftCreateManyInput | Prisma.ShiftCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShiftIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Shift update
 */
export type ShiftUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: Prisma.ShiftSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Shift
     */
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShiftInclude<ExtArgs> | null;
    /**
     * The data needed to update a Shift.
     */
    data: Prisma.XOR<Prisma.ShiftUpdateInput, Prisma.ShiftUncheckedUpdateInput>;
    /**
     * Choose, which Shift to update.
     */
    where: Prisma.ShiftWhereUniqueInput;
};
/**
 * Shift updateMany
 */
export type ShiftUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Shifts.
     */
    data: Prisma.XOR<Prisma.ShiftUpdateManyMutationInput, Prisma.ShiftUncheckedUpdateManyInput>;
    /**
     * Filter which Shifts to update
     */
    where?: Prisma.ShiftWhereInput;
    /**
     * Limit how many Shifts to update.
     */
    limit?: number;
};
/**
 * Shift updateManyAndReturn
 */
export type ShiftUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: Prisma.ShiftSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Shift
     */
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    /**
     * The data used to update Shifts.
     */
    data: Prisma.XOR<Prisma.ShiftUpdateManyMutationInput, Prisma.ShiftUncheckedUpdateManyInput>;
    /**
     * Filter which Shifts to update
     */
    where?: Prisma.ShiftWhereInput;
    /**
     * Limit how many Shifts to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShiftIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Shift upsert
 */
export type ShiftUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: Prisma.ShiftSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Shift
     */
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShiftInclude<ExtArgs> | null;
    /**
     * The filter to search for the Shift to update in case it exists.
     */
    where: Prisma.ShiftWhereUniqueInput;
    /**
     * In case the Shift found by the `where` argument doesn't exist, create a new Shift with this data.
     */
    create: Prisma.XOR<Prisma.ShiftCreateInput, Prisma.ShiftUncheckedCreateInput>;
    /**
     * In case the Shift was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ShiftUpdateInput, Prisma.ShiftUncheckedUpdateInput>;
};
/**
 * Shift delete
 */
export type ShiftDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: Prisma.ShiftSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Shift
     */
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShiftInclude<ExtArgs> | null;
    /**
     * Filter which Shift to delete.
     */
    where: Prisma.ShiftWhereUniqueInput;
};
/**
 * Shift deleteMany
 */
export type ShiftDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Shifts to delete
     */
    where?: Prisma.ShiftWhereInput;
    /**
     * Limit how many Shifts to delete.
     */
    limit?: number;
};
/**
 * Shift.cash_movements
 */
export type Shift$cash_movementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CashMovement
     */
    select?: Prisma.CashMovementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CashMovement
     */
    omit?: Prisma.CashMovementOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CashMovementInclude<ExtArgs> | null;
    where?: Prisma.CashMovementWhereInput;
    orderBy?: Prisma.CashMovementOrderByWithRelationInput | Prisma.CashMovementOrderByWithRelationInput[];
    cursor?: Prisma.CashMovementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CashMovementScalarFieldEnum | Prisma.CashMovementScalarFieldEnum[];
};
/**
 * Shift.orders
 */
export type Shift$ordersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: Prisma.OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: Prisma.OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderInclude<ExtArgs> | null;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput | Prisma.OrderOrderByWithRelationInput[];
    cursor?: Prisma.OrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderScalarFieldEnum | Prisma.OrderScalarFieldEnum[];
};
/**
 * Shift without action
 */
export type ShiftDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shift
     */
    select?: Prisma.ShiftSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Shift
     */
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShiftInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Shift.d.ts.map