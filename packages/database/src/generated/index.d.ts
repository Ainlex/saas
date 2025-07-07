
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions

export type PrismaPromise<T> = $Public.PrismaPromise<T>


export type EmpresaPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Empresa"
  objects: {
    usuarios: UsuarioPayload<ExtArgs>[]
    empresaModulos: EmpresaModuloPayload<ExtArgs>[]
    modulosRutas: ModuloRutaPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    nombre: string
    ruc: string
    plan: string
    activo: boolean
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["empresa"]>
  composites: {}
}

/**
 * Model Empresa
 * 
 */
export type Empresa = runtime.Types.DefaultSelection<EmpresaPayload>
export type UsuarioPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Usuario"
  objects: {
    empresa: EmpresaPayload<ExtArgs>
    rol: RolPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    email: string
    nombre: string
    empresaId: string
    rolId: string
    activo: boolean
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["usuario"]>
  composites: {}
}

/**
 * Model Usuario
 * 
 */
export type Usuario = runtime.Types.DefaultSelection<UsuarioPayload>
export type ModuloPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Modulo"
  objects: {
    empresaModulos: EmpresaModuloPayload<ExtArgs>[]
    moduloDependencias: ModuloDependenciaPayload<ExtArgs>[]
    dependenciasDe: ModuloDependenciaPayload<ExtArgs>[]
    modulosRutas: ModuloRutaPayload<ExtArgs>[]
    moduloPermisos: ModuloPermisoPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    nombre: string
    displayName: string
    version: string
    activo: boolean
    dependencias: string[]
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["modulo"]>
  composites: {}
}

/**
 * Model Modulo
 * 
 */
export type Modulo = runtime.Types.DefaultSelection<ModuloPayload>
export type EmpresaModuloPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "EmpresaModulo"
  objects: {
    empresa: EmpresaPayload<ExtArgs>
    modulo: ModuloPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    empresaId: string
    moduloId: string
    activo: boolean
    configuracion: Prisma.JsonValue | null
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["empresaModulo"]>
  composites: {}
}

/**
 * Model EmpresaModulo
 * 
 */
export type EmpresaModulo = runtime.Types.DefaultSelection<EmpresaModuloPayload>
export type ModuloDependenciaPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "ModuloDependencia"
  objects: {
    modulo: ModuloPayload<ExtArgs>
    dependeDe: ModuloPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    moduloId: string
    dependeDeId: string
    requerido: boolean
    createdAt: Date
  }, ExtArgs["result"]["moduloDependencia"]>
  composites: {}
}

/**
 * Model ModuloDependencia
 * 
 */
export type ModuloDependencia = runtime.Types.DefaultSelection<ModuloDependenciaPayload>
export type RolPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Rol"
  objects: {
    usuarios: UsuarioPayload<ExtArgs>[]
    rolPermisos: RolPermisoPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    nombre: string
    empresaId: string | null
    activo: boolean
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["rol"]>
  composites: {}
}

/**
 * Model Rol
 * 
 */
export type Rol = runtime.Types.DefaultSelection<RolPayload>
export type ModuloPermisoPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "ModuloPermiso"
  objects: {
    modulo: ModuloPayload<ExtArgs>
    rolPermisos: RolPermisoPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    moduloId: string
    nombre: string
    accion: string
    activo: boolean
  }, ExtArgs["result"]["moduloPermiso"]>
  composites: {}
}

/**
 * Model ModuloPermiso
 * 
 */
export type ModuloPermiso = runtime.Types.DefaultSelection<ModuloPermisoPayload>
export type RolPermisoPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "RolPermiso"
  objects: {
    rol: RolPayload<ExtArgs>
    moduloPermiso: ModuloPermisoPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    rolId: string
    moduloPermisoId: string
    activo: boolean
  }, ExtArgs["result"]["rolPermiso"]>
  composites: {}
}

/**
 * Model RolPermiso
 * 
 */
export type RolPermiso = runtime.Types.DefaultSelection<RolPermisoPayload>
export type ModuloRutaPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "ModuloRuta"
  objects: {
    modulo: ModuloPayload<ExtArgs>
    empresa: EmpresaPayload<ExtArgs> | null
  }
  scalars: $Extensions.GetResult<{
    id: string
    moduloId: string
    empresaId: string | null
    ruta: string
    metodo: string
    activo: boolean
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["moduloRuta"]>
  composites: {}
}

/**
 * Model ModuloRuta
 * 
 */
