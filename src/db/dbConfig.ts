import knex from 'knex';
import { dbConnection } from './dbConnection'
import { getConfig } from '../util/'

console.log(dbConnection)

const dbConfig: knex.Config = {
  client: getConfig('DB_CLIENT') || 'pg',
  connection: dbConnection,
  searchPath: ['knex', 'public'],
}

export { dbConfig, dbConfig as default}