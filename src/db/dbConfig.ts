import knex from 'knex'
import { dbConnection } from './dbConnection'
import { getConfig } from '../util'

// eslint-disable-next-line no-console
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
  showErrorStack: 'json',
  extendedErrors: ['hint', 'detail', 'errcode'],
  // eslint-disable-next-line global-require
  appendPlugins: [require('@graphile-contrib/pg-simplify-inflector')],
  exportGqlSchemaPath: 'schema.graphql',
  graphiql: true,
  enhanceGraphiql: true,
  enableQueryBatching: true,
  legacyRelations: 'omit',
  // externalUrlBase: '/gql',
  graphqlRoute: '/gql/graphql',
  graphiqlRoute: '/gql/graphiql',
}

const postgraphileOptionsProd = {
  subscriptions: true,
  retryOnInitFail: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  ignoreIndexes: false,
  extendedErrors: ['errcode'],
  // eslint-disable-next-line global-require
  appendPlugins: [require('@graphile-contrib/pg-simplify-inflector')],
  graphiql: false,
  enableQueryBatching: true,
  // our default logging has performance issue, but do make sure you have a logging system in place!
  disableQueryLog: true,
  legacyRelations: 'omit',
}

// eslint-disable-next-line import/no-mutable-exports
let postgraphileOptions: any = postgraphileOptionsDev

if (getConfig('envir') === 'production') {
  postgraphileOptions = postgraphileOptionsProd
}

export { dbConfig, postgraphileOptions }
