import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class.js";
import * as Prisma from "./internal/prismaNamespace.js";
export * as $Enums from './enums.js';
export * from "./enums.js";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model Supplier
 *
 */
export type Supplier = Prisma.SupplierModel;
/**
 * Model Ingredient
 *
 */
export type Ingredient = Prisma.IngredientModel;
/**
 * Model IngredientComposition
 *
 */
export type IngredientComposition = Prisma.IngredientCompositionModel;
/**
 * Model Menu
 *
 */
export type Menu = Prisma.MenuModel;
/**
 * Model MenuRecipe
 *
 */
export type MenuRecipe = Prisma.MenuRecipeModel;
/**
 * Model UnitMeasure
 *
 */
export type UnitMeasure = Prisma.UnitMeasureModel;
/**
 * Model Category
 *
 */
export type Category = Prisma.CategoryModel;
/**
 * Model StoreSetting
 *
 */
export type StoreSetting = Prisma.StoreSettingModel;
/**
 * Model StockType
 *
 */
export type StockType = Prisma.StockTypeModel;
/**
 * Model UserStatus
 *
 */
export type UserStatus = Prisma.UserStatusModel;
/**
 * Model Role
 *
 */
export type Role = Prisma.RoleModel;
/**
 * Model StockMovement
 *
 */
export type StockMovement = Prisma.StockMovementModel;
/**
 * Model StockOpname
 *
 */
export type StockOpname = Prisma.StockOpnameModel;
/**
 * Model StockOpnameItem
 *
 */
export type StockOpnameItem = Prisma.StockOpnameItemModel;
/**
 * Model Shift
 *
 */
export type Shift = Prisma.ShiftModel;
/**
 * Model CashMovement
 *
 */
export type CashMovement = Prisma.CashMovementModel;
/**
 * Model Order
 *
 */
export type Order = Prisma.OrderModel;
/**
 * Model OrderItem
 *
 */
export type OrderItem = Prisma.OrderItemModel;
//# sourceMappingURL=client.d.ts.map