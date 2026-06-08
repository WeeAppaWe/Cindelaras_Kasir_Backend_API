import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Ingredient
 *
 */
export type IngredientModel = runtime.Types.Result.DefaultSelection<Prisma.$IngredientPayload>;
export type AggregateIngredient = {
    _count: IngredientCountAggregateOutputType | null;
    _avg: IngredientAvgAggregateOutputType | null;
    _sum: IngredientSumAggregateOutputType | null;
    _min: IngredientMinAggregateOutputType | null;
    _max: IngredientMaxAggregateOutputType | null;
};
export type IngredientAvgAggregateOutputType = {
    stock_qty: runtime.Decimal | null;
    min_stock: runtime.Decimal | null;
    avg_cost: runtime.Decimal | null;
};
export type IngredientSumAggregateOutputType = {
    stock_qty: runtime.Decimal | null;
    min_stock: runtime.Decimal | null;
    avg_cost: runtime.Decimal | null;
};
export type IngredientMinAggregateOutputType = {
    ingredient_id: string | null;
    unit_id: string | null;
    name: string | null;
    type: string | null;
    stock_qty: runtime.Decimal | null;
    min_stock: runtime.Decimal | null;
    avg_cost: runtime.Decimal | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
export type IngredientMaxAggregateOutputType = {
    ingredient_id: string | null;
    unit_id: string | null;
    name: string | null;
    type: string | null;
    stock_qty: runtime.Decimal | null;
    min_stock: runtime.Decimal | null;
    avg_cost: runtime.Decimal | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
export type IngredientCountAggregateOutputType = {
    ingredient_id: number;
    unit_id: number;
    name: number;
    type: number;
    stock_qty: number;
    min_stock: number;
    avg_cost: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
};
export type IngredientAvgAggregateInputType = {
    stock_qty?: true;
    min_stock?: true;
    avg_cost?: true;
};
export type IngredientSumAggregateInputType = {
    stock_qty?: true;
    min_stock?: true;
    avg_cost?: true;
};
export type IngredientMinAggregateInputType = {
    ingredient_id?: true;
    unit_id?: true;
    name?: true;
    type?: true;
    stock_qty?: true;
    min_stock?: true;
    avg_cost?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
};
export type IngredientMaxAggregateInputType = {
    ingredient_id?: true;
    unit_id?: true;
    name?: true;
    type?: true;
    stock_qty?: true;
    min_stock?: true;
    avg_cost?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
};
export type IngredientCountAggregateInputType = {
    ingredient_id?: true;
    unit_id?: true;
    name?: true;
    type?: true;
    stock_qty?: true;
    min_stock?: true;
    avg_cost?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
};
export type IngredientAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Ingredient to aggregate.
     */
    where?: Prisma.IngredientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Ingredients to fetch.
     */
    orderBy?: Prisma.IngredientOrderByWithRelationInput | Prisma.IngredientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.IngredientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Ingredients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Ingredients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Ingredients
    **/
    _count?: true | IngredientCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: IngredientAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: IngredientSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: IngredientMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: IngredientMaxAggregateInputType;
};
export type GetIngredientAggregateType<T extends IngredientAggregateArgs> = {
    [P in keyof T & keyof AggregateIngredient]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIngredient[P]> : Prisma.GetScalarType<T[P], AggregateIngredient[P]>;
};
export type IngredientGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IngredientWhereInput;
    orderBy?: Prisma.IngredientOrderByWithAggregationInput | Prisma.IngredientOrderByWithAggregationInput[];
    by: Prisma.IngredientScalarFieldEnum[] | Prisma.IngredientScalarFieldEnum;
    having?: Prisma.IngredientScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IngredientCountAggregateInputType | true;
    _avg?: IngredientAvgAggregateInputType;
    _sum?: IngredientSumAggregateInputType;
    _min?: IngredientMinAggregateInputType;
    _max?: IngredientMaxAggregateInputType;
};
export type IngredientGroupByOutputType = {
    ingredient_id: string;
    unit_id: string;
    name: string;
    type: string;
    stock_qty: runtime.Decimal;
    min_stock: runtime.Decimal;
    avg_cost: runtime.Decimal;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    _count: IngredientCountAggregateOutputType | null;
    _avg: IngredientAvgAggregateOutputType | null;
    _sum: IngredientSumAggregateOutputType | null;
    _min: IngredientMinAggregateOutputType | null;
    _max: IngredientMaxAggregateOutputType | null;
};
type GetIngredientGroupByPayload<T extends IngredientGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IngredientGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IngredientGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IngredientGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IngredientGroupByOutputType[P]>;
}>>;
export type IngredientWhereInput = {
    AND?: Prisma.IngredientWhereInput | Prisma.IngredientWhereInput[];
    OR?: Prisma.IngredientWhereInput[];
    NOT?: Prisma.IngredientWhereInput | Prisma.IngredientWhereInput[];
    ingredient_id?: Prisma.UuidFilter<"Ingredient"> | string;
    unit_id?: Prisma.UuidFilter<"Ingredient"> | string;
    name?: Prisma.StringFilter<"Ingredient"> | string;
    type?: Prisma.StringFilter<"Ingredient"> | string;
    stock_qty?: Prisma.DecimalFilter<"Ingredient"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalFilter<"Ingredient"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalFilter<"Ingredient"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFilter<"Ingredient"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"Ingredient"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"Ingredient"> | Date | string | null;
    child_compositions?: Prisma.IngredientCompositionListRelationFilter;
    parent_compositions?: Prisma.IngredientCompositionListRelationFilter;
    unit?: Prisma.XOR<Prisma.UnitMeasureScalarRelationFilter, Prisma.UnitMeasureWhereInput>;
    menu_recipes?: Prisma.MenuRecipeListRelationFilter;
    stock_movements?: Prisma.StockMovementListRelationFilter;
    stock_opname_items?: Prisma.StockOpnameItemListRelationFilter;
};
export type IngredientOrderByWithRelationInput = {
    ingredient_id?: Prisma.SortOrder;
    unit_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    stock_qty?: Prisma.SortOrder;
    min_stock?: Prisma.SortOrder;
    avg_cost?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    child_compositions?: Prisma.IngredientCompositionOrderByRelationAggregateInput;
    parent_compositions?: Prisma.IngredientCompositionOrderByRelationAggregateInput;
    unit?: Prisma.UnitMeasureOrderByWithRelationInput;
    menu_recipes?: Prisma.MenuRecipeOrderByRelationAggregateInput;
    stock_movements?: Prisma.StockMovementOrderByRelationAggregateInput;
    stock_opname_items?: Prisma.StockOpnameItemOrderByRelationAggregateInput;
};
export type IngredientWhereUniqueInput = Prisma.AtLeast<{
    ingredient_id?: string;
    AND?: Prisma.IngredientWhereInput | Prisma.IngredientWhereInput[];
    OR?: Prisma.IngredientWhereInput[];
    NOT?: Prisma.IngredientWhereInput | Prisma.IngredientWhereInput[];
    unit_id?: Prisma.UuidFilter<"Ingredient"> | string;
    name?: Prisma.StringFilter<"Ingredient"> | string;
    type?: Prisma.StringFilter<"Ingredient"> | string;
    stock_qty?: Prisma.DecimalFilter<"Ingredient"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalFilter<"Ingredient"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalFilter<"Ingredient"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFilter<"Ingredient"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"Ingredient"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"Ingredient"> | Date | string | null;
    child_compositions?: Prisma.IngredientCompositionListRelationFilter;
    parent_compositions?: Prisma.IngredientCompositionListRelationFilter;
    unit?: Prisma.XOR<Prisma.UnitMeasureScalarRelationFilter, Prisma.UnitMeasureWhereInput>;
    menu_recipes?: Prisma.MenuRecipeListRelationFilter;
    stock_movements?: Prisma.StockMovementListRelationFilter;
    stock_opname_items?: Prisma.StockOpnameItemListRelationFilter;
}, "ingredient_id">;
export type IngredientOrderByWithAggregationInput = {
    ingredient_id?: Prisma.SortOrder;
    unit_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    stock_qty?: Prisma.SortOrder;
    min_stock?: Prisma.SortOrder;
    avg_cost?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.IngredientCountOrderByAggregateInput;
    _avg?: Prisma.IngredientAvgOrderByAggregateInput;
    _max?: Prisma.IngredientMaxOrderByAggregateInput;
    _min?: Prisma.IngredientMinOrderByAggregateInput;
    _sum?: Prisma.IngredientSumOrderByAggregateInput;
};
export type IngredientScalarWhereWithAggregatesInput = {
    AND?: Prisma.IngredientScalarWhereWithAggregatesInput | Prisma.IngredientScalarWhereWithAggregatesInput[];
    OR?: Prisma.IngredientScalarWhereWithAggregatesInput[];
    NOT?: Prisma.IngredientScalarWhereWithAggregatesInput | Prisma.IngredientScalarWhereWithAggregatesInput[];
    ingredient_id?: Prisma.UuidWithAggregatesFilter<"Ingredient"> | string;
    unit_id?: Prisma.UuidWithAggregatesFilter<"Ingredient"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Ingredient"> | string;
    type?: Prisma.StringWithAggregatesFilter<"Ingredient"> | string;
    stock_qty?: Prisma.DecimalWithAggregatesFilter<"Ingredient"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalWithAggregatesFilter<"Ingredient"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalWithAggregatesFilter<"Ingredient"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"Ingredient"> | Date | string;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"Ingredient"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableWithAggregatesFilter<"Ingredient"> | Date | string | null;
};
export type IngredientCreateInput = {
    ingredient_id?: string;
    name: string;
    type: string;
    stock_qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    child_compositions?: Prisma.IngredientCompositionCreateNestedManyWithoutChild_ingredientInput;
    parent_compositions?: Prisma.IngredientCompositionCreateNestedManyWithoutParent_ingredientInput;
    unit: Prisma.UnitMeasureCreateNestedOneWithoutIngredientsInput;
    menu_recipes?: Prisma.MenuRecipeCreateNestedManyWithoutIngredientInput;
    stock_movements?: Prisma.StockMovementCreateNestedManyWithoutIngredientInput;
    stock_opname_items?: Prisma.StockOpnameItemCreateNestedManyWithoutIngredientInput;
};
export type IngredientUncheckedCreateInput = {
    ingredient_id?: string;
    unit_id: string;
    name: string;
    type: string;
    stock_qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    child_compositions?: Prisma.IngredientCompositionUncheckedCreateNestedManyWithoutChild_ingredientInput;
    parent_compositions?: Prisma.IngredientCompositionUncheckedCreateNestedManyWithoutParent_ingredientInput;
    menu_recipes?: Prisma.MenuRecipeUncheckedCreateNestedManyWithoutIngredientInput;
    stock_movements?: Prisma.StockMovementUncheckedCreateNestedManyWithoutIngredientInput;
    stock_opname_items?: Prisma.StockOpnameItemUncheckedCreateNestedManyWithoutIngredientInput;
};
export type IngredientUpdateInput = {
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    child_compositions?: Prisma.IngredientCompositionUpdateManyWithoutChild_ingredientNestedInput;
    parent_compositions?: Prisma.IngredientCompositionUpdateManyWithoutParent_ingredientNestedInput;
    unit?: Prisma.UnitMeasureUpdateOneRequiredWithoutIngredientsNestedInput;
    menu_recipes?: Prisma.MenuRecipeUpdateManyWithoutIngredientNestedInput;
    stock_movements?: Prisma.StockMovementUpdateManyWithoutIngredientNestedInput;
    stock_opname_items?: Prisma.StockOpnameItemUpdateManyWithoutIngredientNestedInput;
};
export type IngredientUncheckedUpdateInput = {
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    unit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    child_compositions?: Prisma.IngredientCompositionUncheckedUpdateManyWithoutChild_ingredientNestedInput;
    parent_compositions?: Prisma.IngredientCompositionUncheckedUpdateManyWithoutParent_ingredientNestedInput;
    menu_recipes?: Prisma.MenuRecipeUncheckedUpdateManyWithoutIngredientNestedInput;
    stock_movements?: Prisma.StockMovementUncheckedUpdateManyWithoutIngredientNestedInput;
    stock_opname_items?: Prisma.StockOpnameItemUncheckedUpdateManyWithoutIngredientNestedInput;
};
export type IngredientCreateManyInput = {
    ingredient_id?: string;
    unit_id: string;
    name: string;
    type: string;
    stock_qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type IngredientUpdateManyMutationInput = {
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IngredientUncheckedUpdateManyInput = {
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    unit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type IngredientCountOrderByAggregateInput = {
    ingredient_id?: Prisma.SortOrder;
    unit_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    stock_qty?: Prisma.SortOrder;
    min_stock?: Prisma.SortOrder;
    avg_cost?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type IngredientAvgOrderByAggregateInput = {
    stock_qty?: Prisma.SortOrder;
    min_stock?: Prisma.SortOrder;
    avg_cost?: Prisma.SortOrder;
};
export type IngredientMaxOrderByAggregateInput = {
    ingredient_id?: Prisma.SortOrder;
    unit_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    stock_qty?: Prisma.SortOrder;
    min_stock?: Prisma.SortOrder;
    avg_cost?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type IngredientMinOrderByAggregateInput = {
    ingredient_id?: Prisma.SortOrder;
    unit_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    stock_qty?: Prisma.SortOrder;
    min_stock?: Prisma.SortOrder;
    avg_cost?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type IngredientSumOrderByAggregateInput = {
    stock_qty?: Prisma.SortOrder;
    min_stock?: Prisma.SortOrder;
    avg_cost?: Prisma.SortOrder;
};
export type IngredientScalarRelationFilter = {
    is?: Prisma.IngredientWhereInput;
    isNot?: Prisma.IngredientWhereInput;
};
export type IngredientListRelationFilter = {
    every?: Prisma.IngredientWhereInput;
    some?: Prisma.IngredientWhereInput;
    none?: Prisma.IngredientWhereInput;
};
export type IngredientOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type IngredientCreateNestedOneWithoutChild_compositionsInput = {
    create?: Prisma.XOR<Prisma.IngredientCreateWithoutChild_compositionsInput, Prisma.IngredientUncheckedCreateWithoutChild_compositionsInput>;
    connectOrCreate?: Prisma.IngredientCreateOrConnectWithoutChild_compositionsInput;
    connect?: Prisma.IngredientWhereUniqueInput;
};
export type IngredientCreateNestedOneWithoutParent_compositionsInput = {
    create?: Prisma.XOR<Prisma.IngredientCreateWithoutParent_compositionsInput, Prisma.IngredientUncheckedCreateWithoutParent_compositionsInput>;
    connectOrCreate?: Prisma.IngredientCreateOrConnectWithoutParent_compositionsInput;
    connect?: Prisma.IngredientWhereUniqueInput;
};
export type IngredientUpdateOneRequiredWithoutChild_compositionsNestedInput = {
    create?: Prisma.XOR<Prisma.IngredientCreateWithoutChild_compositionsInput, Prisma.IngredientUncheckedCreateWithoutChild_compositionsInput>;
    connectOrCreate?: Prisma.IngredientCreateOrConnectWithoutChild_compositionsInput;
    upsert?: Prisma.IngredientUpsertWithoutChild_compositionsInput;
    connect?: Prisma.IngredientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.IngredientUpdateToOneWithWhereWithoutChild_compositionsInput, Prisma.IngredientUpdateWithoutChild_compositionsInput>, Prisma.IngredientUncheckedUpdateWithoutChild_compositionsInput>;
};
export type IngredientUpdateOneRequiredWithoutParent_compositionsNestedInput = {
    create?: Prisma.XOR<Prisma.IngredientCreateWithoutParent_compositionsInput, Prisma.IngredientUncheckedCreateWithoutParent_compositionsInput>;
    connectOrCreate?: Prisma.IngredientCreateOrConnectWithoutParent_compositionsInput;
    upsert?: Prisma.IngredientUpsertWithoutParent_compositionsInput;
    connect?: Prisma.IngredientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.IngredientUpdateToOneWithWhereWithoutParent_compositionsInput, Prisma.IngredientUpdateWithoutParent_compositionsInput>, Prisma.IngredientUncheckedUpdateWithoutParent_compositionsInput>;
};
export type IngredientCreateNestedOneWithoutMenu_recipesInput = {
    create?: Prisma.XOR<Prisma.IngredientCreateWithoutMenu_recipesInput, Prisma.IngredientUncheckedCreateWithoutMenu_recipesInput>;
    connectOrCreate?: Prisma.IngredientCreateOrConnectWithoutMenu_recipesInput;
    connect?: Prisma.IngredientWhereUniqueInput;
};
export type IngredientUpdateOneRequiredWithoutMenu_recipesNestedInput = {
    create?: Prisma.XOR<Prisma.IngredientCreateWithoutMenu_recipesInput, Prisma.IngredientUncheckedCreateWithoutMenu_recipesInput>;
    connectOrCreate?: Prisma.IngredientCreateOrConnectWithoutMenu_recipesInput;
    upsert?: Prisma.IngredientUpsertWithoutMenu_recipesInput;
    connect?: Prisma.IngredientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.IngredientUpdateToOneWithWhereWithoutMenu_recipesInput, Prisma.IngredientUpdateWithoutMenu_recipesInput>, Prisma.IngredientUncheckedUpdateWithoutMenu_recipesInput>;
};
export type IngredientCreateNestedManyWithoutUnitInput = {
    create?: Prisma.XOR<Prisma.IngredientCreateWithoutUnitInput, Prisma.IngredientUncheckedCreateWithoutUnitInput> | Prisma.IngredientCreateWithoutUnitInput[] | Prisma.IngredientUncheckedCreateWithoutUnitInput[];
    connectOrCreate?: Prisma.IngredientCreateOrConnectWithoutUnitInput | Prisma.IngredientCreateOrConnectWithoutUnitInput[];
    createMany?: Prisma.IngredientCreateManyUnitInputEnvelope;
    connect?: Prisma.IngredientWhereUniqueInput | Prisma.IngredientWhereUniqueInput[];
};
export type IngredientUncheckedCreateNestedManyWithoutUnitInput = {
    create?: Prisma.XOR<Prisma.IngredientCreateWithoutUnitInput, Prisma.IngredientUncheckedCreateWithoutUnitInput> | Prisma.IngredientCreateWithoutUnitInput[] | Prisma.IngredientUncheckedCreateWithoutUnitInput[];
    connectOrCreate?: Prisma.IngredientCreateOrConnectWithoutUnitInput | Prisma.IngredientCreateOrConnectWithoutUnitInput[];
    createMany?: Prisma.IngredientCreateManyUnitInputEnvelope;
    connect?: Prisma.IngredientWhereUniqueInput | Prisma.IngredientWhereUniqueInput[];
};
export type IngredientUpdateManyWithoutUnitNestedInput = {
    create?: Prisma.XOR<Prisma.IngredientCreateWithoutUnitInput, Prisma.IngredientUncheckedCreateWithoutUnitInput> | Prisma.IngredientCreateWithoutUnitInput[] | Prisma.IngredientUncheckedCreateWithoutUnitInput[];
    connectOrCreate?: Prisma.IngredientCreateOrConnectWithoutUnitInput | Prisma.IngredientCreateOrConnectWithoutUnitInput[];
    upsert?: Prisma.IngredientUpsertWithWhereUniqueWithoutUnitInput | Prisma.IngredientUpsertWithWhereUniqueWithoutUnitInput[];
    createMany?: Prisma.IngredientCreateManyUnitInputEnvelope;
    set?: Prisma.IngredientWhereUniqueInput | Prisma.IngredientWhereUniqueInput[];
    disconnect?: Prisma.IngredientWhereUniqueInput | Prisma.IngredientWhereUniqueInput[];
    delete?: Prisma.IngredientWhereUniqueInput | Prisma.IngredientWhereUniqueInput[];
    connect?: Prisma.IngredientWhereUniqueInput | Prisma.IngredientWhereUniqueInput[];
    update?: Prisma.IngredientUpdateWithWhereUniqueWithoutUnitInput | Prisma.IngredientUpdateWithWhereUniqueWithoutUnitInput[];
    updateMany?: Prisma.IngredientUpdateManyWithWhereWithoutUnitInput | Prisma.IngredientUpdateManyWithWhereWithoutUnitInput[];
    deleteMany?: Prisma.IngredientScalarWhereInput | Prisma.IngredientScalarWhereInput[];
};
export type IngredientUncheckedUpdateManyWithoutUnitNestedInput = {
    create?: Prisma.XOR<Prisma.IngredientCreateWithoutUnitInput, Prisma.IngredientUncheckedCreateWithoutUnitInput> | Prisma.IngredientCreateWithoutUnitInput[] | Prisma.IngredientUncheckedCreateWithoutUnitInput[];
    connectOrCreate?: Prisma.IngredientCreateOrConnectWithoutUnitInput | Prisma.IngredientCreateOrConnectWithoutUnitInput[];
    upsert?: Prisma.IngredientUpsertWithWhereUniqueWithoutUnitInput | Prisma.IngredientUpsertWithWhereUniqueWithoutUnitInput[];
    createMany?: Prisma.IngredientCreateManyUnitInputEnvelope;
    set?: Prisma.IngredientWhereUniqueInput | Prisma.IngredientWhereUniqueInput[];
    disconnect?: Prisma.IngredientWhereUniqueInput | Prisma.IngredientWhereUniqueInput[];
    delete?: Prisma.IngredientWhereUniqueInput | Prisma.IngredientWhereUniqueInput[];
    connect?: Prisma.IngredientWhereUniqueInput | Prisma.IngredientWhereUniqueInput[];
    update?: Prisma.IngredientUpdateWithWhereUniqueWithoutUnitInput | Prisma.IngredientUpdateWithWhereUniqueWithoutUnitInput[];
    updateMany?: Prisma.IngredientUpdateManyWithWhereWithoutUnitInput | Prisma.IngredientUpdateManyWithWhereWithoutUnitInput[];
    deleteMany?: Prisma.IngredientScalarWhereInput | Prisma.IngredientScalarWhereInput[];
};
export type IngredientCreateNestedOneWithoutStock_movementsInput = {
    create?: Prisma.XOR<Prisma.IngredientCreateWithoutStock_movementsInput, Prisma.IngredientUncheckedCreateWithoutStock_movementsInput>;
    connectOrCreate?: Prisma.IngredientCreateOrConnectWithoutStock_movementsInput;
    connect?: Prisma.IngredientWhereUniqueInput;
};
export type IngredientUpdateOneRequiredWithoutStock_movementsNestedInput = {
    create?: Prisma.XOR<Prisma.IngredientCreateWithoutStock_movementsInput, Prisma.IngredientUncheckedCreateWithoutStock_movementsInput>;
    connectOrCreate?: Prisma.IngredientCreateOrConnectWithoutStock_movementsInput;
    upsert?: Prisma.IngredientUpsertWithoutStock_movementsInput;
    connect?: Prisma.IngredientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.IngredientUpdateToOneWithWhereWithoutStock_movementsInput, Prisma.IngredientUpdateWithoutStock_movementsInput>, Prisma.IngredientUncheckedUpdateWithoutStock_movementsInput>;
};
export type IngredientCreateNestedOneWithoutStock_opname_itemsInput = {
    create?: Prisma.XOR<Prisma.IngredientCreateWithoutStock_opname_itemsInput, Prisma.IngredientUncheckedCreateWithoutStock_opname_itemsInput>;
    connectOrCreate?: Prisma.IngredientCreateOrConnectWithoutStock_opname_itemsInput;
    connect?: Prisma.IngredientWhereUniqueInput;
};
export type IngredientUpdateOneRequiredWithoutStock_opname_itemsNestedInput = {
    create?: Prisma.XOR<Prisma.IngredientCreateWithoutStock_opname_itemsInput, Prisma.IngredientUncheckedCreateWithoutStock_opname_itemsInput>;
    connectOrCreate?: Prisma.IngredientCreateOrConnectWithoutStock_opname_itemsInput;
    upsert?: Prisma.IngredientUpsertWithoutStock_opname_itemsInput;
    connect?: Prisma.IngredientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.IngredientUpdateToOneWithWhereWithoutStock_opname_itemsInput, Prisma.IngredientUpdateWithoutStock_opname_itemsInput>, Prisma.IngredientUncheckedUpdateWithoutStock_opname_itemsInput>;
};
export type IngredientCreateWithoutChild_compositionsInput = {
    ingredient_id?: string;
    name: string;
    type: string;
    stock_qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    parent_compositions?: Prisma.IngredientCompositionCreateNestedManyWithoutParent_ingredientInput;
    unit: Prisma.UnitMeasureCreateNestedOneWithoutIngredientsInput;
    menu_recipes?: Prisma.MenuRecipeCreateNestedManyWithoutIngredientInput;
    stock_movements?: Prisma.StockMovementCreateNestedManyWithoutIngredientInput;
    stock_opname_items?: Prisma.StockOpnameItemCreateNestedManyWithoutIngredientInput;
};
export type IngredientUncheckedCreateWithoutChild_compositionsInput = {
    ingredient_id?: string;
    unit_id: string;
    name: string;
    type: string;
    stock_qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    parent_compositions?: Prisma.IngredientCompositionUncheckedCreateNestedManyWithoutParent_ingredientInput;
    menu_recipes?: Prisma.MenuRecipeUncheckedCreateNestedManyWithoutIngredientInput;
    stock_movements?: Prisma.StockMovementUncheckedCreateNestedManyWithoutIngredientInput;
    stock_opname_items?: Prisma.StockOpnameItemUncheckedCreateNestedManyWithoutIngredientInput;
};
export type IngredientCreateOrConnectWithoutChild_compositionsInput = {
    where: Prisma.IngredientWhereUniqueInput;
    create: Prisma.XOR<Prisma.IngredientCreateWithoutChild_compositionsInput, Prisma.IngredientUncheckedCreateWithoutChild_compositionsInput>;
};
export type IngredientCreateWithoutParent_compositionsInput = {
    ingredient_id?: string;
    name: string;
    type: string;
    stock_qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    child_compositions?: Prisma.IngredientCompositionCreateNestedManyWithoutChild_ingredientInput;
    unit: Prisma.UnitMeasureCreateNestedOneWithoutIngredientsInput;
    menu_recipes?: Prisma.MenuRecipeCreateNestedManyWithoutIngredientInput;
    stock_movements?: Prisma.StockMovementCreateNestedManyWithoutIngredientInput;
    stock_opname_items?: Prisma.StockOpnameItemCreateNestedManyWithoutIngredientInput;
};
export type IngredientUncheckedCreateWithoutParent_compositionsInput = {
    ingredient_id?: string;
    unit_id: string;
    name: string;
    type: string;
    stock_qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    child_compositions?: Prisma.IngredientCompositionUncheckedCreateNestedManyWithoutChild_ingredientInput;
    menu_recipes?: Prisma.MenuRecipeUncheckedCreateNestedManyWithoutIngredientInput;
    stock_movements?: Prisma.StockMovementUncheckedCreateNestedManyWithoutIngredientInput;
    stock_opname_items?: Prisma.StockOpnameItemUncheckedCreateNestedManyWithoutIngredientInput;
};
export type IngredientCreateOrConnectWithoutParent_compositionsInput = {
    where: Prisma.IngredientWhereUniqueInput;
    create: Prisma.XOR<Prisma.IngredientCreateWithoutParent_compositionsInput, Prisma.IngredientUncheckedCreateWithoutParent_compositionsInput>;
};
export type IngredientUpsertWithoutChild_compositionsInput = {
    update: Prisma.XOR<Prisma.IngredientUpdateWithoutChild_compositionsInput, Prisma.IngredientUncheckedUpdateWithoutChild_compositionsInput>;
    create: Prisma.XOR<Prisma.IngredientCreateWithoutChild_compositionsInput, Prisma.IngredientUncheckedCreateWithoutChild_compositionsInput>;
    where?: Prisma.IngredientWhereInput;
};
export type IngredientUpdateToOneWithWhereWithoutChild_compositionsInput = {
    where?: Prisma.IngredientWhereInput;
    data: Prisma.XOR<Prisma.IngredientUpdateWithoutChild_compositionsInput, Prisma.IngredientUncheckedUpdateWithoutChild_compositionsInput>;
};
export type IngredientUpdateWithoutChild_compositionsInput = {
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    parent_compositions?: Prisma.IngredientCompositionUpdateManyWithoutParent_ingredientNestedInput;
    unit?: Prisma.UnitMeasureUpdateOneRequiredWithoutIngredientsNestedInput;
    menu_recipes?: Prisma.MenuRecipeUpdateManyWithoutIngredientNestedInput;
    stock_movements?: Prisma.StockMovementUpdateManyWithoutIngredientNestedInput;
    stock_opname_items?: Prisma.StockOpnameItemUpdateManyWithoutIngredientNestedInput;
};
export type IngredientUncheckedUpdateWithoutChild_compositionsInput = {
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    unit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    parent_compositions?: Prisma.IngredientCompositionUncheckedUpdateManyWithoutParent_ingredientNestedInput;
    menu_recipes?: Prisma.MenuRecipeUncheckedUpdateManyWithoutIngredientNestedInput;
    stock_movements?: Prisma.StockMovementUncheckedUpdateManyWithoutIngredientNestedInput;
    stock_opname_items?: Prisma.StockOpnameItemUncheckedUpdateManyWithoutIngredientNestedInput;
};
export type IngredientUpsertWithoutParent_compositionsInput = {
    update: Prisma.XOR<Prisma.IngredientUpdateWithoutParent_compositionsInput, Prisma.IngredientUncheckedUpdateWithoutParent_compositionsInput>;
    create: Prisma.XOR<Prisma.IngredientCreateWithoutParent_compositionsInput, Prisma.IngredientUncheckedCreateWithoutParent_compositionsInput>;
    where?: Prisma.IngredientWhereInput;
};
export type IngredientUpdateToOneWithWhereWithoutParent_compositionsInput = {
    where?: Prisma.IngredientWhereInput;
    data: Prisma.XOR<Prisma.IngredientUpdateWithoutParent_compositionsInput, Prisma.IngredientUncheckedUpdateWithoutParent_compositionsInput>;
};
export type IngredientUpdateWithoutParent_compositionsInput = {
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    child_compositions?: Prisma.IngredientCompositionUpdateManyWithoutChild_ingredientNestedInput;
    unit?: Prisma.UnitMeasureUpdateOneRequiredWithoutIngredientsNestedInput;
    menu_recipes?: Prisma.MenuRecipeUpdateManyWithoutIngredientNestedInput;
    stock_movements?: Prisma.StockMovementUpdateManyWithoutIngredientNestedInput;
    stock_opname_items?: Prisma.StockOpnameItemUpdateManyWithoutIngredientNestedInput;
};
export type IngredientUncheckedUpdateWithoutParent_compositionsInput = {
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    unit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    child_compositions?: Prisma.IngredientCompositionUncheckedUpdateManyWithoutChild_ingredientNestedInput;
    menu_recipes?: Prisma.MenuRecipeUncheckedUpdateManyWithoutIngredientNestedInput;
    stock_movements?: Prisma.StockMovementUncheckedUpdateManyWithoutIngredientNestedInput;
    stock_opname_items?: Prisma.StockOpnameItemUncheckedUpdateManyWithoutIngredientNestedInput;
};
export type IngredientCreateWithoutMenu_recipesInput = {
    ingredient_id?: string;
    name: string;
    type: string;
    stock_qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    child_compositions?: Prisma.IngredientCompositionCreateNestedManyWithoutChild_ingredientInput;
    parent_compositions?: Prisma.IngredientCompositionCreateNestedManyWithoutParent_ingredientInput;
    unit: Prisma.UnitMeasureCreateNestedOneWithoutIngredientsInput;
    stock_movements?: Prisma.StockMovementCreateNestedManyWithoutIngredientInput;
    stock_opname_items?: Prisma.StockOpnameItemCreateNestedManyWithoutIngredientInput;
};
export type IngredientUncheckedCreateWithoutMenu_recipesInput = {
    ingredient_id?: string;
    unit_id: string;
    name: string;
    type: string;
    stock_qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    child_compositions?: Prisma.IngredientCompositionUncheckedCreateNestedManyWithoutChild_ingredientInput;
    parent_compositions?: Prisma.IngredientCompositionUncheckedCreateNestedManyWithoutParent_ingredientInput;
    stock_movements?: Prisma.StockMovementUncheckedCreateNestedManyWithoutIngredientInput;
    stock_opname_items?: Prisma.StockOpnameItemUncheckedCreateNestedManyWithoutIngredientInput;
};
export type IngredientCreateOrConnectWithoutMenu_recipesInput = {
    where: Prisma.IngredientWhereUniqueInput;
    create: Prisma.XOR<Prisma.IngredientCreateWithoutMenu_recipesInput, Prisma.IngredientUncheckedCreateWithoutMenu_recipesInput>;
};
export type IngredientUpsertWithoutMenu_recipesInput = {
    update: Prisma.XOR<Prisma.IngredientUpdateWithoutMenu_recipesInput, Prisma.IngredientUncheckedUpdateWithoutMenu_recipesInput>;
    create: Prisma.XOR<Prisma.IngredientCreateWithoutMenu_recipesInput, Prisma.IngredientUncheckedCreateWithoutMenu_recipesInput>;
    where?: Prisma.IngredientWhereInput;
};
export type IngredientUpdateToOneWithWhereWithoutMenu_recipesInput = {
    where?: Prisma.IngredientWhereInput;
    data: Prisma.XOR<Prisma.IngredientUpdateWithoutMenu_recipesInput, Prisma.IngredientUncheckedUpdateWithoutMenu_recipesInput>;
};
export type IngredientUpdateWithoutMenu_recipesInput = {
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    child_compositions?: Prisma.IngredientCompositionUpdateManyWithoutChild_ingredientNestedInput;
    parent_compositions?: Prisma.IngredientCompositionUpdateManyWithoutParent_ingredientNestedInput;
    unit?: Prisma.UnitMeasureUpdateOneRequiredWithoutIngredientsNestedInput;
    stock_movements?: Prisma.StockMovementUpdateManyWithoutIngredientNestedInput;
    stock_opname_items?: Prisma.StockOpnameItemUpdateManyWithoutIngredientNestedInput;
};
export type IngredientUncheckedUpdateWithoutMenu_recipesInput = {
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    unit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    child_compositions?: Prisma.IngredientCompositionUncheckedUpdateManyWithoutChild_ingredientNestedInput;
    parent_compositions?: Prisma.IngredientCompositionUncheckedUpdateManyWithoutParent_ingredientNestedInput;
    stock_movements?: Prisma.StockMovementUncheckedUpdateManyWithoutIngredientNestedInput;
    stock_opname_items?: Prisma.StockOpnameItemUncheckedUpdateManyWithoutIngredientNestedInput;
};
export type IngredientCreateWithoutUnitInput = {
    ingredient_id?: string;
    name: string;
    type: string;
    stock_qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    child_compositions?: Prisma.IngredientCompositionCreateNestedManyWithoutChild_ingredientInput;
    parent_compositions?: Prisma.IngredientCompositionCreateNestedManyWithoutParent_ingredientInput;
    menu_recipes?: Prisma.MenuRecipeCreateNestedManyWithoutIngredientInput;
    stock_movements?: Prisma.StockMovementCreateNestedManyWithoutIngredientInput;
    stock_opname_items?: Prisma.StockOpnameItemCreateNestedManyWithoutIngredientInput;
};
export type IngredientUncheckedCreateWithoutUnitInput = {
    ingredient_id?: string;
    name: string;
    type: string;
    stock_qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    child_compositions?: Prisma.IngredientCompositionUncheckedCreateNestedManyWithoutChild_ingredientInput;
    parent_compositions?: Prisma.IngredientCompositionUncheckedCreateNestedManyWithoutParent_ingredientInput;
    menu_recipes?: Prisma.MenuRecipeUncheckedCreateNestedManyWithoutIngredientInput;
    stock_movements?: Prisma.StockMovementUncheckedCreateNestedManyWithoutIngredientInput;
    stock_opname_items?: Prisma.StockOpnameItemUncheckedCreateNestedManyWithoutIngredientInput;
};
export type IngredientCreateOrConnectWithoutUnitInput = {
    where: Prisma.IngredientWhereUniqueInput;
    create: Prisma.XOR<Prisma.IngredientCreateWithoutUnitInput, Prisma.IngredientUncheckedCreateWithoutUnitInput>;
};
export type IngredientCreateManyUnitInputEnvelope = {
    data: Prisma.IngredientCreateManyUnitInput | Prisma.IngredientCreateManyUnitInput[];
    skipDuplicates?: boolean;
};
export type IngredientUpsertWithWhereUniqueWithoutUnitInput = {
    where: Prisma.IngredientWhereUniqueInput;
    update: Prisma.XOR<Prisma.IngredientUpdateWithoutUnitInput, Prisma.IngredientUncheckedUpdateWithoutUnitInput>;
    create: Prisma.XOR<Prisma.IngredientCreateWithoutUnitInput, Prisma.IngredientUncheckedCreateWithoutUnitInput>;
};
export type IngredientUpdateWithWhereUniqueWithoutUnitInput = {
    where: Prisma.IngredientWhereUniqueInput;
    data: Prisma.XOR<Prisma.IngredientUpdateWithoutUnitInput, Prisma.IngredientUncheckedUpdateWithoutUnitInput>;
};
export type IngredientUpdateManyWithWhereWithoutUnitInput = {
    where: Prisma.IngredientScalarWhereInput;
    data: Prisma.XOR<Prisma.IngredientUpdateManyMutationInput, Prisma.IngredientUncheckedUpdateManyWithoutUnitInput>;
};
export type IngredientScalarWhereInput = {
    AND?: Prisma.IngredientScalarWhereInput | Prisma.IngredientScalarWhereInput[];
    OR?: Prisma.IngredientScalarWhereInput[];
    NOT?: Prisma.IngredientScalarWhereInput | Prisma.IngredientScalarWhereInput[];
    ingredient_id?: Prisma.UuidFilter<"Ingredient"> | string;
    unit_id?: Prisma.UuidFilter<"Ingredient"> | string;
    name?: Prisma.StringFilter<"Ingredient"> | string;
    type?: Prisma.StringFilter<"Ingredient"> | string;
    stock_qty?: Prisma.DecimalFilter<"Ingredient"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalFilter<"Ingredient"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalFilter<"Ingredient"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFilter<"Ingredient"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"Ingredient"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"Ingredient"> | Date | string | null;
};
export type IngredientCreateWithoutStock_movementsInput = {
    ingredient_id?: string;
    name: string;
    type: string;
    stock_qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    child_compositions?: Prisma.IngredientCompositionCreateNestedManyWithoutChild_ingredientInput;
    parent_compositions?: Prisma.IngredientCompositionCreateNestedManyWithoutParent_ingredientInput;
    unit: Prisma.UnitMeasureCreateNestedOneWithoutIngredientsInput;
    menu_recipes?: Prisma.MenuRecipeCreateNestedManyWithoutIngredientInput;
    stock_opname_items?: Prisma.StockOpnameItemCreateNestedManyWithoutIngredientInput;
};
export type IngredientUncheckedCreateWithoutStock_movementsInput = {
    ingredient_id?: string;
    unit_id: string;
    name: string;
    type: string;
    stock_qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    child_compositions?: Prisma.IngredientCompositionUncheckedCreateNestedManyWithoutChild_ingredientInput;
    parent_compositions?: Prisma.IngredientCompositionUncheckedCreateNestedManyWithoutParent_ingredientInput;
    menu_recipes?: Prisma.MenuRecipeUncheckedCreateNestedManyWithoutIngredientInput;
    stock_opname_items?: Prisma.StockOpnameItemUncheckedCreateNestedManyWithoutIngredientInput;
};
export type IngredientCreateOrConnectWithoutStock_movementsInput = {
    where: Prisma.IngredientWhereUniqueInput;
    create: Prisma.XOR<Prisma.IngredientCreateWithoutStock_movementsInput, Prisma.IngredientUncheckedCreateWithoutStock_movementsInput>;
};
export type IngredientUpsertWithoutStock_movementsInput = {
    update: Prisma.XOR<Prisma.IngredientUpdateWithoutStock_movementsInput, Prisma.IngredientUncheckedUpdateWithoutStock_movementsInput>;
    create: Prisma.XOR<Prisma.IngredientCreateWithoutStock_movementsInput, Prisma.IngredientUncheckedCreateWithoutStock_movementsInput>;
    where?: Prisma.IngredientWhereInput;
};
export type IngredientUpdateToOneWithWhereWithoutStock_movementsInput = {
    where?: Prisma.IngredientWhereInput;
    data: Prisma.XOR<Prisma.IngredientUpdateWithoutStock_movementsInput, Prisma.IngredientUncheckedUpdateWithoutStock_movementsInput>;
};
export type IngredientUpdateWithoutStock_movementsInput = {
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    child_compositions?: Prisma.IngredientCompositionUpdateManyWithoutChild_ingredientNestedInput;
    parent_compositions?: Prisma.IngredientCompositionUpdateManyWithoutParent_ingredientNestedInput;
    unit?: Prisma.UnitMeasureUpdateOneRequiredWithoutIngredientsNestedInput;
    menu_recipes?: Prisma.MenuRecipeUpdateManyWithoutIngredientNestedInput;
    stock_opname_items?: Prisma.StockOpnameItemUpdateManyWithoutIngredientNestedInput;
};
export type IngredientUncheckedUpdateWithoutStock_movementsInput = {
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    unit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    child_compositions?: Prisma.IngredientCompositionUncheckedUpdateManyWithoutChild_ingredientNestedInput;
    parent_compositions?: Prisma.IngredientCompositionUncheckedUpdateManyWithoutParent_ingredientNestedInput;
    menu_recipes?: Prisma.MenuRecipeUncheckedUpdateManyWithoutIngredientNestedInput;
    stock_opname_items?: Prisma.StockOpnameItemUncheckedUpdateManyWithoutIngredientNestedInput;
};
export type IngredientCreateWithoutStock_opname_itemsInput = {
    ingredient_id?: string;
    name: string;
    type: string;
    stock_qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    child_compositions?: Prisma.IngredientCompositionCreateNestedManyWithoutChild_ingredientInput;
    parent_compositions?: Prisma.IngredientCompositionCreateNestedManyWithoutParent_ingredientInput;
    unit: Prisma.UnitMeasureCreateNestedOneWithoutIngredientsInput;
    menu_recipes?: Prisma.MenuRecipeCreateNestedManyWithoutIngredientInput;
    stock_movements?: Prisma.StockMovementCreateNestedManyWithoutIngredientInput;
};
export type IngredientUncheckedCreateWithoutStock_opname_itemsInput = {
    ingredient_id?: string;
    unit_id: string;
    name: string;
    type: string;
    stock_qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    child_compositions?: Prisma.IngredientCompositionUncheckedCreateNestedManyWithoutChild_ingredientInput;
    parent_compositions?: Prisma.IngredientCompositionUncheckedCreateNestedManyWithoutParent_ingredientInput;
    menu_recipes?: Prisma.MenuRecipeUncheckedCreateNestedManyWithoutIngredientInput;
    stock_movements?: Prisma.StockMovementUncheckedCreateNestedManyWithoutIngredientInput;
};
export type IngredientCreateOrConnectWithoutStock_opname_itemsInput = {
    where: Prisma.IngredientWhereUniqueInput;
    create: Prisma.XOR<Prisma.IngredientCreateWithoutStock_opname_itemsInput, Prisma.IngredientUncheckedCreateWithoutStock_opname_itemsInput>;
};
export type IngredientUpsertWithoutStock_opname_itemsInput = {
    update: Prisma.XOR<Prisma.IngredientUpdateWithoutStock_opname_itemsInput, Prisma.IngredientUncheckedUpdateWithoutStock_opname_itemsInput>;
    create: Prisma.XOR<Prisma.IngredientCreateWithoutStock_opname_itemsInput, Prisma.IngredientUncheckedCreateWithoutStock_opname_itemsInput>;
    where?: Prisma.IngredientWhereInput;
};
export type IngredientUpdateToOneWithWhereWithoutStock_opname_itemsInput = {
    where?: Prisma.IngredientWhereInput;
    data: Prisma.XOR<Prisma.IngredientUpdateWithoutStock_opname_itemsInput, Prisma.IngredientUncheckedUpdateWithoutStock_opname_itemsInput>;
};
export type IngredientUpdateWithoutStock_opname_itemsInput = {
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    child_compositions?: Prisma.IngredientCompositionUpdateManyWithoutChild_ingredientNestedInput;
    parent_compositions?: Prisma.IngredientCompositionUpdateManyWithoutParent_ingredientNestedInput;
    unit?: Prisma.UnitMeasureUpdateOneRequiredWithoutIngredientsNestedInput;
    menu_recipes?: Prisma.MenuRecipeUpdateManyWithoutIngredientNestedInput;
    stock_movements?: Prisma.StockMovementUpdateManyWithoutIngredientNestedInput;
};
export type IngredientUncheckedUpdateWithoutStock_opname_itemsInput = {
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    unit_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    child_compositions?: Prisma.IngredientCompositionUncheckedUpdateManyWithoutChild_ingredientNestedInput;
    parent_compositions?: Prisma.IngredientCompositionUncheckedUpdateManyWithoutParent_ingredientNestedInput;
    menu_recipes?: Prisma.MenuRecipeUncheckedUpdateManyWithoutIngredientNestedInput;
    stock_movements?: Prisma.StockMovementUncheckedUpdateManyWithoutIngredientNestedInput;
};
export type IngredientCreateManyUnitInput = {
    ingredient_id?: string;
    name: string;
    type: string;
    stock_qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type IngredientUpdateWithoutUnitInput = {
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    child_compositions?: Prisma.IngredientCompositionUpdateManyWithoutChild_ingredientNestedInput;
    parent_compositions?: Prisma.IngredientCompositionUpdateManyWithoutParent_ingredientNestedInput;
    menu_recipes?: Prisma.MenuRecipeUpdateManyWithoutIngredientNestedInput;
    stock_movements?: Prisma.StockMovementUpdateManyWithoutIngredientNestedInput;
    stock_opname_items?: Prisma.StockOpnameItemUpdateManyWithoutIngredientNestedInput;
};
export type IngredientUncheckedUpdateWithoutUnitInput = {
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    child_compositions?: Prisma.IngredientCompositionUncheckedUpdateManyWithoutChild_ingredientNestedInput;
    parent_compositions?: Prisma.IngredientCompositionUncheckedUpdateManyWithoutParent_ingredientNestedInput;
    menu_recipes?: Prisma.MenuRecipeUncheckedUpdateManyWithoutIngredientNestedInput;
    stock_movements?: Prisma.StockMovementUncheckedUpdateManyWithoutIngredientNestedInput;
    stock_opname_items?: Prisma.StockOpnameItemUncheckedUpdateManyWithoutIngredientNestedInput;
};
export type IngredientUncheckedUpdateManyWithoutUnitInput = {
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    stock_qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    min_stock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avg_cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type IngredientCountOutputType
 */
export type IngredientCountOutputType = {
    child_compositions: number;
    parent_compositions: number;
    menu_recipes: number;
    stock_movements: number;
    stock_opname_items: number;
};
export type IngredientCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    child_compositions?: boolean | IngredientCountOutputTypeCountChild_compositionsArgs;
    parent_compositions?: boolean | IngredientCountOutputTypeCountParent_compositionsArgs;
    menu_recipes?: boolean | IngredientCountOutputTypeCountMenu_recipesArgs;
    stock_movements?: boolean | IngredientCountOutputTypeCountStock_movementsArgs;
    stock_opname_items?: boolean | IngredientCountOutputTypeCountStock_opname_itemsArgs;
};
/**
 * IngredientCountOutputType without action
 */
export type IngredientCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IngredientCountOutputType
     */
    select?: Prisma.IngredientCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * IngredientCountOutputType without action
 */
export type IngredientCountOutputTypeCountChild_compositionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IngredientCompositionWhereInput;
};
/**
 * IngredientCountOutputType without action
 */
export type IngredientCountOutputTypeCountParent_compositionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IngredientCompositionWhereInput;
};
/**
 * IngredientCountOutputType without action
 */
export type IngredientCountOutputTypeCountMenu_recipesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MenuRecipeWhereInput;
};
/**
 * IngredientCountOutputType without action
 */
export type IngredientCountOutputTypeCountStock_movementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockMovementWhereInput;
};
/**
 * IngredientCountOutputType without action
 */
export type IngredientCountOutputTypeCountStock_opname_itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockOpnameItemWhereInput;
};
export type IngredientSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ingredient_id?: boolean;
    unit_id?: boolean;
    name?: boolean;
    type?: boolean;
    stock_qty?: boolean;
    min_stock?: boolean;
    avg_cost?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    child_compositions?: boolean | Prisma.Ingredient$child_compositionsArgs<ExtArgs>;
    parent_compositions?: boolean | Prisma.Ingredient$parent_compositionsArgs<ExtArgs>;
    unit?: boolean | Prisma.UnitMeasureDefaultArgs<ExtArgs>;
    menu_recipes?: boolean | Prisma.Ingredient$menu_recipesArgs<ExtArgs>;
    stock_movements?: boolean | Prisma.Ingredient$stock_movementsArgs<ExtArgs>;
    stock_opname_items?: boolean | Prisma.Ingredient$stock_opname_itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.IngredientCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ingredient"]>;
export type IngredientSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ingredient_id?: boolean;
    unit_id?: boolean;
    name?: boolean;
    type?: boolean;
    stock_qty?: boolean;
    min_stock?: boolean;
    avg_cost?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    unit?: boolean | Prisma.UnitMeasureDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ingredient"]>;
export type IngredientSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ingredient_id?: boolean;
    unit_id?: boolean;
    name?: boolean;
    type?: boolean;
    stock_qty?: boolean;
    min_stock?: boolean;
    avg_cost?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    unit?: boolean | Prisma.UnitMeasureDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ingredient"]>;
export type IngredientSelectScalar = {
    ingredient_id?: boolean;
    unit_id?: boolean;
    name?: boolean;
    type?: boolean;
    stock_qty?: boolean;
    min_stock?: boolean;
    avg_cost?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
};
export type IngredientOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"ingredient_id" | "unit_id" | "name" | "type" | "stock_qty" | "min_stock" | "avg_cost" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["ingredient"]>;
export type IngredientInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    child_compositions?: boolean | Prisma.Ingredient$child_compositionsArgs<ExtArgs>;
    parent_compositions?: boolean | Prisma.Ingredient$parent_compositionsArgs<ExtArgs>;
    unit?: boolean | Prisma.UnitMeasureDefaultArgs<ExtArgs>;
    menu_recipes?: boolean | Prisma.Ingredient$menu_recipesArgs<ExtArgs>;
    stock_movements?: boolean | Prisma.Ingredient$stock_movementsArgs<ExtArgs>;
    stock_opname_items?: boolean | Prisma.Ingredient$stock_opname_itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.IngredientCountOutputTypeDefaultArgs<ExtArgs>;
};
export type IngredientIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    unit?: boolean | Prisma.UnitMeasureDefaultArgs<ExtArgs>;
};
export type IngredientIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    unit?: boolean | Prisma.UnitMeasureDefaultArgs<ExtArgs>;
};
export type $IngredientPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Ingredient";
    objects: {
        child_compositions: Prisma.$IngredientCompositionPayload<ExtArgs>[];
        parent_compositions: Prisma.$IngredientCompositionPayload<ExtArgs>[];
        unit: Prisma.$UnitMeasurePayload<ExtArgs>;
        menu_recipes: Prisma.$MenuRecipePayload<ExtArgs>[];
        stock_movements: Prisma.$StockMovementPayload<ExtArgs>[];
        stock_opname_items: Prisma.$StockOpnameItemPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        ingredient_id: string;
        unit_id: string;
        name: string;
        type: string;
        stock_qty: runtime.Decimal;
        min_stock: runtime.Decimal;
        avg_cost: runtime.Decimal;
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
    }, ExtArgs["result"]["ingredient"]>;
    composites: {};
};
export type IngredientGetPayload<S extends boolean | null | undefined | IngredientDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$IngredientPayload, S>;
export type IngredientCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<IngredientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IngredientCountAggregateInputType | true;
};
export interface IngredientDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Ingredient'];
        meta: {
            name: 'Ingredient';
        };
    };
    /**
     * Find zero or one Ingredient that matches the filter.
     * @param {IngredientFindUniqueArgs} args - Arguments to find a Ingredient
     * @example
     * // Get one Ingredient
     * const ingredient = await prisma.ingredient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IngredientFindUniqueArgs>(args: Prisma.SelectSubset<T, IngredientFindUniqueArgs<ExtArgs>>): Prisma.Prisma__IngredientClient<runtime.Types.Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Ingredient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IngredientFindUniqueOrThrowArgs} args - Arguments to find a Ingredient
     * @example
     * // Get one Ingredient
     * const ingredient = await prisma.ingredient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IngredientFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, IngredientFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__IngredientClient<runtime.Types.Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Ingredient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientFindFirstArgs} args - Arguments to find a Ingredient
     * @example
     * // Get one Ingredient
     * const ingredient = await prisma.ingredient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IngredientFindFirstArgs>(args?: Prisma.SelectSubset<T, IngredientFindFirstArgs<ExtArgs>>): Prisma.Prisma__IngredientClient<runtime.Types.Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Ingredient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientFindFirstOrThrowArgs} args - Arguments to find a Ingredient
     * @example
     * // Get one Ingredient
     * const ingredient = await prisma.ingredient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IngredientFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, IngredientFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__IngredientClient<runtime.Types.Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Ingredients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ingredients
     * const ingredients = await prisma.ingredient.findMany()
     *
     * // Get first 10 Ingredients
     * const ingredients = await prisma.ingredient.findMany({ take: 10 })
     *
     * // Only select the `ingredient_id`
     * const ingredientWithIngredient_idOnly = await prisma.ingredient.findMany({ select: { ingredient_id: true } })
     *
     */
    findMany<T extends IngredientFindManyArgs>(args?: Prisma.SelectSubset<T, IngredientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Ingredient.
     * @param {IngredientCreateArgs} args - Arguments to create a Ingredient.
     * @example
     * // Create one Ingredient
     * const Ingredient = await prisma.ingredient.create({
     *   data: {
     *     // ... data to create a Ingredient
     *   }
     * })
     *
     */
    create<T extends IngredientCreateArgs>(args: Prisma.SelectSubset<T, IngredientCreateArgs<ExtArgs>>): Prisma.Prisma__IngredientClient<runtime.Types.Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Ingredients.
     * @param {IngredientCreateManyArgs} args - Arguments to create many Ingredients.
     * @example
     * // Create many Ingredients
     * const ingredient = await prisma.ingredient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends IngredientCreateManyArgs>(args?: Prisma.SelectSubset<T, IngredientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Ingredients and returns the data saved in the database.
     * @param {IngredientCreateManyAndReturnArgs} args - Arguments to create many Ingredients.
     * @example
     * // Create many Ingredients
     * const ingredient = await prisma.ingredient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Ingredients and only return the `ingredient_id`
     * const ingredientWithIngredient_idOnly = await prisma.ingredient.createManyAndReturn({
     *   select: { ingredient_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends IngredientCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, IngredientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Ingredient.
     * @param {IngredientDeleteArgs} args - Arguments to delete one Ingredient.
     * @example
     * // Delete one Ingredient
     * const Ingredient = await prisma.ingredient.delete({
     *   where: {
     *     // ... filter to delete one Ingredient
     *   }
     * })
     *
     */
    delete<T extends IngredientDeleteArgs>(args: Prisma.SelectSubset<T, IngredientDeleteArgs<ExtArgs>>): Prisma.Prisma__IngredientClient<runtime.Types.Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Ingredient.
     * @param {IngredientUpdateArgs} args - Arguments to update one Ingredient.
     * @example
     * // Update one Ingredient
     * const ingredient = await prisma.ingredient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends IngredientUpdateArgs>(args: Prisma.SelectSubset<T, IngredientUpdateArgs<ExtArgs>>): Prisma.Prisma__IngredientClient<runtime.Types.Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Ingredients.
     * @param {IngredientDeleteManyArgs} args - Arguments to filter Ingredients to delete.
     * @example
     * // Delete a few Ingredients
     * const { count } = await prisma.ingredient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends IngredientDeleteManyArgs>(args?: Prisma.SelectSubset<T, IngredientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ingredients
     * const ingredient = await prisma.ingredient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends IngredientUpdateManyArgs>(args: Prisma.SelectSubset<T, IngredientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Ingredients and returns the data updated in the database.
     * @param {IngredientUpdateManyAndReturnArgs} args - Arguments to update many Ingredients.
     * @example
     * // Update many Ingredients
     * const ingredient = await prisma.ingredient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Ingredients and only return the `ingredient_id`
     * const ingredientWithIngredient_idOnly = await prisma.ingredient.updateManyAndReturn({
     *   select: { ingredient_id: true },
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
    updateManyAndReturn<T extends IngredientUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, IngredientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Ingredient.
     * @param {IngredientUpsertArgs} args - Arguments to update or create a Ingredient.
     * @example
     * // Update or create a Ingredient
     * const ingredient = await prisma.ingredient.upsert({
     *   create: {
     *     // ... data to create a Ingredient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ingredient we want to update
     *   }
     * })
     */
    upsert<T extends IngredientUpsertArgs>(args: Prisma.SelectSubset<T, IngredientUpsertArgs<ExtArgs>>): Prisma.Prisma__IngredientClient<runtime.Types.Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientCountArgs} args - Arguments to filter Ingredients to count.
     * @example
     * // Count the number of Ingredients
     * const count = await prisma.ingredient.count({
     *   where: {
     *     // ... the filter for the Ingredients we want to count
     *   }
     * })
    **/
    count<T extends IngredientCountArgs>(args?: Prisma.Subset<T, IngredientCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IngredientCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Ingredient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IngredientAggregateArgs>(args: Prisma.Subset<T, IngredientAggregateArgs>): Prisma.PrismaPromise<GetIngredientAggregateType<T>>;
    /**
     * Group by Ingredient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientGroupByArgs} args - Group by arguments.
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
    groupBy<T extends IngredientGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: IngredientGroupByArgs['orderBy'];
    } : {
        orderBy?: IngredientGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, IngredientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIngredientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Ingredient model
     */
    readonly fields: IngredientFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Ingredient.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__IngredientClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    child_compositions<T extends Prisma.Ingredient$child_compositionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Ingredient$child_compositionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IngredientCompositionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    parent_compositions<T extends Prisma.Ingredient$parent_compositionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Ingredient$parent_compositionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IngredientCompositionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    unit<T extends Prisma.UnitMeasureDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UnitMeasureDefaultArgs<ExtArgs>>): Prisma.Prisma__UnitMeasureClient<runtime.Types.Result.GetResult<Prisma.$UnitMeasurePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    menu_recipes<T extends Prisma.Ingredient$menu_recipesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Ingredient$menu_recipesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MenuRecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    stock_movements<T extends Prisma.Ingredient$stock_movementsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Ingredient$stock_movementsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    stock_opname_items<T extends Prisma.Ingredient$stock_opname_itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Ingredient$stock_opname_itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockOpnameItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Ingredient model
 */
export interface IngredientFieldRefs {
    readonly ingredient_id: Prisma.FieldRef<"Ingredient", 'String'>;
    readonly unit_id: Prisma.FieldRef<"Ingredient", 'String'>;
    readonly name: Prisma.FieldRef<"Ingredient", 'String'>;
    readonly type: Prisma.FieldRef<"Ingredient", 'String'>;
    readonly stock_qty: Prisma.FieldRef<"Ingredient", 'Decimal'>;
    readonly min_stock: Prisma.FieldRef<"Ingredient", 'Decimal'>;
    readonly avg_cost: Prisma.FieldRef<"Ingredient", 'Decimal'>;
    readonly created_at: Prisma.FieldRef<"Ingredient", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"Ingredient", 'DateTime'>;
    readonly deleted_at: Prisma.FieldRef<"Ingredient", 'DateTime'>;
}
/**
 * Ingredient findUnique
 */
export type IngredientFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Ingredient to fetch.
     */
    where: Prisma.IngredientWhereUniqueInput;
};
/**
 * Ingredient findUniqueOrThrow
 */
export type IngredientFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Ingredient to fetch.
     */
    where: Prisma.IngredientWhereUniqueInput;
};
/**
 * Ingredient findFirst
 */
export type IngredientFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Ingredient to fetch.
     */
    where?: Prisma.IngredientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Ingredients to fetch.
     */
    orderBy?: Prisma.IngredientOrderByWithRelationInput | Prisma.IngredientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Ingredients.
     */
    cursor?: Prisma.IngredientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Ingredients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Ingredients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Ingredients.
     */
    distinct?: Prisma.IngredientScalarFieldEnum | Prisma.IngredientScalarFieldEnum[];
};
/**
 * Ingredient findFirstOrThrow
 */
export type IngredientFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Ingredient to fetch.
     */
    where?: Prisma.IngredientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Ingredients to fetch.
     */
    orderBy?: Prisma.IngredientOrderByWithRelationInput | Prisma.IngredientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Ingredients.
     */
    cursor?: Prisma.IngredientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Ingredients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Ingredients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Ingredients.
     */
    distinct?: Prisma.IngredientScalarFieldEnum | Prisma.IngredientScalarFieldEnum[];
};
/**
 * Ingredient findMany
 */
export type IngredientFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Ingredients to fetch.
     */
    where?: Prisma.IngredientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Ingredients to fetch.
     */
    orderBy?: Prisma.IngredientOrderByWithRelationInput | Prisma.IngredientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Ingredients.
     */
    cursor?: Prisma.IngredientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Ingredients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Ingredients.
     */
    skip?: number;
    distinct?: Prisma.IngredientScalarFieldEnum | Prisma.IngredientScalarFieldEnum[];
};
/**
 * Ingredient create
 */
export type IngredientCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a Ingredient.
     */
    data: Prisma.XOR<Prisma.IngredientCreateInput, Prisma.IngredientUncheckedCreateInput>;
};
/**
 * Ingredient createMany
 */
export type IngredientCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ingredients.
     */
    data: Prisma.IngredientCreateManyInput | Prisma.IngredientCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Ingredient createManyAndReturn
 */
export type IngredientCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: Prisma.IngredientSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: Prisma.IngredientOmit<ExtArgs> | null;
    /**
     * The data used to create many Ingredients.
     */
    data: Prisma.IngredientCreateManyInput | Prisma.IngredientCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IngredientIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Ingredient update
 */
export type IngredientUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a Ingredient.
     */
    data: Prisma.XOR<Prisma.IngredientUpdateInput, Prisma.IngredientUncheckedUpdateInput>;
    /**
     * Choose, which Ingredient to update.
     */
    where: Prisma.IngredientWhereUniqueInput;
};
/**
 * Ingredient updateMany
 */
export type IngredientUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Ingredients.
     */
    data: Prisma.XOR<Prisma.IngredientUpdateManyMutationInput, Prisma.IngredientUncheckedUpdateManyInput>;
    /**
     * Filter which Ingredients to update
     */
    where?: Prisma.IngredientWhereInput;
    /**
     * Limit how many Ingredients to update.
     */
    limit?: number;
};
/**
 * Ingredient updateManyAndReturn
 */
