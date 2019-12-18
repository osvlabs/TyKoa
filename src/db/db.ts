import knex from 'knex'
import { dbConfig } from './dbConfig'

const db = knex(dbConfig)

export { db, db as default }
