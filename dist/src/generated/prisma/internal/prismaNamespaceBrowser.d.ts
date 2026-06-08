import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client/runtime/client").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client/runtime/client").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Supplier: "Supplier";
    readonly Ingredient: "Ingredient";
    readonly IngredientComposition: "IngredientComposition";
    readonly Menu: "Menu";
    readonly MenuRecipe: "MenuRecipe";
    readonly UnitMeasure: "UnitMeasure";
    readonly Category: "Category";
    readonly StoreSetting: "StoreSetting";
    readonly StockType: "StockType";
    readonly UserStatus: "UserStatus";
    readonly Role: "Role";
    readonly StockMovement: "StockMovement";
    readonly StockOpname: "StockOpname";
    readonly StockOpnameItem: "StockOpnameItem";
    readonly Shift: "Shift";
    readonly CashMovement: "CashMovement";
    readonly Order: "Order";
    readonly OrderItem: "OrderItem";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly user_id: "user_id";
    readonly username: "username";
    readonly password: "password";
    readonly name: "name";
    readonly phone_number: "phone_number";
    readonly role_id: "role_id";
    readonly user_status_id: "user_status_id";
    readonly last_login: "last_login";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly deleted_at: "deleted_at";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SupplierScalarFieldEnum: {
    readonly supplier_id: "supplier_id";
    readonly name: "name";
    readonly phone: "phone";
    readonly address: "address";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly deleted_at: "deleted_at";
};
export type SupplierScalarFieldEnum = (typeof SupplierScalarFieldEnum)[keyof typeof SupplierScalarFieldEnum];
export declare const IngredientScalarFieldEnum: {
    readonly ingredient_id: "ingredient_id";
    readonly unit_id: "unit_id";
    readonly name: "name";
    readonly type: "type";
    readonly stock_qty: "stock_qty";
    readonly min_stock: "min_stock";
    readonly avg_cost: "avg_cost";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly deleted_at: "deleted_at";
};
export type IngredientScalarFieldEnum = (typeof IngredientScalarFieldEnum)[keyof typeof IngredientScalarFieldEnum];
export declare const IngredientCompositionScalarFieldEnum: {
    readonly ingredient_composition_id: "ingredient_composition_id";
    readonly parent_id: "parent_id";
    readonly child_id: "child_id";
    readonly qty_needed: "qty_needed";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly deleted_at: "deleted_at";
};
export type IngredientCompositionScalarFieldEnum = (typeof IngredientCompositionScalarFieldEnum)[keyof typeof IngredientCompositionScalarFieldEnum];
export declare const MenuScalarFieldEnum: {
    readonly menu_id: "menu_id";
    readonly category_id: "category_id";
    readonly name: "name";
    readonly price: "price";
    readonly cost: "cost";
    readonly description: "description";
    readonly image_url: "image_url";
    readonly is_available: "is_available";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly deleted_at: "deleted_at";
};
export type MenuScalarFieldEnum = (typeof MenuScalarFieldEnum)[keyof typeof MenuScalarFieldEnum];
export declare const MenuRecipeScalarFieldEnum: {
    readonly menu_recipe_id: "menu_recipe_id";
    readonly menu_id: "menu_id";
    readonly ingredient_id: "ingredient_id";
    readonly qty_needed: "qty_needed";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly deleted_at: "deleted_at";
};
export type MenuRecipeScalarFieldEnum = (typeof MenuRecipeScalarFieldEnum)[keyof typeof MenuRecipeScalarFieldEnum];
export declare const UnitMeasureScalarFieldEnum: {
    readonly unit_measure_id: "unit_measure_id";
    readonly name: "name";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly deleted_at: "deleted_at";
};
export type UnitMeasureScalarFieldEnum = (typeof UnitMeasureScalarFieldEnum)[keyof typeof UnitMeasureScalarFieldEnum];
export declare const CategoryScalarFieldEnum: {
    readonly category_id: "category_id";
    readonly name: "name";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly deleted_at: "deleted_at";
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const StoreSettingScalarFieldEnum: {
    readonly store_setting_id: "store_setting_id";
    readonly setting_key: "setting_key";
    readonly setting_value: "setting_value";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly deleted_at: "deleted_at";
};
export type StoreSettingScalarFieldEnum = (typeof StoreSettingScalarFieldEnum)[keyof typeof StoreSettingScalarFieldEnum];
export declare const StockTypeScalarFieldEnum: {
    readonly stock_type_id: "stock_type_id";
    readonly name: "name";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly deleted_at: "deleted_at";
};
export type StockTypeScalarFieldEnum = (typeof StockTypeScalarFieldEnum)[keyof typeof StockTypeScalarFieldEnum];
export declare const UserStatusScalarFieldEnum: {
    readonly user_status_id: "user_status_id";
    readonly name: "name";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly deleted_at: "deleted_at";
};
export type UserStatusScalarFieldEnum = (typeof UserStatusScalarFieldEnum)[keyof typeof UserStatusScalarFieldEnum];
export declare const RoleScalarFieldEnum: {
    readonly role_id: "role_id";
    readonly name: "name";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly deleted_at: "deleted_at";
};
export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum];
export declare const StockMovementScalarFieldEnum: {
    readonly stock_movement_id: "stock_movement_id";
    readonly supplier_id: "supplier_id";
    readonly ingredient_id: "ingredient_id";
    readonly user_id: "user_id";
    readonly stock_type_id: "stock_type_id";
    readonly qty: "qty";
    readonly unit_cost: "unit_cost";
    readonly current_stock: "current_stock";
    readonly notes: "notes";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly deleted_at: "deleted_at";
};
export type StockMovementScalarFieldEnum = (typeof StockMovementScalarFieldEnum)[keyof typeof StockMovementScalarFieldEnum];
export declare const StockOpnameScalarFieldEnum: {
    readonly stock_opname_id: "stock_opname_id";
    readonly user_id: "user_id";
    readonly opname_date: "opname_date";
    readonly status: "status";
    readonly notes: "notes";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly deleted_at: "deleted_at";
};
export type StockOpnameScalarFieldEnum = (typeof StockOpnameScalarFieldEnum)[keyof typeof StockOpnameScalarFieldEnum];
export declare const StockOpnameItemScalarFieldEnum: {
    readonly stock_opname_item_id: "stock_opname_item_id";
    readonly stock_opname_id: "stock_opname_id";
    readonly ingredient_id: "ingredient_id";
    readonly system_qty: "system_qty";
    readonly physical_qty: "physical_qty";
    readonly difference: "difference";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly deleted_at: "deleted_at";
};
export type StockOpnameItemScalarFieldEnum = (typeof StockOpnameItemScalarFieldEnum)[keyof typeof StockOpnameItemScalarFieldEnum];
export declare const ShiftScalarFieldEnum: {
    readonly shift_id: "shift_id";
    readonly user_id: "user_id";
    readonly start_cash: "start_cash";
    readonly end_cash: "end_cash";
    readonly sold_total: "sold_total";
    readonly start_time: "start_time";
    readonly end_time: "end_time";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly deleted_at: "deleted_at";
};
export type ShiftScalarFieldEnum = (typeof ShiftScalarFieldEnum)[keyof typeof ShiftScalarFieldEnum];
export declare const CashMovementScalarFieldEnum: {
    readonly cash_movement_id: "cash_movement_id";
    readonly shift_id: "shift_id";
    readonly type: "type";
    readonly amount: "amount";
    readonly note: "note";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly deleted_at: "deleted_at";
};
export type CashMovementScalarFieldEnum = (typeof CashMovementScalarFieldEnum)[keyof typeof CashMovementScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly order_id: "order_id";
    readonly shift_id: "shift_id";
    readonly user_id: "user_id";
    readonly customer_name: "customer_name";
    readonly customer_phone: "customer_phone";
    readonly receipt: "receipt";
    readonly total_amount: "total_amount";
    readonly paid_amount: "paid_amount";
    readonly change_amount: "change_amount";
    readonly payment_type: "payment_type";
    readonly status: "status";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly deleted_at: "deleted_at";
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const OrderItemScalarFieldEnum: {
    readonly order_item_id: "order_item_id";
    readonly order_id: "order_id";
    readonly menu_id: "menu_id";
    readonly qty: "qty";
    readonly price: "price";
    readonly subtotal: "subtotal";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly deleted_at: "deleted_at";
};
export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map