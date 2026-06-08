import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model IngredientComposition
 *
 */
export type IngredientCompositionModel = runtime.Types.Result.DefaultSelection<Prisma.$IngredientCompositionPayload>;
export type AggregateIngredientComposition = {
    _count: IngredientCompositionCountAggregateOutputType | null;
    _avg: IngredientCompositionAvgAggregateOutputType | null;
    _sum: IngredientCompositionSumAggregateOutputType | null;
    _min: IngredientCompositionMinAggregateOutputType | null;
    _max: IngredientCompositionMaxAggregateOutputType | null;
};
export type IngredientCompositionAvgAggregateOutputType = {
    qty_needed: runtime.Decimal | null;
};
export type IngredientCompositionSumAggregateOutputType = {
    qty_needed: runtime.Decimal | null;
};
export type IngredientCompositionMinAggregateOutputType = {
    ingredient_composition_id: string | null;
    parent_id: string | null;
    child_id: string | null;
    qty_needed: runtime.Decimal | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
export type IngredientCompositionMaxAggregateOutputType = {
    ingredient_composition_id: string | null;
    parent_id: string | null;
    child_id: string | null;
    qty_needed: runtime.Decimal | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
export type IngredientCompositionCountAggregateOutputType = {
    ingredient_composition_id: number;
    parent_id: number;
    child_id: number;
    qty_needed: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
};
export type IngredientCompositionAvgAggregateInputType = {
    qty_needed?: true;
};
export type IngredientCompositionSumAggregateInputType = {
    qty_needed?: true;
};
export type IngredientCompositionMinAggregateInputType = {
    ingredient_composition_id?: true;
    parent_id?: true;
    child_id?: true;
    qty_needed?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
};
export type IngredientCompositionMaxAggregateInputType = {
    ingredient_composition_id?: true;
    parent_id?: true;
    child_id?: true;
    qty_needed?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
};
export type IngredientCompositionCountAggregateInputType = {
    ingredient_composition_id?: true;
    parent_id?: true;
    child_id?: true;
    qty_needed?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
};
export type IngredientCompositionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which IngredientComposition to aggregate.
     */
    where?: Prisma.IngredientCompositionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of IngredientCompositions to fetch.
     */
    orderBy?: Prisma.IngredientCompositionOrderByWithRelationInput | Prisma.IngredientCompositionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.IngredientCompositionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` IngredientCompositions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` IngredientCompositions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned IngredientCompositions
    **/
    _count?: true | IngredientCompositionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: IngredientCompositionAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: IngredientCompositionSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: IngredientCompositionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: IngredientCompositionMaxAggregateInputType;
};
export type GetIngredientCompositionAggregateType<T extends IngredientCompositionAggregateArgs> = {
    [P in keyof T & keyof AggregateIngredientComposition]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIngredientComposition[P]> : Prisma.GetScalarType<T[P], AggregateIngredientComposition[P]>;
};
export type IngredientCompositionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IngredientCompositionWhereInput;
    orderBy?: Prisma.IngredientCompositionOrderByWithAggregationInput | Prisma.IngredientCompositionOrderByWithAggregationInput[];
    by: Prisma.IngredientCompositionScalarFieldEnum[] | Prisma.IngredientCompositionScalarFieldEnum;
    having?: Prisma.IngredientCompositionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IngredientCompositionCountAggregateInputType | true;
    _avg?: IngredientCompositionAvgAggregateInputType;
    _sum?: IngredientCompositionSumAggregateInputType;
    _min?: IngredientCompositionMinAggregateInputType;
    _max?: IngredientCompositionMaxAggregateInputType;
};
export type IngredientCompositionGroupByOutputType = {
    ingredient_composition_id: string;
    parent_id: string;
    child_id: string;
    qty_needed: runtime.Decimal;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    _count: IngredientCompositionCountAggregateOutputType | null;
    _avg: IngredientCompositionAvgAggregateOutputType | null;
    _sum: IngredientCompositionSumAggregateOutputType | null;
    _min: IngredientCompositionMinAggregateOutputType | null;
    _max: IngredientCompositionMaxAggregateOutputType | null;
};
type GetIngredientCompositionGroupByPayload<T extends IngredientCompositionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IngredientCompositionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IngredientCompositionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IngredientCompositionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IngredientCompositionGroupByOutputType[P]>;
}>>;
export type IngredientCompositionWhereInput = {
    AND?: Prisma.IngredientCompositionWhereInput | Prisma.IngredientCompositionWhereInput[];
    OR?: Prisma.IngredientCompositionWhereInput[];
    NOT?: Prisma.IngredientCompositionWhereInput | Prisma.IngredientCompositionWhereInput[];
    ingredient_composition_id?: Prisma.UuidFilter<"IngredientComposition"> | string;
    parent_id?: Prisma.UuidFilter<"IngredientComposition"> | string;
    child_id?: Prisma.UuidFilter<"IngredientComposition"> | string;
    qty_needed?: Prisma.DecimalFilter<"IngredientComposition"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFilter<"IngredientComposition"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"IngredientComposition"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"IngredientComposition"> | Date | string | null;
    child_ingredient?: Prisma.XOR<Prisma.IngredientScalarRelationFilter, Prisma.IngredientWhereInput>;
    parent_ingredient?: Prisma.XOR<Prisma.IngredientScalarRelationFilter, Prisma.IngredientWhereInput>;
};
export type IngredientCompositionOrderByWithRelationInput = {
    ingredient_composition_id?: Prisma.SortOrder;
    parent_id?: Prisma.SortOrder;
    child_id?: Prisma.SortOrder;
    qty_needed?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    child_ingredient?: Prisma.IngredientOrderByWithRelationInput;
    parent_ingredient?: Prisma.IngredientOrderByWithRelationInput;
};
export type IngredientCompositionWhereUniqueInput = Prisma.AtLeast<{
    ingredient_composition_id?: string;
    parent_id_child_id?: Prisma.IngredientCompositionParent_idChild_idCompoundUniqueInput;
    AND?: Prisma.IngredientCompositionWhereInput | Prisma.IngredientCompositionWhereInput[];
    OR?: Prisma.IngredientCompositionWhereInput[];
    NOT?: Prisma.IngredientCompositionWhereInput | Prisma.IngredientCompositionWhereInput[];
    parent_id?: Prisma.UuidFilter<"IngredientComposition"> | string;
    child_id?: Prisma.UuidFilter<"IngredientComposition"> | string;
    qty_needed?: Prisma.DecimalFilter<"IngredientComposition"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFilter<"IngredientComposition"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"IngredientComposition"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"IngredientComposition"> | Date | string | null;
    child_ingredient?: Prisma.XOR<Prisma.IngredientScalarRelationFilter, Prisma.IngredientWhereInput>;
    parent_ingredient?: Prisma.XOR<Prisma.IngredientScalarRelationFilter, Prisma.IngredientWhereInput>;
}, "ingredient_composition_id" | "parent_id_child_id">;
export type IngredientCompositionOrderByWithAggregationInput = {
    ingredient_composition_id?: Prisma.SortOrder;
    parent_id?: Prisma.SortOrder;
    child_id?: Prisma.SortOrder;
    qty_needed?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.IngredientCompositionCountOrderByAggregateInput;
    _avg?: Prisma.IngredientCompositionAvgOrderByAggregateInput;
    _max?: Prisma.IngredientCompositionMaxOrderByAggregateInput;
    _min?: Prisma.IngredientCompositionMinOrderByAggregateInput;
    _sum?: Prisma.IngredientCompositionSumOrderByAggregateInput;
};
export type IngredientCompositionScalarWhereWithAggregatesInput = {
    AND?: Prisma.IngredientCompositionScalarWhereWithAggregatesInput | Prisma.IngredientCompositionScalarWhereWithAggregatesInput[];
    OR?: Prisma.IngredientCompositionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.IngredientCompositionScalarWhereWithAggregatesInput | Prisma.IngredientCompositionScalarWhereWithAggregatesInput[];
    ingredient_composition_id?: Prisma.UuidWithAggregatesFilter<"IngredientComposition"> | string;
    parent_id?: Prisma.UuidWithAggregatesFilter<"IngredientComposition"> | string;
    child_id?: Prisma.UuidWithAggregatesFilter<"IngredientComposition"> | string;
    qty_needed?: Prisma.DecimalWithAggregatesFilter<"IngredientComposition"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"IngredientComposition"> | Date | string;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"IngredientComposition"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableWithAggregatesFilter<"IngredientComposition"> | Date | string | null;
};
export type IngredientCompositionCreateInput = {
    ingredient_composition_id?: string;
    qty_needed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    child_ingredient: Prisma.IngredientCreateNestedOneWithoutChild_compositionsInput;
    parent_ingredient: Prisma.IngredientCreateNestedOneWithoutParent_compositionsInput;
};
export type IngredientCompositionUncheckedCreateInput = {
    ingredient_composition_id?: string;
    parent_id: string;
    child_id: string;
    qty_needed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type IngredientCompositionUpdateInput = {
    ingredient_composition_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty_needed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    child_ingredient?: Prisma.IngredientUpdateOneRequiredWithoutChild_compositionsNestedInput;
    parent_ingredient?: Prisma.IngredientUpdateOneRequiredWithoutParent_compositionsNestedInput;
};
export type IngredientCompositionUncheckedUpdateInput = {
    ingredient_composition_id?: Prisma.StringFieldUpdateOperationsInput | string;
    parent_id?: Prisma.StringFieldUpdateOperationsInput | string;
    child_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty_needed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IngredientCompositionCreateManyInput = {
    ingredient_composition_id?: string;
    parent_id: string;
    child_id: string;
    qty_needed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type IngredientCompositionUpdateManyMutationInput = {
    ingredient_composition_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty_needed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IngredientCompositionUncheckedUpdateManyInput = {
    ingredient_composition_id?: Prisma.StringFieldUpdateOperationsInput | string;
    parent_id?: Prisma.StringFieldUpdateOperationsInput | string;
    child_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty_needed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IngredientCompositionListRelationFilter = {
    every?: Prisma.IngredientCompositionWhereInput;
    some?: Prisma.IngredientCompositionWhereInput;
    none?: Prisma.IngredientCompositionWhereInput;
};
export type IngredientCompositionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type IngredientCompositionParent_idChild_idCompoundUniqueInput = {
    parent_id: string;
    child_id: string;
};
export type IngredientCompositionCountOrderByAggregateInput = {
    ingredient_composition_id?: Prisma.SortOrder;
    parent_id?: Prisma.SortOrder;
    child_id?: Prisma.SortOrder;
    qty_needed?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type IngredientCompositionAvgOrderByAggregateInput = {
    qty_needed?: Prisma.SortOrder;
};
export type IngredientCompositionMaxOrderByAggregateInput = {
    ingredient_composition_id?: Prisma.SortOrder;
    parent_id?: Prisma.SortOrder;
    child_id?: Prisma.SortOrder;
    qty_needed?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type IngredientCompositionMinOrderByAggregateInput = {
    ingredient_composition_id?: Prisma.SortOrder;
    parent_id?: Prisma.SortOrder;
    child_id?: Prisma.SortOrder;
    qty_needed?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type IngredientCompositionSumOrderByAggregateInput = {
    qty_needed?: Prisma.SortOrder;
};
export type IngredientCompositionCreateNestedManyWithoutChild_ingredientInput = {
    create?: Prisma.XOR<Prisma.IngredientCompositionCreateWithoutChild_ingredientInput, Prisma.IngredientCompositionUncheckedCreateWithoutChild_ingredientInput> | Prisma.IngredientCompositionCreateWithoutChild_ingredientInput[] | Prisma.IngredientCompositionUncheckedCreateWithoutChild_ingredientInput[];
    connectOrCreate?: Prisma.IngredientCompositionCreateOrConnectWithoutChild_ingredientInput | Prisma.IngredientCompositionCreateOrConnectWithoutChild_ingredientInput[];
    createMany?: Prisma.IngredientCompositionCreateManyChild_ingredientInputEnvelope;
    connect?: Prisma.IngredientCompositionWhereUniqueInput | Prisma.IngredientCompositionWhereUniqueInput[];
};
export type IngredientCompositionCreateNestedManyWithoutParent_ingredientInput = {
    create?: Prisma.XOR<Prisma.IngredientCompositionCreateWithoutParent_ingredientInput, Prisma.IngredientCompositionUncheckedCreateWithoutParent_ingredientInput> | Prisma.IngredientCompositionCreateWithoutParent_ingredientInput[] | Prisma.IngredientCompositionUncheckedCreateWithoutParent_ingredientInput[];
    connectOrCreate?: Prisma.IngredientCompositionCreateOrConnectWithoutParent_ingredientInput | Prisma.IngredientCompositionCreateOrConnectWithoutParent_ingredientInput[];
    createMany?: Prisma.IngredientCompositionCreateManyParent_ingredientInputEnvelope;
    connect?: Prisma.IngredientCompositionWhereUniqueInput | Prisma.IngredientCompositionWhereUniqueInput[];
};
export type IngredientCompositionUncheckedCreateNestedManyWithoutChild_ingredientInput = {
    create?: Prisma.XOR<Prisma.IngredientCompositionCreateWithoutChild_ingredientInput, Prisma.IngredientCompositionUncheckedCreateWithoutChild_ingredientInput> | Prisma.IngredientCompositionCreateWithoutChild_ingredientInput[] | Prisma.IngredientCompositionUncheckedCreateWithoutChild_ingredientInput[];
    connectOrCreate?: Prisma.IngredientCompositionCreateOrConnectWithoutChild_ingredientInput | Prisma.IngredientCompositionCreateOrConnectWithoutChild_ingredientInput[];
    createMany?: Prisma.IngredientCompositionCreateManyChild_ingredientInputEnvelope;
    connect?: Prisma.IngredientCompositionWhereUniqueInput | Prisma.IngredientCompositionWhereUniqueInput[];
};
export type IngredientCompositionUncheckedCreateNestedManyWithoutParent_ingredientInput = {
    create?: Prisma.XOR<Prisma.IngredientCompositionCreateWithoutParent_ingredientInput, Prisma.IngredientCompositionUncheckedCreateWithoutParent_ingredientInput> | Prisma.IngredientCompositionCreateWithoutParent_ingredientInput[] | Prisma.IngredientCompositionUncheckedCreateWithoutParent_ingredientInput[];
    connectOrCreate?: Prisma.IngredientCompositionCreateOrConnectWithoutParent_ingredientInput | Prisma.IngredientCompositionCreateOrConnectWithoutParent_ingredientInput[];
    createMany?: Prisma.IngredientCompositionCreateManyParent_ingredientInputEnvelope;
    connect?: Prisma.IngredientCompositionWhereUniqueInput | Prisma.IngredientCompositionWhereUniqueInput[];
};
export type IngredientCompositionUpdateManyWithoutChild_ingredientNestedInput = {
    create?: Prisma.XOR<Prisma.IngredientCompositionCreateWithoutChild_ingredientInput, Prisma.IngredientCompositionUncheckedCreateWithoutChild_ingredientInput> | Prisma.IngredientCompositionCreateWithoutChild_ingredientInput[] | Prisma.IngredientCompositionUncheckedCreateWithoutChild_ingredientInput[];
    connectOrCreate?: Prisma.IngredientCompositionCreateOrConnectWithoutChild_ingredientInput | Prisma.IngredientCompositionCreateOrConnectWithoutChild_ingredientInput[];
    upsert?: Prisma.IngredientCompositionUpsertWithWhereUniqueWithoutChild_ingredientInput | Prisma.IngredientCompositionUpsertWithWhereUniqueWithoutChild_ingredientInput[];
    createMany?: Prisma.IngredientCompositionCreateManyChild_ingredientInputEnvelope;
    set?: Prisma.IngredientCompositionWhereUniqueInput | Prisma.IngredientCompositionWhereUniqueInput[];
    disconnect?: Prisma.IngredientCompositionWhereUniqueInput | Prisma.IngredientCompositionWhereUniqueInput[];
    delete?: Prisma.IngredientCompositionWhereUniqueInput | Prisma.IngredientCompositionWhereUniqueInput[];
    connect?: Prisma.IngredientCompositionWhereUniqueInput | Prisma.IngredientCompositionWhereUniqueInput[];
    update?: Prisma.IngredientCompositionUpdateWithWhereUniqueWithoutChild_ingredientInput | Prisma.IngredientCompositionUpdateWithWhereUniqueWithoutChild_ingredientInput[];
    updateMany?: Prisma.IngredientCompositionUpdateManyWithWhereWithoutChild_ingredientInput | Prisma.IngredientCompositionUpdateManyWithWhereWithoutChild_ingredientInput[];
    deleteMany?: Prisma.IngredientCompositionScalarWhereInput | Prisma.IngredientCompositionScalarWhereInput[];
};
export type IngredientCompositionUpdateManyWithoutParent_ingredientNestedInput = {
    create?: Prisma.XOR<Prisma.IngredientCompositionCreateWithoutParent_ingredientInput, Prisma.IngredientCompositionUncheckedCreateWithoutParent_ingredientInput> | Prisma.IngredientCompositionCreateWithoutParent_ingredientInput[] | Prisma.IngredientCompositionUncheckedCreateWithoutParent_ingredientInput[];
    connectOrCreate?: Prisma.IngredientCompositionCreateOrConnectWithoutParent_ingredientInput | Prisma.IngredientCompositionCreateOrConnectWithoutParent_ingredientInput[];
    upsert?: Prisma.IngredientCompositionUpsertWithWhereUniqueWithoutParent_ingredientInput | Prisma.IngredientCompositionUpsertWithWhereUniqueWithoutParent_ingredientInput[];
    createMany?: Prisma.IngredientCompositionCreateManyParent_ingredientInputEnvelope;
    set?: Prisma.IngredientCompositionWhereUniqueInput | Prisma.IngredientCompositionWhereUniqueInput[];
    disconnect?: Prisma.IngredientCompositionWhereUniqueInput | Prisma.IngredientCompositionWhereUniqueInput[];
    delete?: Prisma.IngredientCompositionWhereUniqueInput | Prisma.IngredientCompositionWhereUniqueInput[];
    connect?: Prisma.IngredientCompositionWhereUniqueInput | Prisma.IngredientCompositionWhereUniqueInput[];
    update?: Prisma.IngredientCompositionUpdateWithWhereUniqueWithoutParent_ingredientInput | Prisma.IngredientCompositionUpdateWithWhereUniqueWithoutParent_ingredientInput[];
    updateMany?: Prisma.IngredientCompositionUpdateManyWithWhereWithoutParent_ingredientInput | Prisma.IngredientCompositionUpdateManyWithWhereWithoutParent_ingredientInput[];
    deleteMany?: Prisma.IngredientCompositionScalarWhereInput | Prisma.IngredientCompositionScalarWhereInput[];
};
export type IngredientCompositionUncheckedUpdateManyWithoutChild_ingredientNestedInput = {
    create?: Prisma.XOR<Prisma.IngredientCompositionCreateWithoutChild_ingredientInput, Prisma.IngredientCompositionUncheckedCreateWithoutChild_ingredientInput> | Prisma.IngredientCompositionCreateWithoutChild_ingredientInput[] | Prisma.IngredientCompositionUncheckedCreateWithoutChild_ingredientInput[];
    connectOrCreate?: Prisma.IngredientCompositionCreateOrConnectWithoutChild_ingredientInput | Prisma.IngredientCompositionCreateOrConnectWithoutChild_ingredientInput[];
    upsert?: Prisma.IngredientCompositionUpsertWithWhereUniqueWithoutChild_ingredientInput | Prisma.IngredientCompositionUpsertWithWhereUniqueWithoutChild_ingredientInput[];
    createMany?: Prisma.IngredientCompositionCreateManyChild_ingredientInputEnvelope;
    set?: Prisma.IngredientCompositionWhereUniqueInput | Prisma.IngredientCompositionWhereUniqueInput[];
    disconnect?: Prisma.IngredientCompositionWhereUniqueInput | Prisma.IngredientCompositionWhereUniqueInput[];
    delete?: Prisma.IngredientCompositionWhereUniqueInput | Prisma.IngredientCompositionWhereUniqueInput[];
    connect?: Prisma.IngredientCompositionWhereUniqueInput | Prisma.IngredientCompositionWhereUniqueInput[];
    update?: Prisma.IngredientCompositionUpdateWithWhereUniqueWithoutChild_ingredientInput | Prisma.IngredientCompositionUpdateWithWhereUniqueWithoutChild_ingredientInput[];
    updateMany?: Prisma.IngredientCompositionUpdateManyWithWhereWithoutChild_ingredientInput | Prisma.IngredientCompositionUpdateManyWithWhereWithoutChild_ingredientInput[];
    deleteMany?: Prisma.IngredientCompositionScalarWhereInput | Prisma.IngredientCompositionScalarWhereInput[];
};
export type IngredientCompositionUncheckedUpdateManyWithoutParent_ingredientNestedInput = {
    create?: Prisma.XOR<Prisma.IngredientCompositionCreateWithoutParent_ingredientInput, Prisma.IngredientCompositionUncheckedCreateWithoutParent_ingredientInput> | Prisma.IngredientCompositionCreateWithoutParent_ingredientInput[] | Prisma.IngredientCompositionUncheckedCreateWithoutParent_ingredientInput[];
    connectOrCreate?: Prisma.IngredientCompositionCreateOrConnectWithoutParent_ingredientInput | Prisma.IngredientCompositionCreateOrConnectWithoutParent_ingredientInput[];
    upsert?: Prisma.IngredientCompositionUpsertWithWhereUniqueWithoutParent_ingredientInput | Prisma.IngredientCompositionUpsertWithWhereUniqueWithoutParent_ingredientInput[];
    createMany?: Prisma.IngredientCompositionCreateManyParent_ingredientInputEnvelope;
    set?: Prisma.IngredientCompositionWhereUniqueInput | Prisma.IngredientCompositionWhereUniqueInput[];
    disconnect?: Prisma.IngredientCompositionWhereUniqueInput | Prisma.IngredientCompositionWhereUniqueInput[];
    delete?: Prisma.IngredientCompositionWhereUniqueInput | Prisma.IngredientCompositionWhereUniqueInput[];
    connect?: Prisma.IngredientCompositionWhereUniqueInput | Prisma.IngredientCompositionWhereUniqueInput[];
    update?: Prisma.IngredientCompositionUpdateWithWhereUniqueWithoutParent_ingredientInput | Prisma.IngredientCompositionUpdateWithWhereUniqueWithoutParent_ingredientInput[];
    updateMany?: Prisma.IngredientCompositionUpdateManyWithWhereWithoutParent_ingredientInput | Prisma.IngredientCompositionUpdateManyWithWhereWithoutParent_ingredientInput[];
    deleteMany?: Prisma.IngredientCompositionScalarWhereInput | Prisma.IngredientCompositionScalarWhereInput[];
};
export type IngredientCompositionCreateWithoutChild_ingredientInput = {
    ingredient_composition_id?: string;
    qty_needed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    parent_ingredient: Prisma.IngredientCreateNestedOneWithoutParent_compositionsInput;
};
export type IngredientCompositionUncheckedCreateWithoutChild_ingredientInput = {
    ingredient_composition_id?: string;
    parent_id: string;
    qty_needed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type IngredientCompositionCreateOrConnectWithoutChild_ingredientInput = {
    where: Prisma.IngredientCompositionWhereUniqueInput;
    create: Prisma.XOR<Prisma.IngredientCompositionCreateWithoutChild_ingredientInput, Prisma.IngredientCompositionUncheckedCreateWithoutChild_ingredientInput>;
};
export type IngredientCompositionCreateManyChild_ingredientInputEnvelope = {
    data: Prisma.IngredientCompositionCreateManyChild_ingredientInput | Prisma.IngredientCompositionCreateManyChild_ingredientInput[];
    skipDuplicates?: boolean;
};
export type IngredientCompositionCreateWithoutParent_ingredientInput = {
    ingredient_composition_id?: string;
    qty_needed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    child_ingredient: Prisma.IngredientCreateNestedOneWithoutChild_compositionsInput;
};
export type IngredientCompositionUncheckedCreateWithoutParent_ingredientInput = {
    ingredient_composition_id?: string;
    child_id: string;
    qty_needed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type IngredientCompositionCreateOrConnectWithoutParent_ingredientInput = {
    where: Prisma.IngredientCompositionWhereUniqueInput;
    create: Prisma.XOR<Prisma.IngredientCompositionCreateWithoutParent_ingredientInput, Prisma.IngredientCompositionUncheckedCreateWithoutParent_ingredientInput>;
};
export type IngredientCompositionCreateManyParent_ingredientInputEnvelope = {
    data: Prisma.IngredientCompositionCreateManyParent_ingredientInput | Prisma.IngredientCompositionCreateManyParent_ingredientInput[];
    skipDuplicates?: boolean;
};
export type IngredientCompositionUpsertWithWhereUniqueWithoutChild_ingredientInput = {
    where: Prisma.IngredientCompositionWhereUniqueInput;
    update: Prisma.XOR<Prisma.IngredientCompositionUpdateWithoutChild_ingredientInput, Prisma.IngredientCompositionUncheckedUpdateWithoutChild_ingredientInput>;
    create: Prisma.XOR<Prisma.IngredientCompositionCreateWithoutChild_ingredientInput, Prisma.IngredientCompositionUncheckedCreateWithoutChild_ingredientInput>;
};
export type IngredientCompositionUpdateWithWhereUniqueWithoutChild_ingredientInput = {
    where: Prisma.IngredientCompositionWhereUniqueInput;
    data: Prisma.XOR<Prisma.IngredientCompositionUpdateWithoutChild_ingredientInput, Prisma.IngredientCompositionUncheckedUpdateWithoutChild_ingredientInput>;
};
export type IngredientCompositionUpdateManyWithWhereWithoutChild_ingredientInput = {
    where: Prisma.IngredientCompositionScalarWhereInput;
    data: Prisma.XOR<Prisma.IngredientCompositionUpdateManyMutationInput, Prisma.IngredientCompositionUncheckedUpdateManyWithoutChild_ingredientInput>;
};
export type IngredientCompositionScalarWhereInput = {
    AND?: Prisma.IngredientCompositionScalarWhereInput | Prisma.IngredientCompositionScalarWhereInput[];
    OR?: Prisma.IngredientCompositionScalarWhereInput[];
    NOT?: Prisma.IngredientCompositionScalarWhereInput | Prisma.IngredientCompositionScalarWhereInput[];
    ingredient_composition_id?: Prisma.UuidFilter<"IngredientComposition"> | string;
    parent_id?: Prisma.UuidFilter<"IngredientComposition"> | string;
    child_id?: Prisma.UuidFilter<"IngredientComposition"> | string;
    qty_needed?: Prisma.DecimalFilter<"IngredientComposition"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFilter<"IngredientComposition"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"IngredientComposition"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"IngredientComposition"> | Date | string | null;
};
export type IngredientCompositionUpsertWithWhereUniqueWithoutParent_ingredientInput = {
    where: Prisma.IngredientCompositionWhereUniqueInput;
    update: Prisma.XOR<Prisma.IngredientCompositionUpdateWithoutParent_ingredientInput, Prisma.IngredientCompositionUncheckedUpdateWithoutParent_ingredientInput>;
    create: Prisma.XOR<Prisma.IngredientCompositionCreateWithoutParent_ingredientInput, Prisma.IngredientCompositionUncheckedCreateWithoutParent_ingredientInput>;
};
export type IngredientCompositionUpdateWithWhereUniqueWithoutParent_ingredientInput = {
    where: Prisma.IngredientCompositionWhereUniqueInput;
    data: Prisma.XOR<Prisma.IngredientCompositionUpdateWithoutParent_ingredientInput, Prisma.IngredientCompositionUncheckedUpdateWithoutParent_ingredientInput>;
};
export type IngredientCompositionUpdateManyWithWhereWithoutParent_ingredientInput = {
    where: Prisma.IngredientCompositionScalarWhereInput;
    data: Prisma.XOR<Prisma.IngredientCompositionUpdateManyMutationInput, Prisma.IngredientCompositionUncheckedUpdateManyWithoutParent_ingredientInput>;
};
export type IngredientCompositionCreateManyChild_ingredientInput = {
    ingredient_composition_id?: string;
    parent_id: string;
    qty_needed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type IngredientCompositionCreateManyParent_ingredientInput = {
    ingredient_composition_id?: string;
    child_id: string;
    qty_needed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type IngredientCompositionUpdateWithoutChild_ingredientInput = {
    ingredient_composition_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty_needed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    parent_ingredient?: Prisma.IngredientUpdateOneRequiredWithoutParent_compositionsNestedInput;
};
export type IngredientCompositionUncheckedUpdateWithoutChild_ingredientInput = {
    ingredient_composition_id?: Prisma.StringFieldUpdateOperationsInput | string;
    parent_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty_needed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IngredientCompositionUncheckedUpdateManyWithoutChild_ingredientInput = {
    ingredient_composition_id?: Prisma.StringFieldUpdateOperationsInput | string;
    parent_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty_needed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IngredientCompositionUpdateWithoutParent_ingredientInput = {
    ingredient_composition_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty_needed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    child_ingredient?: Prisma.IngredientUpdateOneRequiredWithoutChild_compositionsNestedInput;
};
export type IngredientCompositionUncheckedUpdateWithoutParent_ingredientInput = {
    ingredient_composition_id?: Prisma.StringFieldUpdateOperationsInput | string;
    child_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty_needed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IngredientCompositionUncheckedUpdateManyWithoutParent_ingredientInput = {
    ingredient_composition_id?: Prisma.StringFieldUpdateOperationsInput | string;
    child_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty_needed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IngredientCompositionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ingredient_composition_id?: boolean;
    parent_id?: boolean;
    child_id?: boolean;
    qty_needed?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    child_ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
    parent_ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ingredientComposition"]>;
export type IngredientCompositionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ingredient_composition_id?: boolean;
    parent_id?: boolean;
    child_id?: boolean;
    qty_needed?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    child_ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
    parent_ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ingredientComposition"]>;
export type IngredientCompositionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ingredient_composition_id?: boolean;
    parent_id?: boolean;
    child_id?: boolean;
    qty_needed?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    child_ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
    parent_ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ingredientComposition"]>;
export type IngredientCompositionSelectScalar = {
    ingredient_composition_id?: boolean;
    parent_id?: boolean;
    child_id?: boolean;
    qty_needed?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
};
export type IngredientCompositionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"ingredient_composition_id" | "parent_id" | "child_id" | "qty_needed" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["ingredientComposition"]>;
export type IngredientCompositionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    child_ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
    parent_ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
};
export type IngredientCompositionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    child_ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
    parent_ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
};
export type IngredientCompositionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    child_ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
    parent_ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
};
export type $IngredientCompositionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "IngredientComposition";
    objects: {
        child_ingredient: Prisma.$IngredientPayload<ExtArgs>;
        parent_ingredient: Prisma.$IngredientPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        ingredient_composition_id: string;
        parent_id: string;
        child_id: string;
        qty_needed: runtime.Decimal;
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
    }, ExtArgs["result"]["ingredientComposition"]>;
    composites: {};
};
export type IngredientCompositionGetPayload<S extends boolean | null | undefined | IngredientCompositionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$IngredientCompositionPayload, S>;
export type IngredientCompositionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<IngredientCompositionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IngredientCompositionCountAggregateInputType | true;
};
export interface IngredientCompositionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['IngredientComposition'];
        meta: {
            name: 'IngredientComposition';
        };
    };
    /**
     * Find zero or one IngredientComposition that matches the filter.
     * @param {IngredientCompositionFindUniqueArgs} args - Arguments to find a IngredientComposition
     * @example
     * // Get one IngredientComposition
     * const ingredientComposition = await prisma.ingredientComposition.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IngredientCompositionFindUniqueArgs>(args: Prisma.SelectSubset<T, IngredientCompositionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__IngredientCompositionClient<runtime.Types.Result.GetResult<Prisma.$IngredientCompositionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one IngredientComposition that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IngredientCompositionFindUniqueOrThrowArgs} args - Arguments to find a IngredientComposition
     * @example
     * // Get one IngredientComposition
     * const ingredientComposition = await prisma.ingredientComposition.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IngredientCompositionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, IngredientCompositionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__IngredientCompositionClient<runtime.Types.Result.GetResult<Prisma.$IngredientCompositionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first IngredientComposition that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientCompositionFindFirstArgs} args - Arguments to find a IngredientComposition
     * @example
     * // Get one IngredientComposition
     * const ingredientComposition = await prisma.ingredientComposition.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IngredientCompositionFindFirstArgs>(args?: Prisma.SelectSubset<T, IngredientCompositionFindFirstArgs<ExtArgs>>): Prisma.Prisma__IngredientCompositionClient<runtime.Types.Result.GetResult<Prisma.$IngredientCompositionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first IngredientComposition that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientCompositionFindFirstOrThrowArgs} args - Arguments to find a IngredientComposition
     * @example
     * // Get one IngredientComposition
     * const ingredientComposition = await prisma.ingredientComposition.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IngredientCompositionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, IngredientCompositionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__IngredientCompositionClient<runtime.Types.Result.GetResult<Prisma.$IngredientCompositionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more IngredientCompositions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientCompositionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IngredientCompositions
     * const ingredientCompositions = await prisma.ingredientComposition.findMany()
     *
     * // Get first 10 IngredientCompositions
     * const ingredientCompositions = await prisma.ingredientComposition.findMany({ take: 10 })
     *
     * // Only select the `ingredient_composition_id`
     * const ingredientCompositionWithIngredient_composition_idOnly = await prisma.ingredientComposition.findMany({ select: { ingredient_composition_id: true } })
     *
     */
    findMany<T extends IngredientCompositionFindManyArgs>(args?: Prisma.SelectSubset<T, IngredientCompositionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IngredientCompositionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a IngredientComposition.
     * @param {IngredientCompositionCreateArgs} args - Arguments to create a IngredientComposition.
     * @example
     * // Create one IngredientComposition
     * const IngredientComposition = await prisma.ingredientComposition.create({
     *   data: {
     *     // ... data to create a IngredientComposition
     *   }
     * })
     *
     */
    create<T extends IngredientCompositionCreateArgs>(args: Prisma.SelectSubset<T, IngredientCompositionCreateArgs<ExtArgs>>): Prisma.Prisma__IngredientCompositionClient<runtime.Types.Result.GetResult<Prisma.$IngredientCompositionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many IngredientCompositions.
     * @param {IngredientCompositionCreateManyArgs} args - Arguments to create many IngredientCompositions.
     * @example
     * // Create many IngredientCompositions
     * const ingredientComposition = await prisma.ingredientComposition.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends IngredientCompositionCreateManyArgs>(args?: Prisma.SelectSubset<T, IngredientCompositionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many IngredientCompositions and returns the data saved in the database.
     * @param {IngredientCompositionCreateManyAndReturnArgs} args - Arguments to create many IngredientCompositions.
     * @example
     * // Create many IngredientCompositions
     * const ingredientComposition = await prisma.ingredientComposition.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many IngredientCompositions and only return the `ingredient_composition_id`
     * const ingredientCompositionWithIngredient_composition_idOnly = await prisma.ingredientComposition.createManyAndReturn({
     *   select: { ingredient_composition_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends IngredientCompositionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, IngredientCompositionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IngredientCompositionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a IngredientComposition.
     * @param {IngredientCompositionDeleteArgs} args - Arguments to delete one IngredientComposition.
     * @example
     * // Delete one IngredientComposition
     * const IngredientComposition = await prisma.ingredientComposition.delete({
     *   where: {
     *     // ... filter to delete one IngredientComposition
     *   }
     * })
     *
     */
    delete<T extends IngredientCompositionDeleteArgs>(args: Prisma.SelectSubset<T, IngredientCompositionDeleteArgs<ExtArgs>>): Prisma.Prisma__IngredientCompositionClient<runtime.Types.Result.GetResult<Prisma.$IngredientCompositionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one IngredientComposition.
     * @param {IngredientCompositionUpdateArgs} args - Arguments to update one IngredientComposition.
     * @example
     * // Update one IngredientComposition
     * const ingredientComposition = await prisma.ingredientComposition.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends IngredientCompositionUpdateArgs>(args: Prisma.SelectSubset<T, IngredientCompositionUpdateArgs<ExtArgs>>): Prisma.Prisma__IngredientCompositionClient<runtime.Types.Result.GetResult<Prisma.$IngredientCompositionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more IngredientCompositions.
     * @param {IngredientCompositionDeleteManyArgs} args - Arguments to filter IngredientCompositions to delete.
     * @example
     * // Delete a few IngredientCompositions
     * const { count } = await prisma.ingredientComposition.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends IngredientCompositionDeleteManyArgs>(args?: Prisma.SelectSubset<T, IngredientCompositionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more IngredientCompositions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientCompositionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IngredientCompositions
     * const ingredientComposition = await prisma.ingredientComposition.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends IngredientCompositionUpdateManyArgs>(args: Prisma.SelectSubset<T, IngredientCompositionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more IngredientCompositions and returns the data updated in the database.
     * @param {IngredientCompositionUpdateManyAndReturnArgs} args - Arguments to update many IngredientCompositions.
     * @example
     * // Update many IngredientCompositions
     * const ingredientComposition = await prisma.ingredientComposition.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more IngredientCompositions and only return the `ingredient_composition_id`
     * const ingredientCompositionWithIngredient_composition_idOnly = await prisma.ingredientComposition.updateManyAndReturn({
     *   select: { ingredient_composition_id: true },
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
    updateManyAndReturn<T extends IngredientCompositionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, IngredientCompositionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IngredientCompositionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one IngredientComposition.
     * @param {IngredientCompositionUpsertArgs} args - Arguments to update or create a IngredientComposition.
     * @example
     * // Update or create a IngredientComposition
     * const ingredientComposition = await prisma.ingredientComposition.upsert({
     *   create: {
     *     // ... data to create a IngredientComposition
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IngredientComposition we want to update
     *   }
     * })
     */
    upsert<T extends IngredientCompositionUpsertArgs>(args: Prisma.SelectSubset<T, IngredientCompositionUpsertArgs<ExtArgs>>): Prisma.Prisma__IngredientCompositionClient<runtime.Types.Result.GetResult<Prisma.$IngredientCompositionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of IngredientCompositions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientCompositionCountArgs} args - Arguments to filter IngredientCompositions to count.
     * @example
     * // Count the number of IngredientCompositions
     * const count = await prisma.ingredientComposition.count({
     *   where: {
     *     // ... the filter for the IngredientCompositions we want to count
     *   }
     * })
    **/
    count<T extends IngredientCompositionCountArgs>(args?: Prisma.Subset<T, IngredientCompositionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IngredientCompositionCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a IngredientComposition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientCompositionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IngredientCompositionAggregateArgs>(args: Prisma.Subset<T, IngredientCompositionAggregateArgs>): Prisma.PrismaPromise<GetIngredientCompositionAggregateType<T>>;
    /**
     * Group by IngredientComposition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientCompositionGroupByArgs} args - Group by arguments.
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
    groupBy<T extends IngredientCompositionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: IngredientCompositionGroupByArgs['orderBy'];
    } : {
        orderBy?: IngredientCompositionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, IngredientCompositionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIngredientCompositionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the IngredientComposition model
     */
    readonly fields: IngredientCompositionFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for IngredientComposition.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__IngredientCompositionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    child_ingredient<T extends Prisma.IngredientDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.IngredientDefaultArgs<ExtArgs>>): Prisma.Prisma__IngredientClient<runtime.Types.Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    parent_ingredient<T extends Prisma.IngredientDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.IngredientDefaultArgs<ExtArgs>>): Prisma.Prisma__IngredientClient<runtime.Types.Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the IngredientComposition model
 */
export interface IngredientCompositionFieldRefs {
    readonly ingredient_composition_id: Prisma.FieldRef<"IngredientComposition", 'String'>;
    readonly parent_id: Prisma.FieldRef<"IngredientComposition", 'String'>;
    readonly child_id: Prisma.FieldRef<"IngredientComposition", 'String'>;
    readonly qty_needed: Prisma.FieldRef<"IngredientComposition", 'Decimal'>;
    readonly created_at: Prisma.FieldRef<"IngredientComposition", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"IngredientComposition", 'DateTime'>;
    readonly deleted_at: Prisma.FieldRef<"IngredientComposition", 'DateTime'>;
}
/**
 * IngredientComposition findUnique
 */
export type IngredientCompositionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngredientComposition
     */
    select?: Prisma.IngredientCompositionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IngredientComposition
     */
    omit?: Prisma.IngredientCompositionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IngredientCompositionInclude<ExtArgs> | null;
    /**
     * Filter, which IngredientComposition to fetch.
     */
    where: Prisma.IngredientCompositionWhereUniqueInput;
};
/**
 * IngredientComposition findUniqueOrThrow
 */
export type IngredientCompositionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngredientComposition
     */
    select?: Prisma.IngredientCompositionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IngredientComposition
     */
    omit?: Prisma.IngredientCompositionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IngredientCompositionInclude<ExtArgs> | null;
    /**
     * Filter, which IngredientComposition to fetch.
     */
    where: Prisma.IngredientCompositionWhereUniqueInput;
};
/**
 * IngredientComposition findFirst
 */
export type IngredientCompositionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngredientComposition
     */
    select?: Prisma.IngredientCompositionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IngredientComposition
     */
    omit?: Prisma.IngredientCompositionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IngredientCompositionInclude<ExtArgs> | null;
    /**
     * Filter, which IngredientComposition to fetch.
     */
    where?: Prisma.IngredientCompositionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of IngredientCompositions to fetch.
     */
    orderBy?: Prisma.IngredientCompositionOrderByWithRelationInput | Prisma.IngredientCompositionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for IngredientCompositions.
     */
    cursor?: Prisma.IngredientCompositionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` IngredientCompositions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` IngredientCompositions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of IngredientCompositions.
     */
    distinct?: Prisma.IngredientCompositionScalarFieldEnum | Prisma.IngredientCompositionScalarFieldEnum[];
};
/**
 * IngredientComposition findFirstOrThrow
 */
export type IngredientCompositionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngredientComposition
     */
    select?: Prisma.IngredientCompositionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IngredientComposition
     */
    omit?: Prisma.IngredientCompositionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IngredientCompositionInclude<ExtArgs> | null;
    /**
     * Filter, which IngredientComposition to fetch.
     */
    where?: Prisma.IngredientCompositionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of IngredientCompositions to fetch.
     */
    orderBy?: Prisma.IngredientCompositionOrderByWithRelationInput | Prisma.IngredientCompositionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for IngredientCompositions.
     */
    cursor?: Prisma.IngredientCompositionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` IngredientCompositions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` IngredientCompositions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of IngredientCompositions.
     */
    distinct?: Prisma.IngredientCompositionScalarFieldEnum | Prisma.IngredientCompositionScalarFieldEnum[];
};
/**
 * IngredientComposition findMany
 */
export type IngredientCompositionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngredientComposition
     */
    select?: Prisma.IngredientCompositionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IngredientComposition
     */
    omit?: Prisma.IngredientCompositionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IngredientCompositionInclude<ExtArgs> | null;
    /**
     * Filter, which IngredientCompositions to fetch.
     */
    where?: Prisma.IngredientCompositionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of IngredientCompositions to fetch.
     */
    orderBy?: Prisma.IngredientCompositionOrderByWithRelationInput | Prisma.IngredientCompositionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing IngredientCompositions.
     */
    cursor?: Prisma.IngredientCompositionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` IngredientCompositions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` IngredientCompositions.
     */
    skip?: number;
    distinct?: Prisma.IngredientCompositionScalarFieldEnum | Prisma.IngredientCompositionScalarFieldEnum[];
};
/**
 * IngredientComposition create
 */
export type IngredientCompositionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngredientComposition
     */
    select?: Prisma.IngredientCompositionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IngredientComposition
     */
    omit?: Prisma.IngredientCompositionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IngredientCompositionInclude<ExtArgs> | null;
    /**
     * The data needed to create a IngredientComposition.
     */
    data: Prisma.XOR<Prisma.IngredientCompositionCreateInput, Prisma.IngredientCompositionUncheckedCreateInput>;
};
/**
 * IngredientComposition createMany
 */
export type IngredientCompositionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many IngredientCompositions.
     */
    data: Prisma.IngredientCompositionCreateManyInput | Prisma.IngredientCompositionCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * IngredientComposition createManyAndReturn
 */
export type IngredientCompositionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngredientComposition
     */
    select?: Prisma.IngredientCompositionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the IngredientComposition
     */
    omit?: Prisma.IngredientCompositionOmit<ExtArgs> | null;
    /**
     * The data used to create many IngredientCompositions.
     */
    data: Prisma.IngredientCompositionCreateManyInput | Prisma.IngredientCompositionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IngredientCompositionIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * IngredientComposition update
 */
export type IngredientCompositionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngredientComposition
     */
    select?: Prisma.IngredientCompositionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IngredientComposition
     */
    omit?: Prisma.IngredientCompositionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IngredientCompositionInclude<ExtArgs> | null;
    /**
     * The data needed to update a IngredientComposition.
     */
    data: Prisma.XOR<Prisma.IngredientCompositionUpdateInput, Prisma.IngredientCompositionUncheckedUpdateInput>;
    /**
     * Choose, which IngredientComposition to update.
     */
    where: Prisma.IngredientCompositionWhereUniqueInput;
};
/**
 * IngredientComposition updateMany
 */
export type IngredientCompositionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update IngredientCompositions.
     */
    data: Prisma.XOR<Prisma.IngredientCompositionUpdateManyMutationInput, Prisma.IngredientCompositionUncheckedUpdateManyInput>;
    /**
     * Filter which IngredientCompositions to update
     */
    where?: Prisma.IngredientCompositionWhereInput;
    /**
     * Limit how many IngredientCompositions to update.
     */
    limit?: number;
};
/**
 * IngredientComposition updateManyAndReturn
 */
export type IngredientCompositionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngredientComposition
     */
    select?: Prisma.IngredientCompositionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the IngredientComposition
     */
    omit?: Prisma.IngredientCompositionOmit<ExtArgs> | null;
    /**
     * The data used to update IngredientCompositions.
     */
    data: Prisma.XOR<Prisma.IngredientCompositionUpdateManyMutationInput, Prisma.IngredientCompositionUncheckedUpdateManyInput>;
    /**
     * Filter which IngredientCompositions to update
     */
    where?: Prisma.IngredientCompositionWhereInput;
    /**
     * Limit how many IngredientCompositions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IngredientCompositionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * IngredientComposition upsert
 */
export type IngredientCompositionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngredientComposition
     */
    select?: Prisma.IngredientCompositionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IngredientComposition
     */
    omit?: Prisma.IngredientCompositionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IngredientCompositionInclude<ExtArgs> | null;
    /**
     * The filter to search for the IngredientComposition to update in case it exists.
     */
    where: Prisma.IngredientCompositionWhereUniqueInput;
    /**
     * In case the IngredientComposition found by the `where` argument doesn't exist, create a new IngredientComposition with this data.
     */
    create: Prisma.XOR<Prisma.IngredientCompositionCreateInput, Prisma.IngredientCompositionUncheckedCreateInput>;
    /**
     * In case the IngredientComposition was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.IngredientCompositionUpdateInput, Prisma.IngredientCompositionUncheckedUpdateInput>;
};
/**
 * IngredientComposition delete
 */
export type IngredientCompositionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngredientComposition
     */
    select?: Prisma.IngredientCompositionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IngredientComposition
     */
    omit?: Prisma.IngredientCompositionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IngredientCompositionInclude<ExtArgs> | null;
    /**
     * Filter which IngredientComposition to delete.
     */
    where: Prisma.IngredientCompositionWhereUniqueInput;
};
/**
 * IngredientComposition deleteMany
 */
export type IngredientCompositionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which IngredientCompositions to delete
     */
    where?: Prisma.IngredientCompositionWhereInput;
    /**
     * Limit how many IngredientCompositions to delete.
     */
    limit?: number;
};
/**
 * IngredientComposition without action
 */
export type IngredientCompositionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngredientComposition
     */
    select?: Prisma.IngredientCompositionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IngredientComposition
     */
    omit?: Prisma.IngredientCompositionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IngredientCompositionInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=IngredientComposition.d.ts.map