import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
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
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
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
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.user`: Exposes CRUD operations for the **User** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Users
  * const users = await prisma.user.findMany()
  * ```
  */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.supplier`: Exposes CRUD operations for the **Supplier** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Suppliers
      * const suppliers = await prisma.supplier.findMany()
      * ```
      */
    get supplier(): Prisma.SupplierDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.ingredient`: Exposes CRUD operations for the **Ingredient** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Ingredients
      * const ingredients = await prisma.ingredient.findMany()
      * ```
      */
    get ingredient(): Prisma.IngredientDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.ingredientComposition`: Exposes CRUD operations for the **IngredientComposition** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more IngredientCompositions
      * const ingredientCompositions = await prisma.ingredientComposition.findMany()
      * ```
      */
    get ingredientComposition(): Prisma.IngredientCompositionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.menu`: Exposes CRUD operations for the **Menu** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Menus
      * const menus = await prisma.menu.findMany()
      * ```
      */
    get menu(): Prisma.MenuDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.menuRecipe`: Exposes CRUD operations for the **MenuRecipe** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more MenuRecipes
      * const menuRecipes = await prisma.menuRecipe.findMany()
      * ```
      */
    get menuRecipe(): Prisma.MenuRecipeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.unitMeasure`: Exposes CRUD operations for the **UnitMeasure** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more UnitMeasures
      * const unitMeasures = await prisma.unitMeasure.findMany()
      * ```
      */
    get unitMeasure(): Prisma.UnitMeasureDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.category`: Exposes CRUD operations for the **Category** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Categories
      * const categories = await prisma.category.findMany()
      * ```
      */
    get category(): Prisma.CategoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.storeSetting`: Exposes CRUD operations for the **StoreSetting** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more StoreSettings
      * const storeSettings = await prisma.storeSetting.findMany()
      * ```
      */
    get storeSetting(): Prisma.StoreSettingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.stockType`: Exposes CRUD operations for the **StockType** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more StockTypes
      * const stockTypes = await prisma.stockType.findMany()
      * ```
      */
    get stockType(): Prisma.StockTypeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.userStatus`: Exposes CRUD operations for the **UserStatus** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more UserStatuses
      * const userStatuses = await prisma.userStatus.findMany()
      * ```
      */
    get userStatus(): Prisma.UserStatusDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.role`: Exposes CRUD operations for the **Role** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Roles
      * const roles = await prisma.role.findMany()
      * ```
      */
    get role(): Prisma.RoleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.stockMovement`: Exposes CRUD operations for the **StockMovement** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more StockMovements
      * const stockMovements = await prisma.stockMovement.findMany()
      * ```
      */
    get stockMovement(): Prisma.StockMovementDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.stockOpname`: Exposes CRUD operations for the **StockOpname** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more StockOpnames
      * const stockOpnames = await prisma.stockOpname.findMany()
      * ```
      */
    get stockOpname(): Prisma.StockOpnameDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.stockOpnameItem`: Exposes CRUD operations for the **StockOpnameItem** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more StockOpnameItems
      * const stockOpnameItems = await prisma.stockOpnameItem.findMany()
      * ```
      */
    get stockOpnameItem(): Prisma.StockOpnameItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.shift`: Exposes CRUD operations for the **Shift** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Shifts
      * const shifts = await prisma.shift.findMany()
      * ```
      */
    get shift(): Prisma.ShiftDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.cashMovement`: Exposes CRUD operations for the **CashMovement** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CashMovements
      * const cashMovements = await prisma.cashMovement.findMany()
      * ```
      */
    get cashMovement(): Prisma.CashMovementDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.order`: Exposes CRUD operations for the **Order** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Orders
      * const orders = await prisma.order.findMany()
      * ```
      */
    get order(): Prisma.OrderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OrderItems
      * const orderItems = await prisma.orderItem.findMany()
      * ```
      */
    get orderItem(): Prisma.OrderItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map