import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Menu
 *
 */
export type MenuModel = runtime.Types.Result.DefaultSelection<Prisma.$MenuPayload>;
export type AggregateMenu = {
    _count: MenuCountAggregateOutputType | null;
    _avg: MenuAvgAggregateOutputType | null;
    _sum: MenuSumAggregateOutputType | null;
    _min: MenuMinAggregateOutputType | null;
    _max: MenuMaxAggregateOutputType | null;
};
export type MenuAvgAggregateOutputType = {
    price: runtime.Decimal | null;
    cost: runtime.Decimal | null;
};
export type MenuSumAggregateOutputType = {
    price: runtime.Decimal | null;
    cost: runtime.Decimal | null;
};
export type MenuMinAggregateOutputType = {
    menu_id: string | null;
    category_id: string | null;
    name: string | null;
    price: runtime.Decimal | null;
    cost: runtime.Decimal | null;
    description: string | null;
    image_url: string | null;
    is_available: boolean | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
export type MenuMaxAggregateOutputType = {
    menu_id: string | null;
    category_id: string | null;
    name: string | null;
    price: runtime.Decimal | null;
    cost: runtime.Decimal | null;
    description: string | null;
    image_url: string | null;
    is_available: boolean | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
export type MenuCountAggregateOutputType = {
    menu_id: number;
    category_id: number;
    name: number;
    price: number;
    cost: number;
    description: number;
    image_url: number;
    is_available: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
};
export type MenuAvgAggregateInputType = {
    price?: true;
    cost?: true;
};
export type MenuSumAggregateInputType = {
    price?: true;
    cost?: true;
};
export type MenuMinAggregateInputType = {
    menu_id?: true;
    category_id?: true;
    name?: true;
    price?: true;
    cost?: true;
    description?: true;
    image_url?: true;
    is_available?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
};
export type MenuMaxAggregateInputType = {
    menu_id?: true;
    category_id?: true;
    name?: true;
    price?: true;
    cost?: true;
    description?: true;
    image_url?: true;
    is_available?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
};
export type MenuCountAggregateInputType = {
    menu_id?: true;
    category_id?: true;
    name?: true;
    price?: true;
    cost?: true;
    description?: true;
    image_url?: true;
    is_available?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
};
export type MenuAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Menu to aggregate.
     */
    where?: Prisma.MenuWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Menus to fetch.
     */
    orderBy?: Prisma.MenuOrderByWithRelationInput | Prisma.MenuOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.MenuWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Menus.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Menus
    **/
    _count?: true | MenuCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: MenuAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: MenuSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MenuMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MenuMaxAggregateInputType;
};
export type GetMenuAggregateType<T extends MenuAggregateArgs> = {
    [P in keyof T & keyof AggregateMenu]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMenu[P]> : Prisma.GetScalarType<T[P], AggregateMenu[P]>;
};
export type MenuGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MenuWhereInput;
    orderBy?: Prisma.MenuOrderByWithAggregationInput | Prisma.MenuOrderByWithAggregationInput[];
    by: Prisma.MenuScalarFieldEnum[] | Prisma.MenuScalarFieldEnum;
    having?: Prisma.MenuScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MenuCountAggregateInputType | true;
    _avg?: MenuAvgAggregateInputType;
    _sum?: MenuSumAggregateInputType;
    _min?: MenuMinAggregateInputType;
    _max?: MenuMaxAggregateInputType;
};
export type MenuGroupByOutputType = {
    menu_id: string;
    category_id: string;
    name: string;
    price: runtime.Decimal;
    cost: runtime.Decimal;
    description: string | null;
    image_url: string | null;
    is_available: boolean;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    _count: MenuCountAggregateOutputType | null;
    _avg: MenuAvgAggregateOutputType | null;
    _sum: MenuSumAggregateOutputType | null;
    _min: MenuMinAggregateOutputType | null;
    _max: MenuMaxAggregateOutputType | null;
};
type GetMenuGroupByPayload<T extends MenuGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MenuGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MenuGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MenuGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MenuGroupByOutputType[P]>;
}>>;
export type MenuWhereInput = {
    AND?: Prisma.MenuWhereInput | Prisma.MenuWhereInput[];
    OR?: Prisma.MenuWhereInput[];
    NOT?: Prisma.MenuWhereInput | Prisma.MenuWhereInput[];
    menu_id?: Prisma.UuidFilter<"Menu"> | string;
    category_id?: Prisma.UuidFilter<"Menu"> | string;
    name?: Prisma.StringFilter<"Menu"> | string;
    price?: Prisma.DecimalFilter<"Menu"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost?: Prisma.DecimalFilter<"Menu"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.StringNullableFilter<"Menu"> | string | null;
    image_url?: Prisma.StringNullableFilter<"Menu"> | string | null;
    is_available?: Prisma.BoolFilter<"Menu"> | boolean;
    created_at?: Prisma.DateTimeFilter<"Menu"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"Menu"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"Menu"> | Date | string | null;
    recipes?: Prisma.MenuRecipeListRelationFilter;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    order_items?: Prisma.OrderItemListRelationFilter;
};
export type MenuOrderByWithRelationInput = {
    menu_id?: Prisma.SortOrder;
    category_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    image_url?: Prisma.SortOrderInput | Prisma.SortOrder;
    is_available?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    recipes?: Prisma.MenuRecipeOrderByRelationAggregateInput;
    category?: Prisma.CategoryOrderByWithRelationInput;
    order_items?: Prisma.OrderItemOrderByRelationAggregateInput;
};
export type MenuWhereUniqueInput = Prisma.AtLeast<{
    menu_id?: string;
    AND?: Prisma.MenuWhereInput | Prisma.MenuWhereInput[];
    OR?: Prisma.MenuWhereInput[];
    NOT?: Prisma.MenuWhereInput | Prisma.MenuWhereInput[];
    category_id?: Prisma.UuidFilter<"Menu"> | string;
    name?: Prisma.StringFilter<"Menu"> | string;
    price?: Prisma.DecimalFilter<"Menu"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost?: Prisma.DecimalFilter<"Menu"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.StringNullableFilter<"Menu"> | string | null;
    image_url?: Prisma.StringNullableFilter<"Menu"> | string | null;
    is_available?: Prisma.BoolFilter<"Menu"> | boolean;
    created_at?: Prisma.DateTimeFilter<"Menu"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"Menu"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"Menu"> | Date | string | null;
    recipes?: Prisma.MenuRecipeListRelationFilter;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    order_items?: Prisma.OrderItemListRelationFilter;
}, "menu_id">;
export type MenuOrderByWithAggregationInput = {
    menu_id?: Prisma.SortOrder;
    category_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    image_url?: Prisma.SortOrderInput | Prisma.SortOrder;
    is_available?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.MenuCountOrderByAggregateInput;
    _avg?: Prisma.MenuAvgOrderByAggregateInput;
    _max?: Prisma.MenuMaxOrderByAggregateInput;
    _min?: Prisma.MenuMinOrderByAggregateInput;
    _sum?: Prisma.MenuSumOrderByAggregateInput;
};
export type MenuScalarWhereWithAggregatesInput = {
    AND?: Prisma.MenuScalarWhereWithAggregatesInput | Prisma.MenuScalarWhereWithAggregatesInput[];
    OR?: Prisma.MenuScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MenuScalarWhereWithAggregatesInput | Prisma.MenuScalarWhereWithAggregatesInput[];
    menu_id?: Prisma.UuidWithAggregatesFilter<"Menu"> | string;
    category_id?: Prisma.UuidWithAggregatesFilter<"Menu"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Menu"> | string;
    price?: Prisma.DecimalWithAggregatesFilter<"Menu"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost?: Prisma.DecimalWithAggregatesFilter<"Menu"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Menu"> | string | null;
    image_url?: Prisma.StringNullableWithAggregatesFilter<"Menu"> | string | null;
    is_available?: Prisma.BoolWithAggregatesFilter<"Menu"> | boolean;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"Menu"> | Date | string;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"Menu"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableWithAggregatesFilter<"Menu"> | Date | string | null;
};
export type MenuCreateInput = {
    menu_id?: string;
    name: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    image_url?: string | null;
    is_available: boolean;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    recipes?: Prisma.MenuRecipeCreateNestedManyWithoutMenuInput;
    category: Prisma.CategoryCreateNestedOneWithoutMenusInput;
    order_items?: Prisma.OrderItemCreateNestedManyWithoutMenuInput;
};
export type MenuUncheckedCreateInput = {
    menu_id?: string;
    category_id: string;
    name: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    image_url?: string | null;
    is_available: boolean;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    recipes?: Prisma.MenuRecipeUncheckedCreateNestedManyWithoutMenuInput;
    order_items?: Prisma.OrderItemUncheckedCreateNestedManyWithoutMenuInput;
};
export type MenuUpdateInput = {
    menu_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_available?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recipes?: Prisma.MenuRecipeUpdateManyWithoutMenuNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutMenusNestedInput;
    order_items?: Prisma.OrderItemUpdateManyWithoutMenuNestedInput;
};
export type MenuUncheckedUpdateInput = {
    menu_id?: Prisma.StringFieldUpdateOperationsInput | string;
    category_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_available?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recipes?: Prisma.MenuRecipeUncheckedUpdateManyWithoutMenuNestedInput;
    order_items?: Prisma.OrderItemUncheckedUpdateManyWithoutMenuNestedInput;
};
export type MenuCreateManyInput = {
    menu_id?: string;
    category_id: string;
    name: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    image_url?: string | null;
    is_available: boolean;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type MenuUpdateManyMutationInput = {
    menu_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_available?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MenuUncheckedUpdateManyInput = {
    menu_id?: Prisma.StringFieldUpdateOperationsInput | string;
    category_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_available?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type MenuCountOrderByAggregateInput = {
    menu_id?: Prisma.SortOrder;
    category_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    image_url?: Prisma.SortOrder;
    is_available?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type MenuAvgOrderByAggregateInput = {
    price?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
};
export type MenuMaxOrderByAggregateInput = {
    menu_id?: Prisma.SortOrder;
    category_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    image_url?: Prisma.SortOrder;
    is_available?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type MenuMinOrderByAggregateInput = {
    menu_id?: Prisma.SortOrder;
    category_id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    image_url?: Prisma.SortOrder;
    is_available?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type MenuSumOrderByAggregateInput = {
    price?: Prisma.SortOrder;
    cost?: Prisma.SortOrder;
};
export type MenuScalarRelationFilter = {
    is?: Prisma.MenuWhereInput;
    isNot?: Prisma.MenuWhereInput;
};
export type MenuListRelationFilter = {
    every?: Prisma.MenuWhereInput;
    some?: Prisma.MenuWhereInput;
    none?: Prisma.MenuWhereInput;
};
export type MenuOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type MenuCreateNestedOneWithoutRecipesInput = {
    create?: Prisma.XOR<Prisma.MenuCreateWithoutRecipesInput, Prisma.MenuUncheckedCreateWithoutRecipesInput>;
    connectOrCreate?: Prisma.MenuCreateOrConnectWithoutRecipesInput;
    connect?: Prisma.MenuWhereUniqueInput;
};
export type MenuUpdateOneRequiredWithoutRecipesNestedInput = {
    create?: Prisma.XOR<Prisma.MenuCreateWithoutRecipesInput, Prisma.MenuUncheckedCreateWithoutRecipesInput>;
    connectOrCreate?: Prisma.MenuCreateOrConnectWithoutRecipesInput;
    upsert?: Prisma.MenuUpsertWithoutRecipesInput;
    connect?: Prisma.MenuWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MenuUpdateToOneWithWhereWithoutRecipesInput, Prisma.MenuUpdateWithoutRecipesInput>, Prisma.MenuUncheckedUpdateWithoutRecipesInput>;
};
export type MenuCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.MenuCreateWithoutCategoryInput, Prisma.MenuUncheckedCreateWithoutCategoryInput> | Prisma.MenuCreateWithoutCategoryInput[] | Prisma.MenuUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.MenuCreateOrConnectWithoutCategoryInput | Prisma.MenuCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.MenuCreateManyCategoryInputEnvelope;
    connect?: Prisma.MenuWhereUniqueInput | Prisma.MenuWhereUniqueInput[];
};
export type MenuUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.MenuCreateWithoutCategoryInput, Prisma.MenuUncheckedCreateWithoutCategoryInput> | Prisma.MenuCreateWithoutCategoryInput[] | Prisma.MenuUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.MenuCreateOrConnectWithoutCategoryInput | Prisma.MenuCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.MenuCreateManyCategoryInputEnvelope;
    connect?: Prisma.MenuWhereUniqueInput | Prisma.MenuWhereUniqueInput[];
};
export type MenuUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.MenuCreateWithoutCategoryInput, Prisma.MenuUncheckedCreateWithoutCategoryInput> | Prisma.MenuCreateWithoutCategoryInput[] | Prisma.MenuUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.MenuCreateOrConnectWithoutCategoryInput | Prisma.MenuCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.MenuUpsertWithWhereUniqueWithoutCategoryInput | Prisma.MenuUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.MenuCreateManyCategoryInputEnvelope;
    set?: Prisma.MenuWhereUniqueInput | Prisma.MenuWhereUniqueInput[];
    disconnect?: Prisma.MenuWhereUniqueInput | Prisma.MenuWhereUniqueInput[];
    delete?: Prisma.MenuWhereUniqueInput | Prisma.MenuWhereUniqueInput[];
    connect?: Prisma.MenuWhereUniqueInput | Prisma.MenuWhereUniqueInput[];
    update?: Prisma.MenuUpdateWithWhereUniqueWithoutCategoryInput | Prisma.MenuUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.MenuUpdateManyWithWhereWithoutCategoryInput | Prisma.MenuUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.MenuScalarWhereInput | Prisma.MenuScalarWhereInput[];
};
export type MenuUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.MenuCreateWithoutCategoryInput, Prisma.MenuUncheckedCreateWithoutCategoryInput> | Prisma.MenuCreateWithoutCategoryInput[] | Prisma.MenuUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.MenuCreateOrConnectWithoutCategoryInput | Prisma.MenuCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.MenuUpsertWithWhereUniqueWithoutCategoryInput | Prisma.MenuUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.MenuCreateManyCategoryInputEnvelope;
    set?: Prisma.MenuWhereUniqueInput | Prisma.MenuWhereUniqueInput[];
    disconnect?: Prisma.MenuWhereUniqueInput | Prisma.MenuWhereUniqueInput[];
    delete?: Prisma.MenuWhereUniqueInput | Prisma.MenuWhereUniqueInput[];
    connect?: Prisma.MenuWhereUniqueInput | Prisma.MenuWhereUniqueInput[];
    update?: Prisma.MenuUpdateWithWhereUniqueWithoutCategoryInput | Prisma.MenuUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.MenuUpdateManyWithWhereWithoutCategoryInput | Prisma.MenuUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.MenuScalarWhereInput | Prisma.MenuScalarWhereInput[];
};
export type MenuCreateNestedOneWithoutOrder_itemsInput = {
    create?: Prisma.XOR<Prisma.MenuCreateWithoutOrder_itemsInput, Prisma.MenuUncheckedCreateWithoutOrder_itemsInput>;
    connectOrCreate?: Prisma.MenuCreateOrConnectWithoutOrder_itemsInput;
    connect?: Prisma.MenuWhereUniqueInput;
};
export type MenuUpdateOneRequiredWithoutOrder_itemsNestedInput = {
    create?: Prisma.XOR<Prisma.MenuCreateWithoutOrder_itemsInput, Prisma.MenuUncheckedCreateWithoutOrder_itemsInput>;
    connectOrCreate?: Prisma.MenuCreateOrConnectWithoutOrder_itemsInput;
    upsert?: Prisma.MenuUpsertWithoutOrder_itemsInput;
    connect?: Prisma.MenuWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MenuUpdateToOneWithWhereWithoutOrder_itemsInput, Prisma.MenuUpdateWithoutOrder_itemsInput>, Prisma.MenuUncheckedUpdateWithoutOrder_itemsInput>;
};
export type MenuCreateWithoutRecipesInput = {
    menu_id?: string;
    name: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    image_url?: string | null;
    is_available: boolean;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    category: Prisma.CategoryCreateNestedOneWithoutMenusInput;
    order_items?: Prisma.OrderItemCreateNestedManyWithoutMenuInput;
};
export type MenuUncheckedCreateWithoutRecipesInput = {
    menu_id?: string;
    category_id: string;
    name: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    image_url?: string | null;
    is_available: boolean;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    order_items?: Prisma.OrderItemUncheckedCreateNestedManyWithoutMenuInput;
};
export type MenuCreateOrConnectWithoutRecipesInput = {
    where: Prisma.MenuWhereUniqueInput;
    create: Prisma.XOR<Prisma.MenuCreateWithoutRecipesInput, Prisma.MenuUncheckedCreateWithoutRecipesInput>;
};
export type MenuUpsertWithoutRecipesInput = {
    update: Prisma.XOR<Prisma.MenuUpdateWithoutRecipesInput, Prisma.MenuUncheckedUpdateWithoutRecipesInput>;
    create: Prisma.XOR<Prisma.MenuCreateWithoutRecipesInput, Prisma.MenuUncheckedCreateWithoutRecipesInput>;
    where?: Prisma.MenuWhereInput;
};
export type MenuUpdateToOneWithWhereWithoutRecipesInput = {
    where?: Prisma.MenuWhereInput;
    data: Prisma.XOR<Prisma.MenuUpdateWithoutRecipesInput, Prisma.MenuUncheckedUpdateWithoutRecipesInput>;
};
export type MenuUpdateWithoutRecipesInput = {
    menu_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_available?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    category?: Prisma.CategoryUpdateOneRequiredWithoutMenusNestedInput;
    order_items?: Prisma.OrderItemUpdateManyWithoutMenuNestedInput;
};
export type MenuUncheckedUpdateWithoutRecipesInput = {
    menu_id?: Prisma.StringFieldUpdateOperationsInput | string;
    category_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_available?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    order_items?: Prisma.OrderItemUncheckedUpdateManyWithoutMenuNestedInput;
};
export type MenuCreateWithoutCategoryInput = {
    menu_id?: string;
    name: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    image_url?: string | null;
    is_available: boolean;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    recipes?: Prisma.MenuRecipeCreateNestedManyWithoutMenuInput;
    order_items?: Prisma.OrderItemCreateNestedManyWithoutMenuInput;
};
export type MenuUncheckedCreateWithoutCategoryInput = {
    menu_id?: string;
    name: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    image_url?: string | null;
    is_available: boolean;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    recipes?: Prisma.MenuRecipeUncheckedCreateNestedManyWithoutMenuInput;
    order_items?: Prisma.OrderItemUncheckedCreateNestedManyWithoutMenuInput;
};
export type MenuCreateOrConnectWithoutCategoryInput = {
    where: Prisma.MenuWhereUniqueInput;
    create: Prisma.XOR<Prisma.MenuCreateWithoutCategoryInput, Prisma.MenuUncheckedCreateWithoutCategoryInput>;
};
export type MenuCreateManyCategoryInputEnvelope = {
    data: Prisma.MenuCreateManyCategoryInput | Prisma.MenuCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type MenuUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.MenuWhereUniqueInput;
    update: Prisma.XOR<Prisma.MenuUpdateWithoutCategoryInput, Prisma.MenuUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.MenuCreateWithoutCategoryInput, Prisma.MenuUncheckedCreateWithoutCategoryInput>;
};
export type MenuUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.MenuWhereUniqueInput;
    data: Prisma.XOR<Prisma.MenuUpdateWithoutCategoryInput, Prisma.MenuUncheckedUpdateWithoutCategoryInput>;
};
export type MenuUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.MenuScalarWhereInput;
    data: Prisma.XOR<Prisma.MenuUpdateManyMutationInput, Prisma.MenuUncheckedUpdateManyWithoutCategoryInput>;
};
export type MenuScalarWhereInput = {
    AND?: Prisma.MenuScalarWhereInput | Prisma.MenuScalarWhereInput[];
    OR?: Prisma.MenuScalarWhereInput[];
    NOT?: Prisma.MenuScalarWhereInput | Prisma.MenuScalarWhereInput[];
    menu_id?: Prisma.UuidFilter<"Menu"> | string;
    category_id?: Prisma.UuidFilter<"Menu"> | string;
    name?: Prisma.StringFilter<"Menu"> | string;
    price?: Prisma.DecimalFilter<"Menu"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost?: Prisma.DecimalFilter<"Menu"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.StringNullableFilter<"Menu"> | string | null;
    image_url?: Prisma.StringNullableFilter<"Menu"> | string | null;
    is_available?: Prisma.BoolFilter<"Menu"> | boolean;
    created_at?: Prisma.DateTimeFilter<"Menu"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"Menu"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"Menu"> | Date | string | null;
};
export type MenuCreateWithoutOrder_itemsInput = {
    menu_id?: string;
    name: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    image_url?: string | null;
    is_available: boolean;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    recipes?: Prisma.MenuRecipeCreateNestedManyWithoutMenuInput;
    category: Prisma.CategoryCreateNestedOneWithoutMenusInput;
};
export type MenuUncheckedCreateWithoutOrder_itemsInput = {
    menu_id?: string;
    category_id: string;
    name: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    image_url?: string | null;
    is_available: boolean;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    recipes?: Prisma.MenuRecipeUncheckedCreateNestedManyWithoutMenuInput;
};
export type MenuCreateOrConnectWithoutOrder_itemsInput = {
    where: Prisma.MenuWhereUniqueInput;
    create: Prisma.XOR<Prisma.MenuCreateWithoutOrder_itemsInput, Prisma.MenuUncheckedCreateWithoutOrder_itemsInput>;
};
export type MenuUpsertWithoutOrder_itemsInput = {
    update: Prisma.XOR<Prisma.MenuUpdateWithoutOrder_itemsInput, Prisma.MenuUncheckedUpdateWithoutOrder_itemsInput>;
    create: Prisma.XOR<Prisma.MenuCreateWithoutOrder_itemsInput, Prisma.MenuUncheckedCreateWithoutOrder_itemsInput>;
    where?: Prisma.MenuWhereInput;
};
export type MenuUpdateToOneWithWhereWithoutOrder_itemsInput = {
    where?: Prisma.MenuWhereInput;
    data: Prisma.XOR<Prisma.MenuUpdateWithoutOrder_itemsInput, Prisma.MenuUncheckedUpdateWithoutOrder_itemsInput>;
};
export type MenuUpdateWithoutOrder_itemsInput = {
    menu_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_available?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recipes?: Prisma.MenuRecipeUpdateManyWithoutMenuNestedInput;
    category?: Prisma.CategoryUpdateOneRequiredWithoutMenusNestedInput;
};
export type MenuUncheckedUpdateWithoutOrder_itemsInput = {
    menu_id?: Prisma.StringFieldUpdateOperationsInput | string;
    category_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_available?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recipes?: Prisma.MenuRecipeUncheckedUpdateManyWithoutMenuNestedInput;
};
export type MenuCreateManyCategoryInput = {
    menu_id?: string;
    name: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost: runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: string | null;
    image_url?: string | null;
    is_available: boolean;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type MenuUpdateWithoutCategoryInput = {
    menu_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_available?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recipes?: Prisma.MenuRecipeUpdateManyWithoutMenuNestedInput;
    order_items?: Prisma.OrderItemUpdateManyWithoutMenuNestedInput;
};
export type MenuUncheckedUpdateWithoutCategoryInput = {
    menu_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_available?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recipes?: Prisma.MenuRecipeUncheckedUpdateManyWithoutMenuNestedInput;
    order_items?: Prisma.OrderItemUncheckedUpdateManyWithoutMenuNestedInput;
};
export type MenuUncheckedUpdateManyWithoutCategoryInput = {
    menu_id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    cost?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image_url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    is_available?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type MenuCountOutputType
 */
export type MenuCountOutputType = {
    recipes: number;
    order_items: number;
};
export type MenuCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    recipes?: boolean | MenuCountOutputTypeCountRecipesArgs;
    order_items?: boolean | MenuCountOutputTypeCountOrder_itemsArgs;
};
/**
 * MenuCountOutputType without action
 */
export type MenuCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuCountOutputType
     */
    select?: Prisma.MenuCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * MenuCountOutputType without action
 */
export type MenuCountOutputTypeCountRecipesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MenuRecipeWhereInput;
};
/**
 * MenuCountOutputType without action
 */
