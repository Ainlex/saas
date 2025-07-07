
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 5.0.0
 * Query Engine version: 6b0aef69b7cdfc787f822ecd7cdc76d5f1991584
 */
Prisma.prismaVersion = {
  client: "5.0.0",
  engine: "6b0aef69b7cdfc787f822ecd7cdc76d5f1991584"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.EmpresaScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  ruc: 'ruc',
  plan: 'plan',
  activo: 'activo',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UsuarioScalarFieldEnum = {
  id: 'id',
  email: 'email',
  nombre: 'nombre',
  empresaId: 'empresaId',
  rolId: 'rolId',
  activo: 'activo',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ModuloScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  displayName: 'displayName',
  version: 'version',
  activo: 'activo',
  dependencias: 'dependencias',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EmpresaModuloScalarFieldEnum = {
  id: 'id',
  empresaId: 'empresaId',
  moduloId: 'moduloId',
  activo: 'activo',
  configuracion: 'configuracion',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ModuloDependenciaScalarFieldEnum = {
  id: 'id',
  moduloId: 'moduloId',
  dependeDeId: 'dependeDeId',
  requerido: 'requerido',
  createdAt: 'createdAt'
};

exports.Prisma.RolScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  empresaId: 'empresaId',
  activo: 'activo',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ModuloPermisoScalarFieldEnum = {
  id: 'id',
  moduloId: 'moduloId',
  nombre: 'nombre',
  accion: 'accion',
  activo: 'activo'
};

exports.Prisma.RolPermisoScalarFieldEnum = {
  id: 'id',
  rolId: 'rolId',
  moduloPermisoId: 'moduloPermisoId',
  activo: 'activo'
};

exports.Prisma.ModuloRutaScalarFieldEnum = {
  id: 'id',
  moduloId: 'moduloId',
  empresaId: 'empresaId',
  ruta: 'ruta',
  metodo: 'metodo',
  activo: 'activo',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
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

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
