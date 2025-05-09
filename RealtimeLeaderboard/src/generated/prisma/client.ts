/**
 * Client
 */

import * as runtime from '@prisma/client/runtime/library';
import * as process from 'node:process';
import * as path from 'node:path';

export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;

/**
 * Model User
 *
 */
export type User = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model Game
 *
 */
export type Game = runtime.Types.Result.DefaultSelection<Prisma.$GamePayload>;
/**
 * Model Score
 *
 */
export type Score = runtime.Types.Result.DefaultSelection<Prisma.$ScorePayload>;

/**
 * Create the Client
 */
const config: runtime.GetPrismaClientConfig = {
  generator: {
    name: 'client',
    provider: {
      fromEnvVar: null,
      value: 'prisma-client',
    },
    output: {
      value:
        'C:\\Users\\jgabi\\Desktop\\Projects\\backend-roadmap\\RealtimeLeaderboard\\src\\generated\\prisma',
      fromEnvVar: null,
    },
    config: {
      moduleFormat: 'cjs',
      engineType: 'library',
    },
    binaryTargets: [
      {
        fromEnvVar: null,
        value: 'windows',
        native: true,
      },
    ],
    previewFeatures: [],
    sourceFilePath:
      'C:\\Users\\jgabi\\Desktop\\Projects\\backend-roadmap\\RealtimeLeaderboard\\prisma\\schema.prisma',
    isCustomOutput: true,
  },
  relativePath: '../../../prisma',
  clientVersion: '6.6.0',
  engineVersion: 'f676762280b54cd07c770017ed3711ddde35f37a',
  datasourceNames: ['db'],
  activeProvider: 'postgresql',
  inlineDatasources: {
    db: {
      url: {
        fromEnvVar: 'DATABASE_URL',
        value:
          'postgresql://postgres:admin1234@localhost:5432/Leaderboard?schema=public',
      },
    },
  },
  inlineSchema:
    'generator client {\n  provider     = "prisma-client"\n  output       = "../src/generated/prisma"\n  moduleFormat = "cjs"\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\nmodel User {\n  id           String   @id @default(uuid())\n  name         String\n  email        String   @unique\n  password     String\n  refreshToken String?\n  scores       Score[]\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n\n  @@map("users")\n}\n\nmodel Game {\n  id          String   @id @default(uuid())\n  name        String   @db.VarChar(100)\n  description String?  @db.VarChar(200)\n  scores      Score[]\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  @@map("games")\n}\n\nmodel Score {\n  id           String   @id @default(uuid())\n  user_id      String\n  user         User     @relation(fields: [user_id], references: [id])\n  game_id      String\n  game         Game     @relation(fields: [game_id], references: [id])\n  score        Int\n  submitted_at DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n\n  @@unique([user_id, game_id])\n  @@map("scores")\n}\n',
  inlineSchemaHash:
    '43a0e12d5c5685fb81a03ff91254fda98c924874a0829bbce5e8a71428f89432',
  copyEngine: true,
  runtimeDataModel: {
    models: {},
    enums: {},
    types: {},
  },
  dirname: '',
};
config.dirname = __dirname;

config.runtimeDataModel = JSON.parse(
  '{"models":{"User":{"dbName":"users","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"password","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"refreshToken","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"scores","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Score","nativeType":null,"relationName":"ScoreToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Game":{"dbName":"games","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":["VarChar",["100"]],"isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":["VarChar",["200"]],"isGenerated":false,"isUpdatedAt":false},{"name":"scores","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Score","nativeType":null,"relationName":"GameToScore","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Score":{"dbName":"scores","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"user_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"ScoreToUser","relationFromFields":["user_id"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"game_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"game","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Game","nativeType":null,"relationName":"GameToScore","relationFromFields":["game_id"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"score","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"submitted_at","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[["user_id","game_id"]],"uniqueIndexes":[{"name":null,"fields":["user_id","game_id"]}],"isGenerated":false}},"enums":{},"types":{}}',
);
config.engineWasm = undefined;
config.compilerWasm = undefined;

// file annotations for bundling tools to include these files
path.join(__dirname, 'query_engine-windows.dll.node');
path.join(process.cwd(), 'src/generated/prisma/query_engine-windows.dll.node');
// file annotations for bundling tools to include these files
path.join(__dirname, 'schema.prisma');
path.join(process.cwd(), 'src/generated/prisma/schema.prisma');

interface PrismaClientConstructor {
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  new <
    ClientOptions extends
      Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
    U = 'log' extends keyof ClientOptions
      ? ClientOptions['log'] extends Array<
          Prisma.LogLevel | Prisma.LogDefinition
        >
        ? Prisma.GetEvents<ClientOptions['log']>
        : never
      : never,
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  >(
    options?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>,
  ): PrismaClient<ClientOptions, U, ExtArgs>;
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
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export interface PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions
    ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions['log']>
      : never
    : never,
  ExtArgs extends
    runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent,
    ) => void,
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): runtime.Types.Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): runtime.Types.Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
  ): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>,
    ) => runtime.Types.Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): runtime.Types.Utils.JsPromise<R>;

  $extends: runtime.Types.Extensions.ExtendsHook<
    'extends',
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    runtime.Types.Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.game`: Exposes CRUD operations for the **Game** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Games
   * const games = await prisma.game.findMany()
   * ```
   */
  get game(): Prisma.GameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.score`: Exposes CRUD operations for the **Score** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Scores
   * const scores = await prisma.score.findMany()
   * ```
   */
  get score(): Prisma.ScoreDelegate<ExtArgs, ClientOptions>;
}

export const PrismaClient = runtime.getPrismaClient(
  config,
) as unknown as PrismaClientConstructor;

export namespace Prisma {
  export type DMMF = typeof runtime.DMMF;

  export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export const validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */

  export const PrismaClientKnownRequestError =
    runtime.PrismaClientKnownRequestError;
  export type PrismaClientKnownRequestError =
    runtime.PrismaClientKnownRequestError;

  export const PrismaClientUnknownRequestError =
    runtime.PrismaClientUnknownRequestError;
  export type PrismaClientUnknownRequestError =
    runtime.PrismaClientUnknownRequestError;

  export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;

  export const PrismaClientInitializationError =
    runtime.PrismaClientInitializationError;
  export type PrismaClientInitializationError =
    runtime.PrismaClientInitializationError;

  export const PrismaClientValidationError =
    runtime.PrismaClientValidationError;
  export type PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export const sql = runtime.sqltag;
  export const empty = runtime.empty;
  export const join = runtime.join;
  export const raw = runtime.raw;
  export const Sql = runtime.Sql;
  export type Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export const Decimal = runtime.Decimal;
  export type Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export type Extension = runtime.Types.Extensions.UserArgs;
  export const getExtensionContext = runtime.Extensions.getExtensionContext;
  export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<
    T,
    F
  >;
  export type Payload<
    T,
    F extends runtime.Operation = never,
  > = runtime.Types.Public.Payload<T, F>;
  export type Result<
    T,
    A,
    F extends runtime.Operation,
  > = runtime.Types.Public.Result<T, A, F>;
  export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;

  export type PrismaVersion = {
    client: string;
    engine: string;
  };

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export const prismaVersion: PrismaVersion = {
    client: '6.6.0',
    engine: 'f676762280b54cd07c770017ed3711ddde35f37a',
  };

  /**
   * Utility Types
   */

  export type JsonObject = runtime.JsonObject;
  export type JsonArray = runtime.JsonArray;
  export type JsonValue = runtime.JsonValue;
  export type InputJsonObject = runtime.InputJsonObject;
  export type InputJsonArray = runtime.InputJsonArray;
  export type InputJsonValue = runtime.InputJsonValue;

  export const NullTypes = {
    DbNull: runtime.objectEnumValues.classes.DbNull as new (
      secret: never,
    ) => typeof runtime.objectEnumValues.instances.DbNull,
    JsonNull: runtime.objectEnumValues.classes.JsonNull as new (
      secret: never,
    ) => typeof runtime.objectEnumValues.instances.JsonNull,
    AnyNull: runtime.objectEnumValues.classes.AnyNull as new (
      secret: never,
    ) => typeof runtime.objectEnumValues.instances.AnyNull,
  };

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull = runtime.objectEnumValues.instances
    .DbNull as typeof runtime.objectEnumValues.instances.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull = runtime.objectEnumValues.instances
    .JsonNull as typeof runtime.objectEnumValues.instances.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull = runtime.objectEnumValues.instances
    .AnyNull as typeof runtime.objectEnumValues.instances.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

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
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
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
  export type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  export type Boolean = True | False;