export type MenuCountOutputTypeCountOrder_itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderItemWhereInput;
};
export type MenuSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    menu_id?: boolean;
    category_id?: boolean;
    name?: boolean;
    price?: boolean;
    cost?: boolean;
    description?: boolean;
    image_url?: boolean;
    is_available?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    recipes?: boolean | Prisma.Menu$recipesArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    order_items?: boolean | Prisma.Menu$order_itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.MenuCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["menu"]>;
export type MenuSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    menu_id?: boolean;
    category_id?: boolean;
    name?: boolean;
    price?: boolean;
    cost?: boolean;
    description?: boolean;
    image_url?: boolean;
    is_available?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["menu"]>;
export type MenuSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    menu_id?: boolean;
    category_id?: boolean;
    name?: boolean;
    price?: boolean;
    cost?: boolean;
    description?: boolean;
    image_url?: boolean;
    is_available?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["menu"]>;
export type MenuSelectScalar = {
    menu_id?: boolean;
    category_id?: boolean;
    name?: boolean;
    price?: boolean;
    cost?: boolean;
    description?: boolean;
    image_url?: boolean;
    is_available?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
};
export type MenuOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"menu_id" | "category_id" | "name" | "price" | "cost" | "description" | "image_url" | "is_available" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["menu"]>;
export type MenuInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    recipes?: boolean | Prisma.Menu$recipesArgs<ExtArgs>;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    order_items?: boolean | Prisma.Menu$order_itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.MenuCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MenuIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type MenuIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type $MenuPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Menu";
    objects: {
        recipes: Prisma.$MenuRecipePayload<ExtArgs>[];
        category: Prisma.$CategoryPayload<ExtArgs>;
        order_items: Prisma.$OrderItemPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        menu_id: string;
        category_id: string;
        name: string;
        price: runtime.Decimal;
        cost: runtime.Decimal;
        description: string | null;
        image_url: string | null;
        is_available: boolean;
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
    }, ExtArgs["result"]["menu"]>;
    composites: {};
};
export type MenuGetPayload<S extends boolean | null | undefined | MenuDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MenuPayload, S>;
export type MenuCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MenuFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MenuCountAggregateInputType | true;
};
export interface MenuDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Menu'];
        meta: {
            name: 'Menu';
        };
    };
    /**
     * Find zero or one Menu that matches the filter.
     * @param {MenuFindUniqueArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MenuFindUniqueArgs>(args: Prisma.SelectSubset<T, MenuFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MenuClient<runtime.Types.Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Menu that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MenuFindUniqueOrThrowArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MenuFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MenuFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MenuClient<runtime.Types.Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Menu that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuFindFirstArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MenuFindFirstArgs>(args?: Prisma.SelectSubset<T, MenuFindFirstArgs<ExtArgs>>): Prisma.Prisma__MenuClient<runtime.Types.Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Menu that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuFindFirstOrThrowArgs} args - Arguments to find a Menu
     * @example
     * // Get one Menu
     * const menu = await prisma.menu.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MenuFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MenuFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MenuClient<runtime.Types.Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Menus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Menus
     * const menus = await prisma.menu.findMany()
     *
     * // Get first 10 Menus
     * const menus = await prisma.menu.findMany({ take: 10 })
     *
     * // Only select the `menu_id`
     * const menuWithMenu_idOnly = await prisma.menu.findMany({ select: { menu_id: true } })
     *
     */
    findMany<T extends MenuFindManyArgs>(args?: Prisma.SelectSubset<T, MenuFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Menu.
     * @param {MenuCreateArgs} args - Arguments to create a Menu.
     * @example
     * // Create one Menu
     * const Menu = await prisma.menu.create({
     *   data: {
     *     // ... data to create a Menu
     *   }
     * })
     *
     */
    create<T extends MenuCreateArgs>(args: Prisma.SelectSubset<T, MenuCreateArgs<ExtArgs>>): Prisma.Prisma__MenuClient<runtime.Types.Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Menus.
     * @param {MenuCreateManyArgs} args - Arguments to create many Menus.
     * @example
     * // Create many Menus
     * const menu = await prisma.menu.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MenuCreateManyArgs>(args?: Prisma.SelectSubset<T, MenuCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Menus and returns the data saved in the database.
     * @param {MenuCreateManyAndReturnArgs} args - Arguments to create many Menus.
     * @example
     * // Create many Menus
     * const menu = await prisma.menu.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Menus and only return the `menu_id`
     * const menuWithMenu_idOnly = await prisma.menu.createManyAndReturn({
     *   select: { menu_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MenuCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MenuCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Menu.
     * @param {MenuDeleteArgs} args - Arguments to delete one Menu.
     * @example
     * // Delete one Menu
     * const Menu = await prisma.menu.delete({
     *   where: {
     *     // ... filter to delete one Menu
     *   }
     * })
     *
     */
    delete<T extends MenuDeleteArgs>(args: Prisma.SelectSubset<T, MenuDeleteArgs<ExtArgs>>): Prisma.Prisma__MenuClient<runtime.Types.Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Menu.
     * @param {MenuUpdateArgs} args - Arguments to update one Menu.
     * @example
     * // Update one Menu
     * const menu = await prisma.menu.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MenuUpdateArgs>(args: Prisma.SelectSubset<T, MenuUpdateArgs<ExtArgs>>): Prisma.Prisma__MenuClient<runtime.Types.Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Menus.
     * @param {MenuDeleteManyArgs} args - Arguments to filter Menus to delete.
     * @example
     * // Delete a few Menus
     * const { count } = await prisma.menu.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MenuDeleteManyArgs>(args?: Prisma.SelectSubset<T, MenuDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Menus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Menus
     * const menu = await prisma.menu.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MenuUpdateManyArgs>(args: Prisma.SelectSubset<T, MenuUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Menus and returns the data updated in the database.
     * @param {MenuUpdateManyAndReturnArgs} args - Arguments to update many Menus.
     * @example
     * // Update many Menus
     * const menu = await prisma.menu.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Menus and only return the `menu_id`
     * const menuWithMenu_idOnly = await prisma.menu.updateManyAndReturn({
     *   select: { menu_id: true },
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
    updateManyAndReturn<T extends MenuUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MenuUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Menu.
     * @param {MenuUpsertArgs} args - Arguments to update or create a Menu.
     * @example
     * // Update or create a Menu
     * const menu = await prisma.menu.upsert({
     *   create: {
     *     // ... data to create a Menu
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Menu we want to update
     *   }
     * })
     */
    upsert<T extends MenuUpsertArgs>(args: Prisma.SelectSubset<T, MenuUpsertArgs<ExtArgs>>): Prisma.Prisma__MenuClient<runtime.Types.Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Menus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuCountArgs} args - Arguments to filter Menus to count.
     * @example
     * // Count the number of Menus
     * const count = await prisma.menu.count({
     *   where: {
     *     // ... the filter for the Menus we want to count
     *   }
     * })
    **/
    count<T extends MenuCountArgs>(args?: Prisma.Subset<T, MenuCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MenuCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Menu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MenuAggregateArgs>(args: Prisma.Subset<T, MenuAggregateArgs>): Prisma.PrismaPromise<GetMenuAggregateType<T>>;
    /**
     * Group by Menu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuGroupByArgs} args - Group by arguments.
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
    groupBy<T extends MenuGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MenuGroupByArgs['orderBy'];
    } : {
        orderBy?: MenuGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MenuGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMenuGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Menu model
     */
    readonly fields: MenuFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Menu.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MenuClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    recipes<T extends Prisma.Menu$recipesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Menu$recipesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MenuRecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    category<T extends Prisma.CategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    order_items<T extends Prisma.Menu$order_itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Menu$order_itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Menu model
 */
export interface MenuFieldRefs {
    readonly menu_id: Prisma.FieldRef<"Menu", 'String'>;
    readonly category_id: Prisma.FieldRef<"Menu", 'String'>;
    readonly name: Prisma.FieldRef<"Menu", 'String'>;
    readonly price: Prisma.FieldRef<"Menu", 'Decimal'>;
    readonly cost: Prisma.FieldRef<"Menu", 'Decimal'>;
    readonly description: Prisma.FieldRef<"Menu", 'String'>;
    readonly image_url: Prisma.FieldRef<"Menu", 'String'>;
    readonly is_available: Prisma.FieldRef<"Menu", 'Boolean'>;
    readonly created_at: Prisma.FieldRef<"Menu", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"Menu", 'DateTime'>;
    readonly deleted_at: Prisma.FieldRef<"Menu", 'DateTime'>;
}
/**
 * Menu findUnique
 */
export type MenuFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: Prisma.MenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Menu
     */
    omit?: Prisma.MenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuInclude<ExtArgs> | null;
    /**
     * Filter, which Menu to fetch.
     */
    where: Prisma.MenuWhereUniqueInput;
};
/**
 * Menu findUniqueOrThrow
 */
export type MenuFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: Prisma.MenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Menu
     */
    omit?: Prisma.MenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuInclude<ExtArgs> | null;
    /**
     * Filter, which Menu to fetch.
     */
    where: Prisma.MenuWhereUniqueInput;
};
/**
 * Menu findFirst
 */
export type MenuFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: Prisma.MenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Menu
     */
    omit?: Prisma.MenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuInclude<ExtArgs> | null;
    /**
     * Filter, which Menu to fetch.
     */
    where?: Prisma.MenuWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Menus to fetch.
     */
    orderBy?: Prisma.MenuOrderByWithRelationInput | Prisma.MenuOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Menus.
     */
    cursor?: Prisma.MenuWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Menus.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Menus.
     */
    distinct?: Prisma.MenuScalarFieldEnum | Prisma.MenuScalarFieldEnum[];
};
/**
 * Menu findFirstOrThrow
 */
export type MenuFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: Prisma.MenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Menu
     */
    omit?: Prisma.MenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuInclude<ExtArgs> | null;
    /**
     * Filter, which Menu to fetch.
     */
    where?: Prisma.MenuWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Menus to fetch.
     */
    orderBy?: Prisma.MenuOrderByWithRelationInput | Prisma.MenuOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Menus.
     */
    cursor?: Prisma.MenuWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Menus.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Menus.
     */
    distinct?: Prisma.MenuScalarFieldEnum | Prisma.MenuScalarFieldEnum[];
};
/**
 * Menu findMany
 */
export type MenuFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: Prisma.MenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Menu
     */
    omit?: Prisma.MenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuInclude<ExtArgs> | null;
    /**
     * Filter, which Menus to fetch.
     */
    where?: Prisma.MenuWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Menus to fetch.
     */
    orderBy?: Prisma.MenuOrderByWithRelationInput | Prisma.MenuOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Menus.
     */
    cursor?: Prisma.MenuWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Menus from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Menus.
     */
    skip?: number;
    distinct?: Prisma.MenuScalarFieldEnum | Prisma.MenuScalarFieldEnum[];
};
/**
 * Menu create
 */
export type MenuCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: Prisma.MenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Menu
     */
    omit?: Prisma.MenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuInclude<ExtArgs> | null;
    /**
     * The data needed to create a Menu.
     */
    data: Prisma.XOR<Prisma.MenuCreateInput, Prisma.MenuUncheckedCreateInput>;
};
/**
 * Menu createMany
 */
export type MenuCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Menus.
     */
    data: Prisma.MenuCreateManyInput | Prisma.MenuCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Menu createManyAndReturn
 */
export type MenuCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: Prisma.MenuSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Menu
     */
    omit?: Prisma.MenuOmit<ExtArgs> | null;
    /**
     * The data used to create many Menus.
     */
    data: Prisma.MenuCreateManyInput | Prisma.MenuCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Menu update
 */
export type MenuUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: Prisma.MenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Menu
     */
    omit?: Prisma.MenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuInclude<ExtArgs> | null;
    /**
     * The data needed to update a Menu.
     */
    data: Prisma.XOR<Prisma.MenuUpdateInput, Prisma.MenuUncheckedUpdateInput>;
    /**
     * Choose, which Menu to update.
     */
    where: Prisma.MenuWhereUniqueInput;
};
/**
 * Menu updateMany
 */
export type MenuUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Menus.
     */
    data: Prisma.XOR<Prisma.MenuUpdateManyMutationInput, Prisma.MenuUncheckedUpdateManyInput>;
    /**
     * Filter which Menus to update
     */
    where?: Prisma.MenuWhereInput;
    /**
     * Limit how many Menus to update.
     */
    limit?: number;
};
/**
 * Menu updateManyAndReturn
 */
export type MenuUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: Prisma.MenuSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Menu
     */
    omit?: Prisma.MenuOmit<ExtArgs> | null;
    /**
     * The data used to update Menus.
     */
    data: Prisma.XOR<Prisma.MenuUpdateManyMutationInput, Prisma.MenuUncheckedUpdateManyInput>;
    /**
     * Filter which Menus to update
     */
    where?: Prisma.MenuWhereInput;
    /**
     * Limit how many Menus to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Menu upsert
 */
export type MenuUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: Prisma.MenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Menu
     */
    omit?: Prisma.MenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuInclude<ExtArgs> | null;
    /**
     * The filter to search for the Menu to update in case it exists.
     */
    where: Prisma.MenuWhereUniqueInput;
    /**
     * In case the Menu found by the `where` argument doesn't exist, create a new Menu with this data.
     */
    create: Prisma.XOR<Prisma.MenuCreateInput, Prisma.MenuUncheckedCreateInput>;
    /**
     * In case the Menu was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.MenuUpdateInput, Prisma.MenuUncheckedUpdateInput>;
};
/**
 * Menu delete
 */
export type MenuDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: Prisma.MenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Menu
     */
    omit?: Prisma.MenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuInclude<ExtArgs> | null;
    /**
     * Filter which Menu to delete.
     */
    where: Prisma.MenuWhereUniqueInput;
};
/**
 * Menu deleteMany
 */
export type MenuDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Menus to delete
     */
    where?: Prisma.MenuWhereInput;
    /**
     * Limit how many Menus to delete.
     */
    limit?: number;
};
/**
 * Menu.recipes
 */
export type Menu$recipesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Menu.order_items
 */
export type Menu$order_itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: Prisma.OrderItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: Prisma.OrderItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderItemInclude<ExtArgs> | null;
    where?: Prisma.OrderItemWhereInput;
    orderBy?: Prisma.OrderItemOrderByWithRelationInput | Prisma.OrderItemOrderByWithRelationInput[];
    cursor?: Prisma.OrderItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderItemScalarFieldEnum | Prisma.OrderItemScalarFieldEnum[];
};
/**
 * Menu without action
 */
export type MenuDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menu
     */
    select?: Prisma.MenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Menu
     */
    omit?: Prisma.MenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Menu.d.ts.map