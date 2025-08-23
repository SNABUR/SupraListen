
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Token
 * 
 */
export type Token = $Result.DefaultSelection<Prisma.$TokenPayload>
/**
 * Model Pair
 * 
 */
export type Pair = $Result.DefaultSelection<Prisma.$PairPayload>
/**
 * Model OhlcData
 * 
 */
export type OhlcData = $Result.DefaultSelection<Prisma.$OhlcDataPayload>
/**
 * Model GroupConfiguration
 * 
 */
export type GroupConfiguration = $Result.DefaultSelection<Prisma.$GroupConfigurationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tokens
 * const tokens = await prisma.token.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tokens
   * const tokens = await prisma.token.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.token`: Exposes CRUD operations for the **Token** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.token.findMany()
    * ```
    */
  get token(): Prisma.TokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pair`: Exposes CRUD operations for the **Pair** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pairs
    * const pairs = await prisma.pair.findMany()
    * ```
    */
  get pair(): Prisma.PairDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ohlcData`: Exposes CRUD operations for the **OhlcData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OhlcData
    * const ohlcData = await prisma.ohlcData.findMany()
    * ```
    */
  get ohlcData(): Prisma.OhlcDataDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.groupConfiguration`: Exposes CRUD operations for the **GroupConfiguration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupConfigurations
    * const groupConfigurations = await prisma.groupConfiguration.findMany()
    * ```
    */
  get groupConfiguration(): Prisma.GroupConfigurationDelegate<ExtArgs, ClientOptions>;
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
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    Token: 'Token',
    Pair: 'Pair',
    OhlcData: 'OhlcData',
    GroupConfiguration: 'GroupConfiguration'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    ohlc_db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "token" | "pair" | "ohlcData" | "groupConfiguration"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Token: {
        payload: Prisma.$TokenPayload<ExtArgs>
        fields: Prisma.TokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findFirst: {
            args: Prisma.TokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findMany: {
            args: Prisma.TokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          create: {
            args: Prisma.TokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          createMany: {
            args: Prisma.TokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          delete: {
            args: Prisma.TokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          update: {
            args: Prisma.TokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          deleteMany: {
            args: Prisma.TokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          upsert: {
            args: Prisma.TokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          aggregate: {
            args: Prisma.TokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateToken>
          }
          groupBy: {
            args: Prisma.TokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokenCountArgs<ExtArgs>
            result: $Utils.Optional<TokenCountAggregateOutputType> | number
          }
        }
      }
      Pair: {
        payload: Prisma.$PairPayload<ExtArgs>
        fields: Prisma.PairFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PairFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PairFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>
          }
          findFirst: {
            args: Prisma.PairFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PairFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>
          }
          findMany: {
            args: Prisma.PairFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>[]
          }
          create: {
            args: Prisma.PairCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>
          }
          createMany: {
            args: Prisma.PairCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PairCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>[]
          }
          delete: {
            args: Prisma.PairDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>
          }
          update: {
            args: Prisma.PairUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>
          }
          deleteMany: {
            args: Prisma.PairDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PairUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PairUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>[]
          }
          upsert: {
            args: Prisma.PairUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>
          }
          aggregate: {
            args: Prisma.PairAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePair>
          }
          groupBy: {
            args: Prisma.PairGroupByArgs<ExtArgs>
            result: $Utils.Optional<PairGroupByOutputType>[]
          }
          count: {
            args: Prisma.PairCountArgs<ExtArgs>
            result: $Utils.Optional<PairCountAggregateOutputType> | number
          }
        }
      }
      OhlcData: {
        payload: Prisma.$OhlcDataPayload<ExtArgs>
        fields: Prisma.OhlcDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OhlcDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OhlcDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OhlcDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OhlcDataPayload>
          }
          findFirst: {
            args: Prisma.OhlcDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OhlcDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OhlcDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OhlcDataPayload>
          }
          findMany: {
            args: Prisma.OhlcDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OhlcDataPayload>[]
          }
          create: {
            args: Prisma.OhlcDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OhlcDataPayload>
          }
          createMany: {
            args: Prisma.OhlcDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OhlcDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OhlcDataPayload>[]
          }
          delete: {
            args: Prisma.OhlcDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OhlcDataPayload>
          }
          update: {
            args: Prisma.OhlcDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OhlcDataPayload>
          }
          deleteMany: {
            args: Prisma.OhlcDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OhlcDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OhlcDataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OhlcDataPayload>[]
          }
          upsert: {
            args: Prisma.OhlcDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OhlcDataPayload>
          }
          aggregate: {
            args: Prisma.OhlcDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOhlcData>
          }
          groupBy: {
            args: Prisma.OhlcDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<OhlcDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.OhlcDataCountArgs<ExtArgs>
            result: $Utils.Optional<OhlcDataCountAggregateOutputType> | number
          }
        }
      }
      GroupConfiguration: {
        payload: Prisma.$GroupConfigurationPayload<ExtArgs>
        fields: Prisma.GroupConfigurationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupConfigurationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConfigurationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupConfigurationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConfigurationPayload>
          }
          findFirst: {
            args: Prisma.GroupConfigurationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConfigurationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupConfigurationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConfigurationPayload>
          }
          findMany: {
            args: Prisma.GroupConfigurationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConfigurationPayload>[]
          }
          create: {
            args: Prisma.GroupConfigurationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConfigurationPayload>
          }
          createMany: {
            args: Prisma.GroupConfigurationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupConfigurationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConfigurationPayload>[]
          }
          delete: {
            args: Prisma.GroupConfigurationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConfigurationPayload>
          }
          update: {
            args: Prisma.GroupConfigurationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConfigurationPayload>
          }
          deleteMany: {
            args: Prisma.GroupConfigurationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupConfigurationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupConfigurationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConfigurationPayload>[]
          }
          upsert: {
            args: Prisma.GroupConfigurationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupConfigurationPayload>
          }
          aggregate: {
            args: Prisma.GroupConfigurationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroupConfiguration>
          }
          groupBy: {
            args: Prisma.GroupConfigurationGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupConfigurationGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupConfigurationCountArgs<ExtArgs>
            result: $Utils.Optional<GroupConfigurationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    token?: TokenOmit
    pair?: PairOmit
    ohlcData?: OhlcDataOmit
    groupConfiguration?: GroupConfigurationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

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
   * Count Type TokenCountOutputType
   */

  export type TokenCountOutputType = {
    pairsAsToken0: number
    pairsAsToken1: number
    groupConfigurations: number
  }

  export type TokenCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pairsAsToken0?: boolean | TokenCountOutputTypeCountPairsAsToken0Args
    pairsAsToken1?: boolean | TokenCountOutputTypeCountPairsAsToken1Args
    groupConfigurations?: boolean | TokenCountOutputTypeCountGroupConfigurationsArgs
  }

  // Custom InputTypes
  /**
   * TokenCountOutputType without action
   */
  export type TokenCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenCountOutputType
     */
    select?: TokenCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TokenCountOutputType without action
   */
  export type TokenCountOutputTypeCountPairsAsToken0Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PairWhereInput
  }

  /**
   * TokenCountOutputType without action
   */
  export type TokenCountOutputTypeCountPairsAsToken1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PairWhereInput
  }

  /**
   * TokenCountOutputType without action
   */
  export type TokenCountOutputTypeCountGroupConfigurationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupConfigurationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Token
   */

  export type AggregateToken = {
    _count: TokenCountAggregateOutputType | null
    _avg: TokenAvgAggregateOutputType | null
    _sum: TokenSumAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  export type TokenAvgAggregateOutputType = {
    id: number | null
    decimals: number | null
    maxSupply: number | null
    circulatingSupply: number | null
  }

  export type TokenSumAggregateOutputType = {
    id: number | null
    decimals: number | null
    maxSupply: bigint | null
    circulatingSupply: bigint | null
  }

  export type TokenMinAggregateOutputType = {
    id: number | null
    network: string | null
    address: string | null
    wrappedAddress: string | null
    symbol: string | null
    name: string | null
    decimals: number | null
    maxSupply: bigint | null
    circulatingSupply: bigint | null
    createdAt: Date | null
  }

  export type TokenMaxAggregateOutputType = {
    id: number | null
    network: string | null
    address: string | null
    wrappedAddress: string | null
    symbol: string | null
    name: string | null
    decimals: number | null
    maxSupply: bigint | null
    circulatingSupply: bigint | null
    createdAt: Date | null
  }

  export type TokenCountAggregateOutputType = {
    id: number
    network: number
    address: number
    wrappedAddress: number
    symbol: number
    name: number
    decimals: number
    maxSupply: number
    circulatingSupply: number
    createdAt: number
    _all: number
  }


  export type TokenAvgAggregateInputType = {
    id?: true
    decimals?: true
    maxSupply?: true
    circulatingSupply?: true
  }

  export type TokenSumAggregateInputType = {
    id?: true
    decimals?: true
    maxSupply?: true
    circulatingSupply?: true
  }

  export type TokenMinAggregateInputType = {
    id?: true
    network?: true
    address?: true
    wrappedAddress?: true
    symbol?: true
    name?: true
    decimals?: true
    maxSupply?: true
    circulatingSupply?: true
    createdAt?: true
  }

  export type TokenMaxAggregateInputType = {
    id?: true
    network?: true
    address?: true
    wrappedAddress?: true
    symbol?: true
    name?: true
    decimals?: true
    maxSupply?: true
    circulatingSupply?: true
    createdAt?: true
  }

  export type TokenCountAggregateInputType = {
    id?: true
    network?: true
    address?: true
    wrappedAddress?: true
    symbol?: true
    name?: true
    decimals?: true
    maxSupply?: true
    circulatingSupply?: true
    createdAt?: true
    _all?: true
  }

  export type TokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Token to aggregate.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tokens
    **/
    _count?: true | TokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenMaxAggregateInputType
  }

  export type GetTokenAggregateType<T extends TokenAggregateArgs> = {
        [P in keyof T & keyof AggregateToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToken[P]>
      : GetScalarType<T[P], AggregateToken[P]>
  }




  export type TokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenWhereInput
    orderBy?: TokenOrderByWithAggregationInput | TokenOrderByWithAggregationInput[]
    by: TokenScalarFieldEnum[] | TokenScalarFieldEnum
    having?: TokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenCountAggregateInputType | true
    _avg?: TokenAvgAggregateInputType
    _sum?: TokenSumAggregateInputType
    _min?: TokenMinAggregateInputType
    _max?: TokenMaxAggregateInputType
  }

  export type TokenGroupByOutputType = {
    id: number
    network: string
    address: string
    wrappedAddress: string | null
    symbol: string
    name: string
    decimals: number
    maxSupply: bigint | null
    circulatingSupply: bigint | null
    createdAt: Date
    _count: TokenCountAggregateOutputType | null
    _avg: TokenAvgAggregateOutputType | null
    _sum: TokenSumAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  type GetTokenGroupByPayload<T extends TokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenGroupByOutputType[P]>
            : GetScalarType<T[P], TokenGroupByOutputType[P]>
        }
      >
    >


  export type TokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    network?: boolean
    address?: boolean
    wrappedAddress?: boolean
    symbol?: boolean
    name?: boolean
    decimals?: boolean
    maxSupply?: boolean
    circulatingSupply?: boolean
    createdAt?: boolean
    pairsAsToken0?: boolean | Token$pairsAsToken0Args<ExtArgs>
    pairsAsToken1?: boolean | Token$pairsAsToken1Args<ExtArgs>
    groupConfigurations?: boolean | Token$groupConfigurationsArgs<ExtArgs>
    _count?: boolean | TokenCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["token"]>

  export type TokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    network?: boolean
    address?: boolean
    wrappedAddress?: boolean
    symbol?: boolean
    name?: boolean
    decimals?: boolean
    maxSupply?: boolean
    circulatingSupply?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["token"]>

  export type TokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    network?: boolean
    address?: boolean
    wrappedAddress?: boolean
    symbol?: boolean
    name?: boolean
    decimals?: boolean
    maxSupply?: boolean
    circulatingSupply?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["token"]>

  export type TokenSelectScalar = {
    id?: boolean
    network?: boolean
    address?: boolean
    wrappedAddress?: boolean
    symbol?: boolean
    name?: boolean
    decimals?: boolean
    maxSupply?: boolean
    circulatingSupply?: boolean
    createdAt?: boolean
  }

  export type TokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "network" | "address" | "wrappedAddress" | "symbol" | "name" | "decimals" | "maxSupply" | "circulatingSupply" | "createdAt", ExtArgs["result"]["token"]>
  export type TokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pairsAsToken0?: boolean | Token$pairsAsToken0Args<ExtArgs>
    pairsAsToken1?: boolean | Token$pairsAsToken1Args<ExtArgs>
    groupConfigurations?: boolean | Token$groupConfigurationsArgs<ExtArgs>
    _count?: boolean | TokenCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Token"
    objects: {
      pairsAsToken0: Prisma.$PairPayload<ExtArgs>[]
      pairsAsToken1: Prisma.$PairPayload<ExtArgs>[]
      groupConfigurations: Prisma.$GroupConfigurationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      network: string
      address: string
      wrappedAddress: string | null
      symbol: string
      name: string
      decimals: number
      maxSupply: bigint | null
      circulatingSupply: bigint | null
      createdAt: Date
    }, ExtArgs["result"]["token"]>
    composites: {}
  }

  type TokenGetPayload<S extends boolean | null | undefined | TokenDefaultArgs> = $Result.GetResult<Prisma.$TokenPayload, S>

  type TokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TokenCountAggregateInputType | true
    }

  export interface TokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Token'], meta: { name: 'Token' } }
    /**
     * Find zero or one Token that matches the filter.
     * @param {TokenFindUniqueArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenFindUniqueArgs>(args: SelectSubset<T, TokenFindUniqueArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Token that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TokenFindUniqueOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Token that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenFindFirstArgs>(args?: SelectSubset<T, TokenFindFirstArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Token that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tokens
     * const tokens = await prisma.token.findMany()
     * 
     * // Get first 10 Tokens
     * const tokens = await prisma.token.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenWithIdOnly = await prisma.token.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokenFindManyArgs>(args?: SelectSubset<T, TokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Token.
     * @param {TokenCreateArgs} args - Arguments to create a Token.
     * @example
     * // Create one Token
     * const Token = await prisma.token.create({
     *   data: {
     *     // ... data to create a Token
     *   }
     * })
     * 
     */
    create<T extends TokenCreateArgs>(args: SelectSubset<T, TokenCreateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tokens.
     * @param {TokenCreateManyArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenCreateManyArgs>(args?: SelectSubset<T, TokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tokens and returns the data saved in the database.
     * @param {TokenCreateManyAndReturnArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tokens and only return the `id`
     * const tokenWithIdOnly = await prisma.token.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TokenCreateManyAndReturnArgs>(args?: SelectSubset<T, TokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Token.
     * @param {TokenDeleteArgs} args - Arguments to delete one Token.
     * @example
     * // Delete one Token
     * const Token = await prisma.token.delete({
     *   where: {
     *     // ... filter to delete one Token
     *   }
     * })
     * 
     */
    delete<T extends TokenDeleteArgs>(args: SelectSubset<T, TokenDeleteArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Token.
     * @param {TokenUpdateArgs} args - Arguments to update one Token.
     * @example
     * // Update one Token
     * const token = await prisma.token.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenUpdateArgs>(args: SelectSubset<T, TokenUpdateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tokens.
     * @param {TokenDeleteManyArgs} args - Arguments to filter Tokens to delete.
     * @example
     * // Delete a few Tokens
     * const { count } = await prisma.token.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenDeleteManyArgs>(args?: SelectSubset<T, TokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenUpdateManyArgs>(args: SelectSubset<T, TokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens and returns the data updated in the database.
     * @param {TokenUpdateManyAndReturnArgs} args - Arguments to update many Tokens.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tokens and only return the `id`
     * const tokenWithIdOnly = await prisma.token.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends TokenUpdateManyAndReturnArgs>(args: SelectSubset<T, TokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Token.
     * @param {TokenUpsertArgs} args - Arguments to update or create a Token.
     * @example
     * // Update or create a Token
     * const token = await prisma.token.upsert({
     *   create: {
     *     // ... data to create a Token
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Token we want to update
     *   }
     * })
     */
    upsert<T extends TokenUpsertArgs>(args: SelectSubset<T, TokenUpsertArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenCountArgs} args - Arguments to filter Tokens to count.
     * @example
     * // Count the number of Tokens
     * const count = await prisma.token.count({
     *   where: {
     *     // ... the filter for the Tokens we want to count
     *   }
     * })
    **/
    count<T extends TokenCountArgs>(
      args?: Subset<T, TokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TokenAggregateArgs>(args: Subset<T, TokenAggregateArgs>): Prisma.PrismaPromise<GetTokenAggregateType<T>>

    /**
     * Group by Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenGroupByArgs} args - Group by arguments.
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
      T extends TokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenGroupByArgs['orderBy'] }
        : { orderBy?: TokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Token model
   */
  readonly fields: TokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Token.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pairsAsToken0<T extends Token$pairsAsToken0Args<ExtArgs> = {}>(args?: Subset<T, Token$pairsAsToken0Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pairsAsToken1<T extends Token$pairsAsToken1Args<ExtArgs> = {}>(args?: Subset<T, Token$pairsAsToken1Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    groupConfigurations<T extends Token$groupConfigurationsArgs<ExtArgs> = {}>(args?: Subset<T, Token$groupConfigurationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupConfigurationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Token model
   */
  interface TokenFieldRefs {
    readonly id: FieldRef<"Token", 'Int'>
    readonly network: FieldRef<"Token", 'String'>
    readonly address: FieldRef<"Token", 'String'>
    readonly wrappedAddress: FieldRef<"Token", 'String'>
    readonly symbol: FieldRef<"Token", 'String'>
    readonly name: FieldRef<"Token", 'String'>
    readonly decimals: FieldRef<"Token", 'Int'>
    readonly maxSupply: FieldRef<"Token", 'BigInt'>
    readonly circulatingSupply: FieldRef<"Token", 'BigInt'>
    readonly createdAt: FieldRef<"Token", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Token findUnique
   */
  export type TokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findUniqueOrThrow
   */
  export type TokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findFirst
   */
  export type TokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findFirstOrThrow
   */
  export type TokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findMany
   */
  export type TokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token create
   */
  export type TokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The data needed to create a Token.
     */
    data: XOR<TokenCreateInput, TokenUncheckedCreateInput>
  }

  /**
   * Token createMany
   */
  export type TokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Token createManyAndReturn
   */
  export type TokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Token update
   */
  export type TokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The data needed to update a Token.
     */
    data: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
    /**
     * Choose, which Token to update.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token updateMany
   */
  export type TokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to update.
     */
    limit?: number
  }

  /**
   * Token updateManyAndReturn
   */
  export type TokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to update.
     */
    limit?: number
  }

  /**
   * Token upsert
   */
  export type TokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The filter to search for the Token to update in case it exists.
     */
    where: TokenWhereUniqueInput
    /**
     * In case the Token found by the `where` argument doesn't exist, create a new Token with this data.
     */
    create: XOR<TokenCreateInput, TokenUncheckedCreateInput>
    /**
     * In case the Token was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
  }

  /**
   * Token delete
   */
  export type TokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter which Token to delete.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token deleteMany
   */
  export type TokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tokens to delete
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to delete.
     */
    limit?: number
  }

  /**
   * Token.pairsAsToken0
   */
  export type Token$pairsAsToken0Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    where?: PairWhereInput
    orderBy?: PairOrderByWithRelationInput | PairOrderByWithRelationInput[]
    cursor?: PairWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PairScalarFieldEnum | PairScalarFieldEnum[]
  }

  /**
   * Token.pairsAsToken1
   */
  export type Token$pairsAsToken1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    where?: PairWhereInput
    orderBy?: PairOrderByWithRelationInput | PairOrderByWithRelationInput[]
    cursor?: PairWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PairScalarFieldEnum | PairScalarFieldEnum[]
  }

  /**
   * Token.groupConfigurations
   */
  export type Token$groupConfigurationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConfiguration
     */
    select?: GroupConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConfiguration
     */
    omit?: GroupConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConfigurationInclude<ExtArgs> | null
    where?: GroupConfigurationWhereInput
    orderBy?: GroupConfigurationOrderByWithRelationInput | GroupConfigurationOrderByWithRelationInput[]
    cursor?: GroupConfigurationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupConfigurationScalarFieldEnum | GroupConfigurationScalarFieldEnum[]
  }

  /**
   * Token without action
   */
  export type TokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
  }


  /**
   * Model Pair
   */

  export type AggregatePair = {
    _count: PairCountAggregateOutputType | null
    _avg: PairAvgAggregateOutputType | null
    _sum: PairSumAggregateOutputType | null
    _min: PairMinAggregateOutputType | null
    _max: PairMaxAggregateOutputType | null
  }

  export type PairAvgAggregateOutputType = {
    id: number | null
    token0Id: number | null
    token1Id: number | null
    spikeyAmmReserve0: number | null
    spikeyAmmReserve1: number | null
  }

  export type PairSumAggregateOutputType = {
    id: number | null
    token0Id: number | null
    token1Id: number | null
    spikeyAmmReserve0: bigint | null
    spikeyAmmReserve1: bigint | null
  }

  export type PairMinAggregateOutputType = {
    id: number | null
    network: string | null
    token0Id: number | null
    token1Id: number | null
    spikeyAmmPairAddress: string | null
    spikeyAmmReserve0: bigint | null
    spikeyAmmReserve1: bigint | null
    lastStatsUpdate: Date | null
    createdAt: Date | null
  }

  export type PairMaxAggregateOutputType = {
    id: number | null
    network: string | null
    token0Id: number | null
    token1Id: number | null
    spikeyAmmPairAddress: string | null
    spikeyAmmReserve0: bigint | null
    spikeyAmmReserve1: bigint | null
    lastStatsUpdate: Date | null
    createdAt: Date | null
  }

  export type PairCountAggregateOutputType = {
    id: number
    network: number
    token0Id: number
    token1Id: number
    spikeyAmmPairAddress: number
    spikeyAmmReserve0: number
    spikeyAmmReserve1: number
    lastStatsUpdate: number
    createdAt: number
    _all: number
  }


  export type PairAvgAggregateInputType = {
    id?: true
    token0Id?: true
    token1Id?: true
    spikeyAmmReserve0?: true
    spikeyAmmReserve1?: true
  }

  export type PairSumAggregateInputType = {
    id?: true
    token0Id?: true
    token1Id?: true
    spikeyAmmReserve0?: true
    spikeyAmmReserve1?: true
  }

  export type PairMinAggregateInputType = {
    id?: true
    network?: true
    token0Id?: true
    token1Id?: true
    spikeyAmmPairAddress?: true
    spikeyAmmReserve0?: true
    spikeyAmmReserve1?: true
    lastStatsUpdate?: true
    createdAt?: true
  }

  export type PairMaxAggregateInputType = {
    id?: true
    network?: true
    token0Id?: true
    token1Id?: true
    spikeyAmmPairAddress?: true
    spikeyAmmReserve0?: true
    spikeyAmmReserve1?: true
    lastStatsUpdate?: true
    createdAt?: true
  }

  export type PairCountAggregateInputType = {
    id?: true
    network?: true
    token0Id?: true
    token1Id?: true
    spikeyAmmPairAddress?: true
    spikeyAmmReserve0?: true
    spikeyAmmReserve1?: true
    lastStatsUpdate?: true
    createdAt?: true
    _all?: true
  }

  export type PairAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pair to aggregate.
     */
    where?: PairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pairs to fetch.
     */
    orderBy?: PairOrderByWithRelationInput | PairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pairs
    **/
    _count?: true | PairCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PairAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PairSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PairMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PairMaxAggregateInputType
  }

  export type GetPairAggregateType<T extends PairAggregateArgs> = {
        [P in keyof T & keyof AggregatePair]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePair[P]>
      : GetScalarType<T[P], AggregatePair[P]>
  }




  export type PairGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PairWhereInput
    orderBy?: PairOrderByWithAggregationInput | PairOrderByWithAggregationInput[]
    by: PairScalarFieldEnum[] | PairScalarFieldEnum
    having?: PairScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PairCountAggregateInputType | true
    _avg?: PairAvgAggregateInputType
    _sum?: PairSumAggregateInputType
    _min?: PairMinAggregateInputType
    _max?: PairMaxAggregateInputType
  }

  export type PairGroupByOutputType = {
    id: number
    network: string
    token0Id: number
    token1Id: number
    spikeyAmmPairAddress: string | null
    spikeyAmmReserve0: bigint | null
    spikeyAmmReserve1: bigint | null
    lastStatsUpdate: Date | null
    createdAt: Date
    _count: PairCountAggregateOutputType | null
    _avg: PairAvgAggregateOutputType | null
    _sum: PairSumAggregateOutputType | null
    _min: PairMinAggregateOutputType | null
    _max: PairMaxAggregateOutputType | null
  }

  type GetPairGroupByPayload<T extends PairGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PairGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PairGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PairGroupByOutputType[P]>
            : GetScalarType<T[P], PairGroupByOutputType[P]>
        }
      >
    >


  export type PairSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    network?: boolean
    token0Id?: boolean
    token1Id?: boolean
    spikeyAmmPairAddress?: boolean
    spikeyAmmReserve0?: boolean
    spikeyAmmReserve1?: boolean
    lastStatsUpdate?: boolean
    createdAt?: boolean
    token0?: boolean | TokenDefaultArgs<ExtArgs>
    token1?: boolean | TokenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pair"]>

  export type PairSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    network?: boolean
    token0Id?: boolean
    token1Id?: boolean
    spikeyAmmPairAddress?: boolean
    spikeyAmmReserve0?: boolean
    spikeyAmmReserve1?: boolean
    lastStatsUpdate?: boolean
    createdAt?: boolean
    token0?: boolean | TokenDefaultArgs<ExtArgs>
    token1?: boolean | TokenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pair"]>

  export type PairSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    network?: boolean
    token0Id?: boolean
    token1Id?: boolean
    spikeyAmmPairAddress?: boolean
    spikeyAmmReserve0?: boolean
    spikeyAmmReserve1?: boolean
    lastStatsUpdate?: boolean
    createdAt?: boolean
    token0?: boolean | TokenDefaultArgs<ExtArgs>
    token1?: boolean | TokenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pair"]>

  export type PairSelectScalar = {
    id?: boolean
    network?: boolean
    token0Id?: boolean
    token1Id?: boolean
    spikeyAmmPairAddress?: boolean
    spikeyAmmReserve0?: boolean
    spikeyAmmReserve1?: boolean
    lastStatsUpdate?: boolean
    createdAt?: boolean
  }

  export type PairOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "network" | "token0Id" | "token1Id" | "spikeyAmmPairAddress" | "spikeyAmmReserve0" | "spikeyAmmReserve1" | "lastStatsUpdate" | "createdAt", ExtArgs["result"]["pair"]>
  export type PairInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    token0?: boolean | TokenDefaultArgs<ExtArgs>
    token1?: boolean | TokenDefaultArgs<ExtArgs>
  }
  export type PairIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    token0?: boolean | TokenDefaultArgs<ExtArgs>
    token1?: boolean | TokenDefaultArgs<ExtArgs>
  }
  export type PairIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    token0?: boolean | TokenDefaultArgs<ExtArgs>
    token1?: boolean | TokenDefaultArgs<ExtArgs>
  }

  export type $PairPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pair"
    objects: {
      token0: Prisma.$TokenPayload<ExtArgs>
      token1: Prisma.$TokenPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      network: string
      token0Id: number
      token1Id: number
      spikeyAmmPairAddress: string | null
      spikeyAmmReserve0: bigint | null
      spikeyAmmReserve1: bigint | null
      lastStatsUpdate: Date | null
      createdAt: Date
    }, ExtArgs["result"]["pair"]>
    composites: {}
  }

  type PairGetPayload<S extends boolean | null | undefined | PairDefaultArgs> = $Result.GetResult<Prisma.$PairPayload, S>

  type PairCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PairFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PairCountAggregateInputType | true
    }

  export interface PairDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pair'], meta: { name: 'Pair' } }
    /**
     * Find zero or one Pair that matches the filter.
     * @param {PairFindUniqueArgs} args - Arguments to find a Pair
     * @example
     * // Get one Pair
     * const pair = await prisma.pair.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PairFindUniqueArgs>(args: SelectSubset<T, PairFindUniqueArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pair that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PairFindUniqueOrThrowArgs} args - Arguments to find a Pair
     * @example
     * // Get one Pair
     * const pair = await prisma.pair.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PairFindUniqueOrThrowArgs>(args: SelectSubset<T, PairFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pair that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairFindFirstArgs} args - Arguments to find a Pair
     * @example
     * // Get one Pair
     * const pair = await prisma.pair.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PairFindFirstArgs>(args?: SelectSubset<T, PairFindFirstArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pair that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairFindFirstOrThrowArgs} args - Arguments to find a Pair
     * @example
     * // Get one Pair
     * const pair = await prisma.pair.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PairFindFirstOrThrowArgs>(args?: SelectSubset<T, PairFindFirstOrThrowArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pairs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pairs
     * const pairs = await prisma.pair.findMany()
     * 
     * // Get first 10 Pairs
     * const pairs = await prisma.pair.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pairWithIdOnly = await prisma.pair.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PairFindManyArgs>(args?: SelectSubset<T, PairFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pair.
     * @param {PairCreateArgs} args - Arguments to create a Pair.
     * @example
     * // Create one Pair
     * const Pair = await prisma.pair.create({
     *   data: {
     *     // ... data to create a Pair
     *   }
     * })
     * 
     */
    create<T extends PairCreateArgs>(args: SelectSubset<T, PairCreateArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pairs.
     * @param {PairCreateManyArgs} args - Arguments to create many Pairs.
     * @example
     * // Create many Pairs
     * const pair = await prisma.pair.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PairCreateManyArgs>(args?: SelectSubset<T, PairCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pairs and returns the data saved in the database.
     * @param {PairCreateManyAndReturnArgs} args - Arguments to create many Pairs.
     * @example
     * // Create many Pairs
     * const pair = await prisma.pair.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pairs and only return the `id`
     * const pairWithIdOnly = await prisma.pair.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PairCreateManyAndReturnArgs>(args?: SelectSubset<T, PairCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pair.
     * @param {PairDeleteArgs} args - Arguments to delete one Pair.
     * @example
     * // Delete one Pair
     * const Pair = await prisma.pair.delete({
     *   where: {
     *     // ... filter to delete one Pair
     *   }
     * })
     * 
     */
    delete<T extends PairDeleteArgs>(args: SelectSubset<T, PairDeleteArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pair.
     * @param {PairUpdateArgs} args - Arguments to update one Pair.
     * @example
     * // Update one Pair
     * const pair = await prisma.pair.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PairUpdateArgs>(args: SelectSubset<T, PairUpdateArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pairs.
     * @param {PairDeleteManyArgs} args - Arguments to filter Pairs to delete.
     * @example
     * // Delete a few Pairs
     * const { count } = await prisma.pair.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PairDeleteManyArgs>(args?: SelectSubset<T, PairDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pairs
     * const pair = await prisma.pair.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PairUpdateManyArgs>(args: SelectSubset<T, PairUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pairs and returns the data updated in the database.
     * @param {PairUpdateManyAndReturnArgs} args - Arguments to update many Pairs.
     * @example
     * // Update many Pairs
     * const pair = await prisma.pair.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pairs and only return the `id`
     * const pairWithIdOnly = await prisma.pair.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends PairUpdateManyAndReturnArgs>(args: SelectSubset<T, PairUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pair.
     * @param {PairUpsertArgs} args - Arguments to update or create a Pair.
     * @example
     * // Update or create a Pair
     * const pair = await prisma.pair.upsert({
     *   create: {
     *     // ... data to create a Pair
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pair we want to update
     *   }
     * })
     */
    upsert<T extends PairUpsertArgs>(args: SelectSubset<T, PairUpsertArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairCountArgs} args - Arguments to filter Pairs to count.
     * @example
     * // Count the number of Pairs
     * const count = await prisma.pair.count({
     *   where: {
     *     // ... the filter for the Pairs we want to count
     *   }
     * })
    **/
    count<T extends PairCountArgs>(
      args?: Subset<T, PairCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PairCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pair.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PairAggregateArgs>(args: Subset<T, PairAggregateArgs>): Prisma.PrismaPromise<GetPairAggregateType<T>>

    /**
     * Group by Pair.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairGroupByArgs} args - Group by arguments.
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
      T extends PairGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PairGroupByArgs['orderBy'] }
        : { orderBy?: PairGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PairGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPairGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pair model
   */
  readonly fields: PairFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pair.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PairClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    token0<T extends TokenDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TokenDefaultArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    token1<T extends TokenDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TokenDefaultArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pair model
   */
  interface PairFieldRefs {
    readonly id: FieldRef<"Pair", 'Int'>
    readonly network: FieldRef<"Pair", 'String'>
    readonly token0Id: FieldRef<"Pair", 'Int'>
    readonly token1Id: FieldRef<"Pair", 'Int'>
    readonly spikeyAmmPairAddress: FieldRef<"Pair", 'String'>
    readonly spikeyAmmReserve0: FieldRef<"Pair", 'BigInt'>
    readonly spikeyAmmReserve1: FieldRef<"Pair", 'BigInt'>
    readonly lastStatsUpdate: FieldRef<"Pair", 'DateTime'>
    readonly createdAt: FieldRef<"Pair", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pair findUnique
   */
  export type PairFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * Filter, which Pair to fetch.
     */
    where: PairWhereUniqueInput
  }

  /**
   * Pair findUniqueOrThrow
   */
  export type PairFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * Filter, which Pair to fetch.
     */
    where: PairWhereUniqueInput
  }

  /**
   * Pair findFirst
   */
  export type PairFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * Filter, which Pair to fetch.
     */
    where?: PairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pairs to fetch.
     */
    orderBy?: PairOrderByWithRelationInput | PairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pairs.
     */
    cursor?: PairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pairs.
     */
    distinct?: PairScalarFieldEnum | PairScalarFieldEnum[]
  }

  /**
   * Pair findFirstOrThrow
   */
  export type PairFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * Filter, which Pair to fetch.
     */
    where?: PairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pairs to fetch.
     */
    orderBy?: PairOrderByWithRelationInput | PairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pairs.
     */
    cursor?: PairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pairs.
     */
    distinct?: PairScalarFieldEnum | PairScalarFieldEnum[]
  }

  /**
   * Pair findMany
   */
  export type PairFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * Filter, which Pairs to fetch.
     */
    where?: PairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pairs to fetch.
     */
    orderBy?: PairOrderByWithRelationInput | PairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pairs.
     */
    cursor?: PairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pairs.
     */
    skip?: number
    distinct?: PairScalarFieldEnum | PairScalarFieldEnum[]
  }

  /**
   * Pair create
   */
  export type PairCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * The data needed to create a Pair.
     */
    data: XOR<PairCreateInput, PairUncheckedCreateInput>
  }

  /**
   * Pair createMany
   */
  export type PairCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pairs.
     */
    data: PairCreateManyInput | PairCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pair createManyAndReturn
   */
  export type PairCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * The data used to create many Pairs.
     */
    data: PairCreateManyInput | PairCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pair update
   */
  export type PairUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * The data needed to update a Pair.
     */
    data: XOR<PairUpdateInput, PairUncheckedUpdateInput>
    /**
     * Choose, which Pair to update.
     */
    where: PairWhereUniqueInput
  }

  /**
   * Pair updateMany
   */
  export type PairUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pairs.
     */
    data: XOR<PairUpdateManyMutationInput, PairUncheckedUpdateManyInput>
    /**
     * Filter which Pairs to update
     */
    where?: PairWhereInput
    /**
     * Limit how many Pairs to update.
     */
    limit?: number
  }

  /**
   * Pair updateManyAndReturn
   */
  export type PairUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * The data used to update Pairs.
     */
    data: XOR<PairUpdateManyMutationInput, PairUncheckedUpdateManyInput>
    /**
     * Filter which Pairs to update
     */
    where?: PairWhereInput
    /**
     * Limit how many Pairs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pair upsert
   */
  export type PairUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * The filter to search for the Pair to update in case it exists.
     */
    where: PairWhereUniqueInput
    /**
     * In case the Pair found by the `where` argument doesn't exist, create a new Pair with this data.
     */
    create: XOR<PairCreateInput, PairUncheckedCreateInput>
    /**
     * In case the Pair was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PairUpdateInput, PairUncheckedUpdateInput>
  }

  /**
   * Pair delete
   */
  export type PairDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * Filter which Pair to delete.
     */
    where: PairWhereUniqueInput
  }

  /**
   * Pair deleteMany
   */
  export type PairDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pairs to delete
     */
    where?: PairWhereInput
    /**
     * Limit how many Pairs to delete.
     */
    limit?: number
  }

  /**
   * Pair without action
   */
  export type PairDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
  }


  /**
   * Model OhlcData
   */

  export type AggregateOhlcData = {
    _count: OhlcDataCountAggregateOutputType | null
    _avg: OhlcDataAvgAggregateOutputType | null
    _sum: OhlcDataSumAggregateOutputType | null
    _min: OhlcDataMinAggregateOutputType | null
    _max: OhlcDataMaxAggregateOutputType | null
  }

  export type OhlcDataAvgAggregateOutputType = {
    id: number | null
    open: Decimal | null
    high: Decimal | null
    low: Decimal | null
    close: Decimal | null
    volume: Decimal | null
    tradeCount: number | null
  }

  export type OhlcDataSumAggregateOutputType = {
    id: number | null
    open: Decimal | null
    high: Decimal | null
    low: Decimal | null
    close: Decimal | null
    volume: Decimal | null
    tradeCount: number | null
  }

  export type OhlcDataMinAggregateOutputType = {
    id: number | null
    network: string | null
    ammSource: string | null
    timeframe: string | null
    timestamp: Date | null
    open: Decimal | null
    high: Decimal | null
    low: Decimal | null
    close: Decimal | null
    volume: Decimal | null
    tradeCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    token0Address: string | null
    token1Address: string | null
  }

  export type OhlcDataMaxAggregateOutputType = {
    id: number | null
    network: string | null
    ammSource: string | null
    timeframe: string | null
    timestamp: Date | null
    open: Decimal | null
    high: Decimal | null
    low: Decimal | null
    close: Decimal | null
    volume: Decimal | null
    tradeCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    token0Address: string | null
    token1Address: string | null
  }

  export type OhlcDataCountAggregateOutputType = {
    id: number
    network: number
    ammSource: number
    timeframe: number
    timestamp: number
    open: number
    high: number
    low: number
    close: number
    volume: number
    tradeCount: number
    createdAt: number
    updatedAt: number
    token0Address: number
    token1Address: number
    _all: number
  }


  export type OhlcDataAvgAggregateInputType = {
    id?: true
    open?: true
    high?: true
    low?: true
    close?: true
    volume?: true
    tradeCount?: true
  }

  export type OhlcDataSumAggregateInputType = {
    id?: true
    open?: true
    high?: true
    low?: true
    close?: true
    volume?: true
    tradeCount?: true
  }

  export type OhlcDataMinAggregateInputType = {
    id?: true
    network?: true
    ammSource?: true
    timeframe?: true
    timestamp?: true
    open?: true
    high?: true
    low?: true
    close?: true
    volume?: true
    tradeCount?: true
    createdAt?: true
    updatedAt?: true
    token0Address?: true
    token1Address?: true
  }

  export type OhlcDataMaxAggregateInputType = {
    id?: true
    network?: true
    ammSource?: true
    timeframe?: true
    timestamp?: true
    open?: true
    high?: true
    low?: true
    close?: true
    volume?: true
    tradeCount?: true
    createdAt?: true
    updatedAt?: true
    token0Address?: true
    token1Address?: true
  }

  export type OhlcDataCountAggregateInputType = {
    id?: true
    network?: true
    ammSource?: true
    timeframe?: true
    timestamp?: true
    open?: true
    high?: true
    low?: true
    close?: true
    volume?: true
    tradeCount?: true
    createdAt?: true
    updatedAt?: true
    token0Address?: true
    token1Address?: true
    _all?: true
  }

  export type OhlcDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OhlcData to aggregate.
     */
    where?: OhlcDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OhlcData to fetch.
     */
    orderBy?: OhlcDataOrderByWithRelationInput | OhlcDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OhlcDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OhlcData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OhlcData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OhlcData
    **/
    _count?: true | OhlcDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OhlcDataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OhlcDataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OhlcDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OhlcDataMaxAggregateInputType
  }

  export type GetOhlcDataAggregateType<T extends OhlcDataAggregateArgs> = {
        [P in keyof T & keyof AggregateOhlcData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOhlcData[P]>
      : GetScalarType<T[P], AggregateOhlcData[P]>
  }




  export type OhlcDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OhlcDataWhereInput
    orderBy?: OhlcDataOrderByWithAggregationInput | OhlcDataOrderByWithAggregationInput[]
    by: OhlcDataScalarFieldEnum[] | OhlcDataScalarFieldEnum
    having?: OhlcDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OhlcDataCountAggregateInputType | true
    _avg?: OhlcDataAvgAggregateInputType
    _sum?: OhlcDataSumAggregateInputType
    _min?: OhlcDataMinAggregateInputType
    _max?: OhlcDataMaxAggregateInputType
  }

  export type OhlcDataGroupByOutputType = {
    id: number
    network: string
    ammSource: string
    timeframe: string
    timestamp: Date
    open: Decimal
    high: Decimal
    low: Decimal
    close: Decimal
    volume: Decimal
    tradeCount: number
    createdAt: Date
    updatedAt: Date
    token0Address: string
    token1Address: string
    _count: OhlcDataCountAggregateOutputType | null
    _avg: OhlcDataAvgAggregateOutputType | null
    _sum: OhlcDataSumAggregateOutputType | null
    _min: OhlcDataMinAggregateOutputType | null
    _max: OhlcDataMaxAggregateOutputType | null
  }

  type GetOhlcDataGroupByPayload<T extends OhlcDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OhlcDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OhlcDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OhlcDataGroupByOutputType[P]>
            : GetScalarType<T[P], OhlcDataGroupByOutputType[P]>
        }
      >
    >


  export type OhlcDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    network?: boolean
    ammSource?: boolean
    timeframe?: boolean
    timestamp?: boolean
    open?: boolean
    high?: boolean
    low?: boolean
    close?: boolean
    volume?: boolean
    tradeCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    token0Address?: boolean
    token1Address?: boolean
  }, ExtArgs["result"]["ohlcData"]>

  export type OhlcDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    network?: boolean
    ammSource?: boolean
    timeframe?: boolean
    timestamp?: boolean
    open?: boolean
    high?: boolean
    low?: boolean
    close?: boolean
    volume?: boolean
    tradeCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    token0Address?: boolean
    token1Address?: boolean
  }, ExtArgs["result"]["ohlcData"]>

  export type OhlcDataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    network?: boolean
    ammSource?: boolean
    timeframe?: boolean
    timestamp?: boolean
    open?: boolean
    high?: boolean
    low?: boolean
    close?: boolean
    volume?: boolean
    tradeCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    token0Address?: boolean
    token1Address?: boolean
  }, ExtArgs["result"]["ohlcData"]>

  export type OhlcDataSelectScalar = {
    id?: boolean
    network?: boolean
    ammSource?: boolean
    timeframe?: boolean
    timestamp?: boolean
    open?: boolean
    high?: boolean
    low?: boolean
    close?: boolean
    volume?: boolean
    tradeCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    token0Address?: boolean
    token1Address?: boolean
  }

  export type OhlcDataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "network" | "ammSource" | "timeframe" | "timestamp" | "open" | "high" | "low" | "close" | "volume" | "tradeCount" | "createdAt" | "updatedAt" | "token0Address" | "token1Address", ExtArgs["result"]["ohlcData"]>

  export type $OhlcDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OhlcData"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      network: string
      ammSource: string
      timeframe: string
      timestamp: Date
      open: Prisma.Decimal
      high: Prisma.Decimal
      low: Prisma.Decimal
      close: Prisma.Decimal
      volume: Prisma.Decimal
      tradeCount: number
      createdAt: Date
      updatedAt: Date
      token0Address: string
      token1Address: string
    }, ExtArgs["result"]["ohlcData"]>
    composites: {}
  }

  type OhlcDataGetPayload<S extends boolean | null | undefined | OhlcDataDefaultArgs> = $Result.GetResult<Prisma.$OhlcDataPayload, S>

  type OhlcDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OhlcDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OhlcDataCountAggregateInputType | true
    }

  export interface OhlcDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OhlcData'], meta: { name: 'OhlcData' } }
    /**
     * Find zero or one OhlcData that matches the filter.
     * @param {OhlcDataFindUniqueArgs} args - Arguments to find a OhlcData
     * @example
     * // Get one OhlcData
     * const ohlcData = await prisma.ohlcData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OhlcDataFindUniqueArgs>(args: SelectSubset<T, OhlcDataFindUniqueArgs<ExtArgs>>): Prisma__OhlcDataClient<$Result.GetResult<Prisma.$OhlcDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OhlcData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OhlcDataFindUniqueOrThrowArgs} args - Arguments to find a OhlcData
     * @example
     * // Get one OhlcData
     * const ohlcData = await prisma.ohlcData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OhlcDataFindUniqueOrThrowArgs>(args: SelectSubset<T, OhlcDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OhlcDataClient<$Result.GetResult<Prisma.$OhlcDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OhlcData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OhlcDataFindFirstArgs} args - Arguments to find a OhlcData
     * @example
     * // Get one OhlcData
     * const ohlcData = await prisma.ohlcData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OhlcDataFindFirstArgs>(args?: SelectSubset<T, OhlcDataFindFirstArgs<ExtArgs>>): Prisma__OhlcDataClient<$Result.GetResult<Prisma.$OhlcDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OhlcData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OhlcDataFindFirstOrThrowArgs} args - Arguments to find a OhlcData
     * @example
     * // Get one OhlcData
     * const ohlcData = await prisma.ohlcData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OhlcDataFindFirstOrThrowArgs>(args?: SelectSubset<T, OhlcDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__OhlcDataClient<$Result.GetResult<Prisma.$OhlcDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OhlcData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OhlcDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OhlcData
     * const ohlcData = await prisma.ohlcData.findMany()
     * 
     * // Get first 10 OhlcData
     * const ohlcData = await prisma.ohlcData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ohlcDataWithIdOnly = await prisma.ohlcData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OhlcDataFindManyArgs>(args?: SelectSubset<T, OhlcDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OhlcDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OhlcData.
     * @param {OhlcDataCreateArgs} args - Arguments to create a OhlcData.
     * @example
     * // Create one OhlcData
     * const OhlcData = await prisma.ohlcData.create({
     *   data: {
     *     // ... data to create a OhlcData
     *   }
     * })
     * 
     */
    create<T extends OhlcDataCreateArgs>(args: SelectSubset<T, OhlcDataCreateArgs<ExtArgs>>): Prisma__OhlcDataClient<$Result.GetResult<Prisma.$OhlcDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OhlcData.
     * @param {OhlcDataCreateManyArgs} args - Arguments to create many OhlcData.
     * @example
     * // Create many OhlcData
     * const ohlcData = await prisma.ohlcData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OhlcDataCreateManyArgs>(args?: SelectSubset<T, OhlcDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OhlcData and returns the data saved in the database.
     * @param {OhlcDataCreateManyAndReturnArgs} args - Arguments to create many OhlcData.
     * @example
     * // Create many OhlcData
     * const ohlcData = await prisma.ohlcData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OhlcData and only return the `id`
     * const ohlcDataWithIdOnly = await prisma.ohlcData.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OhlcDataCreateManyAndReturnArgs>(args?: SelectSubset<T, OhlcDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OhlcDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OhlcData.
     * @param {OhlcDataDeleteArgs} args - Arguments to delete one OhlcData.
     * @example
     * // Delete one OhlcData
     * const OhlcData = await prisma.ohlcData.delete({
     *   where: {
     *     // ... filter to delete one OhlcData
     *   }
     * })
     * 
     */
    delete<T extends OhlcDataDeleteArgs>(args: SelectSubset<T, OhlcDataDeleteArgs<ExtArgs>>): Prisma__OhlcDataClient<$Result.GetResult<Prisma.$OhlcDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OhlcData.
     * @param {OhlcDataUpdateArgs} args - Arguments to update one OhlcData.
     * @example
     * // Update one OhlcData
     * const ohlcData = await prisma.ohlcData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OhlcDataUpdateArgs>(args: SelectSubset<T, OhlcDataUpdateArgs<ExtArgs>>): Prisma__OhlcDataClient<$Result.GetResult<Prisma.$OhlcDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OhlcData.
     * @param {OhlcDataDeleteManyArgs} args - Arguments to filter OhlcData to delete.
     * @example
     * // Delete a few OhlcData
     * const { count } = await prisma.ohlcData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OhlcDataDeleteManyArgs>(args?: SelectSubset<T, OhlcDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OhlcData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OhlcDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OhlcData
     * const ohlcData = await prisma.ohlcData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OhlcDataUpdateManyArgs>(args: SelectSubset<T, OhlcDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OhlcData and returns the data updated in the database.
     * @param {OhlcDataUpdateManyAndReturnArgs} args - Arguments to update many OhlcData.
     * @example
     * // Update many OhlcData
     * const ohlcData = await prisma.ohlcData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OhlcData and only return the `id`
     * const ohlcDataWithIdOnly = await prisma.ohlcData.updateManyAndReturn({
     *   select: { id: true },
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
    updateManyAndReturn<T extends OhlcDataUpdateManyAndReturnArgs>(args: SelectSubset<T, OhlcDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OhlcDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OhlcData.
     * @param {OhlcDataUpsertArgs} args - Arguments to update or create a OhlcData.
     * @example
     * // Update or create a OhlcData
     * const ohlcData = await prisma.ohlcData.upsert({
     *   create: {
     *     // ... data to create a OhlcData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OhlcData we want to update
     *   }
     * })
     */
    upsert<T extends OhlcDataUpsertArgs>(args: SelectSubset<T, OhlcDataUpsertArgs<ExtArgs>>): Prisma__OhlcDataClient<$Result.GetResult<Prisma.$OhlcDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OhlcData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OhlcDataCountArgs} args - Arguments to filter OhlcData to count.
     * @example
     * // Count the number of OhlcData
     * const count = await prisma.ohlcData.count({
     *   where: {
     *     // ... the filter for the OhlcData we want to count
     *   }
     * })
    **/
    count<T extends OhlcDataCountArgs>(
      args?: Subset<T, OhlcDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OhlcDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OhlcData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OhlcDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OhlcDataAggregateArgs>(args: Subset<T, OhlcDataAggregateArgs>): Prisma.PrismaPromise<GetOhlcDataAggregateType<T>>

    /**
     * Group by OhlcData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OhlcDataGroupByArgs} args - Group by arguments.
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
      T extends OhlcDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OhlcDataGroupByArgs['orderBy'] }
        : { orderBy?: OhlcDataGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OhlcDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOhlcDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OhlcData model
   */
  readonly fields: OhlcDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OhlcData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OhlcDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OhlcData model
   */
  interface OhlcDataFieldRefs {
    readonly id: FieldRef<"OhlcData", 'Int'>
    readonly network: FieldRef<"OhlcData", 'String'>
    readonly ammSource: FieldRef<"OhlcData", 'String'>
    readonly timeframe: FieldRef<"OhlcData", 'String'>
    readonly timestamp: FieldRef<"OhlcData", 'DateTime'>
    readonly open: FieldRef<"OhlcData", 'Decimal'>
    readonly high: FieldRef<"OhlcData", 'Decimal'>
    readonly low: FieldRef<"OhlcData", 'Decimal'>
    readonly close: FieldRef<"OhlcData", 'Decimal'>
    readonly volume: FieldRef<"OhlcData", 'Decimal'>
    readonly tradeCount: FieldRef<"OhlcData", 'Int'>
    readonly createdAt: FieldRef<"OhlcData", 'DateTime'>
    readonly updatedAt: FieldRef<"OhlcData", 'DateTime'>
    readonly token0Address: FieldRef<"OhlcData", 'String'>
    readonly token1Address: FieldRef<"OhlcData", 'String'>
  }
    

  // Custom InputTypes
  /**
   * OhlcData findUnique
   */
  export type OhlcDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OhlcData
     */
    select?: OhlcDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OhlcData
     */
    omit?: OhlcDataOmit<ExtArgs> | null
    /**
     * Filter, which OhlcData to fetch.
     */
    where: OhlcDataWhereUniqueInput
  }

  /**
   * OhlcData findUniqueOrThrow
   */
  export type OhlcDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OhlcData
     */
    select?: OhlcDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OhlcData
     */
    omit?: OhlcDataOmit<ExtArgs> | null
    /**
     * Filter, which OhlcData to fetch.
     */
    where: OhlcDataWhereUniqueInput
  }

  /**
   * OhlcData findFirst
   */
  export type OhlcDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OhlcData
     */
    select?: OhlcDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OhlcData
     */
    omit?: OhlcDataOmit<ExtArgs> | null
    /**
     * Filter, which OhlcData to fetch.
     */
    where?: OhlcDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OhlcData to fetch.
     */
    orderBy?: OhlcDataOrderByWithRelationInput | OhlcDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OhlcData.
     */
    cursor?: OhlcDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OhlcData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OhlcData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OhlcData.
     */
    distinct?: OhlcDataScalarFieldEnum | OhlcDataScalarFieldEnum[]
  }

  /**
   * OhlcData findFirstOrThrow
   */
  export type OhlcDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OhlcData
     */
    select?: OhlcDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OhlcData
     */
    omit?: OhlcDataOmit<ExtArgs> | null
    /**
     * Filter, which OhlcData to fetch.
     */
    where?: OhlcDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OhlcData to fetch.
     */
    orderBy?: OhlcDataOrderByWithRelationInput | OhlcDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OhlcData.
     */
    cursor?: OhlcDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OhlcData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OhlcData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OhlcData.
     */
    distinct?: OhlcDataScalarFieldEnum | OhlcDataScalarFieldEnum[]
  }

  /**
   * OhlcData findMany
   */
  export type OhlcDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OhlcData
     */
    select?: OhlcDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OhlcData
     */
    omit?: OhlcDataOmit<ExtArgs> | null
    /**
     * Filter, which OhlcData to fetch.
     */
    where?: OhlcDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OhlcData to fetch.
     */
    orderBy?: OhlcDataOrderByWithRelationInput | OhlcDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OhlcData.
     */
    cursor?: OhlcDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OhlcData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OhlcData.
     */
    skip?: number
    distinct?: OhlcDataScalarFieldEnum | OhlcDataScalarFieldEnum[]
  }

  /**
   * OhlcData create
   */
  export type OhlcDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OhlcData
     */
    select?: OhlcDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OhlcData
     */
    omit?: OhlcDataOmit<ExtArgs> | null
    /**
     * The data needed to create a OhlcData.
     */
    data: XOR<OhlcDataCreateInput, OhlcDataUncheckedCreateInput>
  }

  /**
   * OhlcData createMany
   */
  export type OhlcDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OhlcData.
     */
    data: OhlcDataCreateManyInput | OhlcDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OhlcData createManyAndReturn
   */
  export type OhlcDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OhlcData
     */
    select?: OhlcDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OhlcData
     */
    omit?: OhlcDataOmit<ExtArgs> | null
    /**
     * The data used to create many OhlcData.
     */
    data: OhlcDataCreateManyInput | OhlcDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OhlcData update
   */
  export type OhlcDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OhlcData
     */
    select?: OhlcDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OhlcData
     */
    omit?: OhlcDataOmit<ExtArgs> | null
    /**
     * The data needed to update a OhlcData.
     */
    data: XOR<OhlcDataUpdateInput, OhlcDataUncheckedUpdateInput>
    /**
     * Choose, which OhlcData to update.
     */
    where: OhlcDataWhereUniqueInput
  }

  /**
   * OhlcData updateMany
   */
  export type OhlcDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OhlcData.
     */
    data: XOR<OhlcDataUpdateManyMutationInput, OhlcDataUncheckedUpdateManyInput>
    /**
     * Filter which OhlcData to update
     */
    where?: OhlcDataWhereInput
    /**
     * Limit how many OhlcData to update.
     */
    limit?: number
  }

  /**
   * OhlcData updateManyAndReturn
   */
  export type OhlcDataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OhlcData
     */
    select?: OhlcDataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OhlcData
     */
    omit?: OhlcDataOmit<ExtArgs> | null
    /**
     * The data used to update OhlcData.
     */
    data: XOR<OhlcDataUpdateManyMutationInput, OhlcDataUncheckedUpdateManyInput>
    /**
     * Filter which OhlcData to update
     */
    where?: OhlcDataWhereInput
    /**
     * Limit how many OhlcData to update.
     */
    limit?: number
  }

  /**
   * OhlcData upsert
   */
  export type OhlcDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OhlcData
     */
    select?: OhlcDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OhlcData
     */
    omit?: OhlcDataOmit<ExtArgs> | null
    /**
     * The filter to search for the OhlcData to update in case it exists.
     */
    where: OhlcDataWhereUniqueInput
    /**
     * In case the OhlcData found by the `where` argument doesn't exist, create a new OhlcData with this data.
     */
    create: XOR<OhlcDataCreateInput, OhlcDataUncheckedCreateInput>
    /**
     * In case the OhlcData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OhlcDataUpdateInput, OhlcDataUncheckedUpdateInput>
  }

  /**
   * OhlcData delete
   */
  export type OhlcDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OhlcData
     */
    select?: OhlcDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OhlcData
     */
    omit?: OhlcDataOmit<ExtArgs> | null
    /**
     * Filter which OhlcData to delete.
     */
    where: OhlcDataWhereUniqueInput
  }

  /**
   * OhlcData deleteMany
   */
  export type OhlcDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OhlcData to delete
     */
    where?: OhlcDataWhereInput
    /**
     * Limit how many OhlcData to delete.
     */
    limit?: number
  }

  /**
   * OhlcData without action
   */
  export type OhlcDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OhlcData
     */
    select?: OhlcDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OhlcData
     */
    omit?: OhlcDataOmit<ExtArgs> | null
  }


  /**
   * Model GroupConfiguration
   */

  export type AggregateGroupConfiguration = {
    _count: GroupConfigurationCountAggregateOutputType | null
    _avg: GroupConfigurationAvgAggregateOutputType | null
    _sum: GroupConfigurationSumAggregateOutputType | null
    _min: GroupConfigurationMinAggregateOutputType | null
    _max: GroupConfigurationMaxAggregateOutputType | null
  }

  export type GroupConfigurationAvgAggregateOutputType = {
    chatId: number | null
    spikeMonitorTokenId: number | null
    spikeMonitorTimeframe: number | null
    spikeMonitorInterval: number | null
  }

  export type GroupConfigurationSumAggregateOutputType = {
    chatId: bigint | null
    spikeMonitorTokenId: number | null
    spikeMonitorTimeframe: number | null
    spikeMonitorInterval: number | null
  }

  export type GroupConfigurationMinAggregateOutputType = {
    chatId: bigint | null
    spikeMonitorEnabled: boolean | null
    spikeMonitorTokenId: number | null
    spikeMonitorThreadId: string | null
    spikeMonitorGifUrl: string | null
    spikeMonitorTimeframe: number | null
    spikeMonitorInterval: number | null
  }

  export type GroupConfigurationMaxAggregateOutputType = {
    chatId: bigint | null
    spikeMonitorEnabled: boolean | null
    spikeMonitorTokenId: number | null
    spikeMonitorThreadId: string | null
    spikeMonitorGifUrl: string | null
    spikeMonitorTimeframe: number | null
    spikeMonitorInterval: number | null
  }

  export type GroupConfigurationCountAggregateOutputType = {
    chatId: number
    spikeMonitorEnabled: number
    spikeMonitorTokenId: number
    spikeMonitorThreadId: number
    spikeMonitorGifUrl: number
    spikeMonitorTimeframe: number
    spikeMonitorInterval: number
    _all: number
  }


  export type GroupConfigurationAvgAggregateInputType = {
    chatId?: true
    spikeMonitorTokenId?: true
    spikeMonitorTimeframe?: true
    spikeMonitorInterval?: true
  }

  export type GroupConfigurationSumAggregateInputType = {
    chatId?: true
    spikeMonitorTokenId?: true
    spikeMonitorTimeframe?: true
    spikeMonitorInterval?: true
  }

  export type GroupConfigurationMinAggregateInputType = {
    chatId?: true
    spikeMonitorEnabled?: true
    spikeMonitorTokenId?: true
    spikeMonitorThreadId?: true
    spikeMonitorGifUrl?: true
    spikeMonitorTimeframe?: true
    spikeMonitorInterval?: true
  }

  export type GroupConfigurationMaxAggregateInputType = {
    chatId?: true
    spikeMonitorEnabled?: true
    spikeMonitorTokenId?: true
    spikeMonitorThreadId?: true
    spikeMonitorGifUrl?: true
    spikeMonitorTimeframe?: true
    spikeMonitorInterval?: true
  }

  export type GroupConfigurationCountAggregateInputType = {
    chatId?: true
    spikeMonitorEnabled?: true
    spikeMonitorTokenId?: true
    spikeMonitorThreadId?: true
    spikeMonitorGifUrl?: true
    spikeMonitorTimeframe?: true
    spikeMonitorInterval?: true
    _all?: true
  }

  export type GroupConfigurationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupConfiguration to aggregate.
     */
    where?: GroupConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupConfigurations to fetch.
     */
    orderBy?: GroupConfigurationOrderByWithRelationInput | GroupConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupConfigurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupConfigurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GroupConfigurations
    **/
    _count?: true | GroupConfigurationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GroupConfigurationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GroupConfigurationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupConfigurationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupConfigurationMaxAggregateInputType
  }

  export type GetGroupConfigurationAggregateType<T extends GroupConfigurationAggregateArgs> = {
        [P in keyof T & keyof AggregateGroupConfiguration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroupConfiguration[P]>
      : GetScalarType<T[P], AggregateGroupConfiguration[P]>
  }




  export type GroupConfigurationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupConfigurationWhereInput
    orderBy?: GroupConfigurationOrderByWithAggregationInput | GroupConfigurationOrderByWithAggregationInput[]
    by: GroupConfigurationScalarFieldEnum[] | GroupConfigurationScalarFieldEnum
    having?: GroupConfigurationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupConfigurationCountAggregateInputType | true
    _avg?: GroupConfigurationAvgAggregateInputType
    _sum?: GroupConfigurationSumAggregateInputType
    _min?: GroupConfigurationMinAggregateInputType
    _max?: GroupConfigurationMaxAggregateInputType
  }

  export type GroupConfigurationGroupByOutputType = {
    chatId: bigint
    spikeMonitorEnabled: boolean
    spikeMonitorTokenId: number | null
    spikeMonitorThreadId: string | null
    spikeMonitorGifUrl: string | null
    spikeMonitorTimeframe: number | null
    spikeMonitorInterval: number | null
    _count: GroupConfigurationCountAggregateOutputType | null
    _avg: GroupConfigurationAvgAggregateOutputType | null
    _sum: GroupConfigurationSumAggregateOutputType | null
    _min: GroupConfigurationMinAggregateOutputType | null
    _max: GroupConfigurationMaxAggregateOutputType | null
  }

  type GetGroupConfigurationGroupByPayload<T extends GroupConfigurationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupConfigurationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupConfigurationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupConfigurationGroupByOutputType[P]>
            : GetScalarType<T[P], GroupConfigurationGroupByOutputType[P]>
        }
      >
    >


  export type GroupConfigurationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatId?: boolean
    spikeMonitorEnabled?: boolean
    spikeMonitorTokenId?: boolean
    spikeMonitorThreadId?: boolean
    spikeMonitorGifUrl?: boolean
    spikeMonitorTimeframe?: boolean
    spikeMonitorInterval?: boolean
    spikeMonitorToken?: boolean | GroupConfiguration$spikeMonitorTokenArgs<ExtArgs>
  }, ExtArgs["result"]["groupConfiguration"]>

  export type GroupConfigurationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatId?: boolean
    spikeMonitorEnabled?: boolean
    spikeMonitorTokenId?: boolean
    spikeMonitorThreadId?: boolean
    spikeMonitorGifUrl?: boolean
    spikeMonitorTimeframe?: boolean
    spikeMonitorInterval?: boolean
    spikeMonitorToken?: boolean | GroupConfiguration$spikeMonitorTokenArgs<ExtArgs>
  }, ExtArgs["result"]["groupConfiguration"]>

  export type GroupConfigurationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatId?: boolean
    spikeMonitorEnabled?: boolean
    spikeMonitorTokenId?: boolean
    spikeMonitorThreadId?: boolean
    spikeMonitorGifUrl?: boolean
    spikeMonitorTimeframe?: boolean
    spikeMonitorInterval?: boolean
    spikeMonitorToken?: boolean | GroupConfiguration$spikeMonitorTokenArgs<ExtArgs>
  }, ExtArgs["result"]["groupConfiguration"]>

  export type GroupConfigurationSelectScalar = {
    chatId?: boolean
    spikeMonitorEnabled?: boolean
    spikeMonitorTokenId?: boolean
    spikeMonitorThreadId?: boolean
    spikeMonitorGifUrl?: boolean
    spikeMonitorTimeframe?: boolean
    spikeMonitorInterval?: boolean
  }

  export type GroupConfigurationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"chatId" | "spikeMonitorEnabled" | "spikeMonitorTokenId" | "spikeMonitorThreadId" | "spikeMonitorGifUrl" | "spikeMonitorTimeframe" | "spikeMonitorInterval", ExtArgs["result"]["groupConfiguration"]>
  export type GroupConfigurationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    spikeMonitorToken?: boolean | GroupConfiguration$spikeMonitorTokenArgs<ExtArgs>
  }
  export type GroupConfigurationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    spikeMonitorToken?: boolean | GroupConfiguration$spikeMonitorTokenArgs<ExtArgs>
  }
  export type GroupConfigurationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    spikeMonitorToken?: boolean | GroupConfiguration$spikeMonitorTokenArgs<ExtArgs>
  }

  export type $GroupConfigurationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GroupConfiguration"
    objects: {
      spikeMonitorToken: Prisma.$TokenPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      chatId: bigint
      spikeMonitorEnabled: boolean
      spikeMonitorTokenId: number | null
      spikeMonitorThreadId: string | null
      spikeMonitorGifUrl: string | null
      spikeMonitorTimeframe: number | null
      spikeMonitorInterval: number | null
    }, ExtArgs["result"]["groupConfiguration"]>
    composites: {}
  }

  type GroupConfigurationGetPayload<S extends boolean | null | undefined | GroupConfigurationDefaultArgs> = $Result.GetResult<Prisma.$GroupConfigurationPayload, S>

  type GroupConfigurationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupConfigurationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupConfigurationCountAggregateInputType | true
    }

  export interface GroupConfigurationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GroupConfiguration'], meta: { name: 'GroupConfiguration' } }
    /**
     * Find zero or one GroupConfiguration that matches the filter.
     * @param {GroupConfigurationFindUniqueArgs} args - Arguments to find a GroupConfiguration
     * @example
     * // Get one GroupConfiguration
     * const groupConfiguration = await prisma.groupConfiguration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupConfigurationFindUniqueArgs>(args: SelectSubset<T, GroupConfigurationFindUniqueArgs<ExtArgs>>): Prisma__GroupConfigurationClient<$Result.GetResult<Prisma.$GroupConfigurationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GroupConfiguration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupConfigurationFindUniqueOrThrowArgs} args - Arguments to find a GroupConfiguration
     * @example
     * // Get one GroupConfiguration
     * const groupConfiguration = await prisma.groupConfiguration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupConfigurationFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupConfigurationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupConfigurationClient<$Result.GetResult<Prisma.$GroupConfigurationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupConfiguration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConfigurationFindFirstArgs} args - Arguments to find a GroupConfiguration
     * @example
     * // Get one GroupConfiguration
     * const groupConfiguration = await prisma.groupConfiguration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupConfigurationFindFirstArgs>(args?: SelectSubset<T, GroupConfigurationFindFirstArgs<ExtArgs>>): Prisma__GroupConfigurationClient<$Result.GetResult<Prisma.$GroupConfigurationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupConfiguration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConfigurationFindFirstOrThrowArgs} args - Arguments to find a GroupConfiguration
     * @example
     * // Get one GroupConfiguration
     * const groupConfiguration = await prisma.groupConfiguration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupConfigurationFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupConfigurationFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupConfigurationClient<$Result.GetResult<Prisma.$GroupConfigurationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GroupConfigurations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConfigurationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GroupConfigurations
     * const groupConfigurations = await prisma.groupConfiguration.findMany()
     * 
     * // Get first 10 GroupConfigurations
     * const groupConfigurations = await prisma.groupConfiguration.findMany({ take: 10 })
     * 
     * // Only select the `chatId`
     * const groupConfigurationWithChatIdOnly = await prisma.groupConfiguration.findMany({ select: { chatId: true } })
     * 
     */
    findMany<T extends GroupConfigurationFindManyArgs>(args?: SelectSubset<T, GroupConfigurationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupConfigurationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GroupConfiguration.
     * @param {GroupConfigurationCreateArgs} args - Arguments to create a GroupConfiguration.
     * @example
     * // Create one GroupConfiguration
     * const GroupConfiguration = await prisma.groupConfiguration.create({
     *   data: {
     *     // ... data to create a GroupConfiguration
     *   }
     * })
     * 
     */
    create<T extends GroupConfigurationCreateArgs>(args: SelectSubset<T, GroupConfigurationCreateArgs<ExtArgs>>): Prisma__GroupConfigurationClient<$Result.GetResult<Prisma.$GroupConfigurationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GroupConfigurations.
     * @param {GroupConfigurationCreateManyArgs} args - Arguments to create many GroupConfigurations.
     * @example
     * // Create many GroupConfigurations
     * const groupConfiguration = await prisma.groupConfiguration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupConfigurationCreateManyArgs>(args?: SelectSubset<T, GroupConfigurationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GroupConfigurations and returns the data saved in the database.
     * @param {GroupConfigurationCreateManyAndReturnArgs} args - Arguments to create many GroupConfigurations.
     * @example
     * // Create many GroupConfigurations
     * const groupConfiguration = await prisma.groupConfiguration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GroupConfigurations and only return the `chatId`
     * const groupConfigurationWithChatIdOnly = await prisma.groupConfiguration.createManyAndReturn({
     *   select: { chatId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupConfigurationCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupConfigurationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupConfigurationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GroupConfiguration.
     * @param {GroupConfigurationDeleteArgs} args - Arguments to delete one GroupConfiguration.
     * @example
     * // Delete one GroupConfiguration
     * const GroupConfiguration = await prisma.groupConfiguration.delete({
     *   where: {
     *     // ... filter to delete one GroupConfiguration
     *   }
     * })
     * 
     */
    delete<T extends GroupConfigurationDeleteArgs>(args: SelectSubset<T, GroupConfigurationDeleteArgs<ExtArgs>>): Prisma__GroupConfigurationClient<$Result.GetResult<Prisma.$GroupConfigurationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GroupConfiguration.
     * @param {GroupConfigurationUpdateArgs} args - Arguments to update one GroupConfiguration.
     * @example
     * // Update one GroupConfiguration
     * const groupConfiguration = await prisma.groupConfiguration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupConfigurationUpdateArgs>(args: SelectSubset<T, GroupConfigurationUpdateArgs<ExtArgs>>): Prisma__GroupConfigurationClient<$Result.GetResult<Prisma.$GroupConfigurationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GroupConfigurations.
     * @param {GroupConfigurationDeleteManyArgs} args - Arguments to filter GroupConfigurations to delete.
     * @example
     * // Delete a few GroupConfigurations
     * const { count } = await prisma.groupConfiguration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupConfigurationDeleteManyArgs>(args?: SelectSubset<T, GroupConfigurationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupConfigurations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConfigurationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GroupConfigurations
     * const groupConfiguration = await prisma.groupConfiguration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupConfigurationUpdateManyArgs>(args: SelectSubset<T, GroupConfigurationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupConfigurations and returns the data updated in the database.
     * @param {GroupConfigurationUpdateManyAndReturnArgs} args - Arguments to update many GroupConfigurations.
     * @example
     * // Update many GroupConfigurations
     * const groupConfiguration = await prisma.groupConfiguration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GroupConfigurations and only return the `chatId`
     * const groupConfigurationWithChatIdOnly = await prisma.groupConfiguration.updateManyAndReturn({
     *   select: { chatId: true },
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
    updateManyAndReturn<T extends GroupConfigurationUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupConfigurationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupConfigurationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GroupConfiguration.
     * @param {GroupConfigurationUpsertArgs} args - Arguments to update or create a GroupConfiguration.
     * @example
     * // Update or create a GroupConfiguration
     * const groupConfiguration = await prisma.groupConfiguration.upsert({
     *   create: {
     *     // ... data to create a GroupConfiguration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GroupConfiguration we want to update
     *   }
     * })
     */
    upsert<T extends GroupConfigurationUpsertArgs>(args: SelectSubset<T, GroupConfigurationUpsertArgs<ExtArgs>>): Prisma__GroupConfigurationClient<$Result.GetResult<Prisma.$GroupConfigurationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GroupConfigurations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConfigurationCountArgs} args - Arguments to filter GroupConfigurations to count.
     * @example
     * // Count the number of GroupConfigurations
     * const count = await prisma.groupConfiguration.count({
     *   where: {
     *     // ... the filter for the GroupConfigurations we want to count
     *   }
     * })
    **/
    count<T extends GroupConfigurationCountArgs>(
      args?: Subset<T, GroupConfigurationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupConfigurationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GroupConfiguration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConfigurationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GroupConfigurationAggregateArgs>(args: Subset<T, GroupConfigurationAggregateArgs>): Prisma.PrismaPromise<GetGroupConfigurationAggregateType<T>>

    /**
     * Group by GroupConfiguration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupConfigurationGroupByArgs} args - Group by arguments.
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
      T extends GroupConfigurationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupConfigurationGroupByArgs['orderBy'] }
        : { orderBy?: GroupConfigurationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GroupConfigurationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupConfigurationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GroupConfiguration model
   */
  readonly fields: GroupConfigurationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GroupConfiguration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupConfigurationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    spikeMonitorToken<T extends GroupConfiguration$spikeMonitorTokenArgs<ExtArgs> = {}>(args?: Subset<T, GroupConfiguration$spikeMonitorTokenArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GroupConfiguration model
   */
  interface GroupConfigurationFieldRefs {
    readonly chatId: FieldRef<"GroupConfiguration", 'BigInt'>
    readonly spikeMonitorEnabled: FieldRef<"GroupConfiguration", 'Boolean'>
    readonly spikeMonitorTokenId: FieldRef<"GroupConfiguration", 'Int'>
    readonly spikeMonitorThreadId: FieldRef<"GroupConfiguration", 'String'>
    readonly spikeMonitorGifUrl: FieldRef<"GroupConfiguration", 'String'>
    readonly spikeMonitorTimeframe: FieldRef<"GroupConfiguration", 'Int'>
    readonly spikeMonitorInterval: FieldRef<"GroupConfiguration", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * GroupConfiguration findUnique
   */
  export type GroupConfigurationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConfiguration
     */
    select?: GroupConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConfiguration
     */
    omit?: GroupConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConfigurationInclude<ExtArgs> | null
    /**
     * Filter, which GroupConfiguration to fetch.
     */
    where: GroupConfigurationWhereUniqueInput
  }

  /**
   * GroupConfiguration findUniqueOrThrow
   */
  export type GroupConfigurationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConfiguration
     */
    select?: GroupConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConfiguration
     */
    omit?: GroupConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConfigurationInclude<ExtArgs> | null
    /**
     * Filter, which GroupConfiguration to fetch.
     */
    where: GroupConfigurationWhereUniqueInput
  }

  /**
   * GroupConfiguration findFirst
   */
  export type GroupConfigurationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConfiguration
     */
    select?: GroupConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConfiguration
     */
    omit?: GroupConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConfigurationInclude<ExtArgs> | null
    /**
     * Filter, which GroupConfiguration to fetch.
     */
    where?: GroupConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupConfigurations to fetch.
     */
    orderBy?: GroupConfigurationOrderByWithRelationInput | GroupConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupConfigurations.
     */
    cursor?: GroupConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupConfigurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupConfigurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupConfigurations.
     */
    distinct?: GroupConfigurationScalarFieldEnum | GroupConfigurationScalarFieldEnum[]
  }

  /**
   * GroupConfiguration findFirstOrThrow
   */
  export type GroupConfigurationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConfiguration
     */
    select?: GroupConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConfiguration
     */
    omit?: GroupConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConfigurationInclude<ExtArgs> | null
    /**
     * Filter, which GroupConfiguration to fetch.
     */
    where?: GroupConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupConfigurations to fetch.
     */
    orderBy?: GroupConfigurationOrderByWithRelationInput | GroupConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupConfigurations.
     */
    cursor?: GroupConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupConfigurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupConfigurations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupConfigurations.
     */
    distinct?: GroupConfigurationScalarFieldEnum | GroupConfigurationScalarFieldEnum[]
  }

  /**
   * GroupConfiguration findMany
   */
  export type GroupConfigurationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConfiguration
     */
    select?: GroupConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConfiguration
     */
    omit?: GroupConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConfigurationInclude<ExtArgs> | null
    /**
     * Filter, which GroupConfigurations to fetch.
     */
    where?: GroupConfigurationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupConfigurations to fetch.
     */
    orderBy?: GroupConfigurationOrderByWithRelationInput | GroupConfigurationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GroupConfigurations.
     */
    cursor?: GroupConfigurationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupConfigurations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupConfigurations.
     */
    skip?: number
    distinct?: GroupConfigurationScalarFieldEnum | GroupConfigurationScalarFieldEnum[]
  }

  /**
   * GroupConfiguration create
   */
  export type GroupConfigurationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConfiguration
     */
    select?: GroupConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConfiguration
     */
    omit?: GroupConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConfigurationInclude<ExtArgs> | null
    /**
     * The data needed to create a GroupConfiguration.
     */
    data: XOR<GroupConfigurationCreateInput, GroupConfigurationUncheckedCreateInput>
  }

  /**
   * GroupConfiguration createMany
   */
  export type GroupConfigurationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GroupConfigurations.
     */
    data: GroupConfigurationCreateManyInput | GroupConfigurationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupConfiguration createManyAndReturn
   */
  export type GroupConfigurationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConfiguration
     */
    select?: GroupConfigurationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConfiguration
     */
    omit?: GroupConfigurationOmit<ExtArgs> | null
    /**
     * The data used to create many GroupConfigurations.
     */
    data: GroupConfigurationCreateManyInput | GroupConfigurationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConfigurationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupConfiguration update
   */
  export type GroupConfigurationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConfiguration
     */
    select?: GroupConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConfiguration
     */
    omit?: GroupConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConfigurationInclude<ExtArgs> | null
    /**
     * The data needed to update a GroupConfiguration.
     */
    data: XOR<GroupConfigurationUpdateInput, GroupConfigurationUncheckedUpdateInput>
    /**
     * Choose, which GroupConfiguration to update.
     */
    where: GroupConfigurationWhereUniqueInput
  }

  /**
   * GroupConfiguration updateMany
   */
  export type GroupConfigurationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GroupConfigurations.
     */
    data: XOR<GroupConfigurationUpdateManyMutationInput, GroupConfigurationUncheckedUpdateManyInput>
    /**
     * Filter which GroupConfigurations to update
     */
    where?: GroupConfigurationWhereInput
    /**
     * Limit how many GroupConfigurations to update.
     */
    limit?: number
  }

  /**
   * GroupConfiguration updateManyAndReturn
   */
  export type GroupConfigurationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConfiguration
     */
    select?: GroupConfigurationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConfiguration
     */
    omit?: GroupConfigurationOmit<ExtArgs> | null
    /**
     * The data used to update GroupConfigurations.
     */
    data: XOR<GroupConfigurationUpdateManyMutationInput, GroupConfigurationUncheckedUpdateManyInput>
    /**
     * Filter which GroupConfigurations to update
     */
    where?: GroupConfigurationWhereInput
    /**
     * Limit how many GroupConfigurations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConfigurationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupConfiguration upsert
   */
  export type GroupConfigurationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConfiguration
     */
    select?: GroupConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConfiguration
     */
    omit?: GroupConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConfigurationInclude<ExtArgs> | null
    /**
     * The filter to search for the GroupConfiguration to update in case it exists.
     */
    where: GroupConfigurationWhereUniqueInput
    /**
     * In case the GroupConfiguration found by the `where` argument doesn't exist, create a new GroupConfiguration with this data.
     */
    create: XOR<GroupConfigurationCreateInput, GroupConfigurationUncheckedCreateInput>
    /**
     * In case the GroupConfiguration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupConfigurationUpdateInput, GroupConfigurationUncheckedUpdateInput>
  }

  /**
   * GroupConfiguration delete
   */
  export type GroupConfigurationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConfiguration
     */
    select?: GroupConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConfiguration
     */
    omit?: GroupConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConfigurationInclude<ExtArgs> | null
    /**
     * Filter which GroupConfiguration to delete.
     */
    where: GroupConfigurationWhereUniqueInput
  }

  /**
   * GroupConfiguration deleteMany
   */
  export type GroupConfigurationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupConfigurations to delete
     */
    where?: GroupConfigurationWhereInput
    /**
     * Limit how many GroupConfigurations to delete.
     */
    limit?: number
  }

  /**
   * GroupConfiguration.spikeMonitorToken
   */
  export type GroupConfiguration$spikeMonitorTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    where?: TokenWhereInput
  }

  /**
   * GroupConfiguration without action
   */
  export type GroupConfigurationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupConfiguration
     */
    select?: GroupConfigurationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupConfiguration
     */
    omit?: GroupConfigurationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupConfigurationInclude<ExtArgs> | null
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


  export const TokenScalarFieldEnum: {
    id: 'id',
    network: 'network',
    address: 'address',
    wrappedAddress: 'wrappedAddress',
    symbol: 'symbol',
    name: 'name',
    decimals: 'decimals',
    maxSupply: 'maxSupply',
    circulatingSupply: 'circulatingSupply',
    createdAt: 'createdAt'
  };

  export type TokenScalarFieldEnum = (typeof TokenScalarFieldEnum)[keyof typeof TokenScalarFieldEnum]


  export const PairScalarFieldEnum: {
    id: 'id',
    network: 'network',
    token0Id: 'token0Id',
    token1Id: 'token1Id',
    spikeyAmmPairAddress: 'spikeyAmmPairAddress',
    spikeyAmmReserve0: 'spikeyAmmReserve0',
    spikeyAmmReserve1: 'spikeyAmmReserve1',
    lastStatsUpdate: 'lastStatsUpdate',
    createdAt: 'createdAt'
  };

  export type PairScalarFieldEnum = (typeof PairScalarFieldEnum)[keyof typeof PairScalarFieldEnum]


  export const OhlcDataScalarFieldEnum: {
    id: 'id',
    network: 'network',
    ammSource: 'ammSource',
    timeframe: 'timeframe',
    timestamp: 'timestamp',
    open: 'open',
    high: 'high',
    low: 'low',
    close: 'close',
    volume: 'volume',
    tradeCount: 'tradeCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    token0Address: 'token0Address',
    token1Address: 'token1Address'
  };

  export type OhlcDataScalarFieldEnum = (typeof OhlcDataScalarFieldEnum)[keyof typeof OhlcDataScalarFieldEnum]


  export const GroupConfigurationScalarFieldEnum: {
    chatId: 'chatId',
    spikeMonitorEnabled: 'spikeMonitorEnabled',
    spikeMonitorTokenId: 'spikeMonitorTokenId',
    spikeMonitorThreadId: 'spikeMonitorThreadId',
    spikeMonitorGifUrl: 'spikeMonitorGifUrl',
    spikeMonitorTimeframe: 'spikeMonitorTimeframe',
    spikeMonitorInterval: 'spikeMonitorInterval'
  };

  export type GroupConfigurationScalarFieldEnum = (typeof GroupConfigurationScalarFieldEnum)[keyof typeof GroupConfigurationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type TokenWhereInput = {
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    id?: IntFilter<"Token"> | number
    network?: StringFilter<"Token"> | string
    address?: StringFilter<"Token"> | string
    wrappedAddress?: StringNullableFilter<"Token"> | string | null
    symbol?: StringFilter<"Token"> | string
    name?: StringFilter<"Token"> | string
    decimals?: IntFilter<"Token"> | number
    maxSupply?: BigIntNullableFilter<"Token"> | bigint | number | null
    circulatingSupply?: BigIntNullableFilter<"Token"> | bigint | number | null
    createdAt?: DateTimeFilter<"Token"> | Date | string
    pairsAsToken0?: PairListRelationFilter
    pairsAsToken1?: PairListRelationFilter
    groupConfigurations?: GroupConfigurationListRelationFilter
  }

  export type TokenOrderByWithRelationInput = {
    id?: SortOrder
    network?: SortOrder
    address?: SortOrder
    wrappedAddress?: SortOrderInput | SortOrder
    symbol?: SortOrder
    name?: SortOrder
    decimals?: SortOrder
    maxSupply?: SortOrderInput | SortOrder
    circulatingSupply?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    pairsAsToken0?: PairOrderByRelationAggregateInput
    pairsAsToken1?: PairOrderByRelationAggregateInput
    groupConfigurations?: GroupConfigurationOrderByRelationAggregateInput
  }

  export type TokenWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    wrappedAddress?: string
    network_address?: TokenNetworkAddressCompoundUniqueInput
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    network?: StringFilter<"Token"> | string
    address?: StringFilter<"Token"> | string
    symbol?: StringFilter<"Token"> | string
    name?: StringFilter<"Token"> | string
    decimals?: IntFilter<"Token"> | number
    maxSupply?: BigIntNullableFilter<"Token"> | bigint | number | null
    circulatingSupply?: BigIntNullableFilter<"Token"> | bigint | number | null
    createdAt?: DateTimeFilter<"Token"> | Date | string
    pairsAsToken0?: PairListRelationFilter
    pairsAsToken1?: PairListRelationFilter
    groupConfigurations?: GroupConfigurationListRelationFilter
  }, "id" | "wrappedAddress" | "network_address">

  export type TokenOrderByWithAggregationInput = {
    id?: SortOrder
    network?: SortOrder
    address?: SortOrder
    wrappedAddress?: SortOrderInput | SortOrder
    symbol?: SortOrder
    name?: SortOrder
    decimals?: SortOrder
    maxSupply?: SortOrderInput | SortOrder
    circulatingSupply?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TokenCountOrderByAggregateInput
    _avg?: TokenAvgOrderByAggregateInput
    _max?: TokenMaxOrderByAggregateInput
    _min?: TokenMinOrderByAggregateInput
    _sum?: TokenSumOrderByAggregateInput
  }

  export type TokenScalarWhereWithAggregatesInput = {
    AND?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    OR?: TokenScalarWhereWithAggregatesInput[]
    NOT?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Token"> | number
    network?: StringWithAggregatesFilter<"Token"> | string
    address?: StringWithAggregatesFilter<"Token"> | string
    wrappedAddress?: StringNullableWithAggregatesFilter<"Token"> | string | null
    symbol?: StringWithAggregatesFilter<"Token"> | string
    name?: StringWithAggregatesFilter<"Token"> | string
    decimals?: IntWithAggregatesFilter<"Token"> | number
    maxSupply?: BigIntNullableWithAggregatesFilter<"Token"> | bigint | number | null
    circulatingSupply?: BigIntNullableWithAggregatesFilter<"Token"> | bigint | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Token"> | Date | string
  }

  export type PairWhereInput = {
    AND?: PairWhereInput | PairWhereInput[]
    OR?: PairWhereInput[]
    NOT?: PairWhereInput | PairWhereInput[]
    id?: IntFilter<"Pair"> | number
    network?: StringFilter<"Pair"> | string
    token0Id?: IntFilter<"Pair"> | number
    token1Id?: IntFilter<"Pair"> | number
    spikeyAmmPairAddress?: StringNullableFilter<"Pair"> | string | null
    spikeyAmmReserve0?: BigIntNullableFilter<"Pair"> | bigint | number | null
    spikeyAmmReserve1?: BigIntNullableFilter<"Pair"> | bigint | number | null
    lastStatsUpdate?: DateTimeNullableFilter<"Pair"> | Date | string | null
    createdAt?: DateTimeFilter<"Pair"> | Date | string
    token0?: XOR<TokenScalarRelationFilter, TokenWhereInput>
    token1?: XOR<TokenScalarRelationFilter, TokenWhereInput>
  }

  export type PairOrderByWithRelationInput = {
    id?: SortOrder
    network?: SortOrder
    token0Id?: SortOrder
    token1Id?: SortOrder
    spikeyAmmPairAddress?: SortOrderInput | SortOrder
    spikeyAmmReserve0?: SortOrderInput | SortOrder
    spikeyAmmReserve1?: SortOrderInput | SortOrder
    lastStatsUpdate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    token0?: TokenOrderByWithRelationInput
    token1?: TokenOrderByWithRelationInput
  }

  export type PairWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    network_token0Id_token1Id?: PairNetworkToken0IdToken1IdCompoundUniqueInput
    AND?: PairWhereInput | PairWhereInput[]
    OR?: PairWhereInput[]
    NOT?: PairWhereInput | PairWhereInput[]
    network?: StringFilter<"Pair"> | string
    token0Id?: IntFilter<"Pair"> | number
    token1Id?: IntFilter<"Pair"> | number
    spikeyAmmPairAddress?: StringNullableFilter<"Pair"> | string | null
    spikeyAmmReserve0?: BigIntNullableFilter<"Pair"> | bigint | number | null
    spikeyAmmReserve1?: BigIntNullableFilter<"Pair"> | bigint | number | null
    lastStatsUpdate?: DateTimeNullableFilter<"Pair"> | Date | string | null
    createdAt?: DateTimeFilter<"Pair"> | Date | string
    token0?: XOR<TokenScalarRelationFilter, TokenWhereInput>
    token1?: XOR<TokenScalarRelationFilter, TokenWhereInput>
  }, "id" | "network_token0Id_token1Id">

  export type PairOrderByWithAggregationInput = {
    id?: SortOrder
    network?: SortOrder
    token0Id?: SortOrder
    token1Id?: SortOrder
    spikeyAmmPairAddress?: SortOrderInput | SortOrder
    spikeyAmmReserve0?: SortOrderInput | SortOrder
    spikeyAmmReserve1?: SortOrderInput | SortOrder
    lastStatsUpdate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PairCountOrderByAggregateInput
    _avg?: PairAvgOrderByAggregateInput
    _max?: PairMaxOrderByAggregateInput
    _min?: PairMinOrderByAggregateInput
    _sum?: PairSumOrderByAggregateInput
  }

  export type PairScalarWhereWithAggregatesInput = {
    AND?: PairScalarWhereWithAggregatesInput | PairScalarWhereWithAggregatesInput[]
    OR?: PairScalarWhereWithAggregatesInput[]
    NOT?: PairScalarWhereWithAggregatesInput | PairScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Pair"> | number
    network?: StringWithAggregatesFilter<"Pair"> | string
    token0Id?: IntWithAggregatesFilter<"Pair"> | number
    token1Id?: IntWithAggregatesFilter<"Pair"> | number
    spikeyAmmPairAddress?: StringNullableWithAggregatesFilter<"Pair"> | string | null
    spikeyAmmReserve0?: BigIntNullableWithAggregatesFilter<"Pair"> | bigint | number | null
    spikeyAmmReserve1?: BigIntNullableWithAggregatesFilter<"Pair"> | bigint | number | null
    lastStatsUpdate?: DateTimeNullableWithAggregatesFilter<"Pair"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Pair"> | Date | string
  }

  export type OhlcDataWhereInput = {
    AND?: OhlcDataWhereInput | OhlcDataWhereInput[]
    OR?: OhlcDataWhereInput[]
    NOT?: OhlcDataWhereInput | OhlcDataWhereInput[]
    id?: IntFilter<"OhlcData"> | number
    network?: StringFilter<"OhlcData"> | string
    ammSource?: StringFilter<"OhlcData"> | string
    timeframe?: StringFilter<"OhlcData"> | string
    timestamp?: DateTimeFilter<"OhlcData"> | Date | string
    open?: DecimalFilter<"OhlcData"> | Decimal | DecimalJsLike | number | string
    high?: DecimalFilter<"OhlcData"> | Decimal | DecimalJsLike | number | string
    low?: DecimalFilter<"OhlcData"> | Decimal | DecimalJsLike | number | string
    close?: DecimalFilter<"OhlcData"> | Decimal | DecimalJsLike | number | string
    volume?: DecimalFilter<"OhlcData"> | Decimal | DecimalJsLike | number | string
    tradeCount?: IntFilter<"OhlcData"> | number
    createdAt?: DateTimeFilter<"OhlcData"> | Date | string
    updatedAt?: DateTimeFilter<"OhlcData"> | Date | string
    token0Address?: StringFilter<"OhlcData"> | string
    token1Address?: StringFilter<"OhlcData"> | string
  }

  export type OhlcDataOrderByWithRelationInput = {
    id?: SortOrder
    network?: SortOrder
    ammSource?: SortOrder
    timeframe?: SortOrder
    timestamp?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
    tradeCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    token0Address?: SortOrder
    token1Address?: SortOrder
  }

  export type OhlcDataWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    network_ammSource_token0Address_token1Address_timeframe_timestamp?: OhlcDataNetworkAmmSourceToken0AddressToken1AddressTimeframeTimestampCompoundUniqueInput
    AND?: OhlcDataWhereInput | OhlcDataWhereInput[]
    OR?: OhlcDataWhereInput[]
    NOT?: OhlcDataWhereInput | OhlcDataWhereInput[]
    network?: StringFilter<"OhlcData"> | string
    ammSource?: StringFilter<"OhlcData"> | string
    timeframe?: StringFilter<"OhlcData"> | string
    timestamp?: DateTimeFilter<"OhlcData"> | Date | string
    open?: DecimalFilter<"OhlcData"> | Decimal | DecimalJsLike | number | string
    high?: DecimalFilter<"OhlcData"> | Decimal | DecimalJsLike | number | string
    low?: DecimalFilter<"OhlcData"> | Decimal | DecimalJsLike | number | string
    close?: DecimalFilter<"OhlcData"> | Decimal | DecimalJsLike | number | string
    volume?: DecimalFilter<"OhlcData"> | Decimal | DecimalJsLike | number | string
    tradeCount?: IntFilter<"OhlcData"> | number
    createdAt?: DateTimeFilter<"OhlcData"> | Date | string
    updatedAt?: DateTimeFilter<"OhlcData"> | Date | string
    token0Address?: StringFilter<"OhlcData"> | string
    token1Address?: StringFilter<"OhlcData"> | string
  }, "id" | "network_ammSource_token0Address_token1Address_timeframe_timestamp">

  export type OhlcDataOrderByWithAggregationInput = {
    id?: SortOrder
    network?: SortOrder
    ammSource?: SortOrder
    timeframe?: SortOrder
    timestamp?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
    tradeCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    token0Address?: SortOrder
    token1Address?: SortOrder
    _count?: OhlcDataCountOrderByAggregateInput
    _avg?: OhlcDataAvgOrderByAggregateInput
    _max?: OhlcDataMaxOrderByAggregateInput
    _min?: OhlcDataMinOrderByAggregateInput
    _sum?: OhlcDataSumOrderByAggregateInput
  }

  export type OhlcDataScalarWhereWithAggregatesInput = {
    AND?: OhlcDataScalarWhereWithAggregatesInput | OhlcDataScalarWhereWithAggregatesInput[]
    OR?: OhlcDataScalarWhereWithAggregatesInput[]
    NOT?: OhlcDataScalarWhereWithAggregatesInput | OhlcDataScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OhlcData"> | number
    network?: StringWithAggregatesFilter<"OhlcData"> | string
    ammSource?: StringWithAggregatesFilter<"OhlcData"> | string
    timeframe?: StringWithAggregatesFilter<"OhlcData"> | string
    timestamp?: DateTimeWithAggregatesFilter<"OhlcData"> | Date | string
    open?: DecimalWithAggregatesFilter<"OhlcData"> | Decimal | DecimalJsLike | number | string
    high?: DecimalWithAggregatesFilter<"OhlcData"> | Decimal | DecimalJsLike | number | string
    low?: DecimalWithAggregatesFilter<"OhlcData"> | Decimal | DecimalJsLike | number | string
    close?: DecimalWithAggregatesFilter<"OhlcData"> | Decimal | DecimalJsLike | number | string
    volume?: DecimalWithAggregatesFilter<"OhlcData"> | Decimal | DecimalJsLike | number | string
    tradeCount?: IntWithAggregatesFilter<"OhlcData"> | number
    createdAt?: DateTimeWithAggregatesFilter<"OhlcData"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OhlcData"> | Date | string
    token0Address?: StringWithAggregatesFilter<"OhlcData"> | string
    token1Address?: StringWithAggregatesFilter<"OhlcData"> | string
  }

  export type GroupConfigurationWhereInput = {
    AND?: GroupConfigurationWhereInput | GroupConfigurationWhereInput[]
    OR?: GroupConfigurationWhereInput[]
    NOT?: GroupConfigurationWhereInput | GroupConfigurationWhereInput[]
    chatId?: BigIntFilter<"GroupConfiguration"> | bigint | number
    spikeMonitorEnabled?: BoolFilter<"GroupConfiguration"> | boolean
    spikeMonitorTokenId?: IntNullableFilter<"GroupConfiguration"> | number | null
    spikeMonitorThreadId?: StringNullableFilter<"GroupConfiguration"> | string | null
    spikeMonitorGifUrl?: StringNullableFilter<"GroupConfiguration"> | string | null
    spikeMonitorTimeframe?: IntNullableFilter<"GroupConfiguration"> | number | null
    spikeMonitorInterval?: IntNullableFilter<"GroupConfiguration"> | number | null
    spikeMonitorToken?: XOR<TokenNullableScalarRelationFilter, TokenWhereInput> | null
  }

  export type GroupConfigurationOrderByWithRelationInput = {
    chatId?: SortOrder
    spikeMonitorEnabled?: SortOrder
    spikeMonitorTokenId?: SortOrderInput | SortOrder
    spikeMonitorThreadId?: SortOrderInput | SortOrder
    spikeMonitorGifUrl?: SortOrderInput | SortOrder
    spikeMonitorTimeframe?: SortOrderInput | SortOrder
    spikeMonitorInterval?: SortOrderInput | SortOrder
    spikeMonitorToken?: TokenOrderByWithRelationInput
  }

  export type GroupConfigurationWhereUniqueInput = Prisma.AtLeast<{
    chatId?: bigint | number
    AND?: GroupConfigurationWhereInput | GroupConfigurationWhereInput[]
    OR?: GroupConfigurationWhereInput[]
    NOT?: GroupConfigurationWhereInput | GroupConfigurationWhereInput[]
    spikeMonitorEnabled?: BoolFilter<"GroupConfiguration"> | boolean
    spikeMonitorTokenId?: IntNullableFilter<"GroupConfiguration"> | number | null
    spikeMonitorThreadId?: StringNullableFilter<"GroupConfiguration"> | string | null
    spikeMonitorGifUrl?: StringNullableFilter<"GroupConfiguration"> | string | null
    spikeMonitorTimeframe?: IntNullableFilter<"GroupConfiguration"> | number | null
    spikeMonitorInterval?: IntNullableFilter<"GroupConfiguration"> | number | null
    spikeMonitorToken?: XOR<TokenNullableScalarRelationFilter, TokenWhereInput> | null
  }, "chatId">

  export type GroupConfigurationOrderByWithAggregationInput = {
    chatId?: SortOrder
    spikeMonitorEnabled?: SortOrder
    spikeMonitorTokenId?: SortOrderInput | SortOrder
    spikeMonitorThreadId?: SortOrderInput | SortOrder
    spikeMonitorGifUrl?: SortOrderInput | SortOrder
    spikeMonitorTimeframe?: SortOrderInput | SortOrder
    spikeMonitorInterval?: SortOrderInput | SortOrder
    _count?: GroupConfigurationCountOrderByAggregateInput
    _avg?: GroupConfigurationAvgOrderByAggregateInput
    _max?: GroupConfigurationMaxOrderByAggregateInput
    _min?: GroupConfigurationMinOrderByAggregateInput
    _sum?: GroupConfigurationSumOrderByAggregateInput
  }

  export type GroupConfigurationScalarWhereWithAggregatesInput = {
    AND?: GroupConfigurationScalarWhereWithAggregatesInput | GroupConfigurationScalarWhereWithAggregatesInput[]
    OR?: GroupConfigurationScalarWhereWithAggregatesInput[]
    NOT?: GroupConfigurationScalarWhereWithAggregatesInput | GroupConfigurationScalarWhereWithAggregatesInput[]
    chatId?: BigIntWithAggregatesFilter<"GroupConfiguration"> | bigint | number
    spikeMonitorEnabled?: BoolWithAggregatesFilter<"GroupConfiguration"> | boolean
    spikeMonitorTokenId?: IntNullableWithAggregatesFilter<"GroupConfiguration"> | number | null
    spikeMonitorThreadId?: StringNullableWithAggregatesFilter<"GroupConfiguration"> | string | null
    spikeMonitorGifUrl?: StringNullableWithAggregatesFilter<"GroupConfiguration"> | string | null
    spikeMonitorTimeframe?: IntNullableWithAggregatesFilter<"GroupConfiguration"> | number | null
    spikeMonitorInterval?: IntNullableWithAggregatesFilter<"GroupConfiguration"> | number | null
  }

  export type TokenCreateInput = {
    network: string
    address: string
    wrappedAddress?: string | null
    symbol: string
    name: string
    decimals: number
    maxSupply?: bigint | number | null
    circulatingSupply?: bigint | number | null
    createdAt?: Date | string
    pairsAsToken0?: PairCreateNestedManyWithoutToken0Input
    pairsAsToken1?: PairCreateNestedManyWithoutToken1Input
    groupConfigurations?: GroupConfigurationCreateNestedManyWithoutSpikeMonitorTokenInput
  }

  export type TokenUncheckedCreateInput = {
    id?: number
    network: string
    address: string
    wrappedAddress?: string | null
    symbol: string
    name: string
    decimals: number
    maxSupply?: bigint | number | null
    circulatingSupply?: bigint | number | null
    createdAt?: Date | string
    pairsAsToken0?: PairUncheckedCreateNestedManyWithoutToken0Input
    pairsAsToken1?: PairUncheckedCreateNestedManyWithoutToken1Input
    groupConfigurations?: GroupConfigurationUncheckedCreateNestedManyWithoutSpikeMonitorTokenInput
  }

  export type TokenUpdateInput = {
    network?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    wrappedAddress?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    maxSupply?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    circulatingSupply?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairsAsToken0?: PairUpdateManyWithoutToken0NestedInput
    pairsAsToken1?: PairUpdateManyWithoutToken1NestedInput
    groupConfigurations?: GroupConfigurationUpdateManyWithoutSpikeMonitorTokenNestedInput
  }

  export type TokenUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    wrappedAddress?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    maxSupply?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    circulatingSupply?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairsAsToken0?: PairUncheckedUpdateManyWithoutToken0NestedInput
    pairsAsToken1?: PairUncheckedUpdateManyWithoutToken1NestedInput
    groupConfigurations?: GroupConfigurationUncheckedUpdateManyWithoutSpikeMonitorTokenNestedInput
  }

  export type TokenCreateManyInput = {
    id?: number
    network: string
    address: string
    wrappedAddress?: string | null
    symbol: string
    name: string
    decimals: number
    maxSupply?: bigint | number | null
    circulatingSupply?: bigint | number | null
    createdAt?: Date | string
  }

  export type TokenUpdateManyMutationInput = {
    network?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    wrappedAddress?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    maxSupply?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    circulatingSupply?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    wrappedAddress?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    maxSupply?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    circulatingSupply?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairCreateInput = {
    network: string
    spikeyAmmPairAddress?: string | null
    spikeyAmmReserve0?: bigint | number | null
    spikeyAmmReserve1?: bigint | number | null
    lastStatsUpdate?: Date | string | null
    createdAt?: Date | string
    token0: TokenCreateNestedOneWithoutPairsAsToken0Input
    token1: TokenCreateNestedOneWithoutPairsAsToken1Input
  }

  export type PairUncheckedCreateInput = {
    id?: number
    network: string
    token0Id: number
    token1Id: number
    spikeyAmmPairAddress?: string | null
    spikeyAmmReserve0?: bigint | number | null
    spikeyAmmReserve1?: bigint | number | null
    lastStatsUpdate?: Date | string | null
    createdAt?: Date | string
  }

  export type PairUpdateInput = {
    network?: StringFieldUpdateOperationsInput | string
    spikeyAmmPairAddress?: NullableStringFieldUpdateOperationsInput | string | null
    spikeyAmmReserve0?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    spikeyAmmReserve1?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    lastStatsUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token0?: TokenUpdateOneRequiredWithoutPairsAsToken0NestedInput
    token1?: TokenUpdateOneRequiredWithoutPairsAsToken1NestedInput
  }

  export type PairUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    token0Id?: IntFieldUpdateOperationsInput | number
    token1Id?: IntFieldUpdateOperationsInput | number
    spikeyAmmPairAddress?: NullableStringFieldUpdateOperationsInput | string | null
    spikeyAmmReserve0?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    spikeyAmmReserve1?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    lastStatsUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairCreateManyInput = {
    id?: number
    network: string
    token0Id: number
    token1Id: number
    spikeyAmmPairAddress?: string | null
    spikeyAmmReserve0?: bigint | number | null
    spikeyAmmReserve1?: bigint | number | null
    lastStatsUpdate?: Date | string | null
    createdAt?: Date | string
  }

  export type PairUpdateManyMutationInput = {
    network?: StringFieldUpdateOperationsInput | string
    spikeyAmmPairAddress?: NullableStringFieldUpdateOperationsInput | string | null
    spikeyAmmReserve0?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    spikeyAmmReserve1?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    lastStatsUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    token0Id?: IntFieldUpdateOperationsInput | number
    token1Id?: IntFieldUpdateOperationsInput | number
    spikeyAmmPairAddress?: NullableStringFieldUpdateOperationsInput | string | null
    spikeyAmmReserve0?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    spikeyAmmReserve1?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    lastStatsUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OhlcDataCreateInput = {
    network: string
    ammSource: string
    timeframe: string
    timestamp: Date | string
    open: Decimal | DecimalJsLike | number | string
    high: Decimal | DecimalJsLike | number | string
    low: Decimal | DecimalJsLike | number | string
    close: Decimal | DecimalJsLike | number | string
    volume: Decimal | DecimalJsLike | number | string
    tradeCount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    token0Address: string
    token1Address: string
  }

  export type OhlcDataUncheckedCreateInput = {
    id?: number
    network: string
    ammSource: string
    timeframe: string
    timestamp: Date | string
    open: Decimal | DecimalJsLike | number | string
    high: Decimal | DecimalJsLike | number | string
    low: Decimal | DecimalJsLike | number | string
    close: Decimal | DecimalJsLike | number | string
    volume: Decimal | DecimalJsLike | number | string
    tradeCount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    token0Address: string
    token1Address: string
  }

  export type OhlcDataUpdateInput = {
    network?: StringFieldUpdateOperationsInput | string
    ammSource?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    open?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    high?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    low?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    close?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volume?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tradeCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token0Address?: StringFieldUpdateOperationsInput | string
    token1Address?: StringFieldUpdateOperationsInput | string
  }

  export type OhlcDataUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    ammSource?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    open?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    high?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    low?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    close?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volume?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tradeCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token0Address?: StringFieldUpdateOperationsInput | string
    token1Address?: StringFieldUpdateOperationsInput | string
  }

  export type OhlcDataCreateManyInput = {
    id?: number
    network: string
    ammSource: string
    timeframe: string
    timestamp: Date | string
    open: Decimal | DecimalJsLike | number | string
    high: Decimal | DecimalJsLike | number | string
    low: Decimal | DecimalJsLike | number | string
    close: Decimal | DecimalJsLike | number | string
    volume: Decimal | DecimalJsLike | number | string
    tradeCount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    token0Address: string
    token1Address: string
  }

  export type OhlcDataUpdateManyMutationInput = {
    network?: StringFieldUpdateOperationsInput | string
    ammSource?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    open?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    high?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    low?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    close?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volume?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tradeCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token0Address?: StringFieldUpdateOperationsInput | string
    token1Address?: StringFieldUpdateOperationsInput | string
  }

  export type OhlcDataUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    ammSource?: StringFieldUpdateOperationsInput | string
    timeframe?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    open?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    high?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    low?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    close?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volume?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tradeCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token0Address?: StringFieldUpdateOperationsInput | string
    token1Address?: StringFieldUpdateOperationsInput | string
  }

  export type GroupConfigurationCreateInput = {
    chatId: bigint | number
    spikeMonitorEnabled?: boolean
    spikeMonitorThreadId?: string | null
    spikeMonitorGifUrl?: string | null
    spikeMonitorTimeframe?: number | null
    spikeMonitorInterval?: number | null
    spikeMonitorToken?: TokenCreateNestedOneWithoutGroupConfigurationsInput
  }

  export type GroupConfigurationUncheckedCreateInput = {
    chatId: bigint | number
    spikeMonitorEnabled?: boolean
    spikeMonitorTokenId?: number | null
    spikeMonitorThreadId?: string | null
    spikeMonitorGifUrl?: string | null
    spikeMonitorTimeframe?: number | null
    spikeMonitorInterval?: number | null
  }

  export type GroupConfigurationUpdateInput = {
    chatId?: BigIntFieldUpdateOperationsInput | bigint | number
    spikeMonitorEnabled?: BoolFieldUpdateOperationsInput | boolean
    spikeMonitorThreadId?: NullableStringFieldUpdateOperationsInput | string | null
    spikeMonitorGifUrl?: NullableStringFieldUpdateOperationsInput | string | null
    spikeMonitorTimeframe?: NullableIntFieldUpdateOperationsInput | number | null
    spikeMonitorInterval?: NullableIntFieldUpdateOperationsInput | number | null
    spikeMonitorToken?: TokenUpdateOneWithoutGroupConfigurationsNestedInput
  }

  export type GroupConfigurationUncheckedUpdateInput = {
    chatId?: BigIntFieldUpdateOperationsInput | bigint | number
    spikeMonitorEnabled?: BoolFieldUpdateOperationsInput | boolean
    spikeMonitorTokenId?: NullableIntFieldUpdateOperationsInput | number | null
    spikeMonitorThreadId?: NullableStringFieldUpdateOperationsInput | string | null
    spikeMonitorGifUrl?: NullableStringFieldUpdateOperationsInput | string | null
    spikeMonitorTimeframe?: NullableIntFieldUpdateOperationsInput | number | null
    spikeMonitorInterval?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GroupConfigurationCreateManyInput = {
    chatId: bigint | number
    spikeMonitorEnabled?: boolean
    spikeMonitorTokenId?: number | null
    spikeMonitorThreadId?: string | null
    spikeMonitorGifUrl?: string | null
    spikeMonitorTimeframe?: number | null
    spikeMonitorInterval?: number | null
  }

  export type GroupConfigurationUpdateManyMutationInput = {
    chatId?: BigIntFieldUpdateOperationsInput | bigint | number
    spikeMonitorEnabled?: BoolFieldUpdateOperationsInput | boolean
    spikeMonitorThreadId?: NullableStringFieldUpdateOperationsInput | string | null
    spikeMonitorGifUrl?: NullableStringFieldUpdateOperationsInput | string | null
    spikeMonitorTimeframe?: NullableIntFieldUpdateOperationsInput | number | null
    spikeMonitorInterval?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GroupConfigurationUncheckedUpdateManyInput = {
    chatId?: BigIntFieldUpdateOperationsInput | bigint | number
    spikeMonitorEnabled?: BoolFieldUpdateOperationsInput | boolean
    spikeMonitorTokenId?: NullableIntFieldUpdateOperationsInput | number | null
    spikeMonitorThreadId?: NullableStringFieldUpdateOperationsInput | string | null
    spikeMonitorGifUrl?: NullableStringFieldUpdateOperationsInput | string | null
    spikeMonitorTimeframe?: NullableIntFieldUpdateOperationsInput | number | null
    spikeMonitorInterval?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
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

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
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

  export type PairListRelationFilter = {
    every?: PairWhereInput
    some?: PairWhereInput
    none?: PairWhereInput
  }

  export type GroupConfigurationListRelationFilter = {
    every?: GroupConfigurationWhereInput
    some?: GroupConfigurationWhereInput
    none?: GroupConfigurationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PairOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupConfigurationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TokenNetworkAddressCompoundUniqueInput = {
    network: string
    address: string
  }

  export type TokenCountOrderByAggregateInput = {
    id?: SortOrder
    network?: SortOrder
    address?: SortOrder
    wrappedAddress?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    decimals?: SortOrder
    maxSupply?: SortOrder
    circulatingSupply?: SortOrder
    createdAt?: SortOrder
  }

  export type TokenAvgOrderByAggregateInput = {
    id?: SortOrder
    decimals?: SortOrder
    maxSupply?: SortOrder
    circulatingSupply?: SortOrder
  }

  export type TokenMaxOrderByAggregateInput = {
    id?: SortOrder
    network?: SortOrder
    address?: SortOrder
    wrappedAddress?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    decimals?: SortOrder
    maxSupply?: SortOrder
    circulatingSupply?: SortOrder
    createdAt?: SortOrder
  }

  export type TokenMinOrderByAggregateInput = {
    id?: SortOrder
    network?: SortOrder
    address?: SortOrder
    wrappedAddress?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    decimals?: SortOrder
    maxSupply?: SortOrder
    circulatingSupply?: SortOrder
    createdAt?: SortOrder
  }

  export type TokenSumOrderByAggregateInput = {
    id?: SortOrder
    decimals?: SortOrder
    maxSupply?: SortOrder
    circulatingSupply?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
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

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type TokenScalarRelationFilter = {
    is?: TokenWhereInput
    isNot?: TokenWhereInput
  }

  export type PairNetworkToken0IdToken1IdCompoundUniqueInput = {
    network: string
    token0Id: number
    token1Id: number
  }

  export type PairCountOrderByAggregateInput = {
    id?: SortOrder
    network?: SortOrder
    token0Id?: SortOrder
    token1Id?: SortOrder
    spikeyAmmPairAddress?: SortOrder
    spikeyAmmReserve0?: SortOrder
    spikeyAmmReserve1?: SortOrder
    lastStatsUpdate?: SortOrder
    createdAt?: SortOrder
  }

  export type PairAvgOrderByAggregateInput = {
    id?: SortOrder
    token0Id?: SortOrder
    token1Id?: SortOrder
    spikeyAmmReserve0?: SortOrder
    spikeyAmmReserve1?: SortOrder
  }

  export type PairMaxOrderByAggregateInput = {
    id?: SortOrder
    network?: SortOrder
    token0Id?: SortOrder
    token1Id?: SortOrder
    spikeyAmmPairAddress?: SortOrder
    spikeyAmmReserve0?: SortOrder
    spikeyAmmReserve1?: SortOrder
    lastStatsUpdate?: SortOrder
    createdAt?: SortOrder
  }

  export type PairMinOrderByAggregateInput = {
    id?: SortOrder
    network?: SortOrder
    token0Id?: SortOrder
    token1Id?: SortOrder
    spikeyAmmPairAddress?: SortOrder
    spikeyAmmReserve0?: SortOrder
    spikeyAmmReserve1?: SortOrder
    lastStatsUpdate?: SortOrder
    createdAt?: SortOrder
  }

  export type PairSumOrderByAggregateInput = {
    id?: SortOrder
    token0Id?: SortOrder
    token1Id?: SortOrder
    spikeyAmmReserve0?: SortOrder
    spikeyAmmReserve1?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type OhlcDataNetworkAmmSourceToken0AddressToken1AddressTimeframeTimestampCompoundUniqueInput = {
    network: string
    ammSource: string
    token0Address: string
    token1Address: string
    timeframe: string
    timestamp: Date | string
  }

  export type OhlcDataCountOrderByAggregateInput = {
    id?: SortOrder
    network?: SortOrder
    ammSource?: SortOrder
    timeframe?: SortOrder
    timestamp?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
    tradeCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    token0Address?: SortOrder
    token1Address?: SortOrder
  }

  export type OhlcDataAvgOrderByAggregateInput = {
    id?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
    tradeCount?: SortOrder
  }

  export type OhlcDataMaxOrderByAggregateInput = {
    id?: SortOrder
    network?: SortOrder
    ammSource?: SortOrder
    timeframe?: SortOrder
    timestamp?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
    tradeCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    token0Address?: SortOrder
    token1Address?: SortOrder
  }

  export type OhlcDataMinOrderByAggregateInput = {
    id?: SortOrder
    network?: SortOrder
    ammSource?: SortOrder
    timeframe?: SortOrder
    timestamp?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
    tradeCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    token0Address?: SortOrder
    token1Address?: SortOrder
  }

  export type OhlcDataSumOrderByAggregateInput = {
    id?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
    tradeCount?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TokenNullableScalarRelationFilter = {
    is?: TokenWhereInput | null
    isNot?: TokenWhereInput | null
  }

  export type GroupConfigurationCountOrderByAggregateInput = {
    chatId?: SortOrder
    spikeMonitorEnabled?: SortOrder
    spikeMonitorTokenId?: SortOrder
    spikeMonitorThreadId?: SortOrder
    spikeMonitorGifUrl?: SortOrder
    spikeMonitorTimeframe?: SortOrder
    spikeMonitorInterval?: SortOrder
  }

  export type GroupConfigurationAvgOrderByAggregateInput = {
    chatId?: SortOrder
    spikeMonitorTokenId?: SortOrder
    spikeMonitorTimeframe?: SortOrder
    spikeMonitorInterval?: SortOrder
  }

  export type GroupConfigurationMaxOrderByAggregateInput = {
    chatId?: SortOrder
    spikeMonitorEnabled?: SortOrder
    spikeMonitorTokenId?: SortOrder
    spikeMonitorThreadId?: SortOrder
    spikeMonitorGifUrl?: SortOrder
    spikeMonitorTimeframe?: SortOrder
    spikeMonitorInterval?: SortOrder
  }

  export type GroupConfigurationMinOrderByAggregateInput = {
    chatId?: SortOrder
    spikeMonitorEnabled?: SortOrder
    spikeMonitorTokenId?: SortOrder
    spikeMonitorThreadId?: SortOrder
    spikeMonitorGifUrl?: SortOrder
    spikeMonitorTimeframe?: SortOrder
    spikeMonitorInterval?: SortOrder
  }

  export type GroupConfigurationSumOrderByAggregateInput = {
    chatId?: SortOrder
    spikeMonitorTokenId?: SortOrder
    spikeMonitorTimeframe?: SortOrder
    spikeMonitorInterval?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type PairCreateNestedManyWithoutToken0Input = {
    create?: XOR<PairCreateWithoutToken0Input, PairUncheckedCreateWithoutToken0Input> | PairCreateWithoutToken0Input[] | PairUncheckedCreateWithoutToken0Input[]
    connectOrCreate?: PairCreateOrConnectWithoutToken0Input | PairCreateOrConnectWithoutToken0Input[]
    createMany?: PairCreateManyToken0InputEnvelope
    connect?: PairWhereUniqueInput | PairWhereUniqueInput[]
  }

  export type PairCreateNestedManyWithoutToken1Input = {
    create?: XOR<PairCreateWithoutToken1Input, PairUncheckedCreateWithoutToken1Input> | PairCreateWithoutToken1Input[] | PairUncheckedCreateWithoutToken1Input[]
    connectOrCreate?: PairCreateOrConnectWithoutToken1Input | PairCreateOrConnectWithoutToken1Input[]
    createMany?: PairCreateManyToken1InputEnvelope
    connect?: PairWhereUniqueInput | PairWhereUniqueInput[]
  }

  export type GroupConfigurationCreateNestedManyWithoutSpikeMonitorTokenInput = {
    create?: XOR<GroupConfigurationCreateWithoutSpikeMonitorTokenInput, GroupConfigurationUncheckedCreateWithoutSpikeMonitorTokenInput> | GroupConfigurationCreateWithoutSpikeMonitorTokenInput[] | GroupConfigurationUncheckedCreateWithoutSpikeMonitorTokenInput[]
    connectOrCreate?: GroupConfigurationCreateOrConnectWithoutSpikeMonitorTokenInput | GroupConfigurationCreateOrConnectWithoutSpikeMonitorTokenInput[]
    createMany?: GroupConfigurationCreateManySpikeMonitorTokenInputEnvelope
    connect?: GroupConfigurationWhereUniqueInput | GroupConfigurationWhereUniqueInput[]
  }

  export type PairUncheckedCreateNestedManyWithoutToken0Input = {
    create?: XOR<PairCreateWithoutToken0Input, PairUncheckedCreateWithoutToken0Input> | PairCreateWithoutToken0Input[] | PairUncheckedCreateWithoutToken0Input[]
    connectOrCreate?: PairCreateOrConnectWithoutToken0Input | PairCreateOrConnectWithoutToken0Input[]
    createMany?: PairCreateManyToken0InputEnvelope
    connect?: PairWhereUniqueInput | PairWhereUniqueInput[]
  }

  export type PairUncheckedCreateNestedManyWithoutToken1Input = {
    create?: XOR<PairCreateWithoutToken1Input, PairUncheckedCreateWithoutToken1Input> | PairCreateWithoutToken1Input[] | PairUncheckedCreateWithoutToken1Input[]
    connectOrCreate?: PairCreateOrConnectWithoutToken1Input | PairCreateOrConnectWithoutToken1Input[]
    createMany?: PairCreateManyToken1InputEnvelope
    connect?: PairWhereUniqueInput | PairWhereUniqueInput[]
  }

  export type GroupConfigurationUncheckedCreateNestedManyWithoutSpikeMonitorTokenInput = {
    create?: XOR<GroupConfigurationCreateWithoutSpikeMonitorTokenInput, GroupConfigurationUncheckedCreateWithoutSpikeMonitorTokenInput> | GroupConfigurationCreateWithoutSpikeMonitorTokenInput[] | GroupConfigurationUncheckedCreateWithoutSpikeMonitorTokenInput[]
    connectOrCreate?: GroupConfigurationCreateOrConnectWithoutSpikeMonitorTokenInput | GroupConfigurationCreateOrConnectWithoutSpikeMonitorTokenInput[]
    createMany?: GroupConfigurationCreateManySpikeMonitorTokenInputEnvelope
    connect?: GroupConfigurationWhereUniqueInput | GroupConfigurationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PairUpdateManyWithoutToken0NestedInput = {
    create?: XOR<PairCreateWithoutToken0Input, PairUncheckedCreateWithoutToken0Input> | PairCreateWithoutToken0Input[] | PairUncheckedCreateWithoutToken0Input[]
    connectOrCreate?: PairCreateOrConnectWithoutToken0Input | PairCreateOrConnectWithoutToken0Input[]
    upsert?: PairUpsertWithWhereUniqueWithoutToken0Input | PairUpsertWithWhereUniqueWithoutToken0Input[]
    createMany?: PairCreateManyToken0InputEnvelope
    set?: PairWhereUniqueInput | PairWhereUniqueInput[]
    disconnect?: PairWhereUniqueInput | PairWhereUniqueInput[]
    delete?: PairWhereUniqueInput | PairWhereUniqueInput[]
    connect?: PairWhereUniqueInput | PairWhereUniqueInput[]
    update?: PairUpdateWithWhereUniqueWithoutToken0Input | PairUpdateWithWhereUniqueWithoutToken0Input[]
    updateMany?: PairUpdateManyWithWhereWithoutToken0Input | PairUpdateManyWithWhereWithoutToken0Input[]
    deleteMany?: PairScalarWhereInput | PairScalarWhereInput[]
  }

  export type PairUpdateManyWithoutToken1NestedInput = {
    create?: XOR<PairCreateWithoutToken1Input, PairUncheckedCreateWithoutToken1Input> | PairCreateWithoutToken1Input[] | PairUncheckedCreateWithoutToken1Input[]
    connectOrCreate?: PairCreateOrConnectWithoutToken1Input | PairCreateOrConnectWithoutToken1Input[]
    upsert?: PairUpsertWithWhereUniqueWithoutToken1Input | PairUpsertWithWhereUniqueWithoutToken1Input[]
    createMany?: PairCreateManyToken1InputEnvelope
    set?: PairWhereUniqueInput | PairWhereUniqueInput[]
    disconnect?: PairWhereUniqueInput | PairWhereUniqueInput[]
    delete?: PairWhereUniqueInput | PairWhereUniqueInput[]
    connect?: PairWhereUniqueInput | PairWhereUniqueInput[]
    update?: PairUpdateWithWhereUniqueWithoutToken1Input | PairUpdateWithWhereUniqueWithoutToken1Input[]
    updateMany?: PairUpdateManyWithWhereWithoutToken1Input | PairUpdateManyWithWhereWithoutToken1Input[]
    deleteMany?: PairScalarWhereInput | PairScalarWhereInput[]
  }

  export type GroupConfigurationUpdateManyWithoutSpikeMonitorTokenNestedInput = {
    create?: XOR<GroupConfigurationCreateWithoutSpikeMonitorTokenInput, GroupConfigurationUncheckedCreateWithoutSpikeMonitorTokenInput> | GroupConfigurationCreateWithoutSpikeMonitorTokenInput[] | GroupConfigurationUncheckedCreateWithoutSpikeMonitorTokenInput[]
    connectOrCreate?: GroupConfigurationCreateOrConnectWithoutSpikeMonitorTokenInput | GroupConfigurationCreateOrConnectWithoutSpikeMonitorTokenInput[]
    upsert?: GroupConfigurationUpsertWithWhereUniqueWithoutSpikeMonitorTokenInput | GroupConfigurationUpsertWithWhereUniqueWithoutSpikeMonitorTokenInput[]
    createMany?: GroupConfigurationCreateManySpikeMonitorTokenInputEnvelope
    set?: GroupConfigurationWhereUniqueInput | GroupConfigurationWhereUniqueInput[]
    disconnect?: GroupConfigurationWhereUniqueInput | GroupConfigurationWhereUniqueInput[]
    delete?: GroupConfigurationWhereUniqueInput | GroupConfigurationWhereUniqueInput[]
    connect?: GroupConfigurationWhereUniqueInput | GroupConfigurationWhereUniqueInput[]
    update?: GroupConfigurationUpdateWithWhereUniqueWithoutSpikeMonitorTokenInput | GroupConfigurationUpdateWithWhereUniqueWithoutSpikeMonitorTokenInput[]
    updateMany?: GroupConfigurationUpdateManyWithWhereWithoutSpikeMonitorTokenInput | GroupConfigurationUpdateManyWithWhereWithoutSpikeMonitorTokenInput[]
    deleteMany?: GroupConfigurationScalarWhereInput | GroupConfigurationScalarWhereInput[]
  }

  export type PairUncheckedUpdateManyWithoutToken0NestedInput = {
    create?: XOR<PairCreateWithoutToken0Input, PairUncheckedCreateWithoutToken0Input> | PairCreateWithoutToken0Input[] | PairUncheckedCreateWithoutToken0Input[]
    connectOrCreate?: PairCreateOrConnectWithoutToken0Input | PairCreateOrConnectWithoutToken0Input[]
    upsert?: PairUpsertWithWhereUniqueWithoutToken0Input | PairUpsertWithWhereUniqueWithoutToken0Input[]
    createMany?: PairCreateManyToken0InputEnvelope
    set?: PairWhereUniqueInput | PairWhereUniqueInput[]
    disconnect?: PairWhereUniqueInput | PairWhereUniqueInput[]
    delete?: PairWhereUniqueInput | PairWhereUniqueInput[]
    connect?: PairWhereUniqueInput | PairWhereUniqueInput[]
    update?: PairUpdateWithWhereUniqueWithoutToken0Input | PairUpdateWithWhereUniqueWithoutToken0Input[]
    updateMany?: PairUpdateManyWithWhereWithoutToken0Input | PairUpdateManyWithWhereWithoutToken0Input[]
    deleteMany?: PairScalarWhereInput | PairScalarWhereInput[]
  }

  export type PairUncheckedUpdateManyWithoutToken1NestedInput = {
    create?: XOR<PairCreateWithoutToken1Input, PairUncheckedCreateWithoutToken1Input> | PairCreateWithoutToken1Input[] | PairUncheckedCreateWithoutToken1Input[]
    connectOrCreate?: PairCreateOrConnectWithoutToken1Input | PairCreateOrConnectWithoutToken1Input[]
    upsert?: PairUpsertWithWhereUniqueWithoutToken1Input | PairUpsertWithWhereUniqueWithoutToken1Input[]
    createMany?: PairCreateManyToken1InputEnvelope
    set?: PairWhereUniqueInput | PairWhereUniqueInput[]
    disconnect?: PairWhereUniqueInput | PairWhereUniqueInput[]
    delete?: PairWhereUniqueInput | PairWhereUniqueInput[]
    connect?: PairWhereUniqueInput | PairWhereUniqueInput[]
    update?: PairUpdateWithWhereUniqueWithoutToken1Input | PairUpdateWithWhereUniqueWithoutToken1Input[]
    updateMany?: PairUpdateManyWithWhereWithoutToken1Input | PairUpdateManyWithWhereWithoutToken1Input[]
    deleteMany?: PairScalarWhereInput | PairScalarWhereInput[]
  }

  export type GroupConfigurationUncheckedUpdateManyWithoutSpikeMonitorTokenNestedInput = {
    create?: XOR<GroupConfigurationCreateWithoutSpikeMonitorTokenInput, GroupConfigurationUncheckedCreateWithoutSpikeMonitorTokenInput> | GroupConfigurationCreateWithoutSpikeMonitorTokenInput[] | GroupConfigurationUncheckedCreateWithoutSpikeMonitorTokenInput[]
    connectOrCreate?: GroupConfigurationCreateOrConnectWithoutSpikeMonitorTokenInput | GroupConfigurationCreateOrConnectWithoutSpikeMonitorTokenInput[]
    upsert?: GroupConfigurationUpsertWithWhereUniqueWithoutSpikeMonitorTokenInput | GroupConfigurationUpsertWithWhereUniqueWithoutSpikeMonitorTokenInput[]
    createMany?: GroupConfigurationCreateManySpikeMonitorTokenInputEnvelope
    set?: GroupConfigurationWhereUniqueInput | GroupConfigurationWhereUniqueInput[]
    disconnect?: GroupConfigurationWhereUniqueInput | GroupConfigurationWhereUniqueInput[]
    delete?: GroupConfigurationWhereUniqueInput | GroupConfigurationWhereUniqueInput[]
    connect?: GroupConfigurationWhereUniqueInput | GroupConfigurationWhereUniqueInput[]
    update?: GroupConfigurationUpdateWithWhereUniqueWithoutSpikeMonitorTokenInput | GroupConfigurationUpdateWithWhereUniqueWithoutSpikeMonitorTokenInput[]
    updateMany?: GroupConfigurationUpdateManyWithWhereWithoutSpikeMonitorTokenInput | GroupConfigurationUpdateManyWithWhereWithoutSpikeMonitorTokenInput[]
    deleteMany?: GroupConfigurationScalarWhereInput | GroupConfigurationScalarWhereInput[]
  }

  export type TokenCreateNestedOneWithoutPairsAsToken0Input = {
    create?: XOR<TokenCreateWithoutPairsAsToken0Input, TokenUncheckedCreateWithoutPairsAsToken0Input>
    connectOrCreate?: TokenCreateOrConnectWithoutPairsAsToken0Input
    connect?: TokenWhereUniqueInput
  }

  export type TokenCreateNestedOneWithoutPairsAsToken1Input = {
    create?: XOR<TokenCreateWithoutPairsAsToken1Input, TokenUncheckedCreateWithoutPairsAsToken1Input>
    connectOrCreate?: TokenCreateOrConnectWithoutPairsAsToken1Input
    connect?: TokenWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type TokenUpdateOneRequiredWithoutPairsAsToken0NestedInput = {
    create?: XOR<TokenCreateWithoutPairsAsToken0Input, TokenUncheckedCreateWithoutPairsAsToken0Input>
    connectOrCreate?: TokenCreateOrConnectWithoutPairsAsToken0Input
    upsert?: TokenUpsertWithoutPairsAsToken0Input
    connect?: TokenWhereUniqueInput
    update?: XOR<XOR<TokenUpdateToOneWithWhereWithoutPairsAsToken0Input, TokenUpdateWithoutPairsAsToken0Input>, TokenUncheckedUpdateWithoutPairsAsToken0Input>
  }

  export type TokenUpdateOneRequiredWithoutPairsAsToken1NestedInput = {
    create?: XOR<TokenCreateWithoutPairsAsToken1Input, TokenUncheckedCreateWithoutPairsAsToken1Input>
    connectOrCreate?: TokenCreateOrConnectWithoutPairsAsToken1Input
    upsert?: TokenUpsertWithoutPairsAsToken1Input
    connect?: TokenWhereUniqueInput
    update?: XOR<XOR<TokenUpdateToOneWithWhereWithoutPairsAsToken1Input, TokenUpdateWithoutPairsAsToken1Input>, TokenUncheckedUpdateWithoutPairsAsToken1Input>
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type TokenCreateNestedOneWithoutGroupConfigurationsInput = {
    create?: XOR<TokenCreateWithoutGroupConfigurationsInput, TokenUncheckedCreateWithoutGroupConfigurationsInput>
    connectOrCreate?: TokenCreateOrConnectWithoutGroupConfigurationsInput
    connect?: TokenWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TokenUpdateOneWithoutGroupConfigurationsNestedInput = {
    create?: XOR<TokenCreateWithoutGroupConfigurationsInput, TokenUncheckedCreateWithoutGroupConfigurationsInput>
    connectOrCreate?: TokenCreateOrConnectWithoutGroupConfigurationsInput
    upsert?: TokenUpsertWithoutGroupConfigurationsInput
    disconnect?: TokenWhereInput | boolean
    delete?: TokenWhereInput | boolean
    connect?: TokenWhereUniqueInput
    update?: XOR<XOR<TokenUpdateToOneWithWhereWithoutGroupConfigurationsInput, TokenUpdateWithoutGroupConfigurationsInput>, TokenUncheckedUpdateWithoutGroupConfigurationsInput>
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

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
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

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
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

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type PairCreateWithoutToken0Input = {
    network: string
    spikeyAmmPairAddress?: string | null
    spikeyAmmReserve0?: bigint | number | null
    spikeyAmmReserve1?: bigint | number | null
    lastStatsUpdate?: Date | string | null
    createdAt?: Date | string
    token1: TokenCreateNestedOneWithoutPairsAsToken1Input
  }

  export type PairUncheckedCreateWithoutToken0Input = {
    id?: number
    network: string
    token1Id: number
    spikeyAmmPairAddress?: string | null
    spikeyAmmReserve0?: bigint | number | null
    spikeyAmmReserve1?: bigint | number | null
    lastStatsUpdate?: Date | string | null
    createdAt?: Date | string
  }

  export type PairCreateOrConnectWithoutToken0Input = {
    where: PairWhereUniqueInput
    create: XOR<PairCreateWithoutToken0Input, PairUncheckedCreateWithoutToken0Input>
  }

  export type PairCreateManyToken0InputEnvelope = {
    data: PairCreateManyToken0Input | PairCreateManyToken0Input[]
    skipDuplicates?: boolean
  }

  export type PairCreateWithoutToken1Input = {
    network: string
    spikeyAmmPairAddress?: string | null
    spikeyAmmReserve0?: bigint | number | null
    spikeyAmmReserve1?: bigint | number | null
    lastStatsUpdate?: Date | string | null
    createdAt?: Date | string
    token0: TokenCreateNestedOneWithoutPairsAsToken0Input
  }

  export type PairUncheckedCreateWithoutToken1Input = {
    id?: number
    network: string
    token0Id: number
    spikeyAmmPairAddress?: string | null
    spikeyAmmReserve0?: bigint | number | null
    spikeyAmmReserve1?: bigint | number | null
    lastStatsUpdate?: Date | string | null
    createdAt?: Date | string
  }

  export type PairCreateOrConnectWithoutToken1Input = {
    where: PairWhereUniqueInput
    create: XOR<PairCreateWithoutToken1Input, PairUncheckedCreateWithoutToken1Input>
  }

  export type PairCreateManyToken1InputEnvelope = {
    data: PairCreateManyToken1Input | PairCreateManyToken1Input[]
    skipDuplicates?: boolean
  }

  export type GroupConfigurationCreateWithoutSpikeMonitorTokenInput = {
    chatId: bigint | number
    spikeMonitorEnabled?: boolean
    spikeMonitorThreadId?: string | null
    spikeMonitorGifUrl?: string | null
    spikeMonitorTimeframe?: number | null
    spikeMonitorInterval?: number | null
  }

  export type GroupConfigurationUncheckedCreateWithoutSpikeMonitorTokenInput = {
    chatId: bigint | number
    spikeMonitorEnabled?: boolean
    spikeMonitorThreadId?: string | null
    spikeMonitorGifUrl?: string | null
    spikeMonitorTimeframe?: number | null
    spikeMonitorInterval?: number | null
  }

  export type GroupConfigurationCreateOrConnectWithoutSpikeMonitorTokenInput = {
    where: GroupConfigurationWhereUniqueInput
    create: XOR<GroupConfigurationCreateWithoutSpikeMonitorTokenInput, GroupConfigurationUncheckedCreateWithoutSpikeMonitorTokenInput>
  }

  export type GroupConfigurationCreateManySpikeMonitorTokenInputEnvelope = {
    data: GroupConfigurationCreateManySpikeMonitorTokenInput | GroupConfigurationCreateManySpikeMonitorTokenInput[]
    skipDuplicates?: boolean
  }

  export type PairUpsertWithWhereUniqueWithoutToken0Input = {
    where: PairWhereUniqueInput
    update: XOR<PairUpdateWithoutToken0Input, PairUncheckedUpdateWithoutToken0Input>
    create: XOR<PairCreateWithoutToken0Input, PairUncheckedCreateWithoutToken0Input>
  }

  export type PairUpdateWithWhereUniqueWithoutToken0Input = {
    where: PairWhereUniqueInput
    data: XOR<PairUpdateWithoutToken0Input, PairUncheckedUpdateWithoutToken0Input>
  }

  export type PairUpdateManyWithWhereWithoutToken0Input = {
    where: PairScalarWhereInput
    data: XOR<PairUpdateManyMutationInput, PairUncheckedUpdateManyWithoutToken0Input>
  }

  export type PairScalarWhereInput = {
    AND?: PairScalarWhereInput | PairScalarWhereInput[]
    OR?: PairScalarWhereInput[]
    NOT?: PairScalarWhereInput | PairScalarWhereInput[]
    id?: IntFilter<"Pair"> | number
    network?: StringFilter<"Pair"> | string
    token0Id?: IntFilter<"Pair"> | number
    token1Id?: IntFilter<"Pair"> | number
    spikeyAmmPairAddress?: StringNullableFilter<"Pair"> | string | null
    spikeyAmmReserve0?: BigIntNullableFilter<"Pair"> | bigint | number | null
    spikeyAmmReserve1?: BigIntNullableFilter<"Pair"> | bigint | number | null
    lastStatsUpdate?: DateTimeNullableFilter<"Pair"> | Date | string | null
    createdAt?: DateTimeFilter<"Pair"> | Date | string
  }

  export type PairUpsertWithWhereUniqueWithoutToken1Input = {
    where: PairWhereUniqueInput
    update: XOR<PairUpdateWithoutToken1Input, PairUncheckedUpdateWithoutToken1Input>
    create: XOR<PairCreateWithoutToken1Input, PairUncheckedCreateWithoutToken1Input>
  }

  export type PairUpdateWithWhereUniqueWithoutToken1Input = {
    where: PairWhereUniqueInput
    data: XOR<PairUpdateWithoutToken1Input, PairUncheckedUpdateWithoutToken1Input>
  }

  export type PairUpdateManyWithWhereWithoutToken1Input = {
    where: PairScalarWhereInput
    data: XOR<PairUpdateManyMutationInput, PairUncheckedUpdateManyWithoutToken1Input>
  }

  export type GroupConfigurationUpsertWithWhereUniqueWithoutSpikeMonitorTokenInput = {
    where: GroupConfigurationWhereUniqueInput
    update: XOR<GroupConfigurationUpdateWithoutSpikeMonitorTokenInput, GroupConfigurationUncheckedUpdateWithoutSpikeMonitorTokenInput>
    create: XOR<GroupConfigurationCreateWithoutSpikeMonitorTokenInput, GroupConfigurationUncheckedCreateWithoutSpikeMonitorTokenInput>
  }

  export type GroupConfigurationUpdateWithWhereUniqueWithoutSpikeMonitorTokenInput = {
    where: GroupConfigurationWhereUniqueInput
    data: XOR<GroupConfigurationUpdateWithoutSpikeMonitorTokenInput, GroupConfigurationUncheckedUpdateWithoutSpikeMonitorTokenInput>
  }

  export type GroupConfigurationUpdateManyWithWhereWithoutSpikeMonitorTokenInput = {
    where: GroupConfigurationScalarWhereInput
    data: XOR<GroupConfigurationUpdateManyMutationInput, GroupConfigurationUncheckedUpdateManyWithoutSpikeMonitorTokenInput>
  }

  export type GroupConfigurationScalarWhereInput = {
    AND?: GroupConfigurationScalarWhereInput | GroupConfigurationScalarWhereInput[]
    OR?: GroupConfigurationScalarWhereInput[]
    NOT?: GroupConfigurationScalarWhereInput | GroupConfigurationScalarWhereInput[]
    chatId?: BigIntFilter<"GroupConfiguration"> | bigint | number
    spikeMonitorEnabled?: BoolFilter<"GroupConfiguration"> | boolean
    spikeMonitorTokenId?: IntNullableFilter<"GroupConfiguration"> | number | null
    spikeMonitorThreadId?: StringNullableFilter<"GroupConfiguration"> | string | null
    spikeMonitorGifUrl?: StringNullableFilter<"GroupConfiguration"> | string | null
    spikeMonitorTimeframe?: IntNullableFilter<"GroupConfiguration"> | number | null
    spikeMonitorInterval?: IntNullableFilter<"GroupConfiguration"> | number | null
  }

  export type TokenCreateWithoutPairsAsToken0Input = {
    network: string
    address: string
    wrappedAddress?: string | null
    symbol: string
    name: string
    decimals: number
    maxSupply?: bigint | number | null
    circulatingSupply?: bigint | number | null
    createdAt?: Date | string
    pairsAsToken1?: PairCreateNestedManyWithoutToken1Input
    groupConfigurations?: GroupConfigurationCreateNestedManyWithoutSpikeMonitorTokenInput
  }

  export type TokenUncheckedCreateWithoutPairsAsToken0Input = {
    id?: number
    network: string
    address: string
    wrappedAddress?: string | null
    symbol: string
    name: string
    decimals: number
    maxSupply?: bigint | number | null
    circulatingSupply?: bigint | number | null
    createdAt?: Date | string
    pairsAsToken1?: PairUncheckedCreateNestedManyWithoutToken1Input
    groupConfigurations?: GroupConfigurationUncheckedCreateNestedManyWithoutSpikeMonitorTokenInput
  }

  export type TokenCreateOrConnectWithoutPairsAsToken0Input = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutPairsAsToken0Input, TokenUncheckedCreateWithoutPairsAsToken0Input>
  }

  export type TokenCreateWithoutPairsAsToken1Input = {
    network: string
    address: string
    wrappedAddress?: string | null
    symbol: string
    name: string
    decimals: number
    maxSupply?: bigint | number | null
    circulatingSupply?: bigint | number | null
    createdAt?: Date | string
    pairsAsToken0?: PairCreateNestedManyWithoutToken0Input
    groupConfigurations?: GroupConfigurationCreateNestedManyWithoutSpikeMonitorTokenInput
  }

  export type TokenUncheckedCreateWithoutPairsAsToken1Input = {
    id?: number
    network: string
    address: string
    wrappedAddress?: string | null
    symbol: string
    name: string
    decimals: number
    maxSupply?: bigint | number | null
    circulatingSupply?: bigint | number | null
    createdAt?: Date | string
    pairsAsToken0?: PairUncheckedCreateNestedManyWithoutToken0Input
    groupConfigurations?: GroupConfigurationUncheckedCreateNestedManyWithoutSpikeMonitorTokenInput
  }

  export type TokenCreateOrConnectWithoutPairsAsToken1Input = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutPairsAsToken1Input, TokenUncheckedCreateWithoutPairsAsToken1Input>
  }

  export type TokenUpsertWithoutPairsAsToken0Input = {
    update: XOR<TokenUpdateWithoutPairsAsToken0Input, TokenUncheckedUpdateWithoutPairsAsToken0Input>
    create: XOR<TokenCreateWithoutPairsAsToken0Input, TokenUncheckedCreateWithoutPairsAsToken0Input>
    where?: TokenWhereInput
  }

  export type TokenUpdateToOneWithWhereWithoutPairsAsToken0Input = {
    where?: TokenWhereInput
    data: XOR<TokenUpdateWithoutPairsAsToken0Input, TokenUncheckedUpdateWithoutPairsAsToken0Input>
  }

  export type TokenUpdateWithoutPairsAsToken0Input = {
    network?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    wrappedAddress?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    maxSupply?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    circulatingSupply?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairsAsToken1?: PairUpdateManyWithoutToken1NestedInput
    groupConfigurations?: GroupConfigurationUpdateManyWithoutSpikeMonitorTokenNestedInput
  }

  export type TokenUncheckedUpdateWithoutPairsAsToken0Input = {
    id?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    wrappedAddress?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    maxSupply?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    circulatingSupply?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairsAsToken1?: PairUncheckedUpdateManyWithoutToken1NestedInput
    groupConfigurations?: GroupConfigurationUncheckedUpdateManyWithoutSpikeMonitorTokenNestedInput
  }

  export type TokenUpsertWithoutPairsAsToken1Input = {
    update: XOR<TokenUpdateWithoutPairsAsToken1Input, TokenUncheckedUpdateWithoutPairsAsToken1Input>
    create: XOR<TokenCreateWithoutPairsAsToken1Input, TokenUncheckedCreateWithoutPairsAsToken1Input>
    where?: TokenWhereInput
  }

  export type TokenUpdateToOneWithWhereWithoutPairsAsToken1Input = {
    where?: TokenWhereInput
    data: XOR<TokenUpdateWithoutPairsAsToken1Input, TokenUncheckedUpdateWithoutPairsAsToken1Input>
  }

  export type TokenUpdateWithoutPairsAsToken1Input = {
    network?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    wrappedAddress?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    maxSupply?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    circulatingSupply?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairsAsToken0?: PairUpdateManyWithoutToken0NestedInput
    groupConfigurations?: GroupConfigurationUpdateManyWithoutSpikeMonitorTokenNestedInput
  }

  export type TokenUncheckedUpdateWithoutPairsAsToken1Input = {
    id?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    wrappedAddress?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    maxSupply?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    circulatingSupply?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairsAsToken0?: PairUncheckedUpdateManyWithoutToken0NestedInput
    groupConfigurations?: GroupConfigurationUncheckedUpdateManyWithoutSpikeMonitorTokenNestedInput
  }

  export type TokenCreateWithoutGroupConfigurationsInput = {
    network: string
    address: string
    wrappedAddress?: string | null
    symbol: string
    name: string
    decimals: number
    maxSupply?: bigint | number | null
    circulatingSupply?: bigint | number | null
    createdAt?: Date | string
    pairsAsToken0?: PairCreateNestedManyWithoutToken0Input
    pairsAsToken1?: PairCreateNestedManyWithoutToken1Input
  }

  export type TokenUncheckedCreateWithoutGroupConfigurationsInput = {
    id?: number
    network: string
    address: string
    wrappedAddress?: string | null
    symbol: string
    name: string
    decimals: number
    maxSupply?: bigint | number | null
    circulatingSupply?: bigint | number | null
    createdAt?: Date | string
    pairsAsToken0?: PairUncheckedCreateNestedManyWithoutToken0Input
    pairsAsToken1?: PairUncheckedCreateNestedManyWithoutToken1Input
  }

  export type TokenCreateOrConnectWithoutGroupConfigurationsInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutGroupConfigurationsInput, TokenUncheckedCreateWithoutGroupConfigurationsInput>
  }

  export type TokenUpsertWithoutGroupConfigurationsInput = {
    update: XOR<TokenUpdateWithoutGroupConfigurationsInput, TokenUncheckedUpdateWithoutGroupConfigurationsInput>
    create: XOR<TokenCreateWithoutGroupConfigurationsInput, TokenUncheckedCreateWithoutGroupConfigurationsInput>
    where?: TokenWhereInput
  }

  export type TokenUpdateToOneWithWhereWithoutGroupConfigurationsInput = {
    where?: TokenWhereInput
    data: XOR<TokenUpdateWithoutGroupConfigurationsInput, TokenUncheckedUpdateWithoutGroupConfigurationsInput>
  }

  export type TokenUpdateWithoutGroupConfigurationsInput = {
    network?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    wrappedAddress?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    maxSupply?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    circulatingSupply?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairsAsToken0?: PairUpdateManyWithoutToken0NestedInput
    pairsAsToken1?: PairUpdateManyWithoutToken1NestedInput
  }

  export type TokenUncheckedUpdateWithoutGroupConfigurationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    wrappedAddress?: NullableStringFieldUpdateOperationsInput | string | null
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    maxSupply?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    circulatingSupply?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairsAsToken0?: PairUncheckedUpdateManyWithoutToken0NestedInput
    pairsAsToken1?: PairUncheckedUpdateManyWithoutToken1NestedInput
  }

  export type PairCreateManyToken0Input = {
    id?: number
    network: string
    token1Id: number
    spikeyAmmPairAddress?: string | null
    spikeyAmmReserve0?: bigint | number | null
    spikeyAmmReserve1?: bigint | number | null
    lastStatsUpdate?: Date | string | null
    createdAt?: Date | string
  }

  export type PairCreateManyToken1Input = {
    id?: number
    network: string
    token0Id: number
    spikeyAmmPairAddress?: string | null
    spikeyAmmReserve0?: bigint | number | null
    spikeyAmmReserve1?: bigint | number | null
    lastStatsUpdate?: Date | string | null
    createdAt?: Date | string
  }

  export type GroupConfigurationCreateManySpikeMonitorTokenInput = {
    chatId: bigint | number
    spikeMonitorEnabled?: boolean
    spikeMonitorThreadId?: string | null
    spikeMonitorGifUrl?: string | null
    spikeMonitorTimeframe?: number | null
    spikeMonitorInterval?: number | null
  }

  export type PairUpdateWithoutToken0Input = {
    network?: StringFieldUpdateOperationsInput | string
    spikeyAmmPairAddress?: NullableStringFieldUpdateOperationsInput | string | null
    spikeyAmmReserve0?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    spikeyAmmReserve1?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    lastStatsUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token1?: TokenUpdateOneRequiredWithoutPairsAsToken1NestedInput
  }

  export type PairUncheckedUpdateWithoutToken0Input = {
    id?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    token1Id?: IntFieldUpdateOperationsInput | number
    spikeyAmmPairAddress?: NullableStringFieldUpdateOperationsInput | string | null
    spikeyAmmReserve0?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    spikeyAmmReserve1?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    lastStatsUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairUncheckedUpdateManyWithoutToken0Input = {
    id?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    token1Id?: IntFieldUpdateOperationsInput | number
    spikeyAmmPairAddress?: NullableStringFieldUpdateOperationsInput | string | null
    spikeyAmmReserve0?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    spikeyAmmReserve1?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    lastStatsUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairUpdateWithoutToken1Input = {
    network?: StringFieldUpdateOperationsInput | string
    spikeyAmmPairAddress?: NullableStringFieldUpdateOperationsInput | string | null
    spikeyAmmReserve0?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    spikeyAmmReserve1?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    lastStatsUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token0?: TokenUpdateOneRequiredWithoutPairsAsToken0NestedInput
  }

  export type PairUncheckedUpdateWithoutToken1Input = {
    id?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    token0Id?: IntFieldUpdateOperationsInput | number
    spikeyAmmPairAddress?: NullableStringFieldUpdateOperationsInput | string | null
    spikeyAmmReserve0?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    spikeyAmmReserve1?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    lastStatsUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairUncheckedUpdateManyWithoutToken1Input = {
    id?: IntFieldUpdateOperationsInput | number
    network?: StringFieldUpdateOperationsInput | string
    token0Id?: IntFieldUpdateOperationsInput | number
    spikeyAmmPairAddress?: NullableStringFieldUpdateOperationsInput | string | null
    spikeyAmmReserve0?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    spikeyAmmReserve1?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    lastStatsUpdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupConfigurationUpdateWithoutSpikeMonitorTokenInput = {
    chatId?: BigIntFieldUpdateOperationsInput | bigint | number
    spikeMonitorEnabled?: BoolFieldUpdateOperationsInput | boolean
    spikeMonitorThreadId?: NullableStringFieldUpdateOperationsInput | string | null
    spikeMonitorGifUrl?: NullableStringFieldUpdateOperationsInput | string | null
    spikeMonitorTimeframe?: NullableIntFieldUpdateOperationsInput | number | null
    spikeMonitorInterval?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GroupConfigurationUncheckedUpdateWithoutSpikeMonitorTokenInput = {
    chatId?: BigIntFieldUpdateOperationsInput | bigint | number
    spikeMonitorEnabled?: BoolFieldUpdateOperationsInput | boolean
    spikeMonitorThreadId?: NullableStringFieldUpdateOperationsInput | string | null
    spikeMonitorGifUrl?: NullableStringFieldUpdateOperationsInput | string | null
    spikeMonitorTimeframe?: NullableIntFieldUpdateOperationsInput | number | null
    spikeMonitorInterval?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GroupConfigurationUncheckedUpdateManyWithoutSpikeMonitorTokenInput = {
    chatId?: BigIntFieldUpdateOperationsInput | bigint | number
    spikeMonitorEnabled?: BoolFieldUpdateOperationsInput | boolean
    spikeMonitorThreadId?: NullableStringFieldUpdateOperationsInput | string | null
    spikeMonitorGifUrl?: NullableStringFieldUpdateOperationsInput | string | null
    spikeMonitorTimeframe?: NullableIntFieldUpdateOperationsInput | number | null
    spikeMonitorInterval?: NullableIntFieldUpdateOperationsInput | number | null
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