export type ModuloRuta = runtime.Types.DefaultSelection<ModuloRutaPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Empresas
 * const empresas = await prisma.empresa.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Empresas
   * const empresas = await prisma.empresa.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.empresa`: Exposes CRUD operations for the **Empresa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Empresas
    * const empresas = await prisma.empresa.findMany()
    * ```
    */
  get empresa(): Prisma.EmpresaDelegate<ExtArgs>;

  /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs>;

  /**
   * `prisma.modulo`: Exposes CRUD operations for the **Modulo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Modulos
    * const modulos = await prisma.modulo.findMany()
    * ```
    */
  get modulo(): Prisma.ModuloDelegate<ExtArgs>;

  /**
   * `prisma.empresaModulo`: Exposes CRUD operations for the **EmpresaModulo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmpresaModulos
    * const empresaModulos = await prisma.empresaModulo.findMany()
    * ```
    */
  get empresaModulo(): Prisma.EmpresaModuloDelegate<ExtArgs>;

  /**
   * `prisma.moduloDependencia`: Exposes CRUD operations for the **ModuloDependencia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ModuloDependencias
    * const moduloDependencias = await prisma.moduloDependencia.findMany()
    * ```
    */
  get moduloDependencia(): Prisma.ModuloDependenciaDelegate<ExtArgs>;

  /**
   * `prisma.rol`: Exposes CRUD operations for the **Rol** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rols
    * const rols = await prisma.rol.findMany()
    * ```
    */
  get rol(): Prisma.RolDelegate<ExtArgs>;

  /**
   * `prisma.moduloPermiso`: Exposes CRUD operations for the **ModuloPermiso** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ModuloPermisos
    * const moduloPermisos = await prisma.moduloPermiso.findMany()
    * ```
    */
  get moduloPermiso(): Prisma.ModuloPermisoDelegate<ExtArgs>;

  /**
   * `prisma.rolPermiso`: Exposes CRUD operations for the **RolPermiso** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RolPermisos
    * const rolPermisos = await prisma.rolPermiso.findMany()
    * ```
    */
  get rolPermiso(): Prisma.RolPermisoDelegate<ExtArgs>;

  /**
   * `prisma.moduloRuta`: Exposes CRUD operations for the **ModuloRuta** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ModuloRutas
    * const moduloRutas = await prisma.moduloRuta.findMany()
    * ```
    */
  get moduloRuta(): Prisma.ModuloRutaDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export type Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export type Args<T, F extends $Public.Operation> = $Public.Args<T, F>
  export type Payload<T, F extends $Public.Operation> = $Public.Payload<T, F>
  export type Result<T, A, F extends $Public.Operation> = $Public.Result<T, A, F>
  export type Exact<T, W> = $Public.Exact<T, W>

  /**
   * Prisma Client JS version: 5.0.0
   * Query Engine version: 6b0aef69b7cdfc787f822ecd7cdc76d5f1991584
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Empresa: 'Empresa',
    Usuario: 'Usuario',
    Modulo: 'Modulo',
    EmpresaModulo: 'EmpresaModulo',
    ModuloDependencia: 'ModuloDependencia',
    Rol: 'Rol',
    ModuloPermiso: 'ModuloPermiso',
    RolPermiso: 'RolPermiso',
    ModuloRuta: 'ModuloRuta'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.Args}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'empresa' | 'usuario' | 'modulo' | 'empresaModulo' | 'moduloDependencia' | 'rol' | 'moduloPermiso' | 'rolPermiso' | 'moduloRuta'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      Empresa: {
        payload: EmpresaPayload<ExtArgs>
        fields: Prisma.EmpresaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmpresaFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EmpresaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmpresaFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EmpresaPayload>
          }
          findFirst: {
            args: Prisma.EmpresaFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EmpresaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmpresaFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EmpresaPayload>
          }
          findMany: {
            args: Prisma.EmpresaFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EmpresaPayload>[]
          }
          create: {
            args: Prisma.EmpresaCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EmpresaPayload>
          }
          createMany: {
            args: Prisma.EmpresaCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.EmpresaDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EmpresaPayload>
          }
          update: {
            args: Prisma.EmpresaUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EmpresaPayload>
          }
          deleteMany: {
            args: Prisma.EmpresaDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.EmpresaUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.EmpresaUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EmpresaPayload>
          }
          aggregate: {
            args: Prisma.EmpresaAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateEmpresa>
          }
          groupBy: {
            args: Prisma.EmpresaGroupByArgs<ExtArgs>,
            result: $Utils.Optional<EmpresaGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmpresaCountArgs<ExtArgs>,
            result: $Utils.Optional<EmpresaCountAggregateOutputType> | number
          }
        }
      }
      Usuario: {
        payload: UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>,
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Modulo: {
        payload: ModuloPayload<ExtArgs>
        fields: Prisma.ModuloFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModuloFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModuloFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloPayload>
          }
          findFirst: {
            args: Prisma.ModuloFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModuloFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloPayload>
          }
          findMany: {
            args: Prisma.ModuloFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloPayload>[]
          }
          create: {
            args: Prisma.ModuloCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloPayload>
          }
          createMany: {
            args: Prisma.ModuloCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ModuloDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloPayload>
          }
          update: {
            args: Prisma.ModuloUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloPayload>
          }
          deleteMany: {
            args: Prisma.ModuloDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ModuloUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ModuloUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloPayload>
          }
          aggregate: {
            args: Prisma.ModuloAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateModulo>
          }
          groupBy: {
            args: Prisma.ModuloGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ModuloGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModuloCountArgs<ExtArgs>,
            result: $Utils.Optional<ModuloCountAggregateOutputType> | number
          }
        }
      }
      EmpresaModulo: {
        payload: EmpresaModuloPayload<ExtArgs>
        fields: Prisma.EmpresaModuloFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmpresaModuloFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EmpresaModuloPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmpresaModuloFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EmpresaModuloPayload>
          }
          findFirst: {
            args: Prisma.EmpresaModuloFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EmpresaModuloPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmpresaModuloFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EmpresaModuloPayload>
          }
          findMany: {
            args: Prisma.EmpresaModuloFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EmpresaModuloPayload>[]
          }
          create: {
            args: Prisma.EmpresaModuloCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EmpresaModuloPayload>
          }
          createMany: {
            args: Prisma.EmpresaModuloCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.EmpresaModuloDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EmpresaModuloPayload>
          }
          update: {
            args: Prisma.EmpresaModuloUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EmpresaModuloPayload>
          }
          deleteMany: {
            args: Prisma.EmpresaModuloDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.EmpresaModuloUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.EmpresaModuloUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EmpresaModuloPayload>
          }
          aggregate: {
            args: Prisma.EmpresaModuloAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateEmpresaModulo>
          }
          groupBy: {
            args: Prisma.EmpresaModuloGroupByArgs<ExtArgs>,
            result: $Utils.Optional<EmpresaModuloGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmpresaModuloCountArgs<ExtArgs>,
            result: $Utils.Optional<EmpresaModuloCountAggregateOutputType> | number
          }
        }
      }
      ModuloDependencia: {
        payload: ModuloDependenciaPayload<ExtArgs>
        fields: Prisma.ModuloDependenciaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModuloDependenciaFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloDependenciaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModuloDependenciaFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloDependenciaPayload>
          }
          findFirst: {
            args: Prisma.ModuloDependenciaFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloDependenciaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModuloDependenciaFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloDependenciaPayload>
          }
          findMany: {
            args: Prisma.ModuloDependenciaFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloDependenciaPayload>[]
          }
          create: {
            args: Prisma.ModuloDependenciaCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloDependenciaPayload>
          }
          createMany: {
            args: Prisma.ModuloDependenciaCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ModuloDependenciaDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloDependenciaPayload>
          }
          update: {
            args: Prisma.ModuloDependenciaUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloDependenciaPayload>
          }
          deleteMany: {
            args: Prisma.ModuloDependenciaDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ModuloDependenciaUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ModuloDependenciaUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloDependenciaPayload>
          }
          aggregate: {
            args: Prisma.ModuloDependenciaAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateModuloDependencia>
          }
          groupBy: {
            args: Prisma.ModuloDependenciaGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ModuloDependenciaGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModuloDependenciaCountArgs<ExtArgs>,
            result: $Utils.Optional<ModuloDependenciaCountAggregateOutputType> | number
          }
        }
      }
      Rol: {
        payload: RolPayload<ExtArgs>
        fields: Prisma.RolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RolFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RolFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolPayload>
          }
          findFirst: {
            args: Prisma.RolFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RolFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolPayload>
          }
          findMany: {
            args: Prisma.RolFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolPayload>[]
          }
          create: {
            args: Prisma.RolCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolPayload>
          }
          createMany: {
            args: Prisma.RolCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.RolDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolPayload>
          }
          update: {
            args: Prisma.RolUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolPayload>
          }
          deleteMany: {
            args: Prisma.RolDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.RolUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.RolUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolPayload>
          }
          aggregate: {
            args: Prisma.RolAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateRol>
          }
          groupBy: {
            args: Prisma.RolGroupByArgs<ExtArgs>,
            result: $Utils.Optional<RolGroupByOutputType>[]
          }
          count: {
            args: Prisma.RolCountArgs<ExtArgs>,
            result: $Utils.Optional<RolCountAggregateOutputType> | number
          }
        }
      }
      ModuloPermiso: {
        payload: ModuloPermisoPayload<ExtArgs>
        fields: Prisma.ModuloPermisoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModuloPermisoFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloPermisoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModuloPermisoFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloPermisoPayload>
          }
          findFirst: {
            args: Prisma.ModuloPermisoFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloPermisoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModuloPermisoFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloPermisoPayload>
          }
          findMany: {
            args: Prisma.ModuloPermisoFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloPermisoPayload>[]
          }
          create: {
            args: Prisma.ModuloPermisoCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloPermisoPayload>
          }
          createMany: {
            args: Prisma.ModuloPermisoCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ModuloPermisoDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloPermisoPayload>
          }
          update: {
            args: Prisma.ModuloPermisoUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloPermisoPayload>
          }
          deleteMany: {
            args: Prisma.ModuloPermisoDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ModuloPermisoUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ModuloPermisoUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloPermisoPayload>
          }
          aggregate: {
            args: Prisma.ModuloPermisoAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateModuloPermiso>
          }
          groupBy: {
            args: Prisma.ModuloPermisoGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ModuloPermisoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModuloPermisoCountArgs<ExtArgs>,
            result: $Utils.Optional<ModuloPermisoCountAggregateOutputType> | number
          }
        }
      }
      RolPermiso: {
        payload: RolPermisoPayload<ExtArgs>
        fields: Prisma.RolPermisoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RolPermisoFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolPermisoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RolPermisoFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolPermisoPayload>
          }
          findFirst: {
            args: Prisma.RolPermisoFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolPermisoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RolPermisoFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolPermisoPayload>
          }
          findMany: {
            args: Prisma.RolPermisoFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolPermisoPayload>[]
          }
          create: {
            args: Prisma.RolPermisoCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolPermisoPayload>
          }
          createMany: {
            args: Prisma.RolPermisoCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.RolPermisoDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolPermisoPayload>
          }
          update: {
            args: Prisma.RolPermisoUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolPermisoPayload>
          }
          deleteMany: {
            args: Prisma.RolPermisoDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.RolPermisoUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.RolPermisoUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolPermisoPayload>
          }
          aggregate: {
            args: Prisma.RolPermisoAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateRolPermiso>
          }
          groupBy: {
            args: Prisma.RolPermisoGroupByArgs<ExtArgs>,
            result: $Utils.Optional<RolPermisoGroupByOutputType>[]
          }
          count: {
            args: Prisma.RolPermisoCountArgs<ExtArgs>,
            result: $Utils.Optional<RolPermisoCountAggregateOutputType> | number
          }
        }
      }
      ModuloRuta: {
        payload: ModuloRutaPayload<ExtArgs>
        fields: Prisma.ModuloRutaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModuloRutaFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloRutaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModuloRutaFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloRutaPayload>
          }
          findFirst: {
            args: Prisma.ModuloRutaFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloRutaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModuloRutaFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloRutaPayload>
          }
          findMany: {
            args: Prisma.ModuloRutaFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloRutaPayload>[]
          }
          create: {
            args: Prisma.ModuloRutaCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloRutaPayload>
          }
          createMany: {
            args: Prisma.ModuloRutaCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ModuloRutaDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloRutaPayload>
          }
          update: {
            args: Prisma.ModuloRutaUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloRutaPayload>
          }
          deleteMany: {
            args: Prisma.ModuloRutaDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ModuloRutaUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ModuloRutaUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ModuloRutaPayload>
          }
          aggregate: {
            args: Prisma.ModuloRutaAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateModuloRuta>
          }
          groupBy: {
            args: Prisma.ModuloRutaGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ModuloRutaGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModuloRutaCountArgs<ExtArgs>,
            result: $Utils.Optional<ModuloRutaCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type EmpresaCountOutputType
   */


  export type EmpresaCountOutputType = {
    usuarios: number
    empresaModulos: number
    modulosRutas: number
  }

  export type EmpresaCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    usuarios?: boolean | EmpresaCountOutputTypeCountUsuariosArgs
    empresaModulos?: boolean | EmpresaCountOutputTypeCountEmpresaModulosArgs
    modulosRutas?: boolean | EmpresaCountOutputTypeCountModulosRutasArgs
  }

  // Custom InputTypes

  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaCountOutputType
     */
    select?: EmpresaCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountUsuariosArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
  }


  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountEmpresaModulosArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: EmpresaModuloWhereInput
  }


  /**
   * EmpresaCountOutputType without action
   */
  export type EmpresaCountOutputTypeCountModulosRutasArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ModuloRutaWhereInput
  }



  /**
   * Count Type ModuloCountOutputType
   */


  export type ModuloCountOutputType = {
    empresaModulos: number
    moduloDependencias: number
    dependenciasDe: number
    modulosRutas: number
    moduloPermisos: number
  }

  export type ModuloCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    empresaModulos?: boolean | ModuloCountOutputTypeCountEmpresaModulosArgs
    moduloDependencias?: boolean | ModuloCountOutputTypeCountModuloDependenciasArgs
    dependenciasDe?: boolean | ModuloCountOutputTypeCountDependenciasDeArgs
    modulosRutas?: boolean | ModuloCountOutputTypeCountModulosRutasArgs
    moduloPermisos?: boolean | ModuloCountOutputTypeCountModuloPermisosArgs
  }

  // Custom InputTypes

  /**
   * ModuloCountOutputType without action
   */
  export type ModuloCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloCountOutputType
     */
    select?: ModuloCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * ModuloCountOutputType without action
   */
  export type ModuloCountOutputTypeCountEmpresaModulosArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: EmpresaModuloWhereInput
  }


  /**
   * ModuloCountOutputType without action
   */
  export type ModuloCountOutputTypeCountModuloDependenciasArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ModuloDependenciaWhereInput
  }


  /**
   * ModuloCountOutputType without action
   */
  export type ModuloCountOutputTypeCountDependenciasDeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ModuloDependenciaWhereInput
  }


  /**
   * ModuloCountOutputType without action
   */
  export type ModuloCountOutputTypeCountModulosRutasArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ModuloRutaWhereInput
  }


  /**
   * ModuloCountOutputType without action
   */
  export type ModuloCountOutputTypeCountModuloPermisosArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ModuloPermisoWhereInput
  }



  /**
   * Count Type RolCountOutputType
   */


  export type RolCountOutputType = {
    usuarios: number
    rolPermisos: number
  }

  export type RolCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    usuarios?: boolean | RolCountOutputTypeCountUsuariosArgs
    rolPermisos?: boolean | RolCountOutputTypeCountRolPermisosArgs
  }

  // Custom InputTypes

  /**
   * RolCountOutputType without action
   */
  export type RolCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolCountOutputType
     */
    select?: RolCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * RolCountOutputType without action
   */
  export type RolCountOutputTypeCountUsuariosArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
  }


  /**
   * RolCountOutputType without action
   */
  export type RolCountOutputTypeCountRolPermisosArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: RolPermisoWhereInput
  }



  /**
   * Count Type ModuloPermisoCountOutputType
   */


  export type ModuloPermisoCountOutputType = {
    rolPermisos: number
  }

  export type ModuloPermisoCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    rolPermisos?: boolean | ModuloPermisoCountOutputTypeCountRolPermisosArgs
  }

  // Custom InputTypes

  /**
   * ModuloPermisoCountOutputType without action
   */
  export type ModuloPermisoCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloPermisoCountOutputType
     */
    select?: ModuloPermisoCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * ModuloPermisoCountOutputType without action
   */
  export type ModuloPermisoCountOutputTypeCountRolPermisosArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: RolPermisoWhereInput
  }



  /**
   * Models
   */

  /**
   * Model Empresa
   */


  export type AggregateEmpresa = {
    _count: EmpresaCountAggregateOutputType | null
    _min: EmpresaMinAggregateOutputType | null
    _max: EmpresaMaxAggregateOutputType | null
  }

  export type EmpresaMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    ruc: string | null
    plan: string | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmpresaMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    ruc: string | null
    plan: string | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmpresaCountAggregateOutputType = {
    id: number
    nombre: number
    ruc: number
    plan: number
    activo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmpresaMinAggregateInputType = {
    id?: true
    nombre?: true
    ruc?: true
    plan?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmpresaMaxAggregateInputType = {
    id?: true
    nombre?: true
    ruc?: true
    plan?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmpresaCountAggregateInputType = {
    id?: true
    nombre?: true
    ruc?: true
    plan?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmpresaAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Empresa to aggregate.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Empresas
    **/
    _count?: true | EmpresaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmpresaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmpresaMaxAggregateInputType
  }

  export type GetEmpresaAggregateType<T extends EmpresaAggregateArgs> = {
        [P in keyof T & keyof AggregateEmpresa]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmpresa[P]>
      : GetScalarType<T[P], AggregateEmpresa[P]>
  }




  export type EmpresaGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: EmpresaWhereInput
    orderBy?: EmpresaOrderByWithAggregationInput | EmpresaOrderByWithAggregationInput[]
    by: EmpresaScalarFieldEnum[] | EmpresaScalarFieldEnum
    having?: EmpresaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmpresaCountAggregateInputType | true
    _min?: EmpresaMinAggregateInputType
    _max?: EmpresaMaxAggregateInputType
  }


  export type EmpresaGroupByOutputType = {
    id: string
    nombre: string
    ruc: string
    plan: string
    activo: boolean
    createdAt: Date
    updatedAt: Date
    _count: EmpresaCountAggregateOutputType | null
    _min: EmpresaMinAggregateOutputType | null
    _max: EmpresaMaxAggregateOutputType | null
  }

  type GetEmpresaGroupByPayload<T extends EmpresaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmpresaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmpresaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmpresaGroupByOutputType[P]>
            : GetScalarType<T[P], EmpresaGroupByOutputType[P]>
        }
      >
    >


  export type EmpresaSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    ruc?: boolean
    plan?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuarios?: boolean | Empresa$usuariosArgs<ExtArgs>
    empresaModulos?: boolean | Empresa$empresaModulosArgs<ExtArgs>
    modulosRutas?: boolean | Empresa$modulosRutasArgs<ExtArgs>
    _count?: boolean | EmpresaCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["empresa"]>

  export type EmpresaSelectScalar = {
    id?: boolean
    nombre?: boolean
    ruc?: boolean
    plan?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmpresaInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    usuarios?: boolean | Empresa$usuariosArgs<ExtArgs>
    empresaModulos?: boolean | Empresa$empresaModulosArgs<ExtArgs>
    modulosRutas?: boolean | Empresa$modulosRutasArgs<ExtArgs>
    _count?: boolean | EmpresaCountOutputTypeArgs<ExtArgs>
  }


  type EmpresaGetPayload<S extends boolean | null | undefined | EmpresaArgs> = $Types.GetResult<EmpresaPayload, S>

  type EmpresaCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<EmpresaFindManyArgs, 'select' | 'include'> & {
      select?: EmpresaCountAggregateInputType | true
    }

  export interface EmpresaDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Empresa'], meta: { name: 'Empresa' } }
    /**
     * Find zero or one Empresa that matches the filter.
     * @param {EmpresaFindUniqueArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EmpresaFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, EmpresaFindUniqueArgs<ExtArgs>>
    ): Prisma__EmpresaClient<$Types.GetResult<EmpresaPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Empresa that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {EmpresaFindUniqueOrThrowArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends EmpresaFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, EmpresaFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__EmpresaClient<$Types.GetResult<EmpresaPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Empresa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaFindFirstArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EmpresaFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, EmpresaFindFirstArgs<ExtArgs>>
    ): Prisma__EmpresaClient<$Types.GetResult<EmpresaPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Empresa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaFindFirstOrThrowArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends EmpresaFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, EmpresaFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__EmpresaClient<$Types.GetResult<EmpresaPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Empresas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Empresas
     * const empresas = await prisma.empresa.findMany()
     * 
     * // Get first 10 Empresas
     * const empresas = await prisma.empresa.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const empresaWithIdOnly = await prisma.empresa.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends EmpresaFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EmpresaFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<EmpresaPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Empresa.
     * @param {EmpresaCreateArgs} args - Arguments to create a Empresa.
     * @example
     * // Create one Empresa
     * const Empresa = await prisma.empresa.create({
     *   data: {
     *     // ... data to create a Empresa
     *   }
     * })
     * 
    **/
    create<T extends EmpresaCreateArgs<ExtArgs>>(
      args: SelectSubset<T, EmpresaCreateArgs<ExtArgs>>
    ): Prisma__EmpresaClient<$Types.GetResult<EmpresaPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Empresas.
     *     @param {EmpresaCreateManyArgs} args - Arguments to create many Empresas.
     *     @example
     *     // Create many Empresas
     *     const empresa = await prisma.empresa.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EmpresaCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EmpresaCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Empresa.
     * @param {EmpresaDeleteArgs} args - Arguments to delete one Empresa.
     * @example
     * // Delete one Empresa
     * const Empresa = await prisma.empresa.delete({
     *   where: {
     *     // ... filter to delete one Empresa
     *   }
     * })
     * 
    **/
    delete<T extends EmpresaDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, EmpresaDeleteArgs<ExtArgs>>
    ): Prisma__EmpresaClient<$Types.GetResult<EmpresaPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Empresa.
     * @param {EmpresaUpdateArgs} args - Arguments to update one Empresa.
     * @example
     * // Update one Empresa
     * const empresa = await prisma.empresa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EmpresaUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, EmpresaUpdateArgs<ExtArgs>>
    ): Prisma__EmpresaClient<$Types.GetResult<EmpresaPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Empresas.
     * @param {EmpresaDeleteManyArgs} args - Arguments to filter Empresas to delete.
     * @example
     * // Delete a few Empresas
     * const { count } = await prisma.empresa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EmpresaDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EmpresaDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Empresas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Empresas
     * const empresa = await prisma.empresa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EmpresaUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, EmpresaUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Empresa.
     * @param {EmpresaUpsertArgs} args - Arguments to update or create a Empresa.
     * @example
     * // Update or create a Empresa
     * const empresa = await prisma.empresa.upsert({
     *   create: {
     *     // ... data to create a Empresa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Empresa we want to update
     *   }
     * })
    **/
    upsert<T extends EmpresaUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, EmpresaUpsertArgs<ExtArgs>>
    ): Prisma__EmpresaClient<$Types.GetResult<EmpresaPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Empresas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaCountArgs} args - Arguments to filter Empresas to count.
     * @example
     * // Count the number of Empresas
     * const count = await prisma.empresa.count({
     *   where: {
     *     // ... the filter for the Empresas we want to count
     *   }
     * })
    **/
    count<T extends EmpresaCountArgs>(
      args?: Subset<T, EmpresaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmpresaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Empresa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmpresaAggregateArgs>(args: Subset<T, EmpresaAggregateArgs>): Prisma.PrismaPromise<GetEmpresaAggregateType<T>>

    /**
     * Group by Empresa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaGroupByArgs} args - Group by arguments.
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
    groupBy<
      T extends EmpresaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmpresaGroupByArgs['orderBy'] }
        : { orderBy?: EmpresaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmpresaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmpresaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Empresa model
   */
  readonly fields: EmpresaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Empresa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EmpresaClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    usuarios<T extends Empresa$usuariosArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$usuariosArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<UsuarioPayload<ExtArgs>, T, 'findMany'>| Null>;

    empresaModulos<T extends Empresa$empresaModulosArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$empresaModulosArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<EmpresaModuloPayload<ExtArgs>, T, 'findMany'>| Null>;

    modulosRutas<T extends Empresa$modulosRutasArgs<ExtArgs> = {}>(args?: Subset<T, Empresa$modulosRutasArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<ModuloRutaPayload<ExtArgs>, T, 'findMany'>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  /**
   * Fields of the Empresa model
   */ 
  interface EmpresaFieldRefs {
    readonly id: FieldRef<"Empresa", 'String'>
    readonly nombre: FieldRef<"Empresa", 'String'>
    readonly ruc: FieldRef<"Empresa", 'String'>
    readonly plan: FieldRef<"Empresa", 'String'>
    readonly activo: FieldRef<"Empresa", 'Boolean'>
    readonly createdAt: FieldRef<"Empresa", 'DateTime'>
    readonly updatedAt: FieldRef<"Empresa", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * Empresa findUnique
   */
  export type EmpresaFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where: EmpresaWhereUniqueInput
  }


  /**
   * Empresa findUniqueOrThrow
   */
  export type EmpresaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where: EmpresaWhereUniqueInput
  }


  /**
   * Empresa findFirst
   */
  export type EmpresaFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Empresas.
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Empresas.
     */
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }


  /**
   * Empresa findFirstOrThrow
   */
  export type EmpresaFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Empresas.
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Empresas.
     */
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }


  /**
   * Empresa findMany
   */
  export type EmpresaFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter, which Empresas to fetch.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Empresas.
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }


  /**
   * Empresa create
   */
  export type EmpresaCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * The data needed to create a Empresa.
     */
    data: XOR<EmpresaCreateInput, EmpresaUncheckedCreateInput>
  }


  /**
   * Empresa createMany
   */
  export type EmpresaCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Empresas.
     */
    data: EmpresaCreateManyInput | EmpresaCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Empresa update
   */
  export type EmpresaUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * The data needed to update a Empresa.
     */
    data: XOR<EmpresaUpdateInput, EmpresaUncheckedUpdateInput>
    /**
     * Choose, which Empresa to update.
     */
    where: EmpresaWhereUniqueInput
  }


  /**
   * Empresa updateMany
   */
  export type EmpresaUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Empresas.
     */
    data: XOR<EmpresaUpdateManyMutationInput, EmpresaUncheckedUpdateManyInput>
    /**
     * Filter which Empresas to update
     */
    where?: EmpresaWhereInput
  }


  /**
   * Empresa upsert
   */
  export type EmpresaUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * The filter to search for the Empresa to update in case it exists.
     */
    where: EmpresaWhereUniqueInput
    /**
     * In case the Empresa found by the `where` argument doesn't exist, create a new Empresa with this data.
     */
    create: XOR<EmpresaCreateInput, EmpresaUncheckedCreateInput>
    /**
     * In case the Empresa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmpresaUpdateInput, EmpresaUncheckedUpdateInput>
  }


  /**
   * Empresa delete
   */
  export type EmpresaDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaInclude<ExtArgs> | null
    /**
     * Filter which Empresa to delete.
     */
    where: EmpresaWhereUniqueInput
  }


  /**
   * Empresa deleteMany
   */
  export type EmpresaDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Empresas to delete
     */
    where?: EmpresaWhereInput
  }


  /**
   * Empresa.usuarios
   */
  export type Empresa$usuariosArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    cursor?: UsuarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }


  /**
   * Empresa.empresaModulos
   */
  export type Empresa$empresaModulosArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaModulo
     */
    select?: EmpresaModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaModuloInclude<ExtArgs> | null
    where?: EmpresaModuloWhereInput
    orderBy?: EmpresaModuloOrderByWithRelationInput | EmpresaModuloOrderByWithRelationInput[]
    cursor?: EmpresaModuloWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmpresaModuloScalarFieldEnum | EmpresaModuloScalarFieldEnum[]
  }


  /**
   * Empresa.modulosRutas
   */
  export type Empresa$modulosRutasArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloRuta
     */
    select?: ModuloRutaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloRutaInclude<ExtArgs> | null
    where?: ModuloRutaWhereInput
    orderBy?: ModuloRutaOrderByWithRelationInput | ModuloRutaOrderByWithRelationInput[]
    cursor?: ModuloRutaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModuloRutaScalarFieldEnum | ModuloRutaScalarFieldEnum[]
  }


  /**
   * Empresa without action
   */
  export type EmpresaArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaInclude<ExtArgs> | null
  }



  /**
   * Model Usuario
   */


  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: string | null
    email: string | null
    nombre: string | null
    empresaId: string | null
    rolId: string | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: string | null
    email: string | null
    nombre: string | null
    empresaId: string | null
    rolId: string | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    email: number
    nombre: number
    empresaId: number
    rolId: number
    activo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UsuarioMinAggregateInputType = {
    id?: true
    email?: true
    nombre?: true
    empresaId?: true
    rolId?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    email?: true
    nombre?: true
    empresaId?: true
    rolId?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    email?: true
    nombre?: true
    empresaId?: true
    rolId?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }


  export type UsuarioGroupByOutputType = {
    id: string
    email: string
    nombre: string
    empresaId: string
    rolId: string
    activo: boolean
    createdAt: Date
    updatedAt: Date
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    nombre?: boolean
    empresaId?: boolean
    rolId?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    empresa?: boolean | EmpresaArgs<ExtArgs>
    rol?: boolean | RolArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id?: boolean
    email?: boolean
    nombre?: boolean
    empresaId?: boolean
    rolId?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UsuarioInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaArgs<ExtArgs>
    rol?: boolean | RolArgs<ExtArgs>
  }


  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioArgs> = $Types.GetResult<UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<UsuarioFindManyArgs, 'select' | 'include'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UsuarioFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>
    ): Prisma__UsuarioClient<$Types.GetResult<UsuarioPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Usuario that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UsuarioClient<$Types.GetResult<UsuarioPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UsuarioFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>
    ): Prisma__UsuarioClient<$Types.GetResult<UsuarioPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UsuarioClient<$Types.GetResult<UsuarioPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UsuarioFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<UsuarioPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
    **/
    create<T extends UsuarioCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>
    ): Prisma__UsuarioClient<$Types.GetResult<UsuarioPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Usuarios.
     *     @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     *     @example
     *     // Create many Usuarios
     *     const usuario = await prisma.usuario.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UsuarioCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
    **/
    delete<T extends UsuarioDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>
    ): Prisma__UsuarioClient<$Types.GetResult<UsuarioPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UsuarioUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>
    ): Prisma__UsuarioClient<$Types.GetResult<UsuarioPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UsuarioDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UsuarioUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
    **/
    upsert<T extends UsuarioUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>
    ): Prisma__UsuarioClient<$Types.GetResult<UsuarioPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
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
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    empresa<T extends EmpresaArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaArgs<ExtArgs>>): Prisma__EmpresaClient<$Types.GetResult<EmpresaPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    rol<T extends RolArgs<ExtArgs> = {}>(args?: Subset<T, RolArgs<ExtArgs>>): Prisma__RolClient<$Types.GetResult<RolPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  /**
   * Fields of the Usuario model
   */ 
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly nombre: FieldRef<"Usuario", 'String'>
    readonly empresaId: FieldRef<"Usuario", 'String'>
    readonly rolId: FieldRef<"Usuario", 'String'>
    readonly activo: FieldRef<"Usuario", 'Boolean'>
    readonly createdAt: FieldRef<"Usuario", 'DateTime'>
    readonly updatedAt: FieldRef<"Usuario", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }


  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }


  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }


  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }


  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }


  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }


  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }


  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
  }


  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }


  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }


  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
  }


  /**
   * Usuario without action
   */
  export type UsuarioArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsuarioInclude<ExtArgs> | null
  }



  /**
   * Model Modulo
   */


  export type AggregateModulo = {
    _count: ModuloCountAggregateOutputType | null
    _min: ModuloMinAggregateOutputType | null
    _max: ModuloMaxAggregateOutputType | null
  }

  export type ModuloMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    displayName: string | null
    version: string | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ModuloMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    displayName: string | null
    version: string | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ModuloCountAggregateOutputType = {
    id: number
    nombre: number
    displayName: number
    version: number
    activo: number
    dependencias: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ModuloMinAggregateInputType = {
    id?: true
    nombre?: true
    displayName?: true
    version?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ModuloMaxAggregateInputType = {
    id?: true
    nombre?: true
    displayName?: true
    version?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ModuloCountAggregateInputType = {
    id?: true
    nombre?: true
    displayName?: true
    version?: true
    activo?: true
    dependencias?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ModuloAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Modulo to aggregate.
     */
    where?: ModuloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modulos to fetch.
     */
    orderBy?: ModuloOrderByWithRelationInput | ModuloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModuloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modulos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modulos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Modulos
    **/
    _count?: true | ModuloCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModuloMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModuloMaxAggregateInputType
  }

  export type GetModuloAggregateType<T extends ModuloAggregateArgs> = {
        [P in keyof T & keyof AggregateModulo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModulo[P]>
      : GetScalarType<T[P], AggregateModulo[P]>
  }




  export type ModuloGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ModuloWhereInput
    orderBy?: ModuloOrderByWithAggregationInput | ModuloOrderByWithAggregationInput[]
    by: ModuloScalarFieldEnum[] | ModuloScalarFieldEnum
    having?: ModuloScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModuloCountAggregateInputType | true
    _min?: ModuloMinAggregateInputType
    _max?: ModuloMaxAggregateInputType
  }


  export type ModuloGroupByOutputType = {
    id: string
    nombre: string
    displayName: string
    version: string
    activo: boolean
    dependencias: string[]
    createdAt: Date
    updatedAt: Date
    _count: ModuloCountAggregateOutputType | null
    _min: ModuloMinAggregateOutputType | null
    _max: ModuloMaxAggregateOutputType | null
  }

  type GetModuloGroupByPayload<T extends ModuloGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModuloGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModuloGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModuloGroupByOutputType[P]>
            : GetScalarType<T[P], ModuloGroupByOutputType[P]>
        }
      >
    >


  export type ModuloSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    displayName?: boolean
    version?: boolean
    activo?: boolean
    dependencias?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    empresaModulos?: boolean | Modulo$empresaModulosArgs<ExtArgs>
    moduloDependencias?: boolean | Modulo$moduloDependenciasArgs<ExtArgs>
    dependenciasDe?: boolean | Modulo$dependenciasDeArgs<ExtArgs>
    modulosRutas?: boolean | Modulo$modulosRutasArgs<ExtArgs>
    moduloPermisos?: boolean | Modulo$moduloPermisosArgs<ExtArgs>
    _count?: boolean | ModuloCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["modulo"]>

  export type ModuloSelectScalar = {
    id?: boolean
    nombre?: boolean
    displayName?: boolean
    version?: boolean
    activo?: boolean
    dependencias?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ModuloInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    empresaModulos?: boolean | Modulo$empresaModulosArgs<ExtArgs>
    moduloDependencias?: boolean | Modulo$moduloDependenciasArgs<ExtArgs>
    dependenciasDe?: boolean | Modulo$dependenciasDeArgs<ExtArgs>
    modulosRutas?: boolean | Modulo$modulosRutasArgs<ExtArgs>
    moduloPermisos?: boolean | Modulo$moduloPermisosArgs<ExtArgs>
    _count?: boolean | ModuloCountOutputTypeArgs<ExtArgs>
  }


  type ModuloGetPayload<S extends boolean | null | undefined | ModuloArgs> = $Types.GetResult<ModuloPayload, S>

  type ModuloCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<ModuloFindManyArgs, 'select' | 'include'> & {
      select?: ModuloCountAggregateInputType | true
    }

  export interface ModuloDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Modulo'], meta: { name: 'Modulo' } }
    /**
     * Find zero or one Modulo that matches the filter.
     * @param {ModuloFindUniqueArgs} args - Arguments to find a Modulo
     * @example
     * // Get one Modulo
     * const modulo = await prisma.modulo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ModuloFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloFindUniqueArgs<ExtArgs>>
    ): Prisma__ModuloClient<$Types.GetResult<ModuloPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Modulo that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ModuloFindUniqueOrThrowArgs} args - Arguments to find a Modulo
     * @example
     * // Get one Modulo
     * const modulo = await prisma.modulo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ModuloFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ModuloClient<$Types.GetResult<ModuloPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Modulo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloFindFirstArgs} args - Arguments to find a Modulo
     * @example
     * // Get one Modulo
     * const modulo = await prisma.modulo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ModuloFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloFindFirstArgs<ExtArgs>>
    ): Prisma__ModuloClient<$Types.GetResult<ModuloPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Modulo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloFindFirstOrThrowArgs} args - Arguments to find a Modulo
     * @example
     * // Get one Modulo
     * const modulo = await prisma.modulo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ModuloFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ModuloClient<$Types.GetResult<ModuloPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Modulos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Modulos
     * const modulos = await prisma.modulo.findMany()
     * 
     * // Get first 10 Modulos
     * const modulos = await prisma.modulo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moduloWithIdOnly = await prisma.modulo.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ModuloFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<ModuloPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Modulo.
     * @param {ModuloCreateArgs} args - Arguments to create a Modulo.
     * @example
     * // Create one Modulo
     * const Modulo = await prisma.modulo.create({
     *   data: {
     *     // ... data to create a Modulo
     *   }
     * })
     * 
    **/
    create<T extends ModuloCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloCreateArgs<ExtArgs>>
    ): Prisma__ModuloClient<$Types.GetResult<ModuloPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Modulos.
     *     @param {ModuloCreateManyArgs} args - Arguments to create many Modulos.
     *     @example
     *     // Create many Modulos
     *     const modulo = await prisma.modulo.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ModuloCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Modulo.
     * @param {ModuloDeleteArgs} args - Arguments to delete one Modulo.
     * @example
     * // Delete one Modulo
     * const Modulo = await prisma.modulo.delete({
     *   where: {
     *     // ... filter to delete one Modulo
     *   }
     * })
     * 
    **/
    delete<T extends ModuloDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloDeleteArgs<ExtArgs>>
    ): Prisma__ModuloClient<$Types.GetResult<ModuloPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Modulo.
     * @param {ModuloUpdateArgs} args - Arguments to update one Modulo.
     * @example
     * // Update one Modulo
     * const modulo = await prisma.modulo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ModuloUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloUpdateArgs<ExtArgs>>
    ): Prisma__ModuloClient<$Types.GetResult<ModuloPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Modulos.
     * @param {ModuloDeleteManyArgs} args - Arguments to filter Modulos to delete.
     * @example
     * // Delete a few Modulos
     * const { count } = await prisma.modulo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ModuloDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Modulos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Modulos
     * const modulo = await prisma.modulo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ModuloUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Modulo.
     * @param {ModuloUpsertArgs} args - Arguments to update or create a Modulo.
     * @example
     * // Update or create a Modulo
     * const modulo = await prisma.modulo.upsert({
     *   create: {
     *     // ... data to create a Modulo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Modulo we want to update
     *   }
     * })
    **/
    upsert<T extends ModuloUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloUpsertArgs<ExtArgs>>
    ): Prisma__ModuloClient<$Types.GetResult<ModuloPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Modulos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloCountArgs} args - Arguments to filter Modulos to count.
     * @example
     * // Count the number of Modulos
     * const count = await prisma.modulo.count({
     *   where: {
     *     // ... the filter for the Modulos we want to count
     *   }
     * })
    **/
    count<T extends ModuloCountArgs>(
      args?: Subset<T, ModuloCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModuloCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Modulo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ModuloAggregateArgs>(args: Subset<T, ModuloAggregateArgs>): Prisma.PrismaPromise<GetModuloAggregateType<T>>

    /**
     * Group by Modulo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloGroupByArgs} args - Group by arguments.
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
    groupBy<
      T extends ModuloGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModuloGroupByArgs['orderBy'] }
        : { orderBy?: ModuloGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModuloGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModuloGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Modulo model
   */
  readonly fields: ModuloFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Modulo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ModuloClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    empresaModulos<T extends Modulo$empresaModulosArgs<ExtArgs> = {}>(args?: Subset<T, Modulo$empresaModulosArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<EmpresaModuloPayload<ExtArgs>, T, 'findMany'>| Null>;

    moduloDependencias<T extends Modulo$moduloDependenciasArgs<ExtArgs> = {}>(args?: Subset<T, Modulo$moduloDependenciasArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<ModuloDependenciaPayload<ExtArgs>, T, 'findMany'>| Null>;

    dependenciasDe<T extends Modulo$dependenciasDeArgs<ExtArgs> = {}>(args?: Subset<T, Modulo$dependenciasDeArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<ModuloDependenciaPayload<ExtArgs>, T, 'findMany'>| Null>;

    modulosRutas<T extends Modulo$modulosRutasArgs<ExtArgs> = {}>(args?: Subset<T, Modulo$modulosRutasArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<ModuloRutaPayload<ExtArgs>, T, 'findMany'>| Null>;

    moduloPermisos<T extends Modulo$moduloPermisosArgs<ExtArgs> = {}>(args?: Subset<T, Modulo$moduloPermisosArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<ModuloPermisoPayload<ExtArgs>, T, 'findMany'>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  /**
   * Fields of the Modulo model
   */ 
  interface ModuloFieldRefs {
    readonly id: FieldRef<"Modulo", 'String'>
    readonly nombre: FieldRef<"Modulo", 'String'>
    readonly displayName: FieldRef<"Modulo", 'String'>
    readonly version: FieldRef<"Modulo", 'String'>
    readonly activo: FieldRef<"Modulo", 'Boolean'>
    readonly dependencias: FieldRef<"Modulo", 'String[]'>
    readonly createdAt: FieldRef<"Modulo", 'DateTime'>
    readonly updatedAt: FieldRef<"Modulo", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * Modulo findUnique
   */
  export type ModuloFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloInclude<ExtArgs> | null
    /**
     * Filter, which Modulo to fetch.
     */
    where: ModuloWhereUniqueInput
  }


  /**
   * Modulo findUniqueOrThrow
   */
  export type ModuloFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloInclude<ExtArgs> | null
    /**
     * Filter, which Modulo to fetch.
     */
    where: ModuloWhereUniqueInput
  }


  /**
   * Modulo findFirst
   */
  export type ModuloFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloInclude<ExtArgs> | null
    /**
     * Filter, which Modulo to fetch.
     */
    where?: ModuloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modulos to fetch.
     */
    orderBy?: ModuloOrderByWithRelationInput | ModuloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Modulos.
     */
    cursor?: ModuloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modulos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modulos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Modulos.
     */
    distinct?: ModuloScalarFieldEnum | ModuloScalarFieldEnum[]
  }


  /**
   * Modulo findFirstOrThrow
   */
  export type ModuloFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloInclude<ExtArgs> | null
    /**
     * Filter, which Modulo to fetch.
     */
    where?: ModuloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modulos to fetch.
     */
    orderBy?: ModuloOrderByWithRelationInput | ModuloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Modulos.
     */
    cursor?: ModuloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modulos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modulos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Modulos.
     */
    distinct?: ModuloScalarFieldEnum | ModuloScalarFieldEnum[]
  }


  /**
   * Modulo findMany
   */
  export type ModuloFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloInclude<ExtArgs> | null
    /**
     * Filter, which Modulos to fetch.
     */
    where?: ModuloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modulos to fetch.
     */
    orderBy?: ModuloOrderByWithRelationInput | ModuloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Modulos.
     */
    cursor?: ModuloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modulos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modulos.
     */
    skip?: number
    distinct?: ModuloScalarFieldEnum | ModuloScalarFieldEnum[]
  }


  /**
   * Modulo create
   */
  export type ModuloCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloInclude<ExtArgs> | null
    /**
     * The data needed to create a Modulo.
     */
    data: XOR<ModuloCreateInput, ModuloUncheckedCreateInput>
  }


  /**
   * Modulo createMany
   */
  export type ModuloCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Modulos.
     */
    data: ModuloCreateManyInput | ModuloCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Modulo update
   */
  export type ModuloUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloInclude<ExtArgs> | null
    /**
     * The data needed to update a Modulo.
     */
    data: XOR<ModuloUpdateInput, ModuloUncheckedUpdateInput>
    /**
     * Choose, which Modulo to update.
     */
    where: ModuloWhereUniqueInput
  }


  /**
   * Modulo updateMany
   */
  export type ModuloUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Modulos.
     */
    data: XOR<ModuloUpdateManyMutationInput, ModuloUncheckedUpdateManyInput>
    /**
     * Filter which Modulos to update
     */
    where?: ModuloWhereInput
  }


  /**
   * Modulo upsert
   */
  export type ModuloUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloInclude<ExtArgs> | null
    /**
     * The filter to search for the Modulo to update in case it exists.
     */
    where: ModuloWhereUniqueInput
    /**
     * In case the Modulo found by the `where` argument doesn't exist, create a new Modulo with this data.
     */
    create: XOR<ModuloCreateInput, ModuloUncheckedCreateInput>
    /**
     * In case the Modulo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModuloUpdateInput, ModuloUncheckedUpdateInput>
  }


  /**
   * Modulo delete
   */
  export type ModuloDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloInclude<ExtArgs> | null
    /**
     * Filter which Modulo to delete.
     */
    where: ModuloWhereUniqueInput
  }


  /**
   * Modulo deleteMany
   */
  export type ModuloDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Modulos to delete
     */
    where?: ModuloWhereInput
  }


  /**
   * Modulo.empresaModulos
   */
  export type Modulo$empresaModulosArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaModulo
     */
    select?: EmpresaModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaModuloInclude<ExtArgs> | null
    where?: EmpresaModuloWhereInput
    orderBy?: EmpresaModuloOrderByWithRelationInput | EmpresaModuloOrderByWithRelationInput[]
    cursor?: EmpresaModuloWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmpresaModuloScalarFieldEnum | EmpresaModuloScalarFieldEnum[]
  }


  /**
   * Modulo.moduloDependencias
   */
  export type Modulo$moduloDependenciasArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloDependencia
     */
    select?: ModuloDependenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloDependenciaInclude<ExtArgs> | null
    where?: ModuloDependenciaWhereInput
    orderBy?: ModuloDependenciaOrderByWithRelationInput | ModuloDependenciaOrderByWithRelationInput[]
    cursor?: ModuloDependenciaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModuloDependenciaScalarFieldEnum | ModuloDependenciaScalarFieldEnum[]
  }


  /**
   * Modulo.dependenciasDe
   */
  export type Modulo$dependenciasDeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloDependencia
     */
    select?: ModuloDependenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloDependenciaInclude<ExtArgs> | null
    where?: ModuloDependenciaWhereInput
    orderBy?: ModuloDependenciaOrderByWithRelationInput | ModuloDependenciaOrderByWithRelationInput[]
    cursor?: ModuloDependenciaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModuloDependenciaScalarFieldEnum | ModuloDependenciaScalarFieldEnum[]
  }


  /**
   * Modulo.modulosRutas
   */
  export type Modulo$modulosRutasArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloRuta
     */
    select?: ModuloRutaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloRutaInclude<ExtArgs> | null
    where?: ModuloRutaWhereInput
    orderBy?: ModuloRutaOrderByWithRelationInput | ModuloRutaOrderByWithRelationInput[]
    cursor?: ModuloRutaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModuloRutaScalarFieldEnum | ModuloRutaScalarFieldEnum[]
  }


  /**
   * Modulo.moduloPermisos
   */
  export type Modulo$moduloPermisosArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloPermiso
     */
    select?: ModuloPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloPermisoInclude<ExtArgs> | null
    where?: ModuloPermisoWhereInput
    orderBy?: ModuloPermisoOrderByWithRelationInput | ModuloPermisoOrderByWithRelationInput[]
    cursor?: ModuloPermisoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModuloPermisoScalarFieldEnum | ModuloPermisoScalarFieldEnum[]
  }


  /**
   * Modulo without action
   */
  export type ModuloArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modulo
     */
    select?: ModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloInclude<ExtArgs> | null
  }



  /**
   * Model EmpresaModulo
   */


  export type AggregateEmpresaModulo = {
    _count: EmpresaModuloCountAggregateOutputType | null
    _min: EmpresaModuloMinAggregateOutputType | null
    _max: EmpresaModuloMaxAggregateOutputType | null
  }

  export type EmpresaModuloMinAggregateOutputType = {
    id: string | null
    empresaId: string | null
    moduloId: string | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmpresaModuloMaxAggregateOutputType = {
    id: string | null
    empresaId: string | null
    moduloId: string | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmpresaModuloCountAggregateOutputType = {
    id: number
    empresaId: number
    moduloId: number
    activo: number
    configuracion: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmpresaModuloMinAggregateInputType = {
    id?: true
    empresaId?: true
    moduloId?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmpresaModuloMaxAggregateInputType = {
    id?: true
    empresaId?: true
    moduloId?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmpresaModuloCountAggregateInputType = {
    id?: true
    empresaId?: true
    moduloId?: true
    activo?: true
    configuracion?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmpresaModuloAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmpresaModulo to aggregate.
     */
    where?: EmpresaModuloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmpresaModulos to fetch.
     */
    orderBy?: EmpresaModuloOrderByWithRelationInput | EmpresaModuloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmpresaModuloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmpresaModulos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmpresaModulos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmpresaModulos
    **/
    _count?: true | EmpresaModuloCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmpresaModuloMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmpresaModuloMaxAggregateInputType
  }

  export type GetEmpresaModuloAggregateType<T extends EmpresaModuloAggregateArgs> = {
        [P in keyof T & keyof AggregateEmpresaModulo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmpresaModulo[P]>
      : GetScalarType<T[P], AggregateEmpresaModulo[P]>
  }




  export type EmpresaModuloGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: EmpresaModuloWhereInput
    orderBy?: EmpresaModuloOrderByWithAggregationInput | EmpresaModuloOrderByWithAggregationInput[]
    by: EmpresaModuloScalarFieldEnum[] | EmpresaModuloScalarFieldEnum
    having?: EmpresaModuloScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmpresaModuloCountAggregateInputType | true
    _min?: EmpresaModuloMinAggregateInputType
    _max?: EmpresaModuloMaxAggregateInputType
  }


  export type EmpresaModuloGroupByOutputType = {
    id: string
    empresaId: string
    moduloId: string
    activo: boolean
    configuracion: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: EmpresaModuloCountAggregateOutputType | null
    _min: EmpresaModuloMinAggregateOutputType | null
    _max: EmpresaModuloMaxAggregateOutputType | null
  }

  type GetEmpresaModuloGroupByPayload<T extends EmpresaModuloGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmpresaModuloGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmpresaModuloGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmpresaModuloGroupByOutputType[P]>
            : GetScalarType<T[P], EmpresaModuloGroupByOutputType[P]>
        }
      >
    >


  export type EmpresaModuloSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    empresaId?: boolean
    moduloId?: boolean
    activo?: boolean
    configuracion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    empresa?: boolean | EmpresaArgs<ExtArgs>
    modulo?: boolean | ModuloArgs<ExtArgs>
  }, ExtArgs["result"]["empresaModulo"]>

  export type EmpresaModuloSelectScalar = {
    id?: boolean
    empresaId?: boolean
    moduloId?: boolean
    activo?: boolean
    configuracion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmpresaModuloInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    empresa?: boolean | EmpresaArgs<ExtArgs>
    modulo?: boolean | ModuloArgs<ExtArgs>
  }


  type EmpresaModuloGetPayload<S extends boolean | null | undefined | EmpresaModuloArgs> = $Types.GetResult<EmpresaModuloPayload, S>

  type EmpresaModuloCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<EmpresaModuloFindManyArgs, 'select' | 'include'> & {
      select?: EmpresaModuloCountAggregateInputType | true
    }

  export interface EmpresaModuloDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmpresaModulo'], meta: { name: 'EmpresaModulo' } }
    /**
     * Find zero or one EmpresaModulo that matches the filter.
     * @param {EmpresaModuloFindUniqueArgs} args - Arguments to find a EmpresaModulo
     * @example
     * // Get one EmpresaModulo
     * const empresaModulo = await prisma.empresaModulo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EmpresaModuloFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, EmpresaModuloFindUniqueArgs<ExtArgs>>
    ): Prisma__EmpresaModuloClient<$Types.GetResult<EmpresaModuloPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one EmpresaModulo that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {EmpresaModuloFindUniqueOrThrowArgs} args - Arguments to find a EmpresaModulo
     * @example
     * // Get one EmpresaModulo
     * const empresaModulo = await prisma.empresaModulo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends EmpresaModuloFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, EmpresaModuloFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__EmpresaModuloClient<$Types.GetResult<EmpresaModuloPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first EmpresaModulo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaModuloFindFirstArgs} args - Arguments to find a EmpresaModulo
     * @example
     * // Get one EmpresaModulo
     * const empresaModulo = await prisma.empresaModulo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EmpresaModuloFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, EmpresaModuloFindFirstArgs<ExtArgs>>
    ): Prisma__EmpresaModuloClient<$Types.GetResult<EmpresaModuloPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first EmpresaModulo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaModuloFindFirstOrThrowArgs} args - Arguments to find a EmpresaModulo
     * @example
     * // Get one EmpresaModulo
     * const empresaModulo = await prisma.empresaModulo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends EmpresaModuloFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, EmpresaModuloFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__EmpresaModuloClient<$Types.GetResult<EmpresaModuloPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more EmpresaModulos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaModuloFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmpresaModulos
     * const empresaModulos = await prisma.empresaModulo.findMany()
     * 
     * // Get first 10 EmpresaModulos
     * const empresaModulos = await prisma.empresaModulo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const empresaModuloWithIdOnly = await prisma.empresaModulo.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends EmpresaModuloFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EmpresaModuloFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<EmpresaModuloPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a EmpresaModulo.
     * @param {EmpresaModuloCreateArgs} args - Arguments to create a EmpresaModulo.
     * @example
     * // Create one EmpresaModulo
     * const EmpresaModulo = await prisma.empresaModulo.create({
     *   data: {
     *     // ... data to create a EmpresaModulo
     *   }
     * })
     * 
    **/
    create<T extends EmpresaModuloCreateArgs<ExtArgs>>(
      args: SelectSubset<T, EmpresaModuloCreateArgs<ExtArgs>>
    ): Prisma__EmpresaModuloClient<$Types.GetResult<EmpresaModuloPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many EmpresaModulos.
     *     @param {EmpresaModuloCreateManyArgs} args - Arguments to create many EmpresaModulos.
     *     @example
     *     // Create many EmpresaModulos
     *     const empresaModulo = await prisma.empresaModulo.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EmpresaModuloCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EmpresaModuloCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EmpresaModulo.
     * @param {EmpresaModuloDeleteArgs} args - Arguments to delete one EmpresaModulo.
     * @example
     * // Delete one EmpresaModulo
     * const EmpresaModulo = await prisma.empresaModulo.delete({
     *   where: {
     *     // ... filter to delete one EmpresaModulo
     *   }
     * })
     * 
    **/
    delete<T extends EmpresaModuloDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, EmpresaModuloDeleteArgs<ExtArgs>>
    ): Prisma__EmpresaModuloClient<$Types.GetResult<EmpresaModuloPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one EmpresaModulo.
     * @param {EmpresaModuloUpdateArgs} args - Arguments to update one EmpresaModulo.
     * @example
     * // Update one EmpresaModulo
     * const empresaModulo = await prisma.empresaModulo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EmpresaModuloUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, EmpresaModuloUpdateArgs<ExtArgs>>
    ): Prisma__EmpresaModuloClient<$Types.GetResult<EmpresaModuloPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more EmpresaModulos.
     * @param {EmpresaModuloDeleteManyArgs} args - Arguments to filter EmpresaModulos to delete.
     * @example
     * // Delete a few EmpresaModulos
     * const { count } = await prisma.empresaModulo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EmpresaModuloDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EmpresaModuloDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmpresaModulos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaModuloUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmpresaModulos
     * const empresaModulo = await prisma.empresaModulo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EmpresaModuloUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, EmpresaModuloUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EmpresaModulo.
     * @param {EmpresaModuloUpsertArgs} args - Arguments to update or create a EmpresaModulo.
     * @example
     * // Update or create a EmpresaModulo
     * const empresaModulo = await prisma.empresaModulo.upsert({
     *   create: {
     *     // ... data to create a EmpresaModulo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmpresaModulo we want to update
     *   }
     * })
    **/
    upsert<T extends EmpresaModuloUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, EmpresaModuloUpsertArgs<ExtArgs>>
    ): Prisma__EmpresaModuloClient<$Types.GetResult<EmpresaModuloPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of EmpresaModulos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaModuloCountArgs} args - Arguments to filter EmpresaModulos to count.
     * @example
     * // Count the number of EmpresaModulos
     * const count = await prisma.empresaModulo.count({
     *   where: {
     *     // ... the filter for the EmpresaModulos we want to count
     *   }
     * })
    **/
    count<T extends EmpresaModuloCountArgs>(
      args?: Subset<T, EmpresaModuloCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmpresaModuloCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmpresaModulo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaModuloAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmpresaModuloAggregateArgs>(args: Subset<T, EmpresaModuloAggregateArgs>): Prisma.PrismaPromise<GetEmpresaModuloAggregateType<T>>

    /**
     * Group by EmpresaModulo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaModuloGroupByArgs} args - Group by arguments.
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
    groupBy<
      T extends EmpresaModuloGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmpresaModuloGroupByArgs['orderBy'] }
        : { orderBy?: EmpresaModuloGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmpresaModuloGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmpresaModuloGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmpresaModulo model
   */
  readonly fields: EmpresaModuloFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmpresaModulo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EmpresaModuloClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    empresa<T extends EmpresaArgs<ExtArgs> = {}>(args?: Subset<T, EmpresaArgs<ExtArgs>>): Prisma__EmpresaClient<$Types.GetResult<EmpresaPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    modulo<T extends ModuloArgs<ExtArgs> = {}>(args?: Subset<T, ModuloArgs<ExtArgs>>): Prisma__ModuloClient<$Types.GetResult<ModuloPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  /**
   * Fields of the EmpresaModulo model
   */ 
  interface EmpresaModuloFieldRefs {
    readonly id: FieldRef<"EmpresaModulo", 'String'>
    readonly empresaId: FieldRef<"EmpresaModulo", 'String'>
    readonly moduloId: FieldRef<"EmpresaModulo", 'String'>
    readonly activo: FieldRef<"EmpresaModulo", 'Boolean'>
    readonly configuracion: FieldRef<"EmpresaModulo", 'Json'>
    readonly createdAt: FieldRef<"EmpresaModulo", 'DateTime'>
    readonly updatedAt: FieldRef<"EmpresaModulo", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * EmpresaModulo findUnique
   */
  export type EmpresaModuloFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaModulo
     */
    select?: EmpresaModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaModuloInclude<ExtArgs> | null
    /**
     * Filter, which EmpresaModulo to fetch.
     */
    where: EmpresaModuloWhereUniqueInput
  }


  /**
   * EmpresaModulo findUniqueOrThrow
   */
  export type EmpresaModuloFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaModulo
     */
    select?: EmpresaModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaModuloInclude<ExtArgs> | null
    /**
     * Filter, which EmpresaModulo to fetch.
     */
    where: EmpresaModuloWhereUniqueInput
  }


  /**
   * EmpresaModulo findFirst
   */
  export type EmpresaModuloFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaModulo
     */
    select?: EmpresaModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaModuloInclude<ExtArgs> | null
    /**
     * Filter, which EmpresaModulo to fetch.
     */
    where?: EmpresaModuloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmpresaModulos to fetch.
     */
    orderBy?: EmpresaModuloOrderByWithRelationInput | EmpresaModuloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmpresaModulos.
     */
    cursor?: EmpresaModuloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmpresaModulos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmpresaModulos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmpresaModulos.
     */
    distinct?: EmpresaModuloScalarFieldEnum | EmpresaModuloScalarFieldEnum[]
  }


  /**
   * EmpresaModulo findFirstOrThrow
   */
  export type EmpresaModuloFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaModulo
     */
    select?: EmpresaModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaModuloInclude<ExtArgs> | null
    /**
     * Filter, which EmpresaModulo to fetch.
     */
    where?: EmpresaModuloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmpresaModulos to fetch.
     */
    orderBy?: EmpresaModuloOrderByWithRelationInput | EmpresaModuloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmpresaModulos.
     */
    cursor?: EmpresaModuloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmpresaModulos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmpresaModulos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmpresaModulos.
     */
    distinct?: EmpresaModuloScalarFieldEnum | EmpresaModuloScalarFieldEnum[]
  }


  /**
   * EmpresaModulo findMany
   */
  export type EmpresaModuloFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaModulo
     */
    select?: EmpresaModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaModuloInclude<ExtArgs> | null
    /**
     * Filter, which EmpresaModulos to fetch.
     */
    where?: EmpresaModuloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmpresaModulos to fetch.
     */
    orderBy?: EmpresaModuloOrderByWithRelationInput | EmpresaModuloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmpresaModulos.
     */
    cursor?: EmpresaModuloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmpresaModulos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmpresaModulos.
     */
    skip?: number
    distinct?: EmpresaModuloScalarFieldEnum | EmpresaModuloScalarFieldEnum[]
  }


  /**
   * EmpresaModulo create
   */
  export type EmpresaModuloCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaModulo
     */
    select?: EmpresaModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaModuloInclude<ExtArgs> | null
    /**
     * The data needed to create a EmpresaModulo.
     */
    data: XOR<EmpresaModuloCreateInput, EmpresaModuloUncheckedCreateInput>
  }


  /**
   * EmpresaModulo createMany
   */
  export type EmpresaModuloCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmpresaModulos.
     */
    data: EmpresaModuloCreateManyInput | EmpresaModuloCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * EmpresaModulo update
   */
  export type EmpresaModuloUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaModulo
     */
    select?: EmpresaModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaModuloInclude<ExtArgs> | null
    /**
     * The data needed to update a EmpresaModulo.
     */
    data: XOR<EmpresaModuloUpdateInput, EmpresaModuloUncheckedUpdateInput>
    /**
     * Choose, which EmpresaModulo to update.
     */
    where: EmpresaModuloWhereUniqueInput
  }


  /**
   * EmpresaModulo updateMany
   */
  export type EmpresaModuloUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmpresaModulos.
     */
    data: XOR<EmpresaModuloUpdateManyMutationInput, EmpresaModuloUncheckedUpdateManyInput>
    /**
     * Filter which EmpresaModulos to update
     */
    where?: EmpresaModuloWhereInput
  }


  /**
   * EmpresaModulo upsert
   */
  export type EmpresaModuloUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaModulo
     */
    select?: EmpresaModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaModuloInclude<ExtArgs> | null
    /**
     * The filter to search for the EmpresaModulo to update in case it exists.
     */
    where: EmpresaModuloWhereUniqueInput
    /**
     * In case the EmpresaModulo found by the `where` argument doesn't exist, create a new EmpresaModulo with this data.
     */
    create: XOR<EmpresaModuloCreateInput, EmpresaModuloUncheckedCreateInput>
    /**
     * In case the EmpresaModulo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmpresaModuloUpdateInput, EmpresaModuloUncheckedUpdateInput>
  }


  /**
   * EmpresaModulo delete
   */
  export type EmpresaModuloDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaModulo
     */
    select?: EmpresaModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaModuloInclude<ExtArgs> | null
    /**
     * Filter which EmpresaModulo to delete.
     */
    where: EmpresaModuloWhereUniqueInput
  }


  /**
   * EmpresaModulo deleteMany
   */
  export type EmpresaModuloDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmpresaModulos to delete
     */
    where?: EmpresaModuloWhereInput
  }


  /**
   * EmpresaModulo without action
   */
  export type EmpresaModuloArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmpresaModulo
     */
    select?: EmpresaModuloSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaModuloInclude<ExtArgs> | null
  }



  /**
   * Model ModuloDependencia
   */


  export type AggregateModuloDependencia = {
    _count: ModuloDependenciaCountAggregateOutputType | null
    _min: ModuloDependenciaMinAggregateOutputType | null
    _max: ModuloDependenciaMaxAggregateOutputType | null
  }

  export type ModuloDependenciaMinAggregateOutputType = {
    id: string | null
    moduloId: string | null
    dependeDeId: string | null
    requerido: boolean | null
    createdAt: Date | null
  }

  export type ModuloDependenciaMaxAggregateOutputType = {
    id: string | null
    moduloId: string | null
    dependeDeId: string | null
    requerido: boolean | null
    createdAt: Date | null
  }

  export type ModuloDependenciaCountAggregateOutputType = {
    id: number
    moduloId: number
    dependeDeId: number
    requerido: number
    createdAt: number
    _all: number
  }


  export type ModuloDependenciaMinAggregateInputType = {
    id?: true
    moduloId?: true
    dependeDeId?: true
    requerido?: true
    createdAt?: true
  }

  export type ModuloDependenciaMaxAggregateInputType = {
    id?: true
    moduloId?: true
    dependeDeId?: true
    requerido?: true
    createdAt?: true
  }

  export type ModuloDependenciaCountAggregateInputType = {
    id?: true
    moduloId?: true
    dependeDeId?: true
    requerido?: true
    createdAt?: true
    _all?: true
  }

  export type ModuloDependenciaAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModuloDependencia to aggregate.
     */
    where?: ModuloDependenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuloDependencias to fetch.
     */
    orderBy?: ModuloDependenciaOrderByWithRelationInput | ModuloDependenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModuloDependenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuloDependencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuloDependencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ModuloDependencias
    **/
    _count?: true | ModuloDependenciaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModuloDependenciaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModuloDependenciaMaxAggregateInputType
  }

  export type GetModuloDependenciaAggregateType<T extends ModuloDependenciaAggregateArgs> = {
        [P in keyof T & keyof AggregateModuloDependencia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModuloDependencia[P]>
      : GetScalarType<T[P], AggregateModuloDependencia[P]>
  }




  export type ModuloDependenciaGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ModuloDependenciaWhereInput
    orderBy?: ModuloDependenciaOrderByWithAggregationInput | ModuloDependenciaOrderByWithAggregationInput[]
    by: ModuloDependenciaScalarFieldEnum[] | ModuloDependenciaScalarFieldEnum
    having?: ModuloDependenciaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModuloDependenciaCountAggregateInputType | true
    _min?: ModuloDependenciaMinAggregateInputType
    _max?: ModuloDependenciaMaxAggregateInputType
  }


  export type ModuloDependenciaGroupByOutputType = {
    id: string
    moduloId: string
    dependeDeId: string
    requerido: boolean
    createdAt: Date
    _count: ModuloDependenciaCountAggregateOutputType | null
    _min: ModuloDependenciaMinAggregateOutputType | null
    _max: ModuloDependenciaMaxAggregateOutputType | null
  }

  type GetModuloDependenciaGroupByPayload<T extends ModuloDependenciaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModuloDependenciaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModuloDependenciaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModuloDependenciaGroupByOutputType[P]>
            : GetScalarType<T[P], ModuloDependenciaGroupByOutputType[P]>
        }
      >
    >


  export type ModuloDependenciaSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    moduloId?: boolean
    dependeDeId?: boolean
    requerido?: boolean
    createdAt?: boolean
    modulo?: boolean | ModuloArgs<ExtArgs>
    dependeDe?: boolean | ModuloArgs<ExtArgs>
  }, ExtArgs["result"]["moduloDependencia"]>

  export type ModuloDependenciaSelectScalar = {
    id?: boolean
    moduloId?: boolean
    dependeDeId?: boolean
    requerido?: boolean
    createdAt?: boolean
  }

  export type ModuloDependenciaInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    modulo?: boolean | ModuloArgs<ExtArgs>
    dependeDe?: boolean | ModuloArgs<ExtArgs>
  }


  type ModuloDependenciaGetPayload<S extends boolean | null | undefined | ModuloDependenciaArgs> = $Types.GetResult<ModuloDependenciaPayload, S>

  type ModuloDependenciaCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<ModuloDependenciaFindManyArgs, 'select' | 'include'> & {
      select?: ModuloDependenciaCountAggregateInputType | true
    }

  export interface ModuloDependenciaDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ModuloDependencia'], meta: { name: 'ModuloDependencia' } }
    /**
     * Find zero or one ModuloDependencia that matches the filter.
     * @param {ModuloDependenciaFindUniqueArgs} args - Arguments to find a ModuloDependencia
     * @example
     * // Get one ModuloDependencia
     * const moduloDependencia = await prisma.moduloDependencia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ModuloDependenciaFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloDependenciaFindUniqueArgs<ExtArgs>>
    ): Prisma__ModuloDependenciaClient<$Types.GetResult<ModuloDependenciaPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one ModuloDependencia that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ModuloDependenciaFindUniqueOrThrowArgs} args - Arguments to find a ModuloDependencia
     * @example
     * // Get one ModuloDependencia
     * const moduloDependencia = await prisma.moduloDependencia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ModuloDependenciaFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloDependenciaFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ModuloDependenciaClient<$Types.GetResult<ModuloDependenciaPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first ModuloDependencia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloDependenciaFindFirstArgs} args - Arguments to find a ModuloDependencia
     * @example
     * // Get one ModuloDependencia
     * const moduloDependencia = await prisma.moduloDependencia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ModuloDependenciaFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloDependenciaFindFirstArgs<ExtArgs>>
    ): Prisma__ModuloDependenciaClient<$Types.GetResult<ModuloDependenciaPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ModuloDependencia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloDependenciaFindFirstOrThrowArgs} args - Arguments to find a ModuloDependencia
     * @example
     * // Get one ModuloDependencia
     * const moduloDependencia = await prisma.moduloDependencia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ModuloDependenciaFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloDependenciaFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ModuloDependenciaClient<$Types.GetResult<ModuloDependenciaPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more ModuloDependencias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloDependenciaFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ModuloDependencias
     * const moduloDependencias = await prisma.moduloDependencia.findMany()
     * 
     * // Get first 10 ModuloDependencias
     * const moduloDependencias = await prisma.moduloDependencia.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moduloDependenciaWithIdOnly = await prisma.moduloDependencia.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ModuloDependenciaFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloDependenciaFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<ModuloDependenciaPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a ModuloDependencia.
     * @param {ModuloDependenciaCreateArgs} args - Arguments to create a ModuloDependencia.
     * @example
     * // Create one ModuloDependencia
     * const ModuloDependencia = await prisma.moduloDependencia.create({
     *   data: {
     *     // ... data to create a ModuloDependencia
     *   }
     * })
     * 
    **/
    create<T extends ModuloDependenciaCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloDependenciaCreateArgs<ExtArgs>>
    ): Prisma__ModuloDependenciaClient<$Types.GetResult<ModuloDependenciaPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many ModuloDependencias.
     *     @param {ModuloDependenciaCreateManyArgs} args - Arguments to create many ModuloDependencias.
     *     @example
     *     // Create many ModuloDependencias
     *     const moduloDependencia = await prisma.moduloDependencia.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ModuloDependenciaCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloDependenciaCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ModuloDependencia.
     * @param {ModuloDependenciaDeleteArgs} args - Arguments to delete one ModuloDependencia.
     * @example
     * // Delete one ModuloDependencia
     * const ModuloDependencia = await prisma.moduloDependencia.delete({
     *   where: {
     *     // ... filter to delete one ModuloDependencia
     *   }
     * })
     * 
    **/
    delete<T extends ModuloDependenciaDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloDependenciaDeleteArgs<ExtArgs>>
    ): Prisma__ModuloDependenciaClient<$Types.GetResult<ModuloDependenciaPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one ModuloDependencia.
     * @param {ModuloDependenciaUpdateArgs} args - Arguments to update one ModuloDependencia.
     * @example
     * // Update one ModuloDependencia
     * const moduloDependencia = await prisma.moduloDependencia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ModuloDependenciaUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloDependenciaUpdateArgs<ExtArgs>>
    ): Prisma__ModuloDependenciaClient<$Types.GetResult<ModuloDependenciaPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more ModuloDependencias.
     * @param {ModuloDependenciaDeleteManyArgs} args - Arguments to filter ModuloDependencias to delete.
     * @example
     * // Delete a few ModuloDependencias
     * const { count } = await prisma.moduloDependencia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ModuloDependenciaDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloDependenciaDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModuloDependencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloDependenciaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ModuloDependencias
     * const moduloDependencia = await prisma.moduloDependencia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ModuloDependenciaUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloDependenciaUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ModuloDependencia.
     * @param {ModuloDependenciaUpsertArgs} args - Arguments to update or create a ModuloDependencia.
     * @example
     * // Update or create a ModuloDependencia
     * const moduloDependencia = await prisma.moduloDependencia.upsert({
     *   create: {
     *     // ... data to create a ModuloDependencia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ModuloDependencia we want to update
     *   }
     * })
    **/
    upsert<T extends ModuloDependenciaUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloDependenciaUpsertArgs<ExtArgs>>
    ): Prisma__ModuloDependenciaClient<$Types.GetResult<ModuloDependenciaPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of ModuloDependencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloDependenciaCountArgs} args - Arguments to filter ModuloDependencias to count.
     * @example
     * // Count the number of ModuloDependencias
     * const count = await prisma.moduloDependencia.count({
     *   where: {
     *     // ... the filter for the ModuloDependencias we want to count
     *   }
     * })
    **/
    count<T extends ModuloDependenciaCountArgs>(
      args?: Subset<T, ModuloDependenciaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModuloDependenciaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ModuloDependencia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloDependenciaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ModuloDependenciaAggregateArgs>(args: Subset<T, ModuloDependenciaAggregateArgs>): Prisma.PrismaPromise<GetModuloDependenciaAggregateType<T>>

    /**
     * Group by ModuloDependencia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloDependenciaGroupByArgs} args - Group by arguments.
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
    groupBy<
      T extends ModuloDependenciaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModuloDependenciaGroupByArgs['orderBy'] }
        : { orderBy?: ModuloDependenciaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModuloDependenciaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModuloDependenciaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ModuloDependencia model
   */
  readonly fields: ModuloDependenciaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ModuloDependencia.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ModuloDependenciaClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    modulo<T extends ModuloArgs<ExtArgs> = {}>(args?: Subset<T, ModuloArgs<ExtArgs>>): Prisma__ModuloClient<$Types.GetResult<ModuloPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    dependeDe<T extends ModuloArgs<ExtArgs> = {}>(args?: Subset<T, ModuloArgs<ExtArgs>>): Prisma__ModuloClient<$Types.GetResult<ModuloPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  /**
   * Fields of the ModuloDependencia model
   */ 
  interface ModuloDependenciaFieldRefs {
    readonly id: FieldRef<"ModuloDependencia", 'String'>
    readonly moduloId: FieldRef<"ModuloDependencia", 'String'>
    readonly dependeDeId: FieldRef<"ModuloDependencia", 'String'>
    readonly requerido: FieldRef<"ModuloDependencia", 'Boolean'>
    readonly createdAt: FieldRef<"ModuloDependencia", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * ModuloDependencia findUnique
   */
  export type ModuloDependenciaFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloDependencia
     */
    select?: ModuloDependenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloDependenciaInclude<ExtArgs> | null
    /**
     * Filter, which ModuloDependencia to fetch.
     */
    where: ModuloDependenciaWhereUniqueInput
  }


  /**
   * ModuloDependencia findUniqueOrThrow
   */
  export type ModuloDependenciaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloDependencia
     */
    select?: ModuloDependenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloDependenciaInclude<ExtArgs> | null
    /**
     * Filter, which ModuloDependencia to fetch.
     */
    where: ModuloDependenciaWhereUniqueInput
  }


  /**
   * ModuloDependencia findFirst
   */
  export type ModuloDependenciaFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloDependencia
     */
    select?: ModuloDependenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloDependenciaInclude<ExtArgs> | null
    /**
     * Filter, which ModuloDependencia to fetch.
     */
    where?: ModuloDependenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuloDependencias to fetch.
     */
    orderBy?: ModuloDependenciaOrderByWithRelationInput | ModuloDependenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModuloDependencias.
     */
    cursor?: ModuloDependenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuloDependencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuloDependencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModuloDependencias.
     */
    distinct?: ModuloDependenciaScalarFieldEnum | ModuloDependenciaScalarFieldEnum[]
  }


  /**
   * ModuloDependencia findFirstOrThrow
   */
  export type ModuloDependenciaFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloDependencia
     */
    select?: ModuloDependenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloDependenciaInclude<ExtArgs> | null
    /**
     * Filter, which ModuloDependencia to fetch.
     */
    where?: ModuloDependenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuloDependencias to fetch.
     */
    orderBy?: ModuloDependenciaOrderByWithRelationInput | ModuloDependenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModuloDependencias.
     */
    cursor?: ModuloDependenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuloDependencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuloDependencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModuloDependencias.
     */
    distinct?: ModuloDependenciaScalarFieldEnum | ModuloDependenciaScalarFieldEnum[]
  }


  /**
   * ModuloDependencia findMany
   */
  export type ModuloDependenciaFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloDependencia
     */
    select?: ModuloDependenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloDependenciaInclude<ExtArgs> | null
    /**
     * Filter, which ModuloDependencias to fetch.
     */
    where?: ModuloDependenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuloDependencias to fetch.
     */
    orderBy?: ModuloDependenciaOrderByWithRelationInput | ModuloDependenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ModuloDependencias.
     */
    cursor?: ModuloDependenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuloDependencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuloDependencias.
     */
    skip?: number
    distinct?: ModuloDependenciaScalarFieldEnum | ModuloDependenciaScalarFieldEnum[]
  }


  /**
   * ModuloDependencia create
   */
  export type ModuloDependenciaCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloDependencia
     */
    select?: ModuloDependenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloDependenciaInclude<ExtArgs> | null
    /**
     * The data needed to create a ModuloDependencia.
     */
    data: XOR<ModuloDependenciaCreateInput, ModuloDependenciaUncheckedCreateInput>
  }


  /**
   * ModuloDependencia createMany
   */
  export type ModuloDependenciaCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ModuloDependencias.
     */
    data: ModuloDependenciaCreateManyInput | ModuloDependenciaCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * ModuloDependencia update
   */
  export type ModuloDependenciaUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloDependencia
     */
    select?: ModuloDependenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloDependenciaInclude<ExtArgs> | null
    /**
     * The data needed to update a ModuloDependencia.
     */
    data: XOR<ModuloDependenciaUpdateInput, ModuloDependenciaUncheckedUpdateInput>
    /**
     * Choose, which ModuloDependencia to update.
     */
    where: ModuloDependenciaWhereUniqueInput
  }


  /**
   * ModuloDependencia updateMany
   */
  export type ModuloDependenciaUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ModuloDependencias.
     */
    data: XOR<ModuloDependenciaUpdateManyMutationInput, ModuloDependenciaUncheckedUpdateManyInput>
    /**
     * Filter which ModuloDependencias to update
     */
    where?: ModuloDependenciaWhereInput
  }


  /**
   * ModuloDependencia upsert
   */
  export type ModuloDependenciaUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloDependencia
     */
    select?: ModuloDependenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloDependenciaInclude<ExtArgs> | null
    /**
     * The filter to search for the ModuloDependencia to update in case it exists.
     */
    where: ModuloDependenciaWhereUniqueInput
    /**
     * In case the ModuloDependencia found by the `where` argument doesn't exist, create a new ModuloDependencia with this data.
     */
    create: XOR<ModuloDependenciaCreateInput, ModuloDependenciaUncheckedCreateInput>
    /**
     * In case the ModuloDependencia was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModuloDependenciaUpdateInput, ModuloDependenciaUncheckedUpdateInput>
  }


  /**
   * ModuloDependencia delete
   */
  export type ModuloDependenciaDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloDependencia
     */
    select?: ModuloDependenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloDependenciaInclude<ExtArgs> | null
    /**
     * Filter which ModuloDependencia to delete.
     */
    where: ModuloDependenciaWhereUniqueInput
  }


  /**
   * ModuloDependencia deleteMany
   */
  export type ModuloDependenciaDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModuloDependencias to delete
     */
    where?: ModuloDependenciaWhereInput
  }


  /**
   * ModuloDependencia without action
   */
  export type ModuloDependenciaArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloDependencia
     */
    select?: ModuloDependenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloDependenciaInclude<ExtArgs> | null
  }



  /**
   * Model Rol
   */


  export type AggregateRol = {
    _count: RolCountAggregateOutputType | null
    _min: RolMinAggregateOutputType | null
    _max: RolMaxAggregateOutputType | null
  }

  export type RolMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    empresaId: string | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RolMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    empresaId: string | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RolCountAggregateOutputType = {
    id: number
    nombre: number
    empresaId: number
    activo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RolMinAggregateInputType = {
    id?: true
    nombre?: true
    empresaId?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RolMaxAggregateInputType = {
    id?: true
    nombre?: true
    empresaId?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RolCountAggregateInputType = {
    id?: true
    nombre?: true
    empresaId?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RolAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rol to aggregate.
     */
    where?: RolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rols to fetch.
     */
    orderBy?: RolOrderByWithRelationInput | RolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rols
    **/
    _count?: true | RolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolMaxAggregateInputType
  }

  export type GetRolAggregateType<T extends RolAggregateArgs> = {
        [P in keyof T & keyof AggregateRol]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRol[P]>
      : GetScalarType<T[P], AggregateRol[P]>
  }




  export type RolGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: RolWhereInput
    orderBy?: RolOrderByWithAggregationInput | RolOrderByWithAggregationInput[]
    by: RolScalarFieldEnum[] | RolScalarFieldEnum
    having?: RolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RolCountAggregateInputType | true
    _min?: RolMinAggregateInputType
    _max?: RolMaxAggregateInputType
  }


  export type RolGroupByOutputType = {
    id: string
    nombre: string
    empresaId: string | null
    activo: boolean
    createdAt: Date
    updatedAt: Date
    _count: RolCountAggregateOutputType | null
    _min: RolMinAggregateOutputType | null
    _max: RolMaxAggregateOutputType | null
  }

  type GetRolGroupByPayload<T extends RolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RolGroupByOutputType[P]>
            : GetScalarType<T[P], RolGroupByOutputType[P]>
        }
      >
    >


  export type RolSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    empresaId?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuarios?: boolean | Rol$usuariosArgs<ExtArgs>
    rolPermisos?: boolean | Rol$rolPermisosArgs<ExtArgs>
    _count?: boolean | RolCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["rol"]>

  export type RolSelectScalar = {
    id?: boolean
    nombre?: boolean
    empresaId?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RolInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    usuarios?: boolean | Rol$usuariosArgs<ExtArgs>
    rolPermisos?: boolean | Rol$rolPermisosArgs<ExtArgs>
    _count?: boolean | RolCountOutputTypeArgs<ExtArgs>
  }


  type RolGetPayload<S extends boolean | null | undefined | RolArgs> = $Types.GetResult<RolPayload, S>

  type RolCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<RolFindManyArgs, 'select' | 'include'> & {
      select?: RolCountAggregateInputType | true
    }

  export interface RolDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Rol'], meta: { name: 'Rol' } }
    /**
     * Find zero or one Rol that matches the filter.
     * @param {RolFindUniqueArgs} args - Arguments to find a Rol
     * @example
     * // Get one Rol
     * const rol = await prisma.rol.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends RolFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, RolFindUniqueArgs<ExtArgs>>
    ): Prisma__RolClient<$Types.GetResult<RolPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Rol that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {RolFindUniqueOrThrowArgs} args - Arguments to find a Rol
     * @example
     * // Get one Rol
     * const rol = await prisma.rol.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends RolFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RolFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__RolClient<$Types.GetResult<RolPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Rol that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolFindFirstArgs} args - Arguments to find a Rol
     * @example
     * // Get one Rol
     * const rol = await prisma.rol.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends RolFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, RolFindFirstArgs<ExtArgs>>
    ): Prisma__RolClient<$Types.GetResult<RolPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Rol that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolFindFirstOrThrowArgs} args - Arguments to find a Rol
     * @example
     * // Get one Rol
     * const rol = await prisma.rol.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends RolFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RolFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__RolClient<$Types.GetResult<RolPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Rols that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rols
     * const rols = await prisma.rol.findMany()
     * 
     * // Get first 10 Rols
     * const rols = await prisma.rol.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rolWithIdOnly = await prisma.rol.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends RolFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RolFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<RolPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Rol.
     * @param {RolCreateArgs} args - Arguments to create a Rol.
     * @example
     * // Create one Rol
     * const Rol = await prisma.rol.create({
     *   data: {
     *     // ... data to create a Rol
     *   }
     * })
     * 
    **/
    create<T extends RolCreateArgs<ExtArgs>>(
      args: SelectSubset<T, RolCreateArgs<ExtArgs>>
    ): Prisma__RolClient<$Types.GetResult<RolPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Rols.
     *     @param {RolCreateManyArgs} args - Arguments to create many Rols.
     *     @example
     *     // Create many Rols
     *     const rol = await prisma.rol.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends RolCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RolCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Rol.
     * @param {RolDeleteArgs} args - Arguments to delete one Rol.
     * @example
     * // Delete one Rol
     * const Rol = await prisma.rol.delete({
     *   where: {
     *     // ... filter to delete one Rol
     *   }
     * })
     * 
    **/
    delete<T extends RolDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, RolDeleteArgs<ExtArgs>>
    ): Prisma__RolClient<$Types.GetResult<RolPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Rol.
     * @param {RolUpdateArgs} args - Arguments to update one Rol.
     * @example
     * // Update one Rol
     * const rol = await prisma.rol.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends RolUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, RolUpdateArgs<ExtArgs>>
    ): Prisma__RolClient<$Types.GetResult<RolPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Rols.
     * @param {RolDeleteManyArgs} args - Arguments to filter Rols to delete.
     * @example
     * // Delete a few Rols
     * const { count } = await prisma.rol.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends RolDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RolDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rols.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rols
     * const rol = await prisma.rol.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends RolUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, RolUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Rol.
     * @param {RolUpsertArgs} args - Arguments to update or create a Rol.
     * @example
     * // Update or create a Rol
     * const rol = await prisma.rol.upsert({
     *   create: {
     *     // ... data to create a Rol
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rol we want to update
     *   }
     * })
    **/
    upsert<T extends RolUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, RolUpsertArgs<ExtArgs>>
    ): Prisma__RolClient<$Types.GetResult<RolPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Rols.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolCountArgs} args - Arguments to filter Rols to count.
     * @example
     * // Count the number of Rols
     * const count = await prisma.rol.count({
     *   where: {
     *     // ... the filter for the Rols we want to count
     *   }
     * })
    **/
    count<T extends RolCountArgs>(
      args?: Subset<T, RolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rol.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RolAggregateArgs>(args: Subset<T, RolAggregateArgs>): Prisma.PrismaPromise<GetRolAggregateType<T>>

    /**
     * Group by Rol.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolGroupByArgs} args - Group by arguments.
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
    groupBy<
      T extends RolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RolGroupByArgs['orderBy'] }
        : { orderBy?: RolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Rol model
   */
  readonly fields: RolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Rol.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__RolClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    usuarios<T extends Rol$usuariosArgs<ExtArgs> = {}>(args?: Subset<T, Rol$usuariosArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<UsuarioPayload<ExtArgs>, T, 'findMany'>| Null>;

    rolPermisos<T extends Rol$rolPermisosArgs<ExtArgs> = {}>(args?: Subset<T, Rol$rolPermisosArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<RolPermisoPayload<ExtArgs>, T, 'findMany'>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  /**
   * Fields of the Rol model
   */ 
  interface RolFieldRefs {
    readonly id: FieldRef<"Rol", 'String'>
    readonly nombre: FieldRef<"Rol", 'String'>
    readonly empresaId: FieldRef<"Rol", 'String'>
    readonly activo: FieldRef<"Rol", 'Boolean'>
    readonly createdAt: FieldRef<"Rol", 'DateTime'>
    readonly updatedAt: FieldRef<"Rol", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * Rol findUnique
   */
  export type RolFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * Filter, which Rol to fetch.
     */
    where: RolWhereUniqueInput
  }


  /**
   * Rol findUniqueOrThrow
   */
  export type RolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * Filter, which Rol to fetch.
     */
    where: RolWhereUniqueInput
  }


  /**
   * Rol findFirst
   */
  export type RolFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * Filter, which Rol to fetch.
     */
    where?: RolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rols to fetch.
     */
    orderBy?: RolOrderByWithRelationInput | RolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rols.
     */
    cursor?: RolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rols.
     */
    distinct?: RolScalarFieldEnum | RolScalarFieldEnum[]
  }


  /**
   * Rol findFirstOrThrow
   */
  export type RolFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * Filter, which Rol to fetch.
     */
    where?: RolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rols to fetch.
     */
    orderBy?: RolOrderByWithRelationInput | RolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rols.
     */
    cursor?: RolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rols.
     */
    distinct?: RolScalarFieldEnum | RolScalarFieldEnum[]
  }


  /**
   * Rol findMany
   */
  export type RolFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * Filter, which Rols to fetch.
     */
    where?: RolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rols to fetch.
     */
    orderBy?: RolOrderByWithRelationInput | RolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rols.
     */
    cursor?: RolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rols.
     */
    skip?: number
    distinct?: RolScalarFieldEnum | RolScalarFieldEnum[]
  }


  /**
   * Rol create
   */
  export type RolCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * The data needed to create a Rol.
     */
    data: XOR<RolCreateInput, RolUncheckedCreateInput>
  }


  /**
   * Rol createMany
   */
  export type RolCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rols.
     */
    data: RolCreateManyInput | RolCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Rol update
   */
  export type RolUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * The data needed to update a Rol.
     */
    data: XOR<RolUpdateInput, RolUncheckedUpdateInput>
    /**
     * Choose, which Rol to update.
     */
    where: RolWhereUniqueInput
  }


  /**
   * Rol updateMany
   */
  export type RolUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rols.
     */
    data: XOR<RolUpdateManyMutationInput, RolUncheckedUpdateManyInput>
    /**
     * Filter which Rols to update
     */
    where?: RolWhereInput
  }


  /**
   * Rol upsert
   */
  export type RolUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * The filter to search for the Rol to update in case it exists.
     */
    where: RolWhereUniqueInput
    /**
     * In case the Rol found by the `where` argument doesn't exist, create a new Rol with this data.
     */
    create: XOR<RolCreateInput, RolUncheckedCreateInput>
    /**
     * In case the Rol was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RolUpdateInput, RolUncheckedUpdateInput>
  }


  /**
   * Rol delete
   */
  export type RolDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolInclude<ExtArgs> | null
    /**
     * Filter which Rol to delete.
     */
    where: RolWhereUniqueInput
  }


  /**
   * Rol deleteMany
   */
  export type RolDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rols to delete
     */
    where?: RolWhereInput
  }


  /**
   * Rol.usuarios
   */
  export type Rol$usuariosArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    cursor?: UsuarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }


  /**
   * Rol.rolPermisos
   */
  export type Rol$rolPermisosArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolPermisoInclude<ExtArgs> | null
    where?: RolPermisoWhereInput
    orderBy?: RolPermisoOrderByWithRelationInput | RolPermisoOrderByWithRelationInput[]
    cursor?: RolPermisoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RolPermisoScalarFieldEnum | RolPermisoScalarFieldEnum[]
  }


  /**
   * Rol without action
   */
  export type RolArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rol
     */
    select?: RolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolInclude<ExtArgs> | null
  }



  /**
   * Model ModuloPermiso
   */


  export type AggregateModuloPermiso = {
    _count: ModuloPermisoCountAggregateOutputType | null
    _min: ModuloPermisoMinAggregateOutputType | null
    _max: ModuloPermisoMaxAggregateOutputType | null
  }

  export type ModuloPermisoMinAggregateOutputType = {
    id: string | null
    moduloId: string | null
    nombre: string | null
    accion: string | null
    activo: boolean | null
  }

  export type ModuloPermisoMaxAggregateOutputType = {
    id: string | null
    moduloId: string | null
    nombre: string | null
    accion: string | null
    activo: boolean | null
  }

  export type ModuloPermisoCountAggregateOutputType = {
    id: number
    moduloId: number
    nombre: number
    accion: number
    activo: number
    _all: number
  }


  export type ModuloPermisoMinAggregateInputType = {
    id?: true
    moduloId?: true
    nombre?: true
    accion?: true
    activo?: true
  }

  export type ModuloPermisoMaxAggregateInputType = {
    id?: true
    moduloId?: true
    nombre?: true
    accion?: true
    activo?: true
  }

  export type ModuloPermisoCountAggregateInputType = {
    id?: true
    moduloId?: true
    nombre?: true
    accion?: true
    activo?: true
    _all?: true
  }

  export type ModuloPermisoAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModuloPermiso to aggregate.
     */
    where?: ModuloPermisoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuloPermisos to fetch.
     */
    orderBy?: ModuloPermisoOrderByWithRelationInput | ModuloPermisoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModuloPermisoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuloPermisos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuloPermisos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ModuloPermisos
    **/
    _count?: true | ModuloPermisoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModuloPermisoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModuloPermisoMaxAggregateInputType
  }

  export type GetModuloPermisoAggregateType<T extends ModuloPermisoAggregateArgs> = {
        [P in keyof T & keyof AggregateModuloPermiso]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModuloPermiso[P]>
      : GetScalarType<T[P], AggregateModuloPermiso[P]>
  }




  export type ModuloPermisoGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ModuloPermisoWhereInput
    orderBy?: ModuloPermisoOrderByWithAggregationInput | ModuloPermisoOrderByWithAggregationInput[]
    by: ModuloPermisoScalarFieldEnum[] | ModuloPermisoScalarFieldEnum
    having?: ModuloPermisoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModuloPermisoCountAggregateInputType | true
    _min?: ModuloPermisoMinAggregateInputType
    _max?: ModuloPermisoMaxAggregateInputType
  }


  export type ModuloPermisoGroupByOutputType = {
    id: string
    moduloId: string
    nombre: string
    accion: string
    activo: boolean
    _count: ModuloPermisoCountAggregateOutputType | null
    _min: ModuloPermisoMinAggregateOutputType | null
    _max: ModuloPermisoMaxAggregateOutputType | null
  }

  type GetModuloPermisoGroupByPayload<T extends ModuloPermisoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModuloPermisoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModuloPermisoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModuloPermisoGroupByOutputType[P]>
            : GetScalarType<T[P], ModuloPermisoGroupByOutputType[P]>
        }
      >
    >


  export type ModuloPermisoSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    moduloId?: boolean
    nombre?: boolean
    accion?: boolean
    activo?: boolean
    modulo?: boolean | ModuloArgs<ExtArgs>
    rolPermisos?: boolean | ModuloPermiso$rolPermisosArgs<ExtArgs>
    _count?: boolean | ModuloPermisoCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["moduloPermiso"]>

  export type ModuloPermisoSelectScalar = {
    id?: boolean
    moduloId?: boolean
    nombre?: boolean
    accion?: boolean
    activo?: boolean
  }

  export type ModuloPermisoInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    modulo?: boolean | ModuloArgs<ExtArgs>
    rolPermisos?: boolean | ModuloPermiso$rolPermisosArgs<ExtArgs>
    _count?: boolean | ModuloPermisoCountOutputTypeArgs<ExtArgs>
  }


  type ModuloPermisoGetPayload<S extends boolean | null | undefined | ModuloPermisoArgs> = $Types.GetResult<ModuloPermisoPayload, S>

  type ModuloPermisoCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<ModuloPermisoFindManyArgs, 'select' | 'include'> & {
      select?: ModuloPermisoCountAggregateInputType | true
    }

  export interface ModuloPermisoDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ModuloPermiso'], meta: { name: 'ModuloPermiso' } }
    /**
     * Find zero or one ModuloPermiso that matches the filter.
     * @param {ModuloPermisoFindUniqueArgs} args - Arguments to find a ModuloPermiso
     * @example
     * // Get one ModuloPermiso
     * const moduloPermiso = await prisma.moduloPermiso.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ModuloPermisoFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloPermisoFindUniqueArgs<ExtArgs>>
    ): Prisma__ModuloPermisoClient<$Types.GetResult<ModuloPermisoPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one ModuloPermiso that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ModuloPermisoFindUniqueOrThrowArgs} args - Arguments to find a ModuloPermiso
     * @example
     * // Get one ModuloPermiso
     * const moduloPermiso = await prisma.moduloPermiso.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ModuloPermisoFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloPermisoFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ModuloPermisoClient<$Types.GetResult<ModuloPermisoPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first ModuloPermiso that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloPermisoFindFirstArgs} args - Arguments to find a ModuloPermiso
     * @example
     * // Get one ModuloPermiso
     * const moduloPermiso = await prisma.moduloPermiso.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ModuloPermisoFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloPermisoFindFirstArgs<ExtArgs>>
    ): Prisma__ModuloPermisoClient<$Types.GetResult<ModuloPermisoPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ModuloPermiso that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloPermisoFindFirstOrThrowArgs} args - Arguments to find a ModuloPermiso
     * @example
     * // Get one ModuloPermiso
     * const moduloPermiso = await prisma.moduloPermiso.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ModuloPermisoFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloPermisoFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ModuloPermisoClient<$Types.GetResult<ModuloPermisoPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more ModuloPermisos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloPermisoFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ModuloPermisos
     * const moduloPermisos = await prisma.moduloPermiso.findMany()
     * 
     * // Get first 10 ModuloPermisos
     * const moduloPermisos = await prisma.moduloPermiso.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moduloPermisoWithIdOnly = await prisma.moduloPermiso.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ModuloPermisoFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloPermisoFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<ModuloPermisoPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a ModuloPermiso.
     * @param {ModuloPermisoCreateArgs} args - Arguments to create a ModuloPermiso.
     * @example
     * // Create one ModuloPermiso
     * const ModuloPermiso = await prisma.moduloPermiso.create({
     *   data: {
     *     // ... data to create a ModuloPermiso
     *   }
     * })
     * 
    **/
    create<T extends ModuloPermisoCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloPermisoCreateArgs<ExtArgs>>
    ): Prisma__ModuloPermisoClient<$Types.GetResult<ModuloPermisoPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many ModuloPermisos.
     *     @param {ModuloPermisoCreateManyArgs} args - Arguments to create many ModuloPermisos.
     *     @example
     *     // Create many ModuloPermisos
     *     const moduloPermiso = await prisma.moduloPermiso.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ModuloPermisoCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloPermisoCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ModuloPermiso.
     * @param {ModuloPermisoDeleteArgs} args - Arguments to delete one ModuloPermiso.
     * @example
     * // Delete one ModuloPermiso
     * const ModuloPermiso = await prisma.moduloPermiso.delete({
     *   where: {
     *     // ... filter to delete one ModuloPermiso
     *   }
     * })
     * 
    **/
    delete<T extends ModuloPermisoDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloPermisoDeleteArgs<ExtArgs>>
    ): Prisma__ModuloPermisoClient<$Types.GetResult<ModuloPermisoPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one ModuloPermiso.
     * @param {ModuloPermisoUpdateArgs} args - Arguments to update one ModuloPermiso.
     * @example
     * // Update one ModuloPermiso
     * const moduloPermiso = await prisma.moduloPermiso.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ModuloPermisoUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloPermisoUpdateArgs<ExtArgs>>
    ): Prisma__ModuloPermisoClient<$Types.GetResult<ModuloPermisoPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more ModuloPermisos.
     * @param {ModuloPermisoDeleteManyArgs} args - Arguments to filter ModuloPermisos to delete.
     * @example
     * // Delete a few ModuloPermisos
     * const { count } = await prisma.moduloPermiso.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ModuloPermisoDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloPermisoDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModuloPermisos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloPermisoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ModuloPermisos
     * const moduloPermiso = await prisma.moduloPermiso.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ModuloPermisoUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloPermisoUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ModuloPermiso.
     * @param {ModuloPermisoUpsertArgs} args - Arguments to update or create a ModuloPermiso.
     * @example
     * // Update or create a ModuloPermiso
     * const moduloPermiso = await prisma.moduloPermiso.upsert({
     *   create: {
     *     // ... data to create a ModuloPermiso
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ModuloPermiso we want to update
     *   }
     * })
    **/
    upsert<T extends ModuloPermisoUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloPermisoUpsertArgs<ExtArgs>>
    ): Prisma__ModuloPermisoClient<$Types.GetResult<ModuloPermisoPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of ModuloPermisos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloPermisoCountArgs} args - Arguments to filter ModuloPermisos to count.
     * @example
     * // Count the number of ModuloPermisos
     * const count = await prisma.moduloPermiso.count({
     *   where: {
     *     // ... the filter for the ModuloPermisos we want to count
     *   }
     * })
    **/
    count<T extends ModuloPermisoCountArgs>(
      args?: Subset<T, ModuloPermisoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModuloPermisoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ModuloPermiso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloPermisoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ModuloPermisoAggregateArgs>(args: Subset<T, ModuloPermisoAggregateArgs>): Prisma.PrismaPromise<GetModuloPermisoAggregateType<T>>

    /**
     * Group by ModuloPermiso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloPermisoGroupByArgs} args - Group by arguments.
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
    groupBy<
      T extends ModuloPermisoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModuloPermisoGroupByArgs['orderBy'] }
        : { orderBy?: ModuloPermisoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModuloPermisoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModuloPermisoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ModuloPermiso model
   */
  readonly fields: ModuloPermisoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ModuloPermiso.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ModuloPermisoClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    modulo<T extends ModuloArgs<ExtArgs> = {}>(args?: Subset<T, ModuloArgs<ExtArgs>>): Prisma__ModuloClient<$Types.GetResult<ModuloPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    rolPermisos<T extends ModuloPermiso$rolPermisosArgs<ExtArgs> = {}>(args?: Subset<T, ModuloPermiso$rolPermisosArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<RolPermisoPayload<ExtArgs>, T, 'findMany'>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  /**
   * Fields of the ModuloPermiso model
   */ 
  interface ModuloPermisoFieldRefs {
    readonly id: FieldRef<"ModuloPermiso", 'String'>
    readonly moduloId: FieldRef<"ModuloPermiso", 'String'>
    readonly nombre: FieldRef<"ModuloPermiso", 'String'>
    readonly accion: FieldRef<"ModuloPermiso", 'String'>
    readonly activo: FieldRef<"ModuloPermiso", 'Boolean'>
  }
    

  // Custom InputTypes

  /**
   * ModuloPermiso findUnique
   */
  export type ModuloPermisoFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloPermiso
     */
    select?: ModuloPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloPermisoInclude<ExtArgs> | null
    /**
     * Filter, which ModuloPermiso to fetch.
     */
    where: ModuloPermisoWhereUniqueInput
  }


  /**
   * ModuloPermiso findUniqueOrThrow
   */
  export type ModuloPermisoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloPermiso
     */
    select?: ModuloPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloPermisoInclude<ExtArgs> | null
    /**
     * Filter, which ModuloPermiso to fetch.
     */
    where: ModuloPermisoWhereUniqueInput
  }


  /**
   * ModuloPermiso findFirst
   */
  export type ModuloPermisoFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloPermiso
     */
    select?: ModuloPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloPermisoInclude<ExtArgs> | null
    /**
     * Filter, which ModuloPermiso to fetch.
     */
    where?: ModuloPermisoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuloPermisos to fetch.
     */
    orderBy?: ModuloPermisoOrderByWithRelationInput | ModuloPermisoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModuloPermisos.
     */
    cursor?: ModuloPermisoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuloPermisos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuloPermisos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModuloPermisos.
     */
    distinct?: ModuloPermisoScalarFieldEnum | ModuloPermisoScalarFieldEnum[]
  }


  /**
   * ModuloPermiso findFirstOrThrow
   */
  export type ModuloPermisoFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloPermiso
     */
    select?: ModuloPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloPermisoInclude<ExtArgs> | null
    /**
     * Filter, which ModuloPermiso to fetch.
     */
    where?: ModuloPermisoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuloPermisos to fetch.
     */
    orderBy?: ModuloPermisoOrderByWithRelationInput | ModuloPermisoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModuloPermisos.
     */
    cursor?: ModuloPermisoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuloPermisos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuloPermisos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModuloPermisos.
     */
    distinct?: ModuloPermisoScalarFieldEnum | ModuloPermisoScalarFieldEnum[]
  }


  /**
   * ModuloPermiso findMany
   */
  export type ModuloPermisoFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloPermiso
     */
    select?: ModuloPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloPermisoInclude<ExtArgs> | null
    /**
     * Filter, which ModuloPermisos to fetch.
     */
    where?: ModuloPermisoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuloPermisos to fetch.
     */
    orderBy?: ModuloPermisoOrderByWithRelationInput | ModuloPermisoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ModuloPermisos.
     */
    cursor?: ModuloPermisoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuloPermisos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuloPermisos.
     */
    skip?: number
    distinct?: ModuloPermisoScalarFieldEnum | ModuloPermisoScalarFieldEnum[]
  }


  /**
   * ModuloPermiso create
   */
  export type ModuloPermisoCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloPermiso
     */
    select?: ModuloPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloPermisoInclude<ExtArgs> | null
    /**
     * The data needed to create a ModuloPermiso.
     */
    data: XOR<ModuloPermisoCreateInput, ModuloPermisoUncheckedCreateInput>
  }


  /**
   * ModuloPermiso createMany
   */
  export type ModuloPermisoCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ModuloPermisos.
     */
    data: ModuloPermisoCreateManyInput | ModuloPermisoCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * ModuloPermiso update
   */
  export type ModuloPermisoUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloPermiso
     */
    select?: ModuloPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloPermisoInclude<ExtArgs> | null
    /**
     * The data needed to update a ModuloPermiso.
     */
    data: XOR<ModuloPermisoUpdateInput, ModuloPermisoUncheckedUpdateInput>
    /**
     * Choose, which ModuloPermiso to update.
     */
    where: ModuloPermisoWhereUniqueInput
  }


  /**
   * ModuloPermiso updateMany
   */
  export type ModuloPermisoUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ModuloPermisos.
     */
    data: XOR<ModuloPermisoUpdateManyMutationInput, ModuloPermisoUncheckedUpdateManyInput>
    /**
     * Filter which ModuloPermisos to update
     */
    where?: ModuloPermisoWhereInput
  }


  /**
   * ModuloPermiso upsert
   */
  export type ModuloPermisoUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloPermiso
     */
    select?: ModuloPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloPermisoInclude<ExtArgs> | null
    /**
     * The filter to search for the ModuloPermiso to update in case it exists.
     */
    where: ModuloPermisoWhereUniqueInput
    /**
     * In case the ModuloPermiso found by the `where` argument doesn't exist, create a new ModuloPermiso with this data.
     */
    create: XOR<ModuloPermisoCreateInput, ModuloPermisoUncheckedCreateInput>
    /**
     * In case the ModuloPermiso was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModuloPermisoUpdateInput, ModuloPermisoUncheckedUpdateInput>
  }


  /**
   * ModuloPermiso delete
   */
  export type ModuloPermisoDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloPermiso
     */
    select?: ModuloPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloPermisoInclude<ExtArgs> | null
    /**
     * Filter which ModuloPermiso to delete.
     */
    where: ModuloPermisoWhereUniqueInput
  }


  /**
   * ModuloPermiso deleteMany
   */
  export type ModuloPermisoDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModuloPermisos to delete
     */
    where?: ModuloPermisoWhereInput
  }


  /**
   * ModuloPermiso.rolPermisos
   */
  export type ModuloPermiso$rolPermisosArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolPermisoInclude<ExtArgs> | null
    where?: RolPermisoWhereInput
    orderBy?: RolPermisoOrderByWithRelationInput | RolPermisoOrderByWithRelationInput[]
    cursor?: RolPermisoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RolPermisoScalarFieldEnum | RolPermisoScalarFieldEnum[]
  }


  /**
   * ModuloPermiso without action
   */
  export type ModuloPermisoArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloPermiso
     */
    select?: ModuloPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloPermisoInclude<ExtArgs> | null
  }



  /**
   * Model RolPermiso
   */


  export type AggregateRolPermiso = {
    _count: RolPermisoCountAggregateOutputType | null
    _min: RolPermisoMinAggregateOutputType | null
    _max: RolPermisoMaxAggregateOutputType | null
  }

  export type RolPermisoMinAggregateOutputType = {
    id: string | null
    rolId: string | null
    moduloPermisoId: string | null
    activo: boolean | null
  }

  export type RolPermisoMaxAggregateOutputType = {
    id: string | null
    rolId: string | null
    moduloPermisoId: string | null
    activo: boolean | null
  }

  export type RolPermisoCountAggregateOutputType = {
    id: number
    rolId: number
    moduloPermisoId: number
    activo: number
    _all: number
  }


  export type RolPermisoMinAggregateInputType = {
    id?: true
    rolId?: true
    moduloPermisoId?: true
    activo?: true
  }

  export type RolPermisoMaxAggregateInputType = {
    id?: true
    rolId?: true
    moduloPermisoId?: true
    activo?: true
  }

  export type RolPermisoCountAggregateInputType = {
    id?: true
    rolId?: true
    moduloPermisoId?: true
    activo?: true
    _all?: true
  }

  export type RolPermisoAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which RolPermiso to aggregate.
     */
    where?: RolPermisoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolPermisos to fetch.
     */
    orderBy?: RolPermisoOrderByWithRelationInput | RolPermisoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RolPermisoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolPermisos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolPermisos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RolPermisos
    **/
    _count?: true | RolPermisoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolPermisoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolPermisoMaxAggregateInputType
  }

  export type GetRolPermisoAggregateType<T extends RolPermisoAggregateArgs> = {
        [P in keyof T & keyof AggregateRolPermiso]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRolPermiso[P]>
      : GetScalarType<T[P], AggregateRolPermiso[P]>
  }




  export type RolPermisoGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: RolPermisoWhereInput
    orderBy?: RolPermisoOrderByWithAggregationInput | RolPermisoOrderByWithAggregationInput[]
    by: RolPermisoScalarFieldEnum[] | RolPermisoScalarFieldEnum
    having?: RolPermisoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RolPermisoCountAggregateInputType | true
    _min?: RolPermisoMinAggregateInputType
    _max?: RolPermisoMaxAggregateInputType
  }


  export type RolPermisoGroupByOutputType = {
    id: string
    rolId: string
    moduloPermisoId: string
    activo: boolean
    _count: RolPermisoCountAggregateOutputType | null
    _min: RolPermisoMinAggregateOutputType | null
    _max: RolPermisoMaxAggregateOutputType | null
  }

  type GetRolPermisoGroupByPayload<T extends RolPermisoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RolPermisoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RolPermisoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RolPermisoGroupByOutputType[P]>
            : GetScalarType<T[P], RolPermisoGroupByOutputType[P]>
        }
      >
    >


  export type RolPermisoSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rolId?: boolean
    moduloPermisoId?: boolean
    activo?: boolean
    rol?: boolean | RolArgs<ExtArgs>
    moduloPermiso?: boolean | ModuloPermisoArgs<ExtArgs>
  }, ExtArgs["result"]["rolPermiso"]>

  export type RolPermisoSelectScalar = {
    id?: boolean
    rolId?: boolean
    moduloPermisoId?: boolean
    activo?: boolean
  }

  export type RolPermisoInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    rol?: boolean | RolArgs<ExtArgs>
    moduloPermiso?: boolean | ModuloPermisoArgs<ExtArgs>
  }


  type RolPermisoGetPayload<S extends boolean | null | undefined | RolPermisoArgs> = $Types.GetResult<RolPermisoPayload, S>

  type RolPermisoCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<RolPermisoFindManyArgs, 'select' | 'include'> & {
      select?: RolPermisoCountAggregateInputType | true
    }

  export interface RolPermisoDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RolPermiso'], meta: { name: 'RolPermiso' } }
    /**
     * Find zero or one RolPermiso that matches the filter.
     * @param {RolPermisoFindUniqueArgs} args - Arguments to find a RolPermiso
     * @example
     * // Get one RolPermiso
     * const rolPermiso = await prisma.rolPermiso.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends RolPermisoFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, RolPermisoFindUniqueArgs<ExtArgs>>
    ): Prisma__RolPermisoClient<$Types.GetResult<RolPermisoPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one RolPermiso that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {RolPermisoFindUniqueOrThrowArgs} args - Arguments to find a RolPermiso
     * @example
     * // Get one RolPermiso
     * const rolPermiso = await prisma.rolPermiso.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends RolPermisoFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RolPermisoFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__RolPermisoClient<$Types.GetResult<RolPermisoPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first RolPermiso that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolPermisoFindFirstArgs} args - Arguments to find a RolPermiso
     * @example
     * // Get one RolPermiso
     * const rolPermiso = await prisma.rolPermiso.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends RolPermisoFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, RolPermisoFindFirstArgs<ExtArgs>>
    ): Prisma__RolPermisoClient<$Types.GetResult<RolPermisoPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first RolPermiso that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolPermisoFindFirstOrThrowArgs} args - Arguments to find a RolPermiso
     * @example
     * // Get one RolPermiso
     * const rolPermiso = await prisma.rolPermiso.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends RolPermisoFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RolPermisoFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__RolPermisoClient<$Types.GetResult<RolPermisoPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more RolPermisos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolPermisoFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RolPermisos
     * const rolPermisos = await prisma.rolPermiso.findMany()
     * 
     * // Get first 10 RolPermisos
     * const rolPermisos = await prisma.rolPermiso.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rolPermisoWithIdOnly = await prisma.rolPermiso.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends RolPermisoFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RolPermisoFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<RolPermisoPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a RolPermiso.
     * @param {RolPermisoCreateArgs} args - Arguments to create a RolPermiso.
     * @example
     * // Create one RolPermiso
     * const RolPermiso = await prisma.rolPermiso.create({
     *   data: {
     *     // ... data to create a RolPermiso
     *   }
     * })
     * 
    **/
    create<T extends RolPermisoCreateArgs<ExtArgs>>(
      args: SelectSubset<T, RolPermisoCreateArgs<ExtArgs>>
    ): Prisma__RolPermisoClient<$Types.GetResult<RolPermisoPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many RolPermisos.
     *     @param {RolPermisoCreateManyArgs} args - Arguments to create many RolPermisos.
     *     @example
     *     // Create many RolPermisos
     *     const rolPermiso = await prisma.rolPermiso.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends RolPermisoCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RolPermisoCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RolPermiso.
     * @param {RolPermisoDeleteArgs} args - Arguments to delete one RolPermiso.
     * @example
     * // Delete one RolPermiso
     * const RolPermiso = await prisma.rolPermiso.delete({
     *   where: {
     *     // ... filter to delete one RolPermiso
     *   }
     * })
     * 
    **/
    delete<T extends RolPermisoDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, RolPermisoDeleteArgs<ExtArgs>>
    ): Prisma__RolPermisoClient<$Types.GetResult<RolPermisoPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one RolPermiso.
     * @param {RolPermisoUpdateArgs} args - Arguments to update one RolPermiso.
     * @example
     * // Update one RolPermiso
     * const rolPermiso = await prisma.rolPermiso.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends RolPermisoUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, RolPermisoUpdateArgs<ExtArgs>>
    ): Prisma__RolPermisoClient<$Types.GetResult<RolPermisoPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more RolPermisos.
     * @param {RolPermisoDeleteManyArgs} args - Arguments to filter RolPermisos to delete.
     * @example
     * // Delete a few RolPermisos
     * const { count } = await prisma.rolPermiso.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends RolPermisoDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RolPermisoDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RolPermisos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolPermisoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RolPermisos
     * const rolPermiso = await prisma.rolPermiso.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends RolPermisoUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, RolPermisoUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RolPermiso.
     * @param {RolPermisoUpsertArgs} args - Arguments to update or create a RolPermiso.
     * @example
     * // Update or create a RolPermiso
     * const rolPermiso = await prisma.rolPermiso.upsert({
     *   create: {
     *     // ... data to create a RolPermiso
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RolPermiso we want to update
     *   }
     * })
    **/
    upsert<T extends RolPermisoUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, RolPermisoUpsertArgs<ExtArgs>>
    ): Prisma__RolPermisoClient<$Types.GetResult<RolPermisoPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of RolPermisos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolPermisoCountArgs} args - Arguments to filter RolPermisos to count.
     * @example
     * // Count the number of RolPermisos
     * const count = await prisma.rolPermiso.count({
     *   where: {
     *     // ... the filter for the RolPermisos we want to count
     *   }
     * })
    **/
    count<T extends RolPermisoCountArgs>(
      args?: Subset<T, RolPermisoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolPermisoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RolPermiso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolPermisoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RolPermisoAggregateArgs>(args: Subset<T, RolPermisoAggregateArgs>): Prisma.PrismaPromise<GetRolPermisoAggregateType<T>>

    /**
     * Group by RolPermiso.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolPermisoGroupByArgs} args - Group by arguments.
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
    groupBy<
      T extends RolPermisoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RolPermisoGroupByArgs['orderBy'] }
        : { orderBy?: RolPermisoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RolPermisoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolPermisoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RolPermiso model
   */
  readonly fields: RolPermisoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RolPermiso.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__RolPermisoClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    rol<T extends RolArgs<ExtArgs> = {}>(args?: Subset<T, RolArgs<ExtArgs>>): Prisma__RolClient<$Types.GetResult<RolPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    moduloPermiso<T extends ModuloPermisoArgs<ExtArgs> = {}>(args?: Subset<T, ModuloPermisoArgs<ExtArgs>>): Prisma__ModuloPermisoClient<$Types.GetResult<ModuloPermisoPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  /**
   * Fields of the RolPermiso model
   */ 
  interface RolPermisoFieldRefs {
    readonly id: FieldRef<"RolPermiso", 'String'>
    readonly rolId: FieldRef<"RolPermiso", 'String'>
    readonly moduloPermisoId: FieldRef<"RolPermiso", 'String'>
    readonly activo: FieldRef<"RolPermiso", 'Boolean'>
  }
    

  // Custom InputTypes

  /**
   * RolPermiso findUnique
   */
  export type RolPermisoFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolPermisoInclude<ExtArgs> | null
    /**
     * Filter, which RolPermiso to fetch.
     */
    where: RolPermisoWhereUniqueInput
  }


  /**
   * RolPermiso findUniqueOrThrow
   */
  export type RolPermisoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolPermisoInclude<ExtArgs> | null
    /**
     * Filter, which RolPermiso to fetch.
     */
    where: RolPermisoWhereUniqueInput
  }


  /**
   * RolPermiso findFirst
   */
  export type RolPermisoFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolPermisoInclude<ExtArgs> | null
    /**
     * Filter, which RolPermiso to fetch.
     */
    where?: RolPermisoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolPermisos to fetch.
     */
    orderBy?: RolPermisoOrderByWithRelationInput | RolPermisoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RolPermisos.
     */
    cursor?: RolPermisoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolPermisos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolPermisos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolPermisos.
     */
    distinct?: RolPermisoScalarFieldEnum | RolPermisoScalarFieldEnum[]
  }


  /**
   * RolPermiso findFirstOrThrow
   */
  export type RolPermisoFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolPermisoInclude<ExtArgs> | null
    /**
     * Filter, which RolPermiso to fetch.
     */
    where?: RolPermisoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolPermisos to fetch.
     */
    orderBy?: RolPermisoOrderByWithRelationInput | RolPermisoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RolPermisos.
     */
    cursor?: RolPermisoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolPermisos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolPermisos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolPermisos.
     */
    distinct?: RolPermisoScalarFieldEnum | RolPermisoScalarFieldEnum[]
  }


  /**
   * RolPermiso findMany
   */
  export type RolPermisoFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolPermisoInclude<ExtArgs> | null
    /**
     * Filter, which RolPermisos to fetch.
     */
    where?: RolPermisoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolPermisos to fetch.
     */
    orderBy?: RolPermisoOrderByWithRelationInput | RolPermisoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RolPermisos.
     */
    cursor?: RolPermisoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolPermisos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolPermisos.
     */
    skip?: number
    distinct?: RolPermisoScalarFieldEnum | RolPermisoScalarFieldEnum[]
  }


  /**
   * RolPermiso create
   */
  export type RolPermisoCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolPermisoInclude<ExtArgs> | null
    /**
     * The data needed to create a RolPermiso.
     */
    data: XOR<RolPermisoCreateInput, RolPermisoUncheckedCreateInput>
  }


  /**
   * RolPermiso createMany
   */
  export type RolPermisoCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RolPermisos.
     */
    data: RolPermisoCreateManyInput | RolPermisoCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * RolPermiso update
   */
  export type RolPermisoUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolPermisoInclude<ExtArgs> | null
    /**
     * The data needed to update a RolPermiso.
     */
    data: XOR<RolPermisoUpdateInput, RolPermisoUncheckedUpdateInput>
    /**
     * Choose, which RolPermiso to update.
     */
    where: RolPermisoWhereUniqueInput
  }


  /**
   * RolPermiso updateMany
   */
  export type RolPermisoUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RolPermisos.
     */
    data: XOR<RolPermisoUpdateManyMutationInput, RolPermisoUncheckedUpdateManyInput>
    /**
     * Filter which RolPermisos to update
     */
    where?: RolPermisoWhereInput
  }


  /**
   * RolPermiso upsert
   */
  export type RolPermisoUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolPermisoInclude<ExtArgs> | null
    /**
     * The filter to search for the RolPermiso to update in case it exists.
     */
    where: RolPermisoWhereUniqueInput
    /**
     * In case the RolPermiso found by the `where` argument doesn't exist, create a new RolPermiso with this data.
     */
    create: XOR<RolPermisoCreateInput, RolPermisoUncheckedCreateInput>
    /**
     * In case the RolPermiso was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RolPermisoUpdateInput, RolPermisoUncheckedUpdateInput>
  }


  /**
   * RolPermiso delete
   */
  export type RolPermisoDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolPermisoInclude<ExtArgs> | null
    /**
     * Filter which RolPermiso to delete.
     */
    where: RolPermisoWhereUniqueInput
  }


  /**
   * RolPermiso deleteMany
   */
  export type RolPermisoDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which RolPermisos to delete
     */
    where?: RolPermisoWhereInput
  }


  /**
   * RolPermiso without action
   */
  export type RolPermisoArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolPermiso
     */
    select?: RolPermisoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolPermisoInclude<ExtArgs> | null
  }



  /**
   * Model ModuloRuta
   */


  export type AggregateModuloRuta = {
    _count: ModuloRutaCountAggregateOutputType | null
    _min: ModuloRutaMinAggregateOutputType | null
    _max: ModuloRutaMaxAggregateOutputType | null
  }

  export type ModuloRutaMinAggregateOutputType = {
    id: string | null
    moduloId: string | null
    empresaId: string | null
    ruta: string | null
    metodo: string | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ModuloRutaMaxAggregateOutputType = {
    id: string | null
    moduloId: string | null
    empresaId: string | null
    ruta: string | null
    metodo: string | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ModuloRutaCountAggregateOutputType = {
    id: number
    moduloId: number
    empresaId: number
    ruta: number
    metodo: number
    activo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ModuloRutaMinAggregateInputType = {
    id?: true
    moduloId?: true
    empresaId?: true
    ruta?: true
    metodo?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ModuloRutaMaxAggregateInputType = {
    id?: true
    moduloId?: true
    empresaId?: true
    ruta?: true
    metodo?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ModuloRutaCountAggregateInputType = {
    id?: true
    moduloId?: true
    empresaId?: true
    ruta?: true
    metodo?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ModuloRutaAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModuloRuta to aggregate.
     */
    where?: ModuloRutaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuloRutas to fetch.
     */
    orderBy?: ModuloRutaOrderByWithRelationInput | ModuloRutaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModuloRutaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuloRutas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuloRutas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ModuloRutas
    **/
    _count?: true | ModuloRutaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModuloRutaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModuloRutaMaxAggregateInputType
  }

  export type GetModuloRutaAggregateType<T extends ModuloRutaAggregateArgs> = {
        [P in keyof T & keyof AggregateModuloRuta]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModuloRuta[P]>
      : GetScalarType<T[P], AggregateModuloRuta[P]>
  }




  export type ModuloRutaGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ModuloRutaWhereInput
    orderBy?: ModuloRutaOrderByWithAggregationInput | ModuloRutaOrderByWithAggregationInput[]
    by: ModuloRutaScalarFieldEnum[] | ModuloRutaScalarFieldEnum
    having?: ModuloRutaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModuloRutaCountAggregateInputType | true
    _min?: ModuloRutaMinAggregateInputType
    _max?: ModuloRutaMaxAggregateInputType
  }


  export type ModuloRutaGroupByOutputType = {
    id: string
    moduloId: string
    empresaId: string | null
    ruta: string
    metodo: string
    activo: boolean
    createdAt: Date
    updatedAt: Date
    _count: ModuloRutaCountAggregateOutputType | null
    _min: ModuloRutaMinAggregateOutputType | null
    _max: ModuloRutaMaxAggregateOutputType | null
  }

  type GetModuloRutaGroupByPayload<T extends ModuloRutaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModuloRutaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModuloRutaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModuloRutaGroupByOutputType[P]>
            : GetScalarType<T[P], ModuloRutaGroupByOutputType[P]>
        }
      >
    >


  export type ModuloRutaSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    moduloId?: boolean
    empresaId?: boolean
    ruta?: boolean
    metodo?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    modulo?: boolean | ModuloArgs<ExtArgs>
    empresa?: boolean | ModuloRuta$empresaArgs<ExtArgs>
  }, ExtArgs["result"]["moduloRuta"]>

  export type ModuloRutaSelectScalar = {
    id?: boolean
    moduloId?: boolean
    empresaId?: boolean
    ruta?: boolean
    metodo?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ModuloRutaInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    modulo?: boolean | ModuloArgs<ExtArgs>
    empresa?: boolean | ModuloRuta$empresaArgs<ExtArgs>
  }


  type ModuloRutaGetPayload<S extends boolean | null | undefined | ModuloRutaArgs> = $Types.GetResult<ModuloRutaPayload, S>

  type ModuloRutaCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<ModuloRutaFindManyArgs, 'select' | 'include'> & {
      select?: ModuloRutaCountAggregateInputType | true
    }

  export interface ModuloRutaDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ModuloRuta'], meta: { name: 'ModuloRuta' } }
    /**
     * Find zero or one ModuloRuta that matches the filter.
     * @param {ModuloRutaFindUniqueArgs} args - Arguments to find a ModuloRuta
     * @example
     * // Get one ModuloRuta
     * const moduloRuta = await prisma.moduloRuta.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ModuloRutaFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloRutaFindUniqueArgs<ExtArgs>>
    ): Prisma__ModuloRutaClient<$Types.GetResult<ModuloRutaPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one ModuloRuta that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ModuloRutaFindUniqueOrThrowArgs} args - Arguments to find a ModuloRuta
     * @example
     * // Get one ModuloRuta
     * const moduloRuta = await prisma.moduloRuta.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ModuloRutaFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloRutaFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ModuloRutaClient<$Types.GetResult<ModuloRutaPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first ModuloRuta that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloRutaFindFirstArgs} args - Arguments to find a ModuloRuta
     * @example
     * // Get one ModuloRuta
     * const moduloRuta = await prisma.moduloRuta.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ModuloRutaFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloRutaFindFirstArgs<ExtArgs>>
    ): Prisma__ModuloRutaClient<$Types.GetResult<ModuloRutaPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ModuloRuta that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloRutaFindFirstOrThrowArgs} args - Arguments to find a ModuloRuta
     * @example
     * // Get one ModuloRuta
     * const moduloRuta = await prisma.moduloRuta.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ModuloRutaFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloRutaFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ModuloRutaClient<$Types.GetResult<ModuloRutaPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more ModuloRutas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloRutaFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ModuloRutas
     * const moduloRutas = await prisma.moduloRuta.findMany()
     * 
     * // Get first 10 ModuloRutas
     * const moduloRutas = await prisma.moduloRuta.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moduloRutaWithIdOnly = await prisma.moduloRuta.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ModuloRutaFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloRutaFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<ModuloRutaPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a ModuloRuta.
     * @param {ModuloRutaCreateArgs} args - Arguments to create a ModuloRuta.
     * @example
     * // Create one ModuloRuta
     * const ModuloRuta = await prisma.moduloRuta.create({
     *   data: {
     *     // ... data to create a ModuloRuta
     *   }
     * })
     * 
    **/
    create<T extends ModuloRutaCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloRutaCreateArgs<ExtArgs>>
    ): Prisma__ModuloRutaClient<$Types.GetResult<ModuloRutaPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many ModuloRutas.
     *     @param {ModuloRutaCreateManyArgs} args - Arguments to create many ModuloRutas.
     *     @example
     *     // Create many ModuloRutas
     *     const moduloRuta = await prisma.moduloRuta.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ModuloRutaCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloRutaCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ModuloRuta.
     * @param {ModuloRutaDeleteArgs} args - Arguments to delete one ModuloRuta.
     * @example
     * // Delete one ModuloRuta
     * const ModuloRuta = await prisma.moduloRuta.delete({
     *   where: {
     *     // ... filter to delete one ModuloRuta
     *   }
     * })
     * 
    **/
    delete<T extends ModuloRutaDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloRutaDeleteArgs<ExtArgs>>
    ): Prisma__ModuloRutaClient<$Types.GetResult<ModuloRutaPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one ModuloRuta.
     * @param {ModuloRutaUpdateArgs} args - Arguments to update one ModuloRuta.
     * @example
     * // Update one ModuloRuta
     * const moduloRuta = await prisma.moduloRuta.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ModuloRutaUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloRutaUpdateArgs<ExtArgs>>
    ): Prisma__ModuloRutaClient<$Types.GetResult<ModuloRutaPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more ModuloRutas.
     * @param {ModuloRutaDeleteManyArgs} args - Arguments to filter ModuloRutas to delete.
     * @example
     * // Delete a few ModuloRutas
     * const { count } = await prisma.moduloRuta.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ModuloRutaDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuloRutaDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModuloRutas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloRutaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ModuloRutas
     * const moduloRuta = await prisma.moduloRuta.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ModuloRutaUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloRutaUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ModuloRuta.
     * @param {ModuloRutaUpsertArgs} args - Arguments to update or create a ModuloRuta.
     * @example
     * // Update or create a ModuloRuta
     * const moduloRuta = await prisma.moduloRuta.upsert({
     *   create: {
     *     // ... data to create a ModuloRuta
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ModuloRuta we want to update
     *   }
     * })
    **/
    upsert<T extends ModuloRutaUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ModuloRutaUpsertArgs<ExtArgs>>
    ): Prisma__ModuloRutaClient<$Types.GetResult<ModuloRutaPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of ModuloRutas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloRutaCountArgs} args - Arguments to filter ModuloRutas to count.
     * @example
     * // Count the number of ModuloRutas
     * const count = await prisma.moduloRuta.count({
     *   where: {
     *     // ... the filter for the ModuloRutas we want to count
     *   }
     * })
    **/
    count<T extends ModuloRutaCountArgs>(
      args?: Subset<T, ModuloRutaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModuloRutaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ModuloRuta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloRutaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ModuloRutaAggregateArgs>(args: Subset<T, ModuloRutaAggregateArgs>): Prisma.PrismaPromise<GetModuloRutaAggregateType<T>>

    /**
     * Group by ModuloRuta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuloRutaGroupByArgs} args - Group by arguments.
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
    groupBy<
      T extends ModuloRutaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModuloRutaGroupByArgs['orderBy'] }
        : { orderBy?: ModuloRutaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModuloRutaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModuloRutaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ModuloRuta model
   */
  readonly fields: ModuloRutaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ModuloRuta.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ModuloRutaClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    modulo<T extends ModuloArgs<ExtArgs> = {}>(args?: Subset<T, ModuloArgs<ExtArgs>>): Prisma__ModuloClient<$Types.GetResult<ModuloPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    empresa<T extends ModuloRuta$empresaArgs<ExtArgs> = {}>(args?: Subset<T, ModuloRuta$empresaArgs<ExtArgs>>): Prisma__EmpresaClient<$Types.GetResult<EmpresaPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  /**
   * Fields of the ModuloRuta model
   */ 
  interface ModuloRutaFieldRefs {
    readonly id: FieldRef<"ModuloRuta", 'String'>
    readonly moduloId: FieldRef<"ModuloRuta", 'String'>
    readonly empresaId: FieldRef<"ModuloRuta", 'String'>
    readonly ruta: FieldRef<"ModuloRuta", 'String'>
    readonly metodo: FieldRef<"ModuloRuta", 'String'>
    readonly activo: FieldRef<"ModuloRuta", 'Boolean'>
    readonly createdAt: FieldRef<"ModuloRuta", 'DateTime'>
    readonly updatedAt: FieldRef<"ModuloRuta", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * ModuloRuta findUnique
   */
  export type ModuloRutaFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloRuta
     */
    select?: ModuloRutaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloRutaInclude<ExtArgs> | null
    /**
     * Filter, which ModuloRuta to fetch.
     */
    where: ModuloRutaWhereUniqueInput
  }


  /**
   * ModuloRuta findUniqueOrThrow
   */
  export type ModuloRutaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloRuta
     */
    select?: ModuloRutaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloRutaInclude<ExtArgs> | null
    /**
     * Filter, which ModuloRuta to fetch.
     */
    where: ModuloRutaWhereUniqueInput
  }


  /**
   * ModuloRuta findFirst
   */
  export type ModuloRutaFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloRuta
     */
    select?: ModuloRutaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloRutaInclude<ExtArgs> | null
    /**
     * Filter, which ModuloRuta to fetch.
     */
    where?: ModuloRutaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuloRutas to fetch.
     */
    orderBy?: ModuloRutaOrderByWithRelationInput | ModuloRutaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModuloRutas.
     */
    cursor?: ModuloRutaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuloRutas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuloRutas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModuloRutas.
     */
    distinct?: ModuloRutaScalarFieldEnum | ModuloRutaScalarFieldEnum[]
  }


  /**
   * ModuloRuta findFirstOrThrow
   */
  export type ModuloRutaFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloRuta
     */
    select?: ModuloRutaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloRutaInclude<ExtArgs> | null
    /**
     * Filter, which ModuloRuta to fetch.
     */
    where?: ModuloRutaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuloRutas to fetch.
     */
    orderBy?: ModuloRutaOrderByWithRelationInput | ModuloRutaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModuloRutas.
     */
    cursor?: ModuloRutaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuloRutas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuloRutas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModuloRutas.
     */
    distinct?: ModuloRutaScalarFieldEnum | ModuloRutaScalarFieldEnum[]
  }


  /**
   * ModuloRuta findMany
   */
  export type ModuloRutaFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloRuta
     */
    select?: ModuloRutaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloRutaInclude<ExtArgs> | null
    /**
     * Filter, which ModuloRutas to fetch.
     */
    where?: ModuloRutaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuloRutas to fetch.
     */
    orderBy?: ModuloRutaOrderByWithRelationInput | ModuloRutaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ModuloRutas.
     */
    cursor?: ModuloRutaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuloRutas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuloRutas.
     */
    skip?: number
    distinct?: ModuloRutaScalarFieldEnum | ModuloRutaScalarFieldEnum[]
  }


  /**
   * ModuloRuta create
   */
  export type ModuloRutaCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloRuta
     */
    select?: ModuloRutaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloRutaInclude<ExtArgs> | null
    /**
     * The data needed to create a ModuloRuta.
     */
    data: XOR<ModuloRutaCreateInput, ModuloRutaUncheckedCreateInput>
  }


  /**
   * ModuloRuta createMany
   */
  export type ModuloRutaCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ModuloRutas.
     */
    data: ModuloRutaCreateManyInput | ModuloRutaCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * ModuloRuta update
   */
  export type ModuloRutaUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloRuta
     */
    select?: ModuloRutaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloRutaInclude<ExtArgs> | null
    /**
     * The data needed to update a ModuloRuta.
     */
    data: XOR<ModuloRutaUpdateInput, ModuloRutaUncheckedUpdateInput>
    /**
     * Choose, which ModuloRuta to update.
     */
    where: ModuloRutaWhereUniqueInput
  }


  /**
   * ModuloRuta updateMany
   */
  export type ModuloRutaUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ModuloRutas.
     */
    data: XOR<ModuloRutaUpdateManyMutationInput, ModuloRutaUncheckedUpdateManyInput>
    /**
     * Filter which ModuloRutas to update
     */
    where?: ModuloRutaWhereInput
  }


  /**
   * ModuloRuta upsert
   */
  export type ModuloRutaUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloRuta
     */
    select?: ModuloRutaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloRutaInclude<ExtArgs> | null
    /**
     * The filter to search for the ModuloRuta to update in case it exists.
     */
    where: ModuloRutaWhereUniqueInput
    /**
     * In case the ModuloRuta found by the `where` argument doesn't exist, create a new ModuloRuta with this data.
     */
    create: XOR<ModuloRutaCreateInput, ModuloRutaUncheckedCreateInput>
    /**
     * In case the ModuloRuta was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModuloRutaUpdateInput, ModuloRutaUncheckedUpdateInput>
  }


  /**
   * ModuloRuta delete
   */
  export type ModuloRutaDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloRuta
     */
    select?: ModuloRutaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloRutaInclude<ExtArgs> | null
    /**
     * Filter which ModuloRuta to delete.
     */
    where: ModuloRutaWhereUniqueInput
  }


  /**
   * ModuloRuta deleteMany
   */
  export type ModuloRutaDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModuloRutas to delete
     */
    where?: ModuloRutaWhereInput
  }


  /**
   * ModuloRuta.empresa
   */
  export type ModuloRuta$empresaArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmpresaInclude<ExtArgs> | null
    where?: EmpresaWhereInput
  }


  /**
   * ModuloRuta without action
   */
  export type ModuloRutaArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuloRuta
     */
    select?: ModuloRutaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuloRutaInclude<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const EmpresaScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    ruc: 'ruc',
    plan: 'plan',
    activo: 'activo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmpresaScalarFieldEnum = (typeof EmpresaScalarFieldEnum)[keyof typeof EmpresaScalarFieldEnum]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    email: 'email',
    nombre: 'nombre',
    empresaId: 'empresaId',
    rolId: 'rolId',
    activo: 'activo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const ModuloScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    displayName: 'displayName',
    version: 'version',
    activo: 'activo',
    dependencias: 'dependencias',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ModuloScalarFieldEnum = (typeof ModuloScalarFieldEnum)[keyof typeof ModuloScalarFieldEnum]


  export const EmpresaModuloScalarFieldEnum: {
    id: 'id',
    empresaId: 'empresaId',
    moduloId: 'moduloId',
    activo: 'activo',
    configuracion: 'configuracion',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmpresaModuloScalarFieldEnum = (typeof EmpresaModuloScalarFieldEnum)[keyof typeof EmpresaModuloScalarFieldEnum]


  export const ModuloDependenciaScalarFieldEnum: {
    id: 'id',
    moduloId: 'moduloId',
    dependeDeId: 'dependeDeId',
    requerido: 'requerido',
    createdAt: 'createdAt'
  };

  export type ModuloDependenciaScalarFieldEnum = (typeof ModuloDependenciaScalarFieldEnum)[keyof typeof ModuloDependenciaScalarFieldEnum]


  export const RolScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    empresaId: 'empresaId',
    activo: 'activo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RolScalarFieldEnum = (typeof RolScalarFieldEnum)[keyof typeof RolScalarFieldEnum]


  export const ModuloPermisoScalarFieldEnum: {
    id: 'id',
    moduloId: 'moduloId',
    nombre: 'nombre',
    accion: 'accion',
    activo: 'activo'
  };

  export type ModuloPermisoScalarFieldEnum = (typeof ModuloPermisoScalarFieldEnum)[keyof typeof ModuloPermisoScalarFieldEnum]


  export const RolPermisoScalarFieldEnum: {
    id: 'id',
    rolId: 'rolId',
    moduloPermisoId: 'moduloPermisoId',
    activo: 'activo'
  };

  export type RolPermisoScalarFieldEnum = (typeof RolPermisoScalarFieldEnum)[keyof typeof RolPermisoScalarFieldEnum]


  export const ModuloRutaScalarFieldEnum: {
    id: 'id',
    moduloId: 'moduloId',
    empresaId: 'empresaId',
    ruta: 'ruta',
    metodo: 'metodo',
    activo: 'activo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ModuloRutaScalarFieldEnum = (typeof ModuloRutaScalarFieldEnum)[keyof typeof ModuloRutaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type EmpresaWhereInput = {
    AND?: EmpresaWhereInput | EmpresaWhereInput[]
    OR?: EmpresaWhereInput[]
    NOT?: EmpresaWhereInput | EmpresaWhereInput[]
    id?: StringFilter<"Empresa"> | string
    nombre?: StringFilter<"Empresa"> | string
    ruc?: StringFilter<"Empresa"> | string
    plan?: StringFilter<"Empresa"> | string
    activo?: BoolFilter<"Empresa"> | boolean
    createdAt?: DateTimeFilter<"Empresa"> | Date | string
    updatedAt?: DateTimeFilter<"Empresa"> | Date | string
    usuarios?: UsuarioListRelationFilter
    empresaModulos?: EmpresaModuloListRelationFilter
    modulosRutas?: ModuloRutaListRelationFilter
  }

  export type EmpresaOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    ruc?: SortOrder
    plan?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    usuarios?: UsuarioOrderByRelationAggregateInput
    empresaModulos?: EmpresaModuloOrderByRelationAggregateInput
    modulosRutas?: ModuloRutaOrderByRelationAggregateInput
  }

  export type EmpresaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    ruc?: string
    AND?: EmpresaWhereInput | EmpresaWhereInput[]
    OR?: EmpresaWhereInput[]
    NOT?: EmpresaWhereInput | EmpresaWhereInput[]
    nombre?: StringFilter<"Empresa"> | string
    plan?: StringFilter<"Empresa"> | string
    activo?: BoolFilter<"Empresa"> | boolean
    createdAt?: DateTimeFilter<"Empresa"> | Date | string
    updatedAt?: DateTimeFilter<"Empresa"> | Date | string
    usuarios?: UsuarioListRelationFilter
    empresaModulos?: EmpresaModuloListRelationFilter
    modulosRutas?: ModuloRutaListRelationFilter
  }, "id" | "ruc">

  export type EmpresaOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    ruc?: SortOrder
    plan?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmpresaCountOrderByAggregateInput
    _max?: EmpresaMaxOrderByAggregateInput
    _min?: EmpresaMinOrderByAggregateInput
  }

  export type EmpresaScalarWhereWithAggregatesInput = {
    AND?: EmpresaScalarWhereWithAggregatesInput | EmpresaScalarWhereWithAggregatesInput[]
    OR?: EmpresaScalarWhereWithAggregatesInput[]
    NOT?: EmpresaScalarWhereWithAggregatesInput | EmpresaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Empresa"> | string
    nombre?: StringWithAggregatesFilter<"Empresa"> | string
    ruc?: StringWithAggregatesFilter<"Empresa"> | string
    plan?: StringWithAggregatesFilter<"Empresa"> | string
    activo?: BoolWithAggregatesFilter<"Empresa"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Empresa"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Empresa"> | Date | string
  }

  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    nombre?: StringFilter<"Usuario"> | string
    empresaId?: StringFilter<"Usuario"> | string
    rolId?: StringFilter<"Usuario"> | string
    activo?: BoolFilter<"Usuario"> | boolean
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeFilter<"Usuario"> | Date | string
    empresa?: XOR<EmpresaRelationFilter, EmpresaWhereInput>
    rol?: XOR<RolRelationFilter, RolWhereInput>
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    nombre?: SortOrder
    empresaId?: SortOrder
    rolId?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    empresa?: EmpresaOrderByWithRelationInput
    rol?: RolOrderByWithRelationInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    nombre?: StringFilter<"Usuario"> | string
    empresaId?: StringFilter<"Usuario"> | string
    rolId?: StringFilter<"Usuario"> | string
    activo?: BoolFilter<"Usuario"> | boolean
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeFilter<"Usuario"> | Date | string
    empresa?: XOR<EmpresaRelationFilter, EmpresaWhereInput>
    rol?: XOR<RolRelationFilter, RolWhereInput>
  }, "id" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    nombre?: SortOrder
    empresaId?: SortOrder
    rolId?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    nombre?: StringWithAggregatesFilter<"Usuario"> | string
    empresaId?: StringWithAggregatesFilter<"Usuario"> | string
    rolId?: StringWithAggregatesFilter<"Usuario"> | string
    activo?: BoolWithAggregatesFilter<"Usuario"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
  }

  export type ModuloWhereInput = {
    AND?: ModuloWhereInput | ModuloWhereInput[]
    OR?: ModuloWhereInput[]
    NOT?: ModuloWhereInput | ModuloWhereInput[]
    id?: StringFilter<"Modulo"> | string
    nombre?: StringFilter<"Modulo"> | string
    displayName?: StringFilter<"Modulo"> | string
    version?: StringFilter<"Modulo"> | string
    activo?: BoolFilter<"Modulo"> | boolean
    dependencias?: StringNullableListFilter<"Modulo">
    createdAt?: DateTimeFilter<"Modulo"> | Date | string
    updatedAt?: DateTimeFilter<"Modulo"> | Date | string
    empresaModulos?: EmpresaModuloListRelationFilter
    moduloDependencias?: ModuloDependenciaListRelationFilter
    dependenciasDe?: ModuloDependenciaListRelationFilter
    modulosRutas?: ModuloRutaListRelationFilter
    moduloPermisos?: ModuloPermisoListRelationFilter
  }

  export type ModuloOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    displayName?: SortOrder
    version?: SortOrder
    activo?: SortOrder
    dependencias?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    empresaModulos?: EmpresaModuloOrderByRelationAggregateInput
    moduloDependencias?: ModuloDependenciaOrderByRelationAggregateInput
    dependenciasDe?: ModuloDependenciaOrderByRelationAggregateInput
    modulosRutas?: ModuloRutaOrderByRelationAggregateInput
    moduloPermisos?: ModuloPermisoOrderByRelationAggregateInput
  }

  export type ModuloWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nombre?: string
    AND?: ModuloWhereInput | ModuloWhereInput[]
    OR?: ModuloWhereInput[]
    NOT?: ModuloWhereInput | ModuloWhereInput[]
    displayName?: StringFilter<"Modulo"> | string
    version?: StringFilter<"Modulo"> | string
    activo?: BoolFilter<"Modulo"> | boolean
    dependencias?: StringNullableListFilter<"Modulo">
    createdAt?: DateTimeFilter<"Modulo"> | Date | string
    updatedAt?: DateTimeFilter<"Modulo"> | Date | string
    empresaModulos?: EmpresaModuloListRelationFilter
    moduloDependencias?: ModuloDependenciaListRelationFilter
    dependenciasDe?: ModuloDependenciaListRelationFilter
    modulosRutas?: ModuloRutaListRelationFilter
    moduloPermisos?: ModuloPermisoListRelationFilter
  }, "id" | "nombre">

  export type ModuloOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    displayName?: SortOrder
    version?: SortOrder
    activo?: SortOrder
    dependencias?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ModuloCountOrderByAggregateInput
    _max?: ModuloMaxOrderByAggregateInput
    _min?: ModuloMinOrderByAggregateInput
  }

  export type ModuloScalarWhereWithAggregatesInput = {
    AND?: ModuloScalarWhereWithAggregatesInput | ModuloScalarWhereWithAggregatesInput[]
    OR?: ModuloScalarWhereWithAggregatesInput[]
    NOT?: ModuloScalarWhereWithAggregatesInput | ModuloScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Modulo"> | string
    nombre?: StringWithAggregatesFilter<"Modulo"> | string
    displayName?: StringWithAggregatesFilter<"Modulo"> | string
    version?: StringWithAggregatesFilter<"Modulo"> | string
    activo?: BoolWithAggregatesFilter<"Modulo"> | boolean
    dependencias?: StringNullableListFilter<"Modulo">
    createdAt?: DateTimeWithAggregatesFilter<"Modulo"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Modulo"> | Date | string
  }

  export type EmpresaModuloWhereInput = {
    AND?: EmpresaModuloWhereInput | EmpresaModuloWhereInput[]
    OR?: EmpresaModuloWhereInput[]
    NOT?: EmpresaModuloWhereInput | EmpresaModuloWhereInput[]
    id?: StringFilter<"EmpresaModulo"> | string
    empresaId?: StringFilter<"EmpresaModulo"> | string
    moduloId?: StringFilter<"EmpresaModulo"> | string
    activo?: BoolFilter<"EmpresaModulo"> | boolean
    configuracion?: JsonNullableFilter<"EmpresaModulo">
    createdAt?: DateTimeFilter<"EmpresaModulo"> | Date | string
    updatedAt?: DateTimeFilter<"EmpresaModulo"> | Date | string
    empresa?: XOR<EmpresaRelationFilter, EmpresaWhereInput>
    modulo?: XOR<ModuloRelationFilter, ModuloWhereInput>
  }

  export type EmpresaModuloOrderByWithRelationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    moduloId?: SortOrder
    activo?: SortOrder
    configuracion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    empresa?: EmpresaOrderByWithRelationInput
    modulo?: ModuloOrderByWithRelationInput
  }

  export type EmpresaModuloWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    empresaId_moduloId?: EmpresaModuloEmpresaIdModuloIdCompoundUniqueInput
    AND?: EmpresaModuloWhereInput | EmpresaModuloWhereInput[]
    OR?: EmpresaModuloWhereInput[]
    NOT?: EmpresaModuloWhereInput | EmpresaModuloWhereInput[]
    empresaId?: StringFilter<"EmpresaModulo"> | string
    moduloId?: StringFilter<"EmpresaModulo"> | string
    activo?: BoolFilter<"EmpresaModulo"> | boolean
    configuracion?: JsonNullableFilter<"EmpresaModulo">
    createdAt?: DateTimeFilter<"EmpresaModulo"> | Date | string
    updatedAt?: DateTimeFilter<"EmpresaModulo"> | Date | string
    empresa?: XOR<EmpresaRelationFilter, EmpresaWhereInput>
    modulo?: XOR<ModuloRelationFilter, ModuloWhereInput>
  }, "id" | "empresaId_moduloId">

  export type EmpresaModuloOrderByWithAggregationInput = {
    id?: SortOrder
    empresaId?: SortOrder
    moduloId?: SortOrder
    activo?: SortOrder
    configuracion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmpresaModuloCountOrderByAggregateInput
    _max?: EmpresaModuloMaxOrderByAggregateInput
    _min?: EmpresaModuloMinOrderByAggregateInput
  }

  export type EmpresaModuloScalarWhereWithAggregatesInput = {
    AND?: EmpresaModuloScalarWhereWithAggregatesInput | EmpresaModuloScalarWhereWithAggregatesInput[]
    OR?: EmpresaModuloScalarWhereWithAggregatesInput[]
    NOT?: EmpresaModuloScalarWhereWithAggregatesInput | EmpresaModuloScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmpresaModulo"> | string
    empresaId?: StringWithAggregatesFilter<"EmpresaModulo"> | string
    moduloId?: StringWithAggregatesFilter<"EmpresaModulo"> | string
    activo?: BoolWithAggregatesFilter<"EmpresaModulo"> | boolean
    configuracion?: JsonNullableWithAggregatesFilter<"EmpresaModulo">
    createdAt?: DateTimeWithAggregatesFilter<"EmpresaModulo"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EmpresaModulo"> | Date | string
  }

  export type ModuloDependenciaWhereInput = {
    AND?: ModuloDependenciaWhereInput | ModuloDependenciaWhereInput[]
    OR?: ModuloDependenciaWhereInput[]
    NOT?: ModuloDependenciaWhereInput | ModuloDependenciaWhereInput[]
    id?: StringFilter<"ModuloDependencia"> | string
    moduloId?: StringFilter<"ModuloDependencia"> | string
    dependeDeId?: StringFilter<"ModuloDependencia"> | string
    requerido?: BoolFilter<"ModuloDependencia"> | boolean
    createdAt?: DateTimeFilter<"ModuloDependencia"> | Date | string
    modulo?: XOR<ModuloRelationFilter, ModuloWhereInput>
    dependeDe?: XOR<ModuloRelationFilter, ModuloWhereInput>
  }

  export type ModuloDependenciaOrderByWithRelationInput = {
    id?: SortOrder
    moduloId?: SortOrder
    dependeDeId?: SortOrder
    requerido?: SortOrder
    createdAt?: SortOrder
    modulo?: ModuloOrderByWithRelationInput
    dependeDe?: ModuloOrderByWithRelationInput
  }

  export type ModuloDependenciaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    moduloId_dependeDeId?: ModuloDependenciaModuloIdDependeDeIdCompoundUniqueInput
    AND?: ModuloDependenciaWhereInput | ModuloDependenciaWhereInput[]
    OR?: ModuloDependenciaWhereInput[]
    NOT?: ModuloDependenciaWhereInput | ModuloDependenciaWhereInput[]
    moduloId?: StringFilter<"ModuloDependencia"> | string
    dependeDeId?: StringFilter<"ModuloDependencia"> | string
    requerido?: BoolFilter<"ModuloDependencia"> | boolean
    createdAt?: DateTimeFilter<"ModuloDependencia"> | Date | string
    modulo?: XOR<ModuloRelationFilter, ModuloWhereInput>
    dependeDe?: XOR<ModuloRelationFilter, ModuloWhereInput>
  }, "id" | "moduloId_dependeDeId">

  export type ModuloDependenciaOrderByWithAggregationInput = {
    id?: SortOrder
    moduloId?: SortOrder
    dependeDeId?: SortOrder
    requerido?: SortOrder
    createdAt?: SortOrder
    _count?: ModuloDependenciaCountOrderByAggregateInput
    _max?: ModuloDependenciaMaxOrderByAggregateInput
    _min?: ModuloDependenciaMinOrderByAggregateInput
  }

  export type ModuloDependenciaScalarWhereWithAggregatesInput = {
    AND?: ModuloDependenciaScalarWhereWithAggregatesInput | ModuloDependenciaScalarWhereWithAggregatesInput[]
    OR?: ModuloDependenciaScalarWhereWithAggregatesInput[]
    NOT?: ModuloDependenciaScalarWhereWithAggregatesInput | ModuloDependenciaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ModuloDependencia"> | string
    moduloId?: StringWithAggregatesFilter<"ModuloDependencia"> | string
    dependeDeId?: StringWithAggregatesFilter<"ModuloDependencia"> | string
    requerido?: BoolWithAggregatesFilter<"ModuloDependencia"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ModuloDependencia"> | Date | string
  }

  export type RolWhereInput = {
    AND?: RolWhereInput | RolWhereInput[]
    OR?: RolWhereInput[]
    NOT?: RolWhereInput | RolWhereInput[]
    id?: StringFilter<"Rol"> | string
    nombre?: StringFilter<"Rol"> | string
    empresaId?: StringNullableFilter<"Rol"> | string | null
    activo?: BoolFilter<"Rol"> | boolean
    createdAt?: DateTimeFilter<"Rol"> | Date | string
    updatedAt?: DateTimeFilter<"Rol"> | Date | string
    usuarios?: UsuarioListRelationFilter
    rolPermisos?: RolPermisoListRelationFilter
  }

  export type RolOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    empresaId?: SortOrderInput | SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    usuarios?: UsuarioOrderByRelationAggregateInput
    rolPermisos?: RolPermisoOrderByRelationAggregateInput
  }

  export type RolWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RolWhereInput | RolWhereInput[]
    OR?: RolWhereInput[]
    NOT?: RolWhereInput | RolWhereInput[]
    nombre?: StringFilter<"Rol"> | string
    empresaId?: StringNullableFilter<"Rol"> | string | null
    activo?: BoolFilter<"Rol"> | boolean
    createdAt?: DateTimeFilter<"Rol"> | Date | string
    updatedAt?: DateTimeFilter<"Rol"> | Date | string
    usuarios?: UsuarioListRelationFilter
    rolPermisos?: RolPermisoListRelationFilter
  }, "id">

  export type RolOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    empresaId?: SortOrderInput | SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RolCountOrderByAggregateInput
    _max?: RolMaxOrderByAggregateInput
    _min?: RolMinOrderByAggregateInput
  }

  export type RolScalarWhereWithAggregatesInput = {
    AND?: RolScalarWhereWithAggregatesInput | RolScalarWhereWithAggregatesInput[]
    OR?: RolScalarWhereWithAggregatesInput[]
    NOT?: RolScalarWhereWithAggregatesInput | RolScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Rol"> | string
    nombre?: StringWithAggregatesFilter<"Rol"> | string
    empresaId?: StringNullableWithAggregatesFilter<"Rol"> | string | null
    activo?: BoolWithAggregatesFilter<"Rol"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Rol"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Rol"> | Date | string
  }

  export type ModuloPermisoWhereInput = {
    AND?: ModuloPermisoWhereInput | ModuloPermisoWhereInput[]
    OR?: ModuloPermisoWhereInput[]
    NOT?: ModuloPermisoWhereInput | ModuloPermisoWhereInput[]
    id?: StringFilter<"ModuloPermiso"> | string
    moduloId?: StringFilter<"ModuloPermiso"> | string
    nombre?: StringFilter<"ModuloPermiso"> | string
    accion?: StringFilter<"ModuloPermiso"> | string
    activo?: BoolFilter<"ModuloPermiso"> | boolean
    modulo?: XOR<ModuloRelationFilter, ModuloWhereInput>
    rolPermisos?: RolPermisoListRelationFilter
  }

  export type ModuloPermisoOrderByWithRelationInput = {
    id?: SortOrder
    moduloId?: SortOrder
    nombre?: SortOrder
    accion?: SortOrder
    activo?: SortOrder
    modulo?: ModuloOrderByWithRelationInput
    rolPermisos?: RolPermisoOrderByRelationAggregateInput
  }

  export type ModuloPermisoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    moduloId_nombre_accion?: ModuloPermisoModuloIdNombreAccionCompoundUniqueInput
    AND?: ModuloPermisoWhereInput | ModuloPermisoWhereInput[]
    OR?: ModuloPermisoWhereInput[]
    NOT?: ModuloPermisoWhereInput | ModuloPermisoWhereInput[]
    moduloId?: StringFilter<"ModuloPermiso"> | string
    nombre?: StringFilter<"ModuloPermiso"> | string
    accion?: StringFilter<"ModuloPermiso"> | string
    activo?: BoolFilter<"ModuloPermiso"> | boolean
    modulo?: XOR<ModuloRelationFilter, ModuloWhereInput>
    rolPermisos?: RolPermisoListRelationFilter
  }, "id" | "moduloId_nombre_accion">

  export type ModuloPermisoOrderByWithAggregationInput = {
    id?: SortOrder
    moduloId?: SortOrder
    nombre?: SortOrder
    accion?: SortOrder
    activo?: SortOrder
    _count?: ModuloPermisoCountOrderByAggregateInput
    _max?: ModuloPermisoMaxOrderByAggregateInput
    _min?: ModuloPermisoMinOrderByAggregateInput
  }

  export type ModuloPermisoScalarWhereWithAggregatesInput = {
    AND?: ModuloPermisoScalarWhereWithAggregatesInput | ModuloPermisoScalarWhereWithAggregatesInput[]
    OR?: ModuloPermisoScalarWhereWithAggregatesInput[]
    NOT?: ModuloPermisoScalarWhereWithAggregatesInput | ModuloPermisoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ModuloPermiso"> | string
    moduloId?: StringWithAggregatesFilter<"ModuloPermiso"> | string
    nombre?: StringWithAggregatesFilter<"ModuloPermiso"> | string
    accion?: StringWithAggregatesFilter<"ModuloPermiso"> | string
    activo?: BoolWithAggregatesFilter<"ModuloPermiso"> | boolean
  }

  export type RolPermisoWhereInput = {
    AND?: RolPermisoWhereInput | RolPermisoWhereInput[]
    OR?: RolPermisoWhereInput[]
    NOT?: RolPermisoWhereInput | RolPermisoWhereInput[]
    id?: StringFilter<"RolPermiso"> | string
    rolId?: StringFilter<"RolPermiso"> | string
    moduloPermisoId?: StringFilter<"RolPermiso"> | string
    activo?: BoolFilter<"RolPermiso"> | boolean
    rol?: XOR<RolRelationFilter, RolWhereInput>
    moduloPermiso?: XOR<ModuloPermisoRelationFilter, ModuloPermisoWhereInput>
  }

  export type RolPermisoOrderByWithRelationInput = {
    id?: SortOrder
    rolId?: SortOrder
    moduloPermisoId?: SortOrder
    activo?: SortOrder
    rol?: RolOrderByWithRelationInput
    moduloPermiso?: ModuloPermisoOrderByWithRelationInput
  }

  export type RolPermisoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    rolId_moduloPermisoId?: RolPermisoRolIdModuloPermisoIdCompoundUniqueInput
    AND?: RolPermisoWhereInput | RolPermisoWhereInput[]
    OR?: RolPermisoWhereInput[]
    NOT?: RolPermisoWhereInput | RolPermisoWhereInput[]
    rolId?: StringFilter<"RolPermiso"> | string
    moduloPermisoId?: StringFilter<"RolPermiso"> | string
    activo?: BoolFilter<"RolPermiso"> | boolean
    rol?: XOR<RolRelationFilter, RolWhereInput>
    moduloPermiso?: XOR<ModuloPermisoRelationFilter, ModuloPermisoWhereInput>
  }, "id" | "rolId_moduloPermisoId">

  export type RolPermisoOrderByWithAggregationInput = {
    id?: SortOrder
    rolId?: SortOrder
    moduloPermisoId?: SortOrder
    activo?: SortOrder
    _count?: RolPermisoCountOrderByAggregateInput
    _max?: RolPermisoMaxOrderByAggregateInput
    _min?: RolPermisoMinOrderByAggregateInput
  }

  export type RolPermisoScalarWhereWithAggregatesInput = {
    AND?: RolPermisoScalarWhereWithAggregatesInput | RolPermisoScalarWhereWithAggregatesInput[]
    OR?: RolPermisoScalarWhereWithAggregatesInput[]
    NOT?: RolPermisoScalarWhereWithAggregatesInput | RolPermisoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RolPermiso"> | string
    rolId?: StringWithAggregatesFilter<"RolPermiso"> | string
    moduloPermisoId?: StringWithAggregatesFilter<"RolPermiso"> | string
    activo?: BoolWithAggregatesFilter<"RolPermiso"> | boolean
  }

  export type ModuloRutaWhereInput = {
    AND?: ModuloRutaWhereInput | ModuloRutaWhereInput[]
    OR?: ModuloRutaWhereInput[]
    NOT?: ModuloRutaWhereInput | ModuloRutaWhereInput[]
    id?: StringFilter<"ModuloRuta"> | string
    moduloId?: StringFilter<"ModuloRuta"> | string
    empresaId?: StringNullableFilter<"ModuloRuta"> | string | null
    ruta?: StringFilter<"ModuloRuta"> | string
    metodo?: StringFilter<"ModuloRuta"> | string
    activo?: BoolFilter<"ModuloRuta"> | boolean
    createdAt?: DateTimeFilter<"ModuloRuta"> | Date | string
    updatedAt?: DateTimeFilter<"ModuloRuta"> | Date | string
    modulo?: XOR<ModuloRelationFilter, ModuloWhereInput>
    empresa?: XOR<EmpresaNullableRelationFilter, EmpresaWhereInput> | null
  }

  export type ModuloRutaOrderByWithRelationInput = {
    id?: SortOrder
    moduloId?: SortOrder
    empresaId?: SortOrderInput | SortOrder
    ruta?: SortOrder
    metodo?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    modulo?: ModuloOrderByWithRelationInput
    empresa?: EmpresaOrderByWithRelationInput
  }

  export type ModuloRutaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    moduloId_ruta_metodo?: ModuloRutaModuloIdRutaMetodoCompoundUniqueInput
    AND?: ModuloRutaWhereInput | ModuloRutaWhereInput[]
    OR?: ModuloRutaWhereInput[]
    NOT?: ModuloRutaWhereInput | ModuloRutaWhereInput[]
    moduloId?: StringFilter<"ModuloRuta"> | string
    empresaId?: StringNullableFilter<"ModuloRuta"> | string | null
    ruta?: StringFilter<"ModuloRuta"> | string
    metodo?: StringFilter<"ModuloRuta"> | string
    activo?: BoolFilter<"ModuloRuta"> | boolean
    createdAt?: DateTimeFilter<"ModuloRuta"> | Date | string
    updatedAt?: DateTimeFilter<"ModuloRuta"> | Date | string
    modulo?: XOR<ModuloRelationFilter, ModuloWhereInput>
    empresa?: XOR<EmpresaNullableRelationFilter, EmpresaWhereInput> | null
  }, "id" | "moduloId_ruta_metodo">

  export type ModuloRutaOrderByWithAggregationInput = {
    id?: SortOrder
    moduloId?: SortOrder
    empresaId?: SortOrderInput | SortOrder
    ruta?: SortOrder
    metodo?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ModuloRutaCountOrderByAggregateInput
    _max?: ModuloRutaMaxOrderByAggregateInput
    _min?: ModuloRutaMinOrderByAggregateInput
  }

  export type ModuloRutaScalarWhereWithAggregatesInput = {
    AND?: ModuloRutaScalarWhereWithAggregatesInput | ModuloRutaScalarWhereWithAggregatesInput[]
    OR?: ModuloRutaScalarWhereWithAggregatesInput[]
    NOT?: ModuloRutaScalarWhereWithAggregatesInput | ModuloRutaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ModuloRuta"> | string
    moduloId?: StringWithAggregatesFilter<"ModuloRuta"> | string
    empresaId?: StringNullableWithAggregatesFilter<"ModuloRuta"> | string | null
    ruta?: StringWithAggregatesFilter<"ModuloRuta"> | string
    metodo?: StringWithAggregatesFilter<"ModuloRuta"> | string
    activo?: BoolWithAggregatesFilter<"ModuloRuta"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ModuloRuta"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ModuloRuta"> | Date | string
  }

  export type EmpresaCreateInput = {
    id?: string
    nombre: string
    ruc: string
    plan?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    usuarios?: UsuarioCreateNestedManyWithoutEmpresaInput
    empresaModulos?: EmpresaModuloCreateNestedManyWithoutEmpresaInput
    modulosRutas?: ModuloRutaCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateInput = {
    id?: string
    nombre: string
    ruc: string
    plan?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutEmpresaInput
    empresaModulos?: EmpresaModuloUncheckedCreateNestedManyWithoutEmpresaInput
    modulosRutas?: ModuloRutaUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    ruc?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUpdateManyWithoutEmpresaNestedInput
    empresaModulos?: EmpresaModuloUpdateManyWithoutEmpresaNestedInput
    modulosRutas?: ModuloRutaUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    ruc?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUncheckedUpdateManyWithoutEmpresaNestedInput
    empresaModulos?: EmpresaModuloUncheckedUpdateManyWithoutEmpresaNestedInput
    modulosRutas?: ModuloRutaUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaCreateManyInput = {
    id?: string
    nombre: string
    ruc: string
    plan?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmpresaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    ruc?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmpresaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    ruc?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioCreateInput = {
    id?: string
    email: string
    nombre: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutUsuariosInput
    rol: RolCreateNestedOneWithoutUsuariosInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: string
    email: string
    nombre: string
    empresaId: string
    rolId: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsuarioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutUsuariosNestedInput
    rol?: RolUpdateOneRequiredWithoutUsuariosNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    rolId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioCreateManyInput = {
    id?: string
    email: string
    nombre: string
    empresaId: string
    rolId: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsuarioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    rolId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuloCreateInput = {
    id?: string
    nombre: string
    displayName: string
    version?: string
    activo?: boolean
    dependencias?: ModuloCreatedependenciasInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    empresaModulos?: EmpresaModuloCreateNestedManyWithoutModuloInput
    moduloDependencias?: ModuloDependenciaCreateNestedManyWithoutModuloInput
    dependenciasDe?: ModuloDependenciaCreateNestedManyWithoutDependeDeInput
    modulosRutas?: ModuloRutaCreateNestedManyWithoutModuloInput
    moduloPermisos?: ModuloPermisoCreateNestedManyWithoutModuloInput
  }

  export type ModuloUncheckedCreateInput = {
    id?: string
    nombre: string
    displayName: string
    version?: string
    activo?: boolean
    dependencias?: ModuloCreatedependenciasInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    empresaModulos?: EmpresaModuloUncheckedCreateNestedManyWithoutModuloInput
    moduloDependencias?: ModuloDependenciaUncheckedCreateNestedManyWithoutModuloInput
    dependenciasDe?: ModuloDependenciaUncheckedCreateNestedManyWithoutDependeDeInput
    modulosRutas?: ModuloRutaUncheckedCreateNestedManyWithoutModuloInput
    moduloPermisos?: ModuloPermisoUncheckedCreateNestedManyWithoutModuloInput
  }

  export type ModuloUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    dependencias?: ModuloUpdatedependenciasInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresaModulos?: EmpresaModuloUpdateManyWithoutModuloNestedInput
    moduloDependencias?: ModuloDependenciaUpdateManyWithoutModuloNestedInput
    dependenciasDe?: ModuloDependenciaUpdateManyWithoutDependeDeNestedInput
    modulosRutas?: ModuloRutaUpdateManyWithoutModuloNestedInput
    moduloPermisos?: ModuloPermisoUpdateManyWithoutModuloNestedInput
  }

  export type ModuloUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    dependencias?: ModuloUpdatedependenciasInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresaModulos?: EmpresaModuloUncheckedUpdateManyWithoutModuloNestedInput
    moduloDependencias?: ModuloDependenciaUncheckedUpdateManyWithoutModuloNestedInput
    dependenciasDe?: ModuloDependenciaUncheckedUpdateManyWithoutDependeDeNestedInput
    modulosRutas?: ModuloRutaUncheckedUpdateManyWithoutModuloNestedInput
    moduloPermisos?: ModuloPermisoUncheckedUpdateManyWithoutModuloNestedInput
  }

  export type ModuloCreateManyInput = {
    id?: string
    nombre: string
    displayName: string
    version?: string
    activo?: boolean
    dependencias?: ModuloCreatedependenciasInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModuloUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    dependencias?: ModuloUpdatedependenciasInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuloUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    dependencias?: ModuloUpdatedependenciasInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmpresaModuloCreateInput = {
    id?: string
    activo?: boolean
    configuracion?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutEmpresaModulosInput
    modulo: ModuloCreateNestedOneWithoutEmpresaModulosInput
  }

  export type EmpresaModuloUncheckedCreateInput = {
    id?: string
    empresaId: string
    moduloId: string
    activo?: boolean
    configuracion?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmpresaModuloUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    configuracion?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutEmpresaModulosNestedInput
    modulo?: ModuloUpdateOneRequiredWithoutEmpresaModulosNestedInput
  }

  export type EmpresaModuloUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    moduloId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    configuracion?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmpresaModuloCreateManyInput = {
    id?: string
    empresaId: string
    moduloId: string
    activo?: boolean
    configuracion?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmpresaModuloUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    configuracion?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmpresaModuloUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    moduloId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    configuracion?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuloDependenciaCreateInput = {
    id?: string
    requerido?: boolean
    createdAt?: Date | string
    modulo: ModuloCreateNestedOneWithoutModuloDependenciasInput
    dependeDe: ModuloCreateNestedOneWithoutDependenciasDeInput
  }

  export type ModuloDependenciaUncheckedCreateInput = {
    id?: string
    moduloId: string
    dependeDeId: string
    requerido?: boolean
    createdAt?: Date | string
  }

  export type ModuloDependenciaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requerido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modulo?: ModuloUpdateOneRequiredWithoutModuloDependenciasNestedInput
    dependeDe?: ModuloUpdateOneRequiredWithoutDependenciasDeNestedInput
  }

  export type ModuloDependenciaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    moduloId?: StringFieldUpdateOperationsInput | string
    dependeDeId?: StringFieldUpdateOperationsInput | string
    requerido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuloDependenciaCreateManyInput = {
    id?: string
    moduloId: string
    dependeDeId: string
    requerido?: boolean
    createdAt?: Date | string
  }

  export type ModuloDependenciaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    requerido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuloDependenciaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    moduloId?: StringFieldUpdateOperationsInput | string
    dependeDeId?: StringFieldUpdateOperationsInput | string
    requerido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolCreateInput = {
    id?: string
    nombre: string
    empresaId?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    usuarios?: UsuarioCreateNestedManyWithoutRolInput
    rolPermisos?: RolPermisoCreateNestedManyWithoutRolInput
  }

  export type RolUncheckedCreateInput = {
    id?: string
    nombre: string
    empresaId?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutRolInput
    rolPermisos?: RolPermisoUncheckedCreateNestedManyWithoutRolInput
  }

  export type RolUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    empresaId?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUpdateManyWithoutRolNestedInput
    rolPermisos?: RolPermisoUpdateManyWithoutRolNestedInput
  }

  export type RolUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    empresaId?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUncheckedUpdateManyWithoutRolNestedInput
    rolPermisos?: RolPermisoUncheckedUpdateManyWithoutRolNestedInput
  }

  export type RolCreateManyInput = {
    id?: string
    nombre: string
    empresaId?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RolUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    empresaId?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    empresaId?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuloPermisoCreateInput = {
    id?: string
    nombre: string
    accion: string
    activo?: boolean
    modulo: ModuloCreateNestedOneWithoutModuloPermisosInput
    rolPermisos?: RolPermisoCreateNestedManyWithoutModuloPermisoInput
  }

  export type ModuloPermisoUncheckedCreateInput = {
    id?: string
    moduloId: string
    nombre: string
    accion: string
    activo?: boolean
    rolPermisos?: RolPermisoUncheckedCreateNestedManyWithoutModuloPermisoInput
  }

  export type ModuloPermisoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    accion?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    modulo?: ModuloUpdateOneRequiredWithoutModuloPermisosNestedInput
    rolPermisos?: RolPermisoUpdateManyWithoutModuloPermisoNestedInput
  }

  export type ModuloPermisoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    moduloId?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    accion?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    rolPermisos?: RolPermisoUncheckedUpdateManyWithoutModuloPermisoNestedInput
  }

  export type ModuloPermisoCreateManyInput = {
    id?: string
    moduloId: string
    nombre: string
    accion: string
    activo?: boolean
  }

  export type ModuloPermisoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    accion?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ModuloPermisoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    moduloId?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    accion?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RolPermisoCreateInput = {
    id?: string
    activo?: boolean
    rol: RolCreateNestedOneWithoutRolPermisosInput
    moduloPermiso: ModuloPermisoCreateNestedOneWithoutRolPermisosInput
  }

  export type RolPermisoUncheckedCreateInput = {
    id?: string
    rolId: string
    moduloPermisoId: string
    activo?: boolean
  }

  export type RolPermisoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    rol?: RolUpdateOneRequiredWithoutRolPermisosNestedInput
    moduloPermiso?: ModuloPermisoUpdateOneRequiredWithoutRolPermisosNestedInput
  }

  export type RolPermisoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rolId?: StringFieldUpdateOperationsInput | string
    moduloPermisoId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RolPermisoCreateManyInput = {
    id?: string
    rolId: string
    moduloPermisoId: string
    activo?: boolean
  }

  export type RolPermisoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RolPermisoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rolId?: StringFieldUpdateOperationsInput | string
    moduloPermisoId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ModuloRutaCreateInput = {
    id?: string
    ruta: string
    metodo?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    modulo: ModuloCreateNestedOneWithoutModulosRutasInput
    empresa?: EmpresaCreateNestedOneWithoutModulosRutasInput
  }

  export type ModuloRutaUncheckedCreateInput = {
    id?: string
    moduloId: string
    empresaId?: string | null
    ruta: string
    metodo?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModuloRutaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruta?: StringFieldUpdateOperationsInput | string
    metodo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modulo?: ModuloUpdateOneRequiredWithoutModulosRutasNestedInput
    empresa?: EmpresaUpdateOneWithoutModulosRutasNestedInput
  }

  export type ModuloRutaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    moduloId?: StringFieldUpdateOperationsInput | string
    empresaId?: NullableStringFieldUpdateOperationsInput | string | null
    ruta?: StringFieldUpdateOperationsInput | string
    metodo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuloRutaCreateManyInput = {
    id?: string
    moduloId: string
    empresaId?: string | null
    ruta: string
    metodo?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModuloRutaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruta?: StringFieldUpdateOperationsInput | string
    metodo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuloRutaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    moduloId?: StringFieldUpdateOperationsInput | string
    empresaId?: NullableStringFieldUpdateOperationsInput | string | null
    ruta?: StringFieldUpdateOperationsInput | string
    metodo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UsuarioListRelationFilter = {
    every?: UsuarioWhereInput
    some?: UsuarioWhereInput
    none?: UsuarioWhereInput
  }

  export type EmpresaModuloListRelationFilter = {
    every?: EmpresaModuloWhereInput
    some?: EmpresaModuloWhereInput
    none?: EmpresaModuloWhereInput
  }

  export type ModuloRutaListRelationFilter = {
    every?: ModuloRutaWhereInput
    some?: ModuloRutaWhereInput
    none?: ModuloRutaWhereInput
  }

  export type UsuarioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmpresaModuloOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ModuloRutaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmpresaCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    ruc?: SortOrder
    plan?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmpresaMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    ruc?: SortOrder
    plan?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmpresaMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    ruc?: SortOrder
    plan?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EmpresaRelationFilter = {
    is?: EmpresaWhereInput
    isNot?: EmpresaWhereInput
  }

  export type RolRelationFilter = {
    is?: RolWhereInput
    isNot?: RolWhereInput
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nombre?: SortOrder
    empresaId?: SortOrder
    rolId?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nombre?: SortOrder
    empresaId?: SortOrder
    rolId?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nombre?: SortOrder
    empresaId?: SortOrder
    rolId?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ModuloDependenciaListRelationFilter = {
    every?: ModuloDependenciaWhereInput
    some?: ModuloDependenciaWhereInput
    none?: ModuloDependenciaWhereInput
  }

  export type ModuloPermisoListRelationFilter = {
    every?: ModuloPermisoWhereInput
    some?: ModuloPermisoWhereInput
    none?: ModuloPermisoWhereInput
  }

  export type ModuloDependenciaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ModuloPermisoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ModuloCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    displayName?: SortOrder
    version?: SortOrder
    activo?: SortOrder
    dependencias?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ModuloMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    displayName?: SortOrder
    version?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ModuloMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    displayName?: SortOrder
    version?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ModuloRelationFilter = {
    is?: ModuloWhereInput
    isNot?: ModuloWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EmpresaModuloEmpresaIdModuloIdCompoundUniqueInput = {
    empresaId: string
    moduloId: string
  }

  export type EmpresaModuloCountOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    moduloId?: SortOrder
    activo?: SortOrder
    configuracion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmpresaModuloMaxOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    moduloId?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmpresaModuloMinOrderByAggregateInput = {
    id?: SortOrder
    empresaId?: SortOrder
    moduloId?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type ModuloDependenciaModuloIdDependeDeIdCompoundUniqueInput = {
    moduloId: string
    dependeDeId: string
  }

  export type ModuloDependenciaCountOrderByAggregateInput = {
    id?: SortOrder
    moduloId?: SortOrder
    dependeDeId?: SortOrder
    requerido?: SortOrder
    createdAt?: SortOrder
  }

  export type ModuloDependenciaMaxOrderByAggregateInput = {
    id?: SortOrder
    moduloId?: SortOrder
    dependeDeId?: SortOrder
    requerido?: SortOrder
    createdAt?: SortOrder
  }

  export type ModuloDependenciaMinOrderByAggregateInput = {
    id?: SortOrder
    moduloId?: SortOrder
    dependeDeId?: SortOrder
    requerido?: SortOrder
    createdAt?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type RolPermisoListRelationFilter = {
    every?: RolPermisoWhereInput
    some?: RolPermisoWhereInput
    none?: RolPermisoWhereInput
  }

  export type RolPermisoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RolCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    empresaId?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RolMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    empresaId?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RolMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    empresaId?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ModuloPermisoModuloIdNombreAccionCompoundUniqueInput = {
    moduloId: string
    nombre: string
    accion: string
  }

  export type ModuloPermisoCountOrderByAggregateInput = {
    id?: SortOrder
    moduloId?: SortOrder
    nombre?: SortOrder
    accion?: SortOrder
    activo?: SortOrder
  }

  export type ModuloPermisoMaxOrderByAggregateInput = {
    id?: SortOrder
    moduloId?: SortOrder
    nombre?: SortOrder
    accion?: SortOrder
    activo?: SortOrder
  }

  export type ModuloPermisoMinOrderByAggregateInput = {
    id?: SortOrder
    moduloId?: SortOrder
    nombre?: SortOrder
    accion?: SortOrder
    activo?: SortOrder
  }

  export type ModuloPermisoRelationFilter = {
    is?: ModuloPermisoWhereInput
    isNot?: ModuloPermisoWhereInput
  }

  export type RolPermisoRolIdModuloPermisoIdCompoundUniqueInput = {
    rolId: string
    moduloPermisoId: string
  }

  export type RolPermisoCountOrderByAggregateInput = {
    id?: SortOrder
    rolId?: SortOrder
    moduloPermisoId?: SortOrder
    activo?: SortOrder
  }

  export type RolPermisoMaxOrderByAggregateInput = {
    id?: SortOrder
    rolId?: SortOrder
    moduloPermisoId?: SortOrder
    activo?: SortOrder
  }

  export type RolPermisoMinOrderByAggregateInput = {
    id?: SortOrder
    rolId?: SortOrder
    moduloPermisoId?: SortOrder
    activo?: SortOrder
  }

  export type EmpresaNullableRelationFilter = {
    is?: EmpresaWhereInput | null
    isNot?: EmpresaWhereInput | null
  }

  export type ModuloRutaModuloIdRutaMetodoCompoundUniqueInput = {
    moduloId: string
    ruta: string
    metodo: string
  }

  export type ModuloRutaCountOrderByAggregateInput = {
    id?: SortOrder
    moduloId?: SortOrder
    empresaId?: SortOrder
    ruta?: SortOrder
    metodo?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ModuloRutaMaxOrderByAggregateInput = {
    id?: SortOrder
    moduloId?: SortOrder
    empresaId?: SortOrder
    ruta?: SortOrder
    metodo?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ModuloRutaMinOrderByAggregateInput = {
    id?: SortOrder
    moduloId?: SortOrder
    empresaId?: SortOrder
    ruta?: SortOrder
    metodo?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsuarioCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<UsuarioCreateWithoutEmpresaInput, UsuarioUncheckedCreateWithoutEmpresaInput> | UsuarioCreateWithoutEmpresaInput[] | UsuarioUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutEmpresaInput | UsuarioCreateOrConnectWithoutEmpresaInput[]
    createMany?: UsuarioCreateManyEmpresaInputEnvelope
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
  }

  export type EmpresaModuloCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<EmpresaModuloCreateWithoutEmpresaInput, EmpresaModuloUncheckedCreateWithoutEmpresaInput> | EmpresaModuloCreateWithoutEmpresaInput[] | EmpresaModuloUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: EmpresaModuloCreateOrConnectWithoutEmpresaInput | EmpresaModuloCreateOrConnectWithoutEmpresaInput[]
    createMany?: EmpresaModuloCreateManyEmpresaInputEnvelope
    connect?: EmpresaModuloWhereUniqueInput | EmpresaModuloWhereUniqueInput[]
  }

  export type ModuloRutaCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<ModuloRutaCreateWithoutEmpresaInput, ModuloRutaUncheckedCreateWithoutEmpresaInput> | ModuloRutaCreateWithoutEmpresaInput[] | ModuloRutaUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ModuloRutaCreateOrConnectWithoutEmpresaInput | ModuloRutaCreateOrConnectWithoutEmpresaInput[]
    createMany?: ModuloRutaCreateManyEmpresaInputEnvelope
    connect?: ModuloRutaWhereUniqueInput | ModuloRutaWhereUniqueInput[]
  }

  export type UsuarioUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<UsuarioCreateWithoutEmpresaInput, UsuarioUncheckedCreateWithoutEmpresaInput> | UsuarioCreateWithoutEmpresaInput[] | UsuarioUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutEmpresaInput | UsuarioCreateOrConnectWithoutEmpresaInput[]
    createMany?: UsuarioCreateManyEmpresaInputEnvelope
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
  }

  export type EmpresaModuloUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<EmpresaModuloCreateWithoutEmpresaInput, EmpresaModuloUncheckedCreateWithoutEmpresaInput> | EmpresaModuloCreateWithoutEmpresaInput[] | EmpresaModuloUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: EmpresaModuloCreateOrConnectWithoutEmpresaInput | EmpresaModuloCreateOrConnectWithoutEmpresaInput[]
    createMany?: EmpresaModuloCreateManyEmpresaInputEnvelope
    connect?: EmpresaModuloWhereUniqueInput | EmpresaModuloWhereUniqueInput[]
  }

  export type ModuloRutaUncheckedCreateNestedManyWithoutEmpresaInput = {
    create?: XOR<ModuloRutaCreateWithoutEmpresaInput, ModuloRutaUncheckedCreateWithoutEmpresaInput> | ModuloRutaCreateWithoutEmpresaInput[] | ModuloRutaUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ModuloRutaCreateOrConnectWithoutEmpresaInput | ModuloRutaCreateOrConnectWithoutEmpresaInput[]
    createMany?: ModuloRutaCreateManyEmpresaInputEnvelope
    connect?: ModuloRutaWhereUniqueInput | ModuloRutaWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UsuarioUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<UsuarioCreateWithoutEmpresaInput, UsuarioUncheckedCreateWithoutEmpresaInput> | UsuarioCreateWithoutEmpresaInput[] | UsuarioUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutEmpresaInput | UsuarioCreateOrConnectWithoutEmpresaInput[]
    upsert?: UsuarioUpsertWithWhereUniqueWithoutEmpresaInput | UsuarioUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: UsuarioCreateManyEmpresaInputEnvelope
    set?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    disconnect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    delete?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    update?: UsuarioUpdateWithWhereUniqueWithoutEmpresaInput | UsuarioUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: UsuarioUpdateManyWithWhereWithoutEmpresaInput | UsuarioUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
  }

  export type EmpresaModuloUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<EmpresaModuloCreateWithoutEmpresaInput, EmpresaModuloUncheckedCreateWithoutEmpresaInput> | EmpresaModuloCreateWithoutEmpresaInput[] | EmpresaModuloUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: EmpresaModuloCreateOrConnectWithoutEmpresaInput | EmpresaModuloCreateOrConnectWithoutEmpresaInput[]
    upsert?: EmpresaModuloUpsertWithWhereUniqueWithoutEmpresaInput | EmpresaModuloUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: EmpresaModuloCreateManyEmpresaInputEnvelope
    set?: EmpresaModuloWhereUniqueInput | EmpresaModuloWhereUniqueInput[]
    disconnect?: EmpresaModuloWhereUniqueInput | EmpresaModuloWhereUniqueInput[]
    delete?: EmpresaModuloWhereUniqueInput | EmpresaModuloWhereUniqueInput[]
    connect?: EmpresaModuloWhereUniqueInput | EmpresaModuloWhereUniqueInput[]
    update?: EmpresaModuloUpdateWithWhereUniqueWithoutEmpresaInput | EmpresaModuloUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: EmpresaModuloUpdateManyWithWhereWithoutEmpresaInput | EmpresaModuloUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: EmpresaModuloScalarWhereInput | EmpresaModuloScalarWhereInput[]
  }

  export type ModuloRutaUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<ModuloRutaCreateWithoutEmpresaInput, ModuloRutaUncheckedCreateWithoutEmpresaInput> | ModuloRutaCreateWithoutEmpresaInput[] | ModuloRutaUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ModuloRutaCreateOrConnectWithoutEmpresaInput | ModuloRutaCreateOrConnectWithoutEmpresaInput[]
    upsert?: ModuloRutaUpsertWithWhereUniqueWithoutEmpresaInput | ModuloRutaUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: ModuloRutaCreateManyEmpresaInputEnvelope
    set?: ModuloRutaWhereUniqueInput | ModuloRutaWhereUniqueInput[]
    disconnect?: ModuloRutaWhereUniqueInput | ModuloRutaWhereUniqueInput[]
    delete?: ModuloRutaWhereUniqueInput | ModuloRutaWhereUniqueInput[]
    connect?: ModuloRutaWhereUniqueInput | ModuloRutaWhereUniqueInput[]
    update?: ModuloRutaUpdateWithWhereUniqueWithoutEmpresaInput | ModuloRutaUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: ModuloRutaUpdateManyWithWhereWithoutEmpresaInput | ModuloRutaUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: ModuloRutaScalarWhereInput | ModuloRutaScalarWhereInput[]
  }

  export type UsuarioUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<UsuarioCreateWithoutEmpresaInput, UsuarioUncheckedCreateWithoutEmpresaInput> | UsuarioCreateWithoutEmpresaInput[] | UsuarioUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutEmpresaInput | UsuarioCreateOrConnectWithoutEmpresaInput[]
    upsert?: UsuarioUpsertWithWhereUniqueWithoutEmpresaInput | UsuarioUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: UsuarioCreateManyEmpresaInputEnvelope
    set?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    disconnect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    delete?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    update?: UsuarioUpdateWithWhereUniqueWithoutEmpresaInput | UsuarioUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: UsuarioUpdateManyWithWhereWithoutEmpresaInput | UsuarioUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
  }

  export type EmpresaModuloUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<EmpresaModuloCreateWithoutEmpresaInput, EmpresaModuloUncheckedCreateWithoutEmpresaInput> | EmpresaModuloCreateWithoutEmpresaInput[] | EmpresaModuloUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: EmpresaModuloCreateOrConnectWithoutEmpresaInput | EmpresaModuloCreateOrConnectWithoutEmpresaInput[]
    upsert?: EmpresaModuloUpsertWithWhereUniqueWithoutEmpresaInput | EmpresaModuloUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: EmpresaModuloCreateManyEmpresaInputEnvelope
    set?: EmpresaModuloWhereUniqueInput | EmpresaModuloWhereUniqueInput[]
    disconnect?: EmpresaModuloWhereUniqueInput | EmpresaModuloWhereUniqueInput[]
    delete?: EmpresaModuloWhereUniqueInput | EmpresaModuloWhereUniqueInput[]
    connect?: EmpresaModuloWhereUniqueInput | EmpresaModuloWhereUniqueInput[]
    update?: EmpresaModuloUpdateWithWhereUniqueWithoutEmpresaInput | EmpresaModuloUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: EmpresaModuloUpdateManyWithWhereWithoutEmpresaInput | EmpresaModuloUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: EmpresaModuloScalarWhereInput | EmpresaModuloScalarWhereInput[]
  }

  export type ModuloRutaUncheckedUpdateManyWithoutEmpresaNestedInput = {
    create?: XOR<ModuloRutaCreateWithoutEmpresaInput, ModuloRutaUncheckedCreateWithoutEmpresaInput> | ModuloRutaCreateWithoutEmpresaInput[] | ModuloRutaUncheckedCreateWithoutEmpresaInput[]
    connectOrCreate?: ModuloRutaCreateOrConnectWithoutEmpresaInput | ModuloRutaCreateOrConnectWithoutEmpresaInput[]
    upsert?: ModuloRutaUpsertWithWhereUniqueWithoutEmpresaInput | ModuloRutaUpsertWithWhereUniqueWithoutEmpresaInput[]
    createMany?: ModuloRutaCreateManyEmpresaInputEnvelope
    set?: ModuloRutaWhereUniqueInput | ModuloRutaWhereUniqueInput[]
    disconnect?: ModuloRutaWhereUniqueInput | ModuloRutaWhereUniqueInput[]
    delete?: ModuloRutaWhereUniqueInput | ModuloRutaWhereUniqueInput[]
    connect?: ModuloRutaWhereUniqueInput | ModuloRutaWhereUniqueInput[]
    update?: ModuloRutaUpdateWithWhereUniqueWithoutEmpresaInput | ModuloRutaUpdateWithWhereUniqueWithoutEmpresaInput[]
    updateMany?: ModuloRutaUpdateManyWithWhereWithoutEmpresaInput | ModuloRutaUpdateManyWithWhereWithoutEmpresaInput[]
    deleteMany?: ModuloRutaScalarWhereInput | ModuloRutaScalarWhereInput[]
  }

  export type EmpresaCreateNestedOneWithoutUsuariosInput = {
    create?: XOR<EmpresaCreateWithoutUsuariosInput, EmpresaUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutUsuariosInput
    connect?: EmpresaWhereUniqueInput
  }

  export type RolCreateNestedOneWithoutUsuariosInput = {
    create?: XOR<RolCreateWithoutUsuariosInput, RolUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: RolCreateOrConnectWithoutUsuariosInput
    connect?: RolWhereUniqueInput
  }

  export type EmpresaUpdateOneRequiredWithoutUsuariosNestedInput = {
    create?: XOR<EmpresaCreateWithoutUsuariosInput, EmpresaUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutUsuariosInput
    upsert?: EmpresaUpsertWithoutUsuariosInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutUsuariosInput, EmpresaUpdateWithoutUsuariosInput>, EmpresaUncheckedUpdateWithoutUsuariosInput>
  }

  export type RolUpdateOneRequiredWithoutUsuariosNestedInput = {
    create?: XOR<RolCreateWithoutUsuariosInput, RolUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: RolCreateOrConnectWithoutUsuariosInput
    upsert?: RolUpsertWithoutUsuariosInput
    connect?: RolWhereUniqueInput
    update?: XOR<XOR<RolUpdateToOneWithWhereWithoutUsuariosInput, RolUpdateWithoutUsuariosInput>, RolUncheckedUpdateWithoutUsuariosInput>
  }

  export type ModuloCreatedependenciasInput = {
    set: string[]
  }

  export type EmpresaModuloCreateNestedManyWithoutModuloInput = {
    create?: XOR<EmpresaModuloCreateWithoutModuloInput, EmpresaModuloUncheckedCreateWithoutModuloInput> | EmpresaModuloCreateWithoutModuloInput[] | EmpresaModuloUncheckedCreateWithoutModuloInput[]
    connectOrCreate?: EmpresaModuloCreateOrConnectWithoutModuloInput | EmpresaModuloCreateOrConnectWithoutModuloInput[]
    createMany?: EmpresaModuloCreateManyModuloInputEnvelope
    connect?: EmpresaModuloWhereUniqueInput | EmpresaModuloWhereUniqueInput[]
  }

  export type ModuloDependenciaCreateNestedManyWithoutModuloInput = {
    create?: XOR<ModuloDependenciaCreateWithoutModuloInput, ModuloDependenciaUncheckedCreateWithoutModuloInput> | ModuloDependenciaCreateWithoutModuloInput[] | ModuloDependenciaUncheckedCreateWithoutModuloInput[]
    connectOrCreate?: ModuloDependenciaCreateOrConnectWithoutModuloInput | ModuloDependenciaCreateOrConnectWithoutModuloInput[]
    createMany?: ModuloDependenciaCreateManyModuloInputEnvelope
    connect?: ModuloDependenciaWhereUniqueInput | ModuloDependenciaWhereUniqueInput[]
  }

  export type ModuloDependenciaCreateNestedManyWithoutDependeDeInput = {
    create?: XOR<ModuloDependenciaCreateWithoutDependeDeInput, ModuloDependenciaUncheckedCreateWithoutDependeDeInput> | ModuloDependenciaCreateWithoutDependeDeInput[] | ModuloDependenciaUncheckedCreateWithoutDependeDeInput[]
    connectOrCreate?: ModuloDependenciaCreateOrConnectWithoutDependeDeInput | ModuloDependenciaCreateOrConnectWithoutDependeDeInput[]
    createMany?: ModuloDependenciaCreateManyDependeDeInputEnvelope
    connect?: ModuloDependenciaWhereUniqueInput | ModuloDependenciaWhereUniqueInput[]
  }

  export type ModuloRutaCreateNestedManyWithoutModuloInput = {
    create?: XOR<ModuloRutaCreateWithoutModuloInput, ModuloRutaUncheckedCreateWithoutModuloInput> | ModuloRutaCreateWithoutModuloInput[] | ModuloRutaUncheckedCreateWithoutModuloInput[]
    connectOrCreate?: ModuloRutaCreateOrConnectWithoutModuloInput | ModuloRutaCreateOrConnectWithoutModuloInput[]
    createMany?: ModuloRutaCreateManyModuloInputEnvelope
    connect?: ModuloRutaWhereUniqueInput | ModuloRutaWhereUniqueInput[]
  }

  export type ModuloPermisoCreateNestedManyWithoutModuloInput = {
    create?: XOR<ModuloPermisoCreateWithoutModuloInput, ModuloPermisoUncheckedCreateWithoutModuloInput> | ModuloPermisoCreateWithoutModuloInput[] | ModuloPermisoUncheckedCreateWithoutModuloInput[]
    connectOrCreate?: ModuloPermisoCreateOrConnectWithoutModuloInput | ModuloPermisoCreateOrConnectWithoutModuloInput[]
    createMany?: ModuloPermisoCreateManyModuloInputEnvelope
    connect?: ModuloPermisoWhereUniqueInput | ModuloPermisoWhereUniqueInput[]
  }

  export type EmpresaModuloUncheckedCreateNestedManyWithoutModuloInput = {
    create?: XOR<EmpresaModuloCreateWithoutModuloInput, EmpresaModuloUncheckedCreateWithoutModuloInput> | EmpresaModuloCreateWithoutModuloInput[] | EmpresaModuloUncheckedCreateWithoutModuloInput[]
    connectOrCreate?: EmpresaModuloCreateOrConnectWithoutModuloInput | EmpresaModuloCreateOrConnectWithoutModuloInput[]
    createMany?: EmpresaModuloCreateManyModuloInputEnvelope
    connect?: EmpresaModuloWhereUniqueInput | EmpresaModuloWhereUniqueInput[]
  }

  export type ModuloDependenciaUncheckedCreateNestedManyWithoutModuloInput = {
    create?: XOR<ModuloDependenciaCreateWithoutModuloInput, ModuloDependenciaUncheckedCreateWithoutModuloInput> | ModuloDependenciaCreateWithoutModuloInput[] | ModuloDependenciaUncheckedCreateWithoutModuloInput[]
    connectOrCreate?: ModuloDependenciaCreateOrConnectWithoutModuloInput | ModuloDependenciaCreateOrConnectWithoutModuloInput[]
    createMany?: ModuloDependenciaCreateManyModuloInputEnvelope
    connect?: ModuloDependenciaWhereUniqueInput | ModuloDependenciaWhereUniqueInput[]
  }

  export type ModuloDependenciaUncheckedCreateNestedManyWithoutDependeDeInput = {
    create?: XOR<ModuloDependenciaCreateWithoutDependeDeInput, ModuloDependenciaUncheckedCreateWithoutDependeDeInput> | ModuloDependenciaCreateWithoutDependeDeInput[] | ModuloDependenciaUncheckedCreateWithoutDependeDeInput[]
    connectOrCreate?: ModuloDependenciaCreateOrConnectWithoutDependeDeInput | ModuloDependenciaCreateOrConnectWithoutDependeDeInput[]
    createMany?: ModuloDependenciaCreateManyDependeDeInputEnvelope
    connect?: ModuloDependenciaWhereUniqueInput | ModuloDependenciaWhereUniqueInput[]
  }

  export type ModuloRutaUncheckedCreateNestedManyWithoutModuloInput = {
    create?: XOR<ModuloRutaCreateWithoutModuloInput, ModuloRutaUncheckedCreateWithoutModuloInput> | ModuloRutaCreateWithoutModuloInput[] | ModuloRutaUncheckedCreateWithoutModuloInput[]
    connectOrCreate?: ModuloRutaCreateOrConnectWithoutModuloInput | ModuloRutaCreateOrConnectWithoutModuloInput[]
    createMany?: ModuloRutaCreateManyModuloInputEnvelope
    connect?: ModuloRutaWhereUniqueInput | ModuloRutaWhereUniqueInput[]
  }

  export type ModuloPermisoUncheckedCreateNestedManyWithoutModuloInput = {
    create?: XOR<ModuloPermisoCreateWithoutModuloInput, ModuloPermisoUncheckedCreateWithoutModuloInput> | ModuloPermisoCreateWithoutModuloInput[] | ModuloPermisoUncheckedCreateWithoutModuloInput[]
    connectOrCreate?: ModuloPermisoCreateOrConnectWithoutModuloInput | ModuloPermisoCreateOrConnectWithoutModuloInput[]
    createMany?: ModuloPermisoCreateManyModuloInputEnvelope
    connect?: ModuloPermisoWhereUniqueInput | ModuloPermisoWhereUniqueInput[]
  }

  export type ModuloUpdatedependenciasInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EmpresaModuloUpdateManyWithoutModuloNestedInput = {
    create?: XOR<EmpresaModuloCreateWithoutModuloInput, EmpresaModuloUncheckedCreateWithoutModuloInput> | EmpresaModuloCreateWithoutModuloInput[] | EmpresaModuloUncheckedCreateWithoutModuloInput[]
    connectOrCreate?: EmpresaModuloCreateOrConnectWithoutModuloInput | EmpresaModuloCreateOrConnectWithoutModuloInput[]
    upsert?: EmpresaModuloUpsertWithWhereUniqueWithoutModuloInput | EmpresaModuloUpsertWithWhereUniqueWithoutModuloInput[]
    createMany?: EmpresaModuloCreateManyModuloInputEnvelope
    set?: EmpresaModuloWhereUniqueInput | EmpresaModuloWhereUniqueInput[]
    disconnect?: EmpresaModuloWhereUniqueInput | EmpresaModuloWhereUniqueInput[]
    delete?: EmpresaModuloWhereUniqueInput | EmpresaModuloWhereUniqueInput[]
    connect?: EmpresaModuloWhereUniqueInput | EmpresaModuloWhereUniqueInput[]
    update?: EmpresaModuloUpdateWithWhereUniqueWithoutModuloInput | EmpresaModuloUpdateWithWhereUniqueWithoutModuloInput[]
    updateMany?: EmpresaModuloUpdateManyWithWhereWithoutModuloInput | EmpresaModuloUpdateManyWithWhereWithoutModuloInput[]
    deleteMany?: EmpresaModuloScalarWhereInput | EmpresaModuloScalarWhereInput[]
  }

  export type ModuloDependenciaUpdateManyWithoutModuloNestedInput = {
    create?: XOR<ModuloDependenciaCreateWithoutModuloInput, ModuloDependenciaUncheckedCreateWithoutModuloInput> | ModuloDependenciaCreateWithoutModuloInput[] | ModuloDependenciaUncheckedCreateWithoutModuloInput[]
    connectOrCreate?: ModuloDependenciaCreateOrConnectWithoutModuloInput | ModuloDependenciaCreateOrConnectWithoutModuloInput[]
    upsert?: ModuloDependenciaUpsertWithWhereUniqueWithoutModuloInput | ModuloDependenciaUpsertWithWhereUniqueWithoutModuloInput[]
    createMany?: ModuloDependenciaCreateManyModuloInputEnvelope
    set?: ModuloDependenciaWhereUniqueInput | ModuloDependenciaWhereUniqueInput[]
    disconnect?: ModuloDependenciaWhereUniqueInput | ModuloDependenciaWhereUniqueInput[]
    delete?: ModuloDependenciaWhereUniqueInput | ModuloDependenciaWhereUniqueInput[]
    connect?: ModuloDependenciaWhereUniqueInput | ModuloDependenciaWhereUniqueInput[]
    update?: ModuloDependenciaUpdateWithWhereUniqueWithoutModuloInput | ModuloDependenciaUpdateWithWhereUniqueWithoutModuloInput[]
    updateMany?: ModuloDependenciaUpdateManyWithWhereWithoutModuloInput | ModuloDependenciaUpdateManyWithWhereWithoutModuloInput[]
    deleteMany?: ModuloDependenciaScalarWhereInput | ModuloDependenciaScalarWhereInput[]
  }

  export type ModuloDependenciaUpdateManyWithoutDependeDeNestedInput = {
    create?: XOR<ModuloDependenciaCreateWithoutDependeDeInput, ModuloDependenciaUncheckedCreateWithoutDependeDeInput> | ModuloDependenciaCreateWithoutDependeDeInput[] | ModuloDependenciaUncheckedCreateWithoutDependeDeInput[]
    connectOrCreate?: ModuloDependenciaCreateOrConnectWithoutDependeDeInput | ModuloDependenciaCreateOrConnectWithoutDependeDeInput[]
    upsert?: ModuloDependenciaUpsertWithWhereUniqueWithoutDependeDeInput | ModuloDependenciaUpsertWithWhereUniqueWithoutDependeDeInput[]
    createMany?: ModuloDependenciaCreateManyDependeDeInputEnvelope
    set?: ModuloDependenciaWhereUniqueInput | ModuloDependenciaWhereUniqueInput[]
    disconnect?: ModuloDependenciaWhereUniqueInput | ModuloDependenciaWhereUniqueInput[]
    delete?: ModuloDependenciaWhereUniqueInput | ModuloDependenciaWhereUniqueInput[]
    connect?: ModuloDependenciaWhereUniqueInput | ModuloDependenciaWhereUniqueInput[]
    update?: ModuloDependenciaUpdateWithWhereUniqueWithoutDependeDeInput | ModuloDependenciaUpdateWithWhereUniqueWithoutDependeDeInput[]
    updateMany?: ModuloDependenciaUpdateManyWithWhereWithoutDependeDeInput | ModuloDependenciaUpdateManyWithWhereWithoutDependeDeInput[]
    deleteMany?: ModuloDependenciaScalarWhereInput | ModuloDependenciaScalarWhereInput[]
  }

  export type ModuloRutaUpdateManyWithoutModuloNestedInput = {
    create?: XOR<ModuloRutaCreateWithoutModuloInput, ModuloRutaUncheckedCreateWithoutModuloInput> | ModuloRutaCreateWithoutModuloInput[] | ModuloRutaUncheckedCreateWithoutModuloInput[]
    connectOrCreate?: ModuloRutaCreateOrConnectWithoutModuloInput | ModuloRutaCreateOrConnectWithoutModuloInput[]
    upsert?: ModuloRutaUpsertWithWhereUniqueWithoutModuloInput | ModuloRutaUpsertWithWhereUniqueWithoutModuloInput[]
    createMany?: ModuloRutaCreateManyModuloInputEnvelope
    set?: ModuloRutaWhereUniqueInput | ModuloRutaWhereUniqueInput[]
    disconnect?: ModuloRutaWhereUniqueInput | ModuloRutaWhereUniqueInput[]
    delete?: ModuloRutaWhereUniqueInput | ModuloRutaWhereUniqueInput[]
    connect?: ModuloRutaWhereUniqueInput | ModuloRutaWhereUniqueInput[]
    update?: ModuloRutaUpdateWithWhereUniqueWithoutModuloInput | ModuloRutaUpdateWithWhereUniqueWithoutModuloInput[]
    updateMany?: ModuloRutaUpdateManyWithWhereWithoutModuloInput | ModuloRutaUpdateManyWithWhereWithoutModuloInput[]
    deleteMany?: ModuloRutaScalarWhereInput | ModuloRutaScalarWhereInput[]
  }

  export type ModuloPermisoUpdateManyWithoutModuloNestedInput = {
    create?: XOR<ModuloPermisoCreateWithoutModuloInput, ModuloPermisoUncheckedCreateWithoutModuloInput> | ModuloPermisoCreateWithoutModuloInput[] | ModuloPermisoUncheckedCreateWithoutModuloInput[]
    connectOrCreate?: ModuloPermisoCreateOrConnectWithoutModuloInput | ModuloPermisoCreateOrConnectWithoutModuloInput[]
    upsert?: ModuloPermisoUpsertWithWhereUniqueWithoutModuloInput | ModuloPermisoUpsertWithWhereUniqueWithoutModuloInput[]
    createMany?: ModuloPermisoCreateManyModuloInputEnvelope
    set?: ModuloPermisoWhereUniqueInput | ModuloPermisoWhereUniqueInput[]
    disconnect?: ModuloPermisoWhereUniqueInput | ModuloPermisoWhereUniqueInput[]
    delete?: ModuloPermisoWhereUniqueInput | ModuloPermisoWhereUniqueInput[]
    connect?: ModuloPermisoWhereUniqueInput | ModuloPermisoWhereUniqueInput[]
    update?: ModuloPermisoUpdateWithWhereUniqueWithoutModuloInput | ModuloPermisoUpdateWithWhereUniqueWithoutModuloInput[]
    updateMany?: ModuloPermisoUpdateManyWithWhereWithoutModuloInput | ModuloPermisoUpdateManyWithWhereWithoutModuloInput[]
    deleteMany?: ModuloPermisoScalarWhereInput | ModuloPermisoScalarWhereInput[]
  }

  export type EmpresaModuloUncheckedUpdateManyWithoutModuloNestedInput = {
    create?: XOR<EmpresaModuloCreateWithoutModuloInput, EmpresaModuloUncheckedCreateWithoutModuloInput> | EmpresaModuloCreateWithoutModuloInput[] | EmpresaModuloUncheckedCreateWithoutModuloInput[]
    connectOrCreate?: EmpresaModuloCreateOrConnectWithoutModuloInput | EmpresaModuloCreateOrConnectWithoutModuloInput[]
    upsert?: EmpresaModuloUpsertWithWhereUniqueWithoutModuloInput | EmpresaModuloUpsertWithWhereUniqueWithoutModuloInput[]
    createMany?: EmpresaModuloCreateManyModuloInputEnvelope
    set?: EmpresaModuloWhereUniqueInput | EmpresaModuloWhereUniqueInput[]
    disconnect?: EmpresaModuloWhereUniqueInput | EmpresaModuloWhereUniqueInput[]
    delete?: EmpresaModuloWhereUniqueInput | EmpresaModuloWhereUniqueInput[]
    connect?: EmpresaModuloWhereUniqueInput | EmpresaModuloWhereUniqueInput[]
    update?: EmpresaModuloUpdateWithWhereUniqueWithoutModuloInput | EmpresaModuloUpdateWithWhereUniqueWithoutModuloInput[]
    updateMany?: EmpresaModuloUpdateManyWithWhereWithoutModuloInput | EmpresaModuloUpdateManyWithWhereWithoutModuloInput[]
    deleteMany?: EmpresaModuloScalarWhereInput | EmpresaModuloScalarWhereInput[]
  }

  export type ModuloDependenciaUncheckedUpdateManyWithoutModuloNestedInput = {
    create?: XOR<ModuloDependenciaCreateWithoutModuloInput, ModuloDependenciaUncheckedCreateWithoutModuloInput> | ModuloDependenciaCreateWithoutModuloInput[] | ModuloDependenciaUncheckedCreateWithoutModuloInput[]
    connectOrCreate?: ModuloDependenciaCreateOrConnectWithoutModuloInput | ModuloDependenciaCreateOrConnectWithoutModuloInput[]
    upsert?: ModuloDependenciaUpsertWithWhereUniqueWithoutModuloInput | ModuloDependenciaUpsertWithWhereUniqueWithoutModuloInput[]
    createMany?: ModuloDependenciaCreateManyModuloInputEnvelope
    set?: ModuloDependenciaWhereUniqueInput | ModuloDependenciaWhereUniqueInput[]
    disconnect?: ModuloDependenciaWhereUniqueInput | ModuloDependenciaWhereUniqueInput[]
    delete?: ModuloDependenciaWhereUniqueInput | ModuloDependenciaWhereUniqueInput[]
    connect?: ModuloDependenciaWhereUniqueInput | ModuloDependenciaWhereUniqueInput[]
    update?: ModuloDependenciaUpdateWithWhereUniqueWithoutModuloInput | ModuloDependenciaUpdateWithWhereUniqueWithoutModuloInput[]
    updateMany?: ModuloDependenciaUpdateManyWithWhereWithoutModuloInput | ModuloDependenciaUpdateManyWithWhereWithoutModuloInput[]
    deleteMany?: ModuloDependenciaScalarWhereInput | ModuloDependenciaScalarWhereInput[]
  }

  export type ModuloDependenciaUncheckedUpdateManyWithoutDependeDeNestedInput = {
    create?: XOR<ModuloDependenciaCreateWithoutDependeDeInput, ModuloDependenciaUncheckedCreateWithoutDependeDeInput> | ModuloDependenciaCreateWithoutDependeDeInput[] | ModuloDependenciaUncheckedCreateWithoutDependeDeInput[]
    connectOrCreate?: ModuloDependenciaCreateOrConnectWithoutDependeDeInput | ModuloDependenciaCreateOrConnectWithoutDependeDeInput[]
    upsert?: ModuloDependenciaUpsertWithWhereUniqueWithoutDependeDeInput | ModuloDependenciaUpsertWithWhereUniqueWithoutDependeDeInput[]
    createMany?: ModuloDependenciaCreateManyDependeDeInputEnvelope
    set?: ModuloDependenciaWhereUniqueInput | ModuloDependenciaWhereUniqueInput[]
    disconnect?: ModuloDependenciaWhereUniqueInput | ModuloDependenciaWhereUniqueInput[]
    delete?: ModuloDependenciaWhereUniqueInput | ModuloDependenciaWhereUniqueInput[]
    connect?: ModuloDependenciaWhereUniqueInput | ModuloDependenciaWhereUniqueInput[]
    update?: ModuloDependenciaUpdateWithWhereUniqueWithoutDependeDeInput | ModuloDependenciaUpdateWithWhereUniqueWithoutDependeDeInput[]
    updateMany?: ModuloDependenciaUpdateManyWithWhereWithoutDependeDeInput | ModuloDependenciaUpdateManyWithWhereWithoutDependeDeInput[]
    deleteMany?: ModuloDependenciaScalarWhereInput | ModuloDependenciaScalarWhereInput[]
  }

  export type ModuloRutaUncheckedUpdateManyWithoutModuloNestedInput = {
    create?: XOR<ModuloRutaCreateWithoutModuloInput, ModuloRutaUncheckedCreateWithoutModuloInput> | ModuloRutaCreateWithoutModuloInput[] | ModuloRutaUncheckedCreateWithoutModuloInput[]
    connectOrCreate?: ModuloRutaCreateOrConnectWithoutModuloInput | ModuloRutaCreateOrConnectWithoutModuloInput[]
    upsert?: ModuloRutaUpsertWithWhereUniqueWithoutModuloInput | ModuloRutaUpsertWithWhereUniqueWithoutModuloInput[]
    createMany?: ModuloRutaCreateManyModuloInputEnvelope
    set?: ModuloRutaWhereUniqueInput | ModuloRutaWhereUniqueInput[]
    disconnect?: ModuloRutaWhereUniqueInput | ModuloRutaWhereUniqueInput[]
    delete?: ModuloRutaWhereUniqueInput | ModuloRutaWhereUniqueInput[]
    connect?: ModuloRutaWhereUniqueInput | ModuloRutaWhereUniqueInput[]
    update?: ModuloRutaUpdateWithWhereUniqueWithoutModuloInput | ModuloRutaUpdateWithWhereUniqueWithoutModuloInput[]
    updateMany?: ModuloRutaUpdateManyWithWhereWithoutModuloInput | ModuloRutaUpdateManyWithWhereWithoutModuloInput[]
    deleteMany?: ModuloRutaScalarWhereInput | ModuloRutaScalarWhereInput[]
  }

  export type ModuloPermisoUncheckedUpdateManyWithoutModuloNestedInput = {
    create?: XOR<ModuloPermisoCreateWithoutModuloInput, ModuloPermisoUncheckedCreateWithoutModuloInput> | ModuloPermisoCreateWithoutModuloInput[] | ModuloPermisoUncheckedCreateWithoutModuloInput[]
    connectOrCreate?: ModuloPermisoCreateOrConnectWithoutModuloInput | ModuloPermisoCreateOrConnectWithoutModuloInput[]
    upsert?: ModuloPermisoUpsertWithWhereUniqueWithoutModuloInput | ModuloPermisoUpsertWithWhereUniqueWithoutModuloInput[]
    createMany?: ModuloPermisoCreateManyModuloInputEnvelope
    set?: ModuloPermisoWhereUniqueInput | ModuloPermisoWhereUniqueInput[]
    disconnect?: ModuloPermisoWhereUniqueInput | ModuloPermisoWhereUniqueInput[]
    delete?: ModuloPermisoWhereUniqueInput | ModuloPermisoWhereUniqueInput[]
    connect?: ModuloPermisoWhereUniqueInput | ModuloPermisoWhereUniqueInput[]
    update?: ModuloPermisoUpdateWithWhereUniqueWithoutModuloInput | ModuloPermisoUpdateWithWhereUniqueWithoutModuloInput[]
    updateMany?: ModuloPermisoUpdateManyWithWhereWithoutModuloInput | ModuloPermisoUpdateManyWithWhereWithoutModuloInput[]
    deleteMany?: ModuloPermisoScalarWhereInput | ModuloPermisoScalarWhereInput[]
  }

  export type EmpresaCreateNestedOneWithoutEmpresaModulosInput = {
    create?: XOR<EmpresaCreateWithoutEmpresaModulosInput, EmpresaUncheckedCreateWithoutEmpresaModulosInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutEmpresaModulosInput
    connect?: EmpresaWhereUniqueInput
  }

  export type ModuloCreateNestedOneWithoutEmpresaModulosInput = {
    create?: XOR<ModuloCreateWithoutEmpresaModulosInput, ModuloUncheckedCreateWithoutEmpresaModulosInput>
    connectOrCreate?: ModuloCreateOrConnectWithoutEmpresaModulosInput
    connect?: ModuloWhereUniqueInput
  }

  export type EmpresaUpdateOneRequiredWithoutEmpresaModulosNestedInput = {
    create?: XOR<EmpresaCreateWithoutEmpresaModulosInput, EmpresaUncheckedCreateWithoutEmpresaModulosInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutEmpresaModulosInput
    upsert?: EmpresaUpsertWithoutEmpresaModulosInput
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutEmpresaModulosInput, EmpresaUpdateWithoutEmpresaModulosInput>, EmpresaUncheckedUpdateWithoutEmpresaModulosInput>
  }

  export type ModuloUpdateOneRequiredWithoutEmpresaModulosNestedInput = {
    create?: XOR<ModuloCreateWithoutEmpresaModulosInput, ModuloUncheckedCreateWithoutEmpresaModulosInput>
    connectOrCreate?: ModuloCreateOrConnectWithoutEmpresaModulosInput
    upsert?: ModuloUpsertWithoutEmpresaModulosInput
    connect?: ModuloWhereUniqueInput
    update?: XOR<XOR<ModuloUpdateToOneWithWhereWithoutEmpresaModulosInput, ModuloUpdateWithoutEmpresaModulosInput>, ModuloUncheckedUpdateWithoutEmpresaModulosInput>
  }

  export type ModuloCreateNestedOneWithoutModuloDependenciasInput = {
    create?: XOR<ModuloCreateWithoutModuloDependenciasInput, ModuloUncheckedCreateWithoutModuloDependenciasInput>
    connectOrCreate?: ModuloCreateOrConnectWithoutModuloDependenciasInput
    connect?: ModuloWhereUniqueInput
  }

  export type ModuloCreateNestedOneWithoutDependenciasDeInput = {
    create?: XOR<ModuloCreateWithoutDependenciasDeInput, ModuloUncheckedCreateWithoutDependenciasDeInput>
    connectOrCreate?: ModuloCreateOrConnectWithoutDependenciasDeInput
    connect?: ModuloWhereUniqueInput
  }

  export type ModuloUpdateOneRequiredWithoutModuloDependenciasNestedInput = {
    create?: XOR<ModuloCreateWithoutModuloDependenciasInput, ModuloUncheckedCreateWithoutModuloDependenciasInput>
    connectOrCreate?: ModuloCreateOrConnectWithoutModuloDependenciasInput
    upsert?: ModuloUpsertWithoutModuloDependenciasInput
    connect?: ModuloWhereUniqueInput
    update?: XOR<XOR<ModuloUpdateToOneWithWhereWithoutModuloDependenciasInput, ModuloUpdateWithoutModuloDependenciasInput>, ModuloUncheckedUpdateWithoutModuloDependenciasInput>
  }

  export type ModuloUpdateOneRequiredWithoutDependenciasDeNestedInput = {
    create?: XOR<ModuloCreateWithoutDependenciasDeInput, ModuloUncheckedCreateWithoutDependenciasDeInput>
    connectOrCreate?: ModuloCreateOrConnectWithoutDependenciasDeInput
    upsert?: ModuloUpsertWithoutDependenciasDeInput
    connect?: ModuloWhereUniqueInput
    update?: XOR<XOR<ModuloUpdateToOneWithWhereWithoutDependenciasDeInput, ModuloUpdateWithoutDependenciasDeInput>, ModuloUncheckedUpdateWithoutDependenciasDeInput>
  }

  export type UsuarioCreateNestedManyWithoutRolInput = {
    create?: XOR<UsuarioCreateWithoutRolInput, UsuarioUncheckedCreateWithoutRolInput> | UsuarioCreateWithoutRolInput[] | UsuarioUncheckedCreateWithoutRolInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutRolInput | UsuarioCreateOrConnectWithoutRolInput[]
    createMany?: UsuarioCreateManyRolInputEnvelope
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
  }

  export type RolPermisoCreateNestedManyWithoutRolInput = {
    create?: XOR<RolPermisoCreateWithoutRolInput, RolPermisoUncheckedCreateWithoutRolInput> | RolPermisoCreateWithoutRolInput[] | RolPermisoUncheckedCreateWithoutRolInput[]
    connectOrCreate?: RolPermisoCreateOrConnectWithoutRolInput | RolPermisoCreateOrConnectWithoutRolInput[]
    createMany?: RolPermisoCreateManyRolInputEnvelope
    connect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
  }

  export type UsuarioUncheckedCreateNestedManyWithoutRolInput = {
    create?: XOR<UsuarioCreateWithoutRolInput, UsuarioUncheckedCreateWithoutRolInput> | UsuarioCreateWithoutRolInput[] | UsuarioUncheckedCreateWithoutRolInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutRolInput | UsuarioCreateOrConnectWithoutRolInput[]
    createMany?: UsuarioCreateManyRolInputEnvelope
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
  }

  export type RolPermisoUncheckedCreateNestedManyWithoutRolInput = {
    create?: XOR<RolPermisoCreateWithoutRolInput, RolPermisoUncheckedCreateWithoutRolInput> | RolPermisoCreateWithoutRolInput[] | RolPermisoUncheckedCreateWithoutRolInput[]
    connectOrCreate?: RolPermisoCreateOrConnectWithoutRolInput | RolPermisoCreateOrConnectWithoutRolInput[]
    createMany?: RolPermisoCreateManyRolInputEnvelope
    connect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UsuarioUpdateManyWithoutRolNestedInput = {
    create?: XOR<UsuarioCreateWithoutRolInput, UsuarioUncheckedCreateWithoutRolInput> | UsuarioCreateWithoutRolInput[] | UsuarioUncheckedCreateWithoutRolInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutRolInput | UsuarioCreateOrConnectWithoutRolInput[]
    upsert?: UsuarioUpsertWithWhereUniqueWithoutRolInput | UsuarioUpsertWithWhereUniqueWithoutRolInput[]
    createMany?: UsuarioCreateManyRolInputEnvelope
    set?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    disconnect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    delete?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    update?: UsuarioUpdateWithWhereUniqueWithoutRolInput | UsuarioUpdateWithWhereUniqueWithoutRolInput[]
    updateMany?: UsuarioUpdateManyWithWhereWithoutRolInput | UsuarioUpdateManyWithWhereWithoutRolInput[]
    deleteMany?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
  }

  export type RolPermisoUpdateManyWithoutRolNestedInput = {
    create?: XOR<RolPermisoCreateWithoutRolInput, RolPermisoUncheckedCreateWithoutRolInput> | RolPermisoCreateWithoutRolInput[] | RolPermisoUncheckedCreateWithoutRolInput[]
    connectOrCreate?: RolPermisoCreateOrConnectWithoutRolInput | RolPermisoCreateOrConnectWithoutRolInput[]
    upsert?: RolPermisoUpsertWithWhereUniqueWithoutRolInput | RolPermisoUpsertWithWhereUniqueWithoutRolInput[]
    createMany?: RolPermisoCreateManyRolInputEnvelope
    set?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    disconnect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    delete?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    connect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    update?: RolPermisoUpdateWithWhereUniqueWithoutRolInput | RolPermisoUpdateWithWhereUniqueWithoutRolInput[]
    updateMany?: RolPermisoUpdateManyWithWhereWithoutRolInput | RolPermisoUpdateManyWithWhereWithoutRolInput[]
    deleteMany?: RolPermisoScalarWhereInput | RolPermisoScalarWhereInput[]
  }

  export type UsuarioUncheckedUpdateManyWithoutRolNestedInput = {
    create?: XOR<UsuarioCreateWithoutRolInput, UsuarioUncheckedCreateWithoutRolInput> | UsuarioCreateWithoutRolInput[] | UsuarioUncheckedCreateWithoutRolInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutRolInput | UsuarioCreateOrConnectWithoutRolInput[]
    upsert?: UsuarioUpsertWithWhereUniqueWithoutRolInput | UsuarioUpsertWithWhereUniqueWithoutRolInput[]
    createMany?: UsuarioCreateManyRolInputEnvelope
    set?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    disconnect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    delete?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    update?: UsuarioUpdateWithWhereUniqueWithoutRolInput | UsuarioUpdateWithWhereUniqueWithoutRolInput[]
    updateMany?: UsuarioUpdateManyWithWhereWithoutRolInput | UsuarioUpdateManyWithWhereWithoutRolInput[]
    deleteMany?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
  }

  export type RolPermisoUncheckedUpdateManyWithoutRolNestedInput = {
    create?: XOR<RolPermisoCreateWithoutRolInput, RolPermisoUncheckedCreateWithoutRolInput> | RolPermisoCreateWithoutRolInput[] | RolPermisoUncheckedCreateWithoutRolInput[]
    connectOrCreate?: RolPermisoCreateOrConnectWithoutRolInput | RolPermisoCreateOrConnectWithoutRolInput[]
    upsert?: RolPermisoUpsertWithWhereUniqueWithoutRolInput | RolPermisoUpsertWithWhereUniqueWithoutRolInput[]
    createMany?: RolPermisoCreateManyRolInputEnvelope
    set?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    disconnect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    delete?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    connect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    update?: RolPermisoUpdateWithWhereUniqueWithoutRolInput | RolPermisoUpdateWithWhereUniqueWithoutRolInput[]
    updateMany?: RolPermisoUpdateManyWithWhereWithoutRolInput | RolPermisoUpdateManyWithWhereWithoutRolInput[]
    deleteMany?: RolPermisoScalarWhereInput | RolPermisoScalarWhereInput[]
  }

  export type ModuloCreateNestedOneWithoutModuloPermisosInput = {
    create?: XOR<ModuloCreateWithoutModuloPermisosInput, ModuloUncheckedCreateWithoutModuloPermisosInput>
    connectOrCreate?: ModuloCreateOrConnectWithoutModuloPermisosInput
    connect?: ModuloWhereUniqueInput
  }

  export type RolPermisoCreateNestedManyWithoutModuloPermisoInput = {
    create?: XOR<RolPermisoCreateWithoutModuloPermisoInput, RolPermisoUncheckedCreateWithoutModuloPermisoInput> | RolPermisoCreateWithoutModuloPermisoInput[] | RolPermisoUncheckedCreateWithoutModuloPermisoInput[]
    connectOrCreate?: RolPermisoCreateOrConnectWithoutModuloPermisoInput | RolPermisoCreateOrConnectWithoutModuloPermisoInput[]
    createMany?: RolPermisoCreateManyModuloPermisoInputEnvelope
    connect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
  }

  export type RolPermisoUncheckedCreateNestedManyWithoutModuloPermisoInput = {
    create?: XOR<RolPermisoCreateWithoutModuloPermisoInput, RolPermisoUncheckedCreateWithoutModuloPermisoInput> | RolPermisoCreateWithoutModuloPermisoInput[] | RolPermisoUncheckedCreateWithoutModuloPermisoInput[]
    connectOrCreate?: RolPermisoCreateOrConnectWithoutModuloPermisoInput | RolPermisoCreateOrConnectWithoutModuloPermisoInput[]
    createMany?: RolPermisoCreateManyModuloPermisoInputEnvelope
    connect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
  }

  export type ModuloUpdateOneRequiredWithoutModuloPermisosNestedInput = {
    create?: XOR<ModuloCreateWithoutModuloPermisosInput, ModuloUncheckedCreateWithoutModuloPermisosInput>
    connectOrCreate?: ModuloCreateOrConnectWithoutModuloPermisosInput
    upsert?: ModuloUpsertWithoutModuloPermisosInput
    connect?: ModuloWhereUniqueInput
    update?: XOR<XOR<ModuloUpdateToOneWithWhereWithoutModuloPermisosInput, ModuloUpdateWithoutModuloPermisosInput>, ModuloUncheckedUpdateWithoutModuloPermisosInput>
  }

  export type RolPermisoUpdateManyWithoutModuloPermisoNestedInput = {
    create?: XOR<RolPermisoCreateWithoutModuloPermisoInput, RolPermisoUncheckedCreateWithoutModuloPermisoInput> | RolPermisoCreateWithoutModuloPermisoInput[] | RolPermisoUncheckedCreateWithoutModuloPermisoInput[]
    connectOrCreate?: RolPermisoCreateOrConnectWithoutModuloPermisoInput | RolPermisoCreateOrConnectWithoutModuloPermisoInput[]
    upsert?: RolPermisoUpsertWithWhereUniqueWithoutModuloPermisoInput | RolPermisoUpsertWithWhereUniqueWithoutModuloPermisoInput[]
    createMany?: RolPermisoCreateManyModuloPermisoInputEnvelope
    set?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    disconnect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    delete?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    connect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    update?: RolPermisoUpdateWithWhereUniqueWithoutModuloPermisoInput | RolPermisoUpdateWithWhereUniqueWithoutModuloPermisoInput[]
    updateMany?: RolPermisoUpdateManyWithWhereWithoutModuloPermisoInput | RolPermisoUpdateManyWithWhereWithoutModuloPermisoInput[]
    deleteMany?: RolPermisoScalarWhereInput | RolPermisoScalarWhereInput[]
  }

  export type RolPermisoUncheckedUpdateManyWithoutModuloPermisoNestedInput = {
    create?: XOR<RolPermisoCreateWithoutModuloPermisoInput, RolPermisoUncheckedCreateWithoutModuloPermisoInput> | RolPermisoCreateWithoutModuloPermisoInput[] | RolPermisoUncheckedCreateWithoutModuloPermisoInput[]
    connectOrCreate?: RolPermisoCreateOrConnectWithoutModuloPermisoInput | RolPermisoCreateOrConnectWithoutModuloPermisoInput[]
    upsert?: RolPermisoUpsertWithWhereUniqueWithoutModuloPermisoInput | RolPermisoUpsertWithWhereUniqueWithoutModuloPermisoInput[]
    createMany?: RolPermisoCreateManyModuloPermisoInputEnvelope
    set?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    disconnect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    delete?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    connect?: RolPermisoWhereUniqueInput | RolPermisoWhereUniqueInput[]
    update?: RolPermisoUpdateWithWhereUniqueWithoutModuloPermisoInput | RolPermisoUpdateWithWhereUniqueWithoutModuloPermisoInput[]
    updateMany?: RolPermisoUpdateManyWithWhereWithoutModuloPermisoInput | RolPermisoUpdateManyWithWhereWithoutModuloPermisoInput[]
    deleteMany?: RolPermisoScalarWhereInput | RolPermisoScalarWhereInput[]
  }

  export type RolCreateNestedOneWithoutRolPermisosInput = {
    create?: XOR<RolCreateWithoutRolPermisosInput, RolUncheckedCreateWithoutRolPermisosInput>
    connectOrCreate?: RolCreateOrConnectWithoutRolPermisosInput
    connect?: RolWhereUniqueInput
  }

  export type ModuloPermisoCreateNestedOneWithoutRolPermisosInput = {
    create?: XOR<ModuloPermisoCreateWithoutRolPermisosInput, ModuloPermisoUncheckedCreateWithoutRolPermisosInput>
    connectOrCreate?: ModuloPermisoCreateOrConnectWithoutRolPermisosInput
    connect?: ModuloPermisoWhereUniqueInput
  }

  export type RolUpdateOneRequiredWithoutRolPermisosNestedInput = {
    create?: XOR<RolCreateWithoutRolPermisosInput, RolUncheckedCreateWithoutRolPermisosInput>
    connectOrCreate?: RolCreateOrConnectWithoutRolPermisosInput
    upsert?: RolUpsertWithoutRolPermisosInput
    connect?: RolWhereUniqueInput
    update?: XOR<XOR<RolUpdateToOneWithWhereWithoutRolPermisosInput, RolUpdateWithoutRolPermisosInput>, RolUncheckedUpdateWithoutRolPermisosInput>
  }

  export type ModuloPermisoUpdateOneRequiredWithoutRolPermisosNestedInput = {
    create?: XOR<ModuloPermisoCreateWithoutRolPermisosInput, ModuloPermisoUncheckedCreateWithoutRolPermisosInput>
    connectOrCreate?: ModuloPermisoCreateOrConnectWithoutRolPermisosInput
    upsert?: ModuloPermisoUpsertWithoutRolPermisosInput
    connect?: ModuloPermisoWhereUniqueInput
    update?: XOR<XOR<ModuloPermisoUpdateToOneWithWhereWithoutRolPermisosInput, ModuloPermisoUpdateWithoutRolPermisosInput>, ModuloPermisoUncheckedUpdateWithoutRolPermisosInput>
  }

  export type ModuloCreateNestedOneWithoutModulosRutasInput = {
    create?: XOR<ModuloCreateWithoutModulosRutasInput, ModuloUncheckedCreateWithoutModulosRutasInput>
    connectOrCreate?: ModuloCreateOrConnectWithoutModulosRutasInput
    connect?: ModuloWhereUniqueInput
  }

  export type EmpresaCreateNestedOneWithoutModulosRutasInput = {
    create?: XOR<EmpresaCreateWithoutModulosRutasInput, EmpresaUncheckedCreateWithoutModulosRutasInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutModulosRutasInput
    connect?: EmpresaWhereUniqueInput
  }

  export type ModuloUpdateOneRequiredWithoutModulosRutasNestedInput = {
    create?: XOR<ModuloCreateWithoutModulosRutasInput, ModuloUncheckedCreateWithoutModulosRutasInput>
    connectOrCreate?: ModuloCreateOrConnectWithoutModulosRutasInput
    upsert?: ModuloUpsertWithoutModulosRutasInput
    connect?: ModuloWhereUniqueInput
    update?: XOR<XOR<ModuloUpdateToOneWithWhereWithoutModulosRutasInput, ModuloUpdateWithoutModulosRutasInput>, ModuloUncheckedUpdateWithoutModulosRutasInput>
  }

  export type EmpresaUpdateOneWithoutModulosRutasNestedInput = {
    create?: XOR<EmpresaCreateWithoutModulosRutasInput, EmpresaUncheckedCreateWithoutModulosRutasInput>
    connectOrCreate?: EmpresaCreateOrConnectWithoutModulosRutasInput
    upsert?: EmpresaUpsertWithoutModulosRutasInput
    disconnect?: EmpresaWhereInput | boolean
    delete?: EmpresaWhereInput | boolean
    connect?: EmpresaWhereUniqueInput
    update?: XOR<XOR<EmpresaUpdateToOneWithWhereWithoutModulosRutasInput, EmpresaUpdateWithoutModulosRutasInput>, EmpresaUncheckedUpdateWithoutModulosRutasInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UsuarioCreateWithoutEmpresaInput = {
    id?: string
    email: string
    nombre: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    rol: RolCreateNestedOneWithoutUsuariosInput
  }

  export type UsuarioUncheckedCreateWithoutEmpresaInput = {
    id?: string
    email: string
    nombre: string
    rolId: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsuarioCreateOrConnectWithoutEmpresaInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutEmpresaInput, UsuarioUncheckedCreateWithoutEmpresaInput>
  }

  export type UsuarioCreateManyEmpresaInputEnvelope = {
    data: UsuarioCreateManyEmpresaInput | UsuarioCreateManyEmpresaInput[]
    skipDuplicates?: boolean
  }

  export type EmpresaModuloCreateWithoutEmpresaInput = {
    id?: string
    activo?: boolean
    configuracion?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    modulo: ModuloCreateNestedOneWithoutEmpresaModulosInput
  }

  export type EmpresaModuloUncheckedCreateWithoutEmpresaInput = {
    id?: string
    moduloId: string
    activo?: boolean
    configuracion?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmpresaModuloCreateOrConnectWithoutEmpresaInput = {
    where: EmpresaModuloWhereUniqueInput
    create: XOR<EmpresaModuloCreateWithoutEmpresaInput, EmpresaModuloUncheckedCreateWithoutEmpresaInput>
  }

  export type EmpresaModuloCreateManyEmpresaInputEnvelope = {
    data: EmpresaModuloCreateManyEmpresaInput | EmpresaModuloCreateManyEmpresaInput[]
    skipDuplicates?: boolean
  }

  export type ModuloRutaCreateWithoutEmpresaInput = {
    id?: string
    ruta: string
    metodo?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    modulo: ModuloCreateNestedOneWithoutModulosRutasInput
  }

  export type ModuloRutaUncheckedCreateWithoutEmpresaInput = {
    id?: string
    moduloId: string
    ruta: string
    metodo?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModuloRutaCreateOrConnectWithoutEmpresaInput = {
    where: ModuloRutaWhereUniqueInput
    create: XOR<ModuloRutaCreateWithoutEmpresaInput, ModuloRutaUncheckedCreateWithoutEmpresaInput>
  }

  export type ModuloRutaCreateManyEmpresaInputEnvelope = {
    data: ModuloRutaCreateManyEmpresaInput | ModuloRutaCreateManyEmpresaInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: UsuarioWhereUniqueInput
    update: XOR<UsuarioUpdateWithoutEmpresaInput, UsuarioUncheckedUpdateWithoutEmpresaInput>
    create: XOR<UsuarioCreateWithoutEmpresaInput, UsuarioUncheckedCreateWithoutEmpresaInput>
  }

  export type UsuarioUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: UsuarioWhereUniqueInput
    data: XOR<UsuarioUpdateWithoutEmpresaInput, UsuarioUncheckedUpdateWithoutEmpresaInput>
  }

  export type UsuarioUpdateManyWithWhereWithoutEmpresaInput = {
    where: UsuarioScalarWhereInput
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyWithoutEmpresaInput>
  }

  export type UsuarioScalarWhereInput = {
    AND?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
    OR?: UsuarioScalarWhereInput[]
    NOT?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
    id?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    nombre?: StringFilter<"Usuario"> | string
    empresaId?: StringFilter<"Usuario"> | string
    rolId?: StringFilter<"Usuario"> | string
    activo?: BoolFilter<"Usuario"> | boolean
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeFilter<"Usuario"> | Date | string
  }

  export type EmpresaModuloUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: EmpresaModuloWhereUniqueInput
    update: XOR<EmpresaModuloUpdateWithoutEmpresaInput, EmpresaModuloUncheckedUpdateWithoutEmpresaInput>
    create: XOR<EmpresaModuloCreateWithoutEmpresaInput, EmpresaModuloUncheckedCreateWithoutEmpresaInput>
  }

  export type EmpresaModuloUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: EmpresaModuloWhereUniqueInput
    data: XOR<EmpresaModuloUpdateWithoutEmpresaInput, EmpresaModuloUncheckedUpdateWithoutEmpresaInput>
  }

  export type EmpresaModuloUpdateManyWithWhereWithoutEmpresaInput = {
    where: EmpresaModuloScalarWhereInput
    data: XOR<EmpresaModuloUpdateManyMutationInput, EmpresaModuloUncheckedUpdateManyWithoutEmpresaInput>
  }

  export type EmpresaModuloScalarWhereInput = {
    AND?: EmpresaModuloScalarWhereInput | EmpresaModuloScalarWhereInput[]
    OR?: EmpresaModuloScalarWhereInput[]
    NOT?: EmpresaModuloScalarWhereInput | EmpresaModuloScalarWhereInput[]
    id?: StringFilter<"EmpresaModulo"> | string
    empresaId?: StringFilter<"EmpresaModulo"> | string
    moduloId?: StringFilter<"EmpresaModulo"> | string
    activo?: BoolFilter<"EmpresaModulo"> | boolean
    configuracion?: JsonNullableFilter<"EmpresaModulo">
    createdAt?: DateTimeFilter<"EmpresaModulo"> | Date | string
    updatedAt?: DateTimeFilter<"EmpresaModulo"> | Date | string
  }

  export type ModuloRutaUpsertWithWhereUniqueWithoutEmpresaInput = {
    where: ModuloRutaWhereUniqueInput
    update: XOR<ModuloRutaUpdateWithoutEmpresaInput, ModuloRutaUncheckedUpdateWithoutEmpresaInput>
    create: XOR<ModuloRutaCreateWithoutEmpresaInput, ModuloRutaUncheckedCreateWithoutEmpresaInput>
  }

  export type ModuloRutaUpdateWithWhereUniqueWithoutEmpresaInput = {
    where: ModuloRutaWhereUniqueInput
    data: XOR<ModuloRutaUpdateWithoutEmpresaInput, ModuloRutaUncheckedUpdateWithoutEmpresaInput>
  }

  export type ModuloRutaUpdateManyWithWhereWithoutEmpresaInput = {
    where: ModuloRutaScalarWhereInput
    data: XOR<ModuloRutaUpdateManyMutationInput, ModuloRutaUncheckedUpdateManyWithoutEmpresaInput>
  }

  export type ModuloRutaScalarWhereInput = {
    AND?: ModuloRutaScalarWhereInput | ModuloRutaScalarWhereInput[]
    OR?: ModuloRutaScalarWhereInput[]
    NOT?: ModuloRutaScalarWhereInput | ModuloRutaScalarWhereInput[]
    id?: StringFilter<"ModuloRuta"> | string
    moduloId?: StringFilter<"ModuloRuta"> | string
    empresaId?: StringNullableFilter<"ModuloRuta"> | string | null
    ruta?: StringFilter<"ModuloRuta"> | string
    metodo?: StringFilter<"ModuloRuta"> | string
    activo?: BoolFilter<"ModuloRuta"> | boolean
    createdAt?: DateTimeFilter<"ModuloRuta"> | Date | string
    updatedAt?: DateTimeFilter<"ModuloRuta"> | Date | string
  }

  export type EmpresaCreateWithoutUsuariosInput = {
    id?: string
    nombre: string
    ruc: string
    plan?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    empresaModulos?: EmpresaModuloCreateNestedManyWithoutEmpresaInput
    modulosRutas?: ModuloRutaCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutUsuariosInput = {
    id?: string
    nombre: string
    ruc: string
    plan?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    empresaModulos?: EmpresaModuloUncheckedCreateNestedManyWithoutEmpresaInput
    modulosRutas?: ModuloRutaUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutUsuariosInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutUsuariosInput, EmpresaUncheckedCreateWithoutUsuariosInput>
  }

  export type RolCreateWithoutUsuariosInput = {
    id?: string
    nombre: string
    empresaId?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    rolPermisos?: RolPermisoCreateNestedManyWithoutRolInput
  }

  export type RolUncheckedCreateWithoutUsuariosInput = {
    id?: string
    nombre: string
    empresaId?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    rolPermisos?: RolPermisoUncheckedCreateNestedManyWithoutRolInput
  }

  export type RolCreateOrConnectWithoutUsuariosInput = {
    where: RolWhereUniqueInput
    create: XOR<RolCreateWithoutUsuariosInput, RolUncheckedCreateWithoutUsuariosInput>
  }

  export type EmpresaUpsertWithoutUsuariosInput = {
    update: XOR<EmpresaUpdateWithoutUsuariosInput, EmpresaUncheckedUpdateWithoutUsuariosInput>
    create: XOR<EmpresaCreateWithoutUsuariosInput, EmpresaUncheckedCreateWithoutUsuariosInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutUsuariosInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutUsuariosInput, EmpresaUncheckedUpdateWithoutUsuariosInput>
  }

  export type EmpresaUpdateWithoutUsuariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    ruc?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresaModulos?: EmpresaModuloUpdateManyWithoutEmpresaNestedInput
    modulosRutas?: ModuloRutaUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutUsuariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    ruc?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresaModulos?: EmpresaModuloUncheckedUpdateManyWithoutEmpresaNestedInput
    modulosRutas?: ModuloRutaUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type RolUpsertWithoutUsuariosInput = {
    update: XOR<RolUpdateWithoutUsuariosInput, RolUncheckedUpdateWithoutUsuariosInput>
    create: XOR<RolCreateWithoutUsuariosInput, RolUncheckedCreateWithoutUsuariosInput>
    where?: RolWhereInput
  }

  export type RolUpdateToOneWithWhereWithoutUsuariosInput = {
    where?: RolWhereInput
    data: XOR<RolUpdateWithoutUsuariosInput, RolUncheckedUpdateWithoutUsuariosInput>
  }

  export type RolUpdateWithoutUsuariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    empresaId?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rolPermisos?: RolPermisoUpdateManyWithoutRolNestedInput
  }

  export type RolUncheckedUpdateWithoutUsuariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    empresaId?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rolPermisos?: RolPermisoUncheckedUpdateManyWithoutRolNestedInput
  }

  export type EmpresaModuloCreateWithoutModuloInput = {
    id?: string
    activo?: boolean
    configuracion?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutEmpresaModulosInput
  }

  export type EmpresaModuloUncheckedCreateWithoutModuloInput = {
    id?: string
    empresaId: string
    activo?: boolean
    configuracion?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmpresaModuloCreateOrConnectWithoutModuloInput = {
    where: EmpresaModuloWhereUniqueInput
    create: XOR<EmpresaModuloCreateWithoutModuloInput, EmpresaModuloUncheckedCreateWithoutModuloInput>
  }

  export type EmpresaModuloCreateManyModuloInputEnvelope = {
    data: EmpresaModuloCreateManyModuloInput | EmpresaModuloCreateManyModuloInput[]
    skipDuplicates?: boolean
  }

  export type ModuloDependenciaCreateWithoutModuloInput = {
    id?: string
    requerido?: boolean
    createdAt?: Date | string
    dependeDe: ModuloCreateNestedOneWithoutDependenciasDeInput
  }

  export type ModuloDependenciaUncheckedCreateWithoutModuloInput = {
    id?: string
    dependeDeId: string
    requerido?: boolean
    createdAt?: Date | string
  }

  export type ModuloDependenciaCreateOrConnectWithoutModuloInput = {
    where: ModuloDependenciaWhereUniqueInput
    create: XOR<ModuloDependenciaCreateWithoutModuloInput, ModuloDependenciaUncheckedCreateWithoutModuloInput>
  }

  export type ModuloDependenciaCreateManyModuloInputEnvelope = {
    data: ModuloDependenciaCreateManyModuloInput | ModuloDependenciaCreateManyModuloInput[]
    skipDuplicates?: boolean
  }

  export type ModuloDependenciaCreateWithoutDependeDeInput = {
    id?: string
    requerido?: boolean
    createdAt?: Date | string
    modulo: ModuloCreateNestedOneWithoutModuloDependenciasInput
  }

  export type ModuloDependenciaUncheckedCreateWithoutDependeDeInput = {
    id?: string
    moduloId: string
    requerido?: boolean
    createdAt?: Date | string
  }

  export type ModuloDependenciaCreateOrConnectWithoutDependeDeInput = {
    where: ModuloDependenciaWhereUniqueInput
    create: XOR<ModuloDependenciaCreateWithoutDependeDeInput, ModuloDependenciaUncheckedCreateWithoutDependeDeInput>
  }

  export type ModuloDependenciaCreateManyDependeDeInputEnvelope = {
    data: ModuloDependenciaCreateManyDependeDeInput | ModuloDependenciaCreateManyDependeDeInput[]
    skipDuplicates?: boolean
  }

  export type ModuloRutaCreateWithoutModuloInput = {
    id?: string
    ruta: string
    metodo?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    empresa?: EmpresaCreateNestedOneWithoutModulosRutasInput
  }

  export type ModuloRutaUncheckedCreateWithoutModuloInput = {
    id?: string
    empresaId?: string | null
    ruta: string
    metodo?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModuloRutaCreateOrConnectWithoutModuloInput = {
    where: ModuloRutaWhereUniqueInput
    create: XOR<ModuloRutaCreateWithoutModuloInput, ModuloRutaUncheckedCreateWithoutModuloInput>
  }

  export type ModuloRutaCreateManyModuloInputEnvelope = {
    data: ModuloRutaCreateManyModuloInput | ModuloRutaCreateManyModuloInput[]
    skipDuplicates?: boolean
  }

  export type ModuloPermisoCreateWithoutModuloInput = {
    id?: string
    nombre: string
    accion: string
    activo?: boolean
    rolPermisos?: RolPermisoCreateNestedManyWithoutModuloPermisoInput
  }

  export type ModuloPermisoUncheckedCreateWithoutModuloInput = {
    id?: string
    nombre: string
    accion: string
    activo?: boolean
    rolPermisos?: RolPermisoUncheckedCreateNestedManyWithoutModuloPermisoInput
  }

  export type ModuloPermisoCreateOrConnectWithoutModuloInput = {
    where: ModuloPermisoWhereUniqueInput
    create: XOR<ModuloPermisoCreateWithoutModuloInput, ModuloPermisoUncheckedCreateWithoutModuloInput>
  }

  export type ModuloPermisoCreateManyModuloInputEnvelope = {
    data: ModuloPermisoCreateManyModuloInput | ModuloPermisoCreateManyModuloInput[]
    skipDuplicates?: boolean
  }

  export type EmpresaModuloUpsertWithWhereUniqueWithoutModuloInput = {
    where: EmpresaModuloWhereUniqueInput
    update: XOR<EmpresaModuloUpdateWithoutModuloInput, EmpresaModuloUncheckedUpdateWithoutModuloInput>
    create: XOR<EmpresaModuloCreateWithoutModuloInput, EmpresaModuloUncheckedCreateWithoutModuloInput>
  }

  export type EmpresaModuloUpdateWithWhereUniqueWithoutModuloInput = {
    where: EmpresaModuloWhereUniqueInput
    data: XOR<EmpresaModuloUpdateWithoutModuloInput, EmpresaModuloUncheckedUpdateWithoutModuloInput>
  }

  export type EmpresaModuloUpdateManyWithWhereWithoutModuloInput = {
    where: EmpresaModuloScalarWhereInput
    data: XOR<EmpresaModuloUpdateManyMutationInput, EmpresaModuloUncheckedUpdateManyWithoutModuloInput>
  }

  export type ModuloDependenciaUpsertWithWhereUniqueWithoutModuloInput = {
    where: ModuloDependenciaWhereUniqueInput
    update: XOR<ModuloDependenciaUpdateWithoutModuloInput, ModuloDependenciaUncheckedUpdateWithoutModuloInput>
    create: XOR<ModuloDependenciaCreateWithoutModuloInput, ModuloDependenciaUncheckedCreateWithoutModuloInput>
  }

  export type ModuloDependenciaUpdateWithWhereUniqueWithoutModuloInput = {
    where: ModuloDependenciaWhereUniqueInput
    data: XOR<ModuloDependenciaUpdateWithoutModuloInput, ModuloDependenciaUncheckedUpdateWithoutModuloInput>
  }

  export type ModuloDependenciaUpdateManyWithWhereWithoutModuloInput = {
    where: ModuloDependenciaScalarWhereInput
    data: XOR<ModuloDependenciaUpdateManyMutationInput, ModuloDependenciaUncheckedUpdateManyWithoutModuloInput>
  }

  export type ModuloDependenciaScalarWhereInput = {
    AND?: ModuloDependenciaScalarWhereInput | ModuloDependenciaScalarWhereInput[]
    OR?: ModuloDependenciaScalarWhereInput[]
    NOT?: ModuloDependenciaScalarWhereInput | ModuloDependenciaScalarWhereInput[]
    id?: StringFilter<"ModuloDependencia"> | string
    moduloId?: StringFilter<"ModuloDependencia"> | string
    dependeDeId?: StringFilter<"ModuloDependencia"> | string
    requerido?: BoolFilter<"ModuloDependencia"> | boolean
    createdAt?: DateTimeFilter<"ModuloDependencia"> | Date | string
  }

  export type ModuloDependenciaUpsertWithWhereUniqueWithoutDependeDeInput = {
    where: ModuloDependenciaWhereUniqueInput
    update: XOR<ModuloDependenciaUpdateWithoutDependeDeInput, ModuloDependenciaUncheckedUpdateWithoutDependeDeInput>
    create: XOR<ModuloDependenciaCreateWithoutDependeDeInput, ModuloDependenciaUncheckedCreateWithoutDependeDeInput>
  }

  export type ModuloDependenciaUpdateWithWhereUniqueWithoutDependeDeInput = {
    where: ModuloDependenciaWhereUniqueInput
    data: XOR<ModuloDependenciaUpdateWithoutDependeDeInput, ModuloDependenciaUncheckedUpdateWithoutDependeDeInput>
  }

  export type ModuloDependenciaUpdateManyWithWhereWithoutDependeDeInput = {
    where: ModuloDependenciaScalarWhereInput
    data: XOR<ModuloDependenciaUpdateManyMutationInput, ModuloDependenciaUncheckedUpdateManyWithoutDependeDeInput>
  }

  export type ModuloRutaUpsertWithWhereUniqueWithoutModuloInput = {
    where: ModuloRutaWhereUniqueInput
    update: XOR<ModuloRutaUpdateWithoutModuloInput, ModuloRutaUncheckedUpdateWithoutModuloInput>
    create: XOR<ModuloRutaCreateWithoutModuloInput, ModuloRutaUncheckedCreateWithoutModuloInput>
  }

  export type ModuloRutaUpdateWithWhereUniqueWithoutModuloInput = {
    where: ModuloRutaWhereUniqueInput
    data: XOR<ModuloRutaUpdateWithoutModuloInput, ModuloRutaUncheckedUpdateWithoutModuloInput>
  }

  export type ModuloRutaUpdateManyWithWhereWithoutModuloInput = {
    where: ModuloRutaScalarWhereInput
    data: XOR<ModuloRutaUpdateManyMutationInput, ModuloRutaUncheckedUpdateManyWithoutModuloInput>
  }

  export type ModuloPermisoUpsertWithWhereUniqueWithoutModuloInput = {
    where: ModuloPermisoWhereUniqueInput
    update: XOR<ModuloPermisoUpdateWithoutModuloInput, ModuloPermisoUncheckedUpdateWithoutModuloInput>
    create: XOR<ModuloPermisoCreateWithoutModuloInput, ModuloPermisoUncheckedCreateWithoutModuloInput>
  }

  export type ModuloPermisoUpdateWithWhereUniqueWithoutModuloInput = {
    where: ModuloPermisoWhereUniqueInput
    data: XOR<ModuloPermisoUpdateWithoutModuloInput, ModuloPermisoUncheckedUpdateWithoutModuloInput>
  }

  export type ModuloPermisoUpdateManyWithWhereWithoutModuloInput = {
    where: ModuloPermisoScalarWhereInput
    data: XOR<ModuloPermisoUpdateManyMutationInput, ModuloPermisoUncheckedUpdateManyWithoutModuloInput>
  }

  export type ModuloPermisoScalarWhereInput = {
    AND?: ModuloPermisoScalarWhereInput | ModuloPermisoScalarWhereInput[]
    OR?: ModuloPermisoScalarWhereInput[]
    NOT?: ModuloPermisoScalarWhereInput | ModuloPermisoScalarWhereInput[]
    id?: StringFilter<"ModuloPermiso"> | string
    moduloId?: StringFilter<"ModuloPermiso"> | string
    nombre?: StringFilter<"ModuloPermiso"> | string
    accion?: StringFilter<"ModuloPermiso"> | string
    activo?: BoolFilter<"ModuloPermiso"> | boolean
  }

  export type EmpresaCreateWithoutEmpresaModulosInput = {
    id?: string
    nombre: string
    ruc: string
    plan?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    usuarios?: UsuarioCreateNestedManyWithoutEmpresaInput
    modulosRutas?: ModuloRutaCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutEmpresaModulosInput = {
    id?: string
    nombre: string
    ruc: string
    plan?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutEmpresaInput
    modulosRutas?: ModuloRutaUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutEmpresaModulosInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutEmpresaModulosInput, EmpresaUncheckedCreateWithoutEmpresaModulosInput>
  }

  export type ModuloCreateWithoutEmpresaModulosInput = {
    id?: string
    nombre: string
    displayName: string
    version?: string
    activo?: boolean
    dependencias?: ModuloCreatedependenciasInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    moduloDependencias?: ModuloDependenciaCreateNestedManyWithoutModuloInput
    dependenciasDe?: ModuloDependenciaCreateNestedManyWithoutDependeDeInput
    modulosRutas?: ModuloRutaCreateNestedManyWithoutModuloInput
    moduloPermisos?: ModuloPermisoCreateNestedManyWithoutModuloInput
  }

  export type ModuloUncheckedCreateWithoutEmpresaModulosInput = {
    id?: string
    nombre: string
    displayName: string
    version?: string
    activo?: boolean
    dependencias?: ModuloCreatedependenciasInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    moduloDependencias?: ModuloDependenciaUncheckedCreateNestedManyWithoutModuloInput
    dependenciasDe?: ModuloDependenciaUncheckedCreateNestedManyWithoutDependeDeInput
    modulosRutas?: ModuloRutaUncheckedCreateNestedManyWithoutModuloInput
    moduloPermisos?: ModuloPermisoUncheckedCreateNestedManyWithoutModuloInput
  }

  export type ModuloCreateOrConnectWithoutEmpresaModulosInput = {
    where: ModuloWhereUniqueInput
    create: XOR<ModuloCreateWithoutEmpresaModulosInput, ModuloUncheckedCreateWithoutEmpresaModulosInput>
  }

  export type EmpresaUpsertWithoutEmpresaModulosInput = {
    update: XOR<EmpresaUpdateWithoutEmpresaModulosInput, EmpresaUncheckedUpdateWithoutEmpresaModulosInput>
    create: XOR<EmpresaCreateWithoutEmpresaModulosInput, EmpresaUncheckedCreateWithoutEmpresaModulosInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutEmpresaModulosInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutEmpresaModulosInput, EmpresaUncheckedUpdateWithoutEmpresaModulosInput>
  }

  export type EmpresaUpdateWithoutEmpresaModulosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    ruc?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUpdateManyWithoutEmpresaNestedInput
    modulosRutas?: ModuloRutaUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutEmpresaModulosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    ruc?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUncheckedUpdateManyWithoutEmpresaNestedInput
    modulosRutas?: ModuloRutaUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type ModuloUpsertWithoutEmpresaModulosInput = {
    update: XOR<ModuloUpdateWithoutEmpresaModulosInput, ModuloUncheckedUpdateWithoutEmpresaModulosInput>
    create: XOR<ModuloCreateWithoutEmpresaModulosInput, ModuloUncheckedCreateWithoutEmpresaModulosInput>
    where?: ModuloWhereInput
  }

  export type ModuloUpdateToOneWithWhereWithoutEmpresaModulosInput = {
    where?: ModuloWhereInput
    data: XOR<ModuloUpdateWithoutEmpresaModulosInput, ModuloUncheckedUpdateWithoutEmpresaModulosInput>
  }

  export type ModuloUpdateWithoutEmpresaModulosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    dependencias?: ModuloUpdatedependenciasInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moduloDependencias?: ModuloDependenciaUpdateManyWithoutModuloNestedInput
    dependenciasDe?: ModuloDependenciaUpdateManyWithoutDependeDeNestedInput
    modulosRutas?: ModuloRutaUpdateManyWithoutModuloNestedInput
    moduloPermisos?: ModuloPermisoUpdateManyWithoutModuloNestedInput
  }

  export type ModuloUncheckedUpdateWithoutEmpresaModulosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    dependencias?: ModuloUpdatedependenciasInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moduloDependencias?: ModuloDependenciaUncheckedUpdateManyWithoutModuloNestedInput
    dependenciasDe?: ModuloDependenciaUncheckedUpdateManyWithoutDependeDeNestedInput
    modulosRutas?: ModuloRutaUncheckedUpdateManyWithoutModuloNestedInput
    moduloPermisos?: ModuloPermisoUncheckedUpdateManyWithoutModuloNestedInput
  }

  export type ModuloCreateWithoutModuloDependenciasInput = {
    id?: string
    nombre: string
    displayName: string
    version?: string
    activo?: boolean
    dependencias?: ModuloCreatedependenciasInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    empresaModulos?: EmpresaModuloCreateNestedManyWithoutModuloInput
    dependenciasDe?: ModuloDependenciaCreateNestedManyWithoutDependeDeInput
    modulosRutas?: ModuloRutaCreateNestedManyWithoutModuloInput
    moduloPermisos?: ModuloPermisoCreateNestedManyWithoutModuloInput
  }

  export type ModuloUncheckedCreateWithoutModuloDependenciasInput = {
    id?: string
    nombre: string
    displayName: string
    version?: string
    activo?: boolean
    dependencias?: ModuloCreatedependenciasInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    empresaModulos?: EmpresaModuloUncheckedCreateNestedManyWithoutModuloInput
    dependenciasDe?: ModuloDependenciaUncheckedCreateNestedManyWithoutDependeDeInput
    modulosRutas?: ModuloRutaUncheckedCreateNestedManyWithoutModuloInput
    moduloPermisos?: ModuloPermisoUncheckedCreateNestedManyWithoutModuloInput
  }

  export type ModuloCreateOrConnectWithoutModuloDependenciasInput = {
    where: ModuloWhereUniqueInput
    create: XOR<ModuloCreateWithoutModuloDependenciasInput, ModuloUncheckedCreateWithoutModuloDependenciasInput>
  }

  export type ModuloCreateWithoutDependenciasDeInput = {
    id?: string
    nombre: string
    displayName: string
    version?: string
    activo?: boolean
    dependencias?: ModuloCreatedependenciasInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    empresaModulos?: EmpresaModuloCreateNestedManyWithoutModuloInput
    moduloDependencias?: ModuloDependenciaCreateNestedManyWithoutModuloInput
    modulosRutas?: ModuloRutaCreateNestedManyWithoutModuloInput
    moduloPermisos?: ModuloPermisoCreateNestedManyWithoutModuloInput
  }

  export type ModuloUncheckedCreateWithoutDependenciasDeInput = {
    id?: string
    nombre: string
    displayName: string
    version?: string
    activo?: boolean
    dependencias?: ModuloCreatedependenciasInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    empresaModulos?: EmpresaModuloUncheckedCreateNestedManyWithoutModuloInput
    moduloDependencias?: ModuloDependenciaUncheckedCreateNestedManyWithoutModuloInput
    modulosRutas?: ModuloRutaUncheckedCreateNestedManyWithoutModuloInput
    moduloPermisos?: ModuloPermisoUncheckedCreateNestedManyWithoutModuloInput
  }

  export type ModuloCreateOrConnectWithoutDependenciasDeInput = {
    where: ModuloWhereUniqueInput
    create: XOR<ModuloCreateWithoutDependenciasDeInput, ModuloUncheckedCreateWithoutDependenciasDeInput>
  }

  export type ModuloUpsertWithoutModuloDependenciasInput = {
    update: XOR<ModuloUpdateWithoutModuloDependenciasInput, ModuloUncheckedUpdateWithoutModuloDependenciasInput>
    create: XOR<ModuloCreateWithoutModuloDependenciasInput, ModuloUncheckedCreateWithoutModuloDependenciasInput>
    where?: ModuloWhereInput
  }

  export type ModuloUpdateToOneWithWhereWithoutModuloDependenciasInput = {
    where?: ModuloWhereInput
    data: XOR<ModuloUpdateWithoutModuloDependenciasInput, ModuloUncheckedUpdateWithoutModuloDependenciasInput>
  }

  export type ModuloUpdateWithoutModuloDependenciasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    dependencias?: ModuloUpdatedependenciasInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresaModulos?: EmpresaModuloUpdateManyWithoutModuloNestedInput
    dependenciasDe?: ModuloDependenciaUpdateManyWithoutDependeDeNestedInput
    modulosRutas?: ModuloRutaUpdateManyWithoutModuloNestedInput
    moduloPermisos?: ModuloPermisoUpdateManyWithoutModuloNestedInput
  }

  export type ModuloUncheckedUpdateWithoutModuloDependenciasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    dependencias?: ModuloUpdatedependenciasInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresaModulos?: EmpresaModuloUncheckedUpdateManyWithoutModuloNestedInput
    dependenciasDe?: ModuloDependenciaUncheckedUpdateManyWithoutDependeDeNestedInput
    modulosRutas?: ModuloRutaUncheckedUpdateManyWithoutModuloNestedInput
    moduloPermisos?: ModuloPermisoUncheckedUpdateManyWithoutModuloNestedInput
  }

  export type ModuloUpsertWithoutDependenciasDeInput = {
    update: XOR<ModuloUpdateWithoutDependenciasDeInput, ModuloUncheckedUpdateWithoutDependenciasDeInput>
    create: XOR<ModuloCreateWithoutDependenciasDeInput, ModuloUncheckedCreateWithoutDependenciasDeInput>
    where?: ModuloWhereInput
  }

  export type ModuloUpdateToOneWithWhereWithoutDependenciasDeInput = {
    where?: ModuloWhereInput
    data: XOR<ModuloUpdateWithoutDependenciasDeInput, ModuloUncheckedUpdateWithoutDependenciasDeInput>
  }

  export type ModuloUpdateWithoutDependenciasDeInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    dependencias?: ModuloUpdatedependenciasInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresaModulos?: EmpresaModuloUpdateManyWithoutModuloNestedInput
    moduloDependencias?: ModuloDependenciaUpdateManyWithoutModuloNestedInput
    modulosRutas?: ModuloRutaUpdateManyWithoutModuloNestedInput
    moduloPermisos?: ModuloPermisoUpdateManyWithoutModuloNestedInput
  }

  export type ModuloUncheckedUpdateWithoutDependenciasDeInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    dependencias?: ModuloUpdatedependenciasInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresaModulos?: EmpresaModuloUncheckedUpdateManyWithoutModuloNestedInput
    moduloDependencias?: ModuloDependenciaUncheckedUpdateManyWithoutModuloNestedInput
    modulosRutas?: ModuloRutaUncheckedUpdateManyWithoutModuloNestedInput
    moduloPermisos?: ModuloPermisoUncheckedUpdateManyWithoutModuloNestedInput
  }

  export type UsuarioCreateWithoutRolInput = {
    id?: string
    email: string
    nombre: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    empresa: EmpresaCreateNestedOneWithoutUsuariosInput
  }

  export type UsuarioUncheckedCreateWithoutRolInput = {
    id?: string
    email: string
    nombre: string
    empresaId: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsuarioCreateOrConnectWithoutRolInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutRolInput, UsuarioUncheckedCreateWithoutRolInput>
  }

  export type UsuarioCreateManyRolInputEnvelope = {
    data: UsuarioCreateManyRolInput | UsuarioCreateManyRolInput[]
    skipDuplicates?: boolean
  }

  export type RolPermisoCreateWithoutRolInput = {
    id?: string
    activo?: boolean
    moduloPermiso: ModuloPermisoCreateNestedOneWithoutRolPermisosInput
  }

  export type RolPermisoUncheckedCreateWithoutRolInput = {
    id?: string
    moduloPermisoId: string
    activo?: boolean
  }

  export type RolPermisoCreateOrConnectWithoutRolInput = {
    where: RolPermisoWhereUniqueInput
    create: XOR<RolPermisoCreateWithoutRolInput, RolPermisoUncheckedCreateWithoutRolInput>
  }

  export type RolPermisoCreateManyRolInputEnvelope = {
    data: RolPermisoCreateManyRolInput | RolPermisoCreateManyRolInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioUpsertWithWhereUniqueWithoutRolInput = {
    where: UsuarioWhereUniqueInput
    update: XOR<UsuarioUpdateWithoutRolInput, UsuarioUncheckedUpdateWithoutRolInput>
    create: XOR<UsuarioCreateWithoutRolInput, UsuarioUncheckedCreateWithoutRolInput>
  }

  export type UsuarioUpdateWithWhereUniqueWithoutRolInput = {
    where: UsuarioWhereUniqueInput
    data: XOR<UsuarioUpdateWithoutRolInput, UsuarioUncheckedUpdateWithoutRolInput>
  }

  export type UsuarioUpdateManyWithWhereWithoutRolInput = {
    where: UsuarioScalarWhereInput
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyWithoutRolInput>
  }

  export type RolPermisoUpsertWithWhereUniqueWithoutRolInput = {
    where: RolPermisoWhereUniqueInput
    update: XOR<RolPermisoUpdateWithoutRolInput, RolPermisoUncheckedUpdateWithoutRolInput>
    create: XOR<RolPermisoCreateWithoutRolInput, RolPermisoUncheckedCreateWithoutRolInput>
  }

  export type RolPermisoUpdateWithWhereUniqueWithoutRolInput = {
    where: RolPermisoWhereUniqueInput
    data: XOR<RolPermisoUpdateWithoutRolInput, RolPermisoUncheckedUpdateWithoutRolInput>
  }

  export type RolPermisoUpdateManyWithWhereWithoutRolInput = {
    where: RolPermisoScalarWhereInput
    data: XOR<RolPermisoUpdateManyMutationInput, RolPermisoUncheckedUpdateManyWithoutRolInput>
  }

  export type RolPermisoScalarWhereInput = {
    AND?: RolPermisoScalarWhereInput | RolPermisoScalarWhereInput[]
    OR?: RolPermisoScalarWhereInput[]
    NOT?: RolPermisoScalarWhereInput | RolPermisoScalarWhereInput[]
    id?: StringFilter<"RolPermiso"> | string
    rolId?: StringFilter<"RolPermiso"> | string
    moduloPermisoId?: StringFilter<"RolPermiso"> | string
    activo?: BoolFilter<"RolPermiso"> | boolean
  }

  export type ModuloCreateWithoutModuloPermisosInput = {
    id?: string
    nombre: string
    displayName: string
    version?: string
    activo?: boolean
    dependencias?: ModuloCreatedependenciasInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    empresaModulos?: EmpresaModuloCreateNestedManyWithoutModuloInput
    moduloDependencias?: ModuloDependenciaCreateNestedManyWithoutModuloInput
    dependenciasDe?: ModuloDependenciaCreateNestedManyWithoutDependeDeInput
    modulosRutas?: ModuloRutaCreateNestedManyWithoutModuloInput
  }

  export type ModuloUncheckedCreateWithoutModuloPermisosInput = {
    id?: string
    nombre: string
    displayName: string
    version?: string
    activo?: boolean
    dependencias?: ModuloCreatedependenciasInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    empresaModulos?: EmpresaModuloUncheckedCreateNestedManyWithoutModuloInput
    moduloDependencias?: ModuloDependenciaUncheckedCreateNestedManyWithoutModuloInput
    dependenciasDe?: ModuloDependenciaUncheckedCreateNestedManyWithoutDependeDeInput
    modulosRutas?: ModuloRutaUncheckedCreateNestedManyWithoutModuloInput
  }

  export type ModuloCreateOrConnectWithoutModuloPermisosInput = {
    where: ModuloWhereUniqueInput
    create: XOR<ModuloCreateWithoutModuloPermisosInput, ModuloUncheckedCreateWithoutModuloPermisosInput>
  }

  export type RolPermisoCreateWithoutModuloPermisoInput = {
    id?: string
    activo?: boolean
    rol: RolCreateNestedOneWithoutRolPermisosInput
  }

  export type RolPermisoUncheckedCreateWithoutModuloPermisoInput = {
    id?: string
    rolId: string
    activo?: boolean
  }

  export type RolPermisoCreateOrConnectWithoutModuloPermisoInput = {
    where: RolPermisoWhereUniqueInput
    create: XOR<RolPermisoCreateWithoutModuloPermisoInput, RolPermisoUncheckedCreateWithoutModuloPermisoInput>
  }

  export type RolPermisoCreateManyModuloPermisoInputEnvelope = {
    data: RolPermisoCreateManyModuloPermisoInput | RolPermisoCreateManyModuloPermisoInput[]
    skipDuplicates?: boolean
  }

  export type ModuloUpsertWithoutModuloPermisosInput = {
    update: XOR<ModuloUpdateWithoutModuloPermisosInput, ModuloUncheckedUpdateWithoutModuloPermisosInput>
    create: XOR<ModuloCreateWithoutModuloPermisosInput, ModuloUncheckedCreateWithoutModuloPermisosInput>
    where?: ModuloWhereInput
  }

  export type ModuloUpdateToOneWithWhereWithoutModuloPermisosInput = {
    where?: ModuloWhereInput
    data: XOR<ModuloUpdateWithoutModuloPermisosInput, ModuloUncheckedUpdateWithoutModuloPermisosInput>
  }

  export type ModuloUpdateWithoutModuloPermisosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    dependencias?: ModuloUpdatedependenciasInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresaModulos?: EmpresaModuloUpdateManyWithoutModuloNestedInput
    moduloDependencias?: ModuloDependenciaUpdateManyWithoutModuloNestedInput
    dependenciasDe?: ModuloDependenciaUpdateManyWithoutDependeDeNestedInput
    modulosRutas?: ModuloRutaUpdateManyWithoutModuloNestedInput
  }

  export type ModuloUncheckedUpdateWithoutModuloPermisosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    dependencias?: ModuloUpdatedependenciasInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresaModulos?: EmpresaModuloUncheckedUpdateManyWithoutModuloNestedInput
    moduloDependencias?: ModuloDependenciaUncheckedUpdateManyWithoutModuloNestedInput
    dependenciasDe?: ModuloDependenciaUncheckedUpdateManyWithoutDependeDeNestedInput
    modulosRutas?: ModuloRutaUncheckedUpdateManyWithoutModuloNestedInput
  }

  export type RolPermisoUpsertWithWhereUniqueWithoutModuloPermisoInput = {
    where: RolPermisoWhereUniqueInput
    update: XOR<RolPermisoUpdateWithoutModuloPermisoInput, RolPermisoUncheckedUpdateWithoutModuloPermisoInput>
    create: XOR<RolPermisoCreateWithoutModuloPermisoInput, RolPermisoUncheckedCreateWithoutModuloPermisoInput>
  }

  export type RolPermisoUpdateWithWhereUniqueWithoutModuloPermisoInput = {
    where: RolPermisoWhereUniqueInput
    data: XOR<RolPermisoUpdateWithoutModuloPermisoInput, RolPermisoUncheckedUpdateWithoutModuloPermisoInput>
  }

  export type RolPermisoUpdateManyWithWhereWithoutModuloPermisoInput = {
    where: RolPermisoScalarWhereInput
    data: XOR<RolPermisoUpdateManyMutationInput, RolPermisoUncheckedUpdateManyWithoutModuloPermisoInput>
  }

  export type RolCreateWithoutRolPermisosInput = {
    id?: string
    nombre: string
    empresaId?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    usuarios?: UsuarioCreateNestedManyWithoutRolInput
  }

  export type RolUncheckedCreateWithoutRolPermisosInput = {
    id?: string
    nombre: string
    empresaId?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutRolInput
  }

  export type RolCreateOrConnectWithoutRolPermisosInput = {
    where: RolWhereUniqueInput
    create: XOR<RolCreateWithoutRolPermisosInput, RolUncheckedCreateWithoutRolPermisosInput>
  }

  export type ModuloPermisoCreateWithoutRolPermisosInput = {
    id?: string
    nombre: string
    accion: string
    activo?: boolean
    modulo: ModuloCreateNestedOneWithoutModuloPermisosInput
  }

  export type ModuloPermisoUncheckedCreateWithoutRolPermisosInput = {
    id?: string
    moduloId: string
    nombre: string
    accion: string
    activo?: boolean
  }

  export type ModuloPermisoCreateOrConnectWithoutRolPermisosInput = {
    where: ModuloPermisoWhereUniqueInput
    create: XOR<ModuloPermisoCreateWithoutRolPermisosInput, ModuloPermisoUncheckedCreateWithoutRolPermisosInput>
  }

  export type RolUpsertWithoutRolPermisosInput = {
    update: XOR<RolUpdateWithoutRolPermisosInput, RolUncheckedUpdateWithoutRolPermisosInput>
    create: XOR<RolCreateWithoutRolPermisosInput, RolUncheckedCreateWithoutRolPermisosInput>
    where?: RolWhereInput
  }

  export type RolUpdateToOneWithWhereWithoutRolPermisosInput = {
    where?: RolWhereInput
    data: XOR<RolUpdateWithoutRolPermisosInput, RolUncheckedUpdateWithoutRolPermisosInput>
  }

  export type RolUpdateWithoutRolPermisosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    empresaId?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUpdateManyWithoutRolNestedInput
  }

  export type RolUncheckedUpdateWithoutRolPermisosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    empresaId?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUncheckedUpdateManyWithoutRolNestedInput
  }

  export type ModuloPermisoUpsertWithoutRolPermisosInput = {
    update: XOR<ModuloPermisoUpdateWithoutRolPermisosInput, ModuloPermisoUncheckedUpdateWithoutRolPermisosInput>
    create: XOR<ModuloPermisoCreateWithoutRolPermisosInput, ModuloPermisoUncheckedCreateWithoutRolPermisosInput>
    where?: ModuloPermisoWhereInput
  }

  export type ModuloPermisoUpdateToOneWithWhereWithoutRolPermisosInput = {
    where?: ModuloPermisoWhereInput
    data: XOR<ModuloPermisoUpdateWithoutRolPermisosInput, ModuloPermisoUncheckedUpdateWithoutRolPermisosInput>
  }

  export type ModuloPermisoUpdateWithoutRolPermisosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    accion?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    modulo?: ModuloUpdateOneRequiredWithoutModuloPermisosNestedInput
  }

  export type ModuloPermisoUncheckedUpdateWithoutRolPermisosInput = {
    id?: StringFieldUpdateOperationsInput | string
    moduloId?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    accion?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ModuloCreateWithoutModulosRutasInput = {
    id?: string
    nombre: string
    displayName: string
    version?: string
    activo?: boolean
    dependencias?: ModuloCreatedependenciasInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    empresaModulos?: EmpresaModuloCreateNestedManyWithoutModuloInput
    moduloDependencias?: ModuloDependenciaCreateNestedManyWithoutModuloInput
    dependenciasDe?: ModuloDependenciaCreateNestedManyWithoutDependeDeInput
    moduloPermisos?: ModuloPermisoCreateNestedManyWithoutModuloInput
  }

  export type ModuloUncheckedCreateWithoutModulosRutasInput = {
    id?: string
    nombre: string
    displayName: string
    version?: string
    activo?: boolean
    dependencias?: ModuloCreatedependenciasInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    empresaModulos?: EmpresaModuloUncheckedCreateNestedManyWithoutModuloInput
    moduloDependencias?: ModuloDependenciaUncheckedCreateNestedManyWithoutModuloInput
    dependenciasDe?: ModuloDependenciaUncheckedCreateNestedManyWithoutDependeDeInput
    moduloPermisos?: ModuloPermisoUncheckedCreateNestedManyWithoutModuloInput
  }

  export type ModuloCreateOrConnectWithoutModulosRutasInput = {
    where: ModuloWhereUniqueInput
    create: XOR<ModuloCreateWithoutModulosRutasInput, ModuloUncheckedCreateWithoutModulosRutasInput>
  }

  export type EmpresaCreateWithoutModulosRutasInput = {
    id?: string
    nombre: string
    ruc: string
    plan?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    usuarios?: UsuarioCreateNestedManyWithoutEmpresaInput
    empresaModulos?: EmpresaModuloCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaUncheckedCreateWithoutModulosRutasInput = {
    id?: string
    nombre: string
    ruc: string
    plan?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutEmpresaInput
    empresaModulos?: EmpresaModuloUncheckedCreateNestedManyWithoutEmpresaInput
  }

  export type EmpresaCreateOrConnectWithoutModulosRutasInput = {
    where: EmpresaWhereUniqueInput
    create: XOR<EmpresaCreateWithoutModulosRutasInput, EmpresaUncheckedCreateWithoutModulosRutasInput>
  }

  export type ModuloUpsertWithoutModulosRutasInput = {
    update: XOR<ModuloUpdateWithoutModulosRutasInput, ModuloUncheckedUpdateWithoutModulosRutasInput>
    create: XOR<ModuloCreateWithoutModulosRutasInput, ModuloUncheckedCreateWithoutModulosRutasInput>
    where?: ModuloWhereInput
  }

  export type ModuloUpdateToOneWithWhereWithoutModulosRutasInput = {
    where?: ModuloWhereInput
    data: XOR<ModuloUpdateWithoutModulosRutasInput, ModuloUncheckedUpdateWithoutModulosRutasInput>
  }

  export type ModuloUpdateWithoutModulosRutasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    dependencias?: ModuloUpdatedependenciasInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresaModulos?: EmpresaModuloUpdateManyWithoutModuloNestedInput
    moduloDependencias?: ModuloDependenciaUpdateManyWithoutModuloNestedInput
    dependenciasDe?: ModuloDependenciaUpdateManyWithoutDependeDeNestedInput
    moduloPermisos?: ModuloPermisoUpdateManyWithoutModuloNestedInput
  }

  export type ModuloUncheckedUpdateWithoutModulosRutasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    dependencias?: ModuloUpdatedependenciasInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresaModulos?: EmpresaModuloUncheckedUpdateManyWithoutModuloNestedInput
    moduloDependencias?: ModuloDependenciaUncheckedUpdateManyWithoutModuloNestedInput
    dependenciasDe?: ModuloDependenciaUncheckedUpdateManyWithoutDependeDeNestedInput
    moduloPermisos?: ModuloPermisoUncheckedUpdateManyWithoutModuloNestedInput
  }

  export type EmpresaUpsertWithoutModulosRutasInput = {
    update: XOR<EmpresaUpdateWithoutModulosRutasInput, EmpresaUncheckedUpdateWithoutModulosRutasInput>
    create: XOR<EmpresaCreateWithoutModulosRutasInput, EmpresaUncheckedCreateWithoutModulosRutasInput>
    where?: EmpresaWhereInput
  }

  export type EmpresaUpdateToOneWithWhereWithoutModulosRutasInput = {
    where?: EmpresaWhereInput
    data: XOR<EmpresaUpdateWithoutModulosRutasInput, EmpresaUncheckedUpdateWithoutModulosRutasInput>
  }

  export type EmpresaUpdateWithoutModulosRutasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    ruc?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUpdateManyWithoutEmpresaNestedInput
    empresaModulos?: EmpresaModuloUpdateManyWithoutEmpresaNestedInput
  }

  export type EmpresaUncheckedUpdateWithoutModulosRutasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    ruc?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUncheckedUpdateManyWithoutEmpresaNestedInput
    empresaModulos?: EmpresaModuloUncheckedUpdateManyWithoutEmpresaNestedInput
  }

  export type UsuarioCreateManyEmpresaInput = {
    id?: string
    email: string
    nombre: string
    rolId: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmpresaModuloCreateManyEmpresaInput = {
    id?: string
    moduloId: string
    activo?: boolean
    configuracion?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModuloRutaCreateManyEmpresaInput = {
    id?: string
    moduloId: string
    ruta: string
    metodo?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsuarioUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rol?: RolUpdateOneRequiredWithoutUsuariosNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    rolId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    rolId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmpresaModuloUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    configuracion?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modulo?: ModuloUpdateOneRequiredWithoutEmpresaModulosNestedInput
  }

  export type EmpresaModuloUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    moduloId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    configuracion?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmpresaModuloUncheckedUpdateManyWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    moduloId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    configuracion?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuloRutaUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruta?: StringFieldUpdateOperationsInput | string
    metodo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modulo?: ModuloUpdateOneRequiredWithoutModulosRutasNestedInput
  }

  export type ModuloRutaUncheckedUpdateWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    moduloId?: StringFieldUpdateOperationsInput | string
    ruta?: StringFieldUpdateOperationsInput | string
    metodo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuloRutaUncheckedUpdateManyWithoutEmpresaInput = {
    id?: StringFieldUpdateOperationsInput | string
    moduloId?: StringFieldUpdateOperationsInput | string
    ruta?: StringFieldUpdateOperationsInput | string
    metodo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmpresaModuloCreateManyModuloInput = {
    id?: string
    empresaId: string
    activo?: boolean
    configuracion?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModuloDependenciaCreateManyModuloInput = {
    id?: string
    dependeDeId: string
    requerido?: boolean
    createdAt?: Date | string
  }

  export type ModuloDependenciaCreateManyDependeDeInput = {
    id?: string
    moduloId: string
    requerido?: boolean
    createdAt?: Date | string
  }

  export type ModuloRutaCreateManyModuloInput = {
    id?: string
    empresaId?: string | null
    ruta: string
    metodo?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModuloPermisoCreateManyModuloInput = {
    id?: string
    nombre: string
    accion: string
    activo?: boolean
  }

  export type EmpresaModuloUpdateWithoutModuloInput = {
    id?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    configuracion?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutEmpresaModulosNestedInput
  }

  export type EmpresaModuloUncheckedUpdateWithoutModuloInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    configuracion?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmpresaModuloUncheckedUpdateManyWithoutModuloInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    configuracion?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuloDependenciaUpdateWithoutModuloInput = {
    id?: StringFieldUpdateOperationsInput | string
    requerido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dependeDe?: ModuloUpdateOneRequiredWithoutDependenciasDeNestedInput
  }

  export type ModuloDependenciaUncheckedUpdateWithoutModuloInput = {
    id?: StringFieldUpdateOperationsInput | string
    dependeDeId?: StringFieldUpdateOperationsInput | string
    requerido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuloDependenciaUncheckedUpdateManyWithoutModuloInput = {
    id?: StringFieldUpdateOperationsInput | string
    dependeDeId?: StringFieldUpdateOperationsInput | string
    requerido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuloDependenciaUpdateWithoutDependeDeInput = {
    id?: StringFieldUpdateOperationsInput | string
    requerido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    modulo?: ModuloUpdateOneRequiredWithoutModuloDependenciasNestedInput
  }

  export type ModuloDependenciaUncheckedUpdateWithoutDependeDeInput = {
    id?: StringFieldUpdateOperationsInput | string
    moduloId?: StringFieldUpdateOperationsInput | string
    requerido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuloDependenciaUncheckedUpdateManyWithoutDependeDeInput = {
    id?: StringFieldUpdateOperationsInput | string
    moduloId?: StringFieldUpdateOperationsInput | string
    requerido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuloRutaUpdateWithoutModuloInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruta?: StringFieldUpdateOperationsInput | string
    metodo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneWithoutModulosRutasNestedInput
  }

  export type ModuloRutaUncheckedUpdateWithoutModuloInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: NullableStringFieldUpdateOperationsInput | string | null
    ruta?: StringFieldUpdateOperationsInput | string
    metodo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuloRutaUncheckedUpdateManyWithoutModuloInput = {
    id?: StringFieldUpdateOperationsInput | string
    empresaId?: NullableStringFieldUpdateOperationsInput | string | null
    ruta?: StringFieldUpdateOperationsInput | string
    metodo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuloPermisoUpdateWithoutModuloInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    accion?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    rolPermisos?: RolPermisoUpdateManyWithoutModuloPermisoNestedInput
  }

  export type ModuloPermisoUncheckedUpdateWithoutModuloInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    accion?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    rolPermisos?: RolPermisoUncheckedUpdateManyWithoutModuloPermisoNestedInput
  }

  export type ModuloPermisoUncheckedUpdateManyWithoutModuloInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    accion?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UsuarioCreateManyRolInput = {
    id?: string
    email: string
    nombre: string
    empresaId: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RolPermisoCreateManyRolInput = {
    id?: string
    moduloPermisoId: string
    activo?: boolean
  }

  export type UsuarioUpdateWithoutRolInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    empresa?: EmpresaUpdateOneRequiredWithoutUsuariosNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutRolInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyWithoutRolInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    empresaId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolPermisoUpdateWithoutRolInput = {
    id?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    moduloPermiso?: ModuloPermisoUpdateOneRequiredWithoutRolPermisosNestedInput
  }

  export type RolPermisoUncheckedUpdateWithoutRolInput = {
    id?: StringFieldUpdateOperationsInput | string
    moduloPermisoId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RolPermisoUncheckedUpdateManyWithoutRolInput = {
    id?: StringFieldUpdateOperationsInput | string
    moduloPermisoId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RolPermisoCreateManyModuloPermisoInput = {
    id?: string
    rolId: string
    activo?: boolean
  }

  export type RolPermisoUpdateWithoutModuloPermisoInput = {
    id?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    rol?: RolUpdateOneRequiredWithoutRolPermisosNestedInput
  }

  export type RolPermisoUncheckedUpdateWithoutModuloPermisoInput = {
    id?: StringFieldUpdateOperationsInput | string
    rolId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RolPermisoUncheckedUpdateManyWithoutModuloPermisoInput = {
    id?: StringFieldUpdateOperationsInput | string
    rolId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}