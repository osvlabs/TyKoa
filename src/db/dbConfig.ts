import knex from 'knex';
import { dbConnection } from './dbConnection'
import { getConfig } from '../util/'

console.log(dbConnection)

const dbConfig: knex.Config = {
  client: getConfig('DB_CLIENT') || 'pg',
  connection: dbConnection,
  searchPath: ['knex', 'public'],
}

const postgraphileOptionsDev = {
  subscriptions: true,
  watchPg: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  showErrorStack: "json",
  extendedErrors: ["hint", "detail", "errcode"],
  appendPlugins: [require("@graphile-contrib/pg-simplify-inflector")],
  exportGqlSchemaPath: "schema.graphql",
  graphiql: true,
  enhanceGraphiql: true,
  enableQueryBatching: true,
  legacyRelations: "omit",
}

const postgraphileOptionsProd = {
  subscriptions: true,
  retryOnInitFail: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  ignoreIndexes: false,
  extendedErrors: ["errcode"],
  appendPlugins: [require("@graphile-contrib/pg-simplify-inflector")],
  graphiql: false,
  enableQueryBatching: true,
  disableQueryLog: true, // our default logging has performance issues, but do make sure you have a logging system in place!
  legacyRelations: "omit",
}

let postgraphileOptions: any = postgraphileOptionsDev

if (getConfig('envir') === 'production') {
  postgraphileOptions = postgraphileOptionsProd
}

export { dbConfig, postgraphileOptions }