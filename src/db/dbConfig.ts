import knex from 'knex'
import { dbConnection } from './dbConnection'
import { getConfig } from '../util'

// eslint-disable-next-line no-console
console.log(dbConnection)

const dbConfig: knex.Config = {
  client: getConfig('DB_CLIENT') || 'mysql',
  connection: dbConnection,
}


export { dbConfig, dbConfig as default }
