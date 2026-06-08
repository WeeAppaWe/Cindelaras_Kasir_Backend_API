import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model StockMovement
 *
 */
export type StockMovementModel = runtime.Types.Result.DefaultSelection<Prisma.$StockMovementPayload>;
export type AggregateStockMovement = {
    _count: StockMovementCountAggregateOutputType | null;
    _avg: StockMovementAvgAggregateOutputType | null;
    _sum: StockMovementSumAggregateOutputType | null;
    _min: StockMovementMinAggregateOutputType | null;
    _max: StockMovementMaxAggregateOutputType | null;
};
export type StockMovementAvgAggregateOutputType = {
    qty: runtime.Decimal | null;
    unit_cost: runtime.Decimal | null;
    current_stock: runtime.Decimal | null;
};
export type StockMovementSumAggregateOutputType = {
    qty: runtime.Decimal | null;
    unit_cost: runtime.Decimal | null;
    current_stock: runtime.Decimal | null;
};
export type StockMovementMinAggregateOutputType = {
    stock_movement_id: string | null;
    supplier_id: string | null;
    ingredient_id: string | null;
    user_id: string | null;
    stock_type_id: string | null;
    qty: runtime.Decimal | null;
    unit_cost: runtime.Decimal | null;
    current_stock: runtime.Decimal | null;
    notes: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
export type StockMovementMaxAggregateOutputType = {
    stock_movement_id: string | null;
    supplier_id: string | null;
    ingredient_id: string | null;
    user_id: string | null;
    stock_type_id: string | null;
    qty: runtime.Decimal | null;
    unit_cost: runtime.Decimal | null;
    current_stock: runtime.Decimal | null;
    notes: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
export type StockMovementCountAggregateOutputType = {
    stock_movement_id: number;
    supplier_id: number;
    ingredient_id: number;
    user_id: number;
    stock_type_id: number;
    qty: number;
    unit_cost: number;
    current_stock: number;
    notes: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
};
export type StockMovementAvgAggregateInputType = {
    qty?: true;
    unit_cost?: true;
    current_stock?: true;
};
export type StockMovementSumAggregateInputType = {
    qty?: true;
    unit_cost?: true;
    current_stock?: true;
};
export type StockMovementMinAggregateInputType = {
    stock_movement_id?: true;
    supplier_id?: true;
    ingredient_id?: true;
    user_id?: true;
    stock_type_id?: true;
    qty?: true;
    unit_cost?: true;
    current_stock?: true;
    notes?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
};
export type StockMovementMaxAggregateInputType = {
    stock_movement_id?: true;
    supplier_id?: true;
    ingredient_id?: true;
    user_id?: true;
    stock_type_id?: true;
    qty?: true;
    unit_cost?: true;
    current_stock?: true;
    notes?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
};
export type StockMovementCountAggregateInputType = {
    stock_movement_id?: true;
    supplier_id?: true;
    ingredient_id?: true;
    user_id?: true;
    stock_type_id?: true;
    qty?: true;
    unit_cost?: true;
    current_stock?: true;
    notes?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
};
export type StockMovementAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which StockMovement to aggregate.
     */
    where?: Prisma.StockMovementWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: Prisma.StockMovementOrderByWithRelationInput | Prisma.StockMovementOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.StockMovementWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StockMovements.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned StockMovements
    **/
    _count?: true | StockMovementCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: StockMovementAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: StockMovementSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: StockMovementMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: StockMovementMaxAggregateInputType;
};
export type GetStockMovementAggregateType<T extends StockMovementAggregateArgs> = {
    [P in keyof T & keyof AggregateStockMovement]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStockMovement[P]> : Prisma.GetScalarType<T[P], AggregateStockMovement[P]>;
};
export type StockMovementGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockMovementWhereInput;
    orderBy?: Prisma.StockMovementOrderByWithAggregationInput | Prisma.StockMovementOrderByWithAggregationInput[];
    by: Prisma.StockMovementScalarFieldEnum[] | Prisma.StockMovementScalarFieldEnum;
    having?: Prisma.StockMovementScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StockMovementCountAggregateInputType | true;
    _avg?: StockMovementAvgAggregateInputType;
    _sum?: StockMovementSumAggregateInputType;
    _min?: StockMovementMinAggregateInputType;
    _max?: StockMovementMaxAggregateInputType;
};
export type StockMovementGroupByOutputType = {
    stock_movement_id: string;
    supplier_id: string | null;
    ingredient_id: string;
    user_id: string;
    stock_type_id: string;
    qty: runtime.Decimal;
    unit_cost: runtime.Decimal | null;
    current_stock: runtime.Decimal;
    notes: string | null;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    _count: StockMovementCountAggregateOutputType | null;
    _avg: StockMovementAvgAggregateOutputType | null;
    _sum: StockMovementSumAggregateOutputType | null;
    _min: StockMovementMinAggregateOutputType | null;
    _max: StockMovementMaxAggregateOutputType | null;
};
type GetStockMovementGroupByPayload<T extends StockMovementGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StockMovementGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StockMovementGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StockMovementGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StockMovementGroupByOutputType[P]>;
}>>;
export type StockMovementWhereInput = {
    AND?: Prisma.StockMovementWhereInput | Prisma.StockMovementWhereInput[];
    OR?: Prisma.StockMovementWhereInput[];
    NOT?: Prisma.StockMovementWhereInput | Prisma.StockMovementWhereInput[];
    stock_movement_id?: Prisma.UuidFilter<"StockMovement"> | string;
    supplier_id?: Prisma.UuidNullableFilter<"StockMovement"> | string | null;
    ingredient_id?: Prisma.UuidFilter<"StockMovement"> | string;
    user_id?: Prisma.UuidFilter<"StockMovement"> | string;
    stock_type_id?: Prisma.UuidFilter<"StockMovement"> | string;
    qty?: Prisma.DecimalFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: Prisma.DecimalNullableFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock?: Prisma.DecimalFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    created_at?: Prisma.DateTimeFilter<"StockMovement"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"StockMovement"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"StockMovement"> | Date | string | null;
    ingredient?: Prisma.XOR<Prisma.IngredientScalarRelationFilter, Prisma.IngredientWhereInput>;
    stock_type?: Prisma.XOR<Prisma.StockTypeScalarRelationFilter, Prisma.StockTypeWhereInput>;
    supplier?: Prisma.XOR<Prisma.SupplierNullableScalarRelationFilter, Prisma.SupplierWhereInput> | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type StockMovementOrderByWithRelationInput = {
    stock_movement_id?: Prisma.SortOrder;
    supplier_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    ingredient_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    stock_type_id?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    unit_cost?: Prisma.SortOrderInput | Prisma.SortOrder;
    current_stock?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    ingredient?: Prisma.IngredientOrderByWithRelationInput;
    stock_type?: Prisma.StockTypeOrderByWithRelationInput;
    supplier?: Prisma.SupplierOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type StockMovementWhereUniqueInput = Prisma.AtLeast<{
    stock_movement_id?: string;
    AND?: Prisma.StockMovementWhereInput | Prisma.StockMovementWhereInput[];
    OR?: Prisma.StockMovementWhereInput[];
    NOT?: Prisma.StockMovementWhereInput | Prisma.StockMovementWhereInput[];
    supplier_id?: Prisma.UuidNullableFilter<"StockMovement"> | string | null;
    ingredient_id?: Prisma.UuidFilter<"StockMovement"> | string;
    user_id?: Prisma.UuidFilter<"StockMovement"> | string;
    stock_type_id?: Prisma.UuidFilter<"StockMovement"> | string;
    qty?: Prisma.DecimalFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: Prisma.DecimalNullableFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock?: Prisma.DecimalFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    created_at?: Prisma.DateTimeFilter<"StockMovement"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"StockMovement"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"StockMovement"> | Date | string | null;
    ingredient?: Prisma.XOR<Prisma.IngredientScalarRelationFilter, Prisma.IngredientWhereInput>;
    stock_type?: Prisma.XOR<Prisma.StockTypeScalarRelationFilter, Prisma.StockTypeWhereInput>;
    supplier?: Prisma.XOR<Prisma.SupplierNullableScalarRelationFilter, Prisma.SupplierWhereInput> | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "stock_movement_id">;
export type StockMovementOrderByWithAggregationInput = {
    stock_movement_id?: Prisma.SortOrder;
    supplier_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    ingredient_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    stock_type_id?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    unit_cost?: Prisma.SortOrderInput | Prisma.SortOrder;
    current_stock?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.StockMovementCountOrderByAggregateInput;
    _avg?: Prisma.StockMovementAvgOrderByAggregateInput;
    _max?: Prisma.StockMovementMaxOrderByAggregateInput;
    _min?: Prisma.StockMovementMinOrderByAggregateInput;
    _sum?: Prisma.StockMovementSumOrderByAggregateInput;
};
export type StockMovementScalarWhereWithAggregatesInput = {
    AND?: Prisma.StockMovementScalarWhereWithAggregatesInput | Prisma.StockMovementScalarWhereWithAggregatesInput[];
    OR?: Prisma.StockMovementScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StockMovementScalarWhereWithAggregatesInput | Prisma.StockMovementScalarWhereWithAggregatesInput[];
    stock_movement_id?: Prisma.UuidWithAggregatesFilter<"StockMovement"> | string;
    supplier_id?: Prisma.UuidNullableWithAggregatesFilter<"StockMovement"> | string | null;
    ingredient_id?: Prisma.UuidWithAggregatesFilter<"StockMovement"> | string;
    user_id?: Prisma.UuidWithAggregatesFilter<"StockMovement"> | string;
    stock_type_id?: Prisma.UuidWithAggregatesFilter<"StockMovement"> | string;
    qty?: Prisma.DecimalWithAggregatesFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: Prisma.DecimalNullableWithAggregatesFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock?: Prisma.DecimalWithAggregatesFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableWithAggregatesFilter<"StockMovement"> | string | null;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"StockMovement"> | Date | string;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"StockMovement"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableWithAggregatesFilter<"StockMovement"> | Date | string | null;
};
export type StockMovementCreateInput = {
    stock_movement_id?: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    ingredient: Prisma.IngredientCreateNestedOneWithoutStock_movementsInput;
    stock_type: Prisma.StockTypeCreateNestedOneWithoutStock_movementsInput;
    supplier?: Prisma.SupplierCreateNestedOneWithoutStock_movementsInput;
    user: Prisma.UserCreateNestedOneWithoutStock_movementsInput;
};
export type StockMovementUncheckedCreateInput = {
    stock_movement_id?: string;
    supplier_id?: string | null;
    ingredient_id: string;
    user_id: string;
    stock_type_id: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type StockMovementUpdateInput = {
    stock_movement_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ingredient?: Prisma.IngredientUpdateOneRequiredWithoutStock_movementsNestedInput;
    stock_type?: Prisma.StockTypeUpdateOneRequiredWithoutStock_movementsNestedInput;
    supplier?: Prisma.SupplierUpdateOneWithoutStock_movementsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutStock_movementsNestedInput;
};
export type StockMovementUncheckedUpdateInput = {
    stock_movement_id?: Prisma.StringFieldUpdateOperationsInput | string;
    supplier_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StockMovementCreateManyInput = {
    stock_movement_id?: string;
    supplier_id?: string | null;
    ingredient_id: string;
    user_id: string;
    stock_type_id: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type StockMovementUpdateManyMutationInput = {
    stock_movement_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StockMovementUncheckedUpdateManyInput = {
    stock_movement_id?: Prisma.StringFieldUpdateOperationsInput | string;
    supplier_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StockMovementListRelationFilter = {
    every?: Prisma.StockMovementWhereInput;
    some?: Prisma.StockMovementWhereInput;
    none?: Prisma.StockMovementWhereInput;
};
export type StockMovementOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StockMovementCountOrderByAggregateInput = {
    stock_movement_id?: Prisma.SortOrder;
    supplier_id?: Prisma.SortOrder;
    ingredient_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    stock_type_id?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    unit_cost?: Prisma.SortOrder;
    current_stock?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type StockMovementAvgOrderByAggregateInput = {
    qty?: Prisma.SortOrder;
    unit_cost?: Prisma.SortOrder;
    current_stock?: Prisma.SortOrder;
};
export type StockMovementMaxOrderByAggregateInput = {
    stock_movement_id?: Prisma.SortOrder;
    supplier_id?: Prisma.SortOrder;
    ingredient_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    stock_type_id?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    unit_cost?: Prisma.SortOrder;
    current_stock?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type StockMovementMinOrderByAggregateInput = {
    stock_movement_id?: Prisma.SortOrder;
    supplier_id?: Prisma.SortOrder;
    ingredient_id?: Prisma.SortOrder;
    user_id?: Prisma.SortOrder;
    stock_type_id?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    unit_cost?: Prisma.SortOrder;
    current_stock?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type StockMovementSumOrderByAggregateInput = {
    qty?: Prisma.SortOrder;
    unit_cost?: Prisma.SortOrder;
    current_stock?: Prisma.SortOrder;
};
export type StockMovementCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutUserInput, Prisma.StockMovementUncheckedCreateWithoutUserInput> | Prisma.StockMovementCreateWithoutUserInput[] | Prisma.StockMovementUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutUserInput | Prisma.StockMovementCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.StockMovementCreateManyUserInputEnvelope;
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
};
export type StockMovementUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutUserInput, Prisma.StockMovementUncheckedCreateWithoutUserInput> | Prisma.StockMovementCreateWithoutUserInput[] | Prisma.StockMovementUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutUserInput | Prisma.StockMovementCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.StockMovementCreateManyUserInputEnvelope;
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
};
export type StockMovementUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutUserInput, Prisma.StockMovementUncheckedCreateWithoutUserInput> | Prisma.StockMovementCreateWithoutUserInput[] | Prisma.StockMovementUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutUserInput | Prisma.StockMovementCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.StockMovementUpsertWithWhereUniqueWithoutUserInput | Prisma.StockMovementUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.StockMovementCreateManyUserInputEnvelope;
    set?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    disconnect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    delete?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    update?: Prisma.StockMovementUpdateWithWhereUniqueWithoutUserInput | Prisma.StockMovementUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.StockMovementUpdateManyWithWhereWithoutUserInput | Prisma.StockMovementUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
};
export type StockMovementUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutUserInput, Prisma.StockMovementUncheckedCreateWithoutUserInput> | Prisma.StockMovementCreateWithoutUserInput[] | Prisma.StockMovementUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutUserInput | Prisma.StockMovementCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.StockMovementUpsertWithWhereUniqueWithoutUserInput | Prisma.StockMovementUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.StockMovementCreateManyUserInputEnvelope;
    set?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    disconnect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    delete?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    update?: Prisma.StockMovementUpdateWithWhereUniqueWithoutUserInput | Prisma.StockMovementUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.StockMovementUpdateManyWithWhereWithoutUserInput | Prisma.StockMovementUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
};
export type StockMovementCreateNestedManyWithoutSupplierInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutSupplierInput, Prisma.StockMovementUncheckedCreateWithoutSupplierInput> | Prisma.StockMovementCreateWithoutSupplierInput[] | Prisma.StockMovementUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutSupplierInput | Prisma.StockMovementCreateOrConnectWithoutSupplierInput[];
    createMany?: Prisma.StockMovementCreateManySupplierInputEnvelope;
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
};
export type StockMovementUncheckedCreateNestedManyWithoutSupplierInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutSupplierInput, Prisma.StockMovementUncheckedCreateWithoutSupplierInput> | Prisma.StockMovementCreateWithoutSupplierInput[] | Prisma.StockMovementUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutSupplierInput | Prisma.StockMovementCreateOrConnectWithoutSupplierInput[];
    createMany?: Prisma.StockMovementCreateManySupplierInputEnvelope;
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
};
export type StockMovementUpdateManyWithoutSupplierNestedInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutSupplierInput, Prisma.StockMovementUncheckedCreateWithoutSupplierInput> | Prisma.StockMovementCreateWithoutSupplierInput[] | Prisma.StockMovementUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutSupplierInput | Prisma.StockMovementCreateOrConnectWithoutSupplierInput[];
    upsert?: Prisma.StockMovementUpsertWithWhereUniqueWithoutSupplierInput | Prisma.StockMovementUpsertWithWhereUniqueWithoutSupplierInput[];
    createMany?: Prisma.StockMovementCreateManySupplierInputEnvelope;
    set?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    disconnect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    delete?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    update?: Prisma.StockMovementUpdateWithWhereUniqueWithoutSupplierInput | Prisma.StockMovementUpdateWithWhereUniqueWithoutSupplierInput[];
    updateMany?: Prisma.StockMovementUpdateManyWithWhereWithoutSupplierInput | Prisma.StockMovementUpdateManyWithWhereWithoutSupplierInput[];
    deleteMany?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
};
export type StockMovementUncheckedUpdateManyWithoutSupplierNestedInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutSupplierInput, Prisma.StockMovementUncheckedCreateWithoutSupplierInput> | Prisma.StockMovementCreateWithoutSupplierInput[] | Prisma.StockMovementUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutSupplierInput | Prisma.StockMovementCreateOrConnectWithoutSupplierInput[];
    upsert?: Prisma.StockMovementUpsertWithWhereUniqueWithoutSupplierInput | Prisma.StockMovementUpsertWithWhereUniqueWithoutSupplierInput[];
    createMany?: Prisma.StockMovementCreateManySupplierInputEnvelope;
    set?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    disconnect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    delete?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    update?: Prisma.StockMovementUpdateWithWhereUniqueWithoutSupplierInput | Prisma.StockMovementUpdateWithWhereUniqueWithoutSupplierInput[];
    updateMany?: Prisma.StockMovementUpdateManyWithWhereWithoutSupplierInput | Prisma.StockMovementUpdateManyWithWhereWithoutSupplierInput[];
    deleteMany?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
};
export type StockMovementCreateNestedManyWithoutIngredientInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutIngredientInput, Prisma.StockMovementUncheckedCreateWithoutIngredientInput> | Prisma.StockMovementCreateWithoutIngredientInput[] | Prisma.StockMovementUncheckedCreateWithoutIngredientInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutIngredientInput | Prisma.StockMovementCreateOrConnectWithoutIngredientInput[];
    createMany?: Prisma.StockMovementCreateManyIngredientInputEnvelope;
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
};
export type StockMovementUncheckedCreateNestedManyWithoutIngredientInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutIngredientInput, Prisma.StockMovementUncheckedCreateWithoutIngredientInput> | Prisma.StockMovementCreateWithoutIngredientInput[] | Prisma.StockMovementUncheckedCreateWithoutIngredientInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutIngredientInput | Prisma.StockMovementCreateOrConnectWithoutIngredientInput[];
    createMany?: Prisma.StockMovementCreateManyIngredientInputEnvelope;
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
};
export type StockMovementUpdateManyWithoutIngredientNestedInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutIngredientInput, Prisma.StockMovementUncheckedCreateWithoutIngredientInput> | Prisma.StockMovementCreateWithoutIngredientInput[] | Prisma.StockMovementUncheckedCreateWithoutIngredientInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutIngredientInput | Prisma.StockMovementCreateOrConnectWithoutIngredientInput[];
    upsert?: Prisma.StockMovementUpsertWithWhereUniqueWithoutIngredientInput | Prisma.StockMovementUpsertWithWhereUniqueWithoutIngredientInput[];
    createMany?: Prisma.StockMovementCreateManyIngredientInputEnvelope;
    set?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    disconnect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    delete?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    update?: Prisma.StockMovementUpdateWithWhereUniqueWithoutIngredientInput | Prisma.StockMovementUpdateWithWhereUniqueWithoutIngredientInput[];
    updateMany?: Prisma.StockMovementUpdateManyWithWhereWithoutIngredientInput | Prisma.StockMovementUpdateManyWithWhereWithoutIngredientInput[];
    deleteMany?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
};
export type StockMovementUncheckedUpdateManyWithoutIngredientNestedInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutIngredientInput, Prisma.StockMovementUncheckedCreateWithoutIngredientInput> | Prisma.StockMovementCreateWithoutIngredientInput[] | Prisma.StockMovementUncheckedCreateWithoutIngredientInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutIngredientInput | Prisma.StockMovementCreateOrConnectWithoutIngredientInput[];
    upsert?: Prisma.StockMovementUpsertWithWhereUniqueWithoutIngredientInput | Prisma.StockMovementUpsertWithWhereUniqueWithoutIngredientInput[];
    createMany?: Prisma.StockMovementCreateManyIngredientInputEnvelope;
    set?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    disconnect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    delete?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    update?: Prisma.StockMovementUpdateWithWhereUniqueWithoutIngredientInput | Prisma.StockMovementUpdateWithWhereUniqueWithoutIngredientInput[];
    updateMany?: Prisma.StockMovementUpdateManyWithWhereWithoutIngredientInput | Prisma.StockMovementUpdateManyWithWhereWithoutIngredientInput[];
    deleteMany?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
};
export type StockMovementCreateNestedManyWithoutStock_typeInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutStock_typeInput, Prisma.StockMovementUncheckedCreateWithoutStock_typeInput> | Prisma.StockMovementCreateWithoutStock_typeInput[] | Prisma.StockMovementUncheckedCreateWithoutStock_typeInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutStock_typeInput | Prisma.StockMovementCreateOrConnectWithoutStock_typeInput[];
    createMany?: Prisma.StockMovementCreateManyStock_typeInputEnvelope;
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
};
export type StockMovementUncheckedCreateNestedManyWithoutStock_typeInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutStock_typeInput, Prisma.StockMovementUncheckedCreateWithoutStock_typeInput> | Prisma.StockMovementCreateWithoutStock_typeInput[] | Prisma.StockMovementUncheckedCreateWithoutStock_typeInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutStock_typeInput | Prisma.StockMovementCreateOrConnectWithoutStock_typeInput[];
    createMany?: Prisma.StockMovementCreateManyStock_typeInputEnvelope;
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
};
export type StockMovementUpdateManyWithoutStock_typeNestedInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutStock_typeInput, Prisma.StockMovementUncheckedCreateWithoutStock_typeInput> | Prisma.StockMovementCreateWithoutStock_typeInput[] | Prisma.StockMovementUncheckedCreateWithoutStock_typeInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutStock_typeInput | Prisma.StockMovementCreateOrConnectWithoutStock_typeInput[];
    upsert?: Prisma.StockMovementUpsertWithWhereUniqueWithoutStock_typeInput | Prisma.StockMovementUpsertWithWhereUniqueWithoutStock_typeInput[];
    createMany?: Prisma.StockMovementCreateManyStock_typeInputEnvelope;
    set?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    disconnect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    delete?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    update?: Prisma.StockMovementUpdateWithWhereUniqueWithoutStock_typeInput | Prisma.StockMovementUpdateWithWhereUniqueWithoutStock_typeInput[];
    updateMany?: Prisma.StockMovementUpdateManyWithWhereWithoutStock_typeInput | Prisma.StockMovementUpdateManyWithWhereWithoutStock_typeInput[];
    deleteMany?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
};
export type StockMovementUncheckedUpdateManyWithoutStock_typeNestedInput = {
    create?: Prisma.XOR<Prisma.StockMovementCreateWithoutStock_typeInput, Prisma.StockMovementUncheckedCreateWithoutStock_typeInput> | Prisma.StockMovementCreateWithoutStock_typeInput[] | Prisma.StockMovementUncheckedCreateWithoutStock_typeInput[];
    connectOrCreate?: Prisma.StockMovementCreateOrConnectWithoutStock_typeInput | Prisma.StockMovementCreateOrConnectWithoutStock_typeInput[];
    upsert?: Prisma.StockMovementUpsertWithWhereUniqueWithoutStock_typeInput | Prisma.StockMovementUpsertWithWhereUniqueWithoutStock_typeInput[];
    createMany?: Prisma.StockMovementCreateManyStock_typeInputEnvelope;
    set?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    disconnect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    delete?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    connect?: Prisma.StockMovementWhereUniqueInput | Prisma.StockMovementWhereUniqueInput[];
    update?: Prisma.StockMovementUpdateWithWhereUniqueWithoutStock_typeInput | Prisma.StockMovementUpdateWithWhereUniqueWithoutStock_typeInput[];
    updateMany?: Prisma.StockMovementUpdateManyWithWhereWithoutStock_typeInput | Prisma.StockMovementUpdateManyWithWhereWithoutStock_typeInput[];
    deleteMany?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type StockMovementCreateWithoutUserInput = {
    stock_movement_id?: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    ingredient: Prisma.IngredientCreateNestedOneWithoutStock_movementsInput;
    stock_type: Prisma.StockTypeCreateNestedOneWithoutStock_movementsInput;
    supplier?: Prisma.SupplierCreateNestedOneWithoutStock_movementsInput;
};
export type StockMovementUncheckedCreateWithoutUserInput = {
    stock_movement_id?: string;
    supplier_id?: string | null;
    ingredient_id: string;
    stock_type_id: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type StockMovementCreateOrConnectWithoutUserInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockMovementCreateWithoutUserInput, Prisma.StockMovementUncheckedCreateWithoutUserInput>;
};
export type StockMovementCreateManyUserInputEnvelope = {
    data: Prisma.StockMovementCreateManyUserInput | Prisma.StockMovementCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type StockMovementUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    update: Prisma.XOR<Prisma.StockMovementUpdateWithoutUserInput, Prisma.StockMovementUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.StockMovementCreateWithoutUserInput, Prisma.StockMovementUncheckedCreateWithoutUserInput>;
};
export type StockMovementUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    data: Prisma.XOR<Prisma.StockMovementUpdateWithoutUserInput, Prisma.StockMovementUncheckedUpdateWithoutUserInput>;
};
export type StockMovementUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.StockMovementScalarWhereInput;
    data: Prisma.XOR<Prisma.StockMovementUpdateManyMutationInput, Prisma.StockMovementUncheckedUpdateManyWithoutUserInput>;
};
export type StockMovementScalarWhereInput = {
    AND?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
    OR?: Prisma.StockMovementScalarWhereInput[];
    NOT?: Prisma.StockMovementScalarWhereInput | Prisma.StockMovementScalarWhereInput[];
    stock_movement_id?: Prisma.UuidFilter<"StockMovement"> | string;
    supplier_id?: Prisma.UuidNullableFilter<"StockMovement"> | string | null;
    ingredient_id?: Prisma.UuidFilter<"StockMovement"> | string;
    user_id?: Prisma.UuidFilter<"StockMovement"> | string;
    stock_type_id?: Prisma.UuidFilter<"StockMovement"> | string;
    qty?: Prisma.DecimalFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: Prisma.DecimalNullableFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock?: Prisma.DecimalFilter<"StockMovement"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableFilter<"StockMovement"> | string | null;
    created_at?: Prisma.DateTimeFilter<"StockMovement"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"StockMovement"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"StockMovement"> | Date | string | null;
};
export type StockMovementCreateWithoutSupplierInput = {
    stock_movement_id?: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    ingredient: Prisma.IngredientCreateNestedOneWithoutStock_movementsInput;
    stock_type: Prisma.StockTypeCreateNestedOneWithoutStock_movementsInput;
    user: Prisma.UserCreateNestedOneWithoutStock_movementsInput;
};
export type StockMovementUncheckedCreateWithoutSupplierInput = {
    stock_movement_id?: string;
    ingredient_id: string;
    user_id: string;
    stock_type_id: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type StockMovementCreateOrConnectWithoutSupplierInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockMovementCreateWithoutSupplierInput, Prisma.StockMovementUncheckedCreateWithoutSupplierInput>;
};
export type StockMovementCreateManySupplierInputEnvelope = {
    data: Prisma.StockMovementCreateManySupplierInput | Prisma.StockMovementCreateManySupplierInput[];
    skipDuplicates?: boolean;
};
export type StockMovementUpsertWithWhereUniqueWithoutSupplierInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    update: Prisma.XOR<Prisma.StockMovementUpdateWithoutSupplierInput, Prisma.StockMovementUncheckedUpdateWithoutSupplierInput>;
    create: Prisma.XOR<Prisma.StockMovementCreateWithoutSupplierInput, Prisma.StockMovementUncheckedCreateWithoutSupplierInput>;
};
export type StockMovementUpdateWithWhereUniqueWithoutSupplierInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    data: Prisma.XOR<Prisma.StockMovementUpdateWithoutSupplierInput, Prisma.StockMovementUncheckedUpdateWithoutSupplierInput>;
};
export type StockMovementUpdateManyWithWhereWithoutSupplierInput = {
    where: Prisma.StockMovementScalarWhereInput;
    data: Prisma.XOR<Prisma.StockMovementUpdateManyMutationInput, Prisma.StockMovementUncheckedUpdateManyWithoutSupplierInput>;
};
export type StockMovementCreateWithoutIngredientInput = {
    stock_movement_id?: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    stock_type: Prisma.StockTypeCreateNestedOneWithoutStock_movementsInput;
    supplier?: Prisma.SupplierCreateNestedOneWithoutStock_movementsInput;
    user: Prisma.UserCreateNestedOneWithoutStock_movementsInput;
};
export type StockMovementUncheckedCreateWithoutIngredientInput = {
    stock_movement_id?: string;
    supplier_id?: string | null;
    user_id: string;
    stock_type_id: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type StockMovementCreateOrConnectWithoutIngredientInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockMovementCreateWithoutIngredientInput, Prisma.StockMovementUncheckedCreateWithoutIngredientInput>;
};
export type StockMovementCreateManyIngredientInputEnvelope = {
    data: Prisma.StockMovementCreateManyIngredientInput | Prisma.StockMovementCreateManyIngredientInput[];
    skipDuplicates?: boolean;
};
export type StockMovementUpsertWithWhereUniqueWithoutIngredientInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    update: Prisma.XOR<Prisma.StockMovementUpdateWithoutIngredientInput, Prisma.StockMovementUncheckedUpdateWithoutIngredientInput>;
    create: Prisma.XOR<Prisma.StockMovementCreateWithoutIngredientInput, Prisma.StockMovementUncheckedCreateWithoutIngredientInput>;
};
export type StockMovementUpdateWithWhereUniqueWithoutIngredientInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    data: Prisma.XOR<Prisma.StockMovementUpdateWithoutIngredientInput, Prisma.StockMovementUncheckedUpdateWithoutIngredientInput>;
};
export type StockMovementUpdateManyWithWhereWithoutIngredientInput = {
    where: Prisma.StockMovementScalarWhereInput;
    data: Prisma.XOR<Prisma.StockMovementUpdateManyMutationInput, Prisma.StockMovementUncheckedUpdateManyWithoutIngredientInput>;
};
export type StockMovementCreateWithoutStock_typeInput = {
    stock_movement_id?: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    ingredient: Prisma.IngredientCreateNestedOneWithoutStock_movementsInput;
    supplier?: Prisma.SupplierCreateNestedOneWithoutStock_movementsInput;
    user: Prisma.UserCreateNestedOneWithoutStock_movementsInput;
};
export type StockMovementUncheckedCreateWithoutStock_typeInput = {
    stock_movement_id?: string;
    supplier_id?: string | null;
    ingredient_id: string;
    user_id: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type StockMovementCreateOrConnectWithoutStock_typeInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockMovementCreateWithoutStock_typeInput, Prisma.StockMovementUncheckedCreateWithoutStock_typeInput>;
};
export type StockMovementCreateManyStock_typeInputEnvelope = {
    data: Prisma.StockMovementCreateManyStock_typeInput | Prisma.StockMovementCreateManyStock_typeInput[];
    skipDuplicates?: boolean;
};
export type StockMovementUpsertWithWhereUniqueWithoutStock_typeInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    update: Prisma.XOR<Prisma.StockMovementUpdateWithoutStock_typeInput, Prisma.StockMovementUncheckedUpdateWithoutStock_typeInput>;
    create: Prisma.XOR<Prisma.StockMovementCreateWithoutStock_typeInput, Prisma.StockMovementUncheckedCreateWithoutStock_typeInput>;
};
export type StockMovementUpdateWithWhereUniqueWithoutStock_typeInput = {
    where: Prisma.StockMovementWhereUniqueInput;
    data: Prisma.XOR<Prisma.StockMovementUpdateWithoutStock_typeInput, Prisma.StockMovementUncheckedUpdateWithoutStock_typeInput>;
};
export type StockMovementUpdateManyWithWhereWithoutStock_typeInput = {
    where: Prisma.StockMovementScalarWhereInput;
    data: Prisma.XOR<Prisma.StockMovementUpdateManyMutationInput, Prisma.StockMovementUncheckedUpdateManyWithoutStock_typeInput>;
};
export type StockMovementCreateManyUserInput = {
    stock_movement_id?: string;
    supplier_id?: string | null;
    ingredient_id: string;
    stock_type_id: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type StockMovementUpdateWithoutUserInput = {
    stock_movement_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ingredient?: Prisma.IngredientUpdateOneRequiredWithoutStock_movementsNestedInput;
    stock_type?: Prisma.StockTypeUpdateOneRequiredWithoutStock_movementsNestedInput;
    supplier?: Prisma.SupplierUpdateOneWithoutStock_movementsNestedInput;
};
export type StockMovementUncheckedUpdateWithoutUserInput = {
    stock_movement_id?: Prisma.StringFieldUpdateOperationsInput | string;
    supplier_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StockMovementUncheckedUpdateManyWithoutUserInput = {
    stock_movement_id?: Prisma.StringFieldUpdateOperationsInput | string;
    supplier_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StockMovementCreateManySupplierInput = {
    stock_movement_id?: string;
    ingredient_id: string;
    user_id: string;
    stock_type_id: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type StockMovementUpdateWithoutSupplierInput = {
    stock_movement_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ingredient?: Prisma.IngredientUpdateOneRequiredWithoutStock_movementsNestedInput;
    stock_type?: Prisma.StockTypeUpdateOneRequiredWithoutStock_movementsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutStock_movementsNestedInput;
};
export type StockMovementUncheckedUpdateWithoutSupplierInput = {
    stock_movement_id?: Prisma.StringFieldUpdateOperationsInput | string;
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StockMovementUncheckedUpdateManyWithoutSupplierInput = {
    stock_movement_id?: Prisma.StringFieldUpdateOperationsInput | string;
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StockMovementCreateManyIngredientInput = {
    stock_movement_id?: string;
    supplier_id?: string | null;
    user_id: string;
    stock_type_id: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type StockMovementUpdateWithoutIngredientInput = {
    stock_movement_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    stock_type?: Prisma.StockTypeUpdateOneRequiredWithoutStock_movementsNestedInput;
    supplier?: Prisma.SupplierUpdateOneWithoutStock_movementsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutStock_movementsNestedInput;
};
export type StockMovementUncheckedUpdateWithoutIngredientInput = {
    stock_movement_id?: Prisma.StringFieldUpdateOperationsInput | string;
    supplier_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StockMovementUncheckedUpdateManyWithoutIngredientInput = {
    stock_movement_id?: Prisma.StringFieldUpdateOperationsInput | string;
    supplier_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_type_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StockMovementCreateManyStock_typeInput = {
    stock_movement_id?: string;
    supplier_id?: string | null;
    ingredient_id: string;
    user_id: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type StockMovementUpdateWithoutStock_typeInput = {
    stock_movement_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ingredient?: Prisma.IngredientUpdateOneRequiredWithoutStock_movementsNestedInput;
    supplier?: Prisma.SupplierUpdateOneWithoutStock_movementsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutStock_movementsNestedInput;
};
export type StockMovementUncheckedUpdateWithoutStock_typeInput = {
    stock_movement_id?: Prisma.StringFieldUpdateOperationsInput | string;
    supplier_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StockMovementUncheckedUpdateManyWithoutStock_typeInput = {
    stock_movement_id?: Prisma.StringFieldUpdateOperationsInput | string;
    supplier_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    unit_cost?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    current_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StockMovementSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    stock_movement_id?: boolean;
    supplier_id?: boolean;
    ingredient_id?: boolean;
    user_id?: boolean;
    stock_type_id?: boolean;
    qty?: boolean;
    unit_cost?: boolean;
    current_stock?: boolean;
    notes?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
    stock_type?: boolean | Prisma.StockTypeDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.StockMovement$supplierArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["stockMovement"]>;
export type StockMovementSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    stock_movement_id?: boolean;
    supplier_id?: boolean;
    ingredient_id?: boolean;
    user_id?: boolean;
    stock_type_id?: boolean;
    qty?: boolean;
    unit_cost?: boolean;
    current_stock?: boolean;
    notes?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
    stock_type?: boolean | Prisma.StockTypeDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.StockMovement$supplierArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["stockMovement"]>;
export type StockMovementSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    stock_movement_id?: boolean;
    supplier_id?: boolean;
    ingredient_id?: boolean;
    user_id?: boolean;
    stock_type_id?: boolean;
    qty?: boolean;
    unit_cost?: boolean;
    current_stock?: boolean;
    notes?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
    stock_type?: boolean | Prisma.StockTypeDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.StockMovement$supplierArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["stockMovement"]>;
export type StockMovementSelectScalar = {
    stock_movement_id?: boolean;
    supplier_id?: boolean;
    ingredient_id?: boolean;
    user_id?: boolean;
    stock_type_id?: boolean;
    qty?: boolean;
    unit_cost?: boolean;
    current_stock?: boolean;
    notes?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
};
export type StockMovementOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"stock_movement_id" | "supplier_id" | "ingredient_id" | "user_id" | "stock_type_id" | "qty" | "unit_cost" | "current_stock" | "notes" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["stockMovement"]>;
export type StockMovementInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
    stock_type?: boolean | Prisma.StockTypeDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.StockMovement$supplierArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type StockMovementIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
    stock_type?: boolean | Prisma.StockTypeDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.StockMovement$supplierArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type StockMovementIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
    stock_type?: boolean | Prisma.StockTypeDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.StockMovement$supplierArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $StockMovementPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StockMovement";
    objects: {
        ingredient: Prisma.$IngredientPayload<ExtArgs>;
        stock_type: Prisma.$StockTypePayload<ExtArgs>;
        supplier: Prisma.$SupplierPayload<ExtArgs> | null;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        stock_movement_id: string;
        supplier_id: string | null;
        ingredient_id: string;
        user_id: string;
        stock_type_id: string;
        qty: runtime.Decimal;
        unit_cost: runtime.Decimal | null;
        current_stock: runtime.Decimal;
        notes: string | null;
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
    }, ExtArgs["result"]["stockMovement"]>;
    composites: {};
};
export type StockMovementGetPayload<S extends boolean | null | undefined | StockMovementDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StockMovementPayload, S>;
export type StockMovementCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StockMovementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StockMovementCountAggregateInputType | true;
};
export interface StockMovementDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['StockMovement'];
        meta: {
            name: 'StockMovement';
        };
    };
    /**
     * Find zero or one StockMovement that matches the filter.
     * @param {StockMovementFindUniqueArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockMovementFindUniqueArgs>(args: Prisma.SelectSubset<T, StockMovementFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one StockMovement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockMovementFindUniqueOrThrowArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockMovementFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StockMovementFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first StockMovement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementFindFirstArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockMovementFindFirstArgs>(args?: Prisma.SelectSubset<T, StockMovementFindFirstArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first StockMovement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementFindFirstOrThrowArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockMovementFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StockMovementFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more StockMovements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StockMovements
     * const stockMovements = await prisma.stockMovement.findMany()
     *
     * // Get first 10 StockMovements
     * const stockMovements = await prisma.stockMovement.findMany({ take: 10 })
     *
     * // Only select the `stock_movement_id`
     * const stockMovementWithStock_movement_idOnly = await prisma.stockMovement.findMany({ select: { stock_movement_id: true } })
     *
     */
    findMany<T extends StockMovementFindManyArgs>(args?: Prisma.SelectSubset<T, StockMovementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a StockMovement.
     * @param {StockMovementCreateArgs} args - Arguments to create a StockMovement.
     * @example
     * // Create one StockMovement
     * const StockMovement = await prisma.stockMovement.create({
     *   data: {
     *     // ... data to create a StockMovement
     *   }
     * })
     *
     */
    create<T extends StockMovementCreateArgs>(args: Prisma.SelectSubset<T, StockMovementCreateArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many StockMovements.
     * @param {StockMovementCreateManyArgs} args - Arguments to create many StockMovements.
     * @example
     * // Create many StockMovements
     * const stockMovement = await prisma.stockMovement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends StockMovementCreateManyArgs>(args?: Prisma.SelectSubset<T, StockMovementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many StockMovements and returns the data saved in the database.
     * @param {StockMovementCreateManyAndReturnArgs} args - Arguments to create many StockMovements.
     * @example
     * // Create many StockMovements
     * const stockMovement = await prisma.stockMovement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many StockMovements and only return the `stock_movement_id`
     * const stockMovementWithStock_movement_idOnly = await prisma.stockMovement.createManyAndReturn({
     *   select: { stock_movement_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends StockMovementCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StockMovementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a StockMovement.
     * @param {StockMovementDeleteArgs} args - Arguments to delete one StockMovement.
     * @example
     * // Delete one StockMovement
     * const StockMovement = await prisma.stockMovement.delete({
     *   where: {
     *     // ... filter to delete one StockMovement
     *   }
     * })
     *
     */
    delete<T extends StockMovementDeleteArgs>(args: Prisma.SelectSubset<T, StockMovementDeleteArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one StockMovement.
     * @param {StockMovementUpdateArgs} args - Arguments to update one StockMovement.
     * @example
     * // Update one StockMovement
     * const stockMovement = await prisma.stockMovement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends StockMovementUpdateArgs>(args: Prisma.SelectSubset<T, StockMovementUpdateArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more StockMovements.
     * @param {StockMovementDeleteManyArgs} args - Arguments to filter StockMovements to delete.
     * @example
     * // Delete a few StockMovements
     * const { count } = await prisma.stockMovement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends StockMovementDeleteManyArgs>(args?: Prisma.SelectSubset<T, StockMovementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more StockMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StockMovements
     * const stockMovement = await prisma.stockMovement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends StockMovementUpdateManyArgs>(args: Prisma.SelectSubset<T, StockMovementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more StockMovements and returns the data updated in the database.
     * @param {StockMovementUpdateManyAndReturnArgs} args - Arguments to update many StockMovements.
     * @example
     * // Update many StockMovements
     * const stockMovement = await prisma.stockMovement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more StockMovements and only return the `stock_movement_id`
     * const stockMovementWithStock_movement_idOnly = await prisma.stockMovement.updateManyAndReturn({
     *   select: { stock_movement_id: true },
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
    updateManyAndReturn<T extends StockMovementUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StockMovementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one StockMovement.
     * @param {StockMovementUpsertArgs} args - Arguments to update or create a StockMovement.
     * @example
     * // Update or create a StockMovement
     * const stockMovement = await prisma.stockMovement.upsert({
     *   create: {
     *     // ... data to create a StockMovement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StockMovement we want to update
     *   }
     * })
     */
    upsert<T extends StockMovementUpsertArgs>(args: Prisma.SelectSubset<T, StockMovementUpsertArgs<ExtArgs>>): Prisma.Prisma__StockMovementClient<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of StockMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementCountArgs} args - Arguments to filter StockMovements to count.
     * @example
     * // Count the number of StockMovements
     * const count = await prisma.stockMovement.count({
     *   where: {
     *     // ... the filter for the StockMovements we want to count
     *   }
     * })
    **/
    count<T extends StockMovementCountArgs>(args?: Prisma.Subset<T, StockMovementCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StockMovementCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a StockMovement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StockMovementAggregateArgs>(args: Prisma.Subset<T, StockMovementAggregateArgs>): Prisma.PrismaPromise<GetStockMovementAggregateType<T>>;
    /**
     * Group by StockMovement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementGroupByArgs} args - Group by arguments.
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
    groupBy<T extends StockMovementGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StockMovementGroupByArgs['orderBy'];
    } : {
        orderBy?: StockMovementGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StockMovementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockMovementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the StockMovement model
     */
    readonly fields: StockMovementFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for StockMovement.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__StockMovementClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    ingredient<T extends Prisma.IngredientDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.IngredientDefaultArgs<ExtArgs>>): Prisma.Prisma__IngredientClient<runtime.Types.Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    stock_type<T extends Prisma.StockTypeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StockTypeDefaultArgs<ExtArgs>>): Prisma.Prisma__StockTypeClient<runtime.Types.Result.GetResult<Prisma.$StockTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    supplier<T extends Prisma.StockMovement$supplierArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StockMovement$supplierArgs<ExtArgs>>): Prisma.Prisma__SupplierClient<runtime.Types.Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the StockMovement model
 */
export interface StockMovementFieldRefs {
    readonly stock_movement_id: Prisma.FieldRef<"StockMovement", 'String'>;
    readonly supplier_id: Prisma.FieldRef<"StockMovement", 'String'>;
    readonly ingredient_id: Prisma.FieldRef<"StockMovement", 'String'>;
    readonly user_id: Prisma.FieldRef<"StockMovement", 'String'>;
    readonly stock_type_id: Prisma.FieldRef<"StockMovement", 'String'>;
    readonly qty: Prisma.FieldRef<"StockMovement", 'Decimal'>;
    readonly unit_cost: Prisma.FieldRef<"StockMovement", 'Decimal'>;
    readonly current_stock: Prisma.FieldRef<"StockMovement", 'Decimal'>;
    readonly notes: Prisma.FieldRef<"StockMovement", 'String'>;
    readonly created_at: Prisma.FieldRef<"StockMovement", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"StockMovement", 'DateTime'>;
    readonly deleted_at: Prisma.FieldRef<"StockMovement", 'DateTime'>;
}
/**
 * StockMovement findUnique
 */
export type StockMovementFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which StockMovement to fetch.
     */
    where: Prisma.StockMovementWhereUniqueInput;
};
/**
 * StockMovement findUniqueOrThrow
 */
export type StockMovementFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which StockMovement to fetch.
     */
    where: Prisma.StockMovementWhereUniqueInput;
};
/**
 * StockMovement findFirst
 */
export type StockMovementFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which StockMovement to fetch.
     */
    where?: Prisma.StockMovementWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: Prisma.StockMovementOrderByWithRelationInput | Prisma.StockMovementOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for StockMovements.
     */
    cursor?: Prisma.StockMovementWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StockMovements.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StockMovements.
     */
    distinct?: Prisma.StockMovementScalarFieldEnum | Prisma.StockMovementScalarFieldEnum[];
};
/**
 * StockMovement findFirstOrThrow
 */
export type StockMovementFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which StockMovement to fetch.
     */
    where?: Prisma.StockMovementWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: Prisma.StockMovementOrderByWithRelationInput | Prisma.StockMovementOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for StockMovements.
     */
    cursor?: Prisma.StockMovementWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StockMovements.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StockMovements.
     */
    distinct?: Prisma.StockMovementScalarFieldEnum | Prisma.StockMovementScalarFieldEnum[];
};
/**
 * StockMovement findMany
 */
export type StockMovementFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which StockMovements to fetch.
     */
    where?: Prisma.StockMovementWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: Prisma.StockMovementOrderByWithRelationInput | Prisma.StockMovementOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing StockMovements.
     */
    cursor?: Prisma.StockMovementWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StockMovements.
     */
    skip?: number;
    distinct?: Prisma.StockMovementScalarFieldEnum | Prisma.StockMovementScalarFieldEnum[];
};
/**
 * StockMovement create
 */
export type StockMovementCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a StockMovement.
     */
    data: Prisma.XOR<Prisma.StockMovementCreateInput, Prisma.StockMovementUncheckedCreateInput>;
};
/**
 * StockMovement createMany
 */
export type StockMovementCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many StockMovements.
     */
    data: Prisma.StockMovementCreateManyInput | Prisma.StockMovementCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * StockMovement createManyAndReturn
 */
export type StockMovementCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: Prisma.StockMovementSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: Prisma.StockMovementOmit<ExtArgs> | null;
    /**
     * The data used to create many StockMovements.
     */
    data: Prisma.StockMovementCreateManyInput | Prisma.StockMovementCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockMovementIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * StockMovement update
 */
export type StockMovementUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a StockMovement.
     */
    data: Prisma.XOR<Prisma.StockMovementUpdateInput, Prisma.StockMovementUncheckedUpdateInput>;
    /**
     * Choose, which StockMovement to update.
     */
    where: Prisma.StockMovementWhereUniqueInput;
};
/**
 * StockMovement updateMany
 */
export type StockMovementUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update StockMovements.
     */
    data: Prisma.XOR<Prisma.StockMovementUpdateManyMutationInput, Prisma.StockMovementUncheckedUpdateManyInput>;
    /**
     * Filter which StockMovements to update
     */
    where?: Prisma.StockMovementWhereInput;
    /**
     * Limit how many StockMovements to update.
     */
    limit?: number;
};
/**
 * StockMovement updateManyAndReturn
 */
export type StockMovementUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: Prisma.StockMovementSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the StockMovement
     */
    omit?: Prisma.StockMovementOmit<ExtArgs> | null;
    /**
     * The data used to update StockMovements.
     */
    data: Prisma.XOR<Prisma.StockMovementUpdateManyMutationInput, Prisma.StockMovementUncheckedUpdateManyInput>;
    /**
     * Filter which StockMovements to update
     */
    where?: Prisma.StockMovementWhereInput;
    /**
     * Limit how many StockMovements to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockMovementIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * StockMovement upsert
 */
export type StockMovementUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the StockMovement to update in case it exists.
     */
    where: Prisma.StockMovementWhereUniqueInput;
    /**
     * In case the StockMovement found by the `where` argument doesn't exist, create a new StockMovement with this data.
     */
    create: Prisma.XOR<Prisma.StockMovementCreateInput, Prisma.StockMovementUncheckedCreateInput>;
    /**
     * In case the StockMovement was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.StockMovementUpdateInput, Prisma.StockMovementUncheckedUpdateInput>;
};
/**
 * StockMovement delete
 */
export type StockMovementDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which StockMovement to delete.
     */
    where: Prisma.StockMovementWhereUniqueInput;
};
/**
 * StockMovement deleteMany
 */
export type StockMovementDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which StockMovements to delete
     */
    where?: Prisma.StockMovementWhereInput;
    /**
     * Limit how many StockMovements to delete.
     */
    limit?: number;
};
/**
 * StockMovement.supplier
 */
export type StockMovement$supplierArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: Prisma.SupplierSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Supplier
     */
    omit?: Prisma.SupplierOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SupplierInclude<ExtArgs> | null;
    where?: Prisma.SupplierWhereInput;
};
/**
 * StockMovement without action
 */
export type StockMovementDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=StockMovement.d.ts.map