  export type True = 1;

  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName = {
    User: 'User',
    Game: 'Game',
    Score: 'Score',
  } as const;

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  export interface TypeMapCb<ClientOptions = {}>
    extends runtime.Types.Utils.Fn<
      { extArgs: runtime.Types.Extensions.InternalArgs },
      runtime.Types.Utils.Record<string, any>
    > {
    returns: Prisma.TypeMap<
      this['params']['extArgs'],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps: 'user' | 'game' | 'score';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result:
              | runtime.Types.Utils.Optional<UserCountAggregateOutputType>
              | number;
          };
        };
      };
      Game: {
        payload: Prisma.$GamePayload<ExtArgs>;
        fields: Prisma.GameFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.GameFindUniqueArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.GameFindUniqueOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload>;
          };
          findFirst: {
            args: Prisma.GameFindFirstArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.GameFindFirstOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload>;
          };
          findMany: {
            args: Prisma.GameFindManyArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload>[];
          };
          create: {
            args: Prisma.GameCreateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload>;
          };
          createMany: {
            args: Prisma.GameCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.GameCreateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload>[];
          };
          delete: {
            args: Prisma.GameDeleteArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload>;
          };
          update: {
            args: Prisma.GameUpdateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload>;
          };
          deleteMany: {
            args: Prisma.GameDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.GameUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.GameUpdateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload>[];
          };
          upsert: {
            args: Prisma.GameUpsertArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload>;
          };
          aggregate: {
            args: Prisma.GameAggregateArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AggregateGame>;
          };
          groupBy: {
            args: Prisma.GameGroupByArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<GameGroupByOutputType>[];
          };
          count: {
            args: Prisma.GameCountArgs<ExtArgs>;
            result:
              | runtime.Types.Utils.Optional<GameCountAggregateOutputType>
              | number;
          };
        };
      };
      Score: {
        payload: Prisma.$ScorePayload<ExtArgs>;
        fields: Prisma.ScoreFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ScoreFindUniqueArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ScorePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ScoreFindUniqueOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ScorePayload>;
          };
          findFirst: {
            args: Prisma.ScoreFindFirstArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ScorePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ScoreFindFirstOrThrowArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ScorePayload>;
          };
          findMany: {
            args: Prisma.ScoreFindManyArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ScorePayload>[];
          };
          create: {
            args: Prisma.ScoreCreateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ScorePayload>;
          };
          createMany: {
            args: Prisma.ScoreCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ScoreCreateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ScorePayload>[];
          };
          delete: {
            args: Prisma.ScoreDeleteArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ScorePayload>;
          };
          update: {
            args: Prisma.ScoreUpdateArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ScorePayload>;
          };
          deleteMany: {
            args: Prisma.ScoreDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ScoreUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ScoreUpdateManyAndReturnArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ScorePayload>[];
          };
          upsert: {
            args: Prisma.ScoreUpsertArgs<ExtArgs>;
            result: runtime.Types.Utils.PayloadToResult<Prisma.$ScorePayload>;
          };
          aggregate: {
            args: Prisma.ScoreAggregateArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<AggregateScore>;
          };
          groupBy: {
            args: Prisma.ScoreGroupByArgs<ExtArgs>;
            result: runtime.Types.Utils.Optional<ScoreGroupByOutputType>[];
          };
          count: {
            args: Prisma.ScoreCountArgs<ExtArgs>;
            result:
              | runtime.Types.Utils.Optional<ScoreCountAggregateOutputType>
              | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension = runtime.Extensions
    .defineExtension as unknown as runtime.Types.Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    runtime.Types.Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
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
    omit?: Prisma.GlobalOmitConfig;
  }
  export type GlobalOmitConfig = {
    user?: UserOmit;
    game?: GameOmit;
    score?: ScoreOmit;
  };

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type GetLogType<T extends LogLevel | LogDefinition> =
    T extends LogDefinition
      ? T['emit'] extends 'event'
        ? T['level']
        : never
      : never;
  export type GetEvents<T extends any> =
    T extends Array<LogLevel | LogDefinition>
      ?
          | GetLogType<T[0]>
          | GetLogType<T[1]>
          | GetLogType<T[2]>
          | GetLogType<T[3]>
      : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
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
    | 'groupBy';

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => runtime.Types.Utils.JsPromise<T>,
  ) => runtime.Types.Utils.JsPromise<T>;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    scores: number;
  };

  export type UserCountOutputTypeSelect<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    scores?: boolean | UserCountOutputTypeCountScoresArgs;
  };

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountScoresArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    where?: ScoreWhereInput;
  };

  /**
   * Count Type GameCountOutputType
   */

  export type GameCountOutputType = {
    scores: number;
  };

  export type GameCountOutputTypeSelect<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    scores?: boolean | GameCountOutputTypeCountScoresArgs;
  };

  // Custom InputTypes
  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeDefaultArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the GameCountOutputType
     */
    select?: GameCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountScoresArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    where?: ScoreWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    password: string | null;
    refreshToken: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    password: string | null;
    refreshToken: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    name: number;
    email: number;
    password: number;
    refreshToken: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    password?: true;
    refreshToken?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    password?: true;
    refreshToken?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    password?: true;
    refreshToken?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
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
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    where?: UserWhereInput;
    orderBy?:
      | UserOrderByWithAggregationInput
      | UserOrderByWithAggregationInput[];
    by: UserScalarFieldEnum[] | UserScalarFieldEnum;
    having?: UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
  };

  export type UserGroupByOutputType = {
    id: string;
    name: string;
    email: string;
    password: string;
    refreshToken: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      email?: boolean;
      password?: boolean;
      refreshToken?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      scores?: boolean | User$scoresArgs<ExtArgs>;
      _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      email?: boolean;
      password?: boolean;
      refreshToken?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectUpdateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      email?: boolean;
      password?: boolean;
      refreshToken?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectScalar = {
    id?: boolean;
    name?: boolean;
    email?: boolean;
    password?: boolean;
    refreshToken?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type UserOmit<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetOmit<
    | 'id'
    | 'name'
    | 'email'
    | 'password'
    | 'refreshToken'
    | 'createdAt'
    | 'updatedAt',
    ExtArgs['result']['user']
  >;
  export type UserInclude<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    scores?: boolean | User$scoresArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type UserIncludeCreateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {};
  export type UserIncludeUpdateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {};

  export type $UserPayload<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    name: 'User';
    objects: {
      scores: Prisma.$ScorePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        email: string;
        password: string;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['user']
    >;
    composites: {};
  };

  export type UserGetPayload<
    S extends boolean | null | undefined | UserDefaultArgs,
  > = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;

  export type UserCountArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['User'];
      meta: { name: 'User' };
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
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>,
    ): Prisma__UserClient<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

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
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>,
    ): Prisma__UserClient<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

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
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

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
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

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
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

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
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>,
    ): Prisma__UserClient<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

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
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

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
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

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
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>,
    ): Prisma__UserClient<
      runtime.Types.Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

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
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

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
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
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
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetUserGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
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
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    scores<T extends User$scoresArgs<ExtArgs> = {}>(
      args?: Subset<T, User$scoresArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | runtime.Types.Result.GetResult<
          Prisma.$ScorePayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(
      onfinally?: (() => void) | undefined | null,
    ): runtime.Types.Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  export interface UserFieldRefs {
    readonly id: FieldRef<'User', 'String'>;
    readonly name: FieldRef<'User', 'String'>;
    readonly email: FieldRef<'User', 'String'>;
    readonly password: FieldRef<'User', 'String'>;
    readonly refreshToken: FieldRef<'User', 'String'>;
    readonly createdAt: FieldRef<'User', 'DateTime'>;
    readonly updatedAt: FieldRef<'User', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput;
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User create
   */
  export type UserCreateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
  };

  /**
   * User.scores
   */
  export type User$scoresArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Score
     */
    omit?: ScoreOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreInclude<ExtArgs> | null;
    where?: ScoreWhereInput;
    orderBy?: ScoreOrderByWithRelationInput | ScoreOrderByWithRelationInput[];
    cursor?: ScoreWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ScoreScalarFieldEnum | ScoreScalarFieldEnum[];
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
  };

  /**
   * Model Game
   */

  export type AggregateGame = {
    _count: GameCountAggregateOutputType | null;
    _min: GameMinAggregateOutputType | null;
    _max: GameMaxAggregateOutputType | null;
  };

  export type GameMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type GameMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type GameCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type GameMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type GameMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type GameCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type GameAggregateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Game to aggregate.
     */
    where?: GameWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: GameWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Games from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Games.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Games
     **/
    _count?: true | GameCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: GameMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: GameMaxAggregateInputType;
  };

  export type GetGameAggregateType<T extends GameAggregateArgs> = {
    [P in keyof T & keyof AggregateGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGame[P]>
      : GetScalarType<T[P], AggregateGame[P]>;
  };

  export type GameGroupByArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    where?: GameWhereInput;
    orderBy?:
      | GameOrderByWithAggregationInput
      | GameOrderByWithAggregationInput[];
    by: GameScalarFieldEnum[] | GameScalarFieldEnum;
    having?: GameScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: GameCountAggregateInputType | true;
    _min?: GameMinAggregateInputType;
    _max?: GameMaxAggregateInputType;
  };

  export type GameGroupByOutputType = {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: GameCountAggregateOutputType | null;
    _min: GameMinAggregateOutputType | null;
    _max: GameMaxAggregateOutputType | null;
  };

  type GetGameGroupByPayload<T extends GameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameGroupByOutputType, T['by']> & {
        [P in keyof T & keyof GameGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], GameGroupByOutputType[P]>
          : GetScalarType<T[P], GameGroupByOutputType[P]>;
      }
    >
  >;

  export type GameSelect<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      scores?: boolean | Game$scoresArgs<ExtArgs>;
      _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['game']
  >;

  export type GameSelectCreateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['game']
  >;

  export type GameSelectUpdateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['game']
  >;

  export type GameSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type GameOmit<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetOmit<
    'id' | 'name' | 'description' | 'createdAt' | 'updatedAt',
    ExtArgs['result']['game']
  >;
  export type GameInclude<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    scores?: boolean | Game$scoresArgs<ExtArgs>;
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type GameIncludeCreateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {};
  export type GameIncludeUpdateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {};

  export type $GamePayload<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    name: 'Game';
    objects: {
      scores: Prisma.$ScorePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['game']
    >;
    composites: {};
  };

  export type GameGetPayload<
    S extends boolean | null | undefined | GameDefaultArgs,
  > = runtime.Types.Result.GetResult<Prisma.$GamePayload, S>;

  export type GameCountArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = Omit<GameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: GameCountAggregateInputType | true;
  };

  export interface GameDelegate<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Game'];
      meta: { name: 'Game' };
    };
    /**
     * Find zero or one Game that matches the filter.
     * @param {GameFindUniqueArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameFindUniqueArgs>(
      args: SelectSubset<T, GameFindUniqueArgs<ExtArgs>>,
    ): Prisma__GameClient<
      runtime.Types.Result.GetResult<
        Prisma.$GamePayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Game that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameFindUniqueOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameFindUniqueOrThrowArgs>(
      args: SelectSubset<T, GameFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__GameClient<
      runtime.Types.Result.GetResult<
        Prisma.$GamePayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Game that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameFindFirstArgs>(
      args?: SelectSubset<T, GameFindFirstArgs<ExtArgs>>,
    ): Prisma__GameClient<
      runtime.Types.Result.GetResult<
        Prisma.$GamePayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Game that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameFindFirstOrThrowArgs>(
      args?: SelectSubset<T, GameFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__GameClient<
      runtime.Types.Result.GetResult<
        Prisma.$GamePayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Games that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Games
     * const games = await prisma.game.findMany()
     *
     * // Get first 10 Games
     * const games = await prisma.game.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const gameWithIdOnly = await prisma.game.findMany({ select: { id: true } })
     *
     */
    findMany<T extends GameFindManyArgs>(
      args?: SelectSubset<T, GameFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$GamePayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Game.
     * @param {GameCreateArgs} args - Arguments to create a Game.
     * @example
     * // Create one Game
     * const Game = await prisma.game.create({
     *   data: {
     *     // ... data to create a Game
     *   }
     * })
     *
     */
    create<T extends GameCreateArgs>(
      args: SelectSubset<T, GameCreateArgs<ExtArgs>>,
    ): Prisma__GameClient<
      runtime.Types.Result.GetResult<
        Prisma.$GamePayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Games.
     * @param {GameCreateManyArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends GameCreateManyArgs>(
      args?: SelectSubset<T, GameCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Games and returns the data saved in the database.
     * @param {GameCreateManyAndReturnArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends GameCreateManyAndReturnArgs>(
      args?: SelectSubset<T, GameCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$GamePayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Game.
     * @param {GameDeleteArgs} args - Arguments to delete one Game.
     * @example
     * // Delete one Game
     * const Game = await prisma.game.delete({
     *   where: {
     *     // ... filter to delete one Game
     *   }
     * })
     *
     */
    delete<T extends GameDeleteArgs>(
      args: SelectSubset<T, GameDeleteArgs<ExtArgs>>,
    ): Prisma__GameClient<
      runtime.Types.Result.GetResult<
        Prisma.$GamePayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Game.
     * @param {GameUpdateArgs} args - Arguments to update one Game.
     * @example
     * // Update one Game
     * const game = await prisma.game.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends GameUpdateArgs>(
      args: SelectSubset<T, GameUpdateArgs<ExtArgs>>,
    ): Prisma__GameClient<
      runtime.Types.Result.GetResult<
        Prisma.$GamePayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Games.
     * @param {GameDeleteManyArgs} args - Arguments to filter Games to delete.
     * @example
     * // Delete a few Games
     * const { count } = await prisma.game.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends GameDeleteManyArgs>(
      args?: SelectSubset<T, GameDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends GameUpdateManyArgs>(
      args: SelectSubset<T, GameUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Games and returns the data updated in the database.
     * @param {GameUpdateManyAndReturnArgs} args - Arguments to update many Games.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.updateManyAndReturn({
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
    updateManyAndReturn<T extends GameUpdateManyAndReturnArgs>(
      args: SelectSubset<T, GameUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$GamePayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Game.
     * @param {GameUpsertArgs} args - Arguments to update or create a Game.
     * @example
     * // Update or create a Game
     * const game = await prisma.game.upsert({
     *   create: {
     *     // ... data to create a Game
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Game we want to update
     *   }
     * })
     */
    upsert<T extends GameUpsertArgs>(
      args: SelectSubset<T, GameUpsertArgs<ExtArgs>>,
    ): Prisma__GameClient<
      runtime.Types.Result.GetResult<
        Prisma.$GamePayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCountArgs} args - Arguments to filter Games to count.
     * @example
     * // Count the number of Games
     * const count = await prisma.game.count({
     *   where: {
     *     // ... the filter for the Games we want to count
     *   }
     * })
     **/
    count<T extends GameCountArgs>(
      args?: Subset<T, GameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GameAggregateArgs>(
      args: Subset<T, GameAggregateArgs>,
    ): Prisma.PrismaPromise<GetGameAggregateType<T>>;

    /**
     * Group by Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameGroupByArgs} args - Group by arguments.
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
      T extends GameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameGroupByArgs['orderBy'] }
        : { orderBy?: GameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
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
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, GameGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetGameGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Game model
     */
    readonly fields: GameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Game.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameClient<
    T,
    Null = never,
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    scores<T extends Game$scoresArgs<ExtArgs> = {}>(
      args?: Subset<T, Game$scoresArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | runtime.Types.Result.GetResult<
          Prisma.$ScorePayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(
      onfinally?: (() => void) | undefined | null,
    ): runtime.Types.Utils.JsPromise<T>;
  }

  /**
   * Fields of the Game model
   */
  export interface GameFieldRefs {
    readonly id: FieldRef<'Game', 'String'>;
    readonly name: FieldRef<'Game', 'String'>;
    readonly description: FieldRef<'Game', 'String'>;
    readonly createdAt: FieldRef<'Game', 'DateTime'>;
    readonly updatedAt: FieldRef<'Game', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Game findUnique
   */
  export type GameFindUniqueArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null;
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput;
  };

  /**
   * Game findUniqueOrThrow
   */
  export type GameFindUniqueOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null;
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput;
  };

  /**
   * Game findFirst
   */
  export type GameFindFirstArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null;
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Games from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Games.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[];
  };

  /**
   * Game findFirstOrThrow
   */
  export type GameFindFirstOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null;
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Games from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Games.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[];
  };

  /**
   * Game findMany
   */
  export type GameFindManyArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null;
    /**
     * Filter, which Games to fetch.
     */
    where?: GameWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Games.
     */
    cursor?: GameWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Games from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Games.
     */
    skip?: number;
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[];
  };

  /**
   * Game create
   */
  export type GameCreateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null;
    /**
     * The data needed to create a Game.
     */
    data: XOR<GameCreateInput, GameUncheckedCreateInput>;
  };

  /**
   * Game createMany
   */
  export type GameCreateManyArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Game createManyAndReturn
   */
  export type GameCreateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null;
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Game update
   */
  export type GameUpdateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null;
    /**
     * The data needed to update a Game.
     */
    data: XOR<GameUpdateInput, GameUncheckedUpdateInput>;
    /**
     * Choose, which Game to update.
     */
    where: GameWhereUniqueInput;
  };

  /**
   * Game updateMany
   */
  export type GameUpdateManyArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>;
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput;
    /**
     * Limit how many Games to update.
     */
    limit?: number;
  };

  /**
   * Game updateManyAndReturn
   */
  export type GameUpdateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null;
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>;
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput;
    /**
     * Limit how many Games to update.
     */
    limit?: number;
  };

  /**
   * Game upsert
   */
  export type GameUpsertArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null;
    /**
     * The filter to search for the Game to update in case it exists.
     */
    where: GameWhereUniqueInput;
    /**
     * In case the Game found by the `where` argument doesn't exist, create a new Game with this data.
     */
    create: XOR<GameCreateInput, GameUncheckedCreateInput>;
    /**
     * In case the Game was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameUpdateInput, GameUncheckedUpdateInput>;
  };

  /**
   * Game delete
   */
  export type GameDeleteArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null;
    /**
     * Filter which Game to delete.
     */
    where: GameWhereUniqueInput;
  };

  /**
   * Game deleteMany
   */
  export type GameDeleteManyArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Games to delete
     */
    where?: GameWhereInput;
    /**
     * Limit how many Games to delete.
     */
    limit?: number;
  };

  /**
   * Game.scores
   */
  export type Game$scoresArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Score
     */
    omit?: ScoreOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreInclude<ExtArgs> | null;
    where?: ScoreWhereInput;
    orderBy?: ScoreOrderByWithRelationInput | ScoreOrderByWithRelationInput[];
    cursor?: ScoreWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ScoreScalarFieldEnum | ScoreScalarFieldEnum[];
  };

  /**
   * Game without action
   */
  export type GameDefaultArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null;
  };

  /**
   * Model Score
   */

  export type AggregateScore = {
    _count: ScoreCountAggregateOutputType | null;
    _avg: ScoreAvgAggregateOutputType | null;
    _sum: ScoreSumAggregateOutputType | null;
    _min: ScoreMinAggregateOutputType | null;
    _max: ScoreMaxAggregateOutputType | null;
  };

  export type ScoreAvgAggregateOutputType = {
    score: number | null;
  };

  export type ScoreSumAggregateOutputType = {
    score: number | null;
  };

  export type ScoreMinAggregateOutputType = {
    id: string | null;
    user_id: string | null;
    game_id: string | null;
    score: number | null;
    submitted_at: Date | null;
    updatedAt: Date | null;
  };

  export type ScoreMaxAggregateOutputType = {
    id: string | null;
    user_id: string | null;
    game_id: string | null;
    score: number | null;
    submitted_at: Date | null;
    updatedAt: Date | null;
  };

  export type ScoreCountAggregateOutputType = {
    id: number;
    user_id: number;
    game_id: number;
    score: number;
    submitted_at: number;
    updatedAt: number;
    _all: number;
  };

  export type ScoreAvgAggregateInputType = {
    score?: true;
  };

  export type ScoreSumAggregateInputType = {
    score?: true;
  };

  export type ScoreMinAggregateInputType = {
    id?: true;
    user_id?: true;
    game_id?: true;
    score?: true;
    submitted_at?: true;
    updatedAt?: true;
  };

  export type ScoreMaxAggregateInputType = {
    id?: true;
    user_id?: true;
    game_id?: true;
    score?: true;
    submitted_at?: true;
    updatedAt?: true;
  };

  export type ScoreCountAggregateInputType = {
    id?: true;
    user_id?: true;
    game_id?: true;
    score?: true;
    submitted_at?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ScoreAggregateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Score to aggregate.
     */
    where?: ScoreWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Scores to fetch.
     */
    orderBy?: ScoreOrderByWithRelationInput | ScoreOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ScoreWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Scores from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Scores.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Scores
     **/
    _count?: true | ScoreCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ScoreAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ScoreSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ScoreMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ScoreMaxAggregateInputType;
  };

  export type GetScoreAggregateType<T extends ScoreAggregateArgs> = {
    [P in keyof T & keyof AggregateScore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScore[P]>
      : GetScalarType<T[P], AggregateScore[P]>;
  };

  export type ScoreGroupByArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    where?: ScoreWhereInput;
    orderBy?:
      | ScoreOrderByWithAggregationInput
      | ScoreOrderByWithAggregationInput[];
    by: ScoreScalarFieldEnum[] | ScoreScalarFieldEnum;
    having?: ScoreScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ScoreCountAggregateInputType | true;
    _avg?: ScoreAvgAggregateInputType;
    _sum?: ScoreSumAggregateInputType;
    _min?: ScoreMinAggregateInputType;
    _max?: ScoreMaxAggregateInputType;
  };

  export type ScoreGroupByOutputType = {
    id: string;
    user_id: string;
    game_id: string;
    score: number;
    submitted_at: Date;
    updatedAt: Date;
    _count: ScoreCountAggregateOutputType | null;
    _avg: ScoreAvgAggregateOutputType | null;
    _sum: ScoreSumAggregateOutputType | null;
    _min: ScoreMinAggregateOutputType | null;
    _max: ScoreMaxAggregateOutputType | null;
  };

  type GetScoreGroupByPayload<T extends ScoreGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ScoreGroupByOutputType, T['by']> & {
          [P in keyof T & keyof ScoreGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScoreGroupByOutputType[P]>
            : GetScalarType<T[P], ScoreGroupByOutputType[P]>;
        }
      >
    >;

  export type ScoreSelect<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      user_id?: boolean;
      game_id?: boolean;
      score?: boolean;
      submitted_at?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      game?: boolean | GameDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['score']
  >;

  export type ScoreSelectCreateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      user_id?: boolean;
      game_id?: boolean;
      score?: boolean;
      submitted_at?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      game?: boolean | GameDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['score']
  >;

  export type ScoreSelectUpdateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetSelect<
    {
      id?: boolean;
      user_id?: boolean;
      game_id?: boolean;
      score?: boolean;
      submitted_at?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      game?: boolean | GameDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['score']
  >;

  export type ScoreSelectScalar = {
    id?: boolean;
    user_id?: boolean;
    game_id?: boolean;
    score?: boolean;
    submitted_at?: boolean;
    updatedAt?: boolean;
  };

  export type ScoreOmit<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = runtime.Types.Extensions.GetOmit<
    'id' | 'user_id' | 'game_id' | 'score' | 'submitted_at' | 'updatedAt',
    ExtArgs['result']['score']
  >;
  export type ScoreInclude<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    game?: boolean | GameDefaultArgs<ExtArgs>;
  };
  export type ScoreIncludeCreateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    game?: boolean | GameDefaultArgs<ExtArgs>;
  };
  export type ScoreIncludeUpdateManyAndReturn<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    game?: boolean | GameDefaultArgs<ExtArgs>;
  };

  export type $ScorePayload<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    name: 'Score';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      game: Prisma.$GamePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<
      {
        id: string;
        user_id: string;
        game_id: string;
        score: number;
        submitted_at: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['score']
    >;
    composites: {};
  };

  export type ScoreGetPayload<
    S extends boolean | null | undefined | ScoreDefaultArgs,
  > = runtime.Types.Result.GetResult<Prisma.$ScorePayload, S>;

  export type ScoreCountArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = Omit<ScoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ScoreCountAggregateInputType | true;
  };

  export interface ScoreDelegate<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Score'];
      meta: { name: 'Score' };
    };
    /**
     * Find zero or one Score that matches the filter.
     * @param {ScoreFindUniqueArgs} args - Arguments to find a Score
     * @example
     * // Get one Score
     * const score = await prisma.score.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScoreFindUniqueArgs>(
      args: SelectSubset<T, ScoreFindUniqueArgs<ExtArgs>>,
    ): Prisma__ScoreClient<
      runtime.Types.Result.GetResult<
        Prisma.$ScorePayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Score that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScoreFindUniqueOrThrowArgs} args - Arguments to find a Score
     * @example
     * // Get one Score
     * const score = await prisma.score.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScoreFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ScoreFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ScoreClient<
      runtime.Types.Result.GetResult<
        Prisma.$ScorePayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Score that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreFindFirstArgs} args - Arguments to find a Score
     * @example
     * // Get one Score
     * const score = await prisma.score.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScoreFindFirstArgs>(
      args?: SelectSubset<T, ScoreFindFirstArgs<ExtArgs>>,
    ): Prisma__ScoreClient<
      runtime.Types.Result.GetResult<
        Prisma.$ScorePayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Score that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreFindFirstOrThrowArgs} args - Arguments to find a Score
     * @example
     * // Get one Score
     * const score = await prisma.score.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScoreFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ScoreFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ScoreClient<
      runtime.Types.Result.GetResult<
        Prisma.$ScorePayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Scores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Scores
     * const scores = await prisma.score.findMany()
     *
     * // Get first 10 Scores
     * const scores = await prisma.score.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const scoreWithIdOnly = await prisma.score.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ScoreFindManyArgs>(
      args?: SelectSubset<T, ScoreFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$ScorePayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Score.
     * @param {ScoreCreateArgs} args - Arguments to create a Score.
     * @example
     * // Create one Score
     * const Score = await prisma.score.create({
     *   data: {
     *     // ... data to create a Score
     *   }
     * })
     *
     */
    create<T extends ScoreCreateArgs>(
      args: SelectSubset<T, ScoreCreateArgs<ExtArgs>>,
    ): Prisma__ScoreClient<
      runtime.Types.Result.GetResult<
        Prisma.$ScorePayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Scores.
     * @param {ScoreCreateManyArgs} args - Arguments to create many Scores.
     * @example
     * // Create many Scores
     * const score = await prisma.score.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ScoreCreateManyArgs>(
      args?: SelectSubset<T, ScoreCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Scores and returns the data saved in the database.
     * @param {ScoreCreateManyAndReturnArgs} args - Arguments to create many Scores.
     * @example
     * // Create many Scores
     * const score = await prisma.score.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Scores and only return the `id`
     * const scoreWithIdOnly = await prisma.score.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ScoreCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ScoreCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$ScorePayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Score.
     * @param {ScoreDeleteArgs} args - Arguments to delete one Score.
     * @example
     * // Delete one Score
     * const Score = await prisma.score.delete({
     *   where: {
     *     // ... filter to delete one Score
     *   }
     * })
     *
     */
    delete<T extends ScoreDeleteArgs>(
      args: SelectSubset<T, ScoreDeleteArgs<ExtArgs>>,
    ): Prisma__ScoreClient<
      runtime.Types.Result.GetResult<
        Prisma.$ScorePayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Score.
     * @param {ScoreUpdateArgs} args - Arguments to update one Score.
     * @example
     * // Update one Score
     * const score = await prisma.score.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ScoreUpdateArgs>(
      args: SelectSubset<T, ScoreUpdateArgs<ExtArgs>>,
    ): Prisma__ScoreClient<
      runtime.Types.Result.GetResult<
        Prisma.$ScorePayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Scores.
     * @param {ScoreDeleteManyArgs} args - Arguments to filter Scores to delete.
     * @example
     * // Delete a few Scores
     * const { count } = await prisma.score.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ScoreDeleteManyArgs>(
      args?: SelectSubset<T, ScoreDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Scores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Scores
     * const score = await prisma.score.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ScoreUpdateManyArgs>(
      args: SelectSubset<T, ScoreUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Scores and returns the data updated in the database.
     * @param {ScoreUpdateManyAndReturnArgs} args - Arguments to update many Scores.
     * @example
     * // Update many Scores
     * const score = await prisma.score.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Scores and only return the `id`
     * const scoreWithIdOnly = await prisma.score.updateManyAndReturn({
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
    updateManyAndReturn<T extends ScoreUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ScoreUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      runtime.Types.Result.GetResult<
        Prisma.$ScorePayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Score.
     * @param {ScoreUpsertArgs} args - Arguments to update or create a Score.
     * @example
     * // Update or create a Score
     * const score = await prisma.score.upsert({
     *   create: {
     *     // ... data to create a Score
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Score we want to update
     *   }
     * })
     */
    upsert<T extends ScoreUpsertArgs>(
      args: SelectSubset<T, ScoreUpsertArgs<ExtArgs>>,
    ): Prisma__ScoreClient<
      runtime.Types.Result.GetResult<
        Prisma.$ScorePayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Scores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreCountArgs} args - Arguments to filter Scores to count.
     * @example
     * // Count the number of Scores
     * const count = await prisma.score.count({
     *   where: {
     *     // ... the filter for the Scores we want to count
     *   }
     * })
     **/
    count<T extends ScoreCountArgs>(
      args?: Subset<T, ScoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScoreCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Score.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ScoreAggregateArgs>(
      args: Subset<T, ScoreAggregateArgs>,
    ): Prisma.PrismaPromise<GetScoreAggregateType<T>>;

    /**
     * Group by Score.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreGroupByArgs} args - Group by arguments.
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
      T extends ScoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScoreGroupByArgs['orderBy'] }
        : { orderBy?: ScoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
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
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ScoreGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetScoreGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Score model
     */
    readonly fields: ScoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Score.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScoreClient<
    T,
    Null = never,
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | runtime.Types.Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    game<T extends GameDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, GameDefaultArgs<ExtArgs>>,
    ): Prisma__GameClient<
      | runtime.Types.Result.GetResult<
          Prisma.$GamePayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(
      onfinally?: (() => void) | undefined | null,
    ): runtime.Types.Utils.JsPromise<T>;
  }

  /**
   * Fields of the Score model
   */
  export interface ScoreFieldRefs {
    readonly id: FieldRef<'Score', 'String'>;
    readonly user_id: FieldRef<'Score', 'String'>;
    readonly game_id: FieldRef<'Score', 'String'>;
    readonly score: FieldRef<'Score', 'Int'>;
    readonly submitted_at: FieldRef<'Score', 'DateTime'>;
    readonly updatedAt: FieldRef<'Score', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Score findUnique
   */
  export type ScoreFindUniqueArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Score
     */
    omit?: ScoreOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreInclude<ExtArgs> | null;
    /**
     * Filter, which Score to fetch.
     */
    where: ScoreWhereUniqueInput;
  };

  /**
   * Score findUniqueOrThrow
   */
  export type ScoreFindUniqueOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Score
     */
    omit?: ScoreOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreInclude<ExtArgs> | null;
    /**
     * Filter, which Score to fetch.
     */
    where: ScoreWhereUniqueInput;
  };

  /**
   * Score findFirst
   */
  export type ScoreFindFirstArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Score
     */
    omit?: ScoreOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreInclude<ExtArgs> | null;
    /**
     * Filter, which Score to fetch.
     */
    where?: ScoreWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Scores to fetch.
     */
    orderBy?: ScoreOrderByWithRelationInput | ScoreOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Scores.
     */
    cursor?: ScoreWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Scores from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Scores.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Scores.
     */
    distinct?: ScoreScalarFieldEnum | ScoreScalarFieldEnum[];
  };

  /**
   * Score findFirstOrThrow
   */
  export type ScoreFindFirstOrThrowArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Score
     */
    omit?: ScoreOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreInclude<ExtArgs> | null;
    /**
     * Filter, which Score to fetch.
     */
    where?: ScoreWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Scores to fetch.
     */
    orderBy?: ScoreOrderByWithRelationInput | ScoreOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Scores.
     */
    cursor?: ScoreWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Scores from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Scores.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Scores.
     */
    distinct?: ScoreScalarFieldEnum | ScoreScalarFieldEnum[];
  };

  /**
   * Score findMany
   */
  export type ScoreFindManyArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Score
     */
    omit?: ScoreOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreInclude<ExtArgs> | null;
    /**
     * Filter, which Scores to fetch.
     */
    where?: ScoreWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Scores to fetch.
     */
    orderBy?: ScoreOrderByWithRelationInput | ScoreOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Scores.
     */
    cursor?: ScoreWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Scores from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Scores.
     */
    skip?: number;
    distinct?: ScoreScalarFieldEnum | ScoreScalarFieldEnum[];
  };

  /**
   * Score create
   */
  export type ScoreCreateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Score
     */
    omit?: ScoreOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreInclude<ExtArgs> | null;
    /**
     * The data needed to create a Score.
     */
    data: XOR<ScoreCreateInput, ScoreUncheckedCreateInput>;
  };

  /**
   * Score createMany
   */
  export type ScoreCreateManyArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Scores.
     */
    data: ScoreCreateManyInput | ScoreCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Score createManyAndReturn
   */
  export type ScoreCreateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Score
     */
    omit?: ScoreOmit<ExtArgs> | null;
    /**
     * The data used to create many Scores.
     */
    data: ScoreCreateManyInput | ScoreCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Score update
   */
  export type ScoreUpdateArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Score
     */
    omit?: ScoreOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreInclude<ExtArgs> | null;
    /**
     * The data needed to update a Score.
     */
    data: XOR<ScoreUpdateInput, ScoreUncheckedUpdateInput>;
    /**
     * Choose, which Score to update.
     */
    where: ScoreWhereUniqueInput;
  };

  /**
   * Score updateMany
   */
  export type ScoreUpdateManyArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Scores.
     */
    data: XOR<ScoreUpdateManyMutationInput, ScoreUncheckedUpdateManyInput>;
    /**
     * Filter which Scores to update
     */
    where?: ScoreWhereInput;
    /**
     * Limit how many Scores to update.
     */
    limit?: number;
  };

  /**
   * Score updateManyAndReturn
   */
  export type ScoreUpdateManyAndReturnArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Score
     */
    omit?: ScoreOmit<ExtArgs> | null;
    /**
     * The data used to update Scores.
     */
    data: XOR<ScoreUpdateManyMutationInput, ScoreUncheckedUpdateManyInput>;
    /**
     * Filter which Scores to update
     */
    where?: ScoreWhereInput;
    /**
     * Limit how many Scores to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Score upsert
   */
  export type ScoreUpsertArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Score
     */
    omit?: ScoreOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreInclude<ExtArgs> | null;
    /**
     * The filter to search for the Score to update in case it exists.
     */
    where: ScoreWhereUniqueInput;
    /**
     * In case the Score found by the `where` argument doesn't exist, create a new Score with this data.
     */
    create: XOR<ScoreCreateInput, ScoreUncheckedCreateInput>;
    /**
     * In case the Score was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScoreUpdateInput, ScoreUncheckedUpdateInput>;
  };

  /**
   * Score delete
   */
  export type ScoreDeleteArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Score
     */
    omit?: ScoreOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreInclude<ExtArgs> | null;
    /**
     * Filter which Score to delete.
     */
    where: ScoreWhereUniqueInput;
  };

  /**
   * Score deleteMany
   */
  export type ScoreDeleteManyArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Scores to delete
     */
    where?: ScoreWhereInput;
    /**
     * Limit how many Scores to delete.
     */
    limit?: number;
  };

  /**
   * Score without action
   */
  export type ScoreDefaultArgs<
    ExtArgs extends
      runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Score
     */
    select?: ScoreSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Score
     */
    omit?: ScoreOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable',
  } as const);

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const UserScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    refreshToken: 'refreshToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  } as const;

  export type UserScalarFieldEnum =
    (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const GameScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  } as const;

  export type GameScalarFieldEnum =
    (typeof GameScalarFieldEnum)[keyof typeof GameScalarFieldEnum];

  export const ScoreScalarFieldEnum = {
    id: 'id',
    user_id: 'user_id',
    game_id: 'game_id',
    score: 'score',
    submitted_at: 'submitted_at',
    updatedAt: 'updatedAt',
  } as const;

  export type ScoreScalarFieldEnum =
    (typeof ScoreScalarFieldEnum)[keyof typeof ScoreScalarFieldEnum];

  export const SortOrder = {
    asc: 'asc',
    desc: 'desc',
  } as const;

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive',
  } as const;

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder = {
    first: 'first',
    last: 'last',
  } as const;

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String'
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String[]'
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime'
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int'
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int[]'
  >;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float'
  >;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float[]'
  >;

  /**
   * Deep Input Types
   */

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<'User'> | string;
    name?: StringFilter<'User'> | string;
    email?: StringFilter<'User'> | string;
    password?: StringFilter<'User'> | string;
    refreshToken?: StringNullableFilter<'User'> | string | null;
    createdAt?: DateTimeFilter<'User'> | Date | string;
    updatedAt?: DateTimeFilter<'User'> | Date | string;
    scores?: ScoreListRelationFilter;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    refreshToken?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    scores?: ScoreOrderByRelationAggregateInput;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      email?: string;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      name?: StringFilter<'User'> | string;
      password?: StringFilter<'User'> | string;
      refreshToken?: StringNullableFilter<'User'> | string | null;
      createdAt?: DateTimeFilter<'User'> | Date | string;
      updatedAt?: DateTimeFilter<'User'> | Date | string;
      scores?: ScoreListRelationFilter;
    },
    'id' | 'email'
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    refreshToken?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'User'> | string;
    name?: StringWithAggregatesFilter<'User'> | string;
    email?: StringWithAggregatesFilter<'User'> | string;
    password?: StringWithAggregatesFilter<'User'> | string;
    refreshToken?: StringNullableWithAggregatesFilter<'User'> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
  };

  export type GameWhereInput = {
    AND?: GameWhereInput | GameWhereInput[];
    OR?: GameWhereInput[];
    NOT?: GameWhereInput | GameWhereInput[];
    id?: StringFilter<'Game'> | string;
    name?: StringFilter<'Game'> | string;
    description?: StringNullableFilter<'Game'> | string | null;
    createdAt?: DateTimeFilter<'Game'> | Date | string;
    updatedAt?: DateTimeFilter<'Game'> | Date | string;
    scores?: ScoreListRelationFilter;
  };

  export type GameOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    scores?: ScoreOrderByRelationAggregateInput;
  };

  export type GameWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: GameWhereInput | GameWhereInput[];
      OR?: GameWhereInput[];
      NOT?: GameWhereInput | GameWhereInput[];
      name?: StringFilter<'Game'> | string;
      description?: StringNullableFilter<'Game'> | string | null;
      createdAt?: DateTimeFilter<'Game'> | Date | string;
      updatedAt?: DateTimeFilter<'Game'> | Date | string;
      scores?: ScoreListRelationFilter;
    },
    'id'
  >;

  export type GameOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: GameCountOrderByAggregateInput;
    _max?: GameMaxOrderByAggregateInput;
    _min?: GameMinOrderByAggregateInput;
  };

  export type GameScalarWhereWithAggregatesInput = {
    AND?:
      | GameScalarWhereWithAggregatesInput
      | GameScalarWhereWithAggregatesInput[];
    OR?: GameScalarWhereWithAggregatesInput[];
    NOT?:
      | GameScalarWhereWithAggregatesInput
      | GameScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Game'> | string;
    name?: StringWithAggregatesFilter<'Game'> | string;
    description?: StringNullableWithAggregatesFilter<'Game'> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'Game'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Game'> | Date | string;
  };

  export type ScoreWhereInput = {
    AND?: ScoreWhereInput | ScoreWhereInput[];
    OR?: ScoreWhereInput[];
    NOT?: ScoreWhereInput | ScoreWhereInput[];
    id?: StringFilter<'Score'> | string;
    user_id?: StringFilter<'Score'> | string;
    game_id?: StringFilter<'Score'> | string;
    score?: IntFilter<'Score'> | number;
    submitted_at?: DateTimeFilter<'Score'> | Date | string;
    updatedAt?: DateTimeFilter<'Score'> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    game?: XOR<GameScalarRelationFilter, GameWhereInput>;
  };

  export type ScoreOrderByWithRelationInput = {
    id?: SortOrder;
    user_id?: SortOrder;
    game_id?: SortOrder;
    score?: SortOrder;
    submitted_at?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
    game?: GameOrderByWithRelationInput;
  };

  export type ScoreWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      user_id_game_id?: ScoreUser_idGame_idCompoundUniqueInput;
      AND?: ScoreWhereInput | ScoreWhereInput[];
      OR?: ScoreWhereInput[];
      NOT?: ScoreWhereInput | ScoreWhereInput[];
      user_id?: StringFilter<'Score'> | string;
      game_id?: StringFilter<'Score'> | string;
      score?: IntFilter<'Score'> | number;
      submitted_at?: DateTimeFilter<'Score'> | Date | string;
      updatedAt?: DateTimeFilter<'Score'> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      game?: XOR<GameScalarRelationFilter, GameWhereInput>;
    },
    'id' | 'user_id_game_id'
  >;

  export type ScoreOrderByWithAggregationInput = {
    id?: SortOrder;
    user_id?: SortOrder;
    game_id?: SortOrder;
    score?: SortOrder;
    submitted_at?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ScoreCountOrderByAggregateInput;
    _avg?: ScoreAvgOrderByAggregateInput;
    _max?: ScoreMaxOrderByAggregateInput;
    _min?: ScoreMinOrderByAggregateInput;
    _sum?: ScoreSumOrderByAggregateInput;
  };

  export type ScoreScalarWhereWithAggregatesInput = {
    AND?:
      | ScoreScalarWhereWithAggregatesInput
      | ScoreScalarWhereWithAggregatesInput[];
    OR?: ScoreScalarWhereWithAggregatesInput[];
    NOT?:
      | ScoreScalarWhereWithAggregatesInput
      | ScoreScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Score'> | string;
    user_id?: StringWithAggregatesFilter<'Score'> | string;
    game_id?: StringWithAggregatesFilter<'Score'> | string;
    score?: IntWithAggregatesFilter<'Score'> | number;
    submitted_at?: DateTimeWithAggregatesFilter<'Score'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Score'> | Date | string;
  };

  export type UserCreateInput = {
    id?: string;
    name: string;
    email: string;
    password: string;
    refreshToken?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    scores?: ScoreCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateInput = {
    id?: string;
    name: string;
    email: string;
    password: string;
    refreshToken?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    scores?: ScoreUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    scores?: ScoreUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    scores?: ScoreUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateManyInput = {
    id?: string;
    name: string;
    email: string;
    password: string;
    refreshToken?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type GameCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    scores?: ScoreCreateNestedManyWithoutGameInput;
  };

  export type GameUncheckedCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    scores?: ScoreUncheckedCreateNestedManyWithoutGameInput;
  };

  export type GameUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    scores?: ScoreUpdateManyWithoutGameNestedInput;
  };

  export type GameUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    scores?: ScoreUncheckedUpdateManyWithoutGameNestedInput;
  };

  export type GameCreateManyInput = {
    id?: string;
    name: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type GameUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type GameUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ScoreCreateInput = {
    id?: string;
    score: number;
    submitted_at?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutScoresInput;
    game: GameCreateNestedOneWithoutScoresInput;
  };

  export type ScoreUncheckedCreateInput = {
    id?: string;
    user_id: string;
    game_id: string;
    score: number;
    submitted_at?: Date | string;
    updatedAt?: Date | string;
  };

  export type ScoreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutScoresNestedInput;
    game?: GameUpdateOneRequiredWithoutScoresNestedInput;
  };

  export type ScoreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    user_id?: StringFieldUpdateOperationsInput | string;
    game_id?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ScoreCreateManyInput = {
    id?: string;
    user_id: string;
    game_id: string;
    score: number;
    submitted_at?: Date | string;
    updatedAt?: Date | string;
  };

  export type ScoreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ScoreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    user_id?: StringFieldUpdateOperationsInput | string;
    game_id?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type ScoreListRelationFilter = {
    every?: ScoreWhereInput;
    some?: ScoreWhereInput;
    none?: ScoreWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type ScoreOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    refreshToken?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    refreshToken?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    refreshToken?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type GameCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type GameMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type GameMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type UserScalarRelationFilter = {
    is?: UserWhereInput;
    isNot?: UserWhereInput;
  };

  export type GameScalarRelationFilter = {
    is?: GameWhereInput;
    isNot?: GameWhereInput;
  };

  export type ScoreUser_idGame_idCompoundUniqueInput = {
    user_id: string;
    game_id: string;
  };

  export type ScoreCountOrderByAggregateInput = {
    id?: SortOrder;
    user_id?: SortOrder;
    game_id?: SortOrder;
    score?: SortOrder;
    submitted_at?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ScoreAvgOrderByAggregateInput = {
    score?: SortOrder;
  };

  export type ScoreMaxOrderByAggregateInput = {
    id?: SortOrder;
    user_id?: SortOrder;
    game_id?: SortOrder;
    score?: SortOrder;
    submitted_at?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ScoreMinOrderByAggregateInput = {
    id?: SortOrder;
    user_id?: SortOrder;
    game_id?: SortOrder;
    score?: SortOrder;
    submitted_at?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ScoreSumOrderByAggregateInput = {
    score?: SortOrder;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type ScoreCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<ScoreCreateWithoutUserInput, ScoreUncheckedCreateWithoutUserInput>
      | ScoreCreateWithoutUserInput[]
      | ScoreUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ScoreCreateOrConnectWithoutUserInput
      | ScoreCreateOrConnectWithoutUserInput[];
    createMany?: ScoreCreateManyUserInputEnvelope;
    connect?: ScoreWhereUniqueInput | ScoreWhereUniqueInput[];
  };

  export type ScoreUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<ScoreCreateWithoutUserInput, ScoreUncheckedCreateWithoutUserInput>
      | ScoreCreateWithoutUserInput[]
      | ScoreUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ScoreCreateOrConnectWithoutUserInput
      | ScoreCreateOrConnectWithoutUserInput[];
    createMany?: ScoreCreateManyUserInputEnvelope;
    connect?: ScoreWhereUniqueInput | ScoreWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type ScoreUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<ScoreCreateWithoutUserInput, ScoreUncheckedCreateWithoutUserInput>
      | ScoreCreateWithoutUserInput[]
      | ScoreUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ScoreCreateOrConnectWithoutUserInput
      | ScoreCreateOrConnectWithoutUserInput[];
    upsert?:
      | ScoreUpsertWithWhereUniqueWithoutUserInput
      | ScoreUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: ScoreCreateManyUserInputEnvelope;
    set?: ScoreWhereUniqueInput | ScoreWhereUniqueInput[];
    disconnect?: ScoreWhereUniqueInput | ScoreWhereUniqueInput[];
    delete?: ScoreWhereUniqueInput | ScoreWhereUniqueInput[];
    connect?: ScoreWhereUniqueInput | ScoreWhereUniqueInput[];
    update?:
      | ScoreUpdateWithWhereUniqueWithoutUserInput
      | ScoreUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | ScoreUpdateManyWithWhereWithoutUserInput
      | ScoreUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: ScoreScalarWhereInput | ScoreScalarWhereInput[];
  };

  export type ScoreUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<ScoreCreateWithoutUserInput, ScoreUncheckedCreateWithoutUserInput>
      | ScoreCreateWithoutUserInput[]
      | ScoreUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ScoreCreateOrConnectWithoutUserInput
      | ScoreCreateOrConnectWithoutUserInput[];
    upsert?:
      | ScoreUpsertWithWhereUniqueWithoutUserInput
      | ScoreUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: ScoreCreateManyUserInputEnvelope;
    set?: ScoreWhereUniqueInput | ScoreWhereUniqueInput[];
    disconnect?: ScoreWhereUniqueInput | ScoreWhereUniqueInput[];
    delete?: ScoreWhereUniqueInput | ScoreWhereUniqueInput[];
    connect?: ScoreWhereUniqueInput | ScoreWhereUniqueInput[];
    update?:
      | ScoreUpdateWithWhereUniqueWithoutUserInput
      | ScoreUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | ScoreUpdateManyWithWhereWithoutUserInput
      | ScoreUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: ScoreScalarWhereInput | ScoreScalarWhereInput[];
  };

  export type ScoreCreateNestedManyWithoutGameInput = {
    create?:
      | XOR<ScoreCreateWithoutGameInput, ScoreUncheckedCreateWithoutGameInput>
      | ScoreCreateWithoutGameInput[]
      | ScoreUncheckedCreateWithoutGameInput[];
    connectOrCreate?:
      | ScoreCreateOrConnectWithoutGameInput
      | ScoreCreateOrConnectWithoutGameInput[];
    createMany?: ScoreCreateManyGameInputEnvelope;
    connect?: ScoreWhereUniqueInput | ScoreWhereUniqueInput[];
  };

  export type ScoreUncheckedCreateNestedManyWithoutGameInput = {
    create?:
      | XOR<ScoreCreateWithoutGameInput, ScoreUncheckedCreateWithoutGameInput>
      | ScoreCreateWithoutGameInput[]
      | ScoreUncheckedCreateWithoutGameInput[];
    connectOrCreate?:
      | ScoreCreateOrConnectWithoutGameInput
      | ScoreCreateOrConnectWithoutGameInput[];
    createMany?: ScoreCreateManyGameInputEnvelope;
    connect?: ScoreWhereUniqueInput | ScoreWhereUniqueInput[];
  };

  export type ScoreUpdateManyWithoutGameNestedInput = {
    create?:
      | XOR<ScoreCreateWithoutGameInput, ScoreUncheckedCreateWithoutGameInput>
      | ScoreCreateWithoutGameInput[]
      | ScoreUncheckedCreateWithoutGameInput[];
    connectOrCreate?:
      | ScoreCreateOrConnectWithoutGameInput
      | ScoreCreateOrConnectWithoutGameInput[];
    upsert?:
      | ScoreUpsertWithWhereUniqueWithoutGameInput
      | ScoreUpsertWithWhereUniqueWithoutGameInput[];
    createMany?: ScoreCreateManyGameInputEnvelope;
    set?: ScoreWhereUniqueInput | ScoreWhereUniqueInput[];
    disconnect?: ScoreWhereUniqueInput | ScoreWhereUniqueInput[];
    delete?: ScoreWhereUniqueInput | ScoreWhereUniqueInput[];
    connect?: ScoreWhereUniqueInput | ScoreWhereUniqueInput[];
    update?:
      | ScoreUpdateWithWhereUniqueWithoutGameInput
      | ScoreUpdateWithWhereUniqueWithoutGameInput[];
    updateMany?:
      | ScoreUpdateManyWithWhereWithoutGameInput
      | ScoreUpdateManyWithWhereWithoutGameInput[];
    deleteMany?: ScoreScalarWhereInput | ScoreScalarWhereInput[];
  };

  export type ScoreUncheckedUpdateManyWithoutGameNestedInput = {
    create?:
      | XOR<ScoreCreateWithoutGameInput, ScoreUncheckedCreateWithoutGameInput>
      | ScoreCreateWithoutGameInput[]
      | ScoreUncheckedCreateWithoutGameInput[];
    connectOrCreate?:
      | ScoreCreateOrConnectWithoutGameInput
      | ScoreCreateOrConnectWithoutGameInput[];
    upsert?:
      | ScoreUpsertWithWhereUniqueWithoutGameInput
      | ScoreUpsertWithWhereUniqueWithoutGameInput[];
    createMany?: ScoreCreateManyGameInputEnvelope;
    set?: ScoreWhereUniqueInput | ScoreWhereUniqueInput[];
    disconnect?: ScoreWhereUniqueInput | ScoreWhereUniqueInput[];
    delete?: ScoreWhereUniqueInput | ScoreWhereUniqueInput[];
    connect?: ScoreWhereUniqueInput | ScoreWhereUniqueInput[];
    update?:
      | ScoreUpdateWithWhereUniqueWithoutGameInput
      | ScoreUpdateWithWhereUniqueWithoutGameInput[];
    updateMany?:
      | ScoreUpdateManyWithWhereWithoutGameInput
      | ScoreUpdateManyWithWhereWithoutGameInput[];
    deleteMany?: ScoreScalarWhereInput | ScoreScalarWhereInput[];
  };

  export type UserCreateNestedOneWithoutScoresInput = {
    create?: XOR<
      UserCreateWithoutScoresInput,
      UserUncheckedCreateWithoutScoresInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutScoresInput;
    connect?: UserWhereUniqueInput;
  };

  export type GameCreateNestedOneWithoutScoresInput = {
    create?: XOR<
      GameCreateWithoutScoresInput,
      GameUncheckedCreateWithoutScoresInput
    >;
    connectOrCreate?: GameCreateOrConnectWithoutScoresInput;
    connect?: GameWhereUniqueInput;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type UserUpdateOneRequiredWithoutScoresNestedInput = {
    create?: XOR<
      UserCreateWithoutScoresInput,
      UserUncheckedCreateWithoutScoresInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutScoresInput;
    upsert?: UserUpsertWithoutScoresInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutScoresInput,
        UserUpdateWithoutScoresInput
      >,
      UserUncheckedUpdateWithoutScoresInput
    >;
  };

  export type GameUpdateOneRequiredWithoutScoresNestedInput = {
    create?: XOR<
      GameCreateWithoutScoresInput,
      GameUncheckedCreateWithoutScoresInput
    >;
    connectOrCreate?: GameCreateOrConnectWithoutScoresInput;
    upsert?: GameUpsertWithoutScoresInput;
    connect?: GameWhereUniqueInput;
    update?: XOR<
      XOR<
        GameUpdateToOneWithWhereWithoutScoresInput,
        GameUpdateWithoutScoresInput
      >,
      GameUncheckedUpdateWithoutScoresInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type ScoreCreateWithoutUserInput = {
    id?: string;
    score: number;
    submitted_at?: Date | string;
    updatedAt?: Date | string;
    game: GameCreateNestedOneWithoutScoresInput;
  };

  export type ScoreUncheckedCreateWithoutUserInput = {
    id?: string;
    game_id: string;
    score: number;
    submitted_at?: Date | string;
    updatedAt?: Date | string;
  };

  export type ScoreCreateOrConnectWithoutUserInput = {
    where: ScoreWhereUniqueInput;
    create: XOR<
      ScoreCreateWithoutUserInput,
      ScoreUncheckedCreateWithoutUserInput
    >;
  };

  export type ScoreCreateManyUserInputEnvelope = {
    data: ScoreCreateManyUserInput | ScoreCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type ScoreUpsertWithWhereUniqueWithoutUserInput = {
    where: ScoreWhereUniqueInput;
    update: XOR<
      ScoreUpdateWithoutUserInput,
      ScoreUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      ScoreCreateWithoutUserInput,
      ScoreUncheckedCreateWithoutUserInput
    >;
  };

  export type ScoreUpdateWithWhereUniqueWithoutUserInput = {
    where: ScoreWhereUniqueInput;
    data: XOR<
      ScoreUpdateWithoutUserInput,
      ScoreUncheckedUpdateWithoutUserInput
    >;
  };

  export type ScoreUpdateManyWithWhereWithoutUserInput = {
    where: ScoreScalarWhereInput;
    data: XOR<
      ScoreUpdateManyMutationInput,
      ScoreUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type ScoreScalarWhereInput = {
    AND?: ScoreScalarWhereInput | ScoreScalarWhereInput[];
    OR?: ScoreScalarWhereInput[];
    NOT?: ScoreScalarWhereInput | ScoreScalarWhereInput[];
    id?: StringFilter<'Score'> | string;
    user_id?: StringFilter<'Score'> | string;
    game_id?: StringFilter<'Score'> | string;
    score?: IntFilter<'Score'> | number;
    submitted_at?: DateTimeFilter<'Score'> | Date | string;
    updatedAt?: DateTimeFilter<'Score'> | Date | string;
  };

  export type ScoreCreateWithoutGameInput = {
    id?: string;
    score: number;
    submitted_at?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutScoresInput;
  };

  export type ScoreUncheckedCreateWithoutGameInput = {
    id?: string;
    user_id: string;
    score: number;
    submitted_at?: Date | string;
    updatedAt?: Date | string;
  };

  export type ScoreCreateOrConnectWithoutGameInput = {
    where: ScoreWhereUniqueInput;
    create: XOR<
      ScoreCreateWithoutGameInput,
      ScoreUncheckedCreateWithoutGameInput
    >;
  };

  export type ScoreCreateManyGameInputEnvelope = {
    data: ScoreCreateManyGameInput | ScoreCreateManyGameInput[];
    skipDuplicates?: boolean;
  };

  export type ScoreUpsertWithWhereUniqueWithoutGameInput = {
    where: ScoreWhereUniqueInput;
    update: XOR<
      ScoreUpdateWithoutGameInput,
      ScoreUncheckedUpdateWithoutGameInput
    >;
    create: XOR<
      ScoreCreateWithoutGameInput,
      ScoreUncheckedCreateWithoutGameInput
    >;
  };

  export type ScoreUpdateWithWhereUniqueWithoutGameInput = {
    where: ScoreWhereUniqueInput;
    data: XOR<
      ScoreUpdateWithoutGameInput,
      ScoreUncheckedUpdateWithoutGameInput
    >;
  };

  export type ScoreUpdateManyWithWhereWithoutGameInput = {
    where: ScoreScalarWhereInput;
    data: XOR<
      ScoreUpdateManyMutationInput,
      ScoreUncheckedUpdateManyWithoutGameInput
    >;
  };

  export type UserCreateWithoutScoresInput = {
    id?: string;
    name: string;
    email: string;
    password: string;
    refreshToken?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUncheckedCreateWithoutScoresInput = {
    id?: string;
    name: string;
    email: string;
    password: string;
    refreshToken?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserCreateOrConnectWithoutScoresInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutScoresInput,
      UserUncheckedCreateWithoutScoresInput
    >;
  };

  export type GameCreateWithoutScoresInput = {
    id?: string;
    name: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type GameUncheckedCreateWithoutScoresInput = {
    id?: string;
    name: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type GameCreateOrConnectWithoutScoresInput = {
    where: GameWhereUniqueInput;
    create: XOR<
      GameCreateWithoutScoresInput,
      GameUncheckedCreateWithoutScoresInput
    >;
  };

  export type UserUpsertWithoutScoresInput = {
    update: XOR<
      UserUpdateWithoutScoresInput,
      UserUncheckedUpdateWithoutScoresInput
    >;
    create: XOR<
      UserCreateWithoutScoresInput,
      UserUncheckedCreateWithoutScoresInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutScoresInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutScoresInput,
      UserUncheckedUpdateWithoutScoresInput
    >;
  };

  export type UserUpdateWithoutScoresInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateWithoutScoresInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type GameUpsertWithoutScoresInput = {
    update: XOR<
      GameUpdateWithoutScoresInput,
      GameUncheckedUpdateWithoutScoresInput
    >;
    create: XOR<
      GameCreateWithoutScoresInput,
      GameUncheckedCreateWithoutScoresInput
    >;
    where?: GameWhereInput;
  };

  export type GameUpdateToOneWithWhereWithoutScoresInput = {
    where?: GameWhereInput;
    data: XOR<
      GameUpdateWithoutScoresInput,
      GameUncheckedUpdateWithoutScoresInput
    >;
  };

  export type GameUpdateWithoutScoresInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type GameUncheckedUpdateWithoutScoresInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ScoreCreateManyUserInput = {
    id?: string;
    game_id: string;
    score: number;
    submitted_at?: Date | string;
    updatedAt?: Date | string;
  };

  export type ScoreUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    game?: GameUpdateOneRequiredWithoutScoresNestedInput;
  };

  export type ScoreUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    game_id?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ScoreUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    game_id?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ScoreCreateManyGameInput = {
    id?: string;
    user_id: string;
    score: number;
    submitted_at?: Date | string;
    updatedAt?: Date | string;
  };

  export type ScoreUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutScoresNestedInput;
  };

  export type ScoreUncheckedUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string;
    user_id?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ScoreUncheckedUpdateManyWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string;
    user_id?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    submitted_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };
}
