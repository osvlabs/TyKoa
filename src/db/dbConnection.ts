import knex from 'knex'

const dbConnection: knex.PgConnectionConfig = {
  user: 'postgres',
  host: 'localhost',
  database: '',
  password: '',
  port: 5432,
}

export { dbConnection }