export type IngredientUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ingredient
     */
    select?: Prisma.IngredientSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredient
     */
    omit?: Prisma.IngredientOmit<ExtArgs> | null;
    /**
     * The data used to update Ingredients.
     */
    data: Prisma.XOR<Prisma.IngredientUpdateManyMutationInput, Prisma.IngredientUncheckedUpdateManyInput>;
    /**
     * Filter which Ingredients to update
     */
    where?: Prisma.IngredientWhereInput;
    /**
     * Limit how many Ingredients to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IngredientIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Ingredient upsert
 */
export type IngredientUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the Ingredient to update in case it exists.
     */
    where: Prisma.IngredientWhereUniqueInput;
    /**
     * In case the Ingredient found by the `where` argument doesn't exist, create a new Ingredient with this data.
     */
    create: Prisma.XOR<Prisma.IngredientCreateInput, Prisma.IngredientUncheckedCreateInput>;
    /**
     * In case the Ingredient was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.IngredientUpdateInput, Prisma.IngredientUncheckedUpdateInput>;
};
/**
 * Ingredient delete
 */
export type IngredientDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which Ingredient to delete.
     */
    where: Prisma.IngredientWhereUniqueInput;
};
/**
 * Ingredient deleteMany
 */
export type IngredientDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Ingredients to delete
     */
    where?: Prisma.IngredientWhereInput;
    /**
     * Limit how many Ingredients to delete.
     */
    limit?: number;
};
/**
 * Ingredient.child_compositions
 */
