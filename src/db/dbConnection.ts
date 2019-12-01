import knex from 'knex'
import { getConfig } from '../util'

const pgPrefix = 'DB_PG_'

const dbConnection: knex.PgConnectionConfig = {
  user: getConfig(`${pgPrefix}user`),
  host: getConfig(`${pgPrefix}host`),
  database: getConfig(`${pgPrefix}database`),
  password: getConfig(`${pgPrefix}password`),
  port: Number(getConfig(`${pgPrefix}port`)),
}

export { dbConnection, dbConnection as default }
