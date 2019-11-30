import knex from 'knex';
import { dbConnection } from './dbConnection'
const dbConfig: knex.Config = {
  client: 'pg',
  connection: dbConnection,
  searchPath: ['knex', 'public'],
}

export { dbConfig, dbConfig as default}