export type Ingredient$child_compositionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.IngredientCompositionWhereInput;
    orderBy?: Prisma.IngredientCompositionOrderByWithRelationInput | Prisma.IngredientCompositionOrderByWithRelationInput[];
    cursor?: Prisma.IngredientCompositionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IngredientCompositionScalarFieldEnum | Prisma.IngredientCompositionScalarFieldEnum[];
};
/**
 * Ingredient.parent_compositions
 */
export type Ingredient$parent_compositionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.IngredientCompositionWhereInput;
    orderBy?: Prisma.IngredientCompositionOrderByWithRelationInput | Prisma.IngredientCompositionOrderByWithRelationInput[];
    cursor?: Prisma.IngredientCompositionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IngredientCompositionScalarFieldEnum | Prisma.IngredientCompositionScalarFieldEnum[];
};
/**
 * Ingredient.menu_recipes
 */
export type Ingredient$menu_recipesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuRecipe
     */
    select?: Prisma.MenuRecipeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuRecipe
     */
    omit?: Prisma.MenuRecipeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuRecipeInclude<ExtArgs> | null;
    where?: Prisma.MenuRecipeWhereInput;
    orderBy?: Prisma.MenuRecipeOrderByWithRelationInput | Prisma.MenuRecipeOrderByWithRelationInput[];
    cursor?: Prisma.MenuRecipeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MenuRecipeScalarFieldEnum | Prisma.MenuRecipeScalarFieldEnum[];
};
/**
 * Ingredient.stock_movements
 */
export type Ingredient$stock_movementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Ingredient.stock_opname_items
 */
export type Ingredient$stock_opname_itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Ingredient without action
 */
export type IngredientDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=Ingredient.d.ts.map