import knex from 'knex'
import { getConfig } from '../util'

const mysqlPrefix = 'DB_MYSQL_'

const dbConnection: knex.PgConnectionConfig = {
  user: getConfig(`${mysqlPrefix}user`),
  host: getConfig(`${mysqlPrefix}host`),
  database: getConfig(`${mysqlPrefix}database`),
  password: getConfig(`${mysqlPrefix}password`),
  port: Number(getConfig(`${mysqlPrefix}port`)),
}

export { dbConnection, dbConnection as default }
