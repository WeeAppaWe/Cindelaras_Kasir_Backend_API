import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model MenuRecipe
 *
 */
export type MenuRecipeModel = runtime.Types.Result.DefaultSelection<Prisma.$MenuRecipePayload>;
export type AggregateMenuRecipe = {
    _count: MenuRecipeCountAggregateOutputType | null;
    _avg: MenuRecipeAvgAggregateOutputType | null;
    _sum: MenuRecipeSumAggregateOutputType | null;
    _min: MenuRecipeMinAggregateOutputType | null;
    _max: MenuRecipeMaxAggregateOutputType | null;
};
export type MenuRecipeAvgAggregateOutputType = {
    qty_needed: runtime.Decimal | null;
};
export type MenuRecipeSumAggregateOutputType = {
    qty_needed: runtime.Decimal | null;
};
export type MenuRecipeMinAggregateOutputType = {
    menu_recipe_id: string | null;
    menu_id: string | null;
    ingredient_id: string | null;
    qty_needed: runtime.Decimal | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
export type MenuRecipeMaxAggregateOutputType = {
    menu_recipe_id: string | null;
    menu_id: string | null;
    ingredient_id: string | null;
    qty_needed: runtime.Decimal | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
export type MenuRecipeCountAggregateOutputType = {
    menu_recipe_id: number;
    menu_id: number;
    ingredient_id: number;
    qty_needed: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
};
export type MenuRecipeAvgAggregateInputType = {
    qty_needed?: true;
};
export type MenuRecipeSumAggregateInputType = {
    qty_needed?: true;
};
export type MenuRecipeMinAggregateInputType = {
    menu_recipe_id?: true;
    menu_id?: true;
    ingredient_id?: true;
    qty_needed?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
};
export type MenuRecipeMaxAggregateInputType = {
    menu_recipe_id?: true;
    menu_id?: true;
    ingredient_id?: true;
    qty_needed?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
};
export type MenuRecipeCountAggregateInputType = {
    menu_recipe_id?: true;
    menu_id?: true;
    ingredient_id?: true;
    qty_needed?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
};
export type MenuRecipeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MenuRecipe to aggregate.
     */
    where?: Prisma.MenuRecipeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MenuRecipes to fetch.
     */
    orderBy?: Prisma.MenuRecipeOrderByWithRelationInput | Prisma.MenuRecipeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.MenuRecipeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MenuRecipes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MenuRecipes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MenuRecipes
    **/
    _count?: true | MenuRecipeCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: MenuRecipeAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: MenuRecipeSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MenuRecipeMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MenuRecipeMaxAggregateInputType;
};
export type GetMenuRecipeAggregateType<T extends MenuRecipeAggregateArgs> = {
    [P in keyof T & keyof AggregateMenuRecipe]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMenuRecipe[P]> : Prisma.GetScalarType<T[P], AggregateMenuRecipe[P]>;
};
export type MenuRecipeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MenuRecipeWhereInput;
    orderBy?: Prisma.MenuRecipeOrderByWithAggregationInput | Prisma.MenuRecipeOrderByWithAggregationInput[];
    by: Prisma.MenuRecipeScalarFieldEnum[] | Prisma.MenuRecipeScalarFieldEnum;
    having?: Prisma.MenuRecipeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MenuRecipeCountAggregateInputType | true;
    _avg?: MenuRecipeAvgAggregateInputType;
    _sum?: MenuRecipeSumAggregateInputType;
    _min?: MenuRecipeMinAggregateInputType;
    _max?: MenuRecipeMaxAggregateInputType;
};
export type MenuRecipeGroupByOutputType = {
    menu_recipe_id: string;
    menu_id: string;
    ingredient_id: string;
    qty_needed: runtime.Decimal;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    _count: MenuRecipeCountAggregateOutputType | null;
    _avg: MenuRecipeAvgAggregateOutputType | null;
    _sum: MenuRecipeSumAggregateOutputType | null;
    _min: MenuRecipeMinAggregateOutputType | null;
    _max: MenuRecipeMaxAggregateOutputType | null;
};
type GetMenuRecipeGroupByPayload<T extends MenuRecipeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MenuRecipeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MenuRecipeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MenuRecipeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MenuRecipeGroupByOutputType[P]>;
}>>;
export type MenuRecipeWhereInput = {
    AND?: Prisma.MenuRecipeWhereInput | Prisma.MenuRecipeWhereInput[];
    OR?: Prisma.MenuRecipeWhereInput[];
    NOT?: Prisma.MenuRecipeWhereInput | Prisma.MenuRecipeWhereInput[];
    menu_recipe_id?: Prisma.UuidFilter<"MenuRecipe"> | string;
    menu_id?: Prisma.UuidFilter<"MenuRecipe"> | string;
    ingredient_id?: Prisma.UuidFilter<"MenuRecipe"> | string;
    qty_needed?: Prisma.DecimalFilter<"MenuRecipe"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFilter<"MenuRecipe"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"MenuRecipe"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"MenuRecipe"> | Date | string | null;
    ingredient?: Prisma.XOR<Prisma.IngredientScalarRelationFilter, Prisma.IngredientWhereInput>;
    menu?: Prisma.XOR<Prisma.MenuScalarRelationFilter, Prisma.MenuWhereInput>;
};
export type MenuRecipeOrderByWithRelationInput = {
    menu_recipe_id?: Prisma.SortOrder;
    menu_id?: Prisma.SortOrder;
    ingredient_id?: Prisma.SortOrder;
    qty_needed?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    ingredient?: Prisma.IngredientOrderByWithRelationInput;
    menu?: Prisma.MenuOrderByWithRelationInput;
};
export type MenuRecipeWhereUniqueInput = Prisma.AtLeast<{
    menu_recipe_id?: string;
    menu_id_ingredient_id?: Prisma.MenuRecipeMenu_idIngredient_idCompoundUniqueInput;
    AND?: Prisma.MenuRecipeWhereInput | Prisma.MenuRecipeWhereInput[];
    OR?: Prisma.MenuRecipeWhereInput[];
    NOT?: Prisma.MenuRecipeWhereInput | Prisma.MenuRecipeWhereInput[];
    menu_id?: Prisma.UuidFilter<"MenuRecipe"> | string;
    ingredient_id?: Prisma.UuidFilter<"MenuRecipe"> | string;
    qty_needed?: Prisma.DecimalFilter<"MenuRecipe"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFilter<"MenuRecipe"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"MenuRecipe"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"MenuRecipe"> | Date | string | null;
    ingredient?: Prisma.XOR<Prisma.IngredientScalarRelationFilter, Prisma.IngredientWhereInput>;
    menu?: Prisma.XOR<Prisma.MenuScalarRelationFilter, Prisma.MenuWhereInput>;
}, "menu_recipe_id" | "menu_id_ingredient_id">;
export type MenuRecipeOrderByWithAggregationInput = {
    menu_recipe_id?: Prisma.SortOrder;
    menu_id?: Prisma.SortOrder;
    ingredient_id?: Prisma.SortOrder;
    qty_needed?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.MenuRecipeCountOrderByAggregateInput;
    _avg?: Prisma.MenuRecipeAvgOrderByAggregateInput;
    _max?: Prisma.MenuRecipeMaxOrderByAggregateInput;
    _min?: Prisma.MenuRecipeMinOrderByAggregateInput;
    _sum?: Prisma.MenuRecipeSumOrderByAggregateInput;
};
export type MenuRecipeScalarWhereWithAggregatesInput = {
    AND?: Prisma.MenuRecipeScalarWhereWithAggregatesInput | Prisma.MenuRecipeScalarWhereWithAggregatesInput[];
    OR?: Prisma.MenuRecipeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MenuRecipeScalarWhereWithAggregatesInput | Prisma.MenuRecipeScalarWhereWithAggregatesInput[];
    menu_recipe_id?: Prisma.UuidWithAggregatesFilter<"MenuRecipe"> | string;
    menu_id?: Prisma.UuidWithAggregatesFilter<"MenuRecipe"> | string;
    ingredient_id?: Prisma.UuidWithAggregatesFilter<"MenuRecipe"> | string;
    qty_needed?: Prisma.DecimalWithAggregatesFilter<"MenuRecipe"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"MenuRecipe"> | Date | string;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"MenuRecipe"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableWithAggregatesFilter<"MenuRecipe"> | Date | string | null;
};
export type MenuRecipeCreateInput = {
    menu_recipe_id?: string;
    qty_needed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    ingredient: Prisma.IngredientCreateNestedOneWithoutMenu_recipesInput;
    menu: Prisma.MenuCreateNestedOneWithoutRecipesInput;
};
export type MenuRecipeUncheckedCreateInput = {
    menu_recipe_id?: string;
    menu_id: string;
    ingredient_id: string;
    qty_needed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type MenuRecipeUpdateInput = {
    menu_recipe_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty_needed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ingredient?: Prisma.IngredientUpdateOneRequiredWithoutMenu_recipesNestedInput;
    menu?: Prisma.MenuUpdateOneRequiredWithoutRecipesNestedInput;
};
export type MenuRecipeUncheckedUpdateInput = {
    menu_recipe_id?: Prisma.StringFieldUpdateOperationsInput | string;
    menu_id?: Prisma.StringFieldUpdateOperationsInput | string;
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty_needed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MenuRecipeCreateManyInput = {
    menu_recipe_id?: string;
    menu_id: string;
    ingredient_id: string;
    qty_needed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type MenuRecipeUpdateManyMutationInput = {
    menu_recipe_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty_needed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MenuRecipeUncheckedUpdateManyInput = {
    menu_recipe_id?: Prisma.StringFieldUpdateOperationsInput | string;
    menu_id?: Prisma.StringFieldUpdateOperationsInput | string;
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty_needed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MenuRecipeListRelationFilter = {
    every?: Prisma.MenuRecipeWhereInput;
    some?: Prisma.MenuRecipeWhereInput;
    none?: Prisma.MenuRecipeWhereInput;
};
export type MenuRecipeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MenuRecipeMenu_idIngredient_idCompoundUniqueInput = {
    menu_id: string;
    ingredient_id: string;
};
export type MenuRecipeCountOrderByAggregateInput = {
    menu_recipe_id?: Prisma.SortOrder;
    menu_id?: Prisma.SortOrder;
    ingredient_id?: Prisma.SortOrder;
    qty_needed?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type MenuRecipeAvgOrderByAggregateInput = {
    qty_needed?: Prisma.SortOrder;
};
export type MenuRecipeMaxOrderByAggregateInput = {
    menu_recipe_id?: Prisma.SortOrder;
    menu_id?: Prisma.SortOrder;
    ingredient_id?: Prisma.SortOrder;
    qty_needed?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type MenuRecipeMinOrderByAggregateInput = {
    menu_recipe_id?: Prisma.SortOrder;
    menu_id?: Prisma.SortOrder;
    ingredient_id?: Prisma.SortOrder;
    qty_needed?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type MenuRecipeSumOrderByAggregateInput = {
    qty_needed?: Prisma.SortOrder;
};
export type MenuRecipeCreateNestedManyWithoutIngredientInput = {
    create?: Prisma.XOR<Prisma.MenuRecipeCreateWithoutIngredientInput, Prisma.MenuRecipeUncheckedCreateWithoutIngredientInput> | Prisma.MenuRecipeCreateWithoutIngredientInput[] | Prisma.MenuRecipeUncheckedCreateWithoutIngredientInput[];
    connectOrCreate?: Prisma.MenuRecipeCreateOrConnectWithoutIngredientInput | Prisma.MenuRecipeCreateOrConnectWithoutIngredientInput[];
    createMany?: Prisma.MenuRecipeCreateManyIngredientInputEnvelope;
    connect?: Prisma.MenuRecipeWhereUniqueInput | Prisma.MenuRecipeWhereUniqueInput[];
};
export type MenuRecipeUncheckedCreateNestedManyWithoutIngredientInput = {
    create?: Prisma.XOR<Prisma.MenuRecipeCreateWithoutIngredientInput, Prisma.MenuRecipeUncheckedCreateWithoutIngredientInput> | Prisma.MenuRecipeCreateWithoutIngredientInput[] | Prisma.MenuRecipeUncheckedCreateWithoutIngredientInput[];
    connectOrCreate?: Prisma.MenuRecipeCreateOrConnectWithoutIngredientInput | Prisma.MenuRecipeCreateOrConnectWithoutIngredientInput[];
    createMany?: Prisma.MenuRecipeCreateManyIngredientInputEnvelope;
    connect?: Prisma.MenuRecipeWhereUniqueInput | Prisma.MenuRecipeWhereUniqueInput[];
};
export type MenuRecipeUpdateManyWithoutIngredientNestedInput = {
    create?: Prisma.XOR<Prisma.MenuRecipeCreateWithoutIngredientInput, Prisma.MenuRecipeUncheckedCreateWithoutIngredientInput> | Prisma.MenuRecipeCreateWithoutIngredientInput[] | Prisma.MenuRecipeUncheckedCreateWithoutIngredientInput[];
    connectOrCreate?: Prisma.MenuRecipeCreateOrConnectWithoutIngredientInput | Prisma.MenuRecipeCreateOrConnectWithoutIngredientInput[];
    upsert?: Prisma.MenuRecipeUpsertWithWhereUniqueWithoutIngredientInput | Prisma.MenuRecipeUpsertWithWhereUniqueWithoutIngredientInput[];
    createMany?: Prisma.MenuRecipeCreateManyIngredientInputEnvelope;
    set?: Prisma.MenuRecipeWhereUniqueInput | Prisma.MenuRecipeWhereUniqueInput[];
    disconnect?: Prisma.MenuRecipeWhereUniqueInput | Prisma.MenuRecipeWhereUniqueInput[];
    delete?: Prisma.MenuRecipeWhereUniqueInput | Prisma.MenuRecipeWhereUniqueInput[];
    connect?: Prisma.MenuRecipeWhereUniqueInput | Prisma.MenuRecipeWhereUniqueInput[];
    update?: Prisma.MenuRecipeUpdateWithWhereUniqueWithoutIngredientInput | Prisma.MenuRecipeUpdateWithWhereUniqueWithoutIngredientInput[];
    updateMany?: Prisma.MenuRecipeUpdateManyWithWhereWithoutIngredientInput | Prisma.MenuRecipeUpdateManyWithWhereWithoutIngredientInput[];
    deleteMany?: Prisma.MenuRecipeScalarWhereInput | Prisma.MenuRecipeScalarWhereInput[];
};
export type MenuRecipeUncheckedUpdateManyWithoutIngredientNestedInput = {
    create?: Prisma.XOR<Prisma.MenuRecipeCreateWithoutIngredientInput, Prisma.MenuRecipeUncheckedCreateWithoutIngredientInput> | Prisma.MenuRecipeCreateWithoutIngredientInput[] | Prisma.MenuRecipeUncheckedCreateWithoutIngredientInput[];
    connectOrCreate?: Prisma.MenuRecipeCreateOrConnectWithoutIngredientInput | Prisma.MenuRecipeCreateOrConnectWithoutIngredientInput[];
    upsert?: Prisma.MenuRecipeUpsertWithWhereUniqueWithoutIngredientInput | Prisma.MenuRecipeUpsertWithWhereUniqueWithoutIngredientInput[];
    createMany?: Prisma.MenuRecipeCreateManyIngredientInputEnvelope;
    set?: Prisma.MenuRecipeWhereUniqueInput | Prisma.MenuRecipeWhereUniqueInput[];
    disconnect?: Prisma.MenuRecipeWhereUniqueInput | Prisma.MenuRecipeWhereUniqueInput[];
    delete?: Prisma.MenuRecipeWhereUniqueInput | Prisma.MenuRecipeWhereUniqueInput[];
    connect?: Prisma.MenuRecipeWhereUniqueInput | Prisma.MenuRecipeWhereUniqueInput[];
    update?: Prisma.MenuRecipeUpdateWithWhereUniqueWithoutIngredientInput | Prisma.MenuRecipeUpdateWithWhereUniqueWithoutIngredientInput[];
    updateMany?: Prisma.MenuRecipeUpdateManyWithWhereWithoutIngredientInput | Prisma.MenuRecipeUpdateManyWithWhereWithoutIngredientInput[];
    deleteMany?: Prisma.MenuRecipeScalarWhereInput | Prisma.MenuRecipeScalarWhereInput[];
};
export type MenuRecipeCreateNestedManyWithoutMenuInput = {
    create?: Prisma.XOR<Prisma.MenuRecipeCreateWithoutMenuInput, Prisma.MenuRecipeUncheckedCreateWithoutMenuInput> | Prisma.MenuRecipeCreateWithoutMenuInput[] | Prisma.MenuRecipeUncheckedCreateWithoutMenuInput[];
    connectOrCreate?: Prisma.MenuRecipeCreateOrConnectWithoutMenuInput | Prisma.MenuRecipeCreateOrConnectWithoutMenuInput[];
    createMany?: Prisma.MenuRecipeCreateManyMenuInputEnvelope;
    connect?: Prisma.MenuRecipeWhereUniqueInput | Prisma.MenuRecipeWhereUniqueInput[];
};
export type MenuRecipeUncheckedCreateNestedManyWithoutMenuInput = {
    create?: Prisma.XOR<Prisma.MenuRecipeCreateWithoutMenuInput, Prisma.MenuRecipeUncheckedCreateWithoutMenuInput> | Prisma.MenuRecipeCreateWithoutMenuInput[] | Prisma.MenuRecipeUncheckedCreateWithoutMenuInput[];
    connectOrCreate?: Prisma.MenuRecipeCreateOrConnectWithoutMenuInput | Prisma.MenuRecipeCreateOrConnectWithoutMenuInput[];
    createMany?: Prisma.MenuRecipeCreateManyMenuInputEnvelope;
    connect?: Prisma.MenuRecipeWhereUniqueInput | Prisma.MenuRecipeWhereUniqueInput[];
};
export type MenuRecipeUpdateManyWithoutMenuNestedInput = {
    create?: Prisma.XOR<Prisma.MenuRecipeCreateWithoutMenuInput, Prisma.MenuRecipeUncheckedCreateWithoutMenuInput> | Prisma.MenuRecipeCreateWithoutMenuInput[] | Prisma.MenuRecipeUncheckedCreateWithoutMenuInput[];
    connectOrCreate?: Prisma.MenuRecipeCreateOrConnectWithoutMenuInput | Prisma.MenuRecipeCreateOrConnectWithoutMenuInput[];
    upsert?: Prisma.MenuRecipeUpsertWithWhereUniqueWithoutMenuInput | Prisma.MenuRecipeUpsertWithWhereUniqueWithoutMenuInput[];
    createMany?: Prisma.MenuRecipeCreateManyMenuInputEnvelope;
    set?: Prisma.MenuRecipeWhereUniqueInput | Prisma.MenuRecipeWhereUniqueInput[];
    disconnect?: Prisma.MenuRecipeWhereUniqueInput | Prisma.MenuRecipeWhereUniqueInput[];
    delete?: Prisma.MenuRecipeWhereUniqueInput | Prisma.MenuRecipeWhereUniqueInput[];
    connect?: Prisma.MenuRecipeWhereUniqueInput | Prisma.MenuRecipeWhereUniqueInput[];
    update?: Prisma.MenuRecipeUpdateWithWhereUniqueWithoutMenuInput | Prisma.MenuRecipeUpdateWithWhereUniqueWithoutMenuInput[];
    updateMany?: Prisma.MenuRecipeUpdateManyWithWhereWithoutMenuInput | Prisma.MenuRecipeUpdateManyWithWhereWithoutMenuInput[];
    deleteMany?: Prisma.MenuRecipeScalarWhereInput | Prisma.MenuRecipeScalarWhereInput[];
};
export type MenuRecipeUncheckedUpdateManyWithoutMenuNestedInput = {
    create?: Prisma.XOR<Prisma.MenuRecipeCreateWithoutMenuInput, Prisma.MenuRecipeUncheckedCreateWithoutMenuInput> | Prisma.MenuRecipeCreateWithoutMenuInput[] | Prisma.MenuRecipeUncheckedCreateWithoutMenuInput[];
    connectOrCreate?: Prisma.MenuRecipeCreateOrConnectWithoutMenuInput | Prisma.MenuRecipeCreateOrConnectWithoutMenuInput[];
    upsert?: Prisma.MenuRecipeUpsertWithWhereUniqueWithoutMenuInput | Prisma.MenuRecipeUpsertWithWhereUniqueWithoutMenuInput[];
    createMany?: Prisma.MenuRecipeCreateManyMenuInputEnvelope;
    set?: Prisma.MenuRecipeWhereUniqueInput | Prisma.MenuRecipeWhereUniqueInput[];
    disconnect?: Prisma.MenuRecipeWhereUniqueInput | Prisma.MenuRecipeWhereUniqueInput[];
    delete?: Prisma.MenuRecipeWhereUniqueInput | Prisma.MenuRecipeWhereUniqueInput[];
    connect?: Prisma.MenuRecipeWhereUniqueInput | Prisma.MenuRecipeWhereUniqueInput[];
    update?: Prisma.MenuRecipeUpdateWithWhereUniqueWithoutMenuInput | Prisma.MenuRecipeUpdateWithWhereUniqueWithoutMenuInput[];
    updateMany?: Prisma.MenuRecipeUpdateManyWithWhereWithoutMenuInput | Prisma.MenuRecipeUpdateManyWithWhereWithoutMenuInput[];
    deleteMany?: Prisma.MenuRecipeScalarWhereInput | Prisma.MenuRecipeScalarWhereInput[];
};
export type MenuRecipeCreateWithoutIngredientInput = {
    menu_recipe_id?: string;
    qty_needed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    menu: Prisma.MenuCreateNestedOneWithoutRecipesInput;
};
export type MenuRecipeUncheckedCreateWithoutIngredientInput = {
    menu_recipe_id?: string;
    menu_id: string;
    qty_needed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type MenuRecipeCreateOrConnectWithoutIngredientInput = {
    where: Prisma.MenuRecipeWhereUniqueInput;
    create: Prisma.XOR<Prisma.MenuRecipeCreateWithoutIngredientInput, Prisma.MenuRecipeUncheckedCreateWithoutIngredientInput>;
};
export type MenuRecipeCreateManyIngredientInputEnvelope = {
    data: Prisma.MenuRecipeCreateManyIngredientInput | Prisma.MenuRecipeCreateManyIngredientInput[];
    skipDuplicates?: boolean;
};
export type MenuRecipeUpsertWithWhereUniqueWithoutIngredientInput = {
    where: Prisma.MenuRecipeWhereUniqueInput;
    update: Prisma.XOR<Prisma.MenuRecipeUpdateWithoutIngredientInput, Prisma.MenuRecipeUncheckedUpdateWithoutIngredientInput>;
    create: Prisma.XOR<Prisma.MenuRecipeCreateWithoutIngredientInput, Prisma.MenuRecipeUncheckedCreateWithoutIngredientInput>;
};
export type MenuRecipeUpdateWithWhereUniqueWithoutIngredientInput = {
    where: Prisma.MenuRecipeWhereUniqueInput;
    data: Prisma.XOR<Prisma.MenuRecipeUpdateWithoutIngredientInput, Prisma.MenuRecipeUncheckedUpdateWithoutIngredientInput>;
};
export type MenuRecipeUpdateManyWithWhereWithoutIngredientInput = {
    where: Prisma.MenuRecipeScalarWhereInput;
    data: Prisma.XOR<Prisma.MenuRecipeUpdateManyMutationInput, Prisma.MenuRecipeUncheckedUpdateManyWithoutIngredientInput>;
};
export type MenuRecipeScalarWhereInput = {
    AND?: Prisma.MenuRecipeScalarWhereInput | Prisma.MenuRecipeScalarWhereInput[];
    OR?: Prisma.MenuRecipeScalarWhereInput[];
    NOT?: Prisma.MenuRecipeScalarWhereInput | Prisma.MenuRecipeScalarWhereInput[];
    menu_recipe_id?: Prisma.UuidFilter<"MenuRecipe"> | string;
    menu_id?: Prisma.UuidFilter<"MenuRecipe"> | string;
    ingredient_id?: Prisma.UuidFilter<"MenuRecipe"> | string;
    qty_needed?: Prisma.DecimalFilter<"MenuRecipe"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFilter<"MenuRecipe"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"MenuRecipe"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"MenuRecipe"> | Date | string | null;
};
export type MenuRecipeCreateWithoutMenuInput = {
    menu_recipe_id?: string;
    qty_needed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    ingredient: Prisma.IngredientCreateNestedOneWithoutMenu_recipesInput;
};
export type MenuRecipeUncheckedCreateWithoutMenuInput = {
    menu_recipe_id?: string;
    ingredient_id: string;
    qty_needed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type MenuRecipeCreateOrConnectWithoutMenuInput = {
    where: Prisma.MenuRecipeWhereUniqueInput;
    create: Prisma.XOR<Prisma.MenuRecipeCreateWithoutMenuInput, Prisma.MenuRecipeUncheckedCreateWithoutMenuInput>;
};
export type MenuRecipeCreateManyMenuInputEnvelope = {
    data: Prisma.MenuRecipeCreateManyMenuInput | Prisma.MenuRecipeCreateManyMenuInput[];
    skipDuplicates?: boolean;
};
export type MenuRecipeUpsertWithWhereUniqueWithoutMenuInput = {
    where: Prisma.MenuRecipeWhereUniqueInput;
    update: Prisma.XOR<Prisma.MenuRecipeUpdateWithoutMenuInput, Prisma.MenuRecipeUncheckedUpdateWithoutMenuInput>;
    create: Prisma.XOR<Prisma.MenuRecipeCreateWithoutMenuInput, Prisma.MenuRecipeUncheckedCreateWithoutMenuInput>;
};
export type MenuRecipeUpdateWithWhereUniqueWithoutMenuInput = {
    where: Prisma.MenuRecipeWhereUniqueInput;
    data: Prisma.XOR<Prisma.MenuRecipeUpdateWithoutMenuInput, Prisma.MenuRecipeUncheckedUpdateWithoutMenuInput>;
};
export type MenuRecipeUpdateManyWithWhereWithoutMenuInput = {
    where: Prisma.MenuRecipeScalarWhereInput;
    data: Prisma.XOR<Prisma.MenuRecipeUpdateManyMutationInput, Prisma.MenuRecipeUncheckedUpdateManyWithoutMenuInput>;
};
export type MenuRecipeCreateManyIngredientInput = {
    menu_recipe_id?: string;
    menu_id: string;
    qty_needed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type MenuRecipeUpdateWithoutIngredientInput = {
    menu_recipe_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty_needed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    menu?: Prisma.MenuUpdateOneRequiredWithoutRecipesNestedInput;
};
export type MenuRecipeUncheckedUpdateWithoutIngredientInput = {
    menu_recipe_id?: Prisma.StringFieldUpdateOperationsInput | string;
    menu_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty_needed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MenuRecipeUncheckedUpdateManyWithoutIngredientInput = {
    menu_recipe_id?: Prisma.StringFieldUpdateOperationsInput | string;
    menu_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty_needed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MenuRecipeCreateManyMenuInput = {
    menu_recipe_id?: string;
    ingredient_id: string;
    qty_needed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type MenuRecipeUpdateWithoutMenuInput = {
    menu_recipe_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty_needed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ingredient?: Prisma.IngredientUpdateOneRequiredWithoutMenu_recipesNestedInput;
};
export type MenuRecipeUncheckedUpdateWithoutMenuInput = {
    menu_recipe_id?: Prisma.StringFieldUpdateOperationsInput | string;
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty_needed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MenuRecipeUncheckedUpdateManyWithoutMenuInput = {
    menu_recipe_id?: Prisma.StringFieldUpdateOperationsInput | string;
    ingredient_id?: Prisma.StringFieldUpdateOperationsInput | string;
    qty_needed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MenuRecipeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    menu_recipe_id?: boolean;
    menu_id?: boolean;
    ingredient_id?: boolean;
    qty_needed?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
    menu?: boolean | Prisma.MenuDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["menuRecipe"]>;
export type MenuRecipeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    menu_recipe_id?: boolean;
    menu_id?: boolean;
    ingredient_id?: boolean;
    qty_needed?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
    menu?: boolean | Prisma.MenuDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["menuRecipe"]>;
export type MenuRecipeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    menu_recipe_id?: boolean;
    menu_id?: boolean;
    ingredient_id?: boolean;
    qty_needed?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
    menu?: boolean | Prisma.MenuDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["menuRecipe"]>;
export type MenuRecipeSelectScalar = {
    menu_recipe_id?: boolean;
    menu_id?: boolean;
    ingredient_id?: boolean;
    qty_needed?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
};
export type MenuRecipeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"menu_recipe_id" | "menu_id" | "ingredient_id" | "qty_needed" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["menuRecipe"]>;
export type MenuRecipeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
    menu?: boolean | Prisma.MenuDefaultArgs<ExtArgs>;
};
export type MenuRecipeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
    menu?: boolean | Prisma.MenuDefaultArgs<ExtArgs>;
};
export type MenuRecipeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ingredient?: boolean | Prisma.IngredientDefaultArgs<ExtArgs>;
    menu?: boolean | Prisma.MenuDefaultArgs<ExtArgs>;
};
export type $MenuRecipePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MenuRecipe";
    objects: {
        ingredient: Prisma.$IngredientPayload<ExtArgs>;
        menu: Prisma.$MenuPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        menu_recipe_id: string;
        menu_id: string;
        ingredient_id: string;
        qty_needed: runtime.Decimal;
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
    }, ExtArgs["result"]["menuRecipe"]>;
    composites: {};
};
export type MenuRecipeGetPayload<S extends boolean | null | undefined | MenuRecipeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MenuRecipePayload, S>;
export type MenuRecipeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MenuRecipeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MenuRecipeCountAggregateInputType | true;
};
export interface MenuRecipeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MenuRecipe'];
        meta: {
            name: 'MenuRecipe';
        };
    };
    /**
     * Find zero or one MenuRecipe that matches the filter.
     * @param {MenuRecipeFindUniqueArgs} args - Arguments to find a MenuRecipe
     * @example
     * // Get one MenuRecipe
     * const menuRecipe = await prisma.menuRecipe.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MenuRecipeFindUniqueArgs>(args: Prisma.SelectSubset<T, MenuRecipeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MenuRecipeClient<runtime.Types.Result.GetResult<Prisma.$MenuRecipePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one MenuRecipe that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MenuRecipeFindUniqueOrThrowArgs} args - Arguments to find a MenuRecipe
     * @example
     * // Get one MenuRecipe
     * const menuRecipe = await prisma.menuRecipe.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MenuRecipeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MenuRecipeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MenuRecipeClient<runtime.Types.Result.GetResult<Prisma.$MenuRecipePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MenuRecipe that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuRecipeFindFirstArgs} args - Arguments to find a MenuRecipe
     * @example
     * // Get one MenuRecipe
     * const menuRecipe = await prisma.menuRecipe.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MenuRecipeFindFirstArgs>(args?: Prisma.SelectSubset<T, MenuRecipeFindFirstArgs<ExtArgs>>): Prisma.Prisma__MenuRecipeClient<runtime.Types.Result.GetResult<Prisma.$MenuRecipePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MenuRecipe that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuRecipeFindFirstOrThrowArgs} args - Arguments to find a MenuRecipe
     * @example
     * // Get one MenuRecipe
     * const menuRecipe = await prisma.menuRecipe.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MenuRecipeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MenuRecipeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MenuRecipeClient<runtime.Types.Result.GetResult<Prisma.$MenuRecipePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more MenuRecipes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuRecipeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MenuRecipes
     * const menuRecipes = await prisma.menuRecipe.findMany()
     *
     * // Get first 10 MenuRecipes
     * const menuRecipes = await prisma.menuRecipe.findMany({ take: 10 })
     *
     * // Only select the `menu_recipe_id`
     * const menuRecipeWithMenu_recipe_idOnly = await prisma.menuRecipe.findMany({ select: { menu_recipe_id: true } })
     *
     */
    findMany<T extends MenuRecipeFindManyArgs>(args?: Prisma.SelectSubset<T, MenuRecipeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MenuRecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a MenuRecipe.
     * @param {MenuRecipeCreateArgs} args - Arguments to create a MenuRecipe.
     * @example
     * // Create one MenuRecipe
     * const MenuRecipe = await prisma.menuRecipe.create({
     *   data: {
     *     // ... data to create a MenuRecipe
     *   }
     * })
     *
     */
    create<T extends MenuRecipeCreateArgs>(args: Prisma.SelectSubset<T, MenuRecipeCreateArgs<ExtArgs>>): Prisma.Prisma__MenuRecipeClient<runtime.Types.Result.GetResult<Prisma.$MenuRecipePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many MenuRecipes.
     * @param {MenuRecipeCreateManyArgs} args - Arguments to create many MenuRecipes.
     * @example
     * // Create many MenuRecipes
     * const menuRecipe = await prisma.menuRecipe.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MenuRecipeCreateManyArgs>(args?: Prisma.SelectSubset<T, MenuRecipeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many MenuRecipes and returns the data saved in the database.
     * @param {MenuRecipeCreateManyAndReturnArgs} args - Arguments to create many MenuRecipes.
     * @example
     * // Create many MenuRecipes
     * const menuRecipe = await prisma.menuRecipe.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MenuRecipes and only return the `menu_recipe_id`
     * const menuRecipeWithMenu_recipe_idOnly = await prisma.menuRecipe.createManyAndReturn({
     *   select: { menu_recipe_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MenuRecipeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MenuRecipeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MenuRecipePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a MenuRecipe.
     * @param {MenuRecipeDeleteArgs} args - Arguments to delete one MenuRecipe.
     * @example
     * // Delete one MenuRecipe
     * const MenuRecipe = await prisma.menuRecipe.delete({
     *   where: {
     *     // ... filter to delete one MenuRecipe
     *   }
     * })
     *
     */
    delete<T extends MenuRecipeDeleteArgs>(args: Prisma.SelectSubset<T, MenuRecipeDeleteArgs<ExtArgs>>): Prisma.Prisma__MenuRecipeClient<runtime.Types.Result.GetResult<Prisma.$MenuRecipePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one MenuRecipe.
     * @param {MenuRecipeUpdateArgs} args - Arguments to update one MenuRecipe.
     * @example
     * // Update one MenuRecipe
     * const menuRecipe = await prisma.menuRecipe.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MenuRecipeUpdateArgs>(args: Prisma.SelectSubset<T, MenuRecipeUpdateArgs<ExtArgs>>): Prisma.Prisma__MenuRecipeClient<runtime.Types.Result.GetResult<Prisma.$MenuRecipePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more MenuRecipes.
     * @param {MenuRecipeDeleteManyArgs} args - Arguments to filter MenuRecipes to delete.
     * @example
     * // Delete a few MenuRecipes
     * const { count } = await prisma.menuRecipe.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MenuRecipeDeleteManyArgs>(args?: Prisma.SelectSubset<T, MenuRecipeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MenuRecipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuRecipeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MenuRecipes
     * const menuRecipe = await prisma.menuRecipe.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MenuRecipeUpdateManyArgs>(args: Prisma.SelectSubset<T, MenuRecipeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MenuRecipes and returns the data updated in the database.
     * @param {MenuRecipeUpdateManyAndReturnArgs} args - Arguments to update many MenuRecipes.
     * @example
     * // Update many MenuRecipes
     * const menuRecipe = await prisma.menuRecipe.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MenuRecipes and only return the `menu_recipe_id`
     * const menuRecipeWithMenu_recipe_idOnly = await prisma.menuRecipe.updateManyAndReturn({
     *   select: { menu_recipe_id: true },
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
    updateManyAndReturn<T extends MenuRecipeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MenuRecipeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MenuRecipePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one MenuRecipe.
     * @param {MenuRecipeUpsertArgs} args - Arguments to update or create a MenuRecipe.
     * @example
     * // Update or create a MenuRecipe
     * const menuRecipe = await prisma.menuRecipe.upsert({
     *   create: {
     *     // ... data to create a MenuRecipe
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MenuRecipe we want to update
     *   }
     * })
     */
    upsert<T extends MenuRecipeUpsertArgs>(args: Prisma.SelectSubset<T, MenuRecipeUpsertArgs<ExtArgs>>): Prisma.Prisma__MenuRecipeClient<runtime.Types.Result.GetResult<Prisma.$MenuRecipePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of MenuRecipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuRecipeCountArgs} args - Arguments to filter MenuRecipes to count.
     * @example
     * // Count the number of MenuRecipes
     * const count = await prisma.menuRecipe.count({
     *   where: {
     *     // ... the filter for the MenuRecipes we want to count
     *   }
     * })
    **/
    count<T extends MenuRecipeCountArgs>(args?: Prisma.Subset<T, MenuRecipeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MenuRecipeCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a MenuRecipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuRecipeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MenuRecipeAggregateArgs>(args: Prisma.Subset<T, MenuRecipeAggregateArgs>): Prisma.PrismaPromise<GetMenuRecipeAggregateType<T>>;
    /**
     * Group by MenuRecipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuRecipeGroupByArgs} args - Group by arguments.
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
    groupBy<T extends MenuRecipeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MenuRecipeGroupByArgs['orderBy'];
    } : {
        orderBy?: MenuRecipeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MenuRecipeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMenuRecipeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MenuRecipe model
     */
    readonly fields: MenuRecipeFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for MenuRecipe.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MenuRecipeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    ingredient<T extends Prisma.IngredientDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.IngredientDefaultArgs<ExtArgs>>): Prisma.Prisma__IngredientClient<runtime.Types.Result.GetResult<Prisma.$IngredientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    menu<T extends Prisma.MenuDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MenuDefaultArgs<ExtArgs>>): Prisma.Prisma__MenuClient<runtime.Types.Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the MenuRecipe model
 */
export interface MenuRecipeFieldRefs {
    readonly menu_recipe_id: Prisma.FieldRef<"MenuRecipe", 'String'>;
    readonly menu_id: Prisma.FieldRef<"MenuRecipe", 'String'>;
    readonly ingredient_id: Prisma.FieldRef<"MenuRecipe", 'String'>;
    readonly qty_needed: Prisma.FieldRef<"MenuRecipe", 'Decimal'>;
    readonly created_at: Prisma.FieldRef<"MenuRecipe", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"MenuRecipe", 'DateTime'>;
    readonly deleted_at: Prisma.FieldRef<"MenuRecipe", 'DateTime'>;
}
/**
 * MenuRecipe findUnique
 */
export type MenuRecipeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which MenuRecipe to fetch.
     */
    where: Prisma.MenuRecipeWhereUniqueInput;
};
/**
 * MenuRecipe findUniqueOrThrow
 */
export type MenuRecipeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which MenuRecipe to fetch.
     */
    where: Prisma.MenuRecipeWhereUniqueInput;
};
/**
 * MenuRecipe findFirst
 */
export type MenuRecipeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which MenuRecipe to fetch.
     */
    where?: Prisma.MenuRecipeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MenuRecipes to fetch.
     */
    orderBy?: Prisma.MenuRecipeOrderByWithRelationInput | Prisma.MenuRecipeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MenuRecipes.
     */
    cursor?: Prisma.MenuRecipeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MenuRecipes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MenuRecipes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MenuRecipes.
     */
    distinct?: Prisma.MenuRecipeScalarFieldEnum | Prisma.MenuRecipeScalarFieldEnum[];
};
/**
 * MenuRecipe findFirstOrThrow
 */
export type MenuRecipeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which MenuRecipe to fetch.
     */
    where?: Prisma.MenuRecipeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MenuRecipes to fetch.
     */
    orderBy?: Prisma.MenuRecipeOrderByWithRelationInput | Prisma.MenuRecipeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MenuRecipes.
     */
    cursor?: Prisma.MenuRecipeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MenuRecipes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MenuRecipes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MenuRecipes.
     */
    distinct?: Prisma.MenuRecipeScalarFieldEnum | Prisma.MenuRecipeScalarFieldEnum[];
};
/**
 * MenuRecipe findMany
 */
export type MenuRecipeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which MenuRecipes to fetch.
     */
    where?: Prisma.MenuRecipeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MenuRecipes to fetch.
     */
    orderBy?: Prisma.MenuRecipeOrderByWithRelationInput | Prisma.MenuRecipeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MenuRecipes.
     */
    cursor?: Prisma.MenuRecipeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MenuRecipes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MenuRecipes.
     */
    skip?: number;
    distinct?: Prisma.MenuRecipeScalarFieldEnum | Prisma.MenuRecipeScalarFieldEnum[];
};
/**
 * MenuRecipe create
 */
export type MenuRecipeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a MenuRecipe.
     */
    data: Prisma.XOR<Prisma.MenuRecipeCreateInput, Prisma.MenuRecipeUncheckedCreateInput>;
};
/**
 * MenuRecipe createMany
 */
export type MenuRecipeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many MenuRecipes.
     */
    data: Prisma.MenuRecipeCreateManyInput | Prisma.MenuRecipeCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * MenuRecipe createManyAndReturn
 */
export type MenuRecipeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuRecipe
     */
    select?: Prisma.MenuRecipeSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuRecipe
     */
    omit?: Prisma.MenuRecipeOmit<ExtArgs> | null;
    /**
     * The data used to create many MenuRecipes.
     */
    data: Prisma.MenuRecipeCreateManyInput | Prisma.MenuRecipeCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuRecipeIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * MenuRecipe update
 */
export type MenuRecipeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a MenuRecipe.
     */
    data: Prisma.XOR<Prisma.MenuRecipeUpdateInput, Prisma.MenuRecipeUncheckedUpdateInput>;
    /**
     * Choose, which MenuRecipe to update.
     */
    where: Prisma.MenuRecipeWhereUniqueInput;
};
/**
 * MenuRecipe updateMany
 */
export type MenuRecipeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update MenuRecipes.
     */
    data: Prisma.XOR<Prisma.MenuRecipeUpdateManyMutationInput, Prisma.MenuRecipeUncheckedUpdateManyInput>;
    /**
     * Filter which MenuRecipes to update
     */
    where?: Prisma.MenuRecipeWhereInput;
    /**
     * Limit how many MenuRecipes to update.
     */
    limit?: number;
};
/**
 * MenuRecipe updateManyAndReturn
 */
export type MenuRecipeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuRecipe
     */
    select?: Prisma.MenuRecipeSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuRecipe
     */
    omit?: Prisma.MenuRecipeOmit<ExtArgs> | null;
    /**
     * The data used to update MenuRecipes.
     */
    data: Prisma.XOR<Prisma.MenuRecipeUpdateManyMutationInput, Prisma.MenuRecipeUncheckedUpdateManyInput>;
    /**
     * Filter which MenuRecipes to update
     */
    where?: Prisma.MenuRecipeWhereInput;
    /**
     * Limit how many MenuRecipes to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuRecipeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * MenuRecipe upsert
 */
export type MenuRecipeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the MenuRecipe to update in case it exists.
     */
    where: Prisma.MenuRecipeWhereUniqueInput;
    /**
     * In case the MenuRecipe found by the `where` argument doesn't exist, create a new MenuRecipe with this data.
     */
    create: Prisma.XOR<Prisma.MenuRecipeCreateInput, Prisma.MenuRecipeUncheckedCreateInput>;
    /**
     * In case the MenuRecipe was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.MenuRecipeUpdateInput, Prisma.MenuRecipeUncheckedUpdateInput>;
};
/**
 * MenuRecipe delete
 */
export type MenuRecipeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which MenuRecipe to delete.
     */
    where: Prisma.MenuRecipeWhereUniqueInput;
};
/**
 * MenuRecipe deleteMany
 */
export type MenuRecipeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MenuRecipes to delete
     */
    where?: Prisma.MenuRecipeWhereInput;
    /**
     * Limit how many MenuRecipes to delete.
     */
    limit?: number;
};
/**
 * MenuRecipe without action
 */
export type MenuRecipeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=MenuRecipe.d.ts.map