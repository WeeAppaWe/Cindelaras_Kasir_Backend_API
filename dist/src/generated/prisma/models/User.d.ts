import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model User
 *
 */
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    user_id: string | null;
    username: string | null;
    password: string | null;
    name: string | null;
    phone_number: string | null;
    role_id: string | null;
    user_status_id: string | null;
    last_login: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
export type UserMaxAggregateOutputType = {
    user_id: string | null;
    username: string | null;
    password: string | null;
    name: string | null;
    phone_number: string | null;
    role_id: string | null;
    user_status_id: string | null;
    last_login: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
};
export type UserCountAggregateOutputType = {
    user_id: number;
    username: number;
    password: number;
    name: number;
    phone_number: number;
    role_id: number;
    user_status_id: number;
    last_login: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    user_id?: true;
    username?: true;
    password?: true;
    name?: true;
    phone_number?: true;
    role_id?: true;
    user_status_id?: true;
    last_login?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
};
export type UserMaxAggregateInputType = {
    user_id?: true;
    username?: true;
    password?: true;
    name?: true;
    phone_number?: true;
    role_id?: true;
    user_status_id?: true;
    last_login?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
};
export type UserCountAggregateInputType = {
    user_id?: true;
    username?: true;
    password?: true;
    name?: true;
    phone_number?: true;
    role_id?: true;
    user_status_id?: true;
    last_login?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    user_id: string;
    username: string;
    password: string;
    name: string;
    phone_number: string | null;
    role_id: string;
    user_status_id: string;
    last_login: Date | null;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    user_id?: Prisma.UuidFilter<"User"> | string;
    username?: Prisma.StringFilter<"User"> | string;
    password?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    phone_number?: Prisma.StringNullableFilter<"User"> | string | null;
    role_id?: Prisma.UuidFilter<"User"> | string;
    user_status_id?: Prisma.UuidFilter<"User"> | string;
    last_login?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    created_at?: Prisma.DateTimeFilter<"User"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    orders?: Prisma.OrderListRelationFilter;
    shifts?: Prisma.ShiftListRelationFilter;
    stock_movements?: Prisma.StockMovementListRelationFilter;
    stock_opnames?: Prisma.StockOpnameListRelationFilter;
    role?: Prisma.XOR<Prisma.RoleScalarRelationFilter, Prisma.RoleWhereInput>;
    user_status?: Prisma.XOR<Prisma.UserStatusScalarRelationFilter, Prisma.UserStatusWhereInput>;
};
export type UserOrderByWithRelationInput = {
    user_id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone_number?: Prisma.SortOrderInput | Prisma.SortOrder;
    role_id?: Prisma.SortOrder;
    user_status_id?: Prisma.SortOrder;
    last_login?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    orders?: Prisma.OrderOrderByRelationAggregateInput;
    shifts?: Prisma.ShiftOrderByRelationAggregateInput;
    stock_movements?: Prisma.StockMovementOrderByRelationAggregateInput;
    stock_opnames?: Prisma.StockOpnameOrderByRelationAggregateInput;
    role?: Prisma.RoleOrderByWithRelationInput;
    user_status?: Prisma.UserStatusOrderByWithRelationInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    user_id?: string;
    username?: string;
    phone_number?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    password?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    role_id?: Prisma.UuidFilter<"User"> | string;
    user_status_id?: Prisma.UuidFilter<"User"> | string;
    last_login?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    created_at?: Prisma.DateTimeFilter<"User"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    orders?: Prisma.OrderListRelationFilter;
    shifts?: Prisma.ShiftListRelationFilter;
    stock_movements?: Prisma.StockMovementListRelationFilter;
    stock_opnames?: Prisma.StockOpnameListRelationFilter;
    role?: Prisma.XOR<Prisma.RoleScalarRelationFilter, Prisma.RoleWhereInput>;
    user_status?: Prisma.XOR<Prisma.UserStatusScalarRelationFilter, Prisma.UserStatusWhereInput>;
}, "user_id" | "username" | "phone_number">;
export type UserOrderByWithAggregationInput = {
    user_id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone_number?: Prisma.SortOrderInput | Prisma.SortOrder;
    role_id?: Prisma.SortOrder;
    user_status_id?: Prisma.SortOrder;
    last_login?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleted_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    user_id?: Prisma.UuidWithAggregatesFilter<"User"> | string;
    username?: Prisma.StringWithAggregatesFilter<"User"> | string;
    password?: Prisma.StringWithAggregatesFilter<"User"> | string;
    name?: Prisma.StringWithAggregatesFilter<"User"> | string;
    phone_number?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    role_id?: Prisma.UuidWithAggregatesFilter<"User"> | string;
    user_status_id?: Prisma.UuidWithAggregatesFilter<"User"> | string;
    last_login?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updated_at?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
};
export type UserCreateInput = {
    user_id?: string;
    username: string;
    password: string;
    name: string;
    phone_number?: string | null;
    last_login?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    shifts?: Prisma.ShiftCreateNestedManyWithoutUserInput;
    stock_movements?: Prisma.StockMovementCreateNestedManyWithoutUserInput;
    stock_opnames?: Prisma.StockOpnameCreateNestedManyWithoutUserInput;
    role: Prisma.RoleCreateNestedOneWithoutUsersInput;
    user_status: Prisma.UserStatusCreateNestedOneWithoutUsersInput;
};
export type UserUncheckedCreateInput = {
    user_id?: string;
    username: string;
    password: string;
    name: string;
    phone_number?: string | null;
    role_id: string;
    user_status_id: string;
    last_login?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    shifts?: Prisma.ShiftUncheckedCreateNestedManyWithoutUserInput;
    stock_movements?: Prisma.StockMovementUncheckedCreateNestedManyWithoutUserInput;
    stock_opnames?: Prisma.StockOpnameUncheckedCreateNestedManyWithoutUserInput;
};
export type UserUpdateInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    last_login?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    shifts?: Prisma.ShiftUpdateManyWithoutUserNestedInput;
    stock_movements?: Prisma.StockMovementUpdateManyWithoutUserNestedInput;
    stock_opnames?: Prisma.StockOpnameUpdateManyWithoutUserNestedInput;
    role?: Prisma.RoleUpdateOneRequiredWithoutUsersNestedInput;
    user_status?: Prisma.UserStatusUpdateOneRequiredWithoutUsersNestedInput;
};
export type UserUncheckedUpdateInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_status_id?: Prisma.StringFieldUpdateOperationsInput | string;
    last_login?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    shifts?: Prisma.ShiftUncheckedUpdateManyWithoutUserNestedInput;
    stock_movements?: Prisma.StockMovementUncheckedUpdateManyWithoutUserNestedInput;
    stock_opnames?: Prisma.StockOpnameUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateManyInput = {
    user_id?: string;
    username: string;
    password: string;
    name: string;
    phone_number?: string | null;
    role_id: string;
    user_status_id: string;
    last_login?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type UserUpdateManyMutationInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    last_login?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type UserUncheckedUpdateManyInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_status_id?: Prisma.StringFieldUpdateOperationsInput | string;
    last_login?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type UserCountOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone_number?: Prisma.SortOrder;
    role_id?: Prisma.SortOrder;
    user_status_id?: Prisma.SortOrder;
    last_login?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone_number?: Prisma.SortOrder;
    role_id?: Prisma.SortOrder;
    user_status_id?: Prisma.SortOrder;
    last_login?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    user_id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone_number?: Prisma.SortOrder;
    role_id?: Prisma.SortOrder;
    user_status_id?: Prisma.SortOrder;
    last_login?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    deleted_at?: Prisma.SortOrder;
};
export type UserListRelationFilter = {
    every?: Prisma.UserWhereInput;
    some?: Prisma.UserWhereInput;
    none?: Prisma.UserWhereInput;
};
export type UserOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type UserCreateNestedManyWithoutUser_statusInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutUser_statusInput, Prisma.UserUncheckedCreateWithoutUser_statusInput> | Prisma.UserCreateWithoutUser_statusInput[] | Prisma.UserUncheckedCreateWithoutUser_statusInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutUser_statusInput | Prisma.UserCreateOrConnectWithoutUser_statusInput[];
    createMany?: Prisma.UserCreateManyUser_statusInputEnvelope;
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
};
export type UserUncheckedCreateNestedManyWithoutUser_statusInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutUser_statusInput, Prisma.UserUncheckedCreateWithoutUser_statusInput> | Prisma.UserCreateWithoutUser_statusInput[] | Prisma.UserUncheckedCreateWithoutUser_statusInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutUser_statusInput | Prisma.UserCreateOrConnectWithoutUser_statusInput[];
    createMany?: Prisma.UserCreateManyUser_statusInputEnvelope;
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
};
export type UserUpdateManyWithoutUser_statusNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutUser_statusInput, Prisma.UserUncheckedCreateWithoutUser_statusInput> | Prisma.UserCreateWithoutUser_statusInput[] | Prisma.UserUncheckedCreateWithoutUser_statusInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutUser_statusInput | Prisma.UserCreateOrConnectWithoutUser_statusInput[];
    upsert?: Prisma.UserUpsertWithWhereUniqueWithoutUser_statusInput | Prisma.UserUpsertWithWhereUniqueWithoutUser_statusInput[];
    createMany?: Prisma.UserCreateManyUser_statusInputEnvelope;
    set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    update?: Prisma.UserUpdateWithWhereUniqueWithoutUser_statusInput | Prisma.UserUpdateWithWhereUniqueWithoutUser_statusInput[];
    updateMany?: Prisma.UserUpdateManyWithWhereWithoutUser_statusInput | Prisma.UserUpdateManyWithWhereWithoutUser_statusInput[];
    deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
};
export type UserUncheckedUpdateManyWithoutUser_statusNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutUser_statusInput, Prisma.UserUncheckedCreateWithoutUser_statusInput> | Prisma.UserCreateWithoutUser_statusInput[] | Prisma.UserUncheckedCreateWithoutUser_statusInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutUser_statusInput | Prisma.UserCreateOrConnectWithoutUser_statusInput[];
    upsert?: Prisma.UserUpsertWithWhereUniqueWithoutUser_statusInput | Prisma.UserUpsertWithWhereUniqueWithoutUser_statusInput[];
    createMany?: Prisma.UserCreateManyUser_statusInputEnvelope;
    set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    update?: Prisma.UserUpdateWithWhereUniqueWithoutUser_statusInput | Prisma.UserUpdateWithWhereUniqueWithoutUser_statusInput[];
    updateMany?: Prisma.UserUpdateManyWithWhereWithoutUser_statusInput | Prisma.UserUpdateManyWithWhereWithoutUser_statusInput[];
    deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
};
export type UserCreateNestedManyWithoutRoleInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRoleInput, Prisma.UserUncheckedCreateWithoutRoleInput> | Prisma.UserCreateWithoutRoleInput[] | Prisma.UserUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRoleInput | Prisma.UserCreateOrConnectWithoutRoleInput[];
    createMany?: Prisma.UserCreateManyRoleInputEnvelope;
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
};
export type UserUncheckedCreateNestedManyWithoutRoleInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRoleInput, Prisma.UserUncheckedCreateWithoutRoleInput> | Prisma.UserCreateWithoutRoleInput[] | Prisma.UserUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRoleInput | Prisma.UserCreateOrConnectWithoutRoleInput[];
    createMany?: Prisma.UserCreateManyRoleInputEnvelope;
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
};
export type UserUpdateManyWithoutRoleNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRoleInput, Prisma.UserUncheckedCreateWithoutRoleInput> | Prisma.UserCreateWithoutRoleInput[] | Prisma.UserUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRoleInput | Prisma.UserCreateOrConnectWithoutRoleInput[];
    upsert?: Prisma.UserUpsertWithWhereUniqueWithoutRoleInput | Prisma.UserUpsertWithWhereUniqueWithoutRoleInput[];
    createMany?: Prisma.UserCreateManyRoleInputEnvelope;
    set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    update?: Prisma.UserUpdateWithWhereUniqueWithoutRoleInput | Prisma.UserUpdateWithWhereUniqueWithoutRoleInput[];
    updateMany?: Prisma.UserUpdateManyWithWhereWithoutRoleInput | Prisma.UserUpdateManyWithWhereWithoutRoleInput[];
    deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
};
export type UserUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRoleInput, Prisma.UserUncheckedCreateWithoutRoleInput> | Prisma.UserCreateWithoutRoleInput[] | Prisma.UserUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRoleInput | Prisma.UserCreateOrConnectWithoutRoleInput[];
    upsert?: Prisma.UserUpsertWithWhereUniqueWithoutRoleInput | Prisma.UserUpsertWithWhereUniqueWithoutRoleInput[];
    createMany?: Prisma.UserCreateManyRoleInputEnvelope;
    set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    update?: Prisma.UserUpdateWithWhereUniqueWithoutRoleInput | Prisma.UserUpdateWithWhereUniqueWithoutRoleInput[];
    updateMany?: Prisma.UserUpdateManyWithWhereWithoutRoleInput | Prisma.UserUpdateManyWithWhereWithoutRoleInput[];
    deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
};
export type UserCreateNestedOneWithoutStock_movementsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutStock_movementsInput, Prisma.UserUncheckedCreateWithoutStock_movementsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutStock_movementsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutStock_movementsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutStock_movementsInput, Prisma.UserUncheckedCreateWithoutStock_movementsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutStock_movementsInput;
    upsert?: Prisma.UserUpsertWithoutStock_movementsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutStock_movementsInput, Prisma.UserUpdateWithoutStock_movementsInput>, Prisma.UserUncheckedUpdateWithoutStock_movementsInput>;
};
export type UserCreateNestedOneWithoutStock_opnamesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutStock_opnamesInput, Prisma.UserUncheckedCreateWithoutStock_opnamesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutStock_opnamesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutStock_opnamesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutStock_opnamesInput, Prisma.UserUncheckedCreateWithoutStock_opnamesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutStock_opnamesInput;
    upsert?: Prisma.UserUpsertWithoutStock_opnamesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutStock_opnamesInput, Prisma.UserUpdateWithoutStock_opnamesInput>, Prisma.UserUncheckedUpdateWithoutStock_opnamesInput>;
};
export type UserCreateNestedOneWithoutShiftsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutShiftsInput, Prisma.UserUncheckedCreateWithoutShiftsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutShiftsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutShiftsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutShiftsInput, Prisma.UserUncheckedCreateWithoutShiftsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutShiftsInput;
    upsert?: Prisma.UserUpsertWithoutShiftsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutShiftsInput, Prisma.UserUpdateWithoutShiftsInput>, Prisma.UserUncheckedUpdateWithoutShiftsInput>;
};
export type UserCreateNestedOneWithoutOrdersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOrdersInput, Prisma.UserUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOrdersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOrdersInput, Prisma.UserUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOrdersInput;
    upsert?: Prisma.UserUpsertWithoutOrdersInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutOrdersInput, Prisma.UserUpdateWithoutOrdersInput>, Prisma.UserUncheckedUpdateWithoutOrdersInput>;
};
export type UserCreateWithoutUser_statusInput = {
    user_id?: string;
    username: string;
    password: string;
    name: string;
    phone_number?: string | null;
    last_login?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    shifts?: Prisma.ShiftCreateNestedManyWithoutUserInput;
    stock_movements?: Prisma.StockMovementCreateNestedManyWithoutUserInput;
    stock_opnames?: Prisma.StockOpnameCreateNestedManyWithoutUserInput;
    role: Prisma.RoleCreateNestedOneWithoutUsersInput;
};
export type UserUncheckedCreateWithoutUser_statusInput = {
    user_id?: string;
    username: string;
    password: string;
    name: string;
    phone_number?: string | null;
    role_id: string;
    last_login?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    shifts?: Prisma.ShiftUncheckedCreateNestedManyWithoutUserInput;
    stock_movements?: Prisma.StockMovementUncheckedCreateNestedManyWithoutUserInput;
    stock_opnames?: Prisma.StockOpnameUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutUser_statusInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutUser_statusInput, Prisma.UserUncheckedCreateWithoutUser_statusInput>;
};
export type UserCreateManyUser_statusInputEnvelope = {
    data: Prisma.UserCreateManyUser_statusInput | Prisma.UserCreateManyUser_statusInput[];
    skipDuplicates?: boolean;
};
export type UserUpsertWithWhereUniqueWithoutUser_statusInput = {
    where: Prisma.UserWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserUpdateWithoutUser_statusInput, Prisma.UserUncheckedUpdateWithoutUser_statusInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutUser_statusInput, Prisma.UserUncheckedCreateWithoutUser_statusInput>;
};
export type UserUpdateWithWhereUniqueWithoutUser_statusInput = {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutUser_statusInput, Prisma.UserUncheckedUpdateWithoutUser_statusInput>;
};
export type UserUpdateManyWithWhereWithoutUser_statusInput = {
    where: Prisma.UserScalarWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyWithoutUser_statusInput>;
};
export type UserScalarWhereInput = {
    AND?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
    OR?: Prisma.UserScalarWhereInput[];
    NOT?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
    user_id?: Prisma.UuidFilter<"User"> | string;
    username?: Prisma.StringFilter<"User"> | string;
    password?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    phone_number?: Prisma.StringNullableFilter<"User"> | string | null;
    role_id?: Prisma.UuidFilter<"User"> | string;
    user_status_id?: Prisma.UuidFilter<"User"> | string;
    last_login?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    created_at?: Prisma.DateTimeFilter<"User"> | Date | string;
    updated_at?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    deleted_at?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
};
export type UserCreateWithoutRoleInput = {
    user_id?: string;
    username: string;
    password: string;
    name: string;
    phone_number?: string | null;
    last_login?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    shifts?: Prisma.ShiftCreateNestedManyWithoutUserInput;
    stock_movements?: Prisma.StockMovementCreateNestedManyWithoutUserInput;
    stock_opnames?: Prisma.StockOpnameCreateNestedManyWithoutUserInput;
    user_status: Prisma.UserStatusCreateNestedOneWithoutUsersInput;
};
export type UserUncheckedCreateWithoutRoleInput = {
    user_id?: string;
    username: string;
    password: string;
    name: string;
    phone_number?: string | null;
    user_status_id: string;
    last_login?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    shifts?: Prisma.ShiftUncheckedCreateNestedManyWithoutUserInput;
    stock_movements?: Prisma.StockMovementUncheckedCreateNestedManyWithoutUserInput;
    stock_opnames?: Prisma.StockOpnameUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutRoleInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutRoleInput, Prisma.UserUncheckedCreateWithoutRoleInput>;
};
export type UserCreateManyRoleInputEnvelope = {
    data: Prisma.UserCreateManyRoleInput | Prisma.UserCreateManyRoleInput[];
    skipDuplicates?: boolean;
};
export type UserUpsertWithWhereUniqueWithoutRoleInput = {
    where: Prisma.UserWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserUpdateWithoutRoleInput, Prisma.UserUncheckedUpdateWithoutRoleInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutRoleInput, Prisma.UserUncheckedCreateWithoutRoleInput>;
};
export type UserUpdateWithWhereUniqueWithoutRoleInput = {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutRoleInput, Prisma.UserUncheckedUpdateWithoutRoleInput>;
};
export type UserUpdateManyWithWhereWithoutRoleInput = {
    where: Prisma.UserScalarWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyWithoutRoleInput>;
};
export type UserCreateWithoutStock_movementsInput = {
    user_id?: string;
    username: string;
    password: string;
    name: string;
    phone_number?: string | null;
    last_login?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    shifts?: Prisma.ShiftCreateNestedManyWithoutUserInput;
    stock_opnames?: Prisma.StockOpnameCreateNestedManyWithoutUserInput;
    role: Prisma.RoleCreateNestedOneWithoutUsersInput;
    user_status: Prisma.UserStatusCreateNestedOneWithoutUsersInput;
};
export type UserUncheckedCreateWithoutStock_movementsInput = {
    user_id?: string;
    username: string;
    password: string;
    name: string;
    phone_number?: string | null;
    role_id: string;
    user_status_id: string;
    last_login?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    shifts?: Prisma.ShiftUncheckedCreateNestedManyWithoutUserInput;
    stock_opnames?: Prisma.StockOpnameUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutStock_movementsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutStock_movementsInput, Prisma.UserUncheckedCreateWithoutStock_movementsInput>;
};
export type UserUpsertWithoutStock_movementsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutStock_movementsInput, Prisma.UserUncheckedUpdateWithoutStock_movementsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutStock_movementsInput, Prisma.UserUncheckedCreateWithoutStock_movementsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutStock_movementsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutStock_movementsInput, Prisma.UserUncheckedUpdateWithoutStock_movementsInput>;
};
export type UserUpdateWithoutStock_movementsInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    last_login?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    shifts?: Prisma.ShiftUpdateManyWithoutUserNestedInput;
    stock_opnames?: Prisma.StockOpnameUpdateManyWithoutUserNestedInput;
    role?: Prisma.RoleUpdateOneRequiredWithoutUsersNestedInput;
    user_status?: Prisma.UserStatusUpdateOneRequiredWithoutUsersNestedInput;
};
export type UserUncheckedUpdateWithoutStock_movementsInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_status_id?: Prisma.StringFieldUpdateOperationsInput | string;
    last_login?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    shifts?: Prisma.ShiftUncheckedUpdateManyWithoutUserNestedInput;
    stock_opnames?: Prisma.StockOpnameUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutStock_opnamesInput = {
    user_id?: string;
    username: string;
    password: string;
    name: string;
    phone_number?: string | null;
    last_login?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    shifts?: Prisma.ShiftCreateNestedManyWithoutUserInput;
    stock_movements?: Prisma.StockMovementCreateNestedManyWithoutUserInput;
    role: Prisma.RoleCreateNestedOneWithoutUsersInput;
    user_status: Prisma.UserStatusCreateNestedOneWithoutUsersInput;
};
export type UserUncheckedCreateWithoutStock_opnamesInput = {
    user_id?: string;
    username: string;
    password: string;
    name: string;
    phone_number?: string | null;
    role_id: string;
    user_status_id: string;
    last_login?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    shifts?: Prisma.ShiftUncheckedCreateNestedManyWithoutUserInput;
    stock_movements?: Prisma.StockMovementUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutStock_opnamesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutStock_opnamesInput, Prisma.UserUncheckedCreateWithoutStock_opnamesInput>;
};
export type UserUpsertWithoutStock_opnamesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutStock_opnamesInput, Prisma.UserUncheckedUpdateWithoutStock_opnamesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutStock_opnamesInput, Prisma.UserUncheckedCreateWithoutStock_opnamesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutStock_opnamesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutStock_opnamesInput, Prisma.UserUncheckedUpdateWithoutStock_opnamesInput>;
};
export type UserUpdateWithoutStock_opnamesInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    last_login?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    shifts?: Prisma.ShiftUpdateManyWithoutUserNestedInput;
    stock_movements?: Prisma.StockMovementUpdateManyWithoutUserNestedInput;
    role?: Prisma.RoleUpdateOneRequiredWithoutUsersNestedInput;
    user_status?: Prisma.UserStatusUpdateOneRequiredWithoutUsersNestedInput;
};
export type UserUncheckedUpdateWithoutStock_opnamesInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_status_id?: Prisma.StringFieldUpdateOperationsInput | string;
    last_login?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    shifts?: Prisma.ShiftUncheckedUpdateManyWithoutUserNestedInput;
    stock_movements?: Prisma.StockMovementUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutShiftsInput = {
    user_id?: string;
    username: string;
    password: string;
    name: string;
    phone_number?: string | null;
    last_login?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    stock_movements?: Prisma.StockMovementCreateNestedManyWithoutUserInput;
    stock_opnames?: Prisma.StockOpnameCreateNestedManyWithoutUserInput;
    role: Prisma.RoleCreateNestedOneWithoutUsersInput;
    user_status: Prisma.UserStatusCreateNestedOneWithoutUsersInput;
};
export type UserUncheckedCreateWithoutShiftsInput = {
    user_id?: string;
    username: string;
    password: string;
    name: string;
    phone_number?: string | null;
    role_id: string;
    user_status_id: string;
    last_login?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    stock_movements?: Prisma.StockMovementUncheckedCreateNestedManyWithoutUserInput;
    stock_opnames?: Prisma.StockOpnameUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutShiftsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutShiftsInput, Prisma.UserUncheckedCreateWithoutShiftsInput>;
};
export type UserUpsertWithoutShiftsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutShiftsInput, Prisma.UserUncheckedUpdateWithoutShiftsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutShiftsInput, Prisma.UserUncheckedCreateWithoutShiftsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutShiftsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutShiftsInput, Prisma.UserUncheckedUpdateWithoutShiftsInput>;
};
export type UserUpdateWithoutShiftsInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    last_login?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    stock_movements?: Prisma.StockMovementUpdateManyWithoutUserNestedInput;
    stock_opnames?: Prisma.StockOpnameUpdateManyWithoutUserNestedInput;
    role?: Prisma.RoleUpdateOneRequiredWithoutUsersNestedInput;
    user_status?: Prisma.UserStatusUpdateOneRequiredWithoutUsersNestedInput;
};
export type UserUncheckedUpdateWithoutShiftsInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_status_id?: Prisma.StringFieldUpdateOperationsInput | string;
    last_login?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    stock_movements?: Prisma.StockMovementUncheckedUpdateManyWithoutUserNestedInput;
    stock_opnames?: Prisma.StockOpnameUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutOrdersInput = {
    user_id?: string;
    username: string;
    password: string;
    name: string;
    phone_number?: string | null;
    last_login?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    shifts?: Prisma.ShiftCreateNestedManyWithoutUserInput;
    stock_movements?: Prisma.StockMovementCreateNestedManyWithoutUserInput;
    stock_opnames?: Prisma.StockOpnameCreateNestedManyWithoutUserInput;
    role: Prisma.RoleCreateNestedOneWithoutUsersInput;
    user_status: Prisma.UserStatusCreateNestedOneWithoutUsersInput;
};
export type UserUncheckedCreateWithoutOrdersInput = {
    user_id?: string;
    username: string;
    password: string;
    name: string;
    phone_number?: string | null;
    role_id: string;
    user_status_id: string;
    last_login?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
    shifts?: Prisma.ShiftUncheckedCreateNestedManyWithoutUserInput;
    stock_movements?: Prisma.StockMovementUncheckedCreateNestedManyWithoutUserInput;
    stock_opnames?: Prisma.StockOpnameUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutOrdersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutOrdersInput, Prisma.UserUncheckedCreateWithoutOrdersInput>;
};
export type UserUpsertWithoutOrdersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutOrdersInput, Prisma.UserUncheckedUpdateWithoutOrdersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutOrdersInput, Prisma.UserUncheckedCreateWithoutOrdersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutOrdersInput, Prisma.UserUncheckedUpdateWithoutOrdersInput>;
};
export type UserUpdateWithoutOrdersInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    last_login?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    shifts?: Prisma.ShiftUpdateManyWithoutUserNestedInput;
    stock_movements?: Prisma.StockMovementUpdateManyWithoutUserNestedInput;
    stock_opnames?: Prisma.StockOpnameUpdateManyWithoutUserNestedInput;
    role?: Prisma.RoleUpdateOneRequiredWithoutUsersNestedInput;
    user_status?: Prisma.UserStatusUpdateOneRequiredWithoutUsersNestedInput;
};
export type UserUncheckedUpdateWithoutOrdersInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role_id?: Prisma.StringFieldUpdateOperationsInput | string;
    user_status_id?: Prisma.StringFieldUpdateOperationsInput | string;
    last_login?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    shifts?: Prisma.ShiftUncheckedUpdateManyWithoutUserNestedInput;
    stock_movements?: Prisma.StockMovementUncheckedUpdateManyWithoutUserNestedInput;
    stock_opnames?: Prisma.StockOpnameUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateManyUser_statusInput = {
    user_id?: string;
    username: string;
    password: string;
    name: string;
    phone_number?: string | null;
    role_id: string;
    last_login?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type UserUpdateWithoutUser_statusInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    last_login?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    shifts?: Prisma.ShiftUpdateManyWithoutUserNestedInput;
    stock_movements?: Prisma.StockMovementUpdateManyWithoutUserNestedInput;
    stock_opnames?: Prisma.StockOpnameUpdateManyWithoutUserNestedInput;
    role?: Prisma.RoleUpdateOneRequiredWithoutUsersNestedInput;
};
export type UserUncheckedUpdateWithoutUser_statusInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role_id?: Prisma.StringFieldUpdateOperationsInput | string;
    last_login?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    shifts?: Prisma.ShiftUncheckedUpdateManyWithoutUserNestedInput;
    stock_movements?: Prisma.StockMovementUncheckedUpdateManyWithoutUserNestedInput;
    stock_opnames?: Prisma.StockOpnameUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateManyWithoutUser_statusInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role_id?: Prisma.StringFieldUpdateOperationsInput | string;
    last_login?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type UserCreateManyRoleInput = {
    user_id?: string;
    username: string;
    password: string;
    name: string;
    phone_number?: string | null;
    user_status_id: string;
    last_login?: Date | string | null;
    created_at?: Date | string;
    updated_at?: Date | string | null;
    deleted_at?: Date | string | null;
};
export type UserUpdateWithoutRoleInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    last_login?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    shifts?: Prisma.ShiftUpdateManyWithoutUserNestedInput;
    stock_movements?: Prisma.StockMovementUpdateManyWithoutUserNestedInput;
    stock_opnames?: Prisma.StockOpnameUpdateManyWithoutUserNestedInput;
    user_status?: Prisma.UserStatusUpdateOneRequiredWithoutUsersNestedInput;
};
export type UserUncheckedUpdateWithoutRoleInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_status_id?: Prisma.StringFieldUpdateOperationsInput | string;
    last_login?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    shifts?: Prisma.ShiftUncheckedUpdateManyWithoutUserNestedInput;
    stock_movements?: Prisma.StockMovementUncheckedUpdateManyWithoutUserNestedInput;
    stock_opnames?: Prisma.StockOpnameUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateManyWithoutRoleInput = {
    user_id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone_number?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user_status_id?: Prisma.StringFieldUpdateOperationsInput | string;
    last_login?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleted_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type UserCountOutputType
 */
export type UserCountOutputType = {
    orders: number;
    shifts: number;
    stock_movements: number;
    stock_opnames: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    orders?: boolean | UserCountOutputTypeCountOrdersArgs;
    shifts?: boolean | UserCountOutputTypeCountShiftsArgs;
    stock_movements?: boolean | UserCountOutputTypeCountStock_movementsArgs;
    stock_opnames?: boolean | UserCountOutputTypeCountStock_opnamesArgs;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountShiftsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShiftWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountStock_movementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockMovementWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountStock_opnamesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockOpnameWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    user_id?: boolean;
    username?: boolean;
    password?: boolean;
    name?: boolean;
    phone_number?: boolean;
    role_id?: boolean;
    user_status_id?: boolean;
    last_login?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    orders?: boolean | Prisma.User$ordersArgs<ExtArgs>;
    shifts?: boolean | Prisma.User$shiftsArgs<ExtArgs>;
    stock_movements?: boolean | Prisma.User$stock_movementsArgs<ExtArgs>;
    stock_opnames?: boolean | Prisma.User$stock_opnamesArgs<ExtArgs>;
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    user_status?: boolean | Prisma.UserStatusDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    user_id?: boolean;
    username?: boolean;
    password?: boolean;
    name?: boolean;
    phone_number?: boolean;
    role_id?: boolean;
    user_status_id?: boolean;
    last_login?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    user_status?: boolean | Prisma.UserStatusDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    user_id?: boolean;
    username?: boolean;
    password?: boolean;
    name?: boolean;
    phone_number?: boolean;
    role_id?: boolean;
    user_status_id?: boolean;
    last_login?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    user_status?: boolean | Prisma.UserStatusDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    user_id?: boolean;
    username?: boolean;
    password?: boolean;
    name?: boolean;
    phone_number?: boolean;
    role_id?: boolean;
    user_status_id?: boolean;
    last_login?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"user_id" | "username" | "password" | "name" | "phone_number" | "role_id" | "user_status_id" | "last_login" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    orders?: boolean | Prisma.User$ordersArgs<ExtArgs>;
    shifts?: boolean | Prisma.User$shiftsArgs<ExtArgs>;
    stock_movements?: boolean | Prisma.User$stock_movementsArgs<ExtArgs>;
    stock_opnames?: boolean | Prisma.User$stock_opnamesArgs<ExtArgs>;
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    user_status?: boolean | Prisma.UserStatusDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    user_status?: boolean | Prisma.UserStatusDefaultArgs<ExtArgs>;
};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    user_status?: boolean | Prisma.UserStatusDefaultArgs<ExtArgs>;
};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        orders: Prisma.$OrderPayload<ExtArgs>[];
        shifts: Prisma.$ShiftPayload<ExtArgs>[];
        stock_movements: Prisma.$StockMovementPayload<ExtArgs>[];
        stock_opnames: Prisma.$StockOpnamePayload<ExtArgs>[];
        role: Prisma.$RolePayload<ExtArgs>;
        user_status: Prisma.$UserStatusPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        user_id: string;
        username: string;
        password: string;
        name: string;
        phone_number: string | null;
        role_id: string;
        user_status_id: string;
        last_login: Date | null;
        created_at: Date;
        updated_at: Date | null;
        deleted_at: Date | null;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `user_id`
     * const userWithUser_idOnly = await prisma.user.findMany({ select: { user_id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `user_id`
     * const userWithUser_idOnly = await prisma.user.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `user_id`
     * const userWithUser_idOnly = await prisma.user.updateManyAndReturn({
     *   select: { user_id: true },
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    orders<T extends Prisma.User$ordersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    shifts<T extends Prisma.User$shiftsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$shiftsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    stock_movements<T extends Prisma.User$stock_movementsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$stock_movementsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    stock_opnames<T extends Prisma.User$stock_opnamesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$stock_opnamesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockOpnamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    role<T extends Prisma.RoleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RoleDefaultArgs<ExtArgs>>): Prisma.Prisma__RoleClient<runtime.Types.Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user_status<T extends Prisma.UserStatusDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserStatusDefaultArgs<ExtArgs>>): Prisma.Prisma__UserStatusClient<runtime.Types.Result.GetResult<Prisma.$UserStatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the User model
 */
export interface UserFieldRefs {
    readonly user_id: Prisma.FieldRef<"User", 'String'>;
    readonly username: Prisma.FieldRef<"User", 'String'>;
    readonly password: Prisma.FieldRef<"User", 'String'>;
    readonly name: Prisma.FieldRef<"User", 'String'>;
    readonly phone_number: Prisma.FieldRef<"User", 'String'>;
    readonly role_id: Prisma.FieldRef<"User", 'String'>;
    readonly user_status_id: Prisma.FieldRef<"User", 'String'>;
    readonly last_login: Prisma.FieldRef<"User", 'DateTime'>;
    readonly created_at: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"User", 'DateTime'>;
    readonly deleted_at: Prisma.FieldRef<"User", 'DateTime'>;
}
/**
 * User findUnique
 */
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findUniqueOrThrow
 */
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findFirst
 */
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findFirstOrThrow
 */
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findMany
 */
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User create
 */
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
/**
 * User createMany
 */
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User createManyAndReturn
 */
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * User update
 */
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User updateMany
 */
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User updateManyAndReturn
 */
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * User upsert
 */
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: Prisma.UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
/**
 * User delete
 */
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User deleteMany
 */
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
};
/**
 * User.orders
 */
export type User$ordersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * User.shifts
 */
export type User$shiftsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.ShiftWhereInput;
    orderBy?: Prisma.ShiftOrderByWithRelationInput | Prisma.ShiftOrderByWithRelationInput[];
    cursor?: Prisma.ShiftWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShiftScalarFieldEnum | Prisma.ShiftScalarFieldEnum[];
};
/**
 * User.stock_movements
 */
export type User$stock_movementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * User.stock_opnames
 */
export type User$stock_opnamesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.StockOpnameWhereInput;
    orderBy?: Prisma.StockOpnameOrderByWithRelationInput | Prisma.StockOpnameOrderByWithRelationInput[];
    cursor?: Prisma.StockOpnameWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StockOpnameScalarFieldEnum | Prisma.StockOpnameScalarFieldEnum[];
};
/**
 * User without action
 */
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=User.d.ts.map